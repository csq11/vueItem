const bcrypt = require('bcryptjs');

// 设置密码强度
var salt = bcrypt.genSaltSync(10);
// HASH值 为加密的密码 
var hash = bcrypt.hashSync('123456',salt); 
console.log(hash)  // 每次执行都会发生一定的变化
// 获取值 和 密码对比
console.log(bcrypt.compareSync('12345', hash))