import { Theme, useMediaQuery } from "@material-ui/core"

export default function useIsMobile(theme: Theme) {
  return useMediaQuery(theme.breakpoints.down("xs"))
}
