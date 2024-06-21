document.getElementById('applyButton').addEventListener('click', () => {
  const emoji = document.getElementById('emojiSelect').value;
  const title = document.getElementById('titleInput').value;
  const description = document.getElementById('descriptionInput').value;
  const keywords = document.getElementById('keywordsInput').value;
  const ogTitle = document.getElementById('ogTitleInput').value;
  const ogDescription = document.getElementById('ogDescriptionInput').value;
  const ogImage = document.getElementById('ogImageInput').value;
  const selectElement = document.getElementById('emojiSelect');

  const sections = document.querySelectorAll('.section');
  let allComplete = true;

  sections.forEach(section => {
    const input = section.querySelector('input, textarea');
    if (input.value) {
      section.classList.add('complete');
      section.classList.remove('incomplete');
    } else {
      section.classList.add('incomplete');
      section.classList.remove('complete');
      allComplete = false;
    }
  });

  if (emoji && allComplete) {
    updateMetaTags(emoji, title, description, keywords, ogTitle, ogDescription, ogImage);
    showCodeContainer(emoji, title, description, keywords, ogTitle, ogDescription, ogImage);
    selectElement.classList.remove('shake');
  } else {
    selectElement.classList.add('shake');
    setTimeout(() => {
      selectElement.classList.remove('shake');
    }, 500);

    document.querySelector('.incomplete').scrollIntoView({ behavior: 'smooth' });
  }
});

document.querySelectorAll('.toggleButton').forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    button.classList.toggle('active');
    content.classList.toggle('visible');
    if (content.classList.contains('visible')) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = "0px";
    }
  });
});

function updateMetaTags(emoji, title, description, keywords, ogTitle, ogDescription, ogImage) {
  const head = document.head;

  // Create and update favicon
  let favicon = document.querySelector('link[rel="icon"]');
  if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      head.appendChild(favicon);
  }
  favicon.href = `data:image/png;base64,${convertEmojiToBase64(emoji)}`;

  // Update title
  document.title = title;

  // Update meta tags
  updateOrCreateMetaTag(head, 'name', 'description', description);
  updateOrCreateMetaTag(head, 'name', 'keywords', keywords);
  updateOrCreateMetaTag(head, 'property', 'og:title', ogTitle);
  updateOrCreateMetaTag(head, 'property', 'og:description', ogDescription);
  updateOrCreateMetaTag(head, 'property', 'og:image', ogImage);
}

function updateOrCreateMetaTag(head, attribute, attributeName, content) {
  let metaTag = document.querySelector(`meta[${attribute}="${attributeName}"]`);
  if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute(attribute, attributeName);
      head.appendChild(metaTag);
  }
  metaTag.content = content;
}

function convertEmojiToBase64(emoji) {
  // Esta función convierte un emoji a una imagen base64. Para simplificar,
  // usaremos una cadena base64 de ejemplo. En un caso real, deberías
  // generar o buscar la representación base64 adecuada del emoji.
  const placeholderBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAACoWJZaAAAAD0lEQVR42mJ89evXfwYAAwAB+gTkMLYAAAAASUVORK5CYII=';
  return placeholderBase64;
}

function showCodeContainer(emoji, title, description, keywords, ogTitle, ogDescription, ogImage) {
  const codeContainer = document.getElementById('codeContainer');
  const codeToCopy = document.getElementById('codeToCopy');
  const base64Image = convertEmojiToBase64(emoji);

  const code = `
      <link rel="icon" href="data:image/png;base64,${base64Image}">
      <title>${title}</title>
      <meta name="description" content="${description}">
      <meta name="keywords" content="${keywords}">
      <meta property="og:title" content="${ogTitle}">
      <meta property="og:description" content="${ogDescription}">
      <meta property="og:image" content="${ogImage}">
  `;

  codeToCopy.value = code.trim();
  codeContainer.classList.remove('hidden');
  codeContainer.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('copyButton').addEventListener('click', () => {
  const codeToCopy = document.getElementById('codeToCopy');
  codeToCopy.select();
  document.execCommand('copy');
  alert('Code copied to clipboard!');
});
