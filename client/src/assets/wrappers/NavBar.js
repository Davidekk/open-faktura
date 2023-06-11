import styled from 'styled-components'

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  .nav-center{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: 0.3rem;
  }
  .icon-sidebar{
    font-size: 1.5rem;
  }
  
  .nav-button{
    all: unset;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap:0.5rem;
  }
  .title-navbar{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .title-navbar img{
    width: 3rem;
    height: 2rem;
  }
`
export default Wrapper
