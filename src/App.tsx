import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { DungeonGrid } from './components/DungeonGrid';
import { IPlayer } from './interface/IPlayer';
import { IGridItem } from './interface/IGridItem';
import { IGridSize } from './interface/IGridSize';
import { revealPath } from './helpers/revealPath';
import Lives from './components/Lives';
import Gold from './components/Gold';
import Ore from './components/Ore';
import Battle from './components/Battle';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { defaultPlayerVars } from './const';
import { placeRandomNodes } from './helpers/placeRandomNodes';
import { useStyles } from './styles';
import logo from './assets/reactiveWeb.png';
import { Typography } from '@mui/material';
//Does this need to be Global Scope?

function App() {
  //State - Do all changes require a re-render of the entire map
  //Yes: Needs to redraw whole map
  const [nbrNodes, setNbrNodes] = useState<string>('1');
  //Yes: Loads all tiles, items and monsters
  const [loadedMap, setMapLoaded] = useState<IGridItem[][]>([]);
  //Yes: Needs to hide tiles based on LOS
  const [los, setLos] = useState<boolean>(false);
  const [floorColor, setFloorColor] = useState<string>('#e5bb63');
  //Yes: The player needs to move and interact with the mao
  const [player, setPlayer] = useState<IPlayer>(defaultPlayerVars);
  //Yes: The map needs to be redrawn
  const [gridSize, setGridSize] = useState<IGridSize>({ x: 10, y: 20 });
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
  }, [nbrNodes, player, loadedMap, floorColor]);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <div className={classes.flexColumn}>
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <img src={logo} style={{ width: 200, marginBottom: 20 }} />
          </div>
          <div className={classes.optionWrapper}>
            <input
              value={nbrNodes}
              onChange={(e) => {
                setMapLoaded([]);
                setNbrNodes(e.target.value);
              }}
              style={{ width: 40 }}
            />
            <button onClick={() => setLos(los ? false : true)}>LOS</button>
            <button
              onClick={() =>
                setFloorColor(
                  floorColor === '#e5bb63'
                    ? '#67c8f2'
                    : floorColor === '#67c8f2'
                    ? '#b2c0f2'
                    : '#e5bb63'
                )
              }
              style={{
                width: 40,
                height: 40,
                background: floorColor,
                border: 'none',
                borderRadius: 4,
              }}
            ></button>
          </div>
          <div className={classes.flexRow}>
            <Lives lives={player.lives} />
            <Battle player={player} gridRow={loadedMap} />
            <Gold gold={player.gold} />
            <Ore ore={player.ore} />
          </div>
          <DungeonGrid
            player={player}
            setPlayer={setPlayer}
            gridRow={loadedMap}
            setMapLoaded={setMapLoaded}
            los={los}
            monsterArr={monsterArr}
            floorColor={floorColor}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
