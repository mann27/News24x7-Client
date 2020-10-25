import React, { useState } from "react";
import { Link } from "react-router-dom";
import Video from "./video.mp4";
import "./landing.css";
import Icon1 from "./Icon1.svg";
import Icon2 from "./Icon2.svg";
import Icon3 from "./Icon3.svg";
import Icon4 from "./Icon4.svg";
import {
  HeroContainer,
  HeroBg,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
  HeroContent,
  Button,
  ImgWrap,
  ImgSecond,
  InfoContainer,
  InfoRow,
  InfoWrapper,
  Column1,
  Column2,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  BtnWrap,
  Img,
  primary,
  ServiceCard,
  ServiceContainer,
  ServiceWrapper,
  ServiceH1,
  ServiceH2,
  ServiceIcon,
  ServiceP,
} from "./landing";

import { homeObjOne, homeObjTwo } from "./data";

function Index() {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };

  return (
    <>
      <HeroContainer>
        <HeroBg>
          <video className="VideoBg" autoPlay loop muted>
            <source src={Video} type="video/mp4"></source>
          </video>
        </HeroBg>
        <HeroContent>
          <HeroH1>NEWS 24x7</HeroH1>
          <HeroP>
            A portal to share new news and discuss about the news
            <br />
            Start your discussion here
            <br />
            <i class="fa fa-angle-double-down" aria-hidden="true"></i>
          </HeroP>
          <HeroBtnWrapper>
            <Button
              to="/signup"
              onMouseEnter={onHover}
              onMouseLeave={onHover}
              primary="true"
              dark="true"
            >
              Get Started {hover ? <ArrowForward /> : <ArrowRight />}
            </Button>
          </HeroBtnWrapper>
        </HeroContent>
      </HeroContainer>
      <InfoContainer lightBg={homeObjOne.lightBg}>
        <InfoWrapper>
          <InfoRow imgStart={homeObjOne.imgStart}>
            <Column1>
              <TextWrapper>
                <TopLine>{homeObjOne.topLine}</TopLine>
                <Heading lightText={homeObjOne.lightText}>
                  {homeObjOne.headline}
                </Heading>
                <Subtitle darkText={homeObjOne.darkText}>
                  {homeObjOne.description}
                </Subtitle>
                <btnWrap>
                  <Button
                    primary={homeObjOne.primary}
                    smooth={true}
                    duration={500}
                    spy={true}
                    exact={true}
                    to="home"
                  >
                    {homeObjOne.buttonLabel}
                    {hover ? <ArrowForward /> : <ArrowRight />}
                  </Button>
                </btnWrap>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={homeObjOne.img} alt={homeObjOne.alt} />
              </ImgWrap>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
      <InfoContainer lightBg={homeObjTwo.lightBg}>
        <InfoWrapper>
          <InfoRow imgStart={homeObjTwo.imgStart}>
            <Column1>
              <TextWrapper>
                <TopLine marginTop={homeObjTwo.marginTop}>
                  {homeObjTwo.topLine}
                </TopLine>
                <Heading lightText={homeObjTwo.lightText}>
                  {homeObjTwo.headline}
                </Heading>
                <Subtitle darkText={homeObjTwo.darkText}>
                  {homeObjTwo.description1}
                </Subtitle>
                <Subtitle darkText={homeObjTwo.darkText}>
                  {homeObjTwo.description2}
                </Subtitle>
                <Subtitle darkText={homeObjTwo.darkText}>
                  {homeObjTwo.description3}
                </Subtitle>
                <Subtitle darkText={homeObjTwo.darkText}>
                  {homeObjTwo.description4}
                </Subtitle>
                <Subtitle darkText={homeObjTwo.darkText}>
                  {homeObjTwo.description5}
                </Subtitle>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <ImgSecond src={homeObjTwo.img} alt={homeObjTwo.alt} />
              </ImgWrap>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
      <ServiceContainer>
        <ServiceH1>Our Services</ServiceH1>
        <ServiceWrapper>
          <ServiceCard>
            <ServiceIcon src={Icon1}></ServiceIcon>
            <ServiceH2>Reliability</ServiceH2>
            <ServiceP>Invalid links can be reported by users</ServiceP>
          </ServiceCard>
          <ServiceCard>
            <ServiceIcon src={Icon2}></ServiceIcon>
            <ServiceH2>Scalability</ServiceH2>
            <ServiceP>
              2,00,000 users can access the application simultaneously
            </ServiceP>
          </ServiceCard>
          <ServiceCard>
            <ServiceIcon src={Icon3}></ServiceIcon>
            <ServiceH2>Availability</ServiceH2>
            <ServiceP>The application should be functional 24 x 7</ServiceP>
          </ServiceCard>
          <ServiceCard>
            <ServiceIcon src={Icon4}></ServiceIcon>
            <ServiceH2>Security</ServiceH2>
            <ServiceP>
              One can post, comment and upvote/downvote only after logging in
            </ServiceP>
          </ServiceCard>
        </ServiceWrapper>
      </ServiceContainer>
    </>
  );
}

export default Index;
