import React from "react"

import { Typography, Grid, Box } from "@material-ui/core"
import theme from "../../styles/theme"

const paletteKeys = [
  "background",
  "common",
  "error",
  "grey",
  "info",
  "primary",
  "secondary",
  "success",
  "text",
  "warning",
] as const

const PaletteDemo = () => {
  const { palette } = theme

  return (
    <Grid container spacing={4} direction="column">
      {paletteKeys.map((paletteKey) => (
        <Grid item key={paletteKey}>
          <Typography variant="h6" style={{ fontWeight: "bolder" }}>
            {paletteKey}
          </Typography>

          <Grid container spacing={4}>
            {Object.entries(palette[paletteKey]).map(([key, value]) => {
              return (
                <Grid item key={key}>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <Typography variant="body1">{key}</Typography>
                    </Grid>

                    <Grid item>
                      <Box
                        height={40}
                        width={40}
                        style={{ backgroundColor: value }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

export default PaletteDemo
