import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MainPage from './components/MainPage'
import AllNotesPage from './components/AllNotesPage';
import LoginForm from "./components/LoginForm";
import SettingsPage from "./components/SettingsPage";
import ArchivePage from './components/ArchivePage'
import TrashPage from './components/TrashPage'
import BasicFormPage from "./components/BasicFormPage";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import ResetPasswordPage from "./components/ResetPasswordPage";
import NotFoundPage from "./components/NotFoundPage";

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
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
  );
}