import React, { useState } from 'react';
import { TextField, Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ImageUploader from './imagen';
import Colecao from '../../../../../logic/firebase/db/Colecao';
import Item from './Item';
import styles from './ListPost.module.css';

const useStyles = makeStyles((theme) => ({
  form: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  uploaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  },
  grayInput: {
    backgroundColor: '#f5f5f5', 
    borderRadius: theme.shape.borderRadius, 
    '&:hover': {
      backgroundColor: '#eeeeee', 
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
    nome: '',
    quantidade: 0,
    mesa: '',
    tipo: '',
    concluido: false,
    userId: '',
    unidadevalor: 0,
   
    imagemUrls: [],
    garagem: '',
    cozinha: '',
    banheiro: '',
    dormitorio: '',
    sala: '',
  });

  const handleAddItem = async () => {
    try {
      const colecao = new Colecao();
      const itemSalvo = await colecao.salvar('ImobiliariaitemsCatalago', newItem);

      const adaptedItemSalvo: Item = {
        id: itemSalvo.id,
        cliente: itemSalvo.cliente,
        total: itemSalvo.total,
        status: itemSalvo.status,
        nome: itemSalvo.nome,
        quantidade: itemSalvo.quantidade,
        mesa: itemSalvo.mesa,
        tipo: itemSalvo.tipo,
        unidadevalor: itemSalvo.unidadevalor,
        concluido: itemSalvo.concluido,
        userId: itemSalvo.userId,
      
        imagemUrls: newItem.imagemUrls,
        garagem: itemSalvo.garagem,
        cozinha: itemSalvo.cozinha,
        banheiro: itemSalvo.banheiro,
        dormitorio: itemSalvo.dormitorio,
        sala: itemSalvo.id,
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
        garagem: '',
        cozinha: '',
        banheiro: '',
        dormitorio: '',
        sala: '',
        unidadevalor: 0,

        imagemUrls: ['', '', '', ''],
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
    <div>
      <Paper className={classes.paper}>
      <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="ID do Imovel"
              value={newItem.id}
              onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
              fullWidth
              variant="outlined"
              InputProps={{ className: classes.grayInput }} 
              />
          
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nome"
              value={newItem.nome}
              onChange={(e) => setNewItem({ ...newItem, nome: e.target.value })}
              fullWidth
              variant="outlined"
              InputProps={{ className: classes.grayInput }} 
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Quarto"
              value={newItem.dormitorio}
              onChange={(e) => setNewItem({ ...newItem, dormitorio: e.target.value })}
              fullWidth
              variant="outlined"
              InputProps={{ className: classes.grayInput }} 
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Banheiros"
              value={newItem.banheiro}
              onChange={(e) => setNewItem({ ...newItem, banheiro: e.target.value })}
              fullWidth
              variant="outlined"
              InputProps={{ className: classes.grayInput }} 
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Salas"
              value={newItem.sala}
              onChange={(e) => setNewItem({ ...newItem, sala: e.target.value })}
              fullWidth
              variant="outlined"
              InputProps={{ className: classes.grayInput }} 
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Cozinhas"
              value={newItem.cozinha}
              onChange={(e) => setNewItem({ ...newItem, cozinha: e.target.value })}
              fullWidth
              variant="outlined"
              InputProps={{ className: classes.grayInput }} 
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Garagens"
              value={newItem.garagem}
              onChange={(e) => setNewItem({ ...newItem, garagem: e.target.value })}
              fullWidth
              variant="outlined"
              InputProps={{ className: classes.grayInput }} 
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Tipo de Imoveis"
              value={newItem.tipo}
              onChange={(e) => setNewItem({ ...newItem, tipo: e.target.value })}
              variant="outlined"
              InputProps={{ className: classes.grayInput }} 
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Valor de Venda"
              type="number"
              value={newItem.unidadevalor}
              onChange={(e) => setNewItem({ ...newItem, unidadevalor: parseFloat(e.target.value) })}
              fullWidth
              variant="outlined"
              InputProps={{ className: classes.grayInput }} 
            />
          </Grid>
          {shouldShowAddItemButton && (
            <Grid item xs={12} sm={6}>
              <Button
                onClick={handleAddItem}
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                className={classes.button}
              >
                Adicionar o Imovel
              </Button>
            </Grid>
          )}
        </Grid>
      </Paper>
      <div className={classes.uploaderContainer}>
        {shouldShowImageUploader && (
          <ImageUploader
            item={newItem}
            onImageUpload={(imageUrl) => handleImageUpload(imageUrl, newItem.imagemUrls.length)}
          />
        )}
      </div>
    </div>
  );
};

export default ListPost;
