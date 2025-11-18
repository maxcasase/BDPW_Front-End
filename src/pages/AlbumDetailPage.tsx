import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaStar, FaEdit, FaPlay, FaClock, FaTrash } from 'react-icons/fa';
import { getReviewsByAlbum, deleteReview } from '../api/reviewsApi';

const AlbumDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingAlbum, setLoadingAlbum] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchingDiscogs, setSearchingDiscogs] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoadingAlbum(true);
    setError(null);
    fetch(`https://bd-y-pw.onrender.com/albums/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Album not found');
        }
        return response.json();
      })
      .then(data => {
        setAlbum(data);
        setLoadingAlbum(false);
      })
      .catch(async err => {
        setAlbum(null);
        setLoadingAlbum(false);
        if (err.message === 'Album not found') {
          // Search in Discogs
          setSearchingDiscogs(true);
          const title = window.prompt('Álbum no encontrado localmente. Indica el nombre del álbum para buscar en Discogs:', '');
          const artist = window.prompt('Indica el nombre del artista para buscar en Discogs:', '');
          if (!title || !artist) {
            setError('Debe ingresar título y artista para buscar');
            setSearchingDiscogs(false);
            return;
          }
          try {
            const discogsRes = await fetch(`https://bd-y-pw.onrender.com/discogs/search?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`);
            const discogsData = await discogsRes.json();
            if (discogsData.success && discogsData.results.length > 0) {
              setSearchResults(discogsData.results);
            } else {
              setError('No se encontraron resultados en Discogs');
            }
          } catch (searchErr) {
            setError('Error buscando en Discogs');
          }
          setSearchingDiscogs(false);
        } else {
          setError('Error cargando el álbum');
        }
      });
  }, [id]);

  useEffect(() => {
    const loadReviews = async () => {
      if (!id) return;
      setLoadingReviews(true);
      try {
        const response = await getReviewsByAlbum(parseInt(id));
        setReviews(response.reviews);
      } catch (e) {
        setReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    };
    loadReviews();
  }, [id]);

  const handleSaveDiscogsAlbum = async (album) => {
    try {
      const postBody = {
        title: album.title,
        artist: album.artist,
        year: album.year || null,
        cover_image: album.cover_image || '',
        discogs_release_id: album.id
      };
      const saveRes = await fetch(`https://bd-y-pw.onrender.com/discogs/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postBody)
      });
      const saveData = await saveRes.json();
      if (saveData.success) {
        navigate(`/album/${saveData.albumId}`);
      } else {
        setError(saveData.message || 'Error guardando álbum');
      }
    } catch {
      setError('Error guardando álbum en el servidor');
    }
  };

  if (loadingAlbum) return <p>Cargando álbum...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  if (searchingDiscogs) return <p>Buscando álbumes en Discogs...</p>;

  if (!album && searchResults.length > 0) {
    return (
      <div>
        <h3>Resultados de búsqueda en Discogs</h3>
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>
              {result.title} - {result.artist} ({result.year || 'N/A'})
              <button onClick={() => handleSaveDiscogsAlbum(result)}>Guardar álbum</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!album) return <p>Álbum no encontrado y sin resultados de Discogs</p>;

  return (
    <div>
      <h1>{album.title}</h1>
      <h2>{album.artist}</h2>
      {/* Aquí renderizas el contenido del álbum y reseñas como antes */}
    </div>
  );
};

export default AlbumDetailPage;
