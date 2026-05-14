// churches.jsx — Help Plant a Church page

const CHURCHES = [
  {
    id:'chickaballapur', town:'Chickaballapur', count:1, established:'--', members:'--', pastor:'--',
    status:'mature',
    note:'The district-headquarters congregation. Meets in a rented hall; saving toward a permanent space.',
    needs: null,
  },
  {
    id:'shidalagatta', town:'Shidalagatta', count:1, established:'--', members:'--', pastor:'--',
    status:'mature',
    note:"Where the mission began. The first home gathering met here in 1980, and where Silpa came to faith as a child.",
    needs: null,
  },
  {
    id:'chintamani', town:'Chintamani', count:1, established:'--', members:'--', pastor:'--',
    status:'mature',
    note:'A built sanctuary serving the silk-trading town. Hosts the regional Bible study and youth gatherings.',
    needs: null,
  },
  {
    id:'gowribindanur', town:'Gowribindanur', count:1, established:'--', members:'--', pastor:'--',
    status:'mature',
    note:'Planted in a market town near the Andhra border; a steady, self-supporting congregation.',
    needs: null,
  },
  {
    id:'bagepalli', town:'Bagepalli', count:1, established:'--', members:'--', pastor:'--',
    status:'growing',
    note:'A farming community on the highway north. Worship under a tin roof beside the pastor\'s home.',
    needs: null,
  },
  {
    id:'devaganhalli', town:'Devaganhalli', count:1, established:'--', members:'--', pastor:'--',
    status:'growing',
    note:'A young congregation gathered from three nearby hamlets; meets weekly in a rented shopfront.',
    needs: null,
  },
  {
    id:'chelur', town:'Chelur', count:1, established:'--', members:'--', pastor:'--',
    status:'growing',
    note:'A village plant born out of evening prayer meetings. Many first-generation believers.',
    needs: null,
  },
  {
    id:'gudibande', town:'Gudibande', count:1, established:'--', members:'--', pastor:'--',
    status:'growing',
    note:'A small hill-fort town. The congregation walks in from surrounding hamlets for Sunday worship.',
    needs: null,
  },
  {
    id:'peresandra', town:'Peresandra', count:1, established:'--', members:'--', pastor:'--',
    status:'new',
    note:'A roadside village along the Bangalore highway. Twelve families meet every Sunday in a home.',
    needs: null,
  },
  {
    id:'kodigenhalli', town:'Kodigenhalli', count:1, established:'--', members:'--', pastor:'--',
    status:'new',
    note:'The newest plant. A home gathering of seven families; raising funds for a meeting hall.',
    needs: null,
  },
];


function ChurchesHero({ navigate }) {
  return (
    <section style={{padding:'56px 0 40px'}}>
      <div className="container">
        <Eyebrow primary>Help plant a church</Eyebrow>
        <h1 className="serif" style={{fontSize:'clamp(44px, 6vw, 84px)', lineHeight:1.0, marginTop: 22, fontWeight:400, letterSpacing:'-0.02em', maxWidth: 1100}}>
          Ten churches.<br/><em style={{fontStyle:'italic', color:'var(--primary)'}}>One more, somewhere new.</em>
        </h1>
        <p style={{fontSize: 19, color:'var(--ink-2)', marginTop: 28, maxWidth: 720, lineHeight:1.55}}>
          Every town the mission operates in started with three families and a Bible. Below are the churches we've planted so far, and the ones still finding their feet.
        </p>
        <div style={{display:'flex', gap:14, marginTop: 36, flexWrap:'wrap'}}>
          <button className="btn btn-primary btn-arrow" onClick={() => navigate('donate', { fund:'church' })}>Help plant the next one</button>
          <button className="btn btn-ghost" onClick={() => {
            document.getElementById('church-list')?.scrollIntoView({ behavior:'smooth', block:'start' });
          }}>See where we are</button>
        </div>
      </div>
    </section>
  );
}

function StatStrip() {
  return (
    <section style={{padding:'28px 0', borderTop:'1px solid var(--line-soft)', borderBottom:'1px solid var(--line-soft)', background:'var(--bg-2)'}}>
      <div className="container" style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 32}}>
        {[
          {n:'10', l:'churches planted since 1980'},
          {n:'10', l:'towns and villages'},
          {n:'8',  l:'pastors ordained from within'},
          {n:'960+', l:'in worship weekly'},
        ].map(s => (
          <div key={s.l} style={{padding:'12px 0'}}>
            <div style={{fontFamily:'var(--serif)', fontSize: 32, color:'var(--primary)'}}>{s.n}</div>
            <div style={{fontSize:13, color:'var(--ink-3)', marginTop:4}}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const STATUS_META = {
  mature:  { label:'Established',  bg:'rgba(31,138,91,0.10)', fg:'#1F8A5B' },
  growing: { label:'Growing',      bg:'rgba(217,119,87,0.12)', fg:'var(--primary)' },
  new:     { label:'Newly planted', bg:'rgba(212,167,98,0.18)', fg:'#9A6F2D' },
};

function ChurchRow({ c, navigate }) {
  const meta = STATUS_META[c.status];
  return (
    <article className="card" style={{display:'grid', gridTemplateColumns:'1fr 1.4fr', gap: 0, padding: 0, alignItems:'stretch'}}>
      {/* Town header column */}
      <div style={{padding:'28px 28px 28px 32px', borderRight:'1px solid var(--line)', display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight: 200}}>
        <div>
          <div style={{display:'flex', alignItems:'center', gap: 10, marginBottom: 14}}>
            <span className="tag" style={{background: meta.bg, color: meta.fg, borderColor:'transparent', fontWeight:500}}>{meta.label}</span>
          </div>
          <h3 className="serif" style={{fontSize: 32, fontWeight:400, lineHeight:1.05, letterSpacing:'-0.01em'}}>{c.town}</h3>
          <div style={{fontSize:14, color:'var(--ink-3)', marginTop: 8}}>
            {c.count} {c.count === 1 ? 'church' : 'churches'} · since {c.established}
          </div>
        </div>
        <div style={{fontSize:13, color:'var(--ink-3)', marginTop: 24, paddingTop: 16, borderTop:'1px dashed var(--line)'}}>
          Pastors {c.pastor} · {c.members} in worship
        </div>
      </div>

      {/* Note column */}
      <div style={{padding:'28px 32px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
        <p className="serif" style={{fontSize: 18, lineHeight: 1.5, color:'var(--ink)', textWrap:'pretty'}}>
          {c.note}
        </p>
      </div>
    </article>
  );
}

function ChurchList({ navigate }) {
  return (
    <section id="church-list" style={{padding:'56px 0 32px'}}>
      <div className="container">
        <Eyebrow primary>Where we are</Eyebrow>
        <h2 className="serif" style={{fontSize:'clamp(28px, 3.4vw, 42px)', lineHeight:1.15, marginTop: 18, marginBottom: 32, fontWeight:400, letterSpacing:'-0.01em', maxWidth: 820}}>
          Each town the mission operates in is a church we've planted.
        </h2>
        <div style={{display:'flex', flexDirection:'column', gap: 16}}>
          {(window.CHURCHES || CHURCHES).map(c => <ChurchRow key={c.id} c={c} navigate={navigate} />)}
        </div>
      </div>
    </section>
  );
}

function PlantBreakdown({ navigate }) {
  return (
    <section style={{padding:'72px 0', background:'var(--bg-2)', borderTop:'1px solid var(--line-soft)', borderBottom:'1px solid var(--line-soft)'}}>
      <div className="narrow">
        <Eyebrow primary>How a church begins</Eyebrow>
        <h2 className="serif" style={{fontSize:'clamp(28px, 3.4vw, 44px)', lineHeight:1.1, marginTop: 18, fontWeight:400, letterSpacing:'-0.01em'}}>
          It starts with a Bible study in someone's home.
        </h2>
        <p style={{fontSize:16.5, color:'var(--ink-2)', marginTop: 22, lineHeight:1.7}}>
          In many villages across the Chickaballapur district, Christians travel over an hour to reach the nearest church. When the mission identifies a growing base of believers in an area, it begins planting the seeds of a new congregation.
        </p>
        <p style={{fontSize:16.5, color:'var(--ink-2)', marginTop: 18, lineHeight:1.7}}>
          It starts small: a weekly Bible study with a few families. As the group grows, it becomes a home church with regular worship. Over time, with enough support, the congregation moves into a dedicated building of its own. This process, from first gathering to established church, is something the mission has repeated across ten towns over {new Date().getFullYear() - 1980} years.
        </p>
        <button className="btn btn-primary btn-arrow" style={{marginTop: 40}}
                onClick={() => navigate('donate', { fund:'church' })}>
          Donate to plant a church
        </button>
      </div>
    </section>
  );
}

function PlantCTA({ navigate }) {
  const [amount, setAmount] = useState(100);
  const opts = [50, 100, 250, 500];
  return (
    <section id="plant-form" className="section" style={{background:'var(--ink)', color:'var(--bg)'}}>
      <div className="container plant-form-grid" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 64, alignItems:'center'}}>
        <div>
          <span className="eyebrow" style={{color:'var(--accent-soft)'}}>
            <span className="dot" style={{background:'var(--accent-soft)'}}></span>The next plant
          </span>
          <h2 className="serif" style={{color:'var(--bg)', fontSize:'clamp(34px, 4.4vw, 56px)', lineHeight:1.05, marginTop: 22, fontWeight:400, letterSpacing:'-0.015em'}}>
            Help us plant the eleventh.
          </h2>
          <p style={{fontSize:17, color:'rgba(247,241,226,0.72)', marginTop: 22, lineHeight:1.6, maxWidth: 480}}>
            The harvest is plentiful. Across the district, believers are gathering in homes, waiting for the support to grow into a church of their own. Your gift helps turn those gatherings into lasting congregations.
          </p>
        </div>
        <div style={{background:'rgba(255,248,234,0.06)', border:'1px solid rgba(247,241,226,0.16)', borderRadius:'var(--r-md)', padding:'32px 32px 28px'}}>
          <div style={{fontSize:11.5, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(247,241,226,0.6)', marginBottom: 18}}>
            Give toward the next church
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 8, marginBottom: 16}}>
            {opts.map(v => (
              <button key={v} onClick={() => setAmount(v)}
                      style={{
                        appearance:'none', cursor:'pointer',
                        padding:'14px 0', borderRadius: 8,
                        border: amount === v ? '1px solid var(--accent-soft)' : '1px solid rgba(247,241,226,0.2)',
                        background: amount === v ? 'rgba(212,167,98,0.18)' : 'transparent',
                        color:'#FFF8EA', fontFamily:'var(--serif)', fontSize: 18,
                      }}>
                ${v}
              </button>
            ))}
          </div>
          <div style={{display:'flex', alignItems:'center', gap: 10, padding:'12px 14px', border:'1px solid rgba(247,241,226,0.2)', borderRadius: 8, background:'rgba(0,0,0,0.15)'}}>
            <span style={{color:'rgba(247,241,226,0.6)'}}>$</span>
            <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value) || 0)}
                   className="no-spin"
                   style={{flex:1, minWidth:0, background:'transparent', border:'none', outline:'none', color:'#FFF8EA', fontFamily:'var(--serif)', fontSize: 22, padding:'4px 0'}}/>
          </div>
          <button className="btn btn-primary btn-arrow" style={{width:'100%', marginTop: 18, justifyContent:'center'}}
                  onClick={() => navigate('donate', { fund:'church', amount })}>
            Give ${amount.toLocaleString()} toward the next plant
          </button>
          <div style={{fontSize:12.5, color:'rgba(247,241,226,0.55)', marginTop: 14, textAlign:'center', lineHeight: 1.5}}>
            100% goes to the work.
          </div>
        </div>
      </div>
    </section>
  );
}

function Churches({ navigate }) {
  return (
    <>
      <Breadcrumb crumbs={[{ label:'Plant a church' }]} navigate={navigate} />
      <ChurchesHero navigate={navigate} />
      <StatStrip />
      <ChurchList navigate={navigate} />
      <Verse text="And the Lord added to their number day by day those who were being saved." cite="Acts 2:47" />
      <PlantBreakdown navigate={navigate} />
      <PlantCTA navigate={navigate} />
    </>
  );
}

window.Churches = Churches;
// JSON-loaded data wins; in-file constants are the offline fallback.
window.CHURCHES = window.CHURCHES || CHURCHES;
