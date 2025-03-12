import Link from 'next/link';
import { FaHome, FaShoppingCart, FaStore } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const useStyles = makeStyles({
  menuWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    background: 'rgb(255, 255, 255)'
  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 1
  },
  menuContainer: {
    width: '90%',
    maxWidth: '600px',
    background: 'rgba(255, 255, 255, 0.39)',
    borderRadius: '20px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(10px)',
    position: 'relative',
    zIndex: 1,
    transition: 'all 0.3s ease'
  },
  menuItem: {
    color: '#000',
    fontSize: '24px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    borderRadius: '12px',
    padding: '12px',
    textAlign: 'center',
    cursor: 'pointer'
  }
});

const BotoesNavegacao = () => {
  const classes = useStyles();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Executa ao montar o componente
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={classes.menuWrapper}>
      <video autoPlay loop muted className={classes.videoBackground}>
        <source src="/betovideo.mp4" type="video/mp4" />
      </video>
      <motion.div
        className={classes.menuContainer}
        style={{ flexDirection: isMobile ? 'column' : 'row' }}
        animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <motion.div
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className={classes.menuItem}
        >
          <Link href="/beto/dashboard">
            <FaShoppingCart /> Dashboard
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.2, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          className={classes.menuItem}
        >
          <Link href="/beto/requerimento">
            <FaStore /> Loja
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className={classes.menuItem}
        >
          <Link href="/beto/requerimento/digital">
            <FaHome /> Digital
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BotoesNavegacao;
