import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';

interface ContentProps {
  imageURL?: string;
  videoURL?: string;
}

const Content: React.FC<ContentProps> = ({ imageURL, videoURL }) => {
  return (
    <>
      {imageURL && (
        <Card style={{ marginBottom: '10px' }}>
          <CardActionArea>
            <CardMedia component="img" src={imageURL} alt="Imagem do post" style={{ height: '150px' }} />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Título ou descrição da imagem
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
      {videoURL && (
        <Card style={{ marginBottom: '10px' }}>
          <CardMedia component="video" src={videoURL} controls style={{ maxWidth: '300px' }}>
            <Typography variant="body2" color="textSecondary" component="p">
              Seu navegador não suporta o elemento de vídeo.
            </Typography>
          </CardMedia>
        </Card>
      )}
    </>
  );
};

export default Content;
