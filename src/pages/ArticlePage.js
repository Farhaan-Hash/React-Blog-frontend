import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import axios from "axios";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvotes: 0,
    comments: [],
    canUpvote: false,
  });
  const {canUpvote} = articleInfo;
  const {articleId} = useParams();

  // Check user login or not

  const {user, isLoading} = useUser();

  // Load Data
  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? {authtoken: token} : {};
      const response = await axios.get(`/api/articles/${articleId}`, {
        headers,
      });
      const newArticleInfo = await response.data;
      setArticleInfo(newArticleInfo);
    };
    if (!isLoading) {
      loadArticleInfo();
    }
  }, [user, isLoading]);

  const article = articles.find((article) => article.name === articleId);
  // Add UpVote

  const addUpvote = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? {authtoken: token} : {};
    const response = await axios.put(
      `/api/articles/${articleId}/upvote`,
      null, //null is request body
      {
        headers,
      }
    ); //server sends updated article upvote
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  };

  if (!article) {
    return <NotFoundPage />;
  }
  return (
    <>
      <h1>{article.title}</h1>
      <div className="upvote-section">
        {user ? (
          <button onClick={addUpvote}>
            {canUpvote ? "Upvote" : "Already Upvoted!"}
          </button>
        ) : (
          <button>Log In to UpVote!</button>
        )}
      </div>
      <p>This article has {articleInfo.upvotes} upvote(s)</p>
      {article.content.map((paragraph, key, comments) => (
        <p key={key}>{paragraph}</p>
      ))}

      {user ? (
        <AddCommentForm
          articleId={articleId}
          onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)}
        />
      ) : (
        <button>Log In To Comment!</button>
      )}
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
