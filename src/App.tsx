import PagesRouter from "./components/PagesRouter";
import { initStore, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const store = initStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PagesRouter />
      </PersistGate>
    </Provider>
  );
}

export default App;
