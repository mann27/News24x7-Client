import React, { useState, useEffect } from "react";
import { logoutUser } from "../../redux/actions/userActions";
import {
  SideBarContainer,
  Icons,
  CloseIcon,
  SideBarWrapper,
  SideBarMenu,
  SideBarLinks,
} from "./SideBarStyles";

const handleLogoutClick = () => {
  this.props.logoutUser();
};

function SideBar({ isOpen, toggle, auth, logoutFunc }) {
  return (
    <SideBarContainer isOpen={isOpen} onClick={toggle}>
      <Icons>
        <CloseIcon onClick={toggle} />
      </Icons>
      <SideBarWrapper>
        <SideBarMenu>
          <SideBarLinks to="/news24x7" onClick={toggle}>
            News 24x7
          </SideBarLinks>
          <SideBarLinks to="/" onClick={toggle}>
            Home
          </SideBarLinks>
          <SideBarLinks to="/help/faq" onClick={toggle}>
            Help
          </SideBarLinks>
          {auth ? (
            <SideBarLinks to="/" onClick={logoutFunc}>
              Logout
            </SideBarLinks>
          ) : (
            <>
              <SideBarLinks to="/login" onClick={toggle}>
                Login
              </SideBarLinks>
              <SideBarLinks to="/signup" onClick={toggle}>
                Signup
              </SideBarLinks>
            </>
          )}
        </SideBarMenu>
      </SideBarWrapper>
    </SideBarContainer>
  );
}

export default SideBar;
