import HomeIcon from "@mui/icons-material/Home";
import FolderIcon from '@mui/icons-material/Folder';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
//import {Header} from "../Pages/Header";
import WatchList from "../Pages/WatchList";
import PortFolio from "../Pages/PortFolio";
import TradeForm from "../Pages/TradeForm";
import Account from "../Pages/Account";

// Define constants by directly assigning components
export const HOME:() => JSX.Element | null=() => null;
export const WATCHLIST:() => JSX.Element | null = WatchList;
export const PORTFOLIO:() => JSX.Element | null = PortFolio;
export const TRADEFORM:() => JSX.Element | null = TradeForm;
export const ACCOUNT:() => JSX.Element | null = Account;

export type RouteType = {
  label: string,
  icon: OverridableComponent<SvgIconTypeMap> & { muiName: string },
  path: typeof HOME | typeof WATCHLIST | typeof PORTFOLIO | typeof TRADEFORM | typeof ACCOUNT
}

export const ROUTES: RouteType[] = [
  { label: 'Home', path: HOME, icon: HomeIcon },
  { label: 'WatchList', path: WATCHLIST, icon: FolderIcon },
  { label: 'PortFolio', path: PORTFOLIO, icon: FolderIcon },
  { label: 'TradeForm', path: TRADEFORM, icon: TurnedInIcon },
  { label: 'Account', path: ACCOUNT, icon: AccountCircleIcon },
]
