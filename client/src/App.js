import './App.css';
import Navbar from './components/shared/Navbar/Navbar';
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
import AddProduct from './pages/AddorEditProduct/AddProduct';
import BoughtShowcase from './components/ShowCase/BoughtShowcase';

import { useContext, useEffect } from 'react';
import { AppContext } from './hooks/AppContext';

import ForSaleShowcase from './components/ShowCase/ForSaleShowcase';
import GalleryShowcase from './components/ShowCase/GalleryShowcase';
import OwnedShowcase from './components/ShowCase/OwnedShowcase';
import EditProduct from './pages/AddorEditProduct/EditProduct';

function App() {
  const { contextStore, setContextStore } = useContext(AppContext);
  useEffect(() => {
    if (localStorage.getItem('user')) {
      console.log(localStorage.getItem('user'));
      setContextStore({
        ...contextStore,
        loggedIn: true,
        user: JSON.parse(localStorage.getItem('user')),
      });
    }
  }, []);
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={
              <ComponentWithSideBar>
                <Home />
              </ComponentWithSideBar>
            }
          />
          <Route
            path='/:attribute'
            element={
              <ComponentWithSideBar>
                <Home />
              </ComponentWithSideBar>
            }
          />
          <Route
            path='/following'
            element={
              <ComponentWithSideBar>
                <Following />
              </ComponentWithSideBar>
            }
          />

          <Route
            path='/MyCollection/BoughtShowcase'
            element={
              <ComponentWithSideBar>
                <MyCollection>
                  <BoughtShowcase />
                </MyCollection>
              </ComponentWithSideBar>
            }
          />
          <Route
            path='/MyCollection/ForSaleShowcase'
            element={
              <ComponentWithSideBar>
                <MyCollection>
                  <ForSaleShowcase />
                </MyCollection>
              </ComponentWithSideBar>
            }
          />
          <Route
            path='/MyCollection/GalleryShowcase'
            element={
              <ComponentWithSideBar>
                <MyCollection>
                  <GalleryShowcase />
                </MyCollection>
              </ComponentWithSideBar>
            }
          />

          <Route
            path='/MyCollection/OwnedShowcase'
            element={
              <ComponentWithSideBar>
                <MyCollection>
                  <OwnedShowcase />
                </MyCollection>
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

          <Route path='/product/add' element={<AddProduct />} />

          <Route path='/product/edit/:id' element={<EditProduct />} />

          <Route
            path='/checkout'
            element={
              <ComponentWithOutSideBar>
                <Checkout />
              </ComponentWithOutSideBar>
            }
          />

          <Route
            path='/checkoutComplete'
            element={
              <ComponentWithOutSideBar>
                <CompleteCheckout />
              </ComponentWithOutSideBar>
            }
          />
          <Route
            path='/profile'
            element={
              <ComponentWithSideBar>
                <MyProfile />
              </ComponentWithSideBar>
            }
          />
          <Route
            path='/profile/:id'
            element={
              <ComponentWithSideBar>
                <UserProfile />
              </ComponentWithSideBar>
            }
          />
          <Route path='/messages/:chatId' element={<Messages />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
