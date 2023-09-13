import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  getDocs,
  deleteDoc,
  updateDoc,
  where,
  Timestamp,
  doc,
} from 'firebase/firestore';
import { app } from '../../../../logic/firebase/config/app';
import { DeleteOutline } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
    marginTop: theme.spacing(4),
    maxWidth: '500px',
  },
  pedido: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  concluido: {
    backgroundColor: '#D1FFD0',
  },

  pedidoContent: {
    flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
  
  },
  pendente: {
    backgroundColor: '#FFD1D1',
    animation: 'pulse 1s infinite',
  },
  pago: {
    backgroundColor: '#FFD233',
    animation: 'pulse 1s infinite',
  },
  button: {
    backgroundColor: '#00FF00',
    color: 'black',
  },
  statusButton: {
    width: '100px', // Defina a largura desejada
  },
}));

const db = getFirestore(app);
const pedidosCollectionRef = collection(db, 'pedidos');

interface Pedido {
  idpedido: string;
  cliente: string;
  total: number;
  status: string;
  mesa: string;
  idcard: number;
  item: {
    id: string;
    status: string;
    nome: string;
    quantidade: number;
    mesa: string;
    concluido: boolean;
    userId: string;
    unidadevalor: number;
    timestamp: Timestamp;
  };
}

const Todospedios = () => {
  const classes = useStyles();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [statusMesa, setStatusMesa] = useState<string>('');

  useEffect(() => {
    const pedidosQuery = query(pedidosCollectionRef, where('status', '==', 'concluido'));
  const unsubscribe = onSnapshot(pedidosQuery, (querySnapshot) => {
    const fetchedPedidos: Pedido[] = []; // Remove a redeclaração aqui
    querySnapshot.forEach((doc) => {
      const pedidoData = doc.data();
      fetchedPedidos.push({
             idpedido: doc.id,
             cliente: pedidoData.cliente,
             total: pedidoData.total,
             status: pedidoData.status,
             mesa: pedidoData.mesa,
             idcard: pedidoData.idcard,
             item: {
               id: pedidoData.item.id,
               status: pedidoData.item.status,
               nome: pedidoData.item.nome,
               quantidade: pedidoData.item.quantidade,
               mesa: pedidoData.item.mesa,
               concluido: pedidoData.item.concluido,
               userId: pedidoData.item.userId,
               unidadevalor: pedidoData.item.unidadevalor,
               timestamp: pedidoData.item.timestamp,
             },
           });
         });
         setPedidos(fetchedPedidos);
   
         if (fetchedPedidos.length > 0) {
           setStatusMesa(fetchedPedidos[0].mesa);
         } else {
           setStatusMesa(''); 
         }
       
       });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleUpdateStatus = async (idcard: number, newStatus: string) => {
    try {
      const q = query(pedidosCollectionRef, where('idcard', '==', idcard));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        await updateDoc(doc(pedidosCollectionRef, docId), { status: newStatus });
        console.log('Status do pedido atualizado com sucesso!');
      } else {
        console.error('Pedido não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o status do pedido:', error);
    }
  };

  const handleDeletePedido = async (idcard: number) => {
    try {
      const q = query(pedidosCollectionRef, where('idcard', '==', idcard));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        await deleteDoc(doc(pedidosCollectionRef, docId));
        console.log('Pedido removido com sucesso!');
      } else {
        console.error('Pedido não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao remover o pedido:', error);
    }
  };

  return (
    <div className="justify-center container mx-auto p-15">
      <Paper className={classes.root}>
        <Typography variant="h5" align="center" gutterBottom>
          Todos os Pedidos
        </Typography>
        {pedidos.map((pedido) => (
          <Paper
            key={pedido.idpedido}
            className={`${classes.pedido} ${
              pedido.status === 'concluido'
                ? classes.concluido
                : pedido.status === 'pago'
                ? classes.pago
                : classes.pendente
            }`}
          >
            <Typography variant="subtitle1" gutterBottom className={classes.pedidoContent}>
              Nome: {pedido.idpedido}
            </Typography>
            <Typography variant="body1" gutterBottom className={classes.pedidoContent}>
              Cliente: {pedido.cliente}
            </Typography>
            <Typography variant="body1" gutterBottom className={classes.pedidoContent}>
              Status: {pedido.status}
            </Typography>
            <Typography variant="body1" gutterBottom className={classes.pedidoContent}>
            Hora: {pedido.item.timestamp.toDate().toLocaleTimeString()}
            </Typography>
            <IconButton onClick={() => handleDeletePedido(pedido.idcard)} size="small">
              <DeleteOutline />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={`${classes.button} ${classes.statusButton}`}
              onClick={() => handleUpdateStatus(pedido.idcard, 'concluido')}
            >
              Concluir
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              className={`${classes.button} ${classes.statusButton}`}
              onClick={() => handleUpdateStatus(pedido.idcard, 'pendente')}
            >
              Pendente
            </Button>
            <Button
              variant="contained"
              size="small"
              className={`${classes.button} ${classes.statusButton}`}
              onClick={() => handleUpdateStatus(pedido.idcard, 'pago')}
            >
              Pago
            </Button>
          </Paper>
        ))}
      </Paper>
    </div>
  );
};

export default Todospedios;
