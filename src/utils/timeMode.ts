export default (time: string): 'exactly' | 'per' => {
  if(time.includes(':')) return 'exactly';
  else return 'per';
};