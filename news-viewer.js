class NewsViewer extends HTMLElement {
  constructor() {
    super();
    this.apiBaseUrl = 'https://news-foniuhqsba-uc.a.run.app'; // URL base para la API
    this.selectedSection = 'WorldNews'; // Sección predeterminada
  }

  connectedCallback() {
    this.loadArticles(this.selectedSection);  // Cargar noticias de la sección predeterminada
    this.addEventListeners();  // Añadir los event listeners para el menú
  }

  // Método para agregar los eventos de clic en el menú
  addEventListeners() {
    const menuLinks = document.querySelectorAll('nav ul li a');
    menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();  // Evitar el comportamiento predeterminado
        this.selectedSection = e.target.getAttribute('data-section');  // Obtener la sección seleccionada
        this.loadArticles(this.selectedSection);  // Cargar artículos de la nueva sección
      });
    });
  }

  // Método para cargar las noticias de la sección seleccionada
  async loadArticles(section) {
    try {
      let url = `${this.apiBaseUrl}/`;  // URL base

      // Si la sección no es "Mundo", agregamos el nombre de la sección a la URL
      if (section !== 'WorldNews') {
        url += section;
      }

      const response = await fetch(url);  // Hacer la solicitud a la API
      if (!response.ok) {
        throw new Error('Error al obtener los artículos');
      }
      const articles = await response.json();  // Parsear la respuesta como JSON
      this.renderArticles(articles);  // Renderizar los artículos
    } catch (error) {
      console.error('Error:', error);
      this.innerHTML = `<p>Error al cargar los artículos. Inténtelo nuevamente más tarde.</p>`;
    }
  }

  // Método para renderizar las noticias
  renderArticles(articles) {
    const template = document.getElementById('article-template');
    this.innerHTML = '';  // Limpiar contenido previo

    // Verificar si hay noticias
    if (articles.length === 0) {
      this.innerHTML = `<p>No hay noticias en esta sección.</p>`;
      return;
    }

    articles.forEach(article => {
      const articleContent = document.importNode(template.content, true);
      
      // Rellenar los datos del artículo
      articleContent.querySelector('.title').textContent = article.headline;
      articleContent.querySelector('.author').textContent = article.author;
      articleContent.querySelector('.description').textContent = article.body.substring(0, 100) + '...';
      
      // Añadir el artículo al componente
      const readMoreLink = articleContent.querySelector('.read-more');
      readMoreLink.href = `article.html?id=${article.id}`;  // Enlace para leer más
      this.appendChild(articleContent);
    });
  }
}

// Definir el componente personalizado
customElements.define('news-viewer', NewsViewer);
