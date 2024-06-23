document.getElementById('applyButton').addEventListener('click', () => {
  const title = document.getElementById('titleInput').value;
  const description = document.getElementById('descriptionInput').value;
  const keywords = document.getElementById('keywordsInput').value;
  const ogTitle = document.getElementById('ogTitleInput').value;
  const ogDescription = document.getElementById('ogDescriptionInput').value;
  const ogImage = document.getElementById('ogImageInput').value;
  const faviconUrl = document.getElementById('faviconUrl').value;
  const twitterCardEnabled = document.getElementById('enableTwitter').checked;
  const twitterCard = twitterCardEnabled ? document.getElementById('twitterCardInput').value : '';
  const twitterSiteEnabled = document.getElementById('enableTwitterSite').checked;
  const twitterSite = twitterSiteEnabled ? document.getElementById('twitterSiteInput').value : '';

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
    updateMetaTags(faviconUrl, title, description, keywords, ogTitle, ogDescription, ogImage, twitterCard, twitterSite);
    showCodeContainer(faviconUrl, title, description, keywords, ogTitle, ogDescription, ogImage, twitterCard, twitterSite);
    document.getElementById('faviconUrl').classList.remove('shake');
    showSuccessMessage();
  } else {
    document.getElementById('faviconUrl').classList.add('shake');
    setTimeout(() => {
      document.getElementById('faviconUrl').classList.remove('shake');
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

function updateMetaTags(faviconUrl, title, description, keywords, ogTitle, ogDescription, ogImage, twitterCard, twitterSite) {
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

function showCodeContainer(faviconUrl, title, description, keywords, ogTitle, ogDescription, ogImage, twitterCard, twitterSite) {
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
  alert('Code copied to clipboard!');
});
