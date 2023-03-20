import { useEffect, useRef, useState } from "react";
import { Button, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EngineeringIcon from "@mui/icons-material/Engineering";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export default function ExportButton(props: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const buttonComponent = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        ref={buttonComponent}
        variant="contained"
        size="medium"
        startIcon={<CloudDownloadIcon />}
        onClick={handleClick}
      >
        Export
      </Button>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          sx: {
            zIndex: 1,
            width: "auto",
            overflow: "visible",
            boxShadow: 10,
            mt: 0,
            ml: 0,
            "& .MuiListItemIcon-root": {
              mr: 1,
              color: "primary.main",
            },
            "& .MuiMenuItem-root ": {
              color: "rgba(0,0,0,0.8)",
            },
          },
        }}
      >
        <MenuItem onClick={props.handleAllExport}>JSON File (.json)</MenuItem>
        {/* <MenuItem>
           Item 2
        </MenuItem>
        <MenuItem>
           Item 3
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          Scheduling
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <EngineeringIcon />
          </ListItemIcon>
          Maintenance
        </MenuItem> */}
      </Menu>
    </>
  );
}
