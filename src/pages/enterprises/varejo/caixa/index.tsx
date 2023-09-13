
import Cabecalho from '@/components/enterprises/varejo/Cabecalho';
import React from 'react';
import Caixa from '@/components/enterprises/varejo/Caixa/CaixaPage';
import Rodape from '@/components/inventario/Footer';
import ForcarAutenticacao from "@/components/autenticacao/ForcarAutenticacao";



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