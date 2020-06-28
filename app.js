const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const path = require('path')
const crypto = require('crypto')
const cmd=require('node-cmd');
var Jimp = require('jimp');
const url = `mongodb://${config.mongodb.user}:${config.mongodb.password}@${config.mongodb.host}/${config.mongodb.database}`
const conn = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) console.log('fail to connect:', err)
});
mongoose.Promise = global.Promise
mongoose.Promise = require('bluebird');
const session = require('express-session')
const bodyParser = require('body-parser')
var port = 7575;
const app = express()
var fs = require('fs')
var keyPath = './ssl/private.key';
var certPath = './ssl/certificate.crt';
var hskey = fs.readFileSync(keyPath);
var hscert = fs.readFileSync(certPath);
var https = require('https')
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/public/image`)
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
});
var upload = multer({ storage: storage, limits: { fileSize: 25*1024*1024*1024,fieldSize: 25 * 1024 * 1024 } });
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
app.use(bodyParser.json({ limit: '100mb' }))
app.use(session({
    secret: 'uiddgroupK',
    cookie: { maxAge: 60 * 10000 }
}));
let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Access-Control-Allow-Headers", "*");
    next();
}
app.use(allowCrossDomain);
var server = https.createServer({
    key: hskey,
    cert: hscert
}, app);
server.listen(port, function () {
    console.log('runing Web Server in ' + port + ' port...');
});

//user schema
const userCollectionName = 'user'
const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    designer: Boolean,
    room: Number,
    hall: Number,
    bath: Number,
    suite: Boolean,
    tags: [{
        type: String
    }],
    space: [{
        type: String
    }],
    single: [{
        type: String
    }],
    user_icon: String,
    post_icon: String,
}, { collection: userCollectionName });
const userModel = conn.model(userCollectionName, userSchema);

const postCollectionName = 'post'
const postSchema = new mongoose.Schema({
    name: String,
    user_icon: String,
    post_icon: String,
    title: String,
    explanation:String,
    space:String,
    room:String,
    pings:String,
    tags:[{
        type: String
    }], 
    like:Number,
    pen:Number,
    object:[mongoose.SchemaTypes.ObjectId],
    published: Boolean
}, { collection: postCollectionName });
const postModel = conn.model(postCollectionName, postSchema);

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number]
    }
  });

const singleCollectionName = 'single'
const singleSchema = new mongoose.Schema({
    name: String,
    evaluation: Number,
    description: String,
    img:String,
    position:{
        type: pointSchema
      }
}, { collection: singleCollectionName });
const singleModel = conn.model(singleCollectionName, singleSchema);

const tagsCollectionName = 'tags'
const tagsSchema = new mongoose.Schema({
    name: String,
    reference: Number
}, { collection: tagsCollectionName });
const tagsModel = conn.model(tagsCollectionName, tagsSchema);

const requestsCollectionName = 'requests'
const requestsSchema = new mongoose.Schema({
    position:{
        type: pointSchema
      },
    img:String,
    Source:Number,
    Price:Number,
    Texture:Number,
    postid:mongoose.SchemaTypes.ObjectId
}, { collection: requestsCollectionName });
const requestsModel = conn.model(requestsCollectionName, requestsSchema);

const saveAll = (data, model) => {
    for (d of data) {
        const m = new model(d)
        m.save((err) => {
            if (err) {
                console.log('fail to insert:', err)
                conn.close()
                process.exit()
            }
        })
    }
}

app.use(express.static(path.join(__dirname, 'public')));

/**
 * @swagger
 * /:
 *  get:
 *    description: 導向主畫面
 *    responses:
 *      '200':
 *        description: 成功連線
 */

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/login.html'));
})

app.get('/step1', (req, res) => {
    res.send('hello world')
})

app.get('/gitpull',(req,res)=>{
    cmd.get(
        `
            git pull
        `,
        function(err, data, stderr){
            if (!err) {
                res.send(data);
            } else {
                res.send(err);
            }
 
        }
    );
})

//login route for user login

app.post('/login', async (req, res) => {
    const login = async function () {
        return new Promise(async (resolve, reject) => {
            try {
                await userModel.findOne({ 'name': req.body.username, 'password': req.body.password }).exec(async (err, res) => {
                    if (err) {
                        console.log('fail to query:', err)
                        resolve(false)
                        return;
                    }
                    else {
                        if(!res) {
                            resolve(false)
                            return;
                        }
                        console.log(res.name + ' have students ' + res.password)
                        req.session.username = res.name;
                        //console.log(res.tags.length == 0);
                        if (res.tags.length === 0 || res.space.length === 0 || res.single.length === 0) {
                            resolve('first')
                        } else {
                            resolve(true)
                        }
                        //conn.close()
                    }
                })
            } catch (err) {
                console.log(err)
                reject(false)
                return;
            }
        })
    };
    login().then(r => {
        if (r === true) {
            res.send(JSON.parse(`{
                "success": true,
                "text": "login success, ${req.body.username}",
                "first_time":false
              }`))
        }
        else if (r === false) {
            res.send(JSON.parse(`{
                "success": false,
                "text": "Sorry, login fail",
                "first_time":false
              }`))
        }
        else if (r === 'first') {
            res.send(JSON.parse(`{
                "success": true,
                "text": "login success, ${req.body.username}",
                "first_time":true
              }`))
        }
        else {
            console.log(r)
            res.send(JSON.parse(`{
                "success": false,
                "text": ${r},
                "first_time":false
              }`))
        }
    })

})
//register route for user register
app.post('/register', (req, res) => {
    data = {
        'name': req.body.username, 'password': req.body.password, 'email': req.body.email, 'designer': Boolean(req.body.designer),
        'room': Number(req.body.room), 'hall': Number(req.body.hall), 'bath': Number(req.body.bath), 'suite': Boolean(req.body.suite)
    }
    console.log(`${req.session.username} login`)
    req.session.username = req.body.username;
    //saveAll(data, userModel)
    const m = new userModel(data)
    m.save((err) => {
        if (err) {
            console.log('fail to insert:', err)
            res.send(JSON.parse(`{
                "success": false,
                "text": "Sorry, register fail"
              }`))
        } else {
            // Response
            res.send(JSON.parse(`{
                "success": true,
                "text": "Registration success, ${req.body.username}"
              }`))
        }
    })
})
//check_login route for session check login
app.get('/check_login', (req, res) => {
    console.log(`${req.session.username} check login`)
    if (req.session.username === undefined) {
        res.send(JSON.parse(`{
            "success": false,
            "text": "session username is undefined"
          }`));
    }
    else {
        res.send(JSON.parse(`{
            "success": true,
            "text": "Had login with ${req.session.username}"
          }`));
    }
})
//modify the tags in user information
app.post('/modify_tags', (req, res) => {
    if (req.session.username === undefined) {
        res.send(JSON.parse(`{
            "success": false,
            "text": "session username is undefined"
          }`));
    } else {
        const modify = async function () {
            return new Promise(async (resolve, reject) => {
                try {
                    await userModel.findOne({ 'name': req.session.username }).exec(async (err, res) => {
                        if (err) {
                            console.log('fail to query:', err)
                            resolve(false)
                        }
                        else {
                            res.tags = req.body.tags;
                            res.space = req.body.space;
                            res.single = req.body.single;
                            res.save(function (err) {
                                if (err) {
                                    console.log(err);
                                }
                            });
                            //console.log(res.tags.length == 0);
                            resolve(true)
                        }
                    })
                } catch (err) {
                    reject(err)
                }
            })
        };
        modify().then(r => {
            if (r === true) {
                res.send(JSON.parse(`{
                    "success": true,
                    "text": "modify success, ${req.body.tags}"
                  }`))
            }
            else if (r === false) {
                res.send(JSON.parse(`{
                    "success": false,
                    "text": "Sorry, modify fail"
                  }`))
            }
            else {
                console.log(r)
            }
        })
    }
})
//Post an new post to sql,need 3 data:{user_icon,post_icon,title}
/*
name: String,
  user_icon:String,
  post_icon:String,
  title:String
*/
app.post('/add_post', (req, res) => {
    req.session.username = "test_without_login";//need fix
    if (req.session.username === undefined) {
        res.send(JSON.parse(`{
            "success": false,
            "text": "session username is undefined"
          }`))
    } else {
        const query = async function () {
            return new Promise(async (resolve, reject) => {
                try {
                    await userModel.findOne({ 'name': req.session.username }).exec(async (err, res) => {
                        if (err) {
                            console.log('fail to query:', err)
                            resolve(undefined)
                        }
                        else {
                            //console.log(res.tags.length == 0);
                            resolve(res)
                        }
                    })
                } catch (err) {
                    reject(err)
                }
            })
        };
        query().then(r=>{
            data = { 'name': req.session.username, 'user_icon': r.user_icon, 'post_icon': req.body.post_icon,
            'title': req.body.title ,'explanation':req.body.explanation,'space':req.body.space,'room':req.body.room,
            'pings':req.body.pings,'tags':req.body.tags,'object':req.body.id,'like':0,'pen':0,'published':true}
            const m = new postModel(data)
            m.save((err,result) => {
                if (err) { 
                    console.log('fail to insert:', err)
                    res.send(JSON.parse(`{
                        "success": false,
                        "text": "Sorry, post fail",
                        "id": "undefined"
                    }`))
                } else {
                    // Response
                    res.send(JSON.parse(`{
                        "success": true,
                        "text": "Post success, ${req.session.username}",
                        "id":"${result._id}"
                    }`))
                }
            })
        })
    }
})
//Get post for recommend post in homepage
app.get('/recommend', (req, res) => {
    data = new Array;
    const recommend = async function () {
        return new Promise(async (resolve, reject) => {
            try {
                await postModel.find({ 'published': true }).exec(async (err, res) => {
                    if (err) {
                        console.log('fail to query:', err)
                        resolve(false)
                    }
                    else {
                        res.forEach(r => {
                            data.push({
                                'name': r.name,
                                'user_icon': r.user_icon,
                                'post_icon': r.post_icon,
                                'title': r.title,
                                'id': r._id
                            })
                        })
                        data = JSON.stringify(data);
                        //console.log(data);
                        resolve(true)
                    }
                })
            } catch (err) {
                reject(err)
            }
        })
    };
    recommend().then(r => {
        if (r === true) {
            m = JSON.parse(`{
                "success": true,
                "text": "Query success",
                "object": ${data}
              }`)
            //console.log(m.object);
            res.json(m)
        }
        else if (r === false) {
            res.send(JSON.parse(`{
                "success": false,
                "text": "Sorry, query fail",
                "object":"undefined"
              }`))
        }
    })
})
//Upload single image and store in image/post
app.post('/upload', upload.single('file'), function (req, res, next) {
    //拼接檔案上傳後的網路路徑，
    var url = __dirname + '/public/image/post/' + req.file.filename;
    fs.rename(req.file.path, url, function(err) {
        if (err) {
          console.log(err);
          res.send(500);
        } else {
            res.json({
                success: true,
                data: 'image/post/'+req.file.filename
            });
        }
      });
    //將其發回客戶端
});

app.post('/add_single', (req, res) => {
    data = {
        'name': req.body.username, 'evaluation': Number(req.body.evaluation), 'description': String(req.body.description),'img':req.body.img,
        'position':{"type" : "Point","coordinates" : [Number(req.body.x),Number(req.body.y)]}
    }
    const m = new singleModel(data)
    m.save((err,result) => {
        if (err) {
            console.log('fail to insert:', err)
            res.send(JSON.parse(`{
                "success": false,
                "text": "Sorry, post single fail",
                "id": undefined
              }`))
        } else {
            // Response
            res.send(JSON.parse(`{
                "success": true,
                "text": "Post single success, ${result._id}",
                "id": "${result._id}"
              }`))
        }
    })
})
async function query(r){
    return new Promise(async (resolve, reject) => {
        await singleModel.findById(mongoose.Types.ObjectId(r)).exec(async(err, res) => {
            if (err) {
                console.log('fail to query:', err)
            }
            else{
                resolve(res);
            }
        })
    })
}
app.post('/get_post', (req, res) => {
    postModel.findOne({ '_id': req.body.id }).exec(async (err, r) => {
        if (err) {
            console.log('fail to query:', err)
            res.send({
                "success": false,
                "text": "Get post fail",
                "post": undefined,
                "single":undefined
            })
        }
        else {
            var object = [];
            for(i in r.object){
                var m = await query(r.object[i]);   
                console.log(m);
                await object.push(m);
            }
            requestsModel.find({ 'postid': req.body.id }).exec(async (err, requests) => {
                if (err) {
                    console.log('fail to query:', err)
                    res.send({
                        "success": false,
                        "text": "Get request fail",
                        "post": undefined,
                        "single":undefined
                    })
                }
                else {
                    res.send({
                        "success": true,
                        "text": "Get post success",
                        "post": r,
                        'single': object,
                        "requests":requests,
                    })
                }
            });
        }
    });

})

app.post('/cropimage',function(req,res){
    store = `./public/${req.body.url}`;
    Jimp.read(`./public/${req.body.url}`)
    .then(image => {
        var rx = parseFloat(req.body.width)/image.bitmap.width;
        var ry = parseFloat(req.body.height)/image.bitmap.height;
        var w = image.bitmap.width/256;
        var h = image.bitmap.height/256;
        var x = req.body.x/rx-25*w;
        var y = req.body.y/ry-25*h;
        if(x < 0) x = 0;
        if(y < 0) y = 0;
        if(x + 50*w > image.bitmap.width) x = image.bitmap.width-50*w;
        if(y + 50*h > image.bitmap.height) y = image.bitmap.height-50*h;
        console.log(x,y,50*w,50*h);
        var store = crypto.randomBytes(16).toString('hex');
        var extension = image.getExtension();
        return image
        .crop(x,y,73.2421875,52.34375)
        .write(`./public/image/post/${store}.${extension}`,function(){
            res.send({
                'success':true,
                "text": "Success to crop image",
                "url": `image/post/${store}.${extension}`
            })
        });
    })
    .catch(err => {
        console.error(err);
        res.send({
            'success':false,
            "text": err,
            "url": undefined
        })
    });
})
function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};
  
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
  
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
  
    return response;
  }
app.post('/upload_image',upload.single(),function(req,res){
    var image = req.body.picture.replace(/^data:image\/(png|jpg|jepg|webp);base64,/,"");
    var imageBuffer = decodeBase64Image(req.body.picture);
    var type = req.body.picture.match(/\/.*;/)[0];
    var store = crypto.randomBytes(16).toString('hex');
    if(type == "/jpeg;" ||type == "/jpg;"){
        fs.writeFile(`./public/image/post/${store}.jpeg`,imageBuffer.data, function (err) {
            if (err){
                res.send({
                    'success':false,
                    "text": "Fail to crop image",
                    "url": 'undefined'
                })
                return next(err)
            } 
            res.send({
                'success':true,
                "text": "Success to upload image",
                "url": `image/post/${store}.jpeg`
            })
          })
    }else if(type == "/png;" ||type == "/webp;"){
        fs.writeFile(`./public/image/post/${store}.png`, image,'base64', function (err) {
            if (err){
                res.send({
                    'success':false,
                    "text": "Fail to crop image",
                    "url": 'undefined'
                })
                return next(err)
            } 
            res.send({
                'success':true,
                "text": "Success to upload image",
                "url": `image/post/${store}.png`
            })
          })
    }
    else{
        res.send({
            'success':false,
            "text": "Unknown type",
            "url": 'undefined'
        })
    }
})

app.post('/new_tag', (req, res) => {
    tagsModel.findOne({ 'name': req.body.tag }).exec(async (err, r) => {
        if (err) {
            console.log('Fail to create tag:', err)
            res.send({
                "success": false,
                "text": "Fail to create tag",
                "reference":undefined
            })
        }
        else {
            if(!r){
                data = { 'name': req.body.tag, 'reference':1}
                const m = new tagsModel(data)
                m.save((err,result) => {
                    if (err) { 
                        console.log('fail to insert:', err)
                        res.send({
                            "success": false,
                            "text": "Fail to create tag",
                            "id": undefined
                        })
                    } else {
                        // Response
                        res.send({
                            "success": true,
                            "text": `${req.body.tag} is success to be created`,
                            "reference":1
                        })
                    }
                })
            }else{
                r.reference++;
                r.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
                res.send({
                    "success": true,
                    "text": `${req.body.tag} had been created`,
                    "reference":r.reference
                })
            }
        }
    });

})
/*
app.get('/new_tag', (req, res) => {
    tagsModel.find({}).exec(async (err, r) => {
        r.forEach(e=>{
            e.reference = Math.floor(Math.random()*100)
            e.save();
        })
    })
    res.send("success")
})
*/
app.get('/hot_tag',(req,res) => {
    tagsModel.find({}).sort({reference:-1}).limit(20).exec(async (err, r) => {
        if (err){
            console.log(err)
            res.send({
                'success':false,
                "tags":[]
            })
            return next(err)
        } 
        res.send({
            'success':true,
            "tags":r
        })
    })
})

app.post('/add',(req,res) => {
    res.send({
        "fisrt":Number(req.body.first) + Number(req.body.third),
        "second":Number(req.body.second) + Number(req.body.third),
    })
})

app.post('/get_post_with_tag',(req,res) => {
    data = new Array;
    var recommend;
    if(req.body.tag == "All"){
        recommend = async function () {
            return new Promise(async (resolve, reject) => {
                try {
                    await postModel.find({}).limit(10).exec(async (err, r) => {
                        if (err) {
                            console.log('fail to query:', err)
                            resolve(false)
                        }
                        else {
                            r.forEach(r => {
                                data.push({
                                    'name': r.name,
                                    'user_icon': r.user_icon,
                                    'post_icon': r.post_icon,
                                    'title': r.title,
                                    'id': r._id
                                })
                            })
                            data = JSON.stringify(data);
                            //console.log(data);
                            resolve(true)
                        }
                    })
                } catch (err) {
                    reject(err)
                }
            })
        };
    }
    else{
        recommend = async function () {
            return new Promise(async (resolve, reject) => {
                try {
                    await postModel.find({tags:req.body.tag}).limit(10).exec(async (err, r) => {
                        if (err) {
                            console.log('fail to query:', err)
                            resolve(false)
                        }
                        else {
                            r.forEach(r => {
                                data.push({
                                    'name': r.name,
                                    'user_icon': r.user_icon,
                                    'post_icon': r.post_icon,
                                    'title': r.title,
                                    'id': r._id
                                })
                            })
                            data = JSON.stringify(data);
                            //console.log(data);
                            resolve(true)
                        }
                    })
                } catch (err) {
                    reject(err)
                }
            })
        };
    }
    recommend().then(r => {
        if (r === true) {
            m = JSON.parse(`{
                "success": true,
                "text": "Query success",
                "object": ${data}
              }`)
            //console.log(m.object);
            res.json(m)
        }
        else if (r === false) {
            res.send(JSON.parse(`{
                "success": false,
                "text": "Sorry, query fail",
                "object":"undefined"
              }`))
        }
    })
})
/*
position:{
        type: pointSchema
      },
    img:String,
    Source:Number,
    Price:Number,
    Texture:Number,
    postid:id
data:{
    postid:id,
    Source:number,
    Price:number,
    Texture:number,
    img:url string,
    x:number,
    y:number
}
*/
app.post('/add_request', (req, res) => {
    data = {
        'postid':req.body.postid,
        'Source': Number(req.body.Source), 'Price': Number(req.body.Price), 'Texture': Number(req.body.Texture),
        'img':String(req.body.img),'position':{"type" : "Point","coordinates" : [Number(req.body.x),Number(req.body.y)]}
    }
    const m = new requestsModel(data)
    m.save((err,result) => {
        if (err) {
            console.log('fail to insert:', err)
            res.send(JSON.parse(`{
                "success": false,
                "text": "Sorry, post request fail",
                "id": undefined
              }`))
        } else {
            // Response
            res.send(JSON.parse(`{
                "success": true,
                "text": "Post request success, ${result._id}",
                "id": "${result._id}"
              }`))
        }
    })
})
/*
data:{
    requestid:id,
    type:String
}
*/
app.post('/modify_request', (req, res) => {
    requestsModel.findOne({'_id': req.body.requestid }).exec(async (err, r) => {
        if (err) {
            console.log('Fail to find request:', err)
            res.send({
                "success": false,
                "text": "Fail to find request",
                "reference":undefined
            })
        }
        else {
            switch(req.body.type){
                case 'Source':
                    r.Source++;
                    r.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    res.send({
                        "success": true,
                        "text": `${req.body.type} had been increased`,
                        "count":r.Source
                    })
                    break;
                case 'Price':
                    r.Price++;
                    r.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    res.send({
                        "success": true,
                        "text": `${req.body.type} had been increased`,
                        "count":r.Price
                    })
                    break;
                case 'Texture':
                    r.Texture++;
                    r.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    res.send({
                        "success": true,
                        "text": `${req.body.type} had been increased`,
                        "count":r.Texture
                    })
                    break;
            }
        }
    });
})

app.post('/get_post_with_space',(req,res) => {
    data = new Array;
    var recommend;
    if(req.body.tag == "All"){
        recommend = async function () {
            return new Promise(async (resolve, reject) => {
                try {
                    await postModel.find({}).limit(10).exec(async (err, r) => {
                        if (err) {
                            console.log('fail to query:', err)
                            resolve(false)
                        }
                        else {
                            r.forEach(r => {
                                data.push({
                                    'name': r.name,
                                    'user_icon': r.user_icon,
                                    'post_icon': r.post_icon,
                                    'title': r.title,
                                    'id': r._id
                                })
                            })
                            data = JSON.stringify(data);
                            //console.log(data);
                            resolve(true)
                        }
                    })
                } catch (err) {
                    reject(err)
                }
            })
        };
    }
    else{
        recommend = async function () {
            return new Promise(async (resolve, reject) => {
                try {
                    await postModel.find({room:req.body.space}).limit(10).exec(async (err, r) => {
                        if (err) {
                            console.log('fail to query:', err)
                            resolve(false)
                        }
                        else {
                            r.forEach(r => {
                                data.push({
                                    'name': r.name,
                                    'user_icon': r.user_icon,
                                    'post_icon': r.post_icon,
                                    'title': r.title,
                                    'id': r._id
                                })
                            })
                            data = JSON.stringify(data);
                            //console.log(data);
                            resolve(true)
                        }
                    })
                } catch (err) {
                    reject(err)
                }
            })
        };
    }
    recommend().then(r => {
        if (r === true) {
            m = JSON.parse(`{
                "success": true,
                "text": "Query success",
                "object": ${data}
              }`)
            //console.log(m.object);
            res.json(m)
        }
        else if (r === false) {
            res.send(JSON.parse(`{
                "success": false,
                "text": "Sorry, query fail",
                "object":"undefined"
              }`))
        }
    })
})