import { motion } from 'framer-motion';
import { AiOutlineInstagram, AiOutlineWhatsApp } from 'react-icons/ai';

const ConsultorImobiliario: React.FC = () => {
  return (
    <div className="consultor-container">
      <div className="image-container">
        <motion.img
          src="/gui.png" // Coloque o caminho da imagem do consultor aqui
          alt="Consultor Imobiliário"
          className="consultor-image"
          whileHover={{ scale: 1.1, transition: { duration: 0.5 } }} // Efeito de escala ao passar o mouse
        />
      </div>
      <motion.div
        className="historia-consultor"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.5 }}
      >
        <h2>Conheça minha história</h2>
        <p>
          
Guilherme é um corretor imobiliário dedicado que reside em Tubarão, Santa Catarina. Ele é apaixonado pelo seu trabalho e pela oportunidade de ajudar as pessoas a encontrar o lar dos seus sonhos. Com uma abordagem atenciosa e profissional, Guilherme construiu uma reputação sólida na comunidade como um consultor confiável e comprometido. Sua paixão pela vida e pelo seu trabalho o impulsiona a buscar constantemente novas maneiras de atender às necessidades dos seus clientes e superar desafios. Guilherme é uma inspiração para aqueles ao seu redor, mostrando que com dedicação e determinação, é possível alcançar o sucesso na carreira imobiliária.
        </p>
        <div className="icons-container">
          <motion.a
            href="https://www.instagram.com/seu_perfil_do_instagram"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5, repeat: Infinity } }}
          >
            <AiOutlineInstagram className="icon" />
          </motion.a>
          <motion.a
            href="https://wa.me/seu_numero_do_whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5, repeat: Infinity } }}
          >
            <AiOutlineWhatsApp className="icon" />
          </motion.a>
        </div>
      </motion.div>

      <style jsx>{`
        .consultor-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 20px;
          background-color: #000;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: 0 auto;
        }

        .image-container {
          width: 300px;
          height: auto;
        }

        .consultor-image {
          width: 100%;
          height: auto;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
        }

        .historia-consultor {
          opacity: 0;
          flex: 1;
        }

        h2 {
          font-size: 24px;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #007bff, #00ffcc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        p {
          font-size: 16px;
          line-height: 1.5;
          color: #333;
          background-color: rgba(255, 255, 255, 0.8);
          padding: 10px;
          border-radius: 5px;
        }

        .icons-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin-top: 20px;
        }

        .icon {
          font-size: 100px; /* Aumenta o tamanho do ícone */
          color: black; /* Define a cor do ícone como preto */
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ConsultorImobiliario;
