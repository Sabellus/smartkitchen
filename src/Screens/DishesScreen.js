import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class DishesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url:'http://localhost:5000',
      dishes: [],
      isToggleOn: false,
      addInputs: [],
      data: {
        name_dish:'1',
        number_recipe:'2'
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
    this.sendDishClick = this.sendDishClick.bind(this)
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
  getDish(){
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
    fetch(this.state.url+`/dish?page=${this.state.page.count}`,{
      method: "GET",
    }).then(result => {
        return result.json()
      }).then(data => {
        this.setState({cooks:[]})
        const isWorker = this.state.role.worker;
        const isEditor = this.state.role.editor;
        console.log("РОЛЬ", isWorker, isEditor)
        if (isWorker && !isEditor){
          let dish = data.map ((item,i) => {
            return (
              <tr key={i}>
                  <td><input className="form-control id_input" width="10" disabled type="text" defaultValue={item["id"]}  onChange={(j) => this.changeText()}></input></td>
                  <td><input className="form-control form-td" type="text" disabled defaultValue={item["name_dish"]}  onBlur={(j) => this.updateItemBlur("name_dish",item["id"],j,item["name_dish"])}></input></td>
                  <td><input className="form-control form-td" type="text" disabled defaultValue={item["number_recipe"]}  onBlur={(j) => this.updateItemBlur("number_recipe",item["id"],j,item["placeofwork"])}></input></td>

              </tr>
            )
          })
          this.setState({dishes: dish})
        }
        else if (!isWorker && isEditor) {
          let dish = data.map ((item,i) => {
            return (
              <tr key={i}>
                  <td><input className="form-control id_input" width="10" disabled type="text" defaultValue={item["id"]}  onChange={(j) => this.changeText()}></input></td>
                  <td><input className="form-control form-td" type="text" defaultValue={item["name_dish"]}  onBlur={(j) => this.updateItemBlur("name_dish",item["id"],j,item["name_dish"])}></input></td>
                  <td><input className="form-control form-td" type="text" defaultValue={item["number_recipe"]}  onBlur={(j) => this.updateItemBlur("number_recipe",item["id"],j,item["placeofwork"])}></input></td>

              </tr>
            )
          })
          this.setState({dishes: dish})
        }
        else {
          let dish = data.map ((item,i) => {
            return (
              <tr key={i}>
                  <td><input className="form-control id_input" width="10" disabled type="text" defaultValue={item["id"]}  onChange={(j) => this.changeText()}></input></td>
                  <td><input className="form-control form-td" type="text" defaultValue={item["name_dish"]}  onBlur={(j) => this.updateItemBlur("name_dish",item["id"],j,item["name_dish"])}></input></td>
                  <td><input className="form-control form-td" type="text" defaultValue={item["number_recipe"]}  onBlur={(j) => this.updateItemBlur("number_recipe",item["id"],j,item["placeofwork"])}></input></td>
                  <td><button onClick={() => {this.deleteItemClick(item["id"])}} type="button"className="btn btn-outline-danger">×</button></td>
              </tr>
            )
          })
          this.setState({dishes: dish})
        }
      })
    })
  }
  componentDidMount() {
    this.getDish()
  }
  updateItemBlur(title,val,field,text){
    const textstr = text+''
    if(textstr!==field.target.value){
      fetch(this.state.url+"/dish/"+val,{
        method: "PUT",
        body: JSON.stringify([{title:title},{value:field.target.value}])
        }).then(function(res){
          return res; })
        .then((res) => {
          this.getDish()
      })
    }
    else {

    }
  }
  deleteItemClick(val){
    console.log(val)
    fetch(this.state.url+"/dish/del/"+val,{
      method: "PUT",
      }).then(function(res){
        return res; })
      .then((res) => {
        this.getDish()
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
    if(r === "name_dish")
    {
      const newData = {...this.state.data, name_dish: event}
      this.setState({data: newData})
    }
    else if(r === "number_recipe"){
      const newData = {...this.state.data, number_recipe: event}
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
        <th><button onClick={this.sendDishClick} className="addbutton btn btn-outline-success my-2 my-sm-0" type="submit">+</button></th>
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
  sendDishClick() {
    console.log('отправляю')
    console.log("отпр",this.state.data)
    fetch(this.state.url+"/dish",{
    method: "POST",
    body:JSON.stringify(this.state.data)
    }).then((res)=> {
    this.getDish()
    console.log(res.headers.get('Content-Type'))
    console.log(res.headers.get('Date'))
    console.log(res.status)
    console.log(res.statusText)});

  }
  incrementCount(){
    var  newData = {...this.state.page, count: this.state.page.count + 1}
    this.setState(prevState => ({
      page: newData
    }),() => {
      console.log(this.state.page.count)
      this.getDish()
    })
  }
  decrementCount(){
    var  newData = {...this.state.page, count: this.state.page.count - 1}
    this.setState(prevState => ({
      page: newData
    }),() => {
      console.log(this.state.page.count)
      this.getDish()
    })
  }
  componentWillMount(){
    this.current_user()
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const isWorker = this.state.role.worker
    return (
      <div>
        {isLoggedIn ? (
          <div>
           {isWorker ? (
       <div>

       </div>
        ) : (
        <div className="addbutton">
          <button onClick={this.addButtonClick} className="addbutton btn btn-outline-success my-2 my-sm-0" type="submit">Добавить</button>
        </div>)}
    <div className="row">

    <table className="table">
      <thead>
      {this.state.isToggleOn ? this.state.addInputs : null}
        <tr>
          <th>ID</th>
          <th>Название блюда</th>
          <th>Номер рецепта</th>
        </tr>
      </thead>
      <tbody>
        {this.state.dishes}
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item"><Link className="page-link" onClick={this.decrementCount} to={`dishes?page=${this.state.page.count-1}`}>Назад</Link></li>
        <li className="page-item"> <button className="page-link">{this.state.page.count}</button></li>
        <li className="page-item"><Link className="page-link" onClick={this.incrementCount} to={`dishes?page=${this.state.page.count+1}`}>Вперед</Link></li>
      </ul>
    </nav>
    </div></div>
        ) : (
          <div></div>
        )}

      </div>
    )
  }
}

export default DishesScreen;