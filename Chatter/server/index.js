/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

/* global onlineusers */

var express = require('express');
const cors = require('cors');
const {Server} = require('socket.io');
//var ejs = require('ejs');
//const bodyParser = require("body-parser");

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/test";
var dbo; //= undefined;

MongoClient.connect(url, function (err, db) {
    if (err)
        throw err;
    console.log("Database connected!");
    dbo = db.db("test");
});

const app = express();
app.use(cors());
//app.engine('html', ejs.renderFile);

//app.set("view engine", "ejs");

/*app.use(bodyParser.urlencoded({	// important
 extended: true
 }));
 app.use(express.static(__dirname + '/public'));*/
app.use(express.json());

/*app.get("/", function(req, res){
 res.render("login_regis.html");
 });
 app.post("/hello", function(req, res){
 res.render("hello.html");
 });*/
app.post('/register', function (req, res) {
    const username = req.body.username, password = req.body.password;
    
    const query = {username: username};
    
    const Collection=dbo.collection("login");

    Collection.find(query).toArray((error, result) => {
        if (error)
            res.send({err:"server encountered an error!"});

        if (result.length > 0) { //console.log(result); 
            //res.writeHead(200, {'Content-Type': 'text/plain'});
            res.send({err:"username already registered!"});
        }
        else{
            var myobj = {username: username, password: password};
            Collection.insertOne(myobj, function (err, result) {
                if (err)
                    res.send({err:"server encountered an error!"});
                console.log("1 document inserted");
                //db.close();
            });
            res.send({mssg: "User registered"});
            //res.render('login_regis.html');
        }
    });
});

app.post('/login', function (req, res) {
    const username = req.body.username, password = req.body.password;

    const query = {username: username, password: password};

    dbo.collection("login").find(query).toArray((error, result) => {
        if (error)
            res.send({err:"server encountered an error!"});

        if (result.length > 0) { //console.log(result); 
            //res.writeHead(200, {'Content-Type': 'text/plain'});
            res.send(result);
        } else {
            res.send({err: "Incorrect username/password combination!"});
        }
    });
});
app.post('/message',function (req,res) {
    const user=req.body.user; 
    
    dbo.collection("login").find({username: user},{_id:1}).toArray((err,result)=>{
        if(!err){
            //console.log(result);
            if(result.length>0){
                const id=result[0]._id;
                dbo.collection("contacts_").find({_id:id},{_id:0,contacts:1}).toArray((err,result)=>{
                    if (err)
                        res.send({error:"server encountered an error!"});

                    res.send(result.length>0 ? result[0].contacts : []);
                });
            }
        }
    });
});
app.post('/contacts',(req,res)=>{
    if(req.body.search){ 
        //console.log(req.body.contact);
        dbo.collection("login").find({username: req.body.search}).toArray((err,result)=>{
            if(err) res.send({error:"server encountered an error!"});
                
            res.send({status: result.length>0 });
        });
    } //if(typeof req.body==)
    else{
        
        const user=req.body.user,contact=req.body.contact;
        
        dbo.collection("login").find({username: {$in: [user,contact]}},{_id:1}).toArray((err,result)=>{
            if(!err&&result.length===2){
                const uid=result[0].username===user ? result[0]._id : result[1]._id,
                      cid=result[1].username===contact ? result[1]._id : result[0]._id;
                console.log(`${uid} ${cid}`);
                dbo.collection("contacts_").find({_id: {$in: [uid,cid]}}).toArray((err,result)=>{
                   if(!err){
                       if(result.length>0){
                           console.log(result);
                           if(result.length===2){
                                let contacts1=result[0]._id===uid ? [...result[0].contacts] : [...result[1].contacts],
                                    contacts2=result[1]._id===cid ? [...result[1].contacts] : [...result[0].contacts];
                                contacts1.push(contact); contacts2.push(user); 
                                /*dbo.collection('contacts_').updateOne({_id:uid},{$set: {contacts:contacts}},(err,result)=>{
                                    if(!err){ console.log(`1 contact added to user ${user}: ${contact}`); res.send({status:true}); }
                                });*/
                                dbo.collection('contacts_').bulkWrite([{updateOne: {filter: {_id: uid}, update: {$set: {contacts:contacts1}} }},{updateOne: {filter: {_id: cid}, update: {$set: {contacts:contacts2}} }}],(err,result)=>{
                                    if(!err){ console.log(`${user} and ${contact} are contacts now`); res.send({status:true}); }
                                });
                            }
                            else if(result.length===1){
                                let contacts=[...result[0].contacts];
                                console.log(`${result[0]._id} ${uid} ${cid}`);
                                if(result[0]._id.toString()===uid.toString()){
                                    contacts.push(contact);
                                    dbo.collection('contacts_').bulkWrite([{updateOne: {filter: {_id: uid},update: {$set: {contacts: contacts}} }},{insertOne: {document : {_id: cid,contacts: [user]} }}],(err,result)=>{
                                        if(!err){ console.log(`${user} and ${contact} are contacts now`); res.send({status:true}); }
                                        else console.log(err);
                                    });
                                }
                                else{
                                    contacts.push(user);
                                    dbo.collection('contacts_').bulkWrite([{updateOne: {filter: {_id: cid},update: {$set: {contacts: contacts}} }},{insertOne: {document : {_id: uid,contacts: [contact]} }}],(err,result)=>{
                                        if(!err){ console.log(`${user} and ${contact} are contacts now`); res.send({status:true}); }
                                    });
                                }
                            }
                       }
                       else{
                           dbo.collection('contacts_').insertMany([{_id: uid,contacts: [contact]},{_id: cid,contacts: [user]}],(err,result)=>{
                               if(!err){ console.log(`${user} and ${contact} are contacts now`); res.send({status:true}); }
                           });
                       }
                    } 
                });
            }
        });
    }
});
const server = app.listen(3003, function () {
    console.log("App is running on Port 3003");
});
const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        method: ["GET","POST"]
    }
});
global.onlineusers=new Map();

io.on("connection",(socket) => {
    console.log(`User connected: ${socket.id}`);
    
    socket.on("add-chat",({username,socketid})=>{
        //console.log(username);
        //console.log(socketid);
        dbo.collection("login").find({username:username},{_id:1}).toArray((err,result)=>{
            if(!err){
                //console.log(result);
                if(result.length>0){
                    onlineusers.set(result[0]._id.toString(),socketid);
                    console.log(`User ${result[0]._id} connected: ${socketid}`);
                    socket.emit("chat-added",{status: true});
                    /*const id=result[0]._id;
                    //const socketid=onlineusers.get(id.toString());
                    //console.log(socketid);
                    //if(socketid){
                        dbo.collection("contacts_").find({_id:id},{_id:0,contacts:1}).toArray((err,result)=>{
                            if (!err){
                                //console.log(result); console.log(socketid);
                                socket.emit("get-contacts",result.length>0 ? result[0].contacts : []); //res.send({error:"server encountered an error!"});
                            }
                        });
                    //}*/
                }
            }
            else console.log(err);
        });
    });
    socket.on("send-message",(data) => {
       //console.log(data);
       //socket.broadcast.emit("receiveMessage",data);
       //socket.to(data.room).emit("receiveMessage",data);
       dbo.collection("login").find({username:data.to},{_id:1}).toArray((err,result)=>{
            if(!err){
                console.log(result);
                if(result.length>0){
                    console.log(result[0]._id.toString());
                    const socketid=onlineusers.get(result[0]._id.toString());
                    //console.log(socketid);
                    if(socketid){
                        console.log(socketid);
                        socket.to(socketid).emit("receive-message",{from: data.from,message: data.message});
                    }
                }
            }
            else console.log(err);
        });
    });
    socket.on("add-contact",({user,contact})=>{
        dbo.collection("login").find({username: {$in: [user,contact]}},{_id:1}).toArray((err,result)=>{
            if(!err&&result.length===2){
                const uid=result[0].username===user ? result[0]._id : result[1]._id,
                      cid=result[1].username===contact ? result[1]._id : result[0]._id;
                //console.log(`${uid} ${cid}`);
                const contactsocketid=onlineusers.get(cid.toString());
                
                dbo.collection("contacts_").find({_id: {$in: [uid,cid]}}).toArray((err,result)=>{
                   if(!err){
                       if(result.length>0){
                           //console.log(result);
                           if(result.length===2){
                                let contacts1=result[0]._id===uid ? [...result[0].contacts] : [...result[1].contacts],
                                    contacts2=result[1]._id===cid ? [...result[1].contacts] : [...result[0].contacts];
                                contacts1.push(contact); contacts2.push(user); 
                                /*dbo.collection('contacts_').updateOne({_id:uid},{$set: {contacts:contacts}},(err,result)=>{
                                    if(!err){ console.log(`1 contact added to user ${user}: ${contact}`); res.send({status:true}); }
                                });*/
                                dbo.collection('contacts_').bulkWrite([{updateOne: {filter: {_id: uid}, update: {$set: {contacts:contacts1}} }},{updateOne: {filter: {_id: cid}, update: {$set: {contacts:contacts2}} }}],(err,result)=>{
                                    if(!err){ console.log(`${user} and ${contact} are contacts now`);
                                        socket.emit("new-contact",{contact:contact});
                                        if(contactsocketid){
                                            //console.log(contactsocketid);
                                            socket.to(contactsocketid).emit("new-contact",{contact:user});
                                        }
                                    }
                                });
                            }
                            else if(result.length===1){
                                let contacts=[...result[0].contacts];
                                console.log(`${result[0]._id} ${uid} ${cid}`);
                                if(result[0]._id.toString()===uid.toString()){
                                    contacts.push(contact);
                                    dbo.collection('contacts_').bulkWrite([{updateOne: {filter: {_id: uid},update: {$set: {contacts: contacts}} }},{insertOne: {document : {_id: cid,contacts: [user]} }}],(err,result)=>{
                                        if(!err){ console.log(`${user} and ${contact} are contacts now`);
                                            socket.emit("new-contact",{contact:contact});
                                            if(contactsocketid) socket.to(contactsocketid).emit("new-contact",{contact:user});
                                        }
                                        else console.log(err);
                                    });
                                }
                                else{
                                    contacts.push(user);
                                    dbo.collection('contacts_').bulkWrite([{updateOne: {filter: {_id: cid},update: {$set: {contacts: contacts}} }},{insertOne: {document : {_id: uid,contacts: [contact]} }}],(err,result)=>{
                                        if(!err){ console.log(`${user} and ${contact} are contacts now`);
                                            socket.emit("new-contact",{contact:contact});
                                            if(contactsocketid) socket.to(contactsocketid).emit("new-contact",{contact:user});
                                        }
                                    });
                                }
                            }
                       }
                       else{
                           dbo.collection('contacts_').insertMany([{_id: uid,contacts: [contact]},{_id: cid,contacts: [user]}],(err,result)=>{
                                if(!err){ console.log(`${user} and ${contact} are contacts now`);
                                    socket.emit("new-contact",{contact:contact});
                                    if(contactsocketid) socket.to(contactsocketid).emit("new-contact",{contact:user});
                                }
                           });
                       }
                    } 
                });
            }
        });
    });
    socket.on("send-contacts",({username})=>{
        //const user=data.username;
        //console.log(socketid);
        dbo.collection("login").find({username: username},{_id:1}).toArray((err,result)=>{
            if(!err){
                //console.log(result);
                if(result.length>0){
                    const id=result[0]._id;
                    const socketid=onlineusers.get(id.toString());
                    //console.log(socketid);
                    if(socketid){
                        dbo.collection("contacts_").find({_id:id},{_id:0,contacts:1}).toArray((err,result)=>{
                            if (!err){
                                socket.emit("get-contacts",result.length>0 ? result[0].contacts : []); //res.send({error:"server encountered an error!"});
                            }
                        });
                    }
                }
            }
        });
    });
    /*socket.on("joinRoom",(data) => {
        socket.join(data);
    });*/
});
