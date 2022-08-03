// import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
const EachPhone = ({item}) => {

    const navigate = useNavigate();
    const percent = ((item.oldPrice-item.newPrice)/item.oldPrice)*100
    return ( 
        <div onClick={()=>{
            navigate(`/phones/single/${item._id}`)
        }} style={{minWidth:"200px", maxWidth:"400px",width:"250px"}} className="eachPhone mt-1 mb-10 w-100 rounded-md shadow-md overflow-hidden">
            <div className="overflow-hidde phone_image">
                <img src={item.imagePreview} className="transition-transform hover:scale-110" alt="" />
                <p className="price text-gray-600 px-2 rounded-md font-bold"><span className="text-[10px]">GHS </span>{(item.newPrice).toFixed(2)}</p>
                {/* <strike className="px-2 text-[10px] rounded-md font-bold"><span className="text-[10px]">GHS </span>{(item.oldPrice).toFixed(2)}</strike> */}
                <p className="bonus text-[10px] rounded-md font-bold text-amber-500 p-1 bg-amber-100">-{(percent).toFixed(0)}%</p>
                <p className="new_release text-[12px] font-bold px-6">NEW</p>
            </div>
        </div>
     );
}
 
export default EachPhone;