import { v4 as uuidv4 } from 'uuid'
import promise from 'mysql2/promise'
import { findUser } from './user'

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
        }).then((connection: any) => {
            return connection.query(query, values).then(connection.end())
        });
        return result;
    } catch (error) {
        return { error };
    }
}

export async function addCategory({ username, name }: any) {
    try {
        const user = await findUser({ username })
        const category = {
            id: uuidv4(),
            user_id: user.id,
            name
        }
        const result = await executeQuery({
            query: 'INSERT INTO categories (id, user_id, name) VALUES(?, ?, ?)',
            values: [category.id, category.user_id, category.name, ]
        });

        return result
    } catch (error) {
        console.log(error);
    }

    return { name, createdAt: Date.now() }
}

export async function removeCategory({ username, selectedKeys }: any) {

    try {
        const user = await findUser({ username })
        const result = await executeQuery({
            query: 'delete from categories where id in (?) and user_id = ?',
            values: [selectedKeys, user.id],
        });
        return result
    } catch (error) {
        console.log(error);
    }
    return { removeddAt: Date.now() }
}

export async function findCategories({ username }: any) {
    const user = await findUser({ username })
    try {
        const result: any = await executeQuery({
            query: `
        select * from categories where user_id = ?`,
            values: [user.id],
        })
        return result[0];
    } catch (error) {
        console.log(error);
    }
}