import React,{useEffect} from 'react'
import {useParams,useHistory} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {getDetail} from "../redux/actions"
import style from "./style/Detail.module.css"
export default function Detail() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const stateDetail= useSelector(state=>state.stateDetail)
  const history =useHistory()

  useEffect(()=>{
    dispatch(getDetail(id))
  },[])
  return (
    <div>
      <button onClick={()=>history.push("/home")}>Home</button>
    

    <form  className={style.containerPrinci}></form>
      <div className={style.container}>
        <img className={style.img} src={stateDetail.flag_image} alt={stateDetail.name}/>
      <div className={style.containerInfo}>
        <h3><span className={style.span}>ID:</span> {stateDetail.id}</h3>
        <h3><span className={style.span}>Name:</span> {stateDetail.name}</h3>
        <h3><span className={style.span}>Capital:</span> {stateDetail.capital}</h3>
        <h3><span className={style.span}>Continent:</span> {stateDetail.continent}</h3>
        <h3><span className={style.span}>Area:</span> {stateDetail.area} KM2</h3>
        <h3><span className={style.span}>Population:</span> {stateDetail.population}</h3>  
      </div>
      <div className={style.ul}>
        <h1 className={style.h1}>Activitys</h1>
        {stateDetail.activities?.map((e,i)=>
          <ul key={i}>
            <li className={style.li}><span className={style.spanLi}>name:</span> {e.name}</li>
            <li className={style.li}><span className={style.spanLi}>dificulty:</span> {e.dificulty}</li>
            <li className={style.li}><span className={style.spanLi}>duration:</span> {e.duration}</li>
            <li className={style.li}><span className={style.spanLi}>temporada:</span> {e.temporada}</li>
          </ul>
        )}
      </div>

       

      </div>
    </div>
  )
}
