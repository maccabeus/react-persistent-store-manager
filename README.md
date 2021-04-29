# React Store Manager 
A simple store manager. Uses `pullstte` and `localforage` for store and persistent store respectively.

## Getting Started

### Npm

``` bash
$  npm install react-store-manager -save
```

## Examples
To import in a react application
``` es6
import {StoreManager} from "react-persistent-store-manager";

```
To create a New Store 

from version 1.1.0, you must create a store  and pass it to `StoreManager` to read saved values

Create a `store.js` file or you can call it any name like. You can  use 
more than one store file within your application.

See below on how to create a new `store.js` file:

``` es6 
/** import the store from **/
import {Store} from "react-persistent-store-manager"

/** 
 * export a `Stores` object containing all your store definitions
 * Note: you can create multiple store files to handle your state management.
 * 
*/
export const Stores = {

/** the user details store */
UserStore:{   
userId:null, 
user: null,
email: null,
phone: null,
userType: null,
login: false,
permission:null,
},
/** Add any other store definitions here */
};

/**
 * return all the store our application will use
 * You can  call it `AppStore` any name of your  choice
 * @Note: you will need to use this name when you want to read the store values
 */
export const AppStore= Store(Stores);

```

To Set and read a store  value

``` es6
/** import the `StoreManager` **/
import { StoreManager } from "react-persistent-store-manager";

/** 
 * import the `Stores` and `AppStore` from our store file 
 * If you use a different name in your store file, please use these name.
 * @Note: we need the `Stores` to be able to validate if the store we are reading 
 * is indeed available, since we can have more than one store within a single `store.js` file.
 * 
 * **/
import { Stores, AppStore } from "./../state/store";

/** 
 * create an instance of the `StoreManager` using the `UserStore` name
 * that we earlier define in our `store.js` file.  
 * */
const Store = StoreManager(AppStore, Stores, "UserStore");

Store.update("userId", 123);
Store.update("user","John Doe" );
Store.update("email", "johndoe@yahoo.com");
Store.update("phone", "+1xxxxxxxxxx");
Store.update("userType", "admin");
Store.update("login", true);

/** read a non persistent store data
 * data will be lost on refresh
 */
const user= Store.useState("email");

/** 
 * use this async method to get value that will persist
 **/
const [email, setEmail]= useState(null);

Store.useStateAsync("email").then(value=>{
setEmail(value)
});

```

To run the code


## Contributions

I welcome contributions with love 😄😄🌺🌺🎆🎆

