import React, { useState, useRef, useEffect } from "react";
import { marked } from "marked";
import "../blog/Blog.css";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState("me");
  const textareaRef = useRef(null);

  const userId = auth.userId;
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchPosts = async () => {
      const userId = auth.userId;
      const today = new Date().toISOString().split("T")[0];

      const blogRef = collection(db, `users/${userId}/days/${today}/blog`);
      const snapshot = await getDocs(blogRef);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handlePost = async () => {
    if (!input.trim()) return;

    // Uncomment this when you have user authentication set up
    /* const userId = auth.currentUser?.uid;
    if (!userId) {
      alert("You must be signed in to post.");
      return;
    } */

    //const userId = auth.currentUser?.uid; // however you store this
    const today = new Date().toISOString().split("T")[0]; // e.g., 2025-07-26
    const blogRef = collection(db, `users/${userId}/days/${today}/blog`);

    await addDoc(blogRef, {
      title: title.trim(),
      content: input.trim(),
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp(),
      visibility,
      tags: [],
    });

    setPosts([...posts, { id: Date.now(), content: input.trim() }]); // for local UI
    setInput("");
  };

  return (
    <div className="blog-container">
      {/* <h1 className="blog-title">Blog</h1> */}
      <p className="blog-date">{today}</p>

      <input
        type="text"
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="blog-title-input"
      />

      <select
        value={visibility}
        onChange={(e) => setVisibility(e.target.value)}
        className="blog-visibility-select"
      >
        <option value="me">Visible to Me</option>
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="blog-textarea"
        rows="4"
        placeholder="What did today teach you? What are you still wrestling with?"
      />

      <button onClick={handlePost} className="blog-button">
        Post
      </button>

      <div className="blog-posts">
        {posts.map((post) => (
          <div
            key={post.id}
            className="blog-post"
            dangerouslySetInnerHTML={{ __html: marked(post.content) }}
          />
        ))}
      </div>
    </div>
  );
}
