import React, { useContext } from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { motion } from 'framer-motion';
import styles from './NewPost.module.css';
import Header from './Header';
import Content from './Content';
import Comments from './Comments';
import './Post.module.css';
import Autenticacao from '../../logic/firebase/auth/Autenticacao';

interface PostProps {
  posts: any[];
  onDeletePost: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
  onLike: (postId: string) => void;
  onShare?: (postId: string) => void; // Adicione a propriedade onShare
}

const Post: React.FC<PostProps> = ({ posts, onDeletePost, onComment, onLike, onShare }) => {
  const autenticacao = new Autenticacao();
  const usuarioLogado = autenticacao.obterUsuarioLogado();

  const handleEditPost = (postId: string) => {
    // Implementar a lógica de edição do post
    console.log(`Editar post ${postId}`);
  };

  return (
    <Box className={styles.container}>
      {posts.length === 0 ? (
        <Typography variant="body1">Nenhum post disponível.</Typography>
      ) : (
        <ul
          style={{
            listStyle: 'none',
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {posts.map((post) => (
            <motion.li
              key={post.id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                width: '100%',
                maxWidth: '500px',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Header content={post.content} />
              <Content imageURL={post.imageURL} videoURL={post.videoURL} />
              <Comments
                postId={post.id}
                timestamp={post.timestamp}
                comments={post.comments}
                likes={post.likes}
                shares={post.shares}
                onDelete={() => onDeletePost(post.id)}
                onComment={onComment}
                onLike={() => onLike(post.id)}
              />
              {usuarioLogado && usuarioLogado.id === post.userId && (
                <div>
                  <Button onClick={() => handleEditPost(post.id)}>Editar</Button>
                  <Button onClick={() => onDeletePost(post.id)}>Deletar</Button>
                </div>
              )}
            </motion.li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default Post;
