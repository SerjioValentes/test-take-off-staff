import {useTypeSelector} from "../hooks/useTypeSelector";
import {useDispatch} from "react-redux";
import {contactsActionTypes} from "../types/contactList";
import {FC} from "react";
import '../styles/styles.css';

interface newContact {
    name?: string;
    number?: string;
    id?: Date;
    isEdit?: boolean;
}

export const MainPage: FC = () => {
    const {
        name,
        number,
        contactList,
        isFetching,
        newName,
        newNumber,
        search,
        searchContactList,
        isSearch
    } = useTypeSelector(state => state.contacts);
    const dispatch = useDispatch();

    const addNewContact = (): void => {
        if (newName.length === 0 || newNumber.length === 0) {
            return console.log('input empty');
        }
        const contacts: newContact = {
            name: newName,
            number: newNumber,
            id: new Date(),
            isEdit: false,
        }
        dispatch({type: contactsActionTypes.SET_CONTACTLIST, payload: [...contactList, contacts]});
        dispatch({type: contactsActionTypes.SET_NEW_NAME, payload: ''});
        dispatch({type: contactsActionTypes.SET_NEW_NUMBER, payload: ''});
    }

    const editItem = (id: string) => {
        contactList.map((item, i) => {
            if (item['id'] === id) {
                const contacts: newContact = {isEdit: true};
                Object.assign(contactList[i], contacts);
            }
        })
        dispatch({type: contactsActionTypes.SET_CONTACTLIST, payload: contactList});
        dispatch({type: contactsActionTypes.SET_NAME, payload: ''});
        dispatch({type: contactsActionTypes.SET_NUMBER, payload: ''});
    }

    const saveEditItem = (id: string) => {
        contactList.map((item, i) => {
            if (item['id'] === id) {
                const contacts: newContact = {
                    name,
                    number,
                    isEdit: false
                };
                Object.assign(contactList[i], contacts);
            }
        })
        dispatch({type: contactsActionTypes.SET_CONTACTLIST, payload: contactList});
    }

    const deleteItem = (id: string) => {
        contactList.map((item, i) => {
            if (item['id'] === id) {
                return contactList.splice(i, 1);
            }
        })
        dispatch({type: contactsActionTypes.SET_CONTACTLIST, payload: contactList});
    }

    const backToMain = () => {
        dispatch({type: contactsActionTypes.SEARCH, payload: ''});
        dispatch({
            type: contactsActionTypes.SEARCH_CONTACT_LIST,
            payload: [],
        })
        dispatch({
            type: contactsActionTypes.SET_IS_SEARCH,
            payload: false
        })
    }

    const searchContacts = () => {
        let arr: string[] = contactList.map(item => {
            return item['name']
        })
        arr.map((item: string) => {
            if (item.includes(search)) {
                let array = contactList.filter((itemContact: never) => {
                    if (itemContact['name'] === item) {
                        let contacts: { name: string; number: string; id: string; isEdit: boolean } = {
                            name: itemContact['name'],
                            number: itemContact['number'],
                            id: itemContact['id'],
                            isEdit: false
                        }
                        return contacts;
                    }
                })

                dispatch({
                    type: contactsActionTypes.SEARCH_CONTACT_LIST,
                    payload: [...array]
                })
            }
        })
        dispatch({type: contactsActionTypes.SET_IS_SEARCH, payload: true});
    }

    return (
        <div className={'main-page-wrapper'}>
            {/*-------------------------------------Add new contact----------------------------*/}
            <div className={'main-page-add-new_item'}>
                <div className={'main-page-name_input'}>
                    <input
                        value={newName}
                        placeholder={'Name...'}
                        onChange={e => {
                            dispatch({type: contactsActionTypes.SET_NEW_NAME, payload: e.target.value})
                        }}/>
                </div>
                <div className={'main-page-name_input'}>
                    <input
                        value={newNumber}
                        placeholder={'Contact info...'}
                        onChange={e => {
                            dispatch({type: contactsActionTypes.SET_NEW_NUMBER, payload: e.target.value})
                        }}
                    />
                </div>
                <div className={'main-page-add-new_item-button'}>
                    <button onClick={addNewContact}>New contact</button>
                </div>
                <div className={'main-page-name_input'}>
                    <input
                        placeholder={'Search..'}
                        value={search}
                        onChange={(e) => {
                            dispatch({type: contactsActionTypes.SEARCH, payload: e.target.value})
                        }}
                    />
                    <div className={'main-page-add-new_item-button'}>
                        {
                            !isSearch
                                ?
                                <button onClick={searchContacts}>Search</button>
                                :
                                <button onClick={backToMain}>Back to main</button>
                        }
                    </div>
                </div>
            </div>
            {/*END-------------------------------------Add new contact----------------------------*/}
            <div className={'main-page-contacts-wrapper'}>
                <div>
                    <div>
                        {
                            !isSearch
                                ?
                                // -------------------------------------List of contacts----------------------------
                                <div>
                                    {
                                        isFetching
                                            ?
                                            contactList.map(item => (
                                                <div key={item['id']}>
                                                    <div className={'main-page-item-wrapper'}>
                                                        <div>

                                                            <div className={'main-page-name-contact'}>
                                                                <h4> Name:</h4>
                                                                <div>
                                                                    {item['name']}
                                                                </div>
                                                            </div>

                                                            <div className={'main-page-name-contact'}>
                                                                <h4>
                                                                    Number:
                                                                </h4>
                                                                <div>
                                                                    {item['number']}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*-----------------------------Edit and delete buttons-----------------------------*/}
                                                        <div className={'main-page-item-buttons'}>
                                                            {
                                                                item['isEdit'] === true
                                                                    ?
                                                                    <div className={'main-page-name-contact'}>
                                                                        <h4>Name:</h4>
                                                                        <input
                                                                            onChange={e => dispatch({
                                                                                type: contactsActionTypes.SET_NAME,
                                                                                payload: e.target.value
                                                                            })}/>
                                                                        <div>
                                                                            <h4>Number</h4>
                                                                            <input
                                                                                onChange={e => dispatch({
                                                                                    type: contactsActionTypes.SET_NUMBER,
                                                                                    payload: e.target.value
                                                                                })}/>
                                                                        </div>
                                                                        <div>
                                                                            <button
                                                                                onClick={() => saveEditItem(item['id'])}>save
                                                                            </button>
                                                                            <button
                                                                                onClick={() => deleteItem(item['id'])}>delete
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    <div>
                                                                        <button
                                                                            onClick={() => editItem(item['id'])}>Edit
                                                                        </button>
                                                                        <button
                                                                            onClick={() => deleteItem(item['id'])}>delete
                                                                        </button>
                                                                    </div>
                                                            }
                                                        </div>
                                                        {/*END-----------------------------Edit and delete buttons-----------------------------*/}
                                                    </div>
                                                </div>
                                            ))
                                            :
                                                        // -----------------------------First text before adding new contact -----------------------------
                                            <div className={'main-page-nothing-text'}>
                                                Empty contact list
                                            </div>
                                                        // END-----------------------------First text before adding new contact -----------------------------
                                    }
                                </div>
                                //END -------------------------------------List of contacts----------------------------
                                :
                                // -------------------------------------List of contacts after search----------------------------
                                <div>
                                    {
                                        searchContactList.map(item =>
                                            <div className={'main-page-item-wrapper'} key={item['id']}>
                                                <div>
                                                    <div className={'main-page-name-contact'}>
                                                        <h4> Name:</h4>
                                                        <div>
                                                            {item['name']}
                                                        </div>
                                                    </div>
                                                    <div className={'main-page-name-contact'}>
                                                        <h4>
                                                            Number:
                                                        </h4>
                                                        <div>
                                                            {item['number']}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                //END -------------------------------------List of contacts after search----------------------------
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
