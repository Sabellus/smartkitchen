import React, { Component } from 'react';

class DishesScreen extends Component {
  state = {}
  render() { 
    return (  
      <div>Блюда        
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-3 col-xs-12">
            <div className="card mb-5" style={{ width: "16rem"}}>
              <img src="https://dodopizzaru-a.akamaihd.net/Img/Products/Pizza/ru-RU/c67e1f35-4202-4a65-9d4b-294a12689942.jpg" alt="avatar" className="img-thumbnail"></img>
              <div className="card-body">
                <h5 className="card-title">Пицца:Утка тириякки</h5>
                <div class="input-group input-group-sm mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">№ Рецепта</span>
                  </div>
                  <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"></input>
                </div>
                <a href="#"><span className="oi oi-pencil"></span></a>     
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3 col-xs-12">
            <div className="card mb-5" style={{ width: "16rem"}}>
              <img className="card-img-top" src=".../100px180/" alt="Card image cap"></img>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <span className="oi oi-pencil"></span>        
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3 col-xs-12">
            <div className="card mb-5" style={{ width: "16rem"}}>
              <img className="card-img-top" src=".../100px180/" alt="Card image cap"></img>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <span className="oi oi-pencil"></span>        
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3 col-xs-12">
            <div className="card mb-5" style={{ width: "16rem"}}>
              <img className="card-img-top" src=".../100px180/" alt="Card image cap"></img>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <span className="oi oi-pencil"></span>        
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3 col-xs-12">
            <div className="card mb-5" style={{ width: "16rem"}}>
              <img className="card-img-top" src=".../100px180/" alt="Card image cap"></img>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <span className="oi oi-pencil"></span>        
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3 col-xs-12">
            <div className="card mb-5" style={{ width: "16rem"}}>
              <img className="card-img-top" src=".../100px180/" alt="Card image cap"></img>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <span className="oi oi-pencil"></span>        
              </div>
            </div>
          </div>
         
        </div>
      </div>
    )
  }
}
 
export default DishesScreen;