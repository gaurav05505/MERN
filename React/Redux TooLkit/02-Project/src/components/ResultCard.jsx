import { useDispatch } from "react-redux"
import { addCollection, addedTost } from "../redux/features/collectionSlice"
import { useNavigate } from 'react-router-dom'

const ResultCard = ({item}) => {
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const addToCollection = (item) =>{
        dispatch(addCollection(item))
        dispatch(addedTost())
    }



  return (
    <div className='
    h-73.75 w-96 rounded-2xl bg-[#181818] p-3 overflow-hidden
    transform transition-all duration-300 ease-out
    hover:scale-105
    hover:shadow-[0_0_5px_#99FF67]
    '>

        {/* image  */}
        <div
        onClick={()=> navigate("/view" , {state: item})}>
            {item.type =="Photo" ? (<img className='h-45 object-cover object-center w-94 rounded-xl' src={item.src} />) : "" }
            {item.type =="video" ? (<video className='h-45 w-94 object-cover object-center rounded-xl' src={item.src} autoPlay loop muted ></video>) : "" }
        </div>

        <div className='flex justify-between items-start pt-4'>
            <div  >
                <p className='w-64 capitalize text-white/80'>
                    {item.title}
                </p>
            </div>

            <div 
            
            className='flex gap-2.5'>
                <img 
                
                className='w-6 h-6 transition-transform duration-10 hover:scale-110 '
                src="/Download.svg" alt="" />
                <img 
                onClick={()=>{
                    addToCollection(item)
                }}
                className='w-6 h-6 transition-transform duration-10 hover:scale-110'
                src="/Save.svg" alt="" />
            </div>

        </div>
      
    </div>
  )
}

export default ResultCard
