import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react'
import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowDown,
  ArrowUp,
  Bell,
  BookOpen,
  CalendarHeart,
  Camera,
  Coffee,
  Feather,
  Github,
  Globe,
  Heart,
  Instagram,
  ListMusic,
  Mail,
  Menu,
  Mic,
  Music,
  Palette,
  Pause,
  Play,
  Rocket,
  Rss,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react'
import momentsData from '../public/data/moments.json'
import projectsData from '../public/data/projects.json'
import siteData from '../public/data/site.json'

/* ============================================================
   素材与数据
   ============================================================ */

const VIDEOS = [
  { url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4', label: '暮色', en: 'Golden Hour' },
  { url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4', label: '流水', en: 'Still Water' },
  { url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4', label: '深林', en: 'Deep Woods' },
  { url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4', label: '晨曦', en: 'Quiet Dawn' },
]

type Moment = { img: string; ratio: string; text: string; meta: string; tag: string }
type Project = {
  name: string
  slug?: string
  icon: string
  desc: string
  tags: string[]
  status: string
  color: string
  body?: string
  gallery?: string[]
  links?: { label: string; url: string }[]
}
type Site = {
  brand: string
  badge: string
  heading1: string
  heading2: string
  subtext: string
  stats: string[]
  aboutText: string
  skills: string[]
  footerNote: string
}

const FALLBACK_SITE = siteData as Site

const FALLBACK_MOMENTS = (momentsData as { items: Moment[] }).items
const FALLBACK_PROJECTS = (projectsData as { items: Project[] }).items

const RATIO_MAP: Record<string, string> = {
  '4/3': 'aspect-[4/3]',
  '3/4': 'aspect-[3/4]',
  '1/1': 'aspect-square',
  '4/5': 'aspect-[4/5]',
  '16/10': 'aspect-[16/10]',
  '16/9': 'aspect-[16/9]',
}

const ICON_MAP: Record<string, LucideIcon> = {
  calendar: CalendarHeart,
  feather: Feather,
  bell: Bell,
  mic: Mic,
  palette: Palette,
  terminal: Terminal,
  camera: Camera,
  coffee: Coffee,
  heart: Heart,
  rocket: Rocket,
  book: BookOpen,
  globe: Globe,
  music: Music,
}

const COLOR_MAP: Record<string, { grad: string; accent: string }> = {
  amber: { grad: 'from-amber-200/25 to-orange-300/10', accent: 'text-amber-200' },
  rose: { grad: 'from-rose-200/25 to-pink-300/10', accent: 'text-rose-200' },
  sky: { grad: 'from-sky-200/25 to-cyan-300/10', accent: 'text-sky-200' },
  violet: { grad: 'from-violet-200/25 to-purple-300/10', accent: 'text-violet-200' },
  emerald: { grad: 'from-emerald-200/25 to-teal-300/10', accent: 'text-emerald-200' },
  zinc: { grad: 'from-zinc-200/25 to-slate-300/10', accent: 'text-zinc-200' },
}

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

function Nav({ onMenu, brand }: { onMenu: () => void; brand: string }) {
  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-10 md:px-14">
      <a href="#top" className="font-serif text-xl italic tracking-wide text-white sm:text-2xl">
        {brand}<span className="not-italic text-champagne">✦</span>
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

function Hero({ site }: { site: Site }) {
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
        <Nav onMenu={() => setMenuOpen(true)} brand={site.brand} />
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

        {/* 中央内容 */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div
            className={`liquid-glass hero-tone-dim rounded-full px-5 py-2 font-sans text-[11px] tracking-[0.18em] sm:text-xs ${dark ? 'text-[#182c41]/70' : 'text-white/75'}`}
          >
            ✦ {site.badge}
          </div>

          <h1
            className={`hero-tone font-serif mt-7 max-w-4xl text-4xl leading-[1.1] sm:text-5xl md:text-7xl lg:text-[5.5rem] ${dark ? 'text-[#182c41]' : 'text-white'}`}
            style={{ transition: 'color 700ms ease' }}
          >
            {site.heading1}
            <br />
            {site.heading2}
          </h1>

          <p
            className={`hero-tone-dim font-sans mt-6 max-w-xl text-sm leading-relaxed sm:text-base ${dark ? 'text-[#182c41]/75' : 'text-white/80'}`}
            style={{ transition: 'color 700ms ease' }}
          >
            {site.subtext}
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
        <div className="pb-24 pt-4">
          <div className="font-sans flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 text-xs text-white/70 sm:text-sm">
            {site.stats.map((s, i) => (
              <Fragment key={i}>
                {i > 0 && <span className="hidden text-white/25 sm:inline">|</span>}
                <span>{s}</span>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Moments —— 日常（朋友圈风格瀑布流）
   ============================================================ */

function Moments({ items }: { items: Moment[] }) {
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
          {items.map((m, i) => (
            <Reveal key={i} delay={(i % 3) * 90} className="mb-6 break-inside-avoid">
              <article className="liquid-glass group rounded-3xl p-3 transition-all duration-500 hover:-translate-y-1.5">
                <div className={`overflow-hidden rounded-2xl ${RATIO_MAP[m.ratio] ?? 'aspect-[4/3]'}`}>
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

function Projects({ items }: { items: Project[] }) {
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
          {items.map((p, i) => {
            const Icon = ICON_MAP[p.icon] ?? Sparkles
            const color = COLOR_MAP[p.color] ?? COLOR_MAP.amber
            return (
              <Reveal key={p.name} delay={(i % 3) * 90}>
                <article className="liquid-glass group flex h-full flex-col rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1.5">
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${color.grad}`}
                    >
                      <Icon size={22} className={color.accent} />
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
                  <Link
                    to={`/project/${p.slug ?? encodeURIComponent(p.name)}`}
                    className="font-sans mt-6 inline-flex items-center gap-1.5 text-sm text-champagne transition-colors hover:text-white"
                  >
                    了解更多 <ArrowUp size={14} className="rotate-45" />
                  </Link>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   About + Footer
   ============================================================ */

function About({ site }: { site: Site }) {
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
          <p className="font-sans mt-8 text-sm leading-loose text-white/65 sm:text-base whitespace-pre-line">
            {site.aboutText}
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
            {site.skills.map((s) => (
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

function Footer({ site }: { site: Site }) {
  return (
    <footer className="border-t border-white/5 bg-[#06090c] pb-32 pt-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 sm:flex-row sm:justify-between sm:px-10">
        <p className="font-sans text-xs text-white/40">
          {site.footerNote}
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
   ProjectDetail —— 项目详情页
   ============================================================ */

function ProjectDetail() {
  const { slug = '' } = useParams()
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS)
  const [lightbox, setLightbox] = useState<string | null>(null)

  useEffect(() => {
    fetch('/data/projects.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('projects fetch failed'))))
      .then((d) => Array.isArray(d?.items) && setProjects(d.items))
      .catch(() => {})
  }, [])

  const p = projects.find((x) => (x.slug ?? x.name) === slug)
  if (!p) {
    return (
      <section className="grain relative flex min-h-screen flex-col items-center justify-center bg-[#0a0e13] px-6 text-center">
        <p className="font-serif text-3xl italic text-white/60">项目不存在或已被删除</p>
        <Link
          to="/"
          className="liquid-glass font-sans mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm text-white/85 transition-colors hover:text-champagne"
        >
          <ArrowUp size={14} className="rotate-[-45deg]" /> 返回首页
        </Link>
      </section>
    )
  }

  const color = COLOR_MAP[p.color] ?? COLOR_MAP.amber
  const Icon = ICON_MAP[p.icon] ?? Sparkles
  const html = p.body ? (DOMPurify.sanitize(marked.parse(p.body, { async: false }) as string) as string) : ''

  return (
    <section className="grain relative min-h-screen bg-[#0a0e13]">
      {/* 顶栏 */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-10 md:px-14">
        <Link to="/" className="font-serif text-xl italic tracking-wide text-white sm:text-2xl">
          拾光<span className="not-italic text-champagne">✦</span>
        </Link>
        <Link
          to="/"
          className="liquid-glass font-sans flex items-center gap-2 rounded-full px-5 py-2 text-sm text-white/80 transition-colors hover:text-white"
        >
          <ArrowUp size={14} className="rotate-[-45deg]" /> 返回首页
        </Link>
      </header>

      <div className="relative mx-auto max-w-3xl px-6 pb-36 pt-10 sm:px-10">
        {/* 项目头部 */}
        <Reveal>
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${color.grad}`}>
              <Icon size={22} className={color.accent} />
            </div>
            <span className="font-sans rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60">
              {p.status}
            </span>
          </div>
          <h1 className="font-serif mt-5 text-4xl sm:text-5xl">{p.name}</h1>
          <p className="font-sans mt-5 text-sm leading-relaxed text-white/65 sm:text-base">{p.desc}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="font-sans rounded-full bg-white/5 px-3 py-1 text-[11px] text-white/50">
                {t}
              </span>
            ))}
          </div>
          {p.links && p.links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {p.links.map((l) => (
                <a
                  key={l.label}
                  href={l.url}
                  target={l.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="font-sans inline-flex items-center gap-1.5 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-[#182c41] transition-all duration-300 hover:opacity-90"
                >
                  {l.label} <ArrowUp size={14} className="rotate-45" />
                </a>
              ))}
            </div>
          )}
        </Reveal>

        {/* 图片画廊 */}
        {p.gallery && p.gallery.length > 0 && (
          <Reveal delay={100}>
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {p.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(img)}
                  className={`group overflow-hidden rounded-2xl border border-white/10 ${i === 0 ? 'sm:col-span-2' : ''}`}
                >
                  <img
                    src={img}
                    alt={`${p.name} ${i + 1}`}
                    loading="lazy"
                    className="img-fade aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {/* 正文（Markdown） */}
        {html && (
          <Reveal delay={150}>
            <div
              className="prose-dark liquid-glass mt-12 rounded-3xl px-6 py-8 sm:px-9"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </Reveal>
        )}

        <Reveal delay={200} className="mt-14 text-center">
          <Link
            to="/"
            className="liquid-glass font-sans inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm text-white/85 transition-colors hover:text-champagne"
          >
            <ArrowUp size={14} className="rotate-[-45deg]" /> 返回项目列表
          </Link>
        </Reveal>
      </div>

      {/* 大图预览 */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="预览" className="img-fade max-h-[90vh] max-w-full rounded-2xl" />
        </div>
      )}

    </section>
  )
}

/* ============================================================
   MusicPlayer —— 底部悬浮音乐播放器
   ============================================================ */

type LyricLine = { time: number; text: string }

function parseLrc(raw: string): LyricLine[] {
  const lines: LyricLine[] = []
  const re = /\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g
  for (const line of raw.split('\n')) {
    const times: number[] = []
    re.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = re.exec(line)) !== null) {
      const min = parseInt(m[1], 10)
      const sec = parseInt(m[2], 10)
      const frac = m[3] ? parseFloat(`0.${m[3]}`) : 0
      times.push(min * 60 + sec + frac)
    }
    const text = line.replace(re, '').trim()
    if (times.length && text) for (const t of times) lines.push({ time: t, text })
  }
  return lines.sort((a, b) => a.time - b.time)
}

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [lyricsOpen, setLyricsOpen] = useState(false)
  const [lyrics, setLyrics] = useState<LyricLine[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const audio = new Audio('/music/departures.mp3')
    audio.preload = 'metadata'
    audioRef.current = audio

    const onTime = () => {
      setCurrentTime(audio.currentTime)
      setDuration(audio.duration || 0)
    }
    const onEnded = () => setIsPlaying(false)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onTime)
    audio.addEventListener('ended', onEnded)

    // 进站自动播放（浏览器可能拦截，拦截后用户首次点击页面任意处时重试）
    const tryPlay = () => {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    }
    tryPlay()
    const onFirstInteraction = () => {
      if (!audio.paused) return
      tryPlay()
    }
    window.addEventListener('pointerdown', onFirstInteraction, { once: true })

    fetch('/music/lyrics.lrc')
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error('lrc failed'))))
      .then((t) => setLyrics(parseLrc(t)))
      .catch(() => {})

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onTime)
      audio.removeEventListener('ended', onEnded)
      window.removeEventListener('pointerdown', onFirstInteraction)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration
  }

  const activeIndex = lyrics.reduce((acc, l, i) => (l.time <= currentTime ? i : acc), -1)
  const activeLine = activeIndex >= 0 ? lyrics[activeIndex] : null

  // 歌词面板自动滚动到当前行
  useEffect(() => {
    if (lyricsOpen && listRef.current && activeIndex >= 0) {
      const el = listRef.current.children[activeIndex] as HTMLElement | undefined
      el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
  }, [activeIndex, lyricsOpen])

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
  const pct = duration ? Math.min(100, (currentTime / duration) * 100) : 0

  return (
    <>
      {/* 歌词面板 */}
      {lyricsOpen && (
        <div className="fixed bottom-24 left-1/2 z-40 w-[min(92vw,30rem)] -translate-x-1/2">
          <div className="liquid-glass rounded-3xl px-5 pb-3 pt-4">
            <div className="flex items-center justify-between">
              <p className="font-sans truncate text-xs text-white/55">
                Departures 〜あなたにおくるアイの歌〜 · EGOIST
              </p>
              <button
                onClick={() => setLyricsOpen(false)}
                aria-label="关闭歌词"
                className="ml-3 shrink-0 text-white/60 transition-colors hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
            <div ref={listRef} className="mt-3 max-h-[40vh] space-y-2.5 overflow-y-auto pr-1">
              {lyrics.map((l, i) => (
                <p
                  key={i}
                  className={`font-sans text-sm leading-relaxed transition-colors duration-500 ${
                    i === activeIndex ? 'text-champagne' : 'text-white/40'
                  }`}
                >
                  {l.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 底部播放条 */}
      <div className="fixed bottom-4 left-1/2 z-40 w-[min(94vw,26rem)] -translate-x-1/2">
        <div className="liquid-glass relative flex items-center gap-3 rounded-full py-2 pl-2 pr-3">
          {/* 进度条 */}
          <div
            onClick={seek}
            className="absolute inset-x-3 top-0 h-[2px] cursor-pointer rounded-full bg-white/15"
          >
            <div
              className="h-full rounded-full bg-champagne/80"
              style={{ width: `${pct}%` }}
            />
          </div>

          <button
            onClick={toggle}
            aria-label={isPlaying ? '暂停' : '播放'}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#182c41] shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </button>

          <div className="min-w-0 flex-1 text-left">
            <p className="font-sans truncate text-[11px] text-white/55">
              Departures 〜あなたにおくるアイの歌〜 · EGOIST
            </p>
            <p
              key={activeIndex}
              className="font-sans img-fade truncate text-sm text-white/90"
            >
              {activeLine?.text ?? (lyrics.length ? '…' : '点击播放')}
            </p>
          </div>

          <button
            onClick={() => setLyricsOpen((v) => !v)}
            aria-label="歌词"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/70 transition-colors hover:text-champagne"
          >
            {lyricsOpen ? <X size={16} /> : <ListMusic size={16} />}
          </button>

          <span className="font-sans hidden shrink-0 text-[10px] text-white/40 sm:block">
            {fmt(currentTime)} / {fmt(duration)}
          </span>
        </div>
      </div>
    </>
  )
}

/* ============================================================
   App
   ============================================================ */

function Home({ site, moments, projects }: { site: Site; moments: Moment[]; projects: Project[] }) {
  return (
    <main className="bg-[#06090c]">
      <Hero site={site} />
      <Moments items={moments} />
      <Projects items={projects} />
      <About site={site} />
      <Footer site={site} />
    </main>
  )
}

export default function App() {
  const [moments, setMoments] = useState<Moment[]>(FALLBACK_MOMENTS)
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS)
  const [site, setSite] = useState<Site>(FALLBACK_SITE)

  useEffect(() => {
    fetch('/data/moments.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('moments fetch failed'))))
      .then((d) => Array.isArray(d?.items) && setMoments(d.items))
      .catch(() => {})
    fetch('/data/projects.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('projects fetch failed'))))
      .then((d) => Array.isArray(d?.items) && setProjects(d.items))
      .catch(() => {})
    fetch('/data/site.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('site fetch failed'))))
      .then((d) => d && typeof d === 'object' && setSite(d))
      .catch(() => {})
  }, [])

  return (
    <BrowserRouter>
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<Home site={site} moments={moments} projects={projects} />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>
  )
}
