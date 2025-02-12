import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';  // Importe o motion do framer-motion
import SignaturePad from './SingnaturePad';

import Colecao from '@/logic/firebase/db/Colecao'; // Lógica do Firebase
import Item from './Item'; // Interface Item
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Timestamp } from 'firebase/firestore';


const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "20px",
    maxWidth: "1600px",
    margin: "auto",
    background: "linear-gradient(135deg,rgb(202, 202, 202) 0%,rgb(250, 250, 250) 100%)",
    borderRadius: "15px",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.down('sm')]: {
      padding: "10px",
    },
  },
  paper: {
    background: "linear-gradient(135deg,rgb(33, 30, 49) 0%,rgb(2, 94, 6) 100%)",
    color: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-5px)",
    },
    [theme.breakpoints.down('sm')]: {
      padding: "10px",
    },
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(1),
    '& img': {
      width: '150px', // Tamanho do logo
      height: 'auto',
      borderRadius: '50%', // Formato circular
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)', // Sombra luxuosa
      border: '4px solid white', // Borda branca
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.1)', // Efeito de zoom ao passar o mouse
      },
    },
  },
  title: {
    marginBottom: theme.spacing(1),
  
    fontSize: '1.5rem',
    fontWeight: 'bold',
    fontFamily: 'Playfair Display, serif',
    textAlign: 'center',
    backgroundImage: 'linear-gradient(135deg, rgb(255, 255, 255), rgb(160, 214, 165))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    boxShadow: '0 4px 6px rgba(247, 247, 247, 0.47)',
    transform: 'rotateX(4deg)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    },
  },
  textField: {
    marginBottom: theme.spacing(-1),
    padding: '0px',
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    color: 'black',
    border: '1px solid rgb(209, 209, 209)',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
    '& input': {
      fontSize: '14px',
      fontWeight: 500,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  button: {
    marginTop: theme.spacing(-1),
    padding: theme.spacing(1.5),
    background: 'linear-gradient(135deg,rgba(27, 27, 27, 0.8),rgba(102, 102, 102, 0.34))',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Playfair Display, serif',
    borderRadius: '8px',
    textTransform: 'uppercase',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#2c3e50',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  uploaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20vh',
    marginTop: theme.spacing(3),
  },
  noPrint: {
    '@media print': {
      display: 'none !important',
    },
  },
}));



interface ListPostProps {
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const ListPost: React.FC<ListPostProps> = ({ setItems }) => {
  const classes = useStyles();
  const [signature, setSignature] = useState<string>('');
  const [newItem, setNewItem] = useState<Item>({
   

    id:'',
    cliente: '',
    
    status: '',
    quantidade: 0,
    imagemUrls: ['', '', '', ''],
    concluido: false,
    placa: '',
    renavam: '',
    crv: '',
    valordevenda: '',
   
    

    nomevendedor:'',
    cpfvendedor: '',
    enderecovendedor: '',
    complementovendedor: '',
    municipiovendedor: '',
    emailvendedor:'',

    nomecomprador: '',
    cpfcomprador: '',
    enderecocomprador: '',
    complementocomprador: '',
    municipiocomprador: '',
    emailcomprador: '',
   celtelcomprador: '',
   cepvendedor: '',
    cepcomprador: '',
    tipo: '',
    cnpjempresa: '',
    nomeempresa: '',
    dataCriacao: Timestamp.fromDate(new Date()),
    celtelvendedor: '',
    signature: '',
   
  });

  const sendWhatsApp = async (pdfURL: string) => {
    let telefone = newItem.celtelcomprador.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Se o telefone do comprador não estiver preenchido, usa o WhatsApp fixo
    if (!telefone) {
      telefone = '5548988449379'; // WhatsApp padrão
    }

    const mensagemWhatsApp = `Olá, ${newItem.nomecomprador || 'cliente'}! Seu documento foi gerado e está pronto. Você pode baixá-lo aqui: ${pdfURL}`;
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(mensagemWhatsApp)}`;

    window.open(linkWhatsApp, '_blank'); // Abre o WhatsApp automaticamente
  };

  const generatePDF = async () => {
    const input = document.getElementById('pdf-content'); // Captura o formulário
    if (!input) return;

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Converter para Blob e gerar URL
    const pdfBlob = pdf.output('blob');
    const pdfURL = URL.createObjectURL(pdfBlob);

    // Salvar PDF localmente
    pdf.save(`Requerimento_${newItem.nomecomprador || 'documento'}.pdf`);

    // Enviar para o WhatsApp
    await sendWhatsApp(pdfURL);
  };
  
  const handleAddItem = async () => {
    try {
      const colecao = new Colecao();
      const itemParaSalvar = {
        ...newItem,
        dataCriacao: new Date().toISOString().split('T')[0], // Ou Timestamp.fromDate(new Date())
      };const itemSalvo = await colecao.salvar('Betodespachanteintrncaodevenda', newItem);
  
      const adaptedItemSalvo: Item = {
        ...newItem,
        id: itemSalvo.id,
      };
  
      setItems((prevItems) => [...prevItems, adaptedItemSalvo]);
  
      await generatePDF(); // Gera o PDF após salvar
  
      setNewItem({
        id:'',
        cliente: '',
        
        status: '',
        quantidade: 0,
        imagemUrls: ['', '', '', ''],
        concluido: false,
        placa: '',
        renavam: '',
        crv: '',
        valordevenda: '',
       
        
        
        nomevendedor:'',
        cpfvendedor: '',
        enderecovendedor: '',
        complementovendedor: '',
        municipiovendedor: '',
        emailvendedor:'',
        dataCriacao: Timestamp.fromDate(new Date()),
        nomecomprador: '',
        cpfcomprador: '',
        enderecocomprador: '',
        complementocomprador: '',
        municipiocomprador: '',
        emailcomprador: '',
       celtelcomprador: '',
       cepvendedor: '',
        cepcomprador: '',
        tipo: '',
        cnpjempresa: '',
        nomeempresa: '',
        signature: '',
        celtelvendedor: '',

        
 
      });
      

      setItems((prevItems) => [...prevItems, adaptedItemSalvo]);
    } catch (error) {
      console.error('Erro ao adicionar o item:', error);
    }
  };

  const shouldShowImageUploader = newItem.imagemUrls.length < 4;
  const shouldShowAddItemButton = newItem.imagemUrls.length === 4;

  return (
    <div className={`${classes.formContainer} ${classes.noPrint}`}>
      <Box />
      <Paper className={classes.paper}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3 }}
        >
          <div className={classes.logoContainer}>
            <img src="/betodespa.webp" alt="Logo Betodespachante" />
          </div>
          <Typography className={classes.title}>Criar Requerimento de Intenção de Venda</Typography>
  
          {/* Seções lado a lado */}
          <Grid container spacing={3}>
  {/* Identificação Do Veículo */}
  <Grid item xs={12} md={3}>
    <Typography className={classes.title}>Identificação Do Veículo</Typography>
    {[
      { label: 'Placa', value: 'id' },
      { label: 'Renavam', value: 'renavam' },
      { label: 'CRV', value: 'crv' },
      { label: 'Valor de Venda', value: 'valordevenda', type: 'number' }
    ].map((field) => (
      <TextField
        key={field.value}
        label={field.label}
        value={newItem[field.value as keyof Item] || ''}
        onChange={(e) => setNewItem({ ...newItem, [field.value]: e.target.value })}
        fullWidth
        variant="outlined"
        InputProps={{ className: classes.textField }}
        style={{ marginBottom: '16px' }}
      />
    ))}
  </Grid>

  {/* Identificação Do Vendedor */}
  <Grid item xs={12} md={3}>
    <Typography className={classes.title}>Identificação Do Vendedor</Typography>
    {[
      { label: 'Nome', value: 'nomevendedor' },
      { label: 'CPF', value: 'cpfvendedor' },
      { label: 'E-MAIL', value: 'emailvendedor' }
   
      
    ].map((field) => (
      <TextField
        key={field.value}
        label={field.label}
        value={newItem[field.value as keyof Item] || ''}
        onChange={(e) => setNewItem({ ...newItem, [field.value]: e.target.value })}
        fullWidth
        variant="outlined"
        InputProps={{ className: classes.textField }}
        style={{ marginBottom: '16px' }}
      />
    ))}
  </Grid>

  {/* Identificação Do Comprador */}
  <Grid item xs={12} md={3}>
    <Typography className={classes.title}>Identificação Do Comprador</Typography>
    {[
      { label: 'Nome', value: 'nomecomprador' },
      { label: 'CPF', value: 'cpfcomprador' },
      { label: 'CEP', value: 'cepcomprador' },
      { label: 'ENDEREÇO', value: 'enderecocomprador' },
      { label: 'COMPLEMENTO', value: 'complementocomprador' },
      { label: 'MUNICÍPIO', value: 'municipiocomprador' },
      { label: 'E-MAIL', value: 'emailcomprador' },
      { label: 'CEL/TEL', value: 'celtelcomprador' }
      
    ].map((field) => (
      <TextField
        key={field.value}
        label={field.label}
        value={newItem[field.value as keyof Item] || ''}
        onChange={(e) => setNewItem({ ...newItem, [field.value]: e.target.value })}
        fullWidth
        variant="outlined"
        InputProps={{ className: classes.textField }}
        style={{ marginBottom: '16px' }}
      />
    ))}
  </Grid>

  
  {/* Solicitante */}
  <Grid item xs={12} md={3}>
    <Typography className={classes.title}>Identificação Da Empresa</Typography>
    {[
      { label: 'Nome', value: 'nomeempresa' },
      { label: 'CPF/CNPJ', value: 'cnpjempresa' }
      
      
    ].map((field) => (
      <TextField
        key={field.value}
        label={field.label}
        value={newItem[field.value as keyof Item] || ''}
        onChange={(e) => setNewItem({ ...newItem, [field.value]: e.target.value })}
        fullWidth
        variant="outlined"
        InputProps={{ className: classes.textField }}
        style={{ marginBottom: '16px' }}
      />
    ))}
  </Grid>
</Grid>
<Grid container justifyContent="center"  spacing={2}>
  <Grid item xs={12}>
    <Typography className={classes.title}>Assinatura do Cliente</Typography>
  </Grid>

  <Grid item xs={12} md={8}>
    <SignaturePad
      onSave={(signature: string) => 
        setNewItem((prev) => ({ ...prev, signature }))
      }
      // Defina largura 100% para o componente se ajustar
      
    />
  </Grid>
</Grid>

{/* Botão condicional (pode estar no mesmo container ou fora dele) */}
{shouldShowAddItemButton && (
  <Grid container justifyContent="center" alignItems="center" spacing={3}>
    <Grid item>
      <Button
        onClick={async () => {
          await handleAddItem(); 
         
        }}
        variant="contained"
        size="large"
        className={classes.button}
      >
        Adicione Requerimento
      </Button>
    </Grid>
  </Grid>
)}
        </motion.div>
      </Paper>
    </div>
  );
};

export default ListPost;
