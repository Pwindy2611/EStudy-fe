import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
    name: "question",
    initialState:{
        questions:{
            data:null,
            isFetching: false,
            error:false,
        },
        fillWord:{
            data:null,
            isFetching: false,
            error:false,
        },
        doubleChoice:{
            data:null,
            isFetching: false,
            error:false,
        },
        NoPara:{
            data:null,
            isFetching: false,
            error:false,
        },
        Reading:{
            data:null,
            isFetching: false,
            error:false,
        },
        msg:"",
    },
    reducers:{
        getQuestionsStart: (state) =>{
            state.questions.isFetching = true;
        },
        getQuestionsSuccess: (state,action) => {
            state.questions.isFetching = false;
            state.questions.data = action.payload;
            state.questions.error = false;
        },
        getQuestionsFailed: (state,action) =>{
            state.questions.isFetching = false;
            state.questions.error = true;
            state.msg = action.payload;
        },
        getFillWordStart: (state) =>{
            state.fillWord.isFetching = true;
        },
        getFillWordSuccess: (state,action) => {
            state.fillWord.isFetching = false;
            state.fillWord.data = action.payload;
            state.fillWord.error = false;
        },
        getFillWordFailed: (state,action) =>{
            state.fillWord.isFetching = false;
            state.fillWord.error = true;
            state.msg = action.payload;
        },
        getDoubleChoiceStart: (state) =>{
            state.doubleChoice.isFetching = true;
        },
        getDoubleChoiceSuccess: (state,action) => {
            state.doubleChoice.isFetching = false;
            state.doubleChoice.data = action.payload;
            state.doubleChoice.error = false;
        },
        getDoubleChoiceFailed: (state,action) =>{
            state.doubleChoice.isFetching = false;
            state.doubleChoice.error = true;
            state.msg = action.payload;
        },
        getReadingStart: (state) =>{
            state.Reading.isFetching = true;
        },
        getReadingSuccess: (state,action) => {
            state.Reading.isFetching = false;
            state.Reading.data = action.payload;
            state.Reading.error = false;
        },
        getReadingFailed: (state,action) =>{
            state.Reading.isFetching = false;
            state.Reading.error = true;
            state.msg = action.payload;
        },
        getNoParaStart: (state) =>{
            state.NoPara.isFetching = true;
        },
        getNoParaSuccess: (state,action) => {
            state.NoPara.isFetching = false;
            state.NoPara.data = action.payload;
            state.NoPara.error = false;
        },
        getNoParaFailed: (state,action) =>{
            state.NoPara.isFetching = false;
            state.NoPara.error = true;
            state.msg = action.payload;
        },
    }
});

export const {
    getQuestionsStart,
    getQuestionsFailed,
    getQuestionsSuccess,
    getFillWordStart,
    getFillWordFailed,
    getFillWordSuccess,
    getDoubleChoiceStart,
    getDoubleChoiceFailed,
    getDoubleChoiceSuccess,
    getReadingStart,
    getReadingFailed,
    getReadingSuccess,
    getNoParaStart,
    getNoParaFailed,
    getNoParaSuccess
} = questionSlice.actions;

export default questionSlice.reducer;