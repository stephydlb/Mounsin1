import type { VercelRequest, VercelResponse } from '@vercel/node'
import dbConnect from './_db'
import { Pharmacy } from '../src/lib/models'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const pharmacies = await Pharmacy.find({})
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
    case 'PUT':
      try {
        const { id } = req.query
        if (!id) {
          return res.status(400).json({ success: false, error: 'Pharmacy ID required' })
        }
        const pharmacy = await Pharmacy.findByIdAndUpdate(id, req.body, { new: true })
        if (!pharmacy) {
          return res.status(404).json({ success: false, error: 'Pharmacy not found' })
        }
        res.status(200).json({ success: true, data: pharmacy })
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message })
      }
      break
    case 'DELETE':
      try {
        const { id } = req.query
        if (!id) {
          return res.status(400).json({ success: false, error: 'Pharmacy ID required' })
        }
        const deletedPharmacy = await Pharmacy.findByIdAndDelete(id)
        if (!deletedPharmacy) {
          return res.status(404).json({ success: false, error: 'Pharmacy not found' })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
