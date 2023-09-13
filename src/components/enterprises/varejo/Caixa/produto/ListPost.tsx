import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Colecao from '../../../../../logic/firebase/db/Colecao';
import Item from './Item';
import styles from './ListPost.module.css';
import Autenticacao, { MonitorarUsuario, CancelarMonitoramento } from '../../../../../logic/firebase/auth/Autenticacao';

const autenticacao = new Autenticacao();

const useStyles = makeStyles((theme) => ({
  form: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

interface ListPostProps {
  setItems: (items: Item[]) => void;
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
    concluido: false,
    userId: '',
    unidadevalor: 0,
    selected: false,
    

  });

  

  const handleAddItem = async () => {
    try {
      const usuarioLogado = autenticacao.obterUsuarioLogado();
  
      if (usuarioLogado) {
        // Salvar o novo item no Firestore com o ID do usuário logado
        const colecao = new Colecao();
        const itemSalvo = await colecao.salvar('EstoqueitensLoja', {
          ...newItem,
          userId: usuarioLogado.id,
        });
        const adaptedItemSalvo: Item = {
          id: itemSalvo.id,
          cliente: itemSalvo.cliente,
          total: itemSalvo.total,
          status: itemSalvo.status, // Adicione essa linha para incluir a propriedade 'status'
          nome: itemSalvo.nome,
          quantidade: itemSalvo.quantidade,
          mesa: itemSalvo.mesa,
          unidadevalor: itemSalvo.unidadevalor,
          concluido: itemSalvo.concluido,
          userId: itemSalvo.userId,
          selected: itemSalvo.selected,
        };
        
    
        setNewItem({
          id: '',
          cliente: '',
          total: 0,
          status: '',
          nome: '',
          quantidade: 0,
          mesa: '',
          concluido: false,
          userId: '',
          unidadevalor: 0,
          selected: false,
        });
        
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
  label="Valor de Venda"
  type="number"
  value={newItem.unidadevalor}
  onChange={(e) => setNewItem({ ...newItem, unidadevalor: parseFloat(e.target.value)  })} 
  fullWidth
  variant="outlined"
/>
          </Grid>
          
        </Grid>
        <Button onClick={handleAddItem} variant="contained" color="primary" size="large" fullWidth>
          Adicionar Item
        </Button>
      </Paper>
    </div>
  );
};


export default ListPost;



