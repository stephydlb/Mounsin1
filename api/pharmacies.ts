import type { VercelRequest, VercelResponse } from '@vercel/node'
import dbConnect from './_db'
import { Pharmacy } from '../src/lib/models'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const { city } = req.query
        let query = {}

        if (city) {
          query = { city }
        }

        const pharmacies = await Pharmacy.find(query)
        res.status(200).json({ success: true, data: pharmacies })
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message })
      }
      break
    case 'POST':
      try {
        const pharmacy = await Pharmacy.create(req.body)
        res.status(201).json({ success: true, data: pharmacy })
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
