// featured-student.jsx — Featured Student page (random selection from student list)

function FeaturedStudent({ navigate }) {
  // Pick a random unsponsored student once per page load; fall back to any student
  const [student] = useState(() => {
    const all = window.STUDENTS || [];
    const pool = all.filter(s => !s.sponsored);
    const src  = pool.length > 0 ? pool : all;
    if (!src.length) return null;
    return src[Math.floor(Math.random() * src.length)];
  });

  const [refreshKey, setRefreshKey] = useState(0);

  // Allow visitor to shuffle to a different student
  function shuffle() {
    setRefreshKey(k => k + 1);
  }

  // Re-pick when refreshKey changes (after first render)
  const [displayed, setDisplayed] = useState(student);
  useEffect(() => {
    if (refreshKey === 0) return;
    const all  = window.STUDENTS || [];
    const pool = all.filter(s => !s.sponsored && s.id !== (displayed && displayed.id));
    const src  = pool.length > 0 ? pool : all.filter(s => s.id !== (displayed && displayed.id));
    if (!src.length) return;
    setDisplayed(src[Math.floor(Math.random() * src.length)]);
  }, [refreshKey]);

  const s = displayed;
  if (!s) {
    return (
      <section style={{padding:'80px 0', minHeight:'60vh'}}>
        <div className="narrow">
          <p style={{color:'var(--ink-3)'}}>No students found.</p>
          <button className="btn btn-ghost" onClick={() => navigate('education')}>Browse students</button>
        </div>
      </section>
    );
  }

  const verseText  = 'Train up a child in the way he should go; even when he is old he will not depart from it.';
  const verseCite  = 'Proverbs 22:6';

  return (
    <>
      <Breadcrumb crumbs={[
        { label: 'Sponsor a Student', page: 'education' },
        { label: 'Featured Student' },
      ]} navigate={navigate} />

      {/* Hero */}
      <section style={{padding:'40px 0 60px'}}>
        <div className="container" style={{display:'grid', gridTemplateColumns:'1.1fr 1fr', gap: 64, alignItems:'flex-start'}}>
          {/* Photo — sticky on desktop */}
          <div className="profile-hero-photo-desktop"
               style={{position:'sticky', top: 92, alignSelf:'flex-start'}}>
            <StudentPhoto src={s.photo} alt={s.name}
                          style={{borderRadius:16, height:640, width:'100%', objectFit:'cover', display:'block'}} />
          </div>

          <div>
            {/* Mobile: small photo + name inline */}
            <div className="profile-hero-mobile" style={{gap:16, marginBottom:20, alignItems:'center'}}>
              <div style={{width:104, height:104, borderRadius:14, overflow:'hidden', flexShrink:0}}>
                <StudentPhoto src={s.photo} alt={s.name} />
              </div>
              <div style={{minWidth:0}}>
                <div style={{fontSize:11, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--primary)', fontWeight:500, marginBottom:6}}>
                  Featured Student
                </div>
                <h1 className="serif" style={{fontSize:26, lineHeight:1.1, fontWeight:400, letterSpacing:'-0.015em', margin:0}}>
                  {s.name}
                </h1>
              </div>
            </div>

            {/* Desktop heading */}
            <div className="profile-hero-name-desktop">
              <Eyebrow primary>Featured Student</Eyebrow>
              <h1 className="serif" style={{fontSize:'clamp(36px, 4.6vw, 60px)', lineHeight:1.05, marginTop:22, fontWeight:400, letterSpacing:'-0.015em'}}>
                {s.name}
              </h1>
              {s.intro && (
                <p className="serif" style={{fontStyle:'italic', fontSize:22, color:'var(--ink-2)', marginTop:16, lineHeight:1.4, maxWidth:520}}>
                  {s.intro}
                </p>
              )}
            </div>

            {/* Details row */}
            <div style={{marginTop:36, padding:'20px 0', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)', display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:24}}>
              <div>
                <div style={{fontSize:11.5, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--ink-3)', marginBottom:6}}>Studying</div>
                <div style={{fontFamily:'var(--serif)', fontSize:18}}>{s.course}</div>
                <div style={{fontSize:13.5, color:'var(--ink-2)', marginTop:2}}>{s.school}</div>
              </div>
              <div>
                <div style={{fontSize:11.5, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--ink-3)', marginBottom:6}}>Home</div>
                <div style={{fontFamily:'var(--serif)', fontSize:18}}>{s.village}</div>
                <div style={{fontSize:13.5, color:'var(--ink-2)', marginTop:2}}>Karnataka, India</div>
              </div>
              {s.tag && (
                <div>
                  <div style={{fontSize:11.5, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--ink-3)', marginBottom:6}}>Field</div>
                  <span className="tag tag-primary">{s.tag}</span>
                </div>
              )}
            </div>

            {/* Sponsorship card */}
            <div className="card" style={{marginTop:32, padding:'28px', background:'var(--card)'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                <div>
                  <div style={{fontFamily:'var(--serif)', fontSize:32}}>${s.goal.toLocaleString()}</div>
                  <div style={{fontSize:13.5, color:'var(--ink-3)', marginTop:2}}>per year</div>
                </div>
                <div>
                  {s.sponsored
                    ? <span className="tag" style={{background:'var(--ink)', color:'#FFF8EA', borderColor:'transparent'}}>Sponsored</span>
                    : <span className="tag tag-primary">Needs a sponsor</span>}
                </div>
              </div>
              {!s.sponsored && (
                <>
                  <button className="btn btn-primary btn-arrow"
                          style={{marginTop:24, width:'100%', justifyContent:'center', fontSize:16, padding:'16px 22px'}}
                          onClick={() => navigate('donate', { fund:'education', id: s.id })}>
                    Sponsor {s.name}
                  </button>
                  <div style={{textAlign:'center', fontSize:13, color:'var(--ink-3)', marginTop:14}}>
                    100% goes to tuition. Tax-deductible.
                  </div>
                </>
              )}
            </div>

            {/* Shuffle button */}
            <div style={{marginTop:16, textAlign:'center'}}>
              <button onClick={shuffle}
                      style={{appearance:'none', background:'none', border:'none', cursor:'pointer', fontSize:14, color:'var(--ink-3)', textDecoration:'underline', padding:'8px 0'}}>
                Show me a different student →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section style={{padding:'40px 0 80px', background:'var(--bg-2)', borderTop:'1px solid var(--line-soft)'}}>
        <div className="narrow">
          <p style={{fontFamily:'var(--serif)', fontSize:22, lineHeight:1.45, color:'var(--ink)', marginBottom:32, fontWeight:400}}>
            {s.name} comes from the town of {s.village} and is studying {s.course} at {s.school}.
          </p>

          {(s.why_assistance || s.testimony) && (
            <>
              <Eyebrow primary>In {s.name}'s words</Eyebrow>
              <div style={{marginTop:32}}>
                {s.why_assistance && (
                  <>
                    <p style={{fontStyle:'italic', fontSize:15, color:'var(--ink-3)', marginTop:28, marginBottom:10}}>
                      Why are you applying for sponsorship?
                    </p>
                    <p style={{fontSize:17.5, lineHeight:1.7, color:'var(--ink-2)', marginBottom:24}}>
                      {s.why_assistance}
                    </p>
                  </>
                )}
                {s.testimony && (
                  <>
                    <p style={{fontStyle:'italic', fontSize:15, color:'var(--ink-3)', marginTop:28, marginBottom:10}}>
                      How did you come to know Jesus?
                    </p>
                    <p style={{fontSize:17.5, lineHeight:1.7, color:'var(--ink-2)', marginBottom:24}}>
                      {s.testimony}
                    </p>
                  </>
                )}
              </div>
            </>
          )}

          <div style={{marginTop:56, padding:'40px 0', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)', textAlign:'center'}}>
            <p className="verse">"{verseText}"</p>
            <span className="verse-cite">{verseCite}</span>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="section" style={{background:'var(--ink)', color:'var(--bg)'}}>
        <div className="narrow text-center">
          <h2 className="serif" style={{color:'var(--bg)', fontSize:'clamp(30px, 4vw, 48px)', lineHeight:1.1, fontWeight:400, letterSpacing:'-0.015em'}}>
            One sponsor changes everything.
          </h2>
          <p style={{fontSize:17, color:'rgba(247,241,226,0.72)', marginTop:22, lineHeight:1.6, maxWidth:540, margin:'22px auto 0'}}>
            $200 a year is all it takes to walk alongside a student through their entire program.
          </p>
          <div style={{display:'flex', gap:14, justifyContent:'center', marginTop:36, flexWrap:'wrap'}}>
            {!s.sponsored && (
              <button className="btn btn-primary btn-arrow"
                      onClick={() => navigate('donate', { fund:'education', id: s.id })}>
                Sponsor {s.name}
              </button>
            )}
            <button className="btn btn-outline"
                    onClick={() => navigate('education')}
                    style={{color:'#FFF8EA', borderColor:'rgba(255,248,234,0.7)'}}>
              Browse all students
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

window.FeaturedStudent = FeaturedStudent;
