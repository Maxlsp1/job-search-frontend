import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux'
import userReducer from "../store/reducers/user";
import storageSession from 'redux-persist/lib/storage/session';
import offlineConfig from 'redux-offline/lib/defaults';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const rootPersistConfig = {
   key: 'root',
   storage,
 }
 
const userPersistConfig = {
   key: 'user',
   storage: storageSession,
}

const rootReducer = combineReducers({
   user: persistReducer(userPersistConfig, userReducer),
   // notes: notesReducer
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const store = configureStore({
   reducer: persistedReducer,
   devTools: process.env.NODE_ENV !== 'production',
   middleware: [thunk],
   offline: offlineConfig
})

export const reduxStore = store;
export const persistor = persistStore(store)