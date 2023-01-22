// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const { data } = await import('../../../experts.json')
    const currentUser = data.find((item) => item.id === req.query.id)

    if (currentUser == null) {
      res.status(404).json({
        status: 404,
        message: 'User data not found',
      })
      return
    }

    res.status(200).json({ data: currentUser })
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
    })
  }
}
