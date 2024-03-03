import React, { useEffect, useState } from 'react'
import EditFlexElement from './EditFlexElement'
import Plus from '../Images/plus.png';

const ToolsPanel = ({ addElement, updateElements, selected, elements, removeElement }) => {
  const [element, setElement] = useState({ id: 10, value: "init", style: {} });

  useEffect(() => {
    const found = elements.find((element) => element.id === selected);
    console.log(typeof (found), found);
    setElement(found);

  }, [elements, selected,]);

  const updateElement = (id, name, value) => {
    updateElements(id, name, value);
  }

  return (
    <div className="tools">
      <div>
        <div>
          selected: {element.id}
        </div>
        <div >
          <img className='control-icon'
            src={Plus}
            alt="add"
            onClick={() => addElement()}>

          </img>

        </div>
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