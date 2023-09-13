import React, { useState } from 'react';
import ListPost from './ListPost';
import ItemList from './ItemList';
import ForcarAutenticacao from "../../../../../components/autenticacao/ForcarAutenticacao";




interface Item {
  id: string;
  cliente: string;
  total: number;
  status: string;
  nome: string;
  quantidade: number;
  mesa: string;
  concluido: boolean;
  userId: string;
  unidadevalor: number;

 
  

}

const Produtoset: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (newItem: Item) => {
    setItems([...items, newItem]);
  };

  return (
    <>
    <ForcarAutenticacao>
    
      <ListPost setItems={(items) => addItem} />
      <ItemList items={items} />
      </ForcarAutenticacao>
    </>
  );
};

export default Produtoset;
