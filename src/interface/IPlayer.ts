export interface IPlayer {
  pos: { x: number; y: number };
  lives: number;
  battle: { monsterIndex: number; strength: number; diceRoll: number } | null;
}
