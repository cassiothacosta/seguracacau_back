import { v4 as uuidv4 } from 'uuid'
import promise from 'mysql2/promise'
import { findUser } from './user'


export default async function executeQuery({ query, values }: any) {
  try {
    const result = await promise.createConnection({
      host: process.env.MYSQL_HOST,
      port: 3306,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD
    }).then((connection: any) => {
      return connection.query(query, values).then(connection.end())
    });
    return result;
  } catch (error) {
    return { error };
  }
}

export async function addRegister({ username, name, type, category, period, value }: any) {
  try {
    const user = await findUser({ username })
    const date = new Date
    const register = {
      id: uuidv4(),
      user_id: user.id,
      name,
      type,
      category,
      period,
      value,
      createdAt: date.toISOString().replace("T", " ").substring(0, 19)
    }
    const result = await executeQuery({
      query: 'INSERT INTO despesas_fundos (id, user_id, name, type, category, period, value, createdAt) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
      values: [register.id, register.user_id, register.name, register.type, register.category, register.period, register.value, register.createdAt]
    });
  } catch (error) {
    console.log(error);
  }

  return { name, createdAt: Date.now() }
}

export async function removeRegister({ username, selectedKeys }: any) {

  try {
    const user = await findUser({ username })
    const result = await executeQuery({
      query: 'update despesas_fundos set removedAt = now() where id in (?) and user_id = ?',
      values: [selectedKeys, user.id],
    });

    return result
  } catch (error) {
    console.log(error);
  }

  return { removeddAt: Date.now() }
}

export async function findSingleRegister({ username, name }: any) {

  try {
    const user = await findUser(username)
    const result: any = await executeQuery({
      query: 'select * from despesas_fundos where user_id = ? and name = ?',
      values: [user.id, name],
    });
    return result[0][0];
  } catch (error) {
    console.log(error);
  }
}

export async function findRegisters({ username }: any) {
  const user = await findUser({ username })
  try {
    const result: any = await executeQuery({
      query: `
      select a.* from despesas_fundos as a 
        join periodicity as p on a.period = p.value and a.period = "M" 
          where user_id = ? and isnull(removedAt)
      union
        select b.* from despesas_fundos as b 
          join periodicity as p on b.period = p.value and p.value = "E" 
            where MONTH(b.createdAt) = MONTH(now()) and YEAR(b.createdAt) = YEAR(now()) and user_id = ? and isnull(removedAt)
      union
        select b.* from despesas_fundos as b 
          join periodicity as p on b.period = p.value and p.value = "A" 
            where MONTH(b.createdAt) = MONTH(now()) and user_id = ? and isnull(removedAt)`,
      values: [user.id, user.id, user.id],
    })

    
    return result[0];
  } catch (error) {
    console.log(error);
  }
}

export async function findRegistersGroupByCategory({ username }: any) {
  const user = await findUser({ username })
  try {
    const result: any = await executeQuery({
      query: `
      select name, sum(value) as value from (
        select a.category as name, SUM(a.value) as value from despesas_fundos as a 
          join periodicity as p on a.period = p.value and a.period = "M" 
            where type = "Despesa" and isnull(removedAt) and user_id = ? group by category
        union
          select a.category as name, SUM(a.value) as value from despesas_fundos as a 
            join periodicity as p on a.period = p.value and a.period = "E" 
              where type = "Despesa" and MONTH(a.createdAt) = MONTH(now()) and YEAR(a.createdAt) = YEAR(now()) and isnull(removedAt) and user_id = ? group by category
        union
          select a.category as name, SUM(a.value) as value from despesas_fundos as a 
            join periodicity as p on a.period = p.value and a.period = "A" 
              where type = "Despesa" and MONTH(a.createdAt) = MONTH(now()) and isnull(removedAt) and user_id = ? group by category
         ) as results group by name
`,
      values: [user.id, user.id, user.id],
    });

    return result[0];

  } catch (error) {
    console.log(error);
  }
}

export async function findRegistersGroupByType({ username }: any) {

  try {
    const user = await findUser({ username })
    const result: any = await executeQuery({
      query: ` 
        select name, sum(value) as value from (
          select t.name as name, SUM(a.value) as value from despesas_fundos as a 
            join periodicity as p on a.period = p.value and a.period = "M" join types as t on t.name = a.type 
              where isnull(removedAt) and user_id = ? group by type
          union
          select t.name as name, SUM(a.value) as value from despesas_fundos as a 
            join periodicity as p on a.period = p.value and a.period = "E"  join types as t on t.name = a.type 
              where MONTH(a.createdAt) = MONTH(now()) and YEAR(a.createdAt) = YEAR(now()) and isnull(removedAt) and user_id = ? group by type
          union
          select t.name as name, SUM(a.value) as value from despesas_fundos as a 
            join periodicity as p on a.period = p.value and a.period = "A"  join types as t on t.name = a.type 
              where MONTH(a.createdAt) = MONTH(now()) and isnull(removedAt) and user_id = ? group by type
        ) as results group by name`,
      values: [user.id, user.id, user.id],
    });
    return result[0];

  } catch (error) {
    console.log(error);
  }
}

export async function findRegistersByDate({ username }: any) {
  const user = await findUser({ username })
  try {
    const result: any = await executeQuery({
      query: 'select name, type, category, period, value, createdAt,  id from despesas_fundos where user_id = ? and MONTH(createdAt) = MONTH(DATE(?)) and YEAR(createdAt) = YEAR(DATE(?))',
      values: [user.id],
    });
    return result[0];
  } catch (error) {
    console.log(error);
  }

}
