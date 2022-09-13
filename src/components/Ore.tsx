import { Typography } from '@mui/material';
import ore from '../assets/ore.png';
export default function Ore(props: { ore: number }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img src={ore}></img>
      <Typography color="#fff">{`x${props.ore}`}</Typography>
    </div>
  );
}
