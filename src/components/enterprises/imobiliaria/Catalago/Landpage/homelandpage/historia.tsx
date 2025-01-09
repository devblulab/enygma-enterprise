import React from 'react';
import { motion } from 'framer-motion';
import { AiOutlineInstagram, AiOutlineWhatsApp } from 'react-icons/ai';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  banner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    backgroundColor: 'rgb(54, 54, 54)',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgb(94, 94, 94)',
    width: '90%', // Ajusta a largura como percentual
    maxWidth: '1200px', // Tamanho máximo para telas maiores
    height: 'auto', // Altura padrão
    margin: '20px auto',
    border: '2px solid rgb(255, 255, 255)',
    transition: 'all 0.3s ease-in-out',
    overflow: 'hidden',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6)',
    },
  },
  photoContainer: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
  },
  photo: {
    width: '100%',
    maxWidth: '200px', // Tamanho padrão no desktop
    borderRadius: '15px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
  },
  infoContainer: {
    flex: '2',
    marginLeft: '20px',
    color: '#fff',
    textAlign: 'left',
  },
  name: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: 'rgb(255, 255, 255)',
  },
  role: {
    fontSize: '1.2rem',
    color: '#C0C0C0',
    marginBottom: '10px',
  },
  description: {
    fontSize: '1rem',
    color: '#B0B0B0',
    marginBottom: '15px',
  },
  socialIcons: {
    display: 'flex',
    gap: '15px',
  },
  icon: {
    fontSize: '2rem',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
  instagramIcon: {
    color: '#E1306C',
  },
  whatsappIcon: {
    color: '#25D366',
  },

  // Estilos para telas maiores (PC)
  '@media (min-width: 1024px)': {
    banner: {
      height: '400px', // Altura específica para desktop
      padding: '50px',
    },
    photo: {
      maxWidth: '250px', // Foto maior no desktop
    },
  },

  // Estilos para telas menores (celular)
  '@media (max-width: 768px)': {
    banner: {
      flexDirection: 'column',
      alignItems: 'center',
      height: 'auto', // Ajusta altura automaticamente no celular
      padding: '30px',
    },
    infoContainer: {
      marginLeft: '0',
      textAlign: 'center',
    },
    photoContainer: {
      marginBottom: '20px',
    },
    photo: {
      maxWidth: '150px', // Foto menor no celular
    },
    name: {
      fontSize: '1.5rem', // Texto ajustado para celular
    },
    role: {
      fontSize: '1rem',
    },
    description: {
      fontSize: '0.9rem',
    },
    socialIcons: {
      justifyContent: 'center',
    },
  },
}));

const ConsultorImobiliario: React.FC = () => {
  const classes = useStyles();

  return (
    <section className={classes.banner}>
      {/* Foto do Consultor */}
      <div className={classes.photoContainer}>
        <motion.img
          src="/gui.png"
          alt="Consultor Imobiliário"
          className={classes.photo}
          whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}
        />
      </div>

      {/* Informações do Consultor */}
      <div className={classes.infoContainer}>
        <motion.h1
          className={classes.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Guilherme Martins
        </motion.h1>
        <motion.h2
          className={classes.role}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          Consultor Imobiliário
        </motion.h2>
        <motion.p
          className={classes.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Especialista em encontrar o imóvel perfeito para você. Atuando em Tubarão, Santa Catarina.
        </motion.p>
        <div className={classes.socialIcons}>
          <motion.a
            href="https://www.instagram.com/guilherme_amartins/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
          >
            <AiOutlineInstagram className={`${classes.icon} ${classes.instagramIcon}`} />
          </motion.a>
          <motion.a
            href="https://wa.me/5548996421279"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
          >
            <AiOutlineWhatsApp className={`${classes.icon} ${classes.whatsappIcon}`} />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ConsultorImobiliario;
