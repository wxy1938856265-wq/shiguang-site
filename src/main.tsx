import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import netlifyIdentity from 'netlify-identity-widget'
import './index.css'
import App from './App'

// 初始化 Netlify Identity：处理邀请确认、设置密码、重置密码等 URL 回调
netlifyIdentity.init()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
