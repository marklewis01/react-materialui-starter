import { createMuiTheme } from '@material-ui/core/styles'
import deepOrange from '@material-ui/core/colors/deepOrange'
import blueGrey from '@material-ui/core/colors/blueGrey'

export const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: deepOrange
  },
  status: {
    danger: 'orange'
  },
  overrides: {
    MuiPaper: {
      elevation2: {
        boxShadow:
          '0px 1px 8px 0px rgba(0, 0, 0, 0.07), 0 1px 2px 0px rgba(0, 0, 0, 0.15)'
      }
    }
  }
})
