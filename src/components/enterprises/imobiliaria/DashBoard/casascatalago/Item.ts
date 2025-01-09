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
  
  imagemUrls: string[];
  garagem: string;
  cozinha: string;
  banheiro: string;
  dormitorio: string;
  sala: string;
  localizacao: string;
  metros: string,
    terreno: string,
    bairo: string,


}

export default Item;