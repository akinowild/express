// 连接数据库
const mysql = require('mysql')
// 数据库的配置选项
class MysqlPool{
  constructor(){
    this.flag=true
    this.pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE
    })
  }
  getPool(){
    if(this.flag){
      this.pool.on('connection',(connection)=>{
        connection.query('SET SESSION auto_increment_increment=1')
        this.flag = false
      })
    }
    return this.pool
  }
}

module.exports = MysqlPool;


// const options = {
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     port: process.env.MYSQL_PORT,
//     database: process.env.MYSQL_DATABASE
//   }
  
//   // 创建连接数据库对象
//  const objCon = mysql.createConnection(options)
//   objCon.connect(() => {
//     console.log('连接成功')
//   })
  
// module.exports = objCon
