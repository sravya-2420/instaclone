import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import logo from '../../assets/Group.png'

import './index.css'

const Header = () => {
  const [searchInput, setSearchInput] = useState('')

  const navigate = useNavigate()

  const onSearch = event => {
    setSearchInput(event.target.value)
  }

  const onSubmitSearch = event => {
    event.preventDefault()

    const value = searchInput.trim()

    if (value === '') {
      return
    }

    const searchValue = value.toLowerCase()

   
    if (searchValue === 'loading') {
      navigate('/loading')
      return
    }

   
    if (
      searchValue === 'homefailure' ||
      searchValue === 'home failure' ||
      searchValue === 'home_failure'
    ) {
      navigate('/home-failure')
      return
    }

    
    if (
      searchValue === 'page not found' ||
      searchValue === 'page_not_found' ||
      searchValue === 'pagenotfound'
    ) {
      navigate('/page-not-found')
      return
    }

   
    if (
      searchValue === 'something went wrong' ||
      searchValue === 'something_went_wrong' ||
      searchValue === 'somethingwentwrong'
    ) {
      navigate('/something-went-wrong')
      return
    }

    
    if (searchValue === 'rahul') {
      navigate('/users/rahul')
      return
    }

   
    if (
      searchValue === 'varun' ||
      searchValue === 'varun aadithya'
    ) {
      navigate('/users/Varun_Aadithya')
      return
    }

    
    if (
      searchValue === 'dabbo' ||
      searchValue === 'dabboo' ||
      searchValue === 'dabbo ratnani' ||
      searchValue === 'dabboo ratnani'
    ) {
      navigate('/users/Dabboo_Ratnani')
      return
    }

    
    navigate(
      `/search-results?search=${encodeURIComponent(value)}`
    )
  }

  const onLogout = () => {
    document.cookie =
      'jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

    navigate('/login')
  }

  return (
    <header className="header-container">
      <div className="header-content">

        <Link to="/" className="logo-link">
          <img
            src={logo}
            alt="Insta Share"
            className="logo-image"
          />

          <span className="logo-text">
            Insta Share
          </span>
        </Link>

        <form
          className="search-container"
          onSubmit={onSubmitSearch}
        >
          <input
            type="search"
            placeholder="Search Caption"
            value={searchInput}
            onChange={onSearch}
          />

          <button
            type="submit"
            className="search-button"
            aria-label="Search"
          >
            🔍
          </button>
        </form>

        <nav className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/profile">
            Profile
          </Link>

          <button
            type="button"
            onClick={onLogout}
          >
            Logout
          </button>

        </nav>

      </div>
    </header>
  )
}

export default Header