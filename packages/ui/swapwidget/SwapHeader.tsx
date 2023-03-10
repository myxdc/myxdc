import { useConfig } from '@myxdc/hooks/custom/useConfig'

import { IconButton } from '../iconbutton'
import { SettingsIcon } from '../icons'
export interface SwapHeaderProps {
  onSettings?: () => void
  showBeta?: boolean
}

export const SwapHeader = ({ onSettings, showBeta = true }: SwapHeaderProps) => {
  const config = useConfig()

  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center">
        <div className="text-2xl font-bold text-gray-800">Swap</div>
        {showBeta && <div className="p-1 ml-2 text-xs font-medium bg-gray-300 rounded-lg">{config.STAGE}</div>}
      </div>
      <IconButton variant={2} onClick={onSettings}>
        <SettingsIcon />
      </IconButton>
    </div>
  )
}
