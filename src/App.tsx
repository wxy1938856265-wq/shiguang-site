import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  ArrowDown,
  ArrowUp,
  Bell,
  CalendarHeart,
  Feather,
  Github,
  Instagram,
  Mail,
  Menu,
  Mic,
  Palette,
  Rss,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react'

/* ============================================================
   素材与数据
   ============================================================ */

const VIDEOS = [
  { url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4', label: '暮色', en: 'Golden Hour' },
  { url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4', label: '流水', en: 'Still Water' },
  { url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4', label: '深林', en: 'Deep Woods' },
  { url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4', label: '晨曦', en: 'Quiet Dawn' },
]

const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`

const MOMENTS = [
  {
    img: U('photo-1499750310107-5fef28a66643', 1000),
    ratio: 'aspect-[4/3]',
    text: '下午三点，咖啡馆只剩我一个人的键盘声。写完了拖延两周的周报，突然觉得，琐碎的日子也有它的重量。',
    meta: '昨天 15:04 · 街角的咖啡馆',
    tag: '☕ 日常',
  },
  {
    img: U('photo-1506905925346-21bda4d32df4', 900),
    ratio: 'aspect-[3/4]',
    text: '爬了四个小时的山，就为了看这一眼。山顶的风把所有烦恼都吹散了，只剩下"哇"。',
    meta: '3 天前 · 城郊西山',
    tag: '🏔️ 周末',
  },
  {
    img: U('photo-1441974231531-c6227db76b6e', 1000),
    ratio: 'aspect-square',
    text: '新买的胶片相机第一卷洗出来了。很多张糊掉，这张刚好。摄影大概就是学会接受不完美。',
    meta: '上周日 · 家附近的小树林',
    tag: '📷 胶片',
  },
  {
    img: U('photo-1504674900247-0877df9cc836', 1000),
    ratio: 'aspect-[4/5]',
    text: '尝试复刻小时候外婆做的糖醋排骨。味道差一点，但厨房里冒热气的感觉，一模一样。',
    meta: '上周六 · 家',
    tag: '🍳 下厨',
  },
  {
    img: U('photo-1519681393784-d120267933ba', 1200),
    ratio: 'aspect-[16/10]',
    text: '凌晨两点，银河真的肉眼可见。躺在草地上看了十分钟，宇宙这么大，我的 deadline 好像也没那么可怕。',
    meta: '7 月 12 日 · 露营基地',
    tag: '🌌 夜晚',
  },
  {
    img: U('photo-1519389950473-47ba0277781c', 1000),
    ratio: 'aspect-[4/3]',
    text: '把桌面从"施工现场"收拾成了"灵感车间"。仪式感是生产力的第一推动力。',
    meta: '7 月 8 日 · 我的书房',
    tag: '🖥️ 工作台',
  },
  {
    img: U('photo-1523712999610-f77fbcfc3843', 900),
    ratio: 'aspect-[3/4]',
    text: '第一次手冲，粉水比全凭感觉，苦得像生活的隐喻。但慢慢喝，回甘也是真的。',
    meta: '7 月 5 日 · 阳台',
    tag: '☕ 日常',
  },
  {
    img: U('photo-1472214103451-9374bd1c798e', 1200),
    ratio: 'aspect-[16/9]',
    text: '日落把整片稻田镀成金色。想起小时候在田埂上跑，那时觉得天很大，现在觉得时间很快。',
    meta: '7 月 1 日 · 老家',
    tag: '🌾 回乡',
  },
]

const PROJECTS = [
  {
    icon: CalendarHeart,
    name: 'Momently',
    desc: '一款把待办清单做成"呼吸灯"的极简打卡应用。每天只做三件事，做完就让一盏灯亮起来。',
    tags: ['React', 'TypeScript', 'PWA'],
    status: '已发布',
    grad: 'from-amber-200/25 to-orange-300/10',
    accent: 'text-amber-200',
  },
  {
    icon: Feather,
    name: 'GlowBlog',
    desc: '自托管博客主题：中文衬线排版、极慢的滚动节奏、没有广告和弹窗。写给深夜读书的人。',
    tags: ['Tailwind', 'Markdown', '主题引擎'],
    status: '每周更新',
    grad: 'from-rose-200/25 to-pink-300/10',
    accent: 'text-rose-200',
  },
  {
    icon: Bell,
    name: 'PingBreath',
    desc: '浏览器插件：把烦人的通知变成缓慢的呼吸灯。重要消息浮起，噪音沉下去。',
    tags: ['Chrome API', 'Vite'],
    status: '孵化中',
    grad: 'from-sky-200/25 to-cyan-300/10',
    accent: 'text-sky-200',
  },
  {
    icon: Mic,
    name: '微小频道',
    desc: '一档没有剪辑的独立播客：每期 15 分钟，聊聊本周做的小东西和路上的见闻。',
    tags: ['音频', 'RSS', '录音'],
    status: '已更 12 期',
    grad: 'from-violet-200/25 to-purple-300/10',
    accent: 'text-violet-200',
  },
  {
    icon: Palette,
    name: 'ColorDrops',
    desc: '从一张照片里提取一套高级配色。算法 + 一点点审美，生成可以直接用的 CSS 变量。',
    tags: ['Canvas', '色彩算法'],
    status: '已发布',
    grad: 'from-emerald-200/25 to-teal-300/10',
    accent: 'text-emerald-200',
  },
  {
    icon: Terminal,
    name: 'ShellPoems',
    desc: '命令行诗集。`poem --tonight` 会给你一首关于今晚的诗，适合深夜写代码的你。',
    tags: ['Node.js', 'CLI'],
    status: '孵化中',
    grad: 'from-zinc-200/25 to-slate-300/10',
    accent: 'text-zinc-200',
  },
]

const NAV_LINKS = [
  { label: '日常', href: '#moments' },
  { label: '项目', href: '#projects' },
  { label: '关于', href: '#about' },
]

/* ============================================================
   滚动入场
   ============================================================ */

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          obs.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ============================================================
   Hero
   ============================================================ */

function Nav({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-10 md:px-14">
      <a href="#top" className="font-serif text-xl italic tracking-wide text-white sm:text-2xl">
        拾光<span className="not-italic text-champagne">✦</span>
      </a>

      {/* 桌面导航 */}
      <nav className="hidden items-center md:flex">
        <div className="liquid-glass flex items-center gap-1 rounded-full py-1.5 pl-6 pr-1.5">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans px-4 py-2 text-sm text-white/90 transition-colors duration-300 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="mailto:hi@shiguang.dev"
            className="font-sans rounded-full bg-white px-5 py-2 text-sm font-medium text-[#182c41] transition-all duration-300 hover:opacity-90"
          >
            一起聊聊
          </a>
        </div>
      </nav>

      {/* 移动端汉堡 */}
      <button
        onClick={onMenu}
        aria-label="打开菜单"
        className="liquid-glass flex h-11 w-11 items-center justify-center rounded-full text-white md:hidden"
      >
        <Menu size={20} />
      </button>
    </header>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      } ${open ? 'menu-open' : ''}`}
    >
      <div className="flex flex-col items-center gap-7 px-8 text-center">
        <button onClick={onClose} aria-label="关闭菜单" className="absolute right-6 top-6 text-white/70 hover:text-white">
          <X size={28} />
        </button>
        {NAV_LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={onClose}
            className="menu-item font-serif text-3xl text-white transition-colors hover:text-champagne"
            style={{ transitionDelay: `${100 + i * 50}ms` }}
          >
            {l.label}
          </a>
        ))}
        <a
          href="mailto:hi@shiguang.dev"
          onClick={onClose}
          className="menu-item mt-2 rounded-full bg-white px-8 py-3 font-sans text-base font-medium text-[#182c41] transition-transform duration-500 hover:scale-105"
          style={{ transitionDelay: '300ms' }}
        >
          一起聊聊
        </a>
      </div>
    </div>
  )
}

function Hero() {
  const [activeVideo, setActiveVideo] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [overlayGone, setOverlayGone] = useState(false)
  const dark = activeVideo === 2 // 「深林」视频激活时内容切换深色

  const switchVideo = (i: number) => {
    if (i === activeVideo || isTransitioning) return
    setActiveVideo(i)
    setIsTransitioning(true)
    window.setTimeout(() => setIsTransitioning(false), 1000)
  }

  return (
    <section id="top" className="relative h-screen w-full overflow-hidden bg-black">
      {/* 视频层 */}
      {VIDEOS.map((v, i) => (
        <video
          key={v.url}
          src={v.url}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === activeVideo ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* 光晕覆盖层（浮动） */}
      <img
        src="https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png"
        alt=""
        aria-hidden
        onError={(e) => {
          e.currentTarget.style.display = 'none'
          setOverlayGone(true)
        }}
        className={`animate-bob absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-1000 ${
          overlayGone ? 'opacity-0' : 'opacity-100'
        }`}
      />
      {/* 兜底渐变（视频/覆盖层加载失败时仍高级） */}
      {overlayGone && (
        <div
          className="absolute inset-0 z-[1]"
          style={{ background: 'radial-gradient(120% 90% at 50% 100%, rgba(233,201,160,0.16) 0%, rgba(24,44,65,0.25) 45%, rgba(0,0,0,0) 75%)' }}
        />
      )}

      {/* 内容层 */}
      <div className={`hero-content relative z-[2] flex h-full flex-col ${dark ? 'hero-dark' : ''}`}>
        <Nav onMenu={() => setMenuOpen(true)} />
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

        {/* 中央内容 */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div
            className={`liquid-glass hero-tone-dim rounded-full px-5 py-2 font-sans text-[11px] tracking-[0.18em] sm:text-xs ${dark ? 'text-[#182c41]/70' : 'text-white/75'}`}
          >
            ✦ 我的数字花园 · 记录日常，分享创造
          </div>

          <h1
            className={`hero-tone font-serif mt-7 max-w-4xl text-4xl leading-[1.1] sm:text-5xl md:text-7xl lg:text-[5.5rem] ${dark ? 'text-[#182c41]' : 'text-white'}`}
            style={{ transition: 'color 700ms ease' }}
          >
            平凡的日子，
            <br />
            也闪闪发光
          </h1>

          <p
            className={`hero-tone-dim font-sans mt-6 max-w-xl text-sm leading-relaxed sm:text-base ${dark ? 'text-[#182c41]/75' : 'text-white/80'}`}
            style={{ transition: 'color 700ms ease' }}
          >
            这里没有算法，只有生活。随手记下的琐碎日常，和认真打磨的小项目 ——
            像朋友圈一样随意，像作品集一样真诚。
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#moments"
              className={`hero-solid font-sans group flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-all duration-300 hover:opacity-90 ${
                dark ? 'bg-[#182c41] text-white' : 'bg-white text-[#182c41]'
              }`}
              style={{ transition: 'background 700ms ease, color 700ms ease' }}
            >
              看看我的日常
              <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#projects"
              className="liquid-glass hero-tone-dim font-sans rounded-full px-7 py-3 text-sm transition-colors duration-300 hover:text-white"
            >
              逛逛独立项目
            </a>
          </div>

          {/* 视频切换器 */}
          <div className="mt-12 flex items-center justify-center gap-3 sm:gap-6">
            {VIDEOS.map((v, i) => {
              const on = i === activeVideo
              return (
                <button
                  key={v.label}
                  onClick={() => switchVideo(i)}
                  title={v.en}
                  className="group flex flex-col items-center gap-2 outline-none"
                >
                  <span
                    className={`font-sans text-xs tracking-wide transition-all duration-500 sm:text-sm ${
                      on
                        ? dark
                          ? 'text-[#182c41]'
                          : 'text-white'
                        : dark
                          ? 'text-[#182c41]/40 group-hover:text-[#182c41]/70'
                          : 'text-white/50 group-hover:text-white/80'
                    }`}
                    style={{ transition: 'color 700ms ease' }}
                  >
                    {v.label}
                  </span>
                  <span
                    className={`h-[2px] w-8 rounded-full transition-all duration-500 ${
                      on ? (dark ? 'bg-[#182c41]/80' : 'bg-white/90') : 'bg-transparent'
                    }`}
                    style={{ transition: 'background-color 700ms ease' }}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* 底部统计（始终白色） */}
        <div className="pb-7 pt-4">
          <div className="font-sans flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 text-xs text-white/70 sm:text-sm">
            <span>217 条日常</span>
            <span className="hidden text-white/25 sm:inline">|</span>
            <span>9 个小项目</span>
            <span className="hidden text-white/25 sm:inline">|</span>
            <span>1,284 杯咖啡</span>
            <span className="hidden text-white/25 sm:inline">|</span>
            <span>∞ 份热爱</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Moments —— 日常（朋友圈风格瀑布流）
   ============================================================ */

function Moments() {
  return (
    <section id="moments" className="grain relative bg-[#0a0e13] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <p className="font-serif text-lg italic text-champagne/90">Recent Moments</p>
          <h2 className="font-serif mt-2 text-4xl sm:text-5xl">最近的日子</h2>
          <p className="font-sans mt-4 max-w-xl text-sm leading-relaxed text-white/55">
            随手记下的碎片：一顿饭、一片云、一次深夜的顿悟。不追求完美，只记录真实。
          </p>
        </Reveal>

        <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {MOMENTS.map((m, i) => (
            <Reveal key={i} delay={(i % 3) * 90} className="mb-6 break-inside-avoid">
              <article className="liquid-glass group rounded-3xl p-3 transition-all duration-500 hover:-translate-y-1.5">
                <div className={`overflow-hidden rounded-2xl ${m.ratio}`}>
                  <img
                    src={m.img}
                    alt={m.tag}
                    loading="lazy"
                    className="img-fade h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="px-2 pb-2 pt-4">
                  <p className="font-sans text-sm leading-relaxed text-white/85">{m.text}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-sans text-xs text-white/40">{m.meta}</span>
                    <span className="font-sans rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-champagne/90">
                      {m.tag}
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="font-serif italic text-white/40">· 未完待续 ·</p>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================================================
   Projects —— 独立小项目
   ============================================================ */

function Projects() {
  return (
    <section id="projects" className="relative bg-[#0d131b] py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(60% 40% at 50% 0%, rgba(233,201,160,0.06) 0%, rgba(0,0,0,0) 70%)' }}
      />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <p className="font-serif text-lg italic text-champagne/90">Side Projects</p>
          <h2 className="font-serif mt-2 text-4xl sm:text-5xl">独立小项目</h2>
          <p className="font-sans mt-4 max-w-xl text-sm leading-relaxed text-white/55">
            一个人也能完成的小事：一个工具、一档播客、一本诗集。每一个都是认真打磨过的。
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 90}>
              <article className="liquid-glass group flex h-full flex-col rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1.5">
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${p.grad}`}
                  >
                    <p.icon size={22} className={p.accent} />
                  </div>
                  <span className="font-sans rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60">
                    {p.status}
                  </span>
                </div>
                <h3 className="font-serif mt-5 text-2xl">{p.name}</h3>
                <p className="font-sans mt-3 flex-1 text-sm leading-relaxed text-white/60">{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="font-sans rounded-full bg-white/5 px-3 py-1 text-[11px] text-white/50">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href="#projects"
                  className="font-sans mt-6 inline-flex items-center gap-1.5 text-sm text-champagne transition-colors hover:text-white"
                >
                  了解更多 <ArrowUp size={14} className="rotate-45" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   About + Footer
   ============================================================ */

function About() {
  const links = [
    { icon: Github, label: 'GitHub', href: 'https://github.com' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
    { icon: Rss, label: 'RSS', href: '#' },
    { icon: Mail, label: 'Email', href: 'mailto:hi@shiguang.dev' },
  ]
  return (
    <section id="about" className="grain relative bg-[#0a0e13] py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
        <Reveal>
          <p className="font-serif text-lg italic text-champagne/90">About</p>
          <h2 className="font-serif mt-2 text-4xl sm:text-5xl">关于我</h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="font-sans mt-8 text-sm leading-loose text-white/65 sm:text-base">
            你好，我是拾光 —— 白天写代码，傍晚拍云，深夜写点没人看的东西。
            <br className="hidden sm:block" />
            这个网站是我的数字花园：日常是随手种下的花，项目是认真搭的小房子。
            <br className="hidden sm:block" />
            如果你也喜欢把日子过出光泽，欢迎常来坐坐。
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="liquid-glass font-sans flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-white/80 transition-colors duration-300 hover:text-champagne"
              >
                <l.icon size={16} />
                {l.label}
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={280}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {['React', 'TypeScript', 'Tailwind', 'Node.js', '胶片摄影', '手冲咖啡', '深夜写作'].map((s) => (
              <span key={s} className="font-sans rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/55">
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#06090c] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 sm:flex-row sm:justify-between sm:px-10">
        <p className="font-sans text-xs text-white/40">
          © 2025 拾光 · 用咖啡因与好奇心搭建
        </p>
        <div className="flex items-center gap-6">
          <span className="font-sans flex items-center gap-1.5 text-xs text-white/40">
            平凡的日子，也闪闪发光 <Sparkles size={12} className="text-champagne" />
          </span>
          <a
            href="#top"
            aria-label="回到顶部"
            className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:text-champagne"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}

/* ============================================================
   App
   ============================================================ */

export default function App() {
  return (
    <main className="bg-[#06090c]">
      <Hero />
      <Moments />
      <Projects />
      <About />
      <Footer />
    </main>
  )
}
