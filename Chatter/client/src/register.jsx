/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/reactjs.jsx to edit this template
 */
//import './App.css';
import './Register.css';
import Chat from './home.jsx';
import { CircularProgress } from "@material-ui/core";
import { useState,useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Axios from 'axios';
import Modal from "./Modal";
import ProfileModal from "./ProfileModal";
/*import {storage} from "./firebase";
import {ref} from "firebase/storage";*/

export default function Register(){
        const [state,setState] = useState("");
    
    const [userReg, setUserReg] = useState("");
    const [passReg, setPassReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [nameReg, setNameReg] = useState("");
    
    const [regisUser, setRegisUser] = useState("");
    const [regisPass, setRegisPass] = useState("");
    const [userStatus, setUserStatus] = useState("");
    
    const [ProfilePic,setProfilePic] = useState(null);
    //const [defaultProfilePic,setDefaultProfilePic] = useState(require("./pic2.jpg"));
    const [badProfilePic,setBadProfilePic] = useState("");
    const [profileSelector,setProfileSelector] = useState(0);
    const [profileChooser,setProfileChooser] = useState(false);
    
    const [modalOpen, setModalOpen] = useState(false);
    //const [selfieProfile,setSelfieProfile] = useState(false);
    const [ProfileModalOpen,setProfileModalOpen] = useState(false);
    
    let navigate=useNavigate();
    
    useEffect(()=>{
       if(sessionStorage.getItem("chat-app-user")) navigate("/chat"); 
    },[]);
    /*useEffect(()=>{
        window.addEventListener("focus", ()=>console.log(profileChooser));
    },[]);*/
    useEffect(()=>{
        //console.log(modalOpen);
        if(!modalOpen){ setProfileChooser(false); }
        //console.log(ProfileModalOpen);
    },[modalOpen]);
    const regis=(e)=>{
        e.preventDefault();
    };
    const uploadImage = ()=>{
        //ProfilePic && ();
    }
    function initialize(){
  	document.body.onfocus=check;
    }
    function check(){
          //if(selectedImage==null||selectedImage==pic)   //onchange functionality can be integrated using lastModified property of selectedImage
                  //console.log("Canceled");
          /*else
                  console.log("Loaded");*/
        setProfileChooser(false);
        document.body.onfocus=null;
    }
    if(modalOpen||ProfileModalOpen) {
        document.body.classList.add('active-modal')
    } 
    else {
        document.body.classList.remove('active-modal')
    }
        return ( sessionStorage.getItem("chat-app-user") ? <Chat/> :
            <div>
          <div className="registration">
                <div className="regisWrapper"><div className="regisLeft"><img src={require('./repo/chatter_logo.png')} alt="Chatter.inc" height="130" width="330" style={{paddingTop:"4px"}}/>
                <span className="Desc"><i>Become privately social.</i></span></div>
                <div className="regisRight">
          <form className="regisBox" onSubmit={regis}>
          <div style={ProfilePic && {marginLeft:"34px"}}>{ state /*style={{paddingLeft:"236px"}}>*/}
          <img className="profile_" src={ProfilePic ? (ProfilePic.url ? ProfilePic.url : `${URL.createObjectURL(ProfilePic)}`) : require('./repo/profile_II_.png')} onError={()=>{setBadProfilePic(`Could not set image as profile photo.`); setProfilePic(null);}} style={{border: ProfilePic && (profileSelector===1||ProfileModalOpen) && "2px solid mediumslateblue"}}/>{ProfilePic && <span><div style={{display:"inline-block",position:"relative",top:"3px",left:"-1px"}}><img src={require('./repo/delete-icon.png')} alt="Lacuna" height="16.6px" width="17px" style={{cursor:"pointer"}} onClick ={()=>setProfilePic(null)}/></div><div style={{display:"inline-block",position:"relative",top:"38px",left:"-30px"}}><img src={require('./repo/view-icon.png')} alt="Lacuna" height="21.5px" width="20.5px" style={{cursor:"pointer"}} onClick ={()=>{ setProfileModalOpen(true); }}/></div></span>}</div><br/>
            <section style={{paddingTop:"14px"}}>
            <input placeholder="Full name" type="text" required className="regisInput" style={{border: profileSelector===1 && "1px solid royalblue",caretColor: profileSelector===1 && "transparent"}} onMouseDown = {()=>{setProfileChooser(false); setProfileSelector(0);}} onBlur ={()=>{if(profileSelector===1) setProfileChooser(false); if(!profileChooser) setProfileSelector(0);}} disabled={modalOpen||ProfileModalOpen||profileChooser} title={nameReg!=="" && "Full name"} onChange={(e)=>setNameReg(e.target.value)}/><br/><br/>
            <input placeholder="Username" type="text" required className="regisInput" disabled={modalOpen||ProfileModalOpen||profileChooser} title={userReg!=="" && "Username"} onChange={(e)=>setUserReg(e.target.value)}/><br/><br/>
            <input
              placeholder="Email"
              type="email"
              required
              className="regisInput"
              disabled={modalOpen||ProfileModalOpen||profileChooser}
              title={emailReg!=="" && "Email"}
              onChange={(e)=>setEmailReg(e.target.value)}
            /><br/><br/>
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="regisInput"
              disabled={modalOpen||profileChooser||ProfileModalOpen}
              title={passReg!=="" && "Password"}
              onChange={(e)=>setPassReg(e.target.value)}
            /><br/><br/>
            <div className="regisInput" tabIndex="0" onFocus={()=> { setBadProfilePic(""); setProfileSelector(1); }} style={{display:"inline-block",position:"relative",textAlign:"left",fontSize:"13.5px",width:"301.9916533px",left:"-0.6234px",color:"dimgray",paddingLeft:"20px",border: profileSelector===1 && "2px solid royalblue"}} onBlur={(e)=> {!profileChooser ? setProfileSelector(0) : e.target.focus()}}><input onFocus = {()=> setProfileSelector(1)} title = {ProfilePic && ProfilePic.name} placeholder="Profile photo (optional)" defaultValue={ProfilePic && (ProfilePic.name.length>32 ? ProfilePic.name.substring(0,32)+".." : ProfilePic.name)} style={{paddingTop:"10px",border:"none",outline:"none",width:"222px",cursor:"default"}} readOnly/><button style={{padding:"2px",paddingLeft:"1px",paddingRight:"0px",fontSize:"12px",outline: "none",border: profileSelector===0 ? "1px solid dimgray" : "1px solid black",borderRadius: "5px",color:"black",cursor:"grabbing"}} onClick = {()=>setProfileChooser(true)}><label htmlFor="profile" style={{padding:"2.4px",paddingLeft:"5.6px",paddingRight:"4.5px",cursor:"grabbing"}}>Browse..</label></button>
            {state/*<button style={{position:"relative",top:"-22px",left:"310px"}} 
        className ="openModalBtn"
        onClick={() => {
            //setProfileSelector(1);
            setProfileChooser(true);
          setModalOpen(true);
        }}
      >Open
        </button>*/}
        <div style={{position:"relative",top:"-22px",left:"310.7px",width:"22px"}}>
            <input type="image" alt="Lacuna" src={require('./repo/capture.png')} height="19px" width="19.7px" style={{padding:"1px",outline: "none",border: (profileChooser||profileSelector===1) && "1px solid silver"}} title ="take a snapshot" onClick ={()=>{ setProfileChooser(true); setModalOpen(true); }}/>
        </div>
        <input
              type="file"
              id="profile"
              style={{display:"none"}}
              accept ="image/*"
              onClick ={initialize}
              onChange = {(event)   => { setProfileChooser(false); console.log(event.target.files[0]); setProfilePic(event.target.files[0]) }}
            />
                    {modalOpen && <Modal setOpenModal={setModalOpen} setProfilePic={setProfilePic}/>}
            </div>{ badProfilePic.length ? <div style={{position:"relative",paddingBottom:"10px",top:"-3px",paddingLeft:"25.3%",textAlign:"left",fontSize:"12px"}}><span style={{color:"red"}}>*</span> {badProfilePic}</div> :
        <div style={{padding:"1.8px"}}></div> }
            <div style={{paddingLeft:"163px"}}><button className="regisButton" type="submit"  disabled={modalOpen}>
              {state/*(
                <CircularProgress color="white" size="20px" />
              ) : 
                verifying..&emsp;<CircularProgress color="white" size="20px" />*/}
                Create Account
                </button>&nbsp;&thinsp;&thinsp;&thinsp;<label className="container" style={{fontSize:"13.825px",cursor:modalOpen && "default",color: "#0047ab" /*"#666699"*/}}>Keep me logged in<input type="checkbox" disabled={modalOpen} id="logged" /><span className="checkmark"></span></label></div><br/><br/>
            <span className="regisForgot">Already have an account?&ensp;<Link style={{fontStyle:"normal",color:"blue"}} to ="/login">Log in</Link></span></section>
            </form>
          </div></div></div>
          {ProfileModalOpen && <ProfileModal setOpenProfileModal={setProfileModalOpen} ProfilePic={ProfilePic}/>}
        <br/><br/>
        <div style={{backgroundColor: "#f0f2f5",height:"86px"}}><h3>&emsp;{userStatus}</h3></div>
        </div>);
        }
