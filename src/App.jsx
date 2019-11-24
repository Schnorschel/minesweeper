import React, { useState, useEffect } from 'react'
import Mine from './components/Mine'
import axios from 'axios'

const App = () => {
  const apiURL = 'https://minesweeper-api.herokuapp.com/games'

  const [mineField, setMineField] = useState([])
  const [gameId, setGameId] = useState(0)
  const [gameState, setGameState] = useState('new')
  const [mines, setMines] = useState(10)
  const [difficulty, setDifficulty] = useState(0)

  // Create a new minefield from scratch
  const createNewMinefield = async difficulty => {
    console.log('createNewMinefield: difficulty: ' + difficulty)
    const resp = await axios.post(apiURL, { difficulty: difficulty })
    setMineField(resp.data.board)
    setGameId(resp.data.id)
    setGameState(resp.data.state)
    // console.log('gameId: ' + resp.data.id)
    localStorage.setItem('minesweeper', apiURL)
    localStorage.setItem('gameId', resp.data.id)
    setMines(resp.data.mines)
  }

  // Convey the user's move to the API and retrieve the new minefield to display
  const playMinefield = async (row, col, mouse) => {
    const play = mouse === 2 ? 'flag' : 'check'
    const apiCall = apiURL + '/' + gameId + '/' + play
    // console.log(apiCall + ' id: ' + gameId + ', row: ' + row + ', col: ' + col + '},  mouse= ' + mouse)
    const resp = await axios.post(apiCall, { id: gameId, row: row, col: col })
    setMineField(resp.data.board)
    setGameState(resp.data.state)
    setMines(resp.data.mines)
  }

  // Retrieve an existing game and display it
  const getExistingMinefield = async thisGameId => {
    // console.log('getExistingMinefield: difficulty: ' + difficulty + ', gameId: ' + thisGameId)
    const resp = await axios.get(apiURL + '/' + thisGameId)
    // Set the game difficulty depending on board dimension
    switch (resp.data.board[0].length) {
      case 8:
        setDifficulty(0)
        break
      case 16:
        setDifficulty(1)
        break
      case 24:
        setDifficulty(2)
        break
    }
    setMineField(resp.data.board)
    setGameState(resp.data.state)
    setMines(resp.data.mines)
  }

  // The "page-load" event handler
  useEffect(() => {
    // prettier-ignore
    // console.log( 'page Startup: minesweeper: ' + localStorage.getItem('minesweeper') +
    //            ', gameId: ' + localStorage.getItem('gameId') )
    // Check if a previous game exists in local storage.
    // If it does, set the gameId and load the game field.
    if (localStorage.getItem('minesweeper') === apiURL && localStorage.getItem('gameId') != '0') {
      setGameId(localStorage.getItem('gameId'))
      getExistingMinefield(localStorage.getItem('gameId'))
    } else {
      // ... otherwise load a new game
      createNewMinefield(difficulty)
    }
  }, [])

  return (
    // prettier-ignore
    <section className='allContainer'>
      <section className='gameContainer'>
        <h1>Minesweeper</h1>
        <section className='controlsContainer'>
          <section className='minesLeft'>{mines}</section>
          <section className='startGame'>
            <button className='button buttonStart' onClick={(e) => {createNewMinefield(difficulty)}}>New Game</button>&nbsp;
            <select onChange={e => {setDifficulty(e.target.value) 
                                    createNewMinefield(e.target.value)}} 
                    value={difficulty}>
              <option value="0">Easy</option>
              <option value="1">Intermediate</option>
              <option value="2">Expert</option>
            </select>
             { /* ({gameId}) */ } <i class="fas fa-bomb hideme"></i><i class="fab fa-font-awesome-flag hideme"></i> 
          </section>
          <section className={gameState === 'lost' || gameState === 'won' ? 'blinking' : 'hideme'}>You {gameState}!</section>
        </section>
        <div className='outsideMinefieldContainer'>
          <div className='insideMinefieldContainer'>
            {mineField.map((mineRow, indexRow) => {
              return mineRow.map((field, indexCol) => {
                return (
                  <Mine key={('0' + indexRow).slice(-2) + ('0' + indexCol).slice(-2)} 
                        row={indexRow} col={indexCol} 
                        field={field}
                        gameState={gameState}
                        handleFieldClick = {playMinefield}
                        difficulty = {difficulty}
                        />
                )
              })
            })}
          </div>
        </div>
      </section>
    </section>
  )
}

export default App
