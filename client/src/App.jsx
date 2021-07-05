import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Widgetbar from "./components/Widgetbar";
import useToken from "./UseToken";
import LoginWithGoogle from "./components/LoginWithGoogle";
function App() {
  const { token, setToken } = useToken();
  //console.log(setToken);
  // const [Screen, setscreen] = React.useState(
  //   <Loginscreen submitfunction={loginFunction} />
  // );
  if (!token) return <LoginWithGoogle setToken={setToken} />;

  return (
    <div className="app">
      <Sidebar /> <Feed /> <Widgetbar />
    </div>
  );
}

export default App;
