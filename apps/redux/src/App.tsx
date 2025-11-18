import { useDispatch } from "react-redux"
import Counter from "./components/counts"
import { decrement, increment } from "./redux/countSlice";

function App() {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <Counter />
    </div>
  )
}

export default App
