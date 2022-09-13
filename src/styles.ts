import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#353b45',
    height: '100vh',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexColumn: { display: 'flex', flexDirection: 'column' },
  flexRow: { display: 'flex' },
  optionWrapper: {
    display: 'flex',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 0,
  },
}));
