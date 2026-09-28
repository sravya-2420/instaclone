import Header from '../Header'

import './index.css'

const Loading = () => {
  return (
    <div className="loading-page">
      <Header />

      <main className="loading-content">
        <div className="loading-spinner"></div>
      </main>
    </div>
  )
}

export default Loading