
import Cabecalho from '@/components/enterprises/imobiliaria/Cabecalho';
import React from 'react';
import ListaPedente from '../../../../components/enterprises/imobiliaria/DashBoard/visordevendas/PendingOrders';
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