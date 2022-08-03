import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
import {MdAddShoppingCart} from 'react-icons/md'
import { useDispatch } from "react-redux";
import { addToCart } from "../Actions";
import {BsBagCheckFill} from "react-icons/bs"

const SinglePhone = () => {
    const {id} = useParams();
    // const cart = useSelector(state=>state.cartReducer)
    const dispatch = useDispatch();
    const [data,setData] = useState([]);
    const [loading,setLoading]=useState(true);
    const [added,setAdded] = useState([false,"gold"])
   

    useEffect(()=>{
        const getPhone = async ()=>{
            try {
                setLoading(true)
                const result = await fetch(`http://127.0.0.1:4500/phones/single/${id}`)
                const dataFromDB = await result.json()
                
                setLoading(false)
                setData(dataFromDB)
            } catch (error) {
                console.log(error.message)
            }   
        }
        getPhone()
    },[ ])
    
    if(loading){
        return(
            <div className="w-100 flex justify-center items-center mt-10">
                <span className="loader"></span>
            </div>
        )
    }
    
    return ( 
        <div className="w-4/5 h-[450px] mx-auto mt-10 p-5  border-gray-200 space-x-5 rounded-md md:flex">
            {/* image */}
            <div className="w-1/2">
                <img src={data.imagePreview} className="rounded-md h-full shadow-lg" alt="" />
            </div>
            {/* Description */}
            <div className="w-full">
                {/* name */}
                <p className="text-lg text-gray-400 my-3">{data.name}</p>
                <p className="text-5xl text-blue-500 font-mono font-bold"><span className="text-blue-400 text-[30px] pr-2">GHS</span>{(data.newPrice).toFixed(2)}</p>
                <strike className="text-gray-400 text-md font-bold"><span>GHS </span>{data.oldPrice}</strike>
                {/* <span className="loader"></span> */}
                <div className="my-5">
                    <div className="flex items-center ">
                        <p className="w-100 rounded-md p-2 text-amber-500 mr-5 bg-amber-100">Category</p>
                        <p className="">{(data.category).toUpperCase()}</p>
                    </div>
                </div>
                {/* Description */}
                <div className="bg-gray-100 p-2 rounded-md">
                    {data.description.split("}").map((item,index)=>{
                        return( 
                        <div key={index} className="flex">
                                <div className="text-red-600 w-24 font-bold text-md">{(item.split(":")[0]).toUpperCase()}</div><span>{item.split(":")[1]}</span>
                            </div>)
                    })}
                </div>
                <button onClick={()=>{
                    // console.log(data)
                    dispatch(addToCart(data))
                    setAdded([true,"green"])
                }} style={{background:added[1]}}  className="p-2 my-5 rounded-md text-[25px] items-center flex font-bold px-10 text-white">{added[0]?<BsBagCheckFill/> :<MdAddShoppingCart/>}</button>
            </div>
        </div>
     );
}
 
export default SinglePhone;