import { useLocalStore } from "pullstate";
import React, {useEffect, useState} from "react";
import {StoreManager} from "./../StoreManager";


const SetStore = (props)=>  {

    /** create a store
     * pass the name of the store you want to read
     * check "Store.js" for stores
   */
     const Store= StoreManager("UserStore");

     /** use this to update a particular store */
    Store.update("email", "slimkoko.com");
    Store.update("user", "Ademola Salami");

    /** read a non persistent store data
     * data will be lost on refresh
     */
     const user= Store.useState("user");

    /** 
     * use this async method to get value that will persist
     **/
    const [email, setEmail]= useState(null);
    Store.useStateAsync("email").then(value=>{
        setEmail(value)
    });

    return (
        <div>
        <div>Name is : {user} </div>
        <div>My Email: {email} </div>
        </div>
    )
}

export default SetStore;

