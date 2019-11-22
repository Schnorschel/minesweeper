import React from 'react'

const Mine = props => {
  return (
    // prettier-ignore
    <button
      className={'square pure-button rowCol' + ('0' + props.row).slice(-2) + ('0' + props.col).slice(-2)}
      onMouseDown={e => { props.handleFieldClick(props.row, props.col, e.button)
      }}
      onContextMenu={e => { e.preventDefault() }} 
    >
      {props.field === ' ' ? '.' : props.field}
    </button>
  )
}

export default Mine
