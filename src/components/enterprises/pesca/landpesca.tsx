import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import Add from './Add'; // Componente Add (note que a convenção é usar PascalCase)
import Depoimento from './Depoimento'; // Componente Depoimento (novamente, PascalCase)
import TiposCarteira from './TiposCarteira';
import Header from './Header';


interface Item {
  id: string;
  cliente: string;
  total: number;
  nome: string;
  mesa: string;
  status: string;
  unidadevalor: number;
  concluido: boolean;
  tipo: string;
  quantidade: number;
  userId: string;
  selected: boolean;
  imagemUrls: string[];
  garagem: string;
  cozinha: string;
  banheiro: string;
  dormitorio: string;
  sala: string;
  localizacao: string;
  bairo: string;
  metros: string;
  terreno: string;
}

const Produtoset: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]); // Usando o estado para itens
  const router = useRouter(); // Se necessário para navegação

  const addItem = (newItem: Item) => {
    setItems([...items, newItem]); // Função para adicionar um novo item
  };

  return (
    <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Header />
      <TiposCarteira />
    <Depoimento />
    
      <Add />
      
      
     
    </div>
  );
};

export default Produtoset;
