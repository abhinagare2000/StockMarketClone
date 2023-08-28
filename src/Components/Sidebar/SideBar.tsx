import React from "react";
import { Divider, Drawer, IconButton } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";


const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
}));

interface Props {
    isOpen: boolean;
    handleSidebarToggle: () => void;
    children: React.ReactNode;
}

const DRAWER_WIDTH = 240;

export const SideBar: React.FC<Props> = ({
    isOpen,
    handleSidebarToggle,
    children,
}): JSX.Element => {
    const theme = useTheme();

    return (
        <>
            <Drawer
                sx={{
                    ".MuiPaper-root": {
                        width: DRAWER_WIDTH,
                        boxSizing: "border-box",
                    }
                }}
                variant="persistent"
                anchor="right"
                open={isOpen}
            >
                <DrawerHeader>
                    <IconButton sx={{
                        '&:hover': {
                            backgroundColor: 'antiquewhite',
                        }, "& svg": {
                            fontSize: "40px", // Adjust the icon size
                        }, marginTop: '12px',
                    }} onClick={handleSidebarToggle}>
                        {theme.direction === "ltr" ? (<ChevronRightIcon />) : (<ChevronLeftIcon />)}
                    </IconButton>
                </DrawerHeader>
                {children}
            </Drawer >
        </>
    );
}