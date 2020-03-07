export default interface Tournament {
  id: number;
  name: string;
  tournament_type: ('single elimination'|'double elimination'|'round robin'|'swiss');
}
