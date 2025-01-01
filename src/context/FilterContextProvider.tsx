import { createContext, FC, ReactNode, useState } from "react";

export interface FilterContextShape {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    minPrice: number | undefined;
    setMinPrice: (min: number | undefined) => void;
    maxPrice: number | undefined;
    setMaxPrice: (max: number | undefined) => void;
    keyword: string;
    setKeyWord: (keyword: string) => void;
}
export const FilterContext = createContext<FilterContextShape | undefined>(undefined);

const FilterContextProvider: FC<{children: ReactNode}> = ({ children }): JSX.Element => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
    const [keyword, setKeyWord] = useState<string>('');

    return <FilterContext.Provider value={{ 
        searchQuery,setSearchQuery,
        selectedCategory,setSelectedCategory,
        minPrice,setMinPrice,
        maxPrice,setMaxPrice,
        keyword,setKeyWord,
     }} >
            {children}
    </FilterContext.Provider>
};
export default FilterContextProvider;