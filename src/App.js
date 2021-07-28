import './App.css';
import Header from './components/Header';
import Login from './components/user/Login';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './components/Home';
import { useState } from 'react';
import Footer from './components/Footer';
import Products from './components/admin/Products';
import Categories from './components/admin/Categories';
import Order from './components/admin/Order';

function App() {
  const [login, setLogin] = useState(false)
  

  const changeLogin = (value) =>{
    setLogin(value)
  }
  const index = () =>{
    if(!localStorage.getItem('token')){
      return(
        // <div class="alert alert-danger" role="alert" style={{textAlign: 'center'}}>
        //    <h2> Hãy đăng nhập đi thằng này! Bạn cần phải đăng nhập để sử dụng các chức năng!</h2>
        // </div>
        <Login onChangeLogin={(value) => changeLogin(value)}/>
      )
    }
  }
  return (
    <Router>
      <Header onChangeLogin={login}/>
      {index()}
      <Switch>
      <Route exact path="/">
          <Home />
      </Route>
      <Route path="/login">
        <Login onChangeLogin={(value) => changeLogin(value)}/>
      </Route>
      <Route path="/admin/product">
        <Products />
      </Route>
      <Route path="/admin/category">
        <Categories />
      </Route>
      <Route path="/admin/order">
        <Order />
      </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
