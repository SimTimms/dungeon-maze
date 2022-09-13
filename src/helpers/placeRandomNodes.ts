import { ENUM_DIRECTION } from '../enum';
import { ENUM_ITEMS } from '../enum';
import { createRandomPath } from '../helpers/createRandomPath';
import { getTileType } from '../helpers/getTileType';
import { areThereNodes } from '../helpers/areThereNodes';
import { buildNodes } from '../helpers/buildNodes';
import { randomItem } from '../helpers/randomItem';
import { IGridItem } from '../interface/IGridItem';
import { IGridItemDetails } from '../interface/IGridItemDetails';
import { IGridSize } from '../interface/IGridSize';
import { surroundingTiles } from '../helpers/surroundingTiles';
import { replaceNode } from '../helpers/replaceNode';
import { FLOORS } from '../assets/floors';
import { STONES } from '../assets/stones';
import { PATHS } from '../assets/paths';
export function placeRandomNodes(
  gridSize: IGridSize,
  nbrNodes: string,
  monsterArrTemp: number[][],
  gridRow: IGridItem[][]
): void {
  let nodeRef = [];

  for (let xi = 0; xi < gridSize.x; xi++) {
    let gridColumn: IGridItem[] = [];
    for (let yi = 0; yi < gridSize.y; yi++) {
      const randomPath = createRandomPath(xi, yi, Number(nbrNodes), gridSize);
      gridColumn.push({
        coords: [xi, yi],
        path: false,
        pathImg: PATHS[Math.floor(Math.random() * PATHS.length)].img,
        node: randomPath,
        walkable: true,
        layer: STONES[Math.floor(Math.random() * STONES.length)].img,
        item:
          randomPath && xi > 0 && yi > 0
            ? randomItem([xi, yi], monsterArrTemp)
            : null,
        color: 'rgba(0,0,0,0)',
      });
      randomPath && nodeRef.push([xi, yi]);
    }
    gridRow.push(gridColumn);
  }

  //Build Rooms
  for (let nodeI = 0; nodeI < nodeRef.length; nodeI++) {
    const thisNode = nodeRef[nodeI];
    const tiles = surroundingTiles(thisNode[0], thisNode[1], 1);
    for (let tileA = 0; tileA < tiles.length; tileA++) {
      const tile = tiles[tileA];
      if (!gridRow[tile[0]] || !gridRow[tile[0]][tile[1]]) {
        continue;
      }
      if (gridRow[tile[0]][tile[1]].node) {
        continue;
      }
      const randomFloor = Math.floor(Math.random() * FLOORS.length);
      const replace = replaceNode(
        tile[0],
        tile[1],
        gridRow,
        {
          name: ENUM_ITEMS.Room,
          img: FLOORS[0].img,
          layer: FLOORS[randomFloor].img,
          lighting: FLOORS[randomFloor].lighting,
          value: null,
        },
        true
      );
      if (replace) {
        gridRow.splice(0, gridRow.length, ...replace);
      }
    }
  }
  //Build Doors

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
}
