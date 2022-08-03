import { useState } from "react";

const Forms = () => {

    const sendToDB = async(dataToSend)=>{
        try {
            setLoading(true)
            const result = await fetch("http://127.0.0.1:4500/phones/upload",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(dataToSend)
            })
            const returnedData=await result.json()
            console.log(returnedData.message)
            setLoading(false)
            
        } catch (error) {
            console.log(error.message)
        }
    }

    const [imagePreview,setImagePreview] = useState('');
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [oldPrice,setOldPrice] = useState(0);
    const [newPrice,setNewPrice] = useState(0);
    const [category,setCategory] = useState("");
    const [loading,setLoading]=useState(false)

    return ( 
        <div className="mt-5 p-5 flex space-x-10">
            <form className="w-1/2 ">
                <div className="flex flex-col ">
                    <label className="text-gray-400 font-bold" htmlFor="name">Name</label>
                    <input onChange={(event)=>{
                        setName(event.target.value)
                    }} type="text" className="border-2 p-2 rounded-lg mt-4 border-blue-400" id="name" placeholder="Name..." />
                </div>
                {/* image */}
                <div className="my-5">
                    <input onChange={(event)=>{
                        // Get files from the Files array
                        const imageFile = event.target.files[0]
                        const reader = new FileReader();
                        reader.readAsDataURL(imageFile);
                        // When its done converting
                        reader.onload = ()=>{
                            setImagePreview(reader.result);
                        }
                    }} type="file" />
                </div>
                {/* description */}
                <div>
                    <label className="text-gray-400 font-bold" htmlFor="description">Description</label>
                    <textarea onChange={(event)=>{
                        setDescription(event.target.value)
                    }} placeholder="Description" id="description" className="border-2 p-2 rounded-lg mt-4 border-blue-400 w-full" cols="30" rows="5"></textarea>
                </div>
                {/* Category */}
                <div>
                    <label className="text-gray-400 font-bold" htmlFor="category">Category</label>
                    <input required type="text" onChange={(event)=>{
                        setCategory(event.target.value)
                    }} className="border-2 p-2 rounded-lg mt-4 border-blue-400 w-full" name="" id="" />
                </div>
                {/*  New price */}
                <div className="my-5 flex flex-col">
                    <label className="text-gray-400 font-bold" htmlFor="price"> New Price</label>
                    <input onChange={(event)=>{
                        setNewPrice(event.target.value)
                    }} type="number" placeholder="Price" className="border-2 p-2 rounded-lg mt-4  border-blue-400" id="price" min={20} />
                </div>
                <div className="my-5 flex flex-col">
                    <label className="text-gray-400 font-bold" htmlFor="price">Old Price</label>
                    <input onChange={(event)=>{
                        setOldPrice(event.target.value)
                    }} type="number" placeholder="Price" className="border-2 p-2 rounded-lg mt-4  border-blue-400" id="price" min={20} />
                </div>
                <input type="submit" value={loading?"Loading...":"SUBMIT TO DATABASE"} className="bg-green-500 cursor-pointer hover:bg-green-400  text-white p-2 rounded-lg" onClick={(event)=>{
                    event.preventDefault()
                    let dataToSend={name,imagePreview,description,category,oldPrice,newPrice}
                    // Push to DB
                    // console.log(dataToSend)
                    sendToDB(dataToSend)
                }} />
            </form>
            <div className="w-1/3">
                <p className=" my-5 text-gray-300 text-1xl">Image Preview</p>
                <img src={imagePreview} alt="" />
            </div>
        </div>
     );
}
 
export default Forms;