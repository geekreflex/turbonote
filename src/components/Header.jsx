import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Container, Logo } from '../styles/GlobalStyles';
import Profile from './Profile';

const Header = ({ name }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <HeaderWrap>
      <Container>
        <HeaderMain>
          <Logo>
            <Link to="/">
              <span>🚀 Turbo Note</span>
            </Link>
          </Logo>
          <nav>
            {name == 'home' && !isLoggedIn && (
              <Link to="/auth">
                <Button>Sign In or Join Now</Button>
              </Link>
            )}

            {name === 'note' && <Profile />}
          </nav>
        </HeaderMain>
      </Container>
    </HeaderWrap>
  );
};

export default Header;

const HeaderWrap = styled.div`
  /* position: ${(props) => (props.isFixed ? 'sticky' : 'absolute')}; */
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${(props) =>
    props.isFixed ? props.theme.colors.cardBg : ''};
  z-index: 99;
  box-shadow: ${(props) => (props.isFixed ? props.theme.colors.shadow2 : '')};
  transition: top 0.3s ease-in-out;
`;

const HeaderMain = styled.div`
  width: 100%;
  display: flex;
  height: 70px;
  align-items: center;
  justify-content: space-between;
`;
