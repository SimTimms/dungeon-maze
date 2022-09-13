import React, { useState, useEffect } from 'react';
import './App.css';
import { DungeonGrid } from './components/DungeonGrid';
import { IPlayer } from './interface/IPlayer';
import { IGridItem } from './interface/IGridItem';
import { IGridSize } from './interface/IGridSize';
import { revealPath } from './helpers/revealPath';
import Lives from './components/Lives';
import Gold from './components/Gold';
import Battle from './components/Battle';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { defaultPlayerVars } from './const';
import { placeRandomNodes } from './helpers/placeRandomNodes';
import { useStyles } from './styles';
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
  //Maybe: Monsters need to be redrawn after battle
  const [monsterArr, setMonsterArr] = useState<number[][]>([]);

  const classes = useStyles();

  useEffect(() => {
    let gridRow: IGridItem[][] = [];
    let monsterArrTemp: number[][] = [];

    //Prevent the map being redrawn on every refresh
    if (loadedMap.length === 0) {
      placeRandomNodes(gridSize, nbrNodes, monsterArrTemp, gridRow);
      revealPath([player.pos.x, player.pos.y], gridRow);
      setMapLoaded(gridRow);
    }
  }, [nbrNodes, player, loadedMap]);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <div className={classes.flexColumn}>
          <div className={classes.optionWrapper}>
            <input
              value={nbrNodes}
              onChange={(e) => {
                setMapLoaded([]);
                setNbrNodes(e.target.value);
              }}
            />
            <button onClick={() => setLos(los ? false : true)}>LOS</button>
          </div>
          <div className={classes.flexRow}>
            <Lives lives={player.lives} />
            <Battle player={player} gridRow={loadedMap} />
            <Gold gold={player.gold} />
          </div>
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
