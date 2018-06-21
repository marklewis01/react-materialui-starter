import React from 'react'
import { Grid, Paper, Typography, withStyles } from '@material-ui/core'

const styles = theme => ({
  banner: {
    alignItems: `center`,
    padding: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit * 2
    }
  },
  LHS: {
    borderRight: `1px solid ${theme.palette.primary.light}`,
    paddingRight: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      borderBottom: `1px solid ${theme.palette.primary.light}`,
      borderRight: 'none',
      paddingBottom: theme.spacing.unit * 3,
      paddingRight: 'unset'
    }
  },
  RHS: {
    paddingLeft: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 'unset',
      paddingTop: theme.spacing.unit * 3
    }
  },
  planDetails: {
    display: `flex`
  },
  planItem: {
    flexBasis: `40%`,
    [theme.breakpoints.down('sm')]: {
      flexBasis: '44%'
    }
  }
})

const Banner = ({ classes }) => {
  return (
    <Paper>
      <Grid container className={classes.banner}>
        <Grid item xs={12} sm={7} className={classes.LHS}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={5}>
              <img
                src="http://via.placeholder.com/350x150"
                style={{ width: `100%` }}
                alt="compnany logo"
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Typography variant="title">
                Some Long Organisation Name
              </Typography>
              <Typography variant="subheading">
                Some other text goes here
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={5} className={classes.RHS}>
          <div className={classes.planDetails}>
            <Typography variant="body2" className={classes.planItem}>
              Plan Name:
            </Typography>
            <Typography variant="body1">Gold</Typography>
          </div>
          <div className={classes.planDetails}>
            <Typography variant="body2" className={classes.planItem}>
              Renewal Date:
            </Typography>

            <Typography variant="body1">24th December, 2019</Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default withStyles(styles, { withTheme: true })(Banner)
