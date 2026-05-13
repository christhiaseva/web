// shared.jsx — Nav, Footer, Verse, common UI

const { useState, useEffect, useRef } = React;

// ── Cross icon ────────────────────────────────
const CrossIcon = ({ size = 14, color }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true">
    <path d="M7 1.5v11M2.5 6h9" stroke={color || "currentColor"}
          strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ── Nav ───────────────────────────────────────
function Nav({ page, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const ministries = [
    { key: 'education', label: 'Education', sub: 'Sponsor a student' },
    { key: 'evangelism', label: 'Evangelism', sub: 'Sharing the Gospel' },
    { key: 'churches',   label: 'Churches',   sub: 'Planting and pastoring' },
  ];

  const go = (p, params) => { setMobileOpen(false); navigate(p, params); };

  const mobileLinks = [
    { key: 'story',     label: 'Our Story' },
    { key: 'education', label: 'Sponsor a Student' },
    { key: 'churches',  label: 'Help Plant a Church' },
  ];

  return (
    <React.Fragment>
    <nav className="nav">
      <div className="container nav-inner">
        <a className="brand" onClick={() => navigate('home')}>
          <div className="brand-mark" aria-hidden="true"></div>
          <div className="brand-name">
            <span>Christhia Seva Mission</span>
            <span className="brand-sub">Since 1980 · Karnataka, India</span>
          </div>
        </a>

        <div className="nav-links">
          <a className={`nav-link ${page === 'story' ? 'active' : ''}`}
             onClick={() => navigate('story')}>Our Story</a>

          <a className={`nav-link ${['education', 'profile'].includes(page) ? 'active' : ''}`}
             onClick={() => navigate('education')}>Sponsor a Student</a>

          <a className={`nav-link ${page === 'churches' ? 'active' : ''}`}
             onClick={() => navigate('churches')}>Help Plant a Church</a>

          <button className="donate-cta" onClick={() => navigate('donate')}>
            Donate
          </button>
        </div>

        <button className="nav-hamburger" aria-label="Open menu"
                onClick={() => setMobileOpen(true)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>

    {mobileOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          <div className="mobile-menu-header">
            <a className="brand" onClick={() => go('home')}>
              <div className="brand-mark" aria-hidden="true"></div>
              <div className="brand-name"><span>Christhia Seva Mission</span></div>
            </a>
            <button className="mobile-menu-close" aria-label="Close menu"
                    onClick={() => setMobileOpen(false)}>×</button>
          </div>
          <div className="mobile-menu-links">
            {mobileLinks.map(l => (
              <a key={l.key} className={`mobile-menu-link ${(l.key === 'education' ? ['education', 'profile'].includes(page) : page === l.key) ? 'active' : ''}`}
                 onClick={() => go(l.key)}>{l.label}</a>
            ))}
            <button className="donate-cta mobile-donate" onClick={() => go('donate')}>
              Donate
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

// ── Footer ────────────────────────────────────
function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="container footer-grid" style={{display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr', gap: 60}}>
        <div>
          <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:18}}>
            <div className="brand-mark" aria-hidden="true" style={{background:'var(--accent)'}}></div>
            <div style={{fontFamily:'var(--serif)', fontSize:20, color:'var(--bg)'}}>Christhia Seva Mission</div>
          </div>
          <p style={{maxWidth: 360, color: 'rgba(247,241,226,0.7)', fontSize:15, lineHeight:1.6}}>
            A faith-led ministry planting churches, educating children, and walking alongside families across India since 1980.
          </p>
          <p style={{marginTop: 24, fontFamily:'var(--serif)', fontStyle:'italic', color:'var(--accent-soft)', fontSize:16}}>
            "Therefore go and make disciples of all nations…"
            <span style={{display:'block', fontFamily:'var(--sans)', fontStyle:'normal', fontSize:11, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(247,241,226,0.5)', marginTop:8}}>
              Matthew 28:19
            </span>
          </p>
        </div>
        <div>
          <h4>Ministries</h4>
          <a onClick={() => navigate('education')}>Education</a>
          <a onClick={() => navigate('churches')}>Churches</a>
        </div>
        <div>
          <h4>About</h4>
          <a onClick={() => navigate('story')}>Our Story</a>
          <a onClick={() => navigate('contact')}>Contact</a>
        </div>
        <div>
          <h4>Give</h4>
          <a onClick={() => navigate('education')}>Sponsor a Student</a>
          <a onClick={() => navigate('donate', { fund:'church' })}>Plant a Church</a>
        </div>
      </div>
      <div className="container footer-bottom" style={{marginTop:60, paddingTop:24, borderTop:'1px solid rgba(247,241,226,0.12)', display:'flex', justifyContent:'space-between', fontSize:13, color:'rgba(247,241,226,0.5)'}}>
        <span>© {new Date().getFullYear()} Christhia Seva Mission</span>
        <span>A registered 501(c)(3) organization</span>
      </div>
    </footer>
  );
}

// ── Verse pull-quote ──────────────────────────
function Verse({ text, cite, align = 'center' }) {
  return (
    <div className="narrow" style={{textAlign: align, padding:'80px 0'}}>
      <p className="verse">"{text}"</p>
      <span className="verse-cite">{cite}</span>
    </div>
  );
}

// ── Eyebrow ──────────────────────────────────
function Eyebrow({ children, primary = false }) {
  return (
    <div className={primary ? 'eyebrow primary' : 'eyebrow'}>
      <span className="dot"></span>{children}
    </div>
  );
}

// ── Section header ──────────────────────────
function SectionHeader({ eyebrow, title, sub, primary = true }) {
  return (
    <div className="container" style={{marginBottom: 48}}>
      {eyebrow && <Eyebrow primary={primary}>{eyebrow}</Eyebrow>}
      <h2 style={{fontSize:'clamp(36px, 4.6vw, 56px)', lineHeight:1.05, marginTop: 18, maxWidth: 820}}>
        {title}
      </h2>
      {sub && <p style={{fontSize:18, color:'var(--ink-2)', maxWidth: 640, marginTop: 18, lineHeight:1.55}}>{sub}</p>}
    </div>
  );
}

// ── ImgSlot wrapper ─────────────────────────
function ImgSlot({ id, w, h, shape = 'rounded', radius = 12, placeholder, style, src }) {
  const props = { id, shape, radius, placeholder: placeholder || 'Drop a photo' };
  if (src) props.src = src;
  return React.createElement('image-slot', {
    ...props,
    style: {
      width: w || '100%',
      height: h || '100%',
      ...(style || {}),
    }
  });
}

// ── Progress ─────────────────────────────────
function Progress({ value, max }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="progress" role="progressbar" aria-valuenow={value} aria-valuemax={max}>
      <div className="progress-fill" style={{width: `${pct}%`}}></div>
    </div>
  );
}

const STRIPE_BG = 'repeating-linear-gradient(-45deg, var(--bg-2), var(--bg-2) 8px, var(--line-soft) 8px, var(--line-soft) 9px)';
function StudentPhoto({ src, alt, style }) {
  if (src) return <img src={src} alt={alt || ''} style={{width:'100%', height:'100%', objectFit:'cover', display:'block', ...style}} />;
  return <div style={{width:'100%', height:'100%', background: STRIPE_BG, ...style}} />;
}

Object.assign(window, { Nav, Footer, Verse, Eyebrow, SectionHeader, ImgSlot, Progress, CrossIcon, StudentPhoto });
