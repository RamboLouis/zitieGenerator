import ConfigPanel from './components/ConfigPanel';
import Preview from './components/Preview';
import useConfig from './hooks/useConfig';
import styles from './App.module.scss';
import './styles/_print.scss';

export default function App() {
  const { config, updateConfig } = useConfig();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.app}>
      <div className={`config-panel ${styles.configPanel}`}>
        <ConfigPanel config={config} updateConfig={updateConfig} onPrint={handlePrint} />
      </div>
      <div className={`preview-area ${styles.previewArea}`}>
        <Preview config={config} />
      </div>
    </div>
  );
}
