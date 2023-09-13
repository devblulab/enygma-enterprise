
import Cabecalho from '../../components/template/Cabecalho';
import React from 'react';
import HomeFood from '../../components/empresafood/Caixa/HomeFood';
import Rodape from '../../components/inventario/Footer';
import ForcarAutenticacao from "../../components/autenticacao/ForcarAutenticacao";



const PageFood: React.FC = () => {
  return (
    <>
    <ForcarAutenticacao>
      <Cabecalho />
      <HomeFood />
      <Rodape />
      </ForcarAutenticacao>
    </>
  );
};

export default PageFood;