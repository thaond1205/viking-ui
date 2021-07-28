import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

function Header(props) {
    const [logOut, setlogOut] = useState(false)
    const [login, setLogin] = useState(false)
    const setLogout = (event) =>{
        event.preventDefault()
        confirmAlert({
            title: 'Bạn muốn đăng xuất?',
            message: '',
            buttons: [
              {
                label: 'Có',
                onClick: () => {
                    localStorage.removeItem('token')
                    localStorage.removeItem('username')
                    setlogOut(true)
                }
              },
              {
                label: 'Không',
                onClick: () => {
                   return false
                }
              }
            ]
          });
        
        
    }

    const reRedirect = () =>{
        if(logOut){
            return <Redirect to="/login" />
        }
    }

    return (
        <div>
            {reRedirect()}
        <nav className="navbar navbar-inverse" style={{'font-variant': 'small-caps'}}>
            <div className="container-fluid">
                <ul className="nav navbar-nav">
                    <li><a href="/" style={{'fontSize' : '25px', 'color' : 'white'}}>ADMIN PAGE</a></li>
                    {localStorage.getItem('token') ? 
                    <>
                        <li><Link to="/admin/product" >Products Manager</Link></li>
                        <li><Link to="/admin/category">Categories Manager</Link></li>
                        <li><Link to="/admin/order">Order Manager</Link></li> 
                        <li><a onClick={setLogout}>Logout</a></li>
                    </> :
                        <li><Link to="/login">Login</Link></li>
                    }
                   
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="/"><li>{localStorage.getItem('token') ? 'Say hi '+ localStorage.getItem('username') : ''}</li></a></li>
                </ul>
            </div>
        </nav>
    </div>
    )
}

export default Header;