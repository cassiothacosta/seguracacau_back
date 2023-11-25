import { v4 as uuidv4 } from 'uuid'
import promise from 'mysql2/promise'
import { findUser } from './user'
import moment from 'moment';


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
    return result[0].length > 0 ? result : [];
  } catch (error) {
    return { error };
  }
}

export async function addRegister({ username, name, type, category, period, value, registerDate}: any) {
  try {
    const user = await findUser({ username })
    const date = registerDate ? moment(registerDate, "MM/YYYY").toDate() : new Date
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

  return { name, createdAt: moment(registerDate, "MM/YYYY").toDate().toISOString().replace("T", " ").substring(0, 19) }
}

export async function removeRegister({ username, selectedKeys, registersDate }: any) {

  try {
    const user = await findUser({ username })
    const result = await executeQuery({
      query: 'update despesas_fundos set removedAt = date(?) where id in (?) and user_id = ?',
      values: [registersDate, selectedKeys, user.id],
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

export async function findRegisters({ username, date }: any) {
  const user = await findUser({ username })
  try {
    const result: any = await executeQuery({
      query: `
      select a.* from despesas_fundos as a 
        join periodicity as p on a.period = p.value and a.period = "M" 
          where user_id = ? and (isnull(removedAt) or (TO_DAYS(DATE_SUB(date(removedAt), interval DAYOFMONTH(date(removedAt))-1 DAY)) - 
          TO_DAYS(DATE_SUB(date(?), interval DAYOFMONTH(date(?))-1 DAY)) > 0)) and (TO_DAYS(DATE_SUB(date(?), interval DAYOFMONTH(date(?))-1 DAY)) - 
            TO_DAYS(DATE_SUB(date(createdAt), interval DAYOFMONTH(date(createdAt))-1 DAY)) >= 0)
      union
        select a.* from despesas_fundos as a 
          join periodicity as p on a.period = p.value and a.period = "E" 
            where date(a.createdAt) between date(DATE_SUB(date(?), INTERVAL DAYOFMONTH(date(?))-1 DAY)) and LAST_DAY(date(?)) and user_id = ? and 
              (isnull(removedAt) or (TO_DAYS(DATE_SUB(date(removedAt), interval DAYOFMONTH(date(removedAt))-1 DAY)) - 
                TO_DAYS(DATE_SUB(date(?), interval DAYOFMONTH(date(?))-1 DAY)) > 0))
      union
        select b.* from despesas_fundos as b
          join periodicity as p on b.period = p.value and p.value = "A" 
            where MONTH(b.createdAt) = MONTH(date(?)) and user_id = ? and 
              (isnull(removedAt) or (TO_DAYS(DATE_SUB(date(removedAt), interval DAYOFMONTH(date(removedAt))-1 DAY)) - 
            TO_DAYS(DATE_SUB(date(?), interval DAYOFMONTH(date(?))-1 DAY)) > 0))`,
      values: [user.id, date, date, date, date, 
          date, date, date, user.id, date, date, 
          date, user.id, date, date],
    })


    return result[0];
  } catch (error) {
    console.log(error);
  }
}

export async function findRegistersGroupByCategory({ username, registersDate }: any) {
  const user = await findUser({ username })
  const date = new Date(registersDate).toISOString().replace("T", " ").replaceAll("-","/").substring(0, 10)
  try {
    const result: any = await executeQuery({
      query: `
      select name, sum(value) as value from (
        select a.category as name, SUM(a.value) as value from despesas_fundos as a 
          join periodicity as p on a.period = p.value and a.period = "M" 
            where type = "Despesa" and (isnull(removedAt) or (TO_DAYS(DATE_SUB(date(removedAt), interval DAYOFMONTH(date(removedAt))-1 DAY)) - 
          TO_DAYS(DATE_SUB(date(?), interval DAYOFMONTH(date(?))-1 DAY)) > 0)) and (TO_DAYS(DATE_SUB(date(?), interval DAYOFMONTH(date(?))-1 DAY)) - 
            TO_DAYS(DATE_SUB(date(a.createdAt), interval DAYOFMONTH(date(a.createdAt))-1 DAY)) >= 0) and user_id = ? group by category
        union
          select a.category as name, SUM(a.value) as value from despesas_fundos as a 
            join users as u on u.id = a.user_id and u.id = ?
              where type = "Despesa" and date(a.createdAt) between date(DATE_SUB(date(?), INTERVAL DAYOFMONTH(date(?))-1 DAY)) and date(last_day(date(?))) 
                and (isnull(removedAt) or (TO_DAYS(DATE_SUB(date(removedAt), interval DAYOFMONTH(date(removedAt))-1 DAY)) - 
              TO_DAYS(DATE_SUB(date(?), interval DAYOFMONTH(date(?))-1 DAY)) > 0)) and a.period = "E" group by category
        union
          select a.category as name, SUM(a.value) as value from despesas_fundos as a 
            join periodicity as p on a.period = p.value and a.period = "A" 
              where type = "Despesa" and MONTH(a.createdAt) = MONTH(date(?)) and (isnull(removedAt) or (TO_DAYS(DATE_SUB(date(removedAt), interval DAYOFMONTH(date(removedAt))-1 DAY)) - 
              TO_DAYS(DATE_SUB(date(?), interval DAYOFMONTH(date(?))-1 DAY)) > 0)) and user_id = ? group by category
         ) as results group by name
`,
      values: [date, date, date, date, user.id, user.id, date, date, date, date,
          date, date, date, date, user.id],
    });

    return result[0];

  } catch (error) {
    console.log(error);
  }
}

export async function findRegistersGroupByType({ username, registersDate }: any) {

  try {
    const user = await findUser({ username })
    const result: any = await executeQuery({
      query: ` 
        select name, sum(value) as value from (
          select t.name as name, a.name as rname, SUM(a.value) as value from despesas_fundos as a 
            join types as t on t.name = a.type join users as u on u.id = a.user_id and u.id = ?
              where (isnull(removedAt) or (TO_DAYS(DATE_SUB(date(removedAt), interval DAYOFMONTH(date(removedAt))-1 DAY)) - 
          TO_DAYS(DATE_SUB(date(?), interval DAYOFMONTH(date(?))-1 DAY)) > 0)) and (TO_DAYS(DATE_SUB(date(?), interval DAYOFMONTH(date(?))-1 DAY)) - 
          TO_DAYS(DATE_SUB(date(a.createdAt), interval DAYOFMONTH(date(a.createdAt))-1 DAY)) >= 0) and a.period = "M" group by type
          union
          select t.name as name, a.name as rname, SUM(a.value) as value from despesas_fundos as a 
            join types as t on t.name = a.type join users as u on u.id = a.user_id and u.id = ?
              where date(a.createdAt) between date(DATE_SUB(date(?), INTERVAL DAYOFMONTH(date(?))-1 DAY)) and date(last_day(date(?))) and (isnull(removedAt) or (TO_DAYS(DATE_SUB(date(removedAt), interval DAYOFMONTH(date(removedAt))-1 DAY)) - 
          TO_DAYS(DATE_SUB(date(?), interval DAYOFMONTH(date(?))-1 DAY)) > 0)) and a.period = "E" group by type
          union
          select t.name as name, a.name as rname, SUM(a.value) as value from despesas_fundos as a 
            join types as t on t.name = a.type join users as u on u.id = a.user_id and u.id = ?
              where month(date(?)) = month(a.createdAt) and (isnull(removedAt) or (TO_DAYS(DATE_SUB(date(removedAt), interval DAYOFMONTH(date(removedAt))-1 DAY)) - 
          TO_DAYS(DATE_SUB(date(?), interval DAYOFMONTH(date(?))-1 DAY)) > 0)) and a.period = "A" group by type order by name asc
        ) as results group by name`,
      values: [user.id, registersDate, registersDate, registersDate, registersDate, 
                user.id, registersDate, registersDate, registersDate, registersDate, registersDate,  
                user.id, registersDate, registersDate, registersDate],
    });
    return result[0];

  } catch (error) {
    console.log(error);
  }
}

export async function findRegistersByDate({ username, year }: any) {

  const user = await findUser({ username })
  try {
    let yearObj: Object = {
      0: 'jan',
      1: 'feb',
      2: 'mar',
      3: 'apr',
      4: 'may',
      5: 'jun',
      6: 'jul',
      7: 'aug',
      8: 'sep',
      9: 'oct',
      10: 'nov',
      11: 'dec'
    }
    const results: Object = await Promise.all(Object.keys(yearObj as object).map(async function (key: any, value: any) {
      const date = new Date(yearObj[key as keyof Object] + ',' + year).toISOString().split('T')[0]
      const result: any = await executeQuery({
        query: `
            select a.* from despesas_fundos as a 
              join periodicity as p on a.period = p.value and a.period = "M" 
                where date(a.createdAt) <= last_day(date(?)) and (isnull(a.removedAt) or date(a.removedAt) > last_day(date(?))) and a.user_id = ?
            union
              select a.* from despesas_fundos as a 
                join periodicity as p on a.period = p.value and a.period = "E" 
                  where date(a.createdAt) between date(DATE_SUB(date(?), INTERVAL DAYOFMONTH(date(?))-1 DAY)) and LAST_DAY(date(?)) and isnull(a.removedAt) and a.user_id = ?
            union
              select a.* from despesas_fundos as a
                join periodicity as p on a.period = p.value and p.value = "A" 
                  where month(a.createdAt) = month(date(?)) and (isnull(a.removedAt) or date(a.removedAt) > last_day(date(?))) and year(a.createdAt) <= year(date(?)) and a.user_id = ?
          `,
        values: [date, date, user.id, date, date, date, user.id, date, date, date, user.id],
      })
      return result[0];
    }))

    return results;

  } catch (error) {
    console.log(error);
  }

}


export async function findCategoryValuesByMonth({ username, year, keysArray }: any) {
  const user = await findUser({ username })
  try {
    let yearObj: Object = {
      0: 'jan',
      1: 'feb',
      2: 'mar',
      3: 'apr',
      4: 'may',
      5: 'jun',
      6: 'jul',
      7: 'aug',
      8: 'sep',
      9: 'oct',
      10: 'nov',
      11: 'dec'
    }
    const results: Object = await Promise.all(Object.keys(keysArray).map(async function (chave, valor) {
      const result: any = await Promise.all(Object.keys(yearObj as object).map(async function (key: any, value: any) {
        const date = new Date(yearObj[key as keyof Object] + ',' + year).toISOString().split('T')[0]
        const result: any = await executeQuery({
          query: `
          select name, sum(value) as value from (
            select a.category as name, SUM(a.value) as value from despesas_fundos as a 
              join periodicity as p on a.period = p.value and a.period = "M" 
              where date(a.createdAt) <= last_day(date(?)) and (isnull(a.removedAt) or date(a.removedAt) > last_day(date(?))) and a.user_id = ? and type = "Despesa" and a.category = (?) group by category
            union
              select a.category as name, SUM(a.value) as value from despesas_fundos as a 
              join periodicity as p on a.period = p.value and a.period = "E"
                where date(a.createdAt) between date(DATE_SUB(date(?), INTERVAL DAYOFMONTH(date(?))-1 DAY)) and LAST_DAY(date(?)) and isnull(a.removedAt) and a.user_id = ? and type = "Despesa" and a.category = (?) group by category
            union
              select a.category as name, SUM(a.value) as value from despesas_fundos as a 
                join periodicity as p on a.period = p.value and a.period = "A" 
                where month(a.createdAt) = month(date(?)) and (isnull(a.removedAt) or date(a.removedAt) > last_day(date(?))) and year(a.createdAt) <= year(date(?)) and a.user_id = ?  and type = "Despesa" and a.category = (?) group by category
             ) as results group by name
  `,
          values: [date, date, user.id, keysArray[valor], date, date, date, user.id, keysArray[valor], date, date, date, user.id, keysArray[valor]],
        })
        return result[0] && result[0][0];
      }))
      return result
    }))
    return results;
  } catch (error) {
    console.log(error);
  }
}
