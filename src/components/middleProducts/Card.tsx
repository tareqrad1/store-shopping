import { ShoppingBasket } from "lucide-react";
import { FC } from "react";
// import { useCart } from "../../hooks/useCart";
import { DataProducts } from "../../Types";
import { useNavigate } from "react-router";
import { useCart } from "../../hooks/useCart";

interface ProductsStateShape {
  dataProps: DataProducts,
}
const Card: FC<ProductsStateShape> = ({ dataProps }) => {
  const { dispatch } = useCart();
  const Navigate = useNavigate();
  return (
    <div className="border p-4 rounded cursor-pointer">
        <div onClick={() => Navigate(`/product/${dataProps.id}`)}>
          <img className="w-full h-32 object-cover mb-2" src={dataProps.thumbnail} alt={dataProps.title} />
          <h1 className="text-sm font-bold">{dataProps.title}</h1>
        </div>
        <div className="flex justify-between items-center mt-3">
            <span className="text-[#777] text-sm fond-normal">${dataProps.price}</span>
            <button onClick={() => dispatch({ type: 'ADD_TO_CART', payload: dataProps })}><ShoppingBasket  /></button>
        </div>
    </div>
  )
}

export default Card