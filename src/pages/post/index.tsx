import React from 'react';
import PostComponent from '../../components/feed/PostLogic';
import Cabecalho from '../../components/template/Cabecalho';
import ForcarAutenticacao from "../../components/autenticacao/ForcarAutenticacao";



const PostPage: React.FC = () => {
  return (
    <>
    <ForcarAutenticacao>
      <Cabecalho />
      <PostComponent />
      </ForcarAutenticacao>
    </>
  );
};

export default PostPage;