import { IGridItem } from '../interface/IGridItem';
import { IBattle } from '../interface/IBattle';
import skullDead from '../assets/skullDead.png';
export function fightMonster(
  coords: number[],
  gridRow: IGridItem[][],
  battleMonsterArr: number[][],
  setMapLoaded: (gridRow: IGridItem[][]) => void,
  setIsInBattle: (battle: IBattle | null) => void,
  reduceLives: (amount: number) => void
) {
  const diceRoll = Math.floor(Math.random() * 20 + 1);
  const gridRowClone = JSON.parse(JSON.stringify(gridRow));
  const monster = gridRowClone[coords[0]][coords[1]].item;

  function removeMonster() {
    const monsterIndex = battleMonsterArr.indexOf([...coords]);
    battleMonsterArr.splice(monsterIndex, 1);
  }

  if (diceRoll >= monster.value) {
    removeMonster();
    const thisNode = { ...gridRowClone[coords[0]][coords[0]] };
    gridRowClone[coords[0]].splice(coords[1], 1, {
      ...thisNode,
      item: { name: 'Dead Monster', img: skullDead, value: 0 },
      path: true,
      walkable: true,
      node: false,
    });
    setMapLoaded(gridRowClone);
    setIsInBattle(
      battleMonsterArr.length > 0
        ? { monsterIndex: battleMonsterArr, diceRoll: null }
        : null
    );
  } else {
    reduceLives(1);
  }
}
