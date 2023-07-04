import styled from 'styled-components'

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  box-shadow: var(--shadow-2);

  h3 {
    margin-top: 0;
  }
  
  button {
    display: flex;
    margin: auto;
  }

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    max-width: 100%;
    width: 100%;
    padding: 1rem 1rem 1rem;

  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    justify-content: space-around;
    margin-bottom: 2rem;
  }

  .form button {
  }

  .form h4 {
    margin-top: 2rem;
  }

  .form-row {
    margin-bottom: 0;
  }

  .form-center {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 700px) {
    .content {
      flex-direction: row;
    }
  }
`

export default Wrapper
