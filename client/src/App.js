import './App.css';
import Navbar from './components/shared/Navbar/Navbar';
import SecondaryNav from './components/shared/SecondaryNav/SecondaryNav';
import Sidebar from './components/shared/Sidebar/Sidebar';
import Authentication from './pages/Authentication/Authentication';
import Home from './pages/Home/Home';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import backIcon from './assets/icons/backIcon.svg';
import image1 from './assets/images/pexels-ayswarya-aish-2109147.jpg';

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

  const componentWithOutSideBar = (component) => {
    return (
      <div>
        <div className='app__scroll'>
          {signedIn && <SecondaryNav />}
          {/*Change Component*/}
          <div className='app__goback'>
            <img src={backIcon} />
            <div>Go back</div>
          </div>
          <div className='app__bigImageComponent'>
            <div className='app__bigImageContainer'>
              <img className='app__bigImage' src={image1} alt='art' />
            </div>
            <div className='app__bigImageText'>{component}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='App'>
      <Navbar user={signedIn} />
      {/*componentWithSideBar(<Home />)*/}
      {componentWithOutSideBar(<ProductDetails />)}
      {/*<Authentication />*/}
      
    </div>
  );
}

export default App;
