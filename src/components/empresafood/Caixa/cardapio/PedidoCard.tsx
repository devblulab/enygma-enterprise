import React from 'react';
import { Paper, Typography, Button } from '@material-ui/core';

// Define the TypeScript interface for the 'pedido' prop
interface Pedido {
  is: string;
  cliente: string;
  total: number;
  status: string;
}

interface PedidoCardProps {
  pedido: Pedido;
  updateStatus: (is: string, status: string) => void;
  classes: any;
}

const PedidoCard: React.FC<PedidoCardProps> = ({ pedido, updateStatus, classes }) => {
  const { is, cliente, total, status } = pedido;

  const handleConcluirPedido = () => {
    if (status !== 'concluido') {
      updateStatus(is, 'concluido');
    }
  };

  return (
    <Paper className={`${classes.pedido} ${status === 'concluido' ? classes.concluido : classes.pendente}`}>
      <Typography variant="subtitle1" gutterBottom>
        ID do Pedido: {is}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Cliente: {cliente}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Total: R$ {total}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Status: {status === 'concluido' ? 'Pedido Concluído' : 'Pendente'}
      </Typography>
      <Button
        onClick={handleConcluirPedido}
        variant="contained"
        className={status === 'concluido' ? classes.buttonPendente : classes.button}
        size="small"
        disabled={status === 'concluido'}
      >
        {status === 'concluido' ? 'Pedido Concluído' : 'Concluir Pedido'}
      </Button>
    </Paper>
  );
};

export default PedidoCard;
