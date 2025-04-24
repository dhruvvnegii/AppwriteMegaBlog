import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config"; // Ensure you're using the correct service for data fetching
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserData } from "../store/authSlice";

function Home() {
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userData = useSelector(selectUserData);

  useEffect(() => {
    if (isLoggedIn && userData) {
        // Get user images (already filtered in the service)
        appwriteService.getImages("68027cfb000469109c00").then((userImages) => {
          if (userImages) {
            setImages(userImages);
          }
        });
    
        // Get all posts
        appwriteService.getPosts().then((postsData) => {
          if (postsData) {
            setPosts(postsData.documents);
          }
        });
      }
  }, [isLoggedIn, userData]);

  if (!isLoggedIn) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex items-center justify-center h-[calc(100vh-200px)]">
            <h1 className="text-2xl font-bold hover:text-gray-500">
              Login to read posts
            </h1>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        {/* Display posts */}
        <div className="flex flex-wrap mb-8">
          {posts.length === 0 ? (
            <div className="w-full text-center">
              <p className="text-lg font-semibold">No posts available.</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))
          )}
        </div>

        {/* Display images */}
        <div className="flex flex-wrap">
          {images.length === 0 ? (
            <div className="w-full text-center">
              <p className="text-lg font-semibold"></p>
            </div>
          ) : (
            images.map((img) => {
              const fileUrl = appwriteService.getFileView("68027cfb000469109c00", img.$id);
              console.log("Generated File URL: ", fileUrl); // Log the URL

              return (
                <div key={img.$id} className="p-2 w-1/4">
                  <img
                    src={fileUrl || "https://via.placeholder.com/150"} // Fallback image if URL is empty
                    alt="User upload"
                    className="w-full h-auto rounded shadow"
                  />
                </div>
              );
            })
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;
