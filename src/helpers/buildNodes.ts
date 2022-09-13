import { replaceNode } from './replaceNode';
import { ENUM_DIRECTION } from '../enum';
import { IGridItem } from '../interface/IGridItem';
import { IGridSize } from '../interface/IGridSize';
import { areThereNodes } from './areThereNodes';

export const buildNodes = (
  direction: ENUM_DIRECTION,
  xc: number,
  yc: number,
  gridRow: IGridItem[][],
  gridSize: IGridSize
) => {
  if (direction === ENUM_DIRECTION.Right) {
    for (let colA = yc + 1; colA < gridSize.y; colA++) {
      if (!gridRow[xc][colA].node) {
        replaceNode(xc, colA, gridRow);
      }
      if (gridRow[xc][colA].node) {
        break;
      }
    }
  }
  if (direction === ENUM_DIRECTION.Left) {
    for (let colA = yc - 1; colA > -1; colA--) {
      if (!gridRow[xc][colA].node) {
        replaceNode(xc, colA, gridRow);
      }
      if (
        gridRow[xc][colA].node ||
        areThereNodes(ENUM_DIRECTION.Up, xc, colA, gridRow, gridSize)
      ) {
        buildNodes(ENUM_DIRECTION.Up, xc, colA, gridRow, gridSize);
        break;
      }
    }
  }
  if (direction === ENUM_DIRECTION.Down) {
    for (let rowA = xc + 1; rowA < gridSize.x; rowA++) {
      if (!gridRow[rowA][yc].node) {
        replaceNode(rowA, yc, gridRow);
      }
      if (gridRow[rowA][yc].node) {
        break;
      }
    }
  }
  if (direction === ENUM_DIRECTION.Up) {
    for (let rowA = xc - 1; rowA > -1; rowA--) {
      if (!gridRow[rowA][yc].node) {
        replaceNode(rowA, yc, gridRow);
      }
      if (gridRow[rowA][yc].node) {
        break;
      }
    }
  }
  return false;
};
