import { IGridItem } from '../interface/IGridItem';

export function revealPath(coords: number[], gridRow: IGridItem[][]) {
  const sightRange = 3;
  for (let i1 = coords[0] - sightRange; i1 <= coords[0] + sightRange; i1++)
    for (let i2 = coords[1] - sightRange; i2 <= coords[1] + sightRange; i2++) {
      if (gridRow[i1] && gridRow[i1][i2]) {
        const thisNode = { ...gridRow[i1][i2] };
        gridRow[i1].splice(i2, 1, {
          ...thisNode,
          walkable: true,
          color: '#fff',
        });
      }
    }
}
