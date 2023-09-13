import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  collection,
  getFirestore,
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
  
  Timestamp,
  where,
  query,
  getDocs,
  addDoc,
  serverTimestamp,
 
} from 'firebase/firestore';
import { app } from '../../../../logic/firebase/config/app';
import { DeleteOutline } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { deleteDoc } from 'firebase/firestore';
import Autenticacao from '../../../../logic/firebase/auth/Autenticacao';
import Colecao from '../../../../logic/firebase/db/Colecao';
import Usuario from '../../../../logic/core/usuario/Usuario';


import Item from './Items';



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
  card: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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

  cobrar: {
    backgroundColor: '#FFDDB3', // Laranja
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
const pedidosCollectionRef = collection(db, 'produtos');
const itemsCollectionRef = collection(db, 'EstoqueitensLoja');
// Helper function to generate a unique idcard based on mesa and client name




interface Pedido {
  idpedido: string;
  cliente: string;
  total: number;
  status: string;
  mesa: string;
  idcard: number;
  item: {
    id: string;
    status: string;
    nome: string;
    quantidade: number;
    mesa: string;
    concluido: boolean;
    userId: string;
    unidadevalor: number;
    timestamp: Timestamp;
  };
}

interface QuantidadesSelecionadas {
  [itemId: string]: number;
}



interface PedidosGroupedByMesa {
  [mesa: string]: Pedido[] | undefined;
}


const PedidoLista  = () => {

  const classes = useStyles();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [searchText, setSearchText] = useState('');
  const [novoPedidoMesa, setNovoPedidoMesa] = useState('');
  const [novoPedidoCliente, setNovoPedidoCliente] = useState('');
  const [novoPedidoQuantidade, setNovoPedidoQuantidade] = useState(1);
  const [pedidoIdCounter, setPedidoIdCounter] = useState(1);
  const autenticacao = new Autenticacao();
  const [user, setUser] = useState<Usuario | null>(null);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [hideCompletedMesas, setHideCompletedMesas] = useState(false);
  const [quantidadesSelecionadas, setQuantidadesSelecionadas] = useState<QuantidadesSelecionadas>({});

  const [idcardCounter, setIdcardCounter] = useState(1);

  const totalPedido = pedidos.reduce((acc, pedido) => acc + pedido.total, 0);

 
 
  const [statusMesa, setStatusMesa] = useState<string>('');
  const [items, setItems] = useState<Item[]>([]); 
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
    const pedidosQuery = query(pedidosCollectionRef, where('status', '==', user.id));
    const unsubscribe = onSnapshot(pedidosQuery, (querySnapshot) => {
     const fetchedPedidos: Pedido[] = [];
      querySnapshot.forEach((doc) => {
        const pedidoData = doc.data();
         fetchedPedidos.push({
          idpedido: doc.id,
          cliente: pedidoData.cliente,
          total: pedidoData.total,
          status: pedidoData.status,
          mesa: pedidoData.mesa,
          idcard: pedidoData.idcard,
          item: {
            id: pedidoData.item.id,
            status: pedidoData.item.status,
            nome: pedidoData.item.nome,
            quantidade: pedidoData.item.quantidade,
            mesa: pedidoData.item.mesa,
            concluido: pedidoData.item.concluido,
            userId: pedidoData.item.userId,
            unidadevalor: pedidoData.item.unidadevalor,
            timestamp: pedidoData.item.timestamp,
          },
        });
      });
      setPedidos(fetchedPedidos);

      if (fetchedPedidos.length > 0) {
        setStatusMesa(fetchedPedidos[0].mesa);
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
    const fetchItems = async () => {
      const querySnapshot = await getDocs(itemsCollectionRef);
      const fetchedItems: Item[] = [];
  
      querySnapshot.forEach((doc) => {
        const itemData = doc.data();
        
  
        // Create a new Item object
        const newItem = {
          id: doc.id, // You can use the document ID as the item ID
          cliente: itemData.cliente,
          total: itemData.total,
          
          mesa: itemData.mesa,
          idcard: itemData.idcard,
          unidadevalor: itemData.unidadevalor,
          nome: itemData.nome,
          
           
            
            
            quantidade: itemData.quantidade,
           
           
            userId: itemData.userId,
            
            timestamp: itemData.timestamp,
            selected: itemData.selected,
            
  
          
        };
  
        fetchedItems.push(newItem);
      });
  
      setItems(fetchedItems);
    };
  
    fetchItems();
  }, []);
  


  

  const handleSearch = async () => {
    
    if (searchText.trim() !== '' && user) { // Certifique-se de que há um usuário autenticado
      const q = query(
        pedidosCollectionRef,
        where('userId', '==', user.id), // Adicione este filtro para garantir que apenas os pedidos do usuário logado sejam buscados
        where('mesa', '==', searchText)
      );

      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const fetchedPedidos: Pedido[] = [];
        querySnapshot.forEach((doc) => {
          const pedidoData = doc.data(); // Access the data of the document
          fetchedPedidos.push({
            idpedido: doc.id,
            cliente: pedidoData.cliente,
            total: pedidoData.total,
            status: pedidoData.status,
            mesa: pedidoData.mesa,
            idcard: pedidoData.idcard,
            item: {
              id: pedidoData.item.id,
              status: pedidoData.item.status,
              nome: pedidoData.item.nome,
              quantidade: pedidoData.item.quantidade,
              mesa: pedidoData.item.mesa,
              concluido: pedidoData.item.concluido,
              userId: pedidoData.item.userId,
              unidadevalor: pedidoData.item.unidadevalor,
              timestamp: pedidoData.item.timestamp,
            },
          });
        });
        setPedidos(fetchedPedidos);
      }
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  

  const handleDeleteItem = (itemId: string) => {
    setQuantidadesSelecionadas((prevQuantidadesSelecionadas) => {
      const updatedQuantidades = { ...prevQuantidadesSelecionadas };
      updatedQuantidades[itemId] = -1; // Set the quantity to 0 instead of deleting the item
      return updatedQuantidades;
    });
  };

const handleDeletePedido = async (idcard: number) => {
  try {
    // Locate the pedido document using the idcard property
    const q = query(pedidosCollectionRef, where('idcard', '==', idcard));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      await deleteDoc(doc(pedidosCollectionRef, docId));
      console.log('Pedido removido com sucesso!');
      
      // Update the state to remove the deleted pedido
      setPedidos((prevPedidos) => prevPedidos.filter((pedido) => pedido.idcard !== idcard));
    } else {
      console.error('Pedido não encontrado.');
    }
  } catch (error) {
    console.error('Erro ao remover o pedido:', error);
  }
};


const handleShowAllPedidos = async () => {
  try {
    if (user) { // Certifique-se de que há um usuário autenticado
      const q = query(
        pedidosCollectionRef,
        where('userId', '==', user.id) // Adicione este filtro para garantir que apenas os pedidos do usuário logado sejam buscados
      );

      const querySnapshot = await getDocs(q);
      const fetchedPedidos: Pedido[] = [];
      
      querySnapshot.forEach((doc) => {
        const pedidoData = doc.data();
        fetchedPedidos.push({
          idpedido: doc.id,
          cliente: pedidoData.cliente,
          total: pedidoData.total,
          status: pedidoData.status,
          mesa: pedidoData.mesa,
          idcard: pedidoData.idcard,
          item: {
            id: pedidoData.item.id,
            status: pedidoData.item.status,
            nome: pedidoData.item.nome,
            quantidade: pedidoData.item.quantidade,
            mesa: pedidoData.item.mesa,
            concluido: pedidoData.item.concluido,
            userId: pedidoData.item.userId,
            unidadevalor: pedidoData.item.unidadevalor,
            timestamp: pedidoData.item.timestamp,
          },
        });
      });

      setPedidos(fetchedPedidos);
    }
  } catch (error) {
    console.error('Erro ao buscar todos os pedidos:', error);
  }
};





const calculateTotalPorMesa = (mesa: string) => {
  const pedidosMesa = pedidosGroupedByMesa[mesa];
  if (!pedidosMesa) return 0;

  // Somando os totais dos pedidos da mesa
  const total = pedidosMesa.reduce((acc, pedido) => {
    const itemIds = pedido.idpedido.split(',');
    const pedidoTotal = itemIds.reduce((acc, itemId) => {
      const selectedItem = items.find((item) => item.id === itemId);
      if (selectedItem) {
        // Use the selected quantity from quantidadesSelecionadas if available
        const selectedQuantity = quantidadesSelecionadas[itemId] || novoPedidoQuantidade;

        return acc + selectedItem.unidadevalor * selectedQuantity;
      }
      return acc;
    }, 0);
    return acc + pedidoTotal;
  }, 0);

  return total.toFixed(2);
};

const handleNovoPedido = () => {


  const usuarioLogado = autenticacao.obterUsuarioLogado();

  if (usuarioLogado && Object.keys(quantidadesSelecionadas).length > 0 && novoPedidoMesa && novoPedidoCliente) {
    const itemIds = Object.keys(quantidadesSelecionadas);

    // Montando o ID do pedido usando o ID do item, a quantidade e o nome
    const idPedido = itemIds.map((itemId) => {
      const selectedItem = items.find((item) => item.id === itemId);
      if (selectedItem) {
        return `${selectedItem.nome}:${quantidadesSelecionadas[itemId]}`;
      }
      return '';
    }).join(',');

    const quantidade = novoPedidoQuantidade;
    const idcard = idcardCounter;


    // Somando os preços dos itens selecionados
    const total = itemIds.reduce((acc, itemId) => {
      const selectedItem = items.find((item) => item.id === itemId);
      if (selectedItem) {
        // Use the selected quantity from quantidadesSelecionadas if available
        const selectedQuantity = quantidadesSelecionadas[itemId] || quantidade;
        return acc + selectedItem.unidadevalor * selectedQuantity;
      }
      return acc;
    }, 0);

    const novoPedido = {
      idpedido: idPedido,
      cliente: novoPedidoCliente,
      total: Number(total),
      status: 'pendente',
      mesa: novoPedidoMesa,
      idcard: idcard,
      item: {
        id: itemIds.join(','),
        status: Object.values(quantidadesSelecionadas).map(() => 'pendente').join(','), // Atualizado
        nome: itemIds.map((itemId) => items.find((item) => item.id === itemId)?.nome).join(','), // Atualizado
        quantidade: quantidade,
        mesa: novoPedidoMesa,
        concluido: false, // Todos os itens são pendentes inicialmente, portanto, concluido é falso
        userId: usuarioLogado, // Preencha de acordo com a lógica necessária
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
        setNovoPedidoQuantidade(1);
        // Don't update quantidadesSelecionadas when adding a new order
        // setQuantidadesSelecionadas({}); // Limpar as quantidades selecionadas após adicionar o pedido
      })
      .catch((error) => {
        console.error('Erro ao adicionar o pedido:', error);
      });
  }
};


const updateStatus = async (pedidoId: string, newStatus: string) => {
  try {
    await updateDoc(doc(pedidosCollectionRef, pedidoId), { status: newStatus });
  } catch (error) {
    console.error('Erro ao atualizar o status do pedido:', error);
  }
};




const groupPedidosByMesa = () => {
  const pedidosGroupedByMesa: PedidosGroupedByMesa = {};
  pedidos.forEach((pedido) => {
    if (pedidosGroupedByMesa[pedido.mesa]) {
      pedidosGroupedByMesa[pedido.mesa]?.push(pedido);
    } else {
      pedidosGroupedByMesa[pedido.mesa] = [pedido];
    }      
  });
  return pedidosGroupedByMesa;
};
const pedidosGroupedByMesa: PedidosGroupedByMesa = groupPedidosByMesa();


const toggleHideCompletedMesas = () => {
  setHideCompletedMesas((prevHideCompletedMesas) => !prevHideCompletedMesas);
};

const handleStatusChange = async (idcard: number, newStatus: string) => {
  try {
    const q = query(pedidosCollectionRef, where('idcard', '==', idcard));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      await updateDoc(doc(pedidosCollectionRef, docId), { status: newStatus });

      if (newStatus === 'cobrar') {
        const cardElement = document.getElementById(`pedido-card-${docId}`);
        if (cardElement) {
          cardElement.classList.add(classes.cobrar);
        }
      } else if (newStatus !== 'cobrar') {
        // Remove a classe 'cobrado' quando o status não é mais 'cobrar'
        const cardElement = document.getElementById(`pedido-card-${docId}`);
        if (cardElement) {
          cardElement.classList.remove(classes.cobrar);
        }
      }

      if (newStatus === 'concluido') {
        const cardElement = document.getElementById(`pedido-card-${docId}`);
        if (cardElement) {
          cardElement.classList.add(classes.concluido);
        }
      } else if (newStatus !== 'concluido') {
        // Remove a classe 'cobrado' quando o status não é mais 'cobrar'
        const cardElement = document.getElementById(`pedido-card-${docId}`);
        if (cardElement) {
          cardElement.classList.remove(classes.concluido);
        }
      }

      console.log('Status do pedido atualizado com sucesso! New status:', newStatus);
    } else {
      console.error('Pedido não encontrado.');
    }
  } catch (error) {
    console.error('Erro ao atualizar o status do pedido:', error);
  }
};


const toggleItemSelection = (item: Item) => {
  setQuantidadesSelecionadas((prevQuantidadesSelecionadas) => {
    const prevQuantity = prevQuantidadesSelecionadas[item.id] || 0;
    const newQuantity = prevQuantity + novoPedidoQuantidade;
    return { ...prevQuantidadesSelecionadas, [item.id]: newQuantity };
  });

  setSelectedItems((prevSelectedItems) => {
    if (prevSelectedItems.includes(item)) {
      return prevSelectedItems.filter((selectedItem) => selectedItem !== item);
    } else {
      return [...prevSelectedItems, item];
    }
  });
};



const buscarQuantidadeDeItens = async (pedidoId: string) => {
  const pedidoDoc = doc(pedidosCollectionRef, pedidoId);
  const pedidoSnapshot = await getDoc(pedidoDoc);

  if (pedidoSnapshot.exists()) {
    const pedidoData = pedidoSnapshot.data();
    const mapeamentoItensPedido = pedidoData.mapeamentoItensPedido || {};

    let totalCost = 0;

    for (const itemId in mapeamentoItensPedido) {
      const quantidade = mapeamentoItensPedido[itemId];
      const itemDoc = doc(itemsCollectionRef, itemId);
      const itemSnapshot = await getDoc(itemDoc);

      if (itemSnapshot.exists()) {
        const itemData = itemSnapshot.data();
        const unidadevalor = itemData.unidadevalor || 0;

        totalCost += unidadevalor * quantidade;
      }
    }

    return totalCost;
  }

  return 0;
};



return (
<div className="justify-center container mx-auto p-15">
    <Paper className={classes.root}>
      <Typography variant="h5" align="center" gutterBottom>
        Clientes
      </Typography>
      <div className="flex mb-4">
        <TextField
          label="Buscar por ID"
          value={searchText}
          onChange={handleSearchInputChange}
          variant="outlined"
          size="small"
          fullWidth
          className="mr-2"
        />
        <Button onClick={handleSearch} variant="contained" color="primary">
          Buscar
        </Button>
        <Button onClick={handleShowAllPedidos} variant="contained" color="primary">
            Todos
          </Button>
      </div>
      {Object.keys(pedidosGroupedByMesa).map((mesa) => {
  const pedidosMesa = pedidosGroupedByMesa[mesa];
  if (pedidosMesa && pedidosMesa.length > 0) {
    const isMesaConcluida = pedidosMesa.every((pedido) => pedido.status === 'concluido');
    const totalMesa = calculateTotalPorMesa(mesa);

    

   
if (hideCompletedMesas && isMesaConcluida) {
      return null;
    }

    return (
      <div key={mesa}>

       
    
    {pedidosMesa.map((pedido) => ( 
            <Card
            key={pedido.idpedido}
            className={`${classes.card} ${
              pedido.status === 'pendente'
                ? classes.pendente
                : pedido.status === 'concluido'
                ? classes.concluido
                : classes.cobrar
                
            }`} 
>
<CardContent>
  
<Typography variant="h6">Cliente: {pedido.mesa}</Typography>
<Typography variant="h6">Total: R$ {pedido.total}</Typography>
            <Typography variant="h6">Atendente: {pedido.cliente}</Typography>
            <Typography variant="h6">Status: {pedido.status}</Typography>
            <Typography variant="h6">Pedidos: {pedido.item.nome}</Typography>
            
                </CardContent>
                <IconButton
    onClick={() => handleDeletePedido(pedido.idcard)} 
    size="small"
  >
    <DeleteOutline />
  </IconButton>
  <div>
   
  <Button
  className={classes.button}
  variant="contained"
  color="secondary"
  onClick={() => handleStatusChange(pedido.idcard, 'pendente')}
>
  Pacote
</Button>
<Button
  className={classes.button}
  variant="contained"
  color="primary"
  onClick={() => handleStatusChange(pedido.idcard, 'concluido')}
>
  Concluído
</Button>
<Button
  className={classes.button}
  variant="contained"
  color="secondary"
  onClick={() => handleStatusChange(pedido.idcard, 'cobrar')}
>
  Cobrar
</Button>


          </div>
              </Card>
            ))}
          </div>
        );
          }
      })}
    </Paper>
  </div>
);
};

  export default PedidoLista;