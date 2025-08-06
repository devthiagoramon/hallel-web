import styled from "styled-components";

export const FundadoraContainer = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;

  .square {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 90%;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    background-color: #003617;
    height: 90%;
    padding: 30px;
  }

  .content {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 70% 1fr;
    grid-template-rows: 100%;
    place-items: center center;

    @media (max-width: 1285px) {
      grid-template-columns: 100%;
      grid-template-rows: 1fr 1fr;
    }
  }

  .leftcontainer {
    font-size: 20px;
    text-align: left;
    color: #fafafa;
    width: 100%;
  }

  .rightcontainer {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 80% 20%;
    place-items: center center;
    color: #fafafa;

    img {
      width: 500px;
      height: 450px;
    }
  }
`;
