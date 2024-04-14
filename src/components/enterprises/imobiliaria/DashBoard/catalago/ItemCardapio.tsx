import React from 'react';
import { Paper, Typography, Grid, TextField } from '@material-ui/core';

interface Item {
  id: string;
  nome: string;
  unidadevalor: number;
  quantidade: number;
}

interface ItemCardapioProps {
  item: Item;
  selected: boolean;
  toggleItemSelection: (item: Item) => void;
  updateItemQuantity: (itemId: string, newQuantity: number) => void;
  classes: any; // You can define a proper type for classes if needed
}

const ItemCardapio: React.FC<ItemCardapioProps> = ({ item, selected, toggleItemSelection, updateItemQuantity, classes }) => {
  const { nome, unidadevalor, quantidade, id } = item;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    if (!isNaN(newQuantity)) {
      updateItemQuantity(id, newQuantity);
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4} key={id}>
      <Paper
        className={`${classes.itemCard} ${selected ? classes.itemCardSelected : ''}`}
        onClick={() => toggleItemSelection(item)}
      >
        <Typography variant="subtitle1">{nome}</Typography>
        <Typography variant="body1">Preço: R$ {unidadevalor}</Typography>
        <TextField
          label="Quantidade"
          type="number"
          value={quantidade}
          onChange={handleQuantityChange}
          variant="outlined"
          size="small"
        />
      </Paper>
    </Grid>
  );
};

export default ItemCardapio;
