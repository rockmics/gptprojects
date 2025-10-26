
(async function(){
  const params = new URLSearchParams(location.search);
  const variant = params.get('variant') || 'parallax';
  const res = await fetch('data/content.json');
  const data = await res.json();
  const root = document.getElementById('app');
  document.documentElement.style.setProperty('--accent', data.site.accent || '#4338CA');

  root.innerHTML = `
  <header class="header" role="banner">
    <div class="wrap">
      <a class="brand" href="#top" aria-label="Home">${data.site.owner}</a>
      <nav aria-label="Primary">
        <a href="?variant=parallax">Parallax</a>
        <a href="?variant=multi">Multi‑section</a>
        <a href="#projects">Projects</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a class="resume" href="${data.site.resume_url}" aria-label="Download PDF Resume">Resume</a>
      </nav>
    </div>
  </header>
  <main id="top"></main>
  <footer class="footer">© ${data.site.year} ${data.site.owner}</footer>`;

  const main = document.querySelector('main');

  if(variant==='parallax'){
    main.insertAdjacentHTML('beforeend', `
      <section class="hero" aria-label="Hero">
        <div class="bg" id="bg"></div>
        <div class="content reveal" style="text-align:center;max-width:900px;padding:0 20px">
          <h1>${data.site.tagline}</h1>
          <p>${data.about}</p>
          <div class="cta">
            <a class="button" href="#projects">View Projects</a>
            <a class="button sec" href="#about">About</a>
          </div>
        </div>
      </section>`);
  } else {
    main.insertAdjacentHTML('beforeend', `
      <section class="hero split" aria-labelledby="title">
        <div class="blob one" id="b1" aria-hidden="true"></div>
        <div class="blob two" id="b2" aria-hidden="true"></div>
        <div class="copy reveal" style="transition-delay:.05s">
          <span class="badge">${data.site.role}</span>
          <h1 id="title">${data.site.tagline}</h1>
          <p class="lead">${data.about}</p>
          <div class="cta">
            <a class="button" href="#projects">View Work</a>
            <a class="button sec" href="#about">About</a>
          </div>
        </div>
        <div class="feature reveal" style="transition-delay:.15s">
          <div class="card" style="height:100%">
            <img src="${data.projects[0]?.thumb || ''}" alt="${data.projects[0]?.title || 'Featured project'}">
            <div class="content">
              <strong>Featured: ${data.projects[0]?.title || ''}</strong>
              <div class="meta">${data.projects[0]?.subtitle || ''}</div>
              <div class="tags"><span class="tag">Mobile</span><span class="tag">Animation</span><span class="tag">Design System</span></div>
            </div>
          </div>
        </div>
      </section>`);
  }

  const cards = data.projects.map((p,i)=>`
    <article class="card rodelay" style="transition-delay:${(i*0.15+0.05).toFixed(2)}s">
      <img src="${p.thumb}" alt="${p.title}">
      <div class="content">
        <h3>${p.title}</h3>
        <p class="meta">${p.subtitle} · ${p.impact}</p>
        <button class="link" data-modal="${p.slug}" aria-haspopup="dialog">View details</button>
      </div>
    </article>`).join('');

  main.insertAdjacentHTML('beforeend', `
    <section id="projects" aria-labelledby="projh">
      <div class="wrap">
        <h2 id="projh" class="reveal" style="transition-delay:.05s">Projects</h2>
        <div class="grid">${cards}</div>
      </div>
    </section>`);

  main.insertAdjacentHTML('beforeend', `
    <section class="split" id="about" aria-labelledby="abouth">
      <div class="wrap">
        <div class="col">
          <h2 id="abouth" class="reveal" style="transition-delay:.05s">About</h2>
          <p class="reveal" style="transition-delay:.15s">${data.about}</p>
          <p class="reveal" style="transition-delay:.25s"><a href="${data.site.resume_url}" class="button">Download PDF Resume</a></p>
        </div>
        <div class="col imgcol">
          <img id="aboutimg" src="${data.projects[0]?.thumb || ''}" alt="Project collage preview" loading="lazy">
        </div>
      </div>
    </section>`);

  main.insertAdjacentHTML('beforeend', `
    <section id="contact" aria-labelledby="contacth">
      <div class="wrap">
        <h2 id="contacth" class="reveal" style="transition-delay:.05s">Contact</h2>
        <p class="reveal" style="transition-delay:.15s">Let’s talk about your next project or role.</p>
        <p class="reveal" style="transition-delay:.25s"><a href="mailto:${data.site.email}">${data.site.email}</a> · <a href="${data.site.linkedin}">LinkedIn</a></p>
      </div>
    </section>`);

  const modalMarkup = data.projects.map(p=>`
    <dialog class="dialog" id="${p.slug}" aria-modal="true">
      <div class="modal" role="document" aria-labelledby="${p.slug}-title">
        <header><h3 id="${p.slug}-title">${p.title} — Case Study</h3><button class="close" aria-label="Close" data-close>✕</button></header>
        <div class="body">
          <img src="${p.images[0] || p.thumb}" alt="${p.title} image">
          <div>
            <p><strong>Problem:</strong> ${p.case_study.problem}</p>
            <p><strong>Approach:</strong> ${p.case_study.approach}</p>
            <p><strong>Impact:</strong> ${p.case_study.impact}</p>
          </div>
        </div>
      </div>
    </dialog>`).join('');
  document.body.insertAdjacentHTML('beforeend', modalMarkup);

  window._variant = variant;
  window.dispatchEvent(new Event('content-ready'));
})();
