import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowRightIcon2 } from '../components/icons';
import Layout from '../components/Layout';
import { Button } from '../styles/GlobalStyles';

const Home = () => {
  return (
    <Layout>
      <Desc>
        <h1>Capture, Organize, and Share Your Thoughts with Ease.</h1>
        <p>
          Unlock your creativity and productivity with effortless note-taking
          and organization.
        </p>
        <Link to="/auth">
          <Button>
            Sign In or Join Now
            <span className="icon">
              <ArrowRightIcon2 />
            </span>
          </Button>
        </Link>
      </Desc>
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

  h1 {
    font-size: 60px;
    font-family: 'Golos Text';
    text-align: center;
    width: 900px;
    margin-bottom: 20px;
  }

  p {
    width: 500px;
    text-align: center;
    font-size: 20px;
    margin-bottom: 30px;
    font-weight: 400;
    color: ${(props) => props.theme.colors.text1};
  }
`;
