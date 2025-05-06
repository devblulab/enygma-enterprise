
import type { NextApiRequest, NextApiResponse } from 'next';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/logic/firebase/config/app';

const API_KEY = "Nl8lhjWpE4efMw24Rd_FbHD6e1dBvi6bpc8DxBY3-P0";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const key = req.headers['authorization'];

  if (key !== `Bearer ${API_KEY}`) {
    return res.status(401).json({ error: true, message: 'Não autorizado. Token inválido ou ausente.' });
  }

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: true, message: 'Método não permitido' });
  }

  const { id } = req.query;
  const { status, ['error-cod']: errorCod, ['error-str']: errorStr } = req.body;

  try {
    await updateDoc(doc(db, 'OrdensDeServicoBludata', id as string), {
      status,
      errorCod,
      errorStr
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: true, message: 'Erro interno.' });
  }
}
