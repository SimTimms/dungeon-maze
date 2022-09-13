import { useState, useEffect } from 'react';
import { IDungeonGrid } from '../interface/IDungeonGrid';
import { IGridItem } from '../interface/IGridItem';
import skull from '../assets/skull.png';
import door from '../assets/door.png';
import boots from '../assets/boots.png';
import dice from '../assets/dice.png';
import { replaceMonster } from '../helpers/replaceMonster';
import floor from '../assets/floor.png';
import wall from '../assets/wall.png';
import playerImg from '../assets/player.png';
import { replaceWalkable } from '../helpers/replaceWalkable';
const sightRange = 6;
const surroundingTiles = (xi: number, yi: number) => {
  let sightItems = [];
  for (let i1 = xi - sightRange; i1 <= xi + sightRange; i1++) {
    for (let i2 = yi - sightRange; i2 <= yi + sightRange; i2++) {
      sightItems.push([i1, i2]);
    }
  }
  return sightItems;
};

const isInSight = (
  playerX: number,
  playerY: number,
  tileX: number,
  tileY: number
) => {
  const tilesFound = surroundingTiles(playerX, playerY).map((item) => {
    return item[0] === tileX && item[1] === tileY;
  });
  return tilesFound.filter((item) => item === true).length > 0 ? true : false;
};

export const DungeonGrid = ({
  player,
  setPlayer,
  gridRow,
  setMapLoaded,
  los,
  monsterArr,
}: IDungeonGrid): JSX.Element => {
  console.log('jiiji');
  const [isMonster, setIsMonster] = useState<boolean>(false);
  const weaponRange = 1;
  const checkMonster = (xi: number, yi: number) => {
    for (let i1 = xi - weaponRange; i1 <= xi + weaponRange; i1++) {
      for (let i2 = yi - weaponRange; i2 <= yi + weaponRange; i2++) {
        if (gridRow[i1] && gridRow[i1][i2]) {
          const tile = gridRow[i1][i2];
          if (tile && tile.item && tile.item.name === 'monster') {
            return true;
          }
        }
      }
    }
    return false;
  };

  const clickedMonsterInRange = (
    mx: number,
    my: number,
    px: number,
    py: number
  ) => {
    for (let i1 = px - weaponRange; i1 <= px + weaponRange; i1++) {
      for (let i2 = py - weaponRange; i2 <= py + weaponRange; i2++) {
        if (mx === i1 && my === i2) {
          return true;
        }
      }
    }
    return false;
  };

  function reduceLives(amount: number) {
    setPlayer({ ...player, lives: player.lives - amount });
  }

  function tileClick(
    item2: IGridItem,
    x: number,
    y: number,
    monsterArr: number[][],
    gridRow: IGridItem[][]
  ) {
    replaceWalkable([x, y], gridRow);
    const itemVar = item2.item;
    if (itemVar && itemVar.name === 'monster') {
      clickedMonsterInRange(player.pos.x, player.pos.y, x, y) &&
        replaceMonster(
          [item2.coords[0], item2.coords[1]],
          gridRow,
          monsterArr,
          setMapLoaded,
          setIsMonster,
          reduceLives
        );
    } else if (item2.path === true && item2.walkable) {
      if (!isMonster) {
        setIsMonster(checkMonster(x, y));
        setPlayer({ ...player, pos: { x: x, y: y } });
      }
    }
  }
  useEffect(() => {
    replaceWalkable([player.pos.x, player.pos.y], gridRow);
  }, [player]);

  return (
    <div>
      {gridRow.map((item, i2) => {
        return (
          <div style={{ display: 'flex' }} key={`grid_${i2}`}>
            {item.map((item2, index) => (
              <div
                onClick={() => tileClick(item2, i2, index, monsterArr, gridRow)}
                key={`grid_${index}`}
                style={{
                  border: '1px solid #444',
                  width: 32,
                  height: 32,
                  backgroundColor:
                    item2.walkable === false
                      ? '#222'
                      : item2.node === true
                      ? item2.color
                      : item2.path === true
                      ? '#fff'
                      : '#444',
                  backgroundImage: !item2.walkable
                    ? ''
                    : player.pos.x === i2 && player.pos.y === index && isMonster
                    ? `url(${dice})`
                    : player.pos.x === i2 && player.pos.y === index
                    ? `url(${playerImg})`
                    : i2 === 0 && index === 0
                    ? `url(${door})`
                    : item2.node && item2.item
                    ? `url(${item2.item.img})`
                    : item2.node
                    ? `url(${skull})`
                    : item2.path && item2.walkable
                    ? `url(${boots})`
                    : item2.path
                    ? `url(${floor})`
                    : `url(${wall})`,
                  backgroundSize:
                    item2.path &&
                    item2.walkable &&
                    (!item2.item || item2.item.name !== 'Dead Monster') &&
                    (player.pos.x !== i2 || player.pos.y !== index)
                      ? '8px'
                      : '32px',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  opacity: !los
                    ? 1
                    : isInSight(player.pos.x, player.pos.y, i2, index)
                    ? 1
                    : 0.1,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {item2.item !== null && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      borderRadius: '50%',
                      width: 12,
                      height: 12,
                      background: 'white',
                      border: '1px solid #222',
                      boxShadow: '0px 0px 5px rgba(0,0,0,0.7)',
                      fontSize: '0.6rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {item2.item.value}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
