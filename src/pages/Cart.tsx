import { Wine, X } from "lucide-react";
import SideBar from "../components/sideBar/SideBar";
import { useCart } from "../hooks/useCart";
import { useNavigate } from 'react-router';
import { DataState } from "../context/CartContextProvider";

const Cart = () => {
    const { state, dispatch } = useCart();
    const TotalPrice = state.cart.reduce((acc, curr) => {
      acc += curr.price * curr.qwt;
      return acc;
    },0)
    const Navigate = useNavigate();
    const handleDecrease = (prod: DataState) => {
      if(prod.qwt > 1) {
        dispatch({ type: 'DECREASE_VALUE', payload: prod })
      }
    }
  return (
    <div className="px-[6px] sm:px-[10px] sm:flex">
      <div className="m:w-[20%] md:block">
        <SideBar />
      </div>
      <div className="block text-center mx-10 mt-9 md:w-[100%]">
      <div className="flex justify-between items-center">
        <button onClick={() => Navigate('/')} className="bg-black text-white px-7 py-2 ml-9 mt-1 mb-11">Back</button>
      </div>
      {state.cart.length > 0 && (
      <button onClick={() => dispatch({ type: 'CLEAR_CART' })} className="fixed right-10 top-[32px] flex gap-2 bg-black text-white px-9 py-2">Clear Cart <Wine /> </button>
      )}
          <table className="table-fixed">
          {state.cart.length > 0 && (
            <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Increase</th>
              <th>quantity</th>
              <th>Decrease</th>
              <th>Remove</th>
            </tr>
          </thead>
          )}
          {state.cart.map((prod) => (
            <tbody key={prod.id}>
            <tr>
              <td className="w-40"><img src={prod.thumbnail} alt={prod.title} /></td>
              <td className="text-xl">{prod.title}</td>
              <td className="mx-5 text-[#999]">${prod.price}</td>
              <td className=""><button className="bg-black px-5 py-1 text-white" onClick={() => dispatch({ type:'ADD_TO_CART', payload:prod })}>+</button></td>
              <td className="">{prod.qwt}</td>
              <td className=""><button className="bg-black px-5 py-1 text-white" onClick={() => handleDecrease(prod)}>-</button></td>
              <td><button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: prod })} className="flex justify-center items-center border rounded-full ml-7 bg-black text-white text-center"><X /></button></td>
            </tr>
          </tbody>
          ))}
        </table>
        <h1 className="text-start mt-4 text-4xl">Total Price: ${TotalPrice.toFixed(2)}</h1>
      </div>
    </div>
  )
}

export default Cart