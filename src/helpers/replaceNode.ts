import { IGridItem } from '../interface/IGridItem';
import { IGridItemDetails } from '../interface/IGridItemDetails';
export function replaceNode(
  row: number,
  column: number,
  gridRow: IGridItem[][],
  item: IGridItemDetails | null
) {
  const gridRowClone = JSON.parse(JSON.stringify(gridRow));
  const thisNode = { ...gridRowClone[row][column] };
  gridRowClone[row].splice(column, 1, {
    ...thisNode,
    item: item,
    node: false,
    path: true,
    color: thisNode.path === true ? '#ddd' : 'green',
  });
  return gridRowClone;
}
