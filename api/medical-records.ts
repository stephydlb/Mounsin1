import type { VercelRequest, VercelResponse } from '@vercel/node'
import dbConnect from './_db'
import { MedicalRecord } from '../src/lib/models'

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

        const medicalRecords = await MedicalRecord.find(query).sort({ date: -1 })
        res.status(200).json({ success: true, data: medicalRecords })
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message })
      }
      break
    case 'POST':
      try {
        const medicalRecord = await MedicalRecord.create(req.body)
        res.status(201).json({ success: true, data: medicalRecord })
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
