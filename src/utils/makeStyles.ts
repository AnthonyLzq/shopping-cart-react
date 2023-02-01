import { createMakeStyles } from 'tss-react'

import { theme } from 'global'

const { makeStyles } = createMakeStyles({
  useTheme: () => theme
})

export { makeStyles }
