import type { VercelRequest, VercelResponse } from '@vercel/node'
import dbConnect from './_db'
import { Notification } from '../src/lib/models'

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

        const notifications = await Notification.find(query).sort({ date: -1 })
        res.status(200).json({ success: true, data: notifications })
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message })
      }
      break
    case 'POST':
      try {
        const notification = await Notification.create(req.body)
        res.status(201).json({ success: true, data: notification })
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message })
      }
      break
    case 'PUT':
      try {
        const { id } = req.query
        const notification = await Notification.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!notification) {
          return res.status(400).json({ success: false, error: 'Notification not found' })
        }
        res.status(200).json({ success: true, data: notification })
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
