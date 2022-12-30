'use client'

import { Button, Typography } from '@myxdc/ui'
import { toast } from 'react-hot-toast'

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-white rounded-3xl">
      <Typography variant="h3" weight={500}>
        Settings
      </Typography>
      {/* //TODO: Implement Private Key Export and improve settings overall*/}
      <Button
        className="w-full mt-6"
        onClick={() => {
          toast.error('Sorry, this feature is not yet implemented. We are working on it! :)')
        }}
      >
        Export Private Key
      </Button>
    </div>
  )
}

export default Page
