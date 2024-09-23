import { FC, useEffect, useState } from 'react';
import styles from './CommentsModal.module.css';
import { User, useUserStore } from '../../stores/user.store';
import { requester } from '../../shared/helpers/requester';
import { toast } from 'react-toastify';

interface CommentsModalProps {
  productId: number;
}

interface Comment {
  id: number;
  content: string;
  userId: number;
  productId: number;
  user: User;
}

const CommentCard: FC<{ comment: Comment }> = ({ comment }) => (
  <div className={styles.comment}>
    <p>
      {comment.user.login}: {comment.content}
    </p>
  </div>
);

const CommentsModal = ({ productId }: CommentsModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState('');
  const { user } = useUserStore();

  const createCommentHandler = async () => {
    if (!user) {
      toast.error('Войдите или зарегистрируйтесь');
      return;
    }
    const newComment = await requester.post<Comment>(`products/${productId}/comments`, {
      userId: user?.id,
      content: comment,
    });
    console.log(newComment.data);

    setComments((prev) => [...prev, { ...newComment.data, user }]);
  };

  useEffect(() => {
    const fetchComments = async () => {
      const comments = (await requester.get<Comment[]>(`products/${productId}/comments`)).data;
      setComments(comments);
    };

    fetchComments();
  }, []);

  return (
    <>
      <button className={styles.button} onClick={() => setIsOpen(true)}>
        Комментарии
      </button>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.wrapper}>
            <p className={styles.title}>Комментарии</p>
            <div className={styles.create}>
              <input
                type="text"
                placeholder="Комментарий..."
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              <button onClick={createCommentHandler}>Создать</button>
            </div>
            <div className={styles.inner}>
              {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
            <button className={styles.close} onClick={() => setIsOpen(false)}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentsModal;
