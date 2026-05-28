import { useState, useCallback } from 'react';

const DEFAULT_CONFIG = {
  // Text
  text: '一二三四五',
  showPinyin: true,
  highlightFirst: true,
  firstCharBlack: true,
  traceCount: 4,

  // Grid
  gridType: 'tian', // 'fang' | 'tian' | 'mi' | 'jiu'
  gridSize: 12,     // mm
  lineWeight: 1,    // px
  blankRows: false,
  blankCols: false,

  // Page
  paperSize: 'A4',  // 'A4' | 'A5' | 'Letter'
  margin: 18,       // mm

  // Font
  fontFamily: 'Kaiti SC',
  fontSize: 10,     // mm
};

export default function useConfig() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  const updateConfig = useCallback((key, value) => {
    setConfig(prev => {
      const next = { ...prev, [key]: value };
      if (key === 'gridSize' && next.fontSize > value) {
        next.fontSize = value;
      }
      return next;
    });
  }, []);

  return { config, updateConfig };
}
