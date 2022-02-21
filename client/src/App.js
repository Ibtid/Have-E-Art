import './App.css';
import Navbar from './components/shared/Navbar/Navbar';
import SecondaryNav from './components/shared/SecondaryNav/SecondaryNav';
import Sidebar from './components/shared/Sidebar/Sidebar';
import Home from './pages/Home/Home';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import backIcon from './assets/icons/backIcon.svg';
import image1 from './assets/images/pexels-ayswarya-aish-2109147.jpg';
import MyCollection from './pages/MyCollection/MyCollection';
import Checkout from './pages/Checkout/Checkout';
import MyProfile from './pages/Profiles/MyProfile';
import UserProfile from './pages/Profiles/UserProfile';
import Following from './pages/Following/Following';
import Messages from './pages/Messages/Messages';
import CompleteCheckout from './pages/Checkout/CompleteCheckout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ComponentWithSideBar from './layouts/ComponentWithSideBar';

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
            {/*<div className='home__scrollShade'></div>*/}
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
    <BrowserRouter>
      <div className='App'>
        <Navbar user={signedIn} />
        <Routes>
          <Route
            path='/'
            element={
              <ComponentWithSideBar signedIn={signedIn}>
                <Home />
              </ComponentWithSideBar>
            }
          />
          <Route
            path='/following'
            element={
              <ComponentWithSideBar signedIn={signedIn}>
                <Following />
              </ComponentWithSideBar>
            }
          />
          <Route
            path='/MyCollection'
            element={
              <ComponentWithSideBar signedIn={signedIn}>
                <MyCollection />
              </ComponentWithSideBar>
            }
          />
          <Route path='/messages' element={<Messages />} />
        </Routes>

        {/*componentWithOutSideBar(<ProductDetails />)*/}
        {/*componentWithOutSideBar(<Checkout />)*/}
        {/*componentWithOutSideBar(<CompleteCheckout />)*/}
        {/*componentWithSideBar(<MyProfile />)*/}
        {/*componentWithSideBar(<UserProfile />)*/}
      </div>
    </BrowserRouter>
  );
}

export default App;
