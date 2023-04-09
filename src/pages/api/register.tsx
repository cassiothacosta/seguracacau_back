import user from './user'
import addRegister from '../../lib/register'
import removeRegister from '../../lib/register'
import findRegisters from '../../lib/register'

export default async function insertRegister(req: any, res: any){

  try {
    await user(req, res).then(() =>{
      addRegister(req.body)
      res.status(200).send({ done: true })
    }) 
  } catch (error: any) {
    console.error(error)
    res.status(500).end(error.message)
  }

}


export async function deleteRegister(req: any, res: any){

  try {
    await user(req, res).then(() =>{
      removeRegister(req.body)
      res.status(200).send({ done: true })
    }) 
  } catch (error: any) {
    console.error(error)
    res.status(500).end(error.message)
  }

}


export async function getRegisters(req: any, res: any){

  try {
    await user(req, res).then(() =>{
      findRegisters(req.body)
      res.status(200).send({ done: true })
    }) 
  } catch (error: any) {
    console.error(error)
    res.status(500).end(error.message)
  }

}