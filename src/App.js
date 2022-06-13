import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Admin from "./components/admin";
import AdminProfile from "./components/admin/profile";
import User from "./components/user";
import Main from "./components/main"
import AddNovel from "./components/user/addNovel";
import ManageNovel from './components/user/manageNovel';
import ManageQuery from './components/user/manageQuery';
import ManageUser from './components/admin/manageUser';
import UpdateUser from './components/admin/updateUser';
import NovelDetail from './components/main/NovelDetails';
import BrowseNovel from './components/main/browseNovel';
import Signup from './components/main/signup';
import Login from './components/main/login';
import RentNow from './components/main/rent';
import BuyNow from './components/main/buy';
import AddQuery from './components/user/addQuery';
import BrowseQuery from './components/main/browseQuery'
import Profile from './components/user/profile';
import Home from './components/home';
import Chat from './components/user/chat';
import ResetPassword from './components/main/resetPassword';
import Authorisor from './components/authorisor';
import AdminAuthorisor from './components/adminAuth';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


function App() {
  const stripe = loadStripe(
    "pk_test_51L9UchSGopJ23bmk6Huaj9mh1EYca74iwspUZKzEK7x9XLQ7aDwTAwyvq6CBx4Y0Tjp8E0rR2yKP13YgYcAVx2lI00M3SjfgHH"
  );

  return(
    <Router>
    <Routes>
           <Route element={<Home />} path="/" />

           <Route element={<AdminAuthorisor><Admin /></AdminAuthorisor>} path="admin">
               <Route element={<AdminProfile />} path="profile" />
               <Route element={<ManageUser />} path="manageUser" />
               <Route element={<UpdateUser />} path="updateUser" />
           </Route>
           
           <Route element={ <Authorisor><User /></Authorisor>} path="user">
               <Route element={<AddNovel />} path="addNovel" />
               <Route element={<AddQuery />} path="addQuery" />
               <Route element={<ManageNovel />} path="manageNovel" />
               <Route element={<ManageQuery />} path="ManageQuery" />
               <Route element={<Profile />} path="profile" />
               <Route element={<Chat />} path="chat" />
           </Route>
           
           <Route element={<Main />} path="main">
             <Route element={<BrowseNovel />} path="browseNovel"/>
             <Route element={<NovelDetail />} path="novelDetail/:id" />
             <Route element={<Signup />} path="signup" />
             <Route element={<Login />} path="login" />
             <Route element={<BrowseQuery />} path="browseQuery" />
             <Route element={<RentNow />} path="rent" />  
             <Route element={<ResetPassword />} path="resetPassword"  />
            <Route
            element={<Authorisor><Elements stripe={stripe}><BuyNow /></Elements></Authorisor>} path="buy"/> 
           </Route>
    </Routes>
    </Router>
  )
}

export default App;
