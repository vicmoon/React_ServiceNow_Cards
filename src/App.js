import React, {useState} from 'react'; 
import './App.css';
import FlashCardList from './FlashCardList';

function App() {
  const [flashcards, setFlashCards] = useState(sample_flashcards); 
  return (
    <FlashCardList flashcards ={flashcards} />
  );
}


const sample_flashcards = [
  {
    id: 1, 
    question: "What is CSA?",
    answer: 'Certified ServiceNow Administrator',
    options: [
      'wrong',  
      'wrong',
      'correct'  
      ]
  }, 
  {
    id: 2, 
    question: "What is CSA?",
    answer: 'Certified ServiceNow Administrator',
    options: [
      'wrong',  
      'wrong',
      'correct'  
      ]
  },
  {
    id: 3, 
    question: "What is CSA?",
    answer: 'Certified ServiceNow Administrator',
    options: [
      'wrong',  
      'wrong',
      'correct'  
      ]
  }

]



export default App;
