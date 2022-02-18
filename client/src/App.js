import './App.css';
import Navbar from './components/shared/Navbar/Navbar';
import SecondaryNav from './components/shared/SecondaryNav/SecondaryNav';
import Sidebar from './components/shared/Sidebar/Sidebar';
import Authentication from './pages/Authentication/Authentication';
import Home from './pages/Home/Home';

function App() {
  let signedIn = true;
  return (
    <div className='App'>
      <Navbar user={signedIn} />
      <div className='app_bodyWithSideBar'>
        <Sidebar />
        <div>
          {signedIn && <SecondaryNav />}
          <div
            className={
              signedIn ? 'app__authenticated' : 'app__notAuthenticated'
            }>
            {/*Change Component*/}
            <Home />
            <div className='home__scrollShade'></div>
          </div>
        </div>
      </div>
      {/*<Authentication />*/}
      {/*My Profile */}
      {/*Users Profile */}
      {/*Home */}
      {/*Productdetails*/}
    </div>
  );
}

export default App;
