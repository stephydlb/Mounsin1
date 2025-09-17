import type { VercelRequest, VercelResponse } from '@vercel/node'
import dbConnect from './_db'
import { Appointment } from '../src/lib/models'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const appointments = await Appointment.find({})
        res.status(200).json({ success: true, data: appointments })
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message })
      }
      break
    case 'POST':
      try {
        const appointment = await Appointment.create(req.body)
        res.status(201).json({ success: true, data: appointment })
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message })
      }
      break
    case 'PUT':
      try {
        const { id } = req.query
        if (!id) {
          return res.status(400).json({ success: false, error: 'Appointment ID required' })
        }
        const appointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true })
        if (!appointment) {
          return res.status(404).json({ success: false, error: 'Appointment not found' })
        }
        res.status(200).json({ success: true, data: appointment })
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message })
      }
      break
    case 'DELETE':
      try {
        const { id } = req.query
        if (!id) {
          return res.status(400).json({ success: false, error: 'Appointment ID required' })
        }
        const deletedAppointment = await Appointment.findByIdAndDelete(id)
        if (!deletedAppointment) {
          return res.status(404).json({ success: false, error: 'Appointment not found' })
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
