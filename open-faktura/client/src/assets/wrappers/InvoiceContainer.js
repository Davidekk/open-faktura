import styled from 'styled-components'

const Wrapper = styled.section`
  
  .invoices {
    display: flex;
    flex-direction: column;
    background: var(--white);
    box-shadow: var(--shadow-2);
    border-radius: var(--borderRadius);
    margin-bottom: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
    gap: 1rem;
  }
  .invoice{
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
  
  .invoice span:nth-child(1) {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
  .invoice-icons{
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-bottom: 1rem;
    align-items: center;

  }
 
  //@media (min-width: 1300px) {
  //  .client {
  //    display: grid;
  //    grid-template-columns: 1fr 1fr 1fr;
  //    gap: 1rem;
  //  }
  //}
  //@media (min-width: 2000px) {
  //  .client {
  //    display: grid;
  //    grid-template-columns: 1fr 1fr 1fr 1fr;
  //    gap: 1rem;
  //  }
  //}
`
export default Wrapper
