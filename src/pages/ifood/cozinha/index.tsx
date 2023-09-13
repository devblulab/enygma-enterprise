
import Cabecalho from '@/components/empresafood/Cabecalho';
import React from 'react';
import ListaPedente from '../../../components/empresafood/Caixa/cozinha/PendingOrders';
import Rodape from '../../../components/inventario/Footer';
import ForcarAutenticacao from "../../../components/autenticacao/ForcarAutenticacao";



const PageFood: React.FC = () => {
  return (
    <>
    <ForcarAutenticacao>
      <Cabecalho />
      <ListaPedente />
      <Rodape />
      </ForcarAutenticacao>
    </>
  );
};

export default PageFood;