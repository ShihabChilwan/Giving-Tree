import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── SUPABASE CLIENT ──────────────────────────────────────────────────────────
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_SERVICE_KEY
);

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500&family=Lora:wght@400;500&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body, #root { width: 100%; min-height: 100vh; background: #f5f0e8; }

    :root {
      --bg:        #f5f0e8;
      --bg2:       #faf6ef;
      --bg3:       #f0ebe0;
      --panel:     #ffffff;
      --border:    #e8ddd0;
      --border2:   #d8cfc4;
      --green:     #3a5c2a;
      --green2:    #4a7a38;
      --green-lt:  #d4e8c4;
      --green-bg:  #f0f8ea;
      --amber:     #c8a97a;
      --amber-lt:  #f5e8d0;
      --amber-dk:  #8a6a3a;
      --red:       #c85a5a;
      --red-lt:    #fdf0f0;
      --blue:      #5a7ab0;
      --blue-lt:   #e8f0f8;
      --text:      #2a1e10;
      --text2:     #6b5a4a;
      --text3:     #9a8a7a;
      --serif:     'Playfair Display', serif;
      --lora:      'Lora', serif;
      --sans:      'DM Sans', sans-serif;
      --mono:      'DM Mono', monospace;
      --shadow:    0 2px 12px rgba(80,50,20,0.08);
      --shadow-lg: 0 8px 32px rgba(80,50,20,0.14);
    }

    @keyframes fadeUp   { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
    @keyframes pulse    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
    @keyframes spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes shimmer  { from{background-position:-400px 0} to{background-position:400px 0} }
    @keyframes barGrow  { from{width:0} to{width:var(--w)} }
    @keyframes countUp  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    @keyframes leafSway { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }

    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: var(--bg3); }
    ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--amber); }

    button { cursor: pointer; font-family: var(--sans); }
    button:hover { filter: brightness(1.06); }
    input, select { outline: none; }

    .skeleton {
      background: linear-gradient(90deg, var(--bg3) 0%, var(--border) 50%, var(--bg3) 100%);
      background-size: 400px 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 6px;
    }

    .panel {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 14px;
      box-shadow: var(--shadow);
      overflow: hidden;
    }

    .nav-btn {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 14px; border-radius: 10px;
      font-family: var(--sans); font-size: 13px; font-weight: 500;
      color: var(--text2); background: none; border: none;
      width: 100%; text-align: left; transition: all 0.18s;
    }
    .nav-btn:hover  { background: var(--bg3); color: var(--text); filter: none; }
    .nav-btn.active { background: var(--green-bg); color: var(--green); border: 1px solid rgba(58,92,42,0.18); font-weight: 600; }

    .trow {
      display: grid; padding: 11px 18px;
      border-bottom: 1px solid var(--border);
      align-items: center; transition: background 0.12s;
      font-family: var(--sans); font-size: 13px; color: var(--text2);
    }
    .trow:hover { background: var(--bg3); }
    .trow:last-child { border-bottom: none; }

    .badge {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 9px; border-radius: 20px;
      font-family: var(--mono); font-size: 10px; font-weight: 500;
      letter-spacing: 0.03em;
    }
    .badge-green  { background: var(--green-bg);  color: var(--green);    border: 1px solid rgba(58,92,42,0.2); }
    .badge-amber  { background: var(--amber-lt);  color: var(--amber-dk); border: 1px solid rgba(200,169,122,0.3); }
    .badge-red    { background: var(--red-lt);    color: var(--red);      border: 1px solid rgba(200,90,90,0.2); }
    .badge-blue   { background: var(--blue-lt);   color: var(--blue);     border: 1px solid rgba(90,122,176,0.2); }

    .live-ring {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--green); display: inline-block;
      animation: pulse 2s ease-in-out infinite;
      box-shadow: 0 0 0 0 rgba(58,92,42,0.4);
    }

    @media (max-width: 900px) {
      .sidebar    { display: none !important; }
      .main-wrap  { margin-left: 0 !important; max-width: 100vw !important; }
      .grid-4     { grid-template-columns: 1fr 1fr !important; }
      .grid-3     { grid-template-columns: 1fr 1fr !important; }
      .two-col    { grid-template-columns: 1fr !important; }
    }
    @media (max-width: 520px) {
      .grid-4     { grid-template-columns: 1fr !important; }
      .grid-3     { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function timeAgo(ts) {
  if (!ts) return "—";
  const d = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
  if (d < 60)    return `${d}s ago`;
  if (d < 3600)  return `${Math.floor(d / 60)}m ago`;
  if (d < 86400) return `${Math.floor(d / 3600)}h ago`;
  return `${Math.floor(d / 86400)}d ago`;
}
function fmt(n) {
  if (n === null || n === undefined) return "—";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}
function useInterval(fn, ms) {
  const ref = useRef(fn);
  useEffect(() => { ref.current = fn; }, [fn]);
  useEffect(() => { const id = setInterval(() => ref.current(), ms); return () => clearInterval(id); }, [ms]);
}

// ─── MINI BAR CHART ──────────────────────────────────────────────────────────
function BarChart({ data, color = "var(--green)", height = 56 }) {
  if (!data?.length) return null;
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 0 }}>
            <div title={`${d.label}: ${d.value}`} style={{
              width: "100%",
              height: `${Math.max((d.value / max) * 100, d.value > 0 ? 4 : 0)}%`,
              background: color,
              borderRadius: "3px 3px 0 0",
              opacity: 0.5 + (d.value / max) * 0.5,
              transition: "height 0.6s ease",
              minHeight: d.value > 0 ? 3 : 0,
            }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--text3)" }}>{data[0]?.label}</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--text3)" }}>{data[data.length - 1]?.label}</span>
      </div>
    </div>
  );
}

// ─── DONUT ───────────────────────────────────────────────────────────────────
function Donut({ segments, size = 88 }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  if (!total) return <div style={{ width: size, height: size, borderRadius: "50%", background: "var(--bg3)", border: "1px solid var(--border)", flexShrink: 0 }} />;
  const cx = size / 2, cy = size / 2, r = size / 2 - 9, stroke = 13;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      {segments.map((seg, i) => {
        const pct = seg.value / total;
        const dash = pct * circ;
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={seg.color} strokeWidth={stroke}
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={-offset * circ} opacity={0.88} />
        );
        offset += pct;
        return el;
      })}
      <circle cx={cx} cy={cy} r={r - stroke / 2 - 1} fill="var(--panel)" />
    </svg>
  );
}

// ─── METRIC CARD ─────────────────────────────────────────────────────────────
function MetricCard({ icon, label, value, sub, accent = "var(--green)", loading, tag }) {
  return (
    <div style={{
      background: "var(--panel)", border: "1px solid var(--border)",
      borderRadius: 14, padding: "20px", boxShadow: "var(--shadow)",
      position: "relative", overflow: "hidden",
      animation: "fadeUp 0.4s ease forwards",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${accent}55, ${accent}cc, ${accent}55)`,
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        {tag && <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--text3)", background: "var(--bg3)", padding: "2px 7px", borderRadius: 20, border: "1px solid var(--border)" }}>{tag}</span>}
      </div>
      {loading ? (
        <>
          <div className="skeleton" style={{ height: 26, width: "55%", marginBottom: 7 }} />
          <div className="skeleton" style={{ height: 11, width: "75%" }} />
        </>
      ) : (
        <>
          <div style={{
            fontFamily: "var(--serif)", fontSize: 28, fontWeight: 700, color: accent,
            lineHeight: 1, marginBottom: 5, animation: "countUp 0.5s ease"
          }}>{value}</div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</div>
          {sub && <div style={{ fontFamily: "var(--sans)", fontSize: 11, color: "var(--text2)", marginTop: 4 }}>{sub}</div>}
        </>
      )}
    </div>
  );
}

// ─── LIVE VISITORS CARD ──────────────────────────────────────────────────────
function LiveVisitorsCard({ count, loading }) {
  return (
    <div style={{
      background: "var(--green)", border: "1px solid rgba(58,92,42,0.4)",
      borderRadius: 14, padding: "20px", boxShadow: "0 4px 20px rgba(58,92,42,0.25)",
      position: "relative", overflow: "hidden", animation: "fadeUp 0.4s ease forwards",
    }}>
      <div style={{
        position: "absolute", top: -30, right: -30, width: 100, height: 100,
        borderRadius: "50%", background: "rgba(212,232,196,0.1)",
      }} />
      <div style={{
        position: "absolute", bottom: -20, left: -20, width: 70, height: 70,
        borderRadius: "50%", background: "rgba(212,232,196,0.07)",
      }} />
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, position: "relative" }}>
        <span className="live-ring" style={{ background: "var(--green-lt)" }} />
        <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--green-lt)", letterSpacing: "0.1em" }}>LIVE NOW</span>
      </div>
      {loading ? (
        <div className="skeleton" style={{ height: 26, width: "50%", marginBottom: 7 }} />
      ) : (
        <>
          <div style={{
            fontFamily: "var(--serif)", fontSize: 36, fontWeight: 700, color: "var(--green-lt)",
            lineHeight: 1, marginBottom: 5, animation: "countUp 0.5s ease", position: "relative"
          }}>{count}</div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "rgba(212,232,196,0.65)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Visitors on site</div>
          <div style={{ fontFamily: "var(--sans)", fontSize: 11, color: "rgba(212,232,196,0.5)", marginTop: 4 }}>Updated in real-time</div>
        </>
      )}
    </div>
  );
}

// ─── SECTION HEADER ──────────────────────────────────────────────────────────
function SH({ title, sub, right }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 16, gap: 12 }}>
      <div>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 600, color: "var(--text)", lineHeight: 1 }}>{title}</h2>
        {sub && <p style={{ fontFamily: "var(--lora)", fontSize: 12, color: "var(--text3)", marginTop: 3, fontStyle: "italic" }}>{sub}</p>}
      </div>
      {right}
    </div>
  );
}

// ─── OVERVIEW PAGE ────────────────────────────────────────────────────────────
const CAT_COLORS = {
  Furniture: "#8a6a3a", Books: "#5a7ab0", Clothing: "#a07ab0",
  Electronics: "#5a7a9a", Kitchen: "#c87a5a", Toys: "#c87a90",
  Garden: "#3a7a5a", Sports: "#5a8a7a"
};

function OverviewPage({ data, loading, liveVisitors, lastUpdated }) {
  const catSegs = (data.categoryBreakdown || []).map(c => ({
    label: c.category, value: c.count,
    color: CAT_COLORS[c.category] || "#8a8a7a"
  }));
  const totalCat = catSegs.reduce((s, x) => s + x.value, 0);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      {/* Top metrics */}
      <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
        <LiveVisitorsCard count={liveVisitors} loading={loading} />
        <MetricCard icon="👥" label="Total Users" value={fmt(data.totalUsers)} sub={`+${data.newUsersToday || 0} today`} loading={loading} accent="var(--blue)" />
        <MetricCard icon="📦" label="Active Listings" value={fmt(data.activeListings)} sub={`${data.givenItems || 0} given away`} loading={loading} accent="var(--amber-dk)" />
        <MetricCard icon="🙋" label="Pending Requests" value={fmt(data.pendingRequests)} sub={`${data.approvedRequests || 0} approved`} loading={loading} accent="var(--red)" />
      </div>

      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Signups chart */}
        <div className="panel" style={{ padding: "20px" }}>
          <SH title="New Signups" sub="Last 7 days" />
          {loading ? <div className="skeleton" style={{ height: 80 }} /> :
            <BarChart data={(data.signupsByDay || []).map(d => ({ label: d.day, value: d.count }))} color="var(--blue)" height={72} />}
        </div>

        {/* Category donut */}
        <div className="panel" style={{ padding: "20px" }}>
          <SH title="Items by Category" sub={`${totalCat} total items`} />
          {loading ? <div className="skeleton" style={{ height: 90 }} /> : (
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <Donut segments={catSegs} size={84} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                {catSegs.slice(0, 5).map(s => (
                  <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--sans)", fontSize: 11, color: "var(--text2)", flex: 1 }}>{s.label}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)" }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Requests chart */}
        <div className="panel" style={{ padding: "20px" }}>
          <SH title="Request Activity" sub="Last 7 days" />
          {loading ? <div className="skeleton" style={{ height: 80 }} /> :
            <BarChart data={(data.requestsByDay || []).map(d => ({ label: d.day, value: d.count }))} color="var(--amber)" height={72} />}
        </div>

        {/* Request status */}
        <div className="panel" style={{ padding: "20px" }}>
          <SH title="Request Status" sub="All time breakdown" />
          {loading ? <div className="skeleton" style={{ height: 80 }} /> : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Pending",  value: data.pendingRequests  || 0, color: "var(--amber)",    bg: "var(--amber-lt)" },
                { label: "Approved", value: data.approvedRequests || 0, color: "var(--green)",    bg: "var(--green-bg)" },
                { label: "Rejected", value: data.rejectedRequests || 0, color: "var(--red)",      bg: "var(--red-lt)" },
              ].map(row => {
                const pct = data.totalRequests ? ((row.value / data.totalRequests) * 100).toFixed(0) : 0;
                return (
                  <div key={row.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontFamily: "var(--sans)", fontSize: 12, color: "var(--text2)" }}>{row.label}</span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)" }}>{row.value} <span style={{ color: "var(--text3)", fontSize: 9 }}>({pct}%)</span></span>
                    </div>
                    <div style={{ height: 6, background: "var(--bg3)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: row.color, borderRadius: 3, transition: "width 0.8s ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent activity */}
      <div className="panel">
        <div style={{ padding: "18px 20px 0" }}>
          <SH title="Recent Activity" sub="Latest events across the platform" />
        </div>
        {loading ? (
          [1,2,3,4].map(i => (
            <div key={i} style={{ padding: "12px 20px", borderBottom: "1px solid var(--border)" }}>
              <div className="skeleton" style={{ height: 13, width: "65%", marginBottom: 5 }} />
              <div className="skeleton" style={{ height: 10, width: "40%" }} />
            </div>
          ))
        ) : (data.recentActivity || []).map((act, i) => (
          <div key={i} className="trow" style={{ gridTemplateColumns: "28px 1fr auto", gap: 12 }}>
            <span style={{ fontSize: 17 }}>{act.icon}</span>
            <div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--text)", marginBottom: 2 }}>{act.message}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)" }}>{act.detail}</div>
            </div>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", whiteSpace: "nowrap" }}>{act.time}</span>
          </div>
        ))}
        <div style={{ padding: "9px 20px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)" }}>Last refreshed: {lastUpdated}</span>
        </div>
      </div>
    </div>
  );
}

// ─── USERS PAGE ──────────────────────────────────────────────────────────────
function UsersPage({ data, loading }) {
  const [search, setSearch] = useState("");
  const users = (data.users || []).filter(u =>
    !search ||
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
        <MetricCard icon="👥" label="Total Registered" value={fmt(data.totalUsers)} loading={loading} accent="var(--green)" />
        <MetricCard icon="🌱" label="Joined Today"     value={fmt(data.newUsersToday)} loading={loading} accent="var(--blue)" />
        <MetricCard icon="📅" label="Joined This Week" value={fmt(data.newUsersWeek)} loading={loading} accent="var(--amber-dk)" />
      </div>

      <div className="panel">
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 17, color: "var(--text)", fontWeight: 600 }}>All Users</h2>
          <span style={{ fontFamily: "var(--lora)", fontSize: 12, color: "var(--text3)", fontStyle: "italic" }}>{users.length} members</span>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            style={{
              marginLeft: "auto", padding: "8px 13px", borderRadius: 9,
              border: "1.5px solid var(--border)", background: "var(--bg3)",
              color: "var(--text)", fontFamily: "var(--sans)", fontSize: 12, width: 220,
            }}
          />
        </div>
        <div className="trow" style={{ gridTemplateColumns: "2fr 2fr 80px 80px 100px", background: "var(--bg3)", padding: "8px 18px" }}>
          {["Member", "Email", "Listings", "Requests", "Joined"].map(h => (
            <span key={h} style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", letterSpacing: "0.05em" }}>{h}</span>
          ))}
        </div>
        {loading ? [1,2,3,4,5].map(i => (
          <div key={i} style={{ padding: "13px 18px", borderBottom: "1px solid var(--border)" }}>
            <div className="skeleton" style={{ height: 13, width: "75%" }} />
          </div>
        )) : users.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "var(--text3)", fontFamily: "var(--lora)", fontSize: 13, fontStyle: "italic" }}>No users found</div>
        ) : users.map((u, i) => (
          <div key={i} className="trow" style={{ gridTemplateColumns: "2fr 2fr 80px 80px 100px", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                background: "var(--green-bg)", border: "1.5px solid rgba(58,92,42,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--serif)", fontSize: 12, fontWeight: 700, color: "var(--green)"
              }}>{(u.name || u.email || "?")[0].toUpperCase()}</div>
              <span style={{ color: "var(--text)", fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.name || "—"}</span>
            </div>
            <span style={{ fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--amber-dk)" }}>{u.listings ?? 0}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--blue)" }}>{u.requests ?? 0}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)" }}>{timeAgo(u.created_at)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LISTINGS PAGE ────────────────────────────────────────────────────────────
function ListingsPage({ data, loading }) {
  const [filter, setFilter] = useState("all");
  const items = (data.allItems || []).filter(i => filter === "all" || i.status === filter);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
        <MetricCard icon="🟢" label="Active Listings"  value={fmt(data.activeListings)} loading={loading} accent="var(--green)" />
        <MetricCard icon="✅" label="Items Given Away" value={fmt(data.givenItems)}    loading={loading} accent="var(--blue)" />
        <MetricCard icon="👁" label="Total Views"      value={fmt(data.totalViews)}    loading={loading} accent="var(--amber-dk)" />
        <MetricCard icon="🙋" label="Total Requests"   value={fmt(data.totalRequests)} loading={loading} accent="var(--red)" />
      </div>

      {/* Top requested */}
      <div className="panel" style={{ marginBottom: 16, padding: "20px" }}>
        <SH title="Most Wanted Right Now" sub="Top items by request count" />
        {loading ? <div className="skeleton" style={{ height: 120 }} /> : (
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {(data.topRequestedItems || []).slice(0, 6).map((item, i) => {
              const maxR = data.topRequestedItems?.[0]?.requests || 1;
              const pct = (item.requests / maxR) * 100;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", width: 18, textAlign: "right", flexShrink: 0 }}>#{i + 1}</span>
                  <span style={{ fontSize: 17, flexShrink: 0 }}>{item.emoji || "📦"}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--sans)", fontSize: 12, color: "var(--text)", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
                    <div style={{ height: 5, background: "var(--bg3)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, var(--amber), var(--green))`, borderRadius: 3, transition: "width 0.8s ease" }} />
                    </div>
                  </div>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--amber-dk)", flexShrink: 0 }}>{item.requests} req</span>
                  <span className={`badge badge-${item.status === "active" ? "green" : "blue"}`}>{item.status}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* All listings table */}
      <div className="panel">
        <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 17, color: "var(--text)", fontWeight: 600 }}>All Listings</h2>
          <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
            {["all", "active", "given"].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "5px 13px", borderRadius: 20, border: "1.5px solid",
                borderColor: filter === f ? "var(--green)" : "var(--border)",
                background: filter === f ? "var(--green-bg)" : "var(--bg3)",
                color: filter === f ? "var(--green)" : "var(--text3)",
                fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.04em",
              }}>{f.toUpperCase()}</button>
            ))}
          </div>
        </div>
        <div className="trow" style={{ gridTemplateColumns: "3fr 1fr 1fr 70px 80px 80px", background: "var(--bg3)", padding: "8px 18px" }}>
          {["Item", "Category", "Condition", "Views", "Requests", "Status"].map(h => (
            <span key={h} style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", letterSpacing: "0.05em" }}>{h}</span>
          ))}
        </div>
        {loading ? [1,2,3,4,5].map(i => (
          <div key={i} style={{ padding: "13px 18px", borderBottom: "1px solid var(--border)" }}>
            <div className="skeleton" style={{ height: 13, width: "80%" }} />
          </div>
        )) : items.map((item, i) => (
          <div key={i} className="trow" style={{ gridTemplateColumns: "3fr 1fr 1fr 70px 80px 80px", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
              <span style={{ fontSize: 17, flexShrink: 0 }}>{item.emoji || "📦"}</span>
              <span style={{ color: "var(--text)", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</span>
            </div>
            <span style={{ fontSize: 11 }}>{item.category}</span>
            <span style={{ fontSize: 11 }}>{item.condition}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--blue)" }}>{item.views || 0}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--amber-dk)" }}>{item.requests_count || item.requests || 0}</span>
            <span className={`badge badge-${item.status === "active" ? "green" : "blue"}`}>{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── REQUESTS PAGE ────────────────────────────────────────────────────────────
function RequestsPage({ data, loading }) {
  const [filter, setFilter] = useState("all");
  const reqs = (data.allRequests || []).filter(r => filter === "all" || r.status === filter);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
        <MetricCard icon="⏳" label="Pending"  value={fmt(data.pendingRequests)}  loading={loading} accent="var(--amber-dk)" />
        <MetricCard icon="✅" label="Approved" value={fmt(data.approvedRequests)} loading={loading} accent="var(--green)" />
        <MetricCard icon="❌" label="Rejected" value={fmt(data.rejectedRequests)} loading={loading} accent="var(--red)" />
      </div>

      <div className="panel">
        <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 17, color: "var(--text)", fontWeight: 600 }}>All Requests</h2>
          <span style={{ fontFamily: "var(--lora)", fontSize: 12, color: "var(--text3)", fontStyle: "italic" }}>{reqs.length} shown</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 5, flexWrap: "wrap" }}>
            {["all", "pending", "approved", "rejected"].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "5px 11px", borderRadius: 20, border: "1.5px solid",
                borderColor: filter === f ? "var(--green)" : "var(--border)",
                background: filter === f ? "var(--green-bg)" : "var(--bg3)",
                color: filter === f ? "var(--green)" : "var(--text3)",
                fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.04em",
              }}>{f.toUpperCase()}</button>
            ))}
          </div>
        </div>
        <div className="trow" style={{ gridTemplateColumns: "2fr 1.5fr 2.5fr 90px 90px", background: "var(--bg3)", padding: "8px 18px" }}>
          {["Item", "From", "Their Note", "Status", "Time"].map(h => (
            <span key={h} style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", letterSpacing: "0.05em" }}>{h}</span>
          ))}
        </div>
        {loading ? [1,2,3,4,5].map(i => (
          <div key={i} style={{ padding: "13px 18px", borderBottom: "1px solid var(--border)" }}>
            <div className="skeleton" style={{ height: 13, width: "80%" }} />
          </div>
        )) : reqs.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "var(--text3)", fontFamily: "var(--lora)", fontSize: 13, fontStyle: "italic" }}>No requests match this filter</div>
        ) : reqs.map((r, i) => (
          <div key={i} className="trow" style={{ gridTemplateColumns: "2fr 1.5fr 2.5fr 90px 90px", gap: 8 }}>
            <span style={{ color: "var(--text)", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.item_title || "—"}</span>
            <span style={{ fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.requester_name || "—"}</span>
            <span style={{ fontSize: 11, color: "var(--text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontStyle: "italic" }}>
              "{r.note?.slice(0, 48) || "…"}{(r.note?.length || 0) > 48 ? "…" : ""}"
            </span>
            <span className={`badge badge-${r.status === "pending" ? "amber" : r.status === "approved" ? "green" : "red"}`}>{r.status}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)" }}>{timeAgo(r.created_at)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── NEIGHBORHOODS PAGE ───────────────────────────────────────────────────────
function NeighborhoodsPage({ data, loading }) {
  const nbh = data.neighborhoodStats || [];
  const max = Math.max(...nbh.map(n => n.items), 1);

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
        <MetricCard icon="📍" label="Active Areas"        value={fmt(nbh.length)}            loading={loading} accent="var(--green)" />
        <MetricCard icon="🏆" label="Top Neighbourhood"   value={nbh[0]?.neighborhood || "—"} loading={loading} accent="var(--amber-dk)" />
        <MetricCard icon="📦" label="Items in Top Area"   value={fmt(nbh[0]?.items)}          loading={loading} accent="var(--blue)" />
      </div>

      <div className="panel">
        <div style={{ padding: "20px 20px 4px" }}>
          <SH title="Activity by Neighbourhood" sub="Items posted and requests received per area" />
        </div>
        {loading ? (
          <div style={{ padding: "0 20px 20px" }}>
            {[1,2,3,4,5].map(i => <div key={i} className="skeleton" style={{ height: 34, marginBottom: 10 }} />)}
          </div>
        ) : (
          <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 11 }}>
            {nbh.map((n, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", width: 20, textAlign: "right" }}>#{i + 1}</span>
                    <span style={{ fontFamily: "var(--sans)", fontSize: 13, color: "var(--text)", fontWeight: 500 }}>{n.neighborhood}</span>
                  </div>
                  <div style={{ display: "flex", gap: 16 }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--amber-dk)" }}>{n.items} items</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--blue)" }}>{n.requests} requests</span>
                  </div>
                </div>
                <div style={{ height: 6, background: "var(--bg3)", borderRadius: 3, overflow: "hidden", marginLeft: 29 }}>
                  <div style={{
                    height: "100%",
                    width: `${(n.items / max) * 100}%`,
                    background: `hsl(${130 - i * 10}, 50%, ${48 - i * 2}%)`,
                    borderRadius: 3, transition: "width 0.8s ease",
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TOP GIVERS PAGE ─────────────────────────────────────────────────────────
const MEDALS = ["#c8a97a", "#8a9a9a", "#a07a5a"];

function TopGiversPage({ data, loading }) {
  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      <div className="panel">
        <div style={{ padding: "20px 20px 4px" }}>
          <SH title="Top Givers" sub="Community members ranked by items shared" />
        </div>
        <div className="trow" style={{ gridTemplateColumns: "36px 2fr 2fr 70px 80px 100px", background: "var(--bg3)", padding: "8px 18px" }}>
          {["#", "Name", "Neighbourhood", "Items", "Requests", "Latest"].map(h => (
            <span key={h} style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", letterSpacing: "0.05em" }}>{h}</span>
          ))}
        </div>
        {loading ? [1,2,3,4,5].map(i => (
          <div key={i} style={{ padding: "13px 18px", borderBottom: "1px solid var(--border)" }}>
            <div className="skeleton" style={{ height: 13, width: "80%" }} />
          </div>
        )) : (data.topGivers || []).map((g, i) => (
          <div key={i} className="trow" style={{ gridTemplateColumns: "36px 2fr 2fr 70px 80px 100px", gap: 10 }}>
            <div style={{
              width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
              background: i < 3 ? `${MEDALS[i]}22` : "var(--bg3)",
              border: `1.5px solid ${i < 3 ? MEDALS[i] : "var(--border)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--mono)", fontSize: 10, fontWeight: 700,
              color: i < 3 ? MEDALS[i] : "var(--text3)"
            }}>{i + 1}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                background: "var(--green-bg)", border: "1.5px solid rgba(58,92,42,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--serif)", fontSize: 12, fontWeight: 700, color: "var(--green)"
              }}>{(g.giver_name || "?")[0].toUpperCase()}</div>
              <span style={{ color: "var(--text)", fontSize: 13 }}>{g.giver_name || "Anonymous"}</span>
            </div>
            <span style={{ fontSize: 12, color: "var(--text2)" }}>{g.neighborhood || "—"}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--green)", fontWeight: 600 }}>{g.item_count}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--amber-dk)" }}>{g.total_requests || 0}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)" }}>{timeAgo(g.latest)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DATA FETCHER ─────────────────────────────────────────────────────────────
async function fetchAllData() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekStart  = new Date(now.getTime() - 7 * 86400000).toISOString();

  const [usersRes, itemsRes, requestsRes, savesRes] = await Promise.all([
    supabase.from("users_view").select("*").order("created_at", { ascending: false }),
    supabase.from("items").select("*").order("created_at", { ascending: false }),
    supabase.from("requests").select("*, items(title, emoji, category, neighborhood)").order("created_at", { ascending: false }),
    supabase.from("saved_items").select("item_id, user_id"),
  ]);

  const users    = usersRes.data    || [];
  const items    = itemsRes.data    || [];
  const requests = requestsRes.data || [];
  const saves    = savesRes.data    || [];

  const totalUsers    = users.length;
  const newUsersToday = users.filter(u => u.created_at >= todayStart).length;
  const newUsersWeek  = users.filter(u => u.created_at >= weekStart).length;

  const signupsByDay = Array.from({ length: 7 }, (_, i) => {
    const d   = new Date(now.getTime() - (6 - i) * 86400000);
    const day = d.toLocaleDateString("en", { weekday: "short" });
    const str = d.toISOString().slice(0, 10);
    return { day, count: users.filter(u => u.created_at?.slice(0, 10) === str).length };
  });

  const activeListings = items.filter(i => i.status === "active").length;
  const givenItems     = items.filter(i => i.status === "given").length;
  const totalViews     = items.reduce((s, i) => s + (i.views || 0), 0);

  const catMap = {};
  items.forEach(i => { catMap[i.category] = (catMap[i.category] || 0) + 1; });
  const categoryBreakdown = Object.entries(catMap)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  const nbhMap = {};
  items.forEach(i => {
    if (!i.neighborhood) return;
    if (!nbhMap[i.neighborhood]) nbhMap[i.neighborhood] = { items: 0, requests: 0 };
    nbhMap[i.neighborhood].items++;
  });

  const totalRequests    = requests.length;
  const pendingRequests  = requests.filter(r => r.status === "pending").length;
  const approvedRequests = requests.filter(r => r.status === "approved").length;
  const rejectedRequests = requests.filter(r => r.status === "rejected").length;

  const requestsByDay = Array.from({ length: 7 }, (_, i) => {
    const d   = new Date(now.getTime() - (6 - i) * 86400000);
    const day = d.toLocaleDateString("en", { weekday: "short" });
    const str = d.toISOString().slice(0, 10);
    return { day, count: requests.filter(r => r.created_at?.slice(0, 10) === str).length };
  });

  const reqCountMap = {};
  requests.forEach(r => {
    reqCountMap[r.item_id] = (reqCountMap[r.item_id] || 0) + 1;
    const nbh = r.items?.neighborhood;
    if (nbh) { if (!nbhMap[nbh]) nbhMap[nbh] = { items: 0, requests: 0 }; nbhMap[nbh].requests++; }
  });

  const neighborhoodStats = Object.entries(nbhMap)
    .map(([neighborhood, v]) => ({ neighborhood, ...v }))
    .sort((a, b) => b.items - a.items);

  const topRequestedItems = items
    .map(i => ({ ...i, requests: reqCountMap[i.id] || i.requests_count || i.requests || 0 }))
    .sort((a, b) => b.requests - a.requests)
    .slice(0, 10);

  const giverMap = {};
  items.forEach(i => {
    const key = i.giver_id || "anon";
    if (!giverMap[key]) giverMap[key] = { giver_name: i.giver_name, neighborhood: i.neighborhood, item_count: 0, total_requests: 0, latest: i.created_at };
    giverMap[key].item_count++;
    giverMap[key].total_requests += reqCountMap[i.id] || 0;
    if (i.created_at > giverMap[key].latest) giverMap[key].latest = i.created_at;
  });
  const topGivers = Object.values(giverMap).sort((a, b) => b.item_count - a.item_count).slice(0, 15);

  const userListingMap = {};
  const userRequestMap = {};
  items.forEach(i => { userListingMap[i.giver_id] = (userListingMap[i.giver_id] || 0) + 1; });
  requests.forEach(r => { userRequestMap[r.requester_id] = (userRequestMap[r.requester_id] || 0) + 1; });
  const enrichedUsers = users.map(u => ({ ...u, listings: userListingMap[u.id] || 0, requests: userRequestMap[u.id] || 0 }));

  const recentItems    = items.slice(0, 5).map(i => ({ icon: "📦", message: `New listing: ${i.title}`, detail: `${i.giver_name || "Someone"} in ${i.neighborhood || "Pune"}`, time: timeAgo(i.created_at) }));
  const recentRequests = requests.slice(0, 5).map(r => ({ icon: r.status === "approved" ? "✅" : r.status === "rejected" ? "❌" : "🙋", message: `Request ${r.status}: ${r.items?.title || "an item"}`, detail: `By ${r.requester_name || "Someone"}`, time: timeAgo(r.created_at) }));
  const recentActivity = [...recentItems, ...recentRequests].slice(0, 8);

  const allRequests = requests.map(r => ({ ...r, item_title: r.items?.title || "—" }));

  return {
    totalUsers, newUsersToday, newUsersWeek,
    signupsByDay, activeListings, givenItems, totalViews,
    totalRequests, pendingRequests, approvedRequests, rejectedRequests,
    requestsByDay, categoryBreakdown, neighborhoodStats,
    topRequestedItems, topGivers, totalSaves: saves.length,
    recentActivity, allItems: items, allRequests, users: enrichedUsers,
  };
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [page, setPage]               = useState("overview");
  const [data, setData]               = useState({});
  const [loading, setLoading]         = useState(true);
  const [lastUpdated, setLastUpdated] = useState("—");
  const [error, setError]             = useState(null);
  const [liveVisitors, setLiveVisitors] = useState(0);
  const channelRef = useRef(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const d = await fetchAllData();
      setData(d);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);
  useInterval(load, 30000);

  // ── Realtime presence for live visitor count
  useEffect(() => {
    const channel = supabase.channel("admin-presence-tracker", {
      config: { presence: { key: "admin-observer" } }
    });

    // Also subscribe to the main site's presence channel to count visitors
    const visitorChannel = supabase.channel("site-visitors");
    visitorChannel
      .on("presence", { event: "sync" }, () => {
        const state = visitorChannel.presenceState();
        setLiveVisitors(Object.keys(state).length);
      })
      .on("presence", { event: "join" }, () => {
        const state = visitorChannel.presenceState();
        setLiveVisitors(Object.keys(state).length);
      })
      .on("presence", { event: "leave" }, () => {
        const state = visitorChannel.presenceState();
        setLiveVisitors(Object.keys(state).length);
      })
      .subscribe();

    channelRef.current = visitorChannel;
    return () => { supabase.removeChannel(visitorChannel); };
  }, []);

  const navItems = [
    { id: "overview",       icon: "🌳", label: "Overview" },
    { id: "users",          icon: "👥", label: "Users" },
    { id: "listings",       icon: "📦", label: "Listings" },
    { id: "requests",       icon: "🙋", label: "Requests" },
    { id: "neighborhoods",  icon: "📍", label: "Areas" },
    { id: "givers",         icon: "🎁", label: "Top Givers" },
  ];

  const currentNav = navItems.find(n => n.id === page);

  return (
    <div style={{ fontFamily: "var(--sans)", background: "var(--bg)", minHeight: "100vh", display: "flex" }}>
      <GlobalStyles />

      {/* Subtle noise texture overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.018,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* ── Sidebar */}
      <div className="sidebar" style={{
        width: 210, flexShrink: 0, position: "fixed", top: 0, left: 0,
        height: "100vh", background: "var(--bg2)",
        borderRight: "1px solid var(--border)",
        display: "flex", flexDirection: "column", zIndex: 100,
        padding: "0 10px 20px",
      }}>
        {/* Logo */}
        <div style={{ padding: "22px 12px 18px", borderBottom: "1px solid var(--border)", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ fontSize: 22, animation: "leafSway 4s ease-in-out infinite", display: "inline-block" }}>🌳</span>
            <div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 15, fontWeight: 700, color: "var(--green)", lineHeight: 1.1 }}>Giving Tree</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--text3)", letterSpacing: "0.1em", marginTop: 2 }}>ADMIN CONSOLE</div>
            </div>
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
          {navItems.map(n => (
            <button key={n.id} className={`nav-btn ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
              <span style={{ fontSize: 15, width: 20, textAlign: "center", flexShrink: 0 }}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>

        {/* Live status strip */}
        <div style={{
          padding: "12px 13px", background: "var(--bg3)", borderRadius: 10,
          border: "1px solid var(--border)", marginTop: "auto",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
            <span className="live-ring" />
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--green)", letterSpacing: "0.06em" }}>LIVE</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", marginLeft: "auto" }}>{liveVisitors} on site</span>
          </div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--text3)", marginBottom: 8 }}>Auto-refreshes every 30s</div>
          <button onClick={load} style={{
            width: "100%", padding: "6px", borderRadius: 8,
            background: "var(--green-bg)", border: "1px solid rgba(58,92,42,0.2)",
            color: "var(--green)", fontFamily: "var(--mono)", fontSize: 10,
            letterSpacing: "0.04em", display: "flex", alignItems: "center", justifyContent: "center", gap: 5
          }}>↻ Refresh Now</button>
        </div>
      </div>

      {/* ── Main content */}
      <div className="main-wrap" style={{
        marginLeft: 210, flex: 1, padding: "28px 26px 50px",
        maxWidth: "calc(100vw - 210px)", position: "relative", zIndex: 1,
      }}>
        {/* Page header */}
        <div style={{ marginBottom: 24, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            <h1 style={{
              fontFamily: "var(--serif)", fontSize: 28, fontWeight: 700,
              color: "var(--text)", lineHeight: 1, letterSpacing: "-0.02em"
            }}>
              {currentNav?.icon} {currentNav?.label}
            </h1>
            <p style={{ fontFamily: "var(--lora)", fontSize: 12, color: "var(--text3)", marginTop: 5, fontStyle: "italic" }}>
              Giving Tree · {new Date().toLocaleDateString("en", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          {loading && (
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)", padding: "8px 12px", background: "var(--panel)", borderRadius: 9, border: "1px solid var(--border)" }}>
              <div style={{ width: 13, height: 13, border: "2px solid var(--border2)", borderTopColor: "var(--green)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              Loading…
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div style={{
            padding: "14px 18px", background: "var(--red-lt)", border: "1px solid rgba(200,90,90,0.25)",
            borderRadius: 10, marginBottom: 20, fontFamily: "var(--mono)", fontSize: 12, color: "var(--red)"
          }}>
            ⚠ {error}
          </div>
        )}

        {/* Pages */}
        {page === "overview"      && <OverviewPage       data={data} loading={loading} liveVisitors={liveVisitors} lastUpdated={lastUpdated} />}
        {page === "users"         && <UsersPage          data={data} loading={loading} />}
        {page === "listings"      && <ListingsPage       data={data} loading={loading} />}
        {page === "requests"      && <RequestsPage       data={data} loading={loading} />}
        {page === "neighborhoods" && <NeighborhoodsPage  data={data} loading={loading} />}
        {page === "givers"        && <TopGiversPage      data={data} loading={loading} />}
      </div>
    </div>
  );
}