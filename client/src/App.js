import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {Landing, ProtectedRoute, Register, Error, SharedLayout, Clients} from './pages/index'
import {Profile} from "./pages";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <SharedLayout/>
                    </ProtectedRoute>
                }>
                    <Route index element={<div>Stats</div>}/>
                    <Route path="all-jobs" element={<div>all factures</div>}/>
                    <Route path="add-job" element={<div>add factura</div>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="client" element={<Clients/>}/>
                </Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/landing" element={<Landing/>}></Route>
                <Route path="*" element={<Error/>}></Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
