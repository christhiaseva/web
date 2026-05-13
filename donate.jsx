// donate.jsx — Unified donation flow
// Designations:
//   fund = 'general' | 'education' | 'church'
//   id   = student id (when fund=education) | church id (when fund=church) | 'next' | undefined
// Hash routes parsed by app.jsx:
//   #/donate                          → general
//   #/donate/education                → education general fund
//   #/donate/education/{studentId}    → specific student
//   #/donate/church                   → church planting general fund
//   #/donate/church/{churchId}        → specific church
//   ?amount=NN appended → preselect amount

function getDesignation({ fund, id }) {
  fund = fund || 'general';

  if (fund === 'education' && id) {
    const s = (window.STUDENTS || []).find(x => x.id === id);
    if (s) return {
      kind:'student', fund, id,
      title: `Sponsor ${s.name}`,
      heading: <>Sponsor {s.name} for <em style={{fontStyle:'italic', color:'var(--primary)'}}>$200 a year.</em></>,
      sub: `Each student is sponsored by one person for $200/year. That covers tuition, books, and hostel for the full school year.`,
      breadcrumb: ['education', `profile:${s.id}`],
      crumbLabels: ['Sponsor a student', s.name],
      // Locked amount — single-sponsor model
      lockedAmount: 200,
      defaultRecurring: false,
      defaultAmount: 200,
      sidebar: { kind:'student', s },
      receiptName: s.name,
    };
  }

  if (fund === 'education') return {
    kind:'fund', fund, id:null,
    title:'Give to education',
    heading: <>Sponsor the next <em style={{fontStyle:'italic', color:'var(--primary)'}}>generation of students.</em></>,
    sub: 'Your gift goes to the general education fund, supporting students who don\'t yet have a sponsor of their own.',
    breadcrumb: ['education'],
    crumbLabels: ['Sponsor a student'],
    presets: [50, 100, 250, 500, 1000],
    defaultRecurring: false,
    defaultAmount: 100,
    sidebar: { kind:'fund-education' },
    receiptName: 'students',
  };

  if (fund === 'church' && id && id !== 'next') {
    const c = (window.CHURCHES || []).find(x => x.id === id);
    if (c) return {
      kind:'church', fund, id,
      title: `Give to ${c.town}`,
      heading: <>Stand with the church in <em style={{fontStyle:'italic', color:'var(--primary)'}}>{c.town}.</em></>,
      sub: c.needs
        ? `${c.needs.label}: $${(c.needs.goal - c.needs.raised).toLocaleString()} still needed.`
        : `${c.town} is self-sustaining. Your gift goes toward special projects and pastor support.`,
      breadcrumb: ['churches'],
      crumbLabels: ['Help Plant a Church'],
      presets: [50, 100, 250, 500, 1000],
      defaultRecurring: false,
      defaultAmount: 100,
      sidebar: { kind:'church', c },
      receiptName: c.town,
    };
  }

  if (fund === 'church') return {
    kind:'fund', fund, id: id === 'next' ? 'next' : null,
    title: id === 'next' ? 'Help plant the next church' : 'Give to church planting',
    heading: <>Help us plant <em style={{fontStyle:'italic', color:'var(--primary)'}}>the next church.</em></>,
    sub: id === 'next'
      ? "We're praying about a new village in the Chickaballapur district. Your gift starts the work."
      : 'Your gift supports the church-planting fund: pastor support, leases, Bibles, chairs, and outreach for new and growing congregations.',
    breadcrumb: ['churches'],
    crumbLabels: ['Help Plant a Church'],
    presets: [50, 100, 250, 500, 1000],
    defaultRecurring: false,
    defaultAmount: 100,
    sidebar: { kind:'fund-church' },
    receiptName: 'the next church',
  };

  // general
  return {
    kind:'general', fund:'general', id:null,
    title:'Make a donation',
    heading: <>Walk with us. <em style={{fontStyle:'italic', color:'var(--primary)'}}>Carry the work forward.</em></>,
    sub: 'Your gift supports the entire mission: Gospel work, education, churches, and family aid.',
    breadcrumb: [],
    crumbLabels: [],
    presets: [50, 100, 250, 500, 1000],
    defaultRecurring: false,
    defaultAmount: 100,
    sidebar: { kind:'allocation' },
    receiptName: 'the team',
  };
}

function FundTabs({ fund, navigate }) {
  const tabs = [
    { id:'general',   label:'General' },
    { id:'education', label:'Education' },
    { id:'church',    label:'Church planting' },
  ];
  return (
    <div style={{display:'flex', gap: 6, flexWrap:'wrap', marginTop: 24, marginBottom: 8}}>
      {tabs.map(t => {
        const on = fund === t.id;
        return (
          <button key={t.id}
                  onClick={() => navigate('donate', { fund: t.id })}
                  style={{
                    appearance:'none', cursor:'pointer',
                    border: on ? '1px solid var(--ink)' : '1px solid var(--line)',
                    background: on ? 'var(--ink)' : 'transparent',
                    color: on ? 'var(--bg)' : 'var(--ink-2)',
                    padding:'8px 16px', borderRadius: 999,
                    fontSize: 13.5, fontFamily:'var(--sans)', fontWeight:500,
                  }}>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function Donate({ params, navigate }) {
  const fund = params?.fund || 'general';
  const id   = params?.id;
  const initialAmount = params?.amount ? Number(params.amount) : null;

  const d = getDesignation({ fund, id });

  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(initialAmount || d.defaultAmount);
  const [custom, setCustom] = useState('');
  const [info, setInfo] = useState({ name:'', email:'', country:'United States', anon:false, note:'' });

  // Reset step + amount when designation changes
  useEffect(() => {
    setStep(1);
    setAmount(initialAmount || d.defaultAmount);
    setCustom('');
  // eslint-disable-next-line
  }, [fund, id]);

  const finalAmount = d.lockedAmount || (custom ? Number(custom) : amount);
  const stepLabels = ['Amount', 'Your info', 'Confirm'];

  return (
    <>
      {/* Breadcrumb */}
      <div className="container" style={{paddingTop:24, fontSize:13.5, color:'var(--ink-3)'}}>
        <a onClick={() => navigate('home')} style={{cursor:'pointer'}}>Home</a>
        {d.breadcrumb.map((b, i) => {
          const [page, sub] = b.split(':');
          return (
            <React.Fragment key={i}>
              <span style={{margin:'0 8px'}}>/</span>
              <a onClick={() => sub ? navigate(page, { id: sub }) : navigate(page)} style={{cursor:'pointer'}}>
                {d.crumbLabels[i]}
              </a>
            </React.Fragment>
          );
        })}
        <span style={{margin:'0 8px'}}>/</span>
        <span style={{color:'var(--ink-2)'}}>Donate</span>
      </div>

      <section style={{padding:'40px 0 80px'}}>
        <div className="container" style={{display:'grid', gridTemplateColumns:'1fr 380px', gap: 64, alignItems:'flex-start'}}>
          {/* Main */}
          <div>
            <Eyebrow primary>{d.title}</Eyebrow>
            <h1 className="serif" style={{fontSize:'clamp(36px, 4.6vw, 60px)', lineHeight:1.05, marginTop: 22, fontWeight:400, letterSpacing:'-0.015em'}}>
              {d.heading}
            </h1>

            {/* Show fund tabs only when not pinned to a specific student/church */}
            {step === 1 && d.kind !== 'student' && d.kind !== 'church' && (
              <FundTabs fund={fund} navigate={navigate} />
            )}

            {/* When pinned to specific recipient, show a "switch to general fund" link */}
            {step === 1 && (d.kind === 'student' || d.kind === 'church') && (
              <div style={{marginTop: 22, fontSize:13.5}}>
                <a onClick={() => navigate('donate', { fund })}
                   style={{cursor:'pointer', color:'var(--ink-3)'}}>
                  ← Give to the general {fund === 'education' ? 'education' : 'church-planting'} fund instead
                </a>
              </div>
            )}

            {/* Steps */}
            <div style={{display:'flex', gap: 0, marginTop: 36, borderBottom:'1px solid var(--line)'}}>
              {stepLabels.map((l, i) => {
                const n = i + 1;
                const active = step === n;
                const done = step > n;
                return (
                  <div key={l} style={{
                    flex:1, padding:'14px 0', display:'flex', alignItems:'center', gap:10,
                    borderBottom: active ? '2px solid var(--primary)' : '2px solid transparent',
                    marginBottom: -1,
                  }}>
                    <div style={{
                      width:26, height:26, borderRadius:'50%',
                      background: done ? 'var(--primary)' : (active ? 'var(--ink)' : 'transparent'),
                      color: done || active ? '#FFF8EA' : 'var(--ink-3)',
                      border: done || active ? 'none' : '1px solid var(--line)',
                      fontSize:13, display:'grid', placeItems:'center', fontFamily:'var(--serif)'
                    }}>
                      {done ? '✓' : n}
                    </div>
                    <span style={{fontSize:14, fontWeight: active ? 500 : 400, color: active || done ? 'var(--ink)' : 'var(--ink-3)'}}>{l}</span>
                  </div>
                );
              })}
            </div>

            <div style={{marginTop: 36}}>
              {step === 1 && d.lockedAmount && (
                <>
                  <h2 className="serif" style={{fontSize: 26, fontWeight:400, marginBottom: 8}}>Sponsor for $200/year</h2>
                  <p style={{color:'var(--ink-2)', fontSize:15, marginBottom: 28}}>{d.sub}</p>

                  <div style={{padding:'28px 22px', borderRadius:14, textAlign:'left',
                              background:'var(--ink)', color:'var(--bg)', border:'1px solid var(--ink)'}}>
                    <div style={{fontSize:11.5, letterSpacing:'0.18em', textTransform:'uppercase', opacity: .7, marginBottom: 8}}>One-time</div>
                    <div style={{fontFamily:'var(--serif)', fontSize: 38, lineHeight: 1}}>$200</div>
                    <div style={{fontSize:13.5, marginTop: 8, opacity: .8}}>Tuition, books, and hostel for the full school year</div>
                  </div>

                  <div style={{marginTop: 28, padding:'18px 22px', background:'var(--bg-2)', borderRadius: 10, border:'1px solid var(--line-soft)', fontSize:14, color:'var(--ink-2)', display:'flex', gap:14, alignItems:'flex-start'}}>
                    <span style={{width:6, height:6, borderRadius:'50%', background:'var(--primary)', flexShrink:0, marginTop: 8}}></span>
                    <div>
                      Want to give a different amount? Smaller gifts go to the{' '}
                      <a onClick={() => navigate('donate', { fund:'education' })}
                         style={{color:'var(--primary)', cursor:'pointer', borderBottom:'1px solid var(--primary)'}}>
                        general student fund
                      </a>
                      {' '}and covers students who don't yet have a personal sponsor.
                    </div>
                  </div>

                  <button className="btn btn-primary btn-arrow"
                          style={{marginTop: 36, fontSize: 16, padding:'16px 28px'}}
                          onClick={() => setStep(2)}>
                    Continue · $200
                  </button>
                </>
              )}

              {step === 1 && !d.lockedAmount && (
                <>
                  <h2 className="serif" style={{fontSize: 26, fontWeight:400, marginBottom: 8}}>Choose an amount</h2>
                  <p style={{color:'var(--ink-2)', fontSize:15, marginBottom: 28}}>{d.sub}</p>

                  <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12}}>
                    {d.presets.filter(v => v > 0).map((v, i) => (
                      <button key={`${v}-${i}`} onClick={() => { setAmount(v); setCustom(''); }}
                              style={{padding:'22px 16px', borderRadius:12, cursor:'pointer',
                                      background: amount === v && !custom ? 'var(--ink)' : 'var(--card)',
                                      color: amount === v && !custom ? 'var(--bg)' : 'var(--ink)',
                                      border: amount === v && !custom ? '1px solid var(--ink)' : '1px solid var(--line)',
                                      fontFamily:'var(--serif)', fontSize: 26}}>
                        ${v.toLocaleString()}                      </button>
                    ))}
                    <div style={{padding:'22px 16px', borderRadius:12,
                                 background: custom ? 'var(--ink)' : 'var(--card)',
                                 color: custom ? 'var(--bg)' : 'var(--ink)',
                                 border: custom ? '1px solid var(--ink)' : '1px solid var(--line)',
                                 display:'flex', alignItems:'center', gap:6}}>
                      <span style={{fontFamily:'var(--serif)', fontSize: 26, opacity:.6}}>$</span>
                      <input type="number" placeholder="Custom" value={custom}
                             className="no-spin"
                             onChange={e => setCustom(e.target.value)}
                             style={{flex:1, minWidth:0, border:0, outline:0, background:'transparent', color:'inherit',
                                     fontFamily:'var(--serif)', fontSize: 26}} />
                    </div>
                  </div>

                  <button className="btn btn-primary btn-arrow"
                          style={{marginTop: 40, fontSize: 16, padding:'16px 28px'}}
                          onClick={() => setStep(2)}
                          disabled={!finalAmount}>
                    Continue · ${Number(finalAmount).toLocaleString()}                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="serif" style={{fontSize: 26, fontWeight:400, marginBottom: 8}}>A little about you</h2>
                  <p style={{color:'var(--ink-2)', fontSize:15, marginBottom: 32}}>
                    So we can send your tax receipt and updates from {d.receiptName}.
                  </p>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 20}}>
                    <FormField label="Full name" value={info.name} onChange={v => setInfo({...info, name: v})} />
                    <FormField label="Email" value={info.email} onChange={v => setInfo({...info, email: v})} type="email" />
                    <FormField label="Country" value={info.country} onChange={v => setInfo({...info, country: v})} />
                    <FormField label="Address (optional)" value={info.address || ''} onChange={v => setInfo({...info, address: v})} />
                  </div>
                  <div style={{marginTop: 28}}>
                    <label style={{fontSize:13, color:'var(--ink-2)', fontWeight:500, display:'block', marginBottom:8}}>
                      A note (optional)
                    </label>
                    <textarea value={info.note} onChange={e => setInfo({...info, note: e.target.value})}
                              placeholder={d.kind === 'student' ? `"Praying for you…"` : 'A word of encouragement…'}
                              rows={3}
                              style={{width:'100%', padding:'14px 16px', borderRadius:10, border:'1px solid var(--line)',
                                      background:'var(--card)', color:'var(--ink)', fontFamily:'var(--sans)', fontSize:15,
                                      resize:'vertical', outline:'none'}} />
                  </div>
                  <label style={{marginTop: 22, display:'flex', alignItems:'center', gap:10, fontSize:14, cursor:'pointer'}}>
                    <input type="checkbox" checked={info.anon} onChange={e => setInfo({...info, anon: e.target.checked})}
                           style={{width:18, height:18, accentColor:'var(--primary)'}} />
                    <span style={{color:'var(--ink-2)'}}>Give anonymously</span>
                  </label>
                  <div style={{display:'flex', gap:14, marginTop: 36}}>
                    <button className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
                    <button className="btn btn-primary btn-arrow" onClick={() => setStep(3)}>Review & confirm</button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="serif" style={{fontSize: 26, fontWeight:400, marginBottom: 8}}>Almost there</h2>
                  <p style={{color:'var(--ink-2)', fontSize:15, marginBottom: 32}}>
                    Confirm and we'll connect you to our payment partner to complete the gift.
                  </p>
                  <div className="card" style={{padding:'28px 28px'}}>
                    <ReviewRow label="Gift" value={`$${Number(finalAmount).toLocaleString()}$`} />
                    <ReviewRow label="Designation" value={d.title} />
                    <ReviewRow label="Name" value={info.anon ? `${info.name} (anonymous)` : info.name || '—'} />
                    <ReviewRow label="Email" value={info.email || '—'} />
                    {info.note && <ReviewRow label="Note" value={`"${info.note}"`} />}
                  </div>
                  <div style={{marginTop: 28, padding:'18px 22px', background:'var(--bg-2)', borderRadius:10, border:'1px solid var(--line-soft)', fontSize:14, color:'var(--ink-2)', display:'flex', gap:14}}>
                    <div style={{flexShrink:0, width:24, height:24, borderRadius:'50%', background:'var(--primary)', color:'#FFF8EA', display:'grid', placeItems:'center', fontSize:13, fontFamily:'var(--serif)'}}>✓</div>
                    <div>Christhia Seva Mission is a registered 501(c)(3). Your gift is tax-deductible, and you'll receive a receipt by email.</div>
                  </div>
                  <div style={{display:'flex', gap:14, marginTop: 36}}>
                    <button className="btn btn-ghost" onClick={() => setStep(2)}>← Back</button>
                    <button className="btn btn-primary btn-arrow" onClick={async () => {
                      try {
                        await fetch('https://formspree.io/f/mbdwwwed', {
                          method: 'POST',
                          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            _subject: `Donation: $${Number(finalAmount).toLocaleString()} toward ${d.title}`,
                            name: info.name || '(not provided)',
                            email: info.email || '(not provided)',
                            address: info.address || '(not provided)',
                            amount: `$${Number(finalAmount).toLocaleString()}`,
                            designation: d.title,
                            fund: d.fund,
                            anonymous: info.anon ? 'Yes' : 'No',
                            note: info.note || '(none)',
                            ...(d.kind === 'student' && d.id ? { profile: window.location.origin + '/student/' + d.id } : {}),
                          }),
                        });
                      } catch (e) { /* don't block confirmation if email fails */ }
                      setStep(4);
                    }}>
                      Complete gift · ${Number(finalAmount).toLocaleString()}                    </button>
                  </div>
                </>
              )}

              {step === 4 && (
                <div style={{padding:'40px 0', textAlign:'center', maxWidth: 560, margin:'0 auto'}}>
                  {d.sidebar.kind === 'student' && d.sidebar.s?.photo ? (
                    <img src={d.sidebar.s.photo} alt={d.sidebar.s.name}
                         style={{width: 120, height: 120, borderRadius:'50%', objectFit:'cover', margin:'0 auto', display:'block'}} />
                  ) : (
                    <div style={{width: 72, height: 72, borderRadius:'50%', background:'var(--primary)', color:'#FFF8EA', margin:'0 auto', display:'grid', placeItems:'center', fontSize: 32, fontFamily:'var(--serif)'}}>✓</div>
                  )}
                  <h2 className="serif" style={{fontSize:'clamp(28px, 3.6vw, 42px)', marginTop: 32, fontWeight:400, lineHeight:1.15}}>
                    Thank you.
                  </h2>
                  <p style={{fontSize:18, color:'var(--ink-2)', marginTop: 18, lineHeight:1.55}}>
                    Your ${Number(finalAmount).toLocaleString()} gift toward <strong>{d.receiptName}</strong> has been received. You'll receive an email with next steps.
                  </p>
                  <p className="serif" style={{fontStyle:'italic', fontSize: 19, color:'var(--ink-2)', marginTop: 36, padding:'24px 0', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)'}}>
                    "And whoever gives one of these little ones even a cup of cold water… truly, I say to you, he will by no means lose his reward."
                    <span className="verse-cite" style={{fontStyle:'normal'}}>Matthew 10:42</span>
                  </p>
                  <div style={{display:'flex', gap:14, justifyContent:'center', marginTop: 36, flexWrap:'wrap'}}>
                    <button className="btn btn-ghost" onClick={() => navigate('education')}>Sponsor another student</button>
                    <button className="btn btn-primary btn-arrow" onClick={() => navigate('home')}>Back to home</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside style={{position:'sticky', top: 92, alignSelf:'flex-start'}}>
            <DonateSidebar d={d} navigate={navigate} />
          </aside>
        </div>
      </section>
    </>
  );
}

function DonateSidebar({ d, navigate }) {
  if (d.sidebar.kind === 'student') {
    const s = d.sidebar.s;
    return (
      <div className="card" style={{padding: 22}}>
        <div style={{borderRadius:8, overflow:'hidden', marginBottom: 18, aspectRatio:'4/3'}}>
          <ImgSlot id={`don-stu-${s.id}`} h="100%" placeholder={s.name} radius={8} />
        </div>
        <div style={{fontFamily:'var(--serif)', fontSize: 22, fontWeight:400}}>{s.name}</div>
        <div style={{fontSize:13, color:'var(--ink-3)', marginTop: 4}}>{s.course}</div>
        <div style={{fontSize:13, color:'var(--ink-3)'}}>{s.school}</div>
        <div style={{fontSize:13, color:'var(--ink-2)', marginTop: 12}}>${s.goal.toLocaleString()}/year</div>
      </div>
    );
  }

  if (d.sidebar.kind === 'church') {
    const c = d.sidebar.c;
    return (
      <div className="card" style={{padding: 22}}>
        <div style={{borderRadius:8, overflow:'hidden', marginBottom: 18, aspectRatio:'4/3'}}>
          <ImgSlot id={`don-ch-${c.id}`} h="100%" placeholder={c.town} radius={8} />
        </div>
        <div style={{fontFamily:'var(--serif)', fontSize: 22, fontWeight:400}}>{c.town}</div>
        <div style={{fontSize:13, color:'var(--ink-3)', marginTop: 4}}>Since {c.established} · {c.pastor}</div>
        <div style={{fontSize:13, color:'var(--ink-3)'}}>{c.members} in worship</div>
        {c.needs && (
          <>
            <div style={{marginTop: 18}}><Progress value={c.needs.raised} max={c.needs.goal} /></div>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:12.5, color:'var(--ink-3)', marginTop: 8}}>
              <span>${c.needs.raised.toLocaleString()} raised</span>
              <span>${(c.needs.goal - c.needs.raised).toLocaleString()} to go</span>
            </div>
            <div style={{fontSize: 12.5, color:'var(--ink-3)', marginTop: 12, lineHeight: 1.5}}>{c.needs.label}</div>
          </>
        )}
      </div>
    );
  }

  if (d.sidebar.kind === 'fund-education') {
    return (
      <div className="card" style={{padding: 28}}>
        <h3 className="serif" style={{fontSize: 22, fontWeight:400, marginBottom: 14}}>Education fund</h3>
        <p style={{fontSize:14.5, color:'var(--ink-2)', lineHeight:1.6, marginBottom: 18}}>
          Pooled gifts support students who don't yet have a sponsor, and cover books, hostels, and emergency tuition gaps.
        </p>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 16}}>
          {[{n:'200+', l:'students supported'}, {n:'94%', l:'graduation rate'}, {n:'$1,650', l:'avg. annual cost'}, {n:'100%', l:'to tuition'}].map(s => (
            <div key={s.l} style={{padding:'10px 0'}}>
              <div style={{fontFamily:'var(--serif)', fontSize: 22, color:'var(--primary)'}}>{s.n}</div>
              <div style={{fontSize:12, color:'var(--ink-3)', marginTop:2}}>{s.l}</div>
            </div>
          ))}
        </div>
        <button className="btn btn-ghost" style={{marginTop: 18, width:'100%', justifyContent:'center'}}
                onClick={() => navigate('education')}>Browse students →</button>
      </div>
    );
  }

  if (d.sidebar.kind === 'fund-church') {
    return (
      <div className="card" style={{padding: 28}}>
        <h3 className="serif" style={{fontSize: 22, fontWeight:400, marginBottom: 14}}>Church planting fund</h3>
        <p style={{fontSize:14.5, color:'var(--ink-2)', lineHeight:1.6, marginBottom: 18}}>
          $9,800 plants a church for its first year: pastor, lease, Bibles, chairs, and outreach. By year five, most plants are self-sustaining.
        </p>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 16}}>
          {[{n:'10', l:'churches planted'}, {n:'8', l:'pastors raised up'}, {n:'$9,800', l:'cost per plant'}, {n:'960+', l:'in worship weekly'}].map(s => (
            <div key={s.l} style={{padding:'10px 0'}}>
              <div style={{fontFamily:'var(--serif)', fontSize: 22, color:'var(--primary)'}}>{s.n}</div>
              <div style={{fontSize:12, color:'var(--ink-3)', marginTop:2}}>{s.l}</div>
            </div>
          ))}
        </div>
        <button className="btn btn-ghost" style={{marginTop: 18, width:'100%', justifyContent:'center'}}
                onClick={() => navigate('churches')}>See where we are →</button>
      </div>
    );
  }

  // general
  return null;
}

function FormField({ label, value, onChange, type = 'text' }) {
  return (
    <label style={{display:'flex', flexDirection:'column', gap:8}}>
      <span style={{fontSize:13, color:'var(--ink-2)', fontWeight:500}}>{label}</span>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
             style={{padding:'14px 16px', borderRadius:10, border:'1px solid var(--line)',
                     background:'var(--card)', color:'var(--ink)', fontFamily:'var(--sans)',
                     fontSize:15, outline:'none'}} />
    </label>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div style={{display:'flex', justifyContent:'space-between', padding:'14px 0', borderBottom:'1px solid var(--line-soft)', fontSize:15, gap: 24}}>
      <span style={{color:'var(--ink-3)'}}>{label}</span>
      <span style={{color:'var(--ink)', fontWeight:500, textAlign:'right', maxWidth:'60%'}}>{value}</span>
    </div>
  );
}

window.Donate = Donate;
