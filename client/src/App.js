import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {Landing, ProtectedRoute, Register, Error, SharedLayout, Clients} from './pages/index'
import {InvoiceAdd, InvoiceAll, Profile} from "./pages";
import Invoice from "./components/invoice/Invoice";


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
                    <Route path="all-invoice" element={<InvoiceAll/>}/>
                    <Route path="add-invoice" >
                        <Route index element={<InvoiceAdd/>}/>
                        <Route path='invoice' element={<Invoice/>}/>
                    </Route>
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
