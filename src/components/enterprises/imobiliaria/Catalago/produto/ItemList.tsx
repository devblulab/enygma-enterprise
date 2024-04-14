import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Grid, Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { collection, getFirestore, onSnapshot, deleteDoc, doc, updateDoc, getDocs, where, query } from 'firebase/firestore';
import { app } from '../../../../../logic/firebase/config/app';
import Colecao from '../../../../../logic/firebase/db/Colecao';
import Autenticacao from '@/logic/firebase/auth/Autenticacao';
import Usuario from '../../../../../logic/core/usuario/Usuario';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    borderRadius: theme.spacing(2),
    margin: theme.spacing(2, 'auto'),
    maxWidth: '100%',
  },
  item: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    border: '1px solid #ddd',
    borderRadius: theme.spacing(1),
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '200px', // Altura máxima desejada para a imagem
  },
}));

const db = getFirestore(app);
const itemsCollectionRef = collection(db, 'ImobiliariaitemsCatalago');

interface Item {
  id: string;
  cliente: string;
  total: number;
  status: string;
  nome: string;
  quantidade: number;
  mesa: string;
  concluido: boolean;
  userId: string;
  unidadevalor: number;
  imagemUrl: string;
  tipo: string,
}

interface ItemListProps {
  items: Item[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  const classes = useStyles();
  const [updatedItems, setUpdatedItems] = useState<Item[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [user, setUser] = useState<Usuario | null>(null);
  const colecao = new Colecao();
  const autenticacao = new Autenticacao();

  useEffect(() => {
    const cancelarMonitoramento = autenticacao.monitorar((usuario) => {
      setUser(usuario);
    });

    return () => {
      cancelarMonitoramento();
    };
  }, []);

  useEffect(() => {
    if (user) {
      const userItemsQuery = query(itemsCollectionRef, where('userId', '==', user.id));
      const unsubscribe = onSnapshot(userItemsQuery, (querySnapshot) => {
        const fetchedItems: Item[] = [];
        querySnapshot.forEach((doc) => {
          fetchedItems.push(doc.data() as Item);
        });

        setUpdatedItems(fetchedItems);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const handleSearch = async (searchText: string) => {
    try {
      const fetchedItems: Item[] = [];

      if (user) {
        const userItemsQuery = query(
          itemsCollectionRef,
          where('userId', '==', user.id)
        );

        const querySnapshot = await getDocs(userItemsQuery);
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Item;
          if (
            data.id.toLowerCase().includes(searchText.toLowerCase()) ||
            data.nome.toLowerCase().includes(searchText.toLowerCase()) ||
            data.tipo.toLowerCase().includes(searchText.toLowerCase()) 
        
          ) {
            fetchedItems.push(data);
          }
        });
      } else {
        const querySnapshot = await getDocs(itemsCollectionRef);
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Item;
          if (
            data.id.toLowerCase().includes(searchText.toLowerCase()) ||
            data.nome.toLowerCase().includes(searchText.toLowerCase()) ||
            data.tipo.toLowerCase().includes(searchText.toLowerCase()) 
            
          ) {
            fetchedItems.push(data);
          }
        });
      }

      setUpdatedItems(fetchedItems);
    } catch (error) {
      console.error('Erro ao buscar os itens:', error);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    handleSearch(searchText);
  };

  const editItem = async (itemId: string, newData: Partial<Item>) => {
    try {
      await updateDoc(doc(itemsCollectionRef, itemId), newData);
    } catch (error) {
      console.error('Erro ao editar o item:', error);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await deleteDoc(doc(itemsCollectionRef, itemId));
    } catch (error) {
      console.error('Erro ao remover o item:', error);
    }
  };

  return (
    <Container>
      <Paper className={classes.root}>
        <Typography variant="h5" align="center" gutterBottom>
          Lista de Imoveis
        </Typography>
        <TextField
          label="Buscar Item"
          value={searchText}
          onChange={handleSearchInputChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Grid container spacing={2}>
          {updatedItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Paper className={classes.item}>
                <Typography variant="subtitle1" gutterBottom>
                  ID: {item.id}
                </Typography>
                <div className={classes.imageContainer}>
                  <img src={item.imagemUrl} alt={`Thumbnail-${item.id}`} className={classes.image} />
                </div>
                <TextField
                  label="Nome"
                  value={item.nome}
                  onChange={(e) => editItem(item.id, { nome: e.target.value })}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Tipo"
                  value={item.tipo}
                  onChange={(e) => editItem(item.id, { tipo: e.target.value })}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Valor"
                  type="number"
                  value={item.unidadevalor}
                  onChange={(e) => editItem(item.id, { unidadevalor: parseFloat(e.target.value) })}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => removeItem(item.id)}
                  style={{ marginTop: 8 }}
                >
                  Remover
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default ItemList;
