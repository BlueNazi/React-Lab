import React, { forwardRef } from "react";
import SelectBox from "./SelectBox";

const AddComment = forwardRef(function AddComment({ name, cancelReply,setName }, ref) {
  return (
    <div className="ac-wrapper" ref={ref}>
      {name ? (
        <h2 className="addCommentTitle">
          Write your comment in response to {name}
        </h2>
      ) : (
        <h2 className="addCommentTitle">Write your comment:</h2>
      )}

      <form action="" className="form">
        <input placeholder="name" type="text" />
        <input placeholder="email" type="text" />
        {!name && <SelectBox />} {}
      <textarea
        placeholder="message..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        ref={ref}
        cols="30"
        rows="10"
      ></textarea>
        <button>Send</button>
        <button type="button" onClick={cancelReply}>Cancel</button> {}
      </form>
    </div>
  );
});

export default AddComment;
