
import Cabecalho from '@/components/enterprises/imobiliaria/Cabecalho';

import React from 'react';
import Produto from '@/components/enterprises/imobiliaria/DashBoard/casascatalago/capaland/Capaset';
import Rodape from '@/components/inventario/Footer';



const PageProduto: React.FC = () => {
  return (
    <>
  
      <Cabecalho />
      <Produto />
      <Rodape />
  
    </>
  );
};

export default PageProduto;