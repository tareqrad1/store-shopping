import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { DataProducts } from "../Types";
interface FetchResponse {
    products: DataProducts[];
}
interface StateShape {
    isLoading: boolean;
    data: FetchResponse;
    isError: string;
}
const useFetch = (url: string) => {
    const isMounted = useRef<boolean>(false);
    const [state, setState] = useState<StateShape>({
        isLoading: false,
        data: {
            products: [],
        },
        isError: '',
    });
    useEffect(() => {
        setState({ isLoading: true, data: { products: [] } , isError: '' });
        if(!isMounted.current) {
            isMounted.current = true;
            const fetchProducts = async() => {
                try {
                    const res = await axios.get(url);
                    const data: FetchResponse = await res.data;
                    if(res.status === 200) {
                        setState({ isLoading: false, data: data, isError: '' });
                    }else {
                        console.log('Noting Will');
                    }
                }catch (error: unknown) {
                    if(error instanceof Error) {
                        setState({ isLoading: false, data: { products: [] }, isError: error.message || 'Failed to fetch data !' })
                    }else {
                        console.log('Network Error !');
                    }
                }
            }
            fetchProducts();
        }
    },[url]);
    return state
}
export default useFetch;