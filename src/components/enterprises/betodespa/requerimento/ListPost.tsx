import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Colecao from '../../../../logic/firebase/db/Colecao'; // Lógica do Firebase
import Item from './Item'; // Interface Item

const useStyles = makeStyles((theme) => ({
  formContainer: {
    margin: '0 auto',
    maxWidth: '900px',
  },
  paper: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #ffffff, #f5f5f5)',
    fontFamily: 'Cinzel, serif',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
  },
  title: {
    marginBottom: 0,
    fontSize: '2rem',
    fontWeight: 'bold',
    fontFamily: 'Cinzel, serif',
    
    color: '#000',
    textAlign: 'center',
  },
  textField: {
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    colo: 'black',
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
    marginTop: theme.spacing(1),
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
   
  
   
    
    
    imagemUrls: [],
   
   
    
   
    
    placa: '',
    renavam: '',
    crv: '',
    valordevenda: 0,
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
   
  
    
 
    
    
    
   
   
    
    
    
    placa: '',
    renavam: '',
    crv: '',
    valordevenda: 0,
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
    <div className={`${classes.formContainer} ${classes.noPrint}`}>
      <Paper className={classes.paper}>
        <Typography className={classes.title}>Criar Requerimento de Intenção de Venda</Typography>
        
        <Typography className={classes.title}>Identificação Do Veiculo</Typography>
        <Grid container spacing={3}>
          {[{ label: 'Placa', value: 'id' }, { label: 'Renavam', value: 'renavam' }, { label: 'CRV', value: 'crv' }, { label: 'Valor de Venda', value: 'valordevenda', type: 'number' },].map((field) => (
            <Grid item xs={12} sm={6} key={field.value}>
              <TextField
                label={field.label}
                value={newItem[field.value as keyof Item] || ''}
                onChange={ ((e) => setNewItem({ ...newItem, [field.value]: e.target.value }))}
                fullWidth
                variant="outlined"
                InputProps={{ className: classes.textField }}
              />
            </Grid>
          ))}

<Typography className={classes.title}>Identificação Do Vendedor</Typography>

{[{ label: 'Nome', value: 'nomevendedor' }, { label: 'CPF', value: 'cpfvendedor' }, { label: 'ENDEREÇO', value: 'enderecovendedor' }, { label: 'COMPLEMENTO', value: 'complementovendedor',  }, { label: 'MUNICIPÍO', value: 'municipiovendedor',  }, { label: 'E-MAIL', value: 'emailvendedor',  }].map((field) => (
           
           <Grid item xs={12} sm={6} key={field.value}>
              <TextField
                label={field.label}
                value={newItem[field.value as keyof Item] || ''}
                onChange={((e) => setNewItem({ ...newItem, [field.value]: e.target.value }))}
                fullWidth
                variant="outlined"
                InputProps={{ className: classes.textField }}
              />
            </Grid>
          ))}

<Typography className={classes.title}>Identificação Do Comprador</Typography>
          {[{ label: 'Nome', value: 'nomecomprador' }, { label: 'CPF', value: 'cpfcomprador' }, { label: 'ENDEREÇO', value: 'enderecocomprador' }, { label: 'COMPLEMENTO', value: 'complementocomprador',  }, { label: 'MUNICIPÍO', value: 'municipiocomprador',  }, { label: 'E-MAIL', value: 'emailcomprador',  }, { label: 'CEL/TEL', value: 'celtelcomprador',  }].map((field) => (
            <Grid item xs={12} sm={6} key={field.value}>
              <TextField
                label={field.label}
                value={newItem[field.value as keyof Item] || ''}
                onChange={ ((e) => setNewItem({ ...newItem, [field.value]: e.target.value }))}
                fullWidth
                variant="outlined"
                InputProps={{ className: classes.textField }}
              />
            </Grid>
          ))}

          { (
            <Grid item xs={12} sm={6}>
              <Button
                onClick={handleAddItem}
                variant="contained"
                size="large"
                className={classes.button}
              >
                Adicionar Requerimento
              </Button>
            </Grid>
          )}
        </Grid>
      </Paper>
    </div>
  );
};

export default ListPost;
