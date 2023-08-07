import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'

import SignIn from '@pages/SignIn'
import { PAGE_PATH } from '@constants/path'
import Layout from '@components/common/Layout/Layout'
import DashBoard from '@pages/DashBoard/DashBoard'
import Summary from '@pages/Cluster/Summary'
import SearchTrend from '@pages/Statistics/SearchTrend'
import SearchTermStatistic from '@pages/Statistics/SearchTermStatistic'
import PopularTerms from '@pages/Search/PopularTerms'
import SuggestedTerms from '@pages/Search/SuggestedTerms'
import CategoryBoosting from '@pages/Search/CategoryBoosting'
import IndexManagement from '@pages/Index/IndexManagement'
import DictionaryManagement from '@pages/Dictionary/DictionaryManagement'
import Autocomplete from '@pages/Dictionary/Autocomplete'
import TypoCorrection from '@pages/Dictionary/TypoCorrection'
import UserManagement from '@pages/System/UserManagement'
import DetailSummary from '@components/Index/Modal/IndexDetail/DetailSummary'
import DetailSetting from '@components/Index/Modal/IndexDetail/DetailSetting'
import DetailMapping from '@components/Index/Modal/IndexDetail/DetailMapping'
import NotFoundPage from '@components/common/NotFound/NotFoundPage'
import AuthenticateRoute from './Router/AuthenticateRoute'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthenticateRoute isAuthenticated={false} />}>
                    <Route path={PAGE_PATH.SIGN_IN} element={<SignIn />} />
                </Route>
                <Route element={<AuthenticateRoute isAuthenticated={true} />}>
                    <Route path={PAGE_PATH.HOME} element={<Layout />}>
                        <Route
                            path={PAGE_PATH.DASH_BOARD}
                            element={<DashBoard />}
                        />
                        <Route path={PAGE_PATH.CLUSTER} element={<Outlet />}>
                            <Route
                                path={PAGE_PATH.SUMMARY}
                                element={<Summary />}
                            />
                        </Route>
                        <Route path={PAGE_PATH.STATISTIC} element={<Outlet />}>
                            <Route
                                path={PAGE_PATH.SEARCH_TREND}
                                element={<SearchTrend />}
                            />
                            <Route
                                path={PAGE_PATH.SEARCH_TERM_STATISTIC}
                                element={<SearchTermStatistic />}
                            />
                        </Route>
                        <Route path={PAGE_PATH.SEARCH} element={<Outlet />}>
                            <Route
                                path={PAGE_PATH.POPULAR_TERMS}
                                element={<PopularTerms />}
                            />
                            <Route
                                path={PAGE_PATH.SUGGESTED_TERMS}
                                element={<SuggestedTerms />}
                            />
                            <Route
                                path={PAGE_PATH.CATEGORY_BOOSTING}
                                element={<CategoryBoosting />}
                            />
                        </Route>

                        <Route path={PAGE_PATH.INDEX} element={<Outlet />}>
                            <Route
                                path={PAGE_PATH.MANAGEMENT_QUERY(':id')}
                                element={<IndexManagement />}
                            >
                                <Route
                                    path={PAGE_PATH.SUMMARY}
                                    element={<DetailSummary />}
                                />
                                <Route
                                    path={PAGE_PATH.SETTINGS}
                                    element={<DetailSetting />}
                                />
                                <Route
                                    path={PAGE_PATH.MAPPINGS}
                                    element={<DetailMapping />}
                                />
                            </Route>
                        </Route>

                        <Route path={PAGE_PATH.DICTIONARY} element={<Outlet />}>
                            <Route
                                path={PAGE_PATH.MANAGEMENT_QUERY(':language')}
                                element={<DictionaryManagement />}
                            />
                            <Route
                                path={PAGE_PATH.AUTOCOMPLETE}
                                element={<Autocomplete />}
                            />
                            <Route
                                path={PAGE_PATH.TYPO_CORRECTION}
                                element={<TypoCorrection />}
                            />
                        </Route>

                        <Route path={PAGE_PATH.SYSTEM} element={<Outlet />}>
                            <Route
                                path={PAGE_PATH.USER_MANAGEMENT}
                                element={<UserManagement />}
                            />
                        </Route>
                    </Route>
                </Route>
                <Route path={PAGE_PATH.NOT_FOUND} element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
