import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import SearchBar from './components/SearchBar'
import ResultGrid from './components/ResultGrid'
import FullView from './Pages/FullView'
import Collection from './Pages/Collection'
import { ToastContainer} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { setQuery } from './redux/features/searchSlice'


const Home = () => {


  const dispatch = useDispatch(); 

  const {query} = useSelector((state) => state.Search)


  useEffect(()=> {
    if(query?.trim())return

    const randomq = [
      "nature",
      "cars",
      "cats",
      "technology",
      "space",
      "anime",
    ]
    const random = randomq[Math.floor(Math.random() * randomq.length)]

    dispatch(setQuery(random))

  } , [dispatch , query])

  



  return (
    <>
      
      <ResultGrid />
    </>
  )
}

const App = () => {
  return (
    <div className='h-screen w-full bg-black text-white px-2 py-2 md:px-6 md:py-4 lg:px-10 lg:py-5 overflow-y-scroll '>


      <SearchBar />
      
      <Routes>
        {/* HOME PAGE */}
        <Route path="/" element={<Home />} />

        {/* FULL VIEW PAGE */}
        <Route path="/view" element={<FullView />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>


      <ToastContainer />

    </div>
  )
}

export default App