// home.jsx — Home page

const homeStudents = [
  { id: 'priya',   name: 'Priya',   course: 'B.Sc. Nursing',      village: 'Chintamani',     goal: 200, sponsored: false },
  { id: 'arjun',   name: 'Arjun',   course: 'Diploma · Mechanic', village: 'Bagepalli',      goal: 200, sponsored: false },
  { id: 'lakshmi', name: 'Lakshmi', course: 'B.Com',              village: 'Chickaballapur', goal: 200, sponsored: true  },
];

// ── Hero variants ─────────────────────────
function HeroPhotoOverlay({ navigate }) {
  return (
    <section style={{paddingTop: 32, paddingBottom: 32}}>
      <div className="container">
        <div style={{position:'relative', borderRadius:'var(--r-lg)', overflow:'hidden'}}>
          <ImgSlot id="hero-overlay" h="640px"
                   placeholder="HERO · congregation, worship, or village scene · landscape"
                   shape="rounded" radius={20}
                   style={{borderRadius:20}} />
          <div style={{
            position:'absolute', inset:0,
            background: 'linear-gradient(180deg, rgba(42,32,20,0.05) 0%, rgba(42,32,20,0.55) 70%, rgba(42,32,20,0.78) 100%)',
            pointerEvents: 'none'
          }}></div>
          <div style={{position:'absolute', left:'5%', right:'5%', bottom:'8%', maxWidth: 760}}>
            <div style={{color:'rgba(255,248,234,0.9)', letterSpacing:'0.18em', textTransform:'uppercase', fontSize:11.5, fontWeight:500, marginBottom:18}}>
              <span style={{display:'inline-block', width:5, height:5, borderRadius:'50%', background:'var(--accent-soft)', marginRight:10, verticalAlign:'middle'}}></span>
              A faith-led mission · since 1980
            </div>
            <h1 style={{fontFamily:'var(--serif)', color:'#FFF8EA', fontSize:'clamp(40px, 5.6vw, 76px)', lineHeight:1.02, fontWeight:400, letterSpacing:'-0.015em'}}>
              Jesus is reaching villages across India, <em style={{color:'var(--accent-soft)', fontStyle:'italic'}}>one family at a time.</em>
            </h1>
            <div style={{display:'flex', gap:14, marginTop: 36, flexWrap:'wrap'}}>
              <button className="btn btn-primary btn-arrow" onClick={() => navigate('education')}>
                Sponsor a student
              </button>
              <button className="btn btn-outline" onClick={() => navigate('story')} style={{color:'#FFF8EA', borderColor:'rgba(255,248,234,0.6)'}}>
                Our story
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroFeaturedStory({ navigate }) {
  return (
    <section style={{padding:'56px 0 24px'}}>
      <div className="container hero-story-grid">
        <div className="hero-story-intro">
          <Eyebrow primary>A success story · Shidalagatta</Eyebrow>
          <h1 style={{fontFamily:'var(--serif)', fontSize:'clamp(40px, 5.4vw, 72px)', lineHeight:1.04, marginTop: 22, fontWeight:400, letterSpacing:'-0.015em'}}>
            Silpa dropped out at 11. Prayer and a sponsor <span className="under-wave">changed everything.</span>
          </h1>
          <p style={{fontSize:19, color:'var(--ink-2)', marginTop: 26, lineHeight:1.55, maxWidth: 520}}>
            At eleven, she'd dropped out of school to care for her asthmatic mother. Today she's a working nurse. She built the first brick home in her village.
          </p>
        </div>
        <div className="hero-story-buttons" style={{display:'flex', gap:14, flexWrap:'wrap'}}>
          <button className="btn btn-primary btn-arrow" onClick={() => navigate('education')}>
            Sponsor a student
          </button>
          <button className="btn btn-ghost" onClick={() => {
            const el = document.getElementById('silpa-story');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}>
            Read Silpa's story
          </button>
        </div>
        <div className="hero-story-photo" style={{position:'relative'}}>
          <img src="/images/silpa-story.jpg" alt="Silpa in her nursing scrubs" style={{width:'100%', height:600, objectFit:'cover', borderRadius:20, display:'block'}} />
          <div style={{
            position:'absolute', left:-32, bottom:32,
            background:'var(--card)', border:'1px solid var(--line)',
            borderRadius: 12, padding:'18px 22px', maxWidth: 300,
            boxShadow: '0 12px 40px rgba(42,32,20,0.08)'
          }}>
            <div style={{fontSize:11.5, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--primary)', marginBottom:10, fontWeight:500}}>The investment</div>
            <div style={{fontFamily:'var(--serif)', fontSize:24, marginBottom:6, lineHeight:1.1}}>$600 total <span style={{color:'var(--ink-3)', fontSize:14}}>over 3 years</span></div>
            <div style={{fontSize:12.5, color:'var(--ink-3)', marginTop:8, lineHeight:1.4}}>Now: 8 years as a nurse · home for her mother</div>
          </div>
        </div>
        <div className="hero-story-stats">
          <div><strong style={{color:'var(--ink)', fontFamily:'var(--serif)', fontSize:24, display:'block'}}>{new Date().getFullYear() - 1980}</strong>years of ministry</div>
          <div><strong style={{color:'var(--ink)', fontFamily:'var(--serif)', fontSize:24, display:'block'}}>10</strong>churches planted</div>
          <div><strong style={{color:'var(--ink)', fontFamily:'var(--serif)', fontSize:24, display:'block'}}>200+</strong>students supported</div>
        </div>
      </div>
    </section>
  );
}

function HeroCollage({ navigate }) {
  const slots = [
    {id:'h-c1', h:'320px', p:'family · village home'},
    {id:'h-c2', h:'200px', p:'child · school uniform'},
    {id:'h-c3', h:'260px', p:'pastor · prayer'},
    {id:'h-c4', h:'200px', p:'worship · home church'},
    {id:'h-c5', h:'300px', p:'student · books'},
    {id:'h-c6', h:'240px', p:'baptism · river'},
  ];
  return (
    <section style={{padding:'56px 0 24px'}}>
      <div className="container">
        <div style={{maxWidth: 760, marginBottom: 48}}>
          <Eyebrow primary>Christhia Seva Mission · since 1980</Eyebrow>
          <h1 style={{fontFamily:'var(--serif)', fontSize:'clamp(40px, 5.6vw, 76px)', lineHeight:1.04, marginTop: 22, fontWeight:400, letterSpacing:'-0.015em'}}>
            Faces of a mission. <em style={{color:'var(--primary)', fontStyle:'italic'}}>Lives changed by Jesus</em> across India.
          </h1>
          <p style={{fontSize:19, color:'var(--ink-2)', marginTop: 26, maxWidth: 600, lineHeight:1.55}}>
            Every photograph here is someone: a student, a pastor, a family hearing the Gospel for the first time.
          </p>
          <div style={{display:'flex', gap:14, marginTop: 32}}>
            <button className="btn btn-primary btn-arrow" onClick={() => navigate('education')}>Sponsor a student</button>
            <button className="btn btn-ghost" onClick={() => navigate('story')}>Our story</button>
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gridAutoRows:'minmax(min-content, max-content)', gap:14}}>
          {slots.map((s, i) => (
            <div key={s.id} style={{gridRow: i === 0 ? 'span 2' : 'auto'}}>
              <ImgSlot id={s.id} h={s.h} placeholder={s.p} radius={14} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroVerseSplit({ navigate }) {
  return (
    <section style={{padding:'56px 0 24px'}}>
      <div className="container" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 0, borderRadius:'var(--r-lg)', overflow:'hidden', minHeight: 600}}>
        <div style={{background:'var(--card)', padding:'80px 64px', display:'flex', flexDirection:'column', justifyContent:'center', borderRight:'1px solid var(--line)'}}>
          <Eyebrow primary>Christhia Seva Mission</Eyebrow>
          <p className="verse" style={{marginTop: 28, fontSize: 'clamp(28px, 3.6vw, 44px)'}}>
            "I came that they may have life, and have it abundantly."
          </p>
          <span className="verse-cite">John 10:10</span>
          <h2 style={{fontFamily:'var(--serif)', fontSize:'clamp(28px, 3vw, 40px)', marginTop: 56, fontWeight:400, lineHeight:1.15, letterSpacing:'-0.01em'}}>
            Bringing that abundant life, Gospel, education, and hope, to villages across India since 1980.
          </h2>
          <div style={{display:'flex', gap:14, marginTop: 36, flexWrap:'wrap'}}>
            <button className="btn btn-primary btn-arrow" onClick={() => navigate('education')}>Sponsor a student</button>
            <button className="btn btn-ghost" onClick={() => navigate('story')}>Our story</button>
          </div>
        </div>
        <div>
          <ImgSlot id="hero-verse" h="100%" placeholder="HERO · pastoral / village / hope" radius={0} style={{borderRadius:0}} />
        </div>
      </div>
    </section>
  );
}

function Hero({ variant, navigate }) {
  if (variant === 'photo')   return <HeroPhotoOverlay navigate={navigate} />;
  if (variant === 'collage') return <HeroCollage navigate={navigate} />;
  if (variant === 'verse')   return <HeroVerseSplit navigate={navigate} />;
  return <HeroFeaturedStory navigate={navigate} />;
}

// ── Mission verse band ───────────────────
function MissionBand() {
  return (
    <section style={{borderTop:'1px solid var(--line-soft)', borderBottom:'1px solid var(--line-soft)', background:'var(--bg-2)', padding:'72px 0'}}>
      <div className="narrow text-center">
        <Eyebrow primary>Our calling</Eyebrow>
        <h2 className="serif" style={{fontSize:'clamp(28px, 3.4vw, 42px)', lineHeight:1.2, marginTop: 22, fontWeight:400, letterSpacing:'-0.01em'}}>
          We exist to make Jesus known in the towns and villages of southern India, through churches, schools, and the daily care of our neighbors.
        </h2>
      </div>
    </section>
  );
}

// ── Ministries ────────────────────────────
function Ministries({ navigate }) {
  const items = [
    { key:'churches',   label:'Churches',   kicker:'Planting & pastoring', desc:'From a man with a briefcase at a country intersection to ten congregations across the district, we walk every plant through home gathering, growth, and pastoring.', verse:'Matthew 16:18', stat:'10', statLabel:'churches planted' },
    { key:'education',  label:'Education',  kicker:'Sponsor a student',  desc:'Helping young people from low-income families afford college, trades, and nursing schools, opening generational doors.', verse:'Proverbs 22:6', stat:'200+', statLabel:'students supported', highlight:true },
  ];
  return (
    <section className="section">
      <SectionHeader
        eyebrow="Ministries"
        title="Two ways the mission ministers."
        sub="The Gospel is the heart of everything we do. Around it, we build the practical work that makes love visible: schools, churches, and care for those in need."
      />
      <div className="container" style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 20}}>
        {items.map(it => (
          <div key={it.key}
               className="card"
               onClick={() => navigate(it.key === 'education' ? 'education' : it.key)}
               style={{
                 padding:'40px 36px',
                 cursor:'pointer',
                 background: it.highlight ? 'var(--ink)' : 'var(--card)',
                 color: it.highlight ? 'var(--bg)' : 'inherit',
                 border: it.highlight ? '1px solid var(--ink)' : '1px solid var(--line-soft)',
                 transition: 'transform .15s ease, box-shadow .2s ease',
               }}
               onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 40px rgba(42,32,20,0.10)'}
               onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
              <div>
                <div style={{fontSize:11.5, letterSpacing:'0.18em', textTransform:'uppercase', color: it.highlight ? 'var(--accent-soft)' : 'var(--primary)', fontWeight:500}}>
                  {it.kicker}
                </div>
                <h3 style={{fontFamily:'var(--serif)', fontSize:'clamp(28px, 3vw, 38px)', marginTop: 12, fontWeight:400, color: it.highlight ? 'var(--bg)' : 'var(--ink)'}}>
                  {it.label}
                </h3>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontFamily:'var(--serif)', fontSize: 36, lineHeight:1, color: it.highlight ? 'var(--accent-soft)' : 'var(--primary)'}}>{it.stat}</div>
                <div style={{fontSize:11, color: it.highlight ? 'rgba(247,241,226,0.65)' : 'var(--ink-3)', marginTop:6, maxWidth: 130, textAlign:'right'}}>{it.statLabel}</div>
              </div>
            </div>
            <p style={{fontSize:16.5, lineHeight:1.55, marginTop: 22, color: it.highlight ? 'rgba(247,241,226,0.82)' : 'var(--ink-2)', maxWidth: 460}}>
              {it.desc}
            </p>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop: 32, paddingTop: 22, borderTop: it.highlight ? '1px solid rgba(247,241,226,0.14)' : '1px solid var(--line-soft)'}}>
              <span style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:14.5, color: it.highlight ? 'var(--accent-soft)' : 'var(--ink-3)'}}>
                {it.verse}
              </span>
              <span style={{fontSize:14, fontWeight:500, color: it.highlight ? 'var(--bg)' : 'var(--primary)'}}>
                Learn more →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Featured success story · Silpa ────────
function FeaturedStories({ navigate }) {
  return (
    <section id="silpa-story" className="section" style={{background:'var(--bg-2)', borderTop:'1px solid var(--line-soft)', borderBottom:'1px solid var(--line-soft)'}}>
      <div className="container">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom: 48, gap: 32, flexWrap:'wrap'}}>
          <div style={{maxWidth: 720}}>
            <Eyebrow primary>Silpa's full story · in Mathew's words</Eyebrow>
            <h2 className="serif" style={{fontSize:'clamp(36px, 4.6vw, 60px)', lineHeight:1.05, marginTop: 18, fontWeight:400, letterSpacing:'-0.015em'}}>
              $200 a year for three years. <em style={{color:'var(--primary)', fontStyle:'italic'}}>A whole new life.</em>
            </h2>
          </div>
          <div style={{fontSize:13, color:'var(--ink-3)', letterSpacing:'0.16em', textTransform:'uppercase'}}>
            Silpa &middot; Shidalagatta
          </div>
        </div>

        <div className="silpa-grid" style={{display:'grid', gridTemplateColumns:'1fr 1.15fr', gap: 56, alignItems:'flex-start'}}>
          {/* Photo column */}
          <div className="silpa-photos" style={{position:'sticky', top: 92, alignSelf:'flex-start', display:'flex', flexDirection:'column', gap: 12}}>
            <img src="/images/silpa-story.jpg" alt="Silpa in her nursing scrubs" style={{width:'100%', height:540, objectFit:'cover', borderRadius:16, display:'block'}} />
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12}}>
              <ImgSlot id="silpa-house"   h="180px" placeholder="Silpa's brick home · the first in her village" radius={12} />
              <ImgSlot id="silpa-mom"     h="180px" placeholder="Silpa with her mother" radius={12} />
            </div>
          </div>

          {/* Story column */}
          <div>
            <p className="serif" style={{fontSize: 24, lineHeight: 1.45, color:'var(--ink)', marginBottom: 28, textWrap:'pretty'}}>
              I met Silpa in our church in Shidalagatta when she was eleven years old. She had dropped out of school and was working in the fields all day to take care of her mom, who was an asthma patient. They were living in a hut.
            </p>

            <p style={{fontSize: 17.5, lineHeight: 1.7, color:'var(--ink-2)', marginBottom: 20}}>
              The father had left before Silpa was born. She has never met him. Mary and I took her and her mom under our wings, provided all their needs, and started to send her to school. She had to restart fifth grade.
            </p>

            <p style={{fontSize: 17.5, lineHeight: 1.7, color:'var(--ink-2)', marginBottom: 20}}>
              High school was free at the government school; we only needed to provide her uniform and supplies. She passed with good marks, and we sent her to nursing college.
            </p>

            <p style={{fontSize: 17.5, lineHeight: 1.7, color:'var(--ink-2)', marginBottom: 32}}>
              Eight years ago she graduated and started to work as a nurse. With the help of White Oak Christian Church and her own ability, she built a two-bedroom brick home in her own village for her and her mom, <strong style={{color:'var(--ink)', fontWeight:500}}>the first brick home in that village</strong>.
            </p>

            {/* Pull quote */}
            <figure style={{margin:'8px 0 32px', padding:'28px 0', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)'}}>
              <blockquote style={{margin:0, fontFamily:'var(--serif)', fontStyle:'italic', fontSize:'clamp(22px, 2.6vw, 30px)', lineHeight:1.4, color:'var(--ink)', textWrap:'balance'}}>
                "It was a small amount for us, but a huge investment in Silpa's life. We didn't lose anything &mdash; she gained a new life."
              </blockquote>
              <figcaption style={{marginTop: 16, fontSize:13, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--primary)', fontWeight:500}}>
                &mdash; Mathew Mathai, founder
              </figcaption>
            </figure>

            {/* Investment summary */}
            <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 0, border:'1px solid var(--line)', borderRadius: 12, overflow:'hidden', background:'var(--card)'}}>
              {[
                { n:'$600', l:'total invested over 3 years' },
                { n:'8 yrs', l:'working as a nurse since' },
                { n:'1', l:'whole new life · and a house for her mom' },
              ].map((s, i) => (
                <div key={s.l} style={{padding:'24px 22px', borderRight: i < 2 ? '1px solid var(--line)' : 'none'}}>
                  <div style={{fontFamily:'var(--serif)', fontSize: 32, color:'var(--primary)', lineHeight: 1}}>{s.n}</div>
                  <div style={{fontSize:13, color:'var(--ink-3)', marginTop: 10, lineHeight:1.4}}>{s.l}</div>
                </div>
              ))}
            </div>

            <div style={{marginTop: 32, display:'flex', gap: 14, flexWrap:'wrap'}}>
              <button className="btn btn-primary btn-arrow" onClick={() => navigate('education')}>
                Be the next $200
              </button>
              <button className="btn btn-ghost" onClick={() => navigate('education')}>
                Browse students
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Education preview ─────────────────────
function EducationPreview({ navigate }) {
  const all = window.STUDENTS || homeStudents;
  const [featured] = useState(() => {
    const shuffled = [...all].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  });
  return (
    <section className="section">
      <div className="container" style={{display:'grid', gridTemplateColumns:'1fr 1.1fr', gap: 80, alignItems:'center'}}>
        <div>
          <Eyebrow primary>Education · Sponsor a student</Eyebrow>
          <h2 className="serif" style={{fontSize:'clamp(34px, 4.4vw, 54px)', lineHeight:1.05, marginTop: 22, fontWeight:400, letterSpacing:'-0.015em'}}>
            Choose a student. <em style={{fontStyle:'italic', color:'var(--primary)'}}>Change a generation.</em>
          </h2>
          <p style={{fontSize:18, color:'var(--ink-2)', marginTop: 22, lineHeight:1.6}}>
            Education is one of the surest ways out of generational poverty. We work directly with students whose families cannot afford post-secondary tuition (colleges, nursing schools, and trade programs) and connect them to sponsors around the world.
          </p>
          <p style={{fontSize:18, color:'var(--ink-2)', marginTop: 18, lineHeight:1.6}}>
            Every student has a profile, a story, and a transparent funding goal. You'll see exactly where your gift goes.
          </p>
          <div style={{display:'flex', gap:14, marginTop: 36, flexWrap:'wrap'}}>
            <button className="btn btn-primary btn-arrow" onClick={() => navigate('education')}>Browse students</button>
          </div>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:16}}>
          {featured.map(s => (
              <div key={s.id} className="card" style={{padding:'22px 24px'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:12}}>
                  <div style={{fontFamily:'var(--serif)', fontSize:22, fontWeight:400}}>{s.name}</div>
                  <span style={{fontSize:13.5, color:'var(--ink-3)', whiteSpace:'nowrap'}}>{s.course} · {s.village}</span>
                </div>
                {s.intro && <p style={{fontSize:15, color:'var(--ink-2)', marginTop:10, lineHeight:1.55}}>{s.intro}</p>}
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:14}}>
                  {s.sponsored
                    ? <span className="tag" style={{background:'var(--ink)', color:'#FFF8EA', borderColor:'transparent'}}>Sponsored</span>
                    : <span style={{fontFamily:'var(--serif)', fontSize:16, color:'var(--ink-2)'}}>${s.goal.toLocaleString()}/year</span>}
                  <a style={{fontSize:14, fontWeight:500, color:'var(--primary)', cursor:'pointer'}}
                     onClick={() => navigate('profile', { id: s.id })}>Read more →</a>
                </div>
              </div>
          ))}
          <button className="btn btn-ghost btn-arrow" onClick={() => navigate('education')} style={{alignSelf:'flex-end', marginTop: 4}}>
            See all {all.length} students
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Churches map: India → Karnataka zoom ─────────
//
// Geography is projected as (lon, 40 - lat) so SVG y grows downward like screen y.
// Outlines are simplified hand-constructed paths from real coastline / border vertices
// (~30 vertices each — accurate to roughly 0.5°). Town markers use real lat/lon.

// India outline, clockwise from Kashmir NW
const INDIA_PATH = "M 74,5 L 76,4 L 78,5 L 80,8 L 88,13 L 95,12 L 97,13 L 95,15 L 93,16 L 92,18 L 91,18 L 89,18 L 87,18.5 L 86,21 L 80,26.5 L 79.8,30 L 80,32 L 77.5,32 L 76.5,31 L 75,29 L 74,27 L 73,24 L 73,21 L 72,19 L 70,18 L 68.5,16 L 70,16 L 70,14 L 72,12 L 73,8 Z";

// Karnataka outline, clockwise from N Belagavi
const KARNATAKA_PATH = "M 74.5,23.6 L 75.4,22.6 L 76.5,22.4 L 77.5,21.55 L 77.6,23 L 77.5,24.5 L 77,25 L 77.4,26 L 78.05,26.5 L 78.45,26.6 L 78.6,27 L 78.5,27.5 L 78,28 L 77.5,28 L 76.7,28.3 L 76,28.4 L 75.6,27.7 L 75,27.5 L 74.85,27.2 L 74.5,26.5 L 74.4,25.5 L 74.2,25.2 L 74.1,24.8 L 74.05,24.05 Z";

// viewBox: [minX, minY, w, h] in projected (lon, 40-lat) units
const INDIA_VIEWBOX     = [67, 3,    31, 31];   // pad slightly past actual extent
const KARNATAKA_VIEWBOX = [73.7, 21.2, 5.2, 7.5];

// Real town coordinates in Chickaballapur district (Karnataka), projected as (lon, 40-lat)
const TOWNS = [
  { x: 77.79, y: 26.22, label: 'Bagepalli'      }, // 13.78 N
  { x: 77.51, y: 26.39, label: 'Gauribidanur'   }, // 13.61 N
  { x: 77.69, y: 26.32, label: 'Gudibande'      }, // 13.68 N
  { x: 78.05, y: 26.60, label: 'Chintamani'     }, // 13.40 N
  { x: 77.86, y: 26.61, label: 'Sidlaghatta'    }, // 13.39 N
  { x: 77.71, y: 26.14, label: 'Chelur'         }, // 13.86 N
  { x: 77.73, y: 26.57, label: 'Chickaballapur' }, // 13.43 N
  { x: 77.77, y: 26.64, label: 'Peresandra'     }, // 13.36 N
  { x: 77.27, y: 26.39, label: 'Kodigenahalli'  }, // 13.61 N
  { x: 77.71, y: 26.75, label: 'Devanahalli'    }, // 13.25 N
];

// Centroid of Karnataka — approximate geographic center (around Davanagere/Chitradurga)
const KARNATAKA_CENTROID = { x: 76, y: 25 }; // 15°N, 76°E

function ChurchesMap() {
  const [view, setView] = useState('india'); // 'india' | 'karnataka'
  const [vb, setVb] = useState(INDIA_VIEWBOX);
  const sectionRef = useRef(null);
  const triggered = useRef(false);

  // Animate viewBox between targets
  useEffect(() => {
    const target = view === 'india' ? INDIA_VIEWBOX : KARNATAKA_VIEWBOX;
    const start = vb;
    const t0 = performance.now();
    const dur = 1600;
    const ease = (t) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2; // easeInOutCubic
    let raf;
    const step = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      const e = ease(t);
      setVb(start.map((s, i) => s + (target[i] - s) * e));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line
  }, [view]);

  // Auto-trigger zoom on first scroll into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !triggered.current) {
          triggered.current = true;
          setTimeout(() => setView('karnataka'), 1200);
        }
      });
    }, { threshold: 0.45 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Convert SVG-viewBox coords → CSS % within the SVG container
  // (so we can layer HTML pins on top with constant pixel size).
  const toScreen = (x, y) => ({
    left:  `${((x - vb[0]) / vb[2]) * 100}%`,
    top:   `${((y - vb[1]) / vb[3]) * 100}%`,
  });

  // Karnataka centroid — defined at module scope
  // (KARNATAKA_CENTROID is imported from constants above)

  // Show town pins only when sufficiently zoomed in (vb width small)
  const pinsVisible = vb[2] < 10;
  const indiaPinVisible = vb[2] > 12;

  return (
    <section ref={sectionRef} className="section" style={{background:'var(--ink)', color:'var(--bg)'}}>
      <div className="container" style={{display:'grid', gridTemplateColumns:'1fr 1.15fr', gap: 80, alignItems:'center'}}>
        {/* Left: copy */}
        <div>
          <div className="eyebrow" style={{color:'var(--accent-soft)'}}>
            <span className="dot" style={{background:'var(--accent-soft)'}}></span>Where we are
          </div>
          <h2 className="serif" style={{color:'var(--bg)', fontSize:'clamp(34px, 4.4vw, 54px)', lineHeight:1.05, marginTop: 22, fontWeight:400, letterSpacing:'-0.015em'}}>
            From one corner of Karnataka, <em style={{color:'var(--accent-soft)', fontStyle:'italic'}}>ten churches and counting.</em>
          </h2>
          <p style={{fontSize:17, color:'rgba(247,241,226,0.72)', marginTop: 22, lineHeight:1.6, maxWidth: 480}}>
            Most of these congregations started in living rooms. A few began with a single family hosting prayer. Today they meet in homes, in rented halls, and in buildings the mission has helped construct, all within a 90-kilometer arc of where Mathew and Mary first arrived in 1980.
          </p>
          <div style={{display:'flex', gap:32, marginTop: 36, flexWrap:'wrap'}}>
            {[
              {n:'10', l:'churches'},
              {n:'8',  l:'pastors'},
              {n:'960+', l:'in worship weekly'},
            ].map(s => (
              <div key={s.l}>
                <div style={{fontFamily:'var(--serif)', fontSize:36, color:'var(--accent-soft)'}}>{s.n}</div>
                <div style={{fontSize:12.5, color:'rgba(247,241,226,0.6)', marginTop:4}}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{display:'flex', gap: 8, marginTop: 36, padding: 4, background:'rgba(247,241,226,0.06)', borderRadius: 999, width:'fit-content', border:'1px solid rgba(247,241,226,0.1)'}}>
            <button onClick={() => setView('india')}
                    style={{padding:'9px 18px', borderRadius: 999, border:0, cursor:'pointer',
                            background: view === 'india' ? 'var(--accent-soft)' : 'transparent',
                            color: view === 'india' ? 'var(--ink)' : 'rgba(247,241,226,0.7)',
                            fontFamily:'var(--sans)', fontSize:13.5, fontWeight: 500}}>
              India
            </button>
            <button onClick={() => setView('karnataka')}
                    style={{padding:'9px 18px', borderRadius: 999, border:0, cursor:'pointer',
                            background: view === 'karnataka' ? 'var(--accent-soft)' : 'transparent',
                            color: view === 'karnataka' ? 'var(--ink)' : 'rgba(247,241,226,0.7)',
                            fontFamily:'var(--sans)', fontSize:13.5, fontWeight: 500}}>
              Karnataka
            </button>
          </div>
        </div>

        {/* Right: map */}
        <div style={{position:'relative', aspectRatio:'4/5', background:'rgba(247,241,226,0.04)', borderRadius:'var(--r-lg)', border:'1px solid rgba(247,241,226,0.12)', overflow:'hidden'}}>
          <svg viewBox={vb.join(' ')} preserveAspectRatio="xMidYMid meet"
               style={{width:'100%', height:'100%', position:'absolute', inset:0}}>
            <defs>
              <filter id="map-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.6" />
              </filter>
            </defs>
            {/* India outline — visible always, fades when fully zoomed */}
            <path d={INDIA_PATH}
                  fill="rgba(247,241,226,0.04)"
                  stroke="rgba(247,241,226,0.22)"
                  strokeWidth={vb[2] * 0.004}
                  strokeLinejoin="round" />
            {/* Karnataka shape — emphasized */}
            <path d={KARNATAKA_PATH}
                  fill={view === 'india' ? 'rgba(217,119,87,0.25)' : 'rgba(217,119,87,0.10)'}
                  stroke="var(--primary)"
                  strokeWidth={vb[2] * 0.006}
                  strokeLinejoin="round"
                  style={{transition: 'fill 1.4s ease'}} />
          </svg>

          {/* India-view single pin on Karnataka */}
          <div style={{
                  position:'absolute',
                  ...toScreen(KARNATAKA_CENTROID.x, KARNATAKA_CENTROID.y),
                  transform: 'translate(-50%, -100%)',
                  opacity: indiaPinVisible ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                  pointerEvents: indiaPinVisible ? 'auto' : 'none',
                }}>
            <MapMarker label="Karnataka" big />
          </div>

          {/* Karnataka-view town pins */}
          {TOWNS.map((t, i) => (
            <TownPin key={t.label}
                     town={t}
                     position={toScreen(t.x, t.y)}
                     visible={pinsVisible}
                     delay={i * 70} />
          ))}

          {/* Bottom-left label */}
          <div style={{position:'absolute', left:20, bottom:18, fontSize:11.5, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(247,241,226,0.55)', display:'flex', alignItems:'center', gap: 10}}>
            <span style={{width: 6, height: 6, borderRadius:'50%', background:'var(--accent-soft)', animation: view === 'karnataka' ? 'pulse 2s infinite' : 'none'}}></span>
            {view === 'india' ? 'India' : 'Karnataka · Chickaballapur district'}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        @keyframes pinDrop {
          0%   { opacity: 0; transform: translate(-50%, -110%) scale(0.5); }
          60%  { opacity: 1; transform: translate(-50%, -98%)  scale(1.05); }
          100% { opacity: 1; transform: translate(-50%, -100%) scale(1); }
        }
      `}</style>
    </section>
  );
}

function MapMarker({ label, big }) {
  const size = big ? 18 : 12;
  return (
    <div style={{position:'relative'}}>
      {/* halo */}
      <div style={{
            position:'absolute', left:'50%', top:'100%',
            width: size * 2.4, height: size * 2.4,
            marginLeft: -size * 1.2, marginTop: -size * 1.2,
            borderRadius:'50%',
            background:'radial-gradient(circle, rgba(217,119,87,0.45) 0%, rgba(217,119,87,0) 65%)',
            animation: 'pulse 2.6s infinite ease-in-out',
            pointerEvents:'none',
          }}></div>
      {/* teardrop pin */}
      <svg width={size} height={size * 1.4} viewBox="0 0 24 34"
           style={{display:'block', filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.4))'}}>
        <path d="M12 0 C5.4 0 0 5.4 0 12 c0 9 12 22 12 22 s12-13 12-22 C24 5.4 18.6 0 12 0 z"
              fill="var(--primary)" />
        <circle cx="12" cy="12" r="4.5" fill="#FFF8EA" />
      </svg>
      {label && (
        <div style={{
          position:'absolute', left:'50%', top: -4,
          transform:'translate(-50%, -100%)',
          background:'var(--bg)', color:'var(--ink)',
          padding:'7px 12px', borderRadius: 6,
          fontSize: big ? 13.5 : 12, whiteSpace:'nowrap',
          fontWeight: 500, fontFamily:'var(--sans)',
          boxShadow:'0 6px 18px rgba(0,0,0,0.35)',
        }}>
          {label}
        </div>
      )}
    </div>
  );
}

function TownPin({ town, position, visible, delay }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
         style={{
            position:'absolute', ...position,
            transform: 'translate(-50%, -100%)',
            opacity: visible ? 1 : 0,
            animation: visible ? `pinDrop 0.6s ${delay}ms cubic-bezier(0.34, 1.4, 0.64, 1) both` : 'none',
            pointerEvents: visible ? 'auto' : 'none',
            cursor:'pointer',
            zIndex: hover ? 5 : 1,
         }}>
      <svg width="14" height="20" viewBox="0 0 24 34"
           style={{display:'block', filter:'drop-shadow(0 3px 6px rgba(0,0,0,0.4))'}}>
        <path d="M12 0 C5.4 0 0 5.4 0 12 c0 9 12 22 12 22 s12-13 12-22 C24 5.4 18.6 0 12 0 z"
              fill="var(--primary)" />
        <circle cx="12" cy="12" r="4" fill="#FFF8EA" />
      </svg>
      {hover && (
        <div style={{
          position:'absolute', left:'50%', top:-2,
          transform:'translate(-50%, -100%)',
          background:'var(--bg)', color:'var(--ink)',
          padding:'6px 11px', borderRadius:5, fontSize:12, whiteSpace:'nowrap',
          fontWeight:500, boxShadow:'0 6px 16px rgba(0,0,0,0.35)',
        }}>{town.label}</div>
      )}
    </div>
  );
}

// ── Timeline ───────────────────────────────
function Timeline() {
  const events = [
    { y:'1980', t:'Mathew arrives at a Shidalagatta intersection', d:'A briefcase, no contacts, no language. Through Mrs. Solomon, a retired teacher half the town had once been a student of, the first introductions are made.' },
    { y:'1987', t:'First pastor ordained', d:'The first home church grows enough to call a full-time pastor.' },
    { y:'1995', t:'Church building dedicated', d:'After 15 years of meeting in homes, the first sanctuary is built and dedicated.' },
    { y:'2003', t:'Education ministry begins', d:'Sponsorship for the first 12 students starting college.' },
    { y:'2014', t:'Five churches across the region', d:'Cluster congregations begin in surrounding villages.' },
    { y:'2020', t:'Family aid expands during COVID-19', d:'Emergency relief reaches 400+ families in lockdown.' },
    { y:'2026', t:'10 churches · 200+ students supported', d:'Today, the mission walks alongside thousands across the Chickaballapur district and beyond.' },
  ];
  return (
    <section className="section">
      <SectionHeader
        eyebrow="Our story · since 1980"
        title="From one intersection to ten churches."
        sub="Forty-six years of small obediences, faithfully accumulated."
      />
      <div className="container">
        <div style={{position:'relative'}}>
          <div style={{position:'absolute', left:'7.5%', top: 8, bottom: 8, width: 1, background:'var(--line)'}}></div>
          {events.map((e, i) => (
            <div key={e.y} style={{display:'grid', gridTemplateColumns:'15% 85%', gap: 24, padding:'24px 0', position:'relative'}}>
              <div style={{textAlign:'right', paddingRight: 24, position:'relative'}}>
                <div style={{fontFamily:'var(--serif)', fontSize: 28, color:'var(--primary)'}}>{e.y}</div>
                <div style={{position:'absolute', right: -7, top: 14, width:13, height:13, borderRadius:'50%', background:'var(--bg)', border:'2px solid var(--primary)'}}></div>
              </div>
              <div style={{paddingLeft: 16, paddingRight: 24}}>
                <h4 className="serif" style={{fontSize: 22, marginBottom: 6, fontWeight:400}}>{e.t}</h4>
                <p style={{color:'var(--ink-2)', fontSize:15.5, lineHeight:1.55, maxWidth: 600}}>{e.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ─────────────────────────────
function FinalCTA({ navigate }) {
  return (
    <section className="section" style={{background:'var(--primary)', color:'#FFF8EA', padding:'120px 0'}}>
      <div className="narrow text-center">
        <p style={{fontFamily:'var(--serif)', fontStyle:'italic', fontSize:'clamp(28px, 3.6vw, 44px)', lineHeight:1.3, fontWeight:400}}>
          "How beautiful are the feet of those who bring good news."
        </p>
        <span style={{fontSize:11.5, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,248,234,0.7)', display:'block', marginTop: 18}}>
          Romans 10:15
        </span>
        <h2 className="serif" style={{color:'#FFF8EA', fontSize:'clamp(34px, 4.4vw, 56px)', lineHeight:1.1, marginTop: 56, fontWeight:400, letterSpacing:'-0.015em'}}>
          Walk with us. Send a child to school. Help build a church.
        </h2>
        <div style={{display:'flex', justifyContent:'center', gap:14, marginTop: 44, flexWrap:'wrap'}}>
          <button className="btn" onClick={() => navigate('education')} style={{background:'#FFF8EA', color:'var(--primary)', padding:'14px 24px', borderRadius:999, fontWeight:500}}>
            Sponsor a student →
          </button>
          <button className="btn btn-outline" onClick={() => navigate('donate')} style={{color:'#FFF8EA', borderColor:'rgba(255,248,234,0.7)'}}>
            Make a donation
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Home ──────────────────────────────────
function Home({ navigate, heroVariant }) {
  return (
    <>
      <Hero variant={heroVariant} navigate={navigate} />
      <MissionBand />
      <Ministries navigate={navigate} />
      <FeaturedStories navigate={navigate} />
      <Verse text="And he said to them, 'Go into all the world and proclaim the gospel to the whole creation.'" cite="Mark 16:15" />
      <EducationPreview navigate={navigate} />
      <ChurchesMap />
      <Timeline />
      <FinalCTA navigate={navigate} />
    </>
  );
}

Object.assign(window, { Home });
