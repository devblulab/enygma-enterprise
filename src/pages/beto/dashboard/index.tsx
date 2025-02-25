import React, { useState, useEffect } from 'react';
import {
  Typography, Paper, Card, TextField, Button, CircularProgress, IconButton,
  List, ListItem, ListItemText, Divider, Grid, Avatar, Badge, Tooltip, Snackbar 
} from '@material-ui/core';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import { collection, getFirestore, getDocs, updateDoc, doc, onSnapshot , deleteDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { app } from '@/logic/firebase/config/app';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  Refresh, ExpandMore, ExpandLess, PictureAsPdf, Edit, Save,
  Assignment, MonetizationOn, CheckCircle, DateRange, Brightness4, Brightness7, Delete
} from '@material-ui/icons';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Timestamp } from 'firebase/firestore';
import { Bar } from 'react-chartjs-2';



// Configuração do Firebase
const db = getFirestore(app);
const storage = getStorage(app);

// Registre os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  BarElement
);


interface Stats {
  total: number;
  pendentes: number;
  concluidos: number;
}

// Tema personalizado (Dark/Light Mode)
const theme = createTheme({
  palette: {
    type: 'light', // Inicia no modo claro
  },
});


  const useStyles = makeStyles((theme) => ({
    dashboardHeader: {
      marginBottom: theme.spacing(2),
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[3],
      backgroundColor: '#000'
    },
    statCard: {
      padding: '10px',
      textAlign: 'center',
      flexWrap: 'wrap',
      gap: '20px',
      backgroundColor: '#fff',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[10],
      },
    },
  dateFilter: {
    minWidth: '150px', // Define uma largura mínima para os campos de data
  },
  statIcon: {
    fontSize: '2rem',
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  paper: {
    padding: theme.spacing(4),
    margin: '20px auto',
    maxWidth: '1000px',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '12px',
    boxShadow: theme.shadows[5],
  },
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(4),
    flexWrap: 'wrap',
  },
  searchField: {
    flex: 1,
    minWidth: '250px',
  },
  button: {
    whiteSpace: 'nowrap',
    margin: theme.spacing(0.5),
  },
  listItemExpanded: {
    backgroundColor: theme.palette.action.hover,
    borderRadius: '8px',
    marginBottom: theme.spacing(1),
  },
  sectionTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    borderBottom: `2px solid ${theme.palette.divider}`,
  },
  field: {
    fontSize: '1rem',
    marginBottom: theme.spacing(-1),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.action.hover,
    borderRadius: '4px',
  },
  chartContainer: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: '12px',
    width: '400px',
    height: '200px',
    boxShadow: theme.shadows[3],
  },
  toggleDarkMode: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000,
  },
  chartHeader: {
    width: '400px',
    height: '200px',
    marginBottom: theme.spacing(4),
    borderRadius: '12px',
    boxShadow: theme.shadows[3],
    overflow: 'hidden',
  },
  listItemPendente: {
    backgroundColor: '#FFCDD2', // Vermelho claro para pendentes
  },
  listItemConcluido: {
    backgroundColor: '#C8E6C9', // Verde claro para concluídos
  },
}));

// Interface para os documentos
interface Item {
  id: string;
  cliente: string;
  total: number;
  status: string;
  quantidade: number;
  imagemUrls: string[];
  concluido: boolean;
  placa: string;
  renavam: string;
  crv: string;
  valordevenda: string;
  nomevendedor: string;
  cpfvendedor: string;
  enderecovendedor: string;
  complementovendedor: string;
  municipiovendedor: string;
  emailvendedor: string;
  nomecomprador: string;
  cpfcomprador: string;
  enderecocomprador: string;
  complementocomprador: string;
  municipiocomprador: string;
  emailcomprador: string;
  celtelcomprador: string;
  celtelvendedor: string;
  cepvendedor: string;
  cepcomprador: string;
  tipo: string;
  cnpjempresa: string;
  nomeempresa: string;
  dataCriacao: string | Timestamp;
}




// Função para formatar a data
const formatDate = (date: string | Timestamp): Date => {
  if (date instanceof Timestamp) {
    return date.toDate(); // Converte Timestamp para Date
  }
  return new Date(date); // Converte string para Date
};




// Função para converter string em número
const convertStringToNumber = (value: string): number => {
  if (!value || typeof value !== 'string') return 0; // Retorna 0 se o valor for nulo, indefinido ou não for uma string
  const cleanedValue = value.replace(/\./g, '').replace(',', '.'); // Remove pontos e substitui vírgula por ponto
  const numberValue = parseFloat(cleanedValue); // Converte para número
  
  return isNaN(numberValue) ? 0 : numberValue; // Retorna 0 se não for um número válido
};




// Componente DashboardHeader
const DashboardHeader: React.FC<{ stats: Stats }> = ({ stats }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.dashboardHeader}>
     
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.statCard}>
            <Assignment className={classes.statIcon} />
            <Typography variant="h6">Total Documentos</Typography>
            <Typography variant="h4">{stats.total}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.statCard}>
            <Badge color="secondary" badgeContent={stats.pendentes}>
              <Assignment className={classes.statIcon} />
            </Badge>
            <Typography variant="h6">Pendentes</Typography>
            <Typography variant="h4">{stats.pendentes}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.statCard}>
            <CheckCircle className={classes.statIcon} />
            <Typography variant="h6">Concluídos</Typography>
            <Typography variant="h4">{stats.concluidos}</Typography>
          </Card>
        </Grid>
       
      </Grid>
    </Paper>
  );
};

// Componente principal
const Dashboard = () => {
  const classes = useStyles();
  const [documents, setDocuments] = useState<Item[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editingDoc, setEditingDoc] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Item>>({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    pendentes: 0,
    concluidos: 0,
    valorTotal: 0,
  });
  const [darkMode, setDarkMode] = useState(false);
  const [showOnlyPendentes, setShowOnlyPendentes] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [newDocumentMessage, setNewDocumentMessage] = useState('');

  // Alternar Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    theme.palette.type = darkMode ? 'light' : 'dark';
  };

  // Calcular estatísticas
  const calculateStats = (docs: Item[]) => {
    const newStats = {
      total: docs.length,
      pendentes: docs.filter(d => d.status === 'Pendente').length,
      concluidos: docs.filter(d => d.status === 'Concluído').length,
      valorTotal: docs.reduce((sum, d) => sum + convertStringToNumber(d.valordevenda || '0'), 0), // Garante que valordevenda seja uma string
    };
    setStats(newStats);
  };


  const handleDeleteDocument = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'Betodespachanteintrncaodevenda', id)); // Exclui do Firestore
  
      // Atualiza a lista localmente para remover o documento excluído sem precisar atualizar a página
      setDocuments((prevDocuments) => prevDocuments.filter(doc => doc.id !== id));
  
      console.log(`✅ Documento ${id} excluído com sucesso!`);
    } catch (error) {
      console.error('❌ Erro ao excluir o documento:', error);
    }
  };
  // Buscar documentos
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const itemsCollectionRef = collection(db, 'Betodespachanteintrncaodevenda');
      const querySnapshot = await getDocs(itemsCollectionRef);
      const fetchedItems: Item[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<Item, 'id'>;
        const documentDate = formatDate(data.dataCriacao); // Usa a função formatDate

        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if (
          data.nomeempresa.toLowerCase().includes(searchText.toLowerCase()) ||
          data.cnpjempresa.includes(searchText)
        ) {
          if ((!start || documentDate >= start) && (!end || documentDate <= end)) {
            fetchedItems.push({ id: doc.id, ...data });
          }
        }
      });

      // Ordenar documentos pela data de criação (mais recente primeiro)
      fetchedItems.sort((a, b) => {
        const dateA = formatDate(a.dataCriacao).getTime();
        const dateB = formatDate(b.dataCriacao).getTime();
        return dateB - dateA;
      });

      setDocuments(fetchedItems);
      calculateStats(fetchedItems);
    } catch (error) {
      console.error('Erro ao buscar os itens:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const itemsCollectionRef = collection(db, 'Betodespachanteintrncaodevenda');

    const unsubscribe = onSnapshot(itemsCollectionRef, (snapshot) => {
      const updatedDocuments: Item[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<Item, 'id'>;
        updatedDocuments.push({ id: doc.id, ...data });
      });

      // Ordenar documentos pela data de criação (mais recente primeiro)
      updatedDocuments.sort((a, b) => {
        const dateA = formatDate(a.dataCriacao).getTime();
        const dateB = formatDate(b.dataCriacao).getTime();
        return dateB - dateA;
      });

      // Atualizar o estado dos documentos
      setDocuments(updatedDocuments);
      calculateStats(updatedDocuments);

      // Verificar se há novos documentos adicionados
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const newDoc = change.doc.data() as Item;
          if (newDoc.status === 'Pendente') {
            setNewDocumentMessage('Novo requerimento adicionado!');
            setSnackbarOpen(true);
          }
        }
      });
    });

    return () => unsubscribe();
  }, []);
  
  // Gerar PDF
  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.text('Relatório Completo de Documentos', 14, 15);
    autoTable(pdf, {
      head: [['Empresa', 'CNPJ', 'Status', 'Valor', 'Data Criação']],
      body: documents.map(d => [
        d.nomeempresa,
        d.cnpjempresa,
        d.status,
        `R$ ${Number(d.valordevenda || 0).toFixed(2)}`,
        formatDate(d.dataCriacao).toLocaleDateString() // Usa a função formatDate
      ]),
    });
    pdf.save('relatorio-documentos.pdf');
  };

  // Agrupar documentos por dia e contar quantos foram criados em cada dia
  const documentsByDay = documents.reduce((acc, doc) => {
    const date = formatDate(doc.dataCriacao).toLocaleDateString(); // Formata a data para o padrão local
    if (!acc[date]) {
      acc[date] = 0; // Inicializa o contador para a data
    }
    acc[date] += 1; // Incrementa o contador
    return acc;
  }, {} as Record<string, number>);

  // Converter o objeto agrupado em arrays de labels e data
  const labels = Object.keys(documentsByDay); // Datas
  const data = Object.values(documentsByDay); // Contagem de documentos por dia

  // Dados para o gráfico de barras
  const chartData = {
    labels: labels, // Datas no eixo X
    datasets: [
      {
        label: 'Documentos Criados por Dia',
        data: data, // Contagem de documentos no eixo Y
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Cor das barras
        borderColor: 'rgba(75, 192, 192, 1)', // Cor da borda das barras
        borderWidth: 1, // Largura da borda
      },
    ],
  };

  // Opções do gráfico
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Documentos Criados por Dia', // Título do gráfico
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Inicia o eixo Y do zero
        title: {
          display: true,
          text: 'Número de Documentos', // Título do eixo Y
        },
      },
      x: {
        title: {
          display: true,
          text: 'Data', // Título do eixo X
        },
      },
    },
  };

  // Função para salvar edições
  const handleSaveEdit = async () => {
    if (editingDoc && editData) {
      try {
        const docRef = doc(db, 'Betodespachanteintrncaodevenda', editingDoc);
        await updateDoc(docRef, editData); // Atualiza o documento no Firestore
        setEditingDoc(null); // Reseta o estado de edição
        setEditData({}); // Limpa os dados de edição
        fetchDocuments(); // Atualiza a lista de documentos
      } catch (error) {
        console.error('Erro ao salvar as alterações:', error);
      }
    }
  };

  // Função para iniciar a edição
  const handleEdit = (doc: Item) => {
    setEditingDoc(doc.id);
    setEditData(doc); // Define os dados atuais para edição
  };

  // Função para atualizar o status do documento
  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const docRef = doc(db, 'Betodespachanteintrncaodevenda', id);
      await updateDoc(docRef, { status });
      fetchDocuments(); // Atualiza a lista de documentos
    } catch (error) {
      console.error('Erro ao atualizar o status:', error);
    }
  };

  // Função para fechar o Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Filtrar documentos pendentes
  const filteredDocuments = showOnlyPendentes
    ? documents.filter(doc => doc.status === 'Pendente')
    : documents;

  // Ordenar documentos para que os pendentes fiquem no topo
  const pendentes = documents.filter(doc => doc.status === 'Pendente');
const concluidos = documents.filter(doc => doc.status === 'Concluído').slice(0, 5); // Apenas os 5 primeiros concluídos

// Combinar os documentos pendentes com os 5 concluídos
const sortedDocuments = [...pendentes, ...concluidos];

  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* Botão de Dark Mode */}
        <Tooltip title={darkMode ? 'Modo Claro' : 'Modo Escuro'}>
          <IconButton className={classes.toggleDarkMode} onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>

        <DashboardHeader stats={stats} />

        {/* Lista de Documentos no Topo */}
        <Paper className={classes.paper}>
          <div className={classes.filterContainer}>
            <TextField
              label="Buscar Nome/CNPJ"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              variant="outlined"
              className={classes.searchField}
            />
            
            <TextField
              label="Data Início"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              className={classes.dateFilter}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            
            <TextField
              label="Data Fim"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              className={classes.dateFilter}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <Button 
              onClick={fetchDocuments} 
              variant="contained" 
              color="primary" 
              startIcon={<Refresh />}
              className={classes.button}
            >
              Atualizar
            </Button>
            
            <Button 
              onClick={generatePDF} 
              variant="contained" 
              color="secondary" 
              startIcon={<PictureAsPdf />}
              className={classes.button}
            >
              Exportar PDF
            </Button>

            <Button 
              onClick={() => setShowOnlyPendentes(!showOnlyPendentes)} 
              variant="contained" 
              color={showOnlyPendentes ? 'primary' : 'default'}
              className={classes.button}
            >
              {showOnlyPendentes ? 'Mostrar Todos' : 'Mostrar Apenas Pendentes'}
            </Button>
          </div>

          {loading ? (
            <CircularProgress />
          ) : (
            <List>
              {sortedDocuments.map((doc) => (
                <React.Fragment key={doc.id}>
                  <ListItem 
                    className={`${expanded === doc.id ? classes.listItemExpanded : ''} ${
                      doc.status === 'Pendente' ? classes.listItemPendente : classes.listItemConcluido
                    }`}
                  >
                    <Avatar style={{ marginRight: 1, backgroundColor: doc.status === 'Concluído' ? '#4CAF50' : '#FFC107' }}>
                      <DateRange />
                    </Avatar>
                    
                    <ListItemText 
                      primary={`${doc.nomeempresa} - ${doc.cnpjempresa}`}
                      secondary={
                        <>
                        <Typography variant="body2">
                            Placa: {doc.id} | Responsável: {doc.nomevendedor}
                          </Typography>
                          <Typography variant="body2">
                            Data: {formatDate(doc.dataCriacao).toLocaleDateString()} | 
                    
                            Valor: R$ {String(doc.valordevenda || '0')}
                          </Typography>
                          
                        </>
                      }
                    />
                    
                    <IconButton onClick={() => handleEdit(doc)}>
                      <Edit />
                    </IconButton>
                    
                    <IconButton onClick={() => setExpanded(expanded === doc.id ? null : doc.id)}>
                      {expanded === doc.id ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                    <IconButton onClick={() => handleDeleteDocument(doc.id)} color="secondary">
            <Delete />
          </IconButton>
                    {/* Botões de Concluído e Pendente */}
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={() => handleStatusUpdate(doc.id, 'Concluído')}
                      disabled={doc.status === 'Concluído'}
                    >
                      Concluído
                    </Button>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      onClick={() => handleStatusUpdate(doc.id, 'Pendente')}
                      disabled={doc.status === 'Pendente'}
                    >
                      Pendente
                    </Button>

                    
                  </ListItem>
                  
                  {expanded === doc.id && (
                    <Card className={classes.paper}>
                      <Typography className={classes.sectionTitle}>Detalhes do Documento</Typography>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Typography className={classes.field}>
                            <strong>Data Criação:</strong> {formatDate(doc.dataCriacao).toLocaleDateString()}
                          </Typography>
                          <Typography className={classes.field}>
                            <strong>Status:</strong> {doc.status}
                          </Typography>
                          <Typography className={classes.field}>
                            <strong>Valor:</strong> R$ {String(doc.valordevenda || '0')}
                          </Typography>
                          <Typography className={classes.field}>
                            <strong>Placa:</strong> {doc.id}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                          <Typography className={classes.field}>
                            <strong>Vendedor:</strong> {doc.nomevendedor}
                          </Typography>
                          <Typography className={classes.field}>
                            <strong>CPF Vendedor:</strong> {doc.cpfvendedor}
                          </Typography>
                          <Typography className={classes.field}>
                            <strong>Comprador:</strong> {doc.nomecomprador}
                          </Typography>
                          <Typography className={classes.field}>
                            <strong>CPF Comprador:</strong> {doc.cpfcomprador}
                          </Typography>
                        </Grid>
                      </Grid>

                      <div style={{ marginTop: 16 }}>
                        <Button 
                          variant="contained" 
                          color="primary"
                          onClick={handleSaveEdit}
                          startIcon={<Save />}
                        >
                          Salvar Alterações
                        </Button>
                      </div>
                    </Card>
                  )}
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>

        {/* Gráfico */}
        <Paper className={classes.chartHeader}>
          <Bar data={chartData} options={chartOptions} />
        </Paper>

        {/* Snackbar para notificação de novo documento */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={newDocumentMessage}
        />
      </div>
    </ThemeProvider>
  );
};


export default Dashboard;
