export enum contactsActionTypes {
    SET_NAME = 'SET_NAME',
    SET_NEW_NAME = 'SET_NEW_NAME',
    SET_NEW_NUMBER = 'SET_NEW_NUMBER',
    SET_NUMBER = 'SET_NUMBER',
    SET_CONTACTLIST = 'SET_CONTACTLIST',
    SEARCH = 'SEARCH',
    SEARCH_CONTACT_LIST = 'SEARCH_CONTACT_LIST',
    SET_IS_SEARCH = 'SET_IS_SEARCH',
}

interface contactsActionName {
    type: contactsActionTypes.SET_NAME;
    payload: string;
}

interface contactsActionNewName {
    type: contactsActionTypes.SET_NEW_NAME;
    payload: string;
}

interface contactsActionNewNumber {
    type: contactsActionTypes.SET_NEW_NUMBER;
    payload: string;
}

interface contactActionNumber {
    type: contactsActionTypes.SET_NUMBER;
    payload: string;
}

interface contactActionArray {
    type: contactsActionTypes.SET_CONTACTLIST;
    payload: [];
}

interface contactActionSearch {
    type: contactsActionTypes.SEARCH;
    payload: string;
}

interface contactActionSearchContactList {
    type: contactsActionTypes.SEARCH_CONTACT_LIST;
    payload: [];
}

interface contactActionSetIsSearch {
    type: contactsActionTypes.SET_IS_SEARCH;
    payload: boolean;
}

export interface ContactsState {
    isSearch: boolean;
    search: string;
    newName: string;
    newNumber: string;
    name: string,
    isFetching: boolean,
    number: string,
    contactList: (string & number)[],
    searchContactList: [],
}

export type ContactAction = contactActionSetIsSearch | contactActionSearchContactList | contactsActionName | contactActionNumber | contactActionArray | contactsActionNewName | contactsActionNewNumber | contactActionSearch
