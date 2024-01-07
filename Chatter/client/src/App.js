import './App.css';
import './Login.css';
import Chat from './home.jsx';
import { CircularProgress } from "@material-ui/core";
import { useState,useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Axios from 'axios';

const App=() => {
    const [state,setState] = useState("");
    
    const [userReg, setUserReg] = useState("");
    const [passReg, setPassReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    
    const [loginUser, setLoginUser] = useState("");
    const [loginPass, setLoginPass] = useState("");

    const [userStatus, setUserStatus] = useState("");
    const [loginStatus,setloginStatus] = useState(false);
    const [verifyingStatus,setVerifyingStatus] = useState(false);
    const [verifiedStatus,setVerifiedStatus] = useState(-1);
    
    let navigate=useNavigate();
    
    useEffect(()=>{
       if(sessionStorage.getItem("chat-app-user")) navigate("/chat"); 
    },[]);
    /*const register = () => {
        Axios.post('http://localhost:3003/register', {
            username: userReg,
            password: passReg 
        }).then((response) => {
            if (response.data.err)
                setUserStatus(response.data.err);
            else
                setUserStatus("user registered!");
        }).catch ((exception) =>{
           console.log(exception); 
        });
    };*/
    const login = (event) => {
        event.preventDefault();
        setVerifiedStatus(-1);
        setVerifyingStatus(true);
        Axios.post('http://localhost:3003/login', {
            username: loginUser,
            password: loginPass
        }).then((response) => {setTimeout(()=>{
            if (response.data.err){
                setVerifiedStatus(0);//setUserStatus(response.data.err);
                setVerifyingStatus(false);
            }
            else{
                setVerifiedStatus(1);
                setVerifyingStatus(false);
                setTimeout(()=>{
                    //setVerifiedStatus(-1);
                    sessionStorage.setItem("chat-app-user",JSON.stringify(response.data[0].username));
                    navigate("/chat");
                },3000);
                //setUserStatus(response.data[0].username + " logged in!");
            }
        },3000);
        });
    };
    useEffect(()=>{
        setloginStatus(loginUser!==""&&loginPass!=="");
    },[loginUser,loginPass]);
    /*const Forgotten = ()=>{
        return (loginPass==="" ? <div><br/></div> : <div style={{padding:"12px",paddingLeft:"38.3%",textAlign:"left",fontSize:"14px",color:"blue"}}><span style={{cursor:"pointer"}}>Forgotten password?</span></div> );
    };*/
    return ( sessionStorage.getItem("chat-app-user") ? <Chat/> :
            <div className="App">
    <img src={require('./repo/chatter_logo.png')} alt="Chatter.inc" height="110" width="295"/>
                <div className="register">
                    {state/*<h2>Registration</h2>
                    <section><label>Username</label></section>
                    <section><input type='text' onChange={(event) => {
                    setUserReg(event.target.value);
                }}/></section>                                                                               
                    <section><label>Password</label></section>
                    <section><input type='password' onChange={(event) => {
                    setPassReg(event.target.value);
                }}/></section>
                <section><label>Email id</label></section>
                <section><input type="email" required/></section>
                    <br/><button onClick={register}>Register</button>*/}
                </div>
                <form className="login_" onSubmit={login}>
                    {state/*<h2>Login</h2>
                    <section><label>Username</label></section>
                    <section><input type='text' required onChange={(event) => {
                    setLoginUser(event.target.value);
                }}/><br/></section>
                    <section><label>Password</label></section>
                    <section><input type='password' required onChange={(event) => {
                    setLoginPass(event.target.value);
                }}/></section>
                    <br/><button type="submit">Login</button>*/}
                </form>
                <div className="login">
          <form className="loginBox" onSubmit={login}>
          {state/*<div style={{display:"flex",justifyContent:"center"}}>{ state style={{paddingLeft:"236px"}}>*/}
          {state/*<div style={{width:"29.5%",paddingLeft:"11.5%"}}><img className="profile" style={{border: verifiedStatus===1 && "2px solid mediumslateblue"}} src = {require(verifiedStatus===1 ? "./pic2.jpg" : "./profile_I.png")} alt="profile"/></div><div style={{position:"relative",top:"-65px"}}><img src={require("./symbol.png")} style={{height:"95%",width:"76%"}}/></div></div>*/}
          <div><img className="profile" style={{position:"relative",left:"2.5px",border: verifiedStatus===1 && "2px solid mediumslateblue"}} src = {require(verifiedStatus===1 ? "./repo/pic2.jpg" : "./repo/profile_II_.png")} alt="profile"/></div><br/>
            <section style={{paddingTop:"16px"}}>
            <input
              placeholder="Email or Username"
              type="text"
              required
              className="loginInput"
              style={{border: verifiedStatus===1 ? "2px solid royalblue" : verifiedStatus===0 && "2px solid red"}}
              onChange = {(event)=>{setLoginUser(event.target.value);}}
              onFocus = {()=>{setVerifiedStatus(-1);}}
              disabled = {verifyingStatus || verifiedStatus===1}
            /><br/><br/>
            <span  style={{position:"relative",left:"-0.4px"}}>
            <input
              placeholder ="Password"
              type="password"
              required
              className="loginInput"
              style={{border: verifiedStatus===1 ? "2px solid royalblue" : verifiedStatus===0 && "2px solid red",width:"300px"}}
              onFocus = {()=>{setVerifiedStatus(-1);}}
              onChange = {(event) => {setLoginPass(event.target.value); }}
              disabled = {verifyingStatus || verifiedStatus===1}
              /></span>{loginPass===""||verifyingStatus||verifiedStatus===1 ? <div><br/></div> : <div style={{padding:"12px",paddingLeft:"38.3%",textAlign:"left",fontSize:"14px",color:"blue"}}><span style={{cursor:"pointer"}}>Forgotten password?</span></div>}
            <div style={{paddingLeft:"163.9px"}}><button className="loginButton" type="submit" disabled={loginUser===""||loginPass===""|| verifiedStatus===1} style={{paddingLeft: verifyingStatus ? "40px" : verifiedStatus===1 && "40px"}}>
              {verifyingStatus ?
              <span>verifying..&emsp;<CircularProgress color="white" size="20px"/></span>
                      : verifiedStatus===1 ? <span>Logging in..&emsp;<CircularProgress color="white" size="20px"/></span> : "Log in"}
            </button>&ensp;&ensp;<label className="container_" style={{fontSize:"13.825px",cursor:"pointer",color: "#0047ab" /*"#666699"*/}}>Keep me logged in<input type="checkbox" id="logged" style={{cursor:"pointer"}}/><span className="checkmark_"></span></label></div><br/><br/>
            <span className="loginForgot">Don't have an account?&ensp;<Link style={{fontStyle:"normal",color:"blue"}} to ="/register">Sign up</Link></span></section>
          </form>
          </div><br/><div style={{padding:"12px"}}></div>
        <div style={{backgroundColor: "#f0f2f5",height:"86px"}}><h3>{userStatus}</h3></div>
            </div>
            );
};

export default App;
