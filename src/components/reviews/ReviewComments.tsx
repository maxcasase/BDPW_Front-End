import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPaperPlane, FaReply, FaEllipsisV, FaEdit, FaTrash, FaTimes, FaCheck } from 'react-icons/fa';
import { useAuthStore } from '../../store/auth.store';

interface Comment {
  id: number;
  contenido: string;
  fecha_creacion: string;
  usuario: {
    username: string;
    avatar_url?: string;
  };
  respuestas?: Comment[];
}

interface ReviewCommentsProps {
  reviewId: number;
  initialComments?: Comment[];
}

const ReviewComments: React.FC<ReviewCommentsProps> = ({ 
  reviewId, 
  initialComments = [] 
}) => {
  const currentUser = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Estados para edición
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  
  // Estados para menú de opciones
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  
  // Estado para modal de confirmación de eliminación
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    
    if (diffMinutes < 1) return 'Ahora';
    if (diffMinutes < 60) return `Hace ${diffMinutes} min`;
    
    const diffHours = Math.ceil(diffMinutes / 60);
    if (diffHours < 24) return `Hace ${diffHours}h`;
    
    const diffDays = Math.ceil(diffHours / 24);
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    setIsSubmitting(true);

    try {
      // TODO: Llamada a la API
      const comment: Comment = {
        id: Date.now(),
        contenido: newComment,
        fecha_creacion: new Date().toISOString(),
        usuario: {
          username: currentUser.username,
          avatar_url: (currentUser as any)?.avatar_url
        }
      };

      setComments([comment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error al publicar comentario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReply = async (commentId: number) => {
    if (!replyText.trim() || !currentUser) return;

    setIsSubmitting(true);

    try {
      // TODO: Llamada a la API
      const reply: Comment = {
        id: Date.now(),
        contenido: replyText,
        fecha_creacion: new Date().toISOString(),
        usuario: {
          username: currentUser.username,
          avatar_url: (currentUser as any)?.avatar_url
        }
      };

      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            respuestas: [...(comment.respuestas || []), reply]
          };
        }
        return comment;
      }));

      setReplyText('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Error al publicar respuesta:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditComment = (commentId: number, currentContent: string) => {
    setEditingComment(commentId);
    setEditText(currentContent);
    setOpenMenu(null);
  };

  const handleSaveEdit = async (commentId: number) => {
    if (!editText.trim()) return;

    setIsSubmitting(true);

    try {
      // TODO: Llamada a la API
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, contenido: editText };
        }
        return comment;
      }));

      setEditingComment(null);
      setEditText('');
    } catch (error) {
      console.error('Error al editar comentario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    setIsSubmitting(true);

    try {
      // TODO: Llamada a la API
      setComments(comments.filter(comment => comment.id !== commentId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCommentOwner = (username: string) => currentUser?.username === username;

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <h4 style={{ 
        color: 'white', 
        marginBottom: '1rem',
        fontSize: '1.1rem'
      }}>
        Comentarios ({comments.length})
      </h4>

      {/* Formulario para nuevo comentario */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmitComment} style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'start'
          }}>
            <img
              src={(currentUser as any)?.avatar_url || 'https://via.placeholder.com/40'}
              alt="Tu avatar"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid #646cff'
              }}
            />
            <div style={{ flex: 1 }}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe un comentario..."
                rows={2}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #333',
                  backgroundColor: '#2a2a2a',
                  color: 'white',
                  fontFamily: 'inherit',
                  fontSize: '0.95rem',
                  resize: 'vertical'
                }}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '0.5rem'
              }}>
                <button
                  type="submit"
                  disabled={!newComment.trim() || isSubmitting}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: newComment.trim() ? '#646cff' : '#333',
                    color: 'white',
                    cursor: newComment.trim() ? 'pointer' : 'not-allowed',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}
                >
                  <FaPaperPlane /> {isSubmitting ? 'Enviando...' : 'Comentar'}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div style={{
          padding: '1rem',
          backgroundColor: '#2a2a2a',
          borderRadius: '8px',
          border: '1px solid #333',
          textAlign: 'center',
          marginBottom: '1.5rem'
        }}>
          <p style={{ color: '#888', margin: 0 }}>
            <Link to="/login" style={{ color: '#646cff', textDecoration: 'none' }}>
              Inicia sesión
            </Link> para comentar
          </p>
        </div>
      )}

      {/* Lista de comentarios */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id}>
              {/* Comentario principal */}
              <div style={{
                padding: '1rem',
                backgroundColor: '#2a2a2a',
                borderRadius: '8px',
                border: '1px solid #333',
                position: 'relative'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '0.75rem',
                  marginBottom: '0.75rem'
                }}>
                  <Link to={`/perfil/${comment.usuario.username}`}>
                    <img
                      src={comment.usuario.avatar_url || 'https://via.placeholder.com/36'}
                      alt={comment.usuario.username}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: '2px solid #646cff'
                      }}
                    />
                  </Link>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <div>
                        <Link
                          to={`/perfil/${comment.usuario.username}`}
                          style={{
                            color: 'white',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            fontSize: '0.95rem'
                          }}
                        >
                          {comment.usuario.username}
                        </Link>
                        <span style={{ 
                          color: '#666', 
                          fontSize: '0.85rem',
                          marginLeft: '0.5rem'
                        }}>
                          {formatDate(comment.fecha_creacion)}
                        </span>
                        {editingComment === comment.id && (
                          <span style={{ color: '#888', fontSize: '0.8rem', marginLeft: '0.5rem', fontStyle: 'italic' }}>
                            (editando)
                          </span>
                        )}
                      </div>
                      {/* Menú de opciones */}
                      {isCommentOwner(comment.usuario.username) && (
                        <div style={{ position: 'relative' }}>
                          <button 
                            onClick={() => setOpenMenu(openMenu === comment.id ? null : comment.id)}
                            style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer', padding: '0.25rem' }}
                          >
                            <FaEllipsisV size={12} />
                          </button>
                          {openMenu === comment.id && (
                            <div style={{ position: 'absolute', right: 0, top: '100%', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '0.5rem', zIndex: 10, minWidth: '150px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                              <button
                                onClick={() => handleEditComment(comment.id, comment.contenido)}
                                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '0.9rem', textAlign: 'left' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a2a2a'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                              >
                                <FaEdit /> Editar
                              </button>
                              <button
                                onClick={() => { setDeleteConfirm(comment.id); setOpenMenu(null); }}
                                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', backgroundColor: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer', borderRadius: '4px', fontSize: '0.9rem', textAlign: 'left' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a2a2a'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                              >
                                <FaTrash /> Eliminar
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Contenido del comentario (editable) */}
                    {editingComment === comment.id ? (
                      <div>
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          rows={3}
                          style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #646cff', backgroundColor: '#1a1a1a', color: 'white', fontFamily: 'inherit', fontSize: '0.95rem', resize: 'vertical', marginBottom: '0.5rem' }}
                        />
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => handleSaveEdit(comment.id)}
                            disabled={!editText.trim() || isSubmitting}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 0.75rem', borderRadius: '6px', border: 'none', backgroundColor: editText.trim() ? '#646cff' : '#333', color: 'white', cursor: editText.trim() ? 'pointer' : 'not-allowed', fontSize: '0.85rem' }}
                          >
                            <FaCheck size={12} /> Guardar
                          </button>
                          <button
                            onClick={() => { setEditingComment(null); setEditText(''); }}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #333', backgroundColor: 'transparent', color: '#888', cursor: 'pointer', fontSize: '0.85rem' }}
                          >
                            <FaTimes size={12} /> Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p style={{ color: '#b0b0b0', margin: 0, lineHeight: 1.5, fontSize: '0.95rem' }}>
                        {comment.contenido}
                      </p>
                    )}

                    {/* Botón de responder */}
                    {isAuthenticated && editingComment !== comment.id && (
                      <button
                        onClick={() => { setReplyingTo(replyingTo === comment.id ? null : comment.id); setReplyText(''); }}
                        style={{ marginTop: '0.5rem', background: 'transparent', border: 'none', color: '#646cff', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: 0 }}
                      >
                        <FaReply /> Responder
                      </button>
                    )}
                  </div>
                </div>

                {/* Modal de confirmación de eliminación */}
                {deleteConfirm === comment.id && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(26, 26, 26, 0.95)', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem', zIndex: 20 }}>
                    <p style={{ color: 'white', marginBottom: '1rem', textAlign: 'center' }}>
                      ¿Estás seguro de eliminar este comentario?
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        disabled={isSubmitting}
                        style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', backgroundColor: '#ff4444', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        {isSubmitting ? 'Eliminando...' : 'Eliminar'}
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #333', backgroundColor: 'transparent', color: 'white', cursor: 'pointer' }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                {/* Formulario de respuesta */}
                {replyingTo === comment.id && (
                  <div style={{ marginTop: '0.75rem', marginLeft: '45px', display: 'flex', gap: '0.5rem' }}>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Responder a ${comment.usuario.username}...`}
                      rows={2}
                      style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#1a1a1a', color: 'white', fontFamily: 'inherit', fontSize: '0.9rem', resize: 'vertical' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <button
                        onClick={() => handleSubmitReply(comment.id)}
                        disabled={!replyText.trim() || isSubmitting}
                        style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', border: 'none', backgroundColor: replyText.trim() ? '#646cff' : '#333', color: 'white', cursor: replyText.trim() ? 'pointer' : 'not-allowed', fontSize: '0.85rem' }}
                      >
                        <FaPaperPlane />
                      </button>
                      <button
                        onClick={() => { setReplyingTo(null); setReplyText(''); }}
                        style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #333', backgroundColor: 'transparent', color: '#888', cursor: 'pointer', fontSize: '0.85rem' }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}

                {/* Respuestas anidadas */}
                {comment.respuestas && comment.respuestas.length > 0 && (
                  <div style={{ marginTop: '1rem', marginLeft: '45px', paddingLeft: '1rem', borderLeft: '2px solid #333' }}>
                    {comment.respuestas.map((reply) => (
                      <div key={reply.id} style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                        <Link to={`/perfil/${reply.usuario.username}`}>
                          <img
                            src={reply.usuario.avatar_url || 'https://via.placeholder.com/28'}
                            alt={reply.usuario.username}
                            style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #646cff' }}
                          />
                        </Link>
                        <div style={{ flex: 1 }}>
                          <div>
                            <Link to={`/perfil/${reply.usuario.username}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' }}>
                              {reply.usuario.username}
                            </Link>
                            <span style={{ color: '#666', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
                              {formatDate(reply.fecha_creacion)}
                            </span>
                          </div>
                          <p style={{ color: '#b0b0b0', margin: 0, marginTop: '0.25rem', fontSize: '0.9rem', lineHeight: 1.4 }}>
                            {reply.contenido}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
            <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewComments;
