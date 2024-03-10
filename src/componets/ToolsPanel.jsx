import React, { useEffect, useState } from 'react'
import EditFlexElement from './EditFlexElement'
import { elementTypes } from './Constants';
import Plus from '../Images/plus.png';

const ToolsPanel = ({ addElement, updateElements, selected, elements, removeElement }) => {
  const [element, setElement] = useState({ id: 10, value: "init", style: {} });
  const [selectedType, setselectedType] = useState("div");


  useEffect(() => {
    const found = elements.find((element) => element.id === selected);
    setselectedType("div");
    setElement(found);

  }, [elements, selected,]);

  const updateElement = (id, name, value) => {
    updateElements(id, name, value);
  }

  function handleSelectTypeChnage(ev) {
    setselectedType(ev.target.value);
  }

  return (
    <div className="tools">
      <div>
        <div>
          selected: {element.id}
        </div>
        {
          element.type === 'div' && (
            <div className='control-group'>
              <img className='control-icon'
                src={Plus}
                alt="add"
                onClick={() => addElement(selectedType)}>

              </img>
              <select
                value={selectedType}
                onChange={handleSelectTypeChnage}
              >
                {
                  elementTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))
                }
              </select>
            </div>
          )
        }
      </div>
      <div>
        <EditFlexElement
          element={element}
          updateEelement={updateElement} />
      </div>
      <div>
        <button onClick={() => removeElement()}>remove</button>
      </div>
    </div>
  )
}

export default ToolsPanel