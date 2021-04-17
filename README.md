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

To Set and read a store 

``` es6
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

```

To run the code




## Contributions

I welcome contributions with love 😄😄🌺🌺🎆🎆

