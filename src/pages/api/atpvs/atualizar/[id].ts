
import type { NextApiRequest, NextApiResponse } from 'next';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/logic/firebase/config/app';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const ref1 = doc(db, 'Betodespachanteintrncaodevendaoficial', id as string);
    const ref2 = doc(db, 'Betodespachanteintrncaodevendaoficialdigital', id as string);

    let docRef = ref1;
    let found = false;

    try {
      await updateDoc(ref1, req.body);
      found = true;
    } catch {}

    if (!found) {
      await updateDoc(ref2, req.body);
      docRef = ref2;
    }

    return res.status(200).json({ message: 'ATPV atualizada com sucesso', id });
  } catch (error: any) {
    return res.status(500).json({ message: 'Erro ao atualizar ATPV', error: error.message });
  }
}
