import { createUser } from '../../lib/user'

export default async function signup(req: any, res: any) {
  try {
    await createUser(req.body)
    res.status(200).send({ done: true })
  } catch (error: any) {
    console.error(error)
    res.status(500).end(error.message)
  }
}
