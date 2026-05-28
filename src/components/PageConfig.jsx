import styles from './PageConfig.module.scss';

const PAPER_OPTIONS = [
  { value: 'A4', label: 'A4 (210×297mm)' },
  { value: 'A5', label: 'A5 (148×210mm)' },
  { value: 'Letter', label: 'Letter (216×279mm)' },
];

export default function PageConfig({ config, updateConfig }) {
  return (
    <div className={styles.pageConfig}>
      <div className={styles.sectionTitle}>页面设置</div>

      <div className={styles.field}>
        <label className={styles.label}>纸张大小</label>
        <select
          className={styles.select}
          value={config.paperSize}
          onChange={e => updateConfig('paperSize', e.target.value)}
        >
          {PAPER_OPTIONS.map(p => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>

      <div className={styles.sliderRow}>
        <span className={styles.sliderLabel}>页边距</span>
        <input
          type="range"
          min={10}
          max={30}
          step={1}
          value={config.margin}
          onChange={e => updateConfig('margin', Number(e.target.value))}
        />
        <span className={styles.sliderValue}>{config.margin}mm</span>
      </div>
    </div>
  );
}
