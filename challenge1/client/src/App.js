import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

const CounterContext = React.createContext();

const counterReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return { ...state, count: action.count };
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "MySET":
      return { ...state, Mycount: action.Mycount };
    case "MyINCREMENT":
      return { ...state, Mycount: state.Mycount + 1 };
    case "MyDECREMENT":
      return { ...state, Mycount: state.Mycount - 1 };
    default:
      return state;
  }
};

const Home = () => {
  Counter();
  MyCounter();
  const { state } = useContext(CounterContext);
  console.log(state);
  return (
    <div>
      <h1>Counter Value: {state.count}</h1>
      <h1>My Counter Value: {state.Mycount}</h1>
      <Link style={{ margin: "10px" }} to="/counter">
        Counter{" "}
      </Link>
      <br />
      <Link style={{ margin: "10px" }} to="/Mycounter">
        {" "}
        My Counter
      </Link>
    </div>
  );
};

const Counter = () => {
  const { state, dispatch } = useContext(CounterContext);
  const navigate = useNavigate();

  const fetchCounter = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/counter");
      dispatch({ type: "SET", count: response.data.count });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCounter();
  }, [fetchCounter]);

  const incrementCounter = useCallback(async () => {
    try {
      await axios.post("http://localhost:5000/api/counter/increment");
      dispatch({ type: "INCREMENT" });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const decrementCounter = useCallback(async () => {
    try {
      await axios.post("http://localhost:5000/api/counter/decrement");
      dispatch({ type: "DECREMENT" });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  return (
    <div>
      <h2>Counter</h2>
      <p>Count: {state.count}</p>
      <button onClick={incrementCounter}>Increment</button>
      <button onClick={decrementCounter}>Decrement</button>
      <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
};

const MyCounter = () => {
  const { state, dispatch } = useContext(CounterContext);
  const navigate = useNavigate();

  const fetchCounter = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/Mycounter");
      dispatch({ type: "MySET", Mycount: response.data.Mycount });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCounter();
  }, [fetchCounter]);

  const incrementCounter = useCallback(async () => {
    try {
      await axios.post("http://localhost:5000/api/Mycounter/increment");
      dispatch({ type: "MyINCREMENT" });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const decrementCounter = useCallback(async () => {
    try {
      await axios.post("http://localhost:5000/api/Mycounter/decrement");
      dispatch({ type: "MyDECREMENT" });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  return (
    <div>
      <h2>My Counter</h2>
      <p>My Count: {state.Mycount}</p>
      <button onClick={incrementCounter}>Increment</button>
      <button onClick={decrementCounter}>Decrement</button>
      <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    Mycount: 0,
  });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/counter">Counter</Link>
              </li>
              <li>
                <Link to="/Mycounter">My Counter</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/Mycounter" element={<MyCounter />} />
          </Routes>
        </div>
      </Router>
    </CounterContext.Provider>
  );
};

export default App;
