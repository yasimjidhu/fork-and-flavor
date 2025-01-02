'use client';

import Recipe from "@/types/recipe";
import React,{createContext,useContext,useState} from "react";

interface SearchContextType{
    searchResults:Recipe[];
    setSearchResults:(results:Recipe[])=>void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const SearchProvider:React.FC<{children:React.ReactNode}>=({children})=>{
    const [searchResults,setSearchResults] = useState<Recipe[]>([])

    return (
        <SearchContext.Provider value={{searchResults,setSearchResults}}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch = ()=>{
    const context = useContext(SearchContext)
    if(!context){
        throw new Error('use search must be used within a search provider')
    }
    return context
}