import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/service/reduxState/authSlices";
import courseReducer from "@/service/reduxState/courseSlices";
import orderReducer from "@/service/reduxState/orderSlices";
import unitReducer from "@/service/reduxState/unitSlices";
import paymentMomoReducer from "@/service/reduxState/paymentSlices";
import contentUnitsSlice from "@/service/reduxState/containerAndLessonSlices";
import questionSlice from "@/service/reduxState/questionSlices"
import vocabSlice from "@/service/reduxState/vocabSlices"
import videoSlices from "@/service/reduxState/videoSlices";
import listenSlices from "@/service/reduxState/listenSlices";
import examSlices from "@/service/reduxState/examSlices";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  version: 1,
  storage,
};
const rootReducer = combineReducers({ auth: authReducer});
const ThunkReducer = combineReducers({
  courses: courseReducer, 
  order: orderReducer, 
  paymentMomo: paymentMomoReducer,
  unit: unitReducer,
  contentUnits:contentUnitsSlice,
  question:questionSlice,
  vocab:vocabSlice,
  video:videoSlices,
  listen: listenSlices,
  exam: examSlices,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {persistedReducer,ThunkReducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})

export const persistor = persistStore(store);