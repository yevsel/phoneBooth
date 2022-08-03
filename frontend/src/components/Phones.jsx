
// import { useEffect } from 'react';
import EachPhone from './EachPhone';
const Phones = ({cart,loading}) => {

    // const cart = useSelector(state => state.cartReducer)
    

    return ( 
        
        <div className="w-3/5 md:w-4/5 border-gray-200 pb-5  mb-16 shadow-sm md:justify-between flex flex-wrap ">
            {cart.map((item,index)=>{
                return  <EachPhone key={index} item={item}/>
            })}
            {/* {cart&&<button style={{position:"absolute",bottom:"-100px"}}  className='self-center justify-self-end bg-blue-500 p-2 rounded-md text-sm font-bold text-white'>Load More</button>} */}
        </div>
     );
}
 
export default Phones;