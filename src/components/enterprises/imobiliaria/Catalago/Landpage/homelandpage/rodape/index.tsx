import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp, FaLinkedin } from 'react-icons/fa';

export default function Rodape() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-5 flex flex-col lg:flex-row justify-between items-center">
        {/* Coluna 1: Logo e descrição */}
        <div className="mb-8 lg:mb-0 lg:w-1/3 text-center lg:text-left">
          <motion.div
            className="text-2xl font-bold uppercase tracking-widest"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Luxo Realty
          </motion.div>
          <motion.p
            className="mt-3 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            A sua solução completa para imóveis de alto padrão. Transformando sonhos em realidade com
            elegância e exclusividade.
          </motion.p>
        </div>

        {/* Coluna 2: Links úteis */}
        <div className="mb-8 lg:mb-0 lg:w-1/3 text-center">
          <motion.ul
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <li>
              <a href="#sobre-nos" className="text-gray-400 hover:text-gray-100 transition duration-200">
                Sobre Nós
              </a>
            </li>
            <li>
              <a href="#servicos" className="text-gray-400 hover:text-gray-100 transition duration-200">
                Serviços
              </a>
            </li>
            <li>
              <a href="#contato" className="text-gray-400 hover:text-gray-100 transition duration-200">
                Contato
              </a>
            </li>
          </motion.ul>
        </div>

        {/* Coluna 3: Redes sociais */}
        <div className="lg:w-1/3 text-center lg:text-right">
          <motion.div
            className="flex justify-center lg:justify-end gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-200 text-xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-200 text-xl"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-200 text-xl"
            >
              <FaLinkedin />
            </a>
          </motion.div>
          <motion.p
            className="mt-3 text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            © {new Date().getFullYear()} Luxo Realty. Todos os direitos reservados.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
