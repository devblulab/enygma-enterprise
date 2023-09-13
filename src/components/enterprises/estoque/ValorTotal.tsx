import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import styles from './ValorTotal.module.css';

interface ValorTotalProps {
  valorTotal: string;
}

const ValorTotal: React.FC<ValorTotalProps> = ({ valorTotal }) => {
  return (
    <Paper elevation={3} className={`${styles.valorTotal} p-4`}>
      <Typography variant="h6">Valor total do estoque:</Typography>
      <Typography variant="h4" color="primary">
        R$ {valorTotal}
      </Typography>
    </Paper>
  );
};

export default ValorTotal;
