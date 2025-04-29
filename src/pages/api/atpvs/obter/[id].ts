
import type { NextApiRequest, NextApiResponse } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/logic/firebase/config/app';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const ref1 = doc(db, 'Betodespachanteintrncaodevendaoficial', id as string);
    const ref2 = doc(db, 'Betodespachanteintrncaodevendaoficialdigital', id as string);

    const snap1 = await getDoc(ref1);
    const snap2 = await getDoc(ref2);

    const data = snap1.exists() ? snap1.data() : (snap2.exists() ? snap2.data() : null);

    if (!data) {
      return res.status(404).json({ message: 'ATPV não encontrada' });
    }

    return res.status(200).json({ id, ...data });
  } catch (error: any) {
    return res.status(500).json({ message: 'Erro ao obter ATPV', error: error.message });
  }
}
