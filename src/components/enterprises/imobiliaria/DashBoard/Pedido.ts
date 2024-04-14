

export interface ItemPedido {
  id: string;
  status: string;
  nome: string;
  quantidade: number;
  mesa: string;
  concluido: boolean;
  userId: string;
  unidadevalor: number;
  timestamp: any; // Use o tipo correto para o campo timestamp
}

export interface Pedido {
  idpedido: string;
  cliente: any;
  total: any;
  status: any;
  mesa: any;
  idcard: any;
  item: ItemPedido; // Usar a interface ItemPedido aqui
}


export default Pedido;