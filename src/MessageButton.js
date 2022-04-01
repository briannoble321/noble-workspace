import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useSnackbar } from "notistack";
import {
  openSnackbarMessage,
  setSnackbarProviderContext,
  getSnackBarProps,
  setSnackBarProps
} from "/src/CustomSnackbarMessage";

const styles = {
  root: {
    flexGrow: 1,
    display: "flex",
    margin: 16,
    justifyContent: "center",
    alignItems: "middle"
  },
  button: {
    margin: 8,
    borderColor: "#313131",
    color: "#313131"
  },
  success: {
    borderColor: "#43a047",
    color: "#43a047"
  },
  error: {
    borderColor: "#d32f2f",
    color: "#d32f2f"
  },
  info: {
    borderColor: "#2979ff",
    color: "#2979ff"
  },
  warning: {
    borderColor: "#ffa000",
    color: "#ffa000"
  }
};

const buttons = [
  { variant: "success", message: "Successfully done the operation." },
  { variant: "error", message: "Something went wrong." },
  { variant: "warning", message: "Something could go wrong" },
  { variant: "info", message: "For your info..." },
  { variant: "default", message: "I am default..." }
];

const MessageButtons = () => {
  setSnackbarProviderContext(useSnackbar());

  const snackBarProps = getSnackBarProps();

  const handleClick = useCallback(
    (button) => () => {
      snackBarProps.message = button.message;
      snackBarProps.messageType = button.variant;
      snackBarProps.button1Label = undefined;
      snackBarProps.button2Label = undefined;
      setSnackBarProps(snackBarProps);
      openSnackbarMessage();
    },
    [snackBarProps]
  );

  const myButtonCallback = (buttonName) => {
    if (buttonName === "Cancel") {
      alert("Cancel Pressed");
      //do some stuff
    }
    if (buttonName === "Proceed") {
      alert("Proceed Pressed");
      //do some stuff
    }
  };

  const handleClickWithAction = () => {
    snackBarProps.message = "I am a warning with buttons";
    snackBarProps.messageType = "warning";
    snackBarProps.button1Label = "Cancel";
    snackBarProps.button2Label = "Proceed";
    snackBarProps.buttonCallback = myButtonCallback;
    setSnackBarProps(snackBarProps);
    openSnackbarMessage();
  };

  return (
    <Paper style={styles.root}>
      {buttons.map((button) => (
        <Button
          key={button.variant}
          variant="outlined"
          style={{ ...styles.button, ...styles[button.variant] }}
          onClick={handleClick(button)}
        >
          {button.variant}
        </Button>
      ))}
      <Button
        variant="outlined"
        style={styles.button}
        onClick={handleClickWithAction}
      >
        With Buttons
      </Button>
    </Paper>
  );
};

export default MessageButtons;
