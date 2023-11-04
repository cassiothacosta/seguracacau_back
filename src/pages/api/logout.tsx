import { removeTokenCookie } from '../../lib/auth-cookies'

export default async function logout(req: any, res: any) {
  removeTokenCookie(res)
  res.writeHead(302, { Location: req.headers.referer+'/'})
  res.end()
}
