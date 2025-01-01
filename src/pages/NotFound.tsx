import { Ban, LucideHome } from "lucide-react"
import { useNavigate } from "react-router"

const NotFound = () => {
  const Navigate = useNavigate();
  return (
    <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 ">
      <h1 className="font-[monospace] text-4xl font-semibold capitalize text-gray-950 flex items-center select-none">page not found<Ban className="w-10 h-10 ml-2" /> </h1>
      <button onClick={() => Navigate('/')} className="capitalize flex gap-x-2 px-7 py-2 text-white bg-black mt-10 absolute left-1/2 -translate-x-1/2 hover:opacity-75 select-none">home<LucideHome /> </button>
    </div>
  )
}
export default NotFound;