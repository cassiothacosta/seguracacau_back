import passport from 'passport'
import nextConnect from 'next-connect'
import { localStrategy } from '../../lib/password-local'
import { setLoginSession } from '../../lib/auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
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

const authenticate = (method: any, req: any, res: any) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error: any, token: any) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })(req, res)
  })

passport.use(localStrategy)

export default nextConnect()
  .use(passport.initialize())
  .post(async (req: any, res: any) => {
    try {
      runMiddleware(req, res, cors)
      const user:Object  = await authenticate('local', req, res) as Object
      // session is the payload to save in the token, it may contain basic info about the user
      const session = { ...user }

      await setLoginSession(res, session)

      res.status(200).send({ done: true })
    } catch (error: any) {
      console.error(error)
      res.status(401).send(error.message)
    }
})