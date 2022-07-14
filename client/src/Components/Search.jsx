import React, {useState}from 'react';
import style from "./style/Search.module.css";
import {useDispatch} from "react-redux";
import {getQueryCountry} from "../redux/actions"


export default function Search({resetCurreEstateFather}) {
const [queri, setQueri] = useState("")
const dispatch = useDispatch()

const handleChange = (e)=>{
    setQueri(e.target.value)
}
const searchCountry = (e)=>{
    e.preventDefault()
    resetCurreEstateFather()
    dispatch(getQueryCountry(queri))
    setQueri("")
}

  return (
    <div className={style.search}>
       <form onSubmit={e=>searchCountry(e)}>
            <input autoComplete='off' className={style.input} type="text" id="search" placeholder=" search country" name='queri' value={queri} onChange={e=>handleChange(e)}/>
            <button className={style.btn}onClick={(e)=> searchCountry(e)} >Search</button>
       </form>
    </div>
  )
}
