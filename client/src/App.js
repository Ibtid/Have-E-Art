import './App.css';
import Navbar from './components/shared/Navbar/Navbar';
import HomePage from './pages/Home/HomePage';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import MyCollection from './pages/MyCollection/MyCollection';
import Checkout from './pages/Checkout/Checkout';
import MyProfile from './components/Profiles/MyProfile';
import UserProfile from './components/Profiles/UserProfile';
import Following from './pages/Following/Following';
import Messages from './pages/Messages/Messages';
import CompleteCheckout from './pages/Checkout/CompleteCheckout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ComponentWithSideBar from './layouts/ComponentWithSideBar';
import ComponentWithOutSideBar from './layouts/ComponentWithOutSideBar';
import AddProduct from './pages/AddorEditProduct/AddProduct';
import BoughtShowcase from './components/ShowCase/BoughtShowcase';

import { useContext, useEffect, useState } from 'react';
import { AppContext } from './hooks/AppContext';

import ForSaleShowcase from './components/ShowCase/ForSaleShowcase';
import GalleryShowcase from './components/ShowCase/GalleryShowcase';
import OwnedShowcase from './components/ShowCase/OwnedShowcase';
import EditProduct from './pages/AddorEditProduct/EditProduct';
import dispatch from './dispatcher/dispatch';
import actions from './dispatcher/actions';
import Spinkit from './modals/Spinkit/Spinkit';
import MyProfilePage from './pages/Profiles/MyProfilePage';
import UserProfilePage from './pages/Profiles/UserProfilePage';

function App() {
  const [showSpinner, setShowSpinner] = useState(false);
  const { contextStore, setContextStore } = useContext(AppContext);
  useEffect(() => {
    (async () => {
      if (localStorage.getItem('user')) {
        console.log(localStorage.getItem('user'));
        setShowSpinner(true);
        let user = JSON.parse(localStorage.getItem('user'));
        const response = await dispatch(
          actions.getMyProfile,
          {},
          {},
          user.token
        );
        console.log(response);
        if (response.errors) {
          setShowSpinner(false);
          return;
        }
        user = { ...response, token: user.token };
        setContextStore({
          ...contextStore,
          loggedIn: true,
          user,
        });
        localStorage.setItem('user', JSON.stringify(user));
        setShowSpinner(false);
      }
    })();
  }, []);
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        {console.log(showSpinner)}
        {showSpinner && <Spinkit />}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/:attribute' element={<HomePage />} />
          <Route path='/following' element={<Following />} />

          <Route
            path='/MyCollection/BoughtShowcase'
            element={
              <MyCollection>
                <BoughtShowcase />
              </MyCollection>
            }
          />
          <Route
            path='/MyCollection/ForSaleShowcase'
            element={
              <MyCollection>
                <ForSaleShowcase />
              </MyCollection>
            }
          />
          <Route
            path='/MyCollection/GalleryShowcase'
            element={
              <MyCollection>
                <GalleryShowcase />
              </MyCollection>
            }
          />

          <Route
            path='/MyCollection/OwnedShowcase'
            element={
              <MyCollection>
                <OwnedShowcase />
              </MyCollection>
            }
          />

          <Route path='/messages' element={<Messages />} />
          <Route path='/product/:id' element={<ProductDetails />} />

          <Route path='/product/add' element={<AddProduct />} />

          <Route path='/product/edit/:id' element={<EditProduct />} />

          <Route path='/checkout' element={<Checkout />} />

          <Route path='/checkoutComplete' element={<CompleteCheckout />} />
          <Route path='/profile' element={<MyProfilePage />} />
          <Route path='/profile/:id' element={<UserProfilePage />} />
          <Route path='/messages/:chatId' element={<Messages />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
