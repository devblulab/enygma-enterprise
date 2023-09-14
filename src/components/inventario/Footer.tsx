import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    background: 'linear-gradient(45deg, #000 29%, #002340 90%)',
    padding: theme.spacing(1),
    textAlign: 'center',
    width: '100%',
    marginTop: theme.spacing(3),
    borderRadius: '10px', // Adicionado para arredondar as bordas
  },
  whiteText: {
    color: 'white', // Define a cor do texto como branco
  },
}));

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="body2" className={classes.whiteText}>
        © {new Date().getFullYear()} Enygma Dev. Todos os direitos reservados.
      </Typography>
    </footer>
  );
};

export default Footer;
