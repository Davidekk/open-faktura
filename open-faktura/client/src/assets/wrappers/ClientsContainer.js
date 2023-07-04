import styled from 'styled-components'

const Wrapper = styled.section`
  .active {
    position: relative;
    background: linear-gradient(to right, var(--primary-300), var(--primary-900));
    padding: 2px;
  }
  .un-active{
    position: relative;
    
  }
  .client-info{
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
  }
  .module{
    background: var(--white);
  }
  .client {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .client {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
  @media (min-width: 1300px) {
    .client {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
    }
  }
  @media (min-width: 2000px) {
    .client {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 1rem;
    }
  }
`
export default Wrapper
