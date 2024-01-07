import React, { useState } from 'react'
import Webcam from 'react-webcam'

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 500,
  height: 570,
  facingMode: 'user'
};
const Profile = ({setOpenModal,setProfilePic}) => {
  const [picture, setPicture] = useState('');
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    console.log(pictureSrc);
    setPicture(pictureSrc);
  });
  
  const [title,setTitle] = useState(true);
  return (
    <div>
      <h2 style={{color: "green"}}>
        { title ? "Say cheeeeseee!" : "Niceeeeeee!" }
      </h2>
      <div>
        {picture === '' ? (
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            width={400}
            screenshotFormat="image/jpeg"
            screenshotQuality={1}
            mirrored={true}
            videoConstraints={videoConstraints}
          />
        ) : (
        <div style={{paddingTop:"52px"}}><img src={picture} /></div>
        )}
      </div>
      <div>
        {picture !== '' ? (
          <div style={{paddingTop:"50px"}}>
          <button
            onClick={(e) => {
              e.preventDefault();
              setPicture('');
              setTitle(!title);
            }}
            className="btn btn-primary" style={{background:"#1775ee",cursor:"pointer",fontWeight:"bold",border:"none",fontSize:"14px",color:"white",padding:"10px 18px",borderRadius:"7px"}}
          >
            Retake
          </button>&emsp;
          <div style={{display: "inline-block",background:"#3fff00",border:"none",cursor:"pointer",fontWeight:"bold",fontSize:"14px",fontFamily:"Arial",color:"white",padding:"9.2px 14px",borderRadius:"8px",position:"relative",top:"-1.4048px"}} onClick ={()=>{setOpenModal(false);setProfilePic({url:picture,name:"Snapshot-"+new Date().getTime()});}}>&nbsp;Final&nbsp;</div>
              </div>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              capture();
              setTitle(!title);
            }}
            className="btn btn-danger" style={{background:"crimson",border:"none",cursor:"pointer",fontWeight:"bold",fontSize:"14px",color:"white",padding:"10px 15px",borderRadius:"8px"}}
          >
            Capture
          </button>
        )}
      </div>
      
    </div>
  );
};
export default Profile
