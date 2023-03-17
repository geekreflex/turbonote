import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { signInWithGoogle } from '../features/auth/authSlice';
import GoogleLogo from '../assets/google-logo.png';
import FacebookLogo from '../assets/facebook-logo.png';

const Auth = () => {
  const dispatch = useDispatch();
  return (
    <Layout>
      <AuthWrap>
        <AuthMain>
          <h1>Let's Go!</h1>
          <div className="auth-btns-wrap">
            <button
              className="auth-btn"
              onClick={() => dispatch(signInWithGoogle())}
            >
              <img src={GoogleLogo} />
              Continue with Google
            </button>
            <button
              className="auth-btn"
              onClick={() => dispatch(signInWithGoogle())}
            >
              <img src={FacebookLogo} />
              Continue with Facebook
            </button>
          </div>
        </AuthMain>
      </AuthWrap>
    </Layout>
  );
};

export default Auth;

const AuthWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AuthMain = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.cardBg};
  width: 400px;
  padding: 40px;
  border-radius: 21px;

  h1 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 40px;
  }

  .auth-btns-wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .auth-btn {
    padding: 12px 20px;
    border: none;
    outline: none;
    background-color: transparent;
    border-radius: 10px;
    color: ${(props) => props.theme.colors.text2};
    font-size: 15px;
    border: 1px solid ${(props) => props.theme.colors.border2};
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: center;
    font-weight: 600;
    transition: all 100ms;
    :hover {
      background-color: ${(props) => props.theme.colors.btnBg1};
      color: ${(props) => props.theme.colors.btnText1};
      box-shadow: ${(props) => props.theme.colors.shadow1};
    }

    img {
      width: 25px;
    }
  }
`;
