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
  origin: 'http://localhost:3002',
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

export default async function login(req: any, res: any) {
  const handler = nextConnect()
  .use(passport.initialize())
  .post(async (req: any, res: any, next) => {
      const user:Object  = await authenticate('local', req, res) as Object
      // session is the payload to save in the token, it may contain basic info about the user
      const session = { ...user }

      await setLoginSession(res, session)
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002');
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

      res.status(200).send({ done: true })
      next();
  })
    try {
      runMiddleware(req, res, cors)
      await handler.run(req, res)
    } catch (error: any) {
      console.error(error)
      res.status(401).send(error.message)
    }
}