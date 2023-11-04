/** @type {import('next').NextConfig} */

const database_name = 'seguracacau_database';
const user_name = 'root';
const user_password = '1234';

const nextConfig = {
  output: 'standalone',
  env: {
    'MYSQL_HOST': '127.0.0.1',
    'MYSQL_PORT': '3306',
    'MYSQL_DATABASE': database_name,
    'MYSQL_USER': user_name,
    'MYSQL_PASSWORD': user_password,
    'FRONTEND_API': 'http://localhost:3002'

  }
}

module.exports = nextConfig
 
