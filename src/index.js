import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import configStore from './store/configStore'
import './index.css'
import { asyncGetAccDetails } from './actions/accountDetailsActions';
import { asyncGetProducts } from './actions/productActions';
import { asyncGetCustomers } from './actions/customerActions';
import { asyncGetBills } from './actions/billActions';

const store = configStore()

store.subscribe(()=>{
  console.log('store update', store.getState())
})

if(localStorage.hasOwnProperty('token')){
  store.dispatch(asyncGetAccDetails())
  store.dispatch(asyncGetProducts())
  store.dispatch(asyncGetCustomers())
  store.dispatch(asyncGetBills())
}


ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>,
document.getElementById('root')
);