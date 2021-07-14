import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import configStore from './store/configStore'
import './index.css'

const store = configStore()

store.subscribe(()=>{
  console.log('store update', store.getState())
})

// console.log(store.getState())

ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>,
document.getElementById('root')
);