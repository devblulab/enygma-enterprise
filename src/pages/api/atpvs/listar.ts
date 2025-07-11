import type { NextApiRequest, NextApiResponse } from 'next';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/logic/firebase/config/app';

const API_KEY = "Nl8lhjWpE4efMw24Rd_FbHD6e1dBvi6bpc8DxBY3-P0";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const key = req.headers['authorization'];
  if (key !== `Bearer ${API_KEY}`) {
    return res.status(401).json({ error: true, message: 'Não autorizado. Token inválido ou ausente.' });
  }

  const { page = '1', limit = '10', status, dataInicial, dataFinal } = req.query;
  const pageNum = parseInt(page as string, 10);
  const pageLimit = parseInt(limit as string, 10);

  try {
    let ref = collection(db, 'OrdensDeServicoBludata');
    let filtros: any[] = [];

    // Filtro por status
    if (status !== undefined) {
      filtros.push(where('status', '==', Number(status)));
    }

    // Filtro por período usando dataCriacao como Timestamp
    if (dataInicial && dataFinal) {
      const inicio = new Date(`${dataInicial}T00:00:00`);
      const fim = new Date(`${dataFinal}T23:59:59`);

      filtros.push(where('dataCriacao', '>=', Timestamp.fromDate(inicio)));
      filtros.push(where('dataCriacao', '<=', Timestamp.fromDate(fim)));
    }

    // Query com filtros e ordenação
    let q = query(ref, ...filtros, orderBy('dataCriacao', 'desc'));

    const allDocs = await getDocs(q);
    const start = (pageNum - 1) * pageLimit;
    const paginatedDocs = allDocs.docs.slice(start, start + pageLimit);

    const atpvs = paginatedDocs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({
      atpvs,
      page: pageNum,
      total: allDocs.size,
      totalPages: Math.ceil(allDocs.size / pageLimit),
    });
  } catch (error) {
    console.error("Erro ao listar ATPVs:", error);
    return res.status(500).json({ error: true, message: 'Erro interno do servidor' });
  }
}
