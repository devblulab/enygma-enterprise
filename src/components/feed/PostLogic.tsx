import { useEffect, useState, useRef } from 'react';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import { app } from '../../logic/firebase/config/app';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import Colecao from '../../logic/firebase/db/Colecao';
import {
  Box,
  Button,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import { FaComment, FaThumbsUp, FaShare, FaUserCircle } from 'react-icons/fa';
import { GrEmoji } from 'react-icons/gr';
import { BsChat } from 'react-icons/bs';
import { FiShare2 } from 'react-icons/fi';
import { RiArrowRightSLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

import NewPost from './NewPost';
import Usuario from '../../logic/core/usuario/Usuario';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Autenticacao from '../../logic/firebase/auth/Autenticacao';

const db = getFirestore(app);
const postsCollectionRef = collection(db, 'posts');
const storage = getStorage(app);
const autenticacao = new Autenticacao();

const PostLogic: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const curtidasRef = useRef<string[]>([]);
   const [currentUser, setCurrentUser] = useState<Usuario | null>(null);

  useEffect(() => {
    consultarPosts();

    // Obter as curtidas armazenadas no localStorage
    const curtidasStorage = localStorage.getItem('curtidas');
    if (curtidasStorage) {
      curtidasRef.current = JSON.parse(curtidasStorage);
    }

    // Monitorar o estado do usuário autenticado
    const unsubscribe = autenticacao.monitorar((usuario) => {
      
      setCurrentUser(usuario);
    });

    return () => unsubscribe();
  }, []);

  const colecao = new Colecao();

  const consultarPosts = async () => {
    try {
      const posts = await colecao.consultar('posts');
      setPosts(posts);
    } catch (error) {
      console.error('Erro ao consultar os posts:', error);
    }
  };

  const criarPost = async (
    content: string,
    image: File | null,
    video: File | null
  ) => {
    try {
      const newPost = {
        content: content,
        timestamp: new Date(),
        likes: 0,
        shares: 0,
        comments: [],
        imageURL: '',
        videoURL: '',
        userId: currentUser?.id || '',
      };

      const docRef = await addDoc(postsCollectionRef, newPost);

      if (image) {
        const imageRef = ref(storage, `posts/${docRef.id}/${image.name}`);
        await uploadBytes(imageRef, image);
        const imageURL = await getDownloadURL(imageRef);
        newPost.imageURL = imageURL;
      }

      if (video) {
        const videoRef = ref(storage, `posts/${docRef.id}/${video.name}`);
        await uploadBytes(videoRef, video);
        const videoURL = await getDownloadURL(videoRef);
        newPost.videoURL = videoURL;
      }

      await updateDoc(doc(postsCollectionRef, docRef.id), newPost);

      consultarPosts();
    } catch (error) {
      console.error('Erro ao criar o post:', error);
    }
  };

  const deletarPost = async (postId: string) => {
    try {
      await deleteDoc(doc(postsCollectionRef, postId));
      console.log('Post deletado com sucesso!');

      consultarPosts();
    } catch (error) {
      console.error('Erro ao deletar o post:', error);
    }
  };

  const handleComment = async (postId: string, comment: string) => {
    try {
      const postDoc = doc(postsCollectionRef, postId);
      const postSnap = await getDoc(postDoc);
      const post = postSnap.data();

      if (post) {
        const updatedComments = [...post.comments, comment];

        await updateDoc(postDoc, { comments: updatedComments });

        consultarPosts();
      }
    } catch (error) {
      console.error('Erro ao adicionar o comentário:', error);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      if (currentUser && !curtidasRef.current.includes(postId)) {
        const postDoc = doc(postsCollectionRef, postId);
        const postSnap = await getDoc(postDoc);
        const post = postSnap.data();

        if (post) {
          const updatedLikes = post.likes + 1;

          await updateDoc(postDoc, { likes: updatedLikes });

          // Adiciona o ID do post ao array de curtidas
          curtidasRef.current.push(postId);

          // Atualiza o localStorage com as curtidas
          localStorage.setItem(
            'curtidas',
            JSON.stringify(curtidasRef.current)
          );

          consultarPosts();
        }
      }
    } catch (error) {
      console.error('Erro ao adicionar a curtida:', error);
    }
  };

  const handleShare = async (postId: string) => {
    try {
      const postDoc = doc(postsCollectionRef, postId);
      const postSnap = await getDoc(postDoc);
      const post = postSnap.data();

      if (post) {
        const updatedShares = post.shares + 1;

        await updateDoc(postDoc, { shares: updatedShares });

        consultarPosts();
      }
    } catch (error) {
      console.error('Erro ao adicionar o compartilhamento:', error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NewPost onCreatePost={criarPost} />
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
                  background: '#80808080',
                  width: '100%',
                  maxWidth: '500px',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FaUserCircle
                    className="user-icon"
                    style={{ fontSize: '24px', marginRight: '10px' }}
                  />
                  <Typography
                    variant="body2"
                    className="content-text"
                    style={{ flex: 1 }}
                  >
                    Conteúdo: {post.content}
                  </Typography>
                  {post.userId === currentUser?.id && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => deletarPost(post.id)}
                    >
                      Deletar
                    </Button>
                  )}
                </div>

                {post.imageURL && (
                  <Card style={{ marginBottom: '10px' }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        src={post.imageURL}
                        alt="Imagem do post"
                        style={{ height: '150px' }}
                      />
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Título ou descrição da imagem
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                )}
                {post.videoURL && (
                  <Card style={{ marginBottom: '10px' }}>
                    <CardMedia
                      component="video"
                      src={post.videoURL}
                      controls
                      style={{ maxWidth: '300px' }}
                    >
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Seu navegador não suporta o elemento de vídeo.
                      </Typography>
                    </CardMedia>
                  </Card>
                )}

                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Timestamp:{' '}
                    {post.timestamp instanceof Date
                      ? post.timestamp.toLocaleString()
                      : new Date(post.timestamp).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Likes: {post.likes}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Shares: {post.shares}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleComment(post.id, 'Novo comentário')}
                    style={{ marginBottom: '10px' }}
                    startIcon={<BsChat />}
                  >
                    <GrEmoji style={{ marginRight: '5px', fontSize: '18px' }} />
                    Comentar ({post.comments.length})
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleLike(post.id)}
                    style={{ marginBottom: '10px', marginRight: '10px' }}
                    startIcon={<FaThumbsUp />}
                    disabled={curtidasRef.current.includes(post.id)}
                  >
                    <FaUserCircle
                      style={{ marginRight: '5px', fontSize: '18px' }}
                    />
                    Curtir ({post.likes})
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleShare(post.id)}
                    style={{ marginBottom: '10px' }}
                    startIcon={<FiShare2 />}
                  >
                    <RiArrowRightSLine
                      style={{ marginRight: '5px', fontSize: '18px' }}
                    />
                    Compartilhar ({post.shares})
                  </Button>

                  <div>
                    {post.comments.map((comment: string, index: number) => (
                      <Typography key={index} variant="body2">
                        {comment}
                      </Typography>
                    ))}
                  </div>
                </Box>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </Box>
  );
};

export default PostLogic;
