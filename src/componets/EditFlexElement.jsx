import React, { useState } from 'react'
import { RgbColorPicker } from 'react-colorful';
import Width from '../Images/w.png';
import Height from '../Images/h.png';
import Row from '../Images/row.png';
import Column from '../Images/column.png';
import Gap from '../Images/gap.png';
import FontSize from '../Images/fontSize.png';
import ControlGroup from './ControlGroup';
import Background from '../Images/bg.png';
import Color from '../Images/color.png';
import MarginAll from '../Images/marginAll.png';
import MarginTop from '../Images/marginTop.png';
import MarginBottom from '../Images/marginBottom.png';
import MarginLeft from '../Images/marginLeft.png';
import MarginRight from '../Images/marginRight.png';
import PaddingAll from '../Images/paddingAll.png';
import PaddingTop from '../Images/paddingTop.png';
import PaddingBottom from '../Images/paddingBottom.png';
import PaddingLeft from '../Images/paddingLeft.png';
import PaddingRight from '../Images/paddingRight.png';
import AlignItems from '../Images/AlignItems.png';
import JustifyContent from '../Images/JustifyContent.png';
import TextAlign from '../Images/TextAlign.png';
import Border from '../Images/border.png';
import BorderColor from '../Images/borderColor.png';
import BorderStyle from '../Images/borderStyle.png';
import BorderWidth from '../Images/borderWidth.png';

import { alignItems, justifyContent, textAlign, fontFamily, borderStyle } from './Constants';


import ControlGroupDropDown from './ControlGroupDropDown';
import { PageState } from '../utils/PageStates';

const EditFlexElement = ({ element, updateEelement }) => {

  const [state, setState] = useState(PageState.SHOW_DIMENSIONS);

  const [highLighted, setHighLighted] = useState(0);

  const [marginGroup, setMarginGroup] = useState(true);
  const [paddingGroup, setPaddingGroup] = useState(true);
  const [showBGColor, setshowBGColor] = useState(false);
  const [showColor, setshowColor] = useState(false);
  const [borderGroup, setBorderGroup] = useState(true);

  function handleChange(e) {
    console.log("handleChange", element.id, e.target.id, e.target.value);
    updateEelement(element.id, e.target.id, e.target.value);
  }

  function handleStyleChange(name, value) {
    const newStyle = { ...element.style, [name]: value }
    updateEelement(element.id, "style", newStyle);
  }


  function removeStyle(nameList) {

    let newStyle = { ...element.style };
    nameList.forEach((name) => {
      delete newStyle[name];
    })
    updateEelement(element.id, "style", newStyle);
  }

  function addInitDimensions() {
    const newStyle = { ...element.style, 'width': '100px', 'height': '30px' }
    updateEelement(element.id, "style", newStyle);
  }

  function addInitGap() {
    const newStyle = { ...element.style, 'gap': '5px' }
    updateEelement(element.id, "style", newStyle);
  }

  function setFlexDirection(dir) {
    const updatedStyle = { ...element.style, 'display': 'flex', 'flexDirection': dir };
    updateEelement(element.id, "style", updatedStyle);
  }

  const handleMouseEnter = (id) => {
    console.log(id);
    setHighLighted(id);
  }

  const handleMouseLeave = () => {
    setHighLighted(0);
  }


  const onPaddingGroupClick = (e) => {
    if (paddingGroup) {
      removeStyle(["padding"]);
    }
    else {
      removeStyle(["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"]);
    }
    setPaddingGroup(!paddingGroup);
  }

  const onMarginGroupClick = (e) => {
    if (marginGroup) {
      removeStyle(["margin"]);
    }
    else {
      removeStyle(["marginTop", "marginBottom", "marginLeft", "marginRight"]);
    }
    setMarginGroup(!marginGroup);
  }

  const hanldeColorChange = (name, e) => {
    const bgcolor = objectToRGB(e);
    handleStyleChange(name, bgcolor);
  }

  function objectToRGB(obj) {
    const { r, g, b } = obj;
    return `rgb(${r}, ${g}, ${b})`;
  }

  // Function to convert RGB color string to object
  function RGBtoObject(rgb) {
    const regex = /rgb\((\d+), (\d+), (\d+)\)/;
    const match = rgb.match(regex);

    if (match) {
      const [, r, g, b] = match;
      return { r: parseInt(r), g: parseInt(g), b: parseInt(b) };
    } else {
      // Handle invalid RGB color string
      throw new Error('Invalid RGB color string');
    }
  }

  return (
    <div className='flexForm'>

      <div>
        <input type="text"
          className='flexElementValue'
          id="value"
          value={element.value}
          onChange={handleChange}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />

      </div>


      <div className="control-icon">
        {
          (element.style.flexDirection && element.style.flexDirection === 'row') ?
            (
              <img src={Row} alt="row" onClick={() => setFlexDirection('column')}></img>
            )
            :
            (
              <img src={Column} alt="column" onClick={() => setFlexDirection('row')}></img>
            )
        }
      </div>

      {
        state === PageState.SHOW_DIMENSIONS && (
          <div className='section-group'>
            <div className='section-group-title'
              onDoubleClick={() => setState(PageState.INIT)}
            >
              dimensions
            </div>
            <div>
              <ControlGroup
                name="width"
                value={element.style.width}
                image={Width}
                update={(newValue) => handleStyleChange('width', newValue)}
                minValue={10} />
            </div>

            <div>
              <ControlGroup
                name="height"
                value={element.style.height}
                image={Height}
                update={(newValue) => handleStyleChange('height', newValue)}
                minValue={10} />
            </div>
          </div>
        )

      }

      {
        state !== PageState.SHOW_DIMENSIONS && (
          <div className='section-group'>
            <div
              className='section-group-title'
              onClick={() => setState(PageState.SHOW_DIMENSIONS)}>
              dimensions
            </div>
          </div>
        )
      }

      {
        state === PageState.SHOW_MARGIN && (

          <div className='section-group'>
            <div className='section-group-title'>
              margins
            </div>
            <div>
              <ControlGroup
                name="gap"
                value={element.style.gap}
                image={Gap}
                update={(newValue) => handleStyleChange('gap', newValue)}
                minValue={0} />
            </div>

            {
              marginGroup && (
                <div>
                  <ControlGroup
                    name="margin"
                    value={element.style.margin}
                    image={MarginAll}
                    update={(newValue) => handleStyleChange('margin', newValue)}
                    minValue={0}
                    onIconClick={onMarginGroupClick}
                  />
                </div>

              )}

            {
              !marginGroup && (
                <div className='directionGroup'>
                  <ControlGroup
                    name="marginTop"
                    value={element.style.marginTop}
                    image={MarginTop}
                    update={(newValue) => handleStyleChange('marginTop', newValue)}
                    minValue={0}
                    onIconClick={onMarginGroupClick}
                  />
                  <ControlGroup
                    name="marginBottom"
                    value={element.style.marginBottom}
                    image={MarginBottom}
                    update={(newValue) => handleStyleChange('marginBottom', newValue)}
                    minValue={0}
                    onIconClick={onMarginGroupClick}
                  />
                  <ControlGroup
                    name="marginLeft"
                    value={element.style.marginLeft}
                    image={MarginLeft}
                    update={(newValue) => handleStyleChange('marginLeft', newValue)}
                    minValue={0}
                    onIconClick={onMarginGroupClick}
                  />
                  <ControlGroup
                    name="marginRight"
                    value={element.style.marginRight}
                    image={MarginRight}
                    update={(newValue) => handleStyleChange('marginRight', newValue)}
                    minValue={0}
                    onIconClick={onMarginGroupClick}
                  />
                </div>
              )
            }

            {
              paddingGroup && (
                <div>
                  <ControlGroup
                    name="padding"
                    value={element.style.padding}
                    image={PaddingAll}
                    update={(newValue) => handleStyleChange('padding', newValue)}
                    minValue={0}
                    onIconClick={onPaddingGroupClick}
                  />
                </div>

              )
            }
            {
              !paddingGroup && (
                <div className='directionGroup'>
                  <ControlGroup
                    name="paddingTop"
                    value={element.style.paddingTop}
                    image={PaddingTop}
                    update={(newValue) => handleStyleChange('paddingTop', newValue)}
                    minValue={0}
                    onIconClick={onPaddingGroupClick}
                  />
                  <ControlGroup
                    name="paddingBottom"
                    value={element.style.paddingBottom}
                    image={PaddingBottom}
                    update={(newValue) => handleStyleChange('paddingBottom', newValue)}
                    minValue={0}
                    onIconClick={onPaddingGroupClick}
                  />
                  <ControlGroup
                    name="paddingLeft"
                    value={element.style.paddingLeft}
                    image={PaddingLeft}
                    update={(newValue) => handleStyleChange('paddingLeft', newValue)}
                    minValue={0}
                    onIconClick={onPaddingGroupClick}
                  />
                  <ControlGroup
                    name="paddingRight"
                    value={element.style.paddingRight}
                    image={PaddingRight}
                    update={(newValue) => handleStyleChange('paddingRight', newValue)}
                    minValue={0}
                    onIconClick={onPaddingGroupClick}
                  />
                </div>
              )
            }
          </div>
        )
      }

      {
        state !== PageState.SHOW_MARGIN && (
          <div className='section-group'>
            <div
              className='section-group-title'
              onClick={() => setState(PageState.SHOW_MARGIN)}>
              margin
            </div>
          </div>
        )
      }

      {
        state === PageState.SHOW_ALIGMENT && (
          <div className='section-group'>
            <div className='section-group-title'>
              alignment
            </div>

            <div>
              <ControlGroupDropDown
                name="alignItems"
                value={element.style.alignItems}
                options={alignItems}
                image={AlignItems}
                update={(newValue) => handleStyleChange('alignItems', newValue)}
                onImageClick={() => removeStyle(["alignItems"])}
              />
            </div>

            <div>
              <ControlGroupDropDown
                name="justifyContent"
                value={element.style.justifyContent}
                options={justifyContent}
                image={JustifyContent}
                update={(newValue) => handleStyleChange('justifyContent', newValue)}
                onImageClick={() => removeStyle(["justifyContent"])}
              />
            </div>

            <div>
              <ControlGroupDropDown
                name="textAlign"
                value={element.style.textAlign}
                options={textAlign}
                image={TextAlign}
                update={(newValue) => handleStyleChange('textAlign', newValue)}
                onImageClick={() => removeStyle(["textAlign"])}
              />
            </div>
          </div>
        )
      }

      {
        state !== PageState.SHOW_ALIGMENT && (
          <div className='section-group'>
            <div
              className='section-group-title'
              onClick={() => setState(PageState.SHOW_ALIGMENT)}>
              alignment
            </div>
          </div>
        )
      }

      {
        state === PageState.SHOW_FONT && (
          <div className='section-group'>
            <div
              className='section-group-title'
            >
              font
            </div>

            <div>
              <ControlGroupDropDown
                name="fontFamily"
                value={element.style.fontFamily}
                options={fontFamily}
                image={FontSize}
                update={(newValue) => handleStyleChange('fontFamily', newValue)}
                onImageClick={() => removeStyle(["fontFamily"])}
              />
            </div>

            <div>
              <ControlGroup
                name="fontSize"
                value={element.style.fontSize}
                image={FontSize}
                update={(newValue) => handleStyleChange('fontSize', newValue)}
                minValue={10}
                onImageClick={() => removeStyle(["fontSize"])}
              />
            </div>
          </div>
        )
      }



      {
        state !== PageState.SHOW_FONT && (
          <div className='section-group'>
            <div
              className='section-group-title'
              onClick={() => setState(PageState.SHOW_FONT)}>
              font
            </div>
          </div>
        )
      }



      {
        state === PageState.SHOW_BORDERS && (
          <div className='section-group'>
            <div className='section-group-title'>
              borders
            </div>
            <div>
              <ControlGroup
                name="borderWidth"
                value={element.style.borderWidth}
                image={BorderWidth}
                update={(newValue) => handleStyleChange('borderWidth', newValue)}
                minValue={0}
                onIconClick={() => removeStyle(["borderWidth"])}
              />
            </div>

            <div>
              <ControlGroupDropDown
                name="borderStyle"
                value={element.style.borderStyle}
                options={borderStyle}
                image={BorderStyle}
                update={(newValue) => handleStyleChange('borderStyle', newValue)}
                onImageClick={() => removeStyle(["borderStyle"])}
              />
            </div>

            <div className='control-group'>
              <div className='control-icon'>
                <img src={BorderColor} alt="color" onClick={() => removeStyle(["borderColor"])}></img>
              </div>
              <RgbColorPicker onChange={(e) => hanldeColorChange("borderColor", e)} />
            </div>

            <div>
              <ControlGroup
                name="borderRadius"
                value={element.style.borderRadius}
                image={Border}
                update={(newValue) => handleStyleChange('borderRadius', newValue)}
                minValue={0}
                onIconClick={() => removeStyle(["borderRadius"])}
              />
            </div>
          </div>
        )
      }

      {
        state !== PageState.SHOW_BORDERS && (
          <div className='section-group'>
            <div
              className='section-group-title'
              onClick={() => setState(PageState.SHOW_BORDERS)}>
              borders
            </div>
          </div>

        )
      }

      {
        state === PageState.SHOW_COLORS && (
          <div className='section-group'>
            <div
              className='section-group-title'
            >
              colors
            </div>
            <div className='control-group'>
              <div className='control-icon'>
                <img src={Background} alt="background" onClick={() => setshowBGColor(!showBGColor)}></img>
              </div>
              <RgbColorPicker onChange={(e) => hanldeColorChange("backgroundColor", e)} />

            </div>

            <div className='control-group'>
              <div className='control-icon'>
                <img src={Color} alt="color" onClick={() => setshowColor(!showColor)}></img>
              </div>
              <RgbColorPicker onChange={(e) => hanldeColorChange("color", e)} />
            </div>
          </div>
        )
      }

      {
        state !== PageState.SHOW_COLORS && (
          <div className='section-group'>
            <div
              className='section-group-title'
              onClick={() => setState(PageState.SHOW_COLORS)}>
              colors
            </div>
          </div>
        )
      }



    </div>
  )
}

export default EditFlexElement