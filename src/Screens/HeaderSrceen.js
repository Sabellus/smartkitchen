import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HeaderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url:'http://localhost:5000',
      data: {
        email: '',
        password:''
      },
      isLoggedIn: false,
      role:{
        admin: false,
        editor: false,
        worker: false,
      }
    };
  }
  current_user(){
    if (localStorage.getItem('session')){
      this.setState({isLoggedIn:true})
      var k = JSON.parse(localStorage.getItem('role'))
      console.log((k[2]['role']))
      if ((k[2]['role']) === 'editor') {
        const newRole = {...this.state.role, editor: true}
        this.setState({role: newRole})
      }
      else if ((k[2]['role']) === 'worker'){
        const newRole = {...this.state.role, worker: true}
        this.setState({role: newRole})
      }
      else {
        const newRole = {...this.state.role, admin: true}
        this.setState({role: newRole})
      }

    }
    else{
      this.setState({isLoggedIn:false})
    }
  }
  auth() {
    console.log('отправляю')
    console.log("отпр",this.state.data)
    fetch(this.state.url+"/login",{
    method: "POST",
    body:JSON.stringify([{email:this.state.data.email},{password:this.state.data.password}])
    }).then((res)=> {
    return res.json();
  }).then((data) => {
    console.log(data[3])
    localStorage.setItem('session', JSON.stringify(data));
    localStorage.setItem('role', JSON.stringify(data));
    this.current_user()
  })}
  unauth(){
    localStorage.removeItem('session');
    localStorage.clear();
    this.current_user()
  }
  changeText(event,r){
    if(r === "email")
    {
      const newData = {...this.state.data, email: event}
      this.setState({data: newData})
    }
    else if(r === "password"){
      const newData = {...this.state.data, password: event}
      this.setState({data: newData})
    }
    else{
      console.log('не успех')
    }

  }
  componentWillMount(){
    this.current_user()
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <header style={styles.header}>
        <nav className="container navbar fixed-top navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to='/'>Кухня</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
              {/* <Link className="nav-link" to='/inprogress'>Изготовления</Link> */}
              </li>
              <li className="nav-item">
              <Link className="nav-link" to='/cooks'>Повара</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to='/dishes'>Блюда</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to='/products'>Продукты</Link>
              </li>
            </ul>
            {isLoggedIn ? (
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={()=>this.unauth()}>Выход</button>
            ) : (
              <div className="form-inline my-2 my-lg-0">
              <input className="form-control" type="text" placeholder="Email" defaultValue=''onChange={(j) => this.changeText(j.target.value,"email")}></input>
              <input className="form-control" type="text" placeholder="Пароль" defaultValue=''onChange={(j) => this.changeText(j.target.value,"password")}></input>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={()=>this.auth()}>Вход</button>
              </div>
            )}

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
