import style from "./style/Nav.module.css";
import Search from './Search';
import {Link} from "react-router-dom";
import{useSelector, useDispatch} from "react-redux";
import {orderBy,orderByActivity,filterByContent} from "../redux/actions";
export default function Nav({resetCurreEstateFather}) {
  const activity = useSelector(state => state.activity);
  const countriesArr = useSelector((state) => state.filter)//este hoock me permite consumir el estado global de mi store
  
  const dispatch= useDispatch();

  //mapeo el arreglo y me quedo con el elemento que necesito
 const countriesArrr = countriesArr.map(e=> e.continent)
 //saco los elementos repetidos  
 const filteredArray = countriesArrr.filter(function(ele , pos){
  return countriesArrr.indexOf(ele) === pos;
}) 
console.log(filteredArray)

  const order = (e)=>{
    e.preventDefault();
    dispatch(orderBy(e.target.value));
  }

  const orderActivity=(e)=>{
    e.preventDefault();
    resetCurreEstateFather();
    dispatch(orderByActivity(e.target.value));
  }

  const filterContinent=(e)=>{
    e.preventDefault();
    dispatch(filterByContent(e.target.value))
  }
//_-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <nav className={style.nav}>
      <div className={style.containerH2}>

        <select  className={style.select} onChange={order}>
          <option selected={true} disabled="disabled">Order-By-Name</option>
          <option  value="ASC_A-Z">ASC</option>
          <option  value="DES_Z-A">DES</option>
        </select>

        <select  className={style.select} onChange={order}>
          <option  selected={true} disabled="disabled">Order_By_Population</option>
          <option value="ASC_Population">ASC</option>
          <option value="DES_Population">DES</option>
        </select>

        <select className={style.select} onChange={filterContinent}>
          <option  selected={true} disabled="disabled">filter_By_Continet</option>
          {filteredArray?.map((e,i)=><option key={i}value={e}>{e}</option>)}
        </select>

        <select  className={style.select} onChange={orderActivity}>
          <option selected={true} disabled="disabled">Filter-By-Activity</option>
          {activity?.map((e,i)=><option key={i}value={e}>{e}</option>)}
        </select>
        <Link to="/home/activity"><button className={style.btn}>add Activity</button> </Link>
      </div>
        <div className={style.search}>
            
            <Search resetCurreEstateFather={resetCurreEstateFather}/>
        </div>

    </nav>
  )
}
