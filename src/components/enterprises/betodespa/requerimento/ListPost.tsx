

import Colecao from '../../../../logic/firebase/db/Colecao';


import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import SaveIcon from '@material-ui/icons/Save'; // Importação do ícone Save

import Item from './Item';

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
    marginTop: theme.spacing(1),
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
  const [newItem, setNewItem] = useState<Item>({
    id: '',
    cliente: '',
    total: 0,
    status: '',
    quantidade: 0,
    concluido: false,
    imagemUrls: ['', '', '', ''],
    placa: '',
    renavam: '',
    crv: '',
    valordevenda: 0,
    localizacao: '',
    nomevendedor: '',
    cpfvendedor: '',
    enderecovendedor: '',
    complementovendedor: '',
    municipiovendedor: '',
    emailvendedor: '',
    nomecomprador: '',
    cpfcomprador: '',
    enderecocomprador: '',
    complementocomprador: '',
    municipiocomprador: '',
    emailcomprador: '',
    celtelcomprador: '',
    celtelvendedor: '',
    cepvendedor: '',
    cepcomprador: '',
    tipo: '',
    cnpjempresa: '',
    nomeempresa: '',
    dataCriacao: '',
  });

  const handleAddItem = async () => {
    try {
      const colecao = new Colecao();
      const itemSalvo = await colecao.salvar('Betodespachanteintrncaodevenda', newItem);

      const adaptedItemSalvo: Item = {
        ...newItem,
        id: itemSalvo.id,
      };

      setNewItem({
        imagemUrls: ['', '', '', ''],
        id: '',
        cliente: '',
        total: 0,
        status: '',
        quantidade: 0,
        concluido: false,
        localizacao: '',
        placa: '',
        renavam: '',
        crv: '',
        valordevenda: 0,
        nomevendedor: '',
        celtelvendedor: '',
        cpfvendedor: '',
        enderecovendedor: '',
        complementovendedor: '',
        municipiovendedor: '',
        emailvendedor: '',
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
        dataCriacao: '',
      });

      setItems((prevItems) => [...prevItems, adaptedItemSalvo]);
    } catch (error) {
      console.error('Erro ao adicionar o item:', error);
    }
  };

  const handleSaveEdit = () => {
    // Lógica para salvar a edição
    console.log('Edição salva com sucesso!');
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
          {/* Logo no topo, centralizado e com estilo luxuoso */}
          <div className={classes.logoContainer}>
            <img src="/betodespa.webp" alt="Logo Betodespachante" />
          </div>

          <Typography className={classes.title}>Criar Requerimento de Intenção de Venda</Typography>

          {/* Todos os 4 grupos lado a lado no computador, um embaixo do outro no mobile */}
          <Grid container spacing={3}>
            {/* Identificação Do Veículo */}
            <Grid item xs={12} md={3}>
              <Typography className={classes.title}>Identificação Do Veículo</Typography>
              <Grid container spacing={1}>
                {[
                  { label: 'Placa', value: 'placa' },
                  { label: 'Renavam', value: 'renavam' },
                  { label: 'CRV', value: 'crv' },
                  { label: 'Valor de Venda', value: 'valordevenda', type: 'number' },
                ].map((field) => (
                  <Grid item xs={12} key={field.value}>
                    <TextField
                      label={field.label}
                      value={newItem[field.value as keyof Item] || ''}
                      onChange={(e) => setNewItem({ ...newItem, [field.value]: e.target.value })}
                      fullWidth
                      variant="outlined"
                      InputProps={{ className: classes.textField }}
                      type={field.type || 'text'}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Identificação Do Vendedor */}
            <Grid item xs={12} md={3}>
              <Typography className={classes.title}>Identificação Do</Typography>
              <Typography className={classes.title}>Vendedor</Typography>
              <Grid container spacing={1}>
                {[
                  { label: 'Nome', value: 'nomevendedor' },
                  { label: 'CPF', value: 'cpfvendedor' },
                  { label: 'ENDEREÇO', value: 'enderecovendedor' },
                  { label: 'COMPLEMENTO', value: 'complementovendedor' },
                  { label: 'MUNICIPÍO', value: 'municipiovendedor' },
                  { label: 'E-MAIL', value: 'emailvendedor' },
                  { label: 'CEL/TEL', value: 'celtelvendedor' },
                  { label: 'CEP', value: 'cepvendedor' },
                ].map((field) => (
                  <Grid item xs={12} key={field.value}>
                    <TextField
                      label={field.label}
                      value={newItem[field.value as keyof Item] || ''}
                      onChange={(e) => setNewItem({ ...newItem, [field.value]: e.target.value })}
                      fullWidth
                      variant="outlined"
                      InputProps={{ className: classes.textField }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Identificação Do Comprador */}
            <Grid item xs={12} md={3}>
              <Typography className={classes.title}>Identificação Do</Typography>
              <Typography className={classes.title}>Comprador</Typography>
              <Grid container spacing={1}>
                {[
                  { label: 'Nome', value: 'nomecomprador' },
                  { label: 'CPF', value: 'cpfcomprador' },
                  { label: 'ENDEREÇO', value: 'enderecocomprador' },
                  { label: 'COMPLEMENTO', value: 'complementocomprador' },
                  { label: 'MUNICIPÍO', value: 'municipiocomprador' },
                  { label: 'E-MAIL', value: 'emailcomprador' },
                  { label: 'CEL/TEL', value: 'celtelcomprador' },
                  { label: 'CEP', value: 'cepcomprador' },
                ].map((field) => (
                  <Grid item xs={12} key={field.value}>
                    <TextField
                      label={field.label}
                      value={newItem[field.value as keyof Item] || ''}
                      onChange={(e) => setNewItem({ ...newItem, [field.value]: e.target.value })}
                      fullWidth
                      variant="outlined"
                      InputProps={{ className: classes.textField }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Identificação Da Empresa */}
            <Grid item xs={12} md={3}>
              <Typography className={classes.title}>Identificação Da Empresa</Typography>
              <Grid container spacing={1}>
                {[
                  { label: 'Nome Empresa', value: 'nomeempresa' },
                  { label: 'CNPJ', value: 'cnpjempresa' },
                ].map((field) => (
                  <Grid item xs={12} key={field.value}>
                    <TextField
                      label={field.label}
                      value={newItem[field.value as keyof Item] || ''}
                      onChange={(e) => setNewItem({ ...newItem, [field.value]: e.target.value })}
                      fullWidth
                      variant="outlined"
                      InputProps={{ className: classes.textField }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          {shouldShowAddItemButton && (
            <Grid container justifyContent="center" alignItems="center" spacing={3}>
              <Grid item>
                <Button
                  onClick={handleAddItem}
                  variant="contained"
                  size="large"
                  className={classes.button}
                >
                  Adicionar Requerimento
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
