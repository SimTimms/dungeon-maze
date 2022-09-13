import { ENUM_ITEMS } from '../enum';
export interface IGridItemDetails {
  name: ENUM_ITEMS | null;
  img: string | null;
  layer?: string;
  value: number | null;
  lighting?: string;
}
