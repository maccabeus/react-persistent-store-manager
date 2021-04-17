import React, {useState} from "react";
import {AppSettingsStore, UserStore} from "../Store-pullstate";

const ReadStore = () => {
    /** this reading method ensure that remain available even with refresh  */
    const measure=AppSettingsStore.useState(s => s.measurements.name);
    const unit = AppSettingsStore.useState(s => s.measurements.unit);
    const size = AppSettingsStore.useState(s => s.measurements.size);

    const user= UserStore.useState(s => s.name);

    return (
        <div>
            <h1>{user} </h1>
            <div>Measurement: {measure}</div>
            <div>Unit: {unit}</div>
            <div>Size: {size}</div>

        </div>
    );
};

export default ReadStore;
