import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HeaderScreen extends Component {
  render() {
    return (
      <header style={styles.header}>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">          
          <Link className="navbar-brand" to='/'>Кухня</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
              <Link className="nav-link" to='/inprogress'>Изготовления</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to='/cooks'>Повора</Link>
              </li>  
              <li className="nav-item">
              <Link className="nav-link" to='/dishes'>Блюда</Link>
              </li> 
              <li className="nav-item">
              <Link className="nav-link" to='/products'>Продукты</Link>
              </li>        
            </ul>
            <div className="form-inline my-2 my-lg-0">              
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Вход</button>
            </div>
          </div>
        </nav>
        {/* <h1>Кухня</h1>
        <div>       
          <Link className="btn btn-secondary" to='/'>Изготовление</Link>
          <Link className="btn btn-secondary" to='/roster'>Повора</Link>
          <Link className="btn btn-secondary" to='/schedule'>Блюда</Link>
          <Link className="btn btn-secondary" to='/schedule'>Продукты</Link>           
        </div> */}
      </header>
    );
  }
}
const styles = {
  header: {
       
  },
  h1: {
    display:'inline'
  },
  link:{
    
  }
  
}
export default HeaderScreen;
