import { Toaster } from "react-hot-toast"
import Auth from "./contexts/Auth"
import store from "./store/store"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"
import AuthRouter from "./routers/AppRouter"
import Modal from "./contexts/Modal"
import WebSocket from "./contexts/WebSocket"


function App() {
  return (
    <>
      <Toaster />
      <Auth>
        <WebSocket>
          <Provider store={store}>
            <Modal>
              <RouterProvider router={AuthRouter} />
            </Modal>
          </Provider>
        </WebSocket>
      </Auth>
    </>
  )
}

export default App
