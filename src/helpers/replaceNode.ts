import { IGridItem } from '../interface/IGridItem';
export function replaceNode(
  row: number,
  column: number,
  gridRow: IGridItem[][]
) {
  const thisNode = { ...gridRow[row][column] };
  gridRow[row].splice(column, 1, {
    ...gridRow[row][column],
    node: false,
    path: true,
    walkable: false,
    color: thisNode.path === true ? '#ddd' : 'green',
  });
}
