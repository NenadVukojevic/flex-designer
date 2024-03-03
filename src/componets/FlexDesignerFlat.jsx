import React, { useState } from 'react'
import '../FlexDesigner.css'
import FlexElement from './FlexElement';
import ToolsPanel from './ToolsPanel';
import HTMLCode from './HTMLCode';
import CSSCode from './CSSCode';

const FlexDesignerFlat = () => {
    const [elements, setElements] = useState([
        {
            id: 1,
            type: "div",
            parent: 0,
            value: "",
            style: { display: 'flex', flexDirection: 'row' }
        }
    ]);
    const [selected, setSelected] = useState(1);
    const [nextId, setNextId] = useState(4);

    const addElement = () => {
        const nextElement = {
            id: `element-${nextId}`,
            type: "div",
            parent: selected,
            value: nextId,
            style: {
                width:"100px",
                height: "40px",
            }
        };
        setNextId(nextId + 1);
        setElements([...elements, nextElement]);

    }

    const removeElement = () =>{
        if(selected === 1)
        {
            return;
        }
        const filtered = elements.filter((element)=> element.id !== selected);
        setElements(filtered);
        setSelected(1)
    }

    const updateElement = (id, name, value) => {
        setElements((previous) =>
            previous.map((element) => element.id === id ? { ...element, [name]: value } : element)
        )
    }

    return (
        <div className="work_area">

            <ToolsPanel
                addElement={addElement}
                updateElements={updateElement}
                selected={selected}
                elements={elements}
                removeElement={removeElement}/>

            <div id="resultPanel">
                <FlexElement elements={elements}
                    parent={0}
                    setSelected={setSelected}
                    selected={selected} />
            </div>

            <div id="codePanel">
                <HTMLCode 
                    source={elements}
                />
                <CSSCode 
                    source={elements}
                />
            </div>
        </div>
    )
}

export default FlexDesignerFlat