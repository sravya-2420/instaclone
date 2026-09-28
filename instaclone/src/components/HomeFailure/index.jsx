import Header from '../Header'
import UserStories from '../UserStories'

import './index.css'

const HomeFailure = () => {
  const onTryAgain = () => {
    window.location.reload()
  }

  return (
    <div className="home-failure-page">
      <Header />

      <main className="home-failure-content">
        <UserStories />

        <div className="home-failure-card">
          <div className="failure-icon">
            <span>!</span>
          </div>

          <p className="failure-message">
            Something went wrong. Please try again
          </p>

          <button
            type="button"
            className="failure-button"
            onClick={onTryAgain}
          >
            Try again
          </button>
        </div>
      </main>
    </div>
  )
}

export default HomeFailure