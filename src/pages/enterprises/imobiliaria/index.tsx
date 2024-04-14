
import Cabecalho from '../../../components/template/Cabecalho';
import React from 'react';
import HomeFood from '../../../components/enterprises/imobiliaria/DashBoard/HomeImobiliaria';
import Rodape from '../../../components/inventario/Footer';




const PageFood: React.FC = () => {
  return (
    <>
 
      <Cabecalho />
      <HomeFood />
      <Rodape />
   
    </>
  );
};

export default PageFood;