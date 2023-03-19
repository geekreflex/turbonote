import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowRightIcon2, PaperIcon } from '../components/icons';
import Layout from '../components/Layout';
import { Button } from '../styles/GlobalStyles';
import DarkApp from '../assets/app-dark.png';
import LightAPp from '../assets/app-light.png';
import { useSelector } from 'react-redux';

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <Layout name="home">
      <div>
        <Desc>
          <h1>Capture, Organize, and Share Your Thoughts with Ease.</h1>
          <p>
            Unlock your creativity and productivity with effortless note-taking
            and organization.
          </p>
          {isLoggedIn ? (
            <Link to="/note">
              <Button>
                Continue to Note
                <span className="icon">
                  <PaperIcon />
                </span>
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button>
                Sign In or Join Now
                <span className="icon">
                  <ArrowRightIcon2 />
                </span>
              </Button>
            </Link>
          )}
        </Desc>
        <Screenshot>
          <div className="shot-box">
            <div className="shot1 shot">
              <img src={DarkApp} />
            </div>
            <div className="shot2 shot">
              <img src={LightAPp} />
            </div>
          </div>
        </Screenshot>
      </div>
    </Layout>
  );
};

export default Home;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.text5};
  margin-bottom: 100px;

  h1 {
    font-size: 60px;
    /* font-family: 'Golos Text'; */
    text-align: center;
    width: 900px;
    margin-bottom: 20px;
    max-width: 100%;
  }

  p {
    width: 500px;
    text-align: center;
    font-size: 20px;
    margin-bottom: 30px;
    font-weight: 400;
    color: ${(props) => props.theme.colors.text1};
    max-width: 100%;
  }

  @media (max-width: 600px) {
    h1,
    p {
      width: 100%;
    }

    h1 {
      font-size: 30px;
    }

    p {
      font-size: 16px;
    }
  }
`;

const Screenshot = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
  .shot-box {
    width: 900px;
    position: absolute;
    top: 0;
    max-width: 100%;
  }
  .shot {
    display: flex;
    position: absolute;
    width: 800px;
    border-radius: 10px;
    /* box-shadow: ${(props) => props.theme.colors.shadow1}; */
    box-shadow: ${(props) => props.theme.colors.shadow3};
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .shot1 {
    margin-top: 100px;
    z-index: 9;
    margin-left: 100px;
  }

  @media (max-width: 800px) {
    height: 500px;
    .shot-box {
      width: 100%;
    }
    .shot {
      width: 90%;
    }

    .shot1 {
      margin-left: 40px;
      margin-top: 40px;
    }
  }

  @media (max-width: 500px) {
    height: 350px;
  }
`;
