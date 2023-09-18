import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button, Card, Paper , CardContent, useMediaQuery, Typography, Grid } from '@material-ui/core';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import Rodape from '../../components/inventario/Footer';
import {  Fa500Px ,FaCity ,FaMotorcycle ,FaCar ,FaHamburger  ,FaArchive , FaStore } from 'react-icons/fa';

import { Menu } from 'antd';




const { SubMenu } = Menu;
const theme = createTheme();


  const useStyles = makeStyles((theme) => ({
    card: {
      maxWidth: 345,
      height: '160px',
      textAlign: 'center',
      background: 'linear-gradient(45deg, #807770 29%, #002340 90%)',
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
      color: '#FFFFFF',
      borderRadius: 16,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginBottom: theme.spacing(2), // Adicione espaço inferior
    
    },
  
  button: {
    marginTop: theme.spacing(2),
    background: 'linear-gradient(45deg, #000 30%, #002340 90%)',
    color: '#FFFFFF',
    '&:hover': {
      background: 'linear-gradient(45deg, #002340 30%, #000 90%)',
    },
  },
  container: {
    
    
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    padding: '0 9em', // Espaço de 2rem (32px) nos lados
   
  },

  paper: {
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(45deg, #000 30%, #002340 90%)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    marginBottom: theme.spacing(2),
  },

 

  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2), // Adiciona espaço entre o ícone e o texto
  },
  icon: {
    fontSize: '2rem', // Ajuste o tamanho do ícone conforme necessário
  },
}));


const cardVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const buttonVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.1 },
};

const Enterprises: React.FC = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    
    <motion.div
      className={classes.container}
      initial="initial"
      animate="animate"
    
    >
    
    <div className={classes.iconWrapper}>
        <FaCity size={50} className={classes.icon} /> 
      </div>
    
       <Paper className={classes.paper}>
     <Grid container spacing={3}>
     <Grid item xs={12} sm={6} md={4}>
  <motion.div
    className={classes.card}
    variants={cardVariants}
    initial="initial"
    animate="animate"
  >
    <CardContent>
      <div className={classes.iconWrapper}>
        <Fa500Px className={classes.icon} /> 
      </div>
      <Typography variant="h5"  component="div">
        Cadastro De Cliente
      </Typography>
      <Link href="/enterprises/cadastrocliente">
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap={{ scale: 0.9 }}
          style={{ margin: '5px' }}
        >
          <Button variant="contained" className={classes.button}>
            Iniciar
          </Button>
        </motion.div>
              </Link>
            </CardContent>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            className={classes.card}
            variants={cardVariants}
            initial="initial"
            animate="animate"
          >
            <CardContent>
            <div className={classes.iconWrapper}>
        <FaHamburger className={classes.icon} /> 
      </div>
              <Typography variant="h5" component="div">
               Food
              </Typography>
              <Link href="/ifood">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.9 }}
                  style={{ margin: '5px' }}
                >
                  <Button variant="contained" className={classes.button}>
                    Iniciar
                  </Button>
                </motion.div>
              </Link>
            </CardContent>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            className={classes.card}
            variants={cardVariants}
            initial="initial"
            animate="animate"
          >
            <CardContent>
            <div className={classes.iconWrapper}>
        <FaMotorcycle className={classes.icon} /> 
      </div>
              <Typography variant="h5" component="div">
              Controle de Entregas
              </Typography>
              <Link href="/enterprises/controledeentregas">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.9 }}
                  style={{ margin: '5px' }}
                >
                  <Button variant="contained" className={classes.button}>
                    Iniciar
                  </Button>
                </motion.div>
              </Link>
            </CardContent>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            className={classes.card}
            variants={cardVariants}
            initial="initial"
            animate="animate"
          >
            <CardContent>
            <div className={classes.iconWrapper}>
        <FaCar className={classes.icon} /> 
      </div>
              <Typography variant="h5" component="div">
                Controle De Corridas
              </Typography>
              <Link href="/enterprises/controledecorridas">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.9 }}
                  style={{ margin: '5px' }}
                >
                  <Button variant="contained" className={classes.button}>
                    Iniciar
                  </Button>
                </motion.div>
              </Link>
            </CardContent>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            className={classes.card}
            variants={cardVariants}
            initial="initial"
            animate="animate"
          >
            <CardContent>
            <div className={classes.iconWrapper}>
        <FaStore className={classes.icon} /> 
      </div>
              <Typography variant="h5" component="div">
                Varejo
              </Typography>
              <Link href="/enterprises/varejo">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.9 }}
                  style={{ margin: '5px' }}
                >
                  <Button variant="contained" className={classes.button}>
                    Iniciar
                  </Button>
                </motion.div>
              </Link>
            </CardContent>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            className={classes.card}
            variants={cardVariants}
            initial="initial"
            animate="animate"
          >
            <CardContent>
            <div className={classes.iconWrapper}>
        <FaArchive className={classes.icon} /> 
      </div>
              <Typography variant="h5" component="div">
                Estoque
              </Typography>
              <Link href="/enterprises/estoque">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.9 }}
                  style={{ margin: '5px' }}
                >
                  <Button variant="contained" className={classes.button}>
                    Iniciar
                  </Button>
                </motion.div>
              </Link>
            </CardContent>
          </motion.div>
        </Grid>
        
      
      </Grid>
    
      </Paper>
      <Rodape />
      
    </motion.div>
   
   
    
  );
};

const EnterprisesWithThemeProvider: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Enterprises />
    </ThemeProvider>
  );
};

export default EnterprisesWithThemeProvider;
