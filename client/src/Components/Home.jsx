import React,{useEffect,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getCountry} from "../redux/actions"
import style from "./style/Home.module.css"
import Card from './Card';
import Nav from './Nav';
//-----------------------------------------------------------------------------------------------------------------------------------------
export default function Home() {
let countriesArr = useSelector((state) => state.stateCountry)//este hoock me permite consumir el estado global de mi store
const dispatch = useDispatch();// este hoock me permite dispachar la acciones creadoras en la store
const [current, setCurrent]= useState(1);
let itemsPerPage = 10;

//----------------------------------------------------------------------------------------------------------------------------------------
const pages = [];// creo un nuevo arreglo para el numero de paginados
for(let i = 1 ; i <= Math.ceil(countriesArr.length/itemsPerPage);i++){// dentro de mi arreglo pusheo los numeros del paginado, se puheara hasta que el indice llegue al limite de la condicion
  pages.push(i)
}

const handleClick = (event)=>{ //function que va a colocar en mi estado local current el id del elemento <li> ejemplo event.target.id = |1| =>  lo saca de => |<li key=1 id=1>1</li>|
      setCurrent(Number(event.target.id))
}

const renderPageNumbers = pages?.map(e=>{//mapeo mi arreglo pages y por cada elemento coloco una etiqueta li que va tener atributos id y key y dentro de la etiqueta li va tener los elemntos ej: (<li>1<li/>,<li>2<li/> asi hasta el 27), tambien va a tener un evento onClik por cada <li>
  if(typeof countriesArr === "string"){
    return null
  }
  return (
    <li className={e === current ? style.active : style.li} key={e} id={e} onClick={handleClick}>
      {e}
    </li>
  )
})
//1 2 3
const indexOfLastItem = current * itemsPerPage// 10 en esta variable voy a tener la multiplicacion de lo que tenga en mi estado current y itemsperPage, ejemplo ((current=1)*(itemsPerPage= 9))= 9 la variable indexOfLastItem va a ser igual a |9| 
const indexOfFirstItems =  indexOfLastItem - itemsPerPage // esta variable va a tener la restas de la variable creada anteriormente - mi estado itemsPerPage, ejemplo((indexOfLastItems=9)-(itemsPerPage=9)) = 0 => la variable indexOfFirstItems = 0
let currentItems = countriesArr.slice(indexOfFirstItems, indexOfLastItem)//en esta variable solo me quedare con algunos elementos de ,¡mi estado global de la store, con el metodo slice puedo seleccionar una porcion de los elementos del arreglo

useEffect(()=>{//cuando se renderize este componente se ejecutara lo que tenga adentro en este caso es el dispatch que mandara a la store 
  if(typeof countriesArr !== "string"){
    dispatch(getCountry());
  }
},[]);

const renderCurrentItems = () =>{//creo una funcion que me retorara una lista donde se hara un map de currentItems y por cada porcion de elementos renderizare mi componente car pasandole propiedades
  if(typeof countriesArr === "string"){      
            return <h1 className={style.h1}>{countriesArr}, buscar otro Pais</h1>
  }
    return (
      <ul className={style.containerCountries} >
          {currentItems?.map((e)=>{
             return <li className={style.renderCard}  key={e.id}> <Card id={e.id} img={e.flag_image} name={e.name} continent={e.continent}/></li>
          
        })}
      </ul>
    )
  
}

const nextPage = ()=>{//funcion para siguiente pagina
  if(current < Math.ceil(countriesArr.length/itemsPerPage)){
    setCurrent(current + 1)
}
}
const backPage = ()=>{//funcion para volver atras de la paginacion
  if(current < Math.ceil(countriesArr.length/itemsPerPage + 1 )&& current !== 1){
    setCurrent(current - 1)
}
}
const searchResetCurrent= ()=>{
  setCurrent(1);
}


//------------------------------------------------------------------------------------------------------------------------------------------
  return (
    
    <div>
       <Nav  resetCurreEstateFather ={searchResetCurrent}/>
     <main>
      <ul className={style.pageNumbers}> 
       {countriesArr.length === 0 || typeof countriesArr === "string"? null : <button className={style.btn} onClick={backPage}>{"<"}</button>} 
          {renderPageNumbers}{/*renderizo los numeros del paginado*/}
       {countriesArr.length === 0 || typeof countriesArr === "string"? null : <button className={style.btn} onClick={nextPage}>{">"}</button>}
      </ul>{/*renderizo la funcion que se creo que devolvera las cards*/}

        {countriesArr.length === 0 ? <div className={style.spinner}>
             <span>L</span>
             <span>O</span>
             <span>A</span>
             <span>D</span>
             <span>I</span>
             <span>N</span>
             <span>G</span></div>:renderCurrentItems()} 
                 
      <ul className={style.pageNumbers}> 
       {countriesArr.length === 0 || typeof countriesArr === "string"? null : <button className={style.btn} onClick={backPage}>{"<"}</button>} 
          {renderPageNumbers}{/*renderizo los numeros del paginado*/}
       {countriesArr.length === 0 || typeof countriesArr === "string"? null : <button className={style.btn} onClick={nextPage}>{">"}</button>}
      </ul>{/*renderizo la funcion que se creo que devolvera las cards*/}
      </main>
    </div>
  )
}
