
import Cabecalho from '@/components/empresafood/Cabecalho';
import React from 'react';
import Caixa from '../../../components/empresafood/Caixa/CaixaPage';
import Rodape from '../../../components/inventario/Footer';
import ForcarAutenticacao from "../../../components/autenticacao/ForcarAutenticacao";



const PageCaixa: React.FC = () => {
  return (
    <>
    <ForcarAutenticacao>
      <Cabecalho />
      <Caixa />
      <Rodape />
      </ForcarAutenticacao>
    </>
  );
};

export default PageCaixa;