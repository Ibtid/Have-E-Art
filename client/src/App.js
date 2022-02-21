import './App.css';
import Navbar from './components/shared/Navbar/Navbar';
import SecondaryNav from './components/shared/SecondaryNav/SecondaryNav';
import Sidebar from './components/shared/Sidebar/Sidebar';
import Home from './pages/Home/Home';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import MyCollection from './pages/MyCollection/MyCollection';
import Checkout from './pages/Checkout/Checkout';
import MyProfile from './pages/Profiles/MyProfile';
import UserProfile from './pages/Profiles/UserProfile';
import Following from './pages/Following/Following';
import Messages from './pages/Messages/Messages';
import CompleteCheckout from './pages/Checkout/CompleteCheckout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ComponentWithSideBar from './layouts/ComponentWithSideBar';
import ComponentWithOutSideBar from './layouts/ComponentWithOutSideBar';

function App() {
  let signedIn = true;

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
          <Route
            path='/product/:id'
            element={
              <ComponentWithOutSideBar>
                <ProductDetails />
              </ComponentWithOutSideBar>
            }
          />
        </Routes>
        {/*componentWithOutSideBar(<Checkout />)*/}
        {/*componentWithOutSideBar(<CompleteCheckout />)*/}
        {/*componentWithSideBar(<MyProfile />)*/}
        {/*componentWithSideBar(<UserProfile />)*/}
      </div>
    </BrowserRouter>
  );
}

export default App;
