import * as React from 'react'

import './style.scss'

const Loader: React.FC = () => (
  <div className="loader-container">
    <img src="https://i.pinimg.com/originals/da/66/6b/da666bcd1886ef0c63885cfc6e603f42.gif" />
    <div className="subtitle">Loading...</div>
  </div>
)

export default Loader
