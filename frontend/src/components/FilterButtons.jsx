// import { useDispatch } from "react-redux";

const FilterButtons = ({itemName,setCart}) => {
    // const dispatch = useDispatch();
    return ( 
        <button onClick={async ()=>{
            try {
                let result;
                if(itemName==="all brands"){
                    result= await fetch(`http://127.0.0.1:4500/phones`)
                }
                else{
                    result = await fetch(`http://127.0.0.1:4500/phones/${itemName}`)
                }
                const data = await result.json()
                setCart(()=>{
                    data.forEach((item)=>{
                        let im = item.imagePreview.split("/")
                        let imageName = im.pop()
                        let phones = im.pop()
                        let vName = im.pop()
                        im.push("w_400,h_500,c_fill")
                        im.push(vName)
                        im.push(phones)
                        im.push(imageName)
                        item.imagePreview=im.join('/')
                        console.log(item)
                      })
                    return [...data].reverse()})
            } catch (error) {
                console.log(error.message)
            }
        }} className="p-1 focus:bg-red-200 w-full text-sm focus:text-black  text-gray-400 text-center hover:text-black cursor-pointer ">
            {itemName.toUpperCase()} 
        </button>
     );
}
 
export default FilterButtons;