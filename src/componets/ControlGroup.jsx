import React from 'react'
import DimensionUnits from './DimensionUnits';

const ControlGroup = ({ name, value, image, update, minValue, onIconClick }) => {

  return (
    <div
      className='control-group'>
      <div className='control-icon'
        onDoubleClick={onIconClick}
      >
        <img src={image} alt={name} ></img>

      </div>
      <DimensionUnits
        id={name}
        dimension={value}
        onUpdate={update}
        minVal={minValue} />
    </div>
  )
}

export default ControlGroup