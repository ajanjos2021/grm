import { useState } from "react";

function Form({ items, setItems, addInHistory, setShowForm, history}) {
    
    const [selectedFirst, setSelectedFirst] = useState();

    const [selectedSecond, setSelectedSecond] = useState();

    const [firstValue, setFirstValue] = useState("");

    const [secondValue, setSecondValue] = useState("");

    const [error, setError] = useState('');

    function saveFirstChoice(event) {
        setSelectedFirst(Number(event.target.value))
    };
    
    function saveSecondChoice(event) {
        setSelectedSecond(Number(event.target.value))
    };

    function saveValueforFirstItem(event) {
        setFirstValue(Number(event.target.value))
    };

    function saveValueForSecondItem(event) {
        setSecondValue(Number(event.target.value))
    };

    function validate() {
        if (!firstValue || !secondValue || !selectedFirst || !selectedSecond || firstValue === secondValue || typeof firstValue !== 'number' || typeof secondValue !== 'number') {
        setError('Please enter the valid information');
        return true;
        }
        return false;
    };

    function submit() {

        const errorExists = validate();
        if (errorExists) {
            return;
        };

        let betterItem = firstValue > secondValue ? selectedFirst : selectedSecond
        let updatedItems = items.map(item => {
            if (item.position === betterItem) {
                return ({
                    ...item,
                    score: item.score + 1
                })
            }
            return item;
        });

        let sortedItems = updatedItems.sort((a, b) => {
            return b.score - a.score;
        });
    
        setItems(sortedItems);
        addInHistory(selectedFirst, selectedSecond);
        setShowForm(false); 
    };
    
    return (
          <div style={{ backgroundColor:'white', position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', width: '400px', height: '400px', margin: 'auto', border: '1px solid black', display:'flex', justifyContent:'center', alignItems:'center' }}>
          <div>
              <div>
              <select style={{width:'156px', marginRight:'24px', marginBottom:'20px'}} onChange={saveFirstChoice}>
                <option value='' disabled selected={true}>Choose first item</option>
                {items.map(item => {
                  if (item.position === selectedSecond) {
                    return null;
                  }
                  const checkingItems = history.filter(note => {
                    const [first, second] = note;
                    if (item.position === first && selectedSecond === second)
                      return true;
                    if (item.position === second && selectedSecond === first)
                      return true;
                    return false;
                  })
                 
                   if(checkingItems.length !== 0)
		                return null;
                  return (
                  <option key={`${item.name}_option1`} value={item.position} selected={item.position === selectedFirst}>{item.name}</option>)
                })}
                </select>
                  <input style={{ marginRight: '20px' }} placeholder="Enter value" onChange={saveValueforFirstItem} />
              </div>
              <div>
              <select style={{width:'156px', marginRight:'24px'}} onChange={saveSecondChoice}>
                 <option value='' disabled selected={true}>Choose second item</option>
                {items.map(item => {
                  if (item.position === selectedFirst) {
                    return null;
                  }
                   const checkingItems = history.filter(note => {
                    const [first, second] = note;
                    if (item.position === first && selectedFirst === second)
                      return true;
                     if (item.position === second && selectedFirst === first)
                       return true;
                     return false;
                    })
                   if(checkingItems.length !== 0)
		                return null;
                  return (
                  <option key={`${item.name}_option2`} value={item.position} selected={item.position === selectedSecond}>{item.name}</option>)
                })}
              </select>
                <input placeholder="Enter value" onChange={saveValueForSecondItem} />
                </div>
                <button style={{marginTop:'30px'}} onClick={submit}>Submit</button>
            <div>{error}</div>
          </div>
        </div>
    )
};

export default Form;