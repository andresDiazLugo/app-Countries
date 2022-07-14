import {GET_COUNTRY,GET_QUERY_COUNTRY, GET_DETAIL_COUNTRY,ORDER_BY, ORDER_BY_ACTIVITY,FILTER_BY_CONTINENT} from "./Type-Actions"

const initialState = {
    stateCountry :[],
    stateDetail:{},
    activity:[],
    filter:[],
}



export const reducer = (state = initialState,{type,payload})=>{

    switch(type){
//-------------------------------------------------------------------------------------------------------------------------------------
        case GET_COUNTRY:
            let arrActivity= []
            const filtradoForPush = payload.filter(e=>{
                
                if(Array.isArray(e.activities)){
                for(let i = 0 ; i <e.activities.length ; i++){
                    arrActivity.push(e.activities[i])
                }
                }
                return e
            })
            console.log(filtradoForPush)
            arrActivity= arrActivity.map(e=>e.name)
            const filteredArray = arrActivity.filter(function(ele , pos){
                return arrActivity.indexOf(ele) === pos;
            })
            return{...state, stateCountry: payload, filter: payload, activity:filteredArray}
//-----------------------------------------------------------------------------------------------------------------------------------------
        case GET_QUERY_COUNTRY:
            return{...state, stateCountry: payload}
//------------------------------------------------------------------------------------------------------------------------------------------
        case GET_DETAIL_COUNTRY:
            return{...state, stateDetail:payload}
//-------------------------------------------------------------------------------------------------------------------------------------------
        case ORDER_BY:
            let fi = [...state.stateCountry].sort(function (a, b) {
                
                if(payload === "ASC_A-Z" ){

                    if (a.name < b.name) {
                      return -1;
                    }    
                }
                if(payload === "DES_Z-A"){
                    if(a.name > b.name){
                        return -1;
                    }
                }
                if(payload === "ASC_Population"){
                    return a.population - b.population
                }
                if(payload === "DES_Population"){
                    return b.population - a.population
                        
                }
              })
            console.log(fi)
            return{...state, stateCountry: fi }
//------------------------------------------------------------------------------------------------------------------------------------------------
        case ORDER_BY_ACTIVITY:
            const filterActivityEspecific = state.filter.filter(e=>{
                if(Array.isArray(e.activities)){
                    let comprobation = e.activities.find(e=>e.name === payload)
                    if(comprobation){
                        e.activities = comprobation
                    }
                }
                return e.activities.name === payload
            })
            console.log(filterActivityEspecific)
            return{...state, stateCountry:filterActivityEspecific}
//-------------------------------------------------------------------------------------------------------------------------------------------------
            case FILTER_BY_CONTINENT:
                    
                return {...state,stateCountry:state.filter.filter(e=> e.continent === payload)}
//------------------------------------------------------------------------------------------------------------------------------------------------
        default:
            return state;
    }
}