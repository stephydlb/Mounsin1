import type { VercelRequest, VercelResponse } from '@vercel/node'
import dbConnect from './_db'
import { MedicalRecord } from '../src/lib/models'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const medicalRecords = await MedicalRecord.find({})
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
    case 'PUT':
      try {
        const { id } = req.query
        if (!id) {
          return res.status(400).json({ success: false, error: 'Medical Record ID required' })
        }
        const medicalRecord = await MedicalRecord.findByIdAndUpdate(id, req.body, { new: true })
        if (!medicalRecord) {
          return res.status(404).json({ success: false, error: 'Medical Record not found' })
        }
        res.status(200).json({ success: true, data: medicalRecord })
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message })
      }
      break
    case 'DELETE':
      try {
        const { id } = req.query
        if (!id) {
          return res.status(400).json({ success: false, error: 'Medical Record ID required' })
        }
        const deletedMedicalRecord = await MedicalRecord.findByIdAndDelete(id)
        if (!deletedMedicalRecord) {
          return res.status(404).json({ success: false, error: 'Medical Record not found' })
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
