import { useMediaQuery, useTheme } from "@material-ui/core"

export default function useIsMobile() {
  return useMediaQuery(useTheme().breakpoints.down("xs"))
}
