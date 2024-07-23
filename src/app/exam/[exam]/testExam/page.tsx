"use client"
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchAllParts, getAudioExam, getCompleteExam } from '@/service/api/apiExamRequest'; 
import ExamDialog from "@/app/components/examSubmit/examSubmit";
import ExamExitDialog from "@/app/components/examSubmit/examExit";
import Part1Component from './part1';
import Part2Component from './part2';
import Part3Component from './part3';
import Part4Component from './part4';
import Part5Component from './part5';
import Part6Component from './part6';
import Part7Component from './part7';
import Part8Component from './part8';
import LoadingBody from '@/app/components/partialView/loadingBody';
import LoadingContent from '@/app/components/partialView/loadingContent';
import { Bounce, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const TestExam = ({ params }: { params: { exam: string } }) => {
    const { exam: idExam } = params;
    const navigate = useRouter();
    const examId = idExam;
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.persistedReducer.auth.login?.data);
    const audio = useSelector((state: any) => state.ThunkReducer.exam.audioExam?.data?.examAudio);
    const part1 = useSelector((state: any) => state.ThunkReducer.exam.part1?.data?.part1Response);
    const part2 = useSelector((state: any) => state.ThunkReducer.exam.part2?.data?.part2Response);
    const part3 = useSelector((state: any) => state.ThunkReducer.exam.part3?.data?.part3Response);
    const part4 = useSelector((state: any) => state.ThunkReducer.exam.part4?.data?.part4Response);
    const part5 = useSelector((state: any) => state.ThunkReducer.exam.part5?.data?.part5Response);
    const part6 = useSelector((state: any) => state.ThunkReducer.exam.part6?.data?.part6Responses);
    const part7 = useSelector((state: any) => state.ThunkReducer.exam.part7?.data?.part7Response);
    const part8 = useSelector((state: any) => state.ThunkReducer.exam.part8?.data?.part8Response);
    const parts = [part1, part2, part3, part4, part5, part6, part7];
    const [partQuestions, setPartQuestions] = useState<any[]>([]);
    const [selectedPart, setSelectedPart] = useState<number>(1);
    const [storageUpdated, setStorageUpdated] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(7200);
    const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [countdownComplete, setCountdownComplete] = useState<boolean>(false);

    useEffect(() => {
        if (!user) {
            navigate.push("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        fetchAllParts(examId, dispatch);
        getAudioExam(examId, dispatch);
    }, [dispatch]);

    useEffect(() => {
        const partData = parts.map((part, index) => ({
            partName: `Part ${index + 1}`,
            questions: part ? part.map((q: any) => ({
                questionId: q.questionId,
                number: q.number
            })) : []
        }));
        setPartQuestions(partData);
        initializeAnswerTest(parts);
    }, [part1, part2, part3, part4, part5, part6,part7,part8]);

    const initializeAnswerTest = (parts: any[]) => {
        const answerTest: { [key: string]: { QuestionId: number, Answer: string, State: boolean } } = {};
        parts.forEach(part => {
            if (part) {
                part.forEach((question: any) => {
                    answerTest[question.questionId] = {
                        QuestionId: question.questionId,
                        Answer: '',
                        State: false
                    };
                });
            }
        });
        sessionStorage.setItem('answerTest', JSON.stringify(answerTest));
    };

    useEffect(() => {
        const updateIsQuestionMarked = () => {
            setStorageUpdated(true);
        };
        updateIsQuestionMarked();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => {
                const newCountdown = prevCountdown - 1;
                sessionStorage.setItem('countdown', JSON.stringify(newCountdown));
                
                if (newCountdown <= 0) {
                    setCountdownComplete(true);
                    clearInterval(timer);
                }
                
                return newCountdown;
            });
        }, 1000);
    
        return () => clearInterval(timer);
    }, []);
    
    useEffect(() => {
        if (countdownComplete) {
            submitByCountDown();
        }
    }, [countdownComplete]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = 'Bạn có chắc chắn muốn rời khỏi trang này? Các thay đổi chưa lưu sẽ bị mất.';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    if (!audio || !part1 || !part2 || !part3 || !part4 || !part5 || !part6 || !part7||!part8) {
        return (
            <>
                <LoadingBody />
                <div className='w-full h-screen'>
                    <LoadingContent />
                </div>
            </>
        );
    }

    const renderPartComponent = () => {
        switch (selectedPart) {
            case 1:
                return <Part1Component questionRefs={questionRefs} onAnswerChange={handleAnswerChange} />;
            case 2:
                return <Part2Component questionRefs={questionRefs} onAnswerChange={handleAnswerChange} />;
            case 3:
                return <Part3Component questionRefs={questionRefs} onAnswerChange={handleAnswerChange} />;
            case 4:
                return <Part4Component questionRefs={questionRefs} onAnswerChange={handleAnswerChange} />;
            case 5:
                return <Part5Component questionRefs={questionRefs} onAnswerChange={handleAnswerChange} />;
            case 6:
                return <Part6Component questionRefs={questionRefs} onAnswerChange={handleAnswerChange} />;
            case 7:
                return <Part7Component questionRefs={questionRefs} onAnswerChange={handleAnswerChange} />;
            case 8:
            return <Part8Component questionRefs={questionRefs} onAnswerChange={handleAnswerChange} />;
            default:
                return <div>Select a part to view.</div>;
        }
    };

    const handleQuestionClick = (questionId: string, partIndex: number) => {
        setSelectedPart(partIndex + 1);

        setTimeout(() => {
            const questionElement = questionRefs.current[questionId];

            if (questionElement) {
                questionElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            } else {
                console.warn(`Question element with ID ${questionId} not found.`);
            }
        }, 100);
    };

    const handleAnswerChange = () => {
        setStorageUpdated(!storageUpdated);
    };

    const isQuestionMarked = (questionId: string) => {
        const storedAnswers = JSON.parse(sessionStorage.getItem('answerTest') || '{}');
        return storedAnswers[questionId]?.Answer !== '';
    };

    const submitByCountDown = async () => {
        const idToast = toast.loading('Đang xác nhận...', {
            position: "bottom-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });

        const storedAnswers = JSON.parse(sessionStorage.getItem('answerTest') || '{}');
        const answersToSend = Object.keys(storedAnswers).map(key => ({
            QuestionId: parseInt(key),
            Answer: storedAnswers[key].Answer,
            State: storedAnswers[key].State
        }));

        const data = {
            examId: examId,
            userId: user.user.userId,
            score: 0,
            answer: answersToSend,
            userTime: 0
        };

        const response = await getCompleteExam(data, dispatch);
        sessionStorage.removeItem('answerTest');
        sessionStorage.removeItem('countdown');
        if (response === 200) {
            toast.update(idToast, {
                render: 'Nộp bài thành công!',
                type: "success",
                isLoading: false,
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } else {
            toast.update(idToast, {
                render: 'Nộp bài thất bại!',
                type: "error",
                isLoading: false,
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        navigate.push(`/exam/${examId}/examDetails`);
    };

    return (
        <div className='mt-11 mx-10'>
            <div className="testExam__header-box">
                <h2 className="doTestExam__header">Practice Set 2023 TOEIC Test 10</h2>
                <ExamExitDialog examId={examId} />
            </div>
            <div className="flex gap-8">
                <div className="w-4/5">
                    <div className="testOnline__box">
                        {audio && (
                            <audio className="testExam__audio" controls>
                                <source src={audio} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        )}
                        <ul className="tag-search__list">
                            {['Part 1', 'Part 2', 'Part 3', 'Part 4', 'Part 5', 'Part 6', 'Part 7','Part 8'].map((part, index) => (
                                <li key={part} className="tag-search__item">
                                    <div
                                        onClick={() => setSelectedPart(index + 1)}
                                        className={`tag-search__link cursor-pointer ${selectedPart === index + 1 ? 'tag-search__link--chosen' : ''}`}
                                    >
                                        {part}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {renderPartComponent()}
                    </div>
                </div>
                <div className="w-1/5">
                    <div className="testOnline__box">
                        <p className="testExam__time-left">Thời gian còn lại:</p>
                        <p className="testExam__time">{formatTime(countdown)}</p>
                        <ExamDialog examId={examId} />
                        <p className="testExam__aleart mt-4">
                            Chú ý: bạn có thể click vào số thứ tự câu hỏi trong bài để đánh dấu review
                        </p>
                        {partQuestions.map((part: any, index) => (
                            <div key={index} className="testOnline__part">
                                <h3 className="testOnline__part-header">{part.partName}</h3>
                                <div className="multichoice__list-box gap-3">
                                    {part.questions.map((question: any) => (
                                        <div
                                            key={question.questionId}
                                            onClick={() => handleQuestionClick(question.questionId, index)}
                                            className={`py-[6px] px-[10px] border-[1px] rounded-sm hover:bg-primary-bg-color hover:text-white hover:border-primary-bg-color hover:cursor-pointer transition duration-300 ease-in-out ${isQuestionMarked(question.questionId) ? 'bg-primary-bg-color text-white' : ''}`}
                                        >
                                            {question.number}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default TestExam;
