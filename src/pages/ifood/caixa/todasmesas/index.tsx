

import React from 'react';
import Todospedios from '../../../../components/empresafood/Caixa/todospedidos/Todospedios';
import Rodape from '../../../../components/inventario/Footer';
import ForcarAutenticacao from "../../../../components/autenticacao/ForcarAutenticacao";
import Cabecalho from '@/components/empresafood/Cabecalho';


const PageCaixa: React.FC = () => {
  return (
    <>
    <ForcarAutenticacao>
      <Cabecalho />
      <Todospedios />
      <Rodape />
      </ForcarAutenticacao>
    </>
  );
};

export default PageCaixa;