import React, {useEffect} from "react";
import {UserStore, AppSettingsStore} from "../Store-pullstate";
import {BrowserRouter as Router, Link} from "react-router-dom";
import {Route, Switch} from "react-router";
import ReadStore from "./ReadStore";


export default (props) => {

    const name = UserStore.useState(s => s.name);
    const email = UserStore.useState(s => s.email);
    const userType = UserStore.useState(s => s.userType);

    const measure = AppSettingsStore.useState(s => s.measurements.name);
    const unit = AppSettingsStore.useState(s => s.measurements.unit);
    const size = AppSettingsStore.useState(s => s.measurements.size);

    const loadSettingsFromApi = () => {
        const apiUrl = "https://mdredge-server-api.herokuapp.com/api/v1/system/app-settings.php";
        fetch(apiUrl)
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson, "API Response");
                const data = responseJson.data;
                AppSettingsStore.update(s => {
                        /** Note measurement is an array. have only passed the first element
                         * console.log(data.measurements) to see details of measurement
                         *  */
                        s.measurements = data.measurements[0];
                    }
                );
            })
    }

    useEffect(() => {
        loadSettingsFromApi();
    }, []);

    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/read-store" component={ReadStore}/>
                    <Route exact path="/read" component={this}/>
                </Switch>

                <h1>USer Details</h1>
                <div>User name:{name}</div>
                <div>Email:{email}</div>
                <div>UserType{userType}</div>
                <div>
                    <input id={"name"} type={"text"} placeholder={"Set name"}/>
                    <button onClick={() => {
                        let name = document.getElementById("name").value;
                        UserStore.update(s => {
                                s.name = name
                            }
                        );
                    }}>
                        Set User Name
                    </button>
                </div>
                <div>
                    <h1>Measurement Details</h1>
                    <div>Measurement name:{measure}</div>
                    <div>Unit:{unit}</div>
                    <div>Size:{size}</div>
                </div>

                <Link to={"/read-store"}>
                    <button>Read Values</button>
                </Link>
            </div>
        </Router>
    )

}
