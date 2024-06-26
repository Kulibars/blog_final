import styled from "styled-components";
import { Icon, H2 } from "../../../../components";
import { SpecialPanel } from "../special-panel/special-panel";
import { useNavigate } from "react-router-dom";
import { PROP_TYPE } from "../../../../constants";

const PostContentContainer = ({
  className,
  post: { publishedAt, title, imageUrl, content, id },
}) => {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <img src={imageUrl} alt={title} />
      <H2>{title}</H2>
      <SpecialPanel
        id={id}
        margin="-20px 0 20px"
        publishedAt={publishedAt}
        editButton={
          <Icon
            id="fa-pencil-square-o"
            margin="0 10px 0 0"
            size="18px"
            onClick={() => navigate(`/post/${id}/edit`)}
          />
        }
      />
      <div className="post-text">{content}</div>
    </div>
  );
};

export const PostContent = styled(PostContentContainer)`
  & img {
    float: left;
    margin: 0 20px 10px 0;
  }

  & .post-text {
    font-size: 18px;
    white-space: pre-line;
  }
`;

PostContent.propTypes = {
  post: PROP_TYPE.POST.isRequired,
};
