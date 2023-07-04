import styled from 'styled-components'

const Wrapper = styled.article`
  background: var(--white);
  margin-top: 2rem;
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  cursor: pointer;
  padding-bottom: 1rem;

  .remove-icon{
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    cursor: pointer;
    font-size: 1.5rem;
  }
  
  h5{
    padding-left: 1rem;
    margin-bottom: 0.5rem;
  }
  
  h4{
    font-size: 1.3rem;
    padding: 1rem;
    margin-bottom: 0;
  }
  p{
    margin: 0;
    padding-left: 1rem;
  }
  p:last-child{
    margin-bottom: 1rem;
  }
  .content{
    display: flex;
    flex-direction: row;
    gap:0.3rem;
    justify-content: space-evenly;
    align-items: center;
    overflow: hidden;
  }


  
`

export default Wrapper
