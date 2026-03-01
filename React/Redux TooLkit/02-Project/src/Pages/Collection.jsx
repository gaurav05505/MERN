import { useSelector } from "react-redux"
import CollectionCard from "../components/CollectionCard"
import { useDispatch } from "react-redux"
import { clearCollection , ClearTost , NoTost } from "../redux/features/collectionSlice";


const Collection = () => {

  const dispatch = useDispatch()

    const clearAll = () => {

      dispatch(clearCollection())
      dispatch(ClearTost())

    }

  const collection = useSelector(state => state.Collections.items)


  return (
    <div
    className="flex gap-5 flex-wrap justify-start " 
    >
      <div className='w-full' >
        
        <h2 className='mb-10 text-[40px] font-extrabold text-white/20'>
          {collection.length > 0? "Your Collection" : "No Items Has Been Added Yet"}
        </h2>


        <div 
        onClick={()=>{
          if(collection.length > 0){
            clearAll()
          }
          else{
            dispatch(NoTost())
          }
        }}

        className='h-13 w-34 flex items-center justify-center text-black/80 font-medium rounded-xl hover:scale-105 cursor-pointer bg-[#ff9a9a]'>
          <p>Clear All</p>
        </div>
      </div>


      {collection.map((item , idx)=>{
        return <div 
        className=""
        key={idx}>
          <CollectionCard item={item} />
        </div>
      })}
    </div>
  )
}

export default Collection
