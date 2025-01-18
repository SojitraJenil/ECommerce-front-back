import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import User from './components/User/User';
import Product from './components/Product/Product';
import Inquiries from './components/inquiries/Inquiries';
import Categories from './components/Categories/Categories';
import Order from './components/order/Order';
import Cart from './components/Cart/Cart';
import ChatProvider from './components/Chat/ChatProvider';
import Login from './components/Login/Login';
import ProtectedRoute from './components/Login/ProtectedRoute';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <DefaultLayout>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <>
                    <PageTitle title="e-com Admin | Dashboard" />
                    <ProtectedRoute>
                      <ECommerce />
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                index
                element={
                  <>
                    <PageTitle title="e-com Admin | Dashboard" />
                    <ProtectedRoute>
                      <ECommerce />
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/calendar"
                element={
                  <>
                    <PageTitle title="Calendar" />
                    <ProtectedRoute>
                      <Calendar />
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/admin/user"
                element={
                  <>
                    <PageTitle title="user" />
                    {/* <ProtectedRoute> */}
                    <User />
                    {/* </ProtectedRoute> */}
                  </>
                }
              />
              <Route
                path="/admin/inquiries"
                element={
                  <>
                    <PageTitle title="Inquiries" />
                    <ProtectedRoute>
                      <Inquiries />
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/admin/categories"
                element={
                  <>
                    <PageTitle title="categories" />
                    <ProtectedRoute>
                      <Categories />
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/admin/order"
                element={
                  <>
                    <PageTitle title="order" />
                    {/* <ProtectedRoute> */}
                    <Order />
                    {/* </ProtectedRoute> */}
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                    <PageTitle title="Profile" />
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/forms/form-elements"
                element={
                  <>
                    <PageTitle title="Form Elements" />
                    <ProtectedRoute>
                      <FormElements />
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/forms/form-layout"
                element={
                  <>
                    <PageTitle title="Form Layout" />
                    <ProtectedRoute>
                      <FormLayout />
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/tables"
                element={
                  <>
                    <PageTitle title="Tables" />
                    <ProtectedRoute>
                      <Tables />
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/admin/Product"
                element={
                  <>
                    <PageTitle title="Tables" />
                    <ProtectedRoute>
                      <Product />
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/admin/cart"
                element={
                  <>
                    <PageTitle title="Tables" />
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/settings"
                element={
                  <>
                    <PageTitle title="Settings" />
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/admin/chat"
                element={
                  <>
                    <PageTitle title="chat" />
                    <ProtectedRoute>
                      <ChatProvider />
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/chart"
                element={
                  <>
                    <PageTitle title="Basic Chart" />
                    <ProtectedRoute>
                      <Chart />
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/ui/alerts"
                element={
                  <>
                    <PageTitle title="Alerts" />
                    <ProtectedRoute>
                      <Alerts />
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/ui/buttons"
                element={
                  <>
                    <PageTitle title="Buttons" />
                    <ProtectedRoute>
                      <Buttons />
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/auth/signin"
                element={
                  <>
                    <PageTitle title="Signin" />
                    <ProtectedRoute>
                      <SignIn />
                    </ProtectedRoute>
                  </>
                }
              />
              <Route
                path="/auth/signup"
                element={
                  <>
                    <PageTitle title="Signup" />
                    <ProtectedRoute>
                      <SignUp />
                    </ProtectedRoute>
                  </>
                }
              />
            </Routes>
          </DefaultLayout>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
