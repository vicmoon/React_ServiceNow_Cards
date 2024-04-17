import React, {useState, useEffect, useRef} from 'react'; 
import './App.css';
import FlashCardList from './FlashCardList';
import axios from 'axios'; 

function App() {
  const [flashcards, setFlashCards] = useState([]);
  const[categories, setCategories] = useState([]); 
  const categoryEl = useRef();
  const amountEL = useRef(); 
  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
    .then(res => {
      setCategories(res.data.trivia_categories); 
    })

  }, [])
  
  useEffect(() => {
  
  }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount
  

  function decodeString(str){
    const textArea= document.createElement('textarea')
    textArea.innerHTML = str;
    return textArea.value
  }


  function handleSubmit(e){
    e.preventDefault();
    axios.get('https://opentdb.com/api.php', {
      params:{
        amount: amountEL.current.value,
        category: categoryEl.current.value
      }
  })
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


  }


  return (
    <> 
    <form className='header' onSubmit={handleSubmit}>
     <div className='form-group'>
       <label htmlFor='category'> Category</label>
        <select id='category' ref={categoryEl}>
          {categories.map(category => {
            return <option value={category.id} key= {category.id}>{category.name}</option>
          })}
        </select>
     </div>
     <div className='form-group'>
        <label htmlFor='amount' > Number Questions </label>
        <input type='number' id='amount' min= '1' step='1' defaultValue={5} ref= {amountEL}></input>
     </div>
     <div className='form-group'>
       <button className='btn'> Generate </button>
     </div>
     
    </form>
      <div className='container'>
      <FlashCardList flashcards ={flashcards} />
      </div>
    </>
  );
}


export default App;
