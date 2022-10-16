import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameList from './components/GameList'
import Game from './components/Game'
import GlobalStyle from './styles/global';


const App: React.FC = () => {

    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                {/* <Route exact path='/' element={<Home/>} /> */}
                <Route path='/games' element={<GameList />} />
                <Route path='/games/:game_url' element={<Game />} />
                <Route path='/games/:game_url/:player_id' element={<Game />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App