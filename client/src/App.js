import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className='app_bodyWithSideBar'>
        <Sidebar />
        <div>hi</div>
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
