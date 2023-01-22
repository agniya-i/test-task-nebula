// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const offset = Number(req.query.offset) ?? 0
  const limit = Number(req.query.limit) ?? 4

  try {
    const { data } = await import('../../../experts.json')
    const filteredData = data.slice(offset, offset + limit)

    res.status(200).json({ data: filteredData, total: data.length })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}
