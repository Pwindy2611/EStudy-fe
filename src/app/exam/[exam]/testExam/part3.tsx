import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

interface SelectedAnswers {
    [key: string]: {
        QuestionId: string;
        Answer: string;
        State: boolean; // New field to indicate if the answer is correct
    };
}

interface Part3Props {
    questionRefs: React.RefObject<{ [key: string]: HTMLDivElement | null }>;
    onAnswerChange: (questionId: string, answer: string) => void; 
}

const Part3Component = ({ questionRefs, onAnswerChange }: Part3Props)  => {
    const part3 = useSelector((state: any) => state.ThunkReducer.exam.part3?.data?.part3Response);
    const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>(() => {
        // Load selected answers from sessionStorage on component mount
        const storedAnswers = JSON.parse(sessionStorage.getItem('answerTest') || '{}');
        return storedAnswers;
    });

    const handleOptionChange = (questionId: string, option: string, correctAnswer: string) => {
        // Determine if the selected answer is correct
        const isCorrect = option === correctAnswer;

        // Update selected answers state with isCorrect field
        setSelectedAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: {
                QuestionId: questionId,
                Answer: option,
                State: isCorrect,
            },
        }));

        // Update sessionStorage with questionId, selected answer, and isCorrect flag
        const updatedAnswers = {
            ...JSON.parse(sessionStorage.getItem('answerTest') || '{}'),
            [questionId]: {
                QuestionId: questionId,
                Answer: option,
                State: isCorrect,
            },
        };
        sessionStorage.setItem('answerTest', JSON.stringify(updatedAnswers));
        onAnswerChange(questionId, option);
    };

    useEffect(() => {
        // Set initial selected answers from sessionStorage
        setSelectedAnswers(JSON.parse(sessionStorage.getItem('answerTest') || '{}'));
    }, []);

    if (!part3 || part3.isFetching) return <p>Loading...</p>;
    if (part3.error) return <p>Error loading part 3.</p>;

    return (
        <div>
            {part3?.map((item: any) => (
                <div
                    key={item.questionId}
                    ref={el => {
                        if (questionRefs.current) {
                            questionRefs.current[item.questionId] = el;
                        }
                    }}
                    className="question-item"
                >
                    <div className=' flex gap-4 mt-5'>
                        <span className='aspect-square w-8 h-8 flex items-center justify-center as bg-blue-200 text-black font-medium text-lg rounded-full'>{item.number}</span>
                        <div className="flex flex-col text-lg">
                            <p>{item.questionText}</p>
                            <label className=' flex gap-2 mt-2  items-center'>
                                <input
                                    type="radio"
                                    name={`q${item.number}`}
                                    value={item.optionA}
                                    checked={selectedAnswers[item.questionId]?.Answer === 'A'}
                                    onChange={() => handleOptionChange(item.questionId,'A', item.correctAnswear)}
                                />
                                A. {item.optionA}
                            </label >
                            <label className=' flex gap-2  items-center'>
                                <input
                                    type="radio"
                                    name={`q${item.number}`}
                                    value={item.optionB}
                                    checked={selectedAnswers[item.questionId]?.Answer === 'B'}
                                    onChange={() => handleOptionChange(item.questionId, 'B', item.correctAnswear)}
                                />
                                B. {item.optionB}
                            </label>
                            <label className=' flex gap-2  items-center'>
                                <input
                                    type="radio"
                                    name={`q${item.number}`}
                                    value={item.optionC}
                                    checked={selectedAnswers[item.questionId]?.Answer === 'C'}
                                    onChange={() => handleOptionChange(item.questionId,'C', item.correctAnswear)}
                                />
                                C. {item.optionC}
                            </label>
                            <label className=' flex gap-2  items-center'>
                                <input
                                    type="radio"
                                    name={`q${item.number}`}
                                    value={item.optionD}
                                    checked={selectedAnswers[item.questionId]?.Answer === 'D'}
                                    onChange={() => handleOptionChange(item.questionId, 'D', item.correctAnswear)}
                                />
                                D. {item.optionD} 
                            </label>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Part3Component;
