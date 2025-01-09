import React, { useState } from 'react';
import { Button, Typography, TextField, Grid, Paper } from '@material-ui/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../../../../logic/firebase/config/app';
import Colecao from '../../../../../logic/firebase/db/Colecao';
import Item from './Item';

interface ImageUploaderProps {
  item: Item;
  onImageUpload: (imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ item, onImageUpload }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [itemIdToAddUrl, setItemIdToAddUrl] = useState('');

  const handleImageUpload = async () => {
    try {
      if (selectedImage) {
        const storage = getStorage(app);
        const storageRef = ref(storage, `images/${selectedImage.name}`);
        const fileBuffer = await selectedImage.arrayBuffer();

        setIsButtonDisabled(true);

        const uploadTask = uploadBytes(storageRef, fileBuffer);
        await uploadTask;

        const imageUrl = await getDownloadURL(storageRef);

        if (imageUrl) {
          onImageUpload(imageUrl);
        }
      }
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleImageUrlAddition = async () => {
    try {
      if (itemIdToAddUrl && item.nome && item.unidadevalor && item.userId) {
        const colecao = new Colecao();
        await colecao.atualizar('ImobiliariaitemsCatalago', itemIdToAddUrl, {
          imagemUrl: item.imagemUrls,
        });
      }
    } catch (error) {
      console.error('Erro ao adicionar URL da imagem ao item:', error);
    }
  };

  return (
    <Paper style={{}}>
      <Typography variant="h6" gutterBottom>
        Escolha até 4 imagens
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={8}>
          <input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files?.[0] || null)} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            onClick={handleImageUpload}
            variant="contained"
            color="primary"
            size="small"
            disabled={isButtonDisabled}
            fullWidth
          >
            {isButtonDisabled ? 'Enviando...' : 'Enviar Imagem'}
          </Button>
        </Grid>
      </Grid>
      
    </Paper>
  );
};

export default ImageUploader;
