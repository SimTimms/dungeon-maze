import { useEffect } from 'react';
import { IDungeonGrid } from '../interface/IDungeonGrid';
import { IGridItem } from '../interface/IGridItem';
import { IBattle } from '../interface/IBattle';
import skull from '../assets/skull.png';
import door from '../assets/door.png';
import dice from '../assets/dice.png';
import { fightMonster } from '../helpers/fightMonster';
import floor from '../assets/floor.png';
import wall from '../assets/wall.png';
import playerImg from '../assets/player.png';
import { revealPath } from '../helpers/revealPath';
import { checkIfInBattle } from '../helpers/checkIfInBattle';
import { clickedTileIsInRange } from '../helpers/clickedTileIsInRange';
import { pickUpItem } from '../helpers/pickUpItem';
import { ENUM_ITEMS } from '../enum';
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
  const weaponRange = 1;

  function reduceLives(amount: number) {
    setPlayer({ ...player, lives: player.lives - amount });
  }

  function setIsInBattle(battle: IBattle | null): void {
    setPlayer({
      ...player,
      battle: battle,
    });
  }

  function tileClick(
    item2: IGridItem,
    x: number,
    y: number,
    monsterArr: number[][],
    gridRow: IGridItem[][]
  ) {
    revealPath([x, y], gridRow);
    const itemVar = item2.item;
    if (itemVar && itemVar.name === ENUM_ITEMS.Coin) {
      clickedTileIsInRange(player.pos.x, player.pos.y, x, y, 1) &&
        pickUpItem(player, [x, y], gridRow, setPlayer, setMapLoaded);
    } else if (itemVar && itemVar.name === ENUM_ITEMS.Ore) {
      clickedTileIsInRange(player.pos.x, player.pos.y, x, y, 1) &&
        pickUpItem(player, [x, y], gridRow, setPlayer, setMapLoaded);
    } else if (itemVar && itemVar.name === ENUM_ITEMS.Monster) {
      clickedTileIsInRange(player.pos.x, player.pos.y, x, y, weaponRange) &&
        fightMonster(
          [item2.coords[0], item2.coords[1]],
          gridRow,
          player.battle ? player.battle.monsterIndex : [],
          setMapLoaded,
          setIsInBattle,
          reduceLives
        );
    } else if (item2.path === true && item2.walkable) {
      if (!player.battle) {
        setPlayer({
          ...player,
          pos: { x: x, y: y },
          battle: checkIfInBattle(x, y, weaponRange, gridRow),
        });
      }
    }
  }
  useEffect(() => {
    revealPath([player.pos.x, player.pos.y], gridRow);
  }, [player]);

  return (
    <div>
      {gridRow.map((item, i2) => {
        return (
          <div style={{ display: 'flex' }} key={`grid1_${i2}`}>
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
                    : player.pos.x === i2 &&
                      player.pos.y === index &&
                      player.battle
                    ? `url(${dice})`
                    : player.pos.x === i2 && player.pos.y === index
                    ? `url(${playerImg})`
                    : i2 === 0 && index === 0
                    ? `url(${door})`
                    : item2.item
                    ? `url(${item2.item.img})`
                    : item2.node
                    ? `url(${skull})`
                    : item2.path
                    ? `url(${floor})`
                    : `url(${wall})`,
                  backgroundSize:
                    item2.path &&
                    item2.walkable &&
                    (!item2.item ||
                      item2.item.name !== ENUM_ITEMS.DeadMonster) &&
                    (player.pos.x !== i2 || player.pos.y !== index)
                      ? '32px'
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
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
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
