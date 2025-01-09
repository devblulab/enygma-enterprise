import React, { useState } from 'react';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import 'firebase/storage';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginTop: theme.spacing(1),
  },
  preview: {
    marginTop: theme.spacing(2),
    maxWidth: '100%',
    height: 'auto',
    borderRadius: 8,
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
  },
}));

interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
  item: any; // Opcional, para vincular ao item que está sendo criado/editado
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const classes = useStyles();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Preview local da imagem
    }
  };

  const handleUpload = async () => {
    if (!imageFile) return;

    try {
      setUploading(true);

      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`imagens/${imageFile.name}-${Date.now()}`);
      await fileRef.put(imageFile);

      const downloadUrl = await fileRef.getDownloadURL();
      onImageUpload(downloadUrl);

      setImageFile(null);
      setPreviewUrl(null);
      setUploading(false);
      alert('Imagem carregada com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      setUploading(false);
    }
  };

  return (
    <div className={classes.root}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <Button
          variant="contained"
          color="primary"
          component="span"
          className={classes.uploadButton}
        >
          Selecionar Imagem
        </Button>
      </label>

      {previewUrl && (
        <div>
          <Typography variant="body1" align="center">
            Pré-visualização:
          </Typography>
          <img src={previewUrl} alt="Preview" className={classes.preview} />
        </div>
      )}

      {imageFile && (
        <Button
          onClick={handleUpload}
          variant="contained"
          color="secondary"
          disabled={uploading}
          className={classes.uploadButton}
        >
          {uploading ? <CircularProgress size={24} /> : 'Fazer Upload'}
        </Button>
      )}
    </div>
  );
};

export default ImageUploader;
