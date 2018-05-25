import React from 'react'
import Typography from '@material-ui/core/Typography'

const Page = () => {
  return (
    <main>
      <div className="page">
        <h2>I'm the Page</h2>
      </div>
      <Typography noWrap>
        {'Your think water moves fast? You should see ice.'}
      </Typography>
    </main>
  )
}

export default Page
