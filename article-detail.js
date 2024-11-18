// article-detail.js

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id');
  
    if (articleId) {
      try {
        const response = await fetch(`https://news-foniuhqsba-uc.a.run.app/article/${articleId}`);
        if (!response.ok) {
          throw new Error('No se pudo cargar el artículo');
        }
        const article = await response.json();
        renderArticle(article);
      } catch (error) {
        console.error('Error:', error);
        document.querySelector('.article-container').innerHTML = `<p>No se pudo cargar el artículo. Intenta de nuevo más tarde.</p>`;
      }
    } else {
      document.querySelector('.article-container').innerHTML = `<p>Artículo no encontrado.</p>`;
    }
  });
  
  function renderArticle(article) {
    const container = document.querySelector('.article-container');
  
    container.innerHTML = `
      <article class="full-article">
        <h2>${article.headline}</h2>
        <p><strong>Autor:</strong> ${article.author}</p>
        <p><strong>Fecha:</strong> ${new Date(article.date).toLocaleDateString()}</p>
        <div class="article-body">${article.body}</div>
      </article>
    `;
  }
  