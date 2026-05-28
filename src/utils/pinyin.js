import { pinyin } from 'pinyin-pro';

export function getPinyin(char) {
  if (!char || /[一-鿿]/.test(char) === false) return '';
  return pinyin(char, { toneType: 'symbol', type: 'array' })[0] || '';
}
