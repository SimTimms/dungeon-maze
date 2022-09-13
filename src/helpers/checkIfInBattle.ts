import { IGridItem } from '../interface/IGridItem';
import { IBattle } from '../interface/IBattle';
import { ENUM_ITEMS } from '../enum';
export const checkIfInBattle = (
  xi: number,
  yi: number,
  weaponRange: number,
  gridRow: IGridItem[][]
): IBattle | null => {
  const monsterIndex = [];
  for (let i1 = xi - weaponRange; i1 <= xi + weaponRange; i1++) {
    for (let i2 = yi - weaponRange; i2 <= yi + weaponRange; i2++) {
      if (gridRow[i1] && gridRow[i1][i2]) {
        const tile = gridRow[i1][i2];
        if (tile && tile.item && tile.item.name === ENUM_ITEMS.Monster) {
          monsterIndex.push(tile.coords);
        }
      }
    }
  }
  return monsterIndex.length > 0
    ? { monsterIndex: monsterIndex, diceRoll: null }
    : null;
};
