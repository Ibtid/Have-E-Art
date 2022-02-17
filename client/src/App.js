import './App.css';
import Navbar from './components/shared/Navbar/Navbar';
import Sidebar from './components/shared/Sidebar/Sidebar';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className='app_bodyWithSideBar'>
        <Sidebar />
        <div>
          <Home />
        </div>
      </div>
      {/*Login */}
      {/*Register */}
      {/*My Profile */}
      {/*Users Profile */}
      {/*Home */}
      {/*Productdetails*/}
    </div>
  );
}

export default App;
