import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';

import { DefaultLayout } from './layouts';
import { publicRoutes, privateRoutes } from './routes/AppRoutes';
import { ErrorPage } from './pages';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = route.layout;
                        if (route.layout === null) {
                            Layout = Fragment;
                        } else if (route.layout) {
                            Layout = route.layout;
                        } else {
                            Layout = DefaultLayout; // Assuming you have a DefaultLayout component
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {privateRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = route.layout;
                        if (route.layout === null) {
                            Layout = Fragment;
                        } else if (route.layout) {
                            Layout = route.layout;
                        } else {
                            Layout = DefaultLayout;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <ProtectedRoute allowedRoles={route.allowedRoles}>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </ProtectedRoute>
                                }
                            />
                        );
                    })}

                    <Route
                        path="*"
                        element={
                            <>
                                <ErrorPage />
                            </>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
