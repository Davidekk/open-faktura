import styled from 'styled-components'

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);

  h3 {
    margin-top: 0;
  }
  
  .title-invoice{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
  .title-invoice label {
    margin: 0;
  }

  .title-invoice h4{
    margin: 0;
  }
  
  .invoice-final{
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 2rem;
    margin-top: 2rem;
    justify-content: flex-end;
  }

  .title {
    margin-top: 1rem;
  }

  .date-picker input {
    padding: 0.375rem 0.75rem;
    border-radius: var(--borderRadius);
    background: var(--backgroundColor);
    border: 1px solid var(--grey-200);
    margin-bottom: 0.4rem;
  }
  
  .date-picker {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  article {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .form-add {
    display: grid;
    margin-bottom: 1rem;
  }

  .btn-to-right {
    display: flex;
    margin-left: auto;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }


  .invoice-list {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .invoice-list div:first-child {
    width: 5%;
  }

  .invoice-list div:nth-child(2) {
    width: 8%;
  }

  .invoice-list div:nth-child(3) {
    width: 50%;
  }

  .invoice-list div:nth-child(4) {
    width: 10%;
  }

  .invoice-list div:nth-child(5) {
    width: 10%;
  }

  .invoice-list div:nth-child(6) {
    width: 15%;
    display: flex;
    align-content: space-between;
    justify-content: space-between;
  }

  .form-add .invoice-remove {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;

  }


  .date-picker {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .date-picker .title-date {
    width: 18rem;
  }

  .form-center-solo {
    display: grid;
    grid-template-columns: 1fr;
    max-width: 600px;
    margin-bottom: 2rem;
  }

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }

  .form h4 {
    margin-top: 2rem;
  }

  .form-row {
    margin-bottom: 0;
  }

  .form-center {
    display: grid;
    row-gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .form-center-duo{
    display: grid;
    grid-template-columns: 1fr ;
    gap: 1rem;
    
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;

    button {
      height: 35px;
    }
  }

  .clear-btn {
    background: var(--grey-500);
  }

  .clear-btn:hover {
    background: var(--black);
  }

  @media (min-width: 500px) {

    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }

    .form-center-duo{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

    }

    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 702px) {
    .form-add {
      gap: 0.5rem;
    }

    .btn-to-right {
      margin-top: 0;
    }

    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .form-center button {
      margin-top: 0;
    }
  }
  @media (min-width: 860px) {
    .form-add {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }

  }
`

export default Wrapper
