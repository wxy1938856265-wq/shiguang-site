import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// 初始化 Netlify Identity：自动处理邀请确认、设置密码、重置密码等 URL 回调
declare global {
  interface Window {
    netlifyIdentity?: { init: () => void }
  }
}
window.netlifyIdentity?.init()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
