import React from "react"

import { Divider as MuiDivider, useTheme, makeStyles } from "@material-ui/core"

type SpacingProps = {
  orientation: "horizontal" | "vertical"
  size: number
}

const Spacing: React.FC<SpacingProps> = (props) => {
  const { orientation, size } = props

  const theme = useTheme()

  const customProps = {
    ...(orientation === "horizontal"
      ? { height: theme.spacing(size), width: "100%" }
      : {}),
    ...(orientation === "vertical"
      ? { height: "auto", width: theme.spacing(size) }
      : {}),
    backgroundColor: "transparent"
  }

  return (
    <MuiDivider
      orientation={orientation}
      style={{ ...customProps }}
    />
  )
}

export default Spacing
