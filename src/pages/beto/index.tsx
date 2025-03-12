import Link from 'next/link';
import { Menu } from 'antd';
import { FaHome, FaShoppingCart, FaStore } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  menuWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    background: 'rgb(255, 255, 255)',
  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 1,
  },
  menuContainer: {
    width: '90%',
    maxWidth: '500px',
    background: 'rgba(255, 255, 255, 0.39)',
    borderRadius: '20px',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-around',
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(10px)',
    position: 'relative',
    zIndex: 1,
  },
  menuItem: {
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    borderRadius: '12px',
    padding: '12px',
    textAlign: 'center',
  },
  menuItemHover: {
    background: 'rgba(255, 255, 255, 0.2)',
  }
});

const BotoesNavegacao = () => {
  const classes = useStyles();

  return (
    <div className={classes.menuWrapper}>
      <video autoPlay loop muted className={classes.videoBackground}>
        <source src="/betovideo.mp4" type="video/mp4" />
      </video>
      <Menu mode="horizontal" className={classes.menuContainer}>
        
        <Menu.Item icon={<FaShoppingCart />} className={classes.menuItem}>
          <Link href="/beto/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item icon={<FaStore />} className={classes.menuItem}>
          <Link href="/beto/requerimento">Loja</Link>
        </Menu.Item>
        <Menu.Item icon={<FaHome />} className={classes.menuItem}>
          <Link href="/beto/requerimento/digital">Digital</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default BotoesNavegacao;
