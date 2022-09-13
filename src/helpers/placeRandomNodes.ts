import { ENUM_DIRECTION } from '../enum';
import { createRandomPath } from '../helpers/createRandomPath';
import { getTileType } from '../helpers/getTileType';
import { areThereNodes } from '../helpers/areThereNodes';
import { buildNodes } from '../helpers/buildNodes';
import { randomItem } from '../helpers/randomItem';
import { IGridItem } from '../interface/IGridItem';
import { IGridItemDetails } from '../interface/IGridItemDetails';
import { IGridSize } from '../interface/IGridSize';

export function placeRandomNodes(
  gridSize: IGridSize,
  nbrNodes: string,
  monsterArrTemp: number[][],
  gridRow: IGridItem[][]
): IGridItemDetails[] {
  let itemArr = [];

  for (let xi = 0; xi < gridSize.x; xi++) {
    let gridColumn: IGridItem[] = [];
    for (let yi = 0; yi < gridSize.y; yi++) {
      const generateItem = randomItem([xi, yi], monsterArrTemp);
      if (generateItem !== null) {
        itemArr.push(generateItem);
      }
      const randomPath = createRandomPath(xi, yi, Number(nbrNodes), gridSize);
      gridColumn.push({
        coords: [xi, yi],
        path: false,
        node: randomPath,
        walkable: false,
        item: randomPath && xi > 0 && yi > 0 ? generateItem : null,
        color: '#d9d5ca',
      });
    }
    gridRow.push(gridColumn);
  }

  //Build Paths
  for (let rowi = 0; rowi < gridSize.x; rowi++) {
    for (let columni = 0; columni < gridSize.y; columni++) {
      if (getTileType(rowi, columni, gridRow)) {
        const rightNodes = areThereNodes(
          ENUM_DIRECTION.Right,
          rowi,
          columni,
          gridRow,
          gridSize
        );
        const downNodes = areThereNodes(
          ENUM_DIRECTION.Down,
          rowi,
          columni,
          gridRow,
          gridSize
        );
        const leftNodes = areThereNodes(
          ENUM_DIRECTION.Left,
          rowi,
          columni,
          gridRow,
          gridSize
        );
        const upNodes = areThereNodes(
          ENUM_DIRECTION.Up,
          rowi,
          columni,
          gridRow,
          gridSize
        );
        if (downNodes) {
          buildNodes(ENUM_DIRECTION.Down, rowi, columni, gridRow, gridSize);
        }
        if (rightNodes) {
          buildNodes(ENUM_DIRECTION.Right, rowi, columni, gridRow, gridSize);
        }
        if (!leftNodes && !upNodes) {
          for (let yz = columni; yz > -1; yz--) {
            const upNodesH = areThereNodes(
              ENUM_DIRECTION.Up,
              rowi,
              yz,
              gridRow,
              gridSize
            );
            if (!upNodesH) {
              buildNodes(ENUM_DIRECTION.Left, rowi, yz, gridRow, gridSize);
              break;
            } else {
              break;
            }
          }
        }
      }
    }
  }
  return itemArr;
}
