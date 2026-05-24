import { TicTacToe } from './components/TicTacToe';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-[#EAE6DF] font-sans selection:bg-[#FF90E8] selection:text-black">
      <TicTacToe />
    </div>
  );
}

export default App;
