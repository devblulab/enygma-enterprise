
import Cabecalho from '@/components/enterprises/imobiliaria/Cabecalho';
import React from 'react';
import Caixa from '../../../../components/enterprises/imobiliaria/DashBoard/DashPage';
import Rodape from '../../../../components/inventario/Footer';




const PageCaixa: React.FC = () => {
  return (
    <>
    
      <Cabecalho />
      <Caixa />
      <Rodape />
  
    </>
  );
};

export default PageCaixa;