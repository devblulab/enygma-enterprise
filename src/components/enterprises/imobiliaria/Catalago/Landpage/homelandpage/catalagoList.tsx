import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Grid, Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { collection, getFirestore, getDocs } from 'firebase/firestore';
import { app } from '../../../../../../logic/firebase/config/app';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faUtensils, faBath, faBed, faCouch } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'; // Importe o ícone de adição
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 
import Link from 'next/link';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    borderRadius: theme.spacing(2),
    margin: theme.spacing(2, 'auto'),
    maxWidth: '100%',
    backgroundColor: 'rgba(127, 127, 127, 0.2)', // Cinza com transparência
    
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
    borderRadius: '12px', // Arredonda as bordas da imagem
  },
  icon: {
    fontSize: '1.3rem', // Tamanho do ícone
    marginRight: theme.spacing(1), // Espaçamento à direita do ícone
  },
  text: {
    fontSize: '1rem', // Tamanho do texto
    marginRight: theme.spacing(2),
    fontWeight: 'bold', // Negrito no texto
    textTransform: 'uppercase', // Transformação de texto em caixa alta
    fontFamily: 'Arial, sans-serif', // Fonte do texto
    color: '#4287f0',
 // Cor do texto
  },
}));

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
  selected: boolean;
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
  const classes = useStyles();
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

  return (
    <Container>
      <Paper className={classes.root}>
      <Typography variant="h5" align="center" gutterBottom style={{ color: '#ffffff', fontFamily: 'Roboto' }}>
      Lista de Imóveis
    </Typography>
        <TextField
  label="Buscar Item"
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
      <Paper className={classes.item}>
        <div className={classes.imageContainer}>
          <AnimatePresence initial={false}>
            {item.imagemUrls && item.imagemUrls.length > 0 && (
              <motion.img
                src={item.imagemUrls[currentImageIndex % item.imagemUrls.length]}
                alt={`Thumbnail-${item.id}`}
                className={classes.image}
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
      <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Roboto' }}>
        <FontAwesomeIcon icon={faCar} className={classes.icon} /> 
        <Typography className={classes.text}>{item.garagem}</Typography> 
        <FontAwesomeIcon icon={faUtensils} className={classes.icon} /> 
        <Typography className={classes.text}>{item.cozinha}</Typography> 
        <FontAwesomeIcon icon={faBath} className={classes.icon} />
        <Typography className={classes.text}>{item.banheiro}</Typography> 
        <FontAwesomeIcon icon={faBed} className={classes.icon} /> 
        <Typography className={classes.text}>{item.dormitorio}</Typography> 
        <FontAwesomeIcon icon={faCouch} className={classes.icon} /> 
        <Typography className={classes.text}>{item.sala}</Typography> 
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
                    style={{ marginTop: 8, backgroundColor: '#f5f5f5', color: '#000000', marginLeft: 8 }} // Cinza claro
                  >
                    <FontAwesomeIcon icon={faPlus} style={{ fontSize: '1.5rem', color: '#FFA500' }} />
                  </Button>
                </Link>

      </Paper>
    </Grid>
  ))}
</Grid>
      </Paper>
    </Container>
  );
};

export default CatalagoList;
