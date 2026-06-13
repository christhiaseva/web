// churches-list.jsx — Browse all CSM congregations + plant-a-church CTA

function ChurchCard({ c, navigate }) {
  const raising = !!c.raising_support;
  return (
    <article className="card" style={{overflow:'hidden', display:'flex', flexDirection:'column', height:'100%'}}>
      {c.photo && (
        <div style={{aspectRatio:'4 / 3', overflow:'hidden', background:'var(--bg-2)'}}>
          <img src={c.photo} alt={c.name}
               style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}} />
        </div>
      )}
      <div style={{padding:'18px 22px', display:'flex', flexDirection:'column', flex:1}}>
        <div style={{fontFamily:'var(--serif)', fontSize:22, fontWeight:400}}>{c.name}</div>
        {c.description && (
          <p style={{fontSize:14, color:'var(--ink-2)', lineHeight:1.55, marginTop:8, whiteSpace:'pre-line'}}>
            {c.description}
          </p>
        )}
        <div style={{marginTop:'auto', paddingTop:18}}>
          {raising && (
            <button className="btn btn-primary btn-arrow"
                    style={{width:'100%', justifyContent:'center', fontSize:14, padding:'12px 18px'}}
                    onClick={() => navigate('donate', { fund:'church', id: c.id })}>
              Help plant a church in {c.name}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function FeaturedChurch({ c, navigate }) {
  const raising = !!c.raising_support;
  return (
    <article className="card featured-church">
      <div className="featured-church-photo">
        {c.photo && <img src={c.photo} alt={c.name} />}
      </div>
      <div className="featured-church-body">
        <Eyebrow primary>Our First Church</Eyebrow>
        <h2 className="serif" style={{fontSize:'clamp(28px, 4vw, 52px)', marginTop:14, fontWeight:400, lineHeight:1.05, letterSpacing:'-0.01em'}}>
          {c.name}
        </h2>
        {c.description && (
          <p style={{fontSize:16, color:'var(--ink-2)', lineHeight:1.6, marginTop:16, whiteSpace:'pre-line'}}>
            {c.description}
          </p>
        )}
        {raising && (
          <div style={{marginTop:22}}>
            <button className="btn btn-primary btn-arrow"
                    onClick={() => navigate('donate', { fund:'church', id: c.id })}>
              Help plant another church in {c.name}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

function ChurchList({ navigate }) {
  const allChurches = window.CHURCHES || [];
  // Hide churches missing coordinates — they aren't ready to publish yet.
  const churches = allChurches.filter(c => c.latitude != null && c.longitude != null);
  const featured = churches.find(c => c.id === 'chickaballapur');
  const others = churches.filter(c => c.id !== 'chickaballapur');
  // Raising-support churches come first (excluding the featured one if it's also raising).
  const raising = others.filter(c => c.raising_support);
  const rest    = others.filter(c => !c.raising_support);

  const numberWords = ['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen','Twenty'];
  const totalWord = numberWords[allChurches.length] || String(allChurches.length);

  return (
    <>
      <Breadcrumb crumbs={[{ label: 'Churches' }]} navigate={navigate} />

      <section style={{padding:'56px 0 32px'}}>
        <div className="container">
          <Eyebrow primary>Our congregations</Eyebrow>
          <h1 className="serif" style={{fontSize:'clamp(40px, 5.4vw, 72px)', lineHeight:1.04, marginTop:22, fontWeight:400, letterSpacing:'-0.015em', maxWidth:1000}}>
            {totalWord} churches. <em style={{fontStyle:'italic', color:'var(--primary)'}}>One mission.</em>
          </h1>
          <p style={{fontSize:19, color:'var(--ink-2)', marginTop:26, maxWidth:720, lineHeight:1.55}}>
            CSM has planted congregations across the towns and villages of our district. Each church has its own pastor, its own people, and its own story.
          </p>
          <div style={{marginTop:32, display:'flex', gap:14, flexWrap:'wrap'}}>
            <button className="btn btn-primary btn-arrow"
                    onClick={() => navigate('donate', { fund:'church' })}>
              Help plant the next one
            </button>
          </div>
        </div>
      </section>

      {featured && (
        <section style={{padding:'12px 0 40px'}}>
          <div className="container">
            <FeaturedChurch c={featured} navigate={navigate} />
          </div>
        </section>
      )}

      {raising.length > 0 && (
        <section style={{paddingTop:24, paddingBottom:24}}>
          <div className="container">
            <Eyebrow primary>Raising support</Eyebrow>
            <h2 className="serif" style={{fontSize:'clamp(24px, 2.6vw, 32px)', fontWeight:400, marginTop:14, marginBottom:24}}>
              Help us build the next church
            </h2>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:24}}>
              {raising.map(c => <ChurchCard key={c.id} c={c} navigate={navigate} />)}
            </div>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section style={{paddingTop:24, paddingBottom:80}}>
          <div className="container">
            <h2 className="serif" style={{fontSize:'clamp(24px, 2.6vw, 32px)', fontWeight:400, marginBottom:28, color:'var(--ink-2)'}}>
              {raising.length > 0 ? 'Established congregations' : 'All churches'}
            </h2>
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:24}}>
              {rest.map(c => <ChurchCard key={c.id} c={c} navigate={navigate} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

window.ChurchList = ChurchList;
