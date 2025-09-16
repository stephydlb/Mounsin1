import type { VercelRequest, VercelResponse } from '@vercel/node'
import dbConnect from './_db'
import { Appointment } from '../src/lib/models'

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

        const appointments = await Appointment.find(query).sort({ date: -1, time: -1 })
        res.status(200).json({ success: true, data: appointments })
      } catch (error) {
        res.status(400).json({ success: false, error: error.message })
      }
      break
    case 'POST':
      try {
        const appointment = await Appointment.create(req.body)
        res.status(201).json({ success: true, data: appointment })
      } catch (error) {
        res.status(400).json({ success: false, error: error.message })
      }
      break
    case 'PUT':
      try {
        const { id } = req.query
        const appointment = await Appointment.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!appointment) {
          return res.status(400).json({ success: false, error: 'Appointment not found' })
        }
        res.status(200).json({ success: true, data: appointment })
      } catch (error) {
        res.status(400).json({ success: false, error: error.message })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
