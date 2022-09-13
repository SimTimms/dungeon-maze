import React, { useState, useEffect } from 'react';
import './App.css';
import { DungeonGrid } from './components/DungeonGrid';
import { IPlayer } from './interface/IPlayer';
import { IGridItem } from './interface/IGridItem';
import { IGridSize } from './interface/IGridSize';
import { replaceWalkable } from './helpers/replaceWalkable';
import Lives from './components/Lives';
import Battle from './components/Battle';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { defaultPlayerVars } from './const';

import { placeRandomNodes } from './helpers/placeRandomNodes';
//Does this need to be Global Scope?

function App() {
  //State - Do all changes require a re-render of the entire map
  //Yes: Needs to redraw whole map
  const [nbrNodes, setNbrNodes] = useState<string>('1');
  //Yes: Loads all tiles, items and monsters
  const [loadedMap, setMapLoaded] = useState<IGridItem[][]>([]);
  //Yes: Needs to hide tiles based on LOS
  const [los, setLos] = useState<boolean>(false);
  //Yes: The player needs to move and interact with the mao
  const [player, setPlayer] = useState<IPlayer>(defaultPlayerVars);
  //Yes: The map needs to be redrawn
  const [gridSize, setGridSize] = useState<IGridSize>({ x: 20, y: 20 });
  //Maybe: Monsters need to be redrawn
  const [monsterArr, setMonsterArr] = useState<number[][]>([]);

  useEffect(() => {
    let gridRow: IGridItem[][] = [];
    let monsterArrTemp: number[][] = [];

    placeRandomNodes(gridSize, nbrNodes, monsterArrTemp, gridRow);
    replaceWalkable([player.pos.x, player.pos.y], gridRow);
    if (loadedMap.length === 0) {
      setMapLoaded(gridRow);
    }
  }, [nbrNodes, player, loadedMap]);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: 'flex',
          background: '#353b45',
          height: '100vh',
          width: '100vw',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 0,
            }}
          >
            <input
              value={nbrNodes}
              onChange={(e) => {
                setMapLoaded([]);
                setNbrNodes(e.target.value);
              }}
            />
            <button onClick={() => setLos(los ? false : true)}>LOS</button>
          </div>
          <Lives lives={player.lives} />
          <Battle player={player} />
          <DungeonGrid
            player={player}
            setPlayer={setPlayer}
            gridRow={loadedMap}
            setMapLoaded={setMapLoaded}
            los={los}
            monsterArr={monsterArr}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
