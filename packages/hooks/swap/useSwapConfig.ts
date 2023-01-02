import { useEffect, useState } from 'react'

const defaultConfig = {
  slippage: 0.5,
  deadline: 20, // 20 minutes
}

export const useSwapConfig = () => {
  const [config, setConfig] = useState(defaultConfig)

  useEffect(() => {
    const cconfig = localStorage.getItem('myxdc:swap:config')
    if (cconfig) {
      setConfig(JSON.parse(cconfig))
    }
  }, [])

  const updateConfig = (newConfig: typeof defaultConfig) => {
    setConfig(newConfig)
    localStorage.setItem('myxdc:swap:config', JSON.stringify(newConfig))
  }

  const setDeadline = (minutes: number) => {
    updateConfig({ ...config, deadline: minutes })
  }

  const setSlippage = (slippage: number | 'auto') => {
    if (slippage === 'auto') {
      updateConfig({ ...config, slippage: 0.5 })
    } else {
      updateConfig({ ...config, slippage })
    }
  }

  return {
    config,
    updateConfig,
    setDeadline,
    setSlippage,
  }
}
