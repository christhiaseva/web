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
    outcome: 'Working as a nurse. Built the first brick home in her village.',
    tag: 'Healthcare',
  },
  {
    id: 'megana',
    name: 'Megana',
    village: 'Chickaballapur',
    status: 'past',
    role: 'Nurse · graduated 4 years ago',
    headline: 'She was cleaning houses at seven. Today she cares for patients at a hospital.',
    summary: "Megana started attending Sunday school at nine and cleaning houses at seven to support her family. Generous sponsors helped her through nursing college. Four years later, she's a working nurse helping her sister through college.",
    outcome: 'Working nurse · helping her sister through college',
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

function PastStoryCard({ s, navigate, hasDetail }) {
  return (
    <article className="card" style={{display:'grid', gridTemplateColumns:'320px 1fr', gap: 0, background:'var(--bg-2)', borderColor:'var(--line)', cursor: hasDetail ? 'pointer' : 'default'}}
             onClick={hasDetail ? () => navigate('story-detail', { id: s.id }) : undefined}>
      <div style={{position:'relative', minHeight: 320}}>
        {hasDetail && STORY_DETAILS[s.id]?.photo
          ? <img src={STORY_DETAILS[s.id].photo} alt={s.name} style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}} />
          : <ImgSlot id={`stories-${s.id}`} h="100%" placeholder={`${s.name} · today`} radius={0} style={{borderRadius:0}} />
        }
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
        <div style={{marginTop: 'auto', paddingTop: 24, borderTop:'1px solid var(--line)'}}>
          <div style={{fontSize:11, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--ink-3)', marginBottom:6}}>Today</div>
          <div style={{fontFamily:'var(--serif)', fontSize:18}}>{s.outcome}</div>
        </div>
        {hasDetail && (
          <div style={{marginTop: 18}}>
            <span style={{fontSize:14, fontWeight:500, color:'var(--primary)'}}>Read full story →</span>
          </div>
        )}
      </div>
    </article>
  );
}

function Stories({ navigate }) {
  const all = window.STORIES || STUDENT_STORIES;

  return (
    <>
      <Breadcrumb crumbs={[{ label:'Student stories' }]} navigate={navigate} />
      <StoriesHero navigate={navigate} />

      <section style={{padding:'40px 0 80px'}}>
        <div className="container" style={{display:'flex', flexDirection:'column', gap: 20}}>
          {all.map(s => s.status === 'current'
            ? <CurrentStoryCard key={s.id} s={s} navigate={navigate} />
            : <PastStoryCard    key={s.id} s={s} navigate={navigate} hasDetail={!!STORY_DETAILS[s.id]} />
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

// ── Story detail data ─────────────────────
const STORY_DETAILS = {
  silpa: {
    name: 'Silpa',
    village: 'Shidalagatta',
    eyebrow: "Silpa's full story · in Mathew's words",
    headline: <>$200 a year for three years. <em style={{color:'var(--primary)', fontStyle:'italic'}}>A whole new life.</em></>,
    photo: '/images/silpa-story.jpg',
    photoAlt: 'Silpa in her nursing scrubs',
    paragraphs: [
      { style: 'lead', text: "I met Silpa in our church in Shidalagatta when she was eleven years old. She had dropped out of school and was working in the fields all day to take care of her mom, who was an asthma patient. They were living in a hut." },
      { text: "The father had left before Silpa was born. She has never met him. Mary and I took her and her mom under our wings, provided all their needs, and started to send her to school. She had to restart fifth grade." },
      { text: "High school was free at the government school; we only needed to provide her uniform and supplies. She passed with good marks, and we sent her to nursing college." },
      { text: "Eight years ago she graduated and started to work as a nurse. With the help of White Oak Christian Church and her own ability, she built a two-bedroom brick home in her own village for her and her mom.", bold: "the first brick home in that village" },
    ],
    quote: "It was a small amount for us, but a huge investment in Silpa's life. We didn't lose anything \u2014 she gained a new life.",
    quoteAttrib: 'Mathew Mathai, founder',
    stats: [
      { n: '8 yrs', l: 'working as a nurse since' },
      { n: '1', l: 'whole new life · and a house for her mom' },
    ],
    photoSlots: [
      { id: 'silpa-house', placeholder: "Silpa's brick home · the first in her village" },
      { id: 'silpa-mom', placeholder: 'Silpa with her mother' },
    ],
  },
  megana: {
    name: 'Megana',
    village: 'Chickaballapur',
    eyebrow: "Megana's full story · in Mathew's words",
    headline: <>$200 a year for three years. <em style={{color:'var(--primary)', fontStyle:'italic'}}>An investment with great return.</em></>,
    photo: '/images/megana-story.jpg',
    photoAlt: 'Megana in her nursing uniform',
    paragraphs: [
      { style: 'lead', text: "Megana is from Chamrajpet, Chickaballapur. She started attending our Sunday school class when she was nine years old. She comes from a very poor family: just her, her sister, and her sick mother." },
      { text: "She started cleaning other people's houses for a little money when she was seven years old to help provide for the family. We stepped in to help, so that she and her sister could go to school." },
      { text: "She passed high school with very good marks but had no way of going to college. Her mother began talking about arranging a marriage when Megana was fifteen. We discouraged her mother from it." },
      { text: "Generous sponsors agreed to support her through nursing college. Four years ago she graduated, and today she is working in a hospital in Chickaballapur. They moved out of their hut and are renting a small one-bedroom apartment." },
      { text: "When Mary and I were admitted to the hospital with Covid-19 for nineteen days, Megana was the nurse who took care of us. She is now helping her sister go to college too. Looking back, I see God's hand in all of it. His faithfulness in her life, and in ours." },
    ],
    quote: "Just $200 a year for three years has made such an impact in the life of a person and a family. Very little for us, but an investment with great return.",
    quoteAttrib: 'Mathew Mathai, founder',
    stats: [
      { n: '4 yrs', l: 'working as a nurse since' },
      { n: '2', l: 'sisters · both now in school or working' },
    ],
    photoSlots: [
      { id: 'megana-family', placeholder: 'Megana with her sister and mother' },
      { id: 'megana-hospital', placeholder: 'Megana at the hospital' },
    ],
  },
};

function StoryDetail({ id, navigate }) {
  const story = STORY_DETAILS[id];

  if (!story) {
    // Fall back to stories list if no detail page exists for this id
    return <Stories navigate={navigate} />;
  }

  return (
    <>
      <Breadcrumb crumbs={[
        { label:'Student stories', page:'stories' },
        { label: story.name },
      ]} navigate={navigate} />

      <section style={{padding:'40px 0 80px'}}>
        <div className="container">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom: 48, gap: 32, flexWrap:'wrap'}}>
            <div style={{maxWidth: 720}}>
              <Eyebrow primary>{story.eyebrow}</Eyebrow>
              <h1 className="serif" style={{fontSize:'clamp(36px, 4.6vw, 60px)', lineHeight:1.05, marginTop: 18, fontWeight:400, letterSpacing:'-0.015em'}}>
                {story.headline}
              </h1>
            </div>
            <div style={{fontSize:13, color:'var(--ink-3)', letterSpacing:'0.16em', textTransform:'uppercase'}}>
              {story.name} &middot; {story.village}
            </div>
          </div>

          <div className="silpa-grid" style={{display:'grid', gridTemplateColumns:'1fr 1.15fr', gap: 56, alignItems:'flex-start'}}>
            {/* Photo column */}
            <div className="silpa-photos" style={{position:'sticky', top: 92, alignSelf:'flex-start', display:'flex', flexDirection:'column', gap: 12}}>
              <img src={story.photo} alt={story.photoAlt} style={{width:'100%', height:540, objectFit:'cover', borderRadius:16, display:'block'}} />
              {story.photoSlots && (
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12}}>
                  {story.photoSlots.map(slot => (
                    <ImgSlot key={slot.id} id={slot.id} h="180px" placeholder={slot.placeholder} radius={12} />
                  ))}
                </div>
              )}
            </div>

            {/* Story column */}
            <div>
              <Eyebrow primary>{story.eyebrow}</Eyebrow>
              <div style={{marginTop: 24}}></div>
              {story.paragraphs.map((p, i) => (
                <p key={i} className={p.style === 'lead' ? 'serif' : ''}
                   style={p.style === 'lead'
                     ? {fontSize: 24, lineHeight: 1.45, color:'var(--ink)', marginBottom: 28, textWrap:'pretty'}
                     : {fontSize: 17.5, lineHeight: 1.7, color:'var(--ink-2)', marginBottom: 20}
                   }>
                  {p.text}
                  {p.bold && <> <strong style={{color:'var(--ink)', fontWeight:500}}>{p.bold}</strong>.</>}
                </p>
              ))}

              {/* Pull quote */}
              <figure style={{margin:'8px 0 32px', padding:'28px 0', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)'}}>
                <blockquote style={{margin:0, fontFamily:'var(--serif)', fontStyle:'italic', fontSize:'clamp(22px, 2.6vw, 30px)', lineHeight:1.4, color:'var(--ink)', textWrap:'balance'}}>
                  "{story.quote}"
                </blockquote>
                <figcaption style={{marginTop: 16, fontSize:13, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--primary)', fontWeight:500}}>
                  &mdash; {story.quoteAttrib}
                </figcaption>
              </figure>

              {/* Stats */}
              <div style={{display:'grid', gridTemplateColumns:`repeat(${story.stats.length}, 1fr)`, gap: 0, border:'1px solid var(--line)', borderRadius: 12, overflow:'hidden', background:'var(--card)'}}>
                {story.stats.map((s, i) => (
                  <div key={s.l} style={{padding:'24px 22px', borderRight: i < story.stats.length - 1 ? '1px solid var(--line)' : 'none'}}>
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
    </>
  );
}

window.Stories = Stories;
window.StoryDetail = StoryDetail;
// JSON-loaded data wins; in-file STUDENT_STORIES is the offline fallback.
window.STORIES = window.STORIES || STUDENT_STORIES;
