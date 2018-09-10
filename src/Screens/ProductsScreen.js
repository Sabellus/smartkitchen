import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class ProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url:'http://localhost:5000',
      products: [],
      isToggleOn: false,
      addInputs: [],
      data: {
        productname:'1',
        price:'2',
        amount:'3'
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
    this.sendProductClick = this.sendProductClick.bind(this)
    this.deleteItemClick = this.deleteItemClick.bind(this)
    this.updateItemBlur = this.updateItemBlur.bind(this)
    this.decrementCount = this.decrementCount.bind(this)
    this.incrementCount = this.incrementCount.bind(this)
    this.removeIndex = this.removeIndex.bind(this)
    this.createIndex = this.createIndex.bind(this)

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
  getProduct(){
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
    fetch(this.state.url+`/product?page=${this.state.page.count}`,{
      method: "GET",
    }).then(result => {
        return result.json()
      }).then(data => {
        this.setState({products:[]})
        const isWorker = this.state.role.worker;
        const isEditor = this.state.role.editor;
        console.log("РОЛЬ", isWorker, isEditor)
        if (isWorker && !isEditor){
          let product = data.map ((item,i) => {
            return (
              <tr key={i}>
                  <td><input className="form-control id_input" width="10" disabled type="text" defaultValue={item["id"]}  onChange={(j) => this.changeText()}></input></td>
                  <td><input className="form-control form-td" type="text" disabled defaultValue={item["productname"]}  onBlur={(j) => this.updateItemBlur("productname",item["id"],j,item["productname"])}></input></td>
                  <td><input className="form-control form-td" type="text" disabled defaultValue={item["price"]}  onBlur={(j) => this.updateItemBlur("price",item["id"],j,item["price"])}></input></td>
                  <td><input className="form-control form-td" type="text" disabled defaultValue={item["amount"]}  onBlur={(j) => this.updateItemBlur("amount",item["id"],j,item["amount"])}></input></td>
              </tr>
            )
          })
          this.setState({products: product})
        }
        else if (!isWorker && isEditor) {
          let product = data.map ((item,i) => {
            return (
              <tr key={i}>
                  <td><input className="form-control id_input" width="10" disabled type="text" defaultValue={item["id"]}  onChange={(j) => this.changeText()}></input></td>
                  <td><input className="form-control form-td" type="text" defaultValue={item["productname"]}  onBlur={(j) => this.updateItemBlur("productname",item["id"],j,item["productname"])}></input></td>
                  <td><input className="form-control form-td" type="text" defaultValue={item["price"]}  onBlur={(j) => this.updateItemBlur("price",item["id"],j,item["price"])}></input></td>
                  <td><input className="form-control form-td" type="text" defaultValue={item["amount"]}  onBlur={(j) => this.updateItemBlur("amount",item["id"],j,item["amount"])}></input></td>

              </tr>
            )
          })
          this.setState({products: product})
        }
        else {
          let product = data.map ((item,i) => {
            return (
              <tr key={i}>
                  <td><input className="form-control id_input" width="10" disabled type="text" defaultValue={item["id"]}  onChange={(j) => this.changeText()}></input></td>
                  <td><input className="form-control form-td" type="text" defaultValue={item["productname"]}  onBlur={(j) => this.updateItemBlur("productname",item["id"],j,item["productname"])}></input></td>
                  <td><input className="form-control form-td" type="text" defaultValue={item["price"]}  onBlur={(j) => this.updateItemBlur("price",item["id"],j,item["price"])}></input></td>
                  <td><input className="form-control form-td" type="text" defaultValue={item["amount"]}  onBlur={(j) => this.updateItemBlur("amount",item["id"],j,item["amount"])}></input></td>
                  <td><button onClick={() => {this.deleteItemClick(item["id"])}} type="button"className="btn btn-outline-danger">×</button></td>
              </tr>
            )
          })
          this.setState({products: product})
        }
      })
    })
  }
  componentDidMount() {
    this.getProduct()
    console.log(localStorage.getItem('session'))
  }
  updateItemBlur(title,val,field,text){
    const textstr = text+''
    if(textstr!==field.target.value){
      fetch(this.state.url+"/product/"+val,{
        method: "PUT",
        body: JSON.stringify([{title:title},{value:field.target.value}])
        }).then(function(res){
          return res; })
        .then((res) => {
          this.getProduct()
      })
    }
    else {

    }
  }
  deleteItemClick(val){
    console.log(val)
    fetch(this.state.url+"/product/del/"+val,{
      method: "PUT",
      }).then(function(res){
        return res; })
      .then((res) => {
        this.getProduct()
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
    if(r === "productname")
    {
      const newData = {...this.state.data, productname: event}
      this.setState({data: newData})
    }
    else if(r === "price"){
      const newData = {...this.state.data, price: event}
      this.setState({data: newData})
    }
    else if(r === "amount"){
      const newData = {...this.state.data, amount: event}
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
        <th><button onClick={this.sendProductClick} className="addbutton btn btn-outline-success my-2 my-sm-0" type="submit">+</button></th>
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
  sendProductClick() {
    console.log('отправляю')
    console.log("отпр",this.state.data)
    fetch(this.state.url+"/product",{
    method: "POST",
    body:JSON.stringify(this.state.data)
    }).then((res)=> {
    this.getProduct()
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
      this.getProduct()
    })
  }
  decrementCount(){
    var  newData = {...this.state.page, count: this.state.page.count - 1}
    this.setState(prevState => ({
      page: newData
    }),() => {
      console.log(this.state.page.count)
      this.getProduct()
    })
  }
  componentWillMount(){
    this.current_user()
  }
  createIndex(){
    fetch(this.state.url+`/createindex`,{
      method: "GET",
    }).then(result => {
        return result
      }).then((data) => {
        alert(data['ok'])
      })
  }
  removeIndex(){
    fetch(this.state.url+`/dropindex`,{
      method: "GET",
    }).then(result => {
        return result
      }).then((data) => {
       alert(data['ok'])
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
          <th>Название продукта</th>
          <th>Цена</th>
          <th>Количество</th>
        </tr>
      </thead>
      <tbody>
        {this.state.products}
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item"><Link className="page-link" onClick={this.decrementCount} to={`products?page=${this.state.page.count-1}`}>Назад</Link></li>
        <li className="page-item"> <button className="page-link">{this.state.page.count}</button></li>
        <li className="page-item"><Link className="page-link" onClick={this.incrementCount} to={`products?page=${this.state.page.count+1}`}>Вперед</Link></li>
      </ul>
    </nav>
    <button className="page-link" onClick={this.createIndex}>Создать индекс</button>
    <button className="page-link" onClick={this.removeIndex}>Удалить индекс</button>

    </div></div>
        ) : (
          <div></div>
        )}

      </div>
    )
  }
}

export default ProductScreen;