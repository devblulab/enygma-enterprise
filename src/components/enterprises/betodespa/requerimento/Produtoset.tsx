import React, { useState } from 'react';
import ListPost from './ListPost';
import ItemList from './ItemList';





interface Item {
  id:string,
    cliente: string,
    total: number;
    status: string,
    quantidade: number;
    imagemUrls: string[],
    concluido: false,
    placa: string,
    renavam: string,
    crv: string,
    valordevenda: number;
   
    localizacao: string,

    nomevendedor: string,
    cpfvendedor: string,
    enderecovendedor: string,
    complementovendedor: string,
    municipiovendedor: string,
    emailvendedor: string,

    nomecomprador: string,
    cpfcomprador: string,
    enderecocomprador: string,
    complementocomprador: string,
    municipiocomprador: string,
    emailcomprador: string,
   celtelcomprador: string,
 
  

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
