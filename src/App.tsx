import PagesRouter from "./components/PagesRouter";
import { initStore } from "./store";
import { Provider } from "react-redux";

const store = initStore();

function App() {
  return (
    <Provider store={store}>
      <PagesRouter />
    </Provider>
  );
}

export default App;
