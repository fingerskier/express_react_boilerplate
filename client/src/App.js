import Devices from './component/Devices'
import Main from './component/Main'
import Panel from './component/Panel'
import Settings from './component/Settings'
import useLocalStorage from './hook/useLocalStorage'

import './style/App.css'
import devicesIcon from './img/devices.png'
import settingsIcon from './img/settings.png'
import dataIcon from './img/data.png'
import aboutIcon from './img/about.png'


function App() {
  const [time, setTime] = useLocalStorage(' cardinal-main-time', null)

  return (<>
    <Main time={time} />
    
    <Panel classes="upper left" icon={devicesIcon} title="Devices">
      <Devices />
    </Panel>
    
    <Panel classes="lower left" icon={dataIcon} title="Data">
      <div>Account & Data</div>
    </Panel>
    
    <Panel classes="upper right" icon={settingsIcon} title="Settings" time={time}>
      <Settings time={time} setTime={setTime} />
    </Panel>
    
    <Panel classes="lower right" icon={aboutIcon} title="About">
    </Panel>
  </> )
}


export default App