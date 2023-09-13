import Cabecalho from '@/components/enterprises/varejo/Cabecalho';
import React from 'react';
import PGGarcom from '@/components/enterprises/varejo/Atendente/PGAtendente';
import Rodape from '@/components/inventario/Footer';
import ForcarAutenticacao from "@/components/autenticacao/ForcarAutenticacao";



const PageGarcom: React.FC = () => {
  return (
    <>
    <ForcarAutenticacao>
      <Cabecalho />
      <PGGarcom />
      <Rodape />
      </ForcarAutenticacao>
    </>
  );
};

export default PageGarcom;