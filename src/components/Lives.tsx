import apple from '../assets/apple.png';
import { ILives } from '../interface/ILives';
export default function Lives({ lives }: ILives) {
  const livesLoop = () => {
    const apples = [];
    for (let i = 0; i < lives; i++) {
      apples.push(<img src={apple} key={`Apple_${i}`} />);
    }
    return <div>{apples}</div>;
  };
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      {livesLoop()}
    </div>
  );
}
