import styled from 'styled-components'

const Wrapper = styled.aside`
  display: none;

  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      background: var(--white);
      min-height: 100vh;
      height: 100%;
      width: 250px;
      margin-left: -180px;
      transition: var(--transition);
      overflow: hidden;

    }

    .content header {
      box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-bottom: 5rem;
      gap: 1rem;
      cursor: pointer;

    }

    .content header p {
      margin: 0.3rem;
      overflow: hidden;
    }

    .content .sidebar-icon {
      font-size: 2rem;
      margin-top: 2rem;
      margin-bottom: 2rem;
    }

    .text-sidebar {
      overflow: hidden;
      display: none;

    }

    .content header p {
      display: none;
    }

    .show-sidebar {
      margin-left: 0;
    }

    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }

    .sidebar-icon {
      margin-left: 180px;
    }

    .sidebar-icon:hover{
      color: var(--primary-500);
    }
    

    .show-sidebar .sidebar-icon {
      margin-left: 0;

    }


    .nav-link {
      display: flex;
      align-items: center;
      color: var(--grey-500);
      padding: 1rem 0 1rem 2.5rem;
      text-transform: capitalize;
      transition: var(--transition);
    }

    .nav-link:hover {
      background: var(--grey-50);
      padding-left: 2rem;
      color: var(--grey-900);
    }

    .show-sidebar .nav-link:hover {
      padding-left: 3rem;
    }

    .nav-link:hover .icon {
      color: var(--primary-500);
    }

    .icon {
      margin-left: 165px;
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
      transition: var(--transition);
    }

    .show-sidebar .sidebar-name {
      display: flex;
    }

    .show-sidebar .icon {
      margin-left: 0;
    }

    .show-sidebar .text-sidebar {
      display: flex;
      width: 170px;
      max-height: 1rem;

    }

    .active {
      color: var(--grey-900);
    }

    .active .icon {
      color: var(--primary-500);
    }

    .sidebar-name {
      font-weight: bolder;

    }

  }
`
export default Wrapper
