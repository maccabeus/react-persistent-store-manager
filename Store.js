<<<<<<< HEAD
import {Store} from "pullstate";

/**
 * An abject containing all the stores in our application
 */
export const Stores = {

    /** the user details store */
    UserStore:{    
        name: null,
        email: null,
        userType: null
        },

        /** the app settings store */
        AppSettingsStore: {
            measurements: [],
            userTypes: []
        }

        /** add any other store here. Must follow the above pattern
         * you can use any variable type
         */
    };

/**
 * Define a global store that cobtains all our substores
 * The `StoreManager` will handle the individual store update and makes them persistent
 */
 export const AppStore = new Store({
     ...Stores
 });


=======
import {Store} from "pullstate";

/**
 * An abject containing all the stores in our application
 */
export const Stores = {

    /** the user details store */
    UserStore:{    
        name: null,
        email: null,
        userType: null
        },

        /** the app settings store */
        AppSettingsStore: {
            measurements: [],
            userTypes: []
        }

        /** add any other store here. Must follow the above pattern
         * you can use any variable type
         */
    };

/**
 * Define a global store that cobtains all our substores
 * The `StoreManager` will handle the individual store update and makes them persistent
 */
 export const AppStore = new Store({
     ...Stores
 });


>>>>>>> 1d143d7674a1a4c7936dbb1bdb41e0d12976c8a5
