import { useState } from "react";

const BRAND = {
  red: "#E00800",
  black: "#111111",
  grey: "#6F6F6F",
  lightGrey: "#F5F5F5",
  border: "#E6E6E6",
  white: "#FFFFFF",
  continuum: "linear-gradient(90deg,#6BBE45 0%,#004B2E 34%,#7A1E3A 67%,#E00800 100%)",
  font: "\"Suisse International\", Arial, sans-serif",
};

const CheckIcon = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M13 5L6 12 3 9"/></svg>;
const Star = () => <svg width="11" height="11" viewBox="0 0 12 12" fill={BRAND.red}><path d="M6 0l1.76 3.57 3.94.57-2.85 2.78.67 3.93L6 9.02 2.48 10.85l.67-3.93L.3 4.14l3.94-.57z"/></svg>;
const TrendUp = () => <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12L6 8l3 3 5-7"/><path d="M10 4h4v4"/></svg>;
const Arrow = () => <span style={{color:BRAND.grey,fontSize:11}}>→</span>;

const Badge = ({children,v="default"}) => {
  const strong = ["teal","violet","rose","gold"].includes(v);
  return <span style={{display:"inline-flex",alignItems:"center",fontSize:10.5,fontWeight:700,letterSpacing:"0.02em",padding:"4px 10px",borderRadius:2,background:strong?BRAND.red:BRAND.lightGrey,color:strong?BRAND.white:BRAND.black,textTransform:"uppercase"}}>{children}</span>;
};
const SH = ({children}) => <div style={{margin:"44px 0 18px"}}><h3 style={{fontSize:13,fontWeight:700,color:BRAND.black,letterSpacing:"0.06em",textTransform:"uppercase",margin:"0 0 10px"}}>{children}</h3><div style={{height:3,width:96,background:BRAND.continuum}}/></div>;
const Card = ({children,...p}) => <div style={{background:BRAND.white,border:`1px solid ${BRAND.border}`,borderRadius:0,padding:24,marginBottom:16,...(p.style||{})}}>{children}</div>;
const Note = ({label,children,color=BRAND.red,bg=BRAND.lightGrey,border=BRAND.border}) => <div style={{background:bg,border:`1px solid ${border}`,borderLeft:`4px solid ${BRAND.red}`,borderRadius:0,padding:20,marginBottom:16}}><div style={{fontSize:11,fontWeight:700,letterSpacing:"0.08em",color,textTransform:"uppercase",marginBottom:8}}>{label}</div><p style={{fontSize:13,color:BRAND.grey,lineHeight:1.6,margin:0}}>{children}</p></div>;

function CommercialBox({title,icon,iconBg,iconColor,items}) {
  return <div style={{background:BRAND.white,border:`1px solid ${BRAND.border}`,borderRadius:0,overflow:"hidden",marginBottom:16}}>
    <div style={{padding:"18px 24px",borderBottom:`1px solid ${BRAND.border}`,display:"flex",alignItems:"center",gap:10,background:BRAND.white}}>
      <span style={{width:30,height:30,borderRadius:0,background:BRAND.red,display:"flex",alignItems:"center",justifyContent:"center",color:BRAND.white,fontSize:14,fontWeight:700}}>{icon}</span>
      <span style={{fontSize:15,fontWeight:700,color:BRAND.black}}>{title}</span>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(210px, 1fr))"}}>
      {items.map((c,i)=><div key={i} style={{padding:22,borderRight:i<items.length-1?`1px solid ${BRAND.border}`:"none",borderBottom:`1px solid ${BRAND.border}`}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",color:BRAND.grey,textTransform:"uppercase",marginBottom:6}}>{c.label}</div>
        <div style={{fontSize:22,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font,marginBottom:4}}>{c.value}</div>
        <div style={{fontSize:12,fontWeight:700,color:BRAND.black,marginBottom:6}}>{c.type}</div>
        <div style={{fontSize:12,color:BRAND.grey,lineHeight:1.55}}>{c.desc}</div>
      </div>)}
    </div>
  </div>;
}

function ForecastTable({color,bgLight,rows,totalRow,assumptions}) {
  return <div style={{background:BRAND.white,border:`1px solid ${BRAND.border}`,borderRadius:0,overflow:"hidden",marginBottom:16}}>
    <div style={{padding:"18px 24px",borderBottom:`1px solid ${BRAND.border}`,display:"flex",alignItems:"center",gap:10,background:BRAND.white}}>
      <span style={{width:30,height:30,background:BRAND.red,display:"flex",alignItems:"center",justifyContent:"center",color:BRAND.white,fontSize:11,fontWeight:700}}>e&</span>
      <span style={{fontSize:15,fontWeight:700,color:BRAND.black}}>e& revenue forecast</span>
    </div>
    <div style={{overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,minWidth:560}}>
        <thead><tr style={{borderBottom:`1px solid ${BRAND.border}`}}>
          {["Revenue stream","Year 1","Year 2","Year 3"].map((h,i)=><th key={i} style={{textAlign:i?'right':'left',padding:"12px 18px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",background:BRAND.lightGrey}}>{h}</th>)}
        </tr></thead>
        <tbody>
          {rows.map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`}}>
            <td style={{padding:"14px 18px",color:BRAND.black,fontWeight:500}}>{r.s}</td>
            {[r.y1,r.y2,r.y3].map((v,j)=><td key={j} style={{padding:"14px 18px",textAlign:"right",color:BRAND.grey,fontFamily:BRAND.font,fontWeight:500}}>{v}</td>)}
          </tr>)}
          <tr style={{borderTop:`2px solid ${BRAND.red}`,background:BRAND.lightGrey}}>
            <td style={{padding:"14px 18px",fontWeight:700,color:BRAND.black}}>Total e& revenue</td>
            {[totalRow.y1,totalRow.y2,totalRow.y3].map((v,i)=><td key={i} style={{padding:"14px 18px",textAlign:"right",fontWeight:700,color:BRAND.red,fontFamily:BRAND.font,fontSize:14}}>{v}</td>)}
          </tr>
        </tbody>
      </table>
    </div>
    <div style={{padding:"16px 24px",background:BRAND.white,borderTop:`1px solid ${BRAND.border}`}}>
      <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",color:BRAND.grey,textTransform:"uppercase",marginBottom:8}}>Key assumptions</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:14}}>
        {assumptions.map((a,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:6,fontSize:11.5,color:BRAND.grey}}>
          <span style={{width:5,height:5,background:BRAND.red,flexShrink:0}}/>{a}
        </div>)}
      </div>
    </div>
  </div>;
}

/* ════════════════════════════════════════════════════════════ */
/* SMB SEGMENT */
/* ════════════════════════════════════════════════════════════ */
function SMBSegment() {
  return <div>
    <div style={{padding:"44px 0 36px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><Badge v="teal">Pillar 01</Badge><span style={{fontSize:12,color:"#888"}}>Marketplace · SDD</span></div>
      <h2 style={{fontSize:34,fontWeight:700,color:"#111",lineHeight:1.08,marginBottom:14,fontFamily:BRAND.font}}>Sell AI to SMBs</h2>
      <p style={{fontSize:14.5,color:"#666",maxWidth:620,lineHeight:1.7,marginBottom:28}}>
        Give UAE businesses ready-to-use AI agents they can buy through e&. Start with reception, WhatsApp, booking, and web chat. Use Spec-Driven Development to launch fast and repeat the model.
      </p>
      <div style={{display:"flex",gap:28,flexWrap:"wrap"}}>
        {[{v:"5–6",l:"AI agents at launch"},{v:"30 days",l:"Platform baseline"},{v:"60 days",l:"Production v1"},{v:"2,500+",l:"Target SMBs Y1"}].map((s,i)=><div key={i} style={{minWidth:90}}>
          <div style={{fontSize:22,fontWeight:700,color:"#E00800",fontFamily:BRAND.font}}>{s.v}</div>
          <div style={{fontSize:10.5,color:"#999",marginTop:2}}>{s.l}</div>
        </div>)}
      </div>
    </div>

    {/* What we build */}
    <SH>What we build</SH>
    <Card>
      <p style={{fontSize:13,color:"#555",lineHeight:1.7,marginBottom:14}}>
        Customers browse, subscribe, and launch agents from one marketplace. Each agent is tied to a clear job: answer calls, qualify leads, book appointments, or support customers on WhatsApp and web chat.
      </p>
      <p style={{fontSize:13,color:"#555",lineHeight:1.7,marginBottom:14}}>
        The platform includes a storefront, onboarding, billing integration, usage analytics, and reusable specs. e& can keep adding agents after handover.
      </p>
      <p style={{fontSize:13,color:"#555",lineHeight:1.7}}>
        The first 5–6 agents can be ready in 30 days. By day 60, the platform is production ready. By day 90, e& has the specs, blueprints, and training to scale.
      </p>
    </Card>

    {/* Software Stack */}
    <SH>Software stack & technology</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:12,marginBottom:14}}>
      <Card style={{borderLeft:"3px solid #E00800"}}>
        <div style={{fontSize:13,fontWeight:600,color:"#111",marginBottom:6}}>SDD — Spec-Driven Development</div>
        <p style={{fontSize:12,color:"#777",lineHeight:1.6}}>A spec-first methodology for rapid AI agent creation. SDD converts business outcomes into structured implementation specs: user journeys, agent behavior, tools, integrations, data rules, guardrails, test cases, and acceptance criteria. Each agent is defined as a blueprint that can be instantiated, customised, tested, and scaled without re-engineering.</p>
      </Card>
      <Card>
        <div style={{fontSize:13,fontWeight:600,color:"#111",marginBottom:6}}>Agent orchestration layer</div>
        <p style={{fontSize:12,color:"#777",lineHeight:1.6}}>Multi-agent framework with tool integration, conversation memory, handoff logic, and guardrails. Supports voice (telephony + STT/TTS), chat (web widget, WhatsApp Business API), and hybrid flows. Arabic & English NLP with dialect handling.</p>
      </Card>
      <Card>
        <div style={{fontSize:13,fontWeight:600,color:"#111",marginBottom:6}}>Platform infrastructure</div>
        <p style={{fontSize:12,color:"#777",lineHeight:1.6}}>Next.js / React frontend · Node.js + Python backend · PostgreSQL + vector DB (Qdrant/Pinecone) · Redis for session state · Kubernetes for multi-tenant orchestration · e& billing API integration · Analytics pipeline (usage, CSAT, revenue tracking).</p>
      </Card>
      <Card>
        <div style={{fontSize:13,fontWeight:600,color:"#111",marginBottom:6}}>LLM & inference</div>
        <p style={{fontSize:12,color:"#777",lineHeight:1.6}}>Multi-model inference (GPT-4o, Claude, Llama, Falcon) via API gateway. Model selection per agent based on task complexity and cost. Future: on-premise inference on e& / G42 GPU infrastructure for sovereign workloads. Voice: Twilio / e& telephony + Deepgram / Whisper STT + TTS pipeline.</p>
      </Card>
    </div>

    {/* Roadmap */}
    <SH>Delivery roadmap</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(270px, 1fr))",gap:12,marginBottom:14}}>
      {[
        {p:"Phase 1",t:"Platform & First Agents",time:"Days 1–30",d:"AIdeology deploys on-premise at e& to build the marketplace platform baseline and first 5–6 AI use cases. SDD-generated agents include AI Voice Receptionist, WhatsApp Business Agent, Auto Web-Crawl Receptionist, Booking Agent, and Chat Assistant. Platform includes storefront, onboarding flow, and billing hooks.",items:["SDD specs and blueprints for each agent","Platform storefront & self-service onboarding","e& billing API integration","Voice + chat + WhatsApp channels","Arabic & English NLP baseline"]},
        {p:"Phase 2",t:"Iterate & First Customers",time:"Days 30–60",d:"Iterate from early customer feedback, polish UX, onboard first 10–20 reference SMBs, deliver production-ready v1. Tune Arabic NLP, add analytics dashboard for e& leadership, finalise subscription tiers and pricing.",items:["Production hardening & QA","First 10–20 live customers","Analytics dashboard for e&","Subscription tier finalisation","Performance monitoring & SLA setup"]},
        {p:"Phase 3",t:"Blueprints & Knowledge Transfer",time:"Days 60–90",d:"Create reusable SDD specs and blueprints for each agent type so e&'s team can build new agents independently. Full training programme — technical (how to write specs, modify agents, run acceptance tests) and commercial (how to sell, how to onboard). Scale-ready documentation and support SLAs.",items:["SDD spec and blueprint documentation","e& team training (3–5 people)","Playbook: new agent creation","Support & escalation SLA definition","Handoff & IP transfer"]},
      ].map((p,i)=><Card key={i}>
        <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:10}}>
          <span style={{fontSize:10.5,fontWeight:600,color:"#999"}}>{p.p}</span><Badge v="teal">{p.time}</Badge>
        </div>
        <h4 style={{fontSize:15.5,fontWeight:600,color:"#111",marginBottom:6}}>{p.t}</h4>
        <p style={{fontSize:12,color:"#777",lineHeight:1.6,marginBottom:12}}>{p.d}</p>
        {p.items.map((item,j)=><div key={j} style={{display:"flex",alignItems:"center",gap:7,fontSize:12,color:"#555",marginBottom:4}}>
          <span style={{color:"#E00800",flexShrink:0}}><CheckIcon/></span>{item}
        </div>)}
      </Card>)}
    </div>

    {/* Phase 1 agent catalog */}
    <SH>Phase 1 agents at launch</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))",gap:12,marginBottom:14}}>
      {[
        {n:"Voice Receptionist",d:"Answer, qualify, and route inbound calls. 24/7. Voice + IVR.",a:"$5–10K",dep:"Call rules, FAQs"},
        {n:"WhatsApp FAQ Bot",d:"Automated chat with human tone. WhatsApp Business API.",a:"$3–8K",dep:"FAQ + vector DB"},
        {n:"Lead Qualification (SMB)",d:"Score and route inbound leads. Simple rules, no CRM lock-in.",a:"$6–12K",dep:"Qualification rules"},
        {n:"Appointment Scheduler",d:"Calendar sync, reminders, rescheduling. No back-and-forth.",a:"$4–9K",dep:"Calendar API"},
        {n:"Invoice Collection",d:"Polite chase on overdue invoices. Logs status to accounting.",a:"$5–10K",dep:"Accounting data"},
        {n:"HR Screening Bot",d:"First-line CV screening against role criteria. Shortlist for HR.",a:"$4–8K",dep:"Role criteria"},
      ].map((s,i)=><Card key={i} style={{padding:18}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <Badge v="teal">Phase 1</Badge>
          <div style={{fontSize:11,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font}}>{s.a}/yr</div>
        </div>
        <h4 style={{fontSize:13.5,fontWeight:700,color:"#111",marginBottom:4}}>{s.n}</h4>
        <p style={{fontSize:11.5,color:"#777",lineHeight:1.5,marginBottom:8}}>{s.d}</p>
        <div style={{fontSize:10.5,color:"#999"}}>Data: {s.dep}</div>
      </Card>)}
    </div>

    {/* Phase 2 enterprise vertical agents */}
    <SH>Phase 2 vertical agents</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))",gap:12,marginBottom:14}}>
      {[
        {n:"KYC / AML Compliance",d:"Sanctions screening and risk scoring for fintech and banking.",v:"Fintech",a:"$100–200K"},
        {n:"Customer Support Escalation",d:"Reads CRM and ticket context. Drafts responses, escalates exceptions.",v:"Telecom · E-com",a:"$80–150K"},
        {n:"Patient Triage",d:"Symptom intake and routing. HIPAA-aligned synthetic data ready.",v:"Healthcare",a:"$75–125K"},
        {n:"Property Inquiry",d:"Qualifies inbound leads, books viewings, syncs to CRM.",v:"Real estate",a:"$60–100K"},
      ].map((s,i)=><Card key={i} style={{padding:18}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <Badge v="violet">Phase 2</Badge>
          <div style={{fontSize:11,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font}}>{s.a}/yr</div>
        </div>
        <h4 style={{fontSize:13.5,fontWeight:700,color:"#111",marginBottom:4}}>{s.n}</h4>
        <p style={{fontSize:11.5,color:"#777",lineHeight:1.5,marginBottom:8}}>{s.d}</p>
        <div style={{fontSize:10.5,color:"#999"}}>Vertical: {s.v}</div>
      </Card>)}
    </div>

    {/* Vertical templates */}
    <SH>Vertical templates</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))",gap:10,marginBottom:14}}>
      {[
        {n:"Fintech / Banking",arpu:"$200–400K",y1:"20–30 customers"},
        {n:"Healthcare",arpu:"$150–300K",y1:"30–40 customers"},
        {n:"Hospitality",arpu:"$80–150K",y1:"50–80 customers"},
        {n:"Real estate",arpu:"$100–200K",y1:"40–60 customers"},
        {n:"Government",arpu:"$120–250K",y1:"15–25 customers"},
        {n:"Retail",arpu:"$60–120K",y1:"100–150 customers"},
      ].map((v,i)=><Card key={i} style={{padding:16}}>
        <h4 style={{fontSize:13,fontWeight:700,color:"#111",marginBottom:6}}>{v.n}</h4>
        <div style={{fontSize:11,color:"#777",marginBottom:3}}>ARPU: <strong style={{color:BRAND.red}}>{v.arpu}</strong></div>
        <div style={{fontSize:11,color:"#777"}}>Year 1: {v.y1}</div>
      </Card>)}
    </div>

    {/* 3-segment strategy */}
    <SH>Three-segment strategy</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:12,marginBottom:14}}>
      {[
        {seg:"SMB",vol:"80% of volume",arpu:"$30–60K ARPU",y1:"500–1,000 customers · $20–40M Y1",gtm:"Marketplace, referrals, affiliate partners",foc:"Self-serve templates, minimal customisation, no support overhead"},
        {seg:"Enterprise",vol:"15% of volume",arpu:"$200–500K ARPU",y1:"50–100 customers · $12–25M Y1",gtm:"Direct sales, white-glove POCs, e& OpCo anchors",foc:"Custom integrations, compliance, premium SLA"},
        {seg:"Professional services",vol:"5% of volume · Resale",arpu:"$50–150K ARPU",y1:"100–150 partners · $8–12M Y1",gtm:"Partner enablement, 20–30% margin, certification",foc:"White-label delivery, client customisation, implementation services"},
      ].map((s,i)=><Card key={i} style={{padding:18,borderLeft:`3px solid ${BRAND.red}`}}>
        <Badge v="teal">{s.seg}</Badge>
        <div style={{fontSize:11,color:"#999",marginTop:8}}>{s.vol}</div>
        <div style={{fontSize:18,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font,margin:"6px 0"}}>{s.arpu}</div>
        <div style={{fontSize:12,color:"#444",fontWeight:600,marginBottom:6}}>{s.y1}</div>
        <p style={{fontSize:11.5,color:"#777",lineHeight:1.55,marginBottom:6}}>{s.foc}</p>
        <div style={{fontSize:11,color:"#888",lineHeight:1.5}}><strong>GTM:</strong> {s.gtm}</div>
      </Card>)}
    </div>
    <Note label="Year 1 combined opportunity">$40–77M revenue across 650–1,250 customers. Average gross margin ~65% (60% SMB, 70% Enterprise, 65% PS). Driven by self-serve SMB volume plus enterprise vertical anchors and partner resale.</Note>

    {/* Commercials */}
    <SH>Commercial model</SH>
    <CommercialBox title="SMB Marketplace Commercials" icon="$" iconBg="#F5F5F5" iconColor="#E00800" items={[
      {label:"Implementation",value:"$150K–$250K",color:"#E00800",type:"Fixed fee",desc:"Platform build, 5–6 SDD-specified agents, on-premise deployment, blueprints & training."},
      {label:"Revenue Share",value:"10–20%",color:"#E00800",type:"Of gross subscription revenue",desc:"Ongoing % of SMB subscriptions. Degressive tiers as volume scales."},
      {label:"New Blueprints",value:"$15K–$30K",color:"#E00800",type:"Per SDD spec + blueprint",desc:"Additional agents beyond initial 5–6, scoped by workflow and integration complexity."},
    ]}/>

    <SH>AIdeology commercials — 3-year view</SH>
    <CommercialBox title="AIdeology Revenue Breakdown" icon="A" iconBg="#F5F5F5" iconColor="#E00800" items={[
      {label:"Year 1",value:"$200K–$350K",color:"#E00800",type:"Implementation + rev-share ramp",desc:"Bulk from fixed fee. Rev-share from Month 3 as first SMBs subscribe."},
      {label:"Year 2",value:"$180K–$400K",color:"#E00800",type:"Rev-share + new blueprints",desc:"1,500–3,000 subscribers. Plus 3–5 new SDD specs and blueprints at $15K–$30K each."},
      {label:"Year 3",value:"$250K–$600K",color:"#E00800",type:"Rev-share at scale",desc:"3,000–5,000+ subs. Blueprints & advisory on expansion to new markets."},
    ]}/>

    <SH>e& revenue forecast</SH>
    <ForecastTable color="#E00800" bgLight="#F5F5F5"
      rows={[
        {s:"SMB subscriptions (gross)",y1:"$360K–$720K",y2:"$1.08M–$2.16M",y3:"$2.16M–$5.4M"},
        {s:"Less: AIdeology rev-share (15%)",y1:"($54K–$108K)",y2:"($162K–$324K)",y3:"($324K–$810K)"},
        {s:"Net subscription revenue",y1:"$306K–$612K",y2:"$918K–$1.84M",y3:"$1.84M–$4.59M"},
        {s:"Connectivity upsell",y1:"$100K–$200K",y2:"$300K–$600K",y3:"$600K–$1.2M"},
        {s:"Bundle premium",y1:"$50K–$100K",y2:"$150K–$300K",y3:"$300K–$600K"},
      ]}
      totalRow={{y1:"$456K–$912K",y2:"$1.37M–$2.74M",y3:"$2.74M–$6.39M"}}
      assumptions={["500 subs Y1→1,500 Y2→3,000+ Y3","ARPU $60/mo avg","15% mid-range rev-share","20–30% take connectivity bundles","Churn ~5%→3%/mo"]}
    />
    <Note label="Agreement structure">24-month partnership with minimum implementation fee commitment and rev-share floor. After Phase 3, e& retains full IP ownership of SDD specs, blueprints, and agent configurations and can scale independently. AIdeology remains invested via rev-share — incentives aligned with marketplace success.</Note>
  </div>;
}

/* ════════════════════════════════════════════════════════════ */
/* ENTERPRISE & GOV */
/* ════════════════════════════════════════════════════════════ */
function EnterpriseSegment() {
  return <div>
    <div style={{padding:"44px 0 36px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><Badge v="violet">Pillar 02</Badge><span style={{fontSize:12,color:"#888"}}>Co-sell · Deliver · Operate</span></div>
      <h2 style={{fontSize:34,fontWeight:700,color:"#111",lineHeight:1.08,marginBottom:14,fontFamily:BRAND.font}}>Win enterprise AI</h2>
      <p style={{fontSize:14.5,color:"#666",maxWidth:640,lineHeight:1.7,marginBottom:10}}>
        e& owns the client relationship. AIdeology designs and delivers the AI layer. Together, you sell custom solutions for regulated enterprises and government clients.
      </p>
      <p style={{fontSize:13,color:"#888",maxWidth:640,lineHeight:1.7,marginBottom:28}}>
        The offer is simple: adapt proven agents, build custom AI workflows, and deploy into e& / G42 cloud or customer sovereign environments.
      </p>
      <div style={{display:"flex",gap:28,flexWrap:"wrap"}}>
        {[{v:"SLA-backed",l:"Delivery guarantee"},{v:"Full",l:"System integration"},{v:"10+",l:"Languages"},{v:"Sovereign",l:"Data residency"},{v:"6 layers",l:"Enterprise AI success"}].map((s,i)=><div key={i} style={{minWidth:85}}>
          <div style={{fontSize:22,fontWeight:700,color:"#E00800",fontFamily:BRAND.font}}>{s.v}</div>
          <div style={{fontSize:10.5,color:"#999",marginTop:2}}>{s.l}</div>
        </div>)}
      </div>
    </div>

    {/* SMB vs Enterprise */}
    <SH>SMB tools vs enterprise systems</SH>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
      <Card style={{background:"#FFFFFF"}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",color:"#999",textTransform:"uppercase",marginBottom:8}}>SMB — Digital marketplace</div>
        <p style={{fontSize:12,color:"#777",lineHeight:1.7}}>Generic inference API · SaaS connectors · Multi-tenant cloud · Basic Arabic/English · Subscription pricing · Days to deploy · No compliance layer required</p>
      </Card>
      <Card style={{borderLeft:"3px solid #E00800"}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",color:"#E00800",textTransform:"uppercase",marginBottom:8}}>Enterprise — AI operating system</div>
        <p style={{fontSize:12,color:"#777",lineHeight:1.7}}>Fine-tuned / private model · ERP/CRM/HIS deep integration · Sovereign or on-premise deployment · Full audit trail + RBAC · DHA/CBUAE/NESA/ADDA compliance · 3–6 month operationalisation · PS-heavy engagement</p>
      </Card>
    </div>

    {/* 6 Layers */}
    <SH>Six layers that matter</SH>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
      {[
        {n:"01",t:"Data & systems integration",d:"Agents must read/write to systems of record — Oracle Fusion, SAP S/4HANA, Epic, Temenos. API gateway, data mapping, real-time sync."},
        {n:"02",t:"Regulatory compliance",d:"DHA (healthcare), CBUAE (finance), NESA (critical infra), ADDA (data). Full audit trail and human-in-the-loop gates mandatory."},
        {n:"03",t:"Sovereign & private deployment",d:"Deployment complexity depends on environment. e& / G42 cloud is controlled and reusable; customer-owned sovereign or on-prem environments require heavier customisation, security review, networking, and integration."},
        {n:"04",t:"Model fine-tuning",d:"Generic APIs insufficient for enterprise accuracy. Medical Arabic, legal Arabic, financial Arabic — domain fine-tuning on proprietary data inside perimeter."},
        {n:"05",t:"Security & identity",d:"SSO/AD integration, RBAC, zero-trust network policy for all agent traffic. Help AG managed security. One incident can end a programme."},
        {n:"06",t:"Operationalisation",d:"3–6× longer than SMB. Governance committees, IT review, procurement, change management, phased rollout. Requires a partner who understands regulated-sector culture."},
      ].map((l,i)=><Card key={i} style={{padding:16}}>
        <span style={{fontSize:10,fontFamily:"monospace",color:"#E00800",fontWeight:600}}>{l.n}</span>
        <h4 style={{fontSize:13,fontWeight:600,color:"#111",margin:"4px 0"}}>{l.t}</h4>
        <p style={{fontSize:11.5,color:"#777",lineHeight:1.55}}>{l.d}</p>
      </Card>)}
    </div>

    {/* Industry verticals */}
    <SH>Industry examples</SH>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
      {[
        {icon:"HC",n:"Healthcare",s:"Patient intake + clinical coordination",d:"Voice and scheduling agents connect to HIS systems. DHA controls, sovereign hosting, and Arabic medical language support.",tags:["DHA","HIS integration","Arabic NLP"]},
        {icon:"FS",n:"Financial services",s:"Banking and trade finance workflows",d:"KYC and AML-aware agents connect to core banking. CBUAE audit trail and controlled deployment options.",tags:["CBUAE/AML","Core banking API","On-premise"]},
        {icon:"RE",n:"Real estate",s:"Developer sales workflow",d:"Lead capture, CRM updates, contract steps, and DLD filing with human approval at regulated moments.",tags:["DLD compliance","CRM integration","Multi-agent"]},
        {icon:"EG",n:"Energy & government",s:"Operations command centre",d:"Voice agents connect to SAP PM and field ops. Critical actions require human confirmation.",tags:["NESA","SAP PM","Human-in-loop"]},
      ].map((v,i)=><Card key={i} style={{padding:16}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
          <span style={{width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",background:BRAND.red,color:BRAND.white,fontSize:10,fontWeight:700}}>{v.icon}</span>
          <div><div style={{fontSize:13,fontWeight:600,color:"#111"}}>{v.n}</div><div style={{fontSize:10.5,color:"#999"}}>{v.s}</div></div>
        </div>
        <p style={{fontSize:11.5,color:"#777",lineHeight:1.55,marginBottom:8}}>{v.d}</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>{v.tags.map((t,j)=><Badge key={j} v="violet">{t}</Badge>)}</div>
      </Card>)}
    </div>

    {/* Software Stack */}
    <SH>Software stack & technology</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",gap:10,marginBottom:14}}>
      {[
        {t:"Agent orchestration",d:"Multi-agent framework with tool integration, conversation memory, guardrails, human-in-the-loop gates. Supports voice, chat, WhatsApp, email channels. Arabic-first NLP with domain-specific fine-tuning."},
        {t:"Systems integration",d:"API gateway for ERP/CRM/HIS connectors (Oracle Fusion, SAP, Epic, Temenos). Real-time data pipeline between AI cluster and enterprise systems. Event-driven architecture."},
        {t:"Compliance & security",d:"Full audit trail, RBAC, SSO/AD integration. Help AG managed security wrap. DHA/CBUAE/NESA/ADDA compliance templates. Zero-trust network policy for AI traffic."},
        {t:"On-premise AI infra",d:"GPU inference clusters (NVIDIA H100/H200, AMD MI300X). Dell AI Factory / HPE PCAI / Supermicro. NVIDIA AI Enterprise (NVAIE). AI storage (VAST, DDN, Pure Storage). Connected to e& network for managed services."},
        {t:"Model layer",d:"Multi-model inference (GPT-4o, Claude, Llama, Falcon). Domain fine-tuning on sovereign hardware. RAG architecture: vector DB, chunking, Arabic retrieval evaluation. Model registry & versioning."},
        {t:"SDD for repeatable patterns",d:"SDD specs and blueprints used for Tier 1 adapted agents (same methodology as SMB). For Tier 2 custom builds, SDD provides the requirements, acceptance criteria, test plan, and agent blueprint; custom development adds depth of integration and compliance logic."},
      ].map((s,i)=><Card key={i} style={{padding:16}}>
        <h4 style={{fontSize:12.5,fontWeight:600,color:"#111",marginBottom:5}}>{s.t}</h4>
        <p style={{fontSize:11.5,color:"#777",lineHeight:1.55}}>{s.d}</p>
      </Card>)}
    </div>

    {/* Engagement Tiers */}
    <SH>Engagement tiers</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(270px, 1fr))",gap:12,marginBottom:14}}>
      {[
        {tier:"Tier 1",t:"Adapted SMB Agents",d:"Proven marketplace agents elevated for enterprise — deeper CRM/ERP integration, multi-branch, compliance logging, SLA-backed delivery. Built via SDD with custom specs and integration layers.",price:"$30K–$80K",note:"per agent · setup + monthly managed",items:["Multi-branch routing","CRM/ERP connectivity","Compliance logging","SDD spec + blueprint + custom config"]},
        {tier:"Tier 2",t:"Custom AI Solutions",d:"Bespoke agentic platforms for complex workflows — contact centre AI, document intelligence, approval orchestration, predictive maintenance, and security agents — deployed into e& or G42 cloud where the environment is controlled, repeatable, and easier to support.",price:"$300K–$600K",note:"per project · e& / G42 controlled cloud",items:["Contact Centre Operations","Document Intelligence","Approval Orchestration","Multi-agent with human-in-loop"]},
        {tier:"Tier 3",t:"Sovereign & On-Prem",d:"Fully customised deployment on customer premises or customer-controlled sovereign environments. These projects require customer-specific architecture, security approval, networking, identity, data residency, air-gapped options, audit-grade controls, and deeper integration with legacy systems.",price:"$600K–$1M",note:"per project · customer customised environment",items:["On-prem inference clusters","Sovereign POD deployment","Customer-specific security architecture","Help AG security wrap"]},
      ].map((t,i)=><Card key={i} style={{display:"flex",flexDirection:"column"}}>
        <Badge v="violet">{t.tier}</Badge>
        <h4 style={{fontSize:16,fontWeight:600,color:"#111",margin:"12px 0 6px"}}>{t.t}</h4>
        <p style={{fontSize:12,color:"#777",lineHeight:1.6,marginBottom:14}}>{t.d}</p>
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:5,marginBottom:16}}>
          {t.items.map((item,j)=><div key={j} style={{display:"flex",alignItems:"center",gap:7,fontSize:12,color:"#555"}}><span style={{color:"#E00800",flexShrink:0}}><CheckIcon/></span>{item}</div>)}
        </div>
        <div style={{borderTop:"1px solid #f0f0f0",paddingTop:14}}>
          <div style={{fontSize:20,fontWeight:700,color:"#E00800",fontFamily:BRAND.font}}>{t.price}</div>
          <div style={{fontSize:10.5,color:"#999",marginTop:2}}>{t.note}</div>
        </div>
      </Card>)}
    </div>

    {/* e& B2B Acceleration Program */}
    <SH>e& B2B Acceleration Program</SH>
    <Card style={{padding:24,borderLeft:`4px solid ${BRAND.red}`}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,flexWrap:"wrap"}}>
        <Badge v="violet">RFP 1180595-QCS-IM</Badge>
        <span style={{fontSize:11.5,color:"#888"}}>12 agents · 4 categories · 18 countries · 18 months</span>
      </div>
      <p style={{fontSize:13,color:"#555",lineHeight:1.7,marginBottom:10}}>
        A dedicated agent program for the e& B2B transformation. Twelve agents organised across customer engagement, commercial intelligence, internal governance, and sovereign multi-market intelligence. Built spec-first with named human review gates on every commercial, legal, and compliance output.
      </p>
      <p style={{fontSize:13,color:"#555",lineHeight:1.7}}>
        Program runs 18 months. Up to three agents build in parallel. Every agent ships through three stages — Demo, MVP, App — with a go/no-go gate at each stage so e& only commits to the next stage when value is proven.
      </p>
    </Card>

    <SH>Agent catalog · 4 categories</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:12,marginBottom:14}}>
      {[
        {cat:"01 · Customer engagement & sales enablement",ph:"Phase 1 · Highest adoption",agents:["Customer Briefing Agent","Customer Pitch Presentation Agent","Meeting Intelligence & Follow-Up Agent","RFP / Proposal Drafting Agent (scoped)"],note:"Direct impact on 50 SMB and 400 Enterprise sales reps. Account manager review gate on all outbound content."},
        {cat:"02 · Commercial planning & intelligence",ph:"Phase 1 + 2 · Data-gated",agents:["Knowledge Management Agent","Lead-by-Lead Pricing Agent","Product Opportunity Identification","Business Case Simulation Agent"],note:"Pricing Committee, Finance, and Strategy gates. 30-day CRM and finance data audit before pricing or business case agents launch."},
        {cat:"03 · Internal governance & program office",ph:"Phase 1 + 2 · AIdeology exclusive",agents:["PMO Orchestration Agent","Executive Decision Dashboard","Compliance & Sovereignty Checker","Operating Model Design Agent"],note:"Cuts PMO admin time ~80%. Executive Decision Dashboard is decision support, not personal AI. Legal reviews every compliance flag."},
        {cat:"04 · Sovereign & multi-market intelligence",ph:"Phase 1 + 2 · Arabic-first",agents:["Sovereign Regulatory Intelligence","Arabic & Multilingual Content Agent","Multi-Market GTM Intelligence","Competitive Intelligence Agent"],note:"Built for 18 countries and 7 languages. Hyperscalers cannot match this — it is the strongest moat in the program."},
      ].map((c,i)=><Card key={i} style={{padding:18,height:"100%"}}>
        <div style={{fontSize:11.5,fontWeight:700,color:BRAND.red,letterSpacing:"0.04em",marginBottom:8}}>{c.cat}</div>
        <div style={{fontSize:10.5,color:"#999",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.06em"}}>{c.ph}</div>
        {c.agents.map((a,j)=><div key={j} style={{display:"flex",alignItems:"flex-start",gap:7,fontSize:12,color:"#444",marginBottom:5,lineHeight:1.45}}>
          <span style={{color:BRAND.red,flexShrink:0,marginTop:1}}><CheckIcon/></span>{a}
        </div>)}
        <div style={{fontSize:11,color:"#777",lineHeight:1.55,marginTop:10,paddingTop:10,borderTop:`1px solid ${BRAND.border}`}}>{c.note}</div>
      </Card>)}
    </div>

    <SH>Three-stage delivery</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:12,marginBottom:14}}>
      {[
        {st:"Stage 01 · Demo",time:"Days 1–14",t:"Prove the concept",d:"Working demonstration on synthetic or sample data. Validates agent logic, output format, and guardrails — not live integration.",items:["Synthetic / sample data","Core logic validated","Guardrails tested","e& sponsor go / no-go"]},
        {st:"Stage 02 · MVP",time:"Weeks 3–8",t:"Build with real data",d:"Agent connected to live e& systems. Pilot group of 5–15 designated users per agent. All external outputs reviewed before delivery.",items:["Live system integrations","Pilot users in workflow","Human review on all outputs","Weekly iteration · 48h fixes"]},
        {st:"Stage 03 · App",time:"Months 2–4",t:"Deploy at scale",d:"Released to full population — SMB Sales (50), Enterprise Sales (400), or department. Full RBAC, audit logging, and human approval gate live.",items:["Full user population","Production integrations","RBAC and audit logging","30-day hypercare, then handover"]},
      ].map((s,i)=><Card key={i} style={{padding:18}}>
        <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:8}}>
          <span style={{fontSize:10.5,fontWeight:700,color:"#999"}}>{s.st}</span><Badge v="violet">{s.time}</Badge>
        </div>
        <h4 style={{fontSize:15,fontWeight:700,color:"#111",marginBottom:6}}>{s.t}</h4>
        <p style={{fontSize:12,color:"#777",lineHeight:1.6,marginBottom:10}}>{s.d}</p>
        {s.items.map((it,j)=><div key={j} style={{display:"flex",alignItems:"center",gap:7,fontSize:12,color:"#555",marginBottom:4}}>
          <span style={{color:BRAND.red,flexShrink:0}}><CheckIcon/></span>{it}
        </div>)}
      </Card>)}
    </div>

    <SH>Program pricing · retainer + per-agent stages</SH>
    <CommercialBox title="e& B2B Acceleration · 18-month program" icon="$" iconBg="#F5F5F5" iconColor="#E00800" items={[
      {label:"Monthly retainer",value:"$115K",color:"#E00800",type:"Per month · core team on-account",desc:"Engagement Partner, 2 AI Architects, 2 AI Engineers, PMO Lead, Arabic & Regulatory SMEs. 18 months = $2.07M."},
      {label:"Per-agent fees",value:"Demo / MVP / App",color:"#E00800",type:"Charged per stage",desc:"e& commits to each stage before the next begins. Fees reflect agent complexity tier (Standard, Advanced, Specialist)."},
      {label:"Stage credits",value:"100% / 50%",color:"#E00800",type:"Demo → MVP → App",desc:"Demo fee 100% credited toward MVP if e& proceeds within 30 days. MVP fee 50% credited toward App. Full price paid only once."},
    ]}/>
    <Note label="Why this structure works">e& only pays the full agent cycle once. Earlier stages are deposits, not extra cost. Each gate gives e& a real, working artefact before more spend is committed. The retainer covers governance and parallel delivery so multiple agents progress at once without bottlenecks.</Note>

    {/* Government */}
    <SH>Government agency clusters</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(190px, 1fr))",gap:10,marginBottom:14}}>
      {[
        {n:"Citizen Services",d:"Visa, ID, municipal permits, enquiries"},
        {n:"Public Safety",d:"Police services, fines, court scheduling"},
        {n:"Health & Social",d:"Hospitals, social welfare, vaccinations"},
        {n:"Education",d:"Admissions, scholarships, exams"},
        {n:"Economy & Trade",d:"Business registration, trade licences"},
      ].map((g,i)=><Card key={i} style={{padding:14}}>
        <Badge v="violet">{g.n}</Badge>
        <p style={{fontSize:11,color:"#888",lineHeight:1.5,marginTop:6}}>{g.d}</p>
      </Card>)}
    </div>

    {/* Commercials */}
    <SH>Commercial model</SH>
    <CommercialBox title="Enterprise & Government Commercials" icon="$" iconBg="#F5F5F5" iconColor="#E00800" items={[
      {label:"Revenue Split",value:"60 / 40",color:"#E00800",type:"AIdeology / e&",desc:"e& sells, owns customer & hosting. AIdeology delivers. Joint GTM."},
      {label:"Managed Service",value:"$5K–$25K",color:"#E00800",type:"Monthly per client",desc:"Ongoing support, monitoring & evolution. Shared at agreed ratio."},
      {label:"Success Fee",value:"10–15%",color:"#E00800",type:"KPI uplift",desc:"Optional bonus tied to measurable outcomes."},
    ]}/>

    <SH>AIdeology commercials — 3-year view</SH>
    <CommercialBox title="AIdeology Revenue Breakdown" icon="A" iconBg="#F5F5F5" iconColor="#E00800" items={[
      {label:"Year 1",value:"$700K–$3M",color:"#E00800",type:"3–8 projects + managed service",desc:"Tier 2 projects at $300K–$600K in e& / G42 cloud, with selective Tier 3 sovereign pilots. Managed from Month 4."},
      {label:"Year 2",value:"$1.6M–$5.5M",color:"#E00800",type:"8–15 projects + managed base",desc:"Larger mix of Tier 2 and Tier 3 projects. Customer sovereign deployments ramp. 8–12 managed retainers."},
      {label:"Year 3",value:"$3M–$8M",color:"#E00800",type:"Scale + flagships",desc:"Gov and regulated-sector flagships at $600K–$1M. 15–20 managed clients. Regional expansion."},
    ]}/>

    <SH>e& revenue forecast</SH>
    <ForecastTable color="#E00800" bgLight="#F5F5F5"
      rows={[
        {s:"Project revenue (e& 40%)",y1:"$360K–$1.9M",y2:"$960K–$3.6M",y3:"$2.4M–$7M"},
        {s:"Hosting & infrastructure",y1:"$150K–$400K",y2:"$500K–$1.2M",y3:"$1.2M–$2.8M"},
        {s:"Managed service (40%)",y1:"$48K–$180K",y2:"$300K–$900K",y3:"$700K–$1.8M"},
        {s:"Connectivity & telco upsell",y1:"$75K–$200K",y2:"$300K–$700K",y3:"$800K–$1.5M"},
      ]}
      totalRow={{y1:"$633K–$2.68M",y2:"$2.06M–$6.4M",y3:"$5.1M–$13.1M"}}
      assumptions={["3–8 deals Y1→8–15 Y2→15–25 Y3","Tier 2: $300K–$600K in e& / G42 cloud","Tier 3: $600K–$1M for customer sovereign/on-prem","40% e& project share","Hosting margins ~60–70%"]}
    />
    <Note label="Partnership model">Co-sell — e& is commercial front, AIdeology is delivery engine. e& retains customer relationship and hosting revenue. AIdeology earns implementation and managed service fees. Variable-revenue model with no large upfront commitment from e&. On-premise Track B builds e&'s own AI infra capability over time.</Note>
  </div>;
}

/* ════════════════════════════════════════════════════════════ */
/* GPU & PLATFORM */
/* ════════════════════════════════════════════════════════════ */
function GPUSegment() {
  return <div>
    <div style={{padding:"44px 0 36px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><Badge v="rose">Pillar 03</Badge><span style={{fontSize:12,color:"#888"}}>Compute · Platform · SDD</span></div>
      <h2 style={{fontSize:34,fontWeight:700,color:"#111",lineHeight:1.08,marginBottom:14,fontFamily:BRAND.font}}>Build sovereign compute</h2>
      <p style={{fontSize:14.5,color:"#666",maxWidth:640,lineHeight:1.7,marginBottom:10}}>
        Help e& package GPU capacity into a usable AI platform. Customers create specs, deploy agents, monitor usage, and run workloads on trusted infrastructure.
      </p>
      <p style={{fontSize:13,color:"#888",maxWidth:640,lineHeight:1.7,marginBottom:28}}>
        The platform is the margin layer above compute. It gives customers sovereign inference, fine-tuning, and agent orchestration without building the stack themselves.
      </p>
      <div style={{display:"flex",gap:28,flexWrap:"wrap"}}>
        {[{v:"3 streams",l:"Parallel workstreams"},{v:"6 months",l:"Full platform"},{v:"G42/NVIDIA",l:"Compatible"},{v:"Self-serve",l:"Customer platform"},{v:"SDD",l:"Agent builder"}].map((s,i)=><div key={i} style={{minWidth:85}}>
          <div style={{fontSize:22,fontWeight:700,color:"#E00800",fontFamily:BRAND.font}}>{s.v}</div>
          <div style={{fontSize:10.5,color:"#999",marginTop:2}}>{s.l}</div>
        </div>)}
      </div>
    </div>

    {/* What we build */}
    <SH>What we build</SH>
    <Card>
      <p style={{fontSize:13,color:"#555",lineHeight:1.7,marginBottom:12}}>
        Three workstreams run in parallel: GPUaaS architecture, model middleware, and the customer AI platform. Together they turn raw compute into a managed AI service.
      </p>
      <p style={{fontSize:13,color:"#555",lineHeight:1.7}}>
        This is the layer that supports the SMB marketplace and enterprise solutions. It positions e& as a regional AI infrastructure provider.
      </p>
    </Card>

    {/* Software Stack */}
    <SH>Software stack & technology</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",gap:10,marginBottom:14}}>
      {[
        {t:"GPU orchestration",d:"Kubernetes (K8s) / Slurm for GPU job scheduling. Multi-tenant isolation with namespace-level security. Auto-scaling and load balancing. Compatible with NVIDIA DGX, Dell PowerEdge AI, HPE PCAI, Supermicro."},
        {t:"Model serving & inference",d:"vLLM / TGI / NVIDIA Triton for high-throughput inference. Quantisation & batching optimisation. Model registry with versioning. Inference API gateway with rate limiting and usage metering."},
        {t:"Fine-tuning pipelines",d:"Distributed training with DeepSpeed / FSDP. LoRA & QLoRA for parameter-efficient fine-tuning. Data preparation & evaluation framework. Arabic-domain evaluation benchmarks."},
        {t:"SDD-powered agent builder",d:"Visual + code interface for creating agents from structured SDD specs and blueprints. Drag-and-drop tool integration, guardrail configuration, testing sandbox, and acceptance-test tracking. The same SDD methodology used in the SMB marketplace — now exposed as a self-service platform for enterprise customers."},
        {t:"Monitoring & billing",d:"Usage metering per GPU-hour, per inference call, per fine-tuning job. Real-time dashboards. Cost allocation per team/project. Integration with e& billing systems. SLA monitoring."},
        {t:"Storage & networking",d:"AI-optimised storage (VAST Data, DDN, Pure Storage FlashBlade). 100GbE / InfiniBand networking for training clusters. Edge node support for distributed inference."},
      ].map((s,i)=><Card key={i} style={{padding:16}}>
        <h4 style={{fontSize:12.5,fontWeight:600,color:"#111",marginBottom:5}}>{s.t}</h4>
        <p style={{fontSize:11.5,color:"#777",lineHeight:1.55}}>{s.d}</p>
      </Card>)}
    </div>

    {/* Sovereign infrastructure partners */}
    <SH>Sovereign infrastructure partners</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:10,marginBottom:14}}>
      {[
        {n:"e& Data Centres",r:"Host AIdeology platform and customer data",d:"3 × 100MW DCs in UAE · 100MW Morocco · 100MW Hungary · PPF region planned."},
        {n:"G42 / Core42",r:"GPU compute, AI cloud, fine-tuning",d:"Core42 AI Cloud (GPUaaS) · accelerated inference · sovereign fine-tuning infrastructure."},
        {n:"Microsoft Azure",r:"Managed services, OpenAI APIs",d:"Azure OpenAI Service · PostgreSQL managed · Redis cache. Proxied through sovereign gateway with no data retention."},
        {n:"Qualcomm",r:"Edge AI devices, on-device models",d:"AI PCs, smart glasses, 5G gateways, drones. Edge deployment option for distributed inference."},
      ].map((p,i)=><Card key={i} style={{padding:16}}>
        <h4 style={{fontSize:13,fontWeight:700,color:"#111",marginBottom:4}}>{p.n}</h4>
        <div style={{fontSize:11,color:BRAND.red,fontWeight:600,marginBottom:8,letterSpacing:"0.04em",textTransform:"uppercase"}}>{p.r}</div>
        <p style={{fontSize:11.5,color:"#777",lineHeight:1.55}}>{p.d}</p>
      </Card>)}
    </div>

    {/* LLM routing tiers */}
    <SH>Multi-LLM intelligent routing</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{padding:"16px 22px",borderBottom:`1px solid ${BRAND.border}`}}>
        <div style={{fontSize:13,fontWeight:700,color:"#111",marginBottom:4}}>Six tiers · automatic selection per request</div>
        <p style={{fontSize:12,color:"#777",lineHeight:1.5,margin:0}}>The platform picks the right model for the job — no manual configuration. Latency-sensitive, complex reasoning, cost-optimised, or specialised — each request routes to the best fit. Failover chain keeps the service running.</p>
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:560}}>
          <thead><tr style={{borderBottom:`1px solid ${BRAND.border}`,background:BRAND.lightGrey}}>
            {["Tier","Models","Use case","Cost / 1M tokens","Launch"].map((h,i)=><th key={i} style={{textAlign:i>2?"right":"left",padding:"10px 16px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {[
              {t:"Premium",m:"GPT-5.4 · Claude Sonnet 4.6 · Gemini 3.1",u:"Complex reasoning, compliance, voice",c:"$1.75–5.00",l:"Day 1"},
              {t:"Performance",m:"GPT-4 Turbo · Claude Flash · Gemini Flash",u:"Customer support, FAQ, balanced",c:"$0.50–2.00",l:"Day 1"},
              {t:"Cost-optimised",m:"Qwen 3.5 · DeepSeek v4 · Mistral",u:"High-volume SMB, simple queries",c:"$0.10–0.50",l:"Week 2"},
              {t:"Specialised",m:"Cohere Rerank · Llama 3.1 · Falcon",u:"Vision, legal, domain expertise",c:"$0.30–1.50",l:"Month 2"},
              {t:"Open-source hub",m:"Hugging Face (Llama, Mistral, Falcon)",u:"Air-gapped, ultra-low cost, full control",c:"$0–0.10 self-hosted",l:"Month 3"},
              {t:"Bring-your-own",m:"Customer fine-tuned models",u:"Customer-specific via API",c:"Variable",l:"Month 4"},
            ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`}}>
              <td style={{padding:"12px 16px",fontWeight:700,color:"#111"}}>{r.t}</td>
              <td style={{padding:"12px 16px",color:"#444"}}>{r.m}</td>
              <td style={{padding:"12px 16px",color:"#777"}}>{r.u}</td>
              <td style={{padding:"12px 16px",textAlign:"right",color:BRAND.red,fontFamily:BRAND.font,fontWeight:600}}>{r.c}</td>
              <td style={{padding:"12px 16px",textAlign:"right",color:"#777"}}>{r.l}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </Card>

    {/* Build / Buy / Partner */}
    <SH>Build · buy · partner</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",gap:10,marginBottom:14}}>
      {[
        {h:"Build · don't compromise",items:["Voice + WhatsApp integration handlers","Agent builder UI (drag-drop)","Orchestration & context management","Multi-model intelligent router","Billing & subscription logic","Multi-tenancy (data isolation)","Compliance & audit logging"]},
        {h:"Buy · don't build",items:["LLM APIs (Claude, OpenAI, Gemini)","Vector database (Pinecone)","Cloud databases (Azure PostgreSQL)","Cache infrastructure (Redis managed)","Payment processing (Stripe)","Authentication (Auth0)"]},
        {h:"Partner · ecosystem",items:["Zapier · 5000+ integrations","Salesforce · Dynamics 365 · Agentforce","Make.com · workflow automation","Microsoft Azure + Office 365","LangChain · backend orchestration","Anthropic · Claude API + regional CSP"]},
      ].map((c,i)=><Card key={i} style={{padding:18}}>
        <div style={{fontSize:11,fontWeight:700,color:BRAND.red,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:10}}>{c.h}</div>
        {c.items.map((it,j)=><div key={j} style={{display:"flex",alignItems:"flex-start",gap:7,fontSize:12,color:"#555",lineHeight:1.5,marginBottom:5}}>
          <span style={{color:BRAND.red,flexShrink:0,marginTop:1}}><CheckIcon/></span>{it}
        </div>)}
      </Card>)}
    </div>

    {/* Streams */}
    <SH>Delivery streams</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(270px, 1fr))",gap:12,marginBottom:14}}>
      {[
        {s:"Stream A",t:"GPUaaS Architecture",time:"Months 1–3",d:"GPU compute offering — cluster topology, orchestration, multi-tenancy, billing meters, capacity planning. Compatible with G42, NVIDIA DGX, Dell, HPE.",items:["GPU cluster design & sizing","Container orchestration","Multi-tenant isolation","Usage metering & billing","Vendor compatibility matrix"]},
        {s:"Stream B",t:"Middleware & Compute",time:"Months 2–4",d:"Model serving infrastructure, fine-tuning pipelines, inference API gateway. The middleware that turns GPU hardware into a managed AI service.",items:["vLLM / TGI serving","Fine-tuning orchestration","Inference API gateway","Model registry & versioning","Autoscaling & load balancing"]},
        {s:"Stream C",t:"Customer AI Platform",time:"Months 3–6",d:"Self-service platform where e& customers create agent specs via SDD, deploy to their infra, and monitor performance. The 'Low-code Enterprise AI Platform' — the highest-value layer.",items:["SDD agent builder (visual + code)","Spec templates and acceptance tests","Deployment & monitoring dashboard","Usage analytics & cost tracking","Team management & RBAC"]},
      ].map((p,i)=><Card key={i}>
        <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:10}}>
          <span style={{fontSize:10.5,fontWeight:600,color:"#999"}}>{p.s}</span><Badge v="rose">{p.time}</Badge>
        </div>
        <h4 style={{fontSize:15.5,fontWeight:600,color:"#111",marginBottom:6}}>{p.t}</h4>
        <p style={{fontSize:12,color:"#777",lineHeight:1.6,marginBottom:12}}>{p.d}</p>
        {p.items.map((item,j)=><div key={j} style={{display:"flex",alignItems:"center",gap:7,fontSize:12,color:"#555",marginBottom:4}}>
          <span style={{color:"#E00800",flexShrink:0}}><CheckIcon/></span>{item}
        </div>)}
      </Card>)}
    </div>

    {/* Commercials */}
    <SH>Commercial model</SH>
    <CommercialBox title="GPUaaS & Platform Commercials" icon="$" iconBg="#F5F5F5" iconColor="#E00800" items={[
      {label:"Architecture",value:"$30K–$50K",color:"#E00800",type:"Monthly advisory retainer",desc:"2–3 senior architects for architecture, technology selection, design reviews."},
      {label:"Platform Build",value:"$300K–$600K",color:"#E00800",type:"Fixed + T&M hybrid",desc:"Fixed for milestones, T&M for iterative features. 6-month cycle."},
      {label:"Royalty",value:"3–7%",color:"#E00800",type:"Of platform GMV (ongoing)",desc:"Long-term revenue share on compute/platform revenues."},
    ]}/>

    <SH>AIdeology commercials — 3-year view</SH>
    <CommercialBox title="AIdeology Revenue Breakdown" icon="A" iconBg="#F5F5F5" iconColor="#E00800" items={[
      {label:"Year 1",value:"$450K–$750K",color:"#E00800",type:"Advisory + platform build",desc:"6 months retainer + first platform milestones. Royalty late Y1."},
      {label:"Year 2",value:"$300K–$700K",color:"#E00800",type:"Platform V2 + royalty ramp",desc:"Enhancements + royalty as GPUaaS customers onboard."},
      {label:"Year 3",value:"$400K–$1.2M",color:"#E00800",type:"Royalty at scale",desc:"Compute GMV scales to $8M–$15M+. Royalty is primary driver."},
    ]}/>

    <SH>e& revenue forecast</SH>
    <ForecastTable color="#E00800" bgLight="#F5F5F5"
      rows={[
        {s:"GPU compute (gross)",y1:"$500K–$1M",y2:"$3M–$6M",y3:"$8M–$18M"},
        {s:"Less: AIdeology royalty (5%)",y1:"($25K–$50K)",y2:"($150K–$300K)",y3:"($400K–$900K)"},
        {s:"Net compute revenue",y1:"$475K–$950K",y2:"$2.85M–$5.7M",y3:"$7.6M–$17.1M"},
        {s:"Platform SaaS fees",y1:"$0",y2:"$200K–$500K",y3:"$800K–$2M"},
        {s:"Professional services",y1:"$100K–$200K",y2:"$300K–$600K",y3:"$500K–$1M"},
        {s:"Fine-tuning & training",y1:"$50K–$100K",y2:"$400K–$800K",y3:"$1M–$3M"},
      ]}
      totalRow={{y1:"$625K–$1.25M",y2:"$3.75M–$7.6M",y3:"$9.9M–$23.1M"}}
      assumptions={["64 GPUs Y1→256 Y2→512+ Y3","Utilisation 40%→65%→80%","$2.50–$3.50/GPU-hr (H100)","Platform SaaS mid-Y2","5% mid-range royalty"]}
    />
    <Note label="Strategic value">Positions e& as a regional AI infrastructure provider. The GPUaaS and platform layer is the foundation everything else runs on. AIdeology brings AI/ML infrastructure expertise; e& brings data centre assets, customer base, and regional reach. The SDD-powered platform — where customers move from spec to deployable agent — is the highest-value, longest-term component.</Note>
  </div>;
}

/* ════════════════════════════════════════════════════════════ */
/* SUMMARY */
/* ════════════════════════════════════════════════════════════ */
function SummarySection() {
  const thStyle = {textAlign:"left",padding:"10px 14px",fontSize:10,fontWeight:600,color:"#999",letterSpacing:"0.06em",textTransform:"uppercase"};
  const tdStyle = {padding:"12px 14px",fontSize:12,color:"#666",borderBottom:"1px solid #f0f0f0"};
  return <div style={{padding:"44px 0 0"}}>
    <SH>Consolidated summary</SH>
    <div style={{overflowX:"auto",marginBottom:32}}>
      <table style={{width:"100%",borderCollapse:"collapse",minWidth:680,fontSize:12}}>
        <thead><tr style={{borderBottom:"2px solid #e8e8e8"}}>
          <th style={thStyle}>Dimension</th>
          <th style={thStyle}><Badge v="teal">SMB</Badge></th>
          <th style={thStyle}><Badge v="violet">Enterprise & Gov</Badge></th>
          <th style={thStyle}><Badge v="rose">GPUaaS</Badge></th>
        </tr></thead>
        <tbody>
          {[
            {d:"What we build",a:"AI marketplace + 5–6 SDD-specified agents",b:"Custom AI + adapted agents + on-prem infra",c:"GPU infra, middleware & SDD platform"},
            {d:"Core tech",a:"SDD specs and blueprints, multi-tenant platform",b:"Agent orchestration, ERP/CRM integration, sovereign",c:"K8s/Slurm, vLLM/TGI, SDD agent builder"},
            {d:"Timeline",a:"60–90 days",b:"8–20 weeks per project",c:"6 months full platform"},
            {d:"Upfront fee",a:"$150K–$250K",b:"$300K–$600K cloud · $600K–$1M sovereign/on-prem",c:"$300K–$600K build"},
            {d:"Recurring",a:"10–20% rev-share",b:"$5K–$25K/mo managed",c:"3–7% platform GMV"},
            {d:"e& role",a:"Sales, billing, support",b:"Commercial front, hosting, Help AG",c:"Infra owner, GTM"},
            {d:"AIdeology role",a:"Build, SDD specs, train, blueprint",b:"Delivery, PS, managed services",c:"Architecture, build, royalty"},
            {d:"IP",a:"e& owns SDD specs and blueprints",b:"Joint / client-owned",c:"e& owns platform"},
          ].map((r,i)=><tr key={i}><td style={{...tdStyle,fontWeight:600,color:"#333"}}>{r.d}</td><td style={tdStyle}>{r.a}</td><td style={tdStyle}>{r.b}</td><td style={tdStyle}>{r.c}</td></tr>)}
        </tbody>
      </table>
    </div>

    <SH>AIdeology 3-year projection</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:14,marginBottom:16}}>
      {[
        {l:"SMB",r:"$630K–$1.35M",n:"Implementation + compounding rev-share",c:"#E00800",v:"teal"},
        {l:"Enterprise & Gov",r:"$5.3M–$16.5M",n:"Controlled cloud projects + sovereign deployments",c:"#E00800",v:"violet"},
        {l:"GPUaaS",r:"$1.15M–$2.65M",n:"Build fees → royalty stream",c:"#E00800",v:"rose"},
      ].map((r,i)=><Card key={i} style={{padding:20}}>
        <Badge v={r.v}>{r.l}</Badge>
        <div style={{fontSize:24,fontWeight:700,color:r.c,fontFamily:BRAND.font,marginTop:10}}>{r.r}</div>
        <div style={{fontSize:11,color:"#999",marginTop:3}}>{r.n}</div>
      </Card>)}
    </div>
    <Card style={{textAlign:"left",padding:28,border:`2px solid ${BRAND.border}`}}>
      <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.1em",color:"#999",textTransform:"uppercase",marginBottom:6}}>Combined AIdeology 3-year potential</div>
      <div style={{fontSize:34,fontWeight:700,color:"#111",fontFamily:BRAND.font}}>$7.1M – $20.5M</div>
    </Card>

    <SH>e& 3-year projection</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:14,marginBottom:16}}>
      {[
        {l:"SMB",y1:"$456K–$912K",y3:"$2.74M–$6.39M",t:"$4.6M–$10M",c:"#E00800",v:"teal"},
        {l:"Enterprise & Gov",y1:"$633K–$2.68M",y3:"$5.1M–$13.1M",t:"$7.8M–$22.2M",c:"#E00800",v:"violet"},
        {l:"GPUaaS",y1:"$625K–$1.25M",y3:"$9.9M–$23.1M",t:"$14.3M–$31.9M",c:"#E00800",v:"rose"},
      ].map((r,i)=><Card key={i} style={{padding:20}}>
        <Badge v={r.v}>{r.l}</Badge>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:12,marginBottom:3}}>
          <span style={{fontSize:10.5,color:"#999"}}>Year 1</span>
          <span style={{fontSize:13,fontWeight:600,color:"#555",fontFamily:BRAND.font}}>{r.y1}</span>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
          <span style={{fontSize:10.5,color:"#999"}}>Year 3</span>
          <span style={{fontSize:13,fontWeight:600,color:"#555",fontFamily:BRAND.font}}>{r.y3}</span>
        </div>
        <div style={{borderTop:"1px solid #f0f0f0",paddingTop:10}}>
          <div style={{fontSize:9.5,fontWeight:600,letterSpacing:"0.08em",color:"#999",textTransform:"uppercase"}}>3-year total</div>
          <div style={{fontSize:18,fontWeight:700,color:r.c,fontFamily:BRAND.font}}>{r.t}</div>
        </div>
      </Card>)}
    </div>
    <Card style={{textAlign:"left",padding:28,border:`2px solid ${BRAND.red}`}}>
      <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.1em",color:"#E00800",textTransform:"uppercase",marginBottom:6}}>Combined e& 3-year revenue potential</div>
      <div style={{fontSize:34,fontWeight:700,color:"#111",fontFamily:BRAND.font}}>$26.7M – $64.1M</div>
      <div style={{fontSize:12,color:"#888",marginTop:3}}>GPUaaS is the dominant driver from Year 2</div>
    </Card>

    <SH>Four principles applied to every agent</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(230px, 1fr))",gap:12,marginBottom:16}}>
      {[
        {n:"01",t:"Spec before build",d:"Every agent starts with a signed SDD spec — inputs, outputs, guardrails, human gates, acceptance tests. No code is written before the spec is approved."},
        {n:"02",t:"Human-supervised",d:"All agents produce decision support. No autonomous action on pricing, legal, compliance, or external commitments. Every high-stakes output has a named human reviewer."},
        {n:"03",t:"Sovereign by design",d:"All inference runs on e&-controlled infrastructure (Core42 / G42 / DGX). e& data does not cross sovereign boundaries and is never used to train external models."},
        {n:"04",t:"Data-quality gated",d:"Commercial agents (pricing, business case) require a 30-day CRM and finance audit before launch. We do not deploy agents on top of messy data — bad input means bad output."},
      ].map((p,i)=><Card key={i} style={{padding:18,borderLeft:`3px solid ${BRAND.red}`}}>
        <div style={{fontSize:11,fontFamily:"monospace",color:BRAND.red,fontWeight:700,marginBottom:6}}>{p.n}</div>
        <h4 style={{fontSize:14,fontWeight:700,color:"#111",marginBottom:6}}>{p.t}</h4>
        <p style={{fontSize:11.5,color:"#777",lineHeight:1.6,margin:0}}>{p.d}</p>
      </Card>)}
    </div>

    <SH>Operating reality e& must run on</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(170px, 1fr))",gap:12,marginBottom:16}}>
      {[
        {v:"18",l:"Countries"},
        {v:"7",l:"Languages including Arabic dialects"},
        {v:"19",l:"Subsidiaries across the group"},
        {v:"5",l:"Workstreams in the transformation"},
        {v:"450",l:"Sales reps directly impacted"},
        {v:"500+",l:"RFPs per month at peak"},
      ].map((s,i)=><Card key={i} style={{padding:18,textAlign:"left"}}>
        <div style={{fontSize:30,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font,lineHeight:1}}>{s.v}</div>
        <div style={{fontSize:11.5,color:"#777",marginTop:8,lineHeight:1.4}}>{s.l}</div>
      </Card>)}
    </div>

    <SH>Pre-launch dependencies e& must commit to</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",gap:12,marginBottom:16}}>
      {[
        {t:"Data and access on Day 1",d:"Sandbox credentials for CRM (Salesforce / Dynamics), SharePoint document store, project management tool, and accounting feeds. Synthetic data is acceptable for Demo stage; live data is required at MVP."},
        {t:"Named owners per agent",d:"One e& sponsor per agent for go/no-go gates, plus SMEs for each RFP archetype, vertical, and OpCo. The sponsor signs off the spec, the demo, the MVP, and the App stage."},
        {t:"Governance committees live",d:"Pricing Committee process, Legal review workflow, and Finance assumption sign-off must be formally active before pricing, compliance, and business case agents go live."},
        {t:"Discipline in the source systems",d:"Workstream leads must update the program tool weekly. Sales must complete win/loss tagging. CRM must reach >70% completeness for briefing and pricing agents to deliver value."},
      ].map((r,i)=><Card key={i} style={{padding:16}}>
        <h4 style={{fontSize:13,fontWeight:700,color:"#111",marginBottom:6}}>{r.t}</h4>
        <p style={{fontSize:11.5,color:"#777",lineHeight:1.6,margin:0}}>{r.d}</p>
      </Card>)}
    </div>

    <SH>Why e& should move now</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(230px, 1fr))",gap:12,marginBottom:16}}>
      {[
        {t:"Own the AI customer relationship",d:"SMBs and enterprises are already buying AI point solutions. e& can package AI into connectivity, cloud, security, and managed-service bundles before hyperscalers own the account."},
        {t:"Turn infrastructure into margin",d:"GPU capacity alone risks becoming a commodity. The SDD platform, agent marketplace, fine-tuning layer, and managed services create differentiated recurring revenue above compute."},
        {t:"Create a repeatable GTM engine",d:"The three pillars reinforce each other: SMB proves demand quickly, enterprise drives larger projects, and GPUaaS provides sovereign infrastructure for regulated customers."},
        {t:"Build sovereign AI capability",d:"Government, finance, healthcare, and critical infrastructure buyers need local hosting, auditability, Arabic capability, and trusted regional delivery. e& is already positioned to provide that wrapper."},
      ].map((r,i)=><Card key={i} style={{padding:16,borderLeft:`3px solid ${["#E00800","#E00800","#E00800","#E00800"][i]}`}}>
        <h4 style={{fontSize:13,fontWeight:700,color:"#111",marginBottom:6}}>{r.t}</h4>
        <p style={{fontSize:11.5,color:"#777",lineHeight:1.6}}>{r.d}</p>
      </Card>)}
    </div>

    <SH>90-day validation metrics</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:12,marginBottom:16}}>
      {[
        {v:"teal",t:"SMB Marketplace",items:["5–6 live agent blueprints","10–20 reference SMBs onboarded","First paid subscriptions active","Activation time under 48 hours","Arabic/English quality benchmark approved"]},
        {v:"violet",t:"Enterprise & Government",items:["3 priority vertical offers packaged","5–10 qualified e& account opportunities","1–2 paid discovery or pilot engagements","Security/compliance template agreed","Delivery pod and escalation model defined"]},
        {v:"rose",t:"GPUaaS & Platform",items:["GPUaaS reference architecture approved","Vendor shortlist and sizing model complete","MVP platform scope locked","Billing and metering model defined","First sovereign AI workload selected"]},
      ].map((m,i)=><Card key={i} style={{padding:18}}>
        <Badge v={m.v}>{m.t}</Badge>
        <div style={{height:12}}/>
        {m.items.map((item,j)=><div key={j} style={{display:"flex",alignItems:"flex-start",gap:7,fontSize:12,color:"#555",lineHeight:1.45,marginBottom:6}}>
          <span style={{color:["#E00800","#E00800","#E00800"][i],flexShrink:0,marginTop:1}}><CheckIcon/></span>{item}
        </div>)}
      </Card>)}
    </div>

    <SH>Risk controls & governance</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:12,marginBottom:16}}>
      {[
        {t:"Commercial control",d:"Stage-gated investment: 30-day SMB proof, enterprise pilots before scale, GPUaaS architecture before platform build. Each phase has clear go/no-go metrics."},
        {t:"Compliance control",d:"Human-in-the-loop for regulated actions, audit logs by default, data residency options, SSO/RBAC, and sector-specific templates for DHA, CBUAE, NESA, and ADDA."},
        {t:"Operational control",d:"Joint steering committee, weekly delivery cadence, named owners across e& sales, cloud, security, billing, and AIdeology delivery. SLA and escalation path agreed before launch."},
        {t:"Technology control",d:"Model-agnostic architecture, portable SDD specs and blueprints, customer-owned data, and deployment choices across e& cloud, G42/Core42, customer premises, or approved third-party infrastructure."},
      ].map((r,i)=><Card key={i} style={{padding:16}}>
        <h4 style={{fontSize:13,fontWeight:600,color:"#111",marginBottom:6}}>{r.t}</h4>
        <p style={{fontSize:11.5,color:"#777",lineHeight:1.6}}>{r.d}</p>
      </Card>)}
    </div>

    <div style={{height:20}}/>
    <Card style={{background:BRAND.lightGrey,padding:24}}>
      <h3 style={{fontSize:14,fontWeight:700,color:"#111",marginBottom:14}}>Next steps</h3>
      {["Align scope and priorities per pillar with e& stakeholders","Finalise commercial terms — fees, rev-share %, managed service rates","Draft partnership agreement — IP, exclusivity, SLAs, governance","Kick off SMB immediately (fastest TTM) + GPUaaS architecture in parallel","Begin enterprise pipeline development with e& sales teams","Schedule Omniverse & Physical AI deep-dive with Core42 + specialist partner"].map((s,i)=><div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10}}>
        <span style={{width:24,height:24,background:BRAND.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:BRAND.white,flexShrink:0}}>{i+1}</span>
        <span style={{fontSize:13,color:"#555",lineHeight:1.5,paddingTop:2}}>{s}</span>
      </div>)}
    </Card>
  </div>;
}

/* ════════════════════════════════════════════════════════════ */
/* MAIN APP */
/* ════════════════════════════════════════════════════════════ */
const TABS = ["Small & Medium Business","Enterprise & Government","GPUaaS & e& Platform"];
export default function App() {
  const [tab,setTab] = useState(0);
  const [sum,setSum] = useState(false);
  return <div style={{minHeight:"100vh",background:BRAND.white,fontFamily:BRAND.font,textAlign:"left"}}>
    <nav style={{position:"sticky",top:0,zIndex:50,background:BRAND.white,borderBottom:`1px solid ${BRAND.border}`}}>
      <div style={{maxWidth:1120,margin:"0 auto",padding:"0 28px",display:"flex",alignItems:"center",justifyContent:"space-between",height:72}}>
        <div style={{display:"flex",alignItems:"center",gap:18}}>
          <img src="/logo.png" alt="e&" style={{height:34,width:"auto",display:"block"}} />
          <div>
            <div style={{fontSize:14,fontWeight:700,color:BRAND.black}}>AIdeology partnership</div>
            <div style={{fontSize:11,color:BRAND.grey,marginTop:2}}>Commercial framework</div>
          </div>
        </div>
        <div style={{fontSize:11,color:BRAND.grey,fontWeight:500}}>Confidential</div>
      </div>
    </nav>
    <div style={{background:BRAND.white,borderBottom:`1px solid ${BRAND.border}`}}>
      <div style={{maxWidth:1120,margin:"0 auto",padding:"72px 28px 58px"}}>
        <div style={{fontSize:12,color:BRAND.red,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:16}}>AI go-to-market partnership</div>
        <h1 style={{fontSize:48,fontWeight:700,color:BRAND.black,lineHeight:1.02,margin:"0 0 20px",fontFamily:BRAND.font,maxWidth:640}}>Build AI revenue with e&</h1>
        <p style={{fontSize:18,color:BRAND.grey,maxWidth:640,lineHeight:1.5,margin:"0 0 28px"}}>Three clear offers: SMB agents, enterprise AI, and sovereign compute. Each one is built from specs, shipped fast, and measured against revenue.</p>
        <div style={{height:4,width:180,background:BRAND.continuum}}/>
      </div>
    </div>
    <div style={{background:BRAND.white,borderBottom:`1px solid ${BRAND.border}`,position:"sticky",top:72,zIndex:40}}>
      <div style={{maxWidth:1120,margin:"0 auto",padding:"14px 28px",display:"flex",gap:8,overflowX:"auto"}}>
        {TABS.map((t,i)=>{const a=tab===i&&!sum;return<button key={i} onClick={()=>{setTab(i);setSum(false)}} style={{padding:"12px 18px",fontSize:12.5,fontWeight:700,color:a?BRAND.white:BRAND.black,background:a?BRAND.red:BRAND.lightGrey,border:`1px solid ${a?BRAND.red:BRAND.border}`,borderRadius:0,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s"}}>{t}</button>})}
        <button onClick={()=>setSum(true)} style={{padding:"12px 18px",fontSize:12.5,fontWeight:700,color:sum?BRAND.white:BRAND.black,background:sum?BRAND.red:BRAND.lightGrey,border:`1px solid ${sum?BRAND.red:BRAND.border}`,borderRadius:0,cursor:"pointer",whiteSpace:"nowrap",marginLeft:"auto"}}>Summary</button>
      </div>
    </div>
    <div style={{maxWidth:1120,margin:"0 auto",padding:"0 28px 72px"}}>
      {sum?<SummarySection/>:tab===0?<SMBSegment/>:tab===1?<EnterpriseSegment/>:<GPUSegment/>}
    </div>
    <div style={{borderTop:`1px solid ${BRAND.border}`,background:BRAND.white}}>
      <div style={{maxWidth:1120,margin:"0 auto",padding:"28px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14}}>
        <div style={{fontSize:11,color:BRAND.grey}}>AIdeology x e& · Commercial framework · May 2026 · Confidential</div>
        <div style={{display:"flex",gap:14}}>
          {[["SMB Demo","https://etisalat-smb-marketplace.vercel.app"],["Enterprise Demo","https://etisalat-smb-marketplace.vercel.app/enterprise"],["AIdeology","https://www.aideology.ai"]].map(([l,u],i)=><a key={i} href={u} target="_blank" rel="noreferrer" style={{fontSize:11,color:BRAND.red,textDecoration:"none",fontWeight:700}}>{l} →</a>)}
        </div>
      </div>
    </div>
  </div>;
}
