import { useLocation, useNavigate } from 'react-router-dom'

import ResultGrid from '../components/ResultGrid';
import { useDispatch, useSelector } from 'react-redux';
import { addCollection, addedTost } from '../redux/features/collectionSlice';

const FullView = () => {

  const dispatch = useDispatch()

  const addToCollection = (item) => {
    dispatch(addCollection(item))
    dispatch(addedTost())
    
  }

  const { state } = useLocation()
  const navigate = useNavigate();
  const { query } = useSelector((store) => store.Search);
  
  const item = state;

  return (
    <div className='flex flex-col lg:flex-row justify-between'>


      <div className='relative w-full lg:hidden rounded-2xl overflow-hidden bg-[#0f0f0f]'>

        {/* full screen media */}
        <div className='h-[85vh] w-full'>
          {item.type.toLowerCase() === "photo" ? (
            <img className='h-full object-cover object-center w-full' src={item.src} />
          ) : null}
          {item.type.toLowerCase() === "video" ? (
            <video className='h-full w-full object-cover object-center' src={item.src} autoPlay loop muted />
          ) : null}
        </div>

        {/* back button overlay */}
        <div
          onClick={() => navigate(-1)}
          className='absolute top-4 left-4 h-11 w-11 bg-[#242424]/80 backdrop-blur-sm rounded-2xl flex hover:scale-105 cursor-pointer items-center justify-center'>
          <img src="back.svg" alt="" />
        </div>

        {/* bottom overlay */}
        <div className='absolute bottom-0 left-0 right-0 px-2 py-3 bg-linear-to-t from-black/90 to-transparent'>
          <div className='flex justify-between items-end gap-4'>
            <div className='flex-1'>
              <p className='text-[20px] font-semibold text-white drop-shadow-lg wrap-break-word'>{item.title}</p>
            </div>
            <div className='flex gap-2.5'>

              
            </div>
          </div>

          <div className='flex justify-between  mt-4'>

            
            
            <a
              target='_blank'
              rel='noreferrer'
              href={item.url}
              className='h-11 px-6 flex items-center justify-center cursor-pointer text-white font-medium rounded-2xl bg-[#242424]/80 backdrop-blur-sm hover:scale-105'>
              Visit Site
            </a>
            <div
              onClick={()=>{
                addToCollection(item)
              }}
              className='h-11 px-6 flex items-center justify-center text-black/80 font-medium rounded-2xl cursor-pointer bg-[#99FF67] hover:scale-105'>
                Save
            </div>

            <div className='h-11 w-11 bg-[#242424]/80 backdrop-blur-sm rounded-2xl flex items-center justify-center cursor-pointer hover:scale-105'>
              <img src="Download.svg" alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* mobile ResultGrid */}
      <div className='block lg:hidden w-full overflow-y-auto no-scrollbar mt-4'>
        <ResultGrid />
      </div>

      {/* ── DESKTOP VIEW (hidden on mobile) ── */}
      <div className='hidden lg:block h-170 w-194 border border-white/52 rounded-2xl px-10 py-10 overflow-hidden bg-[#0f0f0f]'>

        <div className='flex justify-between'>
          <div
            onClick={() => navigate(-1)}
            className='h-13 w-13 bg-[#242424] rounded-2xl flex hover:scale-105 cursor-pointer items-center justify-center'>
            <img src="back.svg" alt="" />
          </div>
          <div 
          onClick={()=>{
            addToCollection(item)
          }}
          className='h-13 w-34 flex items-center justify-center text-black/80 font-medium rounded-2xl hover:scale-105 cursor-pointer bg-[#99FF67]'>
            <p>Save</p>
          </div>
        </div>

        <div className='h-95 w-full mt-8'>
          {item.type.toLowerCase() === "photo" ? (
            <img className='h-full object-cover object-center w-full rounded-2xl' src={item.src} />
          ) : null}
          {item.type.toLowerCase() === "video" ? (
            <video className='h-full w-full object-cover object-center rounded-2xl' src={item.src} controls autoPlay loop muted />
          ) : null}
        </div>

        <div className='flex justify-between mt-8'>
          <div className='w-80'>
            <p className='text-[24px] font-light text-white/80 wrap-break-word'>{item.title}</p>
          </div>
          <div className='flex gap-5'>
            <div className='flex gap-2.5'>
              <div className='h-13 w-13 bg-[#242424] transition-transform duration-100 hover:scale-105 hover:border border-[#99FF67] rounded-2xl flex items-center justify-center cursor-pointer'>
                <img src="Download.svg" alt="" />
              </div>
              
            </div>
            
            <a 
              target='_blank'
              rel='noreferrer'
              href={item.url}
              className='h-13 w-34 flex items-center justify-center cursor-pointer text-white font-medium rounded-2xl bg-[#242424] hover:scale-105'>
              <p>Visit Site</p>
            </a>
          </div>
        </div>

      </div>

      {/* desktop ResultGrid */}
      <div className='hidden lg:block w-[50%] overflow-y-auto no-scrollbar h-174'>
        <ResultGrid />
      </div>

    </div>
  )
}

export default FullView