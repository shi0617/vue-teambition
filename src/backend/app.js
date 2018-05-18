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
    userModel.find({
        username: username
    },(err,doc)=>{
        if(err){
            console.log(err)
            return
        }
        if(doc.length){
            userModel.findOne({
                username: username,
                password: password
            },(error,docu)=>{
                if(error){
                    console.log(error)
                    return
                }
                if(docu){
                    res.json({
                        success:true,
                        code:'登陆成功',
                        user_id: docu._id
                    });
                    console.log(docu)
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

//--------------------------------获取项目新建删除和星标-------------------------------------
//获取用户项目Schema
let userFileSchema = new mongoose.Schema({
    filename:String,
    filedesc:String,
    user_id:String,
    star: Boolean,
    delete: Boolean,
})
//获取用户项目model
let userFileModel = mongoose.model('Files',userFileSchema,'fileinfo');
//用户已有项目
app.get('/projects',(req,res,next)=>{
    console.log('用户已有项目')
    let user_id = req.query.user_id
    userFileModel.find({
        user_id:user_id
    },(err,doc)=>{
        if(err){
            console.log(err)
            return
        }
        res.json(doc)
    })
})
//新建项目
app.post('/created',(req,res,next)=>{
    console.log('新建项目')
    let filename = req.body.filename
    let filedesc = req.body.filedesc
    let user_id = req.body.user_id
    userFileModel.create({
        filename:filename,
        filedesc:filedesc,
        user_id:user_id,
        star: false,
        delete: false
    },(err,doc)=>{
        if(err){
            console.log(err)
            return
        }
        if(doc){
            res.json({
                success: true,
                code:"创建成功",
                doc:doc
            })
        }else{
            res.json({
                success: false,
                code:"创建失败"
            })
        }
    })
})
//星标项目
app.post('/star',(req,res,next)=>{
    console.log('星标')
    let _id = req.body._id
    let star = req.body.star
    userFileModel.update({
        _id: _id,
        star:star
    },{$set:{star:!star}},(err,doc)=>{
        if(err){
            console.log(err)
        }
        if(doc.nModified){
            res.json({
                success:true,
                code:"星标修改成功"
            })
        }else{
            res.json({
                success:false,
                code:"星标失败"
            })
        }
    })
})
//回收站项目
app.post('/recycle',(req,res,next)=>{
    console.log('回收站')
    let _id = req.body._id
    let recycle = req.body.delete
    userFileModel.update({
        _id: _id,
        delete:recycle
    },{$set:{delete:!recycle}},(err,doc)=>{
        if(err){
            console.log(err)
        }
        if(doc.nModified){
            res.json({
                success:true,
                code:"移动到回收站成功"
            })
        }else{
            res.json({
                success:false,
                code:"移动到回收站失败"
            })
        }
    })
})
//删除项目
app.post('/delete',(req,res,next)=>{
    console.log('删除项目')
    let _id = req.body._id
    userFileModel.deleteOne({
        _id: _id
    },(err,doc)=>{
        if(err){
            console.log(err)
        }
        if(doc.n){
            res.json({
                success:true,
                code:"删除成功"
            })
        }else{
            res.json({
                success:false,
                code:"删除失败"
            })
        }
    })
})
//改变项目名称和描述
app.post('/change',(req,res,next)=>{
    console.log('名称和描述')
    let _id = req.body._id
    let filename = req.body.filename
    let filedesc = req.body.filedesc
    userFileModel.findOne({_id: _id},(err,doc)=>{
        if(err){
            console.log(err)
        }
        if(doc){
            console.log(doc)
            userFileModel.update({
                _id: _id,
                filename:doc.filename,
                filedesc:doc.filedesc
            },{$set:{filename:filename,filedesc:filedesc}},(error,docu)=>{
                if(error){
                    console.log(error)
                }
                console.log(docu)
                if(docu.n){
                    res.json({
                        success:true,
                        code:"名称和描述修改成功"
                    })
                }else{
                    res.json({
                        success:false,
                        code:"名称和描述修改失败"
                    })
                }
            })
        }
    })
})
app.listen(8000,() => {
    console.log('服务已启动，port为:8000')
});