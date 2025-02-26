import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button} from "@mui/material";

const Home = () => {

  return (
    <div className="wallpaper-page">

      <div className="home-wrapper">

        <div className='home-screen'>

          <div className='home-title'>
            <div className = 'logo-image'> </div>

            <h1 className='home-title-text'>Advanced <br /> To-Do</h1>

          </div>  

          <h2 className='home-text'> Gerencie suas tarefas <br /> de forma prática</h2>

          <div className='home-login-button'>
            
            <Link to="/login">
                <Button 
                type="submit" 
                variant="contained" 
                fullWidth
                className="login-button"
              >
                Log in
              </Button>
            </Link>
          </div>

      </div>

    </div>

  </div>
  );
};

export default Home;
