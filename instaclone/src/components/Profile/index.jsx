import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import './index.css'

const Header = () => {
  const [searchInput, setSearchInput] = useState('')
  const [users, setUsers] = useState([])

  const navigate = useNavigate()

  const onChangeSearch = async event => {
    const value = event.target.value

    setSearchInput(value)

    if (value.trim() === '') {
      setUsers([])
      return
    }

    const jwtToken = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith('jwt_token='))
      ?.split('=')[1]

    try {
      const response = await fetch(
        'https://apis.ccbp.in/insta-share/posts',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )

      const data = await response.json()

      if (response.ok) {
        const allPosts = data.posts || []

        const matchedUsers = allPosts.filter(post =>
          post.user_name
            .toLowerCase()
            .includes(value.toLowerCase()),
        )

        const uniqueUsers = []

        matchedUsers.forEach(user => {
          const alreadyExists = uniqueUsers.some(
            item => item.user_id === user.user_id,
          )

          if (!alreadyExists) {
            uniqueUsers.push(user)
          }
        })

        setUsers(uniqueUsers)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onClickUser = userId => {
    setSearchInput('')
    setUsers([])

    navigate(`/users/${userId}`)
  }

  return (
    <nav className="header-container">

      {/* LOGO */}
      <Link to="/" className="logo-link">
        <h1>Insta Share</h1>
      </Link>

      
      <div className="search-wrapper">

        <form
          className="search-container"
          onSubmit={event => event.preventDefault()}
        >
          <input
            type="search"
            placeholder="Search Caption"
            value={searchInput}
            onChange={onChangeSearch}
          />

          <button type="submit">
            🔍
          </button>
        </form>

        
        {users.length > 0 && (
          <div className="search-user-results">

            {users.map(user => (
              <button
                type="button"
                key={user.user_id}
                className="search-user-item"
                onClick={() => onClickUser(user.user_id)}
              >

                <img
                  src={user.profile_pic}
                  alt="user profile"
                />

                <span>
                  {user.user_name}
                </span>

              </button>
            ))}

          </div>
        )}

      </div>

      
      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/profile">
          My Profile
        </Link>

        <button type="button">
          Logout
        </button>

      </div>

    </nav>
  )
}

export default Header