import React from 'react';
import { Button, Grid, Typography, Paper } from '@material-ui/core';

import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    textAlign: 'center',
    background: 'linear-gradient(45deg, #807770 29%, #002340 90%)',
    color: '#FFFFFF',
    borderRadius: theme.spacing(2),
  },
  buttonContainer: {
    marginTop: theme.spacing(4),
  },
  button: {
    padding: theme.spacing(2, 4),
    background: 'linear-gradient(45deg, #000 30%, #002340 90%)',
    color: '#FFFFFF',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
}));

const HomeFood: React.FC = () => {
  const classes = useStyles();

  const handleCaixaClick = () => {
    console.log('Botão Caixa clicado');
  };

  const handleGarcomClick = () => {
    console.log('Botão Garçom clicado');
  };

  const handleCozinhaClick = () => {
    console.log('Botão Cozinha clicado');
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" align="center" gutterBottom>
        Bem-vindo a Loja!!
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Escolha uma das opções abaixo para continuar:
      </Typography>
      <Grid container spacing={2} justify="center" className={classes.buttonContainer}>
        <Grid item>
          <Link href="/enterprises/varejo/caixa">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleCaixaClick}
            >
              Caixa
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/enterprises/varejo/atendente">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleGarcomClick}
            >
              Atendente
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/enterprises/varejo/pacote">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleCozinhaClick}
            >
              Pacote
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HomeFood;
