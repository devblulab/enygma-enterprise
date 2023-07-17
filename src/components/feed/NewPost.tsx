import React, { useState } from 'react';
import { Box, Button, TextField, Card, Typography } from '@material-ui/core';
import { motion } from 'framer-motion';
import { PhotoLibrary, Videocam } from '@material-ui/icons';
import styles from './NewPost.module.css';

interface NewPostProps {
  onCreatePost: (content: string, image: File | null, video: File | null) => void;
}

const NewPost: React.FC<NewPostProps> = ({ onCreatePost }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const handleCreatePost = () => {
    onCreatePost(content, image, video);

    // Limpa os campos de conteúdo, imagem e vídeo
    setContent('');
    setImage(null);
    setVideo(null);
  };

  return (
    <Box className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className={styles.card}>
          <Typography variant="h5" gutterBottom>
            Criar Novo Post
          </Typography>
          <TextField
            label="Conteúdo"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            margin="normal"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            style={{ display: 'none' }}
            id="image-input"
          />
          <label htmlFor="image-input">
            <Button component="span" color="default" startIcon={<PhotoLibrary />}>
              Adicionar Imagem
            </Button>
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files?.[0] || null)}
            style={{ display: 'none' }}
            id="video-input"
          />
          <label htmlFor="video-input">
            <Button component="span" color="default" startIcon={<Videocam />}>
              Adicionar Vídeo
            </Button>
          </label>
          <Button variant="contained" color="primary" onClick={handleCreatePost} fullWidth>
            Criar Post
          </Button>
        </Card>
      </motion.div>
    </Box>
  );
};

export default NewPost;
