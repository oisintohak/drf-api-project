// Popper with ClickAwayListener adapted from: https://mui.com/material-ui/react-menu/#menulist-composition
import TuneIcon from "@mui/icons-material/Tune";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as React from "react";

function FilterMenu(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const { dateFilters, setDateFilters } = props;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  // handleChange currying syntax stolen from https://mui.com/material-ui/react-popper/#positioned-popper
  const handleChange = (field) => (value) => {
    if (value) {
      console.log(value.format());
      setDateFilters((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    }
  };
  return (
    <div>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        startIcon={<TuneIcon />}
        variant="contained"
      >
        Filter
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        transition
        disablePortal
        sx={{ zIndex: 1000 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <div>

              <ClickAwayListener onClickAway={handleClose}>
                <Paper elevation={3} sx={{ margin: 0, px: 4 }}>
                  <Stack
                    paddingY={3}
                    spacing={3}
                    onSubmit={(event) => {
                      event.preventDefault();
                    }}
                    component="form"
                    noValidate
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDatePicker
                        value={dateFilters.starts_before || null}
                        onChange={handleChange("starts_before")}
                        format="DD-MM-YYYY"
                        name="starts_before"
                        size="small"
                        label="Starts Before"
                      />
                      <MobileDatePicker
                        value={dateFilters.ends_before || null}
                        onChange={handleChange("ends_before")}
                        format="DD-MM-YYYY"
                        name="ends_before"
                        size="small"
                        label="Ends Before"
                      />
                      <MobileDatePicker
                        value={dateFilters.starts_after || null}
                        onChange={handleChange("starts_after")}
                        format="DD-MM-YYYY"
                        name="starts_after"
                        size="small"
                        label="Starts After"
                      />
                      <MobileDatePicker
                        value={dateFilters.ends_after || null}
                        onChange={handleChange("ends_after")}
                        format="DD-MM-YYYY"
                        name="ends_after"
                        size="small"
                        label="Ends After"
                      />
                      <Button
                        variant="contained"
                        type="submit">Submit</Button>
                    </LocalizationProvider>
                  </Stack>
                </Paper>
              </ClickAwayListener>
            </div>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

export default FilterMenu;
