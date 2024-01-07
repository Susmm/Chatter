/*  `
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
import { useRef,useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import App from './App';
import io from 'socket.io-client';
import Axios from 'axios';

function Chat(){                                          //export default ()=>{
    //const [loginState,setLoginState]=useState(false);
    //const isFirstRun = useRef(true);
    //const [currentuser,setCurrentUser]=useState("");
    const currentuser=useRef(""),socket=useRef(undefined);
    let navigate=useNavigate(); //contactusers=[];
    
    useEffect(()=>{
        //if(isFirstRun.current){
            if(!sessionStorage.getItem("chat-app-user"))
                navigate("/");
            else{
                
                if(currentuser.current===""){ 
                    currentuser.current=JSON.parse(sessionStorage.getItem("chat-app-user"));
                    
                } //navigate("/chat");
                else{
                    /*Axios.post('http://localhost:3003/message',{user:currentuser.current}).then((response) => {
                        console.log(response.data);
                        update_contacts(response.data); //response.data);
                        //console.log("yes");
                        //contactusers=response.data;
                    }).catch ((exception) =>{
                       console.log(exception); 
                    });*/
                }
            }
            //sessionStorage.removeItem("chat-app-user");
            //setLoginState(true);
            //isFirstRun.current=false;
        //}
        // eslint-disable-next-line
    },[]);
    useEffect(()=>{
        console.log(currentuser.current);
        if(currentuser.current!==""&&socket.current===undefined){ 
            //console.log("no");
            socket.current = io.connect("http://localhost:3003");
            //update_contacts(contactusers);
            //io.close();
            socket.current.on("connect",()=>{
        console.log(`socket connected ${socket.current.id}`);
        socket.current.emit("add-chat",{username : currentuser.current,socketid: socket.current.id});
        //socket.current.emit("send-contacts",{username: currentuser.current,socketid: socket.current.id});
    });
            socket.current.on("chat-added",(data)=>{
                console.log("chat added");
                setIsConnected(true);
               //socket.current.emit("send-contacts",{username: currentuser.current,socketid: socket.current.id}); 
            });
            socket.current.on("get-contacts",(data)=>{
                console.log(data);
                update_contacts(data);
            });
            socket.current.on("receive-message",(data)=>{
                console.log(data);
                setArrivedMessage(data);
                //console.log(selectedContact);
                //if(selectedContact===data.from)
                    //update_messages();
            });
            socket.current.on("new-contact",(data)=>{
                console.log(data);
                setArrivedContact(data.contact);
                //update_contacts([data.contact]);
                /*let contents=[...contacts];
                contents.push(data.contact);
                console.log(contents);
                setContacts(contents);*/
            });
        }
    },[currentuser]);
    
    /*useEffect(()=>{
        console.log("yes");
        if(socket!==undefined){
           // console.log(contactusers);
            //update_contacts(contactusers);
            socket.current.emit("add-chat",currentuser.current);
        }
    },[socket]);*/
    /*useEffect(()=>{
        localStorage.removeItem("chat-app-user");
    },[]);*/
    const [joinFocus,setJoinFocus]=useState(0);
    const [roomsJoined,setRoomsJoined]=useState([]);
    const [newRoom,setNewRoom]=useState("");
    const [contacts,setContacts]=useState([]);
    const [selectedContact,setSelectedContact]=useState("");
    const [message,setMessage]=useState("");
    const [messageList,setMessageList]=useState(null);
    const [arrivedMessage,setArrivedMessage]=useState(null);
    const [arrivedContact,setArrivedContact]=useState("");
    const [newContact,setNewContact]=useState(false);
    const [searchContact,setSearchContact]=useState("");
    const [searchHolder,setSearchHolder]=useState("Find your contact");
    const [isConnected,setIsConnected]=useState(false);
    
    const map=new Map();
    const messageMapper=useRef(map);
    //let messageList=null;
    
    useEffect(()=>{
        if(selectedContact!==""){
        let mapper=messageMapper.current.get(selectedContact);
        if(!mapper) messageMapper.current.set(selectedContact,[]);
        update_messages();
        }
    },[selectedContact]);
    
    useEffect(()=>{
        if(arrivedMessage){
            if(!messageMapper.current.has(arrivedMessage.from))
                    messageMapper.current.set(arrivedMessage.from,[]);
                let mapper=[...messageMapper.current.get(arrivedMessage.from)];
                mapper.push(arrivedMessage.message);
                messageMapper.current.set(arrivedMessage.from,mapper);
            if(selectedContact===arrivedMessage.from)
                update_messages();
        }
    },[arrivedMessage]);
    useEffect(()=>{
        if(arrivedContact!=="")
            update_contacts([arrivedContact]);
    },[arrivedContact]);
    useEffect(()=>{
        if(isConnected&&!contacts.length){
            //console.log(contacts);
            //if(contacts[0]===""){ console.log("yes");
                //else console.log("no");
                socket.current.emit("send-contacts",{username: currentuser.current});
            //}
            //else console.log(contacts); //update_contacts(null);
        }
    },[isConnected]);
    //useEffect(()=>{
        //if(socket.current!==undefined){
        /*socket.current.on("connect",()=>{
        console.log(`socket connected ${socket.current.id}`);
        socket.current.emit("add-chat",currentuser.current);
    });*/   /*socket.current.on("receive-message",(data)=>{
                console.log(data);
                if(!messageMapper.current.has(data.from))
                    messageMapper.current.set(data.from,[]);
                let mapper=[...messageMapper.current.get(data.from)];
                mapper.push(data.message);
                messageMapper.current.set(data.from,mapper);
                console.log(selectedContact);
                if(selectedContact===data.from)
                    update_messages();
            });
        }
    },[selectedContact]);*/
    function search_contact(){
        if(!contacts.includes(searchContact)){
            Axios.post("http://localhost:3003/contacts",{search:searchContact}).then((response)=>{
                console.log(response.data);
                if (!response.data.error&&response.data.status){
                    //setUserStatus(response.data.err);
                    setNewContact(true);
                    setSearchHolder(searchContact);
                }
                else    setSearchHolder("Not found");
            }).catch ((exception)=> {
                  console.log(exception);            
            });
        }
        else setSearchHolder("Already in contact");
        setSearchContact("");
    }
    function add_contact(){
        //const contact=searchHolder;
        
        socket.current.emit("add-contact",{user: currentuser.current,contact: searchHolder});
        /*
        Axios.post("http://localhost:3003/contacts",{user: currentuser.current,contact: searchHolder}).then((response)=>{
            console.log(response);
            if(response.data.status){
                let contents=[...contacts];
                contents.push(contact);
                setContacts(contents);
            }
        }).catch ((exception)=> {
              console.log(exception);
        });*/
        setNewContact(false);
        setSearchHolder("Find your contact");
        setSearchContact("");
    }
    function update(){
        //console.log(newRoom);
        const rooms=[...roomsJoined];
        if(!rooms.includes(newRoom)) rooms.push(newRoom);
        setRoomsJoined(rooms);
    }
    function update_contacts(response){
        //console.log(response);
        //if(!response) return;
        const contents=[...contacts]; //contacts.slice(0,1);
        response.map((data)=>{ //if(data!==currentuser.current) 
                contents.push(data); return data; });
        setContacts(contents);
    }
    function update_messages(){
        let messages=messageMapper.current.get(selectedContact).map((data,index)=>{ return (<div key={index}>{data}</div>); });
        setMessageList(messages);
    }
    function send(){
        let mapper=[...messageMapper.current.get(selectedContact)];
        mapper.push(message);  
        messageMapper.current.set(selectedContact,mapper);
        update_messages();
        socket.current.emit("send-message",{message,to:selectedContact,from:currentuser.current});
        setMessage("");
    }
    /*const list=["hello","hi","baby"];
    let messageList=list.map((data,index)=>{ return (<div key={index}>{data}</div>); });*/
    /*let messageList=null;
    if(messageMapper.current.get(selectedContact)) 
        messageList=messageMapper.current.get(selectedContact).map((data)=>{ //console.log(data); 
            return (<div>{data}</div>); });*/
    let roomsList=roomsJoined.map((data)=>{ return (<option value={data} key={data} selected>{data}</option>); });  //formal way is to use a state for select value-->
    let contactList=contacts.map((data)=>{ return (<option value={data} key={data}>{data}</option>); });
    
    return ( sessionStorage.getItem("chat-app-user") ?
            <div>
            <div style={{paddingTop:"10px",paddingBottom:"10px"}}><span style={{fontSize:"22px",fontWeight:"bold"}}>Welcome !</span></div>
            <div><span style={{paddingLeft:"490px"}}>Join a chat&emsp;</span><select>{roomsList}</select>&ensp;<button onMouseEnter={()=>{setJoinFocus(1);}} onMouseLeave={()=>{setJoinFocus(0);}} onMouseDown={()=>{setJoinFocus(2);}} onMouseUp={()=>{setJoinFocus(1);}} style={{backgroundColor: (joinFocus===0 ? "#4cff4c" : joinFocus===1 ? "#00d848" : "darkgrey"),padding:"2px",paddingLeft:"5px",paddingRight:"5px",border:"1px solid black",borderRadius:"4px"}}>Join</button>&ensp;<input type="text" size="1" onChange={(event)=>{setNewRoom(event.target.value);}}/>&ensp;<button onClick={update}>+</button>&ensp;<span style={{paddingLeft:"10px"}}><select value={selectedContact} onChange={(e)=>{setSelectedContact(e.target.value);}}><option value="Select chat" selected hidden>Select chat</option>{contactList}</select></span><span style={{float: "right"}}><input type="text"  value={searchContact} placeholder={searchHolder} onChange={(e)=> {setSearchContact(e.target.value);}} onFocus={(event)=> {setSearchHolder("Find your contact");setNewContact(false);} } style={{width:"110px"}}/>&ensp;<button  onClick = {search_contact}>search</button><span style={{display: newContact ? "inline-block" : "none"}}>&ensp;<button onClick={add_contact}>Add</button></span></span></div>
            <div style={{paddingBottom:"7px"}}><button onClick={()=>{sessionStorage.removeItem("chat-app-user"); navigate("/login"); }}>Log out</button></div>
            <div style={{width:"99.8%",height: "300px",border: "2px solid silver",overflowY: "scroll"}}>{messageList/*<div>I have a baby</div><div>My husband left me</div>*/}</div>
            <div style={{display: selectedContact!=="" ? "block" : "none"}}><input type="text" style={{width:"96.59%", display: "inline-block", padding:"20px", paddingBottom:"50px"}} placeholder ="Enter your message here..." value={message} onChange={(e)=>{setMessage(e.target.value);}}/><div style={{textAlign:"right"}}><button onClick={send}>send</button></div></div>
            </div>
            : <App/>
            );
}

export default Chat;
