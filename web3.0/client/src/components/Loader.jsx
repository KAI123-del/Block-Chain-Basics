import React from 'react'

function Loader() {
  return (
    <div className="flex justify-center  items-center py-3">
    <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-teal-600" />
  </div>
  )
}

export default Loader