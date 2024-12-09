import React from 'react'
import Banner from '../../Components/Banner/Banner'
import RowPost from '../../Components/RowPost/RowPost'

// import urls
import { action, Horror, Comedy } from '../../Constants/Urls'

const HomePage = () => {
  return (
    <div>
      <Banner/>
      <RowPost url={action} title="Trending" />
      <RowPost url={Horror} title="Romance" />
      
    </div>
  )
}

export default HomePage
