import React, { useEffect, useState, PropsWithChildren } from 'react';
import { Typography, TextField, Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { collection, getFirestore, onSnapshot, deleteDoc, doc, updateDoc, getDocs, where, query } from 'firebase/firestore';
import { app } from '../../../../logic/firebase/config/app';
import Colecao from '../../../../logic/firebase/db/Colecao';
import Autenticacao from '../../../../logic/firebase/auth/Autenticacao';

import { motion, useMotionTemplate, useSpring } from 'framer-motion';
import Usuario from '../../../../logic/core/usuario/Usuario';

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
  item: {

    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  concluido: {

    backgroundColor: '#D1FFD0',
  },
  pendente: {
    backgroundColor: '#FFD1D1',
    animation: 'pulse 1s infinite',
  },
  button: {

    backgroundColor: '#00FF00',
    color: 'black',
  },

  buttonPendente: {
    backgroundColor: '#FF0000',
    color: 'black',
  },
  '@keyframes pulse': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.5,
    },
    '100%': {
      opacity: 1,
    },
  },
}));

const db = getFirestore(app);
const itemsCollectionRef = collection(db, 'FooditemsCardapio');

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

}

interface ItemListProps {
  items: Item[];
}

const Card: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {

  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div
      onMouseMove={onMouseMove}
      className="overflow-hidden relative duration-700 border rounded-xl hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 border-zinc-600"
    >
      <div className="pointer-events-none">
        <div className="absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
        <motion.div
          className="absolute inset-0 z-10 bg-gradient-to-br opacity-100 via-zinc-100/10 transition duration-1000 group-hover:opacity-50"
          style={style}
        />
        <motion.div
          className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
          style={style}
        />
      </div>
      {children}
    </div>
  );
};

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  const classes = useStyles();
  const [updatedItems, setUpdatedItems] = useState<Item[]>(items);
  const [searchText, setSearchText] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const colecao = new Colecao();
  const autenticacao = new Autenticacao();
  const [user, setUser] = useState<Usuario | null>(null);


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
          fetchedItems.push({
            id: doc.id,
            cliente: doc.data().cliente,
            total: doc.data().total,
            status: doc.data().status,
            nome: doc.data().nome,
            quantidade: doc.data().quantidade,
            mesa: doc.data().mesa,
            concluido: doc.data().concluido,
            userId: doc.data().userId,
            unidadevalor: doc.data().unidadevalor,
            
          });
        });

        setUpdatedItems(fetchedItems);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchText('');
    const fetchedItems: Item[] = [];

    if (user) {
      const userItemsQuery = query(
        itemsCollectionRef,
        where('userId', '==', user.id),
        where('nome', '>=', searchText.toLowerCase()),
        where('nome', '<=', searchText.toLowerCase() + '\uf8ff')
      );

      getDocs(userItemsQuery).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          fetchedItems.push({
            id: doc.id,
            cliente: doc.data().cliente,
            total: doc.data().total,
            status: doc.data().status,
            nome: doc.data().nome,
            quantidade: doc.data().quantidade,
            mesa: doc.data().mesa,
            concluido: doc.data().concluido,
            userId: doc.data().userId,
            unidadevalor: doc.data().unidadevalor,
          });
        });
        setUpdatedItems(fetchedItems);
      });
    } else {
      getDocs(itemsCollectionRef).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          fetchedItems.push({
            id: doc.id,
            cliente: doc.data().cliente,
            total: doc.data().total,
            status: doc.data().status,
            nome: doc.data().nome,
            quantidade: doc.data().quantidade,
            mesa: doc.data().mesa,
            concluido: doc.data().concluido,
            userId: doc.data().userId,
            unidadevalor: doc.data().unidadevalor,
          });
        });
        setUpdatedItems(fetchedItems);
      });
    }
  };

  const handleSearch = async () => {
    try {
      const fetchedItems: Item[] = [];

      if (user) {
        const userItemsQuery = query(
          itemsCollectionRef,
          where('userId', '==', user.id),
          where('nome', '>=', searchText.toLowerCase()),
          where('nome', '<=', searchText.toLowerCase() + '\uf8ff')
        );

        const querySnapshot = await getDocs(userItemsQuery);
        querySnapshot.forEach((doc) => {
          fetchedItems.push({
            id: doc.id,
            cliente: doc.data().cliente,
            total: doc.data().total,
            status: doc.data().status,
            nome: doc.data().nome,
            quantidade: doc.data().quantidade,
            mesa: doc.data().mesa,
            concluido: doc.data().concluido,
            userId: doc.data().userId,
            unidadevalor: doc.data().unidadevalor,
          });
        });
        setUpdatedItems(fetchedItems);
      } else {
        const querySnapshot = await getDocs(itemsCollectionRef);
        querySnapshot.forEach((doc) => {
          fetchedItems.push({
            id: doc.id,
            cliente: doc.data().cliente,
            total: doc.data().total,
            status: doc.data().status,
            nome: doc.data().nome,
            quantidade: doc.data().quantidade,
            mesa: doc.data().mesa,
            concluido: doc.data().concluido,
            userId: doc.data().userId,
            unidadevalor: doc.data().unidadevalor,  
          });
        });

        const filteredItems = fetchedItems.filter((item) => {
          const searchTextLower = searchText.toLowerCase();
          return (
            item.id.toLowerCase().includes(searchTextLower) ||
            item.cliente.toLowerCase().includes(searchTextLower) ||
            item.status.toLowerCase().includes(searchTextLower) ||
            item.nome.toLowerCase().includes(searchTextLower) ||
            item.mesa.toLowerCase().includes(searchTextLower) ||
            item.userId.toLowerCase().includes(searchTextLower) ||
            item.total.toString().includes(searchText) || // Filtro numérico, sem toLowerCase()
            item.quantidade.toString().includes(searchText) || // Filtro numérico, sem toLowerCase()
            item.unidadevalor.toString().includes(searchText) // Filtro numérico, sem toLowerCase()
          );
        });
        
        setUpdatedItems(filteredItems);
      }
    } catch (error) {
      console.error('Erro ao buscar os itens:', error);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const editNome = async (itemId: string, newNome: string) => {
    try {
      await updateDoc(doc(itemsCollectionRef, itemId), { nome: newNome });
    } catch (error) {
      console.error('Erro ao editar o nome do item:', error);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await deleteDoc(doc(itemsCollectionRef, itemId));
    } catch (error) {
      console.error('Erro ao remover o produto:', error);
    }
  };

  

  const editValor = async (itemId: string, newValor: string) => {
    try {
      await updateDoc(doc(itemsCollectionRef, itemId), { valor: newValor });
    } catch (error) {
      console.error('Erro ao editar o local de compra do item:', error);
    }
  };

  const toggleConcluido = async (itemId: string) => {
    try {
      const itemToUpdate = updatedItems.find((item) => item.id === itemId);
      if (itemToUpdate) {
        const newConcluidoState = !itemToUpdate.concluido;
        await updateDoc(doc(itemsCollectionRef, itemId), { concluido: newConcluidoState });
      }
    } catch (error) {
      console.error('Erro ao alternar o estado de conclusão do item:', error);
    }
  };

  const salvarItems = async (itemId: string) => {
    try {
      const itemToSave = updatedItems.find((item) => item.id === itemId);
      if (itemToSave) {
        await colecao.salvar('FooditemsCardapio', itemToSave, itemId);
      }
    } catch (error) {
      console.error('Erro ao salvar o produto:', error);
    }
  };

  return (
    <div className="justify-center container mx-auto p-15">
      <Paper className={classes.root}>
        <Typography variant="h5" align="center" gutterBottom>
          Lista
        </Typography>
        {!isSearchOpen ? (
          <Button onClick={handleSearchOpen} variant="outlined" color="primary" className="mb-4">
            Busca
          </Button>
        ) : (
          <div className="flex mb-4">
            <TextField
              label="Buscar por nome ou local"
              value={searchText}
              onChange={handleSearchInputChange}
              variant="outlined"
              size="small"
              fullWidth
              className="mr-2"
            />
            <Button onClick={handleSearch} variant="contained" color="primary">
              Buscar
            </Button>
            <Button onClick={handleSearchClose} variant="outlined" color="secondary" className="ml-2">
              Fechar
            </Button>
          </div>
        )}

        {updatedItems.map((item) => (
          <Card key={item.id}>
            <Grid container spacing={4} className={`${classes.item} ${item.concluido ? classes.concluido : classes.pendente}`}>
            <Grid item xs={12} sm={4}>
                <TextField
                  label="ID"
                  value={item.id}
                  onChange={(e) => (item.id, e.target.value)}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Nome"
                  value={item.nome}
                  onChange={(e) => editNome(item.id, e.target.value)}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Valor de venda"
                  value={item.unidadevalor}
                  onChange={(e) => (item.id, e.target.value)}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              
              <Grid item xs={11} className="flex justify-end">
                <Button onClick={() => removeItem(item.id)} variant="contained" color="secondary" size="small" className="mr-2">
                  Remover
                </Button>
                <Button
                  onClick={() => toggleConcluido(item.id)}
                  variant="contained"
                  className={item.concluido ? classes.button : classes.buttonPendente}
                  size="small"
                >
                  {item.concluido ? 'Concluído' : 'Pendente'}
                </Button>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Paper>
    </div>
  );
};

export default ItemList;
