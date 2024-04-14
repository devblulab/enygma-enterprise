// pages/imobiliaria.tsx
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from '@emotion/styled';

const BackgroundVideo = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const StyledPaper = styled(Paper)`
  && {
    padding: 32px;
    text-align: center;
    color: #ffffff;
    background: rgba(41, 41, 41, 0.9);
    border-radius: 16px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const PropertyCard = styled.div`
  background: linear-gradient(to right, #ff9a9e, #fecfef);
  border-radius: 16px;
  padding: 16px;
  margin: 16px 0;
  transition: background 0.3s ease;
  &:hover {
    background: linear-gradient(to right, #ffc3a0, #ffafbd);
  }
`;

const CatalogButton = styled(Button)`
  && {
    margin-top: 16px;
    background: #61dafb;
    color: #ffffff;
    &:hover {
      background: #318ce7;
    }
  }
`;

const FloatingButtons = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const FloatingButton = styled(motion.div)`
  margin: 8px;
`;

const Imobiliaria = () => {
  const router = useRouter();

  const navigateToCatalog = () => {
    router.push('/enterprises/catalogo');
  };

  return (
    <Container>
      <BackgroundVideo autoPlay loop muted>
        <source src="/public/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </BackgroundVideo>

      <StyledPaper>
        <Typography variant="h4" gutterBottom>
          Guilherme Consultoria Imobiliária
        </Typography>
        <Typography variant="body1">
          Encontre o imóvel dos seus sonhos com a ajuda de Guilherme, seu consultor imobiliário.
        </Typography>

        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((property) => (
            <PropertyCard key={property}>
              <Typography variant="h6">Imóvel {property}</Typography>
              <Typography variant="body2">Descrição do imóvel {property}</Typography>
            </PropertyCard>
          ))}
        </Grid>

        <CatalogButton variant="contained" onClick={navigateToCatalog}>
          Catálogo
        </CatalogButton>
      </StyledPaper>

      <FloatingButtons>
        <FloatingButton whileHover={{ scale: 1.1 }}>
          <a href="https://wa.me/SEU_NUMERO_DE_TELEFONE" target="_blank">
            <Button variant="contained" color="secondary">
              WhatsApp
            </Button>
          </a>
        </FloatingButton>
        <FloatingButton whileHover={{ scale: 1.1 }}>
          <a href="https://www.instagram.com/" target="_blank">
            <Button variant="contained" color="primary">
              Instagram
            </Button>
          </a>
        </FloatingButton>
      </FloatingButtons>
    </Container>
  );
};

export default Imobiliaria;
