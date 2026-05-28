# 字帖生成器 (zitieGenerator)

一个基于 Web 的中文汉字字帖生成工具，支持拼音标注、多种格子类型和描红练习，可自定义页面布局并导出为 PDF 或直接打印。

## 功能特性

- **汉字输入**：弹窗式文本输入，支持多行汉字
- **拼音标注**：使用 pinyin-pro 自动生成每个汉字上方的拼音
- **描红模式**：可配置描红数量，首字可设为黑色（非描红）
- **多种格子类型**：
  - 方格 — 简单方格
  - 田字格 — 带十字虚线
  - 米字格 — 带对角线辅助线
  - 九宫格 — 3×3 子格
- **自定义设置**：
  - 格子大小（8–20mm）、线宽
  - 纸张大小（A4 / A5 / Letter）、页边距（10–30mm）
  - 字体（楷体 / 宋体 / 仿宋 / 黑体）、字号
  - 空行、空列开关
- **实时预览**：缩放控制（适应窗口 / 放大 / 缩小），显示统计信息（字数、每页字数、总页数）
- **打印 / PDF 导出**：通过浏览器原生打印功能导出

## 技术栈

- React 18 + Vite
- SCSS (CSS Modules)
- pinyin-pro（拼音转换）

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
src/
├── main.jsx                 # 入口文件
├── App.jsx                  # 主组件（ConfigPanel + Preview）
├── components/
│   ├── ConfigPanel.jsx      # 配置面板（含打印按钮）
│   ├── TextConfig.jsx       # 文字输入与拼音/描红选项
│   ├── GridConfig.jsx       # 格子类型与尺寸设置
│   ├── PageConfig.jsx       # 纸张与页边距设置
│   ├── FontConfig.jsx       # 字体与字号设置
│   ├── CharacterGrid.jsx    # 单字格子组件（含拼音）
│   └── Preview.jsx          # 实时预览（含缩放控制）
├── hooks/
│   └── useConfig.js         # 配置状态管理
├── utils/
│   ├── gridStyles.js        # 格子背景 CSS 生成
│   ├── pageLayout.js        # 页面布局与分页计算
│   └── pinyin.js            # 拼音转换工具
└── styles/
    ├── _variables.scss      # SCSS 变量
    ├── _mixins.scss         # SCSS 混入
    └── _print.scss          # 打印样式
```

## 使用说明

1. 启动开发服务器后在浏览器中打开页面
2. 在左侧面板输入汉字并调整各项配置
3. 右侧实时预览字帖效果
4. 点击「打印」按钮，选择「另存为 PDF」或连接打印机输出

## License

MIT
