import type { VercelRequest, VercelResponse } from '@vercel/node'
import dbConnect from './_db'
import { Vaccination } from '../src/lib/models'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const vaccinations = await Vaccination.find({})
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
    case 'PUT':
      try {
        const { id } = req.query
        if (!id) {
          return res.status(400).json({ success: false, error: 'Vaccination ID required' })
        }
        const vaccination = await Vaccination.findByIdAndUpdate(id, req.body, { new: true })
        if (!vaccination) {
          return res.status(404).json({ success: false, error: 'Vaccination not found' })
        }
        res.status(200).json({ success: true, data: vaccination })
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message })
      }
      break
    case 'DELETE':
      try {
        const { id } = req.query
        if (!id) {
          return res.status(400).json({ success: false, error: 'Vaccination ID required' })
        }
        const deletedVaccination = await Vaccination.findByIdAndDelete(id)
        if (!deletedVaccination) {
          return res.status(404).json({ success: false, error: 'Vaccination not found' })
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
