import React,{useState, useEffect} from 'react';
import style from "./style/Activity.module.css";
import {useSelector} from "react-redux";
import { postActivity} from '../redux/actions';
import { useHistory,Prompt} from 'react-router-dom';


const validate = (activity)=>{// function que validara si mi estado local del componente continene una propiedad con un valor en caso de no contener se creara con una propiedad para luego procede a retornar un objecto
    let error = {};
    if(!activity.name){
        error.name= "El nombre de la actividad es requerida";    
    }
    if(activity.dificulty== 0){
        error.dificulty= "la dificutad sobre la actividad es requerida"
    }
    
    
    if(activity.duration == 0){
        error.duration= "la duracion de la actividad es requerida"
    }
    if(activity.duration < 0) {
        error.duration = "la duracion de dias tiene que ser un numero mayor a 0"
    }
    if(!activity.temporada){
        error.temporada= "la temporada es requerida"
    }
    if(!activity.pais.length){
        error.pais= "este campo se tiene que completar con al menos 1 pais"
    }

    return error
}

export default function Activity() {
const history = useHistory()
const countriesArr = useSelector((state) => state.filter)//consumire el estado globlal de mi store  
const [activity, setActivity] = useState({// creare un estado con una propiedad para cada unos de mis inputs
        name:"",
        dificulty:0,
        duration: 0,
        temporada:"",
        pais:[]
})
const [errors, setErrors] = useState({//creare un estado para el las advertencias al ususuario
    name:"el nombre de la actividad es requirida",
    dificulty:"la dificutad sobre la actividad es requerida",
    duration:"la duracion de la actividad es requerida",
    temporada:"la temporada es requerida",
    pais:"este campo se tiene que completar con al menos 1 pais"
})


const addStateData = (e)=>{//esta funcion es para el evento
    setActivity((prevData)=>{//llamo al metodo para poder modificar mi estado

        return{
            ...prevData,//copio mi estado
            [e.target.name]: typeof prevData[e.target.name] === "string" ? e.target.value : Number(e.target.value)//modifico un propiedad de mi estado, esto le correspondera a cada unos de los inputs excpto para la propiedad pais de mi estado local
            
        }
    })
    setErrors(validate({...activity,[e.target.name]: e.target.value,}))//modifico el estado local errors pasandole como parametro la funcion validate que retornara un objeto
}

const addPaisArr=(e)=>{//esta funcion sirve para el agregado de pais en un arreglo
    
let interruptor = true;//creo una variable en true
let i = 0;//un indice en 0
while(i <= activity.pais.length){//aplico un while que iterara en mi arreglo pais
    if(e.target.value === activity.pais[i] ){//si el valor del elemento que ejecuto la funcion es igual al elemento que tengo en el arreglo pais entrara a la funcion y cambiara mi variable declarada anteriromente en false
        interruptor= false
    }
    i++
}

if(interruptor){//si la variable interruptor es true entrara en esta condicion

    setActivity(prevData=>{// aplicare el metodo para modificar un estado
        return{...prevData,//prevData hace referencia a mi estado, es decir copio mi estado anterior
            pais: [...prevData.pais,e.target.value]//modifico la propiedad pais, copio lo que tiene dentro la propiedad para no perder los elementos anteriores y le coloco un valor nuevo
        }
    })
    setErrors(validate({...activity,pais: e.target.value,}))//aplico el setErrors como se hizo el paso de arriba
}
}

const filterStateActivity= (e)=>{//esta funcion es para eliminar paises de la propiedad pais de mi estado local activity
    e.preventDefault()//prevengo por defecto lo que haga el evento
    let nameCountry = e.target.value;//guardo en una variable el valor del elemnto que esta invocando la funcion
    const arrNewPais = activity.pais.filter(e=> e!== nameCountry)//entro al arreglo pais de mi estado local y filtro los elementos que sean distintos a la variable nameCountry
    setActivity({...activity,pais: arrNewPais})//uso el metodo para modificar le estado, hago una copia del estado y modifico la propiedad pais pasndole el valor del arreglo filtrado arriba
}

const sendActivity = (e)=>{//esta funcion sera para caragar en mi base de datos los datos que tengo en mi estado local
e.preventDefault();
postActivity(activity)//ejecuto la funcion pasandole como parametro mi nestado local esta funcion mandara los datos a mi base de datos
setActivity({...Activity,//restablesco mi estado en 0 para que mis inputs no tengan valor escrito
    name:"",
    dificulty:0,
    duration:0,
    temporada:"",
    pais:[]
});
setErrors({
    name:"el nombre de la actividad es requirida",
    dificulty:"la dificutad sobre la actividad es requerida",
    duration:"la duracion de la actividad es requerida",
    temporada:"la temporada es requerida",
    pais:"este campo se tiene que completar con al menos 1 pais"
})
return alert("datos enviados correctamente");
}

useEffect(()=>{//esta funcion estara atentos a los cambios de mi propiedad del estado local activity
        setErrors(validate({...activity,pais:activity.pais}))
},[activity.pais])


  return (

<div>
    <button onClick={()=>history.push("/home")}>Home</button>
    <Prompt message="Are you sure you want to leave?"/>

    <form onSubmit={sendActivity} className={style.containerPrinci}>
        
{/*--------------------------------------input para cargar el nombre de la actividad------------------------------------------------------------------------------------------------------*/}        

        <h2>Load Activities</h2>
        <input autoComplete="off" type="text" placeholder='Activity Name' name='name'value={activity.name} onChange={addStateData}/>
        {(<p className={errors.name ?style.denger: style.noDenger}>El nombre de la actividad es requerida</p>)}
{/*---------------------------------------input para cargar la dificultad-----------------------------------------------------------------------------------------------------*/}        
        <h3>Difficulty: {activity.dificulty}</h3>
        <input  type="range" name="dificulty" min="0" max="5" id="selectRangue" value={activity.dificulty} onChange={addStateData} />
        {(<p className={errors.dificulty?style.denger: style.noDenger}>la dificutad sobre la actividad es requerida</p>)}
{/*---------------------------------------input para seleccionar las estaciones del año-----------------------------------------------------------------------------------------------------*/}        

        <h3>seasons of the year</h3>
         <div className={style.containerCheck}>
                <input id="summer" type="radio" name="temporada" value="summer" onChange={addStateData}/>
                <label htmlFor="summer">summer</label>

                <input id="fall" type="radio" name="temporada" value="fall" onChange={addStateData}/>
                <label htmlFor="fall">fall</label>

        
                 <input id="invierno" type="radio" name="temporada" value="winter" onChange={addStateData}/>
                <label htmlFor="winter">winter</label>

                 <input id="spring" type="radio" name="temporada" value="spring" onChange={addStateData}/>
                <label htmlFor="primavera">spring</label>
           </div>
                {(<p className={errors.temporada ?style.denger : style.noDenger}>la temporada es requerida</p>)}

{/*---------------------------------------input para seleccionar la cantidad de dias-----------------------------------------------------------------------------------------------------*/}        
           <div className={style.duration}>
                <input className={style.inputDuration} type="number" name="duration"  min="0" max="100"  onChange={addStateData}/>
                <label htmlFor="day"> Duration (days)</label>
           </div>
           {(<p className={errors.duration ? style.denger: style.noDenger}>{errors.duration}</p>)}

{/*---------------------------------------input para seleccionar el pais----------------------------------------------------------------------------------------------------------------*/}        

        <h2>Countrys</h2>
        <div className={style.container}> 
            
                <div className={style.select_box}>
                   <select onChange={addPaisArr}>
                        <option value="" disabled>-Select-</option>
                        {countriesArr?.map(e=><option key={e.id} value={e.name} >{e.name}</option>)}
                   </select>
                   {errors.pais && (<p className={style.denger}>{errors.pais}</p>)}
                </div>
           
        </div>

        <div className={style.containerUl}>
            <ul className={style.ul}>
                {activity.pais?.map((e,i)=><li style={{listStyle: "none", margin:"0.5rem"}} key={i}>{e} <button value={e} className={style.btnX} onClick={filterStateActivity}>X</button></li>)}
            </ul>
        </div>      
        
{/*---------------------------------------boton para enviar los datos cargados en mi base de datos----------------------------------------------------------------------------------------------------------------*/}        
    
        <button disabled={Object.keys(errors).length > 0 } className={style.btn} onClick={sendActivity}>{Object.keys(errors).length === 0?"Load Activity":"Blocked"}</button>
        
        
    </form>
    
        <img className={style.img}src='https://upload.wikimedia.org/wikipedia/commons/9/96/Mundo_hecho_de_Banderas.gif'></img>
</div>
  )
}
