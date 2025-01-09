import React from 'react';
import { Paper, Typography, Grid, Box, makeStyles } from '@material-ui/core';
import { CheckCircle, Info, Warning } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(40),
    padding: theme.spacing(4),
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    zIndex: 2, // Garante que o cabeçalho esteja sempre no topo
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: 600,
    marginBottom: theme.spacing(3),
  },
  item: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: theme.spacing(2),
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  cardTitle: {
    fontWeight: 600,
    fontSize: '1.2rem',
  },
  cardDescription: {
    fontSize: '1rem',
    color: '#555',
  },
}));

const TiposCarteira: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Typography variant="h5" className={classes.sectionTitle} align="center">
        Tipos de Carteira de Pesca e Regras
      </Typography>

      {/* Carteira Embarcada */}
      <Box className={classes.item}>
        <CheckCircle color="primary" className={classes.icon} />
        <div>
          <Typography variant="h6" className={classes.cardTitle}>
            Carteira Embarcada
          </Typography>
          <Typography variant="body2" className={classes.cardDescription}>
            Necessária para quem pesca em embarcações comerciais ou de turismo. Permite pesca em áreas específicas e com limites diários.
          </Typography>
        </div>
      </Box>

      {/* Carteira de Amador */}
      <Box className={classes.item}>
        <Info color="secondary" className={classes.icon} />
        <div>
          <Typography variant="h6" className={classes.cardTitle}>
            Carteira de Amador
          </Typography>
          <Typography variant="body2" className={classes.cardDescription}>
            Destinada a pescadores recreativos. Não permite a comercialização do pescado e tem limites rigorosos quanto à quantidade.
          </Typography>
        </div>
      </Box>

      {/* Carteira Profissional */}
      <Box className={classes.item}>
        <Warning color="error" className={classes.icon} />
        <div>
          <Typography variant="h6" className={classes.cardTitle}>
            Carteira Profissional
          </Typography>
          <Typography variant="body2" className={classes.cardDescription}>
            Exige a comprovação de atividade pesqueira regular. Permite a pesca comercial e em áreas específicas do território nacional.
          </Typography>
        </div>
      </Box>

      {/* Regras Gerais */}
      <Box className={classes.item}>
        <Info color="primary" className={classes.icon} />
        <div>
          <Typography variant="h6" className={classes.cardTitle}>
            Regras Gerais
          </Typography>
          <Typography variant="body2" className={classes.cardDescription}>
            - Respeite os limites de captura e tamanhos mínimos. 
            - Pesca ilegal pode resultar em multas ou apreensão da embarcação. 
            - Sempre carregue a sua carteira de pesca quando for pescar.
          </Typography>
        </div>
      </Box>
    </Paper>
  );
};

export default TiposCarteira;
