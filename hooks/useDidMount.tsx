import { useEffect } from "react"

export default function useDidMount(f: any) {
  // eslint-disable-next-line
  useEffect(() => f && f(), [])
}
