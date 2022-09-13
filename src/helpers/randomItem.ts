import ore from '../assets/ore.png';
import coin from '../assets/coin.png';
import sword from '../assets/sword.png';
import monster from '../assets/monster.png';
import { IGridItemDetails } from '../interface/IGridItemDetails';

export function randomItem(
  coords: number[],
  monsterArr: number[][]
): IGridItemDetails | null {
  if (Math.floor(Math.random() * 100) > 91) {
    return { name: 'ore', img: ore, value: 1 };
  } else if (Math.floor(Math.random() * 100) > 81) {
    return { name: 'coin', img: coin, value: 1 };
  } else if (Math.floor(Math.random() * 100) > 98) {
    return { name: 'sword', img: sword, value: 1 };
  } else if (Math.floor(Math.random() * 100) > 20) {
    monsterArr.push(coords);
    return {
      name: 'monster',
      img: monster,
      value: Math.floor(Math.random() * 17 + 1),
    };
  }
  return null;
}
