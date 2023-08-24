import { AuthProvider } from '../path/to/auth';
import { FilterContextProvider } from '../context/Context';
function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <FilterContextProvider>
                <Component {...pageProps} />
            </FilterContextProvider>
        </AuthProvider>
    );
}

export default App;