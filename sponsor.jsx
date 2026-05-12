// sponsor.jsx — Donation / sponsor flow

function Sponsor({ studentId, mode, navigate }) {
  const student = studentId ? (window.STUDENTS || []).find(s => s.id === studentId) : null;
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(student ? 50 : 100);
  const [custom, setCustom] = useState('');
  const [recurring, setRecurring] = useState(student ? true : false);
  const [info, setInfo] = useState({ name: '', email: '', country: 'United States', anon: false, note: '' });

  const presets = student
    ? [25, 50, 100, 250, student.goal - student.raised]
    : [50, 100, 250, 500, 1000];

  const finalAmount = custom ? Number(custom) : amount;

  const stepLabels = ['Amount', 'Your info', 'Confirm'];

  return (
    <>
      <div className="container" style={{padding:'24px 0 0', fontSize:13.5, color:'var(--ink-3)'}}>
        <a onClick={() => navigate('home')} style={{cursor:'pointer'}}>Home</a>
        <span style={{margin:'0 8px'}}>/</span>
        {student ? (
          <>
            <a onClick={() => navigate('education')} style={{cursor:'pointer'}}>Sponsor a student</a>
            <span style={{margin:'0 8px'}}>/</span>
            <a onClick={() => navigate('profile', {id: student.id})} style={{cursor:'pointer'}}>{student.name}</a>
            <span style={{margin:'0 8px'}}>/</span>
            <span style={{color:'var(--ink-2)'}}>Sponsor</span>
          </>
        ) : <span style={{color:'var(--ink-2)'}}>Donate</span>}
      </div>

      <section style={{padding:'56px 0 80px'}}>
        <div className="container" style={{display:'grid', gridTemplateColumns:'1fr 380px', gap: 64, alignItems:'flex-start'}}>
          {/* Main column */}
          <div>
            <Eyebrow primary>{student ? `Sponsor ${student.name}` : 'Make a donation'}</Eyebrow>
            <h1 className="serif" style={{fontSize:'clamp(36px, 4.6vw, 60px)', lineHeight:1.05, marginTop: 22, fontWeight:400, letterSpacing:'-0.015em'}}>
              {student
                ? <>Help {student.name} <em style={{fontStyle:'italic', color:'var(--primary)'}}>get to school.</em></>
                : <>Walk with us. <em style={{fontStyle:'italic', color:'var(--primary)'}}>Carry the work forward.</em></>
              }
            </h1>

            {/* Steps */}
            <div style={{display:'flex', gap: 0, marginTop: 44, borderBottom:'1px solid var(--line)'}}>
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

            <div style={{marginTop: 40}}>
              {step === 1 && (
                <>
                  <h2 className="serif" style={{fontSize: 26, fontWeight:400, marginBottom: 8}}>Choose an amount</h2>
                  <p style={{color:'var(--ink-2)', fontSize:15, marginBottom: 28}}>
                    {student
                      ? `${student.name} needs $${(student.goal - student.raised).toLocaleString()} more to fully fund the term.`
                      : 'Your gift supports the entire mission: Gospel work, education, churches, and family aid.'}
                  </p>

                  {/* Recurring toggle */}
                  <div style={{display:'flex', gap: 8, padding: 4, background:'var(--bg-2)', borderRadius: 999, width:'fit-content', marginBottom: 28, border:'1px solid var(--line-soft)'}}>
                    <button onClick={() => setRecurring(false)}
                            style={{
                              padding:'10px 22px', borderRadius:999, border:0, cursor:'pointer',
                              background: !recurring ? 'var(--ink)' : 'transparent',
                              color: !recurring ? 'var(--bg)' : 'var(--ink-2)',
                              fontFamily:'var(--sans)', fontSize:14.5, fontWeight: 500,
                            }}>One-time</button>
                    <button onClick={() => setRecurring(true)}
                            style={{
                              padding:'10px 22px', borderRadius:999, border:0, cursor:'pointer',
                              background: recurring ? 'var(--ink)' : 'transparent',
                              color: recurring ? 'var(--bg)' : 'var(--ink-2)',
                              fontFamily:'var(--sans)', fontSize:14.5, fontWeight: 500,
                            }}>Monthly</button>
                  </div>

                  {/* Presets */}
                  <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12}}>
                    {presets.slice(0,3).map(v => (
                      <button key={v} onClick={() => { setAmount(v); setCustom(''); }}
                              style={{
                                padding:'22px 16px', borderRadius:12, cursor:'pointer',
                                background: amount === v && !custom ? 'var(--ink)' : 'var(--card)',
                                color: amount === v && !custom ? 'var(--bg)' : 'var(--ink)',
                                border: amount === v && !custom ? '1px solid var(--ink)' : '1px solid var(--line)',
                                fontFamily:'var(--serif)', fontSize: 26,
                              }}>
                        ${v}{recurring && <span style={{fontSize:12, fontFamily:'var(--sans)', opacity:.7}}>/mo</span>}
                      </button>
                    ))}
                    {presets.slice(3).map(v => (
                      <button key={v} onClick={() => { setAmount(v); setCustom(''); }}
                              style={{
                                padding:'22px 16px', borderRadius:12, cursor:'pointer',
                                background: amount === v && !custom ? 'var(--ink)' : 'var(--card)',
                                color: amount === v && !custom ? 'var(--bg)' : 'var(--ink)',
                                border: amount === v && !custom ? '1px solid var(--ink)' : '1px solid var(--line)',
                                fontFamily:'var(--serif)', fontSize: 26,
                              }}>
                        ${v}{recurring && <span style={{fontSize:12, fontFamily:'var(--sans)', opacity:.7}}>/mo</span>}
                      </button>
                    ))}
                    <div style={{
                      padding:'22px 16px', borderRadius:12,
                      background: custom ? 'var(--ink)' : 'var(--card)',
                      color: custom ? 'var(--bg)' : 'var(--ink)',
                      border: custom ? '1px solid var(--ink)' : '1px solid var(--line)',
                      display:'flex', alignItems:'center', gap:6
                    }}>
                      <span style={{fontFamily:'var(--serif)', fontSize: 26, opacity:.6}}>$</span>
                      <input type="number" placeholder="Custom"
                             value={custom}
                             onChange={e => setCustom(e.target.value)}
                             style={{
                               flex:1, minWidth:0, border:0, outline:0,
                               background:'transparent', color:'inherit',
                               fontFamily:'var(--serif)', fontSize: 26,
                             }} />
                    </div>
                  </div>

                  {student && (
                    <div style={{marginTop: 28, padding:'16px 18px', background:'var(--bg-2)', borderRadius: 10, border:'1px solid var(--line-soft)', fontSize:14, color:'var(--ink-2)', display:'flex', gap:14, alignItems:'center'}}>
                      <span style={{width:6, height:6, borderRadius:'50%', background:'var(--primary)', flexShrink:0}}></span>
                      <div>Even a partial sponsorship matters. {student.name}'s funding is shared by {student.sponsors} other sponsors.</div>
                    </div>
                  )}

                  <button className="btn btn-primary btn-arrow"
                          style={{marginTop: 40, fontSize: 16, padding:'16px 28px'}}
                          onClick={() => setStep(2)}
                          disabled={!finalAmount}>
                    Continue · ${finalAmount}{recurring ? '/month' : ''}
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="serif" style={{fontSize: 26, fontWeight:400, marginBottom: 8}}>A little about you</h2>
                  <p style={{color:'var(--ink-2)', fontSize:15, marginBottom: 32}}>
                    So we can send your tax receipt and updates from {student ? student.name : 'the field'}.
                  </p>

                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 20}}>
                    <FormField label="Full name" value={info.name} onChange={v => setInfo({...info, name: v})} />
                    <FormField label="Email" value={info.email} onChange={v => setInfo({...info, email: v})} type="email" />
                    <FormField label="Country" value={info.country} onChange={v => setInfo({...info, country: v})} />
                    <FormField label="Address (optional)" value={info.address || ''} onChange={v => setInfo({...info, address: v})} />
                  </div>

                  <div style={{marginTop: 28}}>
                    <label style={{fontSize:13, color:'var(--ink-2)', fontWeight:500, display:'block', marginBottom:8}}>
                      A note for {student ? student.name : 'the team'} (optional)
                    </label>
                    <textarea value={info.note} onChange={e => setInfo({...info, note: e.target.value})}
                              placeholder={student ? `"Praying for you, ${student.name}…"` : 'A word of encouragement…'}
                              rows={3}
                              style={{
                                width:'100%', padding:'14px 16px', borderRadius:10,
                                border:'1px solid var(--line)', background:'var(--card)',
                                color:'var(--ink)', fontFamily:'var(--sans)', fontSize:15, resize:'vertical',
                                outline:'none',
                              }} />
                  </div>

                  <label style={{marginTop: 22, display:'flex', alignItems:'center', gap:10, fontSize:14, cursor:'pointer'}}>
                    <input type="checkbox" checked={info.anon} onChange={e => setInfo({...info, anon: e.target.checked})}
                           style={{width:18, height:18, accentColor:'var(--primary)'}} />
                    <span style={{color:'var(--ink-2)'}}>Give anonymously (your name won't appear on {student ? student.name + "'s" : 'the'} sponsor list)</span>
                  </label>

                  <div style={{display:'flex', gap:14, marginTop: 36}}>
                    <button className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
                    <button className="btn btn-primary btn-arrow"
                            onClick={() => setStep(3)}>
                      Review & confirm
                    </button>
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
                    <ReviewRow label="Gift" value={`$${finalAmount}${recurring ? ' / month' : ' (one-time)'}`} />
                    {student && <ReviewRow label="Recipient" value={`${student.name} · ${student.course}`} />}
                    <ReviewRow label="Name" value={info.anon ? `${info.name} (anonymous on profile)` : info.name || '—'} />
                    <ReviewRow label="Email" value={info.email || '—'} />
                    {info.note && <ReviewRow label="Note" value={`"${info.note}"`} />}
                  </div>

                  <div style={{marginTop: 28, padding:'18px 22px', background:'var(--bg-2)', borderRadius:10, border:'1px solid var(--line-soft)', fontSize:14, color:'var(--ink-2)', display:'flex', gap:14}}>
                    <div style={{flexShrink:0, width:24, height:24, borderRadius:'50%', background:'var(--primary)', color:'#FFF8EA', display:'grid', placeItems:'center', fontSize:13, fontFamily:'var(--serif)'}}>✓</div>
                    <div>
                      Christhia Seva Mission is a registered 501(c)(3). Your gift is tax-deductible, and you'll receive a receipt by email.
                    </div>
                  </div>

                  <div style={{display:'flex', gap:14, marginTop: 36}}>
                    <button className="btn btn-ghost" onClick={() => setStep(2)}>← Back</button>
                    <button className="btn btn-primary btn-arrow"
                            onClick={() => setStep(4)}>
                      Complete gift · ${finalAmount}{recurring ? '/mo' : ''}
                    </button>
                  </div>
                </>
              )}

              {step === 4 && (
                <div style={{padding:'40px 0', textAlign:'center', maxWidth: 560, margin:'0 auto'}}>
                  <div style={{width: 72, height: 72, borderRadius:'50%', background:'var(--primary)', color:'#FFF8EA', margin:'0 auto', display:'grid', placeItems:'center', fontSize: 32, fontFamily:'var(--serif)'}}>✓</div>
                  <h2 className="serif" style={{fontSize:'clamp(28px, 3.6vw, 42px)', marginTop: 32, fontWeight:400, lineHeight:1.15}}>
                    Thank you, {info.name?.split(' ')[0] || 'friend'}.
                  </h2>
                  <p style={{fontSize:18, color:'var(--ink-2)', marginTop: 18, lineHeight:1.55}}>
                    {student
                      ? `Your $${finalAmount}${recurring ? '/month' : ''} gift has been recorded for ${student.name}. We'll send a receipt and your first update soon.`
                      : `Your $${finalAmount}${recurring ? '/month' : ''} gift has been recorded. We'll send a receipt right away.`}
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
            {student ? (
              <div className="card" style={{padding: 22}}>
                <div style={{borderRadius:8, overflow:'hidden', marginBottom: 18, aspectRatio:'4/3'}}>
                  <ImgSlot id={`spon-${student.id}`} h="100%" placeholder={student.name} radius={8} />
                </div>
                <div style={{fontFamily:'var(--serif)', fontSize: 22, fontWeight:400}}>{student.name}, {student.age}</div>
                <div style={{fontSize:13, color:'var(--ink-3)', marginTop: 4}}>{student.course}</div>
                <div style={{fontSize:13, color:'var(--ink-3)'}}>{student.school}</div>
                <div style={{marginTop: 18}}><Progress value={student.raised} max={student.goal} /></div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:12.5, color:'var(--ink-3)', marginTop: 8}}>
                  <span>${student.raised.toLocaleString()} raised</span>
                  <span>${(student.goal - student.raised).toLocaleString()} to go</span>
                </div>
              </div>
            ) : (
              <div className="card" style={{padding: 28, background:'var(--ink)', color:'var(--bg)', border:'1px solid var(--ink)'}}>
                <h3 className="serif" style={{color:'var(--bg)', fontSize: 22, fontWeight:400, marginBottom: 14}}>Where your gift goes</h3>
                {[
                  {l:'Education sponsorships', p:'42%'},
                  {l:'Church planting & buildings', p:'28%'},
                  {l:'Pastor support & training', p:'14%'},
                  {l:'Family & emergency aid', p:'12%'},
                  {l:'Operations', p:'4%'},
                ].map(r => (
                  <div key={r.l} style={{display:'flex', justifyContent:'space-between', padding:'10px 0', borderTop:'1px solid rgba(247,241,226,0.14)', fontSize:14}}>
                    <span style={{color:'rgba(247,241,226,0.78)'}}>{r.l}</span>
                    <span style={{color:'var(--accent-soft)', fontFamily:'var(--serif)'}}>{r.p}</span>
                  </div>
                ))}
                <div style={{marginTop: 24, fontSize:13, color:'rgba(247,241,226,0.6)', lineHeight:1.55}}>
                  Audited annually. Reports available on request.
                </div>
              </div>
            )}

            <div style={{marginTop: 24, padding:'18px 22px', background:'var(--bg-2)', borderRadius: 10, border:'1px solid var(--line-soft)', fontSize:13.5, color:'var(--ink-2)', lineHeight:1.55}}>
              <strong style={{color:'var(--ink)', fontFamily:'var(--serif)', fontSize:15}}>Why monthly?</strong>
              <p style={{marginTop: 8}}>Recurring gifts cover tuition steadily across the academic year, exactly when bills come due.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function FormField({ label, value, onChange, type = 'text' }) {
  return (
    <label style={{display:'flex', flexDirection:'column', gap:8}}>
      <span style={{fontSize:13, color:'var(--ink-2)', fontWeight:500}}>{label}</span>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
             style={{
               padding:'14px 16px', borderRadius:10,
               border:'1px solid var(--line)', background:'var(--card)',
               color:'var(--ink)', fontFamily:'var(--sans)', fontSize:15,
               outline:'none',
             }}
             onFocus={e => e.target.style.borderColor = 'var(--ink)'}
             onBlur={e => e.target.style.borderColor = 'var(--line)'}
             />
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

window.Sponsor = Sponsor;
