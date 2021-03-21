import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import MainPage from './components/MainPage'
import AllNotesPage from './components/AllNotesPage';
import LoginPage from "./components/LoginPage";
import SettingsPage from "./components/SettingsPage";
import ArchivePage from './components/ArchivePage'
import TrashPage from './components/TrashPage'
import NavbarComponent from "./components/NavbarComponent";

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/notes/all">
            <NavbarComponent></NavbarComponent>
            <AllNotesPage />
          </Route>
          <Route path="/notes/archive">
            <NavbarComponent></NavbarComponent>
            <ArchivePage />
          </Route>
          <Route path="/notes/trash">
            <NavbarComponent></NavbarComponent>
            <TrashPage></TrashPage>
          </Route>
          <Route path="/settings">
            <NavbarComponent></NavbarComponent>
            <SettingsPage></SettingsPage>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}