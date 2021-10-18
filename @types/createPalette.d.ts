import { PaletteColor } from "@material-ui/core/styles/createPalette"

declare module "@material-ui/core/styles/createPalette" {
  interface PaletteOptions {
    header?: PaletteColorOptions
  }

  interface Palette {
    header: PaletteColor
  }
}
