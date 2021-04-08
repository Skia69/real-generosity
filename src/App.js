import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Layout from './components/Layout';
import { useAuth } from './contexts/AuthContext';
import AboutPage from './pages/AboutUs';
import AddItemPage from './pages/AddItemPage';
import AdminPage from './pages/AdminPage';
import ContactUsPage from './pages/ContactUsPage';
import HomePage from './pages/HomePage';
import ItemsPage from './pages/ItemsPage';
// import FilteredItemsPage from './pages/FilteredItemsPage';
import ProfilePage from './pages/ProfilePage';
import EditProfile from './pages/EditProfile';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import SingleItemPage from './pages/SingleItemPage';

function App() {
  const currentUser = useAuth();

  return (
    <div>
      <Router>
        <Suspense fallback="loading">
          <Layout>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/auth/signin">
                <SignInPage />
              </Route>
              <Route exact path="/auth/signup">
                <SignUpPage />
              </Route>
              <Route exact path="/add-item">
                {currentUser ? <AddItemPage /> : <Redirect to="/auth/signin" />}
              </Route>
              <Route exact path="/items">
                <ItemsPage />
              </Route>
              <Route exact path="/items/:category">
                <ItemsPage />
              </Route>
              <Route exact path="/item/:id">
                <SingleItemPage />
              </Route>
              <Route exact path="/item/:id/:tab">
                <SingleItemPage />
              </Route>
              <Route exact path="/about">
                <AboutPage />
              </Route>
              <Route exact path="/contactus">
                <ContactUsPage />
              </Route>
              <Route exact path="/profile/:uid">
                <ProfilePage />
              </Route>
              <Route exact path="/profile/:uid/:tab">
                <ProfilePage />
              </Route>

              <Route exact path="/admin">
                <AdminPage />
              </Route>
              <Route exact path="/profile/:uid/edit/info">
                <EditProfile />
              </Route>
            </Switch>
          </Layout>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
