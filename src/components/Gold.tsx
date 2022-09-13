import { Typography } from '@mui/material';
import coins from '../assets/coins.png';
export default function Gold(props: { gold: number }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img src={coins}></img>
      <Typography color="#fff">{`x${props.gold}`}</Typography>
    </div>
  );
}
