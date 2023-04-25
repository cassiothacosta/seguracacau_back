import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import mysql from 'mysql2'
import promise from 'mysql2/promise'
import { findUser } from './user'


const db = promise.createConnection({
      host: process.env.MYSQL_HOST,
      port: 3306,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD
});


export default async function excuteQuery({ query, values }: any) {
  try {
      const result = await promise.createConnection({
        host: process.env.MYSQL_HOST,
        port: 3306,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD 
      }).then(connection =>{
        return connection.query(query, values)
      });
    return result;
  } catch (error) {
      return { error };
  }
}

export async function addRegister({username, name, type, category, period, value}: any) {
  const user = await findUser({username})
  const register = {
    id: uuidv4(),
    user_id: user.id,
    name,
    type,
    category,
    period,
    value,
    createdAt: Date.now(),
  }

  try {
      const result =  excuteQuery({
          query: 'INSERT INTO despesas_fundos (id, user_id, name, type, category, period, value, createdAt) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
          values: [register.id, register.user_id, register.name, register.type, register.category, register.period, register.value, register.createdAt]
      });
  } catch ( error ) {
      console.log( error );
  }
  
  return { name, createdAt: Date.now() }
}

export  async function removeRegister({ username, name }: any) {
  const user = await findUser(username)
  const register = await findSingleRegister(name)
  try {
    const result = await excuteQuery({
        query: 'delete from despesas_fundos where id = ? and user_id = ?',
        values: [register.id, user.id],
    });

  } catch ( error ) {
      console.log( error );
}

  return { name, createdAt: Date.now() }
}

export  async function findSingleRegister({ username, name }: any) {
  const user = await findUser(username)
  try {
    const result:any = await excuteQuery({
        query: 'select * from despesas_fundos where user_id = ? and name = ?',
        values: [user.id, name],
    });
    return result[0][0];
  } catch ( error ) {
      console.log( error );
  }
}

export  async function findRegisters({ username}: any) {
  const user = await findUser({username})
  try {
    const result:any = await excuteQuery({
        query: 'select name, type, category, period, value, id from despesas_fundos where user_id = ?',
        values: [user.id],
    });
    return result[0];
  } catch ( error ) {
      console.log( error );
  }

}

export  async function findRegistersGroupByCategory({ username}: any) {
  const user = await findUser({username})
  try {
    const result:any = await excuteQuery({
        query: 'select name, type, category, period, SUM(value), id from despesas_fundos where user_id = ? group by category',
        values: [user.id],
    });
    return result[0];
  } catch ( error ) {
      console.log( error );
  }
}

export  async function findRegistersGroupByType({ username}: any) {
  const user = await findUser({username})
  try {
    const result:any = await excuteQuery({
        query: 'select name, type, category, period, SUM(value), id from despesas_fundos where user_id = ? group by type',
        values: [user.id],
    });
    console.log( result );
    return result[0];
  } catch ( error ) {
      console.log( error );
  }
}

