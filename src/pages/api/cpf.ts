import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cpf } = req.query;

  if (!cpf || typeof cpf !== 'string' || !/^\d{11}$/.test(cpf)) {
    return res.status(400).json({ error: 'CPF inválido. Deve conter exatamente 11 dígitos numéricos.' });
  }

  const apiKey = process.env.APICPF_TOKEN;
  if (!apiKey) {
    return res.status(500).json({ error: 'Token da API do apicpf.com não configurado no ambiente' });
  }

  const apiUrl = `https://apicpf.com/api/consulta?cpf=${cpf}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro na consulta da API CPF:', errorData);
      return res.status(response.status).json({
        error: errorData.message || 'Erro ao consultar CPF',
        code: errorData.code || response.status
      });
    }

    const data = await response.json();
    const nome = data.data?.nome || '';

    return res.status(200).json({ nome });
  } catch (error) {
    console.error('Erro interno ao consultar CPF:', error);
    return res.status(500).json({ error: 'Erro interno ao consultar CPF', details: (error as Error).message });
  }
}
