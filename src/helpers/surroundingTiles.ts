export const surroundingTiles = (
  xi: number,
  yi: number,
  sightRange: number
) => {
  let sightItems = [];
  for (let i1 = xi - sightRange; i1 <= xi + sightRange; i1++) {
    for (let i2 = yi - sightRange; i2 <= yi + sightRange; i2++) {
      if (i1 === xi && i2 === yi) {
        continue;
      }
      sightItems.push([i1, i2]);
    }
  }
  return sightItems;
};
