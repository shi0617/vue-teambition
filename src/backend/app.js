let express = require('express');
//解析post请求主体的键值对
let bodyParser = require('body-parser');
const cors = require('cors');
//连接数据库
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test',(err) => {
    if(err){
        console.log('Error' + err);
        return;
    }
    console.log('数据库连接成功');
})

let app = express();
//解绝跨域
// app.use(cors());
// 解析post请求中的xhr.setRequestHeader( 'Content-Type','application/x-www-form-urlencoded')
app.use(bodyParser.urlencoded({extended:true}))
// parse application/json
app.use(bodyParser.json())
//解决跨域
app.all('*',function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type"); 
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8"); 
    next();
})


//--------------------------------用户登录和注册-------------------------------------

//用户Schema
let userSchema = new mongoose.Schema({
    username:String,
    password:String
})
//用户model
let userModel = mongoose.model('Users',userSchema,'userinfo');
//用户登录
app.post('/login', (req,res,next) => {
    console.log('用户登录');
    let username = req.body.username
    let password = req.body.password
    console.log(req.body)
    userModel.find({
        username: username
    },(err,doc)=>{
        if(err){
            console.log(err)
            return
        }
        if(doc.length){
            userModel.find({
                username: username,
                password: password
            },(error,docu)=>{
                if(error){
                    console.log(error)
                    return
                }
                if(docu.length){
                    res.json({
                        success:true,
                        code:'登陆成功'
                    });
                }else{
                    res.json({
                        success:false,
                        code:'密码输入错误，请重新输入'
                    });
                }
            })
        }else{
            res.json({
                success:false,
                code:'用户名不存在，请注册'
            });
        }
    })
})
//用户注册
app.post('/signin', (req,res,next) => {
    console.log('用户注册')
    let username = req.body.username
    let password = req.body.password
    console.log(req.body)
    userModel.find({
        username: username
    },(err,doc)=>{
        if(err){
            console.log(err)
            return
        }
        if(doc.length){
            res.json({
                success:false,
                code:'用户名已被注册'
            });
        }else{
            userModel.create({
                username: username,
                password: password
            },(error,docs)=>{
                if(error){
                    console.log(error)
                    return
                }
                console.log(docs)
            })
            res.json({
                success:true,
                code:'注册成功，请登录'
            });
        }
    })
})

//--------------------------------用户登录和注册-------------------------------------

//新建项目Schema
let newFileSchema = new mongoose.Schema({
    filename:String,
    filedesc:String
})
//新建项目model
let newFileModel = mongoose.model('Files',newFileSchema,'fileinfo');
//新建项目
app.post('/created',(req,res,next)=>{
    console.log('新建项目')
    let filename = req.body.filename
    let filedesc = req.body.filedesc
    console.log(req.body)
    newFileModel.create({
        filename:filename,
        filedesc:filedesc
    },(err,doc)=>{
        newFileModel.find((error,docu)=>{
            console.log(docu)
        })
    })
    res.json('数据回来了')

})
app.listen(8000,() => {
    console.log('服务已启动，port为:8000')
});