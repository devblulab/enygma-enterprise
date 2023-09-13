import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Grid, Paper, ListItem, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { collection, getFirestore, onSnapshot, deleteDoc, doc, updateDoc, getDocs, where, query } from 'firebase/firestore';
import { app } from '@/logic/firebase/config/app';
import Colecao from '@/logic/firebase/db/Colecao';
import Autenticacao from '@/logic/firebase/auth/Autenticacao';
import Header from './Header';


const db = getFirestore(app);
const ProductsCollectionRef = collection(db, 'cadastrocliente');

interface Product {
  name: string;
  cpf: string;
  celular: string;
  idade: string;
  userId: string;
  id: string,
}

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
  item: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#00FF00',
    color: 'black',
  },
  buttonRemove: {
    backgroundColor: '#FF0000',
    color: 'black',
  },
})); 

const Content: React.FC = () => {
  const classes = useStyles();
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id:'',
    name: '',
    cpf: '',
    celular: '',
    idade: '',
    userId: '',
    
  });
  const colecao = new Colecao();
  const autenticacao = new Autenticacao();
  const [user, setUser] = useState<any | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

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
      const userProductsQuery = query(ProductsCollectionRef, where('userId', '==', user.id));
      const unsubscribe = onSnapshot(userProductsQuery, (querySnapshot) => {
        const fetchedProducts: Product[] = [];
        querySnapshot.forEach((doc) => {
          fetchedProducts.push({
            id: doc.id,
            name: doc.data().name,
            cpf: doc.data().cpf,
            celular: doc.data().celular,
            idade: doc.data().idade,
            userId: doc.data().userId,
            
          });
        });

        setProducts(fetchedProducts);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const adicionarCliente = async () => {
    try {
      if (user) {
        const ClienteSalvo = await colecao.salvar('cadastrocliente', { ...newProduct, userId: user.id });
        setProducts([...products, ClienteSalvo]);
        setNewProduct({id: '' , name: '', cpf: '', celular: '', idade: '', userId: ''  });
      }
    } catch (error) { 
      console.error('Erro ao adicionar o Cliente:', error);
    }
  };

  const removerCliente = async (productId: string) => {
    try {
      if (user) {
        await colecao.excluir('cadastrocliente', productId);
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error('Erro ao remover o Cliente:', error);
    }
  };

  const editarQuantidade = async (productId: string, newQuantity: string) => {
    try {
      if (user) {
        await colecao.atualizar('cadastrocliente', productId, { celular: newQuantity });
        const updatedProducts = products.map((product) => {
          if (product.id === productId) {
            return { ...product, celular: newQuantity };
          }
          return product;
        });
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error('Erro ao editar a quantidade do Cliente:', error);
    }
  };

  const editarValor = async (productId: string, newValue: string) => {
    try {
      if (user) {
        await colecao.atualizar('cadastrocliente', productId, { idade: newValue });
        const updatedProducts = products.map((product) => {
          if (product.id=== productId) {
            return { ...product, idade: newValue };
          }
          return product;
        });
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error('Erro ao editar o valor do Cliente:', error);
    }
  };

  const salvarCliente = async (productId: string) => {
    try {
      const productToSave = products.find((product) => product.id === productId);
      if (productToSave) {
        await colecao.salvar('cadastrocliente', productToSave, productId);
        const updatedProducts = products.map((product) => {
          if (product.id === productId) {
            return productToSave;
          }
          return product;
        });
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error('Erro ao salvar o Cliente:', error);
    }
  };

  const handleProductChange = (productId: string, field: keyof Product, idade: any) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, [field]: idade };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

 

  return (
    <div className="justify-center container mx-auto p-4">
      <Header
        newProduct={newProduct}
        onProductChange={setNewProduct}
        onAddProduct={adicionarCliente}
      />
      <List>
        {products.map((product) => (
          <ListItem
            key={product.id}
            className="flex flex-col sm:flex-row items-center justify-between bg-gray-400 rounded-md p-4 mb-4"
          >
            <div className="flex flex-col sm:flex-row w-full">
              <TextField
                className="mb-2 sm:mr-2"
                type="text"
                label="Nome"
                value={product.name}
                onChange={(e) => handleProductChange(product.id, 'name', e.target.value)}
                variant="outlined"
                disabled={editingProductId !== null && editingProductId !== product.id}
              />
              <TextField
                className="mb-2 sm:mr-2"
                type="text"
                label="CPF"
                value={product.cpf}
                onChange={(e) => handleProductChange(product.id, 'cpf', e.target.value)}
                variant="outlined"
                disabled={editingProductId !== null && editingProductId !== product.id}
              />
              <TextField
                className="mb-2 sm:mr-2"
                type="number"
                label="CELULAR"
                value={product.celular}
                onChange={(e) =>
                  handleProductChange(product.id, 'celular', parseInt(e.target.value) )
                }
                variant="outlined"
                disabled={editingProductId !== null && editingProductId !== product.id}
                inputProps={{ min: 0 }}
              />
              <TextField
                className="mb-2 sm:mr-2"
                type="number"
                label="IDADE"
                value={product.idade}
                onChange={(e) =>
                  handleProductChange(product.id, 'idade', parseFloat(e.target.value) )
                }
                variant="outlined"
                disabled={editingProductId !== null && editingProductId !== product.id}
                inputProps={{ min: 0, step: 0.01 }}
              />
              <TextField
                className="mb-2 sm:mr-2"
                type="number"
                label="ID"
                value={product.id}
                onChange={(e) =>
                  handleProductChange(product.id, 'id', parseFloat(e.target.value) )
                }
                variant="outlined"
                disabled={editingProductId !== null && editingProductId !== product.id}
                inputProps={{ min: 0, step: 0.01 }}
              />
              
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              {editingProductId !== product.id ? (
                <Button
                  className="mb-2 sm:mb-0"
                  onClick={() => setEditingProductId(product.id)}
                  variant="contained"
                  color="primary"
                >
                  Editar
                </Button>
              ) : (
                <Button
                  className="mb-2 sm:mb-0"
                  onClick={() => {
                    setEditingProductId(null);
                    salvarCliente(product.id);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Salvar
                </Button>
              )}
              <Button
                onClick={() => removerCliente(product.id)}
                variant="contained"
                color="secondary"
              >
                Remover
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
     
    </div>
  );
};

export default Content;
