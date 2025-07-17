import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment, Suspense, lazy } from 'react';

import { DefaultLayout } from './layouts';
import { publicRoutes, privateRoutes } from './routes/AppRoutes';
import ProtectedRoute from './routes/ProtectedRoute';

const ErrorPage = lazy(() => import('~/pages/Error/Error'));

function App() {
    return (
        <Router>
            <div className="App">
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = route.layout;

                            if (Layout === null) {
                                Layout = Fragment;
                            } else if (!Layout) {
                                Layout = DefaultLayout;
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

                            if (Layout === null) {
                                Layout = Fragment;
                            } else if (!Layout) {
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
                </Suspense>
            </div>
        </Router>
    );
}

export default App;
