import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });

  const [fetchCommentsById, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchCommentsById(params.id);
  }, []);

  console.log(comments);
  return (
    <div>
      <h1>Open post page with id = {params.id}</h1>
      {isLoading
      ? <Loader/>
      : <div>{post.id}. {post.title}</div>
      }
      {isComLoading
      ? <Loader/>
      : <div>
          {comments.map(com => 
            <div key={com.id} style={{marginTop: 15}}>
              <h5>{com.email}</h5>
              <div>{com.body}</div>
            </div>
          )}
        </div>
      }
    </div>
  )
}

export default PostIdPage
