interface Item {
  id: string;
  cliente: string;
  total: number;
  
  nome: string;
  mesa: string;
  idcard: string;
  unidadevalor: number;
  
    
   
    
    quantidade: number;
  
    
    userId: string;
   
    timestamp: {
      seconds: number;
      nanoseconds: number;
    };
    selected: boolean;
  
}

export default Item;
