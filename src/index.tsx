import { render } from 'preact';
import { Main } from './panels/Main';		
import './style.css';
import "./Pwa"
export function App() {
  return <Main />;
}


render(<App />, document.getElementById('app'));
