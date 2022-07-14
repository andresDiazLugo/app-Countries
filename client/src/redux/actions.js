import axios from "axios";//importo la libreria axios paraa hacer petiocenes a un API
import {GET_COUNTRY,GET_QUERY_COUNTRY,GET_DETAIL_COUNTRY,ORDER_BY,ORDER_BY_ACTIVITY,FILTER_BY_CONTINENT} from "./Type-Actions";//importo los tipos de acciones

export function  getCountry(){
    return async function(dispatch){
        const respuesta = await axios.get(`/countries`)
        return dispatch({type:GET_COUNTRY, payload:respuesta.data})
    }
}

export function getQueryCountry(nameCountry){
    return async  function(dispatch){
        const respuesta = await axios.get(`/countries?name=${nameCountry}`)
        return dispatch({type:GET_QUERY_COUNTRY, payload: respuesta.data})
    }
}

export function getDetail(id){
    return async function(dispatch){
        const respuesta = await axios.get(`/countries/${id}`)
        return dispatch({type:GET_DETAIL_COUNTRY, payload: respuesta.data})
    }
}

export async function postActivity(objeto){
    const respuesta= await axios.post("/activity",objeto)
}


export function orderBy(payload){
    return {
        type:ORDER_BY,payload
    }
}

export function orderByActivity(payload){
    return{
        type:ORDER_BY_ACTIVITY,payload
    }
}
export function filterByContent(payload){
    return{
        type:FILTER_BY_CONTINENT,payload
    }
}