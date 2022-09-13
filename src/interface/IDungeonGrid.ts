import { IPlayer } from './IPlayer';
import { IGridItem } from '../interface/IGridItem';
export interface IDungeonGrid {
  player: IPlayer;
  setPlayer: (props: IPlayer) => void;
  gridRow: IGridItem[][];
  los: boolean;
  monsterArr: number[][];
  setMapLoaded: (props: IGridItem[][]) => void;
}
