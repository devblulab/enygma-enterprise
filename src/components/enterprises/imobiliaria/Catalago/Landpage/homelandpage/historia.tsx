import { motion } from 'framer-motion';
import { AiOutlineInstagram, AiOutlineWhatsApp } from 'react-icons/ai';
import styles from './Historia.module.css';

const ConsultorImobiliario: React.FC = () => {
  return (
<section id="quem-sou">
    <div className={styles.consultorContainer}>
      <div className={styles.imageContainer}>
        <motion.img
          src="/gui.png" // Coloque o caminho da imagem do consultor aqui
          alt="Consultor Imobiliário"
          className={styles.consultorImage}
          whileHover={{ scale: 1.1, transition: { duration: 0.5 } }} // Efeito de escala ao passar o mouse
        />
      </div>
      <motion.div
        className={styles.historiaConsultor}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.5 }}
      >
        <h2>Conheça minha história</h2>
        <p>
          Guilherme é um corretor imobiliário dedicado que reside em Tubarão, Santa Catarina. Ele é apaixonado pelo seu trabalho e pela oportunidade de ajudar as pessoas a encontrar o lar dos seus sonhos. Com uma abordagem atenciosa e profissional, Guilherme construiu uma reputação sólida na comunidade como um consultor confiável e comprometido. Sua paixão pela vida e pelo seu trabalho o impulsiona a buscar constantemente novas maneiras de atender às necessidades dos seus clientes e superar desafios. Guilherme é uma inspiração para aqueles ao seu redor, mostrando que com dedicação e determinação, é possível alcançar o sucesso na carreira imobiliária.
        </p>
        <div className={styles.iconsContainer}>
          <motion.a
            href="https://www.instagram.com/guilherme_amartins/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5, repeat: Infinity } }}
          >
            <AiOutlineInstagram className={styles.icon} />
          </motion.a>
          <motion.a
            href="https://wa.me/5548996421279"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5, repeat: Infinity } }}
          >
            <AiOutlineWhatsApp className={styles.icon} />
          </motion.a>
        </div>
      </motion.div>
    </div>
</section>
  );
};

export default ConsultorImobiliario;
