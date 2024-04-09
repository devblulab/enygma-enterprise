import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  collection,
  getFirestore,
  onSnapshot,
  doc,
  updateDoc,
  where,
  query,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { app } from '../../../logic/firebase/config/app';
import { DeleteOutline } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import Lista from './PedidoLista';
import { CheckCircle as CheckCircleIcon, Error as ErrorIcon } from '@material-ui/icons';
import Pedido, { ItemPedido } from '../Caixa/Pedido';
import Item from '../Caixa/produto/Item';

import Autenticacao  from '../../../logic/firebase/auth/Autenticacao';
import Colecao from '../../../logic/firebase/db/Colecao';
import Usuario from '../../../logic/core/usuario/Usuario';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
    marginTop: theme.spacing(4),
    maxWidth: '500px',
  },
  pedido: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
concluido: {
  backgroundColor: '#D1FFD0',
},

pedidoContent: {
  flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

},

  pendente: {
    backgroundColor: '#FFD1D1',
    animation: 'pulse 1s infinite',
  },
  button: {
    backgroundColor: '#00FF00',
    color: 'black',
  },
  buttonPendente: {
    backgroundColor: '#FF0000',
    color: 'black',
  },
  itemCard: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: theme.spacing(2),
    height: '100%',
  },
  successMessage: {
    display: 'flex',
    alignItems: 'center',
    color: '#00aa00',
    marginTop: '10px',
    fontSize: '10px',
  },

  successIcon: {
    marginRight: '5px',
  },

  missingItem: {
    display: 'flex',
    alignItems: 'center',
    color: '#ff0000',
    marginTop: '5px',
  },

  missingIcon: {
    marginRight: '5px',
  },
  
  itemCardSelected: {
    border: '2px solid #00F',
  },
  '@keyframes pulse': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.5,
    },
    '100%': {
      opacity: 1,
    },
  },
}));

const db = getFirestore(app);
const pedidosCollectionRef = collection(db, 'pedidos');
const itemsCollectionRef = collection(db, 'FooditemsCardapio');

const autenticacao = new Autenticacao();

interface ExtendedItem extends Item {
  selected: boolean;
  
}

interface ImageThumbnailProps {
  id: string;
  imagemUrl: string;
}

const ImageThumbnail: React.FC<ImageThumbnailProps> = ({ id, imagemUrl }) => {
  console.log('Image URL:', imagemUrl); // Add this line for debugging
  return (
    <div className="flex-shrink-0 w-16 h-16 mr-4">
      <img src={imagemUrl} alt={`Thumbnail-${id}`} className="w-full h-full object-cover rounded" />
    </div>
  );
};


const PGGarcom = () => {
  
  
  const classes = useStyles();
 
  const [menuItems, setMenuItems] = useState<ExtendedItem[]>([]);
  const [novoPedidoItemId, setNovoPedidoItemId] = useState<string | null>(null);

  const [novoPedidoMesa, setNovoPedidoMesa] = useState('');
  const [novoPedidoCliente, setNovoPedidoCliente] = useState('');
  const [novoPedidoQuantidade, setNovoPedidoQuantidade] = useState(1);
  const [pedidoIdCounter, setPedidoIdCounter] = useState(1);
  
  const [selectedItems, setSelectedItems] = useState([]);
  const [hideCompletedMesas, setHideCompletedMesas] = useState(false);
  const [quantidadesSelecionadas, setQuantidadesSelecionadas] = useState<{ [itemId: string]: number }>({});

  const [idcardCounter, setIdcardCounter] = useState(1);

  const [successMessage, setSuccessMessage] = useState('');
  const [totalPedido, setTotalPedido] = useState(0);

  const [items, setItems] = useState<ExtendedItem[]>([]);
  const [missingItems, setMissingItems] = useState<string[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [statusMesa, setStatusMesa] = useState<string>('');
  const [user, setUser] = useState<Usuario | null>(null);
  const autenticacao = new Autenticacao();
  const colecao = new Colecao();
 
  useEffect(() => {
    const cancelarMonitoramento = autenticacao.monitorar((usuario) => {
      setUser(usuario);
    });
  
    return () => {
      cancelarMonitoramento();
    };
  }, []);


  useEffect(() => {
    if (user) {
    const pedidosQuery = query(pedidosCollectionRef, where('status', '!=', user.id));
    const unsubscribe = onSnapshot(pedidosQuery, (querySnapshot) => {
      const fetchedPedidos: Pedido[] = [];
    querySnapshot.forEach((doc) => {
      const pedidoData = doc.data();
      const itemData: ItemPedido = {  // Crie um objeto para a propriedade item
        id: pedidoData.item.id,
        status: pedidoData.item.status,
        nome: pedidoData.item.nome,
        quantidade: pedidoData.item.quantidade,
        mesa: pedidoData.item.mesa,
        concluido: pedidoData.item.concluido,
        userId: pedidoData.item.userId,
        unidadevalor: pedidoData.item.unidadevalor,
        timestamp: pedidoData.item.timestamp,
      };
      fetchedPedidos.push({
        idpedido: doc.id,
        cliente: pedidoData.cliente,
        
        total: pedidoData.total,
        status: pedidoData.status,
        mesa: pedidoData.mesa,
        idcard: pedidoData.idcard,
        item: itemData,  // Atribua o objeto criado à propriedade item
      });
    });
    setPedidos(fetchedPedidos);

    if (fetchedPedidos.length > 0) {
      setStatusMesa(fetchedPedidos[0].mesa); // Define o statusMesa aqui
    } else {
      setStatusMesa(''); 
    }
  });

    return () => {
      unsubscribe();
    };
  }
  }, [user]);
  
  useEffect(() => {
    const total = calcularTotalPedido();
    setTotalPedido(total);
  }, [quantidadesSelecionadas]);
  
  useEffect(() => {
    if (user) {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(itemsCollectionRef);
      const fetchedItems: ExtendedItem[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id, // You can use the document ID as the item ID
          cliente: data.cliente,
          status: data.status,
          concluido: data.concluido,
          total: data.total,
          
          mesa: data.mesa,
          idcard: data.idcard,
          unidadevalor: data.unidadevalor,
          nome: data.nome,
          
           
            
            
            quantidade: data.quantidade,
           
           
            userId: data.userId,
            
            timestamp: data.timestamp,
            selected: data.selected,
            imagemUrl: data.imagemUrl,
            tipo: data.tipo || '',
            
        };
      })
      .filter((item) => item.userId === user.id);
      setMenuItems(fetchedItems);
    };
    
   
    
    
   
  
    fetchItems();
  }
  }, [user]);
  
  const calcularTotalPedido = () => {
    let total = 0;
    menuItems.forEach((item) => {
      const quantidade = quantidadesSelecionadas[item.id] || 0;
      total += item.unidadevalor * quantidade;
    });
    return total;
  };
  

  const toggleItemSelection = (item: ExtendedItem) => {
    setMenuItems((prevMenuItems) =>
      prevMenuItems.map((prevItem) =>
        prevItem.id === item.id ? { ...prevItem, selected: !prevItem.selected } : prevItem
      )
    );
  
    setQuantidadesSelecionadas((prevQuantidadesSelecionadas) => {
      const prevQuantity = prevQuantidadesSelecionadas[item.nome] || 0;
      const newQuantity = prevQuantity + novoPedidoQuantidade;
      return { ...prevQuantidadesSelecionadas, [item.nome]: newQuantity };
    });
  };
  
    const handleDeleteItem = (itemId: string) => {
      setQuantidadesSelecionadas((prevQuantidadesSelecionadas) => {
        const updatedQuantidades = { ...prevQuantidadesSelecionadas };
        updatedQuantidades[itemId] = -1; // Set the quantity to 0 instead of deleting the item
        return updatedQuantidades;
      });
    };


    const createPedidoId = (selectedItems: ExtendedItem[]) => {
      const idParts = selectedItems.map((item) => `${item.nome} (${quantidadesSelecionadas[item.id]})`);
      return idParts.join(', ');
    };
    
    
  
    const handleNovoPedido = () => {
    const usuarioLogado = autenticacao.obterUsuarioLogado();

      if (usuarioLogado && novoPedidoMesa && novoPedidoCliente) {
        const selectedItems = menuItems.filter((item) => quantidadesSelecionadas[item.id] > 0);
        
        const idPedido = createPedidoId(selectedItems);
  
        const total = totalPedido;
        
        const novoPedido = {
          idpedido: idPedido,
          cliente: novoPedidoCliente,
          total: Number(total),
          status: 'pendente',
          mesa: novoPedidoMesa,
          idcard: idcardCounter,
          userId: usuarioLogado.id,
          item: {
            id: selectedItems.map((item) => item.id).join(','),
            status: selectedItems.map(() => 'pendente').join(','),
            nome: idPedido,
            quantidade: selectedItems.map((item) => quantidadesSelecionadas[item.id]),
            mesa: novoPedidoMesa,
            concluido: false,
            unidadevalor: Number(total),
            timestamp: serverTimestamp(),
          },
        };
  
        addDoc(pedidosCollectionRef, novoPedido)
          .then(() => {
            setPedidoIdCounter((prevCounter) => prevCounter + 1);
            setSelectedItems([]);
            setIdcardCounter((prevIdcardCounter) => prevIdcardCounter + 1);
            setNovoPedidoMesa('');
            setNovoPedidoCliente('');
            setNovoPedidoItemId(null);
            setSuccessMessage('Adicionado!');
            setTimeout(() => {
              setSuccessMessage('');
            }, 3000);
  
            const missing = menuItems
              .filter((item) => quantidadesSelecionadas[item.id] > 0)
              .filter((item) => !selectedItems.includes(item))
              .map((item) => `${item.nome} (${quantidadesSelecionadas[item.id]})`);
  
            setMissingItems(missing);
  
            setTimeout(() => {
              setMissingItems([]);
            }, 3000);
          })
          .catch((error) => {
            console.error('Erro ao adicionar o pedido:', error);
          });
      }
    };
    
  const groupPedidosByMesa = () => {
    const pedidosGroupedByMesa: { [mesa: string]: Pedido[] } = {};

    pedidos.forEach((pedido) => {
      if (pedidosGroupedByMesa[pedido.mesa]) {
        pedidosGroupedByMesa[pedido.mesa].push(pedido);
      } else {
        pedidosGroupedByMesa[pedido.mesa] = [pedido];
      }
    });
    return pedidosGroupedByMesa;
  };

  const pedidosGroupedByMesa = groupPedidosByMesa();

  const toggleHideCompletedMesas = () => {
    setHideCompletedMesas((prevHideCompletedMesas) => !prevHideCompletedMesas);
  };


  

  return (
    <div className="justify-center container mx-auto p-15">
      <Paper className={classes.root}>
      
        <div className="flex mt-4">
          <TextField
            label="Mesa"
            value={novoPedidoMesa}
            onChange={(e) => setNovoPedidoMesa(e.target.value)}
            variant="outlined"
            size="small"
            className="mr-2"
          />
          <TextField
            label="Cliente"
            value={novoPedidoCliente}
            onChange={(e) => setNovoPedidoCliente(e.target.value)}
            variant="outlined"
            size="small"
            className="mr-2"
          />
     <Button
  onClick={handleNovoPedido}
  variant="contained"
  color="primary">
  Adicionar Pedido
</Button>

{successMessage && (
  <div className={`success-message ${classes.successMessage}`}>
    <CheckCircleIcon className={`success-icon ${classes.successIcon}`} />
    {successMessage}
  </div>
)}

{missingItems.map((missingItemId) => (
  <div key={missingItemId} className={`missing-item ${classes.missingItem}`}>
    <ErrorIcon className={`missing-icon ${classes.missingIcon}`} />
    Item faltando no pedido: {missingItemId}
  </div>
  
))}

        </div>
        <Button
          onClick={toggleHideCompletedMesas}
          variant="contained"
          className={classes.button}
          size="small"
        >
          {hideCompletedMesas ? 'Mostrar Mesas Concluídas' : 'Ocultar Mesas Concluídas'}
        </Button>
      </Paper>
      <div>
        <Typography variant="h6" align="center" gutterBottom>
          Itens do Cardápio
        </Typography>
        <Grid container spacing={2}>
        {menuItems.map((item) => (
  <Grid item xs={12} sm={6} md={4} key={item.id}>
    <Paper
      className={`${classes.itemCard} ${
        item.selected ? classes.itemCardSelected : ''
      }`}
      onClick={() => toggleItemSelection(item)}
    >
      
      <ImageThumbnail id={item.id} imagemUrl={item.imagemUrl} />

      <Typography variant="subtitle1">{item.nome}</Typography>
      <Typography variant="body1">Preço: R$ {item.unidadevalor}</Typography>
      <TextField
        label="Quantidade"
        type="number"
        value={quantidadesSelecionadas[item.id] || item.quantidade}
        onChange={(e) => {
          const newQuantity = Number(e.target.value);
          if (!isNaN(newQuantity)) {
            setQuantidadesSelecionadas((prevQuantidadesSelecionadas) => ({
              ...prevQuantidadesSelecionadas,
              [item.id]: newQuantity,
            }));
          }
        }}
        variant="outlined"
        size="small"
      />
      <IconButton onClick={() => handleDeleteItem(item.id)} size="small">
        <DeleteOutline />
      </IconButton>
    </Paper>
  </Grid>
))}


        </Grid>
        <Lista />
      </div>
      </div>
  );
};


  

export default PGGarcom;