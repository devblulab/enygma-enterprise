import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { collection, doc, getDoc, getFirestore, getDocs } from 'firebase/firestore';
import { app } from '../../../logic/firebase/config/app';
import Autenticacao from '../../../logic/firebase/auth/Autenticacao';
import Usuario from '../../../logic/core/usuario/Usuario';
import Link from 'next/link';
import Mesas from './MesasCaixa';
import { motion } from 'framer-motion';
import Mesastodas from '../Garcom/PedidoLista';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    background: 'linear-gradient(to right, #25274D, #10344636)',
    color: 'white',
    borderRadius: theme.spacing(2),
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  // ... outros estilos
  blackButton: {
    backgroundColor: 'black', // Defina a cor preta para os botões
    color: 'white',
    fontSize: '16px', // Tamanho da fonte
    padding: '10px 20px', // Espaçamento interno do botão
    border: 'none', // Remova a borda padrão
    borderRadius: '4px', // Borda arredondada
    cursor: 'pointer', // Cursor de mão ao passar o mouse
    transition: 'background-color 0.3s, transform 0.3s', // Transição suave nas mudanças de cor e escala
    '&:hover': {
      backgroundColor: '#333', // Cor mais escura quando o botão for hover
      transform: 'scale(1.05)', // Efeito de escala ao passar o mouse
    },
  },
}));

const db = getFirestore(app);
const itemsCollectionRef = collection(db, 'FooditemsCardapio');
const pedidoDocRef = doc(db, 'Foodpedidos', 'pedidoId'); // Substitua 'pedidoId' pelo ID do pedido atual

// ... restante do código

const CaixaPage: React.FC = () => {
  const classes = useStyles();
  // ... restante do código

  return (
    <div className="justify-center container mx-auto p-15">
      <Paper className={classes.root}>
        <Typography variant="h5" align="center" gutterBottom>
          Caixa
        </Typography>
        <Grid container spacing={4}>
         
        </Grid>
       
        <Link href="/ifood/caixa/produtos" passHref>
  <motion.button
    whileHover={{ scale: 1.05 }}
    className={`${classes.blackButton}`} 
  >
    Adicionar Produtos
  </motion.button>
</Link>
<Link href="/ifood/caixa/todasmesas" passHref>
  <motion.button
    whileHover={{ scale: 1.05 }}
    className={`${classes.blackButton}`} 
  >
    Todas Mesas
  </motion.button>
</Link>

      </Paper>
      <Mesastodas/>
      <Mesas />
    </div>
  );
};

export default CaixaPage;
