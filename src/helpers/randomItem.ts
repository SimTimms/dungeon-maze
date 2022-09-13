import ore from '../assets/ore.png';
import coin from '../assets/coin.png';
import sword from '../assets/sword.png';
import monster from '../assets/monster.png';
import { IGridItemDetails } from '../interface/IGridItemDetails';
import { ENUM_ITEMS } from '../enum';

export function randomItem(
  coords: number[],
  monsterArr: number[][]
): IGridItemDetails | null {
  if (Math.floor(Math.random() * 100) > 91) {
    return { name: ENUM_ITEMS.Ore, img: ore, value: 1 };
  } else if (Math.floor(Math.random() * 100) > 81) {
    return { name: ENUM_ITEMS.Coin, img: coin, value: 1 };
  } else if (Math.floor(Math.random() * 100) > 98) {
    return { name: ENUM_ITEMS.Sword, img: sword, value: 1 };
  } else if (Math.floor(Math.random() * 100) > 20) {
    monsterArr.push(coords);
    return {
      name: ENUM_ITEMS.Monster,
      img: monster,
      value: Math.floor(Math.random() * 17 + 1),
    };
  }
  return {
    name: ENUM_ITEMS.Monster,
    img: monster,
    value: Math.floor(Math.random() * 17 + 1),
  };
}
