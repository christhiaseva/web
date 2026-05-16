// profile.jsx — Single-student detail page

function StudentProfile({ id, navigate }) {
  const s = (window.STUDENTS || []).find(x => x.id === id) || (window.STUDENTS || [])[0];
  if (!s) return null;

  // Long-form story per student (a sample for Priya, generic for others)
  const stories = {
    priya: {
      tagline: 'Priya wants to be the first nurse from her village.',
      paras: [
        "Priya is the eldest of three sisters. Her father picks cotton during the season and rents auto-rickshaws when there is no work. Her mother stitches blouses at home for the women in their colony.",
        "When Priya was eleven, an aunt was lost during childbirth, three hours from the nearest hospital, with no one trained to help. That night, Priya told her mother she would become a nurse.",
        "She finished tenth standard at the top of her class. The Government Nursing College in Bangalore accepted her this year, but the tuition, hostel, and books come to ₹2,00,000 over four years, about $2,400. Her family has saved what they can. The mission is helping her with the rest, alongside sponsors like you.",
        "Priya joins us each Sunday at the Chintamani home church. She has been baptized, and prays often that her work as a nurse would be a way to love her village in Jesus' name.",
      ],
      verse: 'Romans 12:11',
      verseText: 'Never be lacking in zeal, but keep your spiritual fervor, serving the Lord.'
    }
  };
  const story = stories[s.id] || {
    tagline: `${s.name} is studying ${s.course} and needs help to finish.`,
    paras: [
      `${s.name} comes from ${s.village}, where ${s.name === 'Arjun' ? 'his' : 'her'} family works hard but cannot meet the cost of the program ahead.`,
      `${s.name} has already been accepted into ${s.school}. The mission has known this family for many years through our home church there. With a small group of sponsors, ${s.name === 'Arjun' || s.name === 'David' || s.name === 'Samuel' || s.name === 'Thomas' ? 'he' : 'she'} can begin classes this term.`,
      `Education is one of the most enduring ways the Gospel changes a family's trajectory, bringing dignity, opportunity, and a future to the next generation.`,
    ],
    verse: 'Jeremiah 29:11',
    verseText: 'For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.'
  };

  const updates = [
    { d:'Aug 2025', t:'Acceptance letter received', body:`${s.name} was accepted into ${s.school} for the upcoming term.` },
    { d:'Sep 2025', t:'Tuition partially paid', body:`First semester tuition has been deposited from sponsor gifts.` },
    { d:'Oct 2025', t:'Started classes', body:`${s.name} began coursework. First academic report expected at end of term.` },
  ];

  return (
    <>
      <Breadcrumb crumbs={[
        { label:'Sponsor a student', page:'education' },
        { label: s.name },
      ]} navigate={navigate} />

      {/* Hero */}
      <section style={{padding:'40px 0 60px'}}>
        <div className="container" style={{display:'grid', gridTemplateColumns:'1.1fr 1fr', gap: 64, alignItems:'flex-start'}}>
          <div className="profile-hero-photo-desktop" style={{position:'sticky', top: 92, alignSelf:'flex-start'}}>
            <StudentPhoto src={s.photo} alt={s.name} style={{borderRadius:16, height:640}} />
          </div>

          <div>
            <div className="profile-hero-mobile" style={{gap: 16, marginBottom: 20, alignItems:'center'}}>
              <div style={{width:104, height:104, borderRadius:14, overflow:'hidden', flexShrink:0}}>
                <StudentPhoto src={s.photo} alt={s.name} />
              </div>
              <div style={{minWidth:0}}>
                <h1 className="serif" style={{fontSize: 26, lineHeight:1.1, fontWeight:400, letterSpacing:'-0.015em', margin:0}}>
                  {s.name}
                </h1>
                <p className="serif" style={{fontStyle:'italic', fontSize: 15.5, color:'var(--ink-2)', marginTop: 6, marginBottom: 0, lineHeight:1.4}}>
                  {story.tagline}
                </p>
              </div>
            </div>
            <h1 className="profile-hero-name-desktop serif" style={{fontSize:'clamp(36px, 4.6vw, 60px)', lineHeight:1.05, marginTop: 22, fontWeight:400, letterSpacing:'-0.015em'}}>
              {s.name}
            </h1>
            <p className="profile-hero-name-desktop serif" style={{fontStyle:'italic', fontSize: 22, color:'var(--ink-2)', marginTop: 16, lineHeight:1.4, maxWidth: 520}}>
              {story.tagline}
            </p>

            <div style={{marginTop: 36, padding:'20px 0', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)', display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 24}}>
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
            </div>

            {/* Sponsorship card */}
            <div className="card" style={{marginTop: 32, padding:'28px 28px 28px', background:'var(--card)'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                <div>
                  <div style={{fontFamily:'var(--serif)', fontSize: 32}}>${s.goal.toLocaleString()}</div>
                  <div style={{fontSize:13.5, color:'var(--ink-3)', marginTop:2}}>per year</div>
                </div>
                <div style={{textAlign:'right'}}>
                  {s.sponsored
                    ? <span className="tag" style={{background:'var(--ink)', color:'#FFF8EA', borderColor:'transparent'}}>Sponsored</span>
                    : <span className="tag tag-primary">Needs a sponsor</span>}
                </div>
              </div>
              {!s.sponsored && (
                <>
                  <button className="btn btn-primary btn-arrow"
                          style={{marginTop: 24, width:'100%', justifyContent:'center', fontSize: 16, padding:'16px 22px'}}
                          onClick={() => navigate('donate', { fund:'education', id: s.id })}>
                    Sponsor {s.name}
                  </button>
                  <div style={{textAlign:'center', fontSize: 13, color:'var(--ink-3)', marginTop: 14}}>
                    100% goes to tuition. <a style={{cursor:'pointer', color:'var(--primary)', textDecoration:'underline'}}>Tax-deductible</a>.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section style={{padding:'40px 0 80px', background:'var(--bg-2)', borderTop:'1px solid var(--line-soft)'}}>
        <div className="narrow">
          <p style={{fontFamily:'var(--serif)', fontSize:22, lineHeight:1.45, color:'var(--ink)', marginBottom:32, fontWeight:400}}>
            {s.name} comes from the town of {s.village} and is studying {s.course} at {s.school}.
          </p>
          <Eyebrow primary>In {s.name}'s words</Eyebrow>
          <div style={{marginTop: 32}}>
            {s.why_assistance && (
              <>
                <p style={{fontStyle:'italic', fontSize:15, color:'var(--ink-3)', marginTop:28, marginBottom:10}}>Why are you applying for sponsorship?</p>
                <p style={{fontFamily:'var(--sans)', fontSize:17.5, lineHeight:1.7, color:'var(--ink-2)', marginBottom:24, fontWeight:400}}>
                  {s.why_assistance}
                </p>
              </>
            )}
            {s.testimony && (
              <>
                <p style={{fontStyle:'italic', fontSize:15, color:'var(--ink-3)', marginTop:28, marginBottom:10}}>How did you come to know Jesus?</p>
                <p style={{fontFamily:'var(--sans)', fontSize:17.5, lineHeight:1.7, color:'var(--ink-2)', marginBottom:24, fontWeight:400}}>
                  {s.testimony}
                </p>
              </>
            )}
          </div>

          <div style={{marginTop: 56, padding:'40px 0', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)', textAlign:'center'}}>
            <p className="verse">"{story.verseText}"</p>
            <span className="verse-cite">{story.verse}</span>
          </div>
        </div>
      </section>

      {/* Updates */}
      <section style={{padding:'80px 0'}}>
        <div className="narrow">
          <Eyebrow primary>Updates</Eyebrow>
          <h2 className="serif" style={{fontSize:'clamp(28px, 3.4vw, 38px)', marginTop: 18, marginBottom: 36, fontWeight:400}}>
            How {s.name}'s journey is unfolding.
          </h2>
          <div>
            {updates.map((u, i) => (
              <div key={i} style={{display:'grid', gridTemplateColumns:'120px 1fr', gap: 24, padding:'24px 0', borderTop: i === 0 ? '1px solid var(--line)' : 'none', borderBottom:'1px solid var(--line)'}}>
                <div style={{fontFamily:'var(--serif)', fontSize: 16, color:'var(--primary)'}}>{u.d}</div>
                <div>
                  <h4 className="serif" style={{fontSize: 19, fontWeight:400, marginBottom: 6}}>{u.t}</h4>
                  <p style={{color:'var(--ink-2)', fontSize:15.5, lineHeight:1.6}}>{u.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{marginTop: 40, fontSize: 14.5, color:'var(--ink-3)', fontStyle:'italic'}}>
            Sponsors receive these updates by email, plus a personal letter from {s.name} once per academic year.
          </div>
        </div>
      </section>

      {/* Other students */}
      <section style={{padding:'40px 0 100px', background:'var(--bg-2)', borderTop:'1px solid var(--line-soft)'}}>
        <div className="container">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom: 32}}>
            <div>
              <Eyebrow primary>Other students</Eyebrow>
              <h2 className="serif" style={{fontSize:'clamp(24px, 2.8vw, 32px)', marginTop: 14, fontWeight:400}}>
                Also looking for sponsors
              </h2>
            </div>
            <button className="btn btn-ghost btn-arrow" onClick={() => navigate('education')}>See all students</button>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 20}}>
            {(window.STUDENTS || []).filter(x => x.id !== s.id && !x.sponsored).slice(0, 3).map(o => (
                <div key={o.id} className="card" style={{padding:'22px 24px', cursor:'pointer'}} onClick={() => navigate('profile', {id: o.id})}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, flexWrap:'wrap'}}>
                    <div style={{display:'flex', alignItems:'center', gap:10, minWidth:0}}>
                      {o.photo && (
                        <img src={o.photo} alt={o.name}
                             style={{width:32, height:32, borderRadius:'50%', objectFit:'cover', flexShrink:0, display:'block'}} />
                      )}
                      <div style={{fontFamily:'var(--serif)', fontSize:22, fontWeight:400}}>{o.name}</div>
                    </div>
                    <span style={{fontSize:13.5, color:'var(--ink-3)'}}>{o.course}</span>
                  </div>
                  {o.intro && <p style={{fontSize:15, color:'var(--ink-2)', marginTop:10, lineHeight:1.55}}>{o.intro}</p>}
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:14}}>
                    <span style={{fontFamily:'var(--serif)', fontSize:16, color:'var(--ink-2)'}}>${o.goal.toLocaleString()}/year</span>
                    <span style={{fontSize:14, fontWeight:500, color:'var(--primary)'}}>Read more →</span>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

window.StudentProfile = StudentProfile;
