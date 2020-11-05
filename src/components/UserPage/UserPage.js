import styled from "styled-components";

export const UserPageContainer = styled.div`
  padding: 50px !important;
  padding-top: 5px !important;
  box-shadow: 0 0 10px grey;
  width: auto;
  height: 100vh;
  display: flex;
  overflow: scroll;
`;

export const UserPagePost = styled.div`
  flex: 0.6;
  padding: 30px;
  padding-top: 0px;
  height: 600px;
  display: flex;
  flex-direction: column;
  border-left: 2px solid grey;
  margin-right: 0px;
  transform: scale(0.8);
`;

export const UserPageProfile = styled.div`
  max-height: 500px;
  flex: 0.4;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin-right: 0px;
  background-color: #fff;
  box-shadow: 0 0 10px lightgray;
  transform: scale(0.8);
`;
export const UserPageImg = styled.div`
  height: 150px;
  top: 0;
  margin: 20px;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UserPageInfo = styled.div`
  height: auto;
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
