import { useSelector } from "react-redux";

function Counts() {
    const count = useSelector(state => state.count);
  return (
    <div>
        <h2>{count}</h2>
    </div>
  )
}
export default Counts;
