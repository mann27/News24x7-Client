import styled from "styled-components";

export const UserPageContainer = styled.div`
  padding: 50px;
  box-shadow: 0 0 10px grey;
  width: 100%;
  height: auto;
  display: flex;
  overflow: scroll;
`;

export const UserPagePost = styled.div`
  flex: 0.6;
  padding: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-right: 2px solid grey;
  margin-right: 0px;
  transform: scale(0.8);
`;

export const UserPageProfile = styled.div`
  max-height: 500px;
  flex: 0.4;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin-right: 100px;
  margin-left: -60px;
  box-shadow: 0 0 10px lightgray;
  transform: scale(0.8);
`;
export const UserPageImg = styled.div`
  height: 150px;
  top: 0;
  margin: 20px;
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
