import styled from 'styled-components'

const Wrapper = styled.section`
  display:flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }
  

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
  .register-form{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.7rem;
  }
`
export default Wrapper
