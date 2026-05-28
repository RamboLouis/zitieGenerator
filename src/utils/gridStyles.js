// Returns CSS background for different grid types
export function getGridBackground(gridType, size) {
  const s = `${size}mm`;
  const half = `${size / 2}mm`;

  // Outer border is handled by box-shadow; only draw internal guide lines here
  switch (gridType) {
    case 'fang':
      // Simple square: no internal lines
      return '';

    case 'tian':
      // Field grid: single thicker dashed center line
      const tianColor = '#e0e0e0';
      const tianLw = '0.5px';
      return `
        repeating-linear-gradient(90deg, ${tianColor} 0 0.8mm, transparent 0.8mm 1.8mm) 0 calc(${half} - ${tianLw} / 2) / 100% ${tianLw} no-repeat,
        repeating-linear-gradient(0deg, ${tianColor} 0 0.8mm, transparent 0.8mm 1.8mm) calc(${half} - ${tianLw} / 2) 0 / ${tianLw} 100% no-repeat
      `;

    case 'mi': {
      // 米字格 = 田字格虚线十字 + 虚线对角
      const miColor = '#e0e0e0';
      const miLw = '0.5px';
      const miDash = '0 0.8mm, transparent 0.8mm 1.8mm';
      // SVG 虚线对角
      const svgLw = 0.5 / 3.78; // 0.5px → mm
      const svg = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><line x1="0" y1="0" x2="${size}" y2="${size}" stroke="${miColor}" stroke-width="${svgLw}" stroke-dasharray="0.8 1.8"/><line x1="${size}" y1="0" x2="0" y2="${size}" stroke="${miColor}" stroke-width="${svgLw}" stroke-dasharray="0.8 1.8"/></svg>`);
      return `
        repeating-linear-gradient(90deg, ${miColor} ${miDash}) 0 calc(${half} - ${miLw} / 2) / 100% ${miLw} no-repeat,
        repeating-linear-gradient(0deg, ${miColor} ${miDash}) calc(${half} - ${miLw} / 2) 0 / ${miLw} 100% no-repeat,
        url("data:image/svg+xml,${svg}") 0 0 / ${s} ${s} no-repeat
      `;
    }

    case 'jiu': {
      // 9-palace grid: dashed 3x3 sub-grid
      const jiuColor = '#e0e0e0';
      const third = size / 3;
      const jiuDash = `0 0.5mm, transparent 0.5mm 1mm`;
      return `
        repeating-linear-gradient(0deg, ${jiuColor} ${jiuDash}) ${third}mm 0 / 1px ${s} no-repeat,
        repeating-linear-gradient(0deg, ${jiuColor} ${jiuDash}) ${third * 2}mm 0 / 1px ${s} no-repeat,
        repeating-linear-gradient(90deg, ${jiuColor} ${jiuDash}) 0 ${third}mm / ${s} 1px no-repeat,
        repeating-linear-gradient(90deg, ${jiuColor} ${jiuDash}) 0 ${third * 2}mm / ${s} 1px no-repeat
      `;
    }

    default:
      return '';
  }
}
