import './App.css';
import PageRoute from './pageRoute'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from "react";
import { ThemeContext } from './context';
function App() {
  const {theme}  = useContext(ThemeContext);
  return (
    <div className="App" style={{ background: theme === 'light' ? '#fff' : '#000'}}>
      <PageRoute />
    </div>
  );
}

export default App;
