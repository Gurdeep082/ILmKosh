import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from "./images/logo_nobg.png";

const Hero = () => {
  return (
    <>
    <style>{`

/* Hero section */

.hero-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
}

.hero-section div {
  position: absolute;
  // top: 25%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom :15% ;
  text-align: center; 
  border-radius: 8px; 
  gap :1em ;
}

.hero-section img {
  width: 30vw; 
  height: auto;
}

.hero-section h1 {
  font-size: 2.5rem; 
  font-weight: bolder;

}

.hero-section button {
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  width: 100%;
  color: #3E2723;
  background-color: #F0E2C6;
  border: 3px solid #3E2723;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;

}

.hero-section button:hover {
  background-color:  #eed39d;
}
`}</style>
    <div className='hero-section'>
      
      <div className='logo'>
        <img src={logo} alt="Logo" />
        <h1>TREASURE OF KNOWLEDGE</h1>
        <Link to="/new"> 
          <button>Get Started</button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default Hero;