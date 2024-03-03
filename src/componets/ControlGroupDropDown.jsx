import React from 'react'

const ControlGroupDropDown = ({ name, value, options, image, update, onImageClick }) => {

  console.log(typeof (options), options);

  const handleChange = (e) => {
    update(e.target.value);
  }

  return (
    <div
      className='control-group'>
      <div className='control-icon'
      >
        <img
          src={image}
          alt={name}
          onDoubleClick={onImageClick}
        ></img>

      </div>
      <select value={value} onChange={handleChange}>
        {
          options.map((option) => (
            <option key={option} value={option}>{option}</option>

          )
          )
        }
      </select>
    </div>
  )
}

export default ControlGroupDropDown