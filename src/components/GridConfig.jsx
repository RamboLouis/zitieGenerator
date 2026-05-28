import styles from './GridConfig.module.scss';

const GRID_TYPES = [
  { value: 'fang', label: '方格' },
  { value: 'tian', label: '田字格' },
  { value: 'mi', label: '米字格' },
  { value: 'jiu', label: '九宫格' },
];

export default function GridConfig({ config, updateConfig }) {
  return (
    <div className={styles.gridConfig}>
      <div className={styles.sectionTitle}>格子设置</div>

      <div className={styles.gridTypes}>
        {GRID_TYPES.map(g => (
          <button
            key={g.value}
            className={`${styles.gridTypeBtn} ${config.gridType === g.value ? styles.active : ''}`}
            onClick={() => updateConfig('gridType', g.value)}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className={styles.sliderRow}>
        <span className={styles.sliderLabel}>格子大小</span>
        <input
          type="range"
          min={8}
          max={20}
          step={1}
          value={config.gridSize}
          onChange={e => updateConfig('gridSize', Number(e.target.value))}
        />
        <span className={styles.sliderValue}>{config.gridSize}mm</span>
      </div>

      <div className={styles.sliderRow}>
        <span className={styles.sliderLabel}>线条粗细</span>
        <input
          type="range"
          min={1}
          max={2}
          step={1}
          value={config.lineWeight}
          onChange={e => updateConfig('lineWeight', Number(e.target.value))}
        />
        <span className={styles.sliderValue}>{config.lineWeight}px</span>
      </div>

      <div className={styles.options}>
        <label className={styles.option}>
          <input
            type="checkbox"
            checked={config.blankRows}
            onChange={e => updateConfig('blankRows', e.target.checked)}
          />
          <span>行间插入空白行</span>
        </label>

        <label className={styles.option}>
          <input
            type="checkbox"
            checked={config.blankCols}
            onChange={e => updateConfig('blankCols', e.target.checked)}
          />
          <span>列间插入空白列</span>
        </label>
      </div>
    </div>
  );
}
