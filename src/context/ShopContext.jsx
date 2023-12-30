import React, {createContext, useState} from "react";
import all_product from "../components/Assets/all_product";
import Item from "../components/Item/Item";
export const ShopContext=createContext(null);

const getDefaultCart= ()=>{
    let cart={};
    for(let index=0;index< all_product.length+1;index++){
        cart[index]=0;
    }
    return cart;
   }

const ShopContextProvider= (props)=>{
    const [cartItems, setCartItems]=useState(getDefaultCart());
   
   
   const addToCart=(ItemId)=>{
       setCartItems( (prev) =>({...prev,[ItemId]:prev[ItemId]+1}) )
       
    }
    const getTotalcartItems= () =>{
        let totalitem=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalitem+=cartItems[item];
            }
        }
        return totalitem;
    }

    const GetTotal = ()=>{
        let total=0;
        for (const i in cartItems){
            if(cartItems[i]>0){
                let iteminfo=all_product.find((product)=>product.id===Number(i))
                total+= iteminfo.new_price* cartItems[i]
            }
        }
        return total
    }

   const removefromCart=(ItemId)=>{
    setCartItems( (prev) =>({...prev,[ItemId]:prev[ItemId]-1}) )

    

  
} 
const contextValue ={getTotalcartItems ,GetTotal ,all_product , cartItems ,addToCart,removefromCart};

   return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
   )
}
export default ShopContextProvider