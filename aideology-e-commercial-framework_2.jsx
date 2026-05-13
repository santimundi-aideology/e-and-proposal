import { Fragment, useEffect, useRef, useState } from "react";
import { PROPOSAL_CONTEXT } from "./src/proposalContext.js";

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
const SH = ({children,...p}) => <div {...p} style={{margin:"44px 0 18px",...(p.style||{})}}><h3 style={{fontSize:13,fontWeight:700,color:BRAND.black,letterSpacing:"0.06em",textTransform:"uppercase",margin:"0 0 10px"}}>{children}</h3><div style={{height:3,width:96,background:BRAND.continuum}}/></div>;
const Card = ({children,style,...p}) => <div {...p} style={{background:BRAND.white,border:`1px solid ${BRAND.border}`,borderRadius:0,padding:24,marginBottom:16,...(style||{})}}>{children}</div>;
const Note = ({label,children,color=BRAND.red,bg=BRAND.lightGrey,border=BRAND.border}) => <div style={{background:bg,border:`1px solid ${border}`,borderLeft:`4px solid ${BRAND.red}`,borderRadius:0,padding:20,marginBottom:16}}><div style={{fontSize:11,fontWeight:700,letterSpacing:"0.08em",color,textTransform:"uppercase",marginBottom:8}}>{label}</div><p style={{fontSize:13,color:BRAND.grey,lineHeight:1.6,margin:0}}>{children}</p></div>;

function CollapsibleTimeline({badge,span:spanText,title,desc,footer,defaultOpen=false,children}) {
  const [open,setOpen] = useState(defaultOpen);
  return <Card style={{padding:0,overflow:"hidden",marginTop:18}}>
    <div
      onClick={()=>setOpen(!open)}
      style={{padding:"22px 26px",borderBottom:open?`1px solid ${BRAND.border}`:"none",cursor:"pointer",userSelect:"none"}}
    >
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <Badge v="teal">{badge}</Badge>
          <span style={{fontSize:11.5,color:"#888"}}>{spanText}</span>
        </div>
        <span style={{fontSize:14,color:BRAND.grey,transition:"transform 0.2s",transform:open?"rotate(180deg)":"rotate(0deg)",display:"inline-block"}}>&#9660;</span>
      </div>
      <h4 style={{fontSize:18,fontWeight:700,color:"#111",margin:"8px 0 0"}}>{title}</h4>
      {open && desc && <p style={{fontSize:12.5,color:"#777",lineHeight:1.6,maxWidth:860,margin:"8px 0 0"}}>{desc}</p>}
    </div>
    {open && <>
      {children}
      {footer && <div style={{padding:"18px 26px",background:BRAND.lightGrey,borderTop:`1px solid ${BRAND.border}`}}>
        <div style={{fontSize:12,color:"#555",lineHeight:1.55}}>{footer}</div>
      </div>}
    </>}
  </Card>;
}

function ZoomableImage({src,alt,extraFooter}) {
  const [open,setOpen] = useState(false);
  const [zoom,setZoom] = useState(1.35);

  const changeZoom = (next) => setZoom(Math.min(3, Math.max(0.8, next)));

  return <>
    <button type="button" onClick={()=>{setOpen(true);setZoom(1.35)}} style={{display:"block",width:"100%",padding:0,border:"none",background:"transparent",cursor:"zoom-in",textAlign:"left"}}>
      <img src={src} alt={alt} style={{width:"100%",display:"block",border:`1px solid ${BRAND.border}`,background:BRAND.white}} />
    </button>
    <div style={{padding:"12px 2px 0",fontSize:11.5,color:"#777",display:"flex",justifyContent:"space-between",gap:12,flexWrap:"wrap",alignItems:"center"}}>
      <span>Click the architecture image to view it larger.</span>
      <button type="button" onClick={()=>{setOpen(true);setZoom(1.8)}} style={{border:"none",background:"transparent",color:BRAND.red,fontWeight:700,cursor:"pointer",padding:0}}>Open zoom view</button>
      {extraFooter && <div style={{width:"100%",fontSize:11,color:"#666",lineHeight:1.6,paddingTop:4}}>{extraFooter}</div>}
    </div>
    {open && <div role="dialog" aria-modal="true" aria-label={alt} style={{position:"fixed",inset:0,zIndex:200,background:"rgba(17,17,17,0.92)",display:"flex",flexDirection:"column"}}>
      <div style={{height:64,padding:"0 22px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,borderBottom:"1px solid rgba(255,255,255,0.16)",color:BRAND.white}}>
        <div>
          <div style={{fontSize:13,fontWeight:700}}>Agentic Intelligence Platform — Forge by AIdeology</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.62)",marginTop:2}}>Scroll inside the canvas to inspect details</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <button type="button" onClick={()=>changeZoom(zoom-0.25)} style={{background:BRAND.white,color:BRAND.black,border:"none",padding:"9px 12px",fontWeight:700,cursor:"pointer"}}>−</button>
          <div style={{fontSize:12,minWidth:48,textAlign:"center"}}>{Math.round(zoom*100)}%</div>
          <button type="button" onClick={()=>changeZoom(zoom+0.25)} style={{background:BRAND.white,color:BRAND.black,border:"none",padding:"9px 12px",fontWeight:700,cursor:"pointer"}}>+</button>
          <button type="button" onClick={()=>setZoom(1.35)} style={{background:"transparent",color:BRAND.white,border:"1px solid rgba(255,255,255,0.35)",padding:"9px 12px",fontWeight:700,cursor:"pointer"}}>Reset</button>
          <button type="button" onClick={()=>setOpen(false)} style={{background:BRAND.red,color:BRAND.white,border:"none",padding:"9px 14px",fontWeight:700,cursor:"pointer"}}>Close</button>
        </div>
      </div>
      <div style={{flex:1,overflow:"auto",padding:28}}>
        <div style={{width:`${zoom*100}%`,minWidth:980,margin:"0 auto"}}>
          <img src={src} alt={alt} style={{width:"100%",display:"block",background:BRAND.white,border:"1px solid rgba(255,255,255,0.2)"}} />
        </div>
      </div>
    </div>}
  </>;
}

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
/* AGENT ROADMAP GRID + MODAL */
/* ════════════════════════════════════════════════════════════ */
const AGENT_DETAILS = [
  {
    phase:"Phase 1",name:"Customer Agent",badge:"Launch first",icon:"🎯",color:"#0F6E56",
    mission:"Every inbound interaction handled — voice, WhatsApp, and web — in one AI trained on the business.",
    overview:"The Customer Agent is the flagship solution and the reason the platform exists. It replaces the front desk, the call centre, the WhatsApp number that nobody answers after 6pm, and the website chat widget that says 'we will get back to you'. Every inbound customer interaction — voice call, WhatsApp message, or web chat — is handled by a single AI agent that knows the business, speaks Arabic and English, remembers prior conversations, and can book appointments, answer FAQs, take orders, escalate to a human, and follow up automatically. It runs 24/7, handles Ramadan hours automatically, greets customers by name if they have called before, and hands off to a human with full context so the customer never repeats themselves.",
    native:[
      {t:"AI voice engine",d:"Answers inbound calls, understands intent in Arabic and English, routes or resolves. Handles greetings, FAQs, appointment booking, order status, and complaint logging by voice."},
      {t:"WhatsApp conversation flow",d:"Full conversational AI on WhatsApp — FAQs, lead capture, appointment booking, order status, payment links, document collection. Supports text, voice notes, images, and location."},
      {t:"Web chat widget",d:"Embeds on any website with one script tag. Same AI brain as voice and WhatsApp. Seamless handoff between channels — a customer who starts on web chat and calls later gets continuity."},
      {t:"Unified conversation memory",d:"Every interaction across every channel is stored in one timeline per customer. The agent recalls prior context, preferences, past issues, and purchase history."},
      {t:"Business knowledge base",d:"Trained on the SMB's own data — FAQs, pricing, hours, menu, service list, branch locations, policies. Updated by the business owner via a simple back-office UI or WhatsApp message."},
      {t:"Seasonal intelligence",d:"Ramadan hours, Eid greetings, National Day promotions — auto-configured. The agent adjusts its greeting, hours, and responses based on the UAE calendar."},
      {t:"Human handoff with context",d:"When the agent cannot resolve, it escalates to a human with the full conversation transcript, customer history, and suggested next actions. No repeat questions."},
      {t:"Multilingual Arabic/English",d:"Not a translation layer — native understanding in both languages. Handles code-switching (Arabic and English in the same sentence), Gulf dialect, and formal Arabic."},
    ],
    eand:[
      {t:"Toll Free 800 number",d:"The business's inbound calling identity. Already in e& product catalog. Customer Agent answers calls on this number."},
      {t:"CloudTalk PBX",d:"Call routing infrastructure inside e& Office Presence. Handles call queuing, IVR fallback, and recording."},
      {t:"e& SMS network",d:"Missed call follow-up sent via direct carrier route — higher delivery rate than any SaaS SMS provider."},
      {t:"Arabic TTS/ASR",d:"Text-to-speech and automatic speech recognition running on e& network — lower latency than cloud-only alternatives."},
      {t:"e& SIM identity",d:"Verified business caller authentication. The customer sees the business name, not an unknown number."},
    ],
    connectors:["Meta WhatsApp API","e& BSP layer","Google Business Profile","Calendly / Cal.com","Clinicmaster (healthcare)","Shopify (retail)","Zapier / Make (custom)","Google Calendar","Outlook Calendar"],
    connectorNote:"The agent reads the SMB's calendar from Google or Outlook to book appointments. It posts to WhatsApp via Meta API. It pushes leads to whatever CRM the SMB uses. The SMB never touches any of these directly.",
    useCases:["Restaurant: answers calls, takes reservations via WhatsApp, sends menu, confirms bookings, handles cancellations, follows up with a review request.","Clinic: books appointments, sends reminders 24h before, collects insurance details via WhatsApp photo, handles rescheduling, sends post-visit follow-up.","Real estate: qualifies leads on WhatsApp, schedules viewings, sends property brochures, follows up after viewings, hands warm leads to the sales team.","Retail: answers product questions, checks stock, takes orders via WhatsApp, sends payment links, provides delivery updates.","Professional services: answers initial enquiries, collects requirements via structured WhatsApp flow, books consultation slots, sends quotes."],
    kpis:["First response time","Resolution rate (no human needed)","Customer satisfaction (CSAT)","Missed call recovery rate","Appointment no-show reduction","Average handling time"],
  },
  {
    phase:"Wave 2A",name:"Sales Agent",badge:"Parallel build",icon:"📈",color:"#534AB7",
    mission:"Lead to close — native AIdeology CRM with connectors to whatever the SMB already uses.",
    overview:"The Sales Agent is the revenue engine. It takes every lead that the Customer Agent captures — from a WhatsApp enquiry, a missed call, a web chat — and moves it through a structured sales pipeline. It scores leads by intent, tracks deals through stages, writes follow-up messages automatically, forecasts revenue, and generates proposals in Arabic or English. SMBs that already use Salesforce, HubSpot, or Dynamics 365 keep using them — the Sales Agent syncs there. SMBs with no CRM get a native AIdeology CRM that is simpler and built for the Gulf market. The agent does the selling discipline; the human does the relationship.",
    native:[
      {t:"Native CRM",d:"Contacts, leads, deals, pipeline stages. No external tool needed. Designed for SMBs who have never used a CRM — simple, Arabic-first, WhatsApp-native."},
      {t:"AI lead scoring",d:"Intent signals from Customer Agent conversations are ranked automatically. A customer who asked about pricing twice and requested a callback scores higher than a generic enquiry."},
      {t:"Visual pipeline tracker",d:"Drag-and-drop deal stages with time-in-stage alerts. If a deal sits in 'proposal sent' for 5 days, the agent nudges the salesperson and drafts a follow-up."},
      {t:"Automated follow-up sequences",d:"WhatsApp + SMS + email sequences written by AI, personalised to the deal context, sent automatically at the right intervals. The salesperson approves or edits before send."},
      {t:"Deal forecasting",d:"Revenue prediction from the live pipeline with confidence scores. 'You have AED 120K in pipeline this month, 65% likely to close based on stage velocity.'"},
      {t:"Customer 360 view",d:"Every interaction — calls, chats, emails, meetings — in one timeline per contact. The salesperson sees the full relationship, not just the last touchpoint."},
      {t:"Arabic quote and proposal drafting",d:"AI generates a professional proposal from the deal context — scope, pricing, terms — in Arabic or English, branded with the SMB's logo."},
    ],
    eand:[
      {t:"Smart Messaging",d:"Follow-up SMS sent via e& direct carrier route — higher delivery than Twilio or any third-party SMS."},
      {t:"e& SIM",d:"Sales calls made from the business number, tracked automatically. Call duration, outcome, and notes logged without manual entry."},
      {t:"Call recordings on sovereign infra",d:"Stored on UAE-sovereign e& infrastructure, not a US SaaS server. Compliant with UAE data residency requirements."},
    ],
    connectors:["Dynamics 365","Outlook contacts","Salesforce","HubSpot","Zoho CRM","WhatsApp (follow-ups)","Gmail / G-Suite"],
    connectorNote:"An SMB already on Dynamics 365? The Sales Agent reads and writes their deals there — nothing changes for them. The agent is the intelligence layer; Dynamics is just a database it syncs with. Same for Salesforce or HubSpot. SMBs with no CRM use the native AIdeology CRM automatically.",
    useCases:["Auto-creates a lead when Customer Agent captures an enquiry — no manual data entry.","Scores and prioritises 50 new leads so the salesperson calls the hottest ones first.","Drafts a follow-up WhatsApp message for a deal that has gone quiet for 3 days.","Generates a quote in Arabic from a voice call summary and sends it to the customer on WhatsApp.","Alerts the owner: 'You have 3 deals worth AED 85K expiring this week — here are the follow-up actions.'"],
    kpis:["Lead-to-deal conversion rate","Average deal cycle time","Pipeline value and velocity","Follow-up compliance rate","Forecast accuracy","Revenue per salesperson"],
  },
  {
    phase:"Wave 2B",name:"Comms Hub",badge:"Parallel build",icon:"📡",color:"#185FA5",
    mission:"All outbound and inbound communications from one AI-powered dashboard — the telco moat made useful.",
    overview:"The Comms Hub turns e&'s network assets into a business advantage. Every SMB communication channel — WhatsApp, SMS, email, voice, Instagram DM, Teams — is unified into one dashboard with one AI managing all of it. The SMB owner describes a campaign in Arabic ('send a Ramadan offer to customers who ordered last month'), and the AI writes the message, selects the audience from Customer Agent data, schedules the send across all channels, and reports on delivery, opens, and responses. It is the tool that makes e& Smart Messaging, Toll Free 800, and WhatsApp BSP useful to businesses that do not have a marketing team.",
    native:[
      {t:"Unified inbox",d:"WhatsApp, SMS, email, voice, Instagram DM — all in one view, one AI handling all conversations. No switching between apps."},
      {t:"AI campaign builder",d:"Describe the campaign in Arabic or English. AI writes the copy, selects the audience from Customer Agent data, schedules the send, and reports results."},
      {t:"Omnichannel broadcast",d:"Same message sent across WhatsApp, SMS, and email in one click. The agent picks the best channel per customer based on past engagement."},
      {t:"Conversation analytics",d:"Response rates, resolution time, agent performance, sentiment analysis. Real-time dashboard showing what is working and what is not."},
      {t:"Audience segmentation",d:"AI groups customers by behaviour — purchase history, last visit, engagement level, location. Segments update automatically from Customer Agent data."},
      {t:"Seasonal intelligence",d:"Ramadan, Eid, National Day, Back to School campaigns pre-built with templates. One-tap activate, AI handles the rest."},
      {t:"Call transcription and summary",d:"Every voice call is automatically transcribed, summarised, and action items extracted. Summaries pushed to the owner via WhatsApp."},
    ],
    eand:[
      {t:"Smart Messaging infrastructure",d:"Direct carrier SMS — not third-party — highest deliverability in the UAE. No SaaS middleman eating the margin."},
      {t:"Toll Free 800",d:"Outbound caller ID is the business's own 800 number. Recognisable, trusted, professional."},
      {t:"Teams Direct Routing",d:"Voice calls through e& network to Microsoft Teams. Businesses using Teams get enterprise-grade calling without a separate PBX."},
      {t:"e& BSP for WhatsApp",d:"WhatsApp Business API owned by e&, not a third-party BSP. e& controls the margin, the template approvals, and the SLA."},
    ],
    connectors:["Meta WhatsApp Cloud API","Microsoft Teams","Instagram DM","Gmail / Outlook","Mailchimp (migration)","Amazon SES (email)"],
    connectorNote:"The Comms Hub orchestrates across every channel — WhatsApp via Meta API, SMS via e& network, email via AWS SES or the SMB's own inbox, voice via e&/Teams. The SMB uses one dashboard. The channels are invisible infrastructure.",
    useCases:["Restaurant sends a Ramadan iftar offer to 500 past customers via WhatsApp + SMS — AI writes the message, segments the audience, schedules for 3pm.","Clinic sends appointment reminders via WhatsApp, follow-up via SMS, and post-visit survey via email — all automated, all from one dashboard.","Retailer runs a flash sale: broadcast to all customers, track opens and clicks, auto-reply to questions, escalate purchase-ready customers to Sales Agent.","Professional services firm: all client communication archived, searchable, with AI-generated summaries of every call and chat."],
    kpis:["Message delivery rate","Campaign response rate","Channel preference per customer","Average response time","Sentiment score trend","Broadcast ROI"],
  },
  {
    phase:"Wave 3A",name:"Finance Agent",badge:"Parallel build",icon:"💰",color:"#3B6D11",
    mission:"Invoices, payments, VAT, cash flow — UAE-native, FTA-certified, connected to what the SMB already uses.",
    overview:"The Finance Agent automates the financial operations that consume 8–12 hours per week for a typical SMB owner: creating invoices, chasing payments, preparing VAT returns, tracking expenses, and understanding cash flow. It auto-generates invoices from Sales Agent deal closures, sends payment links via WhatsApp, prepares FTA-format VAT returns from transaction data, escalates overdue invoices through WhatsApp → SMS → call sequences, and delivers monthly P&L summaries to the owner on WhatsApp. It connects to e& Pay for payment collection and to QuickBooks, Xero, or Business Central if the SMB already uses one. For the 70%+ of UAE SMBs that use Excel or nothing, it becomes their first real financial system.",
    native:[
      {t:"Invoice engine",d:"Auto-generates bilingual Arabic/English invoices from Sales Agent deal closures. Professional templates with the SMB's branding, TRN, and FTA-compliant formatting."},
      {t:"Payment link generator",d:"One-tap payment links sent via WhatsApp by the Customer Agent. Collected via e& Pay. The customer pays in 3 taps."},
      {t:"VAT calculation and return prep",d:"FTA-format VAT return pre-filled from transaction data. The agent categorises expenses, calculates input/output VAT, and generates the submission-ready file."},
      {t:"Invoice reminder sequences",d:"AI escalates overdue invoices: friendly WhatsApp reminder → formal SMS → automated call. Timing and tone adapt based on the relationship and overdue duration."},
      {t:"Cash flow forecasting",d:"'You have 38 days of runway based on pending invoices, recurring costs, and payment velocity.' Real-time dashboard updated from live financial data."},
      {t:"Expense tracking",d:"Photo a receipt via WhatsApp — the agent reads it, categorises the expense, logs it, and links it to the right project or cost centre."},
      {t:"Monthly P&L summary",d:"Auto-generated report pushed to the owner on WhatsApp at month-end. Revenue, expenses, profit margin, cash position, overdue invoices, and VAT liability in one page."},
    ],
    eand:[
      {t:"e& Pay",d:"Payment collection with lower fees than international gateways. Invoice appears alongside the e& telco bill — familiar and trusted."},
      {t:"e& Money",d:"Instant settlement to the SMB's account. UAE-regulated, no third-party gateway risk, no 3-day hold."},
      {t:"Oracle OCI Dedicated Region",d:"Financial data stored in e& data centres in the UAE. Full data sovereignty, no cross-border data flow."},
      {t:"FTA certification",d:"e& already holds FTA certification for invoicing — inherited by the Finance Agent. No re-certification needed."},
    ],
    connectors:["QuickBooks","Xero","FreshBooks","Business Central","Oracle Financials","UAE bank APIs","FTA portal (VAT)","Network International","PayTabs"],
    connectorNote:"SMB already on QuickBooks? The Finance Agent reads their chart of accounts and posts transactions there automatically. Uses Business Central? Syncs invoices and payments. Has a bank account? Pulls statements for reconciliation. AIdeology is the agent — the accounting tool is just a destination.",
    useCases:["Sales Agent closes a deal → Finance Agent auto-generates the invoice → sends payment link via WhatsApp → customer pays via e& Pay → receipt issued automatically.","End of month: agent compiles all transactions, categorises expenses, calculates VAT, generates FTA return, and pushes a P&L summary to the owner's WhatsApp.","Overdue invoice: Day 3 friendly WhatsApp reminder, Day 7 formal SMS, Day 14 automated call with payment link. Owner is notified only if the customer responds.","Receipt scanning: employee photos a taxi receipt on WhatsApp, agent reads AED 45, categorises as 'Transport', logs to the project."],
    kpis:["Days sales outstanding (DSO)","Invoice-to-payment cycle time","VAT compliance rate","Cash flow forecast accuracy","Payment collection rate","Expense categorisation accuracy"],
  },
  {
    phase:"Wave 3B",name:"Ops Agent",badge:"Parallel build",icon:"⚙️",color:"#854F0B",
    mission:"Internal operations automated — triggered by customer interactions, not by human admin.",
    overview:"The Ops Agent eliminates the manual back-office work that happens after every customer interaction. When the Customer Agent books an appointment, the Ops Agent creates a task for the service team. When a complaint is logged, it creates a service ticket with priority and SLA. When a meeting ends, it extracts action items and assigns them. It manages approval flows, daily operational checklists, SOP documentation, and business reporting — all triggered automatically from real business events, not manual admin. For SMBs on Microsoft Teams, tasks sync to Planner. For Google Workspace users, to Google Tasks. For SMBs using nothing, the native AIdeology task board provides the structure they have never had.",
    native:[
      {t:"Task engine",d:"Creates tasks automatically when Customer Agent books, closes, or escalates. Every customer interaction generates the right internal follow-up without human intervention."},
      {t:"Approval flows",d:"Purchase requests, leave applications, expense claims — routed to the right person by role and amount. Approved via WhatsApp with one tap."},
      {t:"SOP knowledge base",d:"Searchable in Arabic and English. Updated by the agent from conversations — when a new process is agreed in a meeting, the agent adds it to the SOP."},
      {t:"Service ticket desk",d:"Internal requests triaged and routed by AI priority. Linked to Customer Agent complaints. SLA tracking with escalation if unresolved."},
      {t:"Ops checklists",d:"Daily opening routines, compliance checks, inventory counts, recurring tasks — automated, tracked, and reported. Owner sees completion status on WhatsApp."},
      {t:"Meeting action extractor",d:"Paste a meeting summary or connect a call — AI extracts action items, assigns them to the right people, sets deadlines, and tracks completion."},
      {t:"Business reports",d:"Daily and weekly ops summaries pushed to the owner on WhatsApp. Tasks completed, tickets open, compliance status, team performance."},
    ],
    eand:[
      {t:"Azure Cloud via e& CSP",d:"Document storage, file sharing, compliance-grade hosting. All data on e& infrastructure."},
      {t:"e& SIM location and check-in",d:"Field staff location and attendance tied to SIM identity. No biometric hardware, no GPS app — just the SIM they already carry."},
      {t:"Wi-Fi as a Service data",d:"Device counts, dwell time in premises — feeds into ops analytics. Know how busy your store is without a people counter."},
    ],
    connectors:["Microsoft Teams","SharePoint / OneDrive","Outlook Tasks / Planner","Google Workspace","Google Drive","Notion","Slack","AWS S3 (document store)"],
    connectorNote:"Teams user? The Ops Agent creates tasks in Planner from meeting transcripts. Google Workspace user? Tasks go to Google Tasks, files to Drive. The agent is platform-agnostic — it orchestrates whatever the SMB already has. SMBs with nothing get the native AIdeology task board.",
    useCases:["Customer Agent books an appointment → Ops Agent creates a task for the technician, reserves the time slot, and sends a preparation checklist.","Customer complaint logged → service ticket created with SLA, assigned to the right team member, escalated if not resolved in 4 hours.","Weekly staff meeting → meeting summary pasted into WhatsApp → agent extracts 6 action items, assigns to 3 people, tracks completion by Friday.","Daily ops: opening checklist sent at 7am, each item confirmed by staff via WhatsApp, non-compliance flagged to the manager automatically."],
    kpis:["Task completion rate","Average time to resolve tickets","SLA compliance percentage","Checklist completion rate","Action item follow-through","Operational cost per customer interaction"],
  },
  {
    phase:"Wave 4",name:"People Agent",badge:"Scale wave",icon:"👥",color:"#993C1D",
    mission:"WPS payroll, attendance, leave, onboarding — UAE labour law as default, not a setting.",
    overview:"The People Agent is the HR department that most SMBs cannot afford. It handles payroll calculation under UAE Labour Law (including overtime, gratuity, and end-of-service), generates WPS SIF files for Ministry of Labour submission, tracks attendance via WhatsApp geofenced check-in linked to e& SIM, manages leave requests and balances via WhatsApp conversation, runs digital onboarding checklists for new hires (Emirates ID collection, visa status tracking, bank account setup), and alerts HR 90/60/30 days before any visa or permit expiry. For SMBs with 5–50 employees, this replaces the Excel spreadsheet, the manual WPS file, and the PRO who tracks visa expiry dates in their head. It is UAE-native by design — labour law compliance is not a setting, it is the default.",
    native:[
      {t:"Payroll engine",d:"Calculates salaries, overtime, gratuity, and end-of-service benefits under UAE Labour Law automatically. Handles multiple pay frequencies, allowances, and deductions."},
      {t:"WPS SIF file generation",d:"Generates the Wage Protection System SIF file in the exact format required by the Ministry of Labour. Submits via e& Pay for salary disbursement."},
      {t:"Attendance via WhatsApp",d:"Geofenced check-in and check-out via WhatsApp message. Linked to e& SIM for identity verification. No biometric hardware, no GPS app, no time clock."},
      {t:"Leave management",d:"Request, approve, and track leave balances — all via WhatsApp conversation. Manager approves with one tap. Balances update automatically."},
      {t:"Digital onboarding",d:"New hire checklist: Emirates ID photo collection, visa status tracking, bank account setup, uniform sizing, training schedule — all via WhatsApp flow."},
      {t:"Visa and permit reminders",d:"Agent alerts HR and the employee 90/60/30 days before any visa, Emirates ID, labour card, or health insurance expiry. No missed renewals."},
      {t:"Candidate screening",d:"CV parsing, question scoring based on job requirements, and interview slot booking via WhatsApp. Shortlisted candidates passed to the hiring manager."},
    ],
    eand:[
      {t:"Corporate Employee Plans",d:"e& already holds the SIM for thousands of SMB employees. Attendance and identity verification is SIM-native — no additional hardware."},
      {t:"e& Pay / WPS",d:"Salary disbursement via e& Money directly to employee accounts. MoHRE-compliant, instant, lower fees than bank transfers."},
      {t:"e& ID",d:"Verified employee mobile identity using the SIM they already carry. Replaces biometric readers and access cards for SMBs."},
    ],
    connectors:["Dynamics 365 HR","Oracle HCM","Bayzat (UAE HR)","Zoho People","MOHRE (Ministry of Labour)","GDRFA (visa)","DEWS / GPSSA (pension)","UAE banking APIs"],
    connectorNote:"Medium SMBs with Dynamics HR or Oracle HCM? The People Agent syncs employee records there — no migration, just enrichment. Connects to MOHRE for WPS compliance and GDRFA for visa tracking. These are government APIs — the agent navigates them so the SMB never has to.",
    useCases:["Month-end payroll: agent calculates salaries for 30 employees, generates WPS SIF, submits to MoHRE via e& Pay, sends each employee a pay slip on WhatsApp.","New hire: onboarding checklist triggered automatically — collect Emirates ID photo, verify visa, set up bank account, assign training — all via WhatsApp.","Visa expiring in 30 days: agent alerts HR, schedules the renewal appointment, tracks the application status, and confirms when the new visa is active.","Leave request: employee messages 'I need 3 days off next week' on WhatsApp → agent checks balance, sends approval request to manager, updates the calendar.","Attendance: employee arrives at the office, sends a WhatsApp check-in from within the geofence, SIM identity verified, logged automatically."],
    kpis:["WPS submission compliance rate","Payroll accuracy","Attendance tracking coverage","Leave balance accuracy","Visa renewal on-time rate","Time-to-onboard new hires"],
  },
];

function AgentRoadmapGrid() {
  const [selectedAgent, setSelectedAgent] = useState(null);

  return <>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))",gap:12,marginBottom:14}}>
      {AGENT_DETAILS.map((a,i)=><Card key={i} style={{padding:18,borderLeft:`3px solid ${i===0?BRAND.red:BRAND.border}`,cursor:"pointer",transition:"box-shadow 0.15s"}} onClick={()=>setSelectedAgent(a)}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,marginBottom:8}}>
          <Badge v={i===0?"teal":"default"}>{a.phase}</Badge>
          <div style={{fontSize:10.5,fontWeight:700,color:i===0?BRAND.red:BRAND.grey,textTransform:"uppercase",letterSpacing:"0.04em"}}>{a.badge}</div>
        </div>
        <h4 style={{fontSize:15,fontWeight:700,color:"#111",marginBottom:6}}>{a.name}</h4>
        <p style={{fontSize:12,color:"#666",lineHeight:1.55,margin:"0 0 12px"}}>{a.mission}</p>
        {[
          ["AIdeology builds",a.native.map(n=>n.t).join(", ")],
          ["e& network layer",a.eand.map(n=>n.t).join(", ")],
          ["Partner connectors",a.connectors.join(", ")],
        ].map(([label,text],j)=><div key={j} style={{paddingTop:9,marginTop:9,borderTop:`1px solid ${BRAND.border}`}}>
          <div style={{fontSize:10,fontWeight:700,color:j===0?BRAND.red:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:4}}>{label}</div>
          <div style={{fontSize:11.2,color:"#777",lineHeight:1.5}}>{text}</div>
        </div>)}
        <div style={{marginTop:12,fontSize:10.5,fontWeight:700,color:BRAND.red,letterSpacing:"0.04em",textTransform:"uppercase"}}>Click for full specification →</div>
      </Card>)}
    </div>

    {selectedAgent && <div role="dialog" aria-modal="true" onClick={()=>setSelectedAgent(null)} style={{position:"fixed",inset:0,zIndex:200,background:"rgba(17,17,17,0.85)",display:"flex",alignItems:"flex-start",justifyContent:"center",overflowY:"auto",padding:"40px 20px"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:BRAND.white,maxWidth:960,width:"100%",position:"relative"}}>
        {/* Header */}
        <div style={{padding:"28px 32px",borderBottom:`3px solid ${selectedAgent.color}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:48,height:48,background:selectedAgent.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,borderRadius:0}}>{selectedAgent.icon}</div>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
                <Badge v="teal">{selectedAgent.phase}</Badge>
                <span style={{fontSize:11,fontWeight:700,color:BRAND.grey,textTransform:"uppercase",letterSpacing:"0.04em"}}>{selectedAgent.badge}</span>
              </div>
              <h3 style={{fontSize:24,fontWeight:700,color:"#111",margin:0}}>{selectedAgent.name}</h3>
            </div>
          </div>
          <button onClick={()=>setSelectedAgent(null)} style={{background:BRAND.red,color:BRAND.white,border:"none",padding:"10px 18px",fontWeight:700,cursor:"pointer",fontSize:12,flexShrink:0}}>Close</button>
        </div>

        {/* Mission */}
        <div style={{padding:"24px 32px",borderBottom:`1px solid ${BRAND.border}`,background:BRAND.lightGrey}}>
          <div style={{fontSize:14,fontWeight:700,color:"#111",lineHeight:1.55}}>{selectedAgent.mission}</div>
        </div>

        {/* Overview */}
        <div style={{padding:"24px 32px",borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{fontSize:10.5,fontWeight:700,letterSpacing:"0.06em",color:BRAND.grey,textTransform:"uppercase",marginBottom:10}}>What this agent does</div>
          <p style={{fontSize:13,color:"#444",lineHeight:1.7,margin:0}}>{selectedAgent.overview}</p>
        </div>

        {/* AIdeology builds */}
        <div style={{padding:"24px 32px",borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{fontSize:10.5,fontWeight:700,letterSpacing:"0.06em",color:BRAND.red,textTransform:"uppercase",marginBottom:14}}>AIdeology builds — core capabilities</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {selectedAgent.native.map((n,i)=><div key={i} style={{padding:14,border:`1px solid ${BRAND.border}`,background:BRAND.white}}>
              <div style={{fontSize:12.5,fontWeight:700,color:"#111",marginBottom:4}}>{n.t}</div>
              <div style={{fontSize:11.5,color:"#666",lineHeight:1.55}}>{n.d}</div>
            </div>)}
          </div>
        </div>

        {/* e& network layer */}
        <div style={{padding:"24px 32px",borderBottom:`1px solid ${BRAND.border}`,background:"#F8FAFB"}}>
          <div style={{fontSize:10.5,fontWeight:700,letterSpacing:"0.06em",color:"#185FA5",textTransform:"uppercase",marginBottom:14}}>e& network layer</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {selectedAgent.eand.map((n,i)=><div key={i} style={{padding:14,border:"1px solid #D8E8F4",background:BRAND.white}}>
              <div style={{fontSize:12.5,fontWeight:700,color:"#111",marginBottom:4}}>{n.t}</div>
              <div style={{fontSize:11.5,color:"#666",lineHeight:1.55}}>{n.d}</div>
            </div>)}
          </div>
        </div>

        {/* Partner connectors */}
        <div style={{padding:"24px 32px",borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{fontSize:10.5,fontWeight:700,letterSpacing:"0.06em",color:BRAND.grey,textTransform:"uppercase",marginBottom:12}}>Partner connectors — the agent syncs to these</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
            {selectedAgent.connectors.map((c,i)=><span key={i} style={{fontSize:11,padding:"4px 10px",background:BRAND.lightGrey,border:`1px solid ${BRAND.border}`,fontWeight:600,color:"#555"}}>{c}</span>)}
          </div>
          <p style={{fontSize:12,color:"#777",lineHeight:1.6,margin:0,fontStyle:"italic"}}>{selectedAgent.connectorNote}</p>
        </div>

        {/* Use cases */}
        <div style={{padding:"24px 32px",borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{fontSize:10.5,fontWeight:700,letterSpacing:"0.06em",color:selectedAgent.color,textTransform:"uppercase",marginBottom:12}}>Real-world use cases</div>
          {selectedAgent.useCases.map((uc,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:10}}>
            <span style={{width:6,height:6,background:selectedAgent.color,flexShrink:0,marginTop:6}}/>
            <span style={{fontSize:12.5,color:"#444",lineHeight:1.6}}>{uc}</span>
          </div>)}
        </div>

        {/* KPIs */}
        <div style={{padding:"24px 32px"}}>
          <div style={{fontSize:10.5,fontWeight:700,letterSpacing:"0.06em",color:BRAND.grey,textTransform:"uppercase",marginBottom:12}}>Key performance indicators</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {selectedAgent.kpis.map((k,i)=><span key={i} style={{fontSize:11,padding:"6px 12px",background:BRAND.lightGrey,border:`1px solid ${BRAND.border}`,fontWeight:600,color:"#333"}}>{k}</span>)}
          </div>
        </div>
      </div>
    </div>}
  </>;
}

/* ════════════════════════════════════════════════════════════ */
/* SMB SEGMENT */
/* ════════════════════════════════════════════════════════════ */
function SMBSegment({onViewChange, upToSoftwareStack=false, showPricing=true}) {
  const [showMarketBenchmarks, setShowMarketBenchmarks] = useState(false);

  const goToPlatformEvolutionMatrix = () => {
    if (!onViewChange) return;
    onViewChange("sum");
    setTimeout(() => {
      const target = document.getElementById("platform-evolution-matrix");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return <div>
    <div style={{padding:"44px 0 36px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}><Badge v="teal">Pillar 01</Badge><span style={{fontSize:12,color:"#888"}}>Marketplace · SDD</span></div>
      <h2 style={{fontSize:34,fontWeight:700,color:"#111",lineHeight:1.08,marginBottom:14,fontFamily:BRAND.font}}>Sell AI to SMBs</h2>
      <p style={{fontSize:14.5,color:"#666",maxWidth:620,lineHeight:1.7,marginBottom:28}}>
        e& will be first to industrialise platform-centric SMB agentic solutions at scale: not a catalog of small bots, but a growing AI operating layer for every business function. The first release will deliver the base platform and one flagship Customer Agent; every later wave will add two larger agentic solutions in parallel, compounding into a reusable AI factory that can extend across e& OpCos.
      </p>
      <div style={{display:"flex",gap:28,flexWrap:"wrap"}}>
        {[{v:"1",l:"Flagship agentic solution"},{v:"30 days",l:"Base platform MVP"},{v:"2",l:"Parallel solutions per wave"}].map((s,i)=><div key={i} style={{minWidth:90}}>
          <div style={{fontSize:22,fontWeight:700,color:"#E00800",fontFamily:BRAND.font}}>{s.v}</div>
          <div style={{fontSize:10.5,color:"#999",marginTop:2}}>{s.l}</div>
        </div>)}
      </div>
    </div>

    {/* What we will build */}
    <SH>What we will build</SH>
    <Card>
      <p style={{fontSize:13,color:"#555",lineHeight:1.7,marginBottom:14}}>
        Customers will not be buying disconnected point tools. They will subscribe to an e& AI operating layer where each agentic solution owns a business function end-to-end: Customer, Sales, Communications, Finance, Operations, and People.
      </p>
      <p style={{fontSize:13,color:"#555",lineHeight:1.7,marginBottom:14}}>
        The platform will include onboarding, tenant back office, identity, billing, analytics, connector management, observability, and reusable SDD blueprints. The first solution will fund and validate the base platform; later solutions will reuse the same infrastructure.
      </p>
      <p style={{fontSize:13,color:"#555",lineHeight:1.7,marginBottom:14}}>
        The SMB build also introduces the platform's P1 capability layer: enterprise-grade automation, compliance controls, audit trails, RBAC, guardrails, and operational workflows. This is deployed as part of Wave 2 so the platform is not only an SMB marketplace, but the foundation for future enterprise and regulated-market expansion.
      </p>
      <p style={{fontSize:13,color:"#555",lineHeight:1.7}}>
        The first Customer Agent will launch with the platform foundation. After that, AIdeology will build two larger agentic solutions in parallel per wave, because the heavy platform work will already be in place.
      </p>
    </Card>

    <SH>Platform-centric agent roadmap</SH>
    <Note label="One platform · larger solutions">
      AIdeology will build the agent brain, UX, workflow, memory, Arabic/English understanding and decision logic. e& network assets become the infrastructure layer. Partners remain connectors at the edge, invisible to the SMB. Click any agent card to see the full specification.
    </Note>
    <AgentRoadmapGrid />

    <SH>SMB launch plan · parallel tracks</SH>
    <CollapsibleTimeline
      badge="Wave 1"
      span="W1–W13 · 13 weeks"
      title="Base platform first, then two solutions in parallel"
      desc="Five workstreams will still run in parallel, but the first delivery will focus on one agentic solution because it also creates the base platform: identity, memory, connectors, e& network assets, billing, observability, and onboarding. Once that foundation exists, the next waves can deliver two larger agentic solutions in parallel."
      footer="Launch readiness gate at end of W12: base platform stability green, Customer Agent passing acceptance tests, beta customers in production, support and billing flows live. GA opens with one flagship solution; the Sales Agent and Comms Hub enter the next parallel build wave."
    >
      <div style={{padding:"0",overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11.5,minWidth:760}}>
          <thead>
            <tr style={{background:BRAND.lightGrey}}>
              <th style={{textAlign:"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`,minWidth:170}}>Workstream</th>
              {["W1-2","W3-4","W5-6","W7-8","W9-10","W11-12","W13"].map((w,i)=>(
                <th key={i} style={{textAlign:"left",padding:"12px 10px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`,borderLeft:`1px solid ${BRAND.border}`}}>{w}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {n:"A · Platform build",c:BRAND.red,bars:[
                {span:2,t:"Infra · K8s · DBs · observability"},
                {span:2,t:"Frontend · onboarding · SSO"},
                {span:2,t:"Agent + Model plane · Portkey"},
                {span:2,t:"Billing · analytics · hardening"},
                {span:0},{span:0},{span:0},
              ]},
              {n:"B · Solution build",c:"#E00800",bars:[
                {span:2,t:"SDD · Customer Agent + base platform"},
                {span:3,t:"Build: voice · WhatsApp · web · memory"},
                {span:0},{span:0},
                {span:2,t:"Start next pair: Sales + Comms"},
                {span:0},{span:0},
              ]},
              {n:"C · Internal QA",c:"#222",bars:[
                {span:0},{span:0},
                {span:2,t:"Alpha · AIdeology + e& team"},
                {span:0},
                {span:2,t:"Security · telephony · load tests"},
                {span:1,t:"Bug bash"},
                {span:0},
              ]},
              {n:"D · Beta customers",c:"#0099A8",bars:[
                {span:0},{span:0},
                {span:1,t:"Recruit 10–20 SMBs"},
                {span:0},
                {span:2,t:"Closed beta · feedback loops"},
                {span:1,t:"Iterate · graduate beta"},
                {span:0},
              ]},
              {n:"E · Commercial launch",c:"#7A52F4",bars:[
                {span:0},{span:0},{span:0},
                {span:1,t:"Pricing · sales enablement"},
                {span:1,t:"Marketing assets · launch site"},
                {span:1,t:"GTM rehearsal · readiness gate"},
                {span:1,t:"GA launch · marketplace open"},
              ]},
            ].map((row,ri)=>{
              const cells=[];
              let i=0;
              for(const b of row.bars){
                if(!b.span){cells.push(<td key={cells.length} style={{padding:6,borderLeft:`1px solid ${BRAND.border}`,borderBottom:`1px solid ${BRAND.border}`}}/>);i++;continue;}
                cells.push(<td key={cells.length} colSpan={b.span} style={{padding:6,borderLeft:`1px solid ${BRAND.border}`,borderBottom:`1px solid ${BRAND.border}`}}>
                  <div style={{background:row.c,color:BRAND.white,padding:"6px 10px",fontSize:10.5,fontWeight:600,lineHeight:1.3,borderRadius:2}}>{b.t}</div>
                </td>);
                i+=b.span;
              }
              while(i<7){cells.push(<td key={cells.length} style={{padding:6,borderLeft:`1px solid ${BRAND.border}`,borderBottom:`1px solid ${BRAND.border}`}}/>);i++;}
              return <tr key={ri}>
                <td style={{padding:"12px 14px",fontSize:12,fontWeight:700,color:"#111",borderBottom:`1px solid ${BRAND.border}`,background:BRAND.white}}>{row.n}</td>
                {cells}
              </tr>;
            })}
          </tbody>
        </table>
      </div>
      <div style={{padding:"18px 22px",borderTop:`1px solid ${BRAND.border}`}}>
        <div style={{fontSize:10.5,fontWeight:700,letterSpacing:"0.06em",color:BRAND.grey,textTransform:"uppercase",marginBottom:12}}>Milestones</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:10}}>
          {[
            {m:"M1",t:"Platform foundations",w:"End of W2",d:"Cluster, databases, identity, CI/CD, observability and Agentic Intelligence Platform (Forge) stood up. Base images and tenant model approved."},
            {m:"M2",t:"Customer Agent + alpha",w:"End of W6",d:"Voice, WhatsApp, web chat, memory and handoff working end-to-end. AIdeology + e& staff using the agent daily. Telephony, billing and observability integrated."},
            {m:"M3",t:"Closed beta live",w:"End of W9",d:"10–20 paying or pre-committed SMBs onboarded with real call/chat traffic, real CSAT and CAC data, and real escalation flows."},
            {m:"M4",t:"GA launch + wave 2 start",w:"W13",d:"Customer Agent passes security, performance and Arabic/English tests. Marketplace opens. e& sales force enabled. Sales Agent and Comms Hub start as the next parallel build."},
          ].map((x,i)=><div key={i} style={{padding:14,background:BRAND.lightGrey,border:`1px solid ${BRAND.border}`}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <div style={{fontSize:10,fontWeight:700,color:BRAND.red,fontFamily:"monospace"}}>{x.m}</div>
              <div style={{fontSize:9.5,fontWeight:700,color:BRAND.white,background:BRAND.red,padding:"2px 7px",letterSpacing:"0.04em"}}>{x.w}</div>
            </div>
            <h5 style={{fontSize:12.5,fontWeight:700,color:"#111",marginBottom:4,margin:0}}>{x.t}</h5>
            <p style={{fontSize:11,color:"#666",lineHeight:1.5,margin:"4px 0 0"}}>{x.d}</p>
          </div>)}
        </div>
      </div>
    </CollapsibleTimeline>

    {/* Wave 2 timeline */}
    <CollapsibleTimeline
      badge="Wave 2"
      span="W13–W18 · 6 weeks"
      title="Sales Agent + Comms Hub + P1 platform layer"
      desc="Platform is live. Wave 2 ships the next two agentic solutions and deploys the P1 enterprise-readiness layer: automation workflows, compliance controls, audit trails, RBAC and operational guardrails."
      footer="Both solutions share the platform connectors built in Wave 1. Sales Agent adds CRM and lead-scoring logic; Comms Hub adds omnichannel broadcast and campaign automation. In parallel, the P1 layer upgrades the platform with enterprise-grade automation and compliance capabilities that future waves and enterprise deployments can reuse."
    >
      <div style={{padding:"0",overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11.5,minWidth:760}}>
          <thead>
            <tr style={{background:BRAND.lightGrey}}>
              <th style={{textAlign:"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`,minWidth:170}}>Workstream</th>
              {["W13","W14","W15","W16","W17","W18"].map((w,i)=>(
                <th key={i} style={{textAlign:"left",padding:"12px 10px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`,borderLeft:`1px solid ${BRAND.border}`}}>{w}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {n:"A · Sales Agent",c:BRAND.red,bars:[
                {span:2,t:"SDD · CRM architecture"},
                {span:2,t:"Build: lead scoring · pipeline · sequences"},
                {span:1,t:"QA + Arabic"},
                {span:1,t:"GA release"},
              ]},
              {n:"B · Comms Hub",c:"#E00800",bars:[
                {span:2,t:"SDD · channel architecture"},
                {span:2,t:"Build: inbox · campaigns · broadcast"},
                {span:1,t:"QA + Arabic"},
                {span:1,t:"GA release"},
              ]},
              {n:"C · P1 automation & compliance layer",c:"#7A52F4",bars:[
                {span:1,t:"Automation + compliance design"},
                {span:2,t:"Audit trail · RBAC · guardrails"},
                {span:2,t:"Workflow deployment"},
                {span:1,t:"P1 readiness gate"},
              ]},
              {n:"D · Integration & QA",c:"#222",bars:[
                {span:0},
                {span:1,t:"Connector tests"},
                {span:2,t:"E2E · security · load tests"},
                {span:1,t:"Bug fix"},
                {span:0},
              ]},
              {n:"E · Beta customers",c:"#0099A8",bars:[
                {span:0},{span:0},
                {span:1,t:"Onboard beta SMBs"},
                {span:2,t:"Feedback loops"},
                {span:1,t:"Graduate beta"},
              ]},
              {n:"F · Commercial launch",c:"#185FA5",bars:[
                {span:0},{span:0},
                {span:1,t:"Sales enablement"},
                {span:1,t:"Marketing assets"},
                {span:1,t:"GTM prep"},
                {span:1,t:"Marketplace live"},
              ]},
            ].map((row,ri)=>{
              const cells=[];
              let i=0;
              for(const b of row.bars){
                if(!b.span){cells.push(<td key={cells.length} style={{padding:6,borderLeft:`1px solid ${BRAND.border}`,borderBottom:`1px solid ${BRAND.border}`}}/>);i++;continue;}
                cells.push(<td key={cells.length} colSpan={b.span} style={{padding:6,borderLeft:`1px solid ${BRAND.border}`,borderBottom:`1px solid ${BRAND.border}`}}>
                  <div style={{background:row.c,color:BRAND.white,padding:"6px 10px",fontSize:10.5,fontWeight:600,lineHeight:1.3,borderRadius:2}}>{b.t}</div>
                </td>);
                i+=b.span;
              }
              while(i<6){cells.push(<td key={cells.length} style={{padding:6,borderLeft:`1px solid ${BRAND.border}`,borderBottom:`1px solid ${BRAND.border}`}}/>);i++;}
              return <tr key={ri}>
                <td style={{padding:"12px 14px",fontSize:12,fontWeight:700,color:"#111",borderBottom:`1px solid ${BRAND.border}`,background:BRAND.white}}>{row.n}</td>
                {cells}
              </tr>;
            })}
          </tbody>
        </table>
      </div>
      <div style={{padding:"18px 22px",borderTop:`1px solid ${BRAND.border}`}}>
        <div style={{fontSize:10.5,fontWeight:700,letterSpacing:"0.06em",color:BRAND.grey,textTransform:"uppercase",marginBottom:12}}>Milestones</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:10}}>
          {[
            {m:"M1",t:"SDD + P1 architecture complete",w:"End of W14",d:"Solution Design Documents for Sales Agent and Comms Hub approved. CRM connector architecture, channel routing design, data models, audit trail, RBAC and compliance-control design signed off."},
            {m:"M2",t:"Agents + P1 layer in dev",w:"End of W16",d:"Sales Agent with lead scoring, pipeline tracking and follow-up sequences working. Comms Hub with unified inbox, campaign builder and omnichannel broadcast functional. P1 automation workflows, guardrails and audit logging deployed to staging."},
            {m:"M3",t:"Beta + compliance QA passed",w:"End of W17",d:"Beta SMBs using both agents with live data. E2E, security, compliance workflow and load tests passed. Arabic/English quality benchmarks met. Bug backlog resolved."},
            {m:"M4",t:"GA release + P1 deployed",w:"W18",d:"Sales Agent and Comms Hub live in the marketplace. P1 enterprise-readiness layer deployed across the platform. Sales enablement complete. e& sales force trained on both solutions."},
          ].map((x,i)=><div key={i} style={{padding:14,background:BRAND.lightGrey,border:`1px solid ${BRAND.border}`}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <div style={{fontSize:10,fontWeight:700,color:BRAND.red,fontFamily:"monospace"}}>{x.m}</div>
              <div style={{fontSize:9.5,fontWeight:700,color:BRAND.white,background:BRAND.red,padding:"2px 7px",letterSpacing:"0.04em"}}>{x.w}</div>
            </div>
            <h5 style={{fontSize:12.5,fontWeight:700,color:"#111",marginBottom:4,margin:0}}>{x.t}</h5>
            <p style={{fontSize:11,color:"#666",lineHeight:1.5,margin:"4px 0 0"}}>{x.d}</p>
          </div>)}
        </div>
      </div>
    </CollapsibleTimeline>

    {/* Wave 3 timeline */}
    <CollapsibleTimeline
      badge="Wave 3"
      span="W19–W24 · 6 weeks"
      title="Finance Agent + Ops Agent — parallel build"
      desc="Builds on the same platform and reuses connectors from Waves 1–2. Finance Agent connects e& Pay and FTA compliance. Ops Agent wires into Teams, SharePoint, and e& SIM location data."
      footer="Finance Agent integrates e& Pay, e& Money, and FTA-compliant VAT flows. Ops Agent reuses Teams and calendar connectors from earlier waves and adds task-engine logic. Milestone payment: 50/50 across two milestones."
    >
      <div style={{padding:"0",overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11.5,minWidth:760}}>
          <thead>
            <tr style={{background:BRAND.lightGrey}}>
              <th style={{textAlign:"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`,minWidth:170}}>Workstream</th>
              {["W19","W20","W21","W22","W23","W24"].map((w,i)=>(
                <th key={i} style={{textAlign:"left",padding:"12px 10px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`,borderLeft:`1px solid ${BRAND.border}`}}>{w}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {n:"A · Finance Agent",c:BRAND.red,bars:[
                {span:2,t:"SDD · invoicing architecture"},
                {span:2,t:"Build: VAT · payments · cash flow"},
                {span:1,t:"QA + Arabic"},
                {span:1,t:"GA release"},
              ]},
              {n:"B · Ops Agent",c:"#E00800",bars:[
                {span:2,t:"SDD · task engine architecture"},
                {span:2,t:"Build: approvals · SOP · service desk"},
                {span:1,t:"QA + Arabic"},
                {span:1,t:"GA release"},
              ]},
              {n:"C · Integration & QA",c:"#222",bars:[
                {span:0},
                {span:1,t:"Connector tests"},
                {span:2,t:"E2E · e& Pay · security tests"},
                {span:1,t:"Bug fix"},
                {span:0},
              ]},
              {n:"D · Beta customers",c:"#0099A8",bars:[
                {span:0},{span:0},
                {span:1,t:"Onboard beta SMBs"},
                {span:2,t:"Feedback loops"},
                {span:1,t:"Graduate beta"},
              ]},
              {n:"E · Commercial launch",c:"#7A52F4",bars:[
                {span:0},{span:0},
                {span:1,t:"Sales enablement"},
                {span:1,t:"Marketing assets"},
                {span:1,t:"GTM prep"},
                {span:1,t:"Marketplace update"},
              ]},
            ].map((row,ri)=>{
              const cells=[];
              let i=0;
              for(const b of row.bars){
                if(!b.span){cells.push(<td key={cells.length} style={{padding:6,borderLeft:`1px solid ${BRAND.border}`,borderBottom:`1px solid ${BRAND.border}`}}/>);i++;continue;}
                cells.push(<td key={cells.length} colSpan={b.span} style={{padding:6,borderLeft:`1px solid ${BRAND.border}`,borderBottom:`1px solid ${BRAND.border}`}}>
                  <div style={{background:row.c,color:BRAND.white,padding:"6px 10px",fontSize:10.5,fontWeight:600,lineHeight:1.3,borderRadius:2}}>{b.t}</div>
                </td>);
                i+=b.span;
              }
              while(i<6){cells.push(<td key={cells.length} style={{padding:6,borderLeft:`1px solid ${BRAND.border}`,borderBottom:`1px solid ${BRAND.border}`}}/>);i++;}
              return <tr key={ri}>
                <td style={{padding:"12px 14px",fontSize:12,fontWeight:700,color:"#111",borderBottom:`1px solid ${BRAND.border}`,background:BRAND.white}}>{row.n}</td>
                {cells}
              </tr>;
            })}
          </tbody>
        </table>
      </div>
      <div style={{padding:"18px 22px",borderTop:`1px solid ${BRAND.border}`}}>
        <div style={{fontSize:10.5,fontWeight:700,letterSpacing:"0.06em",color:BRAND.grey,textTransform:"uppercase",marginBottom:12}}>Milestones</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:10}}>
          {[
            {m:"M1",t:"SDD + architecture complete",w:"End of W20",d:"Solution Design Documents for Finance Agent and Ops Agent approved. e& Pay integration architecture, FTA compliance path, task-engine data model signed off."},
            {m:"M2",t:"Both agents in dev",w:"End of W22",d:"Finance Agent with invoicing, VAT prep, payment links and cash-flow forecasting working. Ops Agent with task engine, approvals, SOP knowledge base and service desk functional."},
            {m:"M3",t:"Beta + QA passed",w:"End of W23",d:"Beta SMBs using both agents with real invoices and task flows. E2E, e& Pay, and security tests passed. Arabic/English quality benchmarks met."},
            {m:"M4",t:"GA release",w:"W24",d:"Finance Agent and Ops Agent live in the marketplace. Five agents now available to SMBs. Sales enablement and marketing assets updated for the expanded catalog."},
          ].map((x,i)=><div key={i} style={{padding:14,background:BRAND.lightGrey,border:`1px solid ${BRAND.border}`}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <div style={{fontSize:10,fontWeight:700,color:BRAND.red,fontFamily:"monospace"}}>{x.m}</div>
              <div style={{fontSize:9.5,fontWeight:700,color:BRAND.white,background:BRAND.red,padding:"2px 7px",letterSpacing:"0.04em"}}>{x.w}</div>
            </div>
            <h5 style={{fontSize:12.5,fontWeight:700,color:"#111",marginBottom:4,margin:0}}>{x.t}</h5>
            <p style={{fontSize:11,color:"#666",lineHeight:1.5,margin:"4px 0 0"}}>{x.d}</p>
          </div>)}
        </div>
      </div>
    </CollapsibleTimeline>

    {/* Wave 4 timeline */}
    <CollapsibleTimeline
      badge="Wave 4"
      span="W25–W30 · 6 weeks"
      title="People Agent"
      desc="Wave 4 delivers the People Agent — WPS payroll, attendance via e& SIM, leave management, visa tracking and digital onboarding. Once live, all 6 agentic solutions are in production."
      footer="Wave 4 delivers the sixth and final agentic solution. People Agent goes live with WPS SIF payroll, WhatsApp-native attendance, leave management and visa expiry tracking. Wave 5 then runs a dedicated hardening and handoff programme across the full platform."
    >
      <div style={{padding:"0",overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11.5,minWidth:760}}>
          <thead>
            <tr style={{background:BRAND.lightGrey}}>
              <th style={{textAlign:"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`,minWidth:170}}>Workstream</th>
              {["W25","W26","W27","W28","W29","W30"].map((w,i)=>(
                <th key={i} style={{textAlign:"left",padding:"12px 10px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`,borderLeft:`1px solid ${BRAND.border}`}}>{w}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {n:"A · People Agent",c:BRAND.red,bars:[
                {span:2,t:"SDD · payroll + HR architecture"},
                {span:2,t:"Build: WPS · attendance · onboarding"},
                {span:1,t:"QA + Arabic"},
                {span:1,t:"GA release"},
              ]},
              {n:"B · Integration & QA",c:"#222",bars:[
                {span:0},
                {span:1,t:"Connector tests · MOHRE / GDRFA"},
                {span:2,t:"E2E regression · People Agent"},
                {span:1,t:"Final bug fix"},
                {span:0},
              ]},
              {n:"C · Beta customers",c:"#0099A8",bars:[
                {span:0},{span:0},
                {span:1,t:"Onboard beta SMBs"},
                {span:2,t:"Real payroll runs · feedback"},
                {span:1,t:"Graduate beta"},
              ]},
            ].map((row,ri)=>{
              const cells=[];
              let i=0;
              for(const b of row.bars){
                if(!b.span){cells.push(<td key={cells.length} style={{padding:6,borderLeft:`1px solid ${BRAND.border}`,borderBottom:`1px solid ${BRAND.border}`}}/>);i++;continue;}
                cells.push(<td key={cells.length} colSpan={b.span} style={{padding:6,borderLeft:`1px solid ${BRAND.border}`,borderBottom:`1px solid ${BRAND.border}`}}>
                  <div style={{background:row.c,color:BRAND.white,padding:"6px 10px",fontSize:10.5,fontWeight:600,lineHeight:1.3,borderRadius:2}}>{b.t}</div>
                </td>);
                i+=b.span;
              }
              while(i<6){cells.push(<td key={cells.length} style={{padding:6,borderLeft:`1px solid ${BRAND.border}`,borderBottom:`1px solid ${BRAND.border}`}}/>);i++;}
              return <tr key={ri}>
                <td style={{padding:"12px 14px",fontSize:12,fontWeight:700,color:"#111",borderBottom:`1px solid ${BRAND.border}`,background:BRAND.white}}>{row.n}</td>
                {cells}
              </tr>;
            })}
          </tbody>
        </table>
      </div>
      <div style={{padding:"18px 22px",borderTop:`1px solid ${BRAND.border}`}}>
        <div style={{fontSize:10.5,fontWeight:700,letterSpacing:"0.06em",color:BRAND.grey,textTransform:"uppercase",marginBottom:12}}>Milestones</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:10}}>
          {[
            {m:"M1",t:"SDD + HR architecture complete",w:"End of W26",d:"Solution Design Document for People Agent approved. WPS payroll engine, attendance model, visa-tracking workflow and MOHRE/GDRFA connector designs signed off."},
            {m:"M2",t:"People Agent in development",w:"End of W28",d:"WPS SIF generation, attendance check-in, leave management and digital onboarding working end-to-end. MOHRE and GDRFA connectors integrated and passing sandbox tests."},
            {m:"M3",t:"Beta + QA passed",w:"End of W29",d:"Beta SMBs running real payroll cycles with People Agent. Full QA across People Agent completed. Arabic / English quality benchmarks met."},
            {m:"M4",t:"People Agent GA · all 6 agents live",w:"W30",d:"People Agent released to marketplace. All six agentic solutions are now live. Platform handed to Wave 5 for full hardening and ownership transfer."},
          ].map((x,i)=><div key={i} style={{padding:14,background:BRAND.lightGrey,border:`1px solid ${BRAND.border}`}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <div style={{fontSize:10,fontWeight:700,color:BRAND.red,fontFamily:"monospace"}}>{x.m}</div>
              <div style={{fontSize:9.5,fontWeight:700,color:BRAND.white,background:BRAND.red,padding:"2px 7px",letterSpacing:"0.04em"}}>{x.w}</div>
            </div>
            <h5 style={{fontSize:12.5,fontWeight:700,color:"#111",marginBottom:4,margin:0}}>{x.t}</h5>
            <p style={{fontSize:11,color:"#666",lineHeight:1.5,margin:"4px 0 0"}}>{x.d}</p>
          </div>)}
        </div>
      </div>
    </CollapsibleTimeline>

    {/* Wave 5 timeline */}
    <CollapsibleTimeline
      badge="Wave 5"
      span="W31–W36 · 6 weeks"
      title="Platform hardening & full e& handoff"
      desc="With all 6 agents live, Wave 5 runs a full security audit and performance hardening across the complete platform — then delivers a clean, documented ownership transfer to e&."
      footer="Wave 5 closes the programme. Running the security audit and pen test after all agents are live means the entire platform is tested as a whole, not piece by piece. The handoff is a dedicated 6-week programme — documentation, e& team training, runbooks, SLA definitions, on-call rotation, and final ownership transfer. e& leaves Wave 5 owning everything."
    >
      <div style={{padding:"0",overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11.5,minWidth:760}}>
          <thead>
            <tr style={{background:BRAND.lightGrey}}>
              <th style={{textAlign:"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`,minWidth:170}}>Workstream</th>
              {["W31","W32","W33","W34","W35","W36"].map((w,i)=>(
                <th key={i} style={{textAlign:"left",padding:"12px 10px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`,borderLeft:`1px solid ${BRAND.border}`}}>{w}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {n:"A · Security audit & pen test",c:"#993C1D",bars:[
                {span:1,t:"Scope + kick-off"},
                {span:2,t:"Security audit + penetration test"},
                {span:1,t:"Findings + remediation"},
                {span:1,t:"Re-test + sign-off"},
                {span:0},
              ]},
              {n:"B · Performance hardening",c:"#E00800",bars:[
                {span:1,t:"Baseline all 6 agents"},
                {span:2,t:"Optimisation + scale tests"},
                {span:1,t:"Load test + fix"},
                {span:0},{span:0},
              ]},
              {n:"C · Documentation & runbooks",c:"#222",bars:[
                {span:2,t:"Architecture docs + runbooks"},
                {span:2,t:"SLA definitions + on-call rotation"},
                {span:1,t:"Final review"},
                {span:0},
              ]},
              {n:"D · e& team training",c:"#185FA5",bars:[
                {span:0},
                {span:2,t:"Platform deep-dives + workshops"},
                {span:2,t:"Ops training + incident drills"},
                {span:1,t:"Sign-off"},
              ]},
              {n:"E · Ownership transfer",c:"#7A52F4",bars:[
                {span:0},{span:0},{span:0},
                {span:1,t:"Staged handoff begins"},
                {span:1,t:"Keys + access transfer"},
                {span:1,t:"Full ownership · programme close"},
              ]},
            ].map((row,ri)=>{
              const cells=[];
              let i=0;
              for(const b of row.bars){
                if(!b.span){cells.push(<td key={cells.length} style={{padding:6,borderLeft:`1px solid ${BRAND.border}`,borderBottom:`1px solid ${BRAND.border}`}}/>);i++;continue;}
                cells.push(<td key={cells.length} colSpan={b.span} style={{padding:6,borderLeft:`1px solid ${BRAND.border}`,borderBottom:`1px solid ${BRAND.border}`}}>
                  <div style={{background:row.c,color:BRAND.white,padding:"6px 10px",fontSize:10.5,fontWeight:600,lineHeight:1.3,borderRadius:2}}>{b.t}</div>
                </td>);
                i+=b.span;
              }
              while(i<6){cells.push(<td key={cells.length} style={{padding:6,borderLeft:`1px solid ${BRAND.border}`,borderBottom:`1px solid ${BRAND.border}`}}/>);i++;}
              return <tr key={ri}>
                <td style={{padding:"12px 14px",fontSize:12,fontWeight:700,color:"#111",borderBottom:`1px solid ${BRAND.border}`,background:BRAND.white}}>{row.n}</td>
                {cells}
              </tr>;
            })}
          </tbody>
        </table>
      </div>
      <div style={{padding:"18px 22px",borderTop:`1px solid ${BRAND.border}`}}>
        <div style={{fontSize:10.5,fontWeight:700,letterSpacing:"0.06em",color:BRAND.grey,textTransform:"uppercase",marginBottom:12}}>Milestones</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:10}}>
          {[
            {m:"M1",t:"Audit started + docs kicked off",w:"End of W32",d:"Security audit and penetration test underway across all 6 agents and platform. Architecture documentation, runbooks and SLA definitions drafted and in review."},
            {m:"M2",t:"Audit complete + platform hardened",w:"End of W33",d:"All security findings resolved and re-tested. Performance optimisation complete across all agents. Load testing passed. Platform ready for full e& operation."},
            {m:"M3",t:"e& team training complete",w:"End of W35",d:"e& team trained on all 6 agents, platform operations, incident response, on-call rotation, and the localisation playbook for future OpCo expansion."},
            {m:"M4",t:"Full ownership transfer · programme close",w:"W36",d:"All access, keys, credentials, runbooks, SLA definitions and on-call rotation formally transferred to e&. Programme closed. AIdeology moves to Year 1 platform partnership."},
          ].map((x,i)=><div key={i} style={{padding:14,background:BRAND.lightGrey,border:`1px solid ${BRAND.border}`}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <div style={{fontSize:10,fontWeight:700,color:BRAND.red,fontFamily:"monospace"}}>{x.m}</div>
              <div style={{fontSize:9.5,fontWeight:700,color:BRAND.white,background:BRAND.red,padding:"2px 7px",letterSpacing:"0.04em"}}>{x.w}</div>
            </div>
            <h5 style={{fontSize:12.5,fontWeight:700,color:"#111",marginBottom:4,margin:0}}>{x.t}</h5>
            <p style={{fontSize:11,color:"#666",lineHeight:1.5,margin:"4px 0 0"}}>{x.d}</p>
          </div>)}
        </div>
      </div>
    </CollapsibleTimeline>

    {/* Master timeline — all waves */}
    <CollapsibleTimeline
      badge="Full programme"
      span="36 weeks · 9 months"
      title="All waves — end-to-end delivery timeline"
      desc="Wave 1 builds the platform and the first flagship agent. Waves 2–4 each deliver agents on repeatable 6-week cadences. Wave 5 is a dedicated hardening and handoff programme after all 6 agents are live."
      footer="Total programme: 36 weeks from kick-off to full ownership transfer. Wave 1 is longer (12 weeks) because it builds the base platform alongside the first agent. Waves 2–4 run on a repeatable 6-week cadence. Wave 5 hardens the complete platform and formally transfers ownership to e&. e& starts earning SaaS revenue from Week 13 and compounds it with each new agent release."
      defaultOpen
    >
      <div style={{padding:"0",overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11.5,minWidth:900}}>
          <thead>
            <tr style={{background:BRAND.lightGrey}}>
              <th style={{textAlign:"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`,minWidth:200}}>Wave</th>
              {["W1–6","W7–12","W13–18","W19–24","W25–30","W31–36"].map((w,i)=>(
                <th key={i} style={{textAlign:"left",padding:"12px 10px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`,borderLeft:`1px solid ${BRAND.border}`}}>{w}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {n:"Wave 1 · Platform + Customer Agent",c:BRAND.red,bars:[
                {span:1,t:"Platform build + SDD"},
                {span:1,t:"Customer Agent + beta + GA"},
                {span:0},{span:0},{span:0},{span:0},
              ]},
              {n:"Wave 2 · Sales + Comms + P1 Layer",c:"#D14600",bars:[
                {span:0},{span:0},
                {span:1,t:"Parallel build + P1 deployment → GA"},
                {span:0},{span:0},{span:0},
              ]},
              {n:"Wave 3 · Finance Agent + Ops Agent",c:"#0099A8",bars:[
                {span:0},{span:0},{span:0},
                {span:1,t:"Parallel build → GA"},
                {span:0},{span:0},
              ]},
              {n:"Wave 4 · People Agent",c:"#7A52F4",bars:[
                {span:0},{span:0},{span:0},{span:0},
                {span:1,t:"Build · QA · GA"},
                {span:0},
              ]},
              {n:"Wave 5 · Hardening & Handoff",c:"#993C1D",bars:[
                {span:0},{span:0},{span:0},{span:0},{span:0},
                {span:1,t:"Security audit · training · ownership transfer"},
              ]},
              {n:"Cumulative agents live",c:"#222",bars:[
                {span:0},
                {span:1,t:"1 agent"},
                {span:1,t:"3 agents"},
                {span:1,t:"5 agents"},
                {span:1,t:"6 agents live"},
                {span:1,t:"Full handoff complete"},
              ]},
              {n:"e& SaaS revenue",c:"#004B2E",bars:[
                {span:0},{span:0},
                {span:1,t:"First subscriptions"},
                {span:1,t:"Scaling"},
                {span:1,t:"Full marketplace"},
                {span:1,t:"Growing · handoff running"},
              ]},
            ].map((row,ri)=>{
              const cells=[];
              let i=0;
              for(const b of row.bars){
                if(!b.span){cells.push(<td key={cells.length} style={{padding:6,borderLeft:`1px solid ${BRAND.border}`,borderBottom:`1px solid ${BRAND.border}`}}/>);i++;continue;}
                cells.push(<td key={cells.length} colSpan={b.span} style={{padding:6,borderLeft:`1px solid ${BRAND.border}`,borderBottom:`1px solid ${BRAND.border}`}}>
                  <div style={{background:row.c,color:BRAND.white,padding:"6px 10px",fontSize:10.5,fontWeight:600,lineHeight:1.3,borderRadius:2}}>{b.t}</div>
                </td>);
                i+=b.span;
              }
              while(i<6){cells.push(<td key={cells.length} style={{padding:6,borderLeft:`1px solid ${BRAND.border}`,borderBottom:`1px solid ${BRAND.border}`}}/>);i++;}
              return <tr key={ri}>
                <td style={{padding:"12px 14px",fontSize:12,fontWeight:700,color:"#111",borderBottom:`1px solid ${BRAND.border}`,background:BRAND.white}}>{row.n}</td>
                {cells}
              </tr>;
            })}
          </tbody>
        </table>
      </div>
    </CollapsibleTimeline>

    <Note label="Assumption · access to e& technical specs">
      The plan above assumes e& will grant timely access to the technical foundations, sandbox environments, cloud/GPU resources, security approvals, and integration owners required to build the platform and the first e& AI Solutions in parallel. Without these inputs, the timeline will slip workstream by workstream because engineering cannot validate deployment, data flows, identity, billing, voice, WhatsApp, observability, and beta operations in isolation.
    </Note>
    <Card style={{padding:0,overflow:"hidden",marginBottom:18}}>
      <div style={{padding:"18px 24px",borderBottom:`1px solid ${BRAND.border}`}}>
        <h4 style={{fontSize:15,fontWeight:700,color:"#111",marginBottom:6}}>Required technical specifications from e&</h4>
        <p style={{fontSize:12,color:"#777",lineHeight:1.6,margin:0,maxWidth:860}}>
          To run the build, internal testing and beta in parallel, AIdeology will need documentation, sandbox credentials, and named technical owners for the items below. Each item maps directly to a workstream above.
        </p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))"}}>
        {[
          {t:"e& cloud / GPU environment",d:"Access to the target e& or G42 cloud landing zone, GPU or inference capacity, Kubernetes namespace or cluster access, container registry, approved base images, quota limits, and environment sizing assumptions for dev, staging, beta and production."},
          {t:"Runtime & deployment access",d:"CI/CD permissions, GitHub or GitLab integration, Helm chart approval path, secrets management, service accounts, network policies, rollback process, and change windows for deploying platform services."},
          {t:"Model gateway & inference",d:"Approved LLM providers, Portkey or gateway credentials, routing policies, rate limits, data residency rules, model fallback policy, logging redaction requirements, and cost/budget guardrails per tenant and solution."},
          {t:"Telephony & voice",d:"SIP trunk / e& UCaaS specs, DID provisioning process, voice codec support, recording and consent handling, fallback IVR."},
          {t:"WhatsApp Business",d:"BSP path (e& or partner), template approval flow, sender numbers, opt-in / opt-out, message rate limits and pricing tiers."},
          {t:"Billing & subscriptions",d:"e& billing API contract (auth, products, charges, refunds), tax rules, invoice formats, dunning policy, partner revenue-share reporting."},
          {t:"Identity & SSO",d:"Federation with e& IAM (OIDC/SAML), tenant model, role mapping, SMB customer auth, admin and support user directories."},
          {t:"Networking & DNS",d:"VPC/VNet design, private subnets, ingress controller rules, firewall allowlists, subdomain delegation (e.g. *.smb.eand.ae), TLS certificate issuance, CDN, NAT/egress policy, VPN or private link access to e& systems."},
          {t:"Data residency & compliance",d:"Approved hosting region, NESA / TDRA / ADDA controls, data classification policy, logging retention, audit access."},
          {t:"Security & observability",d:"SIEM/Loki integration, Prometheus/Grafana access, Langfuse or trace store approval, secret management, vulnerability scanning, penetration-test path, incident response contacts, change management process."},
          {t:"Channels & connectors",d:"Sandbox credentials for e& telephony, WhatsApp Business, calendar, CRM, payment, and web channels needed for the Customer Agent, then reusable connector credentials for the Sales and Comms waves."},
          {t:"Data & knowledge sources",d:"Approved sample FAQs, call scripts, product data, branch/service information, escalation rules, Arabic/English terminology, anonymised beta transcripts, and data-sharing boundaries for retrieval and testing."},
          {t:"Tenant and support operations",d:"SMB tenant provisioning rules, support roles, escalation queues, human handoff policy, admin console access, customer onboarding checklist, and operational SLAs for beta and launch."},
          {t:"Beta access",d:"Named e& account managers, list of 10–20 SMB beta candidates by vertical, NDA template, feedback channel and SLA expectations."},
        ].map((x,i)=><div key={i} style={{padding:18,borderRight:(i+1)%3?`1px solid ${BRAND.border}`:"none",borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{fontSize:10.5,fontWeight:700,color:BRAND.red,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>0{i+1}</div>
          <h5 style={{fontSize:13,fontWeight:700,color:"#111",marginBottom:6}}>{x.t}</h5>
          <p style={{fontSize:11.8,color:"#666",lineHeight:1.6,margin:0}}>{x.d}</p>
        </div>)}
      </div>
    </Card>

    <SH>Continuous improvement and integrations</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{padding:"22px 26px",borderBottom:`1px solid ${BRAND.border}`}}>
        <h4 style={{fontSize:18,fontWeight:700,color:"#111",marginBottom:8}}>Every solution becomes stronger over time</h4>
        <p style={{fontSize:12.5,color:"#777",lineHeight:1.6,maxWidth:860}}>
          The launch catalog is not static. Each e& AI Solution needs ongoing tuning, new workflow variants, and software integrations. The key design choice is to make every new connector reusable, so one industry integration can strengthen many solutions across the marketplace.
        </p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))"}}>
        {[
          {t:"Solution tuning",d:"Improve prompts, scripts, fallback paths, Arabic/English handling, qualification rules, escalation triggers, and success metrics based on live usage."},
          {t:"Industry connectors",d:"Connect to restaurant POS, reservation, ordering, CRM, booking, payment, inventory, and helpdesk software. Start with one use case, then reuse the connector."},
          {t:"Shared integration library",d:"A connector built for AI Receptionist can later be used by WhatsApp, booking, invoice collection, customer support, and future vertical e& AI Solutions."},
          {t:"e& managed evolution",d:"e& owns the catalog roadmap. AIdeology supports complex integrations, quality review, and new blueprint design while e& operates the marketplace day to day."},
        ].map((x,i)=><div key={i} style={{padding:22,borderRight:(i+1)%4?`1px solid ${BRAND.border}`:"none",borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{fontSize:10.5,fontWeight:700,color:BRAND.red,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>0{i+1}</div>
          <h4 style={{fontSize:14,fontWeight:700,color:"#111",marginBottom:7}}>{x.t}</h4>
          <p style={{fontSize:11.8,color:"#666",lineHeight:1.6,margin:0}}>{x.d}</p>
        </div>)}
      </div>
      <div style={{padding:"18px 26px",background:BRAND.lightGrey,borderTop:`1px solid ${BRAND.border}`}}>
        <div style={{fontSize:12,color:"#555",lineHeight:1.6}}>
          Example: an AI Receptionist for restaurants may first connect to reservation and POS tools. Once that connector is approved, the same integration can power WhatsApp ordering, booking changes, loyalty support, complaint handling, and payment follow-up across other e& AI Solutions.
        </div>
      </div>
    </Card>

    <SH>Agentic Intelligence Platform — Forge by AIdeology</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{padding:"20px 24px",borderBottom:`1px solid ${BRAND.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,flexWrap:"wrap"}}>
          <Badge v="teal">Forge schema</Badge>
          <span style={{fontSize:11.5,color:"#888"}}>4 layers · 8 core functions · multi-cloud · multi-LLM</span>
        </div>
        <h4 style={{fontSize:18,fontWeight:700,color:"#111",marginBottom:8}}>Open platform schema from Forge deep dive</h4>
        <p style={{fontSize:12.5,color:"#777",lineHeight:1.6,maxWidth:860,margin:"0 0 10px"}}>
          Forge is not a collection of agents. It is the <strong>agentic intelligence layer</strong> that lets e& run <strong>multi-agent workflows</strong> across clouds, models, connectors and compliance regimes without rebuilding each agent.
        </p>
        <p style={{fontSize:12.5,color:"#777",lineHeight:1.6,maxWidth:860,margin:0}}>
          Unlike platforms built around a <strong>single closed agent stack</strong>, Forge is <strong>agnostic to the tech each agent runs on</strong> and behaves as a <strong>marketplace</strong> — so e& is never locked in while the underlying agentic tech keeps changing every few months.
        </p>
      </div>
      <div style={{padding:"22px 26px",borderBottom:`1px solid ${BRAND.border}`}}>
        <div style={{display:"grid",gap:10}}>
          {[
            {layer:"Layer 1",title:"Agentic applications",sub:"What SMBs use",items:["Customer Agent","Sales Agent","Finance Agent","Ops Agent","Comms Hub","People Agent"],color:BRAND.red},
            {layer:"Layer 2",title:"Forge orchestration middleware",sub:"What AIdeology owns",items:["Multi-agent coordination","State & memory","LLM abstraction","Connector management","Prompt versioning","Observability","Guardrails","Multi-tenant orchestration"],color:"#D14600"},
            {layer:"Layer 3",title:"Infrastructure abstraction",sub:"Where e& chooses to run it",items:["G42 / OCI + H100","Azure / OpenAI API","AWS / Bedrock","On-prem future option"],color:"#7A52F4"},
            {layer:"Layer 4",title:"LLM choice layer",sub:"Swappable, not locked",items:["Claude","GPT","Llama","Mistral","Custom models"],color:"#004B2E"},
          ].map((l,i)=><div key={i} style={{border:`1px solid ${BRAND.border}`,background:BRAND.white,display:"grid",gridTemplateColumns:"220px 1fr",minHeight:86,boxShadow:i===1?"0 8px 18px -18px rgba(17,17,17,0.35)":"none"}}>
            <div style={{padding:"16px 18px",background:l.color,color:BRAND.white,display:"flex",flexDirection:"column",justifyContent:"center"}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",opacity:0.8}}>{l.layer}</div>
              <div style={{fontSize:15,fontWeight:700,marginTop:3,lineHeight:1.25}}>{l.title}</div>
              <div style={{fontSize:10.5,opacity:0.85,marginTop:4}}>{l.sub}</div>
            </div>
            <div style={{padding:"16px 18px",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))",gap:"6px 14px",alignContent:"center"}}>
              {l.items.map((item,j)=><div key={j} style={{display:"flex",alignItems:"flex-start",gap:8}}>
                <span style={{width:5,height:5,background:l.color,flexShrink:0,marginTop:6}}/>
                <span style={{fontSize:11.5,color:"#666",lineHeight:1.45}}>{item}</span>
              </div>)}
            </div>
          </div>)}
        </div>
      </div>
      <div style={{padding:"20px 26px"}}>
        <div style={{fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:12}}>Forge core functions</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",gap:12}}>
          {[
            {n:"01",t:"Agent orchestration",d:<>Coordinates <strong>multiple agents</strong>, shares <strong>context</strong> across workflows, handles <strong>failover</strong>, rate limits and load balancing. Example: Customer Agent qualifies a lead, Sales Agent creates a proposal, Finance Agent generates the invoice.</>},
            {n:"02",t:"LLM abstraction & gateway",d:<><strong>One API</strong> across Claude, GPT, Llama or <strong>sovereign models</strong>, with <strong>virtual keys</strong>, <strong>semantic caching</strong> and <strong>automatic fallbacks</strong>. e& can switch <strong>provider, cloud or region</strong> for cost, latency or compliance — without touching agent code.</>},
            {n:"03",t:"Connector management",d:<>Centralises <strong>reusable integrations</strong>, <strong>credential storage</strong>, data mapping and transformation for CRM, finance, communication, payment and productivity tools.</>},
            {n:"04",t:"Observability & governance",d:<>Tracks agent behaviour, <strong>cost per agent</strong>, response times, success rates, <strong>audit logs</strong>, <strong>PII masking</strong>, approval workflows and <strong>safety guardrails</strong>.</>},
            {n:"05",t:"Idle & runtime strategy",d:<>Protects <strong>SMB unit economics</strong> when thousands of agents sit idle most of the day. Forge <strong>shares runtime</strong> across light tenants, <strong>scales dedicated workloads to zero</strong> and <strong>hibernates</strong> regulated ones — so e& pays compute only when agents are actually working.</>},
            {n:"06",t:"Agent template instancer",d:<>Every agent ships as a <strong>signed, versioned template</strong> — onboarding a new SMB takes <strong>hours, not weeks</strong>. Forge handles <strong>provisioning</strong>, <strong>blue/green upgrades</strong> and <strong>per-tenant rollback</strong>, and lets <strong>vetted third parties publish</strong> under central review.</>},
            {n:"07",t:"Provisioning resilience",d:<>Keeps the marketplace running through <strong>demand spikes</strong> and <strong>regional outages</strong>. Forge spreads provisioning across <strong>clusters and clouds</strong> with <strong>idempotent retries</strong>, <strong>GitOps change control</strong> and <strong>regional failover</strong> — a single-region failure never breaks onboarding.</>},
            {n:"08",t:"Trust tiers & compliance",d:<>One platform spans <strong>SMB, Enterprise and Government</strong> on graduated <strong>trust tiers</strong> — from logical multi-tenancy up to <strong>NESA P4</strong>, <strong>ISO 42001</strong> and <strong>HSM-backed isolation</strong>. <strong>Immutable audit trails</strong>, <strong>jailbreak detection</strong> and <strong>evidence packs</strong> make e& ready for regulated buyers and public-sector tenders.</>},
          ].map((f,i)=><div key={i} style={{padding:16,background:BRAND.lightGrey,border:`1px solid ${BRAND.border}`}}>
            <div style={{fontSize:10,fontWeight:700,color:BRAND.red,fontFamily:"monospace",marginBottom:6}}>{f.n}</div>
            <h5 style={{fontSize:13,fontWeight:700,color:"#111",margin:"0 0 6px"}}>{f.t}</h5>
            <p style={{fontSize:11.5,color:"#666",lineHeight:1.55,margin:0}}>{f.d}</p>
          </div>)}
        </div>
      </div>
      <div style={{padding:"16px 26px",background:"#FAFAFA",borderTop:`1px solid ${BRAND.border}`}}>
        <p style={{fontSize:12,color:"#555",lineHeight:1.6,margin:0}}>
          <strong>Strategic implication:</strong> agents are the applications, but Forge is the <strong>durable platform IP</strong>. e& can add <strong>clouds, models, connectors and new agents</strong> over time while keeping <strong>one orchestration, governance and observability layer</strong>.
        </p>
      </div>
    </Card>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{padding:"20px 24px",borderBottom:`1px solid ${BRAND.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,flexWrap:"wrap"}}>
          <Badge v="teal">30 days</Badge>
          <span style={{fontSize:11.5,color:"#888"}}>SMB launch · one managed Kubernetes cluster</span>
        </div>
        <h4 style={{fontSize:18,fontWeight:700,color:"#111",marginBottom:8}}>One platform, pluggable e& AI Solutions</h4>
        <p style={{fontSize:12.5,color:"#777",lineHeight:1.6,maxWidth:820}}>
          The Phase 0 architecture keeps e& in control of the <strong>customer, the brand, the data, and the margin</strong>. Solutions can come from <strong>AIdeology, e&, or third parties</strong>, but they run through an <strong>e& control plane</strong>: routing, identity, tenant back office, guardrails, billing, and observability.
        </p>
      </div>
      <div style={{background:"#FAFAFA",padding:18,borderBottom:`1px solid ${BRAND.border}`}}>
        <ZoomableImage
          src="/phase0-architecture.png"
          alt="Agentic Intelligence Platform — Forge by AIdeology"
          extraFooter={<>
            This architecture represents backend <strong>v0</strong> for launch. The platform will harden and expand iteratively as usage grows.
            {" "}
            <button
              type="button"
              onClick={goToPlatformEvolutionMatrix}
              style={{border:"none",background:"transparent",color:BRAND.red,fontWeight:700,cursor:"pointer",padding:0}}
            >
              See PLATFORM EVOLUTION MATRIX in Summary →
            </button>
          </>}
        />
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(210px, 1fr))"}}>
        {[
          {t:"Frontend",d:"Next web app with SMB onboarding, tenant back office, and Keycloak SSO."},
          {t:"Agent plane",d:"Provisioning service, Graph + FastAPI shared pool, MCP tools, and versioned OCI templates."},
          {t:"Model plane",d:"Portkey LLM Gateway routes across OpenInnovation, Azure OpenAI, and Anthropic with fallback."},
          {t:"Data plane",d:"Postgres with pgvector, Redis for sessions/cache, and blob storage for files and backups."},
          {t:"Observability",d:"Langfuse, Loki, Prometheus/Grafana, and Alertmanager for traces, logs, metrics, and cost."},
          {t:"Platform ops",d:"Kubernetes, Helm, GitHub Actions, cert-manager, sealed secrets, external DNS, CDN, Harbor."},
        ].map((x,i)=><div key={i} style={{padding:18,borderRight:i<5?`1px solid ${BRAND.border}`:"none",borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{fontSize:11,fontWeight:700,color:BRAND.red,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:6}}>{x.t}</div>
          <p style={{fontSize:11.5,color:"#777",lineHeight:1.55,margin:0}}>{x.d}</p>
        </div>)}
      </div>
    </Card>

    <Card style={{padding:0,overflow:"hidden",marginTop:14}}>
      <div style={{padding:"20px 24px",borderBottom:`1px solid ${BRAND.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,flexWrap:"wrap"}}>
          <Badge v="teal">P1 · 90 days</Badge>
          <span style={{fontSize:11.5,color:"#888"}}>Enterprise-readiness layer deployed during Wave 2</span>
        </div>
        <h4 style={{fontSize:18,fontWeight:700,color:"#111",marginBottom:8}}>Next software phase — from SMB launch to enterprise-grade platform</h4>
        <p style={{fontSize:12.5,color:"#777",lineHeight:1.6,maxWidth:860}}>
          Phase 0 gets the SMB marketplace live quickly: one managed Kubernetes cluster, shared runtime pools, tenant onboarding, billing, observability and the first pluggable agents. Phase 1 does not replace that architecture. It hardens and extends it with automation, compliance, auditability and controlled deployment patterns so the same platform can serve larger SMBs, enterprise accounts and regulated use cases.
        </p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))"}}>
        {[
          {step:"01",t:"Runtime evolution",from:"P0: shared runtime pool for fast SMB launch.",to:"P1: dedicated pods with scaling-to-zero, stronger tenant isolation and upgrade control."},
          {step:"02",t:"Automation layer",from:"P0: manual provisioning service, queue, rollback and Helm templates.",to:"P1: K8s Operator, GitOps workflows, signed templates and repeatable deployment automation."},
          {step:"03",t:"Compliance controls",from:"P0: ISO/SOC/NESA baseline, PII redaction and gateway guardrails.",to:"P1: selectable trust tiers, immutable audit streams, policy versions, RBAC and enterprise compliance evidence."},
          {step:"04",t:"Observability & governance",from:"P0: traces, logs, metrics and basic alerting.",to:"P1: distributed tracing, SLOs, tenant cost dashboards, operational guardrails and compliance-ready reporting."},
        ].map((x,i)=><div key={i} style={{padding:18,borderRight:(i+1)%4?`1px solid ${BRAND.border}`:"none",borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{fontSize:10.5,fontWeight:700,color:BRAND.red,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>{x.step}</div>
          <h5 style={{fontSize:13,fontWeight:700,color:"#111",marginBottom:8}}>{x.t}</h5>
          <div style={{fontSize:11.5,color:"#777",lineHeight:1.5,marginBottom:6}}><strong style={{color:"#555"}}>First architecture:</strong> {x.from}</div>
          <div style={{fontSize:11.5,color:"#777",lineHeight:1.5}}><strong style={{color:BRAND.red}}>Second architecture:</strong> {x.to}</div>
        </div>)}
      </div>
      <div style={{padding:"16px 24px",background:BRAND.lightGrey,borderTop:`1px solid ${BRAND.border}`}}>
        <p style={{fontSize:12,color:"#555",lineHeight:1.6,margin:0}}>
          <strong>Why it matters:</strong> Wave 2 deploys this P1 layer while Sales Agent and Comms Hub go live, so enterprise-readiness becomes part of the SMB platform foundation early. e& does not need a second platform later — it gets one architecture that matures from SMB speed to enterprise control.
        </p>
      </div>
    </Card>

    {/* Software Stack */}
    <SH>Software stack & technology</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:12,marginBottom:14}}>
      <Card style={{borderLeft:"3px solid #E00800"}}>
        <div style={{fontSize:13,fontWeight:600,color:"#111",marginBottom:6}}>SDD — Spec-Driven Development</div>
        <p style={{fontSize:12,color:"#777",lineHeight:1.6}}>A spec-first methodology for rapid e& AI Solution creation. SDD converts business outcomes into structured implementation specs: user journeys, solution behavior, tools, integrations, data rules, guardrails, test cases, and acceptance criteria. Each solution is defined as a blueprint that can be instantiated, customised, tested, and scaled without re-engineering.</p>
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
    <Note label="AIdeology proprietary library">
      AIdeology will use a proprietary library of reusable SDD blueprints, tested prompt patterns, guardrail packs, and connector accelerators that will shorten build cycles, improve consistency, and reduce implementation risk across every e& AI Solution.
    </Note>
    {!upToSoftwareStack && <>
    {/* ════════════════════════════════════════════════════════════ */}
    {/* COMMERCIAL MODEL */}
    {/* ════════════════════════════════════════════════════════════ */}
    <SH>Commercial model</SH>
    {showPricing && <>
    <Note label="Consolidated SMB commercial package">
      This section now consolidates the full SMB economics: AIdeology build and support fees to e&, e& revenue share, SMB subscription pricing, market benchmarks, e& break-even, revenue forecasts, and AIdeology revenue. The handover and knowledge-transfer plan follows after the commercial terms.
    </Note>
    <CommercialBox title="AIdeology fees to e& — SMB Platform Build, Support & Innovation" icon="$" iconBg="#F5F5F5" iconColor="#E00800" items={[
      {label:"Wave 1 — Platform + Customer Agent",value:"$1,250,000",color:"#E00800",type:"Fixed fee · build + support included",desc:"SDD, architecture, platform MVP, Customer Agent (voice + WhatsApp) live, e& team training and documentation. Includes Years 1–3 L3 platform support, knowledge transfer and transition coverage."},
      {label:"Wave 2 — Sales + Comms + P1 Layer",value:"$700,000",color:"#E00800",type:"Fixed fee · build + support included",desc:"Sales Agent + Comms Hub live, plus deployment of the P1 enterprise-readiness layer: automation workflows, compliance controls, audit trail, RBAC and operational guardrails. Includes beta support, L3 platform escalation, documentation updates and knowledge transfer."},
      {label:"Wave 3 — Finance + Ops Agents",value:"$600,000",color:"#E00800",type:"Fixed fee · build + support included",desc:"Finance Agent (invoicing, VAT, FTA compliance) + Ops Agent (tasks, approvals). Includes L3 platform escalation, connector compatibility, release support and knowledge transfer."},
      {label:"Wave 4 — People Agent",value:"$275,000",color:"#E00800",type:"Fixed fee · build + support included",desc:"People Agent (WPS payroll, attendance via e& SIM, leave management, visa tracking, digital onboarding). Includes L3 platform escalation, release support and knowledge transfer; hardening and handoff are separated into Wave 5."},
      {label:"Wave 5 — Platform hardening & full handoff",value:"$618,621",color:"#E00800",type:"Fixed fee · hardening + support included",desc:"Full security audit + pen test across all 6 agents, performance hardening, complete documentation, e& team training, runbooks, SLA definitions and formal ownership transfer. Includes the support framework for Years 1–3."},
      {label:"Total fixed-fee envelope",value:"$3,443,621",color:"#E00800",type:"All 5 waves · build + 3-year support",desc:"Full programme delivery across 12 milestones over 36 weeks. The total includes platform build, all 6 agents, Wave 5 hardening, full handoff, and Years 1–3 AIdeology L3 platform support."},
      {label:"3-year L3 platform support",value:"Included",color:"#E00800",type:"Included in Wave 1–5 pricing",desc:"Covers AIdeology L3 platform escalation, security patches, connector compatibility, release support, runbook updates and knowledge transfer through Years 1–3. e& owns L1 and L2 from Day 1. Commercially, this support is included in the fixed fees and AIdeology revenue share, with no separate support invoice during Years 1–3."},
    ]}/>
    <Note label="3-year support included in fixed pricing">
      The Wave 1–5 fixed pricing includes AIdeology L3 platform support through Years 1–3. This covers platform escalation, patches, connector compatibility, release support, runbook updates and knowledge transfer. e& owns L1 and L2 from Day 1. Commercially, Years 1–3 support is included in the fixed fees and AIdeology revenue share, with no separate support invoice during the transition period.
    </Note>
    </>}

    {/* --- Revenue share: declining model --- */}
    {showPricing && <Card style={{padding:0,overflow:"hidden",marginBottom:16}}>
      <div style={{padding:"22px 26px",borderBottom:`1px solid ${BRAND.border}`,display:"flex",alignItems:"center",gap:12}}>
        <span style={{width:30,height:30,background:BRAND.red,display:"flex",alignItems:"center",justifyContent:"center",color:BRAND.white,fontSize:14,fontWeight:700,borderRadius:0}}>%</span>
        <div>
          <h4 style={{fontSize:15,fontWeight:700,color:"#111",margin:0}}>Pillar 01 · Agentic AI platform — 65/35 declining revenue share</h4>
          <p style={{fontSize:12,color:"#777",margin:"4px 0 0"}}>Applies to SMB agentic AI subscriptions and managed-service revenue under Pillar 01. e& keeps the majority from Day 1; AIdeology's share declines as the e& team takes full ownership of the platform.</p>
        </div>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Period","e& share","AIdeology share","AIdeology responsibility","e& readiness"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {period:"Year 1–2",eShare:"65%",aShare:"35%",aResp:"Platform engineering, agent development, training & consulting",eReady:"2–3 FTE embedded, learning"},
            {period:"Year 3",eShare:"72%",aShare:"28%",aResp:"Platform maintenance, new integrations, knowledge transfer",eReady:"6–8 FTE, owns 80% of agent dev"},
            {period:"Year 4+",eShare:"80%",aShare:"20%",aResp:"Platform updates, security patches, new connectors (licensing model)",eReady:"8–10 FTE, owns entire operation"},
          ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,background:i===0?BRAND.lightGrey:"transparent"}}>
            <td style={{padding:"12px 14px",fontWeight:700,color:"#111"}}>{r.period}</td>
            <td style={{padding:"12px 14px",fontWeight:700,color:BRAND.red,fontFamily:BRAND.font,fontSize:16}}>{r.eShare}</td>
            <td style={{padding:"12px 14px",fontWeight:700,color:"#111",fontFamily:BRAND.font,fontSize:16}}>{r.aShare}</td>
            <td style={{padding:"12px 14px",color:"#555",lineHeight:1.45}}>{r.aResp}</td>
            <td style={{padding:"12px 14px",color:"#777",lineHeight:1.45}}>{r.eReady}</td>
          </tr>)}
        </tbody>
      </table>
      <div style={{padding:"18px 26px 10px",borderTop:`1px solid ${BRAND.border}`}}>
        <h4 style={{fontSize:14,fontWeight:700,color:"#111",margin:"0 0 6px"}}>Platform use after handover — e& built, partner-built and derivative solutions</h4>
        <p style={{fontSize:12,color:"#777",lineHeight:1.6,margin:0}}>
          AIdeology-created solutions follow the standard revenue share above. Genuinely new applications built by e& or third parties on top of the platform pay a platform royalty, with the rate declining as e& takes more operational ownership.
        </p>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Period","e& / partner-built new agent","Third-party partner agent","AIdeology derivative / replicated solution","Buyout option"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {period:"Year 1–2",built:"7% platform royalty",partner:"7% platform royalty + certification / support fee",derivative:"35% solution share",buyout:"Not available except strategic acquisition"},
            {period:"Year 3",built:"5% platform royalty",partner:"5% platform royalty + certification / support fee",derivative:"28% solution share",buyout:"Buyout discussion opens"},
            {period:"Year 4+",built:"3% platform royalty",partner:"3% platform royalty + certification / support fee",derivative:"20% solution share",buyout:"Buyout / acquisition trigger"},
          ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,background:i===0?BRAND.lightGrey:"transparent",verticalAlign:"top"}}>
            <td style={{padding:"12px 14px",fontWeight:700,color:"#111"}}>{r.period}</td>
            <td style={{padding:"12px 14px",fontWeight:700,color:BRAND.red,lineHeight:1.45}}>{r.built}</td>
            <td style={{padding:"12px 14px",fontWeight:700,color:BRAND.red,lineHeight:1.45}}>{r.partner}</td>
            <td style={{padding:"12px 14px",fontWeight:700,color:"#111",lineHeight:1.45}}>{r.derivative}</td>
            <td style={{padding:"12px 14px",color:"#777",lineHeight:1.45}}>{r.buyout}</td>
          </tr>)}
        </tbody>
      </table>
      <div style={{padding:"14px 26px",borderTop:`1px solid ${BRAND.border}`,background:BRAND.lightGrey}}>
        <div style={{fontSize:12,color:"#555",lineHeight:1.6}}>
          <strong style={{color:"#111"}}>Important distinction:</strong> e& and third-party partners may build genuinely new applications on the platform and pay only the platform royalty. Any application that reuses, adapts, replicates, or derives from AIdeology-created agents, workflows, prompts, blueprints, connectors, evaluation data, or orchestration logic is treated as an AIdeology solution and follows the standard solution revenue share.
        </div>
      </div>
      <div style={{padding:"16px 26px",borderTop:`1px solid ${BRAND.border}`,background:"#FAFAFA"}}>
        <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
          {[
            {label:"Year 5+ option",value:"e& acquires AIdeology platform / solution IP outright — or continues paying platform and solution royalties"},
            {label:"Acquisition trigger",value:"By Year 3–4, platform usage and solution reuse make a buyout more economical than long-term royalties"},
          ].map((n,i)=><div key={i} style={{flex:1,minWidth:280}}>
            <div style={{fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:4}}>{n.label}</div>
            <div style={{fontSize:12,color:"#555",lineHeight:1.5}}>{n.value}</div>
          </div>)}
        </div>
      </div>
    </Card>}

    {/* ════════════════════════════════════════════════════════════ */}
    {/* SUPPORT, KNOWLEDGE TRANSFER & LONG-TERM PARTNERSHIP       */}
    {/* ════════════════════════════════════════════════════════════ */}
    <SH>Support, knowledge transfer & long-term partnership</SH>
    <Note label="Build · Transfer · Partner">
      AIdeology will not be a permanent vendor. The engagement is designed as a three-phase transition: full-service build, progressive knowledge transfer, and a long-term platform partnership where e& owns day-to-day operations and AIdeology remains the innovation layer. Commercial support pricing is included in the AIdeology fees section above.
    </Note>

    {/* --- Platform Support Model --- */}
    <Card style={{padding:0,overflow:"hidden",marginBottom:16}}>
      <div style={{padding:"22px 26px",borderBottom:`1px solid ${BRAND.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><Badge v="teal">4 tiers</Badge><span style={{fontSize:11.5,color:"#888"}}>L1 & L2 → e& · L3 & L4 → AIdeology</span></div>
        <h4 style={{fontSize:18,fontWeight:700,color:"#111",marginBottom:8}}>Platform support model</h4>
        <p style={{fontSize:12.5,color:"#777",lineHeight:1.6,maxWidth:860}}>
          AIdeology does not provide L1 or L2 support. e& owns the customer relationship at every touchpoint from Day 1. AIdeology provides the platform knowledge base, escalation decision trees, and troubleshooting guides so e& support teams can resolve issues independently. AIdeology focuses exclusively on L3 platform engineering and L4 innovation.
        </p>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Tier","Owner","Scope","Examples","SLA"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {tier:"L1",owner:"e& (100%)",scope:"Customer-facing triage",examples:"Login, billing, onboarding, UI navigation, 'is the service down?', FAQ-level agent questions",sla:"Per e& customer care SLA",color:"#185FA5"},
            {tier:"L2",owner:"e& (100%)",scope:"Technical support",examples:"Agent configuration, prompt tuning, connector failures, tenant debugging, integration errors, performance complaints, dashboard bugs",sla:"Per e& technical support SLA",color:"#185FA5"},
            {tier:"L3",owner:"AIdeology",scope:"Platform engineering",examples:"Orchestration engine bugs, memory layer issues, guardrail failures, Kubernetes/DB incidents, security patches, connector library bugs, platform releases",sla:"P1: 1h response / 4h fix · P2: 4h / 24h · P3: 1 day / next release",color:BRAND.red},
            {tier:"L4",owner:"AIdeology",scope:"Innovation & architecture",examples:"New agent development, platform architecture changes, market localisation, major feature design, model evaluation, complex integration architecture",sla:"Scoped per project",color:BRAND.red},
          ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,background:i<2?BRAND.lightGrey:"transparent"}}>
            <td style={{padding:"12px 14px"}}><span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:28,height:28,background:r.color,color:BRAND.white,fontSize:10,fontWeight:700}}>{r.tier}</span></td>
            <td style={{padding:"12px 14px",fontWeight:700,color:i<2?"#185FA5":BRAND.red}}>{r.owner}</td>
            <td style={{padding:"12px 14px",fontWeight:700,color:"#111"}}>{r.scope}</td>
            <td style={{padding:"12px 14px",color:"#666",fontSize:11.5,lineHeight:1.45}}>{r.examples}</td>
            <td style={{padding:"12px 14px",color:"#555",fontSize:11.5,lineHeight:1.45,whiteSpace:"pre-line"}}>{r.sla}</td>
          </tr>)}
        </tbody>
      </table>
      <div style={{padding:"16px 26px",background:"#FAFAFA",borderTop:`1px solid ${BRAND.border}`}}>
        <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:280}}>
            <div style={{fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:4}}>Escalation flow</div>
            <div style={{fontSize:12,color:"#555",lineHeight:1.5}}>SMB customer → e& L1 (triage) → e& L2 (technical) → AIdeology L3 (platform) → AIdeology L4 (architecture)</div>
          </div>
          <div style={{flex:1,minWidth:280}}>
            <div style={{fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:4}}>AIdeology provides to e&</div>
            <div style={{fontSize:12,color:"#555",lineHeight:1.5}}>Knowledge base, troubleshooting decision trees, escalation criteria, runbooks, and video library — so L1 and L2 never need AIdeology involvement.</div>
          </div>
        </div>
      </div>
    </Card>

    <CollapsibleTimeline
      badge="Details"
      span="Engagement · team · IP · knowledge transfer · infrastructure · expansion"
      title="Full support and handover plan"
      desc="Expand to see the three-phase engagement model, team scaling, IP ownership, knowledge transfer deliverables, infrastructure responsibility split, and geographic expansion plan."
    >
    <div style={{padding:"22px 26px"}}>

    {/* --- 1. Three-Phase Engagement Model --- */}
    <Card style={{padding:0,overflow:"hidden",marginBottom:16}}>
      <div style={{padding:"22px 26px",borderBottom:`1px solid ${BRAND.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><Badge v="teal">3 phases</Badge><span style={{fontSize:11.5,color:"#888"}}>Full service → Transition → Partnership</span></div>
        <h4 style={{fontSize:18,fontWeight:700,color:"#111",marginBottom:8}}>Three-phase engagement model</h4>
        <p style={{fontSize:12.5,color:"#777",lineHeight:1.6,maxWidth:860}}>
          The relationship evolves from full-service delivery to e& independence, with AIdeology transitioning from builder to platform partner.
        </p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))"}}>
        {[
          {phase:"Phase 1",span:"Year 1",title:"Full service",color:BRAND.red,items:["AIdeology is the primary development team","e& provides infrastructure (G42 / Azure), customer access, support","2–3 e& engineers embedded with AIdeology for hands-on learning","All agents and platform built end-to-end by AIdeology","Weekly knowledge transfer sessions with e& engineering"]},
          {phase:"Phase 2",span:"Year 2",title:"Transition",color:"#185FA5",items:["e& team takes over 40–50% of development","AIdeology focuses on platform architecture, complex features, new agents","e& team owns bug fixes, customer support, minor feature work","Knowledge transfer sessions shift from weekly to bi-weekly","Joint code reviews and architecture decision records"]},
          {phase:"Phase 3",span:"Year 3+",title:"Partnership",color:"#004B2E",items:["e& owns agents and day-to-day development","AIdeology becomes platform maintainer + innovation partner","Revenue model shifts to licensing + variable fee on new features","e& can call AIdeology for complex features, new agents, optimisation","e& team leads OpCo expansion independently — using the transferred localisation playbook and fine-tuning methodology with no structural dependency on AIdeology"]},
        ].map((p,i)=><div key={i} style={{padding:22,borderRight:i<2?`1px solid ${BRAND.border}`:"none",borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
            <span style={{width:28,height:28,background:p.color,display:"flex",alignItems:"center",justifyContent:"center",color:BRAND.white,fontSize:10,fontWeight:700,borderRadius:0}}>{i+1}</span>
            <div>
              <div style={{fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase"}}>{p.phase} · {p.span}</div>
              <div style={{fontSize:14,fontWeight:700,color:"#111"}}>{p.title}</div>
            </div>
          </div>
          {p.items.map((item,j)=><div key={j} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:6}}>
            <span style={{width:5,height:5,background:p.color,flexShrink:0,marginTop:6}}/>
            <span style={{fontSize:11.8,color:"#555",lineHeight:1.55}}>{item}</span>
          </div>)}
        </div>)}
      </div>
    </Card>

    {/* --- 3. IP Ownership Strategy --- */}
    <Card style={{padding:0,overflow:"hidden",marginBottom:16}}>
      <div style={{padding:"22px 26px",borderBottom:`1px solid ${BRAND.border}`}}>
        <h4 style={{fontSize:18,fontWeight:700,color:"#111",marginBottom:8}}>Intellectual property ownership</h4>
        <p style={{fontSize:12.5,color:"#777",lineHeight:1.6,maxWidth:860}}>
          A clear split that removes vendor lock-in for e& while preserving the defensible platform layer for AIdeology.
        </p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
        <div style={{padding:22,borderRight:`1px solid ${BRAND.border}`,borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <span style={{width:28,height:28,background:"#185FA5",display:"flex",alignItems:"center",justifyContent:"center",color:BRAND.white,fontSize:10,fontWeight:700}}>e&</span>
            <div style={{fontSize:13,fontWeight:700,color:"#111"}}>e& owns — Agent IP</div>
          </div>
          {["Full source code for all 6 agents delivered by Month 24","Freedom to customize, fork, and extend agents independently","Agent training data, prompt libraries, and workflow definitions","Customer-facing UX components and conversation flows","Right to hire and build internal AI team to maintain agents"].map((item,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:6}}>
            <span style={{width:5,height:5,background:"#185FA5",flexShrink:0,marginTop:6}}/>
            <span style={{fontSize:11.8,color:"#555",lineHeight:1.55}}>{item}</span>
          </div>)}
        </div>
        <div style={{padding:22,borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <span style={{width:28,height:28,background:BRAND.red,display:"flex",alignItems:"center",justifyContent:"center",color:BRAND.white,fontSize:10,fontWeight:700}}>A</span>
            <div style={{fontSize:13,fontWeight:700,color:"#111"}}>AIdeology owns — Platform IP</div>
          </div>
          {["Orchestration engine, deployment framework, and connector management","Analytics engine, observability layer, and tenant management","SDD methodology, blueprint library, and accelerator packs","Multi-agent coordination, memory, and guardrail infrastructure","Licensed to e& under long-term partnership agreement"].map((item,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:6}}>
            <span style={{width:5,height:5,background:BRAND.red,flexShrink:0,marginTop:6}}/>
            <span style={{fontSize:11.8,color:"#555",lineHeight:1.55}}>{item}</span>
          </div>)}
        </div>
      </div>
      <div style={{padding:"16px 26px",background:BRAND.lightGrey,borderTop:`1px solid ${BRAND.border}`}}>
        <p style={{fontSize:12,color:"#555",lineHeight:1.6,margin:0,fontStyle:"italic"}}>
          This structure removes e&'s lock-in anxiety — they own all customer-facing IP. AIdeology retains the platform layer, which can be licensed to other telcos without competing with e&'s agent business.
        </p>
      </div>
    </Card>

    {/* --- 4. Knowledge Transfer Deliverables --- */}
    <Card style={{padding:0,overflow:"hidden",marginBottom:16}}>
      <div style={{padding:"22px 26px",borderBottom:`1px solid ${BRAND.border}`}}>
        <h4 style={{fontSize:18,fontWeight:700,color:"#111",marginBottom:8}}>Knowledge transfer deliverables</h4>
        <p style={{fontSize:12.5,color:"#777",lineHeight:1.6,maxWidth:860}}>
          Knowledge transfer is not a one-time event at handoff. It begins on Day 1 with embedded engineers and builds progressively so that by Year 3, e& can operate independently.
        </p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))"}}>
        {[
          {t:"Platform architecture docs",d:"Complete system architecture, data flow diagrams, API contracts, infrastructure-as-code, and decision records explaining every architectural trade-off."},
          {t:"Agent source code + docs",d:"Full annotated source for all 6 agents with inline documentation, prompt engineering guides, and workflow decision trees."},
          {t:"Operational runbooks",d:"Step-by-step procedures for deployment, rollback, incident response, scaling, database maintenance, and disaster recovery."},
          {t:"SLA definitions & on-call",d:"Service level agreements for every component, escalation matrices, on-call rotation templates, and monitoring alert playbooks."},
          {t:"Embedded engineer program",d:"2–3 e& engineers work alongside AIdeology from Day 1 — not parachuted in at handoff. Pair programming, joint PRs, shared on-call."},
          {t:"Training curriculum",d:"Structured learning path: platform fundamentals (W1–4), agent development (W5–12), advanced topics (W13–24), independent operation (W25–30)."},
          {t:"Weekly → bi-weekly sessions",d:"Weekly knowledge transfer in Year 1, bi-weekly in Year 2, monthly in Year 3+. Recorded, with written summaries and action items tracked."},
          {t:"Video library & workshops",d:"Recorded deep-dives on every subsystem. Live workshops on new features, debugging techniques, and production incident reviews."},
          {t:"Connector development guide",d:"How to build, test, and deploy new third-party connectors using the shared integration library — so e& can add integrations independently."},
        ].map((x,i)=><div key={i} style={{padding:18,borderRight:(i+1)%3?`1px solid ${BRAND.border}`:"none",borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{fontSize:10.5,fontWeight:700,color:BRAND.red,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>0{i+1}</div>
          <h5 style={{fontSize:13,fontWeight:700,color:"#111",marginBottom:6}}>{x.t}</h5>
          <p style={{fontSize:11.8,color:"#666",lineHeight:1.6,margin:0}}>{x.d}</p>
        </div>)}
      </div>
    </Card>

    {/* --- 6. Infrastructure Responsibility Split --- */}
    <Card style={{padding:0,overflow:"hidden",marginBottom:16}}>
      <div style={{padding:"22px 26px",borderBottom:`1px solid ${BRAND.border}`}}>
        <h4 style={{fontSize:18,fontWeight:700,color:"#111",marginBottom:8}}>Infrastructure responsibility split</h4>
        <p style={{fontSize:12.5,color:"#777",lineHeight:1.6,maxWidth:860}}>
          A clear separation of who owns what — so neither party carries risk for the other's domain.
        </p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
        <div style={{padding:22,borderRight:`1px solid ${BRAND.border}`,borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <span style={{width:28,height:28,background:"#185FA5",display:"flex",alignItems:"center",justifyContent:"center",color:BRAND.white,fontSize:10,fontWeight:700}}>e&</span>
            <div style={{fontSize:13,fontWeight:700,color:"#111"}}>e& owns</div>
          </div>
          {[
            {t:"Cloud & GPU contracts",d:"G42, Azure, AWS — e&'s negotiating power, e&'s pricing"},
            {t:"LLM / compute cost risk",d:"If inference prices spike, that is e&'s budget line, not AIdeology's"},
            {t:"Uptime & SLA guarantees",d:"Infrastructure availability SLAs are e&'s responsibility to their SMB customers"},
            {t:"Data residency compliance",d:"NESA, TDRA, ADDA, UAE data localisation — e& holds the compliance posture"},
          ].map((item,i)=><div key={i} style={{marginBottom:12}}>
            <div style={{fontSize:12,fontWeight:700,color:"#111",marginBottom:2}}>{item.t}</div>
            <div style={{fontSize:11.5,color:"#666",lineHeight:1.5}}>{item.d}</div>
          </div>)}
        </div>
        <div style={{padding:22,borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <span style={{width:28,height:28,background:BRAND.red,display:"flex",alignItems:"center",justifyContent:"center",color:BRAND.white,fontSize:10,fontWeight:700}}>A</span>
            <div style={{fontSize:13,fontWeight:700,color:"#111"}}>AIdeology owns</div>
          </div>
          {[
            {t:"Platform orchestration",d:"Running on e&'s compute — agent routing, memory, tools, guardrails, tenant management"},
            {t:"Agent logic & connectors",d:"Business logic, prompt engineering, third-party integrations, workflow automation"},
            {t:"User experience",d:"Dashboard, back-office UI, onboarding flows, analytics views"},
            {t:"Orchestration reliability",d:"The platform works correctly — distinct from whether the underlying LLM is available"},
          ].map((item,i)=><div key={i} style={{marginBottom:12}}>
            <div style={{fontSize:12,fontWeight:700,color:"#111",marginBottom:2}}>{item.t}</div>
            <div style={{fontSize:11.5,color:"#666",lineHeight:1.5}}>{item.d}</div>
          </div>)}
        </div>
      </div>
      <div style={{padding:"16px 26px",background:BRAND.lightGrey,borderTop:`1px solid ${BRAND.border}`}}>
        <p style={{fontSize:12,color:"#555",lineHeight:1.6,margin:0,fontStyle:"italic"}}>
          This split means AIdeology's COGS stays lean (no LLM inference costs, no cloud hosting fees) and e& retains full control of their infrastructure economics and compliance posture.
        </p>
      </div>
    </Card>

    {/* --- 7. Geographic Expansion Phasing --- */}
    <Card style={{padding:0,overflow:"hidden",marginBottom:16}}>
      <div style={{padding:"22px 26px",borderBottom:`1px solid ${BRAND.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><Badge v="teal">18 OpCos</Badge><span style={{fontSize:11.5,color:"#888"}}>Agents first · then expand · e& leads</span></div>
        <h4 style={{fontSize:18,fontWeight:700,color:"#111",marginBottom:8}}>Geographic expansion — build first, scale with e&</h4>
        <p style={{fontSize:12.5,color:"#777",lineHeight:1.6,maxWidth:860}}>
          Geographic expansion starts only after all 6 agentic solutions are live and proven in the UAE (post-W30). AIdeology's role in each new market is strictly advisory: we transfer the capability to localise and fine-tune the platform to e&'s own team, so e& operates each new OpCo independently with no structural dependency on AIdeology.
        </p>
      </div>

      {/* Build-first principle */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",borderBottom:`1px solid ${BRAND.border}`}}>
        <div style={{padding:"20px 26px",borderRight:`1px solid ${BRAND.border}`}}>
          <div style={{fontSize:10.5,fontWeight:700,color:BRAND.red,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>Phase 0 — UAE build (W1–W36)</div>
          <div style={{fontSize:12.5,fontWeight:700,color:"#111",marginBottom:6}}>All 6 agents live and handed over before expansion</div>
          <p style={{fontSize:12,color:"#666",lineHeight:1.55,margin:0}}>Customer, Sales, Comms, Finance, Ops and People agents are built, hardened (Wave 5 security audit), and fully transferred to e& UAE. The UAE deployment is the reference model — all future markets replicate a complete, hardened platform, not a work-in-progress version.</p>
        </div>
        <div style={{padding:"20px 26px"}}>
          <div style={{fontSize:10.5,fontWeight:700,color:"#185FA5",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>Phase 1+ — OpCo rollout (post-W30)</div>
          <div style={{fontSize:12.5,fontWeight:700,color:"#111",marginBottom:6}}>e& leads each market · AIdeology supports</div>
          <p style={{fontSize:12,color:"#666",lineHeight:1.55,margin:0}}>e&'s own team localises the platform for each new OpCo — language, compliance, connectors, pricing. AIdeology provides the localisation playbook, fine-tuning methodology, and light-touch advisory. No hard dependency on AIdeology to enter a new market.</p>
        </div>
      </div>

      {/* What AIdeology transfers */}
      <div style={{padding:"18px 26px",borderBottom:`1px solid ${BRAND.border}`,background:BRAND.lightGrey}}>
        <div style={{fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:10}}>What AIdeology transfers to e& for OpCo independence</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12}}>
          {[
            {t:"Market localisation playbook",d:"Step-by-step guide to adapt agents for a new language, dialect, culture, calendar and communication style."},
            {t:"Fine-tuning methodology",d:"How to retrain prompts, adjust guardrails, update knowledge bases and validate agent quality for a new market — entirely by e&'s team."},
            {t:"Compliance framework",d:"Template for mapping local data residency, labour law, tax, and regulatory requirements onto the platform's existing controls."},
            {t:"Connector reuse guide",d:"Catalogue of existing connectors and how to adapt or extend them for local third-party tools without re-engineering from scratch."},
          ].map((x,i)=><div key={i} style={{background:BRAND.white,border:`1px solid ${BRAND.border}`,padding:14}}>
            <div style={{fontSize:11.5,fontWeight:700,color:"#111",marginBottom:4}}>{x.t}</div>
            <div style={{fontSize:11,color:"#666",lineHeight:1.5}}>{x.d}</div>
          </div>)}
        </div>
      </div>

      {/* OpCo rollout sequence */}
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:760}}>
          <thead>
            <tr style={{background:BRAND.lightGrey}}>
              {["Phase","Market","Timing (post-launch)","Who drives","AIdeology role","Why this market"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {[
              {phase:"1",market:"UAE",timing:"W1–W36 (build + handoff)",driver:"AIdeology + e& UAE",role:"Primary builder & trainer",why:"Proof of model — 320k addressable SMBs. Reference deployment for all future markets.",color:BRAND.red},
              {phase:"2",market:"Saudi Arabia",timing:"M1–M6 post-launch",driver:"e& KSA team",role:"Localisation advisory only",why:"Largest MENA market (2M+ SMBs), same language. e& team adapts Arabic dialect, VAT, ZATCA compliance.",color:"#185FA5"},
              {phase:"3",market:"Morocco",timing:"M7–M12 post-launch",driver:"e& MAR team",role:"Remote advisory",why:"Francophone + Darija Arabic gateway. e& team localises language, telecom connectors, local payments.",color:"#004B2E"},
              {phase:"4",market:"Egypt / Kuwait",timing:"M13–M18 post-launch",driver:"e& OpCo teams",role:"Playbook only",why:"High SMB density. e& teams run full localisation using the transferred methodology.",color:"#7A52F4"},
              {phase:"5",market:"Remaining OpCos",timing:"M19+ post-launch",driver:"e& (fully independent)",role:"None required",why:"e& owns the capability. New markets follow the same playbook with no AIdeology involvement.",color:"#993C1D"},
            ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,background:i===0?BRAND.lightGrey:"transparent"}}>
              <td style={{padding:"12px 14px"}}><span style={{width:24,height:24,background:r.color,display:"inline-flex",alignItems:"center",justifyContent:"center",color:BRAND.white,fontSize:10,fontWeight:700}}>{r.phase}</span></td>
              <td style={{padding:"12px 14px",fontWeight:700,color:"#111"}}>{r.market}</td>
              <td style={{padding:"12px 14px",color:"#555"}}>{r.timing}</td>
              <td style={{padding:"12px 14px",fontWeight:700,color:i===0?BRAND.red:"#185FA5"}}>{r.driver}</td>
              <td style={{padding:"12px 14px",color:i===0?"#555":BRAND.red,fontSize:11.5,fontWeight:i===0?400:700}}>{r.role}</td>
              <td style={{padding:"12px 14px",color:"#666",fontSize:11.5,lineHeight:1.45}}>{r.why}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <div style={{padding:"16px 26px",background:"#FAFAFA",borderTop:`1px solid ${BRAND.border}`}}>
        <p style={{fontSize:12,color:"#555",lineHeight:1.6,margin:0}}>
          <strong>The goal:</strong> by Phase 3, e&'s team can enter any new OpCo market without AIdeology involvement — using the transferred playbook, fine-tuning methodology, and connector library. AIdeology's value in expansion shifts from delivery to platform evolution and new agent innovation.
        </p>
      </div>
    </Card>

    </div>
    </CollapsibleTimeline>

    {/* ════════════════════════════════════════════════════════════ */}
    {/* SMB SUBSCRIPTION PRICING — PER-AGENT, 3 TIERS            */}
    {/* ════════════════════════════════════════════════════════════ */}
    <SH>Recommended SMB subscription pricing</SH>
    <Note label="Per-agent pricing model">
      Each Agentic AI Solution is priced independently across three tiers — Spark, Scale and Command. SMBs subscribe to the agents they need, starting with one and expanding over time. All prices are in AED/month, benchmarked against UAE market competitors.
    </Note>

    {/* --- tier legend --- */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:18}}>
      {[
        {tier:"Spark",color:"#A16207",bg:"#FFF8E7",border:"#F4C842",desc:"Entry tier — core features, ideal for micro and small businesses starting with AI."},
        {tier:"Scale",color:"#4338CA",bg:"#EEF2FF",border:"#8B7CF6",desc:"Growth tier — more capacity, integrations and multi-channel coverage for expanding teams."},
        {tier:"Command",color:"#15803D",bg:"#F0FDF4",border:"#22C55E",desc:"Premium tier — unlimited usage, advanced features, custom workflows and dedicated support."},
      ].map((t,i)=><div key={i} style={{background:t.bg,border:`2px solid ${t.border}`,borderRadius:0,padding:"16px 20px"}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:t.color,marginBottom:6}}>{t.tier}</div>
        <p style={{fontSize:12,color:"#555",lineHeight:1.55,margin:0}}>{t.desc}</p>
      </div>)}
    </div>

    {/* --- per-agent pricing table --- */}
    <Card style={{padding:0,overflow:"hidden",marginBottom:16}}>
      <div style={{padding:"18px 24px",borderBottom:`1px solid ${BRAND.border}`}}>
        <h4 style={{fontSize:15,fontWeight:700,color:"#111",marginBottom:6}}>Per-agent pricing (AED/month)</h4>
        <p style={{fontSize:12,color:"#777",lineHeight:1.6,margin:0}}>Prices validated against UAE market competitors. Recommendations applied from competitive audit.</p>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Agentic AI Solution","","✦ Spark","◈ Scale","⬡ Command","Key differentiator vs competitors"].map((h,i)=><th key={i} style={{textAlign:i>1&&i<5?"center":"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {icon:"🎯",n:"Customer Agent",s:"AED 199",sc:"AED 349",c:"AED 999",diff:"Arabic + voice + WhatsApp + web in one — no competitor bundles all three"},
            {icon:"📈",n:"Sales Agent",s:"AED 149",sc:"AED 349",c:"AED 699",diff:"AI proposal drafting + WhatsApp sequences — HubSpot/Salesforce don't offer natively"},
            {icon:"📡",n:"Comms Hub",s:"AED 99",sc:"AED 299",c:"AED 649",diff:"e& network-native SMS + WhatsApp BSP + AI copy — converts existing e& Smart Messaging users"},
            {icon:"💰",n:"Finance Agent",s:"AED 199",sc:"AED 449",c:"AED 849",diff:"FTA-certified VAT + e& Pay WhatsApp payment links — unique in UAE market"},
            {icon:"⚙️",n:"Ops Agent",s:"AED 149",sc:"AED 299",c:"AED 599",diff:"WhatsApp-native task notifications + AI workflows — cheaper than Monday/Asana for teams"},
            {icon:"👥",n:"People Agent",s:"AED 199",sc:"AED 449",c:"AED 849",diff:"SIM-based attendance + WPS payroll + WhatsApp leave — no HR tool integrates e& SIM data"},
          ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`}}>
            <td style={{padding:"12px 14px",fontWeight:700,color:"#111"}}>{r.n}</td>
            <td style={{padding:"6px 8px",fontSize:16,textAlign:"center"}}>{r.icon}</td>
            <td style={{padding:"12px 14px",textAlign:"center",fontWeight:700,color:"#A16207",fontFamily:BRAND.font,background:"#FFFDF5"}}>{r.s}</td>
            <td style={{padding:"12px 14px",textAlign:"center",fontWeight:700,color:"#4338CA",fontFamily:BRAND.font,background:"#F8F7FF"}}>{r.sc}</td>
            <td style={{padding:"12px 14px",textAlign:"center",fontWeight:700,color:"#15803D",fontFamily:BRAND.font,background:"#F5FFF8"}}>{r.c}</td>
            <td style={{padding:"12px 14px",color:"#777",fontSize:11.5,lineHeight:1.45}}>{r.diff}</td>
          </tr>)}
        </tbody>
      </table>
    </Card>

    {/* --- example monthly spend --- */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
      {[
        {title:"Micro SMB (1–5 staff)",agents:"Customer Spark only",total:"AED 199",usd:"~$54",desc:"Receptionist agent handles calls, WhatsApp and web chat 24/7."},
        {title:"Growing SMB (5–20 staff)",agents:"Customer Scale + Sales Spark + Comms Spark",total:"AED 697",usd:"~$190",desc:"Multi-channel customer service, CRM-connected sales follow-up, and unified comms."},
        {title:"Established SMB (20–50 staff)",agents:"Customer Scale + Sales Scale + Finance Scale + Ops Spark",total:"AED 1,246",usd:"~$340",desc:"Full business operations layer — customer, sales, invoicing and task management."},
      ].map((e,i)=><Card key={i} style={{padding:18,borderTop:`3px solid ${BRAND.red}`}}>
        <div style={{fontSize:12,fontWeight:700,color:"#111",marginBottom:6}}>{e.title}</div>
        <div style={{fontSize:11,color:"#777",lineHeight:1.5,marginBottom:10}}>{e.agents}</div>
        <div style={{display:"flex",alignItems:"baseline",gap:6,marginBottom:8}}>
          <span style={{fontSize:22,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font}}>{e.total}</span>
          <span style={{fontSize:12,color:"#999"}}>/mo ({e.usd})</span>
        </div>
        <p style={{fontSize:11.5,color:"#666",lineHeight:1.5,margin:0}}>{e.desc}</p>
      </Card>)}
    </div>

    {/* --- ARPU calculation --- */}
    <Card style={{padding:0,overflow:"hidden",marginBottom:16}}>
      <div style={{padding:"18px 24px",borderBottom:`1px solid ${BRAND.border}`}}>
        <h4 style={{fontSize:15,fontWeight:700,color:"#111",marginBottom:6}}>ARPU growth trajectory</h4>
        <p style={{fontSize:12,color:"#777",lineHeight:1.6,margin:0}}>
          ARPU grows as SMBs adopt more agents and upgrade tiers. Starting at <strong style={{color:BRAND.red}}>AED 285/mo</strong> (Year 1 — mostly single-agent Spark), rising to <strong style={{color:BRAND.red}}>AED 350/mo</strong> (Year 2 — 2+ agents) and <strong style={{color:BRAND.red}}>AED 420/mo</strong> (Year 3 — multi-agent Scale/Command adoption).
        </p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:BRAND.border}}>
        {[
          {label:"Year 1 ARPU",value:"AED 285/mo",sub:"~$78 · 24K customers by EOY"},
          {label:"Year 2 ARPU",value:"AED 350/mo",sub:"~$96 · 62K customers by EOY"},
          {label:"Year 3 ARPU",value:"AED 420/mo",sub:"~$115 · 85K customers by EOY"},
          {label:"Year 4+ ARPU",value:"AED 420+/mo",sub:"100K+ customers · stable"},
        ].map((m,i)=><div key={i} style={{background:BRAND.white,padding:"18px 20px"}}>
          <div style={{fontSize:10.5,color:BRAND.grey,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:6}}>{m.label}</div>
          <div style={{fontSize:20,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font,marginBottom:4}}>{m.value}</div>
          <div style={{fontSize:11,color:"#999"}}>{m.sub}</div>
        </div>)}
      </div>
    </Card>

    <Note label="Annual contracts recommended">
      Offer 2 months free for annual commitment — reduces churn, improves LTV, and aligns with enterprise procurement cycles. Monthly billing available for Spark tier only.
    </Note>

    {/* ════════════════════════════════════════════════════════════ */}
    {/* MARKET BENCHMARKS — PER AGENT                              */}
    {/* ════════════════════════════════════════════════════════════ */}
    <SH>UAE market pricing benchmarks</SH>
    <Note label="Competitive advantage">
      No competitor in the UAE offers Arabic-first, multi-agent, telco-integrated AI for SMBs. Prices are benchmarked against single-function tools — e& bundles far more into each agent.
    </Note>
    <button
      type="button"
      onClick={() => setShowMarketBenchmarks((v) => !v)}
      aria-expanded={showMarketBenchmarks}
      style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,background:BRAND.white,border:`1px solid ${BRAND.border}`,borderLeft:`4px solid ${BRAND.red}`,padding:"16px 20px",marginBottom:showMarketBenchmarks?12:16,cursor:"pointer",textAlign:"left"}}
    >
      <div>
        <div style={{fontSize:12,fontWeight:700,color:"#111",letterSpacing:"0.04em",textTransform:"uppercase",marginBottom:4}}>
          {showMarketBenchmarks ? "Hide UAE competitor benchmarks" : "Show UAE competitor benchmarks"}
        </div>
        <div style={{fontSize:12,color:"#777",lineHeight:1.5}}>
          Six agent categories, benchmarked against UAE and global SMB software alternatives.
        </div>
      </div>
      <span style={{fontSize:20,fontWeight:700,color:BRAND.red,lineHeight:1}}>
        {showMarketBenchmarks ? "−" : "+"}
      </span>
    </button>
    {showMarketBenchmarks && [
      {agent:"Customer Agent",icon:"🎯",comps:[
        {c:"Ringly.io / similar",p:"AED 90–185",what:"AI voice receptionist (basic), 50–200 mins, no Arabic"},
        {c:"WATI / BotPenguin",p:"AED 70–92",what:"WhatsApp AI starter, 1 number, no voice"},
        {c:"SleekFlow Scale",p:"AED 700–1,300",what:"Omnichannel AI (WhatsApp + web + social)"},
        {c:"Autometa AI (Dubai)",p:"AED 250–600 + setup",what:"Real estate vertical only"},
        {c:"Moneypenny",p:"AED 550–2,000",what:"Voice only, no Arabic, UK-based"},
      ]},
      {agent:"Sales Agent",icon:"📈",comps:[
        {c:"Zoho CRM Standard",p:"AED 51–73/user",what:"~AED 150–220/mo for 3 users, no AI"},
        {c:"Pipedrive Essential",p:"AED 51/user",what:"~AED 153/mo for 3 users"},
        {c:"HubSpot Starter",p:"AED 183/mo",what:"2 users, basic email sequences"},
        {c:"Salesforce Starter",p:"AED 92/user",what:"~AED 275/mo for 3 users"},
        {c:"Monday CRM Pro",p:"AED 220/user",what:"~AED 660/mo for 3 users"},
      ]},
      {agent:"Comms Hub",icon:"📡",comps:[
        {c:"WATI Growth",p:"AED 220",what:"WhatsApp BSP, 500 convos/mo + Meta fees"},
        {c:"MessageBird / Bird",p:"AED 183–1,100",what:"Omnichannel platform, Meta fees extra"},
        {c:"Brevo (Sendinblue)",p:"AED 165–550",what:"Email + SMS campaigns"},
        {c:"e& Smart Messaging",p:"AED 99–350",what:"SMS only, no AI, no WhatsApp"},
        {c:"Go4whatsup Pro",p:"AED 550–1,100",what:"Full WhatsApp management"},
      ]},
      {agent:"Finance Agent",icon:"💰",comps:[
        {c:"Zoho Books UAE",p:"AED 110–290",what:"Invoicing + VAT, FTA-certified, no AI"},
        {c:"QuickBooks Online UAE",p:"AED 138–415",what:"Accounting + VAT, US-centric"},
        {c:"Xero UAE",p:"AED 128–385",what:"Cloud accounting, no Arabic"},
        {c:"FreshBooks UAE",p:"AED 55–275",what:"Invoicing + payments, limited VAT"},
      ]},
      {agent:"Ops Agent",icon:"⚙️",comps:[
        {c:"Notion Business",p:"AED 58/user",what:"~AED 290/mo for 5 users, no AI workflows"},
        {c:"Monday.com Pro",p:"AED 220/user",what:"~AED 1,100/mo for 5 users"},
        {c:"ClickUp Business",p:"AED 44/user",what:"~AED 220/mo for 5 users, no Arabic AI"},
        {c:"Asana Premium",p:"AED 176/user",what:"~AED 880/mo for 5 users"},
      ]},
      {agent:"People Agent",icon:"👥",comps:[
        {c:"Zoho Payroll UAE",p:"AED 70–110",what:"WPS payroll + SIF, AED 7–11/employee"},
        {c:"GulfHR",p:"AED 200–250",what:"Full HR + payroll, AED 20–25/employee"},
        {c:"Bayzat",p:"AED 200–400",what:"HR + payroll + benefits, insurance bundle"},
        {c:"greytHR UAE",p:"AED 60–150",what:"HR + payroll + compliance, AED 6–15/employee"},
      ]},
    ].map((a,ai)=><Card key={ai} style={{padding:0,overflow:"hidden",marginBottom:12}}>
      <div style={{padding:"14px 20px",borderBottom:`1px solid ${BRAND.border}`,background:BRAND.lightGrey,display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontSize:16}}>{a.icon}</span>
        <span style={{fontSize:13,fontWeight:700,color:"#111"}}>{a.agent}</span>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:11.5}}>
        <thead>
          <tr>
            {["UAE competitor","Price (AED/mo)","What you get"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"8px 14px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {a.comps.map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`}}>
            <td style={{padding:"8px 14px",fontWeight:600,color:"#111"}}>{r.c}</td>
            <td style={{padding:"8px 14px",color:BRAND.red,fontWeight:600,fontFamily:"monospace",whiteSpace:"nowrap"}}>{r.p}</td>
            <td style={{padding:"8px 14px",color:"#777"}}>{r.what}</td>
          </tr>)}
        </tbody>
      </table>
    </Card>)}

    {/* ════════════════════════════════════════════════════════════ */}
    {/* e& BREAK-EVEN ANALYSIS                                     */}
    {/* ════════════════════════════════════════════════════════════ */}
    {showPricing && <>
    <SH>e& break-even & scale economics</SH>
    <Note label="Scale advantage">
      With 24,000 customers by Year 1 and a 65/35 revenue split, e& retains the majority of SaaS revenue from day one. The declining rev-share means e& margins improve every year even before an acquisition.
    </Note>

    <Card style={{padding:0,overflow:"hidden",marginBottom:16}}>
      <div style={{padding:"22px 26px",borderBottom:`1px solid ${BRAND.border}`}}>
        <h4 style={{fontSize:18,fontWeight:700,color:"#111",marginBottom:8}}>e& revenue share over time</h4>
        <p style={{fontSize:12.5,color:"#777",lineHeight:1.6,maxWidth:860}}>
          e& keeps 65% of gross SaaS revenue in Years 1–2, rising to 72% in Year 3 and 80% in Year 4+. At scale, e& retains <strong style={{color:BRAND.red}}>AED 272M+ of AED 378M gross revenue</strong> by Year 3.
        </p>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Year","Customers (EOY)","ARPU","Gross SaaS revenue","e& share","e& keeps","AIdeology share"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {y:"Year 1",cust:"24,000",arpu:"AED 285",gross:"AED 36.5M",ePct:"65%",eKeeps:"AED 23.7M",aPct:"35% (AED 12.8M)"},
            {y:"Year 2",cust:"62,000",arpu:"AED 350",gross:"AED 154M",ePct:"65%",eKeeps:"AED 100.1M",aPct:"35% (AED 53.9M)"},
            {y:"Year 3",cust:"85,000",arpu:"AED 420",gross:"AED 378M",ePct:"72%",eKeeps:"AED 272.2M",aPct:"28% (AED 105.8M)"},
            {y:"Year 4+",cust:"100,000+",arpu:"AED 420+",gross:"AED 450M+",ePct:"80%",eKeeps:"AED 360M+",aPct:"20% (AED 90M)"},
          ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,background:i===2?BRAND.lightGrey:"transparent"}}>
            <td style={{padding:"12px 14px",fontWeight:700,color:"#111"}}>{r.y}</td>
            <td style={{padding:"12px 14px",color:BRAND.red,fontWeight:700,fontFamily:BRAND.font}}>{r.cust}</td>
            <td style={{padding:"12px 14px",color:"#555",fontFamily:"monospace"}}>{r.arpu}</td>
            <td style={{padding:"12px 14px",fontWeight:700,color:"#111"}}>{r.gross}</td>
            <td style={{padding:"12px 14px",fontWeight:700,color:BRAND.red,fontFamily:BRAND.font,fontSize:14}}>{r.ePct}</td>
            <td style={{padding:"12px 14px",fontWeight:700,color:"#111"}}>{r.eKeeps}</td>
            <td style={{padding:"12px 14px",color:"#777"}}>{r.aPct}</td>
          </tr>)}
        </tbody>
      </table>
    </Card>

    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,background:BRAND.border,border:`1px solid ${BRAND.border}`,overflow:"hidden",marginBottom:16}}>
      {[
        {label:"e& 3-year gross SaaS revenue",value:"AED 568.5M",sub:"~$155M across 3 years"},
        {label:"e& 3-year retained revenue (after rev-share)",value:"AED 396M",sub:"~$108M · avg 70% retention"},
        {label:"e& Year 4 annual run-rate",value:"AED 360M+",sub:"~$98M · 80% retained at scale"},
      ].map((m,i)=><div key={i} style={{background:i===2?"#111":BRAND.white,padding:"22px 24px"}}>
        <div style={{fontSize:10.5,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:i===2?"rgba(255,255,255,0.5)":BRAND.grey,marginBottom:8}}>{m.label}</div>
        <div style={{fontSize:24,fontWeight:700,color:i===2?BRAND.white:BRAND.red,fontFamily:BRAND.font,marginBottom:6}}>{m.value}</div>
        <div style={{fontSize:11.5,color:i===2?"rgba(255,255,255,0.6)":"#999",lineHeight:1.5}}>{m.sub}</div>
      </div>)}
    </div>

    {/* ════════════════════════════════════════════════════════════ */}
    {/* e& REVENUE FORECAST                                        */}
    {/* ════════════════════════════════════════════════════════════ */}
    <SH>e& revenue forecast</SH>
    <ForecastTable color="#E00800" bgLight="#F5F5F5"
      rows={[
        {s:"SMB subscriptions (gross SaaS)",y1:"AED 36.5M (~$10M)",y2:"AED 154M (~$42M)",y3:"AED 378M (~$103M)"},
        {s:"Less: AIdeology rev-share",y1:"35% → AED 12.8M",y2:"35% → AED 53.9M",y3:"28% → AED 105.8M"},
        {s:"e& net SaaS revenue",y1:"AED 23.7M (~$6.5M)",y2:"AED 100.1M (~$27.3M)",y3:"AED 272.2M (~$74.3M)"},
        {s:"Connectivity upsell (Toll Free, SMS, WhatsApp)",y1:"AED 5M (~$1.4M)",y2:"AED 15M (~$4.1M)",y3:"AED 30M (~$8.2M)"},
      ]}
      totalRow={{y1:"AED 28.7M (~$7.8M)",y2:"AED 115.1M (~$31.4M)",y3:"AED 302.2M (~$82.5M)"}}
      assumptions={["24K subs Y1 → 62K Y2 → 85K Y3 → 100K+ Y4","ARPU AED 285 → 350 → 420 (agent & tier expansion)","Rev-share 65/35 (Y1–2) → 72/28 (Y3) → 80/20 (Y4+)","Connectivity bundle uptake grows with subscriber base"]}
    />
    </>}

    {/* ════════════════════════════════════════════════════════════ */}
    {/* WHY e& IS UNIQUELY POSITIONED                              */}
    {/* ════════════════════════════════════════════════════════════ */}
    <SH>Why e& wins this market</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:1,background:BRAND.border,border:`1px solid ${BRAND.border}`,overflow:"hidden",marginBottom:16}}>
      {[
        {icon:"📱",label:"320K+ paying SMBs",desc:"Existing customer base already on monthly billing. No competitor starts with a captive audience this large."},
        {icon:"🧾",label:"Monthly invoice relationship",desc:"Adding AI to an existing bill is frictionless. Zero marginal CAC for customers 1 through 320K."},
        {icon:"📡",label:"Network moat",desc:"Toll Free 800, SMS, SIM identity, CloudTalk PBX — e& owns the infrastructure layer that makes voice + WhatsApp agents possible."},
        {icon:"🔒",label:"Trust & compliance",desc:"UAE businesses already trust e& with their communications. Sovereign data, local compliance and Arabic-first are not optional — they're expected."},
        {icon:"🌍",label:"18 OpCos to scale",desc:"Saudi, Morocco, Egypt, Kuwait and 14 more markets. Once all 6 agents are live in UAE, e&'s own team localises and deploys to each new OpCo — no rebuild, no AIdeology dependency."},
      ].map((c,i)=><div key={i} style={{background:BRAND.white,padding:"20px 22px"}}>
        <div style={{fontSize:20,marginBottom:8}}>{c.icon}</div>
        <div style={{fontSize:12,fontWeight:700,color:"#111",marginBottom:6}}>{c.label}</div>
        <p style={{fontSize:11.5,color:"#777",lineHeight:1.5,margin:0}}>{c.desc}</p>
      </div>)}
    </div>
    <Note label="The strategic position">
      No other competitor can offer pre-built, evolving AI agents bundled on a monthly invoice. Copilot makes you build your own. Aleria tries to be ready-made but lacks the network. Standalone SaaS tools are isolated and don't talk to each other. e& + AIdeology together have the moat: e& can't build AI fast enough, AIdeology can't reach 320K SMBs. Together, the combination is defensible.
    </Note>

    {/* ════════════════════════════════════════════════════════════ */}
    {/* KEY ASSUMPTIONS & SENSITIVITIES                            */}
    {/* ════════════════════════════════════════════════════════════ */}
    <SH>Key assumptions & sensitivities</SH>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
      <Card style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"16px 20px",borderBottom:`1px solid ${BRAND.border}`,background:BRAND.lightGrey}}>
          <div style={{fontSize:12,fontWeight:700,color:"#111"}}>Core assumptions</div>
        </div>
        <div style={{padding:"16px 20px"}}>
          {[
            {k:"Trial-to-paid conversion",v:"12%",note:"Achievable given e& invoice relationship — no new payment setup required"},
            {k:"Monthly churn",v:"4–5%",note:"Higher than enterprise SaaS (price-sensitive SMBs) but lower than expected (network switching cost)"},
            {k:"ARPU growth driver",v:"Agent & tier expansion",note:"SMBs start with 1 agent at Spark, expand to 2–3 agents at Scale over 12 months"},
            {k:"COGS per customer",v:"~AED 25/mo",note:"LLM ~AED 10 + support ~AED 12 + engineering ~AED 2–3"},
            {k:"e& addressable base",v:"320K–340K paying SMBs",note:"Current UAE telco base. 1M total UAE businesses."},
          ].map((a,i)=><div key={i} style={{padding:"8px 0",borderBottom:i<4?`1px solid ${BRAND.border}`:"none"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
              <span style={{fontSize:12,fontWeight:600,color:"#111"}}>{a.k}</span>
              <span style={{fontSize:12,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font}}>{a.v}</span>
            </div>
            <div style={{fontSize:11,color:"#999",lineHeight:1.4}}>{a.note}</div>
          </div>)}
        </div>
      </Card>
      <Card style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"16px 20px",borderBottom:`1px solid ${BRAND.border}`,background:BRAND.lightGrey}}>
          <div style={{fontSize:12,fontWeight:700,color:"#111"}}>What breaks the model — and what to watch</div>
        </div>
        <div style={{padding:"16px 20px"}}>
          {[
            {signal:"Adoption < 20K by Month 12",risk:"High",action:"Review GTM strategy — product may not resonate with e& SMB segment",color:"#E00800"},
            {signal:"Monthly churn > 6%",risk:"High",action:"Product issues — deploy NPS diagnostics and rapid feature fixes",color:"#E00800"},
            {signal:"ARPU stays below AED 250",risk:"Medium",action:"Multi-agent bundles not working — revisit vertical packaging",color:"#A16207"},
            {signal:"e& team ramp slower than plan",risk:"Medium",action:"Extend AIdeology training commitment; delay rev-share transition",color:"#A16207"},
          ].map((s,i)=><div key={i} style={{padding:"10px 0",borderBottom:i<3?`1px solid ${BRAND.border}`:"none"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <span style={{fontSize:10,fontWeight:700,color:BRAND.white,background:s.color,padding:"2px 8px",letterSpacing:"0.04em",textTransform:"uppercase"}}>{s.risk}</span>
              <span style={{fontSize:12,fontWeight:600,color:"#111"}}>{s.signal}</span>
            </div>
            <div style={{fontSize:11,color:"#777",lineHeight:1.4}}>{s.action}</div>
          </div>)}
        </div>
        <div style={{padding:"14px 20px",borderTop:`1px solid ${BRAND.border}`,background:"#F0FDF4"}}>
          <div style={{fontSize:11,fontWeight:600,color:"#15803D"}}>Upside accelerators</div>
          <div style={{fontSize:11.5,color:"#555",lineHeight:1.5,marginTop:4}}>
            Adoption reaches 50K by Month 12 → Y3 revenue doubles to AED 700M+. ARPU hits AED 500+ → margin expansion to 80%+. Expand to 5 e& OpCos → addressable market 5x larger (2M+ SMBs).
          </div>
        </div>
      </Card>
    </div>

    {/* ════════════════════════════════════════════════════════════ */}
    {/* AGREEMENT STRUCTURE                                        */}
    {/* ════════════════════════════════════════════════════════════ */}
    {showPricing && <Note label="Agreement structure">
      4-year minimum partnership. Build-then-transfer model: AIdeology builds and trains, e& progressively takes ownership. Agent IP transfers to e& by end of Year 2. Platform IP remains AIdeology property (non-exclusive license to e&). 65/35 revenue share declining to 80/20 as e& team ramps. Years 1–3 L3 platform support is included in the fixed Wave 1–5 platform + agent pricing and commercially covered within the AIdeology revenue share, with no separate support invoice during the transition period. Year 3–4 acquisition trigger: by then e& owns agents, customers and infrastructure — paying 20% forever becomes more expensive than a one-time buyout. Platform valuation at acquisition: AED 1.5B–2.5B.
    </Note>}
    </>}
  </div>;
}

/* ════════════════════════════════════════════════════════════ */
/* ENTERPRISE TIER PROPOSAL PAGES — Tier 1 / Tier 2 / Tier 3   */
/* ════════════════════════════════════════════════════════════ */

function TierHero({eyebrow, title, lead, sub, stats}) {
  return <div style={{padding:"44px 0 36px"}}>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
      <Badge v="violet">Pillar 02 · Enterprise & Government</Badge>
      <span style={{fontSize:12,color:"#888"}}>{eyebrow}</span>
    </div>
    <h2 style={{fontSize:34,fontWeight:700,color:"#111",lineHeight:1.08,marginBottom:14,fontFamily:BRAND.font}}>{title}</h2>
    <p style={{fontSize:14.5,color:"#666",maxWidth:680,lineHeight:1.7,marginBottom:10}}>{lead}</p>
    {sub && <p style={{fontSize:13,color:"#888",maxWidth:680,lineHeight:1.7,marginBottom:28}}>{sub}</p>}
    <div style={{display:"flex",gap:28,flexWrap:"wrap"}}>
      {stats.map((s,i)=><div key={i} style={{minWidth:90}}>
        <div style={{fontSize:22,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font}}>{s.v}</div>
        <div style={{fontSize:10.5,color:"#999",marginTop:2}}>{s.l}</div>
      </div>)}
    </div>
  </div>;
}

function DeploymentOptions({tier}) {
  const opts = {
    1: [
      {n:"e& Cloud",d:"Default for Tier 1. Multi-tenant landing zone with enterprise RBAC, audit, and SSO. Day-0 templates ready.",badges:["Fastest","Lowest TCO"]},
      {n:"G42 / Core42 Sovereign",d:"For customers requiring UAE-sovereign cloud — health authorities, government agencies, regulated finance.",badges:["Sovereign","Fast"]},
      {n:"Customer Cloud / On-Prem",d:"Available for Tier 1 only when customer already operates a private landing zone — uplift quoted via Tier 3 add-on.",badges:["By exception"]},
    ],
    2: [
      {n:"e& Cloud",d:"Preferred environment for Tier 2 builds. Dedicated VPC per customer, full audit, AIdeology operates the AI plane.",badges:["Default"]},
      {n:"G42 / Core42 Sovereign",d:"Sovereign cloud option for healthcare regulators, government, and CBUAE-supervised entities.",badges:["Sovereign"]},
      {n:"Customer Private Cloud",d:"OCI Dedicated Region, Azure UAE-sovereign, or AWS UAE — when the customer mandates their own tenancy.",badges:["Customer-owned"]},
    ],
    3: [
      {n:"Customer On-Premise (default)",d:"Customer data centre. NVIDIA-Certified BoM from Cisco, Dell, HPE, Lenovo or Supermicro. AIdeology designs, e& integrates, partner OEM ships.",badges:["Air-gap capable","Full sovereignty"]},
      {n:"e& Sovereign POD",d:"Customer-dedicated POD inside an e& UAE data centre. Physical separation, single-tenant network, customer-owned encryption keys.",badges:["UAE-resident"]},
      {n:"G42 / Core42 Sovereign POD",d:"Customer-dedicated tenancy in Core42 sovereign region. Suited for federal entities aligned with G42 reference architectures.",badges:["Federal-fit"]},
    ],
  };
  return <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:12,marginBottom:14}}>
    {opts[tier].map((o,i)=><Card key={i} style={{padding:18}}>
      <h4 style={{fontSize:14,fontWeight:700,color:"#111",marginBottom:8}}>{o.n}</h4>
      <p style={{fontSize:12,color:"#777",lineHeight:1.6,marginBottom:10}}>{o.d}</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{o.badges.map((b,j)=><Badge key={j} v="violet">{b}</Badge>)}</div>
    </Card>)}
  </div>;
}

/* ──────────── TIER 1 — ADAPTED SMB AGENTS ──────────── */
function Tier1Page({showPricing=true}) {
  const adapted = [
    {n:"Customer Agent",sm:"Voice + WhatsApp + web chat in Arabic/English",up:"Multi-branch routing, CRM/ERP customer 360, compliance-grade transcripts, fine-tuned on customer scripts and tone of voice.",icon:"🎯"},
    {n:"Sales Agent",sm:"Lead-to-close pipeline + AI follow-ups",up:"Native sync with Salesforce / Dynamics / Oracle Sales / SAP CX, deal-team RBAC, audit trail on every commercial output, fine-tuned for sector pricing logic.",icon:"📈"},
    {n:"Comms Hub",sm:"Unified inbox + AI campaign orchestration",up:"Brand & legal review gates, multi-language broadcast, segment governance, e& BSP enterprise tier with template approval workflow and DLP.",icon:"📡"},
    {n:"Finance Agent",sm:"Invoices, VAT, cash flow, expenses",up:"Deep ERP integration (Oracle Fusion, SAP S/4HANA, Business Central, NetSuite), multi-entity & multi-currency, audit-grade journal posting, FTA e-invoicing.",icon:"💰"},
    {n:"Ops Agent",sm:"Tasks, approvals, SOPs, tickets",up:"ServiceNow / Jira Service Management / Remedy connectors, ITIL-grade ticketing, multi-step approval flows with delegation, SOP versioning + RBAC.",icon:"⚙️"},
    {n:"People Agent",sm:"WPS payroll, attendance, leave",up:"Oracle HCM / SuccessFactors / Workday integration, MOHRE/GDRFA workflows, multi-emirate compliance, sensitive-data masking, employee SSO.",icon:"👥"},
  ];
  const uplifts = [
    {t:"Multi-branch & multi-entity",d:"Routing, RBAC and reporting that handle 5 to 500 branches, multiple legal entities, and cross-border subsidiaries. Customer agents follow the same conversation across any branch."},
    {t:"Deep ERP / CRM / HIS connectivity",d:"Production-grade connectors to Oracle Fusion, SAP S/4HANA, Microsoft Dynamics, Salesforce, Epic, Cerner, Temenos and Finacle — read/write with reconciliation, retries, and dead-letter queues."},
    {t:"Compliance logging & RBAC",d:"Every agent action logged to an immutable trail. Per-role permission matrices, data masking, redaction, and customer-signed audit exports for DHA, CBUAE, NESA and ADDA."},
    {t:"Domain fine-tuning",d:"Each agent fine-tuned on the customer's terminology, products, scripts and policies. Medical Arabic, banking Arabic, legal Arabic — handled natively, not as a translation layer."},
  ];
  return <div>
    <TierHero
      eyebrow="Tier 1 · Adapted Agents · Co-sell · Deliver · Operate"
      title="Tier 1 — Adapted SMB Agents for Enterprise"
      lead="Take the proven six-agent suite that powers the SMB platform and harden it for one specific enterprise customer. Same architecture, deeper integrations, fine-tuned models, and an SLA-backed delivery wrap."
      sub="Built on the SMB platform baseline. Each adapted agent ships in 4–6 weeks. The first agent absorbs the integration work; subsequent agents reuse the connectors at 60% then 50% of the first-agent fee."
      stats={[{v:"6 agents",l:"Catalogued & ready"},{v:"60 days",l:"First agent live"},{v:"–40%",l:"Agent #2 cost"},{v:"–50%",l:"Agent #3+ cost"},{v:"SLA-backed",l:"Delivery wrap"}]}
    />

    <Note label="The proposition">
      The customer is not buying a chatbot. They are buying production agents — already proven on the SMB platform — adapted to their ERP, branches, compliance posture and tone of voice. The first agent carries the integration tax (SSO, ERP connector, audit fabric); every additional agent rides on top of that platform tax for a fraction of the cost.
    </Note>

    <SH>The six adapted agents</SH>
    <p style={{fontSize:13,color:BRAND.grey,lineHeight:1.6,maxWidth:820,marginBottom:18}}>Each agent inherits the SMB build, then gets an enterprise uplift: multi-branch routing, deeper systems-of-record connectors, compliance logging, RBAC, and domain fine-tuning on the customer's data.</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:12,marginBottom:14}}>
      {adapted.map((a,i)=><Card key={i} style={{padding:18}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <span style={{width:34,height:34,background:BRAND.lightGrey,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{a.icon}</span>
          <h4 style={{fontSize:15,fontWeight:700,color:"#111",margin:0}}>{a.n}</h4>
        </div>
        <div style={{fontSize:10.5,fontWeight:700,letterSpacing:"0.06em",color:BRAND.grey,textTransform:"uppercase",marginBottom:5}}>SMB baseline</div>
        <p style={{fontSize:12,color:"#777",lineHeight:1.55,marginBottom:10}}>{a.sm}</p>
        <div style={{fontSize:10.5,fontWeight:700,letterSpacing:"0.06em",color:BRAND.red,textTransform:"uppercase",marginBottom:5}}>Enterprise uplift</div>
        <p style={{fontSize:12,color:"#555",lineHeight:1.6}}>{a.up}</p>
      </Card>)}
    </div>

    <SH>What changes vs the SMB version</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",gap:12,marginBottom:14}}>
      {uplifts.map((u,i)=><Card key={i} style={{padding:18}}>
        <span style={{fontSize:10,fontFamily:"monospace",color:BRAND.red,fontWeight:700}}>0{i+1}</span>
        <h4 style={{fontSize:13,fontWeight:700,color:"#111",margin:"4px 0 8px"}}>{u.t}</h4>
        <p style={{fontSize:12,color:"#777",lineHeight:1.6}}>{u.d}</p>
      </Card>)}
    </div>

    <SH>Industry packaging — which agents fit which sector</SH>
    <Card style={{padding:0,overflow:"hidden",marginBottom:14}}>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:760}}>
          <thead><tr style={{borderBottom:`1px solid ${BRAND.border}`,background:BRAND.lightGrey}}>
            {["Sector","Lead agents","Systems of record","Compliance"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 14px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",whiteSpace:"nowrap"}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {[
              {s:"Healthcare",a:"Customer · Ops · People",sys:"Epic, Cerner, ClinicMaster, Oracle Health",c:"DHA, MOH, ADDA"},
              {s:"Banking & Insurance",a:"Customer · Sales · Comms · Finance",sys:"Temenos, Finacle, Oracle Flexcube, Salesforce FS Cloud",c:"CBUAE, AML, ADGM, FATCA"},
              {s:"Real Estate",a:"Customer · Sales · Ops",sys:"Yardi, Salesforce RE, Oracle CX, DLD APIs",c:"DLD, RERA"},
              {s:"Retail & QSR",a:"Customer · Comms · Finance · People",sys:"Oracle Retail, SAP CAR, Shopify Plus, NetSuite",c:"FTA e-invoicing, MOHRE"},
              {s:"Energy & Utilities",a:"Ops · People · Comms",sys:"SAP S/4HANA, Maximo, OSIsoft, ServiceNow",c:"NESA, ADDA, OSHAD"},
              {s:"Government",a:"Customer · Ops · Comms",sys:"Oracle Fusion, SharePoint, gov-cloud directories",c:"ADDA, NESA, federal data residency"},
            ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,verticalAlign:"top"}}>
              <td style={{padding:"12px 14px",fontWeight:700,color:"#111",whiteSpace:"nowrap"}}>{r.s}</td>
              <td style={{padding:"12px 14px",color:BRAND.red,fontWeight:600}}>{r.a}</td>
              <td style={{padding:"12px 14px",color:BRAND.grey}}>{r.sys}</td>
              <td style={{padding:"12px 14px",color:"#111"}}>{r.c}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </Card>

    <SH>Engagement model — three phases per agent</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:12,marginBottom:14}}>
      {[
        {st:"Phase 01 · Discovery & SDD",time:"Weeks 1–2",t:"Spec it before we build",d:"Customer workshops, systems-of-record audit, integration map, SDD blueprint with acceptance criteria. e& account team co-leads.",items:["Customer journey & data audit","SDD spec & blueprint signed","Integration & RBAC plan","Go / no-go gate"]},
        {st:"Phase 02 · Build & UAT",time:"Weeks 3–6",t:"Adapt the agent to the customer",d:"AIdeology adapts the SMB agent on the platform baseline. Live ERP/CRM/HIS connectors. Domain fine-tune on customer data. UAT with named customer reviewers.",items:["SMB agent adapted","Connectors live, audit on","Fine-tune cycle complete","UAT sign-off gate"]},
        {st:"Phase 03 · Launch & Hypercare",time:"Weeks 7–8 + 30 days",t:"Go live and stabilise",d:"Production cut-over, SLA-backed monitoring, weekly performance review. Handover into the managed service. e& field engineers shadow throughout.",items:["Production launch","30-day hypercare","Managed service handover","KPI baseline locked"]},
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

    <SH>Pricing — per agent, per customer</SH>
    <CommercialBox title="Tier 1 · Adapted Agents — list pricing" icon="$" iconBg="#F5F5F5" iconColor={BRAND.red} items={[
      {label:"Setup fee — Agent #1",value:"$60K–$80K",type:"per first agent · per customer",desc:"Includes SSO, ERP/CRM connector, audit fabric, RBAC. The first agent absorbs the integration tax."},
      {label:"Setup fee — Agent #2",value:"$36K–$48K",type:"60% of first-agent price",desc:"Reuses connectors and audit fabric. Only the agent-specific build, fine-tune and UAT remain."},
      {label:"Setup fee — Agent #3+",value:"$30K–$40K",type:"50% of first-agent price",desc:"Full integration leverage. Each additional agent ships against the same platform tax already paid."},
      {label:"Managed service",value:"$5K–$15K",type:"per customer · per month",desc:"24/7 monitoring, model drift management, monthly evolution releases, customer-success cadence."},
    ]}/>
    <Note label="Amortisation example — 3 agents for one bank">
      Customer Agent (#1) at $80K + Sales Agent (#2) at $48K + Finance Agent (#3) at $40K = $168K total setup. Versus three independent first-agents at $240K → <strong style={{color:BRAND.black}}>30% saving</strong> by ordering three together. The customer keeps the bundle pricing on every additional agent for the duration of the contract.
    </Note>

    <SH>Deployment options</SH>
    <DeploymentOptions tier={1}/>

    <SH>Timeline — first three agents</SH>
    <Card style={{padding:0,overflow:"hidden",marginBottom:14}}>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:720}}>
          <thead><tr style={{borderBottom:`1px solid ${BRAND.border}`,background:BRAND.lightGrey}}>
            {["Milestone","Agent #1","Agent #2","Agent #3"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 14px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {[
              {m:"Discovery & SDD signed",a1:"Day 14",a2:"Day 7",a3:"Day 5"},
              {m:"Connectors live",a1:"Day 28",a2:"Reused",a3:"Reused"},
              {m:"Build complete",a1:"Day 42",a2:"Day 21",a3:"Day 18"},
              {m:"UAT sign-off",a1:"Day 50",a2:"Day 28",a3:"Day 24"},
              {m:"Production go-live",a1:"Day 60",a2:"Day 35",a3:"Day 30"},
            ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`}}>
              <td style={{padding:"12px 14px",fontWeight:600,color:"#111"}}>{r.m}</td>
              <td style={{padding:"12px 14px",color:BRAND.grey}}>{r.a1}</td>
              <td style={{padding:"12px 14px",color:BRAND.grey}}>{r.a2}</td>
              <td style={{padding:"12px 14px",color:BRAND.grey}}>{r.a3}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </Card>

    {showPricing && <>
    <SH>Commercial model</SH>
    <CommercialBox title="Tier 1 · revenue split" icon="$" iconBg="#F5F5F5" iconColor={BRAND.red} items={[
      {label:"Project fee split",value:"60 / 40",type:"AIdeology / e&",desc:"e& fronts the customer, sells, and books the contract. AIdeology delivers and is the technical author of record."},
      {label:"Managed service split",value:"60 / 40",type:"AIdeology / e&",desc:"AIdeology operates the AI plane. e& contributes account management, hosting & connectivity. Reviewed annually."},
      {label:"Hosting & connectivity",value:"100% e&",type:"On top of project & managed",desc:"e& cloud, G42 colocation, SIM, SMS, Toll Free 800 — all carried on the e& bill, full margin to e&."},
    ]}/>
    </>}

    <SH>Why Tier 1 wins</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:12,marginBottom:14}}>
      {[
        {t:"Faster than Copilot",d:"Microsoft Copilot configures workflows; Tier 1 ships a production-grade agent in 60 days, fine-tuned on the customer's own data, integrated to their actual ERP."},
        {t:"Cheaper than custom build",d:"A SI-led custom equivalent runs $250K–$400K and 6 months. Tier 1 starts at $60K and 60 days because the SMB platform did the heavy lifting."},
        {t:"Already in production",d:"The same agent runs across hundreds of SMBs. Maturity, guardrails and Arabic NLP are field-tested before the first enterprise customer signs."},
        {t:"e& is the front, AIdeology is the engine",d:"Customer signs an e& contract with an e& SLA. AIdeology is invisible to procurement — and irreplaceable to delivery."},
      ].map((c,i)=><Card key={i} style={{padding:18}}>
        <h4 style={{fontSize:13,fontWeight:700,color:"#111",marginBottom:6}}>{c.t}</h4>
        <p style={{fontSize:12,color:"#777",lineHeight:1.6}}>{c.d}</p>
      </Card>)}
    </div>
  </div>;
}

/* ──────────── TIER 2 — CUSTOM AI SOLUTIONS ──────────── */
function Tier2Page({showPricing=true}) {
  return <div>
    <TierHero
      eyebrow="Tier 2 · Custom AI · Multi-agent · e& / G42 cloud"
      title="Tier 2 — Custom AI Solutions"
      lead="When a customer's workflow is too specific for an adapted agent, Tier 2 builds a multi-agent solution from spec. Five solution families ship today, headlined by the AI Contact Centre Software for enterprises."
      sub="Tier 2 deploys into e& cloud or G42 / Core42 sovereign cloud — controlled, repeatable environments where AIdeology owns the AI plane and e& owns the customer relationship."
      stats={[{v:"5 families",l:"Solution catalog"},{v:"16–22 wks",l:"Per project"},{v:"$300K–$680K",l:"Typical project"},{v:"e& / G42",l:"Default cloud"},{v:"Multi-agent",l:"Architecture"}]}
    />

    <Note label="The proposition">
      Tier 1 adapts proven agents. Tier 2 builds the workflow itself. Where the customer needs document processing at scale, multi-step approval orchestration, predictive operations, or a full AI-native contact centre — Tier 2 ships a custom multi-agent platform with named human-in-the-loop gates, deep integrations, and a managed service from day one. The cloud is e&'s; the architecture is AIdeology's; the customer relationship stays with e&.
    </Note>

    <SH>The five Tier 2 solution families</SH>

    {/* HEADLINE — AI Contact Centre */}
    <Card style={{padding:0,overflow:"hidden",borderLeft:`4px solid ${BRAND.red}`,marginBottom:16}}>
      <div style={{padding:"22px 26px",borderBottom:`1px solid ${BRAND.border}`,background:BRAND.lightGrey}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
          <Badge v="violet">Headline solution</Badge>
          <span style={{fontSize:11.5,color:"#888"}}>Voice · WhatsApp · web · agent assist · supervisor</span>
        </div>
        <h3 style={{fontSize:22,fontWeight:700,color:"#111",margin:"0 0 8px"}}>AI Contact Centre Software for Enterprises</h3>
        <p style={{fontSize:13,color:"#555",lineHeight:1.7,maxWidth:820,margin:0}}>A full AI-native contact centre platform — voice, WhatsApp, web chat, agent assist, supervisor analytics — deployed into e& or G42 cloud. AI handles tier-1 traffic end-to-end; humans handle escalation with live agent assist. Connects to the customer's CRM, ERP, HIS, ticketing and IVR — and is fully integrated with e& Smart Messaging, Toll Free 800, and BSP.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))"}}>
        {[
          {t:"AI front line",d:"Voice + WhatsApp + web chat handled by an AI agent fine-tuned on customer scripts. Resolves ~50–70% of tier-1 traffic without escalation."},
          {t:"Agent assist & co-pilot",d:"Live transcription, knowledge retrieval, next-best-action and post-call summary for human agents. Halves average handle time."},
          {t:"Supervisor analytics",d:"Sentiment, compliance, FCR, AHT, first-response, escalation reasons — live dashboards and automated coaching plans."},
          {t:"Integrations",d:"CRM (Salesforce, Dynamics, Oracle CX), ERP, HIS, ticketing (ServiceNow, Zendesk), IVR, e& BSP, Toll Free 800, Smart Messaging."},
          {t:"Compliance",d:"PCI redaction, call recording, RBAC, audit, sentiment-driven escalation. CBUAE, DHA, NESA controls supported."},
          {t:"Deployment",d:"e& or G42 cloud. Sovereign POD option. AIdeology operates 24/7. Outcome-based pricing available."},
        ].map((c,i)=><div key={i} style={{padding:18,borderRight:i<5?`1px solid ${BRAND.border}`:"none",borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.06em",color:BRAND.red,textTransform:"uppercase",marginBottom:6}}>{c.t}</div>
          <div style={{fontSize:12,color:"#666",lineHeight:1.55}}>{c.d}</div>
        </div>)}
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 26px",borderTop:`1px solid ${BRAND.border}`,flexWrap:"wrap",gap:10}}>
        <div style={{fontSize:12,color:"#777",lineHeight:1.55,maxWidth:560}}>Sample sizing — 200-seat enterprise contact centre, three customer journeys, full integration with Salesforce and the customer's IVR.</div>
        <div style={{display:"flex",alignItems:"baseline",gap:14}}>
          <div><div style={{fontSize:22,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font}}>$550K–$680K</div><div style={{fontSize:10.5,color:"#999"}}>Build · once-off</div></div>
          <div><div style={{fontSize:22,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font}}>$25K–$45K</div><div style={{fontSize:10.5,color:"#999"}}>Managed · per month</div></div>
        </div>
      </div>
    </Card>

    {/* The four other Tier 2 families */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:12,marginBottom:14}}>
      {[
        {n:"Document Intelligence Suite",d:"Bulk extraction, classification and downstream actioning of contracts, KYC packs, claims, invoices, lab reports — Arabic and English. Deep ingestion to ERP/CRM/HIS.",bullets:["OCR + LLM extraction","Multi-format Arabic","RAG knowledge base","Audit trail per document"],price:"$320K–$480K",managed:"$15K–$28K / mo"},
        {n:"Approval Orchestration Platform",d:"Multi-step business approvals (procurement, credit, expense, expense, contract redlines) automated end-to-end with named human gates and deterministic policy.",bullets:["Workflow designer","Policy as code","Human-in-loop gates","SLA & escalation engine"],price:"$300K–$450K",managed:"$12K–$22K / mo"},
        {n:"Predictive Maintenance Agent",d:"Sensor + ERP fusion to predict equipment failure, schedule field intervention and pre-order parts. Built for energy, utilities, large facilities, and manufacturing.",bullets:["Time-series + LLM fusion","SAP PM integration","Field ops dispatch","Reliability dashboard"],price:"$420K–$600K",managed:"$20K–$35K / mo"},
        {n:"Security & Compliance Agent",d:"Continuous policy monitoring across logs, transactions and agent outputs. Auto-flags anomalies, drafts incident reports, and feeds into the customer's SIEM and Help AG operations.",bullets:["Policy as code","SIEM integration","Anomaly detection","Auto-draft incident reports"],price:"$350K–$520K",managed:"$18K–$30K / mo"},
      ].map((s,i)=><Card key={i} style={{padding:18,display:"flex",flexDirection:"column"}}>
        <Badge v="violet">Tier 2 · solution</Badge>
        <h4 style={{fontSize:15,fontWeight:700,color:"#111",margin:"10px 0 6px"}}>{s.n}</h4>
        <p style={{fontSize:12,color:"#777",lineHeight:1.6,marginBottom:12}}>{s.d}</p>
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:5,marginBottom:14}}>
          {s.bullets.map((b,j)=><div key={j} style={{display:"flex",alignItems:"center",gap:7,fontSize:12,color:"#555"}}>
            <span style={{color:BRAND.red,flexShrink:0}}><CheckIcon/></span>{b}
          </div>)}
        </div>
        <div style={{borderTop:`1px solid ${BRAND.border}`,paddingTop:12,display:"flex",justifyContent:"space-between",alignItems:"baseline",flexWrap:"wrap",gap:8}}>
          <div><div style={{fontSize:18,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font}}>{s.price}</div><div style={{fontSize:10.5,color:"#999"}}>Build</div></div>
          <div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:700,color:"#111",fontFamily:BRAND.font}}>{s.managed}</div><div style={{fontSize:10.5,color:"#999"}}>Managed</div></div>
        </div>
      </Card>)}
    </div>

    <SH>Architecture pattern — multi-agent with named gates</SH>
    <Card style={{padding:24}}>
      <p style={{fontSize:13,color:"#555",lineHeight:1.7,marginBottom:14}}>Every Tier 2 solution is built on the same architectural skeleton — a multi-agent system with deterministic policy at the edges and a managed service in the middle.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:12}}>
        {[
          {n:"01 Channels",d:"Voice, WhatsApp, web, email, IVR, Teams, ticketing — handled through the customer's existing front-door."},
          {n:"02 Orchestrator",d:"Multi-agent framework routes between specialised agents, calls tools, manages memory, enforces guardrails."},
          {n:"03 Agents",d:"Specialist agents per task — extractor, classifier, approver, drafter, verifier — each with tool permissions."},
          {n:"04 Connectors",d:"Read/write to ERP/CRM/HIS/SIEM through the API gateway. Reconciliation, retries, dead-letter queues, schema mapping."},
          {n:"05 Human gates",d:"Named reviewers (compliance, legal, clinical, finance) approve before any commitment, payment or external send."},
          {n:"06 Audit & RBAC",d:"Immutable trail of every action, prompt, retrieval and decision. Per-role permission matrix and customer-signed exports."},
        ].map((b,i)=><div key={i} style={{padding:14,background:BRAND.lightGrey,border:`1px solid ${BRAND.border}`}}>
          <div style={{fontSize:11,fontWeight:700,color:BRAND.red,letterSpacing:"0.04em",marginBottom:4}}>{b.n}</div>
          <div style={{fontSize:11.5,color:"#666",lineHeight:1.55}}>{b.d}</div>
        </div>)}
      </div>
    </Card>

    <SH>Engagement model — five stages</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:12,marginBottom:14}}>
      {[
        {st:"01 Discovery",time:"Wks 1–3",d:"Workshops, data audit, integration map, success metrics. e& account team co-leads."},
        {st:"02 SDD",time:"Wks 4–6",d:"Spec-Driven Design: agent blueprints, acceptance criteria, test plan, RACI, security review."},
        {st:"03 Build",time:"Wks 7–14",d:"Multi-agent build, connector integration, fine-tune, internal QA. Bi-weekly demo."},
        {st:"04 Pilot",time:"Wks 15–18",d:"Limited production with named users. Live KPIs, weekly iteration, named human gates active."},
        {st:"05 Scale",time:"Wks 19–22",d:"Full rollout, SLA-backed handover into managed service, customer success cadence locked."},
      ].map((s,i)=><Card key={i} style={{padding:16}}>
        <div style={{fontSize:11,fontWeight:700,color:"#999"}}>{s.st}</div>
        <Badge v="violet">{s.time}</Badge>
        <p style={{fontSize:12,color:"#777",lineHeight:1.55,marginTop:10}}>{s.d}</p>
      </Card>)}
    </div>

    <SH>Deployment options</SH>
    <DeploymentOptions tier={2}/>

    <SH>Industry use cases</SH>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
      {[
        {n:"Bank · 24/7 AI Contact Centre",d:"AI handles 60% of tier-1 retail traffic across voice, WhatsApp and web. Live agent assist on the rest. CBUAE compliance built-in. e& BSP and Toll Free 800 carry the volume."},
        {n:"Health regulator · Document Intelligence",d:"Bulk processing of clinical files in Arabic. Triage to inspectors with audit-grade RAG. Sovereign G42 cloud."},
        {n:"Federal entity · Approval Orchestration",d:"Procurement and tender approvals automated end-to-end with policy-as-code and named ministerial review gates."},
        {n:"Energy major · Predictive Maintenance",d:"Sensor + SAP PM fusion across 14 sites. Field dispatch automated, parts pre-ordered, MTBF improved 22%."},
      ].map((u,i)=><Card key={i} style={{padding:18}}>
        <h4 style={{fontSize:14,fontWeight:700,color:"#111",marginBottom:6}}>{u.n}</h4>
        <p style={{fontSize:12,color:"#777",lineHeight:1.6}}>{u.d}</p>
      </Card>)}
    </div>

    {showPricing && <>
    <SH>Commercial model</SH>
    <CommercialBox title="Tier 2 · revenue split" icon="$" iconBg="#F5F5F5" iconColor={BRAND.red} items={[
      {label:"Project fee split",value:"60 / 40",type:"AIdeology / e&",desc:"Build fee invoiced by e&. AIdeology delivers as the technical sub-contractor of record."},
      {label:"Managed service split",value:"60 / 40",type:"AIdeology / e&",desc:"AIdeology operates the platform 24/7. Outcome-based pricing available on the AI Contact Centre."},
      {label:"Hosting & connectivity",value:"100% e&",type:"e& cloud or G42",desc:"Compute, storage, networking, e& BSP and Toll Free 800 all on the e& bill."},
    ]}/>
    </>}

    <Note label="Custom bespoke — outside the catalog">
      For requirements that fall outside the five Tier 2 families — fully bespoke industrial AI, scientific copilots, or proprietary trading tools — AIdeology runs a custom bespoke engagement on a time-and-materials basis. Same delivery method, same commercial model, scoped per opportunity. Bespoke work that proves repeatable becomes a sixth Tier 2 family.
    </Note>
  </div>;
}

/* ──────────── TIER 3 — SOVEREIGN & ON-PREM ──────────── */
function Tier3Page({showPricing=true}) {
  return <div>
    <TierHero
      eyebrow="Tier 3 · Sovereign · Air-gap capable · Customer site"
      title="Tier 3 — Sovereign & On-Prem Deployments"
      lead="Take any Tier 2 solution and deploy it into the customer's own data centre — air-gap capable, NESA-grade, with NVIDIA-Certified hardware sized to the workload. Tier 3 is the answer when cloud is not allowed."
      sub="The HPC Reference Architecture library means every BoM is pre-vetted by NVIDIA's Design Review Board. AIdeology designs, e& integrates, the chosen OEM ships — Cisco, Dell, HPE, Lenovo or Supermicro."
      stats={[{v:"6 layers",l:"Sovereign uplift"},{v:"24–30 wks",l:"Per project"},{v:"$600K–$1M+",l:"Build fee"},{v:"5 OEMs",l:"NVIDIA-Certified"},{v:"32–256 GPU",l:"Standard pod"}]}
    />

    <Note label="The proposition">
      Tier 3 is Tier 2 with a customer-site uplift. The customer keeps the data, the perimeter, the keys and the audit trail. AIdeology designs and operates the AI plane; e& integrates the network, security and managed service; the OEM ships the NVIDIA-Certified iron from a pre-vetted reference architecture. The HPC RA library means we can quote a binding BoM on day one — not after a six-week design phase.
    </Note>

    <SH>What we deliver — Tier 2 baseline + sovereign uplift</SH>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
      <Card style={{padding:18}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",color:BRAND.grey,textTransform:"uppercase",marginBottom:8}}>Tier 2 baseline (inherited)</div>
        <p style={{fontSize:12.5,color:"#666",lineHeight:1.7}}>Multi-agent orchestrator, named-agent specialists, ERP/CRM/HIS connectors, RAG and fine-tuning, human-in-the-loop gates, audit & RBAC, managed service. Same software stack as cloud Tier 2.</p>
      </Card>
      <Card style={{padding:18,borderLeft:`4px solid ${BRAND.red}`}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",color:BRAND.red,textTransform:"uppercase",marginBottom:8}}>Tier 3 sovereign uplift (added)</div>
        <p style={{fontSize:12.5,color:"#666",lineHeight:1.7}}>Customer-site architecture, NVIDIA-Certified BoM coordination, air-gap capable build, customer-owned encryption keys, sovereign data residency, Help AG security wrap, on-site commissioning, on-call sovereign managed service.</p>
      </Card>
    </div>

    <SH>The six sovereign layers</SH>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
      {[
        {n:"01",t:"Customer-specific architecture",d:"Site survey, network design, identity integration, and DC-floor plan tailored to the customer's existing operations and security posture."},
        {n:"02",t:"NVIDIA-Certified hardware",d:"BoM picked from the HPC RA library — Cisco, Dell, HPE, Lenovo or Supermicro. Pattern, NIC count, fabric and storage tier signed off by NVIDIA's Design Review Board before quote."},
        {n:"03",t:"Air-gap & network isolation",d:"Optional fully air-gapped build. Multi-rail Spectrum-X or InfiniBand fabric. North-south, east-west, storage and management fabrics physically separated as required."},
        {n:"04",t:"Help AG security wrap",d:"Sovereign managed security: SOC integration, IAM/PAM, DLP, SIEM, vulnerability management, NESA controls. e&'s wholly-owned cyber arm — same paper, same SLA."},
        {n:"05",t:"Sovereign data residency",d:"All data, models, weights, embeddings, transcripts and logs remain on customer site. Customer-owned encryption keys via HSM. Full audit export under customer signature."},
        {n:"06",t:"Operationalisation & handover",d:"24-week build, 30-day hypercare, optional 12–36-month managed service. AIdeology trains the customer's MLOps team for full handover by year 2."},
      ].map((l,i)=><Card key={i} style={{padding:16}}>
        <span style={{fontSize:10,fontFamily:"monospace",color:BRAND.red,fontWeight:700}}>{l.n}</span>
        <h4 style={{fontSize:13,fontWeight:600,color:"#111",margin:"4px 0"}}>{l.t}</h4>
        <p style={{fontSize:11.5,color:"#777",lineHeight:1.55}}>{l.d}</p>
      </Card>)}
    </div>

    <SH>HPC RA library — agility on every BoM</SH>
    <Card style={{padding:24,borderLeft:`4px solid ${BRAND.red}`,marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,flexWrap:"wrap"}}>
        <Badge v="rose">Pre-vetted by NVIDIA Design Review Board</Badge>
        <span style={{fontSize:11.5,color:"#888"}}>3 RA families · 5 OEMs · 8+ NVIDIA-Certified BoMs</span>
      </div>
      <p style={{fontSize:13,color:"#555",lineHeight:1.7,marginBottom:8}}>
        The HPC Reference Architectures page (top-nav) is the BoM engine. For every Tier 3 opportunity we pick a pattern (RTX PRO 2-8-5-200, HGX 2-8-9-400, or NVL72 2-8-9-800), pick an OEM, pick a node count, and lift the BoM directly into the proposal. The customer gets a binding spec on day one; the OEM is committed; e& integrates against a known design.
      </p>
      <p style={{fontSize:13,color:"#555",lineHeight:1.7,margin:0}}>
        That agility is what makes Tier 3 viable at fixed price. Without the RA library, every sovereign deal would need a six-week design phase before the customer sees a number.
      </p>
    </Card>

    <SH>OEM partners — pick the BoM, ship the iron</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:10,marginBottom:14}}>
      {[
        {v:"Cisco",d:"UCS X-Series with HGX H200/B200. Spectrum-X 400 GbE fabric. Strong fit when customer is already a Cisco network shop."},
        {v:"Dell Technologies",d:"PowerEdge XE9680 / XE9685 — flagship HGX node. Dell AI Factory reference. Broadest customer footprint in the UAE."},
        {v:"HPE",d:"ProLiant Compute XD685 + Cray EX. PCAI software stack. Strong in government and federal accounts."},
        {v:"Lenovo",d:"ThinkSystem SR685a V3 with HGX H200. Tight fit for healthcare and academic research clusters."},
        {v:"Supermicro",d:"GPU SuperServer SYS-821GE / SYS-A21GE for HGX and RTX PRO. Most flexible BoM at the lowest entry point."},
      ].map((o,i)=><Card key={i} style={{padding:14}}>
        <div style={{fontSize:13,fontWeight:700,color:"#111",marginBottom:5}}>{o.v}</div>
        <div style={{fontSize:11.5,color:"#777",lineHeight:1.55}}>{o.d}</div>
      </Card>)}
    </div>

    <SH>Sizing options — from department to standard pod</SH>
    <Card style={{padding:0,overflow:"hidden",marginBottom:14}}>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:760}}>
          <thead><tr style={{borderBottom:`1px solid ${BRAND.border}`,background:BRAND.lightGrey}}>
            {["Sizing","Nodes","GPUs","Use case","Indicative hardware*"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 14px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {[
              {s:"Department pilot",n:"4 nodes · 1 SU",g:"32 GPUs",u:"Single-department production agent. First production-grade Tier 3 build.",hw:"$0.9M–$1.6M"},
              {s:"Standard pod",n:"32 nodes · 8 SUs",g:"256 GPUs",u:"NVIDIA's default-tested HGX/RTX PRO end-state. Multi-department, multi-solution sovereign AI factory.",hw:"$6M–$10M"},
              {s:"Max pod (HGX)",n:"128 nodes · 32 SUs",g:"1,024 GPUs",u:"Frontier model training, multi-country sovereign AI factory, gov flagship.",hw:"$22M–$35M"},
            ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`}}>
              <td style={{padding:"12px 14px",fontWeight:700,color:"#111",whiteSpace:"nowrap"}}>{r.s}</td>
              <td style={{padding:"12px 14px",color:"#111"}}>{r.n}</td>
              <td style={{padding:"12px 14px",color:"#111"}}>{r.g}</td>
              <td style={{padding:"12px 14px",color:BRAND.grey,lineHeight:1.5}}>{r.u}</td>
              <td style={{padding:"12px 14px",color:BRAND.red,fontWeight:700,whiteSpace:"nowrap"}}>{r.hw}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <div style={{padding:"10px 14px",fontSize:10.5,color:"#999"}}>* Hardware indicative · NVIDIA-Certified BoM, OEM list price before AIdeology design fee, e& integration, networking, storage, software and Help AG wrap.</div>
    </Card>

    <SH>Help AG security partnership</SH>
    <Card style={{padding:18,borderLeft:`4px solid ${BRAND.red}`,marginBottom:14}}>
      <p style={{fontSize:13,color:"#555",lineHeight:1.7,margin:0}}>
        Every Tier 3 build ships with the Help AG sovereign security wrap as standard. SOC, IAM, PAM, DLP, SIEM, NESA controls and incident response — all on the same e& contract, with one SLA. Help AG is e&'s wholly-owned cyber arm, which means the customer never has a third-party security vendor in the chain.
      </p>
    </Card>

    <SH>Engagement model — six phases</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:12,marginBottom:14}}>
      {[
        {st:"01 Discovery",time:"Wks 1–4",d:"Workshops, site survey, security review, BoM short-list from the HPC RA library."},
        {st:"02 SDD + BoM lock",time:"Wks 5–8",d:"Spec-Driven Design signed. NVIDIA-Certified BoM committed. Help AG security plan locked."},
        {st:"03 OEM ship & install",time:"Wks 9–14",d:"OEM ships hardware. e& field engineers install. AIdeology commissions the AI plane."},
        {st:"04 Build",time:"Wks 15–22",d:"Multi-agent solution built and fine-tuned on customer data inside the perimeter."},
        {st:"05 Pilot",time:"Wks 23–26",d:"Limited production with named users, named human gates, live KPI tracking."},
        {st:"06 Scale & handover",time:"Wks 27–30",d:"Full rollout. 30-day hypercare. Optional managed service or full handover to customer MLOps."},
      ].map((s,i)=><Card key={i} style={{padding:16}}>
        <div style={{fontSize:11,fontWeight:700,color:"#999"}}>{s.st}</div>
        <Badge v="violet">{s.time}</Badge>
        <p style={{fontSize:12,color:"#777",lineHeight:1.55,marginTop:10}}>{s.d}</p>
      </Card>)}
    </div>

    <SH>Pricing structure — modular by line</SH>
    <CommercialBox title="Tier 3 · build & operate" icon="$" iconBg="#F5F5F5" iconColor={BRAND.red} items={[
      {label:"AIdeology design & build",value:"$600K–$1M",type:"per project · once-off",desc:"Tier 2 baseline + sovereign uplift. SDD, multi-agent build, fine-tune, audit fabric, on-site commissioning."},
      {label:"NVIDIA-Certified BoM",value:"At cost",type:"OEM list · pass-through",desc:"Hardware sized via the HPC RA library. AIdeology coordinates, e& invoices, OEM ships."},
      {label:"Help AG security wrap",value:"$80K–$220K",type:"build · then monthly",desc:"Initial onboarding plus an ongoing SOC retainer. NESA-aligned. One contract, one SLA."},
      {label:"Sovereign managed service",value:"$25K–$60K",type:"per month",desc:"24/7 AI plane operations on customer site. Fine-tune cycles, model evolution, audit support."},
    ]}/>

    <SH>Customer scenarios</SH>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
      {[
        {n:"Federal government — sovereign AI factory",d:"Standard pod (32 nodes · 256 GPUs) on a federal data centre. Full air-gap. Approval Orchestration + Document Intelligence at federal scale. Help AG SOC integrated."},
        {n:"National bank — on-prem AI Contact Centre",d:"Department pilot (4 nodes · 32 GPUs) inside the bank's tier-IV data centre. CBUAE-compliant call recording, PCI redaction, customer-owned keys."},
        {n:"Health regulator — clinical document intelligence",d:"4-node sovereign pod with HGX H200. Bulk processing of clinical files in Arabic. DHA-aligned controls. AIdeology operates, regulator owns the data."},
        {n:"Energy major — predictive operations",d:"8-node POD inside the operator's existing OT data centre. SAP PM and OSIsoft fusion. NESA-grade controls. 22% MTBF improvement target."},
      ].map((u,i)=><Card key={i} style={{padding:18}}>
        <h4 style={{fontSize:14,fontWeight:700,color:"#111",marginBottom:6}}>{u.n}</h4>
        <p style={{fontSize:12,color:"#777",lineHeight:1.6}}>{u.d}</p>
      </Card>)}
    </div>

    <SH>Deployment options</SH>
    <DeploymentOptions tier={3}/>

    {showPricing && <>
    <SH>Commercial model</SH>
    <CommercialBox title="Tier 3 · revenue split" icon="$" iconBg="#F5F5F5" iconColor={BRAND.red} items={[
      {label:"Project fee split",value:"60 / 40",type:"AIdeology / e&",desc:"e& is the prime contractor and customer-of-record. AIdeology delivers as the technical author. Help AG line is e&-led."},
      {label:"Managed service split",value:"60 / 40",type:"AIdeology / e&",desc:"AIdeology operates the AI plane on customer site. e& covers integration, NOC, and Help AG security wrap."},
      {label:"Hardware",value:"100% e&",type:"OEM pass-through",desc:"NVIDIA-Certified BoM invoiced by e&, full margin on hardware and integration."},
    ]}/>
    </>}

    <Note label="Why Tier 3 wins for sovereign customers">
      The customer keeps full sovereignty — data, keys, audit trail and physical perimeter all on their site. e& is the one paper, one SLA, one-throat-to-choke partner. AIdeology is the AI plane that no SI can match in Arabic depth and agent maturity. The HPC RA library means a binding BoM lands on the customer's desk on day one — not after six weeks of design.
    </Note>
  </div>;
}

/* ════════════════════════════════════════════════════════════ */
/* ENTERPRISE & GOV */
/* ════════════════════════════════════════════════════════════ */
const ENT_TABS = ["Overview","Tier 1 — Adapted Agents","Tier 2 — Custom AI","Tier 3 — Sovereign On-Prem"];
function EnterpriseSegment({showPricing=true}) {
  const [entTab, setEntTab] = useState(0);
  return <div>
    {/* Sub-tab navigation */}
    <div style={{display:"flex",gap:6,flexWrap:"wrap",padding:"24px 0 0"}}>
      {ENT_TABS.map((t,i)=>{const a=entTab===i;return<button key={i} onClick={()=>{setEntTab(i);if(typeof window!=="undefined")window.scrollTo({top:0,behavior:"smooth"})}} style={{padding:"10px 18px",fontSize:12,fontWeight:700,color:a?BRAND.white:BRAND.black,background:a?BRAND.red:BRAND.lightGrey,border:`1px solid ${a?BRAND.red:BRAND.border}`,borderRadius:0,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.15s"}}>{t}</button>})}
    </div>

    {entTab===0 && <EnterpriseOverview onTierSelect={setEntTab} showPricing={showPricing}/>}
    {entTab===1 && <Tier1Page showPricing={showPricing}/>}
    {entTab===2 && <Tier2Page showPricing={showPricing}/>}
    {entTab===3 && <Tier3Page showPricing={showPricing}/>}
  </div>;
}

function EnterpriseOverview({onTierSelect, showPricing=true}) {
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
          {onTierSelect && <button onClick={()=>{onTierSelect(i+1);if(typeof window!=="undefined")window.scrollTo({top:0,behavior:"smooth"})}} style={{marginTop:12,padding:"9px 14px",fontSize:11,fontWeight:700,color:BRAND.white,background:BRAND.red,border:"none",cursor:"pointer",letterSpacing:"0.04em",textTransform:"uppercase"}}>View full proposal →</button>}
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
    {showPricing && <>
    <SH>Commercial model</SH>
    <CommercialBox title="Enterprise & Government Commercials" icon="$" iconBg="#F5F5F5" iconColor="#E00800" items={[
      {label:"Revenue Split",value:"60 / 40",color:"#E00800",type:"AIdeology / e&",desc:"e& sells, owns customer & hosting. AIdeology delivers. Joint GTM."},
      {label:"Managed Service",value:"$5K–$25K",color:"#E00800",type:"Monthly per client",desc:"Ongoing support, monitoring & evolution. Shared at agreed ratio."},
      {label:"Success Fee",value:"10–15%",color:"#E00800",type:"KPI uplift",desc:"Optional bonus tied to measurable outcomes."},
    ]}/>

    <SH>Platform economics & partner protection</SH>
    <Card style={{padding:0,overflow:"hidden",marginBottom:14}}>
      <div style={{padding:"20px 24px",borderBottom:`1px solid ${BRAND.border}`}}>
        <h4 style={{fontSize:16,fontWeight:700,color:"#111",marginBottom:8}}>AIdeology gets paid for the platform layer, not only for direct delivery</h4>
        <p style={{fontSize:12.5,color:"#777",lineHeight:1.65,maxWidth:880,margin:0}}>
          The handover model lets e& operate the platform and onboard other partners without creating operational dependency on AIdeology. The commercial protection is that any agentic application running on the AIdeology platform still carries a platform economic right, and any AIdeology-created solution or derivative still carries a solution royalty unless bought out.
        </p>
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,minWidth:760}}>
          <thead>
            <tr style={{background:BRAND.lightGrey}}>
              {["Scenario","AIdeology compensation","Commercial logic"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 16px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {[
              {s:"AIdeology builds the agent / platform",c:"Build fee + 20%–35% solution revenue share",l:"AIdeology is paid for delivery and keeps upside on the solution it created."},
              {s:"e& resells an AIdeology-created agent",c:"Same economics: build / adaptation fee + 20%–35% solution revenue share",l:"If e& resells, reuses or adapts an AIdeology-created solution, it is treated commercially the same as an AIdeology solution deployment."},
              {s:"e& builds a new agent using the platform",c:"3%–7% platform royalty",l:"e& is free to build independently, while AIdeology is compensated for the orchestration platform enabling the application."},
              {s:"Third party builds a new agent using the platform",c:"3%–7% platform royalty + certification / support fee",l:"Partner ecosystem is allowed, but every certified application contributes to the platform economics."},
              {s:"e& wants to remove royalties",c:"Buyout fee / acquisition trigger",l:"A clean path exists: acquire or buy out the relevant platform and solution rights instead of paying royalties forever."},
              {s:"e& replicates an AIdeology solution",c:"Treated as derivative work; royalty still applies",l:"Anti-circumvention protection prevents recreating AIdeology blueprints, workflows, prompts, connectors or orchestration logic to avoid payment."},
            ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,background:i===4?BRAND.lightGrey:"transparent",verticalAlign:"top"}}>
              <td style={{padding:"14px 16px",fontWeight:700,color:"#111",width:"28%"}}>{r.s}</td>
              <td style={{padding:"14px 16px",fontWeight:700,color:BRAND.red,width:"28%"}}>{r.c}</td>
              <td style={{padding:"14px 16px",color:"#666",lineHeight:1.55}}>{r.l}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </Card>
    <Note label="Commercial principle">Operational handover does not mean economic handover. e& can operate the platform, build its own applications, and onboard third-party partners; AIdeology is still compensated when the platform is used, and AIdeology-created solutions keep the same commercial economics when they are resold, reused, replicated, or adapted.</Note>

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
    </>}
  </div>;
}

/* ════════════════════════════════════════════════════════════ */
/* GPU & PLATFORM */
/* ════════════════════════════════════════════════════════════ */
function GPUSegment({showPricing=true}) {
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

    {/* Owned platform architecture */}
    <SH>Owned platform architecture</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{padding:"22px 24px",borderBottom:`1px solid ${BRAND.border}`}}>
        <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",marginBottom:10}}>
          <Badge v="rose">Owned by e&</Badge>
          <span style={{fontSize:11.5,color:"#888"}}>Agents from anyone · platform, customer, data and margin stay with e&</span>
        </div>
        <h4 style={{fontSize:20,fontWeight:700,color:"#111",marginBottom:8}}>The pieces that make ownership real</h4>
        <p style={{fontSize:12.5,color:"#777",lineHeight:1.6,maxWidth:900}}>
          The technical team’s architecture is not a vendor catalog. It is an e& control plane where third-party and internal agents plug in, while e& controls routing, tenancy, compliance, operations, pricing, and observability.
        </p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))"}}>
        {[
          {n:"LLM Gateway",why:"Routes every model call across providers. Optimizes token cost, isolates rate limits per tenant, and fails over when a provider degrades."},
          {n:"Agent Template Instancer",why:"Turns templates into live agents in minutes. Supports self-service onboarding without creating a sales or services bottleneck."},
          {n:"Tenant BackOffice",why:"Each SMB gets an e& branded dashboard to configure agents, manage users, and monitor activity without seeing the underlying provider."},
          {n:"Trust Tiers & Guardrails",why:"Maps controls to ISO 27001, SOC 2, NESA, and public-sector requirements. e& selects the trust tier by customer segment."},
          {n:"Unified Observability",why:"One view over conversations, tool calls, traces, token spend, bugs, and cost across every agent, provider, and tenant."},
          {n:"Marketplace Control Plane",why:"Central console to publish, version, deprecate, price, and govern agents as a business unit, not as a reseller catalog."},
        ].map((x,i)=><div key={i} style={{padding:20,borderRight:(i+1)%3?`1px solid ${BRAND.border}`:"none",borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{fontSize:10.5,fontFamily:"monospace",fontWeight:700,color:BRAND.red,letterSpacing:"0.14em",marginBottom:8}}>0{i+1}</div>
          <h4 style={{fontSize:14,fontWeight:700,color:"#111",marginBottom:7}}>{x.n}</h4>
          <p style={{fontSize:11.5,color:"#777",lineHeight:1.6,margin:0}}>{x.why}</p>
        </div>)}
      </div>
    </Card>

    <SH>Capability evolution matrix</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"1.3fr repeat(3, 1fr)",background:BRAND.black,color:BRAND.white}}>
        {[
          {k:"Roadmap",v:"Same foundations. No rewrites."},
          {k:"Phase 0 · 30 days",v:"SMB launch · base platform + Customer Agent"},
          {k:"Phase 1 · 90 days",v:"Enterprise · multi-tier runtime · formal compliance"},
          {k:"Phase 2 · 180 days",v:"Public sector · sovereign deployments · high assurance"},
        ].map((p,i)=><div key={i} style={{padding:"18px 20px",borderRight:i<3?"1px solid rgba(255,255,255,0.14)":"none"}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"#D8D8D8",marginBottom:5}}>{p.k}</div>
          <div style={{fontSize:13,fontWeight:700,lineHeight:1.35}}>{p.v}</div>
        </div>)}
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",minWidth:900,fontSize:12}}>
          <thead>
            <tr style={{background:BRAND.lightGrey,borderBottom:`1px solid ${BRAND.border}`}}>
              {["Capability","Business enabler","P0 · SMB","P1 · Enterprise","P2 · Government"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 14px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.08em",textTransform:"uppercase"}}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {[
              {c:"LLM Gateway",b:"Cost control, vendor independence, resilience",p0:"Multi-provider routing, virtual keys per tenant, basic budgets, fallback across OpenInnovation, Azure OpenAI and Anthropic.",p1:"Prompt versioning, semantic cache, A/B testing, granular budgets per agent, advanced fallback policies.",p2:"Sovereign vLLM on local GPUs, per-region routing, data-residency policies, full audit of every model call."},
              {c:"Idle & runtime strategy",b:"SMB unit economics: idle agents must not burn money",p0:"Shared runtime pool serves thousands of SMB tenants with logical isolation by tenant context.",p1:"Dedicated pod with scale-to-zero for enterprise tenants. Namespace-per-tenant isolation.",p2:"Kernel-sandboxed runtime with hibernation, cryptographic isolation, instant resume from snapshot."},
              {c:"Template Instancer",b:"Self-service at scale. New agents in hours, not weeks",p0:"Provisioning service with queue, idempotency, healthcheck, rollback. Helm-templated agents deployed in minutes.",p1:"Kubernetes Operator with custom Agent resource, signed OCI templates, declarative lifecycle, blue/green upgrades.",p2:"Third-party publishing flow with mandatory signing, sandbox enforcement, and central review before go-live."},
              {c:"Trust Tiers",b:"Same platform for SMB, Enterprise and Government",p0:"T1 logical multi-tenancy. ISO 27001 baseline, SOC 2 Type I, NESA P1.",p1:"T1 + T2 active. ISO 27017/27018, SOC 2 Type II, NESA P1–P3. Tier selectable per tenant.",p2:"T3 + T4, NESA P1–P4, ISO 42001, NIST AI RMF, HSM, air-gap option."},
              {c:"Audit & guardrails",b:"Pass audits, reduce legal risk, enter public sector",p0:"Append-only tenant audit log in Postgres, PII redaction and content filter at gateway level.",p1:"Immutable Kafka event stream to OpenSearch + cold storage, Presidio-grade PII handling, jailbreak detection.",p2:"National-grade retention, auditor exports, classification-aware redaction, evidence packs on demand."},
              {c:"Observability",b:"Defend SLA and predict cost before it spikes",p0:"Langfuse traces every agent step. Prometheus + Grafana for infra metrics. Basic Slack/email alerts.",p1:"Distributed tracing across services, formal SLOs, error budgets, per-tenant cost dashboards, anomaly detection.",p2:"Sovereign-region observability stack, classified-data redaction in traces, regulator-ready dashboards."},
              {c:"Provisioning resilience",b:"Marketplace stays up under demand spikes",p0:"Worker-pool queue, idempotency, post-provision healthcheck, automated rollback.",p1:"K8s Operator reconciles continuously, drift detection, GitOps deployments, Temporal workflows.",p2:"Multi-cluster federation, regional failover, regulated change-management workflows."},
              {c:"Cloud-agnostic sovereign-ready",b:"Vendor leverage and public-sector entry without rebuild",p0:"Single managed K8s cluster (AKS, EKS, GKE or OpenInnovation). Open-source pieces self-hosted.",p1:"Multi-cloud ready with same manifests, regional failover option, Vault HA for secrets.",p2:"On-prem OpenShift / RKE2, HSM, air-gap option, full data residency control."},
            ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`}}>
              <td style={{padding:"14px",fontWeight:700,color:"#111",verticalAlign:"top"}}>{r.c}</td>
              <td style={{padding:"14px",color:"#555",lineHeight:1.45,verticalAlign:"top"}}>{r.b}</td>
              {[r.p0,r.p1,r.p2].map((v,j)=><td key={j} style={{padding:"14px",color:"#777",lineHeight:1.45,verticalAlign:"top"}}>{v}</td>)}
            </tr>)}
          </tbody>
        </table>
      </div>
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
    {showPricing && <>
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
    </>}
  </div>;
}

/* ════════════════════════════════════════════════════════════ */
/* SUMMARY */
/* ════════════════════════════════════════════════════════════ */
const MaturityWidget = ({level,compact=false}) => {
  const active = level===3 ? BRAND.red : "#8DBA2B";
  const Tag = compact ? "span" : "div";
  return <Tag style={{display:compact?"inline-flex":"flex",alignItems:"center",gap:6,marginTop:compact?0:8}}>
    <span style={{display:"inline-flex",alignItems:"flex-end",gap:3}}>
      {[1,2,3].map(n=><span key={n} style={{width:5,height:5+n*3,borderRadius:1,background:n<=level?active:BRAND.border,opacity:n<=level?1:0.45,display:"inline-block"}}/>)}
    </span>
    <span style={{fontSize:10,fontWeight:700,color:level===3?BRAND.red:"#6fa31d",letterSpacing:"0.06em"}}>L{level}</span>
  </Tag>;
};

function SummarySection({showPricing=true}) {
  const thStyle = {textAlign:"left",padding:"10px 14px",fontSize:10,fontWeight:600,color:"#999",letterSpacing:"0.06em",textTransform:"uppercase"};
  const tdStyle = {padding:"12px 14px",fontSize:12,color:"#666",borderBottom:"1px solid #f0f0f0"};
  const matrixStickyTop = 128;
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
            {d:"What we build",a:"AI platform + first Customer Agent, then 2-agent parallel waves",b:"Custom AI + adapted agents + on-prem infra",c:"GPU infra, middleware & SDD platform"},
            {d:"Core tech",a:"SDD specs and blueprints, multi-tenant platform",b:"Agent orchestration, ERP/CRM integration, sovereign",c:"K8s/Slurm, vLLM/TGI, SDD agent builder"},
            {d:"Timeline",a:"60–90 days",b:"8–20 weeks per project",c:"6 months full platform"},
            ...(showPricing ? [
              {d:"Upfront fee",a:"$150K–$250K",b:"$300K–$600K cloud · $600K–$1M sovereign/on-prem",c:"$300K–$600K build"},
              {d:"Recurring",a:"10–20% rev-share",b:"$5K–$25K/mo managed",c:"3–7% platform GMV"},
            ] : []),
            {d:"e& role",a:"Sales, billing, support",b:"Commercial front, hosting, Help AG",c:"Infra owner, GTM"},
            {d:"AIdeology role",a:"Build, SDD specs, train, blueprint",b:"Delivery, PS, managed services",c:"Architecture, build, royalty"},
            {d:"IP",a:"e& owns SDD specs and blueprints",b:"Joint / client-owned",c:"e& owns platform"},
          ].map((r,i)=><tr key={i}><td style={{...tdStyle,fontWeight:600,color:"#333"}}>{r.d}</td><td style={tdStyle}>{r.a}</td><td style={tdStyle}>{r.b}</td><td style={tdStyle}>{r.c}</td></tr>)}
        </tbody>
      </table>
    </div>

    {showPricing && <>
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
    </>}

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

    <SH id="platform-evolution-matrix">Platform evolution matrix</SH>
    <Note label="Same architecture · deeper capability">The platform does not get rebuilt for each segment. It starts with a fast SMB launch, then the P1 enterprise-readiness layer is deployed during SMB Wave 2: automation, compliance, auditability, RBAC and operational guardrails. Later enterprise and public-sector offers reuse the same platform foundations rather than creating a second architecture.</Note>
    <Card style={{padding:0,overflow:"visible",marginBottom:16}}>
      <div style={{position:"sticky",top:matrixStickyTop,zIndex:35,padding:"16px 20px",background:BRAND.lightGrey,borderBottom:`1px solid ${BRAND.border}`,borderTop:`1px solid ${BRAND.border}`,boxShadow:"0 8px 18px -16px rgba(17,17,17,0.35)"}}>
        <div style={{display:"grid",gridTemplateColumns:"1.4fr repeat(3, 1fr)",gap:12,alignItems:"center"}}>
          {[
            ["Roadmap","Three phases · same foundations · no rewrites"],
            ["P0 · 30 days","SMB platform · Customer Agent · self-service"],
            ["P1 · 90 days","Wave 2 layer · automation · compliance"],
            ["P2 · 180 days","Government · sovereign · high assurance"],
          ].map((p,i)=><div key={i}>
            <div style={{fontSize:10,fontWeight:700,color:i===0?BRAND.grey:BRAND.red,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:4}}>{p[0]}</div>
            <div style={{fontSize:12.5,fontWeight:600,color:BRAND.black,lineHeight:1.35}}>{p[1]}</div>
          </div>)}
        </div>
      </div>
      <div style={{overflowX:"auto",overflowY:"visible"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11.5,minWidth:920}}>
          <tbody>
            {[
              {group:"Scale & unit economics"},
              {c:"LLM Gateway",b:"Cost control · vendor independence · resilience",p0:"Multi-provider routing · virtual keys · basic budgets",p1:"Prompt versioning · semantic cache · A/B testing",p2:"Sovereign vLLM · regional routing · full model-call audit"},
              {c:"Idle & runtime strategy",b:"SMB unit economics when thousands of agents sit idle",p0:"Shared runtime pool for SMB tenants",p1:"Dedicated pod with scaling-to-zero",p2:"Kernel-sandboxed runtime · hibernation · cryptographic isolation"},
              {c:"Agent Template Instancer",b:"Self-service at scale · agent launch in hours",p0:"Provisioning service · queue · rollback · Helm templates",p1:"K8s Operator · signed OCI templates · blue/green upgrades",p2:"Third-party publishing · mandatory signing · central review"},
              {group:"Compliance & governance"},
              {c:"Trust Tiers framework",b:"One platform for SMB, Enterprise and Government",p0:"T1 logical multi-tenancy · ISO/SOC/NESA baseline",p1:"T1 + T2 · enterprise compliance selectable per tenant",p2:"T3 + T4 · NESA P1-P4 · ISO 42001 · HSM / air-gap"},
              {c:"Audit trail & guardrails",b:"Pass audits · reduce legal risk · enter public sector",p0:"Append-only audit log · PII redaction · gateway filter",p1:"Immutable event stream · jailbreak detection · policy versions",p2:"National-grade retention · evidence packs · classified redaction"},
              {group:"Observability & operations"},
              {c:"Unified observability",b:"Defensible SLAs · cost control · proactive support",p0:"Langfuse traces · Prometheus / Grafana · basic alerts",p1:"Distributed tracing · SLOs · tenant cost dashboards",p2:"Sovereign observability · regulator-ready dashboards"},
              {c:"Provisioning resilience",b:"Marketplace survives demand spikes",p0:"Worker pool · idempotency · healthcheck · rollback",p1:"K8s Operator · GitOps · Temporal workflows",p2:"Multi-cluster federation · regional failover · change control"},
              {group:"Sovereignty & agnosticism"},
              {c:"Cloud-agnostic & sovereign-ready",b:"Vendor leverage · public sector without rebuilds",p0:"Single managed K8s · open-source pieces self-hosted",p1:"Multi-cloud manifests · regional failover · Vault HA",p2:"OpenShift / RKE2 · HSM · air-gap · full data residency"},
            ].map((r,i)=>r.group?<tr key={i}>
              <td colSpan={5} style={{padding:"10px 14px",background:BRAND.lightGrey,borderTop:`1px solid ${BRAND.border}`,borderBottom:`1px solid ${BRAND.border}`,fontSize:10.5,fontWeight:700,color:BRAND.red,letterSpacing:"0.08em",textTransform:"uppercase"}}>{r.group}</td>
            </tr>:<tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,verticalAlign:"top"}}>
              <td style={{padding:"12px 14px",fontWeight:700,color:BRAND.black}}>{r.c}</td>
              <td style={{padding:"12px 14px",color:BRAND.grey,lineHeight:1.45}}>{r.b}</td>
              <td style={{padding:"12px 14px",color:BRAND.black,lineHeight:1.45,verticalAlign:"top"}}><div>{r.p0}</div><MaturityWidget level={1}/></td>
              <td style={{padding:"12px 14px",color:BRAND.black,lineHeight:1.45,verticalAlign:"top"}}><div>{r.p1}</div><MaturityWidget level={2}/></td>
              <td style={{padding:"12px 14px",color:BRAND.black,lineHeight:1.45,verticalAlign:"top"}}><div>{r.p2}</div><MaturityWidget level={3}/></td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <div style={{padding:"14px 18px",borderTop:`1px solid ${BRAND.border}`,display:"flex",gap:18,flexWrap:"wrap",alignItems:"center",background:BRAND.white}}>
        <span style={{fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.08em",textTransform:"uppercase"}}>Level of maturity</span>
        <span style={{display:"inline-flex",alignItems:"center",gap:8,fontSize:11.5,color:BRAND.grey}}><MaturityWidget level={1} compact/> minimum viable</span>
        <span style={{display:"inline-flex",alignItems:"center",gap:8,fontSize:11.5,color:BRAND.grey}}><MaturityWidget level={2} compact/> enterprise-ready</span>
        <span style={{display:"inline-flex",alignItems:"center",gap:8,fontSize:11.5,color:BRAND.grey}}><MaturityWidget level={3} compact/> sovereign / high-assurance</span>
      </div>
    </Card>

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
        {v:"teal",t:"SMB Marketplace",items:["Base platform live","Customer Agent in production","10–20 reference SMBs onboarded","First paid subscriptions active","Sales + Comms wave ready to start","Arabic/English quality benchmark approved"]},
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
/* FULL STACK — THE e& AI STACK                                 */
/* ════════════════════════════════════════════════════════════ */
const STACK_LAYERS = [
  {
    n:"6",
    name:"Customers & Distribution",
    tag:"Where AI meets revenue",
    color:"#E00800",
    summary:"The marketplace, sales force, partner channel, and e& invoice that put AI solutions into reach across e&'s 240M+ direct billing relationships globally — including 320K+ SMBs, enterprises and government clients in core markets.",
    owner:"e& (100%)",
    components:["SMB marketplace","e& sales force","e& invoice integration","Enterprise direct","Government tenders","Partner channel","Multi-OpCo expansion"],
    why:"e&'s unfair advantage: 240M+ direct billing relationships globally, telco trust and brand reach, plus tens of thousands of physical antenna sites and radio infrastructure assets across its markets; in core markets, 320K+ SMBs on monthly billing and zero-CAC add-ons to the existing e& invoice.",
  },
  {
    n:"5",
    name:"Agentic Applications",
    tag:"What customers actually buy",
    color:"#A8201A",
    summary:"End-to-end AI agents that own a business function — Customer, Sales, Comms, Finance, Ops, People — plus enterprise solutions and sovereign deployments. Future roadmap extends to physical-world edge connectivity: humanoid robots, autonomous drones, connected vehicles, IoT devices and smart infrastructure.",
    owner:"e& — agent IP under progressive build-then-transfer",
    components:["6 SMB agents","Tier 1 Adapted Agents","Tier 2 Custom AI","Tier 3 Sovereign / On-Prem","Contact Centre AI","Document Intelligence","Approval Orchestration","Partner agents (future)","Edge: humanoid robots · drones · vehicles (future)"],
    why:"Agents are the product. Everything below this layer is the platform that makes them possible. As e&'s physical network expands, the same agentic layer will extend into robots, drones, and connected devices.",
  },
  {
    n:"4",
    name:"Forge — AI Control Plane + Development",
    tag:"The durable platform IP",
    color:"#004B2E",
    isForge:true,
    summary:"The unified software layer that runs the AI business (control plane) and builds new AI fast (SDD). Forge connects compute, models, agents, customers, and billing into one operating system.",
    owner:"AIdeology IP · licensed to e&",
    pillars:[
      {
        title:"Operations · Control Plane",
        sub:"How Forge runs the AI business",
        color:"#004B2E",
        icon:"A",
        desc:"Every AI workload deployed, governed, observed and billed through one platform.",
        items:[
          {t:"Agent orchestration",d:"Multi-agent workflows, shared context, failover, human-in-loop gates"},
          {t:"LLM gateway & model router",d:"One API across Claude, GPT, Llama, sovereign models; cost / latency / compliance routing"},
          {t:"GPU & compute orchestration",d:"Sits above Open Innovation; tenant quotas, cost allocation, sovereign placement"},
          {t:"Billing & monetization",d:"Subscriptions, usage metering, marketplace invoicing, revenue share reporting"},
          {t:"Multi-tenancy",d:"Tenant isolation, onboarding, back office, provisioning at scale"},
          {t:"Connector management",d:"CRM, ERP, HR, finance, comms, payment, government systems"},
          {t:"Data & memory",d:"Vector DB, RAG, conversation memory, knowledge bases, data residency"},
          {t:"Governance & compliance",d:"RBAC, audit, PII masking, trust tiers SMB → Government, NESA / ISO / HSM"},
          {t:"Observability",d:"Traces, cost-per-agent, SLA dashboards, token usage, anomaly alerts"},
          {t:"Marketplace & template instancer",d:"Signed templates, blue/green upgrades, third-party publishing"},
          {t:"Idle & runtime strategy",d:"Shared pools, scale-to-zero, hibernation — compute only when working"},
          {t:"Edge & device orchestration",d:"Future: workload placement across cloud, edge nodes, e& devices, IoT"},
        ],
      },
      {
        title:"Development · Spec-Driven Build",
        sub:"How Forge builds new AI fast",
        color:"#E00800",
        icon:"B",
        desc:"Every new agent ships from a signed spec, reusing tested patterns and a proprietary library.",
        items:[
          {t:"SDD methodology",d:"Spec-first process: business outcome → signed implementation spec before code"},
          {t:"Solution blueprints",d:"Reusable templates for each agent type — Customer, Sales, Finance, etc."},
          {t:"Prompt libraries",d:"Tested, versioned prompt patterns for common business tasks"},
          {t:"Guardrail packs",d:"Pre-built safety, compliance and quality controls per use case"},
          {t:"Connector accelerators",d:"Pre-tested integrations for Salesforce, SAP, MOHRE, e& billing, etc."},
          {t:"Evaluation sets",d:"Test datasets and acceptance criteria for Arabic NLP, domain accuracy, compliance"},
          {t:"Agent builder studio",d:"Visual + code interface; exposed as self-service for enterprise teams (Phase 2)"},
          {t:"Acceptance test framework",d:"Every spec ships with named tests; no agent goes live without passing them"},
        ],
      },
    ],
  },
  {
    n:"3",
    name:"Model Layer",
    tag:"The AI intelligence",
    color:"#7A52F4",
    summary:"The models themselves — commercial APIs, open-source, and sovereign Arabic-tuned models — served on high-throughput inference and fine-tuning infrastructure.",
    owner:"Mixed: third-party APIs + e&-hosted sovereign models",
    components:["GPT-4o (Azure OpenAI)","Claude (Anthropic)","Llama · Falcon · Mistral","Sovereign Arabic-tuned models","vLLM · TGI · NVIDIA Triton","DeepSpeed · FSDP · LoRA · QLoRA","Model registry & versioning","STT / TTS voice pipelines"],
    why:"Models change every six months. The model layer must be swappable. Forge routes between providers without touching agent code.",
  },
  {
    n:"2",
    name:"GPU Orchestration",
    tag:"Compute on demand",
    color:"#185FA5",
    summary:"e&'s GPU orchestrator. Schedules, isolates, and serves GPU workloads — inference, training, fine-tuning — across e&'s sovereign compute estate. Orchestration partner TBD (shortlist includes run.ai, Open Innovation, SambaNova, Fluidstack, Vultr, and CoreWeave).",
    owner:"e&",
    components:["Kubernetes / Slurm job scheduling","Multi-tenant GPU isolation","Inference · training · fine-tuning","Auto-scaling & load balancing","Hardware abstraction (DGX, Dell, HPE, Supermicro)","Capacity management & tenant quotas"],
    why:"The GPU orchestrator turns raw hardware into a consumable, schedulable, billable service. Forge consumes capacity from it and maps every job back to a customer, agent and invoice line. Orchestration partner award is pending.",
  },
  {
    n:"1",
    name:"Infrastructure",
    tag:"The physical foundation",
    color:"#111111",
    summary:"The hardware, data centres, network, and devices that everything runs on — including e&'s edge and physical device footprint.",
    owner:"e& (100%)",
    components:["e& Data Centres · UAE × 3, Morocco, Hungary, PPF","NVIDIA DGX · Dell · HPE · Supermicro · H100 / B200","G42 / Core42 · Azure · AWS · OCI","VAST Data · DDN · Pure FlashBlade storage","100GbE / InfiniBand networking","Qualcomm edge AI devices · 5G gateways · AI PCs","e& network: SIM, Toll Free 800, WhatsApp BSP, SMS","Physical e& devices: routers · IoT · cameras · kiosks (future)"],
    why:"e&'s deepest moat. No AI competitor has sovereign UAE data centres, a telco network, SIM identity, and a physical device footprint. Everything above is software. This layer is physical.",
  },
];

function StackLayerCard({L}) {
  return <div style={{display:"grid",gridTemplateColumns:"82px 1fr",border:`1px solid ${BRAND.border}`,background:BRAND.white,overflow:"hidden"}}>
    <div style={{background:L.color,color:BRAND.white,padding:"22px 14px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <div style={{fontSize:9.5,fontWeight:700,letterSpacing:"0.12em",opacity:0.8,textTransform:"uppercase"}}>Layer</div>
      <div style={{fontSize:32,fontWeight:700,fontFamily:BRAND.font,lineHeight:1,marginTop:2}}>{L.n}</div>
    </div>
    <div style={{padding:"18px 22px",display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:18,alignItems:"start"}}>
      <div>
        <div style={{fontSize:10.5,fontWeight:700,color:L.color,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:6}}>{L.tag}</div>
        <h4 style={{fontSize:18,fontWeight:700,color:"#111",margin:"0 0 8px",lineHeight:1.25}}>{L.name}</h4>
        <p style={{fontSize:12.5,color:"#666",lineHeight:1.6,margin:"0 0 10px"}}>{L.summary}</p>
        <div style={{fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",marginTop:10}}>Owner</div>
        <div style={{fontSize:11.5,color:"#111",fontWeight:600,marginTop:3}}>{L.owner}</div>
      </div>
      <div>
        <div style={{fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:8}}>Key components</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))",gap:"5px 14px",marginBottom:12}}>
          {L.components.map((c,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:7}}>
            <span style={{width:4,height:4,background:L.color,flexShrink:0,marginTop:6}}/>
            <span style={{fontSize:11.5,color:"#555",lineHeight:1.5}}>{c}</span>
          </div>)}
        </div>
        <div style={{paddingTop:10,borderTop:`1px solid ${BRAND.border}`,fontSize:11.5,color:"#555",lineHeight:1.55}}>
          <strong style={{color:"#111"}}>Why it matters: </strong>{L.why}
        </div>
      </div>
    </div>
  </div>;
}

function ForgeLayerCard({L}) {
  return <div style={{border:`2px solid ${BRAND.red}`,background:BRAND.white,overflow:"hidden",boxShadow:"0 12px 28px -18px rgba(224,8,0,0.45)"}}>
    <div style={{background:"linear-gradient(135deg, #0a0a0a 0%, #1c1c1c 50%, #2a0808 100%)",color:BRAND.white,padding:"22px 26px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:BRAND.continuum}}/>
      <div style={{display:"grid",gridTemplateColumns:"100px 1fr auto",gap:24,alignItems:"center"}}>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:9.5,fontWeight:700,letterSpacing:"0.14em",opacity:0.65,textTransform:"uppercase"}}>Layer</div>
          <div style={{fontSize:48,fontWeight:700,fontFamily:BRAND.font,lineHeight:1,color:BRAND.white}}>{L.n}</div>
        </div>
        <div>
          <div style={{fontSize:11,fontWeight:700,color:BRAND.red,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>{L.tag}</div>
          <h3 style={{fontSize:24,fontWeight:700,color:BRAND.white,margin:"0 0 8px",lineHeight:1.15}}>{L.name}</h3>
          <p style={{fontSize:13,color:"rgba(255,255,255,0.78)",lineHeight:1.55,margin:0,maxWidth:680}}>{L.summary}</p>
        </div>
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,borderBottom:`1px solid ${BRAND.border}`}}>
      {L.pillars.map((P,i)=><div key={i} style={{padding:"20px 22px",borderRight:i===0?`1px solid ${BRAND.border}`:"none",background:i===0?"#FAFAFA":BRAND.white}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <span style={{width:32,height:32,background:P.color,color:BRAND.white,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700,fontFamily:BRAND.font,flexShrink:0}}>{P.icon}</span>
          <div>
            <div style={{fontSize:9.5,fontWeight:700,color:P.color,letterSpacing:"0.08em",textTransform:"uppercase"}}>{P.sub}</div>
            <div style={{fontSize:15,fontWeight:700,color:"#111",lineHeight:1.2}}>{P.title}</div>
          </div>
        </div>
        <p style={{fontSize:12,color:"#666",lineHeight:1.6,margin:"0 0 12px"}}>{P.desc}</p>
        <div>
          {P.items.map((it,j)=><div key={j} style={{padding:"7px 0",borderTop:j===0?`1px solid ${BRAND.border}`:"none",borderBottom:j<P.items.length-1?`1px solid ${BRAND.border}`:"none"}}>
            <div style={{display:"grid",gridTemplateColumns:"150px 1fr",gap:10,alignItems:"start"}}>
              <span style={{fontSize:11.5,fontWeight:700,color:"#111",lineHeight:1.35}}>{it.t}</span>
              <span style={{fontSize:11,color:"#777",lineHeight:1.5}}>{it.d}</span>
            </div>
          </div>)}
        </div>
      </div>)}
    </div>
    <div style={{padding:"14px 24px",background:BRAND.lightGrey}}>
      <div style={{fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:4}}>Owner</div>
      <div style={{fontSize:12,color:"#111",fontWeight:600}}>{L.owner}</div>
    </div>
  </div>;
}

function ForgeTwoPillarsCard() {
  const pillars = [
    {
      title:"Operations · Control Plane",
      sub:"Run the AI business",
      color:"#004B2E",
      bg:"#F0FDF4",
      question:"What is the control plane?",
      answer:"The operational brain. It decides which model handles each request, on which GPU, for which customer, with what guardrails, billed at what rate. It runs 24/7 in production once an agent is live.",
      list:[
        "Routes every model call across providers and regions",
        "Provisions agents per tenant in hours, not weeks",
        "Meters usage and turns it into invoices",
        "Tracks every interaction with traces, costs, SLAs",
        "Enforces compliance from logical multi-tenancy to NESA P4",
        "Coordinates multi-agent workflows with human-in-loop gates",
      ],
    },
    {
      title:"Development · Spec-Driven Build (SDD)",
      sub:"Build new AI fast",
      color:BRAND.red,
      bg:"#FFF5F5",
      question:"What is SDD inside Forge?",
      answer:"The build toolkit embedded in Forge. Every new agent starts from a structured spec — inputs, outputs, guardrails, tests — and reuses blueprints, prompt patterns, connector accelerators and evaluation sets that are already in the Forge library.",
      list:[
        "Signed specs before code — no ambiguity, no rework",
        "Reusable blueprints for each agent type",
        "Versioned prompt libraries and guardrail packs",
        "Pre-tested connector accelerators (Salesforce, SAP, e& billing, MOHRE…)",
        "Evaluation sets with Arabic NLP and domain benchmarks",
        "Self-service agent builder for e& and enterprise teams (Phase 2)",
      ],
    },
  ];
  return <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(360px, 1fr))",gap:14,marginBottom:18}}>
    {pillars.map((P,i)=><div key={i} style={{background:BRAND.white,border:`1px solid ${BRAND.border}`,borderTop:`3px solid ${P.color}`,overflow:"hidden"}}>
      <div style={{padding:"20px 22px",background:P.bg,borderBottom:`1px solid ${BRAND.border}`}}>
        <div style={{fontSize:10.5,fontWeight:700,color:P.color,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:5}}>{P.sub}</div>
        <h4 style={{fontSize:17,fontWeight:700,color:"#111",margin:0,lineHeight:1.25}}>{P.title}</h4>
      </div>
      <div style={{padding:"16px 22px",borderBottom:`1px solid ${BRAND.border}`}}>
        <div style={{fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:6}}>{P.question}</div>
        <p style={{fontSize:12.5,color:"#555",lineHeight:1.6,margin:0}}>{P.answer}</p>
      </div>
      <div style={{padding:"14px 22px 18px"}}>
        {P.list.map((it,j)=><div key={j} style={{display:"flex",gap:9,alignItems:"flex-start",padding:"7px 0",borderBottom:j<P.list.length-1?`1px solid ${BRAND.border}`:"none"}}>
          <span style={{width:18,height:18,background:P.color,color:BRAND.white,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0,marginTop:1}}>{j+1}</span>
          <span style={{fontSize:12,color:"#444",lineHeight:1.55}}>{it}</span>
        </div>)}
      </div>
    </div>)}
  </div>;
}

function StackExampleFlow() {
  const STEPS = [
    {l:"6",where:"Customers & Distribution",who:"SMB owner subscribes",what:"Selects a Customer Agent on the e& marketplace at AED 285 / month. One-click checkout on the e& account."},
    {l:"5",where:"Agentic Applications",who:"Customer Agent goes live",what:"Starts answering WhatsApp messages and phone calls in Arabic and English, books appointments, escalates to humans."},
    {l:"4B",where:"Forge · Development",who:"SDD blueprint reused",what:"Agent was instantiated from a tested Customer Agent blueprint — prompts, guardrails, connectors and evaluation tests already proven on hundreds of SMBs."},
    {l:"4A",where:"Forge · Operations",who:"Control plane orchestrates",what:"Provisions the tenant, wires WhatsApp BSP + e& telephony connectors, applies T1 compliance, starts metering token + GPU usage."},
    {l:"3",where:"Model Layer",who:"LLM router picks the model",what:"For each message, Forge picks the best model — Claude for reasoning, GPT for speed, Llama on Open Innovation for sovereign data."},
    {l:"2",where:"Open Innovation",who:"GPU orchestrator schedules",what:"Submits the inference job on an available H100 GPU with the right tenant quota and priority."},
    {l:"1",where:"Infrastructure",who:"e& Data Centre runs the workload",what:"GPU runs in UAE sovereign DC. Network delivers the response in 1.2 seconds. Data never leaves UAE."},
    {l:"6",where:"Customers & Distribution",who:"e& invoice bills usage",what:"AED 285 added to the SMB's monthly e& bill. Revenue share computed automatically. Customer sees one invoice for telco + AI."},
  ];
  return <Card style={{padding:0,overflow:"hidden"}}>
    <div style={{padding:"18px 22px",borderBottom:`1px solid ${BRAND.border}`,background:BRAND.lightGrey}}>
      <h4 style={{fontSize:15,fontWeight:700,color:"#111",margin:"0 0 4px"}}>Live example: an SMB subscribes to a Customer Agent</h4>
      <p style={{fontSize:12,color:"#777",lineHeight:1.55,margin:0}}>A single customer interaction traverses every layer of the stack — invisible to the customer, orchestrated by Forge.</p>
    </div>
    <div>
      {STEPS.map((s,i)=><div key={i} style={{display:"grid",gridTemplateColumns:"68px 210px 1fr",borderBottom:i<STEPS.length-1?`1px solid ${BRAND.border}`:"none",alignItems:"stretch"}}>
        <div style={{background:s.l.startsWith("4")?BRAND.red:"#111",color:BRAND.white,display:"flex",alignItems:"center",justifyContent:"center",padding:"14px 0"}}>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:8,fontWeight:700,letterSpacing:"0.1em",opacity:0.7,textTransform:"uppercase"}}>L</div>
            <div style={{fontSize:s.l.length>1?15:18,fontWeight:700,fontFamily:BRAND.font,lineHeight:1}}>{s.l}</div>
          </div>
        </div>
        <div style={{padding:"14px 16px",borderRight:`1px solid ${BRAND.border}`}}>
          <div style={{fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:3}}>{s.where}</div>
          <div style={{fontSize:12.5,fontWeight:700,color:"#111",lineHeight:1.3}}>{s.who}</div>
        </div>
        <div style={{padding:"14px 18px",fontSize:12,color:"#555",lineHeight:1.55,display:"flex",alignItems:"center"}}>
          {s.what}
        </div>
      </div>)}
    </div>
  </Card>;
}

function StackOwnershipTable() {
  const ROWS = [
    {l:"6",n:"Customers & Distribution",own:"e& (100%)",note:"Customer relationship, brand, billing, support"},
    {l:"5",n:"Agentic Applications",own:"e&",note:"Delivered agent IP transfers to e& under the build-then-transfer terms"},
    {l:"4",n:"Forge — Control Plane + SDD",own:"AIdeology IP · licensed to e&",note:"Platform IP retained under partnership agreement"},
    {l:"3",n:"Model Layer",own:"Mixed (API + self-hosted)",note:"Provider-agnostic by design; swappable"},
    {l:"2",n:"Open Innovation — GPU Orch.",own:"e&",note:"e&'s GPU orchestrator; Forge consumes capacity from it"},
    {l:"1",n:"Infrastructure",own:"e& (100%)",note:"Data centres, GPUs, network, edge, devices"},
  ];
  return <Card style={{padding:0,overflow:"hidden"}}>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
      <thead>
        <tr style={{background:BRAND.lightGrey}}>
          {["Layer","Name","Ownership","Notes"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 16px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {ROWS.map((r,i)=><tr key={i} style={{borderBottom:i<ROWS.length-1?`1px solid ${BRAND.border}`:"none",background:r.l==="4"?"#FFF5F5":"transparent"}}>
          <td style={{padding:"14px 16px",fontWeight:700,color:r.l==="4"?BRAND.red:"#111",fontFamily:BRAND.font,fontSize:14,width:60}}>L{r.l}</td>
          <td style={{padding:"14px 16px",fontWeight:700,color:"#111"}}>{r.n}</td>
          <td style={{padding:"14px 16px",color:"#555",fontWeight:600}}>{r.own}</td>
          <td style={{padding:"14px 16px",color:"#777",lineHeight:1.5}}>{r.note}</td>
        </tr>)}
      </tbody>
    </table>
  </Card>;
}

function FullStackSection({showPricing=true}) {
  return <div style={{padding:"44px 0 0"}}>
    {/* ── COVER / PREAMBLE ─────────────────────────────────────── */}
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
      <Badge v="rose">Commercial Framework Agreement</Badge>
      <span style={{fontSize:12,color:"#888"}}>e& AI Networks & Solutions × AIdeology · v0.1 · Confidential</span>
    </div>
    <h2 style={{fontSize:38,fontWeight:700,color:"#111",lineHeight:1.05,margin:"0 0 14px",maxWidth:820}}>Commercial Framework Agreement</h2>
    <p style={{fontSize:15,color:"#555",lineHeight:1.65,maxWidth:860,marginBottom:14}}>
      This document sets out the proposed commercial framework governing the partnership between <strong style={{color:"#111"}}>e& AI Networks & Solutions</strong> ("<strong style={{color:"#111"}}>e&</strong>") and <strong style={{color:"#111"}}>AIdeology</strong> ("<strong style={{color:"#111"}}>AIdeology</strong>"). The purpose of the partnership is to build, transfer and commercialise a sovereign AI operating layer across e&'s global markets — delivered across three pillars: (i) an AI platform and agentic solutions for e&'s SMB customer base, (ii) custom enterprise and government AI deployments, and (iii) sovereign GPU infrastructure.
    </p>
    <p style={{fontSize:13.5,color:"#666",lineHeight:1.7,maxWidth:860,marginBottom:18}}>
      AIdeology will design, build and knowledge-transfer all platform components to e& over a defined engagement, following a build-then-transfer model under which e& progressively takes ownership of agents, platform operations and customer relationships. e& retains all commercial contracts with end customers and full control of the market relationship. The platform is built on e&-sovereign infrastructure, is Arabic- and English-native by design, and is intended to extend across e&'s operating companies without structural dependency on AIdeology beyond the transition period.
    </p>
    <div style={{height:4,width:200,background:BRAND.continuum,marginBottom:24}}/>

    <div style={{display:"flex",gap:32,flexWrap:"wrap",marginBottom:32}}>
      {[
        {v:"3 pillars",l:"Scope of engagement"},
        {v:"36 weeks",l:"Programme delivery"},
        {v:"$3.44M",l:"Pillar 01 fixed-fee envelope"},
        {v:"4 years",l:"Minimum partnership term"},
      ].map((s,i)=><div key={i}>
        <div style={{fontSize:26,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font}}>{s.v}</div>
        <div style={{fontSize:11,color:"#999",marginTop:2,letterSpacing:"0.06em",textTransform:"uppercase",fontWeight:700}}>{s.l}</div>
      </div>)}
    </div>

    {/* ── ARTICLE 1 · DEFINITIONS ──────────────────────────────── */}
    <SH>Article 1 · Definitions</SH>
    <Card>
      <div style={{display:"grid",gridTemplateColumns:"180px 1fr",gap:"12px 18px",fontSize:12.5,color:"#444",lineHeight:1.65}}>
        {[
          ["Agreement","This Commercial Framework Agreement, including any annexes, schedules and statements of work executed under it."],
          ["AIdeology","The platform builder and delivery counterparty under this Agreement."],
          ["e&","e& AI Networks & Solutions, the contracting entity within the e& Group."],
          ["Forge","AIdeology's proprietary agentic intelligence platform — the AI control plane and developer plane described in Article 4."],
          ["SDD","Solution Design Document — the structured specification produced before every agent build."],
          ["Agent IP","Source code, prompts, workflows, fine-tunes, evaluation sets and tenant configurations of a deployed agentic solution. Transfers to e& under Article 10."],
          ["Platform IP","Forge orchestration, governance, multi-cloud / multi-LLM gateway and supporting libraries. Remains AIdeology property; e& licensed under Article 10."],
          ["Pillar 01","The SMB AI marketplace programme defined in Article 5."],
          ["Pillar 02","Enterprise & Government tiered solutions defined in Article 6."],
          ["Pillar 03","Sovereign GPU infrastructure scope referenced in Article 7."],
          ["Wave","A delivery increment in the Pillar 01 schedule, each with named acceptance criteria."],
          ["OpCo","An e& operating company outside the UAE entity (e.g. Saudi, Morocco, Egypt, Kuwait)."],
        ].map(([k,v],i)=><Fragment key={i}>
          <div style={{fontWeight:700,color:"#111"}}>{k}</div>
          <div>{v}</div>
        </Fragment>)}
      </div>
    </Card>

    {/* ── ARTICLE 2 · SCOPE — THREE PROPOSITIONS ──────────────── */}
    <SH>Article 2 · Scope of engagement — three propositions</SH>
    <Note label="Three propositions, one engagement">
      AIdeology delivers three concurrent propositions under this Agreement: (A) the build and launch of agentic solutions across Pillars 01 and 02; (B) an Agentic Centre of Excellence inside e&; and (C) a licence to operate the Forge platform across the e& footprint.
    </Note>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:12,marginBottom:18}}>
      {[
        {k:"A",t:"Build & Launch",d:"Six agentic solutions launched in 90-day waves, expanding coverage from SMB to Enterprise to Government on a single agentic stack.",o:"Time-to-market: live agents inside 90 days, with the next wave already in build. e& moves up-market on the same architecture.",own:"Agent IP transfers to e& after each wave; full agent catalogue extensible across the OpCo footprint.",role:"Design and build the first waves; transition lead delivery to e& Squads from Wave 3 onwards."},
        {k:"B",t:"Centre of Excellence",d:"AIdeology stands up e&'s Agentic Centre of Excellence — Squads trained on the full design and build lifecycle, with end-to-end IP transfer.",o:"e& owns the design, build and evolution of its own SDD architecture — no permanent dependency on AIdeology engineering.",own:"Squad capability, SDD playbooks, design authority and operational control of the agentic stack.",role:"Embed senior architects in the CoE; coach Squads through real builds, then step back to advisory."},
        {k:"C",t:"Forge Platform Licence",d:"A licence to Forge — AIdeology's agentic intelligence platform — giving e& the orchestration, governance and multi-cloud / multi-LLM layer that powers every agent.",o:"e& is never locked into a single cloud, model or vendor; new clouds, models and connectors plug into the same governed layer.",own:"Perpetual licence to operate Forge across the e& footprint.",role:"Maintain and evolve Forge; e& Squads consume the platform via versioned releases under a joint roadmap."},
      ].map((p,i)=><Card key={i} style={{padding:0,overflow:"hidden",marginBottom:0,borderTop:`3px solid ${BRAND.red}`}}>
        <div style={{padding:"18px 22px",borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
            <span style={{width:30,height:30,background:BRAND.red,color:BRAND.white,fontWeight:700,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>{p.k}</span>
            <span style={{fontSize:11,fontWeight:700,color:BRAND.grey,letterSpacing:"0.08em",textTransform:"uppercase"}}>Proposition {p.k}</span>
          </div>
          <h4 style={{fontSize:17,fontWeight:700,color:"#111",margin:0}}>{p.t}</h4>
        </div>
        <div style={{padding:"16px 22px"}}>
          <p style={{fontSize:12.5,color:"#555",lineHeight:1.6,marginBottom:0}}>{p.d}</p>
          {[["Outcome for e&",p.o],["What e& owns",p.own],["AIdeology role over time",p.role]].map(([l,v],j)=><div key={j} style={{paddingTop:10,marginTop:10,borderTop:`1px solid ${BRAND.border}`}}>
            <div style={{fontSize:10,fontWeight:700,color:BRAND.red,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:5}}>{l}</div>
            <div style={{fontSize:12,color:"#555",lineHeight:1.55}}>{v}</div>
          </div>)}
        </div>
      </Card>)}
    </div>

    {/* ── ARTICLE 3 · WHAT WILL BE BUILT ──────────────────────── */}
    <SH>Article 3 · What will be built</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:12,marginBottom:18}}>
      {[
        {t:"An e& AI operating layer — not point tools",d:"Customers will not be buying disconnected point tools. They will subscribe to an e& AI operating layer where each agentic solution owns a business function end-to-end. For SMB: Customer, Sales, Communications, Finance, Operations and People."},
        {t:"A reusable platform funded by the first solution",d:"The platform will include onboarding, tenant back office, identity, billing, analytics, connector management, observability and reusable SDD blueprints. The first solution funds and validates the base platform; later solutions reuse the same infrastructure."},
        {t:"P1 enterprise capability layer in Wave 2",d:"The SMB build also introduces the platform's P1 capability layer: enterprise-grade automation, compliance controls, audit trails, RBAC, guardrails and operational workflows. Deployed as part of Wave 2 so the platform is not only an SMB marketplace, but the foundation for future enterprise and regulated-market expansion."},
        {t:"Two solutions in parallel per wave after Wave 1",d:"The first Customer Agent launches with the platform foundation. After that, AIdeology builds two larger agentic solutions in parallel per wave because the heavy platform work is already in place."},
      ].map((x,i)=><Card key={i} style={{padding:18,marginBottom:0,borderLeft:`3px solid ${BRAND.red}`}}>
        <h4 style={{fontSize:14,fontWeight:700,color:"#111",margin:"0 0 8px"}}>{x.t}</h4>
        <p style={{fontSize:12.5,color:"#666",lineHeight:1.6,margin:0}}>{x.d}</p>
      </Card>)}
    </div>

    {/* ── ARTICLE 4 · THE e& AI STACK (INFOGRAPHICS PRESERVED) ── */}
    <SH>Article 4 · The e& AI stack — technical scope of the delivery</SH>
    <p style={{fontSize:13.5,color:"#666",lineHeight:1.7,maxWidth:860,marginBottom:18}}>
      The deliverables under this Agreement implement a single AI stack across six layers. <strong style={{color:"#111"}}>Forge</strong> sits in the middle as the AI control plane that operates the platform and the development layer that builds new AI fast. Below Forge: Open Innovation, the GPU orchestrator, sitting on top of e&'s sovereign infrastructure. Above Forge: the agents that customers actually buy, distributed through e&'s marketplace and invoice. This Article describes the <em>technical scope</em> of what AIdeology will deliver to e&; commercial terms appear from Article 5 onward.
    </p>

    <div style={{display:"flex",gap:32,flexWrap:"wrap",marginBottom:32}}>
      {[
        {v:"6 layers",l:"From silicon to customer"},
        {v:"1 platform",l:"Forge unifies the stack"},
        {v:"4 of 6 layers",l:"Owned by e&"},
        {v:"Cloud → Edge",l:"Future device orchestration"},
      ].map((s,i)=><div key={i}>
        <div style={{fontSize:26,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font}}>{s.v}</div>
        <div style={{fontSize:11,color:"#999",marginTop:2,letterSpacing:"0.06em",textTransform:"uppercase",fontWeight:700}}>{s.l}</div>
      </div>)}
    </div>

    <SH>4.1 · Layer by layer — top to bottom</SH>
    <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:18}}>
      {STACK_LAYERS.map(L => L.isForge ? <ForgeLayerCard key={L.n} L={L}/> : <StackLayerCard key={L.n} L={L}/>)}
    </div>

    <SH>4.2 · Inside Forge — operations and development as one platform</SH>
    <Note label="Two halves, one platform">
      Forge is not just an operations platform and it is not just a development toolkit. It is both — unified. The control plane runs the AI business day to day; the SDD blueprints, prompts, guardrails and evaluation sets make every new agent ship in weeks instead of months. They share the same data model, the same governance layer, and the same multi-tenant fabric.
    </Note>
    <ForgeTwoPillarsCard/>

    <SH>4.3 · End-to-end — one customer interaction across all six layers</SH>
    <StackExampleFlow/>

    <SH>4.4 · Layer ownership</SH>
    <StackOwnershipTable/>
    <Note label="Strategic message">
      e& owns Layers 1, 2, 5 and 6 outright — infrastructure, GPU orchestration, the agents themselves, and the entire customer relationship. Forge is the durable platform IP that AIdeology builds and licenses to e&. The stack is designed so every layer compounds: every new agent reuses the platform, every customer reuses the infrastructure, every workload reuses the compute orchestrator.
    </Note>

    {/* ── ARTICLE 5 · PILLAR 01 — SMB PROGRAMME ──────────────── */}
    {showPricing && <SH>Article 5 · Pillar 01 — SMB AI programme</SH>}
    {showPricing && <p style={{fontSize:13,color:"#666",lineHeight:1.65,maxWidth:860,marginBottom:18}}>
      Pillar 01 covers six SMB agents delivered in five waves over 30 weeks, plus Wave-5 platform hardening, security audit, formal handoff and three-year L3 platform support. Subscription tiers (Spark / Scale / Command, in AED per month) and GTM build cost per agent are set out below. Revenue share, payment milestones and IP transfer mechanics are at Articles 8, 9 and 10.
    </p>}
    {showPricing && <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:760}}>
          <thead><tr style={{background:BRAND.lightGrey,borderBottom:`1px solid ${BRAND.border}`}}>
            {["Agent","What it does","Subscription (AED / mo)","GTM build cost","Wave"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 16px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {[
              {n:"Customer",d:"Voice + WhatsApp + web in Arabic & English. Books, answers, escalates 24/7 on Toll Free 800 + e& BSP.",p:"199 / 349 / 999",c:"$1,250,000*",w:"Wave 1"},
              {n:"Sales",d:"Native CRM + lead scoring + AI follow-ups + proposal drafting. Syncs to Dynamics, Salesforce, HubSpot, Zoho.",p:"149 / 349 / 699",c:"$350,000",w:"Wave 2"},
              {n:"Comms",d:"Unified inbox + AI campaign builder across WhatsApp, SMS, email, Teams. e& Smart Messaging + BSP carrier-grade.",p:"99 / 299 / 649",c:"$350,000",w:"Wave 2"},
              {n:"Finance",d:"Invoices, e& Pay links, FTA VAT, AI reminders, cash-flow forecast. Syncs to QuickBooks, Xero, Business Central.",p:"199 / 449 / 849",c:"$300,000",w:"Wave 3"},
              {n:"Ops",d:"Tasks, approvals, SOP knowledge base, daily WhatsApp summaries. Syncs to Teams, SharePoint, Google Workspace.",p:"149 / 299 / 599",c:"$300,000",w:"Wave 3"},
              {n:"People",d:"WPS payroll, attendance via e& SIM, leave, onboarding, visa-expiry alerts, AI CV screening. Connects MOHRE / GDRFA.",p:"199 / 449 / 849",c:"$275,000",w:"Wave 4"},
              {n:"Platform hardening & 3-year L3 support",d:"Wave-1 platform foundation + Wave-5 security audit, pen test, runbooks, documentation, formal handoff and 3-year L3 platform support.",p:"—",c:"$618,621",w:"Wave 1 + 5"},
            ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,verticalAlign:"top"}}>
              <td style={{padding:"12px 16px",fontWeight:700,color:BRAND.black,whiteSpace:"nowrap"}}>{r.n}</td>
              <td style={{padding:"12px 16px",color:"#555",lineHeight:1.55}}>{r.d}</td>
              <td style={{padding:"12px 16px",color:"#444",whiteSpace:"nowrap"}}>{r.p}</td>
              <td style={{padding:"12px 16px",color:BRAND.red,fontWeight:700,whiteSpace:"nowrap"}}>{r.c}</td>
              <td style={{padding:"12px 16px",color:"#666",whiteSpace:"nowrap"}}>{r.w}</td>
            </tr>)}
            <tr style={{background:BRAND.lightGrey,borderTop:`2px solid ${BRAND.red}`}}>
              <td style={{padding:"14px 16px",fontWeight:700,color:"#111"}}>Total — all 6 agents + platform + 3-year support</td>
              <td style={{padding:"14px 16px",color:"#555",lineHeight:1.55}}>Full SMB programme delivered in 30 weeks; all six agents in production; platform handed over to e&.</td>
              <td style={{padding:"14px 16px"}}>—</td>
              <td style={{padding:"14px 16px",color:BRAND.red,fontWeight:700,fontSize:13.5,whiteSpace:"nowrap"}}>$3,443,621</td>
              <td style={{padding:"14px 16px",color:"#666",whiteSpace:"nowrap"}}>All waves</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{padding:"12px 16px",borderTop:`1px solid ${BRAND.border}`,fontSize:11,color:"#888",lineHeight:1.55}}>
        * The Customer Agent is bundled inside Wave 1 with the orchestration platform foundation — the first agent absorbs the platform investment every later agent reuses. Wave-5 hardening and 3-year L3 platform support are included in the totals.
      </div>
    </Card>}

    {/* ── ARTICLE 6 · PILLAR 02 — ENTERPRISE TIERS ───────────── */}
    {showPricing && <SH>Article 6 · Pillar 02 — Enterprise & Government tiers</SH>}
    {showPricing && <p style={{fontSize:13,color:"#666",lineHeight:1.65,maxWidth:860,marginBottom:18}}>
      Pillar 02 is sold per customer through e&'s enterprise account teams. Three tiers escalate from adapted SMB agents to fully sovereign on-prem multi-agent deployments. Hosting, connectivity and Tier-3 hardware are 100% e&; build and managed-service fees follow the revenue split at Article 8.
    </p>}
    {showPricing && <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:820}}>
          <thead><tr style={{background:BRAND.lightGrey,borderBottom:`1px solid ${BRAND.border}`}}>
            {["Tier","What e& sells","GTM cost per customer","GTM build cost","Managed service"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 16px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {[
              {t:"T1 — Adapted Agents",d:"The six SMB agents, enterprise-hardened for one customer: multi-branch routing, deep ERP / CRM / HIS connectors, RBAC, audit, domain fine-tuning. First agent live in 60 days.",c:"Agent #1: $60–80K · #2: $36–48K (−40%) · #3+: $30–40K (−50%)",b:"$0",m:"$5–15K / month"},
              {t:"T2 — Custom AI (e& cloud)",d:"Multi-agent solutions built from spec. Headline: AI Contact Centre. Catalogue: Document Intelligence, Approval Orchestration, Predictive Maintenance, Security & Compliance.",c:"$600K–$1,200K per use case (AI Contact Centre $1,100–1,360K)",b:"$0",m:"$12–45K / month"},
              {t:"T3 — Sovereign On-Prem",d:"Tier 2 deployed on the customer's site — air-gap capable, e& Reference Architecture Certified hardware, customer-owned keys.",c:"AIdeology build $1,200K–$2M · Hardware at cost (HPC RA library)",b:"$0",m:"$25–60K / month"},
            ].map((r,i)=><tr key={i} style={{borderBottom:i<2?`1px solid ${BRAND.border}`:"none",verticalAlign:"top"}}>
              <td style={{padding:"12px 16px",fontWeight:700,color:BRAND.black,whiteSpace:"nowrap"}}>{r.t}</td>
              <td style={{padding:"12px 16px",color:"#555",lineHeight:1.55}}>{r.d}</td>
              <td style={{padding:"12px 16px",color:"#444",lineHeight:1.55}}>{r.c}</td>
              <td style={{padding:"12px 16px",color:BRAND.red,fontWeight:700,whiteSpace:"nowrap"}}>{r.b}</td>
              <td style={{padding:"12px 16px",color:"#444",whiteSpace:"nowrap"}}>{r.m}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <div style={{padding:"12px 16px",borderTop:`1px solid ${BRAND.border}`,fontSize:11,color:"#888",lineHeight:1.55}}>
        Hosting, connectivity and Tier-3 hardware are 100% e& — full margin retained by e& on top of the build and managed-service fees.
      </div>
    </Card>}

    {/* ── ARTICLE 7 · PILLAR 03 — GPUaaS REFERENCE ──────────── */}
    <SH>Article 7 · Pillar 03 — Sovereign GPU infrastructure</SH>
    <p style={{fontSize:13,color:"#666",lineHeight:1.65,maxWidth:860,marginBottom:18}}>
      Pillar 03 covers AIdeology's infrastructure consulting services for e&'s sovereign GPU programme. This includes designing NVIDIA Enterprise Reference Architectures for on-premises AI PODs and advising on GPU fulfilment across e&'s planned 100 MW+ data centre portfolio. The GPUaaS commercial model (compute billing, orchestration, multi-tenancy) is governed by a separate Statement of Work executed under this Agreement.
    </p>

    {/* --- 7.1 · Reference Architecture Design --- */}
    <SH>7.1 · Reference Architecture design — POD consulting</SH>
    <p style={{fontSize:13,color:"#666",lineHeight:1.65,maxWidth:860,marginBottom:18}}>
      AIdeology will design NVIDIA Enterprise Reference Architectures for on-premises AI PODs tailored to e&'s sovereign infrastructure requirements. Each engagement produces a validated, deployment-ready architecture covering cluster topology selection, SU sizing, network fabric design, storage tier selection, OEM vendor evaluation, thermal and power modelling, and a full Bill of Materials submitted to NVIDIA's Design Review Board.
    </p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:12,marginBottom:14}}>
      {[
        {t:"Cluster topology",d:"Selection of the optimal NVIDIA pattern — RTX PRO, HGX, or NVL72 — based on workload mix, budget, and site constraints."},
        {t:"SU sizing & fabric design",d:"Scalable Unit count, multi-rail spine-leaf or fat-tree fabric, InfiniBand / Spectrum-X selection, and cabling plan."},
        {t:"OEM vendor evaluation",d:"Comparative assessment across Dell, Cisco, HPE, Lenovo, and Supermicro against e&'s procurement and support requirements."},
        {t:"Full BoM & DRB submission",d:"Binding Bill of Materials covering GPU servers, networking, storage, rack/PDU, optics — submitted to NVIDIA Design Review Board for validation."},
        {t:"Thermal & power modelling",d:"Per-rack power draw, cooling requirements at target PUE, and facility-level capacity planning per data centre site."},
        {t:"Deployment runbook",d:"Step-by-step commissioning playbook: rack-and-stack, burn-in, fabric bringup, orchestrator install, acceptance tests."},
      ].map((p,i)=><Card key={i} style={{padding:18,marginBottom:0,borderTop:`3px solid ${BRAND.red}`}}>
        <h4 style={{fontSize:14,fontWeight:700,color:"#111",margin:"0 0 6px"}}>{p.t}</h4>
        <p style={{fontSize:12,color:"#666",lineHeight:1.55,margin:0}}>{p.d}</p>
      </Card>)}
    </div>

    {showPricing && <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{padding:"22px 26px",borderBottom:`1px solid ${BRAND.border}`}}>
        <Badge v="rose">Tiered pricing</Badge>
        <h4 style={{fontSize:14,fontWeight:700,color:"#111",margin:"10px 0 6px"}}>Reference Architecture design fee — per POD</h4>
        <p style={{fontSize:12,color:"#777",lineHeight:1.6,margin:0}}>Fee scales with POD complexity: fabric tiers, storage islands, and NVIDIA DRB review depth increase non-linearly with GPU count.</p>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["POD size","Nodes / GPUs","Typical use case","RA design fee (USD)"].map((h,i)=><th key={i} style={{textAlign:i===3?"right":"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {size:"Department pilot",nodes:"4 nodes / 32 GPUs",use:"Single enterprise workload, bank AI contact centre",fee:"$25,000 – $40,000"},
            {size:"Half pod",nodes:"16 nodes / 128 GPUs",use:"Enterprise training + multi-tenant inference",fee:"$50,000 – $75,000"},
            {size:"Standard pod",nodes:"32 nodes / 256 GPUs",use:"GPUaaS, sovereign AI factory, government",fee:"$75,000 – $120,000"},
            {size:"Multi-pod / campus",nodes:"128+ nodes / 1,024+ GPUs",use:"100 MW DC fill, frontier training, multi-country",fee:"$150,000 – $250,000"},
          ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,verticalAlign:"top"}}>
            <td style={{padding:"12px 14px",fontWeight:700,color:"#111"}}>{r.size}</td>
            <td style={{padding:"12px 14px",color:"#444",whiteSpace:"nowrap"}}>{r.nodes}</td>
            <td style={{padding:"12px 14px",color:"#555",lineHeight:1.45}}>{r.use}</td>
            <td style={{padding:"12px 14px",textAlign:"right",color:BRAND.red,fontWeight:700,fontFamily:BRAND.font,whiteSpace:"nowrap"}}>{r.fee}</td>
          </tr>)}
        </tbody>
      </table>
    </Card>}

    {/* --- 7.2 · Data Centre GPU Fulfilment Advisory --- */}
    <SH>7.2 · Data centre GPU fulfilment advisory — 100 MW programme</SH>
    <p style={{fontSize:13,color:"#666",lineHeight:1.65,maxWidth:860,marginBottom:18}}>
      AIdeology will provide strategic consulting to assist e& in planning and populating its planned 100 MW+ data centre portfolio with GPU infrastructure. The engagement covers multi-site capacity planning, phased GPU procurement strategy, vendor negotiation support, power and cooling envelope modelling, and staged deployment coordination across e&'s entire DC footprint.
    </p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:12,marginBottom:14}}>
      {[
        {t:"Multi-site capacity planning",d:"Map GPU demand forecasts against e&'s DC footprint — UAE × 3, Morocco, Hungary, PPF — and allocate compute tiers to each facility based on sovereignty, latency, and customer requirements."},
        {t:"Phased procurement roadmap",d:"Stage-gated GPU procurement plan aligned with DC build timelines. Phase 1 land (pilot pod), Phase 2 expand (standard pods), Phase 3 fill (multi-pod campus). Avoids over-commitment ahead of demand."},
        {t:"Multi-vendor strategy",d:"Comparative evaluation of NVIDIA DGX, Dell PowerEdge, HPE Cray, Cisco UCS, Lenovo ThinkSystem, and Supermicro. Diversified sourcing to mitigate supply-chain risk and optimise commercial terms."},
        {t:"Power & cooling modelling",d:"Per-facility thermal envelope analysis at target PUE. Rack density planning, liquid cooling assessment for high-density nodes (NVL72), and utility contract alignment."},
        {t:"Vendor negotiation support",d:"Technical advisory during OEM procurement: SKU selection, volume discount structuring, support SLA negotiation, warranty terms, and delivery scheduling."},
        {t:"Deployment coordination",d:"Phased commissioning across multiple sites: rack-and-stack sequencing, fabric bringup, orchestrator integration, burn-in testing, and handoff to e& operations."},
      ].map((p,i)=><Card key={i} style={{padding:18,marginBottom:0,borderTop:`3px solid ${BRAND.red}`}}>
        <h4 style={{fontSize:14,fontWeight:700,color:"#111",margin:"0 0 6px"}}>{p.t}</h4>
        <p style={{fontSize:12,color:"#666",lineHeight:1.55,margin:0}}>{p.d}</p>
      </Card>)}
    </div>

    {showPricing && <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{padding:"22px 26px",borderBottom:`1px solid ${BRAND.border}`}}>
        <Badge v="rose">Programme fee</Badge>
        <h4 style={{fontSize:14,fontWeight:700,color:"#111",margin:"10px 0 6px"}}>100 MW GPU fulfilment advisory</h4>
        <p style={{fontSize:12,color:"#777",lineHeight:1.6,margin:0}}>Strategic engagement covering multi-site GPU fulfilment roadmap, procurement advisory, vendor negotiation support, and phased deployment planning across 5+ data centres.</p>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Component","Model","Fee range (USD)","Notes"].map((h,i)=><th key={i} style={{textAlign:i===2?"right":"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {comp:"Monthly advisory retainer",model:"2–3 senior architects",fee:"$40,000 – $60,000 / mo",note:"Ongoing architecture, design reviews, capacity planning, vendor coordination"},
            {comp:"DC fulfilment programme",model:"Fixed programme fee (6–12 months)",fee:"$350,000 – $600,000",note:"Multi-site GPU roadmap, procurement strategy, deployment coordination"},
            {comp:"Procurement advisory uplift",model:"% of hardware BoM",fee:"0.5% – 1.5%",note:"Success-based fee aligned to fulfilment milestones; subject to cap agreed per engagement"},
          ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,verticalAlign:"top"}}>
            <td style={{padding:"12px 14px",fontWeight:700,color:"#111"}}>{r.comp}</td>
            <td style={{padding:"12px 14px",color:"#444"}}>{r.model}</td>
            <td style={{padding:"12px 14px",textAlign:"right",color:BRAND.red,fontWeight:700,fontFamily:BRAND.font,whiteSpace:"nowrap"}}>{r.fee}</td>
            <td style={{padding:"12px 14px",color:"#555",lineHeight:1.45}}>{r.note}</td>
          </tr>)}
        </tbody>
      </table>
      <div style={{padding:"14px 26px",borderTop:`1px solid ${BRAND.border}`,background:BRAND.lightGrey}}>
        <div style={{fontSize:12,color:"#555",lineHeight:1.6}}>
          <strong style={{color:"#111"}}>Year 1 estimate:</strong> $750K – $1.5M depending on POD count and programme depth. Individual POD RA fees (7.1) are additional to the programme fee and retainer above.
        </div>
      </div>
    </Card>}

    <Note label="GPUaaS commercial model">
      GPU compute billing, orchestration platform, multi-tenancy, and metering are governed by a separate Statement of Work executed under this Agreement, aligned with NVIDIA Enterprise Reference Architectures and the HPC reference library. BoM, financing model and managed-service terms are documented in the GPUaaS section of the proposal and incorporated by reference.
    </Note>

    {/* ── ARTICLE 8 · COMMERCIAL HEADLINES ──────────────────── */}
    {showPricing && <SH>Article 8 · Commercial headlines</SH>}
    {showPricing && <Card style={{padding:0,overflow:"hidden"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
        <thead>
          <tr style={{background:BRAND.lightGrey,borderBottom:`1px solid ${BRAND.border}`}}>
            {["Topic","Headline"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 18px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            ["SMB revenue share","65 / 35 in Years 1–2 → 72 / 28 in Year 3 → 80 / 20 in Year 4+ (e& majority from Day 1; AIdeology share declines as the e& team ramps)."],
            ["Enterprise revenue split","60 / 40 AIdeology / e& on build and managed service. Hosting, connectivity and hardware 100% e&."],
            ["IP ownership","Agent IP transfers to e& after deployment plus knowledge transfer to evolve the agent. Platform IP (Forge) stays with AIdeology under a perpetual non-exclusive licence to e&."],
            ["Support tiers","L1 + L2 owned by e& from Day 1. L3 + L4 (platform engineering) owned by AIdeology — included in the fixed fee for Years 1–3."],
            ["Build-then-transfer","AIdeology builds and trains; e& progressively takes ownership. 2–3 e& engineers embedded in Year 1, 6–8 by Year 3, full ownership by Year 4."],
            ["OpCo expansion","After UAE proof, e& OpCo teams localise and deploy themselves — no second build fee per country. Saudi → Morocco → Egypt / Kuwait → rest."],
          ].map((r,i)=><tr key={i} style={{borderBottom:i<5?`1px solid ${BRAND.border}`:"none"}}>
            <td style={{padding:"14px 18px",fontWeight:700,color:BRAND.black,whiteSpace:"nowrap",verticalAlign:"top",minWidth:200}}>{r[0]}</td>
            <td style={{padding:"14px 18px",color:"#555",lineHeight:1.6}}>{r[1]}</td>
          </tr>)}
        </tbody>
      </table>
    </Card>}

    {/* --- 8.1 · Revenue share: declining model (mirrored from SMB page) --- */}
    {showPricing && <SH>8.1 · Revenue share — declining model</SH>}
    {showPricing && <Card style={{padding:0,overflow:"hidden",marginBottom:16}}>
      <div style={{padding:"22px 26px",borderBottom:`1px solid ${BRAND.border}`,display:"flex",alignItems:"center",gap:12}}>
        <span style={{width:30,height:30,background:BRAND.red,display:"flex",alignItems:"center",justifyContent:"center",color:BRAND.white,fontSize:14,fontWeight:700,borderRadius:0}}>%</span>
        <div>
          <h4 style={{fontSize:15,fontWeight:700,color:"#111",margin:0}}>Pillar 01 · Agentic AI platform — 65/35 declining revenue share</h4>
          <p style={{fontSize:12,color:"#777",margin:"4px 0 0"}}>Applies to SMB agentic AI subscriptions and managed-service revenue under Pillar 01. e& keeps the majority from Day 1; AIdeology's share declines as the e& team takes full ownership of the platform.</p>
        </div>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Period","e& share","AIdeology share","AIdeology responsibility","e& readiness"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {period:"Year 1–2",eShare:"65%",aShare:"35%",aResp:"Platform engineering, agent development, training & consulting",eReady:"2–3 FTE embedded, learning"},
            {period:"Year 3",eShare:"72%",aShare:"28%",aResp:"Platform maintenance, new integrations, knowledge transfer",eReady:"6–8 FTE, owns 80% of agent dev"},
            {period:"Year 4+",eShare:"80%",aShare:"20%",aResp:"Platform updates, security patches, new connectors (licensing model)",eReady:"8–10 FTE, owns entire operation"},
          ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,background:i===0?BRAND.lightGrey:"transparent"}}>
            <td style={{padding:"12px 14px",fontWeight:700,color:"#111"}}>{r.period}</td>
            <td style={{padding:"12px 14px",fontWeight:700,color:BRAND.red,fontFamily:BRAND.font,fontSize:16}}>{r.eShare}</td>
            <td style={{padding:"12px 14px",fontWeight:700,color:"#111",fontFamily:BRAND.font,fontSize:16}}>{r.aShare}</td>
            <td style={{padding:"12px 14px",color:"#555",lineHeight:1.45}}>{r.aResp}</td>
            <td style={{padding:"12px 14px",color:"#777",lineHeight:1.45}}>{r.eReady}</td>
          </tr>)}
        </tbody>
      </table>
      <div style={{padding:"18px 26px 10px",borderTop:`1px solid ${BRAND.border}`}}>
        <h4 style={{fontSize:14,fontWeight:700,color:"#111",margin:"0 0 6px"}}>Platform use after handover — e& built, partner-built and derivative solutions</h4>
        <p style={{fontSize:12,color:"#777",lineHeight:1.6,margin:0}}>
          AIdeology-created solutions follow the standard revenue share above. Genuinely new applications built by e& or third parties on top of the platform pay a platform royalty, with the rate declining as e& takes more operational ownership.
        </p>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Period","e& / partner-built new agent","Third-party partner agent","AIdeology derivative / replicated solution"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {period:"Year 1–2",built:"7% platform royalty",partner:"7% platform royalty + certification / support fee",derivative:"35% solution share"},
            {period:"Year 3",built:"5% platform royalty",partner:"5% platform royalty + certification / support fee",derivative:"28% solution share"},
            {period:"Year 4+",built:"3% platform royalty",partner:"3% platform royalty + certification / support fee",derivative:"20% solution share"},
          ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,background:i===0?BRAND.lightGrey:"transparent",verticalAlign:"top"}}>
            <td style={{padding:"12px 14px",fontWeight:700,color:"#111"}}>{r.period}</td>
            <td style={{padding:"12px 14px",fontWeight:700,color:BRAND.red,lineHeight:1.45}}>{r.built}</td>
            <td style={{padding:"12px 14px",fontWeight:700,color:BRAND.red,lineHeight:1.45}}>{r.partner}</td>
            <td style={{padding:"12px 14px",fontWeight:700,color:"#111",lineHeight:1.45}}>{r.derivative}</td>
          </tr>)}
        </tbody>
      </table>
      <div style={{padding:"14px 26px",borderTop:`1px solid ${BRAND.border}`,background:BRAND.lightGrey}}>
        <div style={{fontSize:12,color:"#555",lineHeight:1.6}}>
          <strong style={{color:"#111"}}>Important distinction:</strong> e& and third-party partners may build genuinely new applications on the platform and pay only the platform royalty. Any application that reuses, adapts, replicates, or derives from AIdeology-created agents, workflows, prompts, blueprints, connectors, evaluation data, or orchestration logic is treated as an AIdeology solution and follows the standard solution revenue share.
        </div>
      </div>
    </Card>}

    {/* --- 8.2 · Build · Transfer · Partner philosophy --- */}
    {showPricing && <SH>8.2 · Build · Transfer · Partner</SH>}
    {showPricing && <Note label="Build · Transfer · Partner">
      AIdeology will not be a permanent vendor. The engagement is designed as a three-phase transition: full-service build, progressive knowledge transfer, and a long-term platform partnership where e& owns day-to-day operations and AIdeology remains the innovation layer. Commercial support pricing is included in the AIdeology fees section above.
    </Note>}

    {/* --- 8.3 · Platform support model --- */}
    {showPricing && <SH>8.3 · Platform support model</SH>}
    {showPricing && <Card style={{padding:0,overflow:"hidden",marginBottom:16}}>
      <div style={{padding:"22px 26px",borderBottom:`1px solid ${BRAND.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><Badge v="teal">4 tiers</Badge><span style={{fontSize:11.5,color:"#888"}}>L1 & L2 → e& · L3 & L4 → AIdeology</span></div>
        <h4 style={{fontSize:18,fontWeight:700,color:"#111",marginBottom:8}}>Platform support model</h4>
        <p style={{fontSize:12.5,color:"#777",lineHeight:1.6,maxWidth:860}}>
          AIdeology does not provide L1 or L2 support. e& owns the customer relationship at every touchpoint from Day 1. AIdeology provides the platform knowledge base, escalation decision trees, and troubleshooting guides so e& support teams can resolve issues independently. AIdeology focuses exclusively on L3 platform engineering and L4 innovation.
        </p>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Tier","Owner","Scope","Examples","SLA"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {tier:"L1",owner:"e& (100%)",scope:"Customer-facing triage",examples:"Login, billing, onboarding, UI navigation, 'is the service down?', FAQ-level agent questions",sla:"Per e& customer care SLA",color:"#185FA5"},
            {tier:"L2",owner:"e& (100%)",scope:"Technical support",examples:"Agent configuration, prompt tuning, connector failures, tenant debugging, integration errors, performance complaints, dashboard bugs",sla:"Per e& technical support SLA",color:"#185FA5"},
            {tier:"L3",owner:"AIdeology",scope:"Platform engineering",examples:"Orchestration engine bugs, memory layer issues, guardrail failures, Kubernetes/DB incidents, security patches, connector library bugs, platform releases",sla:"P1: 1h response / 4h fix · P2: 4h / 24h · P3: 1 day / next release",color:BRAND.red},
            {tier:"L4",owner:"AIdeology",scope:"Innovation & architecture",examples:"New agent development, platform architecture changes, market localisation, major feature design, model evaluation, complex integration architecture",sla:"Scoped per project",color:BRAND.red},
          ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,background:i<2?BRAND.lightGrey:"transparent"}}>
            <td style={{padding:"12px 14px"}}><span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:28,height:28,background:r.color,color:BRAND.white,fontSize:10,fontWeight:700}}>{r.tier}</span></td>
            <td style={{padding:"12px 14px",fontWeight:700,color:i<2?"#185FA5":BRAND.red}}>{r.owner}</td>
            <td style={{padding:"12px 14px",fontWeight:700,color:"#111"}}>{r.scope}</td>
            <td style={{padding:"12px 14px",color:"#666",fontSize:11.5,lineHeight:1.45}}>{r.examples}</td>
            <td style={{padding:"12px 14px",color:"#555",fontSize:11.5,lineHeight:1.45,whiteSpace:"pre-line"}}>{r.sla}</td>
          </tr>)}
        </tbody>
      </table>
      <div style={{padding:"16px 26px",background:"#FAFAFA",borderTop:`1px solid ${BRAND.border}`}}>
        <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:280}}>
            <div style={{fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:4}}>Escalation flow</div>
            <div style={{fontSize:12,color:"#555",lineHeight:1.5}}>SMB customer → e& L1 (triage) → e& L2 (technical) → AIdeology L3 (platform) → AIdeology L4 (architecture)</div>
          </div>
          <div style={{flex:1,minWidth:280}}>
            <div style={{fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:4}}>AIdeology provides to e&</div>
            <div style={{fontSize:12,color:"#555",lineHeight:1.5}}>Knowledge base, troubleshooting decision trees, escalation criteria, runbooks, and video library — so L1 and L2 never need AIdeology involvement.</div>
          </div>
        </div>
      </div>
    </Card>}

    {/* ── ARTICLE 9 · PAYMENT SCHEDULE & MILESTONES ─────────── */}
    {showPricing && <SH>Article 9 · Payment schedule & milestones</SH>}
    {showPricing && <Note label="Fixed-fee, milestone-based">
      Pillar 01 fees are paid on a fixed-fee, milestone basis. e& pays only when a wave passes its named acceptance criteria. Year 1–3 L3 platform support is bundled into the wave fees and the AIdeology revenue share, with no separate support invoice during the transition period.
    </Note>}
    {showPricing && <Card style={{padding:0,overflow:"hidden"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
        <thead><tr style={{background:BRAND.lightGrey,borderBottom:`1px solid ${BRAND.border}`}}>
          {["Milestone","Wave","Trigger event","Amount (USD)"].map((h,i)=><th key={i} style={{textAlign:i===3?"right":"left",padding:"12px 18px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h}</th>)}
        </tr></thead>
        <tbody>
          {[
            ["M1","Wave 1","SDD signed off + platform foundation kick-off (Week 4)","$250,000"],
            ["M2","Wave 1","Customer Agent in closed beta with 10+ SMBs (Week 10)","$500,000"],
            ["M3","Wave 1","Customer Agent GA on e& sovereign infrastructure (Week 12)","$500,000"],
            ["M4","Wave 2","Sales Agent + Comms Hub + P1 layer live (Week 18)","$700,000"],
            ["M5","Wave 3","Finance Agent + Ops Agent live (Week 24)","$600,000"],
            ["M6","Wave 4","People Agent live (Week 30)","$275,000"],
            ["M7","Wave 5","Security audit complete, runbooks delivered, formal handoff (Week 36)","$618,621"],
          ].map((r,i)=><tr key={i} style={{borderBottom:i<6?`1px solid ${BRAND.border}`:"none"}}>
            <td style={{padding:"12px 18px",fontFamily:"monospace",color:BRAND.red,fontWeight:700}}>{r[0]}</td>
            <td style={{padding:"12px 18px",color:"#444"}}>{r[1]}</td>
            <td style={{padding:"12px 18px",color:"#555",lineHeight:1.55}}>{r[2]}</td>
            <td style={{padding:"12px 18px",textAlign:"right",color:BRAND.red,fontWeight:700,fontFamily:BRAND.font,whiteSpace:"nowrap"}}>{r[3]}</td>
          </tr>)}
          <tr style={{background:BRAND.lightGrey,borderTop:`2px solid ${BRAND.red}`}}>
            <td colSpan={3} style={{padding:"14px 18px",fontWeight:700,color:"#111"}}>Pillar 01 — total fixed-fee envelope (all waves + 3-year L3 support)</td>
            <td style={{padding:"14px 18px",textAlign:"right",color:BRAND.red,fontWeight:700,fontSize:14,fontFamily:BRAND.font,whiteSpace:"nowrap"}}>$3,443,621</td>
          </tr>
        </tbody>
      </table>
    </Card>}
    {showPricing && <p style={{fontSize:11.5,color:"#888",lineHeight:1.55,marginTop:8,marginBottom:18}}>
      Pillar 02 fees are invoiced per enterprise opportunity under the Pillar 02 Statement of Work. Pillar 03 fees are governed by the separate GPUaaS Statement of Work. Invoices are payable net thirty (30) days from the trigger event being met and certified by e&.
    </p>}

    {/* ── ARTICLE 10 · IP OWNERSHIP & TRANSFER ──────────────── */}
    <SH>Article 10 · IP ownership & transfer</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:12,marginBottom:14}}>
      <Card style={{padding:18,marginBottom:0,borderLeft:`3px solid ${BRAND.red}`}}>
        <Badge v="rose">e& owns — Agent IP</Badge>
        <h4 style={{fontSize:14,fontWeight:700,color:"#111",margin:"10px 0 8px"}}>Transfers wave-by-wave; complete by end of Year 2</h4>
        <ul style={{margin:0,paddingLeft:18,fontSize:12.5,color:"#555",lineHeight:1.65}}>
          <li>Source code, prompts and workflows of each deployed agent</li>
          <li>Tenant data, fine-tunes and evaluation sets</li>
          <li>Customer-specific connectors and configurations</li>
          <li>Runbooks, on-call materials and incident playbooks</li>
        </ul>
      </Card>
      <Card style={{padding:18,marginBottom:0,borderLeft:`3px solid ${BRAND.red}`}}>
        <Badge v="rose">AIdeology owns — Platform IP (Forge)</Badge>
        <h4 style={{fontSize:14,fontWeight:700,color:"#111",margin:"10px 0 8px"}}>Perpetual non-exclusive licence to e&</h4>
        <ul style={{margin:0,paddingLeft:18,fontSize:12.5,color:"#555",lineHeight:1.65}}>
          <li>Forge orchestration engine, governance and policy layer</li>
          <li>Multi-cloud / multi-LLM gateway and routing fabric</li>
          <li>SDD methodology, blueprint library and accelerator packs</li>
          <li>Connector framework and observability stack</li>
        </ul>
      </Card>
    </div>

    {/* ── ARTICLE 11 · SUPPORT MODEL ─────────────────────────── */}
    <SH>Article 11 · Support model — L1 to L4</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
        <thead><tr style={{background:BRAND.lightGrey,borderBottom:`1px solid ${BRAND.border}`}}>
          {["Tier","Scope","Owner","Commercial"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 18px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h}</th>)}
        </tr></thead>
        <tbody>
          {[
            ["L1","Customer-facing support, account issues, basic agent operations","e&","Included in e&'s customer subscription / managed-service fees"],
            ["L2","Operational support, tenant configuration, connector troubleshooting","e&","Included in e&'s customer subscription / managed-service fees"],
            ["L3","Platform engineering, release support, runbook updates, connector compatibility","AIdeology","Bundled in Wave 1–5 fees for Years 1–3 · then covered by AIdeology revenue share"],
            ["L4","Architecture changes, security patches, model upgrades, framework evolution","AIdeology","Bundled in Wave 1–5 fees for Years 1–3 · then covered by AIdeology revenue share"],
          ].map((r,i)=><tr key={i} style={{borderBottom:i<3?`1px solid ${BRAND.border}`:"none"}}>
            <td style={{padding:"12px 18px",fontWeight:700,color:BRAND.red,whiteSpace:"nowrap"}}>{r[0]}</td>
            <td style={{padding:"12px 18px",color:"#555",lineHeight:1.55}}>{r[1]}</td>
            <td style={{padding:"12px 18px",color:"#111",fontWeight:600,whiteSpace:"nowrap"}}>{r[2]}</td>
            <td style={{padding:"12px 18px",color:"#666",lineHeight:1.55}}>{r[3]}</td>
          </tr>)}
        </tbody>
      </table>
    </Card>

    {/* ── ARTICLE 12 · BUILD-THEN-TRANSFER & OPCO ───────────── */}
    <SH>Article 12 · Build-then-transfer & OpCo expansion</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:12,marginBottom:14}}>
      {[
        {y:"Year 1",t:"Full service",d:"AIdeology is the primary development team. 2–3 e& engineers embedded for hands-on learning. Weekly knowledge-transfer sessions; joint code reviews and architecture decision records."},
        {y:"Year 2",t:"Transition",d:"e& team takes over 40–50% of development. AIdeology focuses on platform architecture, complex features and new agents. Agent IP transfer completed by end of Year 2."},
        {y:"Year 3",t:"Partnership",d:"e& owns the agents and day-to-day development. AIdeology becomes platform maintainer plus innovation partner."},
        {y:"Year 4+",t:"e& ownership",d:"Full ownership by e&. 8–10 trained e& FTE running the platform. AIdeology engagement is licensing plus new features by mutual agreement under the joint roadmap."},
      ].map((p,i)=><Card key={i} style={{padding:18,marginBottom:0,borderTop:`3px solid ${BRAND.red}`}}>
        <Badge v="rose">{p.y}</Badge>
        <h4 style={{fontSize:14,fontWeight:700,color:"#111",margin:"10px 0 6px"}}>{p.t}</h4>
        <p style={{fontSize:12.5,color:"#555",lineHeight:1.6,margin:0}}>{p.d}</p>
      </Card>)}
    </div>
    <Note label="OpCo expansion model">
      After UAE proof, e& OpCo teams (Saudi → Morocco → Egypt / Kuwait → rest) localise and deploy independently using the transferred localisation playbook and fine-tuning methodology. No second build fee per country. AIdeology supports as platform partner via Forge releases, not as paid implementation vendor.
    </Note>

    {/* ── ARTICLE 13 · TERM, TERMINATION & GENERAL ──────────── */}
    <SH>Article 13 · Term, termination & general clauses</SH>
    <Card>
      <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:"12px 18px",fontSize:12.5,color:"#444",lineHeight:1.65}}>
        {[
          ["Term","Four (4) year minimum partnership term commencing on the Effective Date. Auto-renews annually after Year 4 unless either party gives one hundred and eighty (180) days' written notice of non-renewal."],
          ["Termination for cause","Either party may terminate for material breach uncured for thirty (30) days after written notice. Agent IP delivered up to that point remains with e&; the Forge licence continues unless terminated for AIdeology's uncured material breach."],
          ["Termination for convenience","e& may terminate any wave that has not commenced on thirty (30) days' written notice; AIdeology is paid for work delivered and milestones earned. Fees for future, uncommenced waves are not payable."],
          ["Confidentiality","Each party will protect the other's confidential information with the same care it uses for its own, and at minimum with reasonable care. Obligation survives termination by five (5) years."],
          ["Data residency","All e& customer data is hosted on e&-sovereign infrastructure in the UAE during the term. Cross-border processing only where explicitly authorised by e& and the end customer."],
          ["Warranties","AIdeology warrants that deliverables will materially conform to the SDD acceptance criteria for ninety (90) days post-wave. Remedy is re-performance."],
          ["Liability cap","Each party's aggregate liability is capped at fees paid and payable in the twelve (12) months preceding the claim, except for IP indemnity, confidentiality breach, gross negligence and wilful misconduct."],
          ["IP indemnity","AIdeology indemnifies e& against third-party claims that the Platform IP or Agent IP infringes third-party rights, subject to standard exclusions (modifications by e&, combination with third-party software, etc.)."],
          ["Subcontracting","AIdeology may subcontract delivery work subject to e&'s prior written approval of the subcontractor. AIdeology remains liable for the acts and omissions of its subcontractors."],
          ["Assignment","Neither party may assign this Agreement without the other's written consent, save to an Affiliate undergoing reorganisation."],
          ["Governing law","[UAE federal law / DIFC / ADGM — to be confirmed by e& Legal]."],
          ["Dispute resolution","Good-faith negotiation between authorised representatives → executive escalation → arbitration under [DIAC / ICC] rules seated in [Dubai / Abu Dhabi]."],
        ].map(([k,v],i)=><Fragment key={i}>
          <div style={{fontWeight:700,color:"#111"}}>{k}</div>
          <div>{v}</div>
        </Fragment>)}
      </div>
    </Card>
    <Note label="Draft clauses — for legal review">
      Article 13 clauses are drafted from the commercial terms stated elsewhere in this proposal. Final clauses (including governing law, forum and any AED/USD currency mechanics) are subject to review and amendment by e& Legal and AIdeology Legal prior to signature.
    </Note>

    {/* ── ARTICLE 14 · NEXT STEPS ────────────────────────────── */}
    <SH>Article 14 · Next steps to signature</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
        <thead><tr style={{background:BRAND.lightGrey,borderBottom:`1px solid ${BRAND.border}`}}>
          {["#","Action","Owner","Timeline"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 18px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h}</th>)}
        </tr></thead>
        <tbody>
          {[
            ["1","Endorsement of the two-pillar engagement by e& Management — formal sponsorship of SMB + Enterprise programmes.","e& EXCO sponsor","Within 2 weeks"],
            ["2","Working session on Wave 1 SDD, infrastructure (G42 / Azure) and the embedded e& engineering team.","AIdeology + e& AI / Engineering","Within 4 weeks"],
            ["3","Identification of the first three enterprise / government anchor accounts for Tier 1 / Tier 2 / Tier 3 deployments.","e& Enterprise account team","Within 4 weeks"],
            ["4","Final review and signature of this Commercial Framework Agreement.","e& Legal + AIdeology Legal","Within 6 weeks"],
            ["5","Mobilisation of the Wave 1 team within fourteen (14) days of signature; platform MVP and Customer Agent in production within twelve (12) weeks.","AIdeology delivery","On signature"],
          ].map((r,i)=><tr key={i} style={{borderBottom:i<4?`1px solid ${BRAND.border}`:"none"}}>
            <td style={{padding:"12px 18px",fontFamily:"monospace",color:BRAND.red,fontWeight:700}}>{r[0]}</td>
            <td style={{padding:"12px 18px",color:"#555",lineHeight:1.55}}>{r[1]}</td>
            <td style={{padding:"12px 18px",color:"#111",fontWeight:600}}>{r[2]}</td>
            <td style={{padding:"12px 18px",color:"#666",whiteSpace:"nowrap"}}>{r[3]}</td>
          </tr>)}
        </tbody>
      </table>
    </Card>

    {/* ── SIGNATURES ────────────────────────────────────────── */}
    <SH>Signatures</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:24,marginBottom:24}}>
      {[
        {p:"For and on behalf of e& AI Networks & Solutions"},
        {p:"For and on behalf of AIdeology"},
      ].map((s,i)=><Card key={i} style={{padding:24,marginBottom:0}}>
        <div style={{fontSize:11,fontWeight:700,color:BRAND.red,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:14}}>{s.p}</div>
        {["Name","Title","Date","Signature"].map((l,j)=><div key={j} style={{borderBottom:`1px solid ${BRAND.border}`,padding:"22px 0 8px",fontSize:11,color:"#888",letterSpacing:"0.04em",textTransform:"uppercase",fontWeight:600}}>{l}</div>)}
      </Card>)}
    </div>

    <Note label="Confidentiality">
      This Commercial Framework Agreement and its annexes are commercially confidential between e& AI Networks & Solutions and AIdeology and are exchanged for the sole purpose of evaluating and executing the engagement described above.
    </Note>
  </div>;
}

/* ════════════════════════════════════════════════════════════ */
/* ECOSYSTEM */
/* ════════════════════════════════════════════════════════════ */
const ECOSYSTEM_LAYERS = [
  {k:"01",t:"Market owner",n:"e&",d:"Customers · channels · billing · account control",items:["SMB base","Enterprise accounts","Government access","OpCo expansion"]},
  {k:"02",t:"Platform builder",n:"AIdeology",d:"SDD · agent factory · delivery system",items:["Agent blueprints","Spec-driven delivery","Core platform","Quality governance"]},
  {k:"03",t:"Compute layer",n:"e& DCs · Core42 · NVIDIA · OEMs",d:"GPUaaS · sovereign hosting · reference architectures",items:["RTX PRO","HGX","NVL72","Dell · Cisco · HPE · Lenovo · Supermicro"]},
  {k:"04",t:"Model layer",n:"OpenAI · Anthropic · Google · open-source",d:"Model routing by cost, latency, risk and task",items:["Premium LLMs","Cost models","Open-source","Customer models"]},
  {k:"05",t:"Data layer",n:"Customer systems · CRM · ERP · vertical software",d:"The business context that makes agents useful",items:["Salesforce","Dynamics","Booking systems","Industry tools"]},
  {k:"06",t:"Developer layer",n:"AIdeology · e& · partners",d:"Reusable solutions built once and localised many times",items:["Core team","e& platform team","Certified partners","Vertical developers"]},
  {k:"07",t:"Go-to-market layer",n:"e& B2B · OpCos · SI partners",d:"Packaging, sales, onboarding and managed service",items:["Bundles","Channel enablement","Customer onboarding","Support"]},
  {k:"08",t:"Customer layer",n:"SMB · Enterprise · Government",d:"Adopt agents, consume compute, fund expansion",items:["Monthly agents","Custom builds","Sovereign AI","GPUaaS"]},
];

const ECOSYSTEM_ROLES = [
  ["e&","Own demand","Customer base · sales teams · contracts · billing"],
  ["AIdeology","Own product method","SDD · templates · agent roadmap · delivery quality"],
  ["Core42 / G42","Own sovereign AI cloud option","GPU capacity · regulated hosting · UAE AI credibility"],
  ["NVIDIA","Own reference stack","Enterprise RAs · NIM · AI Enterprise · GPU architecture"],
  ["OEMs","Own hardware BoM","Dell · Cisco · HPE · Lenovo · Supermicro validated designs"],
  ["LLM vendors","Own model choice","OpenAI · Anthropic · Google · Cohere · open-source"],
  ["System integrators","Own rollout capacity","Implementation · migration · local delivery support"],
  ["Vertical software partners","Own industry connectors","Restaurants · clinics · real estate · finance · retail"],
  ["Certified developers","Own long-tail supply","New templates · connectors · localisation · maintenance"],
  ["Customers","Own use cases and data","Workflows · approvals · integrations · success metrics"],
];

const SCALE_VELOCITY_STAGES = [
  {v:"10–30%",t:"Individual velocity",d:"Copilot-style assistants improve personal output.",m:"Code completion · drafts · summaries"},
  {v:"60–80%",t:"Agentic velocity",d:"Specialised agents complete contained tasks.",m:"Tests · bug fixes · docs · analysis"},
  {v:"Up to 500%",t:"Systemic velocity",d:"Multiple agents run workflows end-to-end.",m:"Roadmap → design → build → test → release"},
  {v:"1000x",t:"Moonshot velocity",d:"The ecosystem compounds across markets, developers, agents and compute.",m:"One platform → many industries → many OpCos → many builders"},
];

function EcosystemSection() {
  return <div style={{padding:"40px 0"}}>
    <Badge v="rose">Scale velocity in AI</Badge>
    <h2 style={{fontSize:34,fontWeight:700,color:BRAND.black,margin:"14px 0 12px",lineHeight:1.05,maxWidth:760}}>A moonshot ecosystem for AI scale</h2>
    <p style={{fontSize:15,color:BRAND.grey,lineHeight:1.55,maxWidth:820,marginBottom:18}}>Scale velocity is the speed at which an organisation moves from AI pilots to enterprise-wide workflows that create measurable value. This is not a 10x productivity plan. It is a 1000x platform ambition: agents, developers, data, compute and distribution compounding through e&.</p>
    <div style={{height:4,width:180,background:BRAND.continuum,marginBottom:6}}/>

    <SH>Velocity thesis</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",gap:12,marginBottom:14}}>
      {SCALE_VELOCITY_STAGES.map((s,i)=><Card key={i} style={{padding:0,overflow:"hidden",marginBottom:0}}>
        <div style={{padding:"16px 18px",background:i===2?BRAND.red:BRAND.lightGrey,borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{fontSize:26,fontWeight:700,color:i===2?BRAND.white:BRAND.red,lineHeight:1}}>{s.v}</div>
          <div style={{fontSize:11,fontWeight:700,color:i===2?BRAND.white:BRAND.black,letterSpacing:"0.06em",textTransform:"uppercase",marginTop:8}}>{s.t}</div>
        </div>
        <div style={{padding:18}}>
          <p style={{fontSize:12.5,color:BRAND.black,lineHeight:1.5,margin:"0 0 10px"}}>{s.d}</p>
          <div style={{fontSize:11,color:BRAND.grey,lineHeight:1.45}}>{s.m}</div>
        </div>
      </Card>)}
    </div>

    <SH>Moonshot logic</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(190px, 1fr))"}}>
        {[
          ["10x","Better tools","One person works faster."],
          ["100x","Agent factory","Many agents automate repeatable workflows."],
          ["1000x","Ecosystem compounding","Many builders ship many agents into many markets."],
          ["e& role","Scale engine","Distribution, trust, billing, cloud and OpCos turn invention into adoption."],
        ].map((x,i)=><div key={i} style={{padding:"20px",background:i===2?BRAND.red:BRAND.white,borderRight:i<3?`1px solid ${BRAND.border}`:"none",borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{fontSize:24,fontWeight:700,color:i===2?BRAND.white:BRAND.red,lineHeight:1,marginBottom:10}}>{x[0]}</div>
          <div style={{fontSize:13,fontWeight:700,color:i===2?BRAND.white:BRAND.black,marginBottom:6}}>{x[1]}</div>
          <div style={{fontSize:11.5,color:i===2?"rgba(255,255,255,0.78)":BRAND.grey,lineHeight:1.45}}>{x[2]}</div>
        </div>)}
      </div>
    </Card>

    <SH>Why the ecosystem exists</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(210px, 1fr))"}}>
        {[
          ["Data foundation","Connect the silos before agents can act."],
          ["Agentic orchestration","Move from isolated copilots to managed workflows."],
          ["Integrated testing","Run validation in parallel with AI-generated change."],
          ["Governance first","Avoid BYOAI, shadow tools, risk and technical debt."],
          ["Learning velocity","Turn feedback into better products faster."],
        ].map((x,i)=><div key={i} style={{padding:"18px 20px",borderRight:i<4?`1px solid ${BRAND.border}`:"none",borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{fontSize:12,fontWeight:700,color:BRAND.red,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:8}}>{x[0]}</div>
          <div style={{fontSize:12.5,color:BRAND.black,lineHeight:1.5}}>{x[1]}</div>
        </div>)}
      </div>
    </Card>

    <SH>Ecosystem map · scale velocity stack</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(230px, 1fr))",gap:10,marginBottom:16}}>
      {ECOSYSTEM_LAYERS.map((x,i)=><Card key={i} style={{padding:0,overflow:"hidden",marginBottom:0}}>
        <div style={{padding:"14px 16px",background:i===0?BRAND.red:BRAND.lightGrey,borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
            <span style={{fontSize:11,fontWeight:700,color:i===0?BRAND.white:BRAND.red,letterSpacing:"0.08em",textTransform:"uppercase"}}>{x.k} · {x.t}</span>
            <span style={{fontSize:16,fontWeight:700,color:i===0?BRAND.white:BRAND.black}}>{i<ECOSYSTEM_LAYERS.length-1?"→":"✓"}</span>
          </div>
        </div>
        <div style={{padding:16}}>
          <h4 style={{fontSize:15,fontWeight:700,color:BRAND.black,margin:"0 0 6px"}}>{x.n}</h4>
          <p style={{fontSize:12,color:BRAND.grey,lineHeight:1.45,margin:"0 0 12px"}}>{x.d}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {x.items.map((it,j)=><span key={j} style={{fontSize:10.5,fontWeight:700,color:BRAND.black,background:BRAND.lightGrey,border:`1px solid ${BRAND.border}`,padding:"4px 7px"}}>{it}</span>)}
          </div>
        </div>
      </Card>)}
    </div>

    <SH>Operating flow · governed agentic workflow</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(150px, 1fr))"}}>
        {[
          ["1","Define","Use case · data · KPIs"],
          ["2","Build","SDD spec · agent · tests"],
          ["3","Certify","Security · quality · reusable IP"],
          ["4","Package","SMB bundle · enterprise offer"],
          ["5","Sell","e& channel · OpCos · partners"],
          ["6","Deploy","Cloud · G42 · on-prem"],
          ["7","Improve","Connectors · prompts · models"],
        ].map((s,i)=><div key={i} style={{padding:"18px 16px",borderRight:i<6?`1px solid ${BRAND.border}`:"none",borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{width:26,height:26,background:BRAND.red,color:BRAND.white,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,marginBottom:10}}>{s[0]}</div>
          <div style={{fontSize:14,fontWeight:700,color:BRAND.black,marginBottom:5}}>{s[1]}</div>
          <div style={{fontSize:11.5,color:BRAND.grey,lineHeight:1.45}}>{s[2]}</div>
        </div>)}
      </div>
    </Card>

    <SH>Velocity gap</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:12,marginBottom:14}}>
      {[
        {t:"The gap",d:"Employees adopt AI faster than enterprises enable it."},
        {t:"The risk",d:"BYOAI creates security exposure, fragmented workflows and technical debt."},
        {t:"The answer",d:"Governance-first architecture: supervised agents, approved data, tested outputs."},
      ].map((x,i)=><Card key={i} style={{padding:18,background:i===1?BRAND.lightGrey:BRAND.white}}>
        <Badge v={i===1?"rose":"default"}>{x.t}</Badge>
        <p style={{fontSize:13,color:BRAND.black,lineHeight:1.55,margin:"12px 0 0"}}>{x.d}</p>
      </Card>)}
    </div>

    <SH>Role matrix</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:720}}>
          <thead><tr style={{background:BRAND.lightGrey,borderBottom:`1px solid ${BRAND.border}`}}>
            {["Actor","Primary role","What they provide"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 16px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {ECOSYSTEM_ROLES.map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`}}>
              <td style={{padding:"12px 16px",fontWeight:700,color:BRAND.black,whiteSpace:"nowrap"}}>{r[0]}</td>
              <td style={{padding:"12px 16px",color:BRAND.red,fontWeight:700}}>{r[1]}</td>
              <td style={{padding:"12px 16px",color:BRAND.grey}}>{r[2]}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </Card>

    <SH>Developer model · from copilot to agent factory</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:12,marginBottom:14}}>
      {[
        {t:"Core build",o:"AIdeology",d:"Platform, first agents, SDD specs, reference connectors."},
        {t:"Internal scale",o:"e& platform team",d:"Own roadmap, approvals, customer onboarding, operations."},
        {t:"Certified partner network",o:"SIs + developers",d:"Vertical templates, local integrations, OpCo rollouts."},
        {t:"Marketplace supply",o:"Customers + partners",d:"Reusable connectors and agents approved into the catalog."},
      ].map((c,i)=><Card key={i} style={{padding:18}}>
        <Badge v="rose">{c.t}</Badge>
        <h4 style={{fontSize:15,fontWeight:700,color:BRAND.black,margin:"10px 0 6px"}}>{c.o}</h4>
        <p style={{fontSize:12.5,color:BRAND.grey,lineHeight:1.55,margin:0}}>{c.d}</p>
      </Card>)}
    </div>

    <SH>Metrics · from velocity to vector</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))"}}>
        {[
          ["Old metric","Story points · PR count · tickets closed"],
          ["New metric","Learning velocity · experiment cycle time · time-to-value"],
          ["Vector metric","Speed + direction toward strategic outcomes"],
          ["e& measure","Revenue impact · adoption · reuse · compliance · customer retention"],
        ].map((x,i)=><div key={i} style={{padding:"18px 20px",borderRight:i<3?`1px solid ${BRAND.border}`:"none",borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{fontSize:11,fontWeight:700,color:i===0?BRAND.grey:BRAND.red,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:8}}>{x[0]}</div>
          <div style={{fontSize:13,color:BRAND.black,lineHeight:1.5}}>{x[1]}</div>
        </div>)}
      </div>
    </Card>

    <SH>Commercial logic · monetise velocity</SH>
    <Card style={{background:BRAND.lightGrey,padding:20}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:12}}>
        {[
          ["Build once","Core IP funded by first deployments"],
          ["Reuse many times","Templates and connectors move across sectors"],
          ["Sell through e&","Channel lowers acquisition cost"],
          ["Host sovereign","e& / Core42 keep regulated workloads local"],
          ["Share upside","Platform, services, compute and rev-share compound"],
        ].map((x,i)=><div key={i} style={{background:BRAND.white,border:`1px solid ${BRAND.border}`,padding:14}}>
          <div style={{fontSize:12,fontWeight:700,color:BRAND.black,marginBottom:5}}>{x[0]}</div>
          <div style={{fontSize:11.5,color:BRAND.grey,lineHeight:1.45}}>{x[1]}</div>
        </div>)}
      </div>
    </Card>
  </div>;
}

/* ════════════════════════════════════════════════════════════ */
/* HPC REFERENCE ARCHITECTURES */
/* ════════════════════════════════════════════════════════════ */
const HPC_ARCHITECTURES = [
  {
    id: "rtx-pro",
    name: "NVIDIA RTX PRO AI Factory",
    pattern: "2-8-5-200",
    tagline: "Inference-first · agentic AI · industrial workloads",
    gpu: "RTX PRO 6000 Blackwell Server Edition",
    gpusPerNode: 8,
    nicsPerNode: "5 (1 N/S + 4 E/W)",
    fabricSpeed: "200 GbE per GPU",
    fabric: "Spectrum-X Ethernet · single-plane · rail-optimised",
    nvlink: "Per-node NVLink (no rack-scale NVLink domain)",
    minSize: "1 SU · 4 nodes · 32 GPUs",
    maxSize: "8 SUs · 32 nodes · 256 GPUs",
    cablesPerSu: "≈16 East-West (4 NICs × 4 nodes) + 4 North-South per SU · 200 GbE per GPU",
    workloads: ["Agentic AI inference","Industrial / physical AI","Visual computing","HPC analytics & simulation"],
    description: "Most cost-efficient enterprise pattern. PCIe-optimised 4U NVIDIA-Certified node with 2 CPUs · 8 GPUs · 5 NICs (1 North-South + 4 East-West) · 200 GbE per GPU East-West traffic. Pattern scales from 4 to 32 nodes (1–8 SUs · 32–256 GPUs). Lowest entry point for an NVIDIA AI factory.",
    bestFor: "Inference + agentic AI at SMB / mid-enterprise scale. Direct fit for the e& B2B agent inference fleet and on-prem enterprise customers.",
    docUrl: "https://docs.nvidia.com/enterprise-reference-architectures/rtx-pro-ai-factory/latest/index.html",
  },
  {
    id: "hgx",
    name: "NVIDIA HGX AI Factory",
    pattern: "2-8-9-400 · 2-8-10-400 (Cisco)",
    tagline: "Workhorse · training · fine-tuning · large-scale inference",
    gpu: "HGX H200 · HGX B200",
    gpusPerNode: 8,
    nicsPerNode: "9 (1 N/S + 8 E/W)",
    fabricSpeed: "400 GbE per GPU",
    fabric: "Spectrum-X Ethernet or InfiniBand · rail-optimised · multi-plane",
    nvlink: "8-GPU NVLink within each HGX baseboard",
    minSize: "1 SU · 4 nodes · 32 GPUs",
    maxSize: "8 SUs · 32 nodes · 256 GPUs (default) · up to 32 SUs · 1,024 GPUs",
    cablesPerSu: "≈32 East-West (8 NICs × 4 nodes) + 4 North-South per SU · 400 GbE per GPU (40 E-W with Cisco 2-8-10-400)",
    workloads: ["AI training & fine-tuning","Large-context RAG","High-throughput inference","GPU-accelerated data analytics"],
    description: "The serious-workload Enterprise RA. Scale-up NVIDIA-Certified HGX 8-GPU node with 2 CPUs · 8 GPUs · 9 NICs (1 North-South + 8 East-West, one per GPU rail) · 400 GbE per GPU East-West traffic. Cisco extends to 10 NICs (2-8-10-400). Pattern scales from 4 to 32 nodes default (1–8 SUs · 32–256 GPUs); fully tested up to 32 SUs / 128 nodes / 1,024 GPUs.",
    bestFor: "Sovereign GPUaaS at scale + e&-hosted enterprise training cluster. Direct fit for the GPUaaS pillar and Core42 / G42 partnership.",
    docUrl: "https://docs.nvidia.com/enterprise-reference-architectures/hgx-ai-factory/latest/index.html",
  },
  {
    id: "nvl72",
    name: "NVIDIA NVL72 AI Factory",
    pattern: "2-8-9-800",
    tagline: "Frontier · rack-scale NVLink · foundation model training",
    gpu: "GB300 NVL72 (single-plane configuration)",
    gpusPerNode: "72 GPUs / NVL72 rack",
    nicsPerNode: "9 (1 N/S + 8 E/W)",
    fabricSpeed: "800 GbE per GPU",
    fabric: "Spectrum-X 800G Ethernet (single plane) + rack-scale NVLink switching",
    nvlink: "NVLink 5 · 72-GPU NVLink domain per rack",
    minSize: "1 NVL72 rack · 72 GB300 GPUs",
    maxSize: "Multi-rack — thousands of GPUs",
    cablesPerSu: "≈32 East-West + 4 North-South per scale unit · 800 GbE per GPU · plus intra-rack NVLink",
    workloads: ["Foundation model training","Real-time reasoning","Complex agentic AI pipelines","Large-scale fine-tuning"],
    description: "Top-tier rack-scale architecture. Built around the GB300 NVL72: a 72-GPU NVLink domain in a single rack. 2 CPUs · 8 GPUs per node · 9 NICs (1 N/S + 8 E/W) · 800 GbE per GPU East-West traffic. For organisations training or serving frontier-class models. Highest performance, highest density, highest power.",
    bestFor: "Sovereign AI factory for governments and frontier-model training. Fits an e& + Core42 / G42 large-scale national build-out.",
    docUrl: "https://docs.nvidia.com/enterprise-reference-architectures/nvl72-ai-factory-with-gb300-nvl72-dual-plane-networking-architecture.pdf",
  },
];

const HPC_OEM = [
  {vendor:"Cisco",solution:"Cisco Nexus Hyperfabric AI ERA",server:"UCS C885A Rack Server",gpu:"HGX H200",pattern:"2-8-9-400 → 2-8-10-400",size:"4 – 128",endorsements:["Infra","Spectrum-X","Networking"],url:"https://www.cisco.com/c/en/us/products/collateral/data-center-networking/nexus-hyperfabric/hyperfabric-ai-era-ds.html"},
  {vendor:"Cisco",solution:"Cisco Nexus 9000 ERA",server:"UCS C885A Rack Server",gpu:"HGX H200",pattern:"2-8-9-400 → 2-8-10-400",size:"4 – 128",endorsements:["Infra","Spectrum-X","Networking"],url:"https://www.cisco.com/c/en/us/products/collateral/switches/nexus-9000-series-switches/nexus-9000-ai-era-ds.html"},
  {vendor:"Cisco",solution:"Cisco AI POD Infrastructure",server:"UCS C885A M8",gpu:"HGX H200",pattern:"2-8-9-400",size:"4 – 16",endorsements:["Infra","Spectrum-X"],url:"https://www.cisco.com/c/en/us/products/collateral/servers-unified-computing/ai-pod-ucs-c885a-servers-nexus-9364e--sg2-switches.html"},
  {vendor:"Dell Technologies",solution:"Dell AI Factory with NVIDIA",server:"PowerEdge XE7745",gpu:"RTX PRO 6000 Blackwell SE · H200 NVL",pattern:"2-8-5-200",size:"4, 16",endorsements:["Infra","Spectrum-X","Networking"],url:"https://www.delltechnologies.com/asset/en-us/solutions/infrastructure-solutions/briefs-summaries/nvidia-2-8-5-200-era-configuration-endorsed-for-the-dell-ai-factory-with-nvidia-brief.pdf"},
  {vendor:"Dell Technologies",solution:"Dell AI Factory with NVIDIA",server:"PowerEdge XE7740",gpu:"RTX PRO 6000 Blackwell SE · H200 NVL",pattern:"2-8-5-200",size:"4, 16",endorsements:["Infra","Spectrum-X","Networking"],url:"https://www.delltechnologies.com/asset/en-us/solutions/infrastructure-solutions/briefs-summaries/nvidia-2-8-5-200-era-configuration-endorsed-for-the-dell-ai-factory-with-nvidia-brief.pdf"},
  {vendor:"Dell Technologies",solution:"Dell AI Factory with NVIDIA",server:"PowerEdge XE9680",gpu:"HGX H200",pattern:"2-8-9-400",size:"4, 12",endorsements:["Infra","Spectrum-X","Networking"],url:"https://www.delltechnologies.com/asset/en-us/solutions/infrastructure-solutions/briefs-summaries/nvidia-2-8-9-400-configuration-era-endorsed-for-the-dell-ai-factory-with-nvidia-brief.pdf"},
  {vendor:"Dell Federal",solution:"Dell AI Factory for Government",server:"PowerEdge XE7740",gpu:"RTX PRO 6000 Blackwell SE",pattern:"2-8-5-200",size:"4 – 32",endorsements:["Infra","Spectrum-X"],url:"https://www.delltechnologies.com/asset/en-us/products/storage/technical-support/dell-ai-factory-with-nvidia-rtx-pro-6000-on-dell-poweredge-servers-datasheet.pdf"},
  {vendor:"Dell Federal",solution:"Dell AI Factory for Government",server:"PowerEdge XE7745",gpu:"RTX PRO 6000 Blackwell SE",pattern:"2-8-5-200",size:"4 – 32",endorsements:["Infra","Spectrum-X"],url:"https://www.delltechnologies.com/asset/en-us/products/storage/technical-support/dell-ai-factory-with-nvidia-rtx-pro-6000-on-dell-poweredge-servers-datasheet.pdf"},
  {vendor:"HPE",solution:"HPE AI Factory with NVIDIA Enterprise RAs",server:"ProLiant DL380a Gen12",gpu:"RTX PRO 6000 Blackwell SE",pattern:"2-8-5-200",size:"16, 32",endorsements:["Infra"],url:"https://www.hpe.com/psnow/doc/a00157780enw"},
  {vendor:"Lenovo",solution:"Lenovo Hybrid AI 289",server:"ThinkSystem SR680a V3",gpu:"HGX B200 · HGX H200",pattern:"2-8-9-400",size:"4 – 32",endorsements:["Infra","Spectrum-X","Networking"],url:"https://lenovopress.lenovo.com/lp2286-lenovo-hybrid-ai-289-platform-guide"},
  {vendor:"Supermicro",solution:"AI Factory Solutions · HGX",server:"SYS-A22GA-NBRT-G1",gpu:"HGX B200",pattern:"2-8-9-400",size:"4 – 32",endorsements:["Infra","Spectrum-X"],url:"https://www.supermicro.com/datasheet/Datasheet_Supermicro_NVIDIA_AI_Factories_HGX.pdf"},
  {vendor:"Supermicro",solution:"AI Factory Solutions · RTX PRO 6000",server:"SYS-522GA-NRT · SYS-422GL-NR · AS-5126GS-TNRT2",gpu:"RTX PRO 6000 Blackwell SE",pattern:"2-8-5-200",size:"4 – 32",endorsements:["Infra","Spectrum-X"],url:"https://www.supermicro.com/datasheet/Datasheet_Supermicro_NVIDIA_AI_Factories_RTX_PRO_6000.pdf"},
  {vendor:"Supermicro",solution:"AI Factory Solutions · HGX B300 Single Plane",server:"SYS-822GS-NB3RT",gpu:"HGX B300 Single Plane",pattern:"2-8-9-800",size:"4, 8, 32",endorsements:["Infra","Spectrum-X"],url:"https://www.supermicro.com/datasheet/Datasheet_Supermicro_NVIDIA_AI_Factories_HGX_B300.pdf"},
];

const HPC_GUIDES = [
  {t:"NVIDIA Enterprise AI Factory Design Guide",d:"Master design guide for single-tenant AI factories. Covers ecosystem partner integrations, automation tooling, and end-to-end deployment strategy.",url:"https://docs.nvidia.com/ai-enterprise/planning-resource/ai-factory-white-paper/latest/index.html"},
  {t:"NVIDIA AI Enterprise · Software Reference Architecture",d:"Software stack reference for OEMs and partners. Same software layer across inference, fine-tuning, and RAG workloads — modular hardware below.",url:"https://docs.nvidia.com/ai-enterprise/reference-architecture/latest/introduction.html"},
  {t:"NIM LLM with Run:ai and Vanilla Kubernetes",d:"Pack more inference models per GPU using Run:ai fractional GPUs and dynamic scheduling. Performance impact analysis included.",url:"https://docs.nvidia.com/enterprise-reference-architectures/nim-llm-with-run-ai-and-vanilla-kubernetes.pdf"},
  {t:"AI-Q Research Agent Blueprint",d:"Agentic system that generates detailed reports from internal + external data. Deployment, scaling, and sizing guidance.",url:"https://docs.nvidia.com/enterprise-reference-architectures/ai-q-research-agent-blueprint.pdf"},
  {t:"Observability Guide for Enterprise RAs",d:"Production-ready observability for AI / HPC environments. Custom dashboards across GPU, CPU, Kubernetes, and applications.",url:"https://docs.nvidia.com/enterprise-reference-architectures/observability-guide.pdf"},
  {t:"Base Command Manager Deployment Guide",d:"Cluster orchestration tool included in NVIDIA AI Enterprise. Step-by-step bare-metal cluster deployment with HA and image management.",url:"https://docs.nvidia.com/enterprise-reference-architectures/base-command-manager-deployment-guide.pdf"},
  {t:"Upstream Kubernetes Deployment Guide",d:"Open-source Kubernetes on Base Command Manager 10.x. Node setup, network prerequisites, and software installation.",url:"https://docs.nvidia.com/enterprise-reference-architectures/upstream-kubernetes-deployment-guide.pdf"},
];

function PatternDecoder() {
  return <Card style={{padding:0,overflow:"hidden",marginBottom:16}}>
    <div style={{padding:"18px 24px",borderBottom:`1px solid ${BRAND.border}`,background:BRAND.lightGrey}}>
      <div style={{fontSize:13,fontWeight:700,color:BRAND.black,marginBottom:4}}>How to read the pattern code · C-G-N-B</div>
      <p style={{fontSize:12,color:BRAND.grey,lineHeight:1.55,margin:0}}>NVIDIA names every Reference Configuration with the <strong style={{color:BRAND.black,fontFamily:BRAND.font}}>C-G-N-B</strong> nomenclature — <strong style={{color:BRAND.black}}>CPUs · GPUs · NICs · East-West Bandwidth per GPU</strong>. Same code, different OEMs — guaranteed compatible by NVIDIA's design review board. Source: NVIDIA Enterprise RA Overview white paper.</p>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))"}}>
      {[
        {k:"C",l:"CPUs / sockets per node",d:"Almost always 2 in Enterprise RAs (dual-socket AMD EPYC Milan/Genoa/Turin or Intel Xeon Scalable Emerald Rapids)."},
        {k:"G",l:"GPUs per node",d:"8 for HGX H100/H200/B200 and PCIe RTX PRO 6000 / H200 NVL · 4 for L40S / H100 NVL · 2 for Grace GH200 NVL2."},
        {k:"N",l:"NICs per node",d:"Total network interface cards per server: 1 North-South (storage / management uplink) + the rest East-West (rail-optimised compute fabric). e.g. 9 = 1 N/S + 8 E/W."},
        {k:"B",l:"GbE East-West per GPU",d:"East-West (compute fabric) bandwidth allocated per GPU. 200 GbE (RTX PRO / H200 NVL · L40S) · 400 GbE (HGX H100/H200/B200 / Grace) · 800 GbE (HGX B300 single plane / NVL72)."},
      ].map((c,i)=><div key={i} style={{padding:"18px 22px",borderRight:i<3?`1px solid ${BRAND.border}`:"none",borderBottom:`1px solid ${BRAND.border}`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
          <span style={{width:30,height:30,background:BRAND.red,color:BRAND.white,fontWeight:700,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>{c.k}</span>
          <span style={{fontSize:12,fontWeight:700,color:BRAND.black,letterSpacing:"0.04em",textTransform:"uppercase"}}>{c.l}</span>
        </div>
        <p style={{fontSize:11.5,color:BRAND.grey,lineHeight:1.55,margin:0}}>{c.d}</p>
      </div>)}
    </div>
    <div style={{padding:"16px 22px",borderTop:`1px solid ${BRAND.border}`,background:BRAND.white}}>
      <div style={{fontSize:11,fontWeight:700,color:BRAND.red,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:6}}>Worked example · 2-8-9-400</div>
      <p style={{fontSize:12,color:BRAND.grey,lineHeight:1.55,margin:0}}>2 CPUs · 8 HGX GPUs · 9 NICs (1 North-South + 8 East-West, one per GPU rail) · 400 GbE per GPU East-West. Used by Cisco UCS C885A, Dell PowerEdge XE9680, Lenovo SR680a V3, Supermicro SYS-A22GA-NBRT-G1.</p>
    </div>
  </Card>;
}

function ArchitectureCard({a, open, onToggle}) {
  return <Card style={{padding:0,overflow:"hidden",marginBottom:14}}>
    <button type="button" onClick={onToggle} aria-expanded={open} style={{display:"block",width:"100%",textAlign:"left",border:"none",background:"transparent",padding:"22px 24px",cursor:"pointer"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:18,flexWrap:"wrap"}}>
        <div style={{flex:"1 1 320px"}}>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:8,flexWrap:"wrap"}}>
            <Badge v="rose">{a.pattern}</Badge>
            <span style={{fontSize:11,color:BRAND.grey,fontWeight:600,letterSpacing:"0.04em",textTransform:"uppercase"}}>{a.tagline}</span>
          </div>
          <h4 style={{fontSize:18,fontWeight:700,color:BRAND.black,margin:"0 0 6px"}}>{a.name}</h4>
          <div style={{fontSize:12.5,color:BRAND.grey}}>GPU: <strong style={{color:BRAND.black}}>{a.gpu}</strong></div>
        </div>
        <div style={{display:"flex",gap:24,flexWrap:"wrap",fontSize:12,color:BRAND.grey}}>
          <div><div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:BRAND.grey,marginBottom:4}}>Min</div><div style={{color:BRAND.black,fontWeight:600}}>{a.minSize}</div></div>
          <div><div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:BRAND.grey,marginBottom:4}}>Max</div><div style={{color:BRAND.black,fontWeight:600}}>{a.maxSize}</div></div>
          <div><div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:BRAND.grey,marginBottom:4}}>Fabric</div><div style={{color:BRAND.black,fontWeight:600}}>{a.fabricSpeed}</div></div>
          <div style={{alignSelf:"center",fontSize:11,color:BRAND.red,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase"}}>{open?"Hide":"Open"} summary</div>
        </div>
      </div>
    </button>
    {open && <div style={{borderTop:`1px solid ${BRAND.border}`,padding:"22px 24px",background:BRAND.lightGrey}}>
      <p style={{fontSize:13,color:BRAND.black,lineHeight:1.6,margin:"0 0 18px"}}>{a.description}</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:12,marginBottom:18}}>
        {[
          {l:"GPUs per node",v:a.gpusPerNode},
          {l:"NICs per node",v:`${a.nicsPerNode} × ${a.fabricSpeed}`},
          {l:"Cabling estimate",v:a.cablesPerSu},
          {l:"Network fabric",v:a.fabric},
          {l:"NVLink domain",v:a.nvlink},
        ].map((x,i)=><div key={i} style={{background:BRAND.white,border:`1px solid ${BRAND.border}`,padding:14}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",color:BRAND.grey,textTransform:"uppercase",marginBottom:6}}>{x.l}</div>
          <div style={{fontSize:12.5,color:BRAND.black,lineHeight:1.45}}>{x.v}</div>
        </div>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:12,marginBottom:18}}>
        <div style={{background:BRAND.white,border:`1px solid ${BRAND.border}`,padding:16}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.06em",color:BRAND.red,textTransform:"uppercase",marginBottom:8}}>Workloads</div>
          {a.workloads.map((w,j)=><div key={j} style={{display:"flex",alignItems:"flex-start",gap:7,fontSize:12,color:BRAND.black,lineHeight:1.5,marginBottom:4}}>
            <span style={{color:BRAND.red,flexShrink:0,marginTop:1}}><CheckIcon/></span>{w}
          </div>)}
        </div>
        <div style={{background:BRAND.white,border:`1px solid ${BRAND.border}`,padding:16}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.06em",color:BRAND.red,textTransform:"uppercase",marginBottom:8}}>Best fit for e&</div>
          <p style={{fontSize:12.5,color:BRAND.black,lineHeight:1.55,margin:0}}>{a.bestFor}</p>
        </div>
      </div>
      <a href={a.docUrl} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:8,fontSize:12,fontWeight:700,color:BRAND.white,background:BRAND.red,padding:"10px 16px",textDecoration:"none"}}>Open NVIDIA reference doc →</a>
    </div>}
  </Card>;
}

function HPCSection() {
  const [openId,setOpenId] = useState("hgx");
  const toggle = (id) => setOpenId(openId===id?null:id);
  return <div style={{padding:"40px 0"}}>
    <Badge v="rose">HPC reference architectures</Badge>
    <h2 style={{fontSize:34,fontWeight:700,color:BRAND.black,margin:"14px 0 12px",lineHeight:1.05,maxWidth:780}}>NVIDIA Enterprise Reference Architectures for e&</h2>
    <p style={{fontSize:15,color:BRAND.grey,lineHeight:1.55,maxWidth:780,marginBottom:18}}>The blueprints e& and partners can use to build AI factories — from a 32-GPU inference pod to a multi-rack frontier-model cluster. Three NVIDIA RA families, one shared software stack, and a vetted list of OEM-endorsed designs.</p>
    <div style={{height:4,width:180,background:BRAND.continuum,marginBottom:6}}/>

    <SH>The three Enterprise RA families</SH>
    <p style={{fontSize:13,color:BRAND.grey,lineHeight:1.6,maxWidth:820,marginBottom:18}}>NVIDIA groups its Enterprise Reference Architectures into three families. Each one targets a different workload mix and a different price/performance point. Click a card to expand the full summary, fabric details, and recommended fit for the e& proposal.</p>
    {HPC_ARCHITECTURES.map(a=><ArchitectureCard key={a.id} a={a} open={openId===a.id} onToggle={()=>toggle(a.id)} />)}

    <SH>Sizing ladder · pilot to fully tested cluster</SH>
    <p style={{fontSize:13,color:BRAND.grey,lineHeight:1.6,maxWidth:820,marginBottom:18}}>NVIDIA defines a <strong style={{color:BRAND.black}}>Scalable Unit (SU) as 4 nodes</strong>. Patterns scale from <strong style={{color:BRAND.black}}>4 to 32 nodes</strong> by default (1–8 SUs · 32–256 GPUs), with HGX fully tested up to <strong style={{color:BRAND.black}}>32 SUs / 128 nodes / 1,024 GPUs</strong>. Single-node and dual-node deployments are common pilots but sit below the formal Enterprise RA endorsement floor. Use this ladder to plan a low-risk first build that ports cleanly into the certified configuration.</p>
    <Card style={{padding:0,overflow:"hidden",marginBottom:14}}>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:920}}>
          <thead><tr style={{borderBottom:`1px solid ${BRAND.border}`,background:BRAND.lightGrey}}>
            {["Tier","Nodes / SUs","Fabric topology","RTX PRO 2-8-5-200","HGX 2-8-9-400","NVL72 2-8-9-800","Use case"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 14px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",whiteSpace:"nowrap"}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {[
              {tier:"Pilot · single node",badge:"POC",nodes:"1 node · 0 SU",fabric:"Server-internal NVLink only · standard ToR data NIC · no leaf-spine compute fabric",rtx:"8 GPUs · 5 NICs (1 N/S + 4 E/W) · 200 GbE/GPU",hgx:"8 GPUs · 9 NICs (1 N/S + 8 E/W) · 400 GbE/GPU",nvl:"1 NVL72 rack = 72 GPUs in one NVLink domain",useCase:"Developer sandbox, internal POC, standalone single-tenant agent. Below formal Enterprise RA endorsement."},
              {tier:"Dev pair · two nodes",badge:"POC++",nodes:"2 nodes · 0 SU",fabric:"Single Spectrum-X leaf switch (no spine) · East-West via leaf",rtx:"16 GPUs · 10 NICs total · 1 leaf",hgx:"16 GPUs · 18 NICs total · 1 leaf",nvl:"2 NVL72 racks = 144 GPUs · multi-rack NVLink",useCase:"Internal multi-tenant POC, small fine-tune jobs, workshop / training environment."},
              {tier:"Quad · 1 SU",badge:"RA min",nodes:"4 nodes · 1 SU",fabric:"Leaf-spine compute fabric starts here · rail-optimised East-West · separate N/S + storage + management fabrics",rtx:"32 GPUs · 20 E/W + 4 N/S NICs",hgx:"32 GPUs · 32 E/W + 4 N/S NICs",nvl:"Multi-rack NVL72 (typ. 4 racks · 288 GPUs)",useCase:"First production-grade build. NVIDIA-Certified BoM, formal Enterprise RA endorsement starts here."},
              {tier:"Half · 4 SUs",badge:"Prod",nodes:"16 nodes · 4 SUs",fabric:"Two-tier leaf-spine · multi-rail Spectrum-X or InfiniBand · production storage tier",rtx:"128 GPUs",hgx:"128 GPUs",nvl:"16 NVL72 racks · 1,152 GPUs",useCase:"Enterprise training + multi-tenant inference. Typical e& Phase 2 GPUaaS pod."},
              {tier:"Default tested · 8 SUs",badge:"Standard",nodes:"32 nodes · 8 SUs",fabric:"Two-tier leaf-spine · rail-optimised end-of-row · production storage tier",rtx:"256 GPUs (pattern max for RTX PRO 2-8-5-200)",hgx:"256 GPUs (default tested HGX scale)",nvl:"32 NVL72 racks · 2,304 GPUs",useCase:"NVIDIA's default tested HGX / RTX PRO end-state. The reference 32-server / 256-GPU build the industry uses as the standard sovereign pod."},
              {tier:"Fully tested · 32 SUs",badge:"HGX max",nodes:"128 nodes · 32 SUs",fabric:"Three-tier fat-tree · multi-pod Spectrum-X / InfiniBand · dedicated storage island",rtx:"— (RTX PRO max is 8 SUs)",hgx:"1,024 GPUs (HGX H100/H200/B200 fully tested)",nvl:"Multi-pod NVL72 fleet · thousands of GPUs",useCase:"Sovereign GPUaaS at scale. Frontier model training. Government / multi-country build-out."},
            ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,verticalAlign:"top"}}>
              <td style={{padding:"14px 14px",whiteSpace:"nowrap"}}>
                <div style={{fontWeight:700,color:BRAND.black,marginBottom:4}}>{r.tier}</div>
                <span style={{fontSize:10,fontWeight:700,letterSpacing:"0.04em",padding:"3px 8px",background:BRAND.red,color:BRAND.white,textTransform:"uppercase"}}>{r.badge}</span>
              </td>
              <td style={{padding:"14px 14px",color:BRAND.black,fontWeight:700,whiteSpace:"nowrap"}}>{r.nodes}</td>
              <td style={{padding:"14px 14px",color:BRAND.grey,lineHeight:1.5}}>{r.fabric}</td>
              <td style={{padding:"14px 14px",color:BRAND.black}}>{r.rtx}</td>
              <td style={{padding:"14px 14px",color:BRAND.black}}>{r.hgx}</td>
              <td style={{padding:"14px 14px",color:BRAND.black}}>{r.nvl}</td>
              <td style={{padding:"14px 14px",color:BRAND.grey,lineHeight:1.5}}>{r.useCase}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </Card>
    <Note label="The 32-server / 256-GPU 'standard pod' explained">The end-state most teams refer to as "the SU" or "the cluster" is the <strong style={{color:BRAND.black}}>NVIDIA default-tested configuration of 32 nodes × 8 GPUs = 256 GPUs</strong> — that's <strong style={{color:BRAND.black}}>8 SUs of 4 nodes each</strong>, not 1 SU of 32 nodes. The 4-node SU is the modular building block; the 32-node / 256-GPU cluster is the standard fully-validated pod that maps onto a single NVIDIA-Certified BoM. Source: NVIDIA Enterprise Reference Architecture Overview white paper.</Note>

    <SH>Pattern code · how to read it</SH>
    <PatternDecoder/>

    <SH>Comparison · architectures at a glance</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:880}}>
          <thead><tr style={{borderBottom:`1px solid ${BRAND.border}`,background:BRAND.lightGrey}}>
            {["Architecture","Pattern (C-G-N-B)","GPU","GPUs / node","NICs / node","E-W bandwidth","Default scale (8 SUs)","Fully tested","Best for"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 14px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",whiteSpace:"nowrap"}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {[
              {a:"NVIDIA RTX PRO AI Factory",p:"2-8-5-200",g:"RTX PRO 6000 Blackwell SE",gpn:"8",nics:"5 (1 N/S + 4 E/W)",bw:"200 GbE / GPU",def:"32 nodes · 256 GPUs",full:"8 SUs (pattern max)",bf:"Inference-first · agentic AI · industrial"},
              {a:"NVIDIA HGX AI Factory",p:"2-8-9-400",g:"HGX H200 · HGX B200",gpn:"8",nics:"9 (1 N/S + 8 E/W)",bw:"400 GbE / GPU",def:"32 nodes · 256 GPUs",full:"32 SUs · 128 nodes · 1,024 GPUs",bf:"Workhorse · training · fine-tuning"},
              {a:"NVIDIA NVL72 AI Factory",p:"2-8-9-800",g:"GB300 NVL72",gpn:"8 per CPU node · 72 per rack",nics:"9 (1 N/S + 8 E/W)",bw:"800 GbE / GPU",def:"32 racks · 2,304 GPUs",full:"Multi-pod · thousands of GPUs",bf:"Frontier · rack-scale NVLink"},
            ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,verticalAlign:"top"}}>
              <td style={{padding:"12px 14px",fontWeight:700,color:BRAND.black}}>{r.a}</td>
              <td style={{padding:"12px 14px",color:BRAND.red,fontFamily:BRAND.font,fontWeight:700,whiteSpace:"nowrap"}}>{r.p}</td>
              <td style={{padding:"12px 14px",color:BRAND.black}}>{r.g}</td>
              <td style={{padding:"12px 14px",color:BRAND.grey}}>{r.gpn}</td>
              <td style={{padding:"12px 14px",color:BRAND.grey}}>{r.nics}</td>
              <td style={{padding:"12px 14px",color:BRAND.grey}}>{r.bw}</td>
              <td style={{padding:"12px 14px",color:BRAND.black}}>{r.def}</td>
              <td style={{padding:"12px 14px",color:BRAND.grey}}>{r.full}</td>
              <td style={{padding:"12px 14px",color:BRAND.black}}>{r.bf}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </Card>

    <SH>Partner-endorsed designs by vendor</SH>
    <p style={{fontSize:13,color:BRAND.grey,lineHeight:1.6,maxWidth:820,marginBottom:18}}>Each design has been vetted by NVIDIA's Design Review Board: NVIDIA-Certified nodes, network topology aligned to the RA, and a max-scale BoM signed off. Click any vendor row to open the original datasheet.</p>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12,minWidth:920}}>
          <thead><tr style={{borderBottom:`1px solid ${BRAND.border}`,background:BRAND.lightGrey}}>
            {["Vendor","Solution","Server","GPU","Pattern","Min – Max nodes","Endorsements"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 14px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",whiteSpace:"nowrap"}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {HPC_OEM.map((o,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`}}>
              <td style={{padding:"12px 14px",fontWeight:700,color:BRAND.black,whiteSpace:"nowrap"}}>{o.vendor}</td>
              <td style={{padding:"12px 14px"}}><a href={o.url} target="_blank" rel="noreferrer" style={{color:BRAND.red,fontWeight:600,textDecoration:"none"}}>{o.solution} →</a></td>
              <td style={{padding:"12px 14px",color:BRAND.black}}>{o.server}</td>
              <td style={{padding:"12px 14px",color:BRAND.grey}}>{o.gpu}</td>
              <td style={{padding:"12px 14px",color:BRAND.red,fontFamily:BRAND.font,fontWeight:700,whiteSpace:"nowrap"}}>{o.pattern}</td>
              <td style={{padding:"12px 14px",color:BRAND.grey,whiteSpace:"nowrap"}}>{o.size}</td>
              <td style={{padding:"12px 14px"}}><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{o.endorsements.map((e,j)=><span key={j} style={{fontSize:10,fontWeight:700,letterSpacing:"0.04em",padding:"3px 8px",background:BRAND.red,color:BRAND.white,textTransform:"uppercase"}}>{e}</span>)}</div></td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </Card>

    <SH>Software & operations · supporting reference docs</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:12,marginBottom:14}}>
      {HPC_GUIDES.map((g,i)=><Card key={i} style={{padding:18}}>
        <h4 style={{fontSize:13,fontWeight:700,color:BRAND.black,marginBottom:8}}>{g.t}</h4>
        <p style={{fontSize:12,color:BRAND.grey,lineHeight:1.55,marginBottom:12}}>{g.d}</p>
        <a href={g.url} target="_blank" rel="noreferrer" style={{fontSize:11.5,fontWeight:700,color:BRAND.red,textDecoration:"none",letterSpacing:"0.04em",textTransform:"uppercase"}}>Open doc →</a>
      </Card>)}
    </div>

    <SH>How this maps to the e& proposal</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:12,marginBottom:14}}>
      {[
        {t:"SMB inference fleet",p:"RTX PRO AI Factory · 2-8-5-200",d:"Start at 1 SU (4 nodes / 32 GPUs) for the Phase 0 SMB platform and Customer Agent. Scale to 8 SUs (32 nodes / 256 GPUs) — the pattern's full tested range — as the platform-centric agent fleet grows. Spectrum-X 200 GbE per GPU. Lowest-cost entry into the NVIDIA AI Enterprise stack."},
        {t:"Enterprise & sovereign training",p:"HGX AI Factory · 2-8-9-400",d:"The default GPUaaS pillar build-out. Land at the standard 8-SU / 32-node / 256-GPU HGX H200/B200 pod across e& and Core42 data centres, then scale to the 32-SU / 128-node / 1,024-GPU fully tested ceiling for fine-tuning, RAG at scale, and regulated-customer training."},
        {t:"Government / frontier",p:"NVL72 AI Factory · 2-8-9-800",d:"Reserved for sovereign frontier-model and large-government workloads. GB300 NVL72 racks (72-GPU NVLink domain each) with 800 GbE per GPU East-West fabric. Phased deployment after Phase 1 demand validates."},
      ].map((c,i)=><Card key={i} style={{padding:18}}>
        <Badge v="rose">{c.p}</Badge>
        <h4 style={{fontSize:14,fontWeight:700,color:BRAND.black,margin:"10px 0 8px"}}>{c.t}</h4>
        <p style={{fontSize:12.5,color:BRAND.grey,lineHeight:1.6,margin:0}}>{c.d}</p>
      </Card>)}
    </div>

    <Note label="Source · NVIDIA Docs Hub">All architecture data, partner endorsements, and supporting guides are sourced from <a href="https://docs.nvidia.com/enterprise-reference-architectures/index.html" target="_blank" rel="noreferrer" style={{color:BRAND.red,fontWeight:700,textDecoration:"none"}}>docs.nvidia.com/enterprise-reference-architectures</a> and the NVIDIA Enterprise Reference Architecture Overview white paper. SU = 4 nodes (NVIDIA definition). C-G-N-B = CPUs · GPUs · NICs · East-West GbE per GPU. Cabling counts shown are estimates derived from the pattern code (E/W NICs per node × 4 nodes/SU + N/S NICs); exact per-deployment BoMs (switch SKUs, optics, storage NICs, OOB management) live in each OEM datasheet linked above.</Note>
  </div>;
}

/* ════════════════════════════════════════════════════════════ */
/* AI CHAT ASSISTANT */
/* ════════════════════════════════════════════════════════════ */
const ChatIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const SendIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const CloseIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const SettingsIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68 1.65 1.65 0 0 0 10 3.17V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;

const SEARCH_STOPWORDS = new Set(["the", "a", "an", "and", "or", "to", "of", "in", "on", "for", "with", "from", "is", "are", "was", "were", "be", "as", "by", "at", "it", "this", "that", "about", "into", "than", "then"]);

function tokenizeQuery(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !SEARCH_STOPWORDS.has(t));
}

function buildChunks(corpusText, maxChunkLen = 900) {
  if (!corpusText) return [];
  const paragraphs = corpusText
    .split(/\n+/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const chunks = [];
  let current = "";
  paragraphs.forEach((p) => {
    if ((current + " " + p).length > maxChunkLen && current) {
      chunks.push(current);
      current = p;
    } else {
      current = current ? `${current}\n${p}` : p;
    }
  });
  if (current) chunks.push(current);
  return chunks;
}

function selectRelevantChunks(corpusText, query, maxResults = 6) {
  const terms = tokenizeQuery(query);
  const chunks = buildChunks(corpusText);
  if (!terms.length || !chunks.length) return chunks.slice(0, maxResults);

  const scored = chunks
    .map((chunk) => {
      const text = chunk.toLowerCase();
      let score = 0;
      terms.forEach((term) => {
        if (text.includes(term)) score += 1;
        const phrase = `${term} `;
        if (text.includes(phrase)) score += 0.5;
      });
      return { chunk, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!scored.length) return chunks.slice(0, maxResults);
  return scored.slice(0, maxResults).map((x) => x.chunk);
}

function AIChat({ proposalCorpus }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your AI strategy assistant for the AIdeology x e& partnership. I can help you explore any aspect of the commercial framework — SMB marketplace, enterprise deals, GPUaaS, financials, timelines, technology, or competitive strategy. What would you like to discuss?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [chatEndpoint, setChatEndpoint] = useState(() => {
    const envEndpoint = import.meta.env.VITE_CHAT_ENDPOINT || "/api/chat/completions";
    try { return localStorage.getItem("eand_chat_endpoint") || envEndpoint; } catch { return envEndpoint; }
  });
  const [model, setModel] = useState(import.meta.env.VITE_OPENAI_MODEL || "gpt-4o");
  const [replicaId, setReplicaId] = useState(() => {
    const envReplica = import.meta.env.VITE_TAVUS_REPLICA_ID || "";
    try { return localStorage.getItem("eand_tavus_replica_id") || envReplica; } catch { return envReplica; }
  });
  const [personaId, setPersonaId] = useState(() => {
    const envPersona = import.meta.env.VITE_TAVUS_PERSONA_ID || "";
    try { return localStorage.getItem("eand_tavus_persona_id") || envPersona; } catch { return envPersona; }
  });
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarError, setAvatarError] = useState("");
  const messagesEndRef = { current: null };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const saveChatEndpoint = (endpoint) => {
    setChatEndpoint(endpoint);
    try { localStorage.setItem("eand_chat_endpoint", endpoint); } catch {}
  };

  const saveReplicaId = (id) => {
    setReplicaId(id);
    try { localStorage.setItem("eand_tavus_replica_id", id); } catch {}
  };

  const savePersonaId = (id) => {
    setPersonaId(id);
    try { localStorage.setItem("eand_tavus_persona_id", id); } catch {}
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    if (!chatEndpoint) {
      setShowSettings(true);
      return;
    }

    const userMessage = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const relevantChunks = selectRelevantChunks(proposalCorpus || "", userMessage.content, 6);
      const retrievedContext = relevantChunks.length
        ? relevantChunks.map((chunk, i) => `Excerpt ${i + 1}:\n${chunk}`).join("\n\n")
        : "";
      const systemPrompt = `${PROPOSAL_CONTEXT}

Use the retrieved proposal excerpts below as primary evidence for factual answers. If details are missing from excerpts, rely on the framework summary above and say when something is not explicitly stated.

${retrievedContext ? `Retrieved proposal excerpts:\n${retrievedContext}` : ""}`;

      const response = await fetch(chatEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: systemPrompt },
            ...newMessages.map(m => ({ role: m.role, content: m.content })),
          ],
          temperature: 0.7,
          max_tokens: 1500,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = { role: "assistant", content: data.choices[0].message.content };
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      setMessages([...newMessages, { role: "assistant", content: `Error: ${error.message}. Please check the backend chat endpoint in settings.` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startAvatarMeeting = async () => {
    if (!replicaId.trim() || !personaId.trim() || avatarLoading) {
      setShowSettings(true);
      return;
    }

    setAvatarLoading(true);
    setAvatarError("");

    try {
      const response = await fetch("/api/tavus/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          replica_id: replicaId.trim(),
          persona_id: personaId.trim(),
          conversational_context: `${PROPOSAL_CONTEXT}\n\nMeeting mode: respond as an AIDeology employee in a live e& strategy discussion. Keep spoken answers concise enough for a meeting, and cite proposal ranges when discussing numbers.`,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || data.message || `Tavus API error: ${response.status}`);

      const nextUrl = data.conversation_url || data.conversationUrl || data.join_url || data.url;
      if (!nextUrl) throw new Error("Tavus did not return a conversation URL.");

      setAvatarUrl(nextUrl);
    } catch (error) {
      setAvatarError(error.message || "Could not start the Tavus avatar meeting.");
    } finally {
      setAvatarLoading(false);
    }
  };

  const suggestedQuestions = [
    "What's the total 3-year revenue opportunity?",
    "Compare the three pillars",
    "Explain the SDD methodology",
    "What are the risks?",
    "Timeline for SMB launch?",
    "How does the B2B Acceleration Program work?",
  ];

  return <>
    {/* Floating button */}
    <button
      onClick={() => setOpen(!open)}
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 100,
        width: 56, height: 56, borderRadius: "50%",
        background: BRAND.red, color: BRAND.white,
        border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(224,8,0,0.35)",
        transition: "transform 0.2s",
        transform: open ? "rotate(0deg)" : "rotate(0deg)",
      }}
      title="AI Strategy Assistant"
    >
      {open ? <CloseIcon /> : <ChatIcon />}
    </button>

    {/* Chat panel */}
    {open && <div style={{
      position: "fixed", bottom: 96, right: 28, zIndex: 99,
      width: 420, maxWidth: "calc(100vw - 56px)",
      height: 560, maxHeight: "calc(100vh - 140px)",
      background: BRAND.white, border: `1px solid ${BRAND.border}`,
      display: "flex", flexDirection: "column",
      overflow: "hidden",
      boxShadow: "0 12px 48px rgba(0,0,0,0.15)",
    }}>
      {/* Header */}
      <div style={{
        padding: "16px 20px", borderBottom: `1px solid ${BRAND.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: BRAND.white,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            width: 32, height: 32, background: BRAND.red, color: BRAND.white,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, borderRadius: "50%",
          }}>AI</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.black }}>Strategy Assistant</div>
            <div style={{ fontSize: 10, color: BRAND.grey }}>AIdeology x e& Framework</div>
          </div>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          style={{
            background: "transparent", border: "none", cursor: "pointer",
            color: showSettings ? BRAND.red : BRAND.grey, padding: 6,
          }}
          title="Settings"
        >
          <SettingsIcon />
        </button>
      </div>

      {/* Settings panel */}
      {showSettings && <div style={{
        padding: "14px 20px", borderBottom: `1px solid ${BRAND.border}`,
        background: BRAND.lightGrey,
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: BRAND.grey, textTransform: "uppercase", marginBottom: 8 }}>Shared intelligence endpoint</div>
        <input
          value={chatEndpoint}
          onChange={(e) => saveChatEndpoint(e.target.value)}
          placeholder="/api/chat/completions"
          style={{
            width: "100%", padding: "8px 12px", fontSize: 12,
            border: `1px solid ${BRAND.border}`, background: BRAND.white,
            fontFamily: "monospace", outline: "none", boxSizing: "border-box",
          }}
        />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: BRAND.grey, textTransform: "uppercase", marginTop: 10, marginBottom: 6 }}>Model</div>
        <input
          list="model-options"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="e.g. gpt-4.1 or your 5.x model id"
          style={{
            width: "100%", padding: "8px 12px", fontSize: 12,
            border: `1px solid ${BRAND.border}`, background: BRAND.white,
            outline: "none", boxSizing: "border-box",
          }}
        />
        <datalist id="model-options">
          <option value="gpt-4.1" />
          <option value="gpt-4.1-mini" />
          <option value="gpt-4o" />
          <option value="gpt-4o-mini" />
          <option value="gpt-4-turbo" />
          <option value="gpt-3.5-turbo" />
        </datalist>
        <div style={{ fontSize: 10.5, color: BRAND.grey, marginTop: 8, lineHeight: 1.5 }}>
          The page chat and Tavus persona should use this same OpenAI-compatible endpoint. Put OpenAI and Tavus keys in server env variables, not in the browser.
        </div>
        <div style={{ height: 1, background: BRAND.border, margin: "14px 0" }} />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: BRAND.grey, textTransform: "uppercase", marginBottom: 8 }}>Tavus meeting avatar</div>
        <input
          value={replicaId}
          onChange={(e) => saveReplicaId(e.target.value)}
          placeholder="replica_id"
          style={{
            width: "100%", padding: "8px 12px", fontSize: 12,
            border: `1px solid ${BRAND.border}`, background: BRAND.white,
            fontFamily: "monospace", outline: "none", boxSizing: "border-box", marginBottom: 8,
          }}
        />
        <input
          value={personaId}
          onChange={(e) => savePersonaId(e.target.value)}
          placeholder="persona_id"
          style={{
            width: "100%", padding: "8px 12px", fontSize: 12,
            border: `1px solid ${BRAND.border}`, background: BRAND.white,
            fontFamily: "monospace", outline: "none", boxSizing: "border-box",
          }}
        />
        <button
          onClick={startAvatarMeeting}
          disabled={avatarLoading || !replicaId.trim() || !personaId.trim()}
          style={{
            marginTop: 10, width: "100%", padding: "9px 12px",
            background: replicaId.trim() && personaId.trim() ? BRAND.red : BRAND.border,
            color: replicaId.trim() && personaId.trim() ? BRAND.white : BRAND.grey,
            border: "none", fontSize: 11.5, fontWeight: 700,
            cursor: replicaId.trim() && personaId.trim() ? "pointer" : "default",
          }}
        >
          {avatarLoading ? "Starting Tavus meeting..." : "Start AIDeology Avatar Meeting"}
        </button>
        {avatarError && <div style={{ fontSize: 10.5, color: BRAND.red, marginTop: 8, lineHeight: 1.5 }}>
          {avatarError}
        </div>
        }
      </div>}

      {avatarUrl && <div style={{
        borderBottom: `1px solid ${BRAND.border}`,
        background: BRAND.black,
      }}>
        <div style={{
          padding: "8px 12px", display: "flex", justifyContent: "space-between",
          alignItems: "center", color: BRAND.white,
        }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Live AIDeology avatar</div>
          <button
            onClick={() => setAvatarUrl("")}
            style={{ background: "transparent", border: "none", color: BRAND.white, cursor: "pointer", fontSize: 11 }}
          >
            Close
          </button>
        </div>
        <iframe
          src={avatarUrl}
          allow="camera; microphone; autoplay; fullscreen; display-capture"
          title="AIDeology Tavus Avatar"
          style={{ width: "100%", height: 240, border: 0, display: "block", background: BRAND.black }}
        />
      </div>}

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "16px 20px",
        display: "flex", flexDirection: "column", gap: 14,
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
          }}>
            <div style={{
              maxWidth: "85%", padding: "10px 14px",
              background: msg.role === "user" ? BRAND.red : BRAND.lightGrey,
              color: msg.role === "user" ? BRAND.white : BRAND.black,
              fontSize: 12.5, lineHeight: 1.6,
              borderRadius: msg.role === "user" ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
              whiteSpace: "pre-wrap",
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div style={{
            padding: "10px 14px", background: BRAND.lightGrey,
            borderRadius: "14px 14px 14px 2px",
            display: "flex", gap: 4, alignItems: "center",
          }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                width: 6, height: 6, borderRadius: "50%", background: BRAND.grey,
                animation: `pulse 1.4s infinite ${i * 0.2}s`,
                opacity: 0.4,
              }} />
            ))}
          </div>
        </div>}
        {messages.length === 1 && !loading && <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: BRAND.grey, textTransform: "uppercase", marginBottom: 10 }}>Try asking</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => { setInput(q); }}
                style={{
                  padding: "6px 10px", fontSize: 11, color: BRAND.black,
                  background: BRAND.white, border: `1px solid ${BRAND.border}`,
                  cursor: "pointer", borderRadius: 2, textAlign: "left",
                  lineHeight: 1.3,
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>}
        <div ref={el => { messagesEndRef.current = el; }} />
      </div>

      {/* Input */}
      <div style={{
        padding: "12px 16px", borderTop: `1px solid ${BRAND.border}`,
        display: "flex", gap: 8, alignItems: "flex-end",
        background: BRAND.white,
      }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about the proposal..."
          rows={1}
          style={{
            flex: 1, padding: "10px 12px", fontSize: 12.5,
            border: `1px solid ${BRAND.border}`, background: BRAND.lightGrey,
            resize: "none", outline: "none", fontFamily: BRAND.font,
            lineHeight: 1.5, minHeight: 38, maxHeight: 100,
            borderRadius: 2,
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{
            width: 38, height: 38,
            background: input.trim() ? BRAND.red : BRAND.lightGrey,
            color: input.trim() ? BRAND.white : BRAND.grey,
            border: "none", cursor: input.trim() ? "pointer" : "default",
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 2, flexShrink: 0,
          }}
        >
          <SendIcon />
        </button>
      </div>
    </div>}

    {/* Animation keyframes */}
    <style>{`
      @keyframes pulse {
        0%, 80%, 100% { opacity: 0.4; transform: scale(1); }
        40% { opacity: 1; transform: scale(1.2); }
      }
    `}</style>
  </>;
}

/* ════════════════════════════════════════════════════════════ */
/* HAITHAM MEETING — 3-page layout */
/* ════════════════════════════════════════════════════════════ */
function HaithamExecSummary({showPricing=true}) {
  return <>
    {/* THE OPPORTUNITY */}
    <SH>The opportunity</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{padding:"22px 26px",borderBottom:`1px solid ${BRAND.border}`}}>
        <h4 style={{fontSize:18,fontWeight:700,color:"#111",marginBottom:8}}>700K+ SMBs. No one owns the AI layer yet.</h4>
        <p style={{fontSize:12.5,color:"#777",lineHeight:1.6,maxWidth:860}}>
          e& has the strongest telco brand in the Gulf and the largest SMB customer base. Nobody — not Microsoft, not G42, not Salesforce — is giving these businesses an AI operating layer built into e& infrastructure. Whoever ships first wins the installed base.
        </p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))"}}>
        {[
          {who:"Microsoft / Azure",risk:"Building Copilot globally but not localised for Gulf. No Arabic-first, no e& integration, no sovereign hosting."},
          {who:"G42",risk:"Strong GPU infra but no SMB AI product. They sell compute, not solutions."},
          {who:"Salesforce / HubSpot",risk:"CRM-first, not telco-first. No voice, no WhatsApp BSP, no e& billing integration."},
          {who:"Do nothing",risk:"Every month without a product is 2,000+ SMBs that sign up with a competitor's tool instead. Switching costs in AI are high."},
        ].map((x,i)=><div key={i} style={{padding:18,borderRight:i<3?`1px solid ${BRAND.border}`:"none",borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{fontSize:12,fontWeight:700,color:BRAND.red,marginBottom:6}}>{x.who}</div>
          <div style={{fontSize:11.5,color:"#666",lineHeight:1.55}}>{x.risk}</div>
        </div>)}
      </div>
    </Card>

    {/* WHAT WE DELIVER */}
    <SH>What we deliver</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{padding:"22px 26px",borderBottom:`1px solid ${BRAND.border}`}}>
        <h4 style={{fontSize:18,fontWeight:700,color:"#111",marginBottom:8}}>6 AI agents across 5 waves in 36 weeks</h4>
        <p style={{fontSize:12.5,color:"#777",lineHeight:1.6,maxWidth:860}}>
          Not disconnected bots — a platform where each agent owns an entire business function end-to-end: Customer, Sales, Communications, Finance, Operations, and People.
        </p>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Wave","What ships","Timeline"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 18px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {w:"Wave 1",what:"AI Platform + Customer Agent (voice, WhatsApp, web)",when:"Weeks 1–12"},
            {w:"Wave 2",what:"Sales Agent + Comms Hub + P1 automation/compliance layer",when:"Weeks 13–18"},
            {w:"Wave 3",what:"Finance Agent + Ops Agent",when:"Weeks 19–24"},
            {w:"Wave 4",what:"People Agent (WPS payroll, attendance, visa tracking)",when:"Weeks 25–30"},
            {w:"Wave 5",what:"Platform hardening + security audit + full handoff",when:"Weeks 31–36"},
          ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`}}>
            <td style={{padding:"14px 18px",fontWeight:700,color:BRAND.red,fontSize:12}}>{r.w}</td>
            <td style={{padding:"14px 18px",color:"#333",fontSize:12}}>{r.what}</td>
            <td style={{padding:"14px 18px",color:"#666",fontSize:12,fontFamily:"monospace"}}>{r.when}</td>
          </tr>)}
        </tbody>
      </table>
    </Card>

    {/* 90-DAY LAUNCH SEQUENCE */}
    <SH>90-day launch sequence</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)"}}>
        {[
          {day:"Day 1–30",title:"Platform + first agent",color:BRAND.red,items:["Stand up AI platform on e& sovereign infra","Ship Customer Agent (voice + WhatsApp + web)","Identity, billing, observability wired in","Arabic/English ready from Day 1"]},
          {day:"Day 30–60",title:"Real customers, real revenue",color:"#D14600",items:["10–20 beta SMBs with live traffic","Real CSAT, real call data, real revenue","Sales force sees the product working","Fix, tune, iterate with real feedback"]},
          {day:"Day 60–90",title:"Marketplace goes live",color:"#004B2E",items:["GA launch — any SMB can buy","Sales force fully enabled","Start next 2 agents (Sales + Comms)","First monthly SaaS revenue booked"]},
        ].map((col,i)=><div key={i} style={{padding:22,borderRight:i<2?`1px solid ${BRAND.border}`:"none"}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",color:BRAND.white,background:col.color,padding:"4px 10px",display:"inline-block",marginBottom:10}}>{col.day}</div>
          <h5 style={{fontSize:14,fontWeight:700,color:"#111",marginBottom:10,margin:"0 0 10px"}}>{col.title}</h5>
          {col.items.map((it,j)=><div key={j} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:8}}>
            <span style={{width:5,height:5,background:col.color,flexShrink:0,marginTop:5}}/>
            <span style={{fontSize:12,color:"#555",lineHeight:1.45}}>{it}</span>
          </div>)}
        </div>)}
      </div>
      <div style={{padding:"16px 26px",background:BRAND.lightGrey,borderTop:`1px solid ${BRAND.border}`}}>
        <div style={{fontSize:12.5,color:"#333",fontWeight:700}}>Key line: <span style={{color:BRAND.red}}>"90 days from sign-off, e& has an AI product in market with paying customers. Nobody else can promise that."</span></div>
      </div>
    </Card>

    {/* e& REVENUE PROJECTIONS */}
    {showPricing && <>
    <SH>e& revenue projections</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{padding:"18px 24px",borderBottom:`1px solid ${BRAND.border}`}}>
        <h4 style={{fontSize:15,fontWeight:700,color:"#111"}}>Gross SaaS revenue to e& from SMB subscriptions</h4>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)"}}>
        {[
          {yr:"Year 1",rev:"AED 36.5M",cust:"24,000 SMBs",arpu:"AED 285/mo"},
          {yr:"Year 2",rev:"AED 154M",cust:"62,000 SMBs",arpu:"AED 350/mo"},
          {yr:"Year 3",rev:"AED 378M",cust:"85,000 SMBs",arpu:"AED 420/mo"},
          {yr:"Year 4+",rev:"AED 450M+",cust:"100,000+ SMBs",arpu:"AED 450+/mo"},
        ].map((x,i)=><div key={i} style={{padding:22,borderRight:i<3?`1px solid ${BRAND.border}`:"none",textAlign:"center"}}>
          <div style={{fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:8}}>{x.yr}</div>
          <div style={{fontSize:28,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font,marginBottom:4}}>{x.rev}</div>
          <div style={{fontSize:13,fontWeight:700,color:"#111",marginBottom:4}}>{x.cust}</div>
          <div style={{fontSize:11,color:"#888"}}>{x.arpu}</div>
        </div>)}
      </div>
    </Card>

    <Card style={{padding:0,overflow:"hidden",marginTop:14}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Metric","Year 1","Year 2","Year 3","Year 4+"].map((h,i)=><th key={i} style={{textAlign:i?"right":"left",padding:"12px 18px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {s:"Paying SMB customers",y1:"24,000",y2:"62,000",y3:"85,000",y4:"100,000+"},
            {s:"Average ARPU",y1:"AED 285/mo",y2:"AED 350/mo",y3:"AED 420/mo",y4:"AED 450+/mo"},
            {s:"Gross SaaS revenue",y1:"AED 36.5M",y2:"AED 154M",y3:"AED 378M",y4:"AED 450M+"},
            {s:"e& share of revenue",y1:"65%",y2:"65%",y3:"72%",y4:"80%"},
            {s:"e& net revenue",y1:"AED 23.7M",y2:"AED 100.1M",y3:"AED 272.2M",y4:"AED 360M+"},
          ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,background:i===4?BRAND.lightGrey:"transparent"}}>
            <td style={{padding:"14px 18px",fontWeight:i===4?700:500,color:i===4?BRAND.red:BRAND.black}}>{r.s}</td>
            {[r.y1,r.y2,r.y3,r.y4].map((v,j)=><td key={j} style={{padding:"14px 18px",textAlign:"right",fontWeight:i===4?700:500,color:i===4?BRAND.red:BRAND.grey,fontFamily:BRAND.font}}>{v}</td>)}
          </tr>)}
        </tbody>
      </table>
    </Card>

    <Note label="3-Year e& Revenue" color={BRAND.red}>
      e& cumulative net revenue over 3 years: AED 396M+ (~$108M). By Year 4, e& retains 80% of a growing AED 450M+ revenue stream while owning the entire agent development operation.
    </Note>
    </>}

    {/* CUSTOMER GROWTH */}
    <SH>Customer growth trajectory</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Phase","Customers","Growth driver"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 18px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {p:"Launch (Month 4–6)",c:"1,000–5,000",d:"Beta graduates + early adopters via e& sales force"},
            {p:"Year 1 end",c:"24,000",d:"Customer Agent live, Sales + Comms launching"},
            {p:"Year 2 end",c:"62,000",d:"5 agents live, geographic expansion to Saudi + Morocco"},
            {p:"Year 3 end",c:"85,000",d:"All 6 agents, full marketplace, enterprise upsell"},
            {p:"Year 4+",c:"100,000+",d:"Multi-OpCo replication, vertical depth"},
          ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`}}>
            <td style={{padding:"14px 18px",fontWeight:700,color:BRAND.black,fontSize:12}}>{r.p}</td>
            <td style={{padding:"14px 18px",fontWeight:700,color:BRAND.red,fontSize:12}}>{r.c}</td>
            <td style={{padding:"14px 18px",color:"#666",fontSize:12}}>{r.d}</td>
          </tr>)}
        </tbody>
      </table>
    </Card>

    {/* WHY AIDEOLOGY */}
    <SH>Why AIdeology — Scale Acceleration</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)"}}>
        {[
          {n:"01",title:"Platform already exists",d:"The AI operating layer — identity, memory, connectors, model routing, billing, observability — is built. e& gets a proven engine, not a science project."},
          {n:"02",title:"8 people move like 40",d:"Senior engineers who own the full stack. No handoffs, no PMs, no scope creep. SDD methodology: 48-hour design, build in weeks, ship to production."},
          {n:"03",title:"Built for e&, transferred to e&",d:"Build-then-transfer. Year 1: we build. Year 2: 50/50. Year 3: e& owns 80%. Year 4: e& owns everything. No dependency created."},
        ].map((x,i)=><div key={i} style={{padding:22,borderRight:i<2?`1px solid ${BRAND.border}`:"none"}}>
          <div style={{fontSize:10.5,fontWeight:700,color:BRAND.red,letterSpacing:"0.08em",marginBottom:8}}>{x.n}</div>
          <h5 style={{fontSize:14,fontWeight:700,color:"#111",margin:"0 0 8px"}}>{x.title}</h5>
          <p style={{fontSize:12,color:"#666",lineHeight:1.55,margin:0}}>{x.d}</p>
        </div>)}
      </div>
    </Card>
  </>;
}

function HaithamFinancials() {
  return <>
    {/* REVENUE MODEL */}
    <SH>Revenue model overview</SH>
    <div style={{display:"flex",gap:16,marginBottom:18,flexWrap:"wrap"}}>
      {[{v:"$3.44M",l:"Total fixed fees"},{v:"35% → 20%",l:"Revenue share (declining)"},{v:"~$52.7M",l:"3-Year AIdeology cash"},{v:"14.5x",l:"ROI on investment"}].map((s,i)=><div key={i} style={{minWidth:120}}>
        <div style={{fontSize:26,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font}}>{s.v}</div>
        <div style={{fontSize:11,color:BRAND.grey,fontWeight:600}}>{s.l}</div>
      </div>)}
    </div>

    {/* e& GROSS REVENUE FORECAST */}
    <SH>e& gross revenue forecast</SH>
    <ForecastTable
      rows={[
        {s:"Paying customers (avg)",y1:"24,000",y2:"62,000",y3:"85,000"},
        {s:"Average ARPU",y1:"AED 285/mo",y2:"AED 350/mo",y3:"AED 420/mo"},
        {s:"Gross SaaS revenue",y1:"AED 36.5M",y2:"AED 154M",y3:"AED 378M"},
      ]}
      totalRow={{y1:"AED 36.5M",y2:"AED 154M",y3:"AED 378M"}}
      assumptions={["Subscriber ramp based on e& SMB penetration","20% annual churn","ARPU growth from multi-agent upsell"]}
    />

    {/* AIDEOLOGY REVENUE BY YEAR */}
    <SH>AIdeology revenue breakdown</SH>

    <CommercialBox title="Year 1 — AIdeology revenue" icon="1" items={[
      {label:"Fixed fees",value:"$3.44M",type:"AED 12.6M",desc:"Waves 1–4 milestone payments, paid on delivery"},
      {label:"Revenue share",value:"$3.5M",type:"AED 12.8M",desc:"35% of AED 36.5M SaaS revenue (from Month 4)"},
      {label:"Total Y1",value:"~$7.1M",type:"AED 25.4M",desc:"Fixed fees + recurring revenue share"},
    ]} />

    <CommercialBox title="Year 2 — AIdeology revenue" icon="2" items={[
      {label:"Fixed fees",value:"$0",type:"Complete",desc:"All waves delivered"},
      {label:"Revenue share",value:"~$15.4M",type:"AED 53.9M",desc:"35% of AED 154M — pure recurring revenue"},
      {label:"Total Y2",value:"~$15.4M",type:"AED 53.9M",desc:"Revenue share only"},
    ]} />

    <CommercialBox title="Year 3 — AIdeology revenue" icon="3" items={[
      {label:"Fixed fees",value:"$0",type:"",desc:""},
      {label:"Revenue share",value:"~$30.2M",type:"AED 105.8M",desc:"28% of AED 378M — reduced share as e& owns more"},
      {label:"Total Y3",value:"~$30.2M",type:"AED 105.8M",desc:"Revenue share only"},
    ]} />

    {/* COST STRUCTURE */}
    <SH>AIdeology cost structure (COGS)</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Cost item","Year 1","Year 2","Year 3"].map((h,i)=><th key={i} style={{textAlign:i?"right":"left",padding:"12px 18px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {s:"Platform engineering team",y1:"AED 4.5M (8 FTE)",y2:"AED 4.8M (8 FTE)",y3:"AED 3.6M (6 FTE)"},
            {s:"Training & consulting",y1:"AED 3.2M",y2:"AED 2.0M",y3:"AED 1.2M"},
            {s:"Operating expenses",y1:"AED 1.2M",y2:"AED 1.5M",y3:"AED 1.0M"},
          ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`}}>
            <td style={{padding:"14px 18px",color:BRAND.black,fontWeight:500}}>{r.s}</td>
            {[r.y1,r.y2,r.y3].map((v,j)=><td key={j} style={{padding:"14px 18px",textAlign:"right",color:BRAND.grey,fontFamily:BRAND.font}}>{v}</td>)}
          </tr>)}
          <tr style={{borderTop:`2px solid ${BRAND.red}`,background:BRAND.lightGrey}}>
            <td style={{padding:"14px 18px",fontWeight:700,color:BRAND.black}}>Total COGS</td>
            {["AED 8.9M","AED 8.3M","AED 5.8M"].map((v,i)=><td key={i} style={{padding:"14px 18px",textAlign:"right",fontWeight:700,color:BRAND.red,fontFamily:BRAND.font}}>{v}</td>)}
          </tr>
        </tbody>
      </table>
    </Card>

    {/* EBITDA */}
    <SH>Profitability (EBITDA)</SH>
    <div style={{display:"flex",gap:16,marginBottom:18,flexWrap:"wrap"}}>
      {[{v:"65%",l:"Year 1 EBITDA margin"},{v:"85%",l:"Year 2 EBITDA margin"},{v:"94%",l:"Year 3 EBITDA margin"},{v:"97%",l:"Year 4+ EBITDA margin"}].map((s,i)=><div key={i} style={{minWidth:130}}>
        <div style={{fontSize:26,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font}}>{s.v}</div>
        <div style={{fontSize:11,color:BRAND.grey,fontWeight:600}}>{s.l}</div>
      </div>)}
    </div>
    <Card style={{padding:0,overflow:"hidden"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Metric","Year 1","Year 2","Year 3"].map((h,i)=><th key={i} style={{textAlign:i?"right":"left",padding:"12px 18px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {s:"AIdeology revenue",y1:"AED 25.4M",y2:"AED 53.9M",y3:"AED 105.8M",bold:false},
            {s:"COGS",y1:"(AED 8.9M)",y2:"(AED 8.3M)",y3:"(AED 5.8M)",bold:false},
            {s:"Gross profit",y1:"AED 16.5M",y2:"AED 45.6M",y3:"AED 100M",bold:true},
            {s:"EBITDA margin",y1:"65%",y2:"85%",y3:"94%",bold:true},
          ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,background:r.bold?BRAND.lightGrey:"transparent"}}>
            <td style={{padding:"14px 18px",fontWeight:r.bold?700:500,color:r.bold?BRAND.black:BRAND.black}}>{r.s}</td>
            {[r.y1,r.y2,r.y3].map((v,j)=><td key={j} style={{padding:"14px 18px",textAlign:"right",fontWeight:r.bold?700:500,color:r.bold?BRAND.red:BRAND.grey,fontFamily:BRAND.font}}>{v}</td>)}
          </tr>)}
        </tbody>
      </table>
    </Card>

    {/* 3-YEAR SUMMARY */}
    <SH>3-Year cumulative summary</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:14,marginBottom:18}}>
      <Card style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"18px 24px",borderBottom:`1px solid ${BRAND.border}`,display:"flex",alignItems:"center",gap:10}}>
          <span style={{width:30,height:30,background:BRAND.red,display:"flex",alignItems:"center",justifyContent:"center",color:BRAND.white,fontSize:11,fontWeight:700}}>$</span>
          <span style={{fontSize:15,fontWeight:700,color:BRAND.black}}>Cash to AIdeology</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr"}}>
          {[{l:"Total fixed fees",v:"$3.44M"},{l:"Total rev share",v:"$49.3M"},{l:"Total 3-year cash",v:"~$52.7M"}].map((x,i)=><div key={i} style={{padding:18,textAlign:"center",borderRight:i<2?`1px solid ${BRAND.border}`:"none"}}>
            <div style={{fontSize:22,fontWeight:700,color:i===2?BRAND.red:BRAND.black,fontFamily:BRAND.font}}>{x.v}</div>
            <div style={{fontSize:10.5,color:BRAND.grey,marginTop:4}}>{x.l}</div>
          </div>)}
        </div>
      </Card>
      <Card style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"18px 24px",borderBottom:`1px solid ${BRAND.border}`,display:"flex",alignItems:"center",gap:10}}>
          <span style={{width:30,height:30,background:"#004B2E",display:"flex",alignItems:"center",justifyContent:"center",color:BRAND.white,fontSize:11,fontWeight:700}}><TrendUp/></span>
          <span style={{fontSize:15,fontWeight:700,color:BRAND.black}}>Return & valuation</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
          {[{l:"ROI on investment",v:"14.5x"},{l:"Platform valuation (Y4)",v:"AED 2–3B"}].map((x,i)=><div key={i} style={{padding:18,textAlign:"center",borderRight:i<1?`1px solid ${BRAND.border}`:"none"}}>
            <div style={{fontSize:22,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font}}>{x.v}</div>
            <div style={{fontSize:10.5,color:BRAND.grey,marginTop:4}}>{x.l}</div>
          </div>)}
        </div>
      </Card>
    </div>

    {/* YEAR 4+ LICENSING */}
    <SH>Year 4+ licensing model</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Metric","Year 4","Year 5+"].map((h,i)=><th key={i} style={{textAlign:i?"right":"left",padding:"12px 18px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {s:"e& SaaS customers",y4:"100K+",y5:"120K+"},
            {s:"e& gross revenue",y4:"AED 450M+",y5:"AED 550M+"},
            {s:"AIdeology revenue share (20%)",y4:"AED 90M",y5:"AED 110M"},
            {s:"Platform licensing fee (flat)",y4:"AED 2–3M",y5:"AED 2–3M"},
            {s:"Total AIdeology revenue",y4:"AED 92–93M",y5:"AED 112–113M"},
            {s:"COGS (4–5 FTE platform team)",y4:"AED 2.5M",y5:"AED 2.5M"},
            {s:"EBITDA margin",y4:"97%",y5:"97%"},
          ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,background:(i===4||i===6)?BRAND.lightGrey:"transparent"}}>
            <td style={{padding:"14px 18px",fontWeight:(i===4||i===6)?700:500,color:BRAND.black}}>{r.s}</td>
            {[r.y4,r.y5].map((v,j)=><td key={j} style={{padding:"14px 18px",textAlign:"right",fontWeight:(i===4||i===6)?700:500,color:(i===4||i===6)?BRAND.red:BRAND.grey,fontFamily:BRAND.font}}>{v}</td>)}
          </tr>)}
        </tbody>
      </table>
    </Card>
    <Note label="Perpetual revenue stream">
      By Year 4, AIdeology earns AED 90M+/year from a 20% platform royalty with only 4–5 FTE maintaining the platform. This is a 97% margin licensing business that compounds with e&'s customer growth.
    </Note>
  </>;
}

function HaithamDealStructure() {
  return <>
    {/* REVENUE SHARE MODEL */}
    <SH>Revenue share model</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{padding:"22px 26px",borderBottom:`1px solid ${BRAND.border}`}}>
        <h4 style={{fontSize:18,fontWeight:700,color:"#111",marginBottom:8}}>65/35 declining to 80/20</h4>
        <p style={{fontSize:12.5,color:"#777",lineHeight:1.6,maxWidth:860}}>
          e& keeps the majority from Day 1. The split declines in e&'s favour as their team takes ownership of agent development and operations.
        </p>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Period","e& share","AIdeology share","Rationale"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 18px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {p:"Year 1–2",e:"65%",a:"35%",r:"AIdeology builds and runs; e& team learns"},
            {p:"Year 3",e:"72%",a:"28%",r:"e& team handles ~40% of agent development"},
            {p:"Year 4+",e:"80%",a:"20%",r:"e& owns agents fully; AIdeology owns platform IP"},
          ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`}}>
            <td style={{padding:"14px 18px",fontWeight:700,color:BRAND.red,fontSize:12}}>{r.p}</td>
            <td style={{padding:"14px 18px",fontWeight:700,color:"#004B2E",fontSize:14}}>{r.e}</td>
            <td style={{padding:"14px 18px",fontWeight:700,color:BRAND.grey,fontSize:14}}>{r.a}</td>
            <td style={{padding:"14px 18px",color:"#666",fontSize:12}}>{r.r}</td>
          </tr>)}
        </tbody>
      </table>
    </Card>
    <Note label="Key insight" color={BRAND.red}>
      By giving e& majority revenue share from Day 1, we remove acquisition anxiety. By retaining platform IP and declining to 20%, we make acquisition inevitable — paying 20% forever is more expensive than buying outright by Year 4.
    </Note>

    {/* BUILD-THEN-TRANSFER */}
    <SH>Build-then-transfer model</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{padding:"22px 26px",borderBottom:`1px solid ${BRAND.border}`}}>
        <h4 style={{fontSize:18,fontWeight:700,color:"#111",marginBottom:8}}>Systematic ownership transfer over 4 years</h4>
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11.5,minWidth:800}}>
          <thead>
            <tr style={{background:BRAND.lightGrey}}>
              {["Function","Year 1 (AIdeology leads)","Year 2 (50/50)","Year 3 (e& leads)","Year 4+ (e& owns)"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 14px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {[
              {f:"Platform architecture",y1:"100% AIdeology",y2:"100% AIdeology",y3:"100% AIdeology",y4:"100% AIdeology"},
              {f:"Agent development",y1:"100% AIdeology",y2:"50 / 50",y3:"20% / 80% e&",y4:"0% / 100% e&"},
              {f:"Infrastructure",y1:"100% e&",y2:"100% e&",y3:"100% e&",y4:"100% e&"},
              {f:"Customer support",y1:"20% / 80% e&",y2:"10% / 90% e&",y3:"5% / 95% e&",y4:"0% / 100% e&"},
              {f:"Integration work",y1:"100% AIdeology",y2:"60% / 40% e&",y3:"50% / 50%",y4:"40% / 60% e&"},
              {f:"Team — AIdeology",y1:"8 FTE",y2:"8 FTE",y3:"6 FTE",y4:"4–5 FTE"},
              {f:"Team — e&",y1:"2–3 FTE",y2:"4–5 FTE",y3:"6–8 FTE",y4:"8–10 FTE"},
            ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,background:i>=5?BRAND.lightGrey:"transparent"}}>
              <td style={{padding:"12px 14px",fontWeight:700,color:BRAND.black,fontSize:11.5}}>{r.f}</td>
              {[r.y1,r.y2,r.y3,r.y4].map((v,j)=><td key={j} style={{padding:"12px 14px",color:BRAND.grey,fontSize:11.5}}>{v}</td>)}
            </tr>)}
          </tbody>
        </table>
      </div>
    </Card>

    {/* MILESTONE PAYMENTS */}
    <SH>Fixed-fee milestone payments</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{padding:"22px 26px",borderBottom:`1px solid ${BRAND.border}`}}>
        <h4 style={{fontSize:18,fontWeight:700,color:"#111",marginBottom:8}}>$3.44M total — pay only on delivery</h4>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Wave","Deliverable","Fee","Timeline","Milestones"].map((h,i)=><th key={i} style={{textAlign:i===2?"right":"left",padding:"12px 18px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {w:"Wave 1",what:"Platform + Customer Agent",fee:"$1,147,621",when:"Weeks 1–12",ms:"4 milestones @ 25%"},
            {w:"Wave 2",what:"Sales Agent + Comms Hub",fee:"$575,000",when:"Weeks 13–18",ms:"2 milestones @ 50%"},
            {w:"Wave 3",what:"Finance Agent + Ops Agent",fee:"$575,000",when:"Weeks 19–24",ms:"2 milestones @ 50%"},
            {w:"Wave 4",what:"People Agent + Platform Hardening",fee:"$1,146,000",when:"Weeks 25–30",ms:"2 milestones @ 50%"},
          ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`}}>
            <td style={{padding:"14px 18px",fontWeight:700,color:BRAND.red,fontSize:12}}>{r.w}</td>
            <td style={{padding:"14px 18px",color:"#333",fontSize:12}}>{r.what}</td>
            <td style={{padding:"14px 18px",textAlign:"right",fontWeight:700,color:BRAND.black,fontSize:12}}>{r.fee}</td>
            <td style={{padding:"14px 18px",color:"#666",fontSize:12,fontFamily:"monospace"}}>{r.when}</td>
            <td style={{padding:"14px 18px",color:"#666",fontSize:12}}>{r.ms}</td>
          </tr>)}
          <tr style={{borderTop:`2px solid ${BRAND.red}`,background:BRAND.lightGrey}}>
            <td style={{padding:"14px 18px",fontWeight:700,color:BRAND.black}}>Total</td>
            <td style={{padding:"14px 18px",fontWeight:700,color:BRAND.black}}>6 AI agents + full platform</td>
            <td style={{padding:"14px 18px",textAlign:"right",fontWeight:700,color:BRAND.red,fontSize:14}}>$3,443,621</td>
            <td style={{padding:"14px 18px",fontWeight:700,color:BRAND.black,fontFamily:"monospace"}}>30 weeks</td>
            <td style={{padding:"14px 18px",fontWeight:700,color:BRAND.black}}>10 milestones</td>
          </tr>
        </tbody>
      </table>
    </Card>

    {/* IP OWNERSHIP */}
    <SH>IP ownership — clean separation</SH>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      <Card style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"18px 24px",borderBottom:`1px solid ${BRAND.border}`,background:"#004B2E",display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:15,fontWeight:700,color:BRAND.white}}>e& owns — Agent IP</span>
        </div>
        <div style={{padding:22}}>
          {["All agent source code, customisations, prompts","Full transfer by end of Year 2","All customer data — AIdeology gets only anonymised usage analytics","Infrastructure, hosting, deployment"].map((x,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:10}}>
            <CheckIcon /><span style={{fontSize:12,color:"#555",lineHeight:1.5}}>{x}</span>
          </div>)}
        </div>
      </Card>
      <Card style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"18px 24px",borderBottom:`1px solid ${BRAND.border}`,background:BRAND.red,display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:15,fontWeight:700,color:BRAND.white}}>AIdeology owns — Platform IP</span>
        </div>
        <div style={{padding:22}}>
          {["Orchestration platform (Forge) remains AIdeology property","e& receives non-exclusive license","AIdeology retains right to license to other telcos after Year 4","Platform updates, security patches, new connectors"].map((x,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:10}}>
            <CheckIcon /><span style={{fontSize:12,color:"#555",lineHeight:1.5}}>{x}</span>
          </div>)}
        </div>
      </Card>
    </div>

    {/* KEY TERMS */}
    <SH>Key terms</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))"}}>
        {[
          {term:"Revenue split",detail:"65% e& / 35% AIdeology",sub:"From Day 1, e& keeps the majority. Declines to 80/20 by Year 4 as e& takes ownership."},
          {term:"Milestone payments",detail:"Pay only on delivery",sub:"$3.44M across 4 waves and 10 milestones. If we don't deliver, e& doesn't pay."},
          {term:"Exclusivity",detail:"AI platform partner for SMB UAE",sub:"AIdeology builds exclusively for e& in this market."},
          {term:"Term",detail:"4-year minimum",sub:"Build-then-transfer over 4 years. e& owns agents and team by Year 4."},
          {term:"Start date",detail:"2 weeks from sign-off",sub:"Engineering team allocated. No ramp-up needed."},
          {term:"Non-compete",detail:"No telco SMB AI in UAE/Saudi Y1–3",sub:"AIdeology can license platform to other telcos with 90-day notice after Year 4."},
          {term:"SLA",detail:"99.5% platform uptime",sub:"2-hour critical incident response. 24-hour resolution. 5% penalty per breach, capped at 20%."},
          {term:"Termination",detail:"12-month notice after Year 4",sub:"AIdeology retains perpetual 20% royalty or lump-sum buyout negotiated."},
          {term:"IP ownership",detail:"Agents → e&, Platform → AIdeology",sub:"e& owns all agents and customer data. AIdeology owns the orchestration platform and licenses it."},
        ].map((x,i)=><div key={i} style={{padding:20,borderRight:(i+1)%3?`1px solid ${BRAND.border}`:"none",borderBottom:`1px solid ${BRAND.border}`}}>
          <div style={{fontSize:10.5,fontWeight:700,color:BRAND.red,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:4}}>{x.term}</div>
          <div style={{fontSize:16,fontWeight:700,color:"#111",marginBottom:6}}>{x.detail}</div>
          <div style={{fontSize:11.5,color:"#666",lineHeight:1.55}}>{x.sub}</div>
        </div>)}
      </div>
    </Card>

    {/* ACQUISITION TRIGGER */}
    <SH>Acquisition trigger — Year 3–4</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{padding:"22px 26px",borderBottom:`1px solid ${BRAND.border}`}}>
        <h4 style={{fontSize:18,fontWeight:700,color:"#111",marginBottom:8}}>Why e& will acquire by Year 3–4</h4>
        <p style={{fontSize:12.5,color:"#777",lineHeight:1.6,maxWidth:860}}>
          By Year 3, e& faces a choice: keep paying AIdeology 28% of AED 378M = AED 105.8M/year (compounding to AED 1B+ cumulative by Year 5), or acquire the platform IP outright.
        </p>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Scenario","Valuation","Rationale"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"12px 18px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {s:"Conservative",v:"AED 750M – 1B",r:"8–10x Year 3 EBITDA (AED 100M)"},
            {s:"Base case",v:"AED 1.5B – 2B",r:"Platform can license to Saudi Telecom, Maroc Telecom, others"},
            {s:"Optimistic",v:"AED 2.5B – 3B",r:"Regional monopoly on SMB AI orchestration platform"},
          ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,background:i===1?BRAND.lightGrey:"transparent"}}>
            <td style={{padding:"14px 18px",fontWeight:700,color:BRAND.black,fontSize:12}}>{r.s}</td>
            <td style={{padding:"14px 18px",fontWeight:700,color:BRAND.red,fontSize:14}}>{r.v}</td>
            <td style={{padding:"14px 18px",color:"#666",fontSize:12}}>{r.r}</td>
          </tr>)}
        </tbody>
      </table>
    </Card>

    <Card style={{padding:0,overflow:"hidden",marginTop:14}}>
      <div style={{padding:"18px 24px",borderBottom:`1px solid ${BRAND.border}`,display:"flex",alignItems:"center",gap:10}}>
        <span style={{width:30,height:30,background:"#222",display:"flex",alignItems:"center",justifyContent:"center",color:BRAND.white,fontSize:11,fontWeight:700}}><TrendUp/></span>
        <span style={{fontSize:15,fontWeight:700,color:BRAND.black}}>Acquisition timeline</span>
      </div>
      <div style={{padding:0}}>
        {[
          {m:"Month 6–12",d:"e& sees Customer Agent gain traction. Realises AIdeology product is defensible."},
          {m:"Month 12–18",d:"e& AI team ramps. Internal discussion: build our own vs. buy AIdeology?"},
          {m:"Month 18–24",d:"e& evaluates acquiring vs. continuing rev share. By M24, AED 53.9M paid that year alone."},
          {m:"Month 24–30",d:"e& makes offer. AIdeology negotiates from position of strength (profitable, growing, multi-telco licensable)."},
          {m:"Month 30+",d:"Deal closes. AIdeology founders/investors realise 10–30x return on seed investment."},
        ].map((x,i)=><div key={i} style={{padding:"14px 24px",borderBottom:i<4?`1px solid ${BRAND.border}`:"none",display:"flex",gap:16,alignItems:"flex-start"}}>
          <div style={{minWidth:90,flexShrink:0}}>
            <div style={{fontSize:10,fontWeight:700,color:BRAND.white,background:i===4?"#004B2E":BRAND.red,padding:"4px 8px",textAlign:"center",letterSpacing:"0.04em"}}>{x.m}</div>
          </div>
          <div style={{fontSize:12,color:"#555",lineHeight:1.6}}>{x.d}</div>
        </div>)}
      </div>
    </Card>

    {/* WHAT e& PROVIDES */}
    <SH>What e& needs to provide</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)"}}>
        {[
          {n:"1",title:"Cloud + GPU access",d:"Kubernetes namespace on e& sovereign infra. Container registry, base images, network access. e& data never leaves."},
          {n:"2",title:"Technical specs + owners",d:"Named people for telephony, WhatsApp BSP, billing API, identity/SSO. Documentation and sandbox access, not meetings."},
          {n:"3",title:"10–20 beta SMBs",d:"Account managers pick 10–20 real businesses by Week 5. They become reference customers for the GA launch."},
        ].map((x,i)=><div key={i} style={{padding:22,borderRight:i<2?`1px solid ${BRAND.border}`:"none"}}>
          <div style={{width:28,height:28,background:BRAND.red,color:BRAND.white,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,marginBottom:10}}>{x.n}</div>
          <h5 style={{fontSize:13,fontWeight:700,color:"#111",margin:"0 0 6px"}}>{x.title}</h5>
          <p style={{fontSize:12,color:"#666",lineHeight:1.55,margin:0}}>{x.d}</p>
        </div>)}
      </div>
      <div style={{padding:"14px 24px",background:BRAND.lightGrey,borderTop:`1px solid ${BRAND.border}`}}>
        <div style={{fontSize:12,color:BRAND.red,fontWeight:700}}>Key line: "We don't need committees. We need specs, a sandbox, and a beta list. We handle everything else."</div>
      </div>
    </Card>
  </>;
}

/* ════════════════════════════════════════════════════════════ */
/* e& CFO FINANCIAL ANALYSIS — interactive model                */
/* ════════════════════════════════════════════════════════════ */

const FX = 3.67; // UAE peg AED/USD
const fmtAED = (v) => {
  const a = Math.abs(v);
  const s = v < 0 ? "−" : "";
  if (a >= 1e9) return `${s}AED ${(a/1e9).toFixed(2)}B`;
  if (a >= 1e6) return `${s}AED ${(a/1e6).toFixed(1)}M`;
  if (a >= 1e3) return `${s}AED ${(a/1e3).toFixed(0)}K`;
  return `${s}AED ${a.toFixed(0)}`;
};
const fmtUSD = (aed) => {
  const v = aed / FX;
  const a = Math.abs(v);
  const s = v < 0 ? "−" : "";
  if (a >= 1e9) return `${s}$${(a/1e9).toFixed(2)}B`;
  if (a >= 1e6) return `${s}$${(a/1e6).toFixed(1)}M`;
  if (a >= 1e3) return `${s}$${(a/1e3).toFixed(0)}K`;
  return `${s}$${a.toFixed(0)}`;
};
const fmtNum = (v) => Math.round(v).toLocaleString();
const fmtPct = (v) => `${(v * 100).toFixed(1)}%`;

function FinSlider({label, value, min, max, step, onChange, format, hint, accent}) {
  const a = accent || BRAND.red;
  return <div style={{marginBottom:14}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:5}}>
      <span style={{fontSize:11.5,fontWeight:600,color:"#111"}}>{label}</span>
      <span style={{fontSize:13,fontWeight:700,color:a,fontFamily:BRAND.font}}>{format(value)}</span>
    </div>
    <input type="range" min={min} max={max} step={step} value={value}
      onChange={(e)=>onChange(Number(e.target.value))}
      style={{width:"100%",accentColor:a,cursor:"pointer"}}
    />
    {hint && <div style={{fontSize:10,color:"#999",marginTop:2}}>{hint}</div>}
  </div>;
}

function CashFlowChart({months, breakevenMonth}) {
  const w = 760, h = 240, padL = 70, padR = 16, padT = 20, padB = 36;
  const vals = months.map(m => m.cum);
  const max = Math.max(...vals, 0);
  const min = Math.min(...vals, 0);
  const range = (max - min) || 1;
  const xS = (i) => padL + (i / (months.length - 1)) * (w - padL - padR);
  const yS = (v) => h - padB - ((v - min) / range) * (h - padT - padB);
  const zeroY = yS(0);
  const pts = months.map((m, i) => `${xS(i)},${yS(m.cum)}`).join(" ");
  const lastX = xS(months.length - 1);
  const firstX = xS(0);
  const areaPath = `M ${firstX},${zeroY} L ${pts} L ${lastX},${zeroY} Z`;
  const yTicks = [min, min + range * 0.25, min + range * 0.5, min + range * 0.75, max];
  return <svg viewBox={`0 0 ${w} ${h}`} style={{width:"100%",height:"auto",display:"block",background:BRAND.white}}>
    {yTicks.map((t, i) => <g key={i}>
      <line x1={padL} y1={yS(t)} x2={w - padR} y2={yS(t)} stroke="#eee" strokeWidth="1" />
      <text x={padL - 8} y={yS(t)} textAnchor="end" dy="3" fontSize="9.5" fill="#888">{fmtAED(t)}</text>
    </g>)}
    <line x1={padL} y1={zeroY} x2={w - padR} y2={zeroY} stroke="#444" strokeWidth="1" strokeDasharray="4,3" />
    <path d={areaPath} fill={BRAND.red} fillOpacity="0.10" />
    <polyline points={pts} fill="none" stroke={BRAND.red} strokeWidth="2.2" />
    {[12, 24].map((m, i) => <g key={i}>
      <line x1={xS(m-1)} y1={padT} x2={xS(m-1)} y2={h - padB} stroke="#ccc" strokeWidth="1" strokeDasharray="2,3" />
      <text x={xS(m-1)} y={padT - 4} textAnchor="middle" fontSize="9.5" fill="#666">Y{i+1}/Y{i+2}</text>
    </g>)}
    {breakevenMonth && <g>
      <line x1={xS(breakevenMonth - 1)} y1={padT} x2={xS(breakevenMonth - 1)} y2={h - padB} stroke="#004B2E" strokeWidth="1.6" strokeDasharray="3,3" />
      <circle cx={xS(breakevenMonth - 1)} cy={zeroY} r="4" fill="#004B2E" />
      <text x={xS(breakevenMonth - 1)} y={padT + 12} textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#004B2E">Break-even · M{breakevenMonth}</text>
    </g>}
    {[1, 6, 12, 18, 24, 30, 36].map((m, i) => <text key={i} x={xS(m-1)} y={h - 12} textAnchor="middle" fontSize="9.5" fill="#888">M{m}</text>)}
    <text x={padL} y={h - 2} fontSize="9" fill="#999">Months from contract sign-off</text>
  </svg>;
}

function simulateCashflow(p) {
  // Personnel: Y1 4.0M / Y2 7.2M / Y3 12.5M
  // Infrastructure (GPU pod, DC, networking): Y1 3.5M / Y2 6.2M / Y3 9.8M
  // Open Innovation orchestration license: Y1 0.55M / Y2 0.92M / Y3 1.45M
  const FIXED_OPEX = {y1: 8050000, y2: 14320000, y3: 23750000};
  const LAUNCH_DELAY = p.launchDelay || 2;
  const months = [];
  let cum = 0;
  let breakevenMonth = null;
  for (let m = 1; m <= 36; m++) {
    const year = Math.ceil(m / 12);
    const monthInYear = m - (year - 1) * 12;
    let cust = 0;
    if (year === 1) {
      if (monthInYear > LAUNCH_DELAY) {
        cust = p.y1Cust * (monthInYear - LAUNCH_DELAY) / (12 - LAUNCH_DELAY);
      }
    } else if (year === 2) {
      cust = p.y1Cust + (p.y2Cust - p.y1Cust) * monthInYear / 12;
    } else {
      cust = p.y2Cust + (p.y3Cust - p.y2Cust) * monthInYear / 12;
    }
    const arpu = year === 1 ? p.y1ARPU : year === 2 ? p.y2ARPU : p.y3ARPU;
    const aShare = (year === 3 ? p.aShareY3 : p.aShareY12) / 100;
    const fixedOpexAnnual = (year === 1 ? FIXED_OPEX.y1 : year === 2 ? FIXED_OPEX.y2 : FIXED_OPEX.y3) * p.opexMult;
    const gross = cust * arpu;
    const aid = gross * aShare;
    const eNet = gross - aid;
    const conn = cust * p.connARPU;
    const rev = eNet + conn;
    const vCost = cust * p.cogsPerCust;
    const fCost = fixedOpexAnnual / 12;
    let bCost = 0;
    if (year === 1) {
      if (monthInYear === 3) bCost = 4210000;
      else if (monthInYear === 6) bCost = 2110000;
      else if (monthInYear === 9) bCost = 2110000;
      else if (monthInYear === 12) bCost = 4210000;
    }
    const ebitda = rev - vCost - fCost - bCost;
    cum += ebitda;
    if (breakevenMonth === null && cum >= 0 && m >= 3) breakevenMonth = m;
    months.push({m, year, cust, gross, aid, eNet, conn, rev, vCost, fCost, bCost, ebitda, cum});
  }
  const agg = (y) => {
    const ms = months.filter(x => x.year === y);
    const sum = (k) => ms.reduce((s, mm) => s + mm[k], 0);
    return {
      gross: sum("gross"), aid: sum("aid"), eNet: sum("eNet"), conn: sum("conn"),
      rev: sum("rev"), vCost: sum("vCost"), fCost: sum("fCost"), bCost: sum("bCost"),
      ebitda: sum("ebitda"), cum: ms[ms.length - 1].cum,
      avgCust: sum("cust") / 12,
      margin: sum("rev") > 0 ? sum("ebitda") / sum("rev") : 0,
    };
  };
  return {months, breakevenMonth, y1: agg(1), y2: agg(2), y3: agg(3)};
}

function EandFinancialsSection({showPricing=true}) {
  if (!showPricing) return <div style={{padding:"80px 0",textAlign:"center"}}>
    <div style={{fontSize:48,marginBottom:16,opacity:0.15}}>$</div>
    <h2 style={{fontSize:22,fontWeight:700,color:"#111",marginBottom:8}}>Financial analysis hidden</h2>
    <p style={{fontSize:14,color:"#888",maxWidth:420,margin:"0 auto",lineHeight:1.6}}>Toggle "Pricing visible" in the top navigation bar to view the full e& CFO financial model, break-even analysis, and revenue projections.</p>
  </div>;
  const BUILD_COST_AED = 12640000; // $3.44M × 3.67
  // INPUT STATE
  const [y1Cust, setY1Cust] = useState(24000);
  const [y2Cust, setY2Cust] = useState(62000);
  const [y3Cust, setY3Cust] = useState(85000);
  const [y1ARPU, setY1ARPU] = useState(285);
  const [y2ARPU, setY2ARPU] = useState(350);
  const [y3ARPU, setY3ARPU] = useState(420);
  const [aShareY12, setAShareY12] = useState(35);
  const [aShareY3, setAShareY3] = useState(28);
  const [cogsPerCust, setCogsPerCust] = useState(25);
  const [connARPU, setConnARPU] = useState(20);
  const [opexMult, setOpexMult] = useState(1.0);

  const params = {y1Cust, y2Cust, y3Cust, y1ARPU, y2ARPU, y3ARPU, aShareY12, aShareY3, cogsPerCust, connARPU, opexMult};
  const sim = simulateCashflow(params);
  const bear = simulateCashflow({...params, y1Cust: y1Cust*0.5, y2Cust: y2Cust*0.5, y3Cust: y3Cust*0.5, y1ARPU: y1ARPU*0.85, y2ARPU: y2ARPU*0.85, y3ARPU: y3ARPU*0.85});
  const bull = simulateCashflow({...params, y1Cust: y1Cust*1.3, y2Cust: y2Cust*1.3, y3Cust: y3Cust*1.3, y1ARPU: y1ARPU*1.15, y2ARPU: y2ARPU*1.15, y3ARPU: y3ARPU*1.15});

  const ebitda3y = sim.y1.ebitda + sim.y2.ebitda + sim.y3.ebitda;
  const rev3y = sim.y1.rev + sim.y2.rev + sim.y3.rev;
  const margin3y = rev3y > 0 ? ebitda3y / rev3y : 0;
  const beDisplay = sim.breakevenMonth ? `M${sim.breakevenMonth} · Y${Math.ceil(sim.breakevenMonth/12)}` : ">36 months";

  const resetDefaults = () => {
    setY1Cust(24000); setY2Cust(62000); setY3Cust(85000);
    setY1ARPU(285); setY2ARPU(350); setY3ARPU(420);
    setAShareY12(35); setAShareY3(28);
    setCogsPerCust(25); setConnARPU(20); setOpexMult(1.0);
  };

  const cellNum = (v, bold=false, color=null) => <td style={{padding:"10px 14px",textAlign:"right",fontFamily:BRAND.font,fontWeight:bold?700:500,color:color||(bold?BRAND.black:"#555")}}>{fmtAED(v)}</td>;
  const cellLabel = (txt, bold=false, indent=0) => <td style={{padding:"10px 14px",paddingLeft:14+indent,fontWeight:bold?700:500,color:bold?BRAND.black:"#444"}}>{txt}</td>;

  // Build cost breakdown
  const waves = [
    {w:"Wave 1", what:"Platform foundation + Customer Agent", fee:1147621, when:"Weeks 1–12"},
    {w:"Wave 2", what:"Sales Agent + Comms Hub", fee:575000, when:"Weeks 13–18"},
    {w:"Wave 3", what:"Finance Agent + Ops Agent", fee:575000, when:"Weeks 19–24"},
    {w:"Wave 4", what:"People Agent + Platform hardening + L3 support Y1–3", fee:1146000, when:"Weeks 25–30"},
  ];
  const buildTotal = waves.reduce((s,w) => s + w.fee, 0);

  // Operating cost line items (annual AED, baseline scenario)
  const opexLines = [
    {cat:"Variable (per-customer)", items:[
      {n:"LLM API tokens (OpenAI / Anthropic / fallback)", per:8, y1:null, y2:null, y3:null, note:"~AED 8/cust/mo · falls with self-hosted Falcon/Llama from Y2"},
      {n:"Arabic speech (TTS/ASR)", per:5, note:"Voice traffic via Customer Agent"},
      {n:"WhatsApp BSP fees (Meta pass-through)", per:3, note:"Conversation-based, billed via e& BSP"},
      {n:"SMS network cost", per:2, note:"e& direct carrier route"},
      {n:"L1/L2 support cost per customer", per:5, note:"Scales with active base"},
      {n:"Storage + per-customer infra", per:2, note:"Vector DB, transcripts, audit"},
    ]},
    {cat:"Fixed personnel & operations", items:[
      {n:"e& AI engineering team (2 → 5 → 8 FTE)", y1:1500000, y2:2500000, y3:4000000, note:"Loaded cost ~AED 500K/FTE/yr"},
      {n:"L1/L2 customer support team", y1:1200000, y2:2500000, y3:4500000, note:"Scales with customer count"},
      {n:"Sales & marketing dedicated to AI line", y1:800000, y2:1500000, y3:3000000, note:"Account managers, performance marketing"},
      {n:"Compliance, legal, audit", y1:500000, y2:700000, y3:1000000, note:"FTA, NESA, DHA, CBUAE alignment"},
    ]},
    {cat:"Infrastructure — GPU pod & data centre (CapEx amortised over 3 yrs + annual DC)", items:[
      {n:"GPU servers — NVIDIA H100/H200 SXM certified OEM (Dell PowerEdge XE9680 / HPE ProLiant DL380 Gen11 / Supermicro AS-4125GS)", y1:1800000, y2:3100000, y3:4700000, note:"4-node SU Y1 → +12 nodes Y2 → 32 nodes (8-SU full pod) Y3 · CapEx amortised 3 yrs · $220–$350K/node; includes GPU-direct RDMA memory"},
      {n:"InfiniBand networking fabric (NVIDIA Mellanox Quantum-2 QM9700 HDR200 switches + DAC/AOC cables)", y1:380000, y2:680000, y3:1050000, note:"Non-blocking IB for GPU-GPU RDMA; fat-tree or dragonfly topology · scales with node count · separate 400GbE uplinks to DC core"},
      {n:"ToR Ethernet switching (Arista 7050CX3 / Cisco Nexus 93600CD 400GbE)", y1:140000, y2:240000, y3:380000, note:"Management, storage and out-of-band fabric; bonded 25/100GbE to servers"},
      {n:"Rack, PDU, hot-aisle containment, structured cabling & UPS (Schneider / APC)", y1:200000, y2:350000, y3:550000, note:"2–3 × 42U racks per SU; dual-feed PDUs; Cat6A + OM4 multimode fibre; blanking panels + in-row cooling"},
      {n:"Data centre colocation, power & cooling (UAE Tier-III / IV DC — e& or Core42)", y1:850000, y2:1500000, y3:2500000, note:"~30kW per 4-node SU at PUE 1.4 · 4 SU = 120kW / 8 SU = 240kW · metered at kWh; UAE DC colocation rate ~AED 1,200–1,800/rack/mo"},
      {n:"Hardware support contracts (Dell ProSupport NBD / HPE Care Pack 4-hr on-site / NVIDIA GPU swap)", y1:270000, y2:570000, y3:1000000, note:"Next-business-day on-site HW replacement; 4-hr critical replacement unit (CRU) for GPU cards, NVLinks and HBM modules"},
      {n:"Infrastructure commissioning, racking & NVAIE cluster validation", y1:430000, y2:550000, y3:350000, note:"Y1: full pod build + NVAIE DGX BasePOD validation + network acceptance testing · Y2: capacity expansion project · Y3: pod completion & DR validation"},
    ]},
    {cat:"Software licenses (fixed component)", items:[
      {n:"Open Innovation orchestration platform license", y1:550000, y2:920000, y3:1450000, note:"Enterprise API & workflow orchestration middleware · acts as the integration fabric across agents, BSS/OSS, ERP and partner systems · tier-based licensing by tenant / API-call volume"},
      {n:"NVIDIA AI Enterprise (NVAIE)", y1:180000, y2:370000, y3:550000, note:"~$4.5K/GPU/yr · includes Base Command Manager, NIM microservices, Triton Inference Server, Riva ASR/TTS · scales with pod"},
      {n:"Observability (Datadog / Grafana Cloud)", y1:90000, y2:180000, y3:280000, note:"APM, log management, GPU metrics, alert routing"},
      {n:"Vector DB + RAG infra (Qdrant / Pinecone / Weaviate enterprise)", y1:60000, y2:150000, y3:300000, note:"Per-tenant namespace isolation; scales with indexed document volume"},
      {n:"Help AG sovereign security wrap (SIEM, SOC-as-a-service, pen-test)", y1:200000, y2:400000, y3:700000, note:"e& wholly-owned cyber arm; NESA + ISO 27001 alignment"},
    ]},
  ];

  // Compute totals based on baseline avg customers
  const avg = {y1: sim.y1.avgCust, y2: sim.y2.avgCust, y3: sim.y3.avgCust};

  const scenarioRow = (label, s, tone) => <tr style={{borderBottom:`1px solid ${BRAND.border}`,verticalAlign:"top"}}>
    <td style={{padding:"12px 14px",fontWeight:700,color:tone||"#111"}}>{label}</td>
    {cellNum(s.y1.rev)}{cellNum(s.y2.rev)}{cellNum(s.y3.rev)}
    {cellNum(s.y1.ebitda, false, s.y1.ebitda < 0 ? "#A40000" : "#555")}
    {cellNum(s.y2.ebitda)}{cellNum(s.y3.ebitda)}
    <td style={{padding:"12px 14px",textAlign:"right",fontWeight:700,color:s.breakevenMonth?"#004B2E":"#A40000",fontFamily:BRAND.font}}>{s.breakevenMonth?`M${s.breakevenMonth}`:">36"}</td>
  </tr>;

  return <div>
    {/* HERO */}
    <div style={{padding:"44px 0 36px"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <Badge v="violet">CFO analysis · e& view</Badge>
        <span style={{fontSize:12,color:"#888"}}>Build · Operate · Adopt · Break-even</span>
      </div>
      <h2 style={{fontSize:34,fontWeight:700,color:"#111",lineHeight:1.08,marginBottom:14,fontFamily:BRAND.font}}>e& financial analysis</h2>
      <p style={{fontSize:14.5,color:"#666",maxWidth:760,lineHeight:1.7,marginBottom:10}}>
        Complete financial model for the e& side of the partnership: build cost paid to AIdeology, e& operating cost (hardware, licenses, people), revenue split, and a live calculator that recomputes EBITDA and break-even from adoption and ARPU inputs.
      </p>
      <p style={{fontSize:13,color:"#888",maxWidth:760,lineHeight:1.7,marginBottom:28}}>
        All figures in AED with USD equivalents at the UAE peg of <strong style={{color:"#111"}}>AED {FX} / USD</strong>. The model runs a month-by-month simulation across 36 months. Move the sliders below to test any adoption / ARPU / cost scenario in real time.
      </p>
      <div style={{display:"flex",gap:28,flexWrap:"wrap"}}>
        {[
          {v: fmtAED(BUILD_COST_AED), l: "Build cost (one-off, paid to AIdeology)"},
          {v: fmtAED(sim.y3.rev), l: "Year 3 e& revenue"},
          {v: fmtAED(ebitda3y), l: "3-yr cumulative EBITDA"},
          {v: fmtPct(margin3y), l: "3-yr blended EBITDA margin"},
          {v: beDisplay, l: "Break-even (cumulative cash)"},
        ].map((s,i)=><div key={i} style={{minWidth:108}}>
          <div style={{fontSize:22,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font}}>{s.v}</div>
          <div style={{fontSize:10.5,color:"#999",marginTop:2}}>{s.l}</div>
        </div>)}
      </div>
    </div>

    {/* ──────── BUILD COST ──────── */}
    <SH>Cost to create the platform — what e& pays AIdeology</SH>
    <Note label="Build cost summary">
      One-time fixed fees of <strong style={{color:"#111"}}>$3.44M ≈ AED 12.64M</strong>, paid only on delivery across four waves and ten milestones, plus Wave 4 hardening that includes AIdeology L3 platform support for Years 1–3. If e& chooses to amortise straight-line over 3 years, build cost charged to P&L is <strong style={{color:"#111"}}>~AED 4.21M/year</strong>; if expensed in Year 1, it lands as a single AED 12.64M deduction. The calculator below uses the cash-basis view (expensed when paid by milestone), which is the most conservative view for the CFO.
    </Note>
    <Card style={{padding:0,overflow:"hidden",marginBottom:14}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
        <thead><tr style={{background:BRAND.lightGrey}}>
          {["Wave","Deliverable","Timing","Fee (USD)","Fee (AED)","Cumulative (AED)"].map((h,i)=><th key={i} style={{textAlign:i>2?"right":"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
        </tr></thead>
        <tbody>
          {waves.map((w,i)=>{
            const cum = waves.slice(0,i+1).reduce((s,x)=>s+x.fee,0);
            return <tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`}}>
              <td style={{padding:"12px 14px",fontWeight:700,color:BRAND.red}}>{w.w}</td>
              <td style={{padding:"12px 14px",color:"#333"}}>{w.what}</td>
              <td style={{padding:"12px 14px",color:"#777",fontFamily:"monospace",fontSize:11.5}}>{w.when}</td>
              <td style={{padding:"12px 14px",textAlign:"right",fontFamily:BRAND.font,color:"#111"}}>${(w.fee).toLocaleString()}</td>
              <td style={{padding:"12px 14px",textAlign:"right",fontFamily:BRAND.font,color:"#111"}}>{fmtAED(w.fee * FX)}</td>
              <td style={{padding:"12px 14px",textAlign:"right",fontFamily:BRAND.font,color:BRAND.red,fontWeight:700}}>{fmtAED(cum * FX)}</td>
            </tr>;
          })}
          <tr style={{background:BRAND.lightGrey,borderTop:`2px solid ${BRAND.red}`}}>
            <td style={{padding:"12px 14px",fontWeight:700,color:"#111"}}>Total</td>
            <td style={{padding:"12px 14px",fontWeight:700,color:"#111"}}>6 AI agents + platform + 3-yr L3 support</td>
            <td style={{padding:"12px 14px",color:"#111",fontFamily:"monospace",fontSize:11.5,fontWeight:700}}>30 weeks</td>
            <td style={{padding:"12px 14px",textAlign:"right",fontWeight:700,color:"#111",fontFamily:BRAND.font}}>${buildTotal.toLocaleString()}</td>
            <td style={{padding:"12px 14px",textAlign:"right",fontWeight:700,color:"#111",fontFamily:BRAND.font}}>{fmtAED(buildTotal * FX)}</td>
            <td style={{padding:"12px 14px",textAlign:"right",fontWeight:700,color:BRAND.red,fontFamily:BRAND.font,fontSize:14}}>{fmtAED(buildTotal * FX)}</td>
          </tr>
        </tbody>
      </table>
    </Card>

    {/* ──────── OPERATING COST ──────── */}
    <SH>Cost to run the platform — annual operating cost</SH>
    <p style={{fontSize:13,color:"#666",lineHeight:1.65,maxWidth:860,marginBottom:14}}>
      e& operating cost is composed of four buckets: (1) <strong style={{color:"#111"}}>variable per-customer COGS</strong> (LLM tokens, speech, BSP, SMS, L1/L2 support, per-tenant storage); (2) <strong style={{color:"#111"}}>fixed personnel</strong> that scales with team headcount; (3) <strong style={{color:"#111"}}>GPU pod & data-centre infrastructure</strong> — GPU servers, InfiniBand networking, ToR Ethernet, rack/PDU/cooling, DC colocation, hardware support, and implementation costs, all of which are substantially larger than a simple "server allocation" line; and (4) <strong style={{color:"#111"}}>software licences</strong> — most importantly the <strong style={{color:"#111"}}>Open Innovation orchestration platform</strong> that acts as the integration fabric across agents, BSS/OSS, ERP and partner systems, plus NVAIE, observability, vector DB, and Help AG security. Infrastructure and licence costs ladder with pod size, not customer count.
    </p>
    <Card style={{padding:0,overflow:"hidden",marginBottom:14}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead><tr style={{background:BRAND.lightGrey}}>
          {["Cost item","Year 1","Year 2","Year 3","Notes"].map((h,i)=><th key={i} style={{textAlign:i>0&&i<4?"right":"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
        </tr></thead>
        <tbody>
          {opexLines.map((bucket, bi) => <Fragment key={bi}>
            <tr style={{background:"#FAFAFA"}}>
              <td colSpan={5} style={{padding:"10px 14px",fontSize:10.5,fontWeight:700,color:BRAND.red,letterSpacing:"0.06em",textTransform:"uppercase"}}>{bucket.cat}</td>
            </tr>
            {bucket.items.map((it, ii) => {
              const y1v = it.per ? avg.y1 * it.per * 12 : it.y1;
              const y2v = it.per ? avg.y2 * it.per * 12 : it.y2;
              const y3v = it.per ? avg.y3 * it.per * 12 : it.y3;
              return <tr key={ii} style={{borderBottom:`1px solid ${BRAND.border}`}}>
                <td style={{padding:"10px 14px",color:"#333"}}>{it.n}{it.per && <span style={{color:"#999",fontSize:11}}> · AED {it.per}/cust/mo</span>}</td>
                {cellNum(y1v)}{cellNum(y2v)}{cellNum(y3v)}
                <td style={{padding:"10px 14px",color:"#888",fontSize:11,lineHeight:1.45}}>{it.note}</td>
              </tr>;
            })}
          </Fragment>)}
          {/* Subtotals */}
          <tr style={{background:BRAND.lightGrey,borderTop:`2px solid ${BRAND.red}`}}>
            <td style={{padding:"12px 14px",fontWeight:700,color:"#111"}}>Total annual OpEx (baseline scenario)</td>
            {cellNum(sim.y1.vCost + sim.y1.fCost, true, BRAND.red)}
            {cellNum(sim.y2.vCost + sim.y2.fCost, true, BRAND.red)}
            {cellNum(sim.y3.vCost + sim.y3.fCost, true, BRAND.red)}
            <td style={{padding:"12px 14px",color:"#666",fontSize:11}}>Variable scales with avg customers; fixed scales with team & pod</td>
          </tr>
        </tbody>
      </table>
    </Card>
    <Note label="Per-customer COGS benchmark">
      Variable per-customer cost of AED 25/month (AED 300/year) is conservative vs. UAE SMB SaaS benchmarks (typically AED 20–35/cust/month for a multi-channel AI product). The model lets you adjust this with the COGS slider. Infrastructure and licence costs are fixed regardless of customer count — the GPU pod and Open Innovation orchestration license represent the largest single step-up vs. a basic SaaS deployment.
    </Note>

    {/* ──────── INTERACTIVE CALCULATOR ──────── */}
    <SH>Interactive financial model — move the sliders</SH>
    <p style={{fontSize:13,color:"#666",lineHeight:1.65,maxWidth:860,marginBottom:14}}>
      Sliders below feed a month-by-month simulation across 36 months. The P&L, cash flow chart, and break-even indicator update instantly. Defaults match the proposal base case. Use the <strong style={{color:"#111"}}>Reset</strong> link to return to base case at any time.
    </p>
    <div style={{display:"grid",gridTemplateColumns:"360px 1fr",gap:16,marginBottom:14}}>
      {/* LEFT — SLIDERS */}
      <Card style={{padding:20}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{fontSize:13,fontWeight:700,color:"#111"}}>Adoption · ARPU · cost inputs</div>
          <button onClick={resetDefaults} style={{fontSize:10.5,fontWeight:700,color:BRAND.red,background:"transparent",border:"none",cursor:"pointer",letterSpacing:"0.04em",textTransform:"uppercase",padding:0}}>Reset to base case</button>
        </div>
        <div style={{fontSize:10,fontWeight:700,color:"#999",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>Customer adoption (EOY)</div>
        <FinSlider label="Year 1 customers" value={y1Cust} min={5000} max={50000} step={1000} onChange={setY1Cust} format={fmtNum} hint="End-of-year paying SMB count"/>
        <FinSlider label="Year 2 customers" value={y2Cust} min={20000} max={120000} step={2000} onChange={setY2Cust} format={fmtNum}/>
        <FinSlider label="Year 3 customers" value={y3Cust} min={40000} max={200000} step={5000} onChange={setY3Cust} format={fmtNum}/>
        <div style={{height:1,background:BRAND.border,margin:"14px 0"}}/>
        <div style={{fontSize:10,fontWeight:700,color:"#999",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>ARPU (AED / month)</div>
        <FinSlider label="Year 1 ARPU" value={y1ARPU} min={150} max={500} step={5} onChange={setY1ARPU} format={(v)=>`AED ${v}`} hint={`≈ $${(y1ARPU/FX).toFixed(0)} / customer / month`}/>
        <FinSlider label="Year 2 ARPU" value={y2ARPU} min={200} max={600} step={5} onChange={setY2ARPU} format={(v)=>`AED ${v}`} hint={`≈ $${(y2ARPU/FX).toFixed(0)} / customer / month`}/>
        <FinSlider label="Year 3 ARPU" value={y3ARPU} min={250} max={700} step={5} onChange={setY3ARPU} format={(v)=>`AED ${v}`} hint={`≈ $${(y3ARPU/FX).toFixed(0)} / customer / month`}/>
        <div style={{height:1,background:BRAND.border,margin:"14px 0"}}/>
        <div style={{fontSize:10,fontWeight:700,color:"#999",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>Commercial & cost levers</div>
        <FinSlider label="AIdeology rev-share · Y1–2" value={aShareY12} min={15} max={45} step={1} onChange={setAShareY12} format={(v)=>`${v}%`} hint="e& keeps the remainder"/>
        <FinSlider label="AIdeology rev-share · Y3" value={aShareY3} min={10} max={40} step={1} onChange={setAShareY3} format={(v)=>`${v}%`} hint="Declines further to 20% in Y4+"/>
        <FinSlider label="COGS per customer (AED/mo)" value={cogsPerCust} min={10} max={60} step={1} onChange={setCogsPerCust} format={(v)=>`AED ${v}`} hint="LLM + support + per-customer infra"/>
        <FinSlider label="Connectivity ARPU (AED/mo)" value={connARPU} min={5} max={60} step={1} onChange={setConnARPU} format={(v)=>`AED ${v}`} hint="Telco upsell per customer"/>
        <FinSlider label="Fixed OpEx multiplier" value={opexMult * 100} min={50} max={200} step={5} onChange={(v)=>setOpexMult(v/100)} format={(v)=>`${v}%`} hint="100% = baseline e& fixed OpEx"/>
      </Card>

      {/* RIGHT — P&L OUTPUT */}
      <Card style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"16px 22px",borderBottom:`1px solid ${BRAND.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,flexWrap:"wrap"}}>
          <div style={{fontSize:14,fontWeight:700,color:"#111"}}>e& 3-year P&L — live</div>
          <div style={{display:"flex",gap:18}}>
            <div><div style={{fontSize:10.5,color:"#999",letterSpacing:"0.04em",textTransform:"uppercase",fontWeight:700}}>Break-even</div><div style={{fontSize:14,fontWeight:700,color:sim.breakevenMonth?"#004B2E":"#A40000",fontFamily:BRAND.font}}>{beDisplay}</div></div>
            <div><div style={{fontSize:10.5,color:"#999",letterSpacing:"0.04em",textTransform:"uppercase",fontWeight:700}}>3-yr cum EBITDA</div><div style={{fontSize:14,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font}}>{fmtAED(ebitda3y)}</div></div>
          </div>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
          <thead><tr style={{background:BRAND.lightGrey}}>
            {["P&L line","Year 1","Year 2","Year 3"].map((h,i)=><th key={i} style={{textAlign:i?"right":"left",padding:"10px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr></thead>
          <tbody>
            <tr><td colSpan={4} style={{padding:"8px 14px",background:"#FAFAFA",fontSize:10.5,fontWeight:700,color:BRAND.red,letterSpacing:"0.06em",textTransform:"uppercase"}}>Revenue</td></tr>
            <tr style={{borderBottom:`1px solid ${BRAND.border}`}}>{cellLabel("Avg paying customers")}<td colSpan={3} style={{padding:0}}><table style={{width:"100%",borderCollapse:"collapse"}}><tbody><tr>{[sim.y1.avgCust, sim.y2.avgCust, sim.y3.avgCust].map((v,i)=><td key={i} style={{padding:"10px 14px",textAlign:"right",fontFamily:BRAND.font,color:"#555"}}>{fmtNum(v)}</td>)}</tr></tbody></table></td></tr>
            <tr style={{borderBottom:`1px solid ${BRAND.border}`}}>{cellLabel("Gross SaaS revenue")}{cellNum(sim.y1.gross)}{cellNum(sim.y2.gross)}{cellNum(sim.y3.gross)}</tr>
            <tr style={{borderBottom:`1px solid ${BRAND.border}`,background:"#FFFBFB"}}>{cellLabel("Less: AIdeology rev-share", false, 12)}{cellNum(-sim.y1.aid)}{cellNum(-sim.y2.aid)}{cellNum(-sim.y3.aid)}</tr>
            <tr style={{borderBottom:`1px solid ${BRAND.border}`}}>{cellLabel("e& net SaaS revenue", true)}{cellNum(sim.y1.eNet, true)}{cellNum(sim.y2.eNet, true)}{cellNum(sim.y3.eNet, true)}</tr>
            <tr style={{borderBottom:`1px solid ${BRAND.border}`}}>{cellLabel("Connectivity & telco upsell")}{cellNum(sim.y1.conn)}{cellNum(sim.y2.conn)}{cellNum(sim.y3.conn)}</tr>
            <tr style={{borderBottom:`2px solid ${BRAND.red}`,background:BRAND.lightGrey}}>{cellLabel("Total e& revenue", true)}{cellNum(sim.y1.rev, true, BRAND.red)}{cellNum(sim.y2.rev, true, BRAND.red)}{cellNum(sim.y3.rev, true, BRAND.red)}</tr>

            <tr><td colSpan={4} style={{padding:"8px 14px",background:"#FAFAFA",fontSize:10.5,fontWeight:700,color:BRAND.red,letterSpacing:"0.06em",textTransform:"uppercase"}}>Operating cost</td></tr>
            <tr style={{borderBottom:`1px solid ${BRAND.border}`}}>{cellLabel("Variable cost (per-customer COGS)")}{cellNum(-sim.y1.vCost)}{cellNum(-sim.y2.vCost)}{cellNum(-sim.y3.vCost)}</tr>
            <tr style={{borderBottom:`1px solid ${BRAND.border}`}}>{cellLabel("Fixed personnel & operations")}{cellNum(-sim.y1.fCost)}{cellNum(-sim.y2.fCost)}{cellNum(-sim.y3.fCost)}</tr>
            <tr style={{borderBottom:`1px solid ${BRAND.border}`}}>{cellLabel("Build cost (AIdeology fixed fees)")}{cellNum(-sim.y1.bCost)}{cellNum(-sim.y2.bCost)}{cellNum(-sim.y3.bCost)}</tr>
            <tr style={{borderBottom:`1px solid ${BRAND.border}`,background:BRAND.lightGrey}}>{cellLabel("Total cost", true)}{cellNum(-(sim.y1.vCost+sim.y1.fCost+sim.y1.bCost), true)}{cellNum(-(sim.y2.vCost+sim.y2.fCost+sim.y2.bCost), true)}{cellNum(-(sim.y3.vCost+sim.y3.fCost+sim.y3.bCost), true)}</tr>

            <tr style={{borderTop:`2px solid ${BRAND.red}`,background:"#FFF3F3"}}>{cellLabel("e& EBITDA", true)}{cellNum(sim.y1.ebitda, true, sim.y1.ebitda < 0 ? "#A40000" : BRAND.red)}{cellNum(sim.y2.ebitda, true, BRAND.red)}{cellNum(sim.y3.ebitda, true, BRAND.red)}</tr>
            <tr style={{borderBottom:`1px solid ${BRAND.border}`}}>{cellLabel("EBITDA margin")}{[sim.y1.margin, sim.y2.margin, sim.y3.margin].map((v,i)=><td key={i} style={{padding:"10px 14px",textAlign:"right",fontFamily:BRAND.font,color:v<0?"#A40000":"#555",fontWeight:600}}>{fmtPct(v)}</td>)}</tr>
            <tr style={{borderBottom:`1px solid ${BRAND.border}`,background:BRAND.lightGrey}}>{cellLabel("Cumulative cash flow", true)}{cellNum(sim.y1.cum, true, sim.y1.cum < 0 ? "#A40000" : "#004B2E")}{cellNum(sim.y2.cum, true, sim.y2.cum < 0 ? "#A40000" : "#004B2E")}{cellNum(sim.y3.cum, true, "#004B2E")}</tr>
          </tbody>
        </table>
      </Card>
    </div>

    {/* CASH FLOW CHART */}
    <Card style={{padding:18,marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",flexWrap:"wrap",gap:10,marginBottom:8}}>
        <div style={{fontSize:14,fontWeight:700,color:"#111"}}>Cumulative cash flow — 36 months</div>
        <div style={{fontSize:11.5,color:"#777"}}>Green dashed line = month cumulative cash flow crosses zero · red line = cumulative e& cash flow · dotted vertical = Y1/Y2 and Y2/Y3 boundaries</div>
      </div>
      <CashFlowChart months={sim.months} breakevenMonth={sim.breakevenMonth}/>
    </Card>

    {/* ──────── SENSITIVITY ──────── */}
    <SH>Sensitivity analysis — three scenarios</SH>
    <p style={{fontSize:13,color:"#666",lineHeight:1.65,maxWidth:860,marginBottom:14}}>
      Three scenarios computed off the current slider settings. <strong style={{color:"#111"}}>Bear</strong> applies 50% adoption and 85% ARPU; <strong style={{color:"#111"}}>Base</strong> is the current settings; <strong style={{color:"#111"}}>Bull</strong> applies 130% adoption and 115% ARPU. Same cost structure across all scenarios — the model isolates demand sensitivity.
    </p>
    <Card style={{padding:0,overflow:"hidden",marginBottom:14}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
        <thead><tr style={{background:BRAND.lightGrey}}>
          {["Scenario","Y1 revenue","Y2 revenue","Y3 revenue","Y1 EBITDA","Y2 EBITDA","Y3 EBITDA","Break-even"].map((h,i)=><th key={i} style={{textAlign:i?"right":"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
        </tr></thead>
        <tbody>
          {scenarioRow("Bear · −50% adopt, −15% ARPU", bear, "#A40000")}
          {scenarioRow("Base · current sliders", sim, BRAND.red)}
          {scenarioRow("Bull · +30% adopt, +15% ARPU", bull, "#004B2E")}
        </tbody>
      </table>
    </Card>

    {/* SENSITIVITY KPIs */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:12,marginBottom:14}}>
      {[
        {n:"Bear", s:bear, color:"#A40000", lead:"−50% adoption, −15% ARPU"},
        {n:"Base", s:sim, color:BRAND.red, lead:"Current settings"},
        {n:"Bull", s:bull, color:"#004B2E", lead:"+30% adoption, +15% ARPU"},
      ].map((sc,i)=><Card key={i} style={{padding:18,borderTop:`3px solid ${sc.color}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8}}>
          <div style={{fontSize:13,fontWeight:700,color:"#111"}}>{sc.n} case</div>
          <div style={{fontSize:10.5,color:"#888"}}>{sc.lead}</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div><div style={{fontSize:10.5,fontWeight:700,color:"#999",letterSpacing:"0.04em",textTransform:"uppercase"}}>3-yr revenue</div><div style={{fontSize:17,fontWeight:700,color:sc.color,fontFamily:BRAND.font}}>{fmtAED(sc.s.y1.rev + sc.s.y2.rev + sc.s.y3.rev)}</div></div>
          <div><div style={{fontSize:10.5,fontWeight:700,color:"#999",letterSpacing:"0.04em",textTransform:"uppercase"}}>3-yr EBITDA</div><div style={{fontSize:17,fontWeight:700,color:sc.color,fontFamily:BRAND.font}}>{fmtAED(sc.s.y1.ebitda + sc.s.y2.ebitda + sc.s.y3.ebitda)}</div></div>
          <div><div style={{fontSize:10.5,fontWeight:700,color:"#999",letterSpacing:"0.04em",textTransform:"uppercase"}}>Break-even</div><div style={{fontSize:14,fontWeight:700,color:sc.s.breakevenMonth?"#004B2E":"#A40000",fontFamily:BRAND.font}}>{sc.s.breakevenMonth?`M${sc.s.breakevenMonth}`:">36 months"}</div></div>
          <div><div style={{fontSize:10.5,fontWeight:700,color:"#999",letterSpacing:"0.04em",textTransform:"uppercase"}}>Y3 margin</div><div style={{fontSize:14,fontWeight:700,color:"#111",fontFamily:BRAND.font}}>{fmtPct(sc.s.y3.margin)}</div></div>
        </div>
      </Card>)}
    </div>

    {/* ──────── e& UAE SMB BASE PENETRATION ──────── */}
    <SH>e& UAE SMB base — penetration check</SH>
    <p style={{fontSize:13,color:"#666",lineHeight:1.65,maxWidth:880,marginBottom:14}}>
      Reframes the adoption question using e&'s <strong style={{color:"#111"}}>own UAE SMB customer base</strong> as the denominator instead of the total UAE SMB universe (~280K digitally addressable). This is the most defensible CFO benchmark because every paying AI customer must, by definition, sit on an e& connectivity account. The table below shows how each scenario translates to % penetration of the e& SMB base, with comparable telco-distributed SaaS programmes for reference.
    </p>
    <Note label="Denominator assumption">
      <strong style={{color:"#111"}}>e& UAE SMB base ≈ 250,000 accounts</strong> across e& Business mobile, fibre and fixed lines (e& Group Business segment disclosure; UAE Business serves ~60–65% of UAE SMB connectivity market). Adjusting this number ±20% changes the % penetration numbers below but not the customer counts or revenue (those are driven by the sliders).
    </Note>
    {(() => {
      const SMB_BASE = 250000;
      const pen = (n) => n / SMB_BASE;
      const cases = [
        {n:"Bear", color:"#A40000", lead:"−50% adoption, −15% ARPU", y1:y1Cust*0.5, y2:y2Cust*0.5, y3:y3Cust*0.5, bm:"Sage One via Vodacom (≈12% in 4 yrs)"},
        {n:"Base — current sliders", color:BRAND.red, lead:"Current model assumptions", y1:y1Cust, y2:y2Cust, y3:y3Cust, bm:"Microsoft 365 via Vodafone Business UK (≈22% in 4 yrs)"},
        {n:"Bull", color:"#004B2E", lead:"+30% adoption, +15% ARPU", y1:y1Cust*1.3, y2:y2Cust*1.3, y3:y3Cust*1.3, bm:"Above all paid telco-SaaS benchmarks · WhatsApp Business free-tier territory"},
      ];
      const refs = [
        {n:"Sage One via Vodacom South Africa", years:"4 yrs", pct:"~12%", note:"Emerging-market telco-distributed paid SaaS"},
        {n:"Microsoft 365 via Vodafone Business UK", years:"4 yrs", pct:"~22%", note:"Mature-market telco-distributed productivity SaaS"},
        {n:"BT Cloud Voice + O365 (BT UK)", years:"5 yrs", pct:"~18%", note:"Bundled fixed + cloud SMB programme"},
        {n:"Etisalat 'Business in a Box' (legacy SaaS bundle)", years:"5–7 yrs", pct:"~15–20%", note:"e& historical SMB SaaS programme — direct read-across"},
        {n:"WhatsApp Business API via MTN / Vodacom (free)", years:"2 yrs", pct:"~30–40%", note:"Free-tier benchmark, not paid SaaS"},
      ];
      return <Card style={{padding:0,overflow:"hidden",marginBottom:14}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
          <thead><tr style={{background:BRAND.lightGrey}}>
            {["Scenario","Y1 EOY","Y1 %","Y2 EOY","Y2 %","Y3 EOY","Y3 %","Closest benchmark"].map((h,i)=><th key={i} style={{textAlign:i>0&&i<7?"right":"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr></thead>
          <tbody>
            {cases.map((c,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,verticalAlign:"top"}}>
              <td style={{padding:"12px 14px",fontWeight:700,color:c.color}}>{c.n}<div style={{fontSize:10.5,fontWeight:500,color:"#888",marginTop:2}}>{c.lead}</div></td>
              <td style={{padding:"12px 14px",textAlign:"right",fontFamily:BRAND.font,color:"#555"}}>{fmtNum(c.y1)}</td>
              <td style={{padding:"12px 14px",textAlign:"right",fontFamily:BRAND.font,fontWeight:700,color:c.color}}>{fmtPct(pen(c.y1))}</td>
              <td style={{padding:"12px 14px",textAlign:"right",fontFamily:BRAND.font,color:"#555"}}>{fmtNum(c.y2)}</td>
              <td style={{padding:"12px 14px",textAlign:"right",fontFamily:BRAND.font,fontWeight:700,color:c.color}}>{fmtPct(pen(c.y2))}</td>
              <td style={{padding:"12px 14px",textAlign:"right",fontFamily:BRAND.font,color:"#555"}}>{fmtNum(c.y3)}</td>
              <td style={{padding:"12px 14px",textAlign:"right",fontFamily:BRAND.font,fontWeight:700,color:c.color,fontSize:14}}>{fmtPct(pen(c.y3))}</td>
              <td style={{padding:"12px 14px",fontSize:11.5,color:"#666",lineHeight:1.45}}>{c.bm}</td>
            </tr>)}
            <tr><td colSpan={8} style={{padding:"10px 14px",background:"#FAFAFA",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase"}}>Telco-distributed SMB SaaS benchmark band</td></tr>
            {refs.map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`}}>
              <td style={{padding:"10px 14px",fontWeight:600,color:"#333"}}>{r.n}<div style={{fontSize:10.5,fontWeight:500,color:"#888",marginTop:2}}>{r.note}</div></td>
              <td colSpan={5} style={{padding:"10px 14px",textAlign:"right",color:"#888",fontSize:11.5}}>over {r.years}</td>
              <td style={{padding:"10px 14px",textAlign:"right",fontFamily:BRAND.font,fontWeight:700,color:"#111",fontSize:14}}>{r.pct}</td>
              <td style={{padding:"10px 14px",fontSize:11.5,color:"#666",lineHeight:1.45}}>Cumulative penetration of operator SMB base</td>
            </tr>)}
          </tbody>
        </table>
      </Card>;
    })()}
    <Note label="What this tells the CFO">
      The proposal base case (Y3 EOY ≈ 34% of e& SMB base) sits <strong style={{color:"#111"}}>above the historical telco-SaaS band of 12–22%</strong> — achievable but only if e& commits to (1) bundle-by-default in new SMB acquisitions, (2) account-manager comp tied to agent attach, and (3) Arabic-voice differentiation genuinely landing. A central case of Y3 ≈ 28% (~70K paying) sits inside the upper end of the benchmark band and still produces AED 250M+ in 3-year cumulative EBITDA. The Bear case (~22%) tracks Microsoft 365 / BT Cloud penetration almost exactly and is therefore the defensible CFO floor.
    </Note>

    {/* ──────── INTERNATIONAL EXPANSION ──────── */}
    <SH>e& international expansion — beyond UAE</SH>
    <p style={{fontSize:13,color:"#666",lineHeight:1.65,maxWidth:880,marginBottom:14}}>
      The figures in the calculator above are <strong style={{color:"#111"}}>UAE-only</strong>. e& Group operates across 38 countries through e& International (UAE), <strong style={{color:"#111"}}>Etisalat Misr</strong> (Egypt, 100%), <strong style={{color:"#111"}}>Maroc Telecom</strong> (53%, plus 10 African subsidiaries under Moov Africa), <strong style={{color:"#111"}}>PTCL / Ufone</strong> (Pakistan, 62%) and a <strong style={{color:"#111"}}>26% stake in Mobily</strong> (Saudi Arabia). The platform was designed multi-tenant, multi-currency and multi-language, and Arabic-first agentic AI is uniquely portable across MENA. The table below is a strategic projection of what international rollout adds <strong style={{color:"#111"}}>on top of</strong> the UAE base case — it is not part of the contracted commercial model.
    </p>
    {(() => {
      const intl = [
        {m:"UAE", b:"e&", stake:"100%", base:250000, launch:"Y1 · M1", active:36, pen:y3Cust/250000, arpu:y3ARPU, type:"live", note:"Home market · slider-driven · full bundle control"},
        {m:"Egypt", b:"Etisalat Misr", stake:"100%", base:400000, launch:"Y2 · Q3", active:18, pen:0.08, arpu:130, type:"static", note:"Arabic-native fit · 2nd-largest mobile operator · ~28% market share"},
        {m:"Saudi Arabia", b:"Mobily", stake:"26% (associate)", base:200000, launch:"Y2 · Q4", active:15, pen:0.05, arpu:290, type:"static", note:"Arabic-native · high ARPU · minority stake limits bundle leverage"},
        {m:"Morocco", b:"Maroc Telecom", stake:"53%", base:110000, launch:"Y3 · Q1", active:9, pen:0.06, arpu:240, type:"static", note:"Market leader (~40% share) · Arabic + French · full commercial control"},
        {m:"Pakistan", b:"PTCL / Ufone", stake:"62%", base:320000, launch:"Y3 · Q2", active:6, pen:0.03, arpu:95, type:"static", note:"Urdu adaptation required · price-sensitive market · large SMB base"},
        {m:"Sub-Saharan Africa", b:"Moov Africa (via Maroc Telecom)", stake:"53% (consolidated)", base:180000, launch:"Y3 · Q3", active:3, pen:0.015, arpu:110, type:"static", note:"10 markets · French + local · earliest stage · long-term option"},
      ];
      const rows = intl.map(r => ({...r, paying: Math.round(r.base * r.pen), revRunRate: Math.round(r.base * r.pen * r.arpu * 12)}));
      const totals = rows.reduce((a, r) => ({base: a.base + r.base, paying: a.paying + r.paying, revRunRate: a.revRunRate + r.revRunRate}), {base:0, paying:0, revRunRate:0});
      const uaeOnly = rows[0];
      const intlOnly = {paying: totals.paying - uaeOnly.paying, revRunRate: totals.revRunRate - uaeOnly.revRunRate};
      return <>
        <Card style={{padding:0,overflow:"hidden",marginBottom:14}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr style={{background:BRAND.lightGrey}}>
              {["Market","e& brand · stake","SMB base (est.)","Launch","Y3 active mo.","Y3 penetration","Local ARPU (AED equiv.)","Y3 paying","Y3 revenue (run-rate)"].map((h,i)=><th key={i} style={{textAlign:i>1?"right":"left",padding:"12px 12px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
            </tr></thead>
            <tbody>
              {rows.map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,verticalAlign:"top",background:i===0?"#FFFBFB":"transparent"}}>
                <td style={{padding:"12px 12px",fontWeight:700,color:"#111"}}>{r.m}{i===0 && <div style={{fontSize:10,color:BRAND.red,fontWeight:700,marginTop:2,letterSpacing:"0.04em",textTransform:"uppercase"}}>Live · slider-driven</div>}</td>
                <td style={{padding:"12px 12px",color:"#333"}}>{r.b}<div style={{fontSize:10.5,color:"#888",marginTop:2}}>{r.stake}</div></td>
                <td style={{padding:"12px 12px",textAlign:"right",fontFamily:BRAND.font,color:"#555"}}>{fmtNum(r.base)}</td>
                <td style={{padding:"12px 12px",textAlign:"right",fontFamily:"monospace",fontSize:11.5,color:"#777"}}>{r.launch}</td>
                <td style={{padding:"12px 12px",textAlign:"right",fontFamily:BRAND.font,color:"#555"}}>{r.active}</td>
                <td style={{padding:"12px 12px",textAlign:"right",fontFamily:BRAND.font,fontWeight:700,color:BRAND.red}}>{fmtPct(r.pen)}</td>
                <td style={{padding:"12px 12px",textAlign:"right",fontFamily:BRAND.font,color:"#555"}}>AED {Math.round(r.arpu)}</td>
                <td style={{padding:"12px 12px",textAlign:"right",fontFamily:BRAND.font,fontWeight:700,color:"#111"}}>{fmtNum(r.paying)}</td>
                <td style={{padding:"12px 12px",textAlign:"right",fontFamily:BRAND.font,fontWeight:700,color:BRAND.red}}>{fmtAED(r.revRunRate)}</td>
              </tr>)}
              <tr style={{background:BRAND.lightGrey,borderTop:`2px solid ${BRAND.red}`}}>
                <td style={{padding:"12px 12px",fontWeight:700,color:"#111"}}>e& Group total</td>
                <td style={{padding:"12px 12px",color:"#111",fontWeight:600}}>6 markets across MENA / SSA / SAARC</td>
                <td style={{padding:"12px 12px",textAlign:"right",fontWeight:700,color:"#111",fontFamily:BRAND.font}}>{fmtNum(totals.base)}</td>
                <td style={{padding:"12px 12px"}}></td>
                <td style={{padding:"12px 12px"}}></td>
                <td style={{padding:"12px 12px",textAlign:"right",fontWeight:700,color:BRAND.red,fontFamily:BRAND.font}}>{fmtPct(totals.paying / totals.base)}</td>
                <td style={{padding:"12px 12px"}}></td>
                <td style={{padding:"12px 12px",textAlign:"right",fontWeight:700,color:"#111",fontFamily:BRAND.font,fontSize:14}}>{fmtNum(totals.paying)}</td>
                <td style={{padding:"12px 12px",textAlign:"right",fontWeight:700,color:BRAND.red,fontFamily:BRAND.font,fontSize:14}}>{fmtAED(totals.revRunRate)}</td>
              </tr>
              <tr>
                <td colSpan={9} style={{padding:"10px 14px",background:"#FAFAFA",fontSize:11,color:"#888",lineHeight:1.55}}>Each market row uses country-specific assumptions: ARPU is purchasing-power adjusted (Egypt ~31% of UAE, Pakistan ~22%, Morocco ~57%), penetration is scaled down for shorter runway and (for KSA) minority-stake commercial leverage. Y3 revenue is end-of-Y3 run-rate (paying × ARPU × 12), not full-year revenue.</td>
              </tr>
            </tbody>
          </table>
        </Card>

        {/* IMPACT KPIs */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:12,marginBottom:14}}>
          <Card style={{padding:18,borderTop:`3px solid ${BRAND.red}`}}>
            <div style={{fontSize:11,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:6}}>UAE only · Y3 run-rate</div>
            <div style={{fontSize:24,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font}}>{fmtNum(uaeOnly.paying)} <span style={{fontSize:11,color:"#888",fontWeight:500}}>paying</span></div>
            <div style={{fontSize:14,fontWeight:700,color:"#111",fontFamily:BRAND.font,marginTop:4}}>{fmtAED(uaeOnly.revRunRate)}<span style={{fontSize:11,color:"#888",fontWeight:500}}> · annualised</span></div>
            <div style={{fontSize:11,color:"#888",marginTop:8,lineHeight:1.55}}>The CFO base case if international rollout is deferred. Drives the build / opex case on this page.</div>
          </Card>
          <Card style={{padding:18,borderTop:`3px solid #004B2E`}}>
            <div style={{fontSize:11,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:6}}>+ International · Y3 run-rate</div>
            <div style={{fontSize:24,fontWeight:700,color:"#004B2E",fontFamily:BRAND.font}}>{fmtNum(intlOnly.paying)} <span style={{fontSize:11,color:"#888",fontWeight:500}}>additional paying</span></div>
            <div style={{fontSize:14,fontWeight:700,color:"#111",fontFamily:BRAND.font,marginTop:4}}>{fmtAED(intlOnly.revRunRate)}<span style={{fontSize:11,color:"#888",fontWeight:500}}> · annualised</span></div>
            <div style={{fontSize:11,color:"#888",marginTop:8,lineHeight:1.55}}>Strategic upside layer. Build cost stays at AED 12.6M — platform is multi-tenant, so deployment cost is incremental hosting + localisation only.</div>
          </Card>
          <Card style={{padding:18,borderTop:`3px solid #111`}}>
            <div style={{fontSize:11,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:6}}>e& Group · Y3 run-rate</div>
            <div style={{fontSize:24,fontWeight:700,color:"#111",fontFamily:BRAND.font}}>{fmtNum(totals.paying)} <span style={{fontSize:11,color:"#888",fontWeight:500}}>paying</span></div>
            <div style={{fontSize:14,fontWeight:700,color:"#111",fontFamily:BRAND.font,marginTop:4}}>{fmtAED(totals.revRunRate)}<span style={{fontSize:11,color:"#888",fontWeight:500}}> · annualised</span></div>
            <div style={{fontSize:11,color:"#888",marginTop:8,lineHeight:1.55}}>≈ {(totals.paying / uaeOnly.paying).toFixed(1)}× UAE-only paying base · {(totals.revRunRate / uaeOnly.revRunRate).toFixed(1)}× revenue (mix-shifted by lower international ARPU).</div>
          </Card>
        </div>

        {/* ROLLOUT RAMP TABLE */}
        <Card style={{padding:0,overflow:"hidden",marginBottom:14}}>
          <div style={{padding:"14px 22px",borderBottom:`1px solid ${BRAND.border}`,background:"#FAFAFA"}}>
            <div style={{fontSize:13,fontWeight:700,color:"#111"}}>Month-by-month customer rollout — UAE · Saudi · Morocco · Hungary</div>
            <div style={{fontSize:11,color:"#888",marginTop:4}}>Cumulative paying SMB customers by market at end of each 6-month period · UAE figures driven by current slider settings</div>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5,minWidth:600}}>
              <thead>
                <tr style={{background:BRAND.lightGrey}}>
                  {["Period","UAE","Saudi Arabia","Morocco","Hungary","Total customers"].map((h,i)=><th key={i} style={{textAlign:i?"right":"left",padding:"12px 16px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`,whiteSpace:"nowrap"}}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  {period:"M1–6",  uae: Math.round(y1Cust*0.32), ksa:0,     mar:0,    hun:0,    note:"UAE soft launch only · Saudi pre-commercial"},
                  {period:"M7–12", uae: Math.round(y1Cust*1.0),  ksa:5000,  mar:0,    hun:0,    note:"UAE EOY Y1 · Saudi commercial launch"},
                  {period:"M13–18",uae: Math.round(y1Cust + (y2Cust-y1Cust)*0.5), ksa:12000, mar:3000, hun:0,    note:"UAE Y2 mid · Morocco pilot · Saudi scaling"},
                  {period:"M19–24",uae: Math.round(y2Cust),      ksa:18000, mar:6000, hun:1500, note:"UAE EOY Y2 · Hungary soft launch"},
                  {period:"M25–30",uae: Math.round(y2Cust + (y3Cust-y2Cust)*0.5), ksa:22000, mar:8000, hun:3000, note:"UAE Y3 mid · all markets scaling"},
                  {period:"M31–36",uae: Math.round(y3Cust),      ksa:28000, mar:10000,hun:5000, note:"UAE EOY Y3 · full international footprint"},
                ].map((r,i)=>{
                  const total = r.uae + r.ksa + r.mar + r.hun;
                  const isLast = i === 5;
                  return <tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,background:isLast?BRAND.lightGrey:"transparent",verticalAlign:"top"}}>
                    <td style={{padding:"13px 16px",fontWeight:700,color:isLast?BRAND.red:"#111",fontFamily:"monospace",fontSize:12}}>{r.period}</td>
                    <td style={{padding:"13px 16px",textAlign:"right",fontFamily:BRAND.font,fontWeight:600,color:"#333"}}>{r.uae >= 1000 ? `${(r.uae/1000).toFixed(r.uae%1000===0?0:1)}k` : r.uae || "—"}</td>
                    <td style={{padding:"13px 16px",textAlign:"right",fontFamily:BRAND.font,color:r.ksa?"#333":"#ccc"}}>{r.ksa ? `${(r.ksa/1000).toFixed(0)}k` : "—"}</td>
                    <td style={{padding:"13px 16px",textAlign:"right",fontFamily:BRAND.font,color:r.mar?"#333":"#ccc"}}>{r.mar ? `${(r.mar/1000).toFixed(0)}k` : "—"}</td>
                    <td style={{padding:"13px 16px",textAlign:"right",fontFamily:BRAND.font,color:r.hun?"#333":"#ccc"}}>{r.hun ? `${(r.hun/1000).toFixed(1)}k` : "—"}</td>
                    <td style={{padding:"13px 16px",textAlign:"right",fontFamily:BRAND.font,fontWeight:700,color:isLast?BRAND.red:"#111",fontSize:isLast?14:12.5}}>{total >= 1000 ? `${(total/1000).toFixed(1)}k` : total}</td>
                  </tr>;
                })}
              </tbody>
            </table>
          </div>
          <div style={{padding:"10px 16px",background:"#FAFAFA",borderTop:`1px solid ${BRAND.border}`,fontSize:11,color:"#888",lineHeight:1.6}}>
            UAE figures are live-linked to the Year 1–3 customer sliders. Saudi Arabia = Mobily partnership (26% stake, conservative ramp). Morocco = Maroc Telecom (53%). Hungary = e& Europe entry point into EU SMB market; lower penetration, higher AED-equivalent ARPU (~AED 520/mo) due to purchasing power. All figures are cumulative paying customers at period end, not new additions.
          </div>
        </Card>

        {/* Y5 HORIZON */}
        <Card style={{padding:0,overflow:"hidden",marginBottom:14}}>
          <div style={{padding:"14px 22px",borderBottom:`1px solid ${BRAND.border}`,background:"#FAFAFA"}}>
            <div style={{fontSize:13,fontWeight:700,color:"#111"}}>5-year horizon · what international expansion looks like by Y5</div>
            <div style={{fontSize:11,color:"#888",marginTop:4}}>Y5 assumes proven model from Y3, international markets ramp toward 60–70% of UAE penetration trajectory, UAE approaches saturation at ~50% of e& SMB base</div>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
            <thead><tr style={{background:BRAND.lightGrey}}>
              {["Market","Y3 paying","Y5 paying","Y5 % e& SMB","Y5 revenue (run-rate)"].map((h,i)=><th key={i} style={{textAlign:i?"right":"left",padding:"12px 14px",fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
            </tr></thead>
            <tbody>
              {[
                {m:"UAE", y3:Math.round(y3Cust), y5:120000, base:250000, arpu:550, note:"Approaching saturation"},
                {m:"Egypt", y3:32000, y5:130000, base:400000, arpu:160, note:"33% penetration if proven"},
                {m:"Saudi Arabia", y3:10000, y5:45000, base:200000, arpu:340, note:"22% penetration via Mobily partnership"},
                {m:"Morocco", y3:6600, y5:25000, base:110000, arpu:280, note:"23% via Maroc Telecom direct bundle"},
                {m:"Pakistan", y3:9600, y5:60000, base:320000, arpu:115, note:"19% — large base, slow ramp"},
                {m:"Sub-Saharan Africa", y3:2700, y5:25000, base:180000, arpu:130, note:"14% across 10 Moov Africa markets"},
              ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,verticalAlign:"top"}}>
                <td style={{padding:"12px 14px",fontWeight:700,color:"#111"}}>{r.m}<div style={{fontSize:10.5,color:"#888",marginTop:2,fontWeight:500}}>{r.note}</div></td>
                <td style={{padding:"12px 14px",textAlign:"right",fontFamily:BRAND.font,color:"#888"}}>{fmtNum(r.y3)}</td>
                <td style={{padding:"12px 14px",textAlign:"right",fontFamily:BRAND.font,fontWeight:700,color:"#111"}}>{fmtNum(r.y5)}</td>
                <td style={{padding:"12px 14px",textAlign:"right",fontFamily:BRAND.font,fontWeight:700,color:BRAND.red}}>{fmtPct(r.y5/r.base)}</td>
                <td style={{padding:"12px 14px",textAlign:"right",fontFamily:BRAND.font,fontWeight:700,color:BRAND.red,fontSize:14}}>{fmtAED(r.y5 * r.arpu * 12)}</td>
              </tr>)}
              {(() => {
                const y5Markets = [
                  {y5:120000, arpu:550}, {y5:130000, arpu:160}, {y5:45000, arpu:340},
                  {y5:25000, arpu:280}, {y5:60000, arpu:115}, {y5:25000, arpu:130},
                ];
                const tY5 = y5Markets.reduce((s,r)=>s+r.y5,0);
                const tRev = y5Markets.reduce((s,r)=>s+r.y5*r.arpu*12,0);
                return <tr style={{background:BRAND.lightGrey,borderTop:`2px solid ${BRAND.red}`}}>
                  <td style={{padding:"12px 14px",fontWeight:700,color:"#111"}}>e& Group total · Year 5</td>
                  <td style={{padding:"12px 14px",textAlign:"right",fontWeight:700,color:"#888",fontFamily:BRAND.font}}>—</td>
                  <td style={{padding:"12px 14px",textAlign:"right",fontWeight:700,color:"#111",fontFamily:BRAND.font,fontSize:14}}>{fmtNum(tY5)}</td>
                  <td style={{padding:"12px 14px"}}></td>
                  <td style={{padding:"12px 14px",textAlign:"right",fontWeight:700,color:BRAND.red,fontFamily:BRAND.font,fontSize:15}}>{fmtAED(tRev)}</td>
                </tr>;
              })()}
            </tbody>
          </table>
        </Card>
      </>;
    })()}
    <Note label="Methodology — international study">
      <strong style={{color:"#111"}}>Penetration rates</strong> are scaled down from UAE by three factors: (a) shorter runway in Y3 (fewer active months), (b) commercial leverage of e&'s ownership (full bundle in 100%-owned markets, partnership in minority stakes like Mobily), and (c) language and regulatory adaptation cost. <strong style={{color:"#111"}}>ARPU</strong> is purchasing-power adjusted using OECD PPP indices: UAE 100% baseline, KSA 70%, Morocco 57%, Egypt 31%, Pakistan 22%. <strong style={{color:"#111"}}>Build cost</strong> stays at AED 12.6M — the platform is multi-tenant, so each new market adds only localisation (Arabic dialect packs, French, Urdu) and incremental hosting cost, both well under AED 1M per country. <strong style={{color:"#111"}}>Y5 horizon</strong> assumes the proof points from UAE Y3 unlock standardised rollout playbooks, putting international markets onto a faster ramp than Y1–Y3.
    </Note>

    {/* ──────── CFO ONE-PAGER ──────── */}
    <SH>CFO one-page summary</SH>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
      <Card style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"16px 22px",borderBottom:`1px solid ${BRAND.border}`,background:"#004B2E"}}>
          <div style={{fontSize:13,fontWeight:700,color:BRAND.white,letterSpacing:"0.04em",textTransform:"uppercase"}}>Why this works for e&</div>
        </div>
        <div style={{padding:20}}>
          {[
            "One-time cash outlay of AED 12.6M to AIdeology, paid on milestone delivery (no payment without working software).",
            "Cumulative e& cash flow turns positive within Year 1 in the base case — break-even before the build fee is fully amortised.",
            "e& retains 65% of gross SaaS revenue from Day 1, rising to 72% in Year 3 and 80% in Year 4+ as the team takes ownership.",
            "Connectivity, hosting, BSP, SMS and Toll Free 800 revenue stays 100% on the e& bill — telco margin not shared.",
            "Y4+ steady-state EBITDA margin > 80% with the platform run by an e& team of 8–10 FTE and AIdeology as platform licensor.",
            "Acquisition trigger at Y3–Y4 converts ongoing royalties into a clean buyout, valued at AED 750M–3B depending on multi-OpCo scope.",
          ].map((x,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:9,marginBottom:9}}>
            <span style={{color:"#004B2E",flexShrink:0,marginTop:2}}><CheckIcon/></span>
            <span style={{fontSize:12.5,color:"#444",lineHeight:1.55}}>{x}</span>
          </div>)}
        </div>
      </Card>
      <Card style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"16px 22px",borderBottom:`1px solid ${BRAND.border}`,background:BRAND.red}}>
          <div style={{fontSize:13,fontWeight:700,color:BRAND.white,letterSpacing:"0.04em",textTransform:"uppercase"}}>Key risks & mitigants</div>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <tbody>
            {[
              {r:"Customer adoption slower than 24K Y1",m:"Bear case still breaks even by ~M20; Wave-gated build means e& can pause spend after Wave 1 if traction misses"},
              {r:"LLM API cost inflation",m:"Hybrid model: self-hosted Llama/Falcon takes >50% of token volume from Y2 — variable COGS slider lets you stress test"},
              {r:"e& AI team ramp delays",m:"AIdeology contractually covers L3 platform support through Y3; fixed OpEx slider models the impact of slower ramp"},
              {r:"AIdeology dependency post-handover",m:"Handover plan: agent IP transfers by EOY2; platform IP licensed at 20% Y4+; buyout option from Y3"},
              {r:"Regulatory shift (CBUAE, DHA, NESA)",m:"Help AG sovereign security wrap and named compliance gates included from Day 1"},
              {r:"Connectivity revenue cannibalisation",m:"Modelled separately; AI agents drive higher BSP / SMS / Toll Free 800 traffic, not less"},
            ].map((r,i)=><tr key={i} style={{borderBottom:`1px solid ${BRAND.border}`,verticalAlign:"top"}}>
              <td style={{padding:"12px 14px",fontWeight:600,color:"#111",width:"38%"}}>{r.r}</td>
              <td style={{padding:"12px 14px",color:"#666",lineHeight:1.5}}>{r.m}</td>
            </tr>)}
          </tbody>
        </table>
      </Card>
    </div>

    <Note label="Model integrity">
      All numbers are computed live from the inputs above using a 36-month month-by-month simulation. The model assumes a launch delay of 2 months in Year 1 (revenue from Month 3), linear customer ramp between EOY counts, and ARPU constant within each year. AIdeology rev-share is applied to gross SaaS revenue only — connectivity, hosting, BSP, SMS and Toll Free 800 stay 100% with e&. Build cost is expensed as paid (Waves 1–4 at Months 3, 6, 9, 12) for the most conservative P&L view.
    </Note>
  </div>;
}

const HTM_TABS = ["Executive Summary","Financials","Deal Structure"];
function HaithamMeetingSection({showPricing=true}) {
  const [htmTab, setHtmTab] = useState(0);

  return <div>
    <div style={{padding:"44px 0 36px"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
        <div style={{width:44,height:44,background:BRAND.red,display:"flex",alignItems:"center",justifyContent:"center",color:BRAND.white,fontSize:18,fontWeight:700}}>H</div>
        <div>
          <div style={{fontSize:11,color:BRAND.red,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase"}}>Meeting prep · 30 minutes</div>
          <h2 style={{fontSize:32,fontWeight:700,color:BRAND.black,margin:0,lineHeight:1.1}}>Haitham Meeting</h2>
        </div>
      </div>
      <p style={{fontSize:15,color:BRAND.grey,maxWidth:720,lineHeight:1.6,margin:"0 0 20px"}}>
        Three sections: the opportunity and revenue, the financial model, and the deal terms.
      </p>
      <div style={{display:"flex",gap:16,flexWrap:"wrap",marginBottom:24}}>
        {[{v:"30 min",l:"Meeting duration"},{v:"90 days",l:"First revenue"},{v:"AED 378M",l:"Year 3 revenue"}].map((s,i)=><div key={i} style={{minWidth:100}}>
          <div style={{fontSize:26,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font}}>{s.v}</div>
          <div style={{fontSize:11,color:BRAND.grey,fontWeight:600}}>{s.l}</div>
        </div>)}
      </div>

      {/* SUB-TABS */}
      <div style={{display:"flex",gap:6}}>
        {HTM_TABS.map((t,i)=>{const a=htmTab===i;return<button key={i} onClick={()=>setHtmTab(i)} style={{padding:"10px 18px",fontSize:12,fontWeight:700,color:a?BRAND.white:BRAND.black,background:a?BRAND.red:BRAND.lightGrey,border:`1px solid ${a?BRAND.red:BRAND.border}`,borderRadius:0,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.15s"}}>{t}</button>})}
      </div>
    </div>

    {htmTab===0 && <HaithamExecSummary showPricing={showPricing}/>}
    {htmTab===1 && (showPricing ? <HaithamFinancials/> : <div style={{padding:"80px 0",textAlign:"center"}}>
      <div style={{fontSize:48,marginBottom:16,opacity:0.15}}>$</div>
      <h2 style={{fontSize:22,fontWeight:700,color:"#111",marginBottom:8}}>Financial details hidden</h2>
      <p style={{fontSize:14,color:"#888",maxWidth:420,margin:"0 auto",lineHeight:1.6}}>Toggle "Pricing visible" in the top navigation bar to view the financial model.</p>
    </div>)}
    {htmTab===2 && (showPricing ? <HaithamDealStructure/> : <div style={{padding:"80px 0",textAlign:"center"}}>
      <div style={{fontSize:48,marginBottom:16,opacity:0.15}}>$</div>
      <h2 style={{fontSize:22,fontWeight:700,color:"#111",marginBottom:8}}>Deal structure hidden</h2>
      <p style={{fontSize:14,color:"#888",maxWidth:420,margin:"0 auto",lineHeight:1.6}}>Toggle "Pricing visible" in the top navigation bar to view revenue share and deal structure details.</p>
    </div>)}
  </div>;
}

/* ════════════════════════════════════════════════════════════ */
/* RAZZI MEETING — e& SMB AI lead · 3-page summary + PDF export */
/* Unlisted page · access via ?meeting=razzi or #razzi-meeting   */
/* ════════════════════════════════════════════════════════════ */

const RAZZI_PRINT_CSS = `
@media print {
  @page { size: A4; margin: 14mm 12mm; }
  html, body { background: #ffffff !important; }
  body.razzi-printing { visibility: hidden !important; }
  body.razzi-printing .razzi-print-area,
  body.razzi-printing .razzi-print-area * { visibility: visible !important; }
  body.razzi-printing .razzi-print-area {
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    color: #111 !important;
  }
  body.razzi-printing .razzi-no-print { display: none !important; }
  body.razzi-printing .razzi-print-only { display: block !important; }
  .razzi-page { page-break-after: always; break-after: page; }
  .razzi-page:last-child { page-break-after: auto; break-after: auto; }
  .razzi-avoid-break { page-break-inside: avoid; break-inside: avoid; }
  body.razzi-printing .razzi-print-area h2 { font-size: 22pt !important; }
  body.razzi-printing .razzi-print-area h3 { font-size: 12pt !important; }
  body.razzi-printing .razzi-print-area h4 { font-size: 12pt !important; }
  body.razzi-printing .razzi-print-area h5 { font-size: 10pt !important; }
}
.razzi-print-only { display: none !important; }
@media print {
  body.razzi-printing .razzi-print-only { display: block !important; }
  body.razzi-printing .razzi-print-only.razzi-print-flex { display: flex !important; justify-content: space-between !important; }
}
`;

function RazziStat({v,l,accent}) {
  return <div style={{flex:"1 1 140px",minWidth:130,padding:"14px 18px",border:`1px solid ${BRAND.border}`,background:BRAND.white}}>
    <div style={{fontSize:24,fontWeight:700,color:accent||BRAND.red,fontFamily:BRAND.font,lineHeight:1}}>{v}</div>
    <div style={{fontSize:10.5,color:BRAND.grey,fontWeight:600,marginTop:6,letterSpacing:"0.04em",textTransform:"uppercase"}}>{l}</div>
  </div>;
}

function RazziPageHeader({n,total,title,kicker}) {
  return <div className="razzi-avoid-break" style={{margin:"0 0 18px",borderTop:`3px solid ${BRAND.red}`,paddingTop:16}}>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
      <span style={{fontSize:10.5,fontWeight:700,letterSpacing:"0.1em",color:BRAND.red,textTransform:"uppercase"}}>Page {n} of {total}</span>
      <span style={{flex:1,height:1,background:BRAND.border}}/>
      <span style={{fontSize:10.5,color:BRAND.grey,letterSpacing:"0.04em",textTransform:"uppercase",fontWeight:600}}>{kicker}</span>
    </div>
    <h3 style={{fontSize:22,fontWeight:700,color:BRAND.black,margin:0,lineHeight:1.15,fontFamily:BRAND.font}}>{title}</h3>
  </div>;
}

function RazziPage1() {
  return <div className="razzi-page">
    <RazziPageHeader n={1} total={3} kicker="The plan" title="An AI operating layer for 700K+ UAE SMBs" />

    <Card className="razzi-avoid-break">
      <p style={{fontSize:13,color:"#444",lineHeight:1.7,margin:0}}>
        e& has the strongest telco brand and the largest SMB customer base in the Gulf — and nobody, not Microsoft, not G42, not Salesforce, has shipped an AI layer built into that infrastructure. The plan is not a catalog of small bots. It is one e&-branded AI operating layer that runs the entire SMB — Customer, Sales, Communications, Finance, Operations, People — built on e& sovereign infrastructure, in Arabic and English, and handed back to e& as the SMB team takes ownership.
      </p>
    </Card>

    <SH>Why now</SH>
    <Card style={{padding:0,overflow:"hidden"}} className="razzi-avoid-break">
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))"}}>
        {[
          {n:"01",t:"700K+ SMBs in UAE",d:"The largest SMB base in the Gulf, plus an immediate Saudi + Morocco expansion path through e&'s OpCo footprint."},
          {n:"02",t:"90-day window",d:"AI switching costs compound. Every month without an e& product is 2,000+ SMBs that pick up a competitor's tool — and stay."},
          {n:"03",t:"Nobody is local",d:"Microsoft Copilot is global English. G42 sells compute, not solutions. Salesforce is CRM-first. None are telco-native, none are Arabic-first."},
          {n:"04",t:"e&'s assets matter",d:"SIM identity, Toll Free 800, BSP/SMS, e& Pay, sovereign hosting. These aren't features — they're a moat no SaaS vendor can replicate."},
        ].map((x,i)=><div key={i} style={{padding:20,borderRight:(i+1)%2===0?"none":`1px solid ${BRAND.border}`,borderBottom:i<2?`1px solid ${BRAND.border}`:"none"}}>
          <div style={{fontSize:10,fontWeight:700,color:BRAND.red,letterSpacing:"0.08em",marginBottom:6}}>{x.n}</div>
          <div style={{fontSize:13.5,fontWeight:700,color:"#111",marginBottom:6}}>{x.t}</div>
          <div style={{fontSize:11.5,color:"#666",lineHeight:1.55}}>{x.d}</div>
        </div>)}
      </div>
    </Card>

    <SH>What we plan to build</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <div style={{padding:"18px 24px",borderBottom:`1px solid ${BRAND.border}`}}>
        <h4 style={{fontSize:15,fontWeight:700,color:"#111",margin:0}}>Six agentic solutions on one platform — not six disconnected bots</h4>
        <p style={{fontSize:12,color:"#777",lineHeight:1.55,margin:"6px 0 0",maxWidth:760}}>
          Each solution owns an entire business function end-to-end. Shared identity, memory, billing, connectors and observability — so each new agent ships faster than the last and the same brain runs across voice, WhatsApp and web.
        </p>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Agentic solution","What it does for the SMB","Replaces"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"10px 16px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {n:"Customer Agent",w:"Flagship · Wave 1",d:"Answers every inbound — voice, WhatsApp, web — in Arabic and English. Books appointments, takes orders, escalates with full context.",r:"Front desk, call centre, after-hours WhatsApp number, web chat widget"},
            {n:"Sales Agent",w:"Wave 2",d:"Native CRM with AI lead scoring, pipeline tracking, automated follow-ups and Arabic quote drafting. Syncs to Salesforce / HubSpot / Dynamics if the SMB has one.",r:"Excel sheets, missed follow-ups, the salesperson who forgets to call back"},
            {n:"Comms Hub",w:"Wave 2",d:"One AI-powered dashboard for WhatsApp, SMS, email, voice and Instagram DM. The owner types a campaign in Arabic; the AI writes, targets, sends and reports.",r:"5 separate marketing tools that don't talk to each other"},
            {n:"Finance Agent",w:"Wave 3",d:"FTA-compliant bilingual invoicing, e& Pay payment links over WhatsApp, automated VAT prep, escalating overdue chase sequences.",r:"Excel invoices, manual VAT, the accountant who only shows up quarterly"},
            {n:"Ops Agent",w:"Wave 3",d:"Tasks, approvals, SOPs and service tickets — auto-created from real business events (a booking, a complaint, a meeting). Teams / Planner / Google Tasks sync.",r:"WhatsApp groups used as task management"},
            {n:"People Agent",w:"Wave 4",d:"UAE-native HR: WPS SIF payroll, gratuity, attendance via e& SIM, leave on WhatsApp, visa expiry alerts at 90/60/30 days.",r:"The Excel sheet that tracks visa dates and the PRO who remembers them"},
          ].map((r,i)=><tr key={i} style={{borderBottom:i<5?`1px solid ${BRAND.border}`:"none",verticalAlign:"top"}}>
            <td style={{padding:"12px 16px",fontWeight:700,color:BRAND.black,minWidth:130}}>
              <div>{r.n}</div>
              <div style={{fontSize:10,fontWeight:600,color:BRAND.red,marginTop:3,letterSpacing:"0.04em",textTransform:"uppercase"}}>{r.w}</div>
            </td>
            <td style={{padding:"12px 16px",color:"#444",lineHeight:1.55}}>{r.d}</td>
            <td style={{padding:"12px 16px",color:"#888",fontSize:11.5,lineHeight:1.5,minWidth:170}}>{r.r}</td>
          </tr>)}
        </tbody>
      </table>
    </Card>

    <SH>Reference architecture (technical view)</SH>
    <Card style={{padding:0,overflow:"hidden"}} className="razzi-avoid-break">
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Layer","Primary components","Engineering intent"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"10px 16px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {l:"Experience layer",c:"Next.js tenant portal, onboarding, back-office UI, agent control center",e:"Single UX for all agents; role-scoped access for owner, manager, support, finance and HR personas."},
            {l:"Channel layer",c:"CloudTalk/PBX voice, WhatsApp BSP, web chat widget, email/SMS adapters",e:"One conversation envelope across channels with idempotent message ingestion and deterministic routing."},
            {l:"Agent runtime",c:"Forge orchestration, policy engine, tool router, prompt/version registry",e:"Per-tenant policy boundaries; reusable workflows so new agents ship by composition not re-implementation."},
            {l:"Model + retrieval",c:"Portkey gateway, multi-model routing, vector store, cache, eval harness",e:"Cost/latency optimization with fallback; Arabic/English grounding from tenant knowledge base and CRM context."},
            {l:"Data + integration",c:"Postgres, object storage, event bus, connector SDK (Salesforce, Dynamics, Shopify, MOHRE, GDRFA)",e:"Event-first architecture; every state change is auditable and replayable for support and compliance."},
            {l:"Platform ops",c:"Kubernetes, CI/CD, observability stack, secrets manager, IAM/SSO",e:"Sovereign deployment with zero-trust defaults, controlled releases, and measurable SLO ownership."},
          ].map((r,i)=><tr key={i} style={{borderBottom:i<5?`1px solid ${BRAND.border}`:"none",verticalAlign:"top"}}>
            <td style={{padding:"12px 16px",fontWeight:700,color:BRAND.black,minWidth:140}}>{r.l}</td>
            <td style={{padding:"12px 16px",color:"#444",lineHeight:1.55}}>{r.c}</td>
            <td style={{padding:"12px 16px",color:"#666",lineHeight:1.55}}>{r.e}</td>
          </tr>)}
        </tbody>
      </table>
    </Card>

    <SH>Request-to-resolution data flow</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:12,marginBottom:14}} className="razzi-avoid-break">
      {[
        {t:"1) Ingest + identity",d:"Inbound event (voice frame, WhatsApp message, web chat) enters gateway, tenant resolved, customer identity matched (SIM/phone/email), and trace ID assigned."},
        {t:"2) Context assembly",d:"Agent loads customer timeline, open tasks, CRM state, KB chunks, and policy profile; all inputs are time-bound and source-tagged for auditability."},
        {t:"3) Plan + execute",d:"Policy engine chooses tools (calendar, payment, CRM writeback, ticketing). LLM generates structured action plan, tool calls execute, retries are bounded."},
        {t:"4) Response + memory",d:"User response returned on channel, structured outcome persisted, confidence + escalation signals computed, and human handoff packet prepared if needed."},
      ].map((x,i)=><div key={i} style={{padding:16,background:BRAND.white,border:`1px solid ${BRAND.border}`}}>
        <div style={{fontSize:12.5,fontWeight:700,color:"#111",marginBottom:6}}>{x.t}</div>
        <div style={{fontSize:11.5,color:"#666",lineHeight:1.55}}>{x.d}</div>
      </div>)}
    </div>

    <SH>Why platform-centric beats point bots</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:12,marginBottom:14}} className="razzi-avoid-break">
      {[
        {t:"One identity per SMB",d:"A customer who calls today and WhatsApps tomorrow is the same person — across every agent. The SMB never sees a stitched-together stack."},
        {t:"Each new agent ships faster",d:"Wave 1 builds the platform foundation. Waves 2–4 ship two agents in parallel because the heavy work — identity, billing, connectors — is already done."},
        {t:"e& assets become defaults",d:"SIM, BSP, Toll Free 800, e& Pay and sovereign hosting are wired in once at the platform layer. Every agent gets them for free."},
        {t:"Marketplace, not project",d:"An SMB buys Customer Agent today and Finance Agent next quarter from the same e& marketplace. The upsell engine is built into the product."},
      ].map((x,i)=><div key={i} style={{padding:16,background:BRAND.white,border:`1px solid ${BRAND.border}`}}>
        <div style={{fontSize:12.5,fontWeight:700,color:"#111",marginBottom:6}}>{x.t}</div>
        <div style={{fontSize:11.5,color:"#666",lineHeight:1.55}}>{x.d}</div>
      </div>)}
    </div>

    <Note label="The single line for tomorrow" color={BRAND.red}>
      "We are building the AI operating layer for 700K+ UAE SMBs on e& infrastructure — six agentic solutions, one platform, Arabic-native, with the first paying customers live in 90 days."
    </Note>
  </div>;
}

function RazziPage2() {
  return <div className="razzi-page">
    <RazziPageHeader n={2} total={3} kicker="How we ship it" title="Six agents in 36 weeks · first paying SMBs in 90 days" />

    <SH>The 5-wave roadmap</SH>
    <Card style={{padding:0,overflow:"hidden"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Wave","What ships","Timeline","Beta gate"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"10px 16px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {w:"Wave 1",t:"Platform foundation + Customer Agent (voice, WhatsApp, web, memory, handoff)",d:"Weeks 1–12",b:"Closed beta from W7 · 10–20 SMBs"},
            {w:"Wave 2",t:"Sales Agent + Comms Hub + P1 automation / compliance layer",d:"Weeks 13–18",b:"Beta runs through W17 · graduates at W18"},
            {w:"Wave 3",t:"Finance Agent + Ops Agent (e& Pay, FTA VAT, Teams / Planner)",d:"Weeks 19–24",b:"Beta from W21 · live invoicing"},
            {w:"Wave 4",t:"People Agent (WPS SIF, attendance via e& SIM, visa tracking)",d:"Weeks 25–30",b:"Real payroll runs · MOHRE sandbox"},
            {w:"Wave 5",t:"Security audit, performance hardening, full handoff to e&",d:"Weeks 31–36",b:"Pen test + e& team training"},
          ].map((r,i)=><tr key={i} style={{borderBottom:i<4?`1px solid ${BRAND.border}`:"none"}}>
            <td style={{padding:"12px 16px",fontWeight:700,color:BRAND.red,fontSize:12}}>{r.w}</td>
            <td style={{padding:"12px 16px",color:"#333",fontSize:12,lineHeight:1.5}}>{r.t}</td>
            <td style={{padding:"12px 16px",color:"#666",fontSize:11.5,fontFamily:"monospace",whiteSpace:"nowrap"}}>{r.d}</td>
            <td style={{padding:"12px 16px",color:"#666",fontSize:11.5}}>{r.b}</td>
          </tr>)}
        </tbody>
      </table>
    </Card>

    <SH>90-day launch sequence</SH>
    <Card style={{padding:0,overflow:"hidden"}} className="razzi-avoid-break">
      <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)"}}>
        {[
          {day:"Day 1–30",title:"Platform + first agent",color:BRAND.red,items:["AI platform stood up on e& sovereign infra","Identity, billing, observability wired","Customer Agent voice / WhatsApp / web functional","Arabic + English from Day 1, not retrofitted"]},
          {day:"Day 30–60",title:"Real customers, real data",color:"#D14600",items:["10–20 beta SMBs onboarded with live traffic","Real CSAT, real call data, real escalation flows","e& sales force sees the product working","Fix, tune, iterate on real feedback"]},
          {day:"Day 60–90",title:"GA + Wave 2 starts",color:"#004B2E",items:["Marketplace opens — any SMB can buy","Sales force fully enabled with Arabic collateral","First monthly SaaS revenue booked","Sales Agent + Comms Hub kick off in parallel"]},
        ].map((col,i)=><div key={i} style={{padding:20,borderRight:i<2?`1px solid ${BRAND.border}`:"none"}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",color:BRAND.white,background:col.color,padding:"4px 10px",display:"inline-block",marginBottom:10}}>{col.day}</div>
          <h5 style={{fontSize:13.5,fontWeight:700,color:"#111",margin:"0 0 10px"}}>{col.title}</h5>
          {col.items.map((it,j)=><div key={j} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:7}}>
            <span style={{width:5,height:5,background:col.color,flexShrink:0,marginTop:6}}/>
            <span style={{fontSize:11.5,color:"#555",lineHeight:1.45}}>{it}</span>
          </div>)}
        </div>)}
      </div>
      <div style={{padding:"14px 22px",background:BRAND.lightGrey,borderTop:`1px solid ${BRAND.border}`}}>
        <div style={{fontSize:12,color:"#333"}}><strong>Headline for tomorrow:</strong> <span style={{color:BRAND.red,fontWeight:700}}>"90 days from sign-off, e& has an AI product in market with paying SMBs. Nobody else in this market can promise that."</span></div>
      </div>
    </Card>

    <SH>Engineering execution model (what your technical team will inspect)</SH>
    <Card style={{padding:0,overflow:"hidden"}} className="razzi-avoid-break">
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Stage","Cadence","Artifacts / gates"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"10px 16px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {s:"Solution Design Document (SDD)",c:"48 hours",a:"Domain model, connector contracts, failure modes, observability plan, acceptance criteria signed before build."},
            {s:"Build sprint",c:"10–14 days",a:"Feature flags, schema migrations, backward-compatible APIs, integration stubs ready in staging."},
            {s:"Hardening sprint",c:"5–7 days",a:"Load tests, adversarial prompt tests, role/permission regression suite, recovery drills and rollback plan."},
            {s:"Beta gate",c:"1 week",a:"Real SMB traffic, measured latency/error rates, escalation quality review, bug burn-down to agreed threshold."},
            {s:"GA release",c:"Controlled",a:"Progressive rollout by tenant cohort, SLO monitoring, on-call runbook activation and post-release review."},
          ].map((r,i)=><tr key={i} style={{borderBottom:i<4?`1px solid ${BRAND.border}`:"none"}}>
            <td style={{padding:"12px 16px",fontWeight:700,color:BRAND.black}}>{r.s}</td>
            <td style={{padding:"12px 16px",color:"#666",fontFamily:"monospace"}}>{r.c}</td>
            <td style={{padding:"12px 16px",color:"#555",lineHeight:1.55}}>{r.a}</td>
          </tr>)}
        </tbody>
      </table>
    </Card>

    <SH>The quality bar</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:12,marginBottom:14}} className="razzi-avoid-break">
      {[
        {t:"Arabic + English native",d:"Not a translation layer. Native understanding in both, including Gulf dialect and Arabic / English code-switching in the same sentence."},
        {t:"One brain across channels",d:"A customer who starts on WhatsApp and calls later doesn't repeat themselves. Voice / WhatsApp / web share the same memory."},
        {t:"Sovereign by default",d:"Data, transcripts and recordings live on e& UAE-sovereign infrastructure. Help AG security wrap from Day 1."},
        {t:"Build-then-transfer",d:"Every agent, all source code, prompts and customisations are e&'s by end of Year 2. No vendor lock-in."},
      ].map((x,i)=><div key={i} style={{padding:16,background:BRAND.white,border:`1px solid ${BRAND.border}`}}>
        <div style={{fontSize:12.5,fontWeight:700,color:"#111",marginBottom:6}}>{x.t}</div>
        <div style={{fontSize:11.5,color:"#666",lineHeight:1.55}}>{x.d}</div>
      </div>)}
    </div>

    <SH>Operational SLOs + security controls</SH>
    <Card style={{padding:0,overflow:"hidden"}} className="razzi-avoid-break">
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Control area","Target / control","How it is enforced"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"10px 16px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {a:"Availability",t:"99.5% platform uptime (monthly)",e:"Health probes, autoscaling policies, failover runbooks, and release freeze during incidents."},
            {a:"Latency",t:"P95 response < 2.5s for text channels",e:"Gateway caching, model routing by latency class, async tool execution with timeout budgets."},
            {a:"Voice quality",t:"P95 turn latency < 1.2s",e:"Streaming ASR/TTS path and regional media termination close to e& voice infrastructure."},
            {a:"Security posture",t:"Zero-trust service-to-service",e:"mTLS, short-lived credentials, RBAC, network policies, secrets rotation and immutable audit logs."},
            {a:"Data residency",t:"UAE sovereign boundaries",e:"Tenant data, transcripts, recordings and backups remain on e&-approved infrastructure."},
            {a:"Model safety",t:"Prompt/response policy guardrails",e:"PII redaction, abuse classifiers, tool allowlists, and confidence-threshold escalations to human agents."},
          ].map((r,i)=><tr key={i} style={{borderBottom:i<5?`1px solid ${BRAND.border}`:"none",verticalAlign:"top"}}>
            <td style={{padding:"12px 16px",fontWeight:700,color:BRAND.black}}>{r.a}</td>
            <td style={{padding:"12px 16px",color:"#444",lineHeight:1.5}}>{r.t}</td>
            <td style={{padding:"12px 16px",color:"#666",lineHeight:1.55}}>{r.e}</td>
          </tr>)}
        </tbody>
      </table>
    </Card>

    <SH>What we need from the SMB AI team</SH>
    <Card style={{padding:0,overflow:"hidden"}} className="razzi-avoid-break">
      <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)"}}>
        {[
          {n:"1",title:"10–20 beta SMBs by W5",d:"Real businesses across restaurants, clinics, real estate, retail and professional services. Your account managers pick them; they become the GA reference customers."},
          {n:"2",title:"Named technical owners",d:"One person each for telephony / CloudTalk, WhatsApp BSP, billing API, identity / SSO. Documentation and sandbox access — not committees, not status calls."},
          {n:"3",title:"Sovereign infra access",d:"Kubernetes namespace on e& sovereign cloud. Container registry, base images, network access. e& data never leaves e&; we don't need it to."},
        ].map((x,i)=><div key={i} style={{padding:18,borderRight:i<2?`1px solid ${BRAND.border}`:"none"}}>
          <div style={{width:26,height:26,background:BRAND.red,color:BRAND.white,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,marginBottom:10}}>{x.n}</div>
          <h5 style={{fontSize:13,fontWeight:700,color:"#111",margin:"0 0 6px"}}>{x.title}</h5>
          <p style={{fontSize:11.5,color:"#666",lineHeight:1.55,margin:0}}>{x.d}</p>
        </div>)}
      </div>
      <div style={{padding:"12px 22px",background:BRAND.lightGrey,borderTop:`1px solid ${BRAND.border}`}}>
        <div style={{fontSize:12,color:BRAND.red,fontWeight:700}}>"We don't need committees. We need specs, a sandbox, and a beta list — we handle everything else."</div>
      </div>
    </Card>
  </div>;
}

function RazziPage3() {
  return <div className="razzi-page">
    <RazziPageHeader n={3} total={3} kicker="The outcome" title="What the SMB AI team owns at the end" />

    <SH>Customer trajectory</SH>
    <Card style={{padding:0,overflow:"hidden"}} className="razzi-avoid-break">
      <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)"}}>
        {[
          {yr:"Year 1",rev:"24,000",sub:"paying SMBs",arpu:"AED 285/mo",note:"Customer + Sales + Comms live"},
          {yr:"Year 2",rev:"62,000",sub:"paying SMBs",arpu:"AED 350/mo",note:"All 6 agents live · Saudi + Morocco open"},
          {yr:"Year 3",rev:"85,000",sub:"paying SMBs",arpu:"AED 420/mo",note:"Multi-agent upsell · vertical depth"},
          {yr:"Year 4+",rev:"100,000+",sub:"paying SMBs",arpu:"AED 450+/mo",note:"OpCo replication · enterprise upsell"},
        ].map((x,i)=><div key={i} style={{padding:18,borderRight:i<3?`1px solid ${BRAND.border}`:"none",textAlign:"center"}}>
          <div style={{fontSize:10.5,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:8}}>{x.yr}</div>
          <div style={{fontSize:28,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font,marginBottom:2,lineHeight:1}}>{x.rev}</div>
          <div style={{fontSize:11,fontWeight:600,color:"#444",marginBottom:6}}>{x.sub}</div>
          <div style={{fontSize:11,fontWeight:700,color:"#111",marginBottom:4}}>{x.arpu}</div>
          <div style={{fontSize:10.5,color:"#888",lineHeight:1.45}}>{x.note}</div>
        </div>)}
      </div>
    </Card>

    <SH>e& revenue from SMB subscriptions</SH>
    <Card style={{padding:0,overflow:"hidden"}} className="razzi-avoid-break">
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12.5}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Metric","Year 1","Year 2","Year 3","Year 4+"].map((h,i)=><th key={i} style={{textAlign:i?"right":"left",padding:"10px 16px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {s:"Gross SaaS revenue",y1:"AED 36.5M",y2:"AED 154M",y3:"AED 378M",y4:"AED 450M+",bold:false},
            {s:"e& share of revenue",y1:"65%",y2:"65%",y3:"72%",y4:"80%",bold:false},
            {s:"e& net SaaS revenue",y1:"AED 23.7M",y2:"AED 100.1M",y3:"AED 272.2M",y4:"AED 360M+",bold:true},
            {s:"+ connectivity / BSP / SMS uplift",y1:"included",y2:"included",y3:"included",y4:"included",bold:false},
          ].map((r,i)=><tr key={i} style={{borderBottom:i<3?`1px solid ${BRAND.border}`:"none",background:r.bold?BRAND.lightGrey:"transparent"}}>
            <td style={{padding:"11px 16px",fontWeight:r.bold?700:500,color:r.bold?BRAND.black:"#333"}}>{r.s}</td>
            {[r.y1,r.y2,r.y3,r.y4].map((v,j)=><td key={j} style={{padding:"11px 16px",textAlign:"right",fontWeight:r.bold?700:500,color:r.bold?BRAND.red:BRAND.grey,fontFamily:BRAND.font}}>{v}</td>)}
          </tr>)}
        </tbody>
      </table>
      <div style={{padding:"12px 18px",borderTop:`1px solid ${BRAND.border}`,fontSize:11,color:"#888",lineHeight:1.6}}>
        Connectivity uplift (Toll Free 800, BSP messages, SMS, e& Pay transactions) stays 100% with e& — it is incremental to the SaaS line above and grows with the active customer base.
      </div>
    </Card>

    <SH>Platform ownership package by Year 4 (technical handoff)</SH>
    <Card style={{padding:0,overflow:"hidden"}} className="razzi-avoid-break">
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead>
          <tr style={{background:BRAND.lightGrey}}>
            {["Handoff domain","e& receives","Operational impact"].map((h,i)=><th key={i} style={{textAlign:"left",padding:"10px 16px",fontSize:10,fontWeight:700,color:BRAND.grey,letterSpacing:"0.06em",textTransform:"uppercase",borderBottom:`1px solid ${BRAND.border}`}}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {[
            {d:"Source + CI/CD",r:"Repos, pipelines, environment manifests, release playbooks",o:"Independent release velocity with controlled change windows."},
            {d:"Runtime operations",r:"K8s deployment topology, autoscaling rules, SRE runbooks, incident templates",o:"e& on-call can detect, mitigate and recover without vendor dependency."},
            {d:"Data contracts",r:"Schema docs, event contracts, retention policies, migration history",o:"Safer integrations and lower risk when adding new vertical agents."},
            {d:"Agent quality stack",r:"Prompt registry, eval datasets, regression harnesses, scoring dashboards",o:"Model/prompt upgrades become measurable and reversible engineering changes."},
            {d:"Security + compliance",r:"Control matrix, audit evidence workflows, access models, key rotation SOPs",o:"Faster audits and repeatable compliance posture across OpCos."},
          ].map((r,i)=><tr key={i} style={{borderBottom:i<4?`1px solid ${BRAND.border}`:"none"}}>
            <td style={{padding:"12px 16px",fontWeight:700,color:BRAND.black}}>{r.d}</td>
            <td style={{padding:"12px 16px",color:"#444",lineHeight:1.55}}>{r.r}</td>
            <td style={{padding:"12px 16px",color:"#666",lineHeight:1.55}}>{r.o}</td>
          </tr>)}
        </tbody>
      </table>
    </Card>

    <SH>What the SMB AI team owns by Year 4</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:12,marginBottom:14}} className="razzi-avoid-break">
      {[
        {n:"01",t:"All 6 agents · full source",d:"Code, prompts, customisations, all customer data. Agent IP transfers in stages from Year 2; complete by end of Year 4."},
        {n:"02",t:"8–10 trained e& FTE",d:"By Y4 your team runs agent development end-to-end. Year 1: 2–3 FTE shadow; Year 2: 50/50; Year 3: e& leads; Year 4: e& owns it."},
        {n:"03",t:"Self-service marketplace",d:"SMB onboarding flow, tenant back office, billing, observability and connector management — operated by e& with AIdeology as platform partner only."},
        {n:"04",t:"Reusable AI factory",d:"The Forge platform under non-exclusive license. Add new agents internally without rebuilding identity, memory or connectors each time."},
      ].map((x,i)=><div key={i} style={{padding:16,background:BRAND.white,border:`1px solid ${BRAND.border}`}}>
        <div style={{fontSize:10,fontWeight:700,color:BRAND.red,letterSpacing:"0.08em",marginBottom:6}}>{x.n}</div>
        <div style={{fontSize:13,fontWeight:700,color:"#111",marginBottom:6}}>{x.t}</div>
        <div style={{fontSize:11.5,color:"#666",lineHeight:1.55}}>{x.d}</div>
      </div>)}
    </div>

    <SH>How AIdeology earns its place — the moves your team will see</SH>
    <Card style={{padding:0,overflow:"hidden"}} className="razzi-avoid-break">
      <div style={{padding:0}}>
        {[
          {l:"SDD methodology",d:"Every agent starts with a 48-hour Solution Design Document. No discovery phases that consume quarters. Build then starts in week 2."},
          {l:"8 people who move like 40",d:"Senior engineers owning the full stack. No handoffs, no PMs, no scope creep. Direct working relationship with your SMB AI team — no account-management layer."},
          {l:"Two parallel agents per wave",d:"Once the platform is live, each 6-week wave delivers two agents in parallel because the heavy plumbing is already done."},
          {l:"Pay only on milestones",d:"Fixed-fee waves with named acceptance criteria. If a wave fails its tests, e& doesn't pay until it passes."},
        ].map((x,i)=><div key={i} style={{padding:"12px 20px",borderBottom:i<3?`1px solid ${BRAND.border}`:"none",display:"flex",gap:16,alignItems:"flex-start"}}>
          <div style={{minWidth:160,fontSize:12.5,fontWeight:700,color:"#111"}}>{x.l}</div>
          <div style={{fontSize:11.5,color:"#666",lineHeight:1.55,flex:1}}>{x.d}</div>
        </div>)}
      </div>
    </Card>

    <SH>First 90 days after GA (technical operating rhythm)</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:12,marginBottom:14}} className="razzi-avoid-break">
      {[
        {t:"Week 1–2: Stability",d:"Daily incident review, latency/error burn-down, connector retry tuning, and top-10 failure-mode fixes."},
        {t:"Week 3–6: Throughput",d:"Prompt/flow optimization, cache policy tuning, queue policy updates, and autoscaling right-sizing per tenant cohort."},
        {t:"Week 7–10: Expansion",d:"Add next vertical templates, enable additional connectors, and harden enterprise controls introduced in P1 layer."},
        {t:"Week 11–13: Transfer",d:"Shadow-to-own transition for e& engineering/on-call with cutover checklist and signed operational acceptance."},
      ].map((x,i)=><div key={i} style={{padding:16,background:BRAND.white,border:`1px solid ${BRAND.border}`}}>
        <div style={{fontSize:12.5,fontWeight:700,color:"#111",marginBottom:6}}>{x.t}</div>
        <div style={{fontSize:11.5,color:"#666",lineHeight:1.55}}>{x.d}</div>
      </div>)}
    </div>

    <SH>Three lines to walk out with tomorrow</SH>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:12,marginBottom:14}} className="razzi-avoid-break">
      {[
        {n:"01",t:"First wave ships in 12 weeks",d:"Customer Agent live for paying SMBs by Week 13 — voice, WhatsApp and web, Arabic + English, on e& sovereign infra."},
        {n:"02",t:"24K paying SMBs in Year 1",d:"Measured CAC, real CSAT, real ARPU — and the e& sales force closing AI deals in the same call as a connectivity renewal."},
        {n:"03",t:"e& owns it by Year 4",d:"All 6 agents, 8–10 trained FTE, the marketplace, the customer data. 80%+ of an AED 450M+ revenue stream — without a vendor dependency."},
      ].map((x,i)=><div key={i} style={{padding:18,background:BRAND.lightGrey,border:`1px solid ${BRAND.border}`,borderTop:`3px solid ${BRAND.red}`}}>
        <div style={{fontSize:10,fontWeight:700,color:BRAND.red,letterSpacing:"0.08em",marginBottom:6}}>{x.n}</div>
        <div style={{fontSize:13.5,fontWeight:700,color:"#111",marginBottom:6,lineHeight:1.3}}>{x.t}</div>
        <div style={{fontSize:11.5,color:"#555",lineHeight:1.55}}>{x.d}</div>
      </div>)}
    </div>
  </div>;
}

function RazziMeetingSection() {
  const handleExport = () => {
    document.body.classList.add("razzi-printing");
    const cleanup = () => {
      document.body.classList.remove("razzi-printing");
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    setTimeout(() => {
      try { window.print(); } catch (e) { cleanup(); }
    }, 60);
  };

  return <div className="razzi-print-area">
    <style>{RAZZI_PRINT_CSS}</style>

    {/* SCREEN-ONLY HEADER (visible in app) */}
    <div className="razzi-no-print" style={{padding:"44px 0 28px"}}>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:20,flexWrap:"wrap",marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:46,height:46,background:"#222",display:"flex",alignItems:"center",justifyContent:"center",color:BRAND.white,fontSize:18,fontWeight:700}}>R</div>
          <div>
            <div style={{fontSize:11,color:BRAND.red,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase"}}>Internal · meeting prep · 30 minutes</div>
            <h2 style={{fontSize:30,fontWeight:700,color:BRAND.black,margin:"4px 0 0",lineHeight:1.1,fontFamily:BRAND.font}}>Razzi · e& SMB AI lead</h2>
            <div style={{fontSize:12,color:BRAND.grey,marginTop:4}}>Full SMB proposal content up to and including "Software stack & technology". Unlisted — not linked in the main deck.</div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleExport}
          style={{padding:"12px 20px",fontSize:12.5,fontWeight:700,color:BRAND.white,background:BRAND.red,border:"none",cursor:"pointer",letterSpacing:"0.04em",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:8}}
          title="Open the print dialog to save a formatted PDF"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5V2h8v3"/><rect x="3" y="5" width="10" height="6"/><path d="M5 11v3h6v-3"/></svg>
          Export to PDF
        </button>
      </div>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:6}}>
        <RazziStat v="SMB" l="section scope" />
        <RazziStat v="Start → Software stack" l="content range" />
        <RazziStat v="Included" l="software stack section" />
        <RazziStat v="Excluded" l="commercial model onward" />
      </div>
    </div>

    {/* PRINT-ONLY COVER */}
    <div className="razzi-print-only razzi-avoid-break" style={{paddingTop:6,marginBottom:18}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
        <img src="/logo.png" alt="e&" style={{height:30,width:"auto"}}/>
        <div style={{height:24,width:1,background:BRAND.border}}/>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.08em",color:BRAND.red,textTransform:"uppercase"}}>AIdeology x e& · SMB AI plan · Confidential</div>
      </div>
      <h2 style={{fontSize:24,fontWeight:700,color:BRAND.black,margin:"6px 0 4px",lineHeight:1.1}}>Razzi · e& SMB AI lead</h2>
      <div style={{fontSize:12,color:BRAND.grey}}>SMB section excerpt · start to "Software stack & technology" (included) · {new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"})}</div>
    </div>

    <SMBSegment upToSoftwareStack />

    {/* PRINT-ONLY FOOTER */}
    <div className="razzi-print-only razzi-print-flex" style={{marginTop:18,paddingTop:10,borderTop:`1px solid ${BRAND.border}`,fontSize:10,color:BRAND.grey}}>
      <span>AIdeology x e& · SMB AI plan · Confidential</span>
      <span>Prepared for Razzi · e& SMB AI lead</span>
    </div>
  </div>;
}

/* ════════════════════════════════════════════════════════════ */
/* CONTRACT PAGE — standalone, unlisted, print-ready          */
/* Access via ?view=contract or #contract — never linked      */
/* ════════════════════════════════════════════════════════════ */
const CONTRACT_PRINT_CSS = `
@media print {
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  body.contract-printing { background: #fff !important; }
  body.contract-printing .contract-no-print { display: none !important; }
  body.contract-printing .contract-print-only { display: block !important; }
  .contract-page { page-break-after: always; break-after: page; }
  .contract-page:last-child { page-break-after: auto; break-after: auto; }
  .contract-avoid-break { page-break-inside: avoid; break-inside: avoid; }
  body.contract-printing .contract-print-area h2 { font-size: 20pt !important; }
  body.contract-printing .contract-print-area h3 { font-size: 11pt !important; }
  body.contract-printing .contract-print-area h4 { font-size: 11pt !important; }
  body.contract-printing .contract-print-area p,
  body.contract-printing .contract-print-area td,
  body.contract-printing .contract-print-area li { font-size: 9pt !important; }
}
.contract-print-only { display: none !important; }
@media print {
  body.contract-printing .contract-print-only { display: block !important; }
  body.contract-printing .contract-print-only.contract-print-flex { display: flex !important; justify-content: space-between !important; }
}
`;

function ContractPage() {
  const [showPricing, setShowPricing] = useState(true);

  const handleExport = () => {
    document.body.classList.add("contract-printing");
    const cleanup = () => {
      document.body.classList.remove("contract-printing");
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    setTimeout(() => {
      try { window.print(); } catch (e) { cleanup(); }
    }, 60);
  };

  return <div className="contract-print-area" style={{minHeight:"100vh",background:BRAND.white,fontFamily:BRAND.font}}>
    <style>{CONTRACT_PRINT_CSS}</style>

    {/* ── SCREEN-ONLY HEADER ────────────────────────────────── */}
    <div className="contract-no-print" style={{background:BRAND.white,borderBottom:`3px solid ${BRAND.red}`,padding:"32px 28px 24px",maxWidth:1120,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:20,flexWrap:"wrap",marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <img src="/logo.png" alt="e&" style={{height:36,width:"auto"}}/>
          <div style={{height:32,width:1,background:BRAND.border}}/>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.1em",color:BRAND.red,textTransform:"uppercase",marginBottom:4}}>Confidential · for legal review and signature only</div>
            <div style={{fontSize:22,fontWeight:700,color:BRAND.black,lineHeight:1.1}}>Commercial Framework Agreement</div>
            <div style={{fontSize:12,color:BRAND.grey,marginTop:4}}>e& AI Networks & Solutions × AIdeology · v0.1 · May 2026 · Unlisted document</div>
          </div>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{fontSize:11,color:"#888",background:BRAND.lightGrey,border:`1px solid ${BRAND.border}`,padding:"6px 12px",fontWeight:600}}>
            This page is not linked from the main proposal. Share this URL directly with counterparties.
          </div>
          <button
            type="button"
            onClick={()=>setShowPricing(p=>!p)}
            style={{display:"flex",alignItems:"center",gap:7,padding:"12px 18px",fontSize:12,fontWeight:700,color:showPricing?BRAND.white:"#555",background:showPricing?BRAND.red:BRAND.lightGrey,border:`1px solid ${showPricing?BRAND.red:BRAND.border}`,cursor:"pointer",transition:"all 0.2s",whiteSpace:"nowrap"}}
          >
            <span style={{display:"inline-block",width:14,height:14,border:`1.5px solid ${showPricing?"rgba(255,255,255,0.6)":"#bbb"}`,background:showPricing?"rgba(255,255,255,0.2)":"transparent",position:"relative"}}>
              {showPricing && <span style={{position:"absolute",top:1,left:2,fontSize:10,lineHeight:1,color:BRAND.white}}>✓</span>}
            </span>
            {showPricing ? "Pricing visible" : "Pricing hidden"}
          </button>
          <button
            type="button"
            onClick={handleExport}
            style={{padding:"12px 20px",fontSize:12.5,fontWeight:700,color:BRAND.white,background:BRAND.red,border:"none",cursor:"pointer",letterSpacing:"0.04em",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:8}}
            title="Open the print dialog to save a formatted PDF"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5V2h8v3"/><rect x="3" y="5" width="10" height="6"/><path d="M5 11v3h6v-3"/></svg>
            Export to PDF
          </button>
        </div>
      </div>
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        {[
          {v:"14 articles",l:"Agreement structure"},
          {v:"$3,443,621",l:"Pillar 01 envelope"},
          {v:"4 years",l:"Minimum term"},
          {v:"v0.1 — draft",l:"Subject to legal review"},
        ].map((s,i)=><div key={i} style={{flex:"1 1 130px",minWidth:120,padding:"12px 16px",border:`1px solid ${BRAND.border}`,background:BRAND.white}}>
          <div style={{fontSize:20,fontWeight:700,color:BRAND.red,fontFamily:BRAND.font,lineHeight:1}}>{s.v}</div>
          <div style={{fontSize:10,color:BRAND.grey,fontWeight:600,marginTop:5,letterSpacing:"0.04em",textTransform:"uppercase"}}>{s.l}</div>
        </div>)}
      </div>
    </div>

    {/* ── PRINT-ONLY COVER ──────────────────────────────────── */}
    <div className="contract-print-only contract-avoid-break" style={{paddingTop:8,marginBottom:20,maxWidth:1120,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
        <img src="/logo.png" alt="e&" style={{height:32,width:"auto"}}/>
        <div style={{height:24,width:1,background:BRAND.border}}/>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.08em",color:BRAND.red,textTransform:"uppercase"}}>e& AI Networks & Solutions × AIdeology · Commercial Framework Agreement · Confidential</div>
      </div>
      <h2 style={{fontSize:26,fontWeight:700,color:BRAND.black,margin:"8px 0 4px",lineHeight:1.1}}>Commercial Framework Agreement</h2>
      <div style={{fontSize:12,color:BRAND.grey}}>
        v0.1 · Draft for legal review and signature · {new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"})}
      </div>
    </div>

    {/* ── CONTRACT BODY ─────────────────────────────────────── */}
    <div style={{maxWidth:1120,margin:"0 auto",padding:"0 28px 72px"}}>
      <FullStackSection showPricing={showPricing}/>
    </div>

    {/* ── PRINT-ONLY FOOTER ─────────────────────────────────── */}
    <div className="contract-print-only contract-print-flex" style={{maxWidth:1120,margin:"0 auto",padding:"0 28px",marginTop:24,paddingTop:10,borderTop:`1px solid ${BRAND.border}`,fontSize:10,color:BRAND.grey}}>
      <span>e& AI Networks & Solutions × AIdeology · Commercial Framework Agreement · Confidential</span>
      <span>v0.1 · {new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"})}</span>
    </div>
  </div>;
}

/* ════════════════════════════════════════════════════════════ */
/* MAIN APP */
/* ════════════════════════════════════════════════════════════ */
const TABS = ["Small & Medium Business","Enterprise & Government","GPUaaS & e& Platform"];
export default function App() {
  const [tab,setTab] = useState(0);
  const [view,setView] = useState("tab");
  const [showPricing,setShowPricing] = useState(true);
  const [proposalCorpus, setProposalCorpus] = useState("");
  const fullProposalRef = useRef(null);
  const eco = view==="eco";
  const sum = view==="sum";
  const hpc = view==="hpc";
  const cfo = view==="cfo";
  const htm = view==="htm";
  const rzm = view==="rzm";
  const stk = view==="stk";
  const ctr = view==="ctr";

  useEffect(() => {
    if (!fullProposalRef.current) return;
    const text = fullProposalRef.current.textContent || "";
    const normalized = text.replace(/\s+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    setProposalCorpus(normalized);
  }, []);

  // Unlisted route for the Razzi (e& SMB AI lead) meeting page.
  // Accessible only via ?meeting=razzi or #razzi-meeting — never linked from the tab bar.
  useEffect(() => {
    const isRazzi = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const hash = (window.location.hash || "").toLowerCase().replace(/^#\/?/, "");
        return params.get("meeting") === "razzi" || hash === "razzi-meeting" || hash === "razzi";
      } catch { return false; }
    };
    if (isRazzi()) setView("rzm");
    const onHash = () => { if (isRazzi()) setView("rzm"); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Unlisted route for the standalone Commercial Framework contract.
  // Accessible only via ?view=contract or #contract — never linked from the nav bar.
  useEffect(() => {
    const isContract = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const hash = (window.location.hash || "").toLowerCase().replace(/^#\/?/, "");
        return params.get("view") === "contract" || hash === "contract";
      } catch { return false; }
    };
    if (isContract()) setView("ctr");
    const onHash = () => { if (isContract()) setView("ctr"); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return <div style={{minHeight:"100vh",background:BRAND.white,fontFamily:BRAND.font,textAlign:"left"}}>
    {ctr && <ContractPage/>}
    {!rzm && !ctr && <>
    <nav style={{position:"sticky",top:0,zIndex:50,background:BRAND.white,borderBottom:`1px solid ${BRAND.border}`}}>
      <div style={{maxWidth:1120,margin:"0 auto",padding:"0 28px",display:"flex",alignItems:"center",justifyContent:"space-between",height:72}}>
        <div style={{display:"flex",alignItems:"center",gap:18}}>
          <img src="/logo.png" alt="e&" style={{height:34,width:"auto",display:"block"}} />
          <div>
            <div style={{fontSize:14,fontWeight:700,color:BRAND.black}}>AIdeology partnership</div>
            <div style={{fontSize:11,color:BRAND.grey,marginTop:2}}>Commercial framework</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <button
            onClick={()=>setShowPricing(p=>!p)}
            style={{display:"flex",alignItems:"center",gap:7,padding:"7px 14px",fontSize:11,fontWeight:700,color:showPricing?BRAND.white:"#555",background:showPricing?BRAND.red:BRAND.lightGrey,border:`1px solid ${showPricing?BRAND.red:BRAND.border}`,borderRadius:0,cursor:"pointer",transition:"all 0.2s",whiteSpace:"nowrap"}}
          >
            <span style={{display:"inline-block",width:14,height:14,borderRadius:0,border:`1.5px solid ${showPricing?"rgba(255,255,255,0.6)":"#bbb"}`,background:showPricing?"rgba(255,255,255,0.2)":"transparent",position:"relative"}}>
              {showPricing && <span style={{position:"absolute",top:1,left:2,fontSize:10,lineHeight:1,color:BRAND.white}}>✓</span>}
            </span>
            {showPricing?"Pricing visible":"Pricing hidden"}
          </button>
          <div style={{fontSize:11,color:BRAND.grey,fontWeight:500}}>Confidential</div>
        </div>
      </div>
    </nav>
    <div style={{background:BRAND.white,borderBottom:`1px solid ${BRAND.border}`}}>
      <div style={{maxWidth:1120,margin:"0 auto",padding:"72px 28px 58px"}}>
        <div style={{fontSize:12,color:BRAND.red,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:16}}>AI go-to-market partnership</div>
        <h1 style={{fontSize:48,fontWeight:700,color:BRAND.black,lineHeight:1.02,margin:"0 0 20px",fontFamily:BRAND.font,maxWidth:640}}>Build AI revenue with e&</h1>
        <p style={{fontSize:18,color:BRAND.grey,maxWidth:640,lineHeight:1.5,margin:"0 0 28px"}}>Three clear offers: SMB AI platform, enterprise AI, and sovereign compute. Each one is built from specs, shipped fast, and measured against revenue.</p>
        <div style={{height:4,width:180,background:BRAND.continuum}}/>
      </div>
    </div>
    <div style={{background:BRAND.white,borderBottom:`1px solid ${BRAND.border}`,position:"sticky",top:72,zIndex:40}}>
      <div style={{maxWidth:1120,margin:"0 auto",padding:"14px 28px",display:"flex",gap:8,overflowX:"auto"}}>
        {TABS.map((t,i)=>{const a=tab===i&&view==="tab";return<button key={i} onClick={()=>{setTab(i);setView("tab")}} style={{padding:"12px 18px",fontSize:12.5,fontWeight:700,color:a?BRAND.white:BRAND.black,background:a?BRAND.red:BRAND.lightGrey,border:`1px solid ${a?BRAND.red:BRAND.border}`,borderRadius:0,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s"}}>{t}</button>})}
        <div style={{marginLeft:"auto"}} />
        <button onClick={()=>setView("eco")} style={{padding:"12px 18px",fontSize:12.5,fontWeight:700,color:eco?BRAND.white:BRAND.black,background:eco?BRAND.red:BRAND.lightGrey,border:`1px solid ${eco?BRAND.red:BRAND.border}`,borderRadius:0,cursor:"pointer",whiteSpace:"nowrap"}}>Ecosystem</button>
        <button onClick={()=>setView("sum")} style={{padding:"12px 18px",fontSize:12.5,fontWeight:700,color:sum?BRAND.white:BRAND.black,background:sum?BRAND.red:BRAND.lightGrey,border:`1px solid ${sum?BRAND.red:BRAND.border}`,borderRadius:0,cursor:"pointer",whiteSpace:"nowrap"}}>Summary</button>
        <button onClick={()=>setView("hpc")} style={{padding:"12px 18px",fontSize:12.5,fontWeight:700,color:hpc?BRAND.white:BRAND.black,background:hpc?BRAND.red:BRAND.lightGrey,border:`1px solid ${hpc?BRAND.red:BRAND.border}`,borderRadius:0,cursor:"pointer",whiteSpace:"nowrap"}}>HPC Reference Architectures</button>
        <button onClick={()=>setView("cfo")} style={{padding:"12px 18px",fontSize:12.5,fontWeight:700,color:cfo?BRAND.white:BRAND.black,background:cfo?BRAND.red:BRAND.lightGrey,border:`1px solid ${cfo?BRAND.red:BRAND.border}`,borderRadius:0,cursor:"pointer",whiteSpace:"nowrap"}}>e& CFO Financials</button>
        <button onClick={()=>setView("htm")} style={{padding:"12px 18px",fontSize:12.5,fontWeight:700,color:htm?BRAND.white:BRAND.black,background:htm?"#222":BRAND.lightGrey,border:`1px solid ${htm?"#222":BRAND.border}`,borderRadius:0,cursor:"pointer",whiteSpace:"nowrap"}}>Haitham Meeting</button>
      </div>
    </div>
    </>}
    {!ctr && <div style={{maxWidth:1120,margin:"0 auto",padding:"0 28px 72px"}}>
      {rzm?<RazziMeetingSection/>:htm?<HaithamMeetingSection showPricing={showPricing}/>:cfo?<EandFinancialsSection showPricing={showPricing}/>:hpc?<HPCSection/>:stk?<FullStackSection/>:sum?<SummarySection showPricing={showPricing}/>:eco?<EcosystemSection/>:tab===0?<SMBSegment onViewChange={setView} showPricing={showPricing}/>:tab===1?<EnterpriseSegment showPricing={showPricing}/>:<GPUSegment showPricing={showPricing}/>}
    </div>}
    {!ctr && <div style={{borderTop:`1px solid ${BRAND.border}`,background:BRAND.white}}>
      <div style={{maxWidth:1120,margin:"0 auto",padding:"28px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:14}}>
        <div style={{fontSize:11,color:BRAND.grey}}>AIdeology x e& · Commercial framework · May 2026 · Confidential</div>
        <div style={{display:"flex",gap:14}}>
          {[["SMB Demo","https://etisalat-smb-marketplace.vercel.app"],["Enterprise Demo","https://etisalat-smb-marketplace.vercel.app/enterprise"],["AIdeology","https://www.aideology.ai"]].map(([l,u],i)=><a key={i} href={u} target="_blank" rel="noreferrer" style={{fontSize:11,color:BRAND.red,textDecoration:"none",fontWeight:700}}>{l} →</a>)}
        </div>
      </div>
    </div>}
    <div
      ref={fullProposalRef}
      aria-hidden="true"
      style={{position:"absolute",left:-99999,top:0,width:1,height:1,overflow:"hidden",opacity:0,pointerEvents:"none"}}
    >
      <SMBSegment />
      <EnterpriseSegment />
      <Tier1Page />
      <Tier2Page />
      <Tier3Page />
      <GPUSegment />
      <FullStackSection />
      <EcosystemSection />
      <SummarySection />
      <HPCSection />
      <EandFinancialsSection />
    </div>
    {!rzm && !ctr && <AIChat proposalCorpus={proposalCorpus} />}
  </div>;
}
