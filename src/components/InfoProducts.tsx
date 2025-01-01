import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./sideBar/SideBar";
import { BadgeCent, LoaderPinwheel, ShoppingBasket } from "lucide-react";
import { useCart } from "../hooks/useCart";

type StateShape = {
    thumbnail: string;
    title: string;
    id: number;
    description: string;
    price: number;
    qwt: number;
}
const InfoProducts = () => {
    const {id} = useParams<{id: string}>();
    const [viewData, setViewData] = useState<StateShape | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<string>('');
    const Navigate = useNavigate();
    const { dispatch } = useCart();
    useEffect(() => {
        setIsLoading(true);
        setIsError('')
        const fetchData = async() => {
            try{
                const res = await axios.get<StateShape>(`https://dummyjson.com/product/${id}`);
                const data: StateShape = res.data;
                setViewData(data);
                setIsLoading(false)
                setIsError('')
            }catch(error: unknown) {
                if(error instanceof Error) {
                    setIsError(error.message)
                }
            }
        }
        fetchData()
    },[])
  return (
    <div className="flex px-[6px] sm:px-[10px] sm:flex h-[100vh]">
    <div className="w-[20%]">
        <SideBar />
    </div>
        <div>
            <button onClick={() => Navigate('/')} className="bg-black text-white px-7 py-2 ml-9 mt-2">Back</button>
            {isLoading && !isError && <LoaderPinwheel className="absolute left-1/2 top-1/2 animate-spin w-[30px] h-[30px]" />}
            {!isLoading && isError && <h1>{isError}</h1>}
            {!isLoading && !isError && 
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-4">
                <img className="border" src={viewData?.thumbnail} alt="" />
                <h1 className="font-extrabold">{viewData?.title}</h1>
                <p className="text-center text-[#464646eb]">{viewData?.description}</p>
                <span className="text-[#888]">${viewData?.price}</span>
                <button onClick={() => dispatch({ type: 'ADD_TO_CART', payload: viewData! })} className="text-white flex justify-between gap-2 font-normal text-sm bg-black px-9 py-2">Add To Cart <ShoppingBasket  /></button>
                <button  className="flex capitalize text-sm" onClick={() => Navigate('/cart')}> go to cart <BadgeCent className="mx-2" /></button>
            </div>}
        </div>
    </div>
  )
}

export default InfoProducts