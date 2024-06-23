document.getElementById('applyButton').addEventListener('click', () => {
  const title = document.getElementById('titleInput').value.trim();
  const description = document.getElementById('descriptionInput').value.trim();
  const keywords = document.getElementById('keywordsInput').value.trim();
  const ogTitle = document.getElementById('ogTitleInput').value.trim();
  const ogDescription = document.getElementById('ogDescriptionInput').value.trim();
  const ogImage = document.getElementById('ogImageInput').value.trim();
  const faviconUrl = document.getElementById('faviconUrl').value.trim();
  const twitterCardEnabled = document.getElementById('enableTwitter').checked;
  const twitterCard = twitterCardEnabled ? document.getElementById('twitterCardInput').value : '';
  const twitterSiteEnabled = document.getElementById('enableTwitterSite').checked;
  const twitterSite = twitterSiteEnabled ? document.getElementById('twitterSiteInput').value.trim() : '';
  const robots = document.getElementById('robotsInput').value.trim();
  const author = document.getElementById('authorInput').value.trim();
  const viewport = document.getElementById('viewportInput').value.trim();
  const charset = document.getElementById('charsetInput').value.trim();

  const sections = document.querySelectorAll('.section');
  let allComplete = true;

  sections.forEach(section => {
    const input = section.querySelector('input, textarea, select');
    if (input && input.value && section.querySelector('.enableSection')?.checked !== false) {
      section.classList.add('complete');
      section.classList.remove('incomplete');
    } else if (!input || section.querySelector('.enableSection')?.checked === false) {
      section.classList.remove('complete', 'incomplete');
    } else {
      section.classList.add('incomplete');
      section.classList.remove('complete');
      allComplete = false;
    }
  });

  if (faviconUrl && allComplete) {
    updateMetaTags(faviconUrl, title, description, keywords, ogTitle, ogDescription, ogImage, twitterCard, twitterSite, robots, author, viewport, charset);
    showCodeContainer(faviconUrl, title, description, keywords, ogTitle, ogDescription, ogImage, twitterCard, twitterSite, robots, author, viewport, charset);
    document.getElementById('faviconUrl').classList.remove('shake');
    showSuccessMessage();
  } else {
    document.getElementById('faviconUrl').classList.add('shake');
    setTimeout(() => {
      document.getElementById('faviconUrl').classList.remove('shake');
    }, 500);

    const incompleteSection = document.querySelector('.incomplete');
    if (incompleteSection) {
      incompleteSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

document.getElementById('generateMetaButton').addEventListener('click', () => {
  const siteName = document.getElementById('siteNameInput').value.trim();
  const siteDescription = document.getElementById('siteDescriptionInput').value.trim();
  const siteKeywords = document.getElementById('siteKeywordsInput').value.trim();
  const siteImageUrl = document.getElementById('siteImageUrlInput').value.trim();
  const siteFaviconUrl = document.getElementById('siteFaviconUrlInput').value.trim();

  document.getElementById('titleInput').value = siteName;
  document.getElementById('descriptionInput').value = siteDescription;
  document.getElementById('keywordsInput').value = siteKeywords;
  document.getElementById('ogTitleInput').value = siteName;
  document.getElementById('ogDescriptionInput').value = siteDescription;
  document.getElementById('ogImageInput').value = siteImageUrl;
  document.getElementById('faviconUrl').value = siteFaviconUrl;

  document.getElementById('applyButton').click();
});

document.querySelectorAll('.toggleButton').forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    button.classList.toggle('active');
    content.classList.toggle('visible');

    if (content.classList.contains('visible')) {
      content.style.transition = 'none';
      content.style.maxHeight = 'none';
      const height = content.scrollHeight + 'px';
      content.style.maxHeight = '0px';
      requestAnimationFrame(() => {
        content.style.transition = 'max-height 0.3s ease';
        content.style.maxHeight = height;
      });
    } else {
      content.style.maxHeight = '0px';
    }
  });
});

function updateMetaTags(faviconUrl, title, description, keywords, ogTitle, ogDescription, ogImage, twitterCard, twitterSite, robots, author, viewport, charset) {
  const head = document.head;

  let favicon = document.querySelector('link[rel="icon"]');
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    head.appendChild(favicon);
  }
  favicon.href = faviconUrl;

  document.title = title;

  updateOrCreateMetaTag(head, 'name', 'description', description);
  updateOrCreateMetaTag(head, 'name', 'keywords', keywords);
  updateOrCreateMetaTag(head, 'property', 'og:title', ogTitle);
  updateOrCreateMetaTag(head, 'property', 'og:description', ogDescription);
  updateOrCreateMetaTag(head, 'property', 'og:image', ogImage);
  if (twitterCard) updateOrCreateMetaTag(head, 'name', 'twitter:card', twitterCard);
  if (twitterSite) updateOrCreateMetaTag(head, 'name', 'twitter:site', twitterSite);
  if (robots) updateOrCreateMetaTag(head, 'name', 'robots', robots);
  if (author) updateOrCreateMetaTag(head, 'name', 'author', author);
  if (viewport) updateOrCreateMetaTag(head, 'name', 'viewport', viewport);
  if (charset) {
    let charsetTag = document.querySelector('meta[charset]');
    if (!charsetTag) {
      charsetTag = document.createElement('meta');
      charsetTag.setAttribute('charset', charset);
      head.appendChild(charsetTag);
    }
    charsetTag.setAttribute('charset', charset);
  }
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

function showCodeContainer(faviconUrl, title, description, keywords, ogTitle, ogDescription, ogImage, twitterCard, twitterSite, robots, author, viewport, charset) {
  const codeContainer = document.getElementById('codeContainer');
  const codeToCopy = document.getElementById('codeToCopy');

  let code = `
      <link rel="icon" href="${faviconUrl}">
      <title>${title}</title>
      <meta name="description" content="${description}">
      <meta name="keywords" content="${keywords}">
      <meta property="og:title" content="${ogTitle}">
      <meta property="og:description" content="${ogDescription}">
      <meta property="og:image" content="${ogImage}">
  `;

  if (twitterCard) {
    code += `
      <meta name="twitter:card" content="${twitterCard}">
    `;
  }

  if (twitterSite) {
    code += `
      <meta name="twitter:site" content="${twitterSite}">
    `;
  }

  if (robots) {
    code += `
      <meta name="robots" content="${robots}">
    `;
  }

  if (author) {
    code += `
      <meta name="author" content="${author}">
    `;
  }

  if (viewport) {
    code += `
      <meta name="viewport" content="${viewport}">
    `;
  }

  if (charset) {
    code += `
      <meta charset="${charset}">
    `;
  }

  codeToCopy.value = code.trim();
  codeContainer.classList.remove('hidden');
  codeContainer.scrollIntoView({ behavior: 'smooth' });
}

function showSuccessMessage() {
  const successMessage = document.getElementById('successMessage');
  successMessage.classList.remove('hidden');
  successMessage.scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    successMessage.classList.add('hidden');
  }, 5000);
}

document.getElementById('copyButton').addEventListener('click', () => {
  const codeToCopy = document.getElementById('codeToCopy');
  codeToCopy.select();
  document.execCommand('copy');
  toastr.info('Code copied to clipboard!', 'Info');
  // toastr.info('This is an informational message.', 'Info');
});


// Configuración opcional
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};