
import * as request from "@/lib/utils/request";
import {
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
}
from "@/service/reduxState/questionSlices"

import {
  getListenQuestResStart,
  getListenQuestResFailed,
  getListenQuestResSuccess,
  getListenSpeechStart,
  getListenSpeechFailed,
  getListenSpeechSuccess,
}
from "@/service/reduxState/listenSlices"

export const getAllQuestionOfLesson = async (lessonId:any,dispatch:any) => {
  dispatch(getQuestionsStart());
  try {
    const res = await request.post('/Question_API/Get_AllQuestionOfLesson', lessonId);
    dispatch(getQuestionsSuccess(res));
  } catch (err:any) {
    dispatch(getQuestionsFailed(err.response.data));
  }
}

export const getAllFillWord = async (lessonId:any,dispatch:any) => {
  dispatch(getFillWordStart());
  try {
    const res = await request.post('/VocabFlashCard_API/Get_AllVocabFillWorld', lessonId);
    dispatch(getFillWordSuccess(res));
  } catch (err:any) {
    dispatch(getFillWordFailed(err.response.data));
  }
}

export const getAllDoubleChoice = async (lessonId:any,dispatch:any) => {
  dispatch(getDoubleChoiceStart());
  try {
    const res = await request.post('/Question_API/Get_AllQuestionDoubleChoice', lessonId);
    dispatch(getDoubleChoiceSuccess(res));
  } catch (err:any) {
    dispatch(getDoubleChoiceFailed(err.response.data));
  }
}

export const getAllReadingQuest = async (lessonId:any,dispatch:any) => {
  dispatch(getReadingStart());
  try {
    const res = await request.post('/Question_API/Get_AllQuestionReading', lessonId);
    dispatch(getReadingSuccess(res));
  } catch (err:any) {
    dispatch(getReadingFailed(err.response.data));
  }
}


export const getAllListenQuestRes = async (lessonId:any,dispatch:any) => {
  dispatch(getListenQuestResStart());
  try {
    const res = await request.post('/Question_API/Get_AllListen_Quest_Res', lessonId);
    dispatch(getListenQuestResSuccess(res));
  } catch (err:any) {
    dispatch(getListenQuestResFailed(err.response.data));
  }
}

export const getAllListenSpeech = async (lessonId:any,dispatch:any) => {
  dispatch(getListenSpeechStart());
  try {
    const res = await request.post('/Question_API/Get_AllListenSpeech', lessonId);
    dispatch(getListenSpeechSuccess(res));
  } catch (err:any) {
    dispatch(getListenSpeechFailed(err.response.data));
  }
}

export const getAllQesNoPara = async (lessonId:any,dispatch:any) => {
  dispatch(getNoParaStart());
  try {
    const res = await request.post('/Question_API/Get_AllQuestionReadingWithOutParagraph', lessonId);
    dispatch(getNoParaSuccess(res));
  } catch (err:any) {
    dispatch(getNoParaFailed(err.response.data));
  }
}