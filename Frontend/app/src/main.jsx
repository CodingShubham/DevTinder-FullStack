import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"

import "./index.css"
import App from "./App.jsx"
import Login from "./Login.jsx"
import Profile from "./Profile.jsx"
import Feed from "./Feed.jsx"
import appStore from "./utils/appStore.js"
import Connections from "./Connections.jsx"
import Requests from "./Requests.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="feed" element={<Feed />} />
             <Route path="connections" element={<Connections />} />
             <Route path="requests" element={<Requests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
