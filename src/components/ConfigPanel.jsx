import TextConfig from './TextConfig';
import GridConfig from './GridConfig';
import PageConfig from './PageConfig';
import FontConfig from './FontConfig';
import styles from './ConfigPanel.module.scss';

export default function ConfigPanel({ config, updateConfig, onPrint }) {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h1 className={styles.title}>字帖生成器</h1>
      </div>

      <div className={styles.body}>
        <TextConfig config={config} updateConfig={updateConfig} />
        <GridConfig config={config} updateConfig={updateConfig} />
        <PageConfig config={config} updateConfig={updateConfig} />
        <FontConfig config={config} updateConfig={updateConfig} />
      </div>

      <div className={styles.footer}>
        <button className={styles.printBtn} onClick={onPrint}>
          打印 / 导出 PDF
        </button>
      </div>
    </div>
  );
}
