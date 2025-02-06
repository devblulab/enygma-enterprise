import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button, Box, Typography, Paper, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Estilos personalizados
const useStyles = makeStyles((theme) => ({
  signatureContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
    backgroundColor: 'rgba(190, 190, 190, 0.42)',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  signatureCanvas: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgba(255, 255, 255, 0.64)',
    boxShadow: theme.shadows[2],
  },
  buttonGroup: {
    display: 'flex',
    gap: theme.spacing(2),
  },
  errorMessage: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(1),
  },
}));

interface SignaturePadProps {
  onSave: (signature: string) => void; // Callback para salvar a assinatura
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave }) => {
  const classes = useStyles();
  const theme = useTheme();
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const [error, setError] = useState<string | null>(null); // Estado para mensagens de erro

  // Limpa o canvas de assinatura
  const handleClear = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setError(null); // Limpa o erro ao limpar a assinatura
    }
  };

  // Salva a assinatura
  const handleSave = () => {
    if (sigCanvas.current) {
      if (sigCanvas.current.isEmpty()) {
        setError('Por favor, assine antes de salvar.'); // Mensagem de erro se o canvas estiver vazio
        return;
      }
      const signature = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'); // Converte a assinatura para base64
      onSave(signature); // Passa a assinatura para o callback
      setError(null); // Limpa o erro após salvar
    }
  };

  return (
    <Paper elevation={3} className={classes.signatureContainer}>
      <Typography variant="h6" gutterBottom>
        Assinatura do Cliente
      </Typography>
      <SignatureCanvas
        ref={(ref) => (sigCanvas.current = ref)}
        canvasProps={{
          width: 500,
          height: 200,
          className: classes.signatureCanvas,
        }}
      />
      {error && (
        <Typography variant="body2" className={classes.errorMessage}>
          {error}
        </Typography>
      )}
      <Box className={classes.buttonGroup}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClear}
          aria-label="Limpar assinatura"
        >
          Limpar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          aria-label="Salvar assinatura"
        >
          Salvar Assinatura
        </Button>
      </Box>
    </Paper>
  );
};

export default SignaturePad;