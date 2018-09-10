import React, { Component } from 'react';

class InProgressScreen extends Component {
  constructor() {
    super();
    this.state = {
      manufactures: [],
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
  componentWillMount(){
    this.current_user()
  }
  componentDidMount() {
    fetch("http://localhost:5000/manufacture").then(result => {
      return result.json()
    }).then(data => {
      let manufacture = data.map ((item,i) => {
        return (
          <tr key={i}>
              <td>{item["id"]}</td>
              <td>{item["name_dish"]}</td>
              <td>{item["fullname"]}</td>
              <td>{item["productname"]}</td>
              <td>{item["spending_product_count"]}</td>
          </tr>
        )
      })
      this.setState({manufactures: manufacture})
    })
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div>Изготовление
        {isLoggedIn ? (
              <div>
            <div className="row">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Блюдо</th>
                    <th>Повар</th>
                    <th>Продукт</th>
                    <th>Количество потраченного продукта</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.manufactures}
                </tbody>
              </table>
              </div></div>
            ) : (
              <div></div>
            )}

      </div>
    )
  }
}

export default InProgressScreen;
