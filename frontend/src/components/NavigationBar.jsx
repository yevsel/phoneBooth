// import Banner from '../images/creative-vector-illustration-big-sale-260nw-1364474708.webp'
import { useEffect,useLayoutEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {FiShoppingCart } from "react-icons/fi"
import {FaSignal,FaTwitter,FaFacebook,FaInstagram} from "react-icons/fa"
import {FiSearch} from "react-icons/fi"
const NavigationBar = ({nameAndID}) => {
    
    const[onlineColor,setOnlineColor]=useState([])
    const cart = useSelector(state=>state.cartReducer)
    const [dataFromDB,setDataFromDB] = useState([])
    
    const navigate = useNavigate()

    const searchInDB = async(data)=>{
        try {
            const result = await fetch("http://127.0.0.1:4500/search",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({data})
            })
            const fromDB = await result.json()
            setDataFromDB(fromDB)
        } catch (error) {
            console.log(error.message)
        }
    }

    useLayoutEffect(()=>{
        setInterval(()=>{
            navigator.onLine?setOnlineColor(["green","Good"]):setOnlineColor(["red","Bad"])
        })
    },[])
    

    return ( 
        <div style={{position:"sticky",top:"0px",zIndex:3}} className='py-5 bg-white items-center flex justify-between'>
            {/* Logo */}
            <p className='text-3xl text-red-700'>Phone Booth</p>
            {/* links */}
            <div className='hidden md:flex items-center space-x-5'>
                <Link className='links text-gray-400 transition-all hover:text-gray-900' to='/'>Home</Link>
                <Link className='links text-gray-400 transition-all hover:text-gray-900' to='/32'>Rumour Mill</Link>
                <div  style={{position:"relative"}}  className='flex items-center space-x-1 rounded-md px-2 bg-gray-200'>
                    <FiSearch/>
                    <input onChange={(event)=>{
                        // setSearch(event.target.value)
                        const search_block = document.querySelector(".search_block")
                        // Send to db
                        
                        searchInDB(event.target.value)
                        if(event.target.value.length===0){
                            search_block.classList.add("disappear")
                            search_block.classList.remove("appear")
                            // Move to the database
                        }
                        else{
                            // console.log(searchBlock.target.value)
                            search_block.classList.add("appear")
                            search_block.classList.remove("disappear")
                            
                        }
                    }}  className=' search px-2 p-1 rounded-md outline-none bg-gray-200' type="text" placeholder="Search..."/>
                    <div className='search_block disappear bg-white rounded-md border-2 border-red-300' style={{position:"absolute",top:"40px",left:"-3px",width:"100%"}}>
                        {dataFromDB.map((item,index)=>{
                            return(
                                <div className='flex space-x-5 p-2  rounded-md cursor-pointer hover:bg-gray-100 hover:text-white'
                                 onClick={(event)=>{
                                     navigate("/404")
                                     setTimeout(()=>{
                                        navigate(`/phones/single/${item._id}`)
                                    },0.1)
                                    // Make it disappear
                                    document.querySelector(".search_block").classList.add("disappear")
                                    // console.log(event.target.parentElement.parentElement.classList.add("disappear"))
                                    // event.target.parentElement
                                }}  key={item._id}>
                                    <img className='rounded-md' src={item.imagePreview} width={50} height={50} alt="" />
                                    <div>
                                        <p className='text-gray-700 font-bold'>{item.name}</p>
                                        <p className='text-blue-600 text-[14px]'>GHs {(item.newPrice).toFixed(2)}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <Link className='/phones/checkcart' to='/phones/checkcart'> <div style={{position:"relative"}}><FiShoppingCart className='text-2xl' /><div style={{position:"absolute",top:"0px",right:"-25px"}} className='bg-amber-100 text-amber-700 px-2 rounded-md'>{cart.length}</div></div> </Link>
            </div>
            <div className='flex space-x-3 items-center'>
                <FaTwitter className='text-gray-400 hover:text-blue-500 text-[20px]'/>
                <FaInstagram className='text-gray-400 hover:text-red-500 text-[20px]'/>
                <FaFacebook className='text-gray-400 hover:text-blue-400 text-[20px]'/>
                <button className='p-1 hidden md:block rounded-lg text-green-400 font-bold text-[13px] '><FaSignal className='text-lg' title={onlineColor[1]+" Internet Signal"} color={onlineColor[0]}/></button>
            </div>
        </div>
     );
}


export default NavigationBar;