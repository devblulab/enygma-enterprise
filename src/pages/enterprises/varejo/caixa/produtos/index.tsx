
import Cabecalho from '@/components/enterprises/varejo/Cabecalho';

import React from 'react';
import Produto from '@/components/enterprises/varejo/Caixa/produto/Produtoset';
import Rodape from '@/components/inventario/Footer';
import ForcarAutenticacao from "@/components/autenticacao/ForcarAutenticacao";



const PageProduto: React.FC = () => {
  return (
    <>
    <ForcarAutenticacao>
      <Cabecalho />
      <Produto />
      <Rodape />
      </ForcarAutenticacao>
    </>
  );
};

export default PageProduto;