import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome To Quick Noe</h1>
      <div>
        <div>
          <Link to="/note">Note</Link>
        </div>
        <div>
          <Link to="/auth">Auth</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
