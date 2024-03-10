import React, { useEffect, useState } from 'react'
import shine from '../Images/shine.png'

const FlexElement = ({ elements, parent, setSelected, selected }) => {
    const [childs, setChilds] = useState([]);
    const [toolTip, setToolTip] = useState('');

    useEffect(() => {
        const found = elements.filter((element) => element.parent === parent);
        setChilds(found);
    }, [elements, parent])

    return (
        childs.length > 0 ? (
            <>
                {
                    childs.map((element) => {
                        switch (element.type) {
                            case 'div':
                                return <div key={element.id}
                                    id={element.id}
                                    className={element.id === selected ? 'selected' : (element.parent === selected ? 'selectedParent' : '')}
                                    onClick={(ev) => { ev.stopPropagation(); setSelected(element.id); }}
                                    onDoubleClick={(ev) => { ev.stopPropagation(); if (element.parent !== 0) { setSelected(element.parent) } }}
                                    style={element.style}
                                >
                                    {
                                        element.value
                                    }

                                    <FlexElement elements={elements}
                                        parent={element.id}
                                        setSelected={setSelected}
                                        selected={selected} />
                                </div>;
                            case 'input':
                                return <input id={element.id}
                                    value={element.type}
                                    className={element.id === selected ? 'selected' : (element.parent === selected ? 'selectedParent' : '')}
                                    onClick={(ev) => { ev.stopPropagation(); setSelected(element.id); }}
                                    onDoubleClick={(ev) => { ev.stopPropagation(); if (element.parent !== 0) { setSelected(element.parent) } }}
                                    style={element.style} />;
                            case 'img':
                                return <img
                                    id={element.id}
                                    src={shine}
                                    alt={element.type}
                                    className={element.id === selected ? 'selected' : (element.parent === selected ? 'selectedParent' : '')}
                                    onClick={(ev) => { ev.stopPropagation(); setSelected(element.id); }}
                                    onDoubleClick={(ev) => { ev.stopPropagation(); if (element.parent !== 0) { setSelected(element.parent) } }}
                                    style={element.style} />;
                            default:
                                return null; // or handle other types as needed
                        }

                    }
                        
                    )
                }
            </>
        ) : null
    )
}

export default FlexElement