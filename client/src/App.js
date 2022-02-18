import './App.css';
import Navbar from './components/shared/Navbar/Navbar';
import SecondaryNav from './components/shared/SecondaryNav/SecondaryNav';
import Sidebar from './components/shared/Sidebar/Sidebar';
import Authentication from './pages/Authentication/Authentication';
import Home from './pages/Home/Home';

function App() {
  let signedIn = false;
  return (
    <div className='App'>
      <Navbar />
      <div className='app_bodyWithSideBar'>
        <Sidebar />
        <div>
          {signedIn && <SecondaryNav />}
          <Home signedIn={signedIn} />
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
