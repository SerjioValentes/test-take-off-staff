import {contactsActionTypes, ContactsState, ContactAction} from "../../types/contactList";

const initialState: ContactsState = {
    newName: '',
    search: '',
    isSearch: false,
    newNumber: '',
    name: '',
    number: '',
    contactList: [],
    searchContactList: [],
    isFetching: false,
}

export const contactListReducer = (state = initialState, action: ContactAction): ContactsState => {
    switch (action.type) {
        case contactsActionTypes.SEARCH:
            return {
                ...state,
                search: action.payload,
            }
        case contactsActionTypes.SET_NAME:
            return {
                ...state,
                name: action.payload,
            }
        case contactsActionTypes.SET_NUMBER:
            return {
                ...state,
                number: action.payload,
            }
            case contactsActionTypes.SET_NEW_NAME:
            return {
                ...state,
                newName: action.payload,
            }
        case contactsActionTypes.SET_NEW_NUMBER:
            return {
                ...state,
                newNumber: action.payload,
            }
        case contactsActionTypes.SET_CONTACTLIST:
            return {
                ...state,
                contactList: action.payload,
                isFetching: true,
            }
        case contactsActionTypes.SEARCH_CONTACT_LIST:
            return {
                ...state,
                searchContactList: action.payload,
            }
        case contactsActionTypes.SET_IS_SEARCH:
            return {
                ...state,
                isSearch: action.payload,
            }
        default:
            return state
    }
}

