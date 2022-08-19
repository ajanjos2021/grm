import { useState } from "react";
import Cell from "./components/Cell";
import Form from "./components/Form";

function App() {

  const [items, setItems] = useState([
    { position: 1, name: 'Item1', score: 0 },
    { position: 2, name: 'Item2', score: 0 },
    { position: 3, name: 'Item3', score: 0 },
    { position: 4, name: 'Item4', score: 0 },
    { position: 5, name: 'Item5', score: 0 },
    { position: 6, name: 'Item6', score: 0 },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [history, setHistory] = useState([]);

  function showTheFormToTheUser() {
    setShowForm(true)
  };

  function addInHistory(firstItem, secondItem) {
    setHistory([
      ...history,
      [firstItem,secondItem]
    ])
  }

  return (
    <div>
      <div>
        <div style={{margin:'auto', width:'min-content'}}>
          <div style={{display:'flex'}}>
            <div style={{width:'100px',textAlign:'center'}}>Position</div>
            <div style={{width:'100px',textAlign:'center'}}>Name</div>
            <div style={{width:'100px',textAlign:'center'}}>Score</div>
          </div>
          {items.map((el , i) => (
            <div style={{display:'flex'}} key={`${el.name}_${i}`}>
              <Cell content={i+1} />
              <Cell content={el.name} />
              <Cell content={el.score} />
            </div>
          ))}
        </div>
      </div>
        <div style={{display:'flex', justifyContent:'center', borderTop:'2px solid black', paddingTop:'20px', marginTop:'20px'}}>
          <button onClick={showTheFormToTheUser}>Show form</button>
        </div>
        {showForm && (
          <Form
            items={items}
            setItems={setItems}
            addInHistory={addInHistory}
            setShowForm={setShowForm}
            history={history}
          />
        )}
    </div>
  );
}

export default App;
