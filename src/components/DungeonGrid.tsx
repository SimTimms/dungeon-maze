import { useEffect } from 'react';
import { IDungeonGrid } from '../interface/IDungeonGrid';
import { IGridItem } from '../interface/IGridItem';
import { IBattle } from '../interface/IBattle';
import { skull, door, dice, floor, wall, playerImg } from '../assets';
import { fightMonster } from '../helpers/fightMonster';
import { revealPath } from '../helpers/revealPath';
import { checkIfInBattle } from '../helpers/checkIfInBattle';
import { clickedTileIsInRange } from '../helpers/clickedTileIsInRange';
import { pickUpItem } from '../helpers/pickUpItem';
import { ENUM_ITEMS } from '../enum';
import { surroundingTiles } from '../helpers/surroundingTiles';
import { PATHS } from '../assets/paths';

const isInSight = (
  playerX: number,
  playerY: number,
  tileX: number,
  tileY: number
) => {
  const tilesFound = surroundingTiles(playerX, playerY, 6).map((item) => {
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
  floorColor,
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
                  width: 32,
                  height: 32,
                  backgroundColor:
                    item2.walkable === false
                      ? '#222'
                      : item2.node === true
                      ? item2.color
                      : item2.path === true
                      ? 'rgba(0,0,0,0)'
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
                    ? `url(${item2.pathImg})`
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
                  filter:
                    item2.path && !item2.item && floorColor === '#67c8f2'
                      ? 'hue-rotate(150deg)'
                      : item2.path && !item2.item && floorColor === '#b2c0f2'
                      ? 'hue-rotate(220deg)'
                      : '',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage:
                      item2.item && item2.item.layer
                        ? `url(${item2.item.layer})`
                        : item2.path
                        ? `url(${item2.layer})`
                        : '',
                  }}
                ></div>
                {item2.item && item2.item.lighting && (
                  <div
                    style={{
                      width: 1,
                      height: 1,
                      boxShadow: item2.item.lighting,
                    }}
                  ></div>
                )}
                {item2.item !== null && item2.item.value !== null && (
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
