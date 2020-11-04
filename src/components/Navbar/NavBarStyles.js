import styled from "styled-components";
import { Link } from "react-router-dom";

export const MobileIcons = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    z-index: 1000;
    top: 0;
    right: 15px;
    transform: translate(-100%, 60%);
    font-size: 1.2rem;
    cursor: pointer;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0.3;
  }
`;
