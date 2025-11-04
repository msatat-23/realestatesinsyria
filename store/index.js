import { configureStore } from "@reduxjs/toolkit";
import mainpagepropertiesSlice from "./mainpagePropertiesSlice";
import loggedInSlice from "./loggedInSlice";
import userSlice from "./userSlice";
import advancedSearchSlice from "./advancedsearchSlice";
import notifySlice from "./notifySlice";
const store = configureStore({
    reducer: {
        mainproperties: mainpagepropertiesSlice.reducer,
        loggedin: loggedInSlice.reducer,
        user: userSlice.reducer,
        advancedsearch: advancedSearchSlice.reducer,
        notify: notifySlice.reducer
    }
});

export default store;