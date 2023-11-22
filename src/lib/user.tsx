import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import promise from 'mysql2/promise'

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

export default async function executeQuery({ query, values }: any) {
  try {
      const result = await promise.createConnection({
        host: process.env.MYSQL_HOST,
        port: 3306,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD 
      }).then((connection: any) =>{
        return connection.query(query, values).then(connection.end())
      });
    return result;
  } catch (error) {
      return { error };
  }
}

export  function createUser({ username, password }: any) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')
  const user = {
    id: uuidv4(),
    createdAt: Date.now(),
    username,
    hash,
    salt,
  }

  // This is an in memory store for users, there is no data persistence without a proper DB
  try {
      return executeQuery({
          query: 'INSERT INTO users (id, createdAt, username, hash, salt) VALUES(?, ?, ?, ?, ?)',
          values: [user.id, user.createdAt.toString(), user.username, user.hash, user.salt],
      });
     
  } catch ( error ) {
      console.log( error );
  }


  return { username, createdAt: Date.now() }
}

// Here you should lookup for the user in your DB
export  async function findUser({ username }: any) {
  // This is an in memory store for users, there is no data persistence without a proper DB

  try {
    const result:any = await executeQuery({
        query: 'select * from users where username = ?',
        values: [username],
    });
    return result[0][0];
  } catch ( error ) {
      console.log( error );
  }
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user: any, inputPassword: any) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}
