import axios from "axios";
import {useState} from "react";
import useUser from "../hooks/useUser";

const AddCommentForm = ({articleId, onArticleUpdated}) => {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const {user} = useUser();

  // Request to server
  const addComment = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? {authtoken: token} : {};

    const response = await axios.post(
      `/api/articles/${articleId}/comments`,
      {
        postedBy: name,
        text: commentText,
      },
      {headers}
    );
    const updatedArticle = response.data;
    onArticleUpdated(updatedArticle);
    setName("");
    setCommentText("");
  };

  return (
    <div id="add-comment-form">
      <h3>Add a Comment</h3>
      {user && <p>You are posting as {user.email}</p>}
      {/* <label>
        Name:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
      </label> */}
      <label>
        Comment:
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows="4"
          cols="50"
        />
      </label>
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
};

export default AddCommentForm;
