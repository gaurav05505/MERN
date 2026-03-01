import {setLoading , setError , setResult } from '../redux/features/searchSlice'
import {fetchPhotos , fetchVideos} from '../api/mediaAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import ResultCard from './ResultCard'
import { useNavigate } from 'react-router-dom'


const ResultGrid = () => {

  const navigate = useNavigate();

    const dispatch = useDispatch()
    const {query , results , loading , error , activeTab } = useSelector((store) => store.Search)

    useEffect(function (){

        if(!query) return 

         

        const getData = async () => {

           try {
             let data = []
             dispatch(setLoading())
                if(activeTab == "Photos"){
                    let response = await fetchPhotos(query)
                    data = response.results.map((item)=>({
                        id:item.id, 
                        type:"Photo", 
                        title:item.alt_description, 
                        thumbnail: item.urls.small,
                        src: item.urls.full,
                        url:item.links.html
                    }))
                }

                if(activeTab == 'Videos'){
                    let response = await fetchVideos(query)
                    data = response.videos.map((item) => ({
                            id: item.id,
                            type: 'video',
                            title: item.user.name || 'video',
                            thumbnail: item.image,
                            src: item.video_files[0].link,
                            url:item.url
                        }))
                }

                dispatch(setResult(data))
           } catch (err) {
            dispatch(setResult(err.message))
           }
            
        }

        getData()

        
    } , [query, activeTab,dispatch])

    if (error) return <h1>Error</h1>
    if (loading)
    return (
      <div className="flex items-center justify-center w-full h-[60vh] text-white/60">
        <p className="text-xl">🔍 Loading... </p>
      </div>
    )

    if (!loading && results.length === 0 && query) {
    return (
      <div className="flex items-center justify-center w-full h-[60vh] text-white/60">
        <p className="text-xl">📂 No results found </p>
      </div>
    )
  }


    
  return (
    <div className='flex gap-5 flex-wrap justify-center '>
      {results.map((item , idx) =>{
        return <div 
        key={idx}
        // onClick={()=> navigate("/view" , {state: item})}
        className='cursor-pointer'
        >
            <ResultCard item={item} />
        </div>
      })}
    </div>
  )
}

export default ResultGrid
