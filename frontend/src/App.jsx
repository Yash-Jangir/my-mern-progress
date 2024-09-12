import { Toaster } from "react-hot-toast"
import Auth from "./contexts/Auth"
import store from "./store/store"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"
import AuthRouter from "./routers/AppRouter"
import Modal from "./contexts/Modal"


function App() {
  return (
    <>
      <Toaster />
      <Auth>
        <Provider store={store}>
          <Modal>
            <RouterProvider router={AuthRouter} />
          </Modal>
        </Provider>
      </Auth>
    </>
  )
}

export default App
