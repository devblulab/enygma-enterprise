import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ImageUploader from './imagen';
import Colecao from '../../../../../logic/firebase/db/Colecao';
import Item from './Item';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    margin: '0 auto',
    maxWidth: '900px',
  },
  paper: {
    padding: theme.spacing(4), // Reduzir o padding
    marginBottom: theme.spacing(4), // Reduzir o espaço inferior
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #ffffff, #f5f5f5)',
    fontFamily: 'Cinzel, serif',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
  },
  title: {
    marginBottom: 0, // Remover a margem inferior
    fontSize: '2rem',
    fontWeight: 'bold',
    fontFamily: 'Cinzel, serif',
    color: '#000',
    textAlign: 'center',
  },
  textField: {
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    border: '1px solid #d1d1d1',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
    '& input': {
      fontSize: '16px',
      fontWeight: 500,
    },
  },
  button: {
    marginTop: theme.spacing(1), // Aumentar o espaçamento entre campos e botão
    padding: theme.spacing(1.5),
    backgroundColor: '#34495e',
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Cinzel, serif',
    borderRadius: '8px',
    textTransform: 'uppercase',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#2c3e50',
    },
  },
  uploaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Cinzel, serif',
    alignItems: 'center',
    height: '20vh',
    marginTop: theme.spacing(3), // Diminuir a margem superior
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
    nome: '',
    quantidade: 0,
    mesa: '',
    tipo: '',
    concluido: false,
    userId: '',
    unidadevalor: 0,
    localizacao: '',
    metros: '',
    terreno: '',
    bairo: '',
    imagemUrls: [],
    garagem: '',
    cozinha: '',
    banheiro: '',
    dormitorio: '',
    sala: '',
  });

  const validateMapsLink = (link: string): boolean => {
    const regex = /^(https?:\/\/)?(www\.)?google\.com\/maps/;
    return regex.test(link);
  };

  const handleLocalizacaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLocalizacao = e.target.value;
    if (validateMapsLink(newLocalizacao)) {
      setNewItem({ ...newItem, localizacao: newLocalizacao });
    } else {
      alert('Por favor, insira um link válido do Google Maps.');
    }
  };

  const handleAddItem = async () => {
    try {
      const colecao = new Colecao();
      const itemSalvo = await colecao.salvar('ImobiliariaitemsCatalago', newItem);

      const adaptedItemSalvo: Item = {
        ...newItem,
        id: itemSalvo.id,
      };

      setNewItem({
        id: '',
        cliente: '',
        total: 0,
        status: '',
        nome: '',
        quantidade: 0,
        mesa: '',
        tipo: '',
        concluido: false,
        userId: '',
        unidadevalor: 0,
        localizacao: '',
        metros: '',
        terreno: '',
        bairo: '',
        imagemUrls: ['', '', '', ''],
        garagem: '',
        cozinha: '',
        banheiro: '',
        dormitorio: '',
        sala: '',
      });

      setItems((prevItems) => [...prevItems, adaptedItemSalvo]);
    } catch (error) {
      console.error('Erro ao adicionar o item:', error);
    }
  };

  const handleImageUpload = (imageUrl: string, index: number) => {
    const updatedUrls = [...newItem.imagemUrls];
    updatedUrls[index] = imageUrl;
    setNewItem({ ...newItem, imagemUrls: updatedUrls });
  };

  const shouldShowImageUploader = newItem.imagemUrls.length < 4;
  const shouldShowAddItemButton = newItem.imagemUrls.length === 4;

  return (
    <div className={classes.formContainer}>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>Adicionar Novo Imóvel</Typography>
        <div className={classes.uploaderContainer}>
          {shouldShowImageUploader && (
            <ImageUploader
              item={newItem}
              onImageUpload={(imageUrl) => handleImageUpload(imageUrl, newItem.imagemUrls.length)}
            />
          )}
        </div>
        <Grid container spacing={3}>
          {[
            { label: 'ID do Imóvel', value: 'id' },
            { label: 'Nome', value: 'nome' },
            { label: 'Bairro', value: 'bairo' },
            { label: 'Localização', value: 'localizacao', onChange: handleLocalizacaoChange },
            { label: 'Metros Construídos', value: 'metros' },
            { label: 'Metros Terreno', value: 'terreno' },
          ].map((field) => (
            <Grid item xs={12} sm={6} key={field.value}>
              <TextField
                label={field.label}
                value={newItem[field.value as keyof Item] || ''}
                onChange={field.onChange || ((e) => setNewItem({ ...newItem, [field.value]: e.target.value }))}
                fullWidth
                variant="outlined"
                InputProps={{ className: classes.textField }}
              />
            </Grid>
          ))}

          {[
            { label: 'Quartos', value: 'dormitorio' },
            { label: 'Banheiros', value: 'banheiro' },
            { label: 'Salas', value: 'sala' },
            { label: 'Cozinhas', value: 'cozinha' },
            { label: 'Garagens', value: 'garagem' },
            { label: 'Tipo de Imóvel', value: 'tipo' },
          ].map((field) => (
            <Grid item xs={12} sm={4} key={field.value}>
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

<Grid 
  container 
  style={{ height: '10vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
>
  <Grid item xs={12} sm={6}>
    <TextField
      label="Valor de Venda (R$)"
      type="number"
      value={newItem.unidadevalor || ''}
      onChange={(e) => setNewItem({ ...newItem, unidadevalor: parseFloat(e.target.value) || 0 })}
      fullWidth
      variant="outlined"
      InputProps={{ className: classes.textField }}
    />
  </Grid>
  
  </Grid>
{shouldShowAddItemButton && (
  <Grid 
    item 
    xs={12} 
    sm={6} 
    container 
    
  >
    <Button
      onClick={handleAddItem}
      variant="contained"
      size="large"
      className={classes.button}
    >
      Adicionar Imóvel
    </Button>
  </Grid>
)}
</Grid>

        
      </Paper>
    </div>
  );
};

export default ListPost;


