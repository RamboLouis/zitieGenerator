import { getPinyin } from '../utils/pinyin';
import { getGridBackground } from '../utils/gridStyles';
import styles from './CharacterGrid.module.scss';

export default function CharacterGrid({ char, config, isTrace, isFirst }) {
  const { gridType, gridSize, lineWeight, showPinyin, fontFamily, fontSize } = config;
  const pinyin = showPinyin ? getPinyin(char) : '';
  const gridBg = getGridBackground(gridType, gridSize);
  const pinyinH = showPinyin ? gridSize * 0.35 : 0;

  return (
    <div className={styles.cell}>
      {showPinyin && (
        <div
          className={styles.pinyinCell}
          style={{
            width: `${gridSize}mm`,
            height: `${pinyinH}mm`,
            lineHeight: `${pinyinH}mm`,
            fontSize: `${gridSize * 0.22}mm`,
          }}
        >
          {pinyin}
        </div>
      )}

      <div
        className={styles.charCell}
        style={{
          width: `${gridSize}mm`,
          height: `${gridSize}mm`,
          borderWidth: `${lineWeight}px`,
        }}
      >
        <div
          className={styles.gridBg}
          style={{ background: gridBg, backgroundRepeat: 'no-repeat' }}
        />

        {char && (
          <span
            className={`${styles.char} ${isTrace && !(isFirst && config.firstCharBlack) ? styles.trace : ''}`}
            style={{
              fontFamily,
              fontSize: `${fontSize}mm`,
              lineHeight: `${gridSize}mm`,
            }}
          >
            {char}
          </span>
        )}
      </div>
    </div>
  );
}
