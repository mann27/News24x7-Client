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
  margin-right: 30px;
`;

export const UserPageProfile = styled.div`
  max-height: 500px;
  flex: 0.4;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin-right: 100px;
  box-shadow: 0 0 10px lightgray;
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
