import Cabecalho from '@/components/empresafood/Cabecalho';
import React from 'react';
import PGGarcom from '../../../components/empresafood/Garcom/PGGarcoms';
import Rodape from '../../../components/inventario/Footer';
import ForcarAutenticacao from "../../../components/autenticacao/ForcarAutenticacao";



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