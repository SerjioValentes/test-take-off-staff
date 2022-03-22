import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {contactListReducer} from "./contactListReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    contacts: contactListReducer,
})

export type RootState = ReturnType<typeof rootReducer>
