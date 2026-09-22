const picks=[
{
  id:"1",
  league:"NFL",
  matchup:"Chiefs @ Bills",
  market:"Moneyline",
  line:"Chiefs -125",
  prob:69,
  conf:8,
  reason:"Efficiency profile and matchup context favor Kansas City.",
  injury:"Bills key WR — questionable",
  weather:"42°F • light rain • 12 mph wind",
  news:"Chiefs-Bills practice report updated"
},
{
  id:"2",
  league:"NFL",
  matchup:"Chiefs @ Bills",
  market:"Spread",
  line:"Chiefs -3.5",
  prob:65,
  conf:7,
  reason:"Model projects Kansas City by roughly four points.",
  injury:"Chiefs starting LT — probable",
  weather:"42°F • light rain • 12 mph wind",
  news:"Practice report updated"
},
{
  id:"3",
  league:"NBA",
  matchup:"Lakers @ Warriors",
  market:"Spread",
  line:"Lakers +4.5",
  prob:56,
  conf:6,
  reason:"Pace and rebound inputs keep the projected margin close.",
  injury:"Lakers starter — questionable",
  weather:"Indoor • no weather impact",
  news:"Lakers injury report updated"
},
{
  id:"4",
  league:"NBA",
  matchup:"Celtics @ Heat",
  market:"Total",
  line:"Over 229.5",
  prob:62,
  conf:7,
  reason:"Possession model projects a higher scoring environment.",
  injury:"Heat guard — probable",
  weather:"Indoor • no weather impact",
  news:"Rotation update"
},
{
  id:"5",
  league:"MLB",
  matchup:"Braves @ Mets",
  market:"Moneyline",
  line:"Braves -120",
  prob:64,
  conf:7,
  reason:"Starting-pitcher and bullpen inputs favor Atlanta.",
  injury:"Mets OF — day-to-day",
  weather:"58°F • clear • 7 mph wind",
  news:"Pitching confirmation pending"
}
];

const news=[
  ["NFL","Chiefs-Bills practice report updated","2h ago"],
  ["NBA","Lakers injury report updated","3h ago"],
  ["MLB","Braves-Mets pitching confirmation pending","4h ago"],
  ["ALL SPORTS","Weather and lineup changes can affect model confidence","5h ago"]
];

let screen="home";
let selected=new Set();

const app=document.querySelector("#app");
const count=document.querySelector("#count");

function card(p){

  const on=selected.has(p.id);

  return `
  <article class="card">

    <div class="row">

      <div>
        <div class="league">
          ${p.league} • ${p.market}
        </div>

        <div class="match">
          ${p.matchup}
        </div>
      </div>

      <div class="confidence">
        ${p.conf}/10
      </div>

    </div>

    <div>
      <span class="price">
        ${p.line}
      </span>

      <span class="prob">
        ${p.prob}% model probability
      </span>
    </div>

    <p class="reason">
      ${p.reason}
    </p>

    <div class="meta">
      ✚ ${p.injury}
    </div>

    <div class="meta">
      ☁ ${p.weather}
    </div>

    <div class="meta">
      📰 ${p.news}
    </div>

    <div class="updated">
      Model demo data • verify live inputs before relying on any analysis
    </div>

    <button
      class="add ${on?"on":""}"
      onclick="toggle('${p.id}')"
    >
      ${on?"✓ ADDED TO PARLAY":"+ ADD TO PARLAY"}
    </button>

  </article>
  `;
}

function picksView(){

  return `
  <section class="hero">

    <div class="kicker">
      SPORTS EDGE ANALYTICS
    </div>

    <h1>
      Data before decisions.
    </h1>

    <p>
      Compare model probability, 1–10 confidence, odds context,
      injuries, weather and news in one clean dashboard.
    </p>

    <a class="cta" href="#picks">
      View today's picks
    </a>

  </section>

  <div class="toolbar">

    <button class="pill on">
      All Sports
    </button>

    <button class="pill">
      NFL
    </button>

    <button class="pill">
      NBA
    </button>

    <button class="pill">
      MLB
    </button>

  </div>

  <h2>
    Top Picks
  </h2>

  <div class="sub">
    Model estimates — not guarantees.
  </div>

  <div class="grid">
    ${picks.map(card).join("")}
  </div>

  <div class="notice">
    Sports Edge is an analytics product in this release.
    It does not accept wagers, deposits or payouts.
  </div>
  `;
}

function parlayView(){

  const a=picks.filter(
    p=>selected.has(p.id)
  );

  return `
  <h2>
    Parlay Builder
  </h2>

  <div class="sub">
    ${a.length} leg${a.length===1?"":"s"} selected
  </div>

  ${
    a.length
    ?
    `<div class="grid">
      ${a.map(card).join("")}
    </div>`
    :
    `<div class="empty">
      <strong>Build your parlay</strong>
      Add picks from the Top Picks screen.
    </div>`
  }

  <div class="notice">
    A parlay combines multiple uncertain outcomes.
    This website provides analysis only and does not place bets.
  </div>
  `;
}

function newsView(){

  return `
  <h2>
    News & Analysis
  </h2>

  <div class="sub">
    Connect a licensed live feed for production.
  </div>

  <div class="grid">

    ${
      news.map(n=>`

      <article class="card news">

        <div class="newsicon">
          📰
        </div>

        <div>

          <div class="league">
            ${n[0]} • ${n[2]}
          </div>

          <h3>
            ${n[1]}
          </h3>

          <div class="meta">
            Live provider integration goes here.
          </div>

        </div>

      </article>

      `).join("")
    }

  </div>
  `;
}

function moreView(){

  const items=[
    "Injuries & Lineups",
    "Weather",
    "My Picks / Results",
    "Data Sources",
    "Account & Billing",
    "Privacy & Terms"
  ];

  return `
  <h2>
    More
  </h2>

  <div class="sub">
    Sports Edge product tools
  </div>

  <div class="more">

    ${
      items.map(x=>`

      <div class="card">

        <div class="league">
          SPORTS EDGE
        </div>

        <h3>
          ${x}
        </h3>

        <div class="meta">
          Production integration placeholder →
        </div>

      </div>

      `).join("")
    }

  </div>

  <div class="notice">
    For the commercial release, connect licensed odds,
    injury, weather and news providers through the secure backend.
    Never expose provider API keys in this website's JavaScript.
  </div>
  `;
}

function render(){

  count.textContent=selected.size;

  app.innerHTML=
    screen==="home" || screen==="picks"
    ? picksView()
    : screen==="parlay"
    ? parlayView()
    : screen==="news"
    ? newsView()
    : moreView();

  document
    .querySelectorAll("nav button")
    .forEach(b=>{
      b.classList.toggle(
        "active",
        b.dataset.screen===screen
      );
    });
}

window.toggle=id=>{

  selected.has(id)
    ? selected.delete(id)
    : selected.add(id);

  render();
};

document
  .querySelectorAll("nav button")
  .forEach(b=>{

    b.onclick=()=>{
      screen=b.dataset.screen;
      render();
    };

  });

render();