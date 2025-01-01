import { createContext, FC, ReactNode, useReducer } from "react";

export interface DataState {
    id: number;
    title: string;
    description: string;
    qwt: number;
    thumbnail: string;
    price: number;
}

type State = { cart: DataState[] }
type Action = {type: 'ADD_TO_CART', payload: DataState} |
    { type: 'CLEAR_CART' } |
    { type: 'DECREASE_VALUE', payload: DataState } |
    {type: 'REMOVE_ITEM', payload: DataState}

const initState: State = {
    cart: [],
}
const reducer = (state: State, action:Action): State => {
    switch(action.type) {
        case 'ADD_TO_CART': {
            const findProducts = state.cart.find((prod) => prod.id === action.payload.id);
            if(findProducts) {
                return {
                    ...state,
                    cart: state.cart.map((prod) => prod.id === action.payload.id ? {...prod, qwt: prod.qwt + 1} : prod)
                }
            }else {
                return {
                    ...state,
                    cart: [ ...state.cart, { ...action.payload, qwt: 1 } ]
                }
            }
        }
        case 'CLEAR_CART': {
            return {
                cart: []
            }
        }
        case 'DECREASE_VALUE': return {
            ...state,
            cart: state.cart.map((prod) => prod.id === action.payload.id ? { ...prod, qwt: prod.qwt - 1 } : prod)
        }
        case 'REMOVE_ITEM': return {
            ...state,
            cart: state.cart.filter((prod) => prod.id !== action.payload.id)
        }
        default: return state;
    }
} 
export const CartContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

const CartContextProvider:FC<{children: ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initState);
    return <CartContext.Provider value={{ state, dispatch }}>
        {children}
    </CartContext.Provider>
}
export default CartContextProvider;