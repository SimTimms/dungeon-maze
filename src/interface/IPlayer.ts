import { IBattle } from './IBattle';
export interface IPlayer {
  pos: { x: number; y: number };
  lives: number;
  battle: IBattle | null;
  gold: number;
}
