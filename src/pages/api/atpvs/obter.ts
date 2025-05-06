
import type { NextApiRequest, NextApiResponse } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/logic/firebase/config/app';

const API_KEY = "Nl8lhjWpE4efMw24Rd_FbHD6e1dBvi6bpc8DxBY3-P0";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const key = req.headers['authorization'];

  if (key !== `Bearer ${API_KEY}`) {
    return res.status(401).json({ error: true, message: 'Não autorizado. Token inválido ou ausente.' });
  }

  const { id } = req.query;

  try {
    const ref = doc(db, 'OrdensDeServicoBludata', id as string);
    const snap = await getDoc(ref);
    if (!snap.exists()) return res.status(404).json({ error: true, message: 'Não encontrado' });
    return res.status(200).json({ atpv: { id: snap.id, ...snap.data() } });
  } catch (error) {
    return res.status(500).json({ error: true, message: 'Erro interno.' });
  }
}
