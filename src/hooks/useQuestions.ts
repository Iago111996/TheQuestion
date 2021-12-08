import { useContext } from 'react'; 
import { QuestionsContext } from '../context/questionsContext';

export function useQuestions() {
    const context = useContext(QuestionsContext);

    return context;
}