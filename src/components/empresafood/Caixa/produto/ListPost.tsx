import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ImageUploader from './imagen'; // Importa o novo componente
import Colecao from '../../../../logic/firebase/db/Colecao';
import Item from './Item';
import styles from './ListPost.module.css';
import Autenticacao, { MonitorarUsuario, CancelarMonitoramento } from '@/logic/firebase/auth/Autenticacao';

const autenticacao = new Autenticacao();

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
    userId: '',
    unidadevalor: 0,
    selected: false,
    imagemUrl: '',
  });

  const handleAddItem = async () => {
    try {
      const usuarioLogado = autenticacao.obterUsuarioLogado();

      if (usuarioLogado) {
        const colecao = new Colecao();
        const itemSalvo = await colecao.salvar('FooditemsCardapio', {
          ...newItem,
          userId: usuarioLogado.id,
        });

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
          imagemUrl: newItem.imagemUrl || '',
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
          selected: false,
          imagemUrl: '',
        });

        setItems((prevItems) => [...prevItems, adaptedItemSalvo]);
      }
    } catch (error) {
      console.error('Erro ao adicionar o item:', error);
    }
  };

  return (
    <div className={`${styles.container} ${classes.form} `}>
      <Paper className={classes.form}>
        <Typography variant="h5" align="center" gutterBottom>
          Adicione Item
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="ID do Item"
              value={newItem.id}
              onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
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
              label="Tipo de Item"
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
          Adicionar Item
        </Button>
        <ImageUploader item={newItem} onImageUpload={(imageUrl) => setNewItem({ ...newItem, imagemUrl: imageUrl })} />
      </Paper>
    </div>
  );
};

export default ListPost;
