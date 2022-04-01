import { Button } from "@mui/material";
import {
  ProviderContext,
  SnackbarKey,
  SnackbarMessage,
  VariantType
} from "notistack";

export interface CustomSnackbarMessageProps {
  message: SnackbarMessage;
  messageType?: VariantType;
  button1Label?: string;
  button2Label?: string;
  buttonCallback?: (buttonName: string | undefined) => any;
}

//The provider context has to be instantiated in the calling component this is the reason for the callback
//This context is created by useSnackbar() which gets a reference to the Provider defined in the root component App.
//The first step is to get this context, without it the utility will not function.
let _snackbarProviderContext: ProviderContext;

export function setSnackbarProviderContext(snackbarProvider: ProviderContext) {
  _snackbarProviderContext = snackbarProvider;
}

const _snackBarProps = {
  message: "",
  messageType: "default",
  button1Label: undefined,
  button2Label: undefined,
  buttonCallback: undefined
} as CustomSnackbarMessageProps;

export function setSnackBarProps(props: CustomSnackbarMessageProps) {
  _snackBarProps.message = props.message;
  _snackBarProps.messageType = props.messageType;
  _snackBarProps.button1Label = props.button1Label;
  _snackBarProps.button2Label = props.button2Label;
  _snackBarProps.buttonCallback = props.buttonCallback;
}

export function getSnackBarProps() {
  return _snackBarProps;
}

export function openSnackbarMessage() {
  const { enqueueSnackbar, closeSnackbar } = _snackbarProviderContext;
  const snackbarProps = getSnackBarProps();

  let _buttonCallback = (buttonName: string | undefined) => {};
  if (snackbarProps.buttonCallback) {
    _buttonCallback = snackbarProps.buttonCallback;
  }

  const _message: SnackbarMessage = snackbarProps.message;
  const _variant = snackbarProps.messageType || "default";
  //Setting as default duration for auto hide of snackbar
  let _autoHideDuration = 3000;
  //If button passed the hide will be handled by button click so set duration long
  if (snackbarProps.button1Label) {
    _autoHideDuration = 100000;
  }

  //build buttons id button labels passed
  const action = (key: SnackbarKey | undefined) => (
    <>
      {snackbarProps.button1Label && (
        <Button
          sx={{ color: "white" }}
          onClick={() => {
            closeSnackbar(key);
            _buttonCallback(snackbarProps.button1Label);
          }}
        >
          {snackbarProps.button1Label}
        </Button>
      )}
      {snackbarProps.button2Label && (
        <Button
          sx={{ color: "white", marginLeft: "7px" }}
          onClick={() => {
            closeSnackbar(key);
            _buttonCallback(snackbarProps.button2Label);
          }}
        >
          {snackbarProps.button2Label}
        </Button>
      )}
    </>
  );

  enqueueSnackbar(_message, {
    variant: _variant,
    preventDuplicate: true,
    autoHideDuration: _autoHideDuration,
    action: action
  });
}
