import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import ItemList from './ItemList';
import CatalagoList from './catalagoList';
import Botaonv from './BotoesNavegacao';
import Faixaa from './faixademo';
import Historiaa from './historia';
import Rodape from './rodape/index';

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
  const [items, setItems] = useState<Item[]>([]);
  const router = useRouter();

  const addItem = (newItem: Item) => {
    setItems([...items, newItem]);
  };

  return (
    <>
      <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Botaonv />
        <CatalagoList items={items} />
        <Historiaa />
        <Faixaa />
        <ItemList items={items} />
        
        
        <Rodape />
      </div>
    </>
  );
};

export default Produtoset;
