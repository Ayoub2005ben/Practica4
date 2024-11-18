window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
  
    try {
      const response = await fetch(`https://news-foniuhqsba-uc.a.run.app/article/${articleId}`);
      if (!response.ok) {
        throw new Error('Error al obtener el artículo');
      }
      const article = await response.json();
      renderArticle(article);
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('article-detail').innerHTML = '<p>Error al cargar el artículo.</p>';
    }
  };
  
  function renderArticle(article) {
    const articleDetail = document.getElementById('article-detail');
    articleDetail.innerHTML = `
      <h3>${article.headline}</h3>
      <p><strong>Autor:</strong> ${article.author}</p>
      <p><strong>Publicado el:</strong> ${article.date}</p>
      <div>${article.body}</div>
    `;
  }
  