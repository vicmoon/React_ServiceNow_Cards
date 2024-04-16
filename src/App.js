import React, {useState, useEffect} from 'react'; 
import './App.css';
import FlashCardList from './FlashCardList';
import axios from 'axios'; 

function App() {
  const [flashcards, setFlashCards] = useState(sample_flashcards);
  
  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=20&category=15')
      .then(res => {
        console.log(res.data);
        setFlashCards(res.data.results.map((question, index) => {
          const answer = decodeString(question.correct_answer)
          const option = [
            ...question.incorrect_answers.map(a => decodeString(a)), 
            answer
          ]
          return {
            id: `${index} = ${Date.now()}`,
            question: decodeString(question.question),
            answer: decodeString(answer),
            options: option.sort(() => Math.random() - .5) // random between 0 1, 50% negative, %0% positive
          }
        }))
        // Assuming `res.data` contains the flashcards you want to set
        
      })
      .catch(error => {
        console.error('Error fetching flashcards:', error);
      });
  }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount
  

  function decodeString(str){
    const textArea= document.createElement('textarea')
    textArea.innerHTML = str;
    return textArea.value
  }

  return (
    <div className='container'>
    <FlashCardList flashcards ={flashcards} />
    </div>
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
