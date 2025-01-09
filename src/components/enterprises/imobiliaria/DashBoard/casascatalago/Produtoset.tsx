import React, { useState } from 'react';
import ListPost from './ListPost';
import ItemList from './ItemList';





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
  localizacao: string;
  metros: string;
  terreno: string;
  imagemUrls: string[];
  garagem: string;
  cozinha: string;
  banheiro: string;
  dormitorio: string;
  sala: string;
  bairo:string;
  
 
  

}

const Produtoset: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (newItem: Item) => {
    setItems([...items, newItem]);
  };

  return (
    <>
  
    
      <ListPost setItems={(items) => addItem} />
      <ItemList items={items} />
     
    </>
  );
};

export default Produtoset;
