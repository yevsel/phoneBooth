// const applyMiddleware=redux.applyMiddleware

export const increase = (item)=>{
    return{
        type:"INCREASE",
        payload:item
    }
}

export const decrease = (item)=>{
    return{
        type:"DECREASE",
        payload:item
    }
}

export const deleteItem = (item)=>{
    return{
        type:"DELETE",
        payload:item
    }
}

export const addToCart = (item)=>{
    return{
        type:"ADD",
        payload:item,
    }
}
// Filter phones
