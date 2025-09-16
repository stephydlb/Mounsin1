import type { VercelRequest, VercelResponse } from '@vercel/node'
import dbConnect from './_db'
import { Vaccination } from '../src/lib/models'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req
  const { userId } = req.query

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        let query = {}
        if (userId) {
          query = { userId }
        }

        const vaccinations = await Vaccination.find(query).sort({ date: -1 })
        res.status(200).json({ success: true, data: vaccinations })
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message })
      }
      break
    case 'POST':
      try {
        const vaccination = await Vaccination.create(req.body)
        res.status(201).json({ success: true, data: vaccination })
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
