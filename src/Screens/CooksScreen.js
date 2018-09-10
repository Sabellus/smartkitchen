import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class CooksScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url:'http://localhost:5000',
      cooks: [],
      isToggleOn: false,
      addInputs: [],
      data: {
        fullname:'1',
        placeofwork:'2',
        discharge:'3',
      },
      page:{
        count:1
      },
      isLoggedIn: false,
      role:{
        admin: false,
        editor: false,
        worker: false,
      }

    };
    this.addButtonClick = this.addButtonClick.bind(this);
    this.changeText = this.changeText.bind(this);
    this.sendCookClick = this.sendCookClick.bind(this)
    this.deleteItemClick = this.deleteItemClick.bind(this)
    this.updateItemBlur = this.updateItemBlur.bind(this)
    this.decrementCount = this.decrementCount.bind(this)
    this.incrementCount = this.incrementCount.bind(this)

  }
  sendAddItem(){


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
  getCook(){
    const queryString = require('query-string');
    const parsed = queryString.parse(this.props.location.search);
    var page = parsed['page']
    if (isNaN(page)){
      var  newData = {...this.state.page, count: 1}
    }
    else{
      var p = parseInt(page)
      var  newData = {...this.state.page, count: p}
    }
    this.setState(prevState => ({
      page: newData
    }),() => {
    console.log(this.state.page.count)
    fetch(this.state.url+`/cook?page=${this.state.page.count}`,{
      method: "GET",
    }).then(result => {
        return result.json()
      }).then(data => {
        this.setState({cooks:[]})
        const isWorker = this.state.role.worker;
        const isEditor = this.state.role.editor;
        console.log("РОЛЬ", isWorker, isEditor)
        if (isWorker && !isEditor){
          let cook = data.map ((item,i) => {
            return (
            <tr key={i}>
              <td><input className="form-control id_input" width="10" disabled type="text" defaultValue={item["id"]}  onChange={(j) => this.changeText()}></input></td>
              <td><input className="form-control form-td" disabled type="text" defaultValue={item["fullname"]}  onBlur={(j) => this.updateItemBlur("fullname",item["id"],j,item["fullname"])}></input></td>
              <td><input className="form-control form-td" disabled type="text" defaultValue={item["placeofwork"]}  onBlur={(j) => this.updateItemBlur("placeofwork",item["id"],j,item["placeofwork"])}></input></td>
              <td><input className="form-control form-td" disabled type="text" defaultValue={item["discharge"]}  onBlur={(j) => this.updateItemBlur("discharge",item["id"],j,item["discharge"])}></input></td>

            </tr>)}
          )
          this.setState({cooks: cook})
        }
        else if (!isWorker && isEditor) {
          let cook = data.map ((item,i) => {
            return (
            <tr key={i}>
              <td><input className="form-control id_input" width="10" disabled type="text" defaultValue={item["id"]}  onChange={(j) => this.changeText()}></input></td>
              <td><input className="form-control form-td" type="text" defaultValue={item["fullname"]}  onBlur={(j) => this.updateItemBlur("fullname",item["id"],j,item["fullname"])}></input></td>
              <td><input className="form-control form-td" type="text" defaultValue={item["placeofwork"]}  onBlur={(j) => this.updateItemBlur("placeofwork",item["id"],j,item["placeofwork"])}></input></td>
              <td><input className="form-control form-td" type="text" defaultValue={item["discharge"]}  onBlur={(j) => this.updateItemBlur("discharge",item["id"],j,item["discharge"])}></input></td>

            </tr>)}
          )
          this.setState({cooks: cook})
        }
        else {
          let cook = data.map ((item,i) => {
            return (
            <tr key={i}>
              <td><input className="form-control id_input" width="10" disabled type="text" defaultValue={item["id"]}  onChange={(j) => this.changeText()}></input></td>
              <td><input className="form-control form-td" type="text" defaultValue={item["fullname"]}  onBlur={(j) => this.updateItemBlur("fullname",item["id"],j,item["fullname"])}></input></td>
              <td><input className="form-control form-td" type="text" defaultValue={item["placeofwork"]}  onBlur={(j) => this.updateItemBlur("placeofwork",item["id"],j,item["placeofwork"])}></input></td>
              <td><input className="form-control form-td" type="text" defaultValue={item["discharge"]}  onBlur={(j) => this.updateItemBlur("discharge",item["id"],j,item["discharge"])}></input></td>
              <td><button onClick={() => {this.deleteItemClick(item["id"])}} type="button"className="btn btn-outline-danger">×</button></td>
            </tr>)}
          )
          this.setState({cooks: cook})
        }
      })
    })
  }
  componentDidMount() {
    this.getCook()
  }
  componentWillMount(){
    this.current_user()
  }
  updateItemBlur(title,val,field,text){
    const textstr = text+''
    if(textstr!==field.target.value){
      fetch(this.state.url+"/cook/"+val,{
        method: "PUT",
        body: JSON.stringify([{title:title},{value:field.target.value}])
        }).then(function(res){
          return res; })
        .then((res) => {
          this.getCook()
      })
    }
    else {

    }
  }
  deleteItemClick(val){
    console.log(val)
    fetch(this.state.url+"/cook/del/"+val,{
      method: "PUT",
      }).then(function(res){
        return res; })
      .then((res) => {
        this.getCook()
      })
  }
  addButtonClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }),() => {
      this.addTrInput()
    })
  }
  changeText(event,r){
    if(r === "fullname")
    {
      const newData = {...this.state.data, fullname: event}
      this.setState({data: newData})
    }
    else if(r === "placeofwork"){
      const newData = {...this.state.data, placeofwork: event}
      this.setState({data: newData})
    }
    else if(r === "discharge"){
      const newData = {...this.state.data, discharge: event}
      this.setState({data: newData})
    }
    else{
      console.log('не успех')
    }

  }
  addTrInput(){
    if(this.state.isToggleOn){
      let inputTh = Object.keys(this.state.data).map((property, index) =>{
        return (
        <th key={index}><input className="form-control" type="text" defaultValue={this.state.data[property]}  onChange={(j) => this.changeText(j.target.value,property)}></input></th>
        )
      })

      const inputTr = (
      <tr>
        <th></th>
        {inputTh}
        <th><button onClick={this.sendCookClick} className="addbutton btn btn-outline-success my-2 my-sm-0" type="submit">+</button></th>
      </tr>
      )
      this.setState({addInputs: inputTr})
    }
    else{
      console.log("кок")
    }
  }
  addTr(){
    alert("Привки")
  }
  sendCookClick() {
    console.log('отправляю')
    console.log("отпр",this.state.data)
    fetch(this.state.url+"/cook",{
    method: "POST",
    body:JSON.stringify( this.state.data)
    }).then(function(res){
      console.log(res)
      return res; })
    .then(()=>{
      this.getCook()
    })
  }
  incrementCount(){
    var  newData = {...this.state.page, count: this.state.page.count + 1}
    this.setState(prevState => ({
      page: newData
    }),() => {
      console.log(this.state.page.count)
      this.getCook()
    })
  }
  decrementCount(){
    var  newData = {...this.state.page, count: this.state.page.count - 1}
    this.setState(prevState => ({
      page: newData
    }),() => {
      console.log(this.state.page.count)
      this.getCook()
    })
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const isWorker = this.state.role.worker;
    return (

      <div>
        {isLoggedIn ? (
       <div>
         {isWorker ? (
       <div>

       </div>
        ) : ( <div className="addbutton">

        <button onClick={this.addButtonClick} className="addbutton btn btn-outline-success my-2 my-sm-0" type="submit">Добавить</button>
  </div>)}
       <div className="row">

       <table className="table">
         <thead>
         {this.state.isToggleOn ? this.state.addInputs : null}
           <tr>
             <th>ID</th>
             <th>ФИО</th>
             <th>Адрес работы</th>
             <th>Разряд</th>
           </tr>
         </thead>
        <tbody>
          {this.state.cooks}
        </tbody>
       </table>
       </div>

       <nav aria-label="Page navigation example">
         <ul className="pagination">
           <li className="page-item"><Link className="page-link" onClick={this.decrementCount} to={`cooks?page=${this.state.page.count-1}`}>Назад</Link></li>
           <li className="page-item"> <button className="page-link">{this.state.page.count}</button></li>
           <li className="page-item"><Link className="page-link" onClick={this.incrementCount} to={`cooks?page=${this.state.page.count+1}`}>Вперед</Link></li>
         </ul>
       </nav>
       </div>
      ) : (
        <div></div>
      )}

      </div>
    )
  }
}

export default CooksScreen;

// {isLoggedIn ? (
//   <div></div>
// ) : (
//   <div></div>
// )}