import { Routes, Route } from "react-router-dom";
import { Error, Header, Footer, Modal } from "./components";
import styled from "styled-components";
import { Authorization, Post, Reristration, Users, Main } from "./pages";
import { useLayoutEffect } from "react";
import { ERROR } from "./constants";
import { setUserAction } from "./actions";
import { useDispatch } from "react-redux";

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  nim-height: 1000px;
  margin: 0 auto;
  background-color: #fff;
`;

const Page = styled.div`
  padding: 120px 0 20px;
`;

export const Blog = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem("userData");

    if (!currentUserDataJSON) {
      return;
    }

    const currentUserData = JSON.parse(currentUserDataJSON);

    dispatch(
      setUserAction({
        ...currentUserData,
        roleId: Number(currentUserData.roleId),
      })
    );
  }, [dispatch]);

  return (
    <>
      <AppColumn>
        <Header />
        <Page>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Authorization />} />
            <Route path="/register" element={<Reristration />} />
            <Route path="/users" element={<Users />} />
            <Route path="/post" element={<Post />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/post/:id/edit" element={<Post />} />
            <Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
          </Routes>
        </Page>
        <Footer />
        <Modal />
      </AppColumn>
    </>
  );
};
