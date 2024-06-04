import { useEffect, useMemo, useState } from "react";
import { PostCard, Pagination, Search } from "./components";
import { PAGINATION_LIMIT } from "../../constants";
import { debounce } from "./utils";
import styled from "styled-components";
import { request } from "../../utils/request";

const MainContainer = ({ className }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    request(
      `/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`
    ).then(({ data: { posts, lastPage } }) => {
      setPosts(posts);
      setLastPage(lastPage);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, shouldSearch]);

  const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

  const onSearch = ({ target }) => {
    setSearchPhrase(target.value);
    startDelayedSearch(!shouldSearch);
  };

  return (
    <div className={className}>
      <Search searchPhrase={searchPhrase} onChange={onSearch} />
      {posts.length ? (
        <div className="post-list">
          {posts.map(({ id, title, imageUrl, publishedAt, comments }) => (
            <PostCard
              key={id}
              id={id}
              title={title}
              imageUrl={imageUrl}
              publishedAt={publishedAt}
              commentsCount={comments.length}
            />
          ))}
        </div>
      ) : (
        <div className="no-posts-found">Ничего не надено</div>
      )}
      {lastPage > 1 && (
        <Pagination page={page} lastPage={lastPage} setPage={setPage} />
      )}
    </div>
  );
};

export const Main = styled(MainContainer)`
  & .post-list {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
  }

  & .no-posts-found {
    margin-top: 40px;
    text-align: center;
    font-size: 24px;
  }
`;
