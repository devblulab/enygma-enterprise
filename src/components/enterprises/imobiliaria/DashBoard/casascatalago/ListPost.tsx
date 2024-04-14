import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ImageUploader from './imagen'; // Importa o novo componente
import Colecao from '../../../../../logic/firebase/db/Colecao';
import Item from './Item';
import styles from './ListPost.module.css';

const useStyles = makeStyles((theme) => ({
  form: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  card: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

interface ListPostProps {
  setItems: React.Dispatch<React.SetStateAction<Item[]>>; // Correção na tipagem
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
    userId: '', // Removido o userId relacionado ao usuário logado
    unidadevalor: 0,
    selected: false,
    imagemUrls: [], // Adiciona um array de 4 strings para os URLs das imagens
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
        selected: itemSalvo.selected,
        imagemUrls: newItem.imagemUrls, // Mantém os URLs das imagens
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
        userId: '', // Removido o userId relacionado ao usuário logado
        garagem: '',
        cozinha: '',
        banheiro: '',
        dormitorio: '',
        
        sala: '',
        unidadevalor: 0,
        selected: false,
        imagemUrls: ['', '', '', ''], // Limpa os URLs das imagens
      });

      setItems((prevItems) => [...prevItems, adaptedItemSalvo]);
    } catch (error) {
      console.error('Erro ao adicionar o item:', error);
    }
  };

  return (
    <div className={`${styles.container} ${classes.form} `}>
      <Paper className={classes.form}>
        <Typography variant="h5" align="center" gutterBottom>
          Adicione Imoveis
        </Typography>
        <Grid container spacing={2}>
       
          {[...Array(4)].map((_, index) => (
            <Grid item xs={12} sm={3} key={index}>
              <ImageUploader
                item={newItem}
                onImageUpload={(imageUrl) => {
                  const updatedUrls = [...newItem.imagemUrls];
                  updatedUrls[index] = imageUrl;
                  setNewItem({ ...newItem, imagemUrls: updatedUrls });
                }}
              />
            </Grid>
          ))}
         
          <Grid item xs={12} sm={4}>
            <TextField
              label="ID do Imovel"
              value={newItem.id}
              onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Quarto"
              value={newItem.dormitorio}
              onChange={(e) => setNewItem({ ...newItem, dormitorio: e.target.value })}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Banheiros"
              value={newItem.banheiro}
              onChange={(e) => setNewItem({ ...newItem, banheiro: e.target.value })}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Salas"
              value={newItem.sala}
              onChange={(e) => setNewItem({ ...newItem, sala: e.target.value })}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Cozinhas"
              value={newItem.cozinha}
              onChange={(e) => setNewItem({ ...newItem, cozinha: e.target.value })}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Garagens"
              value={newItem.garagem}
              onChange={(e) => setNewItem({ ...newItem, garagem: e.target.value })}
              fullWidth
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              label="Nome"
              value={newItem.nome}
              onChange={(e) => setNewItem({ ...newItem, nome: e.target.value })}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Tipo de Imoveis"
              value={newItem.tipo}
              onChange={(e) => setNewItem({ ...newItem, tipo: e.target.value })}
              variant="outlined"
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
            />
          </Grid>
        </Grid>

        <Button onClick={handleAddItem} variant="contained" color="primary" size="large" fullWidth>
          Adicionar o Imovel
        </Button>
      </Paper>
    </div>
  );
};

export default ListPost;
