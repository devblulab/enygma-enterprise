import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Grid, Paper, ListItem, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { collection, getFirestore, onSnapshot, deleteDoc, doc, updateDoc, getDocs, where, query } from 'firebase/firestore';
import { app } from '@/logic/firebase/config/app';
import Colecao from '@/logic/firebase/db/Colecao';
import Autenticacao from '@/logic/firebase/auth/Autenticacao';
import Header from './Header';
import ValorTotal from './ValorTotal';

const db = getFirestore(app);
const ProductsCollectionRef = collection(db, 'Estoquecaixafood');

interface Product {
  id: string;
  name: string;
  quantity: number;
  value: number;
  userId: string;
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
    id: '',
    name: '',
    quantity: 0,
    value: 0,
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
            quantity: doc.data().quantity,
            value: doc.data().value,
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

  const adicionarProduto = async () => {
    try {
      if (user) {
        const produtoSalvo = await colecao.salvar('Estoquecaixafood', { ...newProduct, userId: user.id });
        setProducts([...products, produtoSalvo]);
        setNewProduct({ id: '', name: '', quantity: 0, value: 0, userId: '' });
      }
    } catch (error) {
      console.error('Erro ao adicionar o produto:', error);
    }
  };

  const removerProduto = async (productId: string) => {
    try {
      if (user) {
        await colecao.excluir('Estoquecaixafood', productId);
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error('Erro ao remover o produto:', error);
    }
  };

  const editarQuantidade = async (productId: string, newQuantity: number) => {
    try {
      if (user) {
        await colecao.atualizar('Estoquecaixafood', productId, { quantity: newQuantity });
        const updatedProducts = products.map((product) => {
          if (product.id === productId) {
            return { ...product, quantity: newQuantity };
          }
          return product;
        });
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error('Erro ao editar a quantidade do produto:', error);
    }
  };

  const editarValor = async (productId: string, newValue: number) => {
    try {
      if (user) {
        await colecao.atualizar('Estoquecaixafood', productId, { value: newValue });
        const updatedProducts = products.map((product) => {
          if (product.id === productId) {
            return { ...product, value: newValue };
          }
          return product;
        });
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error('Erro ao editar o valor do produto:', error);
    }
  };

  const salvarProduto = async (productId: string) => {
    try {
      const productToSave = products.find((product) => product.id === productId);
      if (productToSave) {
        await colecao.salvar('Estoquecaixafood', productToSave, productId);
        const updatedProducts = products.map((product) => {
          if (product.id === productId) {
            return productToSave;
          }
          return product;
        });
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error('Erro ao salvar o produto:', error);
    }
  };

  const handleProductChange = (productId: string, field: keyof Product, value: any) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, [field]: value };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const calcularValorTotalEstoque = () => {
    let totalValue = 0;
    products.forEach((product) => {
      totalValue += product.quantity * product.value;
    });
    return totalValue.toFixed(2);
  };

  return (
    <div className="justify-center container mx-auto p-4">
      <Header
        newProduct={newProduct}
        onProductChange={setNewProduct}
        onAddProduct={adicionarProduto}
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
                label="ID"
                value={product.id}
                onChange={(e) => handleProductChange(product.id, 'id', e.target.value)}
                variant="outlined"
                disabled={editingProductId !== null && editingProductId !== product.id}
              />
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
                type="number"
                label="Quantidade"
                value={product.quantity}
                onChange={(e) =>
                  handleProductChange(product.id, 'quantity', parseInt(e.target.value) )
                }
                variant="outlined"
                disabled={editingProductId !== null && editingProductId !== product.id}
                inputProps={{ min: 0 }}
              />
              <TextField
                className="mb-2 sm:mr-2"
                type="number"
                label="Valor"
                value={product.value}
                onChange={(e) =>
                  handleProductChange(product.id, 'value', parseFloat(e.target.value) )
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
                    salvarProduto(product.id);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Salvar
                </Button>
              )}
              <Button
                onClick={() => removerProduto(product.id)}
                variant="contained"
                color="secondary"
              >
                Remover
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
      <ValorTotal valorTotal={calcularValorTotalEstoque()} />
    </div>
  );
};

export default Content;
