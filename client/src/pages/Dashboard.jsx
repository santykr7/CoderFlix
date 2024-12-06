import CreatePost from '@/components/ui/CreatePost'
import AllPost from '@/customes/AllPost'
import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const tab = useSelector((state) => state.nav.tab)

  const renderComponent = () => {
    switch (tab) {
      case 'create-post':
        return <CreatePost />
      case 'all-post':
        return <AllPost />
        
    
      default:
        return <CreatePost />;
    }
  }
  return (
    <div>
      {renderComponent()}
    </div>
  )
}

export default Dashboard
