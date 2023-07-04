import React from 'react'
import {BiJoystickButton} from "react-icons/bi"
import {Link} from "react-router-dom";
import "./Home.scss";
import heroImg from "../../assets/inv-img.png"
import { ShowOnLogin, ShowOnLogout } from '../../components/protect/HiddenLink';

const Home = () => {
  return(
    <div className="home">
      <nav className="container --flex-between"> 
      <div className="logo">
        <BiJoystickButton size={35}/>
      </div>
        <ul className="home-links">
  <ShowOnLogout>
<li>
  <Link to="/register">Register</Link>
</li>
</ShowOnLogout>
<ShowOnLogout>
<li>
  <button className="--btn --btn-primary"><Link to="/login">Login</Link></button>
</li>
</ShowOnLogout>
<ShowOnLogin>
<li>
  <button className="--btn --btn-primary"><Link to="/dashboard">Dashboard</Link></button>
</li>
</ShowOnLogin>
</ul>
</nav>    
<section className="container hero">
<div className='hero-text'>
<h2>Laboratory Management System:  Revolutionize your lab with Hunt-EZ</h2>
<p>A system to manage and find products in your laboratories in a single click. Efficiency starts in the lab.Simplify your workflow with our management system.</p>
</div>
<div className='hero-image'>
  <img src={heroImg} alt="im"></img>
</div>
</section>
</div> 
  );
};

export default Home;