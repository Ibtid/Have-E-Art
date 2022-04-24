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
import AddorEditProduct from './pages/AddorEditProduct/AddorEditProduct';
import AppContextProvider from './hooks/AppContext';
import Spinkit from './modals/Spinkit/Spinkit';

function App() {
  return (
    <AppContextProvider>
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
              path='/MyCollection'
              element={
                <ComponentWithSideBar>
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

            <Route path='/product/add' element={<AddorEditProduct />} />
            <Route path='/product/edit/:id' element={<AddorEditProduct />} />

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
    </AppContextProvider>
  );
}

export default App;
