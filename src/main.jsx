import React, {useMemo, useState} from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const challenges = [
  {id:2, item:'Costco Hot Dog Combo', sold:'JUL 2026', price:1.50, img:'linear-gradient(135deg,#aba59b 0%,#dad6cf 22%,#8b6b45 23%,#f2d9a6 34%,#b55a2c 45%,#e0c28d 57%,#c0c6ce 58%,#e9edf0 72%,#1554b8 73%,#0c2f75 100%)'},
  {id:3, item:'Used Office Chair', sold:'JUN 2026', price:48, img:'linear-gradient(140deg,#353331,#151515 30%,#717171 31%,#252525 47%,#0b0b0b 63%,#ad7c48 64%,#d4b08b)'},
  {id:4, item:'Vintage Camera', sold:'MAY 2026', price:86, img:'radial-gradient(circle at 42% 42%,#222 0 14%,#777 15% 25%,#111 26% 33%,transparent 34%),linear-gradient(130deg,#443b32,#1e1e1e 45%,#66523b)'},
  {id:5, item:'Arcade Cabinet', sold:'APR 2026', price:625, img:'linear-gradient(115deg,#271c4c,#0e0718 45%,#fa9d37 46% 54%,#2e1c05 55%),radial-gradient(circle,#ff3b7b,transparent)'},
  {id:6, item:'Signed Baseball', sold:'MAR 2026', price:39, img:'radial-gradient(circle at 50% 48%,#f5efe4 0 30%,#be3b2b 31% 33%,#f5efe4 34% 42%,transparent 43%),linear-gradient(#315c38,#142018)'},
];

function money(n){return n % 1 ? n.toFixed(2) : String(n)}
function App(){
  const [screen,setScreen]=useState('menu');
  const [unlimited,setUnlimited]=useState(true);
  const [index,setIndex]=useState(0);
  const [guess,setGuess]=useState('0');
  const [points,setPoints]=useState(0);
  const [rounds,setRounds]=useState([]);
  const current=challenges[index % challenges.length];
  const locked=!unlimited && rounds.length>=1;
  const dots=useMemo(()=>Array.from({length:5},(_,i)=>i<rounds.length),[rounds]);
  const press=(v)=>{ if(locked) return; setGuess(g=> g==='0'&&v!=='.' ? v : (v==='.'&&g.includes('.')?g:g+v)); };
  const del=()=>setGuess(g=>g.length>1?g.slice(0,-1):'0');
  const submit=()=>{ if(locked) return; const n=parseFloat(guess)||0; const diff=Math.abs(n-current.price); const gain=Math.max(0,Math.round(1000 - diff*22)); setPoints(p=>p+gain); setRounds(r=>[...r,{gain}].slice(-5)); setIndex(i=>i+1); setGuess('0'); };
  return <main className="page"><section className="cabinet">
    {screen==='menu' ? <div className="menu display">
      <h1>PRICEPOINT.GG</h1><div className="menuLinks"><button>ARCHIVE</button><button>SIGN IN</button><button onClick={()=>setScreen('how')}>HOW IT WORKS</button></div>
      <label className="toggle"><span>UNLIMITED</span><input type="checkbox" checked={unlimited} onChange={e=>setUnlimited(e.target.checked)}/><i/></label>
      <button className="play" onClick={()=>setScreen('game')}>PLAY</button>
    </div> : screen==='how' ? <div className="display how"><h2>HOW IT WORKS</h2><p>Guess the sold price. Closer guesses score more points.</p><p>Daily mode stops after one challenge. Unlimited keeps serving rounds forever.</p><button onClick={()=>setScreen('menu')}>BACK</button></div> : <div className="display game">
      <header><b>PRICEPOINT.GG</b><span>#{current.id}</span><div className="dots">{dots.map((d,i)=><i key={i} className={d?'on':''}/>)}</div><strong>{points}</strong><span>points</span></header>
      <article className="photo" style={{background:current.img}}><em>SOLD {current.sold}</em><h2>{current.item}</h2></article>
      {locked ? <div className="locked"><h2>DAILY COMPLETE</h2><p>Flip on unlimited to keep playing.</p></div> : <><div className="entry"><span>${guess}</span><button onClick={del}>DEL</button></div><div className="keys">{['1','2','3','.','4','5','6','0','7','8','9'].map(k=><button onClick={()=>press(k)} key={k}>{k}</button>)}<button className="guess" onClick={submit}>GUESS</button></div></>}
      <label className="toggle inGame"><span>UNLIMITED</span><input type="checkbox" checked={unlimited} onChange={e=>setUnlimited(e.target.checked)}/><i/></label>
    </div>}
  </section></main>
}
createRoot(document.getElementById('root')).render(<App/>);
