import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Grid, Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { collection, getFirestore, getDocs } from 'firebase/firestore';
import { app } from '../../../../../../logic/firebase/config/app';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { AiOutlineWhatsApp, AiOutlinePlus } from 'react-icons/ai';

import { faCar, faUtensils, faRulerCombined, faDraftingCompass, faBath, faBed, faMap, faCouch, faMapMarkerAlt, faHouse, faBuilding, faStore } from '@fortawesome/free-solid-svg-icons'; // Importando faHouse

// Configuração do Firestore
const db = getFirestore(app);
const itemsCollectionRef = collection(db, 'ImobiliariaitemsCatalago');

// Definição do tipo para os itens
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

// Definindo os estilos utilizando makeStyles
const useStyles = makeStyles({
  catalagoContainer: {
    marginTop: '20px',
    
  },
  catalagoSection: {
    padding: '0px',
  },
  root: {
    padding: '20px',
    background: 'rgb(204, 204, 204)',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    width: '100%', // Garantir que o card ocupe 100% da largura
  },
  title: {
    fontFamily: 'Cinzel, serif',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },

  filterButtonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '15px',
    gap: '2px',
    flexWrap: 'wrap', // Para garantir que os botões se ajustem bem em telas menores
  },
  filterButton: {
    backgroundColor: 'transparent',
    color: '#555',
    fontSize: '1rem',
    fontWeight: 'bold',
    padding: '5px 2px',
    borderRadius: '5px',
    boxShadow: 'none',
    border: '1px solid #ddd',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center', // Para centralizar o ícone e o texto
    justifyContent: 'center', // Para centralizar o conteúdo do botão
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#f7f7f7',
    },
    // Responsividade: no mobile, apenas o ícone será mostrado
    '@media (max-width: 600px)': {
      padding: '8px', // Diminuir o padding
      fontSize: '1.2rem',
      width: '40px', // Botão menor no mobile
      height: '25px', // Botão quadrado
      justifyContent: 'center', // Garantir que o ícone fique centrado
    },
  },
  filterButtonText: {
    marginLeft: '1px', // Espaço entre o ícone e o texto
  },
  icon: {
    marginRight: '1px',
    fontSize: '1.0rem',
  },
  cardRoot: {
    background: 'rgba(240, 240, 240, 0.9)',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    width: '100%', // O card ocupa 100% da largura disponível
    maxWidth: '350px', // Limite máximo para o tamanho do card
    height: 'auto', // Ajuste automático da altura
    margin: 'auto', // Centraliza os cards na tela
    
    '&:hover': {
      transform: 'scale(1.05)', // Aumenta o tamanho do card ao passar o mouse
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)', // Adiciona sombra quando em hover
    },
    '@media (max-width: 600px)': {
      maxWidth: '100%', // No celular, o card ocupa 100% da largura
      marginBottom: '10px', // Espaço entre os cards em dispositivos móveis
    },
    '@media (min-width: 600px) and (max-width: 1200px)': {
      maxWidth: '80%', // No tablet, os cards ocupam 80% da largura da tela
      marginBottom: '20px', // Espaço entre os cards em telas médias
    },
    '@media (min-width: 1200px)': {
      maxWidth: '300px', // No desktop, os cards têm no máximo 350px de largura
      marginBottom: '2px', // Espaço entre os cards em telas grandes
    },
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    borderRadius: '8px',
    aspectRatio: '16 / 9',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cardTitle: {
    fontFamily: 'Cinzel, serif',
    fontSize: '25px',
    fontWeight: 'bold',
    color: '#333',
    marginTop: '-10px',
    textAlign: 'center',
  },
  cardText: {
    fontFamily: 'Cinzel, serif',
    color: '#000',
    textAlign: 'center',
    margin: '10px 0',
  },
  featuresContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '10px 0',
  },
  cardFeature: {
    fontFamily: 'Poppins, sans-serif',
    color: '#555',
    marginRight: '8px',
  },
  icons: {
    color: 'gray',
    marginRight: '4px',
    fontSize: '1.3rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15px',
    gap: '10px',
  },
  cardRow: {
    display: 'flex',         // Flexbox para alinhar na mesma linha
    justifyContent: 'space-between', // Espaço entre os elementos (esquerda e direita)
    alignItems: 'center',    // Alinha os itens verticalmente
    width: '100%',           // Garante que o contêiner ocupe toda a largura disponível
  },
  
  leftAligned: {
    display: 'flex',
    fontFamily: 'Cinzel, serif',       
    alignItems: 'center',    // Centraliza verticalmente
    gap: '8px',              // Espaçamento entre o ícone e o texto
  },
  
  rightAligned: {
    display: 'flex',  
    fontFamily: 'Cinzel, serif',       
    alignItems: 'center',    // Centraliza verticalmente
    gap: '8px',              // Espaçamento entre o ícone e o texto
  },
  

  button: {
    backgroundColor: 'transparent',
    color: '#555',
    fontSize: '1rem',
    fontWeight: 'bold',
    padding: '10px 20px',
    borderRadius: '5px',
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    border: '1px solid #ddd',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.05)',
      backgroundColor: '#f7f7f7',
    },
  },
  whatsappButton: {
    fontSize: '1.3rem',
    color: '#000', 
  },
  locationButton: {
    color: '#000', 
    fontSize: '1.3rem',
  },
});

interface ItemListProps {
  items: Item[];
}

const CatalagoList: React.FC<ItemListProps> = ({ items }) => {
  const classes = useStyles();
  const [updatedItems, setUpdatedItems] = useState<Item[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1); // Página atual
  const [itemsPerPage] = useState<number>(6); // Itens por página
  const [showMoreImages, setShowMoreImages] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('Todos');
  
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

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredItems = updatedItems.filter((item) => {
    const searchLower = searchText.toLowerCase();
    return (
      item.nome.toLowerCase().includes(searchLower) ||
      item.tipo.toLowerCase().includes(searchLower) ||
      item.localizacao.toLowerCase().includes(searchLower)
     
    );
  });

  const handleWhatsApp = (item: Item) => {
    const whatsappNumber = 'SEU_NUMERO_DO_WHATSAPP';
    const message = `Olá, estou interessado(a) no imóvel ${item.nome} - ${item.tipo}. Por favor, entre em contato comigo para mais informações.`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1); // Resetar para a primeira página ao trocar o filtro
  };

  const handleLocation = (item: Item) => {
    const location = item.localizacao;
    const locationUrl = `https://www.google.com/maps?q=${encodeURIComponent(location)}`;
    window.open(locationUrl, '_blank');
  };

  // Paginação: Calcular quais itens devem ser exibidos
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Função para avançar para a próxima página
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Função para voltar para a página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  return (
    <Container>
      <div className={classes.catalagoContainer}>
        <section id="catalago" className={classes.catalagoSection}>
          <Paper className={classes.root}>
            <Typography variant="h5" className={classes.title}>
              Lista de Imóveis
            </Typography>
           
            <TextField
  label="Buscar por Nome, Localização ou Tipo"
  value={searchText}
  onChange={handleSearchInputChange}
  variant="outlined"
  fullWidth
  margin="normal"
  InputProps={{
    style: {
      backgroundColor: 'white', // Fundo branco
    },
  }}
/>
<div className={classes.filterButtonsContainer}>
        <Button className={classes.filterButton} onClick={() => handleFilterChange('Todos')}>
          <FontAwesomeIcon icon={faBed} className={classes.icon} />
          <span className={classes.filterButtonText}></span>
        </Button>
        <Button className={classes.filterButton} onClick={() => handleFilterChange('Casa')}>
          <FontAwesomeIcon icon={faHouse} className={classes.icon} />
          <span className={classes.filterButtonText}></span>
        </Button>
        <Button className={classes.filterButton} onClick={() => handleFilterChange('Apartamento')}>
          <FontAwesomeIcon icon={faBuilding} className={classes.icon} />
          <span className={classes.filterButtonText}></span>
        </Button>
        <Button className={classes.filterButton} onClick={() => handleFilterChange('Comércio')}>
          <FontAwesomeIcon icon={faStore} className={classes.icon} />
          <span className={classes.filterButtonText}></span>
        </Button>
      </div>
            <Grid container spacing={1}>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Paper className={classes.cardRoot}>
                      <div className={classes.imageContainer}>
                        
                        <AnimatePresence>
                          {item.imagemUrls && item.imagemUrls.length > 0 && (
                            <motion.img
                              src={item.imagemUrls[0]}
                              alt={`Thumbnail-${item.id}`}
                              className={classes.image}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.5, ease: 'easeInOut' }}
                            />
                          )}
                          
                        </AnimatePresence>
                      </div>
                      <div className={classes.cardRow}>
  <Typography variant="body1" className={classes.leftAligned}>
    <FontAwesomeIcon icon={faDraftingCompass} className={classes.icon} />
    {item.metros} M.
  </Typography>
  <Typography variant="body1" className={classes.rightAligned}>
   
    Lote   {item.terreno}.m
    <FontAwesomeIcon icon={faRulerCombined} className={classes.icon} />
  </Typography>
</div>

                      <Typography variant="h6" className={classes.cardTitle}>
                        {item.nome}
                      </Typography>
                      <Typography variant="body1" className={classes.cardText}>
                        Bairo: {item.bairo}
                      </Typography>
                      
                      
                      <Typography variant="body1" className={classes.cardText}>
                        Ressidencia: {item.tipo}
                      </Typography>
                      <Typography variant="body1" className={classes.cardText}>
                        Valor: R$ {item.unidadevalor.toFixed(2)}
                      </Typography>
                      
                      <div className={classes.featuresContainer}>
                        <FontAwesomeIcon icon={faCar} className={classes.icon} />
                        <Typography className={classes.cardFeature}>{item.garagem}</Typography>
                        <FontAwesomeIcon icon={faUtensils} className={classes.icon} />
                        <Typography className={classes.cardFeature}>{item.cozinha}</Typography>
                        <FontAwesomeIcon icon={faBath} className={classes.icon} />
                        <Typography className={classes.cardFeature}>{item.banheiro}</Typography>
                        <FontAwesomeIcon icon={faBed} className={classes.icon} />
                        <Typography className={classes.cardFeature}>{item.dormitorio}</Typography>
                        <FontAwesomeIcon icon={faCouch} className={classes.icon} />
                        <Typography className={classes.cardFeature}>{item.sala}</Typography>
                      </div>
                      <div className={classes.buttonContainer}>
                        <Button
                          variant="outlined"
                          className={`${classes.button} ${classes.whatsappButton}`}
                          onClick={() => handleWhatsApp(item)}
                        >
                          <AiOutlineWhatsApp />
                        </Button>
                        <Button
                          variant="outlined"
                          className={`${classes.button} ${classes.whatsappButton}`}
                          onClick={() => setShowMoreImages((prevState) => !prevState)}
                        >
                          <AiOutlinePlus />
                        </Button>
                        <Button
                          variant="outlined"
                          className={`${classes.button} ${classes.locationButton}`}
                          onClick={() => handleLocation(item)}
                        >
                          <FontAwesomeIcon icon={faMapMarkerAlt} />
                        </Button>
                      </div>
                    </Paper>
                  </Grid>
                ))
              ) : (
                <Typography variant="body1">Nenhum item encontrado.</Typography>
              )}
            </Grid>
            {filteredItems.length > itemsPerPage && (
              <div className={classes.buttonContainer}>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  Página Anterior
                </Button>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={nextPage}
                  disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}
                >
                  Próxima Página
                </Button>
              </div>
            )}
          </Paper>
        </section>
      </div>
    </Container>
  );
};

export default CatalagoList;
