import { motion } from 'framer-motion';


export default function Logo() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="text-3xl"
        >
            <span className="font-black">G</span>
            <span className="text-zinc-400 font-thin">M</span>
            <span className="font-black">Agente Imobiliário</span>
        </motion.div>
    )
}
