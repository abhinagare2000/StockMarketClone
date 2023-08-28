import { useState, useCallback, useEffect } from "react";
import "../PagesCss/HeaderCss.css";
import { Link } from 'react-router-dom';
import HomeDiv from "./Home"
import WatchList from "./WatchList";
import PortFolio from "./PortFolio";
import TradeForm from "./TradeForm";
import Account from "./Account";
import { TbSmartHome } from "react-icons/tb";
import { BsJournalText } from "react-icons/bs";
import { LuFolderMinus } from "react-icons/lu";
import { RiAccountCircleFill } from "react-icons/ri";
import { BsBookmarkDash } from "react-icons/bs";
import styled, { createGlobalStyle } from "styled-components";
import { SideBar } from '../Components/Sidebar/SideBar';
import { Menu } from '../Components/menu/Menu';
import { ROUTES } from '../routes';
import {
  IconButton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const Header = () => {
  const [sideBarToggle, setSideBarToggle] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState(1520);
  const [screenHeight, setScreenHeight] = useState(730);
  const [renderedComponent, setRenderedComponent] = useState<React.ReactNode | null>(null);
  const links = document.querySelectorAll(".app-nav");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      links.forEach((otherLink) => {
        if (otherLink.classList.contains("clicked")) {
          otherLink.classList.remove("clicked");
        }
      });
      link.classList.add("clicked");
    });
  });

  const Home = styled(TbSmartHome)`
    transform: scale(1.1);
    margin-top: 4px;
    font-weight: 100;
    margin-right: 2px;
    filter: brightness(2.7);
  `;

  const Watchlist = styled(BsBookmarkDash)`
    transform: scale(0.8);
    margin-top: 5px;
    margin-right: 2px;
  `;

  const Portfolio = styled(LuFolderMinus)`
    transform: scale(0.8);
    margin-top: 5px;
    margin-right: 2px;
  `;

  const Orders = styled(BsJournalText)`
    transform: scale(0.8);
    margin-top: 5px;
    margin-right: 2px;
  `;

  const AccountIcon = styled(RiAccountCircleFill)`
    transform: scale(1);
    margin-top: 5px;
    margin-right: 2px;
  `;

  const LinkStyled = styled(Link)`
    text-decoration: none;
    text-transform: uppercase;
    color: var(--color-text-bold);
  `;

  const renderInBelowHeader = (Component: () => JSX.Element) => {
    setRenderedComponent(<Component />); // Pass a function that returns the JSX element
  };

  const handleMenuLinkClick = useCallback((Component: () => JSX.Element | null) => {
    setRenderedComponent(<Component />);
    setSideBarToggle(!sideBarToggle);
  }, [sideBarToggle]);

  const handleMenuToggle = useCallback(() => {
    setSideBarToggle(!sideBarToggle);
  }, [sideBarToggle]);

  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      const newScreenHeight = window.innerHeight;
      setScreenWidth(newScreenWidth);
      setScreenHeight(newScreenHeight);

      // Check if the screen width is less than 1000px
      if (newScreenWidth < 1000) {
        setSideBarToggle(false); // Toggle the sideBarToggle state
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showIconButton = screenWidth < 1000;

  return (
    <div style={{ height: `${screenHeight}px`, overflowY: 'hidden', width: `${screenWidth}px`, overflowX: 'hidden' }}>
      <header className="app-header">
        <h1 className="app-title">FastTrade</h1>
        <div className="app-nav">
          <Home></Home>
          <LinkStyled onClick={() => renderInBelowHeader(HomeDiv)} to="#">
            Home
          </LinkStyled>
        </div>
        <div className="app-nav">
          <Watchlist></Watchlist>
          <LinkStyled to="#" onClick={() => renderInBelowHeader(WatchList)}>
            WatchList
          </LinkStyled>
        </div>
        <div className="app-nav">
          <Portfolio></Portfolio>
          <LinkStyled to="#" onClick={() => renderInBelowHeader(PortFolio)}>
            PortFolio
          </LinkStyled>
        </div>
        <div className="app-nav">
          <Orders></Orders>
          <LinkStyled to="#" onClick={() => renderInBelowHeader(TradeForm)}>
            Orders
          </LinkStyled>
        </div>
        <div className="app-nav">
          <AccountIcon></AccountIcon>
          <LinkStyled to="#" onClick={() => renderInBelowHeader(Account)}>
            Account
          </LinkStyled>
        </div>
        {showIconButton && <IconButton
          color="inherit"
          edge="start"
          onClick={handleMenuToggle}
          sx={{
            marginRight: 2, // Adjust the right margin as needed
            marginLeft: "auto",
            '&:hover': {
              backgroundColor: 'antiquewhite',
            },
            "& svg": {
              fontSize: "50px", // Adjust the icon size
            }, ...(sideBarToggle && { display: "none" })
          }}
        >
          <MenuIcon />
        </IconButton>}
        {showIconButton && <SideBar
          isOpen={sideBarToggle}
          handleSidebarToggle={handleMenuToggle}
          children={<Menu links={ROUTES} handleMenuLinkClick={handleMenuLinkClick} />}
        />
        }
      </header>
      <div style={{ overflowY: 'auto', overflowX: 'auto', marginRight: '80px' }}>
        {renderedComponent}
      </div>
    </div>
  );
};

