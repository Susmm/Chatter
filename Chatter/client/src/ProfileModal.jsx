/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
//import React from "react";
import "./ProfileModal.css";
import {useState,useRef,useEffect} from 'react';
import {TransformWrapper,TransformComponent} from "react-zoom-pan-pinch";
//import { HotKeys } from "react-hotkeys";

export default function ProfileModal({ProfilePic,setOpenProfileModal}) {
        const [ministate,setMiniState]=useState(true);
        const [panstate,setPanState]=useState(false);
        const [zoomed,setZoomed]=useState(true);
        const [keystate,setKeyState]=useState(0);
	const overlayRef=useRef(null);
	        
    /*    const manageKeyPress = (funcs) => {
    return (event) => {
        const {zoomIn, zoomOut, resetTransform} = funcs;
        if(event.shiftKey) {
           zoomOut();
        }
    }

};*/
	useEffect(()=>{
		if(overlayRef.current){ overlayRef.current.focus(); }
	});
	
        const resetKeystate = (funcs) => {
 //       console.log(event);
    //if (event&&event.shiftKey) {
      //keystate.current?.zoomOut();// component function
    //}
    //return (event) => {
    if(funcs){
        const {zoomIn, zoomOut, resetTransform} = funcs;
		if(keystate===1){
			zoomIn();
			setKeyState(0);
		}
		else if(keystate===2){
			zoomOut();
			setKeyState(0);
		}
		
    }
};
        return (
            <div className="Profile_modal">
          { ministate ? 
          <div>
          <div className="MiniProfile_overlay" onClick={()=>setOpenProfileModal(false)}></div> 
          <img src={ProfilePic.url ? ProfilePic.url : `${URL.createObjectURL(ProfilePic)}`} className="MiniProfile_modal-content" onClick={()=>{setMiniState(!ministate);}}/>
          </div>
        :
          <div className="Profile_overlay" tabIndex="0" ref={overlayRef} onKeyDown={(e)=>{if(e.key==='=') setKeyState(1); if(e.key==='-') setKeyState(2);}}>
          <div className="Profile_close-modal">
          <span onClick={()=>setMiniState(true)} style={{cursor:"pointer"}}>&minus; &thinsp;</span><span onClick ={()=>{setOpenProfileModal(false);}} style={{cursor:"pointer"}}>&#x2A2F;</span>
              </div>
          <div className="Profile_modal-content" onClick={(e)=>(e.detail===2) && setZoomed(!zoomed) }>
          <TransformWrapper defaultScale={1} defaultPositionX={"100px"} defaultPositionY={"200px"} panning={{velocityDisabled: true,disabled: !panstate}} doubleClick={{mode: zoomed ? "zoomOut" : "zoomIn"}} centerZoomedOut={true} onZoom={(e)=>{ setPanState(e.state.scale!==1); if(e.state.scale===1){ setZoomed(true);}}} >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <div>
          {keystate!==0 && resetKeystate({zoomIn, zoomOut, resetTransform})}
          <TransformComponent>
          <img src={ProfilePic.url ? ProfilePic.url : `${URL.createObjectURL(ProfilePic)}`} style={{width:"560px",height:"100vh"}} />
          </TransformComponent></div>
          )}
          </TransformWrapper>
          </div>
          </div>}</div>
  );
}
