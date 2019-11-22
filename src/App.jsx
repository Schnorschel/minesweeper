import React, { useState, useEffect } from 'react'
import Mine from './components/Mine'
import axios from 'axios'

const App = () => {
  const apiURL = 'https://minesweeper-api.herokuapp.com/games'

  const [mineField, setMineField] = useState([])
  const [gameId, setGameId] = useState(0)
  const [gameState, setGameState] = useState('new')
  const [mines, setMines] = useState(10)

  const createMinefield = async diff => {
    const resp = await axios.post(apiURL, { difficulty: diff })
    setMineField(resp.data.board)
    setGameId(resp.data.id)
    setMines(resp.data.mines)
    // console.log(resp)
  }

  const fetchMinefield = async id => {
    const resp = await axios.get(apiURL)
    setMineField(resp.data.board)
    console.log(resp)
  }

  const playMinefield = async (row, col, mouse) => {
    const play = mouse == 2 ? 'flag' : 'check'
    const apiCall = apiURL + '/' + gameId + '/' + play
    console.log(apiCall + ' id: ' + gameId + ', row: ' + row + ', col: ' + col + '},  mouse= ' + mouse)
    const resp = await axios.post(apiCall, { id: gameId, row: row, col: col })
    setMineField(resp.data.board)
    setGameState(resp.data.state)
    setMines(resp.data.mines)
  }

  const checkField = (row, col) => {
    playMinefield(row, col, 0)
  }
  const flagField = (row, col) => {
    playMinefield(row, col, 2)
  }
  // const checkOrFlagField = (row, col, mouse) => {
  //   switch (mouse) {
  //     case '0':
  //       handleCheckField(row, col)
  //       break
  //     case '2':
  //       props.handleFlagField
  //       break
  //   }
  // }
  // useEffect(() => {
  //   console.log()
  // })

  useEffect(() => {
    // const resp = {
    //   id: 1,
    //   board: [
    //     [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    //     [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    //     [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    //     [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    //     [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    //     [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    //     [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    //     [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    //   ],
    //   state: 'new',
    //   mines: 10,
    // }
    // createMineField(resp.board)
    createMinefield(0)
  }, [])

  return (
    // prettier-ignore
    <section className='allContainer'>
      <section className='gameContainer'>
        <section className='controlsContainer'>
          <section className='minesLeft'>10</section>
          <section className='startGame'><button className='button buttonStart' onClick={(e) => {createMinefield(0)}}>Start</button></section>
          <section className='Timer'>00</section>
        </section>
        <div className='mineContainer'>
          {mineField.map((mineRow, indexRow) => {
            return mineRow.map((field, indexCol) => {
              return (
                <Mine key={('0' + indexRow).slice(-2) + ('0' + indexCol).slice(-2)} row={indexRow} col={indexCol} field={field}
                      handleFieldClick = {playMinefield}
                      // handleCheckField={ () => { checkField(indexRow,indexCol)}}
                      // handleFlagField={ () => { flagField(indexRow,indexCol)}} 
                      />
              )
            })
          })}
        </div>
      </section>
    </section>
  )
}

export default App
