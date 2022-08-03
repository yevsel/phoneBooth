import Phones from "../components/Phones";
import SideMenu from "../components/SideMenu";


const Home = ({cart,categoriesList,setCart,setCategory,loading,homeLoading,lastDate,setLastDate}) => {
    return ( 
        <div>
            <div style={{position:"relative",width:"100%",height:"370px"}} className={" hero rounded-md"} >
                <div className={"py-3"}>
                    <form className="w-50 bg-gray-100 p-5 space-y-5 rounded-md" style={{position:"absolute", top:"30px",left:"30px"}}>
                        <input type="text" className="block p-2 border-2 rounded-md border-blue-100 outline-none" placeholder="Email" name="" id="" />
                        <input type="password" placeholder="Password" className="block p-2 rounded-md border-2 border-blue-100 outline-none" name="" id="" />
                        <div className="flex justify-between align-center">
                            <button className="bg-blue-500 text-white rounded-md text-sm font-bold px-3 py-2">LOGIN</button>
                            <button className="px-3 py-1 text-gray-400 text-sm font-bold">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="mt-10 flex md:space-x-10">
                {/* This is home */}
                <SideMenu categoriesList={categoriesList} setCart={setCart}/>
                {homeLoading?
                <div className="md:w-4/5 flex justify-center">
                    <div className="loader "></div>
                </div>:
                <Phones cart={cart}  loading={loading}/>}
                
            </div>
            <div style={{position:"fixed",bottom:10,right:20,opacity:0.7}} className="w-100 flex justify-end">
                <button onClick={()=>{
                    const getByDate=async()=>{
                        try{
                            const result = await fetch("http://127.0.0.1:4500/get/by_date",{
                                method:"POST",
                                headers:{"Content-Type":"application/json"},
                                body:JSON.stringify({lastDate})
                            })
                            const dataFromDB=await result.json()
                            dataFromDB.forEach((item)=>{
                                // Setting the name and id
                                let im = item.imagePreview.split("/")
                                let imageName = im.pop()
                                let phones = im.pop()
                                let vName = im.pop()
                                im.push("w_400,h_500,c_fill")
                                im.push(vName)
                                im.push(phones)
                                im.push(imageName)
                                item.imagePreview=im.join('/')
                                // console.log(item)
                              })

                            //   Set Category
                            setCategory(()=>{
                                // Removing duplicates from Category
                                let old=[...dataFromDB.map((item=>item.category))]
                                let newCategory=[]
                                for (let i=0;i<old.length;i++){
                                  if (newCategory.includes(old[i])===false){
                                    newCategory.push(old[i])
                                  }
                                }
                                return ["all brands",...newCategory]
                              })
                            // console.log(dataFromDB)
                            setCart([...dataFromDB,...cart])
                        }catch(error){

                        }
                    }
                    getByDate()
                }} className="bg-red-700 text-white rounded-full  ml-auto p-2 m-3">Load More</button>
            </div>
        </div>
     );
}
 
export default Home;