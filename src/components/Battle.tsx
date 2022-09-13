import { IPlayer } from '../interface/IPlayer';
import { IGridItem } from '../interface/IGridItem';

export default function Battle(props: {
  player: IPlayer;
  gridRow: IGridItem[][];
}) {
  const createBattles = (gridRow: IGridItem[][]): JSX.Element[] | null => {
    if (player.battle && player.battle.monsterIndex.length > 0) {
      const battleArr = [];
      for (let i = 0; i < player.battle.monsterIndex.length; i++) {
        const theseCoords = player.battle.monsterIndex[i];
        const thisGrid = gridRow[theseCoords[0]][theseCoords[1]];
        if (thisGrid.item) {
          battleArr.push(
            <img key={`image_${i}`} src={`${thisGrid.item.img}`} />
          );
        }
      }
      return battleArr;
    }
    return null;
  };
  const { player } = props;
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      {createBattles(props.gridRow)}
    </div>
  );
}
