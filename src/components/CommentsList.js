import "../App.css";
const CommentsList = ({comments}) => {
  return (
    <>
      <h3>Comments:</h3>
      {comments.map((comment, key) => (
        <div className="comment" key={key}>
          <h4>{comment.postedBy}</h4>
          <p>{comment.text}</p>
        </div>
      ))}
    </>
  );
};

export default CommentsList;
