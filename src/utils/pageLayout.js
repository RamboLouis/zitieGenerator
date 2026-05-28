// Paper sizes in mm
const PAPER_SIZES = {
  A4: { w: 210, h: 297 },
  A5: { w: 148, h: 210 },
  Letter: { w: 216, h: 279 },
};

export function calculateLayout(config) {
  const paper = PAPER_SIZES[config.paperSize] || PAPER_SIZES.A4;
  const contentW = paper.w - config.margin * 2;
  const contentH = paper.h - config.margin * 2;

  const cellSize = config.gridSize;
  const pinyinHeight = config.showPinyin ? cellSize * 0.35 : 0;
  const rowHeight = cellSize + pinyinHeight;
  const colGap = config.blankCols ? cellSize : 0;
  const rowGap = config.blankRows ? cellSize * 0.6 : 0;

  // One character per row, cols auto-fit by page width and grid size
  const cols = Math.floor((contentW + colGap) / (cellSize + colGap));
  const rows = Math.floor((contentH + rowGap) / (rowHeight + rowGap));

  return { cols, rows, paper, contentW, contentH, cellSize, pinyinHeight, colGap, rowGap };
}

export function paginateText(text, config) {
  const { cols, rows } = calculateLayout(config);
  const chars = text ? text.replace(/\s+/g, '').split('') : [];
  const traceCount = Math.min(config.traceCount, cols);
  const emptyRow = () => Array(cols).fill('');
  const pages = [];

  if (chars.length === 0) {
    // No text: one page of empty grid
    pages.push(Array.from({ length: rows }, emptyRow));
    return pages;
  }

  const charsPerPage = rows;
  for (let i = 0; i < chars.length; i += charsPerPage) {
    const pageChars = chars.slice(i, i + charsPerPage);
    const rowsArr = pageChars.map(char => {
      const row = [];
      for (let c = 0; c < cols; c++) {
        row.push(c < traceCount ? char : '');
      }
      return row;
    });
    // Fill remaining rows with empty grid
    while (rowsArr.length < rows) {
      rowsArr.push(emptyRow());
    }
    pages.push(rowsArr);
  }

  return pages;
}
