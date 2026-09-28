import Header from '../Header'
import {useNavigate} from 'react-router-dom'

import somethingWentWrongImage from '../../assets/Group 7522.png'

import './index.css'

const SomethingWentWrong = () => {
  const navigate = useNavigate()

  const onTryAgain = () => {
    navigate('/')
  }

  return (
    <div className="something-wrong-page">
      <Header />

      <main className="something-wrong-content">
        <img
          src={somethingWentWrongImage}
          alt="Something went wrong"
          className="something-wrong-image"
        />

        <h1 className="something-wrong-heading">
          Something went wrong. Please try again
        </h1>

        <button
          type="button"
          className="try-again-button"
          onClick={onTryAgain}
        >
          Try again
        </button>
      </main>
    </div>
  )
}

export default SomethingWentWrong