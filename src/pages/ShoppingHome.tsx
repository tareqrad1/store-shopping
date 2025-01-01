import MiddleProducts from "../components/middleProducts/MiddleProducts"
import SideBar from "../components/sideBar/SideBar"

const ShoppingHome = () => {
  return (
    <div className="px-[6px] sm:px-[10px] sm:flex h-[100vh]">
      <div className="sm:w-[20%] md:block">
        <SideBar  />
      </div>
      <div className="sm:w-[70%] md:ml-5 mt-3 sm:mt-0">
        <MiddleProducts  />
      </div>
    </div>
  )
}

export default ShoppingHome;