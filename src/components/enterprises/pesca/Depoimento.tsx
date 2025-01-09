import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Definição do tipo para o depoimento
interface Depoimento {
  nome: string;
  depoimento: string;
  foto: string; // URL da foto do depoente
}

const depoimentos: Depoimento[] = [
  {
    nome: "Carlos Silva",
    depoimento: "Adquirir minha carteira de pesca com vocês foi uma experiência excelente! O processo foi rápido e fácil, e agora posso pescar com mais segurança e legalidade.",
    foto: "https://randomuser.me/api/portraits/men/75.jpg", // Exemplo masculino
  },
  {
    nome: "Maria Oliveira",
    depoimento: "Muito satisfeita com o atendimento! A equipe foi muito prestativa e me explicou tudo direitinho sobre a minha carteira de pesca. Super recomendo!",
    foto: "https://randomuser.me/api/portraits/women/65.jpg", // Exemplo feminino
  },
  {
    nome: "João Souza",
    depoimento: "A aquisição da minha carteira foi simples e sem burocracia. Agora pescar ficou ainda mais prazeroso e sem preocupações legais.",
    foto: "https://randomuser.me/api/portraits/men/24.jpg", // Exemplo masculino
  },
];

// Estilos com makeStyles
const useStyles = makeStyles((theme) => ({
  depoimentosContainer: {
    textAlign: 'center',
    padding: '40px 20px',
    backgroundColor: '#f4f4f9', // Fundo mais suave e sofisticado
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)', // Sombra para profundidade
    borderRadius: '10px',
    margin: '20px',
    zIndex: 2, // Garante que o cabeçalho esteja sempre no topo
  },
  titulo: {
    fontSize: '2.5rem',
    fontWeight: 600,
    color: '#2c3e50', // Cor sofisticada para o título
    marginBottom: '30px',
    fontFamily: 'Roboto, sans-serif',
  },
  depoimentosList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px',
    marginTop: '20px',
  },
  depoimentoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Adicionando uma sombra mais suave
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)', // Efeito de elevação ao passar o mouse
      boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.2)', // Aumenta a sombra ao passar o mouse
    },
  },
  fotoDepoente: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid #fff', // Borda branca ao redor da foto
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Sombra para a foto
  },
  depoimentoTexto: {
    maxWidth: '450px',
    color: '#34495e',
    textAlign: 'left',
    fontSize: '1.1rem',
    fontFamily: 'Open Sans, sans-serif',
    lineHeight: '1.6',
  },
  nomeDepoente: {
    fontWeight: 700,
    fontSize: '1.2rem',
    color: '#2980b9', // Cor chamativa para o nome do depoente
  },
}));

const Depoimentos: React.FC = () => {
  const classes = useStyles(); // Usar os estilos

  return (
    <div className={classes.depoimentosContainer}>
      <h2 className={classes.titulo}>Depoimentos de Clientes</h2>
      <div className={classes.depoimentosList}>
        {depoimentos.map((depoimento, index) => (
          <div key={index} className={classes.depoimentoCard}>
            <img src={depoimento.foto} alt={depoimento.nome} className={classes.fotoDepoente} />
            <div className={classes.depoimentoTexto}>
              <p className={classes.nomeDepoente}><strong>{depoimento.nome}</strong></p>
              <p>{depoimento.depoimento}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Depoimentos;
