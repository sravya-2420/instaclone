import Header from '../Header'
import UserStories from '../UserStories'
import Posts from '../Post'

import './index.css'

const Home = () => {
  return (
    <div className="home-container">
      <Header />

      <main className="home-content">
        <UserStories />
        <Posts />
      </main>
    </div>
  )
}

export default Home