export interface IColors {
  start: string;
  stop: string;
}

const colors: IColors[] = [
  { start: '#348F50', stop: '#56B4D3' },
  { start: '#DA22FF', stop: '#9733EE' },
  { start: '#D31027', stop: '#EA384D' },
  { start: '#16A085', stop: '#16A085' },
  { start: '#603813', stop: '#b29f94' },
  { start: '#ff6e7f', stop: '#bfe9ff' },
  { start: '#314755', stop: '#26a0da' },
  { start: '#e65c00', stop: '#F9D423' },
  { start: '#2193b0', stop: '#6dd5ed' },
  { start: '#ec008c', stop: '#fc6767' },
  { start: '#9796f0', stop: '#fbc7d4' }
];

const generateGradient = (): IColors => {
  return randomValue(colors);
};

const randomValue = list => {
  return list[Math.floor(Math.random() * list.length)];
};

export default generateGradient;
