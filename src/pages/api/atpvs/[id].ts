import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/logic/firebase/config/app';

import { doc, getDoc, updateDoc } from 'firebase/firestore';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = req.headers.authorization;
  if (apiKey !== `Bearer ${process.env.BLUDATA_API_KEY}`) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  const id = req.query.id as string;

  const ref = doc(db, 'OrdensDeServicoBludata', id);

  if (req.method === 'GET') {
    try {
      const docSnap = await getDoc(ref);
      if (!docSnap.exists()) {
        return res.status(404).json({ message: 'ATPV não encontrada' });
      }
      return res.status(200).json({ atpv: { id: docSnap.id, ...docSnap.data() } });
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao obter ATPV', error: err });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { status, errorCod, errorStr, pdfUrl } = req.body;
      await updateDoc(ref, {
        status,
        errorCod,
        errorStr,
        ...(pdfUrl ? { pdfUrl } : {})
      });
      return res.status(200).json({ message: 'ATPV atualizada com sucesso' });
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao atualizar ATPV', error: err });
    }
  }

  return res.status(405).json({ message: 'Método não permitido' });
}
