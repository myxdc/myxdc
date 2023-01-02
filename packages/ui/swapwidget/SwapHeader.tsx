import { IconButton } from '../iconbutton'
import { SettingsIcon } from '../icons'

export interface SwapHeaderProps {
  onSettings?: () => void
  showBeta?: boolean
}

export const SwapHeader = ({ onSettings, showBeta = true }: SwapHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center">
        <div className="text-2xl font-bold text-gray-800">Swap</div>
        {showBeta && <div className="ml-2 text-sm font-medium text-gray-500">alpha</div>}
      </div>
      <IconButton variant={2} onClick={onSettings}>
        <SettingsIcon />
      </IconButton>
    </div>
  )
}
