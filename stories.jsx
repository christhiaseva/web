// stories.jsx — Student stories page

const STUDENT_STORIES = [
  {
    id: 'silpa',
    name: 'Silpa',
    village: 'Shidalagatta',
    status: 'past',
    role: 'Nurse · graduated 8 years ago',
    headline: '$200 a year for three years gave Silpa a whole new life.',
    summary: "At eleven, Silpa had dropped out of school to care for her asthmatic mother. Today she's a working nurse who built the first brick home in her village.",
    invested: '$600 over 3 years',
    outcome: 'Working nurse · brick home for her mother',
    tag: 'Healthcare',
  },
  {
    id: 'priya',
    name: 'Priya',
    age: 18,
    village: 'Chintamani',
    status: 'current',
    course: 'B.Sc. Nursing',
    school: 'Govt Nursing College, Bangalore',
    headline: 'Priya wants to be the first nurse from her village.',
    summary: "Her father picks cotton; her mother stitches blouses. After her aunt died in childbirth far from medical care, Priya knew exactly what she wanted to do.",
    raised: 1240, goal: 2400, sponsors: 23, days: 14,
    tag: 'Healthcare',
  },
  {
    id: 'arjun',
    name: 'Arjun',
    age: 17,
    village: 'Bagepalli',
    status: 'current',
    course: 'Diploma · Mechanic',
    school: 'ITI Chickaballapur',
    headline: "Arjun fixes everything in his colony; now he's training to do it for a living.",
    summary: "The neighbors bring him broken radios and bicycle gears. With a diploma, Arjun can open a small shop and support his grandmother and younger sister.",
    raised: 480, goal: 1100, sponsors: 9, days: 22,
    tag: 'Trade',
  },
  {
    id: 'lakshmi',
    name: 'Lakshmi',
    age: 19,
    village: 'Chickaballapur',
    status: 'current',
    course: 'B.Com',
    school: 'Andhra University',
    headline: 'One semester away from being the first college graduate in her family.',
    summary: "Lakshmi is six months from finishing her degree. Her sponsors have carried her this far; a final push gets her across the line.",
    raised: 2100, goal: 2200, sponsors: 34, days: 6,
    tag: 'Business',
  },
  {
    id: 'samuel',
    name: 'Samuel',
    age: 18,
    village: 'Gowribindanur',
    status: 'current',
    course: 'B.A. Theology',
    school: 'Bible College, Bangalore',
    headline: 'Samuel feels called to plant a church in his own village.',
    summary: "He grew up in one of our home churches and is now studying to lead one. The mission supports his theological training in full.",
    raised: 300, goal: 1800, sponsors: 5, days: 30,
    tag: 'Ministry',
  },
  {
    id: 'rajesh',
    name: 'Pastor Rajesh',
    village: 'Shidalagatta',
    status: 'past',
    role: 'Pastor · ordained 2019',
    headline: '"My uncle laughed when I said I wanted to plant a church. Now he prays with us every Sunday."',
    summary: "Rajesh was sponsored through Bible college. He now pastors a 90-member congregation that meets in a rented hall, including the uncle who once mocked him.",
    invested: 'Bible college tuition · 4 years',
    outcome: 'Lead pastor · 90-member congregation',
    tag: 'Ministry',
  },
  {
    id: 'asha',
    name: 'Asha',
    age: 19,
    village: 'Chelur',
    status: 'current',
    course: 'B.Ed (Teaching)',
    school: 'Sri Padmavati Mahila',
    headline: 'Asha plans to come home and teach at the village school where she learned to read.',
    summary: "Asha was a top student in her tenth standard class. She wants to give the next generation in her colony the same chance she got.",
    raised: 1800, goal: 2000, sponsors: 28, days: 9,
    tag: 'Education',
  },
  {
    id: 'meena',
    name: 'Meena',
    age: 17,
    village: 'Gudibande',
    status: 'current',
    course: 'B.Sc. Computer Science',
    school: 'Acharya Nagarjuna University',
    headline: 'Meena is the first girl in her colony to study computer science.',
    summary: "Her uncle, a lab technician, was the first to graduate college. Meena is following his path, with her family and her home church behind her.",
    raised: 1650, goal: 2600, sponsors: 21, days: 18,
    tag: 'Technology',
  },
];

function StoriesHero({ navigate }) {
  return (
    <section style={{padding:'56px 0 40px'}}>
      <div className="container">
        <Eyebrow primary>Student stories</Eyebrow>
        <h1 className="serif" style={{fontSize:'clamp(44px, 6vw, 84px)', lineHeight:1.0, marginTop: 22, fontWeight:400, letterSpacing:'-0.02em', maxWidth: 1100}}>
          Lives that the Gospel, <em style={{fontStyle:'italic', color:'var(--primary)'}}>and a small group of sponsors,</em> quietly rewrote.
        </h1>
        <p style={{fontSize: 19, color:'var(--ink-2)', marginTop: 28, maxWidth: 720, lineHeight:1.55}}>
          Some of these stories are finished. Some are mid-chapter and need a sponsor to keep going. Either way, they begin the same: a child, a family, a village, and a small obedience that opened a door.
        </p>
      </div>
    </section>
  );
}

function StoryFilters({ filter, setFilter, count }) {
  const opts = [
    { id:'all',     label:'All stories' },
    { id:'current', label:'Need a sponsor now' },
    { id:'past',    label:'Completed · success stories' },
  ];
  return (
    <section style={{padding:'8px 0 32px', borderBottom:'1px solid var(--line-soft)'}}>
      <div className="container" style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap: 24}}>
        <div style={{display:'flex', gap: 6, flexWrap:'wrap'}}>
          {opts.map(o => (
            <button key={o.id} onClick={() => setFilter(o.id)}
                    style={{
                      appearance:'none', cursor:'pointer',
                      border: filter === o.id ? '1px solid var(--ink)' : '1px solid var(--line)',
                      background: filter === o.id ? 'var(--ink)' : 'transparent',
                      color: filter === o.id ? 'var(--bg)' : 'var(--ink-2)',
                      padding:'9px 16px', borderRadius: 999,
                      fontSize: 14, fontFamily:'var(--sans)', fontWeight:500,
                    }}>
              {o.label}
            </button>
          ))}
        </div>
        <div style={{fontSize:13.5, color:'var(--ink-3)'}}>{count} {count === 1 ? 'story' : 'stories'}</div>
      </div>
    </section>
  );
}

function CurrentStoryCard({ s, navigate }) {
  const pct = (s.raised / s.goal) * 100;
  const urgent = s.days <= 10;
  return (
    <article className="card" style={{display:'grid', gridTemplateColumns:'320px 1fr', gap: 0, cursor:'pointer'}}
             onClick={() => navigate('profile', { id: s.id })}>
      <div style={{position:'relative', minHeight: 320}}>
        <ImgSlot id={`stories-${s.id}`} h="100%" placeholder={`${s.name}, ${s.age}`} radius={0} style={{borderRadius:0}} />
        <div style={{position:'absolute', top:14, left:14, display:'flex', gap:6}}>
          <span className="tag" style={{background:'rgba(255,251,241,0.92)', borderColor:'transparent'}}>{s.tag}</span>
          {urgent && <span className="tag" style={{background:'var(--primary)', color:'#FFF8EA', borderColor:'transparent'}}>{s.days} days left</span>}
        </div>
      </div>
      <div style={{padding:'28px 32px 28px', display:'flex', flexDirection:'column'}}>
        <div style={{fontSize:11.5, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--primary)', fontWeight:500}}>
          Needs a sponsor · {s.village}
        </div>
        <h3 className="serif" style={{fontSize: 'clamp(22px, 2.4vw, 28px)', fontWeight:400, marginTop: 12, lineHeight: 1.2}}>
          {s.headline}
        </h3>
        <div style={{fontSize:14, color:'var(--ink-3)', marginTop: 10}}>
          {s.name}, {s.age} · {s.course} · {s.school}
        </div>
        <p style={{fontSize: 15.5, lineHeight: 1.6, color:'var(--ink-2)', marginTop: 16, maxWidth: 600}}>
          {s.summary}
        </p>
        <div style={{marginTop: 'auto', paddingTop: 22}}>
          <div style={{display:'flex', justifyContent:'space-between', fontSize:13.5, marginBottom:8}}>
            <span><strong style={{fontFamily:'var(--serif)', fontSize:18, color:'var(--ink)'}}>${s.raised.toLocaleString()}</strong> <span style={{color:'var(--ink-3)'}}>of ${s.goal.toLocaleString()}</span></span>
            <span style={{color:'var(--ink-3)'}}>{s.sponsors} sponsors · {Math.round(pct)}% funded</span>
          </div>
          <Progress value={s.raised} max={s.goal} />
          <div style={{display:'flex', gap: 10, marginTop: 18, flexWrap:'wrap'}}>
            <button className="btn btn-primary btn-arrow"
                    onClick={(e) => { e.stopPropagation(); navigate('donate', { fund:'education', id: s.id }); }}>
              Sponsor {s.name}
            </button>
            <button className="btn btn-ghost"
                    onClick={(e) => { e.stopPropagation(); navigate('profile', { id: s.id }); }}>
              Read full story
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function PastStoryCard({ s, navigate }) {
  return (
    <article className="card" style={{display:'grid', gridTemplateColumns:'320px 1fr', gap: 0, background:'var(--bg-2)', borderColor:'var(--line)'}}>
      <div style={{position:'relative', minHeight: 320}}>
        <ImgSlot id={`stories-${s.id}`} h="100%" placeholder={`${s.name} · today`} radius={0} style={{borderRadius:0}} />
        <div style={{position:'absolute', top:14, left:14, display:'flex', gap:6}}>
          <span className="tag" style={{background:'var(--ink)', color:'#FFF8EA', borderColor:'transparent'}}>✓ Success story</span>
          <span className="tag" style={{background:'rgba(255,251,241,0.92)', borderColor:'transparent'}}>{s.tag}</span>
        </div>
      </div>
      <div style={{padding:'28px 32px 28px', display:'flex', flexDirection:'column'}}>
        <div style={{fontSize:11.5, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-3)', fontWeight:500}}>
          {s.role} · {s.village}
        </div>
        <h3 className="serif" style={{fontSize: 'clamp(22px, 2.4vw, 28px)', fontWeight:400, marginTop: 12, lineHeight: 1.2, fontStyle: s.headline.startsWith('"') ? 'italic' : 'normal'}}>
          {s.headline}
        </h3>
        <p style={{fontSize: 15.5, lineHeight: 1.6, color:'var(--ink-2)', marginTop: 16, maxWidth: 600}}>
          {s.summary}
        </p>
        <div style={{marginTop: 'auto', paddingTop: 22, display:'grid', gridTemplateColumns:'1fr 1fr', gap: 24, paddingTop: 24, borderTop:'1px solid var(--line)'}}>
          <div>
            <div style={{fontSize:11, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--ink-3)', marginBottom:6}}>Invested</div>
            <div style={{fontFamily:'var(--serif)', fontSize:18, color:'var(--primary)'}}>{s.invested}</div>
          </div>
          <div>
            <div style={{fontSize:11, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--ink-3)', marginBottom:6}}>Today</div>
            <div style={{fontFamily:'var(--serif)', fontSize:18}}>{s.outcome}</div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Stories({ navigate }) {
  const [filter, setFilter] = useState('all');
  const all = window.STORIES || STUDENT_STORIES;
  const list = all.filter(s => filter === 'all' ? true : s.status === filter);

  return (
    <>
      <StoriesHero navigate={navigate} />
      <StoryFilters filter={filter} setFilter={setFilter} count={list.length} />

      <section style={{padding:'40px 0 80px'}}>
        <div className="container" style={{display:'flex', flexDirection:'column', gap: 20}}>
          {list.map(s => s.status === 'current'
            ? <CurrentStoryCard key={s.id} s={s} navigate={navigate} />
            : <PastStoryCard    key={s.id} s={s} navigate={navigate} />
          )}
        </div>
      </section>

      <Verse text="He has made everything beautiful in its time." cite="Ecclesiastes 3:11" />

      <section className="section" style={{background:'var(--ink)', color:'var(--bg)'}}>
        <div className="narrow text-center">
          <h2 className="serif" style={{color:'var(--bg)', fontSize:'clamp(30px, 4vw, 48px)', lineHeight:1.1, fontWeight:400, letterSpacing:'-0.015em'}}>
            Start the next story.
          </h2>
          <p style={{fontSize:17, color:'rgba(247,241,226,0.72)', marginTop: 22, lineHeight:1.6, maxWidth: 540, margin:'22px auto 0'}}>
            A small group of sponsors, sometimes just three or four, is what carries a student across the finish line.
          </p>
          <div style={{display:'flex', gap:14, justifyContent:'center', marginTop: 36, flexWrap:'wrap'}}>
            <button className="btn btn-primary btn-arrow" onClick={() => navigate('education')}>Browse all students</button>
            <button className="btn btn-outline" onClick={() => navigate('donate')} style={{color:'#FFF8EA', borderColor:'rgba(255,248,234,0.7)'}}>
              Make a donation
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

window.Stories = Stories;
// JSON-loaded data wins; in-file STUDENT_STORIES is the offline fallback.
window.STORIES = window.STORIES || STUDENT_STORIES;
