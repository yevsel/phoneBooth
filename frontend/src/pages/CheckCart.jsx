import { useDispatch, useSelector } from "react-redux";
import {GiShoppingCart} from "react-icons/gi"
import {VscTrash} from "react-icons/vsc"
import { increase,decrease,deleteItem } from "../Actions";


const CheckCart = () => {

    const cart = useSelector(state=>state.cartReducer)
    const dispatch = useDispatch()

    const totalPrice = cart.map(item=>[item.oldPrice,item.quantity]);
    const mul=[];
    totalPrice.forEach(item=>mul.push(item[0]*item[1]))
    const total = mul.reduce((item,total)=>(item+=total),0)

    if(!cart.length){
        return(
            <div className="w-100 mt-10">
                <p className="text-center text-2xl text-gray-400 font-bold">Cart is empty</p>
                <GiShoppingCart  className="text-center text-5xl text-red-700 mx-auto"/>
            </div>
        )
    }

    return ( 
        <div className="mt-10 mx-auto p- w-2/5 ">
            <div>
                
            </div>
            {cart.map((item,index)=>{
                return (
                <div className="flex justify-between border-2 border-gray-300 rounded-md p-2 items-center my-2" key={index}>
                    <div className="flex items-center  space-x-2">
                        <VscTrash onClick={()=>dispatch(deleteItem(item))} className="font-bold text-red-700 text-lg cursor-pointer"/>
                        <img className="rounded-md" src={item.imagePreview} width="60" height="100" alt={index}/>
                        <div>
                            <p className="text-lg font-bold text-gray-600">{item.name}</p>
                            <p className="text-blue-400 text-sm">GHs {item.newPrice}</p>
                        </div>
                    </div>
                    {/* Quantity */}
                    <div className="flex items-center space-x-3">
                        <button onClick={()=>dispatch(decrease(item))} className="text-2xl text-gray-400">-</button>
                        <p className="text-2xl ">{item.quantity}</p>
                        <button onClick={()=>dispatch(increase(item))} className="text-2xl text-gray-400">+</button>
                    </div>
                </div>)
            })}
            {/* Total */}
            <div className="bg-red-100 p-2 rounded-md flex justify-between">
                <p>TOTAL</p>
                <p className="px-1 bg-white rounded-md font-bold text-lg text-green-600">GHs {(total).toFixed(2)}</p>
            </div>
            {/* Make Purchase */}
            
        </div>
     );
}
 
export default CheckCart;