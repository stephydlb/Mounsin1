import type { VercelRequest, VercelResponse } from '@vercel/node'
import dbConnect from './_db'
import { Doctor } from '../src/lib/models'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const doctors = await Doctor.find({})
        res.status(200).json({ success: true, data: doctors })
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message })
      }
      break
    case 'POST':
      try {
        const doctor = await Doctor.create(req.body)
        res.status(201).json({ success: true, data: doctor })
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message })
      }
      break
    case 'PUT':
      try {
        const { id } = req.query
        if (!id) {
          return res.status(400).json({ success: false, error: 'Doctor ID required' })
        }
        const doctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true })
        if (!doctor) {
          return res.status(404).json({ success: false, error: 'Doctor not found' })
        }
        res.status(200).json({ success: true, data: doctor })
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message })
      }
      break
    case 'DELETE':
      try {
        const { id } = req.query
        if (!id) {
          return res.status(400).json({ success: false, error: 'Doctor ID required' })
        }
        const deletedDoctor = await Doctor.findByIdAndDelete(id)
        if (!deletedDoctor) {
          return res.status(404).json({ success: false, error: 'Doctor not found' })
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
