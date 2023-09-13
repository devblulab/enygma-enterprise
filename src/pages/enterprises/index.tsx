import React from 'react';
import Cabecalho from '../../components/template/Cabecalho';
import Enterprises from '../../components/centralmenu/Enterprises';

const HomePage: React.FC = () => {
  return (
    <div style={{ position: 'relative' }}>
      <Cabecalho />
      <Enterprises  />
    </div>
  );
};

export default HomePage;
