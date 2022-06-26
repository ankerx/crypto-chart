import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./App";
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement as Element);

root.render(<App />);
