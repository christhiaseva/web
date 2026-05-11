// app.jsx — Router shell + Tweaks integration

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "story",
  "fonts": "serif-sans",
  "palette": "terracotta",
  "donate": "solid",
  "density": "regular"
}/*EDITMODE-END*/;

// Hash-based URL routing — only /donate uses URL params; everything else stays state-only.
function parseHash() {
  const h = window.location.hash || '';
  const m = h.match(/^#\/donate(?:\/([^/?]+))?(?:\/([^/?]+))?(?:\?(.*))?$/);
  if (!m) return null;
  const [, fund, id, query] = m;
  const params = { fund, id };
  if (query) {
    for (const pair of query.split('&')) {
      const [k, v] = pair.split('=');
      if (k) params[decodeURIComponent(k)] = decodeURIComponent(v || '');
    }
  }
  return { page: 'donate', params };
}

function buildDonateHash({ fund, id, amount } = {}) {
  let path = '#/donate';
  if (fund) path += '/' + fund;
  if (id)   path += '/' + id;
  if (amount) path += '?amount=' + amount;
  return path;
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useState(() => parseHash() || { page: 'home', params: {} });

  // Listen for hash changes (back/forward, manual URL edit)
  useEffect(() => {
    const onHash = () => {
      const r = parseHash();
      if (r) { setRoute(r); window.scrollTo({ top: 0, behavior: 'instant' }); }
      else if (route.page === 'donate') { setRoute({ page: 'home', params: {} }); }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  // eslint-disable-next-line
  }, []);

  const navigate = (page, params = {}) => {
    if (page === 'donate') {
      const newHash = buildDonateHash(params);
      if (window.location.hash !== newHash) {
        window.history.pushState(null, '', newHash);
      }
      setRoute({ page, params });
    } else {
      // Clear donate hash if leaving
      if (window.location.hash.startsWith('#/donate')) {
        window.history.pushState(null, '', window.location.pathname + window.location.search);
      }
      setRoute({ page, params });
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Apply tweak data attributes to <html>
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-fonts', t.fonts);
    html.setAttribute('data-palette', t.palette);
    html.setAttribute('data-donate', t.donate);
    html.setAttribute('data-density', t.density);
  }, [t.fonts, t.palette, t.donate, t.density]);

  let content;
  if (route.page === 'home') {
    content = <Home navigate={navigate} heroVariant={t.heroVariant} />;
  } else if (route.page === 'education') {
    content = <Education navigate={navigate} />;
  } else if (route.page === 'profile') {
    content = <StudentProfile id={route.params.id} navigate={navigate} />;
  } else if (route.page === 'sponsor') {
    // Backward compat: redirect old sponsor route to /donate
    const p = route.params || {};
    const fund = p.studentId ? 'education' : (p.church ? 'church' : 'general');
    const id = p.studentId || p.church || undefined;
    content = <Donate params={{ fund, id, amount: p.amount }} navigate={navigate} />;
  } else if (route.page === 'donate') {
    content = <Donate params={route.params} navigate={navigate} />;
  } else if (route.page === 'story') {
    content = <Story navigate={navigate} />;
  } else if (route.page === 'stories') {
    content = <Stories navigate={navigate} />;
  } else if (route.page === 'churches') {
    content = <Churches navigate={navigate} />;
  } else {
    content = <ComingSoon page={route.page} navigate={navigate} />;
  }

  return (
    <div>
      <Nav page={route.page} navigate={navigate} />
      {content}
      <Footer navigate={navigate} />

      <TweaksPanel title="Design tweaks">
        <TweakSection label="Hero" />
        <TweakRadio label="Hero layout" value={t.heroVariant}
                    options={[
                      {value:'story', label:'Story'},
                      {value:'photo', label:'Photo'},
                      {value:'collage', label:'Grid'},
                      {value:'verse', label:'Verse'},
                    ]}
                    onChange={(v) => setTweak('heroVariant', v)} />

        <TweakSection label="Color" />
        <TweakColor label="Palette" value={t.palette}
                    options={[
                      {value:'terracotta', label:'terracotta'},
                      {value:'clay',       label:'clay'},
                      {value:'sage',       label:'sage'},
                      {value:'marigold',   label:'marigold'},
                    ]}
                    onChange={(v) => setTweak('palette', typeof v === 'string' ? v : v.value)} />
        <PaletteSwatches value={t.palette} onChange={(v) => setTweak('palette', v)} />

        <TweakSection label="Type" />
        <TweakRadio label="Font pairing" value={t.fonts}
                    options={[
                      {value:'serif-sans',  label:'Serif + Sans'},
                      {value:'newsreader',  label:'Newsreader'},
                      {value:'all-sans',    label:'All Sans'},
                      {value:'all-serif',   label:'All Serif'},
                    ]}
                    onChange={(v) => setTweak('fonts', v)} />

        <TweakSection label="Donate CTA" />
        <TweakRadio label="Style" value={t.donate}
                    options={['solid', 'outline', 'bold']}
                    onChange={(v) => setTweak('donate', v)} />

        <TweakSection label="Density" />
        <TweakRadio label="Spacing" value={t.density}
                    options={['compact', 'regular', 'spacious']}
                    onChange={(v) => setTweak('density', v)} />
      </TweaksPanel>
    </div>
  );
}

// Custom palette swatches with named labels
function PaletteSwatches({ value, onChange }) {
  const palettes = [
    { id:'terracotta', colors:['#B84A2A', '#C28435', '#F7F1E2'] },
    { id:'clay',       colors:['#8E3617', '#B47A3E', '#F2E6D8'] },
    { id:'sage',       colors:['#6E7E47', '#B8884A', '#F1EEDF'] },
    { id:'marigold',   colors:['#C0571B', '#D89B23', '#F9EFD3'] },
  ];
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 8}}>
      {palettes.map(p => {
        const on = value === p.id;
        return (
          <button key={p.id}
                  onClick={() => onChange(p.id)}
                  style={{
                    appearance:'none', border: on ? '1.5px solid rgba(0,0,0,.85)' : '0.5px solid rgba(0,0,0,.12)',
                    borderRadius: 8, padding: 6, cursor:'pointer', display:'flex', flexDirection:'column', gap: 4,
                    background:'rgba(255,255,255,0.4)',
                  }}>
            <div style={{display:'flex', height: 22, borderRadius: 4, overflow:'hidden'}}>
              {p.colors.map(c => <div key={c} style={{flex:1, background:c}}></div>)}
            </div>
            <div style={{fontSize:11, color:'rgba(41,38,27,0.78)', textTransform:'capitalize', textAlign:'left', paddingLeft: 2}}>{p.id}</div>
          </button>
        );
      })}
    </div>
  );
}

function ComingSoon({ page, navigate }) {
  const titles = {
    story:      { eyebrow:'Our Story · since 1980', title:'A small mission, faithfully growing.', sub:'The full Our Story page is coming soon. Below is a preview drawn from the home page.' },
    evangelism: { eyebrow:'Evangelism', title:'Sharing the Gospel, village by village.', sub:'A dedicated Evangelism page is coming next.' },
    financial:  { eyebrow:'Financial Aid', title:'Walking with families through hardship.', sub:'A dedicated Financial Aid page is coming next.' },
  };
  const meta = titles[page] || { eyebrow:'', title: page, sub: 'Coming soon.' };
  return (
    <section style={{padding:'80px 0 120px', minHeight:'60vh'}}>
      <div className="narrow">
        <Eyebrow primary>{meta.eyebrow}</Eyebrow>
        <h1 className="serif" style={{fontSize:'clamp(36px, 4.6vw, 60px)', lineHeight:1.05, marginTop: 22, fontWeight:400, letterSpacing:'-0.015em'}}>
          {meta.title}
        </h1>
        <p style={{fontSize:18, color:'var(--ink-2)', marginTop: 22, lineHeight:1.6}}>{meta.sub}</p>
        <div style={{padding:'32px 0', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)', marginTop: 48, fontFamily:'var(--serif)', fontStyle:'italic', fontSize: 22, color:'var(--ink-2)', textAlign:'center'}}>
          "He has told you, O man, what is good… to do justice, and to love kindness, and to walk humbly with your God."
          <span className="verse-cite" style={{fontStyle:'normal'}}>Micah 6:8</span>
        </div>
        <div style={{display:'flex', gap:14, marginTop: 40, justifyContent:'center'}}>
          <button className="btn btn-primary btn-arrow" onClick={() => navigate('home')}>Back to home</button>
          <button className="btn btn-ghost" onClick={() => navigate('education')}>Sponsor a student</button>
        </div>
      </div>
    </section>
  );
}

// ── Data bootstrap ─────────────────────────────────
// Load JSON content from /data/*.json before mounting React.
// Components read from window.STUDENTS / window.CHURCHES / window.STORIES / window.SITE.
// If a fetch fails (file:// dev, offline, etc.) we fall back to the in-file constants
// each module assigns at the bottom of its file.
async function loadData() {
  const tryLoad = async (url, key) => {
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) return;
      const json = await res.json();
      // Each JSON file has the array under a known key
      if (key === 'STUDENTS' && json.students) window.STUDENTS = json.students;
      if (key === 'CHURCHES' && json.churches) {
        window.CHURCHES = json.churches;
        if (json.plant_line_items) window.PLANT_LINE_ITEMS = json.plant_line_items;
      }
      if (key === 'STORIES'  && json.stories)  window.STORIES  = json.stories;
      if (key === 'SITE')                      window.SITE     = json;
    } catch (e) {
      // Silent — fall back to in-file constants.
    }
  };
  await Promise.all([
    tryLoad('data/students.json', 'STUDENTS'),
    tryLoad('data/churches.json', 'CHURCHES'),
    tryLoad('data/stories.json',  'STORIES'),
    tryLoad('data/site.json',     'SITE'),
  ]);
}

loadData().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
});
