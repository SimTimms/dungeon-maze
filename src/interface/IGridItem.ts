import { IGridItemDetails } from './IGridItemDetails';
export interface IGridItem {
  coords: number[];
  path: boolean;
  walkable: boolean;
  node: boolean;
  item: IGridItemDetails | null;
  color: string;
  // component: JSX.Element;
}
