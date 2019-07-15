const sql = {
  insert: function (Collection, insertData) {
    return new Promise((resolve, reject) => {
      Collection.insertMany(insertData, (err) => {
        if (err) throw err;
        resolve()
      })
    })
  },
  find (Collection, whereObj, showObj,num) {
    // return new Promise(function (resolve, reject) {})
    // return new Promise(function (resolve, reject) { // 异步操作})
    // return new Promise(function (resolve, reject) { // 异步操作 - reslove(data)})
    return new Promise(function (resolve, reject) {
      Collection.find(whereObj, showObj).exec((err, data) => {
        if (err) throw err;
        resolve(data)
      })
    })
    
  },
  sort: function * (Collection, whereObj, showObj, sortObj) {
    return new Promise(function (resolve, reject) {
      Collection.find(whereObj, showObj).sort(sortObj).exec((err, data) => {
        if (err) throw err;
        resolve(data)
      })
    })
  },
  update (Collection, whereObj, updateObj, updateType) {
    // Collection['updateOne']()   <===> Collection.updateOne()
    // style.width = '100px'    style['width'] = '100px';
    return new Promise((resolve, reject) => {
      updateType = updateType || 'updateOne'
      Collection[updateType](whereObj, updateObj, (err) => {
        if (err) throw err;
        resolve();
      })
    })
  },
  delete (Collection, whereObj, deleteType) {
    return new Promise((resolve, reject) => {
      deleteType = deleteType || 'deleteOne';
      Collection[deleteType](whereObj, (err) => {
        if (err) throw err;
        resolve();
      })
    })
  }
}

module.exports = sql;
