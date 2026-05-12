// story.jsx — Our Story (Mathew & Mary's journey)

function StoryHero() {
  return (
    <section style={{padding:'56px 0 72px'}}>
      <div className="container">
        <Eyebrow primary>Our story · since 1980</Eyebrow>
        <h1 className="serif" style={{fontSize:'clamp(44px, 6vw, 84px)', lineHeight:1.0, marginTop: 22, fontWeight:400, letterSpacing:'-0.02em', maxWidth: 1100}}>
          A briefcase. <em style={{fontStyle:'italic', color:'var(--primary)'}}>An intersection.</em><br/>
          And a bus that turned around.
        </h1>
        <p style={{fontSize: 20, color:'var(--ink-2)', marginTop: 32, maxWidth: 720, lineHeight:1.55}}>
          The story of Christhia Seva Mission begins with a young couple, a long journey, and a plan that fell apart, only to be rebuilt by God, mile by mile, into something they never could have engineered themselves.
        </p>
      </div>
    </section>
  );
}

function StoryHeroPhoto() {
  return (
    <section style={{padding:'0 0 32px'}}>
      <div className="container">
        <div style={{position:'relative', borderRadius:'var(--r-lg)', overflow:'hidden'}}>
          <img src="/images/story-mathew-mary-john.jpg" alt="Mathew, Mary, John and their children at a beach in India" style={{width:'100%', height:520, objectFit:'cover', borderRadius:20, display:'block'}} />
          <div style={{position:'absolute', left: 32, bottom: 28, padding:'14px 20px', background:'rgba(247,241,226,0.92)', borderRadius:8, fontSize: 13.5, color:'var(--ink-2)', maxWidth: 520, backdropFilter:'blur(6px)'}}>
            Mathew, Mary, Mathew's brother John and their 3 children Cecil, Suja and Jaisen at a beach in India. John was part of the mission from the beginning until his death in 2023.
          </div>
        </div>
      </div>
    </section>
  );
}

// Pull-quote with attribution
function Pull({ children, who }) {
  return (
    <figure style={{margin:'40px 0', padding:'32px 0', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)'}}>
      <blockquote style={{margin: 0, fontFamily:'var(--serif)', fontStyle:'italic', fontSize:'clamp(22px, 2.6vw, 30px)', lineHeight:1.4, color:'var(--ink)', textWrap:'balance'}}>
        "{children}"
      </blockquote>
      {who && <figcaption style={{marginTop: 16, fontSize: 13, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--primary)', fontWeight:500}}>— {who}</figcaption>}
    </figure>
  );
}

function ChapterHeader({ num, title }) {
  return (
    <div style={{margin:'80px 0 28px', display:'flex', alignItems:'baseline', gap: 24}}>
      <span style={{fontFamily:'var(--serif)', fontSize: 14, color:'var(--primary)', letterSpacing:'0.04em', flexShrink:0}}>{num}</span>
      <div style={{height:1, background:'var(--line)', flex:1, marginTop:'auto', marginBottom: 8}}></div>
      <h2 className="serif" style={{fontSize:'clamp(28px, 3.4vw, 40px)', fontWeight:400, lineHeight:1.15, letterSpacing:'-0.01em', textAlign:'right', maxWidth: '70%'}}>
        {title}
      </h2>
    </div>
  );
}

const proseStyle = { fontSize: 18, lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 22 };
const dropStyle = {
  fontFamily: 'var(--serif)', fontSize: 64, lineHeight: 0.85,
  float: 'left', padding: '6px 14px 0 0', color: 'var(--primary)',
  fontWeight: 400,
};

function StoryProse() {
  return (
    <section style={{paddingBottom: 40}}>
      <div className="narrow">
        <ChapterHeader num="Chapter I" title="Mathew &amp; Mary's plan" />

        <p style={proseStyle}>
          <span style={dropStyle}>K</span>nowing where they would settle and work in India seemed like a foregone conclusion. Mathew and Mary Mathai had done their homework. They chose a place with good weather, good educational opportunities, and a place to raise a family.
        </p>

        <Pull who="Mathew">
          I was already supporting my cousin, K Mathai. We had sent him to the state of Andhra to learn the language and prepare for our coming.
        </Pull>

        <p style={proseStyle}>
          The Mathai family (with kids Cecil, Suja, and Jaisen) arrived in May of 1980. Mary went to Kerala to settle their oldest two children, Cecil and Suja, in boarding school while Mathew went on to Andhra. That's when the plan hit a snag.
        </p>

        <Pull who="Mathew">
          I was amazed when I got there and learned that any Christian denomination you could name was already established.
        </Pull>

        <p style={proseStyle}>
          Somewhat discouraged but not disheartened, Mathew went to another city. He stayed a week and visited surrounding villages, but heard the same story. Then a friend of his, a preacher, told Mathew about the state of Karnataka. It was a place where doing ministry work was difficult, but the opportunities were plentiful.
        </p>

        <ChapterHeader num="Chapter II" title="An interesting journey into Chikkaballapur" />

        <Pull who="Mathew">
          What happened next was truly an act of God.
        </Pull>

        <p style={proseStyle}>
          Mathew contacted a minister in Bangalore and they arranged for a visit. He took a bus but didn't have clear directions to the man's house. Fortunately the conductor knew some English and was helpful. This was normally a non-stop bus, but the conductor asked the driver to make an exception. They stopped at an intersection, and the conductor told Mathew that he should be able to find it from there.
        </p>

        <p style={proseStyle}>
          Not knowing the language, Mathew simply stood in the middle of the intersection with a briefcase, wondering what to do next. To his surprise, he looked down the road to see the bus come to a stop and then turn around and come back. <em>This sort of thing never happens in India.</em> The conductor personally helped Mathew find the minister's house.
        </p>

        {/* Inline visual break */}
        <div style={{margin:'40px 0', display:'grid', gridTemplateColumns:'1fr 1fr', gap: 14}}>
          <ImgSlot id="story-bus" h="280px" placeholder="bus / road / intersection" radius={12} />
          <ImgSlot id="story-briefcase" h="280px" placeholder="village / Karnataka countryside" radius={12} />
        </div>

        <ChapterHeader num="Chapter III" title="Mrs. Solomon's crucial help" />

        <p style={proseStyle}>
          Mathew realized immediately that this minister was the key to his next step. The two talked about the possibilities for ministry, and the minister suggested Mathew visit the town of Chikkaballapur. There he met a Christian widow named <strong style={{color:'var(--ink)', fontWeight:500}}>Mrs. Solomon</strong>. She had been a school teacher and spoke English. Over the course of the next week, Mathew shared his dream with her. She was excited. She felt this was the opportunity she herself had been waiting for.
        </p>

        <Pull who="Mathew">
          That's how I put my feet in Chikkaballapur.
        </Pull>

        <div style={{margin:'40px 0'}}>
          <img src="/images/story-mathew-mrs-solomon.jpg" alt="Mathew and Mrs. Solomon" style={{width:'100%', borderRadius:12, display:'block'}} />
          <p style={{fontSize:13, color:'var(--ink-3)', fontStyle:'italic', marginTop:10, textAlign:'center'}}>Mathew and Mrs. Solomon at the mission house in 1982</p>
        </div>

        <p style={proseStyle}>
          That was just the beginning. Through Mrs. Solomon, Mathew began to meet many influential people in the town. It seemed everyone had been her student at one time or another.
        </p>

        <p style={proseStyle}>
          Mrs. Solomon had great insight. She realized they were going to have to lay some groundwork before they earned the right to share the Gospel, and the easiest way to do that was by meeting needs. It quickly became evident to them that the biggest need in the villages was access to medical care.
        </p>

        <p style={proseStyle}>
          So that's where they began.
        </p>

        <div style={{margin:'40px 0'}}>
          <img src="/images/story-mathew-field.jpg" alt="Mathew at the location of a new church plant" style={{width:'100%', borderRadius:12, display:'block'}} />
          <p style={{fontSize:13, color:'var(--ink-3)', fontStyle:'italic', marginTop:10, textAlign:'center'}}>Mathew at the location of a new church plant</p>
        </div>
      </div>
    </section>
  );
}

function StoryVerse() {
  return (
    <section style={{background:'var(--bg-2)', borderTop:'1px solid var(--line-soft)', borderBottom:'1px solid var(--line-soft)', padding:'80px 0'}}>
      <div className="narrow text-center">
        <p className="verse">
          "The heart of man plans his way, but the Lord establishes his steps."
        </p>
        <span className="verse-cite">Proverbs 16:9</span>
      </div>
    </section>
  );
}

function StoryStats() {
  return (
    <section className="section">
      <SectionHeader
        eyebrow="46 years on"
        title="Where the work stands today."
        sub="What started in one intersection in Karnataka has grown into a multi-state mission across southern India."
      />
      <div className="container" style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 24}}>
        {[
          {n:'1980', l:'Year the mission began'},
          {n:'14',   l:'Churches planted'},
          {n:'200+', l:'Students supported'},
          {n:'1,200+', l:'In worship weekly'},
        ].map(s => (
          <div key={s.l} className="card" style={{padding:'32px 28px'}}>
            <div style={{fontFamily:'var(--serif)', fontSize: 44, color:'var(--primary)', lineHeight: 1}}>{s.n}</div>
            <div style={{fontSize:14, color:'var(--ink-2)', marginTop:14, lineHeight:1.4}}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StoryFamily() {
  return (
    <section className="section" style={{background:'var(--bg-2)', borderTop:'1px solid var(--line-soft)'}}>
      <div className="container" style={{display:'grid', gridTemplateColumns:'1fr 1.1fr', gap: 64, alignItems:'center'}}>
        <img src="/images/story-mathew-mary.jpg" alt="Mathew and Mary" style={{width:'100%', height:520, objectFit:'cover', borderRadius:16, display:'block'}} />
        <div>
          <Eyebrow primary>The family</Eyebrow>
          <h2 className="serif" style={{fontSize:'clamp(28px, 3.4vw, 42px)', lineHeight:1.1, marginTop: 22, fontWeight:400, letterSpacing:'-0.01em'}}>
            What began with two has grown to many.
          </h2>
          <p style={{fontSize:17, color:'var(--ink-2)', marginTop: 24, lineHeight:1.6}}>
            Mathew and Mary were the seed. Today, the mission is carried by Indian pastors, Indian congregations, and a small support team, together praying, ministering, and walking alongside families across Karnataka.
          </p>
          <p style={{fontSize:17, color:'var(--ink-2)', marginTop: 18, lineHeight:1.6}}>
            We've grown to be a mighty ministry, small enough that every dollar finds its way to a person, large enough to plant churches and send students through college, and faithful in believing that God is still in the business of stopping buses and turning them around.
          </p>
        </div>
      </div>
    </section>
  );
}

function StoryCTA({ navigate }) {
  return (
    <section className="section" style={{background:'var(--ink)', color:'var(--bg)'}}>
      <div className="narrow text-center">
        <h2 className="serif" style={{color:'var(--bg)', fontSize:'clamp(32px, 4.2vw, 52px)', lineHeight:1.1, fontWeight:400, letterSpacing:'-0.015em'}}>
          The story isn't over. <em style={{color:'var(--accent-soft)', fontStyle:'italic'}}>Walk with us.</em>
        </h2>
        <p style={{fontSize:17, color:'rgba(247,241,226,0.72)', marginTop: 22, lineHeight:1.6, maxWidth: 560, margin:'22px auto 0'}}>
          Sponsor a student. Support a church plant. Pray for the next intersection where God turns a bus around.
        </p>
        <div style={{display:'flex', gap:14, justifyContent:'center', marginTop: 40, flexWrap:'wrap'}}>
          <button className="btn btn-primary btn-arrow" onClick={() => navigate('education')}>Sponsor a student</button>
          <button className="btn btn-outline" onClick={() => navigate('donate')} style={{color:'#FFF8EA', borderColor:'rgba(255,248,234,0.7)'}}>
            Make a donation
          </button>
        </div>
      </div>
    </section>
  );
}

function Story({ navigate }) {
  return (
    <>
      <StoryHero />
      <StoryHeroPhoto />
      <StoryProse />
      <StoryVerse />
      <StoryFamily />
      <StoryStats />
      <StoryCTA navigate={navigate} />
    </>
  );
}

window.Story = Story;
