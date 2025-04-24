import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredimg }) {
 
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {featuredimg ? (
            <img
              src={String(appwriteService.getFileView(featuredimg))}
              alt={title}
              className="rounded-xl"
            />
          ) : (
            <div className="w-full h-48 bg-gray-300 rounded-xl flex items-center justify-center text-gray-500">
              No image
            </div>
          )}
        </div>

        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
