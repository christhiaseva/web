// contact.jsx — Contact page with US and India locations

const FORMSPREE_URL = 'https://formspree.io/f/mbdwwwed';

const fieldStyle = {
  width:'100%', padding:'14px 16px', borderRadius:10, border:'1px solid var(--line)',
  background:'var(--card)', color:'var(--ink)', fontFamily:'var(--sans)', fontSize:15, outline:'none',
};

function ContactForm() {
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name:'', email:'', message:'' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') return (
    <div style={{textAlign:'center', padding:'48px 0'}}>
      <div style={{width: 56, height: 56, borderRadius:'50%', background:'var(--primary)', color:'#FFF8EA', margin:'0 auto', display:'grid', placeItems:'center', fontSize: 24, fontFamily:'var(--serif)'}}>✓</div>
      <h3 className="serif" style={{fontSize: 24, fontWeight:400, marginTop: 20}}>Message sent.</h3>
      <p style={{fontSize: 16, color:'var(--ink-2)', marginTop: 12}}>We'll get back to you as soon as we can.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 16, marginBottom: 16}}>
        <div>
          <label style={{fontSize:13, color:'var(--ink-2)', fontWeight:500, display:'block', marginBottom:8}}>Name</label>
          <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={fieldStyle} />
        </div>
        <div>
          <label style={{fontSize:13, color:'var(--ink-2)', fontWeight:500, display:'block', marginBottom:8}}>Email</label>
          <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={fieldStyle} />
        </div>
      </div>
      <div style={{marginBottom: 24}}>
        <label style={{fontSize:13, color:'var(--ink-2)', fontWeight:500, display:'block', marginBottom:8}}>Message</label>
        <textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={5}
                  style={{...fieldStyle, resize:'vertical'}} />
      </div>
      {status === 'error' && <p style={{color:'#c0392b', fontSize:14, marginBottom:16}}>Something went wrong. Please try again or email us directly.</p>}
      <button type="submit" className="btn btn-primary btn-arrow" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}

function Contact({ navigate }) {
  return (
    <>
      <section style={{padding:'56px 0 0'}}>
        <div className="container">
          <Eyebrow primary>Get in touch</Eyebrow>
          <h1 className="serif" style={{fontSize:'clamp(44px, 6vw, 84px)', lineHeight:1.0, marginTop: 22, fontWeight:400, letterSpacing:'-0.02em', maxWidth: 900}}>
            Two continents.<br/>
            <em style={{fontStyle:'italic', color:'var(--primary)'}}>One mission.</em>
          </h1>
          <p style={{fontSize: 20, color:'var(--ink-2)', marginTop: 32, maxWidth: 620, lineHeight:1.55}}>
            We're rooted in the villages of Karnataka and supported from the heart of Ohio, 8,700 miles apart, joined by a single calling. You can email us at <a href="mailto:hello@csmforchrist.com" style={{color:'var(--primary)'}}>hello@csmforchrist.com</a>.
          </p>
        </div>
      </section>

      {/* Globe connector */}
      <section style={{padding:'64px 0 80px'}}>
        <div className="container">

          {/* Distance arc */}
          <div style={{display:'flex', alignItems:'center', gap: 0, margin:'0 0 56px', padding:'0 40px'}}>
            <div style={{width: 10, height: 10, borderRadius:'50%', background:'var(--primary)', flexShrink:0}} />
            <div style={{flex:1, position:'relative', height: 40}}>
              <svg viewBox="0 0 400 40" preserveAspectRatio="none" style={{width:'100%', height:'100%', overflow:'visible'}}>
                <path d="M 0 35 Q 200 -20 400 35" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />
              </svg>
              <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', background:'var(--bg)', padding:'4px 16px', fontSize: 12, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--primary)', fontWeight:500, whiteSpace:'nowrap'}}>
                8,700 miles
              </div>
            </div>
            <div style={{width: 10, height: 10, borderRadius:'50%', background:'var(--primary)', flexShrink:0}} />
          </div>

          {/* Two location cards */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 32}}>

            {/* USA */}
            <div className="card" style={{padding:'40px 36px', position:'relative', overflow:'hidden'}}>
              <div style={{position:'absolute', top: 20, right: 24, fontSize: 48, opacity: 0.08, fontFamily:'var(--serif)', lineHeight:1}}>US</div>
              <div style={{fontSize: 11, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--primary)', fontWeight:500, marginBottom: 20}}>United States</div>
              <h3 className="serif" style={{fontSize: 24, fontWeight:400, lineHeight:1.25, marginBottom: 20}}>
                White Oak Christian Church
              </h3>
              <address style={{fontStyle:'normal', fontSize: 16, lineHeight: 1.7, color:'var(--ink-2)'}}>
                3675 Blue Rock Rd.<br/>
                Cincinnati, OH 45247
              </address>
              <div style={{marginTop: 28, paddingTop: 20, borderTop:'1px solid var(--line)'}}>
                <span style={{fontSize: 13, color:'var(--ink-3)', fontFamily:'var(--mono, monospace)', letterSpacing:'0.04em'}}>
                  39.17° N &nbsp;·&nbsp; 84.52° W
                </span>
              </div>
            </div>

            {/* India */}
            <div className="card" style={{padding:'40px 36px', position:'relative', overflow:'hidden'}}>
              <div style={{position:'absolute', top: 20, right: 24, fontSize: 48, opacity: 0.08, fontFamily:'var(--serif)', lineHeight:1}}>IN</div>
              <div style={{fontSize: 11, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--primary)', fontWeight:500, marginBottom: 20}}>India</div>
              <h3 className="serif" style={{fontSize: 24, fontWeight:400, lineHeight:1.25, marginBottom: 20}}>
                Christhia Seva Mission
              </h3>
              <address style={{fontStyle:'normal', fontSize: 16, lineHeight: 1.7, color:'var(--ink-2)'}}>
                Manchenebala Rd.<br/>
                Vapsandra, Chikballapur<br/>
                Karnataka 562101
              </address>
              <div style={{marginTop: 28, paddingTop: 20, borderTop:'1px solid var(--line)'}}>
                <span style={{fontSize: 13, color:'var(--ink-3)', fontFamily:'var(--mono, monospace)', letterSpacing:'0.04em'}}>
                  13.44° N &nbsp;·&nbsp; 77.73° E
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact form */}
      <section style={{padding:'0 0 80px'}}>
        <div className="narrow">
          <Eyebrow primary>Send us a message</Eyebrow>
          <h2 className="serif" style={{fontSize:'clamp(28px, 3.4vw, 42px)', lineHeight:1.1, marginTop: 22, fontWeight:400, letterSpacing:'-0.01em', marginBottom: 36}}>
            We'd love to hear from you.
          </h2>
          <ContactForm />
        </div>
      </section>

      {/* Verse */}
      <section style={{background:'var(--bg-2)', borderTop:'1px solid var(--line-soft)', borderBottom:'1px solid var(--line-soft)', padding:'80px 0'}}>
        <div className="narrow text-center">
          <p className="verse">
            "How beautiful on the mountains are the feet of those who bring good news."
          </p>
          <span className="verse-cite">Isaiah 52:7</span>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{background:'var(--ink)', color:'var(--bg)'}}>
        <div className="narrow text-center">
          <h2 className="serif" style={{color:'var(--bg)', fontSize:'clamp(32px, 4.2vw, 52px)', lineHeight:1.1, fontWeight:400, letterSpacing:'-0.015em'}}>
            Join the mission.
          </h2>
          <div style={{display:'flex', gap:14, justifyContent:'center', marginTop: 40, flexWrap:'wrap'}}>
            <button className="btn btn-primary btn-arrow" onClick={() => navigate('education')}>Sponsor a student</button>
            <button className="btn btn-outline" onClick={() => navigate('donate')} style={{color:'#FFF8EA', borderColor:'rgba(255,248,234,0.7)'}}>
              Make a donation
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

window.Contact = Contact;
