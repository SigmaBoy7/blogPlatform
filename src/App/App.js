import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import PostList from '../features/PostList-feature/components/PostList';
import FullPost from '../features/Post-feature/components/FullPost';
import UserCreateForm from '../features/User-feature/components/UserCreateForm';
import UserLoginForm from '../features/User-feature/components/UserLoginForm';
import UserUpdateForm from '../features/User-feature/components/UserUpdateForm';
import PostEditForm from '../features/Post-feature/components/PostEditForm';
import PostCreateForm from '../features/Post-feature/components/PostCreateForm';
import AppLayout from '../components/AppLayout';
import AppRouteErrorPage from '../components/AppRouteErrorPage';
import { UserProvider } from '../context/UserContext';
import { articleLoader } from '../features/Post-feature/components/FullPost/FullPost';

import RequireAuth from './RequireAuth';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />} errorElement={<AppRouteErrorPage />}>
      <Route index element={<PostList />} />
      <Route
        path="/posts/:slug"
        element={
          <RequireAuth>
            <FullPost />
          </RequireAuth>
        }
        loader={articleLoader}
      />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <UserUpdateForm />
          </RequireAuth>
        }
      />
      <Route
        path="/articles/:slug/edit"
        element={
          <RequireAuth>
            <PostEditForm />
          </RequireAuth>
        }
      />
      <Route
        path="/new-article"
        element={
          <RequireAuth>
            <PostCreateForm />
          </RequireAuth>
        }
      />
      <Route path="/sign-up" element={<UserCreateForm />} />
      <Route path="/sign-in" element={<UserLoginForm />} />
    </Route>
  )
);

export default function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}
