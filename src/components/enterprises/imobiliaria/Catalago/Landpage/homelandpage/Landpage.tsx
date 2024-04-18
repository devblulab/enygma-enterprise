import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import ItemList from './ItemList';
import CatalagoList from './catalagoList';
import Botaonv from './BotoesNavegacao';


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
  garagem: string,
    cozinha: string,
    banheiro: string,
    dormitorio: string,
    sala: string,
}


const Produtoset: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const router = useRouter();

  const addItem = (newItem: Item) => {
    setItems([...items, newItem]);
  };

 

  return (
    <>
   
    
      <ItemList items={items} />
      <CatalagoList items={items} />
    </>
  );
};

export default Produtoset;
