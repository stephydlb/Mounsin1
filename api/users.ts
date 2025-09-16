import type { VercelRequest, VercelResponse } from '@vercel/node'
import dbConnect from './_db'
import { User } from '../src/lib/models'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({}) // You might want to add pagination or filtering
        res.status(200).json({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false, error: error.message })
      }
      break
    case 'POST':
      try {
        const user = await User.create(req.body)
        res.status(201).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false, error: error.message })
      }
      break
    case 'PUT':
      try {
        const { id } = req.query
        if (!id) {
          return res.status(400).json({ success: false, error: 'User ID required' })
        }
        const user = await User.findByIdAndUpdate(id, req.body, { new: true })
        if (!user) {
          return res.status(404).json({ success: false, error: 'User not found' })
        }
        res.status(200).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false, error: error.message })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
