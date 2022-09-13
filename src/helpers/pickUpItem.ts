import { IGridItem } from '../interface/IGridItem';
import { IPlayer } from '../interface/IPlayer';
import { replaceNode } from './replaceNode';
import { ENUM_ITEMS } from '../enum';
export function pickUpItem(
  player: IPlayer,
  coords: number[],
  gridRow: IGridItem[][],
  setPlayer: (props: IPlayer) => void,
  setMapLoaded: (props: IGridItem[][]) => void
) {
  function removeItem() {
    setMapLoaded(replaceNode(coords[0], coords[1], gridRow, null));
  }

  const itemInGrid = gridRow[coords[0]][coords[1]];
  const playerClone = { ...player };
  if (itemInGrid.item) {
    switch (itemInGrid.item.name) {
      case ENUM_ITEMS.Ore:
        playerClone['ore'] =
          player.ore + ((itemInGrid.item && itemInGrid.item.value) || 0);
        break;

      case ENUM_ITEMS.Coin:
        playerClone['gold'] =
          player.gold + ((itemInGrid.item && itemInGrid.item.value) || 0);
        break;
    }
  }
  setPlayer(playerClone);
  removeItem();
}
