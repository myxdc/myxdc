'use client'
import { CloseIcon } from '@myxdc/ui'
import { toast, ToastBar, Toaster as HotToaster } from 'react-hot-toast'

export default function Toaster() {
  return (
    <HotToaster>
      {(t: any) => (
        <ToastBar
          toast={t}
          style={{
            maxWidth: '90vw',
          }}
        >
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== 'loading' && (
                <button onClick={() => toast.dismiss(t.id)}>
                  <CloseIcon fill="#000000" width="18px" height="18px" />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </HotToaster>
  )
}
