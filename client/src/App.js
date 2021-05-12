import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import MainPage from './components/pages/MainPage'
import AllNotesPage from './components/pages/AllNotesPage'
import LoginForm from "./components/forms/LoginForm"
import SettingsPage from "./components/pages/SettingsPage"
import ArchivePage from './components/pages/ArchivePage'
import TrashPage from './components/pages/TrashPage'
import BasicFormPage from "./components/pages/BasicFormPage"
import ForgotPasswordForm from "./components/forms/ForgotPasswordForm"
import ResetPasswordPage from "./components/pages/ResetPasswordPage"
import NotFoundPage from "./components/pages/NotFoundPage"

import useToken from './hooks/useToken'
import {isExpired} from 'react-jwt'

export default function App() {
  const [token, setToken] = useToken()

  function isAuth() {
    return (token && !isExpired(token))
  }
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            {isAuth() ? <Redirect to="/notes/all" /> : <MainPage />}
          </Route>
          <Route exact path="/home">
            <MainPage />
          </Route>
          <Route path="/login">
            <BasicFormPage form={<LoginForm />} />
          </Route>
          <Route path="/notes/all">
            <AllNotesPage />
          </Route>
          <Route path="/notes/archive">
            <ArchivePage />
          </Route>
          <Route path="/notes/trash">
            <TrashPage />
          </Route>
          <Route path="/settings">
            <SettingsPage />
          </Route>
          <Route path="/forgot-password">
            <BasicFormPage form={<ForgotPasswordForm />} />
          </Route>
          <Route path="/reset-password-page/:token" component={ResetPasswordPage} />
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}