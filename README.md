# 拾光 · 个人独立网站

记录日常琐事（当朋友圈发）+ 分享独立小项目的个人站。单页应用，电影感全屏 Hero + 液态玻璃设计语言。

## 运行

```bash
npm install
npm run dev      # 开发
npm run build    # 构建
npm run preview  # 预览构建产物
```

## 在哪里改内容

所有内容都在 `src/App.tsx` 顶部的数据常量里：

| 常量 | 内容 | 说明 |
| --- | --- | --- |
| `VIDEOS` | Hero 背景视频 | URL、中文标签、英文标签（切换器） |
| `MOMENTS` | 日常卡片 | 图片、文案、时间、标签（朋友圈瀑布流） |
| `PROJECTS` | 项目卡片 | 图标、名称、描述、标签、状态、渐变配色 |
| `NAV_LINKS` | 导航链接 | 锚点 + 文案 |
| About / Footer | 关于我、社交链接 | 页面底部，社交链接是占位符 |

- 图片用 `U('photo-xxxx', 宽度)` 生成 Unsplash 链接，换 `photo-` ID 即可换图。
- 品牌名「拾光」、邮箱 `hi@shiguang.dev`、底部统计数字都是占位，替换成自己的。
- 全局样式（液态玻璃、动画、字体）在 `src/index.css`。
- Hero 第 3 个视频「深林」激活时，内容会自动切换为深蓝色 `#182C41`（模板特性）。

## 技术栈

Vite · React 19 · TypeScript · Tailwind CSS v4 · lucide-react · Instrument Serif + Noto Serif SC
