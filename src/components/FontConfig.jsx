import styles from './FontConfig.module.scss';

const FONT_OPTIONS = [
  { value: 'Kaiti SC', label: '楷体' },
  { value: 'Songti SC', label: '宋体' },
  { value: 'STFangsong', label: '仿宋' },
  { value: 'Heiti SC', label: '黑体' },
];

export default function FontConfig({ config, updateConfig }) {
  return (
    <div className={styles.fontConfig}>
      <div className={styles.sectionTitle}>字体设置</div>

      <div className={styles.field}>
        <label className={styles.label}>字体</label>
        <select
          className={styles.select}
          value={config.fontFamily}
          onChange={e => updateConfig('fontFamily', e.target.value)}
        >
          {FONT_OPTIONS.map(f => (
            <option key={f.value} value={f.value} style={{ fontFamily: f.value }}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.sliderRow}>
        <span className={styles.sliderLabel}>字号</span>
        <input
          type="range"
          min={6}
          max={config.gridSize}
          step={1}
          value={Math.min(config.fontSize, config.gridSize)}
          onChange={e => updateConfig('fontSize', Number(e.target.value))}
        />
        <span className={styles.sliderValue}>{Math.min(config.fontSize, config.gridSize)}mm</span>
      </div>
    </div>
  );
}
