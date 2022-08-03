

// import { useSelector } from "react-redux";
import FilterButtons from "./FilterButtons";

const SideMenu = ({categoriesList,setCart}) => {
    // const categories = useSelector(state=>state.categories)
    return ( 
        <div   className="h-100 hidden  w-2/5 md:w-1/5 md:flex flex-col space-y-10">
            <div style={{position:"sticky",top:"100px",}} className=" overflow-hidden ">
                <p className="font-bold text-xl p-2 bg-red-700 text-center text-white rounded-md">PHONE FINDER</p>
                <div style={{boxShadow:"0px 0px 3px #ccc"}} className="border-2 border-red-700 rounded-md mt-2">
                    {categoriesList.map((item,index)=>{
                        return <FilterButtons key={index} setCart={setCart} itemName={item}/>
                    })}
                </div>
            </div>
       
            
        </div>
     );
}
 
export default SideMenu;