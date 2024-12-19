import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const data = {
      name: name,
      email: email,
      password: password,
    };
  
    console.log('Sending data:', data); // Log data to ensure it’s correct
  
    axios.post('https://i-lm-kosh-89a1yuku5-gurdeeps-projects-f026c14f.vercel.app/user/register', data)
      .then((response) => {
        setMessage('Registration successful!');
        console.log('Registration successful!');
        console.log('User Entered Values:', data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', (response.data.user));
          navigate('/new');
          window.location.reload();  // Adjust the rout30e to correct path
         // 2-second delay
      })
      .catch(error => {
        const errorMessage = error.response?.data?.message || 'There was an error registering. Please try again.';
        setMessage(errorMessage);
        console.error('There was an error registering!', error);
      });
  };

  return (
    <div >
      <style>
        {`
        .form-container {
            margin-top: 0px;
            width: 300px;
            margin: 0 auto; 
            padding: 20px;
            border-radius: 25px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
            background-color: #867A6B;
          }
        .logo {
          width: 10%;
          height: 10%;
        }
        .logo img {
          width: 100%;
          height: 100%;
          padding: 0px;
          margin-top: 0px;
        }
        .register-form {
          display: flex;
          flex-direction: column;
        }
        .register-form label {
          margin-bottom: 5px;
        }
        #name {
          margin-top: -20px;
        }
        #email {
          margin-top: -20px;
        }
        #password {
          margin-top: -20px;
        }
        #confirm-password {
          margin-top: -20px;
        }
        .register-form input[type="text"],
        .register-form input[type="email"],
        .register-form input[type="password"] {
          margin-bottom: 0px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 10px;
        }
        .register-form button[type="submit"] {
          padding: 10px 10px;
          border: none;
          border-radius: 5px;
          background-image: linear-gradient(to right, #332620, #C0B69D);
          color: #fff;
          cursor: pointer;
        }
        .register-form p {
          margin-top: 10px;
          text-align: center;
        }
        .separator {
          width: 250px;
          height: 4px;
          background-color: #C2B99C;
          margin: 24px;
        }
        .main img {
          width: 200px;
          height: auto;
          padding: 0px;
          margin-top: 0px;
        }
        `}
      </style>

      <div style={{ textAlign: "center" }}>
        <div style={{ width: "300px", margin: "0 auto", padding: "0px" }}>
          <div className="main">
            <img src="ilm.png" alt="Logo" />
          </div>
        </div>
      </div>

      <div className="form-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <br />
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your Name"
            id="name"
            name="name"
            required
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your Email"
            id="email"
            name="email"
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter a Password"
            id="password"
            name="password"
            required
          />
          <br />
          <button type="submit">Register</button>
          <br />
          <p>
            Already have an account? <a href="login">Login</a>
          </p>
          {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
