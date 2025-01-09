import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ImageUploader from './ImageUploader'; // Componente para upload de imagem

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f1f8e9', // Cor de fundo suave
    paddingBottom: theme.spacing(6),
    zIndex: 2,
  },
  form: {
    padding: theme.spacing(4),
    maxWidth: 800,
    width: '100%',
    backgroundColor: '#ffffff', // Fundo claro para o formulário
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', // Sombra para profundidade
    borderRadius: 12,
    marginBottom: theme.spacing(4),
  },
  contactForm: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    maxWidth: 800,
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  },
  hero: {
    textAlign: 'center',
    marginBottom: theme.spacing(5),
    padding: theme.spacing(3),
    backgroundColor: '#000', // Cor sofisticada
    color: '#ecf0f1',
    borderRadius: 8,
    width: '100%',
  },
  titulo: {
    fontSize: '2.5rem',
    fontWeight: 600,
    fontFamily: 'Roboto, sans-serif',
  },
  subtitulo: {
    fontSize: '1.2rem',
    fontWeight: 400,
    marginTop: theme.spacing(1),
  },
  card: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: 12,
    textAlign: 'center',
  },
  heroImage: {
    maxWidth: '100%',
    borderRadius: 8,
    marginTop: theme.spacing(3),
  },
  inputField: {
    marginBottom: theme.spacing(2),
    fontSize: '1.2rem', // Fonte maior para legibilidade
  },
  button: {
    marginTop: theme.spacing(2),
    fontSize: '1.2rem',
    padding: theme.spacing(1.5),
    borderRadius: 8,
  },
  inputGrid: {
    marginTop: theme.spacing(3),
  },
  imagemItem: {
    maxWidth: '100%',
    borderRadius: 8,
    marginTop: theme.spacing(2),
  },
  footer: {
    textAlign: 'center',
    marginTop: theme.spacing(5),
    color: '#7f8c8d',
    fontSize: '1rem',
  },
}));

interface PescaItem {
  id: string;
  nome: string;
  tipo: string;
  valor: number;
  descricao: string;
  imagemUrl: string;
}

const addPage: React.FC = () => {
  const classes = useStyles();
  const [pescaItem, setPescaItem] = useState<PescaItem>({
    id: '',
    nome: '',
    tipo: '',
    valor: 0,
    descricao: '',
    imagemUrl: '',
  });

  const [items, setItems] = useState<PescaItem[]>([]);
  const [contactInfo, setContactInfo] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });

  const handleAddItem = () => {
    const newItem = { ...pescaItem };
    setItems((prevItems) => [...prevItems, newItem]);
    setPescaItem({ id: '', nome: '', tipo: '', valor: 0, descricao: '', imagemUrl: '' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulário enviado:', contactInfo);
    alert('Sua mensagem foi enviada com sucesso!');
    setContactInfo({ nome: '', email: '', mensagem: '' });
  };

  return (
    <div className={classes.container}>
   
      <div className={classes.hero}>
        <Typography variant="h4" className={classes.titulo}>
          Emissão de Carteiras de Pesca Profissional
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitulo}>
          Resolvo toda a burocracia para que você possa se concentrar no que realmente importa: pescar!
        </Typography>
      </div>

      {/* Formulário para Adicionar Itens */}
      <Paper className={classes.form}>
        <Typography variant="h5" align="center" gutterBottom>
          Adicione um Item ao Catálogo
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nome"
              value={pescaItem.nome}
              onChange={(e) => setPescaItem({ ...pescaItem, nome: e.target.value })}
              fullWidth
              variant="outlined"
              className={classes.inputField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Tipo"
              value={pescaItem.tipo}
              onChange={(e) => setPescaItem({ ...pescaItem, tipo: e.target.value })}
              fullWidth
              variant="outlined"
              className={classes.inputField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Valor (R$)"
              type="number"
              value={pescaItem.valor}
              onChange={(e) =>
                setPescaItem({ ...pescaItem, valor: parseFloat(e.target.value) || 0 })
              }
              fullWidth
              variant="outlined"
              className={classes.inputField}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descrição"
              value={pescaItem.descricao}
              onChange={(e) =>
                setPescaItem({ ...pescaItem, descricao: e.target.value })
              }
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              className={classes.inputField}
            />
          </Grid>
        </Grid>

        <ImageUploader
          item={pescaItem}
          onImageUpload={(imageUrl) => setPescaItem({ ...pescaItem, imagemUrl: imageUrl })}
        />

        <Button
          onClick={handleAddItem}
          variant="contained"
          color="primary"
          fullWidth
          className={classes.button}
        >
          Adicionar Item
        </Button>
      </Paper>

      {/* Lista de Itens */}
      <div>
        {items.map((item, index) => (
          <Paper key={index} className={classes.card}>
            <Typography variant="h6">{item.nome}</Typography>
            <Typography variant="body2">{item.descricao}</Typography>
            <Typography variant="subtitle1">
              Tipo: {item.tipo} | Valor: R$ {item.valor.toFixed(2)}
            </Typography>
            {item.imagemUrl && (
              <img src={item.imagemUrl} alt={item.nome} className={classes.imagemItem} />
            )}
          </Paper>
        ))}
      </div>

      {/* Formulário de Contato */}
      <Paper className={classes.contactForm}>
        <Typography variant="h5" align="center" gutterBottom>
          Entre em Contato
        </Typography>
        <form onSubmit={handleContactSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Seu Nome"
                value={contactInfo.nome}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, nome: e.target.value })
                }
                fullWidth
                variant="outlined"
                className={classes.inputField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Seu E-mail"
                type="email"
                value={contactInfo.email}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, email: e.target.value })
                }
                fullWidth
                variant="outlined"
                className={classes.inputField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mensagem"
                value={contactInfo.mensagem}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, mensagem: e.target.value })
                }
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                className={classes.inputField}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.button}
          >
            Enviar Mensagem
          </Button>
        </form>
      </Paper>

    </div>
  );
};

export default addPage;
