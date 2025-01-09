import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  header: {
    position: 'fixed', // Fixa o cabeçalho no topo da página
    top: 0, // Garante que ele fique no topo
    left: 0,
    width: '100%', // Ocupa toda a largura da tela
    padding: '10px 0', // Espaçamento superior e inferior
    backgroundColor: '#2a3d4f', // Cor de fundo mais sofisticada
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Sombra para um efeito mais refinado
    zIndex: 1, // Garante que o cabeçalho esteja sempre no topo
  },
  logo: {
    maxHeight: '380px', // Aumenta um pouco a altura do logo
    width: 'auto',
    borderRadius: '8px', // Bordas arredondadas para suavizar o visual
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Adiciona uma sombra suave à imagem
    transition: 'transform 0.3s ease', // Efeito de transição para hover
    '&:hover': {
      transform: 'scale(1.05)', // Efeito de zoom suave ao passar o mouse
    },
  },
});

const Header: React.FC = () => {
  const classes = useStyles(); // Usando as classes definidas pelo makeStyles

  return (
    <header className={classes.header}>
      <img src="/pescabrasil.webp" alt="Logo Pescabrasil" className={classes.logo} />
    </header>
  );
};

export default Header;
