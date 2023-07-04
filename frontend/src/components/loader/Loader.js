import React from 'react'
import "./Loader.scss";
import loaderImg from "../../assets/loader.gif";
import ReactDOM from 'react-dom';
const loader = () => {
  return ReactDOM.createPortal(
    <div className='wrapper'>
<div className='loader'>
  <img src={loaderImg} alt="Loading"></img>
</div>
    </div>,
    document.getElementById("loader")
  )
}

export const SpinnerImg=()=>{
  return(
    <div className='--center-all'>
      <img src={loaderImg} alt="Loading"></img>
    </div>
  );
};

export default loader;