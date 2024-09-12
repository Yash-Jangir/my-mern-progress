import AuthProvider from "./Context";
import AuthHandler from "./Handler";


export default function Auth(props) {
    return <AuthProvider>
        <AuthHandler {...props} />
    </AuthProvider>
}
