import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ImageUploader from './imagen'; // Importa o novo componente
import Colecao from '../../../../../../logic/firebase/db/Colecao';
import Item from './Item';
import styles from './ListPost.module.css';

const useStyles = makeStyles((theme) => ({
  form: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  imageUploader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
  coverImage: {
    width: '100%',
    height: 'auto',
    maxWidth: '300px', // Tamanho fixo da capa
    maxHeight: '150px', // Tamanho fixo da capa
    border: 'none', // Remove a borda
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: 'auto',
    maxWidth: '300px', // Tamanho fixo da capa
    maxHeight: '150px', // Tamanho fixo da capa
  },
  image: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: '100%',
  },
}));

interface ListPostProps {
  setItems: React.Dispatch<React.SetStateAction<Item[]>>; // Correção na tipagem
}

const ListPost: React.FC<ListPostProps> = ({ setItems }) => {
  const classes = useStyles();
  const [newItem, setNewItem] = useState<Item>({
    id: '',
    cliente: '',
    total: 0,
    status: '',
    nome: '',
    quantidade: 0,
    mesa: '',
    tipo: '',
    concluido: false,
    userId: '',
    unidadevalor: 0,
    selected: false,
    imagemUrls: [], // Altera para uma array de strings para armazenar múltiplas URLs de imagens
  });
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleAddItem = async () => {
    try {
      const colecao = new Colecao();
      console.log('Novo item:', newItem);

      const itemSalvo = await colecao.salvar('ImobiliariaiLandIMagenscapa', {
        ...newItem,
      });
      console.log('Item salvo:', itemSalvo);

      setNewItem((prevItem) => ({
        ...prevItem,
        id: '',
        cliente: '',
        total: 0,
        status: '',
        nome: '',
        quantidade: 0,
        mesa: '',
        tipo: '',
        concluido: false,
        userId: '',
        unidadevalor: 0,
        selected: false,
        imagemUrls: [], // Limpa as URLs de imagem após salvar o item
      }));

      setItems((prevItems) => [...prevItems, itemSalvo]);
      setCurrentImageIndex(0); // Reinicia o índice da imagem atual
    } catch (error) {
      console.error('Erro ao adicionar o item:', error);
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    setNewItem((prevItem) => ({
      ...prevItem,
      imagemUrls: [...prevItem.imagemUrls, imageUrl], // Adiciona a URL de imagem à array de URLs
    }));
    setCurrentImageIndex((prevIndex) => prevIndex + 1); // Avança para a próxima imagem
  };

  return (
    <div className={`${styles.container} ${classes.form} `}>
      <Paper className={classes.form}>
        <Typography variant="h5" align="center" gutterBottom>
          Adicione Fotos de Capa
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="ID do Imóvel"
              value={newItem.id}
              onChange={(e) => setNewItem((prevItem) => ({ ...prevItem, id: e.target.value }))}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <div className={classes.imageContainer}>
              <img src={newItem.imagemUrls[currentImageIndex]} alt="Cover" className={classes.coverImage} />
            </div>
          </Grid>
        </Grid>
        {currentImageIndex < 4 && ( // Mostra o botão apenas quando menos de 4 imagens foram enviadas
          <ImageUploader
            item={newItem}
            onImageUpload={handleImageUpload} // Atualiza para passar apenas a URL da imagem
          />
        )}
        {currentImageIndex === 4 && ( // Mostra o botão apenas quando todas as 4 imagens foram enviadas
          <Button onClick={handleAddItem} variant="contained" color="primary" size="large" fullWidth>
            Adicionar Capa da landpage
          </Button>
        )}
      </Paper>
    </div>
  );
};

export default ListPost;
