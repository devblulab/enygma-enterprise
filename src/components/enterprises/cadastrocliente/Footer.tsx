import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#000',
    padding: theme.spacing(4),
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
}));

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Meu Site. Todos os direitos reservados.
      </Typography>
    </footer>
  );
};

export default Footer;
