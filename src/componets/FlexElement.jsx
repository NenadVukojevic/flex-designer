import React, { useEffect, useState } from 'react'

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
                    childs.map((element) => (
                        <div key={element.id}
                            id={element.id}
                            className={element.id === selected ? 'selected' : (element.parent === selected ? 'selectedParent': '')}
                            onClick={(ev) => { ev.stopPropagation(); setSelected(element.id); }}
                            onDoubleClick={(ev)=>{ev.stopPropagation(); if (element.parent !== 0) {setSelected(element.parent)} }}
                            style={element.style}
                        >
                            {
                                element.value
                            }

                            <FlexElement elements={elements}
                                parent={element.id}
                                setSelected={setSelected}
                                selected={selected} />
                        </div>
                    ))
                }
            </>
        ) : null
    )
}

export default FlexElement