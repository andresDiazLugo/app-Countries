import style from "./style/App.module.css";
import {Route,Link} from "react-router-dom";
import Home from "./Components/Home";
import Detail from "./Components/Detail";
import Activity from "./Components/Activity";
import Footer from "./Components/Footer";
function App() {
  return (
    <div>
      <Link to="/home">
        <Route exact path="/">
          <div className={style.initialContainer}>
            <h1>Welcome My APP</h1>
            <p>Click to Continue</p>
            <div className={style.loader}></div>
          </div>
        </Route>
      </Link>

      <Route exact path="/home" component={Home}/>
   
      <Route   path="/home/detail/:id" render={()=><Detail/>}/>

      <Route exact path="/home/activity" component={Activity}/>
      <Route exact path="/home" component={Footer} />
    </div>
  );
}

export default App;
