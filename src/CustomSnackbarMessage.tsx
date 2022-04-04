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

export const messageTypes = {
  DEFAULT: "default" as VariantType | undefined,
  ERROR: "error" as VariantType | undefined,
  SUCCESS: "success" as VariantType | undefined,
  WARNING: "warning" as VariantType | undefined,
  INFO: "info" as VariantType | undefined
};

//The provider context has to be instantiated in the calling component this is the reason for the callback
//This context is created by useSnackbar() which gets a reference to the Provider defined in the root component App.
//The first step is to get this context, without it the utility will not function.
let _snackbarProviderContext: ProviderContext;

export function setSnackbarProviderContext(snackbarProvider: ProviderContext) {
  _snackbarProviderContext = snackbarProvider;
}

export function openSnackbarMessage(props: CustomSnackbarMessageProps) {
  const { enqueueSnackbar, closeSnackbar } = _snackbarProviderContext;

  let _buttonCallback = (buttonName: string | undefined) => {};
  if (props.buttonCallback) {
    _buttonCallback = props.buttonCallback;
  }

  const _message: SnackbarMessage = props.message;
  const _variant = props.messageType || "default";
  //Setting as default duration for auto hide of snackbar
  let _autoHideDuration = 3000;
  //If button passed the hide will be handled by button click so set duration long
  if (props.button1Label) {
    _autoHideDuration = 1000000;
  }

  //build buttons id button labels passed
  const action = (key: SnackbarKey | undefined) => (
    <>
      {props.button1Label && (
        <Button
          sx={{ color: "white" }}
          onClick={() => {
            closeSnackbar(key);
            _buttonCallback(props.button1Label);
          }}
        >
          {props.button1Label}
        </Button>
      )}
      {props.button2Label && (
        <Button
          sx={{ color: "white", marginLeft: "7px" }}
          onClick={() => {
            closeSnackbar(key);
            _buttonCallback(props.button2Label);
          }}
        >
          {props.button2Label}
        </Button>
      )}
    </>
  );

  enqueueSnackbar(_message, {
    variant: _variant,
    preventDuplicate: true,
    autoHideDuration: _autoHideDuration,
    action: action,
    anchorOrigin: {
      vertical: "top",
      horizontal: "center"
    },
    style: { minWidth: "600px" }
  });
}
