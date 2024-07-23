import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

interface SelectedAnswers {
    [key: string]: {
        QuestionId: string;
        Answer: string;
        State: boolean; // New field to indicate if the answer is correct
    };
}

interface Part8Props {
    questionRefs: React.RefObject<{ [key: string]: HTMLDivElement | null }>;
    onAnswerChange: (questionId: string, answer: string) => void; 
}

const Part8 = ({ questionRefs, onAnswerChange }: Part8Props) => {
    const part8 = useSelector((state: any) => state.ThunkReducer.exam.part8?.data?.part8Response);
    const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>(() => {
        // Load selected answers from sessionStorage on component mount
        const storedAnswers = JSON.parse(sessionStorage.getItem('answerTest') || '{}');
        return storedAnswers;
    });

    const handleInputChange = (questionId: string, input: string, correctAnswer: string) => {
        // Determine if the user input is correct
        const isCorrect = input === correctAnswer;

        // Update selected answers state with the input and isCorrect field
        setSelectedAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: {
                QuestionId: questionId,
                Answer: input,
                State: isCorrect,
            },
        }));

        // Update sessionStorage with questionId, user input, and isCorrect flag
        const updatedAnswers = {
            ...JSON.parse(sessionStorage.getItem('answerTest') || '{}'),
            [questionId]: {
                QuestionId: questionId,
                Answer: input,
                State: isCorrect,
            },
        };
        sessionStorage.setItem('answerTest', JSON.stringify(updatedAnswers));
        onAnswerChange(questionId, input);
    };

    useEffect(() => {
        // Set initial selected answers from sessionStorage
        setSelectedAnswers(JSON.parse(sessionStorage.getItem('answerTest') || '{}'));
    }, []);

    if (!part8 || part8.isFetching) return <p>Loading...</p>;
    if (part8.error) return <p>Error loading part 8.</p>;

    return (
        <div>
            {part8?.map((item: any) => (
                <div
                    key={item.questionId}
                    ref={el => {
                        if (questionRefs.current) {
                            questionRefs.current[item.questionId] = el;
                        }
                    }}
                    className="question-item mt-11"
                >
                    <div className='flex items-center'>
                        <div className='flex-1'>
                            {item.questionImage && <img src={item.questionImage} alt={`Question ${item.number}`} />}
                        </div>
                        <div className='w-full flex gap-4 mt-5'>
                            <span className='aspect-square w-fit h-fit p-1 flex items-center justify-center as bg-blue-200 text-black font-medium text-lg rounded-full'>{item.number}</span>

                            <div className="flex flex-col flex-1 text-lg">
                                <p>{item.questionText}</p>
                                <label className='flex mt-5 gap-2 w-full  items-center'>
                                    <textarea
                                        className=' w-full border-[1px] border-slate-200 p-5'
                                        name={`q${item.number}`}
                                        placeholder='Your Answer'
                                        value={selectedAnswers[item.questionId]?.Answer || ''}
                                        onChange={(e) => handleInputChange(item.questionId, e.target.value, item.correctAnswer)}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Part8;
