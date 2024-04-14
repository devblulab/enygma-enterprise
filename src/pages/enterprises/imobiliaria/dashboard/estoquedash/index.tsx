import React from 'react';
import Content from '@/components/enterprises/imobiliaria/DashBoard/estoque/Content';
import Cabecalho from '@/components/enterprises/imobiliaria/Cabecalho';
import Rodape from '@/components/inventario/Footer';


const PostPage: React.FC = () => {
  return (
    <>
   
      <Cabecalho />
      <Content />
      <Rodape />
      
    </>
  );
};

export default PostPage;