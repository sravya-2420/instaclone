import {useSearchParams} from 'react-router-dom'

import Header from '../Header'

import firstPostImage from '../../assets/Frame 1469.png'
import secondPostImage from '../../assets/Frame 1470.png'

import firstProfileImage from '../../assets/Mask Group.png'
import secondProfileImage from '../../assets/Rectangle 1687.png'

import searchNotFoundImage from '../../assets/Group (1).png'

import './index.css'

const SearchResults = () => {
  const [searchParams] = useSearchParams()

  const searchValue = searchParams.get('search') || ''

  const normalizedSearch = searchValue.trim().toLowerCase()

  
  const isValidSearch =
    normalizedSearch === 'sunrise' ||
    normalizedSearch === 'beautiful sunrise'

  const posts = [
    {
      id: 1,
      userName: 'Wade Warren',
      profileImage: firstProfileImage,
      image: firstPostImage,
      likes: '1,081',
      caption:
        'Beautiful sunrise with greenery enjoying the view.',
      time: '1 Hour ago',
    },
    {
      id: 2,
      userName: 'Discovery',
      profileImage: secondProfileImage,
      image: secondPostImage,
      likes: '2,354',
      caption:
        'Beautiful view of nature with amazing scenery.',
      time: '1 Hour ago',
    },
  ]

  return (
    <>
      <Header />

      <main className="search-results-page">
        <div className="search-results-container">

          {isValidSearch ? (
            <>
              <h1 className="search-results-heading">
                Search Results
              </h1>

              <div className="search-results-list">

                {posts.map(post => (
                  <article
                    className="search-result-card"
                    key={post.id}
                  >
                    <div className="search-result-user">

                      <img
                        src={post.profileImage}
                        alt={post.userName}
                        className="search-result-profile"
                      />

                      <p className="search-result-username">
                        {post.userName}
                      </p>

                    </div>

                    <img
                      src={post.image}
                      alt={post.caption}
                      className="search-result-image"
                    />

                    <div className="search-result-details">

                      <div className="search-actions">

                        <button
                          type="button"
                          className="action-button"
                        >
                          ♡
                        </button>

                        <button
                          type="button"
                          className="action-button"
                        >
                          ♡
                        </button>

                        <button
                          type="button"
                          className="action-button"
                        >
                          ↗
                        </button>

                      </div>

                      <p className="search-result-likes">
                        {post.likes} likes
                      </p>

                      <p className="search-result-caption">
                        {post.caption}
                      </p>

                      <p className="search-result-time">
                        {post.time}
                      </p>

                    </div>
                  </article>
                ))}

              </div>
            </>
          ) : (
            <div className="search-not-found">

              <div className="search-not-found-content">

                <img
                  src={searchNotFoundImage}
                  alt="Search Not Found"
                  className="search-not-found-image"
                />

                <h1>
                  Search Not Found
                </h1>

                <p>
                  Try different keyword or search again
                </p>

              </div>

            </div>
          )}

        </div>
      </main>
    </>
  )
}

export default SearchResults