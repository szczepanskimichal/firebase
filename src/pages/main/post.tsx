// src/pages/main/Post.tsx
import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Post as IPost } from "./Main";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";

interface Props {
  post: IPost;
}

interface Like {
  likedId: string;
  userId: string;
}

interface CreateFormData {
  userId: string;
  postId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[]>([]);
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likedId: doc.id }))
    );
  };

  const addLike = async (data: CreateFormData) => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likedId: newDoc.id }]
            : [{ userId: user.uid, likedId: newDoc.id }]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("userId", "==", user?.uid),
        where("postId", "==", post.id)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likedId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likedId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes((prev) => prev.filter((like) => like.likedId !== likedId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="description">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <p>@{post.username}</p>
        <button
          onClick={
            user
              ? hasUserLiked
                ? removeLike
                : () => addLike({ userId: user.uid, postId: post.id })
              : () => {}
          }
        >
          {hasUserLiked ? <>👍</> : <>👎</>}
        </button>
        {likes && <p> Likes: {likes?.length}</p>}
      </div>
    </div>
  );
};
