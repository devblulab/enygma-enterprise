
import { collection, getFirestore, onSnapshot, deleteDoc, doc, updateDoc, getDocs, where, query } from 'firebase/firestore';


 
import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Grid, Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { app } from '../../../../../logic/firebase/config/app';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faUtensils, faBath, faBed, faCouch } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'; // Importe o ícone de adição
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 
import Link from 'next/link';
import styles from './CatalagoList.module.css'; // Importando os estilos do CSS module

const useStyles = makeStyles((theme) => ({})); // Não é necessário mais estilos aqui

const db = getFirestore(app);
const itemsCollectionRef = collection(db, 'ImobiliariaitemsCatalago');

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
 
  imagemUrls: string[];
  garagem: string,
    cozinha: string,
    banheiro: string,
    dormitorio: string,
    sala: string,
}

interface ItemListProps {
  items: Item[];
}

const CatalagoList: React.FC<ItemListProps> = ({ items }) => {
  const [updatedItems, setUpdatedItems] = useState<Item[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchedItems: Item[] = [];
        const querySnapshot = await getDocs(itemsCollectionRef);
        querySnapshot.forEach((doc) => {
          fetchedItems.push(doc.data() as Item);
        });
        setUpdatedItems(fetchedItems);
      } catch (error) {
        console.error('Erro ao buscar os itens:', error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 4); // Alterna entre as 4 imagens
    }, 5000); // Muda a imagem a cada 2 segundos

    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
  }, []);

  const handleSearch = async (searchText: string) => {
    try {
      const fetchedItems: Item[] = [];
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

  const handleWhatsApp = (item: Item) => {
    const whatsappNumber = 'SEU_NUMERO_DO_WHATSAPP';
    const message = `Olá, estou interessado(a) no imóvel ${item.nome} - ${item.tipo}. Por favor, entre em contato comigo para mais informações.`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, '_blank');
  };

  const handleViewDetails = (itemId: string) => {
    window.location.href = `/item-details?id=${itemId}`;
  };

  const removeItem = async (itemId: string) => {
    try {
      await deleteDoc(doc(itemsCollectionRef, itemId));
    } catch (error) {
      console.error('Erro ao remover o item:', error);
    }
  };


  const editItem = async (itemId: string, newData: Partial<Item>) => {
    try {
      await updateDoc(doc(itemsCollectionRef, itemId), newData);
    } catch (error) {
      console.error('Erro ao editar o item:', error);
    }
  };


  return (
<Container>
  <div className={styles.catalagoContainer}> 
    <section id="catalago" className={styles.catalagoSection}> 
      
   
      <Paper className={styles.root}>
      <Typography variant="h5" align="center" gutterBottom style={{ color: '#000', fontFamily: 'Roboto' }}>
      Lista de Imóveis
    </Typography>
        <TextField
  label="Buscar"
  value={searchText}
  onChange={handleSearchInputChange}
  variant="outlined"
  fullWidth
  margin="normal"
  InputProps={{
    style: { backgroundColor: 'rgba(230, 230, 230, 0.7)' } // Cinza claro com transparência
  }}
/>


<Grid container spacing={2}>
  {updatedItems.map((item, index) => (
    <Grid item xs={12} sm={6} md={4} key={item.id}>
      <Paper className={`${styles.root} ${styles.customPaperr}`}>

        <div className={styles.imageContainer}>
          <AnimatePresence initial={false}>
            {item.imagemUrls && item.imagemUrls.length > 0 && (
              <motion.img
                src={item.imagemUrls[currentImageIndex % item.imagemUrls.length]}
                alt={`Thumbnail-${item.id}`}
                className={styles.image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, scale: 1.1, rotate: [0, 360], ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>
        </div>

        <TextField
        label="Nome"
        value={item.nome}
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
        style={{ fontFamily: 'Roboto' }}
      />
      <TextField
        label="Tipo"
        value={item.tipo}
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
        style={{ fontFamily: 'Roboto' }}
      />
      <TextField
        label="Valor"
        type="number"
        value={item.unidadevalor}
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
        style={{ fontFamily: 'Roboto' }}
      />
       <div style={{ marginLeft: 10, display: 'flex', alignItems: 'center', fontFamily: 'Roboto' }}>
  <FontAwesomeIcon icon={faCar} className={styles.icon} /> 
  <Typography className={styles.text} style={{ marginRight: 20 }}>{item.garagem}</Typography> 
  <FontAwesomeIcon icon={faUtensils} className={styles.icon} /> 
  <Typography className={styles.text} style={{ marginRight: 20 }}>{item.cozinha}</Typography> 
  <FontAwesomeIcon icon={faBath} className={styles.icon} />
  <Typography className={styles.text} style={{ marginRight: 20 }}>{item.banheiro}</Typography> 
  <FontAwesomeIcon icon={faBed} className={styles.icon} /> 
  <Typography className={styles.text} style={{ marginRight: 20 }}>{item.dormitorio}</Typography> 
  <FontAwesomeIcon icon={faCouch} className={styles.icon} /> 
  <Typography className={styles.text} style={{ marginRight: 20 }}>{item.sala}</Typography> 
</div>

<Button
  variant="contained"
  color="primary"
  onClick={() => handleWhatsApp(item)}
  style={{ marginTop: 8, backgroundColor: '#f5f5f5', color: '#000000' }} // Cinza claro
>
  <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: '1.5rem', color: '#25D366' }} />
</Button>

<Link href={`/item-details?id=${item.id}`} passHref>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 8, backgroundColor: '#f5f5f5', color: '#00000w', marginLeft: 8 }} // Cinza claro
                  >
                    <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.5rem', color: '#FFA500' }} />
                  </Button>
                </Link>
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
   
</section>
      </div>
    </Container>
  );
};

export default CatalagoList;
