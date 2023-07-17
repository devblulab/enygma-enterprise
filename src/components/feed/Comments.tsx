import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { FaComment, FaThumbsUp, FaShare } from 'react-icons/fa';

interface CommentsProps {
  postId: string;
  timestamp: Date | string;
  comments: string[];
  likes: number;
  shares: number;
  onDelete: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
  onLike: (postId: string) => void;
}

const Comments: React.FC<CommentsProps> = ({
  postId,
  timestamp,
  comments,
  likes,
  shares,
  onDelete,
  onComment,
  onLike,
}) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');

  const handleCommentSubmit = () => {
    if (comment.trim() === '') {
      return;
    }

    onComment(postId, comment);
    setComment('');
    setShowCommentBox(false);
  };

  const handleLike = () => {
    onLike(postId);
  };

  const handleDelete = () => {
    onDelete(postId);
  };

  return (
    <Box>
      <Typography variant="body2" color="textSecondary">
        Timestamp: {timestamp instanceof Date ? timestamp.toLocaleString() : new Date(timestamp).toLocaleString()}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Likes: {likes}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Shares: {shares}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDelete}
        style={{ marginBottom: '10px' }}
      >
        Deletar Post
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowCommentBox(true)}
        style={{ marginBottom: '10px' }}
        startIcon={<FaComment />}
      >
        Comentar ({comments.length})
      </Button>
      <Button
        variant="contained"
        onClick={handleLike}
        style={{ marginBottom: '10px', marginRight: '10px' }}
        startIcon={<FaThumbsUp />}
      >
        Curtir ({likes})
      </Button>
      <Button
        variant="contained"
        onClick={() => console.log('Share post')} // Implement your share post logic here
        style={{ marginBottom: '10px' }}
        startIcon={<FaShare />}
      >
        Compartilhar ({shares})
      </Button>

      {showCommentBox && (
        <Box display="flex" alignItems="center" marginBottom="10px">
          <TextField
            label="Comentário"
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCommentSubmit}
            style={{ marginLeft: '10px' }}
          >
            Enviar
          </Button>
        </Box>
      )}

      <div>
        {comments.map((comment, index) => (
          <Typography key={index} variant="body2">
            {comment}
          </Typography>
        ))}
      </div>
    </Box>
  );
};

export default Comments;
