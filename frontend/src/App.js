import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import NavigationBar from "./components/NavigationBar";
import Error from "./pages/Error";
import Home from "./pages/Home";
import DummyPage from "./pages/DummyPage"
import { useEffect,useState } from "react";
import SinglePhone from "./components/SinglePhone";
import CheckCart from "./pages/CheckCart";





function App() {


  const [cart,setCart]=useState([]);
  const [category,setCategory]=useState([]);
  const [loading,setLoading] = useState(false);
  const [homeLoading,setHomeLoading] = useState(false)
  const [lastDate,setLastDate]=useState(0)

    useEffect(()=>{
        const getPhones=async ()=>{
            try {
                // setLoading(true)
                setHomeLoading(true)
                const result = await fetch("http://127.0.0.1:4500/phones")
                const data = await result.json()
                setCategory(()=>{
                  // Removing duplicates from Category
                  let old=[...data.map((item=>item.category))]
                  let newCategory=[]
                  for (let i=0;i<old.length;i++){
                    if (newCategory.includes(old[i])===false){
                      newCategory.push(old[i])
                    }
                  }
                  return ["all brands",...newCategory]
                })
                setHomeLoading(false)
                // Get phone names and id
                
                // Editing the photos url
                setCart(()=>{
                  data.forEach((item)=>{
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
                  setLastDate(data[data.length-1].createdAt)
                  return [...data]

                })
                
            } catch (error) {
                console.log(error.message)
            }
        }
        getPhones()

        // Get phone name and ID
        
    },[])

 
  return (
    <Router>
      <div className="App w-4/5 md:w-5/6 mx-auto">
        <NavigationBar/>
        {/* <Hero/> */}
        <Routes>
          <Route path="/" element={<Home cart={cart} homeLoading={homeLoading} setCategory={setCategory} setLastDate={setLastDate} lastDate={lastDate} setHomeLoading={setHomeLoading} setCart={setCart} loading={loading} setLoading={setLoading} categoriesList={category}/>}/>
          <Route path="/phones/single/:id" element={<SinglePhone/>}/>
          <Route path='/phones/checkcart' element={<CheckCart/>}/> 
          <Route path="*" element={<Error/>}/>
          <Route path="/404" element={<DummyPage/>}/>
        </Routes>
      </div>

    </Router>
  );
}

export default App;
