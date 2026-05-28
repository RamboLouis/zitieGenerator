import { useState } from 'react';
import { calculateLayout } from '../utils/pageLayout';
import styles from './TextConfig.module.scss';

export default function TextConfig({ config, updateConfig }) {
  const charCount = config.text.replace(/\s+/g, '').length;
  const { cols } = calculateLayout(config);
  const [showModal, setShowModal] = useState(false);
  const [draft, setDraft] = useState(config.text);

  const openModal = () => {
    setDraft(config.text);
    setShowModal(true);
  };

  const confirmText = () => {
    updateConfig('text', draft);
    setShowModal(false);
  };

  return (
    <div className={styles.textConfig}>
      <div className={styles.sectionTitle}>文字内容</div>

      <div className={styles.textBtn} onClick={openModal}>
        {config.text || '点击输入文字...'}
      </div>
      <div className={styles.charCount}>
        共 {charCount} 字
      </div>

      <div className={styles.options}>
        <label className={styles.option}>
          <input
            type="checkbox"
            checked={config.showPinyin}
            onChange={e => updateConfig('showPinyin', e.target.checked)}
          />
          <span>显示拼音</span>
        </label>

        <label className={styles.option}>
          <input
            type="checkbox"
            checked={config.highlightFirst}
            onChange={e => updateConfig('highlightFirst', e.target.checked)}
          />
          <span>字体描红</span>
        </label>

        <label className={styles.option}>
          <input
            type="checkbox"
            checked={config.firstCharBlack}
            onChange={e => updateConfig('firstCharBlack', e.target.checked)}
          />
          <span>首字高亮</span>
        </label>
      </div>

      <div className={styles.sliderRow}>
        <span className={styles.sliderLabel}>描红次数</span>
        <input
          type="range"
          min={1}
          max={cols}
          step={1}
          value={Math.min(config.traceCount, cols)}
          onChange={e => updateConfig('traceCount', Number(e.target.value))}
        />
        <span className={styles.sliderValue}>{Math.min(config.traceCount, cols)}</span>
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalTitle}>输入文字内容</div>
            <textarea
              className={styles.modalTextarea}
              value={draft}
              onChange={e => setDraft(e.target.value)}
              placeholder="请输入要练习的汉字..."
              autoFocus
              rows={8}
            />
            <div className={styles.modalActions}>
              <button className={styles.modalCancel} onClick={() => setShowModal(false)}>取消</button>
              <button className={styles.modalConfirm} onClick={confirmText}>确定</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
