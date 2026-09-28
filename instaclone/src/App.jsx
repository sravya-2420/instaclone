import {Routes, Route} from 'react-router-dom'

import Home from './components/Home'
import Profile from './components/Profile'
import UserDetails from './components/UserDetails'
import LoginForm from './components/LoginForm'
import SearchResults from './components/SearchResults'
import PageNotFound from './components/PageNotFound'
import SomethingWentWrong from './components/SomethingWentWrong'
import Loading from './components/Loading'
import HomeFailure from './components/HomeFailure'

const App = () => {
  return (
    <Routes>

      <Route
        path="/login"
        element={<LoginForm />}
      />

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/my-profile"
        element={<Profile />}
      />

      <Route
        path="/users/:id"
        element={<UserDetails />}
      />

      <Route
        path="/search-results"
        element={<SearchResults />}
      />

      <Route
        path="/page-not-found"
        element={<PageNotFound />}
      />

      <Route
        path="/something-went-wrong"
        element={<SomethingWentWrong />}
      />

      <Route
        path="/loading"
        element={<Loading />}
      />

      <Route
        path="/home-failure"
        element={<HomeFailure />}
      />

    </Routes>
  )
}

export default App