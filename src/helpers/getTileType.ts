import { IGridItem } from '../interface/IGridItem';

export const getTileType = (xa: number, ya: number, gridRow: IGridItem[][]) => {
  if (gridRow[xa][ya].node) {
    return true;
  }
  return false;
};
