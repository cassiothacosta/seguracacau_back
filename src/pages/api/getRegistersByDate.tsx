import {findRegistersByDate} from '../../lib/register'
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

const apiLink = process.env.FRONTEND_API

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
  origin: apiLink,
  credentials: true
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function getRegistersByDate(req: any, res: any){

  try {
    await runMiddleware(req, res, cors)
    const registers = await findRegistersByDate(req.body)
    res.status(200).send({ done: true, data: registers })
  } catch (error: any) {
    console.error(error)
    res.status(500).end(error.message)
  }

}