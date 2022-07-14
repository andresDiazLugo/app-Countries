import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";//browserRouter me permite crear rutas en mi dom 
import './style/index.css';
import {Provider} from "react-redux"//Provider conecta mi app al estado global donde yo voy a poder dispachar y consultar mi estado
import {store} from "./redux/store"
import dotenv from "dotenv";
import axios from "axios";


dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001"

ReactDOM.render(
  <Router> 
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
