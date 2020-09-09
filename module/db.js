const MongoClient = require('mongodb').MongoClient
const Config = require('./config.js')

class Db {

  //单例,多次实例化不共享的问题
  static getInstance() {
    if (!Db.instance) {
      Db.instance = new Db()
    }
    return Db.instance
  }

  constructor() {
    this.dbClient = null
    this.Client = null
    this.connect()
  }

  connect() {
    return new Promise((resolve, reject) => {
      if (!this.dbClient) {
        MongoClient.connect(Config.dbUrl, { useUnifiedTopology: true }, (err, client) => {
          if (err) {
            reject(err)
          } else {
            console.log('数据库连接成功')
            const db = client.db(Config.dbName)
            this.dbClient = db
            this.Client = client
            resolve(this.dbClient)
          }
        })
      } else {
        resolve(this.dbClient)
      }
    })
  }

  find(collectName, json) {

    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectName).find(json).toArray((err, data) => {
          if (err) {
            console.log(err)
            reject(err)
          }
          resolve(data)
        })
      })

    })
  }

  insert(collectName, option) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectName).insertOne(option, (err, result) => {
          if (err) {
            reject(err)
          }
          else {
            resolve(result)
          }
        })
      })


    })
  }

  update(collectName, whereStr, updateStr) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectName).update(whereStr, updateStr, (err, result) => {
          if (err) {
            reject(err)
          }
          else {
            resolve(result)
          }
        })
      })


    })
  }

  delete(collectName, whereStr) {
    return new Promise((resolve, reject) => {

      this.connect().then(db => {
        db.collection(collectName).deleteMany(whereStr, (err, result) => {
          if (err) {
            console.log(err)
            reject(err)
          }
          else {
            resolve(result)
          }
        })
      })



    })
  }

  Close() {
    this.Client.close()
  }
}

module.exports = Db.getInstance()
