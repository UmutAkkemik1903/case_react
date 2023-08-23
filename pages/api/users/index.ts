import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const newUser = req.body;

    try {
      const data = require('utils/users.json');
      data.users.push(newUser);

      const fs = require('fs');
      fs.writeFileSync('utils/users.json', JSON.stringify(data, null, 2));

      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Kullanıcı eklenirken hata oluştu' });
    }
  } else {
    res.status(405).end();
  }
}