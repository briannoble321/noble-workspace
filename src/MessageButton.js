import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useSnackbar } from "notistack";
import {
  openSnackbarMessage,
  setSnackbarProviderContext,
  messageTypes
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
  {
    variant: messageTypes.SUCCESS,
    message: "Successfully done the operation."
  },
  { variant: messageTypes.ERROR, message: "Something went wrong." },
  { variant: messageTypes.WARNING, message: "Something could go wrong" },
  { variant: messageTypes.INFO, message: "For your info..." },
  { variant: messageTypes.DEFAULT, message: "I am default..." }
];

const MessageButtons = () => {
  setSnackbarProviderContext(useSnackbar());

  const handleClick = useCallback(
    (button) => () => {
      const props = { message: button.message, messageType: button.variant };

      openSnackbarMessage(props);
    },
    []
  );

  // 2 buttons and callback
  const handleClickWithAction = () => {
    const props = {
      message: "I am a warning with buttons",
      messageType: messageTypes.WARNING,
      button1Label: "Cancel",
      button2Label: "Proceed",
      buttonCallback: (buttonName) => {
        alert(buttonName + " pressed");
      }
    };

    openSnackbarMessage(props);
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
