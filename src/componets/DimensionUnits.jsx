import React, { useEffect, useState } from 'react'

const DimensionUnits = ({ dimension, units, onUpdate, minVal }) => {


    // State for the edited value and unit
    const [editedValue, setEditedValue] = useState();
    const [editedUnit, setEditedUnit] = useState();

    useEffect(() => {
        try{

            const [value, unit] = dimension.match(/[0-9]+|[^0-9]+/g);
            
            setEditedValue(value);
            setEditedUnit(unit);
        }
        catch(e)
        {
            setEditedUnit('px');
            setEditedValue(0);
        }
        console.log("set for :", dimension);
    }, [dimension])

    // Function to update the parent with the concatenated value and unit
    const updateParent = () => {
        const updatedValue = `${editedValue}${editedUnit}`;
        onUpdate(updatedValue);
    };

    const handleMouseWheel = (e) => {
        setEditedValue((editedValue) => (parseInt(editedValue) - parseInt(e.deltaY / 40)) > minVal ? parseInt(editedValue) - parseInt(e.deltaY / 40) : minVal);
        updateParent();
    }

    return (
        <div className='dimensionUnit'>
            <input
                className='dimensionUnitValue'
                type="text"
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
                onWheel={handleMouseWheel}
                onBlur={updateParent}
            />
            <input
                className='dimensionUnitUnit'
                type="text"
                value={editedUnit}
                onChange={(e) => setEditedUnit(e.target.value)}
                onBlur={updateParent}
            />
        </div>
    )
}

export default DimensionUnits