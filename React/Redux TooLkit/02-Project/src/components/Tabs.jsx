import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../redux/features/searchSlice'
import { useNavigate } from 'react-router-dom'

const Tabs = () => {

  const tabs = ["Photos", "Videos", "Collection"]
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const activetab = useSelector((state) => state.Search.activeTab)

  const handleClick = (tab) => {
    dispatch(setActiveTab(tab))
    if (tab === "Collection") {
      navigate("/collection")
    } else {
      navigate("/")
    }
  }

  return (
    <div className='flex gap-2 sm:gap-3 lg:gap-5'>
      {tabs.map((elem, idx) => (
        <button
          key={idx}
          onClick={() => handleClick(elem)}
          className={`${activetab === elem
              ? "bg-green-400 border border-green-400 text-white"
              : "border border-white"
            } h-10 sm:h-12 lg:h-14
              px-3 sm:px-5 lg:px-8
              text-xs sm:text-sm lg:text-base
              rounded-2xl outline-none
              active:scale-90 cursor-pointer
              hover:border-green-400 hover:bg-transparent
              transition-all duration-300 ease-out
              whitespace-nowrap`}
        >
          {elem}
        </button>
      ))}
    </div>
  )
}

export default Tabs