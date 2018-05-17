//用户规则
let mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: String,
    password: String
})