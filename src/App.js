import logo from './logo.svg';
import './App.css';
import Clock from './Clock';
import ToggleButton from './ToggleButton';
import RunningNumber from './RunningNumber';
import PersonalSchedule from './PersonalSchedule';
import FormExploring from './FormExploring';
import SculpturePage from './SculpturePage';
import UpdateObjectForm from './UpdateObjectForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Clock name="Clock" />
        <ToggleButton name="ToggleButton" />
        <RunningNumber />
        <PersonalSchedule />
        <FormExploring hasPreventDefault={false} />
        <FormExploring hasPreventDefault={true} />
        <SculpturePage />
        <UpdateObjectForm />
      </header>
    </div>
  );
}

export default App;
