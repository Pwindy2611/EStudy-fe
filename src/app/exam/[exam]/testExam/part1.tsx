import React, { useState } from 'react';
import { useSelector } from 'react-redux';

interface SelectedAnswers {
    [key: string]: {
        QuestionId: string;
        Answer: string;
        State: boolean; // New field to indicate if the answer is correct
    };
}

interface Part1Props {
    questionRefs: React.RefObject<{ [key: string]: HTMLDivElement | null }>;
    onAnswerChange: (questionId: string, answer: string) => void; 
}

const Part1 = ({ questionRefs, onAnswerChange }: Part1Props) => {
    const part1 = useSelector((state: any) => state.ThunkReducer.exam.part1?.data?.part1Response);
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

        // Notify parent component of answer change
        onAnswerChange(questionId, option);
    };

    if (!part1 || part1.isFetching) return <p>Loading...</p>;
    if (part1.error) return <p>Error loading part 1.</p>;

    return (
        <div>
            {part1?.map((item: any) => (
                <div
                    key={item.questionId}
                    ref={el => {
                        if (questionRefs.current) {
                            questionRefs.current[item.questionId] = el;
                        }
                    }}
                    className="question-item"
                >
                    <img src={item.questionImage} alt={`Question ${item.number}`} />
                    <div className=' flex gap-4 mt-5'>
                        <span className='aspect-square w-8 h-8 flex items-center justify-center as bg-blue-200 text-black font-medium text-lg rounded-full'>{item.number}</span>
                        <div className="flex flex-col text-lg">
                            <label className=' flex gap-2  items-center'>
                                <input
                                    type="radio"
                                    name={`q${item.number}`}
                                    value='A'
                                    checked={selectedAnswers[item.questionId]?.Answer === 'A'}
                                    onChange={() => handleOptionChange(item.questionId, 'A', item.correctAnswear)}
                                />
                                A.
                            </label >
                            <label className=' flex gap-2  items-center'>
                                <input
                                    type="radio"
                                    name={`q${item.number}`}
                                    value='B'
                                    checked={selectedAnswers[item.questionId]?.Answer === 'B'}
                                    onChange={() => handleOptionChange(item.questionId, 'B', item.correctAnswear)}
                                />
                                B.
                            </label>
                            <label className=' flex gap-2  items-center'>
                                <input
                                    type="radio"
                                    name={`q${item.number}`}
                                    value='C'
                                    checked={selectedAnswers[item.questionId]?.Answer === 'C'}
                                    onChange={() => handleOptionChange(item.questionId, 'C', item.correctAnswear)}
                                />
                                C.
                            </label>
                            <label className=' flex gap-2  items-center'>
                                <input
                                    type="radio"
                                    name={`q${item.number}`}
                                    value='D'
                                    checked={selectedAnswers[item.questionId]?.Answer === 'D'}
                                    onChange={() => handleOptionChange(item.questionId, 'D', item.correctAnswear)}
                                />
                                D.
                            </label>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Part1;
