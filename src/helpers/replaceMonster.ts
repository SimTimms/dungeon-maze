import { IGridItem } from '../interface/IGridItem';
import skullDead from '../assets/skullDead.png';
export function replaceMonster(
  coords: number[],
  gridRow: IGridItem[][],
  monsterArr: number[][],
  setMapLoaded: (gridRow: IGridItem[][]) => void,
  setIsMonster: (props: boolean) => void,
  reduceLives: (amount: number) => void
) {
  const diceRoll = Math.floor(Math.random() * 20 + 1);
  const gridRowClone = JSON.parse(JSON.stringify(gridRow));
  if (diceRoll >= gridRowClone[coords[0]][coords[1]].item.value) {
    const monsterIndex = monsterArr.indexOf([...coords]);
    monsterArr.splice(monsterIndex, 1);
    const thisNode = { ...gridRowClone[coords[0]][coords[0]] };
    gridRowClone[coords[0]].splice(coords[1], 1, {
      ...thisNode,
      item: { name: 'Dead Monster', img: skullDead, value: 0 },
      path: true,
      walkable: true,
      color: 'red',
    });
    setIsMonster(false);
    setMapLoaded(gridRowClone);
  } else {
    reduceLives(1);
  }
}
