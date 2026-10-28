/** Original, generic teaching schematics; never a vehicle-specific service illustration. */
const markers = {
  setup: [103, 322, '1'], body: [714, 159, '2'], tires: [209, 292, '3'],
  engine: [159, 206, '4'], cooling: [127, 233, '5'], electrical: [347, 252, '6'],
  cab: [257, 162, '7'], underbody: [476, 277, '8'], gauges: [216, 189, '9'],
  controls: [274, 208, '10'], leaks: [399, 331, '11'], closeout: [785, 278, '12'],
};

const zoneClass = (zone, active) => `truck-zone${zone === active ? ' zone-active' : ''}`;

function wheel(x) {
  return `<g transform="translate(${x} 290)"><circle r="43" fill="#243d46"/><circle r="32" fill="#354e56" stroke="#617275" stroke-width="2"/><circle r="19" fill="#b9c4b3" stroke="#152e38" stroke-width="4"/><circle r="7" fill="#52716f"/><path d="M0-28v7M20-20l-5 5M28 0h-7M20 20l-5-5M0 28v-7M-20 20l5-5M-28 0h7M-20-20l5 5" stroke="#172f39" stroke-width="4"/></g>`;
}

export function truckDiagram(activeZone = 'overview') {
  const active = Object.prototype.hasOwnProperty.call(markers, activeZone) ? activeZone : 'overview';
  const point = markers[active];
  const markerMarkup = Object.entries(markers).map(([zone, [x, y, n]]) => `<g data-zone-marker="${zone}" transform="translate(${x} ${y})" class="truck-marker${zone === active ? ' active-marker' : ''}"><circle r="13"/><text text-anchor="middle" dy="4">${n}</text></g>`).join('');
  return `<svg class="pmcs-truck" viewBox="0 0 900 420" role="img" aria-label="Generic wheeled-vehicle inspection schematic with twelve numbered stations. ${active === 'overview' ? 'All stations are shown.' : `Station ${point[2]} is highlighted.`}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .pmcs-truck .truck-zone{transition:filter .2s}
      .pmcs-truck .zone-active{filter:drop-shadow(0 0 5px #b7741c)}
      .pmcs-truck .truck-marker circle{fill:#fcfbf5;stroke:#456b6b;stroke-width:1.5}
      .pmcs-truck .truck-marker text{fill:#183c44;font:700 11px system-ui,sans-serif}
      .pmcs-truck .active-marker circle{fill:#d8a448;stroke:#183c44;stroke-width:2.5}
      .pmcs-truck .inspection-ring{transform-box:fill-box;transform-origin:center;animation:pmcs-pulse 1.7s ease-in-out infinite;animation-play-state:paused}
      .pmcs-truck .scan-track{animation:pmcs-scan 3s linear infinite;animation-play-state:paused}
      .is-playing .pmcs-truck .inspection-ring,.is-playing .pmcs-truck .scan-track{animation-play-state:running}
      @keyframes pmcs-pulse{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.18)}}
      @keyframes pmcs-scan{to{stroke-dashoffset:-64}}
      @media(prefers-reduced-motion:reduce){.pmcs-truck .inspection-ring,.pmcs-truck .scan-track{animation:none!important;transition:none!important}}
    </style>
    <rect x="1" y="1" width="898" height="418" rx="20" fill="#f3f3e9"/>
    <path d="M35 351H865M35 376H865" stroke="#dce3d8"/>
    <text x="38" y="39" fill="#57706e" font-family="system-ui,sans-serif" font-size="12" font-weight="700" letter-spacing="2">PMCS / INSPECTION MAP</text>
    <text x="38" y="61" fill="#6b7a72" font-family="system-ui,sans-serif" font-size="12">Generic teaching schematic · use the actual vehicle TM</text>
    <ellipse cx="451" cy="337" rx="345" ry="13" fill="#dce1d4"/>
    <g data-zone="body" class="${zoneClass('body', active)}">
      <path d="M351 151H774V240H351Z" fill="#8fa58c" stroke="#234e50" stroke-width="3"/>
      <path d="M351 150V137H775V150M356 180H771M356 210H771" fill="none" stroke="#537666" stroke-width="4"/>
      <path d="M389 150V236M451 150V236M513 150V236M575 150V236M637 150V236M699 150V236M761 150V236" stroke="#6d8c75" stroke-width="4"/>
      <rect x="767" y="226" width="14" height="15" rx="2" fill="#b66b49" stroke="#244e50" stroke-width="2"/>
    </g>
    <g data-zone="underbody" class="${zoneClass('underbody', active)}">
      <path d="M125 259H789V276H125Z" fill="#3d6261" stroke="#24494c" stroke-width="3"/>
      <path d="M269 289H588M644 289H704" stroke="#5b7770" stroke-width="8"/>
      <path d="M564 275Q620 305 670 275M665 275Q718 305 767 275" fill="none" stroke="#314c4c" stroke-width="6"/>
      <rect x="407" y="277" width="39" height="19" rx="5" fill="#6d8980" stroke="#24494c" stroke-width="3"/>
    </g>
    <g data-zone="engine" class="${zoneClass('engine', active)}">
      <path d="M107 216L120 186H191V250H107Z" fill="#7b9b86" stroke="#234e50" stroke-width="3"/>
      <path d="M125 188L130 177H191V188Z" fill="#b3bfa4" stroke="#234e50" stroke-width="2"/>
      <path d="M142 219H174M142 227H174M142 235H174" stroke="#5b7c6d" stroke-width="3"/>
      <rect x="100" y="240" width="31" height="20" rx="3" fill="#c2c6b3" stroke="#234e50" stroke-width="3"/>
      <rect x="107" y="216" width="16" height="14" rx="2" fill="#e7c779" stroke="#456764" stroke-width="2"/>
    </g>
    <g data-zone="cooling" class="${zoneClass('cooling', active)}">
      <path d="M109 191L103 213V240H114V192Z" fill="#365b5b" stroke="#234e50" stroke-width="2"/>
      <path d="M106 218H113M106 225H113M106 232H113" stroke="#a8baa8" stroke-width="2"/>
    </g>
    <g data-zone="cab" class="${zoneClass('cab', active)}">
      <path d="M191 246V125L216 95H304L334 128V254H260Q249 237 225 237Q199 237 184 259H130V246Z" fill="#9caf95" stroke="#234e50" stroke-width="3"/>
      <path d="M205 132L222 108H295L319 132V182H205Z" fill="#d7e5df" stroke="#30595a" stroke-width="3"/>
      <path d="M259 110V181M199 190H326V244H264" fill="none" stroke="#527667" stroke-width="3"/>
      <path d="M216 114L207 128M307 125L297 114" stroke="#f8faf3" stroke-width="3"/>
      <rect x="296" y="195" width="19" height="5" rx="2" fill="#2d5453"/>
      <path d="M192 148H178V173H190" fill="none" stroke="#30595a" stroke-width="4"/>
      <rect x="172" y="145" width="12" height="23" rx="3" fill="#c1d5ce" stroke="#30595a" stroke-width="2"/>
      <path d="M276 258H326V269H276M280 278H326V287H280" fill="#7c9486" stroke="#30595a" stroke-width="2"/>
    </g>
    <g data-zone="gauges" class="${zoneClass('gauges', active)}">
      <path d="M207 174H247L254 184H207Z" fill="#456f6d"/>
      <circle cx="220" cy="177" r="4" fill="#e8c77e"/>
      <path d="M219 177L221 175" stroke="#385b59" stroke-width="1.5"/>
    </g>
    <g data-zone="controls" class="${zoneClass('controls', active)}">
      <path d="M265 179L270 203M279 190V215H299V205" fill="none" stroke="#33595a" stroke-width="5"/>
      <ellipse cx="262" cy="173" rx="11" ry="4" transform="rotate(25 262 173)" fill="none" stroke="#33595a" stroke-width="3"/>
    </g>
    <g data-zone="electrical" class="${zoneClass('electrical', active)}">
      <rect x="338" y="226" width="57" height="32" rx="4" fill="#b8c3a9" stroke="#234e50" stroke-width="3"/>
      <path d="M350 237H361M355.5 232V242M375 237H385" stroke="#51756b" stroke-width="2"/>
      <path d="M338 247H395" stroke="#6b8877" stroke-width="2"/>
    </g>
    <g data-zone="tires" class="${zoneClass('tires', active)}">${wheel(209)}${wheel(621)}${wheel(724)}</g>
    <g data-zone="setup" class="${zoneClass('setup', active)}">
      <path d="M151 335L169 316V335Z" fill="#cc9a47" stroke="#6f6c4f" stroke-width="2"/>
      <path d="M256 335L244 318V335Z" fill="#cc9a47" stroke="#6f6c4f" stroke-width="2"/>
      <path d="M81 336L88 305H96L104 336Z" fill="#d9b46c" stroke="#6b765e" stroke-width="2"/>
      <path d="M86 318H99" stroke="#fbf4d8" stroke-width="5"/>
    </g>
    <g data-zone="leaks" class="${zoneClass('leaks', active)}">
      <path d="M397 304C397 304 392 311 392 314A5 5 0 0 0 402 314C402 311 397 304 397 304Z" fill="#418a83" opacity=".75"/>
      <ellipse cx="397" cy="338" rx="20" ry="3" fill="#6fa299" opacity=".35"/>
    </g>
    <g data-zone="closeout" class="${zoneClass('closeout', active)}">
      <rect x="798" y="246" width="36" height="48" rx="4" fill="#fbfaf0" stroke="#486e68" stroke-width="2"/>
      <rect x="807" y="242" width="18" height="8" rx="2" fill="#9cb09b" stroke="#486e68" stroke-width="2"/>
      <path d="M807 260L810 263L815 257M819 261H828M807 273L810 276L815 270M819 274H828M807 285H828" stroke="#518779" stroke-width="2" fill="none"/>
    </g>
    <path class="scan-track" d="M86 355H815" fill="none" stroke="#528c81" stroke-width="2" stroke-dasharray="7 9" opacity=".5"/>
    ${point ? `<circle class="inspection-ring" cx="${point[0]}" cy="${point[1]}" r="25" fill="none" stroke="#ba842b" stroke-width="3" stroke-dasharray="5 4"/>` : ''}
    ${markerMarkup}
    <text x="38" y="402" fill="#57706e" font-family="system-ui,sans-serif" font-size="12">Numbers match the walkthrough stations. The illustration does not prescribe a PMCS sequence.</text>
  </svg>`;
}

export function leakDiagram(classId = 'I') {
  const id = ['I', 'II', 'III'].includes(classId) ? classId : 'I';
  const description = { I: 'Wetness is visible at the connection, without drops.', II: 'A drop forms at the connection and remains attached.', III: 'Drops form and fall from the connection.' }[id];
  const drop = '<path d="M0-10C-3-5-8 0-8 5A8 8 0 0 0 8 5C8 0 3-5 0-10Z" fill="#2f8987"/>';
  return `<svg class="pmcs-leak leak-class-${id}" viewBox="0 0 560 320" role="img" aria-label="Class ${id} leakage: ${description} Illustration only; operating status depends on the applicable TM." xmlns="http://www.w3.org/2000/svg">
    <style>
      .pmcs-leak .leak-forming{transform-box:fill-box;transform-origin:top center;animation:pmcs-form 3s ease-in-out infinite;animation-play-state:paused}
      .pmcs-leak .leak-falling{animation:pmcs-fall 2.2s ease-in infinite;animation-play-state:paused}
      .pmcs-leak .leak-falling-second{animation-delay:1.1s}
      .is-playing .pmcs-leak .leak-forming,.is-playing .pmcs-leak .leak-falling{animation-play-state:running}
      @keyframes pmcs-form{0%,100%{transform:scale(.8);opacity:.85}65%,85%{transform:scale(1);opacity:1}}
      @keyframes pmcs-fall{0%{transform:translateY(0);opacity:1}70%{transform:translateY(65px);opacity:1}78%{transform:translateY(65px);opacity:0}79%{transform:translateY(-49px);opacity:0}88%{transform:translateY(-49px);opacity:1}100%{transform:translateY(0);opacity:1}}
      @media(prefers-reduced-motion:reduce){.pmcs-leak .leak-forming,.pmcs-leak .leak-falling{animation:none!important}}
    </style>
    <rect x="1" y="1" width="558" height="318" rx="18" fill="#f3f3e9"/>
    <text x="28" y="35" fill="#284d52" font-family="system-ui,sans-serif" font-size="17" font-weight="700">CLASS ${id}</text>
    <text x="28" y="57" fill="#617772" font-family="system-ui,sans-serif" font-size="12">Generic connection · visual behavior only</text>
    <path d="M70 107H490V147H70Z" fill="#9caf9e" stroke="#345d5d" stroke-width="3"/>
    <path d="M70 116H490" stroke="#c4d1be" stroke-width="6"/>
    <rect x="250" y="95" width="60" height="64" rx="7" fill="#bdc9b4" stroke="#345d5d" stroke-width="3"/>
    <path d="M260 98V156M300 98V156" stroke="#7a9888" stroke-width="4"/>
    <ellipse class="leak-film" cx="280" cy="157" rx="23" ry="6" fill="#4b9b92" opacity=".7"/>
    ${id === 'II' ? `<g transform="translate(280 168)"><g class="leak-drop leak-forming">${drop}</g></g>` : ''}
    ${id === 'III' ? `<g transform="translate(280 168) scale(.65)">${drop}</g><g transform="translate(280 213)"><g class="leak-drop leak-falling">${drop}</g></g><ellipse cx="281" cy="283" rx="38" ry="4" fill="#519f96" opacity=".45"/>` : ''}
    <path d="M70 287H490" stroke="#c9d5c6" stroke-width="2"/>
    <text x="280" y="310" text-anchor="middle" fill="#476863" font-family="system-ui,sans-serif" font-size="12">${id === 'I' ? 'Wetness · no drops' : id === 'II' ? 'A drop forms · it does not fall' : 'Drops form · then fall'}</text>
  </svg>`;
}
