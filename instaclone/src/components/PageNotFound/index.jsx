import {useNavigate} from 'react-router-dom'

import pageNotFoundImage from '../../assets/erroring 1.png'

import './index.css'

const PageNotFound = () => {
  const navigate = useNavigate()

  const onGoHome = () => {
    navigate('/')
  }

  return (
    <div className="page-not-found-container">
      <div className="page-not-found-content">

        <img
          src={pageNotFoundImage}
          alt="Page Not Found"
          className="page-not-found-image"
        />

        <h1 className="page-not-found-heading">
          Page Not Found
        </h1>

        <p className="page-not-found-description">
          we are sorry, the page you requested could not be found.
        </p>

        <p className="page-not-found-description">
          Please go back to the home page.
        </p>

        <button
          type="button"
          className="home-page-button"
          onClick={onGoHome}
        >
          Home Page
        </button>

      </div>
    </div>
  )
}

export default PageNotFound