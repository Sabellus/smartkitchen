import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeScreen from './HomeScreen';
import InProgressScreen from './InProgressScreen';
import ProductsScreen from './ProductsScreen';
import DishesScreen from './DishesScreen';
import CooksScreen from './CooksScreen';

class ContentScreen extends Component {
  render() {
    return (
      <main style={{marginTop:"60px"}}>
        <Switch>
          <Route exact path='/' component={HomeScreen}/>
          <Route path='/inprogress' component={InProgressScreen}/>
          <Route path='/cooks' component={CooksScreen}/>
          <Route path='/dishes' component={DishesScreen}/>
          <Route path='/products' component={ProductsScreen}/>
          {/* <Route path='/schedule' component={Schedule}/> */}
        </Switch>        
    </main>
    );
  }
}

export default ContentScreen;
