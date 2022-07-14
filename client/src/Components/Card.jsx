import React from 'react'
import style from "./style/Card.module.css"
import {Link} from "react-router-dom"
export default function Card({id,img, name,continent}) {
  return (
    <Link style={{textDecoration: "none"}} to={`/home/detail/${id}`}>
      <div className={style.container}>
        <div>
          <h2 className={style.h}>{name}</h2>
          <img className={style.img} src={img} alt={name}/>
          <h3 className={style.h}>{continent}</h3>
        </div>
       </div>
    </Link>
  )
}
