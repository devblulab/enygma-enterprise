
import Cabecalho from '@/components/enterprises/imobiliaria/Cabecalho';
import React from 'react';
import ListaPedente from '../../../../components/enterprises/imobiliaria/Catalago/Landpage/Landpage';
import Rodape from '../../../../components/inventario/Footer';




const PageFood: React.FC = () => {
  return (
    <>
    
      <Cabecalho />
      <ListaPedente />
      <Rodape />
      
    </>
  );
};

export default PageFood;