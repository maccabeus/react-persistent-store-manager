import React, { useState } from "react";
import localforage from "localforage";
import {Store as pullStateStore} from "pullstate";

/**
 * This track the AppStore provide when `StoreManager` is initialized
 * This export is always created with our `Store` method of `StoreManager`
 */
let AppStore ={};

/**
 * This is an object containing all the store value to  used in creating our store
 * Normally, this value will be exported from our store creation file
 * For example, this definition will look like this:
 * UserStore:{    
        name: null,
        email: null,
        userType: null
        },
    AppSettingsStore: {
        measurements: [],
        userTypes: []
    }
 *
 */
let Stores ={};

/**
 * Use this to create a new store 
 * The `stores` should be created in this format described in `Stores` variable above
 * @param {*} stores 
 * @returns 
 */
export const Store=(stores ) => new pullStateStore({
    ...stores
});

/**
 * we will re-implement the Store functionality to make data persistent if page is refreshed
 * to to this, we will use localforage to implement local data storage.
 * When store  data is set, we also save to the local storage
 * and while retrieving store data, if not found, we will check the local storage
 *
 **/
export const StoreManager = (AppStore , Stores, storeLocation) => {
    /** create a private variable to keep track of store name */
    let storeName = storeLocation;

    /** create some placeholder methods to return if store is not available
     * this will prevent error when user call store method and the store is not available
     */
    const placeHolderMethods={update:()=>null, useState: ()=>null, useStateAsync: async()=>null};

    if (!Stores[storeName]) {
        const msg=`No store define for ${storeName}. Please define store first`;
        alert(
            msg
        );
        console.error(msg);
        return placeHolderMethods;
    }
    /**
     * Get store value without persistent
     * @param {*} valueIndex 
     * @returns 
     */
    const useState = (valueIndex) => {
        const localStore = AppStore.useState((s) => {
            const curStoreValue =
                s[storeName] && s[storeName][valueIndex]
                    ? s[storeName][valueIndex]
                    : null;
                return curStoreValue;    
        });
        return localStore;
    };

    /**
     * Get the store value and persist
     * This will use both localForage and pullstate
     * @param {fetch} valueIndex 
     * @returns 
     */
    const useStateAsync= async (valueIndex)=>{

        const localStore = AppStore.useState(async (s) => {
            const curStoreValue =
                s[storeName] && s[storeName][valueIndex]
                    ? s[storeName][valueIndex]
                    : null;

            if (curStoreValue) return curStoreValue;

            /**if curStoreValue is empty, we will check the localforage to see
             * if this value exist before the page was refreshed.
             * traditionally, Store return empty once te page is refreshed
             * so to make it persistent, we will always save value to local database
             * */
            if (
                curStoreValue === null ||
                curStoreValue === "" ||
                curStoreValue === undefined
            ) {
                /** let us check the localforage and see if this values are present  */
                const localValueName = `${storeName}-${valueIndex}`;
                const value = await localforage.getItem(localValueName);
                return value;
            }
        });
        return (localStore);

    }
    /**
     * Update the value in a store
     * @param {*} valueIndex 
     * @param {*} value 
     */
    const update = (valueIndex, value) => {
        AppStore.update((s) => {
            s[storeName][valueIndex] = value;
        });
        /** update also in local forage */
        const localValueName = `${storeName}-${valueIndex}`;
        localforage
            .setItem(localValueName, value)
            .then(() => {
                // localforage.getItem(localValueName).then(value=>{
                //alert(value + "is set");
                // })
            })
            .catch((e) => {
                console.error(e);
            });
    };

    return {
        useState,
        useStateAsync,
        update,
    };
};