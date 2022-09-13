import { ENUM_DIRECTION } from '../enum';
import { getTileType } from './getTileType';
import { IGridSize } from '../interface/IGridSize';
import { IGridItem } from '../interface/IGridItem';

export const areThereNodes = (
  direction: ENUM_DIRECTION,
  xe: number,
  ye: number,
  gridRow: IGridItem[][],
  gridSize: IGridSize
) => {
  if (direction === ENUM_DIRECTION.Right) {
    for (let columnB = ye + 1; columnB < gridSize.y; columnB++) {
      if (getTileType(xe, columnB, gridRow)) {
        return true;
      }
    }
  }
  if (direction === ENUM_DIRECTION.Left) {
    for (let columnB = ye - 1; columnB > -1; columnB--) {
      if (getTileType(xe, columnB, gridRow)) {
        return true;
      }
    }
  }
  if (direction === ENUM_DIRECTION.Down) {
    for (let rowB = xe + 1; rowB < gridSize.x; rowB++) {
      if (getTileType(rowB, ye, gridRow)) {
        return true;
      }
    }
  }
  if (direction === ENUM_DIRECTION.Up) {
    for (let rowB = xe - 1; rowB > -1; rowB--) {
      if (getTileType(rowB, ye, gridRow)) {
        return true;
      }
    }
  }
  return false;
};
