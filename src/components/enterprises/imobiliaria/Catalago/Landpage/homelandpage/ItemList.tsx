import React, { useEffect, useState } from 'react';
import { Typography, Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { collection, getFirestore, onSnapshot, deleteDoc, doc, getDocs } from 'firebase/firestore';

import { app } from '../../../../../../logic/firebase/config/app';
import styles from './ItemList.module.css'; // Importando os estilos do CSS module

const useStyles = makeStyles((theme) => ({})); // Não é necessário mais estilos aqui

const db = getFirestore(app);
const itemsCollectionRef = collection(db, 'ImobiliariaiLandIMagenscapa');

interface Item {
  id: string;
  cliente: string;
  total: number;
  nome: string;
  mesa: string;
  status: string;
  unidadevalor: number;
  concluido: boolean;
  tipo: string;
  quantidade: number;
  userId: string;
  selected: boolean;
  imagemUrls: string[];
  garagem: string;
  cozinha: string;
  banheiro: string;
  dormitorio: string;
  sala: string;
  localizacao: string;
  bairo: string;
  metros: string;
  terreno: string;
  
}

interface ItemListProps {
  items: Item[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container className={styles.fundo}> 
      <Paper className={styles.root}> 
        <div className={styles.imageContainer}> =
          <motion.img
            src={updatedItems.length > 0 ? updatedItems[0]?.imagemUrls[currentImageIndex] : ''}
            alt={`Thumbnail-${updatedItems[0]?.id}`}
            className={styles.image} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </Paper>
    </Container>
  );
};

export default ItemList;
