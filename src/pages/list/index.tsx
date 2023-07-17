import React, { useState } from 'react';
import Cabecalho from '../../components/template/Cabecalho';
import ListPost from '../../components/lista/ListPost';
import ItemList from '../../components/lista/ItemList';
import ForcarAutenticacao from "../../components/autenticacao/ForcarAutenticacao";


interface Item {
  id: string;
  nome: string;
  quantidade: number;
  localCompra: string;
  concluido: boolean;
  userId: 'string',
}

const ListPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (newItem: Item) => {
    setItems([...items, newItem]);
  };

  return (
    <>
    <ForcarAutenticacao>
      <Cabecalho />
      <ListPost setItems={(items) => addItem} />
      <ItemList items={items} />
      </ForcarAutenticacao>
    </>
  );
};

export default ListPage;
