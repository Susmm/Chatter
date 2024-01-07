/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
import React from "react";
import "./Modal.css";
import Profile from "./Profile";

function Modal({ setOpenModal,setProfilePic }) {
  return (
          /*<div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
      </div>
    </div>*/
            <div className="modal">
          <div onClick={()=>setOpenModal(false)} className="overlay"></div>
          <div className="modal-content" >
            <Profile setOpenModal={setOpenModal} setProfilePic={setProfilePic}/>
            <div className="close-modal" onClick ={()=>{setOpenModal(false);}}>
                    X
              </div>
          </div>
        </div>
  );
}

export default Modal;