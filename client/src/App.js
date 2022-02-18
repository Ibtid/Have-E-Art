import './App.css';
import Navbar from './components/shared/Navbar/Navbar';
import SecondaryNav from './components/shared/SecondaryNav/SecondaryNav';
import Sidebar from './components/shared/Sidebar/Sidebar';
import Authentication from './pages/Authentication/Authentication';
import Home from './pages/Home/Home';
import ProductDetails from './pages/ProductDetails/ProductDetails';

function App() {
  let signedIn = true;

  const componentWithSideBar = (component) => {
    return (
      <div className='app_bodyWithSideBar'>
        <Sidebar />
        <div>
          {signedIn && <SecondaryNav />}
          <div
            className={
              signedIn ? 'app__authenticated' : 'app__notAuthenticated'
            }>
            {/*Change Component*/}
            {component}
            <div className='home__scrollShade'></div>
          </div>
        </div>
      </div>
    );
  };

  const componentWithSecondaryNav = (component) => {
    return (
      <div>
        {signedIn && <SecondaryNav />}

        <div
          className={signedIn ? 'app__authenticated' : 'app__notAuthenticated'}>
          {/*Change Component*/}
          {component}
          <div className='home__scrollShade'></div>
        </div>
      </div>
    );
  };

  return (
    <div className='App'>
      <Navbar user={signedIn} />
      {componentWithSideBar(<Home />)}
      {/*componentWithSecondaryNav(<ProductDetails />)*/}
      {/*<Authentication />*/}
    </div>
  );
}

export default App;
