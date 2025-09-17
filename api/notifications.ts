import type { VercelRequest, VercelResponse } from '@vercel/node'
import dbConnect from './_db'
import { Notification } from '../src/lib/models'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const notifications = await Notification.find({})
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
        if (!id) {
          return res.status(400).json({ success: false, error: 'Notification ID required' })
        }
        const notification = await Notification.findByIdAndUpdate(id, req.body, { new: true })
        if (!notification) {
          return res.status(404).json({ success: false, error: 'Notification not found' })
        }
        res.status(200).json({ success: true, data: notification })
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message })
      }
      break
    case 'DELETE':
      try {
        const { id } = req.query
        if (!id) {
          return res.status(400).json({ success: false, error: 'Notification ID required' })
        }
        const deletedNotification = await Notification.findByIdAndDelete(id)
        if (!deletedNotification) {
          return res.status(404).json({ success: false, error: 'Notification not found' })
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
