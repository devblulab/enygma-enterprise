import React from 'react';
import { TextField, Button, Typography, Grid } from '@material-ui/core';
import styles from './Header.module.css';

interface Product {
  id: string;
  name: string;
  quantity: number;
  value: number;
  userId: string;
}

interface HeaderProps {
  newProduct: Product;
  onProductChange: (product: Product) => void;
  onAddProduct: () => void;
}

const Header: React.FC<HeaderProps> = ({ newProduct, onProductChange, onAddProduct }) => {
  return (
    
    <div className="mb-8 px-4">
      <Typography variant="h4" align="center" gutterBottom>
        Adicionar Produto
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            label="ID"
            value={newProduct.id}
            onChange={(e) => onProductChange({ ...newProduct, id: e.target.value })}
            fullWidth
            variant="outlined"
            InputProps={{
              className: styles.inputField,
            }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Nome"
            value={newProduct.name}
            onChange={(e) => onProductChange({ ...newProduct, name: e.target.value })}
            fullWidth
            variant="outlined"
            InputProps={{
              className: styles.inputField,
            }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Quantidade"
            type="number"
            value={newProduct.quantity}
            onChange={(e) =>
              onProductChange({
                ...newProduct,
                quantity: parseInt(e.target.value, 10) || 0,
              })
            }
            fullWidth
            variant="outlined"
            InputProps={{
              className: styles.inputField,
            }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Valor"
            type="number"
            value={newProduct.value}
            onChange={(e) =>
              onProductChange({
                ...newProduct,
                value: parseFloat(e.target.value) || 0,
              })
            }
            fullWidth
            variant="outlined"
            InputProps={{
              className: styles.inputField,
            }}
            InputLabelProps={{
              style: { color: 'white' }
            }}
          />
        </Grid>
      </Grid>
      
      <Button
        onClick={onAddProduct}
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        style={{ marginTop: '1rem' }}
      >
        Adicionar
      </Button>
    </div>
  );
};

export default Header;
