import {appName} from '../config'
import {Record} from 'immutable'
import firebase from 'firebase'
import { createSelector } from 'reselect'

/**
 * Constants
 * */
export const moduleName = 'admin'
const prefix = `${appName}/${moduleName}`

export const NEW_USER_SUCCESS = `${prefix}/NEW_USER_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    user: null
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case NEW_USER_SUCCESS:
            return state.set('user', payload.user)

        default:
            return state
    }
}

/**
 * Selectors
 * */
export const userSelector = state => state[moduleName].user
export const authorizedSelector = createSelector(userSelector, user => !!user)

/**
 * Action Creators
 * */

export function newUser(email, firstName, lastName) {
    return (dispatch) => {
        newUser(email, firstName, lastName).then(
            user => dispatch({ type: NEW_USER_SUCCESS, payload: { user } })
        );
        // firebase.auth().createUser({ email: email, displayName: displayName })
        //     .then(user => dispatch({ type: NEW_USER_SUCCESS, payload: { user } }))
    }
}

async function newUser(email, firstName, lastName){
    let displayName = firstName + ' ' + lastName;
    return {
        email: email,
        displayName: displayName
    }
}

firebase.auth().onAuthStateChanged(user => {
    user && window.store.dispatch({
        type: NEW_USER_SUCCESS,
        payload: { user }
    })
})
