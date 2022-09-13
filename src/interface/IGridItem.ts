import { IGridItemDetails } from './IGridItemDetails';
export interface IGridItem {
  coords: number[];
  path: boolean;
  pathImg: string;
  walkable: boolean;
  node: boolean;
  item: IGridItemDetails | null;
  color: string;
  layer?: string;
  // component: JSX.Element;
}
