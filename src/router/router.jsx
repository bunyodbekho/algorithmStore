import { Route, Routes, Navigate } from "react-router-dom";

import MainLayout from "../components/layouts/MainLayout/MainLayout";
import MainPage from "../components/pages/MainPage";
import AddAlgPage from "../components/pages/AddAlgPage";
import AlgPage from "../components/pages/AlgPage";
import InfoPage from "../components/pages/InfoPage";
import LoginPage from "../components/pages/LoginPage";
import ProfilePage from "../components/pages/ProfilePage";
import SignUpPage from "../components/pages/SignUpPage";
import SrtPage from "../components/pages/SrtPage";
import CreditsPage from "../components/pages/CreditsPage";
import { useState } from "react";
import ProfileLayout from "../components/layouts/ProfileLayout/ProfileLayout";
import MyAlgPage from "../components/pages/MyAlgPage";
import MyAlgLayout from "../components/layouts/MyAlgLayout/MyAlgLayout";
import AddCodePage from "../components/pages/AddCodePage";
import AddCodeLayout from "../components/layouts/AddCodeLayout/AddCodeLayout";
import AddLanCodePage from "../components/pages/AddLanCodePage";
import SortingLayout from "../components/layouts/SortingLayout/SortingLayout";
import SrtTypePage from "../components/pages/SrtTypePage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<InfoPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>

      <Route path="/:username" element={<ProfileLayout />}>
        <Route index element={<MainPage />} />
        <Route path="profile" element={<ProfilePage />} />

        <Route path="my-algorithms" element={<MyAlgLayout />}>
          <Route index element={<MyAlgPage />} />

          <Route path=":algorithm" element={<AddCodeLayout />}>
            <Route index element={<AddCodePage />} />
            <Route path="java" element={<AddLanCodePage lan="java" />} />
            <Route path="python" element={<AddLanCodePage lan="python" />} />
            <Route
              path="javascript"
              element={<AddLanCodePage lan="javascript" />}
            />
            <Route path="cpp" element={<AddLanCodePage lan="cpp" />} />
            <Route
              path="typescript"
              element={<AddLanCodePage lan="typescript" />}
            />
          </Route>
        </Route>

        <Route path="add-algorithm" element={<AddAlgPage />} />
        <Route path="credits" element={<CreditsPage />} />
        <Route path=":algorithm" element={<AlgPage />} />

        <Route path="sorting" element={<SortingLayout />}>
          <Route index element={<SrtPage />} />
          <Route path=":type" element={<SrtTypePage />} />
          <Route path=":type/:algorithm" element={<AlgPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/:username" />} />
      </Route>
    </Routes>
  );
}
