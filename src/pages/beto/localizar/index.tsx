import React, { useState } from 'react';

import ItemList from '../../../components/enterprises/betodespa/requerimento/ItemList';





interface Item {
  id:string,
    cliente: string,
   
    status: string,
    quantidade: number;
    imagemUrls: string[],
    concluido: false,
    placa: string,
    renavam: string,
    crv: string,
    valordevenda: number;
   
  

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
   celtelvendedor: string,
   cepvendedor: string;
    cepcomprador: string;
    tipo: string;
    cnpjempresa: string;
    nomeempresa: string;
    total: number;
  dataCriacao: Date;
    
 
  

}


const Produtoset: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (newItem: Item) => {
    setItems([...items, newItem]);
  };

  return (
    <>
  
    
      
      <ItemList items={items} />
     
    </>
  );
};

export default Produtoset;
