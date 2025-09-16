import type { VercelRequest, VercelResponse } from '@vercel/node'
import dbConnect from './_db'
import { Doctor } from '../src/lib/models'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const { city, specialty } = req.query
        let query = {}

        if (city) {
          query = { ...query, 'location.city': city }
        }

        if (specialty) {
          query = { ...query, specialty }
        }

        const doctors = await Doctor.find(query)
        res.status(200).json({ success: true, data: doctors })
      } catch (error) {
        res.status(400).json({ success: false, error: error.message })
      }
      break
    case 'POST':
      try {
        const doctor = await Doctor.create(req.body)
        res.status(201).json({ success: true, data: doctor })
      } catch (error) {
        res.status(400).json({ success: false, error: error.message })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
