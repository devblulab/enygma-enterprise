import React from 'react';

const FichaIndicacao = () => {
  return (
    <div className="ficha-indicacao-container">
      <div className="ficha-indicacao">
        <div className="indicacao-item">
          <span className="indicacao-titulo">Anos de Experiência</span>
          <span className="indicacao-valor">+12</span>
        </div>
        <div className="indicacao-item">
          <span className="indicacao-titulo">Imóveis Vendidos em Tubarão</span>
          <span className="indicacao-valor">+RS$10M</span>
        </div>
        <div className="indicacao-item">
          <span className="indicacao-titulo">Famílias Realizadas</span>
          <span className="indicacao-valor">+500</span>
        </div>
        <div className="indicacao-item">
          <span className="indicacao-titulo">Investidores Satisfeitos</span>
          <span className="indicacao-valor">+500</span>
        </div>
      </div>

      <style jsx>{`
        .ficha-indicacao-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: auto;
          margin-top: -10px; /* Reduz o espaçamento acima */
          margin-bottom: -10px; /* Reduz o espaçamento abaixo */
        }

        .ficha-indicacao {
          display: flex;
          flex-direction: column; /* Altera o layout para uma coluna */
          align-items: center;
          background-color:rgb(214, 214, 214);
          padding: 10px 20px; /* Reduz o padding */
          border-radius: 10px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        .indicacao-item {
          text-align: center;
          margin-bottom: 15px; /* Reduz o espaçamento entre os itens */
        }

        .indicacao-titulo {
          font-size: 16px;
          font-weight: bold;
          color: #333;
        }

        .indicacao-valor {
          font-size: 24px;
          color: #007bff;
        }

        @media (min-width: 768px) {
          .ficha-indicacao {
            flex-direction: row; /* Altera o layout de volta para uma linha em PCs */
          }

          .indicacao-item {
            margin-bottom: 0; /* Remove o espaçamento entre os itens */
            margin-right: 20px; /* Adiciona um espaçamento horizontal entre os itens */
          }
        }
      `}</style>
    </div>
  );
};

export default FichaIndicacao;
