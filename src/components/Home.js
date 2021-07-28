import React from 'react';
import Products from './admin/Products';

const Home = () => {
    const showLogin = () =>{
        if(localStorage.getItem('token')){
            return <Products />
        }
      }
    return (
        <div>
            {showLogin()}
        </div>
    );
};

export default Home;