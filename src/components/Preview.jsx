import { useState, useRef, useEffect, useCallback } from 'react';
import CharacterGrid from './CharacterGrid';
import { calculateLayout, paginateText } from '../utils/pageLayout';
import styles from './Preview.module.scss';

export default function Preview({ config }) {
  const pages = paginateText(config.text, config);
  const layout = calculateLayout(config);
  const { rows, cellSize, pinyinHeight, colGap, rowGap } = layout;

  const [zoom, setZoom] = useState(1);
  const canvasRef = useRef(null);

  const paperW = layout.paper.w; // mm
  const paperH = layout.paper.h; // mm

  const fitToView = useCallback(() => {
    const el = canvasRef.current;
    if (!el) return;
    const cw = el.clientWidth - 80;  // padding
    const ch = el.clientHeight - 80;
    // mm to px (1mm ≈ 3.78px at 96dpi)
    const pw = paperW * 3.78;
    const ph = paperH * 3.78;
    const scale = Math.min(cw / pw, ch / ph, 1);
    setZoom(Math.round(scale * 100) / 100);
  }, [paperW, paperH]);

  useEffect(() => {
    if (config.text.trim()) fitToView();
  }, [config.text, config.paperSize, fitToView]);

  const zoomIn = () => setZoom(z => Math.min(z + 0.1, 2));
  const zoomOut = () => setZoom(z => Math.max(z - 0.1, 0.2));

  if (!config.text.trim()) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>&#x7B;</div>
        <p>请在左侧输入汉字开始生成字帖</p>
      </div>
    );
  }

  return (
    <div className={styles.preview}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <span className={styles.stat}>共 {config.text.replace(/\s+/g, '').length} 字</span>
          <span className={styles.stat}>每页 {rows} 字</span>
          <span className={styles.stat}>共 {pages.length} 页</span>
        </div>
        <div className={styles.toolbarRight}>
          <span className={styles.pageSize}>{config.paperSize} {paperW}×{paperH}mm</span>
          <span className={styles.divider} />
          <button className={styles.zoomBtn} onClick={zoomOut} title="缩小">−</button>
          <span className={styles.zoomValue}>{Math.round(zoom * 100)}%</span>
          <button className={styles.zoomBtn} onClick={zoomIn} title="放大">+</button>
          <button className={styles.zoomBtn} onClick={fitToView} title="适合">适合</button>
        </div>
      </div>

      <div className={styles.canvas} ref={canvasRef}>
        <div className={styles.pageList} style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
          {pages.map((page, pageIdx) => (
            <div
              key={pageIdx}
              className={styles.printPage}
              style={{
                width: `${paperW}mm`,
                height: `${paperH}mm`,
                padding: `${config.margin}mm`,
              }}
            >
              <div className={styles.gridContainer}>
                {page.map((row, rowIdx) => (
                  <div
                    key={rowIdx}
                    className={styles.gridRow}
                    style={{
                      height: `${cellSize + pinyinHeight}mm`,
                      marginBottom: config.blankRows && rowIdx < page.length - 1
                        ? `${rowGap}mm`
                        : '0',
                    }}
                  >
                    {row.map((char, colIdx) => {
                      const isTrace = config.highlightFirst && colIdx < config.traceCount;
                      return (
                        <span
                          key={colIdx}
                          className={styles.cellWrapper}
                          style={{
                            marginRight: config.blankCols && colIdx < row.length - 1
                              ? `${colGap}mm`
                              : '0',
                          }}
                        >
                          <CharacterGrid
                            char={char}
                            config={config}
                            isTrace={isTrace}
                            isFirst={colIdx === 0}
                          />
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
