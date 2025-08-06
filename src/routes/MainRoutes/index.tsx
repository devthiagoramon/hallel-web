import { Route, Routes } from 'react-router-dom'
import SignIn from '../../pages/SignIn'
import SignUp from '../../pages/SignUp'

const MainRoutes = () => {
    return (
        <Routes>
            <Route element={<SignIn />} path='/signIn' />
            <Route element={<SignUp />} path='/signUp' />
        </Routes>
    )
}

export default MainRoutes