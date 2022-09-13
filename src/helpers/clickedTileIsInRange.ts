export const clickedTileIsInRange = (
  mx: number,
  my: number,
  px: number,
  py: number,
  range: number
) => {
  for (let i1 = px - range; i1 <= px + range; i1++) {
    for (let i2 = py - range; i2 <= py + range; i2++) {
      if (mx === i1 && my === i2) {
        return true;
      }
    }
  }
  return false;
};
