import React from "react";

const AppContext = React.createContext(
    {isAuthenticated:()=>{}, 
        cart: {items:[], 
        total:0},
        addItem:()=>{},
        removeItem:()=>{},
        emptyCart:()=>{},
        user:null, 
        setUser:()=>{}
    });
export default AppContext;