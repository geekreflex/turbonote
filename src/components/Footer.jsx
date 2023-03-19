import React from 'react';
import styled from 'styled-components';
import { GithubIcon, MailIcon } from './icons';

const Footer = () => {
  return (
    <FooterWrap>
      <div className="footer-main">
        <span>
          &copy;
          <a target="_blank" href="https://jerrynwosu.vercel.app">
            Jerry Nwosu
          </a>
        </span>
        <a
          target="_blank"
          href="https://github.com/geekreflex/turbo-octo-note"
          className="github-link"
        >
          <span className="github-icon">
            <GithubIcon />
          </span>
        </a>
        <a href="mailto:jerrynwosu007@gmail.com" className="github-link">
          <span className="github-icon">
            <MailIcon />
          </span>
        </a>
      </div>
    </FooterWrap>
  );
};

export default Footer;

const FooterWrap = styled.div`
  display: flex;
  padding: 50px 0;
  justify-content: center;

  .footer-main {
    display: flex;
    gap: 30px;
    color: ${(props) => props.theme.colors.text2};
    align-items: center;
  }

  a {
    color: ${(props) => props.theme.colors.text2};
    :hover {
      text-decoration: underline;
    }
  }

  .github-link {
    display: flex;
    align-items: center;
    gap: 10px;

    span {
      font-size: 30px;
      display: flex;
    }
  }
`;
