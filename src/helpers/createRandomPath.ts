import { IGridSize } from '../interface/IGridSize';

export const createRandomPath = (
  xd: number,
  yd: number,
  percent: number,
  GRID_SIZE: IGridSize
) => {
  return yd === GRID_SIZE.y - 1 && xd === GRID_SIZE.x - 1
    ? true
    : yd === 0 && xd === 0
    ? true
    : Math.floor(Math.random() * 100) < percent
    ? true
    : false;
};
