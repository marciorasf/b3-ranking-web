import React, { useState } from "react"

import { ThemeProvider } from "@material-ui/core"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import { useTheme } from "@material-ui/styles"

import { renderComponent } from "../utils/node"

type NotificationProps = {
  type?: "success" | "error" | "warning" | "info"
  message: string
}

type NotificationType = {
  success: (props: NotificationProps) => void
  error: (props: NotificationProps) => void
  warning: (props: NotificationProps) => void
  info: (props: NotificationProps) => void
}

const Notification: NotificationType & React.FC<NotificationProps> = (
  props
) => {
  const { type, message } = props
  const theme = useTheme()

  const [visible, setVisible] = useState(true)

  const handleClose = (_: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    setVisible(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={visible}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MuiAlert
          onClose={handleClose}
          elevation={1}
          variant="standard"
          severity={type}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  )
}

Notification.success = (props) =>
  renderComponent("notification", <Notification type="success" {...props} />)

Notification.error = (props) =>
  renderComponent("notification", <Notification type="error" {...props} />)

Notification.warning = (props) =>
  renderComponent("notification", <Notification type="warning" {...props} />)

Notification.info = (props) =>
  renderComponent("notification", <Notification type="info" {...props} />)

export default Notification
