import axios from "axios";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

function App(props) {
  const [formLogin, setFormLogin] = useState({})
  const [accessLogin, setAccessLogin] = useState(false)
  const [showErrorLogin, setShowErrorLogin] = useState(false)
  const [errorTileLogin, setErrorTileLogin] = useState(null)
 

  const changeHandlerForm = (event) =>{
    const { name, value } = event.target;
    setFormLogin({
      ...formLogin,
      [name]: value,
    });
  }

  const submitForm = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8080/api/auth/signin', formLogin)
          .then(res => {
            if(res.data.message){
              setErrorTileLogin(res.data.message)
              setShowErrorLogin(true)
            }
            if(res.data.accessToken){
              localStorage.setItem('token',res.data.accessToken)
              localStorage.setItem('username', res.data.username)
              setAccessLogin(true)
              props.onChangeLogin(true)
            }
           
          })
          .catch(error => {
            console.log(error)
            setErrorTileLogin('  Username hoặc password không hợp lệ!')
            setShowErrorLogin(true)
          })
  }
  
  const reRedirect = () =>{
    if(accessLogin){
      return <Redirect to="/" />
    }
  }

  return (
    <div>
      {reRedirect()}
      <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
        <div className="card card0 border-0">
          <div className="row d-flex">
            <div className="col-lg-6">
              <div className="card1 pb-5">
                <div className="row">
                    <span className="login-admin">LOGIN ADMIN VIKING</span>
                </div>
                <div className="row px-3 justify-content-center mt-4 ml-4 mb-5 border-line">
                  <img src="https://i.imgur.com/uNGdWHi.png" className="image" />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card2 card border-0 px-4 py-5">
              {showErrorLogin ? <div className="alert alert-danger" role="alert">
                                  <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                  <span className="sr-only">Error:</span>
                                  {errorTileLogin}
                                </div> 
                                : ''}
                <div className="row px-3">
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">Username</h6>
                  </label>
                  <input
                    className="mb-4"
                    type="text"
                    name="username"
                    placeholder="Enter your username!"
                    onChange={changeHandlerForm}
                  />
                </div>
                <div className="row px-3">
                  <label className="mb-1">
                    <h6 className="mb-0 text-sm">Password</h6>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password!"
                    onChange={changeHandlerForm}
                  />
                </div>
                <div className="row mb-3 px-3 btn-login">
                  <button type="submit" className="btn btn-blue text-center" onClick={submitForm}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
