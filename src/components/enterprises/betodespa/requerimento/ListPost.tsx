import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  TextField, Button, Grid, Paper, Typography, Box, IconButton, 
  Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery,
  CircularProgress, Divider
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { PhotoCamera, Delete, Close, Crop, CloudUpload, Print, Send } from '@material-ui/icons';
import Cropper from 'react-easy-crop';
import SignaturePad from './SingnaturePad';
import Colecao from '@/logic/firebase/db/Colecao';
import Item from './Item';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Timestamp } from 'firebase/firestore';
import { storage } from '@/logic/firebase/config/app';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getCroppedImg } from './cropUtils';
import debounce from '@/util/debounce';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0A1A2F 0%, #1E3A5F 100%)',
    padding: theme.spacing(3),
    color: '#E0E7FF',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1.5),
    },
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3.5),
    background: 'linear-gradient(145deg, rgba(30, 40, 60, 0.95) 0%, rgba(50, 70, 100, 0.85) 100%)',
    maxWidth: '95vw',
    margin: '0 auto',
    padding: theme.spacing(4),
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0, 10, 50, 0.3), inset 0 0 10px rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(8px)',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2.5),
      gap: theme.spacing(2.5),
    },
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(120deg, rgba(40, 50, 80, 0.9) 0%, rgba(10, 20, 40, 0.7) 100%)',
    alignItems: 'center',
    padding: theme.spacing(3),
    borderRadius: '20px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.2)',
    marginBottom: theme.spacing(4),
  },
  logo: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 0 15px rgba(100, 150, 255, 0.5)',
    marginBottom: theme.spacing(2),
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  title: {
    fontWeight: 800,
    fontSize: '2rem',
    color: '#fff',
    textAlign: 'center',
    background: 'linear-gradient(90deg, #5C7AEA 0%, #A3BFFA 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 2px 10px rgba(92, 122, 234, 0.5)',
    marginBottom: theme.spacing(1),
  },
  sectionTitle: {
    fontWeight: 700,
    color: '#D6E4FF',
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
    letterSpacing: '0.5px',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: '#E0E7FF',
      transition: 'all 0.3s ease',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#A3BFFA',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderWidth: '1px',
        borderColor: '#5C7AEA',
        boxShadow: '0 0 10px rgba(92, 122, 234, 0.5)',
      },
    },
    '& .MuiInputLabel-outlined': {
      color: 'rgba(255, 255, 255, 0.6)',
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
      color: '#A3BFFA',
    },
  },
  button: {
    borderRadius: '12px',
    padding: theme.spacing(1.75),
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
      transform: 'translateY(-2px)',
    },
  },
  primaryButton: {
    background: 'linear-gradient(90deg, #5C7AEA 0%, #A3BFFA 100%)',
    color: '#fff',
  },
  secondaryButton: {
    border: '1px solid #A3BFFA',
    color: '#A3BFFA',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  cameraButton: {
    marginLeft: theme.spacing(2),
    background: 'linear-gradient(90deg, #00C4B4 0%, #26A69A 100%)',
    color: '#fff',
    '&:hover': {
      background: 'linear-gradient(90deg, #00A896 0%, #00897B 100%)',
    },
  },
  previewContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
    border: '1px dashed rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.05)',
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '350px',
    borderRadius: '12px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  thumbnailContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2.5),
    marginTop: theme.spacing(2.5),
  },
  thumbnail: {
    position: 'relative',
    width: '110px',
    height: '110px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  actionButton: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '50%',
    padding: '4px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#fff',
      transform: 'scale(1.1)',
    },
  },
  deleteButton: {
    top: '6px',
    right: '6px',
    color: '#FF6B6B',
  },
  cropButton: {
    bottom: '6px',
    right: '6px',
    color: '#5C7AEA',
  },
  signatureContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(3),
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  dialogContent: {
    position: 'relative',
    height: '65vh',
    backgroundColor: '#0A1A2F',
    borderRadius: '16px',
    [theme.breakpoints.down('sm')]: {
      height: '55vh',
    },
  },
  cropControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(2.5),
    display: 'flex',
    justifyContent: 'center',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%)',
    zIndex: 1,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '120px',
    color: '#A3BFFA',
  },
  noPrint: {
    '@media print': {
      display: 'none !important',
    },
  },
}));

// Função para formatar CPF/CNPJ
const formatCpfCnpj = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  
  if (cleaned.length <= 11) {
    // Formata CPF (000.000.000-00)
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else {
    // Formata CNPJ (00.000.000/0000-00)
    return cleaned.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5'
    );
  }
};

// Função para validar CPF/CNPJ
const isValidCpfCnpj = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length === 11) {
    // Validação básica de CPF
    return /^\d{11}$/.test(cleaned);
  } else if (cleaned.length === 14) {
    // Validação básica de CNPJ
    return /^\d{14}$/.test(cleaned);
  }
  return false;
};

const ListPost: React.FC<{ setItems: React.Dispatch<React.SetStateAction<Item[]>> }> = ({ setItems }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
  const isTablet = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  
  const [files, setFiles] = useState<File[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cropOpen, setCropOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [newItem, setNewItem] = useState<Item>({
    id: '',
    cliente: '',
    status: 'Pendente',
    quantidade: 0,
    imagemUrls: [],
    concluido: false,
    placa: '',
    renavam: '',
    crv: '',
    valordevenda: '',
    nomevendedor: '',
    cpfvendedor: '',
    enderecovendedor: '',
    complementovendedor: '',
    municipiovendedor: '',
    emailvendedor: 'b3certificacao@gmail.com',
    bairrocomprador: '',
    nomecomprador: '',
    cpfcomprador: '',
    enderecocomprador: '',
    complementocomprador: '',
    municipiocomprador: '',
    emailcomprador: 'b3certificacao@gmail.com',
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

  // Camera handling
  useEffect(() => {
    if (cameraOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [cameraOpen]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Erro ao acessar a câmera:", err);
      alert("Não foi possível acessar a câmera. Por favor, verifique as permissões.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (!context) return;
      
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
          setFiles(prev => [...prev, file]);
          setCameraOpen(false);
        }
      }, 'image/jpeg', 0.9);
    }
  };

  // Image cropping
  const openCropDialog = (index: number) => {
    const file = files[index];
    const reader = new FileReader();
    reader.onload = () => {
      setImageToCrop(reader.result as string);
      setCurrentImageIndex(index);
      setCropOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const cropImage = async () => {
    try {
      if (!imageToCrop || currentImageIndex === null || !croppedAreaPixels) return;
      
      const croppedImage = await getCroppedImg(imageToCrop, croppedAreaPixels);
      const blob = await fetch(croppedImage).then(r => r.blob());
      const file = new File([blob], `cropped-${Date.now()}.jpg`, { type: 'image/jpeg' });
      
      setFiles(prev => prev.map((f, i) => i === currentImageIndex ? file : f));
      setCropOpen(false);
    } catch (e) {
      console.error('Erro ao cortar imagem:', e);
      alert('Ocorreu um erro ao processar a imagem. Por favor, tente novamente.');
    }
  };

  // Data handling
  const fetchEmpresaFromCNPJ = async (cnpj: string) => {
    try {
      const cnpjLimpo = cnpj.replace(/\D/g, '');
      if (cnpjLimpo.length !== 14) return;
  
      setIsLoading(true);
      const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjLimpo}`);
      if (!response.ok) throw new Error('CNPJ não encontrado');
  
      const data = await response.json();
      setNewItem(prev => ({
        ...prev,
        nomeempresa: data.razao_social || '',
      }));
    } catch (error) {
      console.error('Erro ao buscar CNPJ:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAddressFromCEP = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setNewItem((prev) => ({
          ...prev,
          enderecocomprador: data.logradouro,
          municipiocomprador: data.localidade,
          bairrocomprador: data.bairro,
          complementocomprador: data.uf,
        }));
      } else {
        console.error('CEP não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (): Promise<string[]> => {
    if (files.length === 0) return [];
    
    setIsLoading(true);
    try {
      const uploadPromises = files.map(file => {
        const storageRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
        return uploadBytes(storageRef, file)
          .then(snapshot => getDownloadURL(snapshot.ref));
      });

      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Form handling
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    const { value } = e.target;
  
    setNewItem(prev => {
      let updated = { ...prev, [field]: value };
  
      if (field === 'placa') {
        updated.id = value.toUpperCase();
      }
  
      if (field === 'cepcomprador' && value.replace(/\D/g, '').length === 8) {
        fetchAddressFromCEP(value);
      } else if (field === 'cnpjempresa' && value.replace(/\D/g, '').length === 14) {
        fetchEmpresaFromCNPJ(value);
      }
  
      return updated;
    });
  };
  
  const generatePreview = async () => {
    const input = document.getElementById('pdf-content');
    if (!input) return;

    try {
      const canvas = await html2canvas(input, { 
        scale: isMobile ? 1.5 : 2,
        useCORS: true,
        logging: false
      });
      setPreviewImage(canvas.toDataURL('image/png'));
    } catch (error) {
      console.error('Erro ao gerar pré-visualização:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      if (!newItem.id) {
        alert('ID do item não foi gerado corretamente. Por favor, recarregue a página.');
        return;
      }

      setIsLoading(true);
      
      const uploadedUrls = files.length > 0 ? await uploadFiles() : [];

      const colecao = new Colecao();
      const itemParaSalvar = {
        ...newItem,
        imagemUrls: uploadedUrls,
        dataCriacao: Timestamp.fromDate(new Date())
      };

      console.log('Salvando item:', itemParaSalvar);

      const itemSalvo = await colecao.salvar('Betodespachanteintrncaodevendaoficial', itemParaSalvar);
      
      setItems(prev => [...prev, { ...itemParaSalvar, id: itemSalvo.id }]);
      
      await generatePDF();
      resetForm();
      
      alert('Item adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setNewItem({
      id: '',
      cliente: '',
      status: 'Pendente',
      quantidade: 0,
      imagemUrls: [],
      concluido: false,
      placa: '',
      renavam: '',
      crv: '',
      valordevenda: '',
      nomevendedor: '',
      cpfvendedor: '',
      enderecovendedor: '',
      complementovendedor: '',
      municipiovendedor: '',
      emailvendedor: 'b3certificacao@gmail.com',
      bairrocomprador: '',
      nomecomprador: '',
      cpfcomprador: '',
      enderecocomprador: '',
      complementocomprador: '',
      municipiocomprador: '',
      emailcomprador: 'b3certificacao@gmail.com',
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
    setFiles([]);
    setPreviewImage(null);
  };

  const generatePDF = async () => {
    const input = document.getElementById('pdf-content');
    if (!input) return;

    try {
      const canvas = await html2canvas(input, { 
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Requerimento_${newItem.nomecomprador || 'documento'}.pdf`);

      await sendWhatsApp(URL.createObjectURL(pdf.output('blob')));
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    }
  };

  const sendWhatsApp = async (pdfURL: string) => {
    const telefone = newItem.celtelcomprador.replace(/\D/g, '') || '5548988449379';
    const mensagem = `Olá ${newItem.nomecomprador || 'Cliente'}, seu documento está pronto: ${pdfURL}`;
    window.open(`https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(mensagem)}`, '_blank');
  };

  // Action buttons
  const actionButtons = (
    <div className={classes.actionBar}>
      <Button
        onClick={generatePreview}
        variant="contained"
        className={`${classes.button} ${classes.secondaryButton}`}
        startIcon={<Print />}
      >
        Pré-visualizar
      </Button>
      <Button
        onClick={generatePDF}
        variant="contained"
        className={`${classes.button} ${classes.secondaryButton}`}
        startIcon={<Print />}
      >
        Gerar PDF
      </Button>
      <Button
        onClick={handleAddItem}
        variant="contained"
        className={`${classes.button} ${classes.primaryButton}`}
        startIcon={<Send />}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Enviar Requerimento'}
      </Button>
    </div>
  );

  return (
    <div className={`${classes.formContainer} ${classes.noPrint}`}>
      <Paper className={classes.formContainer}>
        <div className={classes.header}>
          <img src="/betologo.jpg" alt="Logo" className={classes.logo} />
          <Typography variant="h4" className={classes.title}>
            Requerimento de Intenção de Venda
          </Typography>
        </div>

        <Grid container spacing={3}>
          {/* Seção Veículo */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" className={classes.sectionTitle}>Identificação Do Veículo</Typography>
            {[
              { label: 'Placa', value: 'id' },
              { label: 'Renavam', value: 'renavam' },
              { label: 'CRV', value: 'crv' },
              { label: 'Valor de Venda ex 21.000', value: 'valordevenda', type: 'number' },
            ].map((field) => (
              <TextField
                key={field.value}
                label={field.label}
                value={newItem[field.value as keyof Item] || ''}
                onChange={(e) => handleInputChange(e, field.value)}
                fullWidth
                variant="outlined"
                className={classes.textField}
                margin="normal"
                type={field.type}
              />
            ))}
          </Grid>

          {/* Seção Vendedor */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" className={classes.sectionTitle}>Identificação Do Vendedor</Typography>
            {[
              { label: 'NOME', value: 'nomevendedor' },
              { label: 'CPF', value: 'cpfvendedor' },
            ].map((field) => (
              <TextField
                key={field.value}
                label={field.label}
                value={newItem[field.value as keyof Item] || ''}
                onChange={(e) => handleInputChange(e, field.value)}
                fullWidth
                variant="outlined"
                className={classes.textField}
                margin="normal"
              />
            ))}
          </Grid>

          {/* Seção Comprador */}
          <Grid item xs={12} md={6} lg={3}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Dados do Comprador
            </Typography>
            {[
              { label: 'NOME', value: 'nomecomprador' },
              { label: 'CPF', value: 'cpfcomprador' },
              { label: 'CEP', value: 'cepcomprador' },
              { label: 'ENDEREÇO/NUMERO', value: 'enderecocomprador' },
              { label: 'ESTADO', value: 'complementocomprador' },
              { label: 'MUNICÍPIO', value: 'municipiocomprador' },
              { label: 'BAIRRO', value: 'bairrocomprador' },
              { label: 'CEL/TEL', value: 'celtelcomprador' },
            ].map((field) => (
              <TextField
                key={field.value}
                label={field.label}
                value={newItem[field.value as keyof Item] || ''}
                onChange={(e) => handleInputChange(e, field.value)}
                fullWidth
                variant="outlined"
                className={classes.textField}
                margin="normal"
              />
            ))}
          </Grid>

          {/* Seção Empresa */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" className={classes.sectionTitle}>Solicitante</Typography>
            
            <TextField
              label="CPF/CNPJ"
              value={formatCpfCnpj(newItem.cnpjempresa || '')}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, '');
                handleInputChange({
                  ...e,
                  target: {
                    ...e.target,
                    value: rawValue
                  }
                }, 'cnpjempresa');
              }}
              fullWidth
              variant="outlined"
              className={classes.textField}
              margin="normal"
              error={!!newItem.cnpjempresa && !isValidCpfCnpj(newItem.cnpjempresa)}
              helperText={!!newItem.cnpjempresa && !isValidCpfCnpj(newItem.cnpjempresa) 
                ? 'CPF/CNPJ inválido' 
                : ''}
              InputProps={{
                endAdornment: isLoading && newItem.cnpjempresa?.length === 14 ? (
                  <CircularProgress size={24} />
                ) : null,
              }}
            />

            <TextField
              label="Nome"
              value={newItem.nomeempresa || ''}
              onChange={(e) => handleInputChange(e, 'nomeempresa')}
              fullWidth
              variant="outlined"
              className={classes.textField}
              margin="normal"
            />
          </Grid>

          {/* Seção Assinatura */}
          <Grid item xs={12}>
            <div className={classes.signatureContainer}>
              <Typography variant="h6" className={classes.sectionTitle}>
                Assinatura do Cliente
              </Typography>
              <SignaturePad onSave={(signature) => setNewItem(prev => ({ ...prev, signature }))} />
            </div>
          </Grid>

        {/* Seção Documentos */}
<Grid item xs={12}>
  <Typography variant="h6" className={classes.sectionTitle}>
    Anexar Documentos (Opcional)  
    <br />
    <span style={{ fontWeight: 'normal', fontSize: '0.9em' }}>
      Ex: Procuração...
    </span>
  </Typography>

  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
    {/* Input escondido de arquivos */}
    <input
      accept="image/*"
      style={{ display: 'none' }}
      id="file-upload"
      type="file"
      multiple
      onChange={handleFileChange}
    />

    {/* Botão de selecionar arquivos */}
    <label htmlFor="file-upload">
      <Button
        variant="contained"
        component="span"
        className={`${classes.button} ${classes.secondaryButton}`}
        startIcon={<CloudUpload />}
      >
        Selecionar Arquivos
      </Button>
    </label>

    {/* Botão de tirar foto */}
    <Button
      variant="contained"
      className={`${classes.button} ${classes.cameraButton}`}
      startIcon={<PhotoCamera />}
      onClick={() => setCameraOpen(true)}
    >
      Tirar Foto
    </Button>
  </div>
</Grid>
            {/* Miniaturas */}
            {files.length > 0 && (
              <div className={classes.thumbnailContainer}>
                {files.map((file, index) => (
                  <div key={index} className={classes.thumbnail}>
                    <img src={URL.createObjectURL(file)} alt={`Documento ${index}`} />
                    <IconButton
                      className={`${classes.actionButton} ${classes.deleteButton}`}
                      size="small"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                    <IconButton
                      className={`${classes.actionButton} ${classes.cropButton}`}
                      size="small"
                      onClick={() => openCropDialog(index)}
                    >
                      <Crop fontSize="small" />
                    </IconButton>
                  </div>
                ))}
              </div>
            )}
          </Grid>

          {/* Pré-visualização */}
          {previewImage && (
            <Grid item xs={12}>
              <div className={classes.previewContainer}>
                <Typography variant="h6" className={classes.sectionTitle}>
                  Pré-visualização do Documento
                </Typography>
                <img src={previewImage} alt="Pré-visualização" className={classes.previewImage} />
              </div>
            </Grid>
          )}
        </Grid>

        {/* Botões de ação */}
        <div className={classes.actionBar}>
          
          <Button
            onClick={handleAddItem}
            variant="contained"
            className={`${classes.button} ${classes.primaryButton}`}
            startIcon={<Send />}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Enviar Requerimento'}
          </Button>
        </div>
      </Paper>

      {/* Modal Câmera */}
      <Dialog open={cameraOpen} onClose={() => setCameraOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Tirar Foto</Typography>
            <IconButton onClick={() => setCameraOpen(false)}>
              <Close />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              width: '100%',
              height: isMobile ? '50vh' : '60vh',
              borderRadius: '8px',
              backgroundColor: '#000'
            }}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={takePhoto}
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            startIcon={<PhotoCamera />}
          >
            Capturar Foto
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Recorte */}
      <Dialog open={cropOpen} onClose={() => setCropOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Recortar Imagem</Typography>
            <IconButton onClick={() => setCropOpen(false)}>
              <Close />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Cropper
            image={imageToCrop || ''}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            style={{
              containerStyle: {
                width: '100%',
                height: '100%',
                position: 'relative',
                backgroundColor: '#f5f5f5'
              }
            }}
          />
          <div className={classes.cropControls}>
            <Button
              onClick={() => setCropOpen(false)}
              variant="outlined"
              color="secondary"
              style={{ marginRight: '16px' }}
            >
              Cancelar
            </Button>
            <Button
              onClick={cropImage}
              variant="contained"
              color="primary"
            >
              Aplicar Recorte
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListPost;
