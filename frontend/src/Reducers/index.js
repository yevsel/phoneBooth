
import {combineReducers} from "redux";


const initialPhonesCart =[]

const cartReducer = (state=initialPhonesCart,action)=>{
    if (action.type==="ADD"){
        // console.log(action.payload)
        for(let i=0;i<state.length;i++){
            if(state[i]._id===action.payload._id){
                return state
            }
        }
        return[action.payload,...state]}
    else if(action.type==="INCREASE"){
        let cloned = [...state]
        let index = cloned.findIndex(item=>item._id===action.payload._id)
        let temp={}
        cloned.forEach(item=>{
            if(item._id===action.payload._id){
                temp={...item,quantity:item.quantity+1}
            }
        })
        cloned[index]=temp
        return cloned
    }
    else if(action.type==="DECREASE"){
        let cloned = [...state]
        let index = cloned.findIndex(item=>item._id===action.payload._id)
        let temp={}
        cloned.forEach(item=>{
            if(item._id===action.payload._id){
                if (item.quantity>=2){
                    temp={...item,quantity:item.quantity-1}
                }else{
                    temp={...item}
                }
            }
        })
        cloned[index]=temp
        return cloned
    }
    else if(action.type==="DELETE"){
        return state.filter(item=>item._id!==action.payload._id)
    }
    else{
        return state
    }
}


const allReducers = combineReducers({
    cartReducer
})



export default allReducers;