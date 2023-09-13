import React, { useEffect, useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getFirestore, collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { app } from '../../../../logic/firebase/config/app';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
  },
  listItem: {
    marginBottom: theme.spacing(2),
  },
}));

const Cozinha: React.FC = () => {
  const classes = useStyles();
  const [pedidos, setPedidos] = useState<any[]>([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      const db = getFirestore(app); // Use getFirestore to create a Firestore instance
      
     
  const pedidosCollection = collection(db, 'Lojapedidos'); // Replace 'Lojapedidos' with your collection name
      const q = query(pedidosCollection, where('statuspedidos', '==', 'pendente'));
  
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedPedidos: any[] = [];

        snapshot.forEach((doc) => {
          fetchedPedidos.push({ id: doc.id, ...doc.data() });
        });

        setPedidos(fetchedPedidos);
      });

      return () => {
        unsubscribe();
      };
    };

    fetchPedidos();
  }, []);

  const marcarComoPronto = async (pedidoId: string) => {
    const db = getFirestore(app); // Use getFirestore to create a Firestore instance
    const pedidosCollection = collection(db, 'Lojapedidos'); // Replace 'Lojapedidos' with your collection name
    const pedidoRef = doc(pedidosCollection, pedidoId);
  
    
  
  await updateDoc(pedidoRef, { status: 'pronto' }); // Replace 'status' with the field that represents the status of the pedido in your database
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Pedidos no Pacote
      </Typography>
      <List>
        {pedidos.map((pedido) => (
          <ListItem key={pedido.id} className={classes.listItem}>
            <ListItemText
              primary={`Pedido ${pedido.id}`}
              secondary={`Status: ${pedido.status}`} // Substitua 'status' pelo campo que representa o status do pedido no seu banco de dados
            />
            <ListItemSecondaryAction>
              <Button
                onClick={() => marcarComoPronto(pedido.id)}
                variant="contained"
                color="primary"
              >
                Marcar como Pronto
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
  
};

export default Cozinha;
