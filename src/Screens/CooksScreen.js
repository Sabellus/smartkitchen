import React, { Component } from 'react';
import veprev from './veprev.jpg';
class CooksScreen extends Component {
  state = {}
  toggleSwitch = (_e) => {    
      console.log('Привет')    
  }
  render() 
  
  { 
    console.log(window.location.origin)
    return (             
      <div>Поворы
        <div className="row">
          <div className="col-sm-2 col-md-2 col-lg-2 col-xs-12 mb-2">
            <img src="https://avatars0.githubusercontent.com/u/24656120?s=460&v=4" alt="..." style={{maxWidth: "8rem"}}></img>
          </div>
          <div className="col-sm-9 col-md-9 col-lg-9 col-xs-12 mb-3">
            <h5 class="card-title">Вепрев Савелий Вячеславович</h5>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">@</span>
              </div>
              <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"></input>
            </div>
          </div>
          <div className="col-sm-2 col-md-2 col-lg-2 col-xs-12 mb-2">
            <img src="https://avatars0.githubusercontent.com/u/24656120?s=460&v=4" alt="..." style={{maxWidth: "8rem"}}></img>
          </div>
          <div className="col-sm-9 col-md-9 col-lg-9 col-xs-12 mb-3">
            <h5 class="card-title">Вепрев Савелий Вячеславович</h5>
          </div>
        </div>
      </div>
    )
  }
}
 
export default CooksScreen;