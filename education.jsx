// education.jsx — Browse students (Watsi-style)

// Single-sponsor model: one sponsor per student at $200/year (or $17/mo recurring).
const STUDENT_GOAL = 200;
const STUDENTS = [
  { id:'priya',    name:'Priya',    course:'B.Sc. Nursing',          school:'Govt Nursing College, Bangalore', village:'Chintamani',     goal:STUDENT_GOAL, sponsored:false, days:14, tag:'Healthcare' },
  { id:'arjun',    name:'Arjun',    course:'Diploma · Mechanic',     school:'ITI Chickaballapur',              village:'Bagepalli',      goal:STUDENT_GOAL, sponsored:false, days:22, tag:'Trade' },
  { id:'lakshmi',  name:'Lakshmi',  course:'B.Com',                  school:'Bangalore University',            village:'Chickaballapur', goal:STUDENT_GOAL, sponsored:true,  days:0,  tag:'Business' },
  { id:'samuel',   name:'Samuel',   course:'B.A. Theology',          school:'Bible College, Bangalore',        village:'Gowribindanur',  goal:STUDENT_GOAL, sponsored:false, days:30, tag:'Ministry' },
  { id:'meena',    name:'Meena',    course:'B.Sc. Computer Science', school:'Govt Engineering College',        village:'Gudibande',      goal:STUDENT_GOAL, sponsored:false, days:18, tag:'Technology' },
  { id:'david',    name:'David',    course:'Diploma · Electrician',  school:'ITI Chintamani',                  village:'Peresandra',     goal:STUDENT_GOAL, sponsored:false, days:28, tag:'Trade' },
  { id:'asha',     name:'Asha',     course:'B.Ed (Teaching)',        school:'Sri Sathya Sai College',          village:'Chelur',         goal:STUDENT_GOAL, sponsored:true,  days:0,  tag:'Education' },
  { id:'thomas',   name:'Thomas',   course:'B.Sc. Agriculture',      school:'UAS Bangalore',                   village:'Devaganhalli',   goal:STUDENT_GOAL, sponsored:false, days:24, tag:'Agriculture' },
];

const STUDENT_TAGS = ['All', 'Healthcare', 'Trade', 'Business', 'Ministry', 'Technology', 'Education', 'Agriculture'];

function StudentCard({ s, navigate }) {
  const isUrgent = s.days > 0 && s.days <= 10;
  return (
    <article className="card" style={{display:'flex', flexDirection:'column', cursor:'pointer', transition:'transform .15s ease, box-shadow .2s ease'}}
             onClick={() => navigate('profile', { id: s.id })}
             onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 14px 40px rgba(42,32,20,0.10)';}}
             onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='';}}>
      <div style={{position:'relative', aspectRatio:'4/3', display:'flex', alignItems:'center', justifyContent:'center', padding:'24px 22px', background:'var(--bg-2)'}}>
        {s.intro && <p style={{fontFamily:'var(--serif)', fontSize:32, fontStyle:'italic', color:'var(--primary)', lineHeight:1.2, margin:0, textAlign:'center'}}>{s.intro}</p>}
        <div style={{position:'absolute', top:14, left:14}}>
          <span className="tag tag-primary" style={{background:'rgba(255,251,241,0.92)', borderColor:'transparent'}}>{s.tag}</span>
        </div>
        {isUrgent && (
          <div style={{position:'absolute', top:14, right:14}}>
            <span className="tag" style={{background:'var(--primary)', color:'#FFF8EA', borderColor:'transparent'}}>{s.days} days left</span>
          </div>
        )}
        {s.sponsored && (
          <div style={{position:'absolute', top:14, right:14}}>
            <span className="tag" style={{background:'var(--ink)', color:'#FFF8EA', borderColor:'transparent'}}>Sponsored</span>
          </div>
        )}
      </div>
      <div style={{padding:'22px 22px 24px', display:'flex', flexDirection:'column', flex:1}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:12}}>
          <h3 className="serif" style={{fontSize: 24, fontWeight:400}}>{s.name}</h3>
          <span style={{fontSize:12.5, color:'var(--ink-3)'}}>{s.village}</span>
        </div>
        <div style={{fontSize:14, color:'var(--ink-2)', marginTop:6}}>{s.course}</div>
        <div style={{fontSize:13, color:'var(--ink-3)', marginTop:3}}>{s.school}</div>

        <div style={{marginTop: 'auto', paddingTop: 22, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <span style={{fontSize:14, color:'var(--ink-2)'}}>${s.goal.toLocaleString()}/year</span>
          {!s.sponsored && <span style={{fontSize:14, fontWeight:500, color:'var(--primary)'}}>Sponsor {s.name} →</span>}
        </div>
      </div>
    </article>
  );
}

function HowItWorks() {
  const steps = [
    { n:'01', t:'Browse students', d:'Each student has a profile, story, and a transparent goal.' },
    { n:'02', t:'Choose someone to sponsor', d:'One sponsor, one student. $200 covers tuition for the year.' },
    { n:'03', t:'Receive updates', d:'Get letters, photos, and academic reports every term.' },
    { n:'04', t:'Watch a life change', d:'When they graduate, you celebrate alongside them.' },
  ];
  return (
    <section style={{background:'var(--bg-2)', borderTop:'1px solid var(--line-soft)', borderBottom:'1px solid var(--line-soft)', padding:'72px 0'}}>
      <div className="container">
        <Eyebrow primary>How it works</Eyebrow>
        <h2 className="serif" style={{fontSize:'clamp(28px, 3.4vw, 38px)', marginTop:18, marginBottom:48, fontWeight:400, maxWidth: 720, lineHeight:1.15}}>
          Direct sponsorship. Real students. Full transparency.
        </h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 32}}>
          {steps.map(s => (
            <div key={s.n}>
              <div style={{fontFamily:'var(--serif)', fontSize: 14, color:'var(--primary)', letterSpacing:'0.04em'}}>{s.n}</div>
              <div style={{height: 1, background:'var(--line)', margin:'14px 0 18px'}}></div>
              <h4 className="serif" style={{fontSize: 20, fontWeight:400, marginBottom: 8}}>{s.t}</h4>
              <p style={{fontSize: 14.5, color:'var(--ink-2)', lineHeight:1.55}}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education({ navigate }) {
  const all = window.STUDENTS || STUDENTS;

  return (
    <>
      {/* Header */}
      <section style={{padding:'56px 0 32px'}}>
        <div className="container">
          <Eyebrow primary>Education · Sponsor a student</Eyebrow>
          <h1 className="serif" style={{fontSize:'clamp(40px, 5.4vw, 72px)', lineHeight:1.04, marginTop: 22, fontWeight:400, letterSpacing:'-0.015em', maxWidth: 1000}}>
            Choose a student. <em style={{fontStyle:'italic', color:'var(--primary)'}}>Send them to school.</em>
          </h1>
          <p style={{fontSize:19, color:'var(--ink-2)', marginTop: 26, maxWidth: 720, lineHeight:1.55}}>
            These eight students need help paying for the program ahead of them. Their families have already sacrificed to get them here. A small group of sponsors (sometimes just three or four people) can carry them across the finish line.
          </p>
          <div style={{marginTop: 28, display:'flex', alignItems:'center', gap: 14, flexWrap:'wrap'}}>
            <a onClick={() => navigate('stories')}
               style={{cursor:'pointer', fontSize: 15, color:'var(--primary)', fontWeight:500, borderBottom:'1px solid var(--primary)', paddingBottom: 2}}>
              Read student stories: past graduates and current sponsorships →
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{padding:'24px 0 24px', borderTop:'1px solid var(--line-soft)', borderBottom:'1px solid var(--line-soft)', background:'var(--bg-2)'}}>
        <div className="container" style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 32}}>
          {[
            {n:'200+', l:'students supported since 2003'},
            {n:'94%',  l:'graduation rate'},
            {n:'$1,650', l:'average annual cost'},
            {n:'100%', l:'goes directly to tuition'},
          ].map(s => (
            <div key={s.l} style={{padding:'12px 0'}}>
              <div style={{fontFamily:'var(--serif)', fontSize: 32, color:'var(--primary)'}}>{s.n}</div>
              <div style={{fontSize:13, color:'var(--ink-3)', marginTop:4}}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section style={{paddingBottom: 80}}>
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap: 24}}>
            {all.map(s => <StudentCard key={s.id} s={s} navigate={navigate} />)}
          </div>
        </div>
      </section>

      <HowItWorks />

      <Verse text="Train up a child in the way he should go; even when he is old he will not depart from it." cite="Proverbs 22:6" />
    </>
  );
}

// JSON-loaded data wins; in-file STUDENTS is the offline fallback.
window.STUDENTS = window.STUDENTS || STUDENTS;
window.Education = Education;
