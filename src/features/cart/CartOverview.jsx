import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className="bg-stone-900 p-4 font-semibold uppercase text-stone-200">
      {/* space=>margin-left or marging the same as gap in d-flex */}
      <p className="space-x-4 text-stone-300">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
