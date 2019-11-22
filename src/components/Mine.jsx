import React from 'react'

const Mine = props => {
  return (
    // prettier-ignore
    <button
      className={'square pure-button rowCol' + ('0' + props.row).slice(-2) + ('0' + props.col).slice(-2)}
      onMouseDown={e => { props.handleFieldClick(props.row, props.col, e.button)
        // e.button == 0 ? props.handleCheckField : props.handleFlagField
        // switch (e.button) {
        //   case '0': props.handleCheckField
        //             break
        //   case '2': props.handleFlagField
        //             break
        // }
        // 
        // console.log(props.row + ',' + props.col + ',' + e.button)
      }}
      onContextMenu={e => { e.preventDefault() }} onClick={() => {}}
    >
      {props.field === ' ' ? '.' : props.field}
      {/* {props.row + ',' + props.col} */}
    </button>
  )
}

export default Mine
