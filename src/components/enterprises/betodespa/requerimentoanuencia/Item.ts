import { Timestamp } from 'firebase/firestore';

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
    chassi:string,
    modelo:string,


    valordevenda:  string;
   bairroempresa: string,
    
   cargo:string,
    nomevendedor: string,
    cpfvendedor: string,
    enderecovendedor: string,
    complementovendedor: string,
    municipiovendedor: string,
    emailvendedor: string,
    dataCriacao: string | Timestamp;
    nomeempresa: string,
    cpfempresa: string,
    enderecoempresa: string,
    complementoempresa: string,
    municipioempresa: string,
    emailempresa: string,
   celtelempresa: string,
   cepvendedor: string;
    cepempresa: string;
    tipo: string;
    cnpjempresa: string;
   

    celtelvendedor: string,
    signature?: string; 
 
  

}
    


export default Item;
