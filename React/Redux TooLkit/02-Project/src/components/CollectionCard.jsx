import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { removeCollection, RemoveTost } from "../redux/features/collectionSlice";

const CollectionCard = ({item}) => {

    const dispatch = useDispatch()

    const removeItem = () => {
        dispatch(removeCollection(item.id))
        dispatch(RemoveTost())
    }



    const navigate = useNavigate();
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
            {item.type =="video" ? (<video className='h-45 w-94 object-cover object-center rounded-xl' src={item.src}  autoPlay loop muted ></video>) : "" }
        </div>

        <div className='flex justify-between items-start pt-4'>
            <div  >
                <p className='w-56 capitalize text-white/80'>
                    {item.title}
                </p>
            </div>

            <div 
            onClick={()=>{
            removeItem(item)
            
            }}
            className='h-10 w-28 flex items-center justify-center text-black/80 font-medium rounded-xl hover:scale-105 cursor-pointer bg-[#ff6767]'>
                <p>Remove</p>
            </div>

        </div>
      
    </div>
  )
}

export default CollectionCard
