import React from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { RouteType } from "../../routes";

interface Props {
    links: RouteType[];
    handleMenuLinkClick: (linkPath: () => JSX.Element | null) => void
}

export const Menu: React.FC<Props> = ({ links, handleMenuLinkClick }): JSX.Element => {

    return (
        <div>
            <MenuList sx={{
                marginTop: '9px',
            }}>
                {links?.map((link) => (
                    <MenuItem sx={{
                        '&:hover': {
                            backgroundColor: 'antiquewhite',
                        }, marginLeft: '5px',
                    }} key={link.label} onClick={() => handleMenuLinkClick(link.path)}>
                        <ListItemIcon>{React.createElement(link.icon, { fontSize: 'small' })}</ListItemIcon>
                        <ListItemText>{link.label}</ListItemText>
                    </MenuItem>
                ))}
            </MenuList>
        </div>
    );
};