import type { NextApiRequest, NextApiResponse } from 'next';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/logic/firebase/config/app';

const API_KEY = "Nl8lhjWpE4efMw24Rd_FbHD6e1dBvi6bpc8DxBY3-P0";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const key = req.headers['authorization'];

  if (key !== `Bearer ${API_KEY}`) {
    return res.status(401).json({ error: true, message: 'Não autorizado. Token inválido ou ausente.' });
  }

  try {
    const snapshot = await getDocs(collection(db, 'OrdensDeServicoBludata'));
    const atpvs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return res.status(200).json({ atpvs });
  } catch (error) {
    console.error("Erro ao listar ATPVs:", error);
    return res.status(500).json({ error: true, message: 'Erro interno do servidor' });
  }
}
