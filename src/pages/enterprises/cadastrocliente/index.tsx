import React from 'react';
import Content from '@/components/enterprises/cadastrocliente/Content';
import Cabecalho from '@/components/template/Cabecalho';
import Rodape from '@/components/inventario/Footer';
import ForcarAutenticacao from "@/components/autenticacao/ForcarAutenticacao";


const PostPage: React.FC = () => {
  return (
    <>
    <ForcarAutenticacao>
      <Cabecalho />
      <Content />
      <Rodape />
      </ForcarAutenticacao>
    </>
  );
};

export default PostPage;