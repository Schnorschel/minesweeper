import React from 'react'

const Mine = props => {
  return (
    // prettier-ignore
    <button
      className={ (props.field === ' ' ? 'fieldButton' : 'fieldSquare') + props.difficulty + ' square' + props.difficulty + ' pure-button rowCol' + ('0' + props.row).slice(-2) + ('0' + props.col).slice(-2)}
      onMouseDown={e => { props.handleFieldClick(props.row, props.col, e.button)
      }}
      onContextMenu={e => { e.preventDefault() }} 
    >{ props.field === ' ' || props.field === '_' ? <>&nbsp;</> : 
       props.field === '*' && props.gameState === 'won' ? <i class="fas fa-bomb greenbomb"></i> : 
       props.field === '@' ? <i class="fas fa-bomb greenbomb"></i> : 
       props.field === 'F' ? <i class="fab fa-font-awesome-flag"></i> : 
       props.field === '*' ? <i class="fas fa-bomb redbomb"></i> : 
       !isNaN(props.field) ? <span className='number'>{props.field}</span> : props.field }</button>
  )
}
export default Mine
