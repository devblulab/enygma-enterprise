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
}

export default Item;
