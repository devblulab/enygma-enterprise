import React, { useState } from "react";
import { motion } from "framer-motion";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "'Roboto', sans-serif",
    background: "#f8f9fa",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    maxWidth: "2800px",
    width: "80%",
    margin: "0 auto",
  },
  questionBox: {
    marginBottom: "5px",
    borderRadius: "8px",
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  button: {
    padding: "0.5rem 2rem",
    fontSize: "1rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    borderRadius: "0.25rem",
    color: "#fff",
    backgroundColor: "#3f51b5",
    "&:hover": {
      backgroundColor: "#303f9f",
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "30vh",
    backgroundColor: "#f5f5f5", // Removendo a dependência de primaryColor
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    textAlign: "center",
    color: "#333",
  },
  description: {
    fontSize: "1rem",
    marginBottom: "2rem",
    textAlign: "center",
    color: "#555",
  },
  question: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: 500,
    color: "#333",
    background: "#fdfdfd",
    "&:hover": {
      background: "#f5f5f5",
    },
  },
  answer: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#555",
    lineHeight: 1.6,
    background: "#fdfdfd",
  },
  icon: {
    fontSize: "1.5rem",
    transition: "transform 0.3s ease",
  },
}));

const questions = [
  {
    title: "Já possuo um financiamento imobiliário, posso fazer outro?",
    content:
      "Sim, desde que comprove renda suficiente para assumir ambos os financiamentos, e que o novo financiamento se enquadre na política de crédito vigente. Nesta situação NÃO É POSSÍVEL utilizar o FGTS para adquirir o segundo imóvel.",
  },
  {
    title: "Quero financiar o imóvel. Como funciona?",
    content:
      "O processo de compra ou venda no modelo Financiado ocorre por meio de um empréstimo bancário. Nesse cenário, o banco efetua o pagamento total ao vendedor, e a pessoa compradora efetua o reembolso ao banco por meio de parcelas estipuladas ao longo de um período previamente definido. Os termos do financiamento, incluindo taxas de juros e prazo, podem ser negociados com a instituição financeira escolhida pela pessoa compradora.\n\nEtapas do financiamento:\n1. Análise e aceite do relatório de Diligência do Imóvel;\n2. Análise de Crédito com a instituição financeira;\n3. Análise Jurídica, avaliação do imóvel (vistoria) e análise de declaração de saúde da pessoa compradora pela instituição financeira;\n4. Minuta do Contrato com Força de Escritura Pública;\n5. Pagamento da Entrada, se houver;\n6. Assinatura do Contrato com Força de Escritura Pública;\n7. Entrega/repasse das chaves do imóvel;\n8. Pagamento do ITBI;\n9. Prenotação do Contrato em Cartório de Registro de Imóveis;\n10. Registro do imóvel para a pessoa compradora.",
  },
  {
    title: "Posso utilizar meu FGTS para comprar um imóvel?",
    content:
      "Sim, você pode utilizar o seu FGTS (Fundo de Garantia do Tempo de Serviço) para comprar um imóvel. O FGTS pode ser utilizado de diferentes maneiras:\n\n1. Como entrada: Você pode utilizar o FGTS como parte do valor de entrada na compra de um imóvel.\n2. Para amortizar o saldo devedor: Se já tiver um financiamento imobiliário, é possível utilizar o FGTS para amortizar o saldo devedor.\n3. Para pagamento de parte das prestações: Em alguns casos, é permitido usar o FGTS para complementar o pagamento das prestações do financiamento habitacional.",
  },
  {
    title: "Quais requisitos preciso para utilizar o FGTS?",
    content:
      "1. Não possuir outro imóvel na mesma cidade ou região metropolitana onde pretende adquirir o novo imóvel.\n2. Ter no mínimo três anos de trabalho sob o regime do FGTS, mesmo que em diferentes empregadores.\n3. O imóvel deve ser residencial e destinado à moradia do titular do FGTS.\n4. O valor do imóvel deve estar dentro dos limites estabelecidos pelo programa Minha Casa Minha Vida ou pelo Sistema Financeiro de Habitação (SFH).\n5. O imóvel deve estar registrado em cartório e ser regularizado.\n6. Estar em dia com as prestações do FGTS.",
  },
  {
    title: "Quem pode participar do Programa Minha Casa Minha Vida?",
    content:
      "Podem participar pessoas ou famílias:\n\n- Com renda mensal de até R$ 4.400,01 para imóveis de até 220 mil reais;\n- Com renda mensal acima de R$ 4.400,01 para imóveis de até 350 mil reais;\n- Que não tenham outro imóvel em seu nome;\n- Que não tenham participado de outro programa habitacional;\n- Que não tenham restrições cadastrais em seu nome.\n\n*As informações estão de acordo com o normativo da Caixa Econômica Federal e sujeitas a atualização a qualquer momento.",
  },
  {
    title: "O que é ITBI?",
    content:
      "O ITBI (Imposto de Transmissão de Bens Imóveis) é um imposto municipal brasileiro que incide sobre a transferência de propriedade de bens imóveis. Ele é devido sempre que ocorre a aquisição de um imóvel, seja por compra e venda, doação, herança ou qualquer outra forma de transferência de propriedade.\n\nO valor do ITBI é calculado com base no valor venal do imóvel e a alíquota varia de acordo com o município.",
  },
  {
    title: "O que é IPCA?",
    content:
      "O IPCA (Índice de Preços ao Consumidor Amplo) é um dos principais indicadores de inflação no Brasil. Ele é calculado pelo IBGE e mede a variação média dos preços de uma cesta de produtos e serviços que representam o consumo das famílias brasileiras. Ele é atualizado mensalmente e reflete as mudanças nos preços ao longo do tempo.",
  },
];

const FAQAccordion: React.FC = () => {
  const classes = useStyles(); // Sem passar primaryColor
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={classes.root}>
      {questions.map((question, index) => (
        <div key={index} className={classes.questionBox}>
          <motion.div
            className={classes.question}
            onClick={() => toggleQuestion(index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Typography variant="subtitle1">{question.title}</Typography>
            <motion.span
              className={classes.icon}
              animate={{ rotate: activeIndex === index ? 180 : 0 }}
            >
              {activeIndex === index ? "−" : "+"}
            </motion.span>
          </motion.div>
          {activeIndex === index && (
            <motion.div
              className={classes.answer}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Typography>{question.content}</Typography>
            </motion.div>
          )}
        </div>
      ))}
      <motion.div
        className={classes.container}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={classes.title}>Simulação de Financiamento</h1>
        <p className={classes.description}>
          Encontre a melhor opção de financiamento para realizar seus sonhos.
        </p>
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => alert("Financiamento Simulado!")}
        >
          Simular Agora
        </Button>
      </motion.div>
    </div>
  );
};

export default FAQAccordion;
