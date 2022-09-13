import { IGridItem } from '../interface/IGridItem';
import { IGridItemDetails } from '../interface/IGridItemDetails';
export function replaceNode(
  row: number,
  column: number,
  gridRow: IGridItem[][],
  item: IGridItemDetails | null,
  floor?: boolean
) {
  if (
    row < 0 ||
    column < 0 ||
    row > gridRow.length - 1 ||
    column > gridRow[0].length - 1
  ) {
    return null;
  }
  const gridRowClone = JSON.parse(JSON.stringify(gridRow));
  const thisNode = { ...gridRowClone[row][column] };
  gridRowClone[row].splice(column, 1, {
    ...thisNode,
    item: item,
    node: false,
    path: true,
    floor: floor || false,
    color: thisNode.path === true ? '#ddd' : 'green',
  });
  return gridRowClone;
}
