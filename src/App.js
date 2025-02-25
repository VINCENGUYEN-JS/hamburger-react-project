import React,{Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import asyncComponent from './hoc/AsyncComponent/asyncComponent';
import * as actions from './store/actions/index';

const asyncCheckout= asyncComponent( ()=>{
  return import('./containers/Checkout/Checkout');});

  const asyncOrders= asyncComponent( ()=>{
    return import('./containers/Orders/Orders');});

class App extends Component
{ 
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render(){
    let routes  = (
      <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
      </Switch>
    );
    if(this.props.isAuthenticated){
      routes=(
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
          <Layout >
            {routes}
          </Layout>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !==null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup : ()=>dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
