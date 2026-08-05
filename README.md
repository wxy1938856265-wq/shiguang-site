# 拾光 · 个人独立网站

记录日常琐事（当朋友圈发）+ 分享独立小项目的个人站。单页应用，电影感全屏 Hero + 液态玻璃设计语言。带 **Decap CMS 后台**，部署在 Netlify 后可在浏览器里可视化编辑所有内容。

## 本地运行

```bash
npm install
npm run dev      # 开发：http://localhost:5173
npm run build    # 构建
npm run preview  # 预览构建产物
```

## 网站数据（后台管理）

| 文件 | 内容 | 后台栏目 |
| --- | --- | --- |
| `public/data/site.json` | 品牌名、Hero 标题/副文案、底部统计、关于我、技能、页脚 | ① 网站信息 |
| `public/data/moments.json` | 日常卡片（图片/文案/时间/标签/比例） | ② 日常 Moments |
| `public/data/projects.json` | 项目卡片（名称/图标/描述/标签/状态/配色） | ③ 项目 Projects |

- 图片上传后保存在 `public/uploads/`（随仓库一起部署）。
- 前端加载失败时自动回退到构建时打包的数据，不会白屏。
- Hero 背景视频在 `src/App.tsx` 的 `VIDEOS` 常量里（如需更换视频才需要改代码）。

## 后台使用

部署到 Netlify 后访问 `https://你的域名/admin`：

1. 首次访问点击 **Sign up** 注册邮箱账号（第一个账号自动成为管理员）
2. 登录后左侧三个栏目：网站信息 / 日常 Moments / 项目 Projects
3. 编辑内容 → 点 **Publish** 保存，Netlify 会自动重新构建部署（约 1 分钟），网站更新

## 部署（Netlify）

1. 代码推送到 GitHub 仓库
2. netlify.com → Add new site → Import from Git → 选择仓库（构建命令已配置在 `netlify.toml`）
3. Site settings → **Identity** → Enable Identity
4. Identity → **Services** → Enable **Git Gateway**
5. 访问 `https://xxx.netlify.app/admin` 注册账号开始编辑

## 技术栈

Vite · React 19 · TypeScript · Tailwind CSS v4 · lucide-react · Decap CMS · Instrument Serif + Noto Serif SC
