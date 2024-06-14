import React, { useState } from 'react';
import './App.css'
import Hero from './components/Hero';
import Header from './components/Header';
import NotificationList from './components/Notification/NotificationList';
import Recommended from './components/Recommended';
import ListBook from './components/ListBook';
import { readLocalStorageValue } from '@mantine/hooks';

function App() {
  const user = readLocalStorageValue({key: 'user'})
  const userStore = user ? JSON.parse(user) : {}
  const [isAuth, setIsAuth] = useState(user ? true : false);
  const [profile, setProfile] = useState(userStore);
  return (
    <React.Fragment>
      <Header
        isAuth={isAuth}
        profile={profile}
        setIsAuth={setIsAuth}
        setProfile={setProfile}
      />

      <div className="w-full flex flex-col justify-center items-center gap-y-8">
        <Hero />

        <Recommended />

        <ListBook />
      </div>

      <div className="p-6">
        <NotificationList />
      </div>
    </React.Fragment>
  )
}

export default App
