import type { NextApiRequest, NextApiResponse } from 'next';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/logic/firebase/config/app';

const API_KEY = process.env.BLUDATA_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: true, message: 'Método não permitido. Apenas GET é aceito.' });
    }

    const authorization = req.headers['authorization'];
    if (!authorization || authorization !== `Bearer ${API_KEY}`) {
      return res.status(401).json({ error: true, message: 'Não autorizado. Token inválido ou ausente.' });
    }

    // 🔥 Buscando as duas coleções
    const colecao1 = await getDocs(collection(db, 'Betodespachanteintrncaodevendaoficial'));
    const colecao2 = await getDocs(collection(db, 'Betodespachanteintrncaodevendaoficialdigital'));

    const dados1 = colecao1.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const dados2 = colecao2.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // 🔥 Unindo as duas coleções
    const atpvs = [...dados1, ...dados2];

    return res.status(200).json({ success: true, atpvs });
  } catch (error) {
    console.error('Erro na API listar:', error);
    return res.status(500).json({ error: true, message: 'Erro interno no servidor.', details: error instanceof Error ? error.message : String(error) });
  }
}
