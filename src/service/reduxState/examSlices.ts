import { createSlice } from "@reduxjs/toolkit";
const examSlice = createSlice({
    name: "exams",
    initialState: {
        allExam: {
            data: null,
            isFetching: false,
            error: false,
        },
        popularExam: {
            data: null,
            isFetching: false,
            error: false,
        },
        detailExam: {
            data: null,
            isFetching: false,
            error: false,
        },
        audioExam: {
            data: null,
            isFetching: false,
            error: false,
        },
        completeExam: {
            data: null,
            isFetching: false,
            error: false,
        },
        part1: {
            data: null,
            isFetching: false,
            error: false,
        },
        part2: {
            data: null,
            isFetching: false,
            error: false,
        },
        part3: {
            data: null,
            isFetching: false,
            error: false,
        },
        part4: {
            data: null,
            isFetching: false,
            error: false,
        },
        part5: {
            data: null,
            isFetching: false,
            error: false,
        },
        part6: {
            data: null,
            isFetching: false,
            error: false,
        },
        part7: {
            data: null,
            isFetching: false,
            error: false,
        },
        examRevision:{
            data: null,
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        getAllExamStart: (state:any) => {
            state.allExam.isFetching = true;
        },
        getAllExamSuccess: (state:any, action:any) => {
            state.allExam.isFetching = false;
            state.allExam.data = action.payload;
            state.allExam.error = false;
        },
        getAllExamFailed: (state:any, action:any) => {
            state.allExam.isFetching = false;
            state.allExam.error = true;
            state.msg = action.payload;
        },
        getDetailExamStart: (state:any) => {
            state.detailExam.isFetching = true;
        },
        getDetailExamSuccess: (state:any, action:any) => {
            state.detailExam.isFetching = false;
            state.detailExam.data = action.payload;
            state.detailExam.error = false;
        },
        getDetailExamFailed: (state:any, action:any) => {
            state.detailExam.isFetching = false;
            state.detailExam.error = true;
            state.msg = action.payload;
        },
        getAudioExamStart: (state:any) => {
            state.audioExam.isFetching = true;
        },
        getAudioExamSuccess: (state:any, action:any) => {
            state.audioExam.isFetching = false;
            state.audioExam.data = action.payload;
            state.audioExam.error = false;
        },
        getAudioExamFailed: (state:any, action:any) => {
            state.audioExam.isFetching = false;
            state.audioExam.error = true;
            state.msg = action.payload;
        },
        getCompleteExamStart: (state:any) => {
            state.completeExam.isFetching = true;
        },
        getCompleteExamSuccess: (state:any, action:any) => {
            state.completeExam.isFetching = false;
            state.completeExam.data = action.payload;
            state.completeExam.error = false;
        },
        getCompleteExamFailed: (state:any, action:any) => {
            state.completeExam.isFetching = false;
            state.completeExam.error = true;
            state.msg = action.payload;
        },
        getPopularExamStart: (state:any) => {
            state.popularExam.isFetching = true;
        },
        getPopularExamSuccess: (state:any, action:any) => {
            state.popularExam.isFetching = false;
            state.popularExam.data = action.payload;
            state.popularExam.error = false;
        },
        getPopularExamFailed: (state:any, action:any) => {
            state.popularExam.isFetching = false;
            state.popularExam.error = true;
            state.msg = action.payload;
        },
        getPart1Start: (state:any) => {
            state.part1.isFetching = true;
        },
        getPart1Success: (state:any, action:any) => {
            state.part1.isFetching = false;
            state.part1.data = action.payload;
            state.part1.error = false;
        },
        getPart1Failed: (state:any, action:any) => {
            state.part1.isFetching = false;
            state.part1.error = true;
            state.msg = action.payload;
        },

        getPart2Start: (state:any) => {
            state.part2.isFetching = true;
        },
        getPart2Success: (state:any, action:any) => {
            state.part2.isFetching = false;
            state.part2.data = action.payload;
            state.part2.error = false;
        },
        getPart2Failed: (state:any, action:any) => {
            state.part2.isFetching = false;
            state.part2.error = true;
            state.msg = action.payload;
        },

        getPart3Start: (state:any) => {
            state.part3.isFetching = true;
        },
        getPart3Success: (state:any, action:any) => {
            state.part3.isFetching = false;
            state.part3.data = action.payload;
            state.part3.error = false;
        },
        getPart3Failed: (state:any, action:any) => {
            state.part3.isFetching = false;
            state.part3.error = true;
            state.msg = action.payload;
        },

        getPart4Start: (state:any) => {
            state.part4.isFetching = true;
        },
        getPart4Success: (state:any, action:any) => {
            state.part4.isFetching = false;
            state.part4.data = action.payload;
            state.part4.error = false;
        },
        getPart4Failed: (state:any, action:any) => {
            state.part4.isFetching = false;
            state.part4.error = true;
            state.msg = action.payload;
        },

        getPart5Start: (state:any) => {
            state.part5.isFetching = true;
        },
        getPart5Success: (state:any, action:any) => {
            state.part5.isFetching = false;
            state.part5.data = action.payload;
            state.part5.error = false;
        },
        getPart5Failed: (state:any, action:any) => {
            state.part5.isFetching = false;
            state.part5.error = true;
            state.msg = action.payload;
        },

        getPart6Start: (state:any) => {
            state.part6.isFetching = true;
        },
        getPart6Success: (state:any, action:any) => {
            state.part6.isFetching = false;
            state.part6.data = action.payload;
            state.part6.error = false;
        },
        getPart6Failed: (state:any, action:any) => {
            state.part6.isFetching = false;
            state.part6.error = true;
            state.msg = action.payload;
        },

        getPart7Start: (state:any) => {
            state.part7.isFetching = true;
        },
        getPart7Success: (state:any, action:any) => {
            state.part7.isFetching = false;
            state.part7.data = action.payload;
            state.part7.error = false;
        },
        getPart7Failed: (state:any, action:any) => {
            state.part7.isFetching = false;
            state.part7.error = true;
            state.msg = action.payload;
        },
        getExamRevisionStart: (state) => { 
            state.examRevision.isFetching = true;
        },
        getExamRevisionSuccess: (state, action) => {
            state.examRevision.isFetching = false;
            state.examRevision.data = action.payload;
            state.examRevision.error = false;
        },
        getExamRevisionFailed: (state, action) => {
            state.examRevision.isFetching = false;
            state.examRevision.error = true;
            state.msg = action.payload;
        }
    },
});

export const {
    getAllExamStart,
    getAllExamFailed,
    getAllExamSuccess,
    getDetailExamStart,
    getDetailExamSuccess,
    getDetailExamFailed,
    getAudioExamStart,
    getAudioExamSuccess,
    getAudioExamFailed,
    getCompleteExamStart,
    getCompleteExamSuccess,
    getCompleteExamFailed,
    getPopularExamStart,
    getPopularExamSuccess,
    getPopularExamFailed,
    getPart1Start,
    getPart1Success,
    getPart1Failed,
    getPart2Start,
    getPart2Success,
    getPart2Failed,
    getPart3Start,
    getPart3Success,
    getPart3Failed,
    getPart4Start,
    getPart4Success,
    getPart4Failed,
    getPart5Start,
    getPart5Success,
    getPart5Failed,
    getPart6Start,
    getPart6Success,
    getPart6Failed,
    getPart7Start,
    getPart7Success,
    getPart7Failed,
    getExamRevisionStart,
    getExamRevisionSuccess,
    getExamRevisionFailed,
} = examSlice.actions;

export default examSlice.reducer;
