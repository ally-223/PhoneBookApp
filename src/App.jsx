
// part 2 c ---------------- getting data from server (currently a local json file)

// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import Note from './components/Note'


// const App = () => {
//   const [notes, setNotes] = useState([])
//   const [newNote, setNewNote] = useState('')
//   const [showAll, setShowAll] = useState(true)


//   useEffect(() => {
//     console.log('effect')
//     axios
//       .get('http://localhost:3001/notes')
//       .then(response => {
//         console.log('promise fulfilled')
//         setNotes(response.data)
//       })
//   }, [])
//   console.log('render', notes.length, 'notes')

//   // ...
// }


// part 2 d ------------------ phone book

import { useState, useEffect } from 'react';
import Note from './components/Note';
import axios from 'axios';
import noteService from './services/phone';
import { v4 as uuidv4 } from 'uuid';

const baseUrl = 'http://localhost:3001/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filter, setFilter] = useState('');
  const [filterText, setFilterText] = useState('');

  const deleteItem = (id) => {
    if (window.confirm("Do you really want to delete this item?")) {
      axios
        .delete(`${baseUrl}/${id}`)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.error('Failed to delete the item:', error);
        });
    }
  };

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch persons:', error);
      });
  }, []);

  const addItem = (event) => {
    event.preventDefault();
    const id = uuidv4();
    const nameObject = {
      id,
      name: newName,
      num: newNum
    };

    if (persons.some(person => person.name === newName) ||
        persons.some(person => person.num === newNum)) {
      alert(`${newName} or ${newNum} is already added to phonebook`);
      return;
    }

    noteService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data));
        setNewName('');
        setNewNum('');
      })
      .catch(error => {
        console.error('Failed to add new item:', error);
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const applyFilter = (event) => {
    event.preventDefault();
    setFilter(filterText);
  };

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      
      <form onSubmit={applyFilter}>
        <div>
          filter shown with <input
            value={filterText}
            onChange={handleFilterChange}
          />
          <button type="submit">filter</button>
        </div>
      </form>

      <form onSubmit={addItem}>
        <div>
          <div>name: <input
            value={newName}
            onChange={handleNameChange}
          /></div>

          <div>phone: <input
            value={newNum}
            onChange={handleNumChange}
          /></div>
        
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => 
          <Note 
            key={person.id} 
            id={person.id} 
            name={person.name} 
            num={person.num} 
            deleteItem={deleteItem} 
          />
        )}
      </ul>
    </div>
  );
};

export default App;























// ------ part 2 react
// import Note from './components/Note'


// // const Note = ({ note }) => {
// //   return (
// //     <li>{note.content}</li>
// //   )
// // }


// const App = (props) => {
//   const { notes } = props

//   return (
//     <div>
//       <h1>Notes</h1>
//       <ul>
//       {notes.map(note => 
//         <Note key={note.id} note={note}/>
//         )}
//       </ul>
//     </div>
//   )
// }

// export default App

// ------ part 1 react


// import { useState } from 'react';

// const Header = (props) => {
  
//   return (
//     <div><h1>{props.text}</h1></div>
   
//   );
// };

// const FindAvg = ({ good, neutral, bad }) => {
//   const total = good + neutral + bad;
//   const average = total > 0 ? (good - bad) / total : 0;
//   return (
//     <div>
//       {total}
//     </div>
//   );
// };

// const Display = ({ good, neutral, bad }) => {
//   if (good === 0 && neutral === 0 && bad === 0) {
//     return (
//       <p>no feedback</p>
//     ) 
//   }else{
//     return (
//       <div>
//         <p>good {good}</p>
//         <p>neutral {neutral}</p>
//         <p>bad {bad}</p>
//         <p>average <FindAvg good={good} neutral={neutral} bad={bad} /></p>
//       </div>
//     )
//   }
// }


// const App = () => {
//   const [good, setGood] = useState(0);
//   const [neutral, setNeutral] = useState(0);
//   const [bad, setBad] = useState(0);

//   return (
//     <div>
//       <Header text="give feedback" />
//       <button onClick={() => setGood(good + 1)}>good</button>
//       <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
//       <button onClick={() => setBad(bad + 1)}>bad</button>
//       <Header text="statistics" />
//       <Display good={good} neutral={neutral} bad={bad} />
//     </div>
//   );
// };

// export default App;
