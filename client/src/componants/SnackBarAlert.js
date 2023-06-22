import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { setSnackbar } from "../redux/Actions/snackbarActions";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBarAlert() {
  const snackbarOpen = useSelector(
    (state) => state.snackbarReducer.snackbarOpen
  );
  const snackbarType = useSelector(
    (state) => state.snackbarReducer.snackbarType
  );
  const alerts = useSelector((state) => state.snackbarReducer.alerts);

  const dispatch = useDispatch();

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setSnackbar(false, "", []));
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <div className="flex flex-col gap-2">
          {alerts?.map((alert, i) => (
            <Alert key={i} severity={snackbarType} sx={{ width: "100%" }}>
              {alert.msg}
            </Alert>
          ))}
        </div>
      </Snackbar>
    </Stack>
  );
}
