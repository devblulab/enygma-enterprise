import React, { useEffect, useState } from 'react';
import { Typography, Button, Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { collection, getFirestore, onSnapshot, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { app } from '../../../../../../logic/firebase/config/app';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
    margin: theme.spacing(2, 'auto'),
    maxWidth: '100%',
    height: '400px', // Altura fixa para o Paper
  },
  imageContainer: {
    width: '100%',
    height: '100%', // Define a altura do contêiner de imagem como 100% do Paper
    overflow: 'hidden', // Garante que a imagem não ultrapasse o container
  },
  image: {
    width: '100%',
    height: '100%', // Altura 100% do contêiner
    objectFit: 'cover', // Redimensiona a imagem para preencher o container mantendo a proporção
    minHeight: '400px', // Altura mínima da imagem igual à altura do Paper
    minWidth: '400px', // Largura mínima da imagem igual à largura do Paper
  },
}));

const db = getFirestore(app);
const itemsCollectionRef = collection(db, 'ImobiliariaiLandIMagenscapa');

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
  imagemUrls: string[];
  tipo: string;
}

interface ItemListProps {
  items: Item[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  const classes = useStyles();
  const [updatedItems, setUpdatedItems] = useState<Item[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(itemsCollectionRef, (querySnapshot) => {
      const fetchedItems: Item[] = [];
      querySnapshot.forEach((doc) => {
        fetchedItems.push(doc.data() as Item);
      });

      setUpdatedItems(fetchedItems);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const removeItem = async (itemId: string) => {
    try {
      await deleteDoc(doc(itemsCollectionRef, itemId));
    } catch (error) {
      console.error('Erro ao remover o item:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 4); // Alterna entre as 4 imagens
    }, 2000); // Muda a imagem a cada 2 segundos

    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
  }, []);

  return (
    <Container>
      <Paper className={classes.root}>
        <div className={classes.imageContainer}>
          <motion.img
            src={updatedItems.length > 0 ? updatedItems[0]?.imagemUrls[currentImageIndex] : ''}
            alt={`Thumbnail-${updatedItems[0]?.id}`}
            className={classes.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => removeItem(updatedItems[0]?.id)}
          style={{ marginTop: 8 }}
        >
          Remover
        </Button>
      </Paper>
    </Container>
  );
};

export default ItemList;
