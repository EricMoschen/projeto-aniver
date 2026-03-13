const envelope = document.getElementById('envelope');
const openBtn = document.getElementById('openBtn');
const messageEl = document.getElementById('message');
const writerEl = document.getElementById('writer');
const hint = document.getElementById('hint');
const bgHearts = document.getElementById('bgHearts');

const finalMessage = [
  'Meu amor,',
  '',
  'Hoje o mundo ficou mais bonito porque é o seu aniversário.',
  'Que cada sorriso seu volte em dobro, em carinho, luz e paz.',
  '',
  'Você é o detalhe mais lindo dos meus dias,',
  'a minha parte favorita de todos os planos,',
  'e a certeza de que amar vale a pena.',
  '',
  'Feliz aniversário, <strong>vida</strong>. ❤️',
  'Com todo o meu amor,',
  '<strong>Seu eterno apaixonado</strong>'
].join('\n');

let opened = false;

openBtn.addEventListener('click', async () => {
  if (opened) return;
  opened = true;

  envelope.classList.add('open');
  hint.textContent = 'Escrevendo sua carta... ✍️';

  burstSparkles();
  await delay(850);

  envelope.classList.add('writing');
  await animateWriting(finalMessage);

  envelope.classList.remove('writing');
  hint.textContent = 'Feliz aniversário! Que seu dia seja perfeito 💖';
});

function animateWriting(html) {
  return new Promise((resolve) => {
    messageEl.innerHTML = '';

    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.opacity = '0.8';
    messageEl.appendChild(cursor);

    let i = 0;
    let visibleChars = 0;

    const step = () => {
      if (i >= html.length) {
        cursor.remove();
        writerEl.style.opacity = '0';
        resolve();
        return;
      }

      if (html[i] === '<') {
        let tag = '';
        while (i < html.length && html[i] !== '>') {
          tag += html[i];
          i += 1;
        }
        if (i < html.length) {
          tag += '>';
          i += 1;
        }
        cursor.insertAdjacentHTML('beforebegin', tag);
        queueMicrotask(step);
        return;
      }

      cursor.insertAdjacentText('beforebegin', html[i]);
      i += 1;
      visibleChars += 1;

      movePen(visibleChars);

      const pace = html[i - 1] === '\n' ? 280 : 22 + Math.random() * 42;
      setTimeout(step, pace);
    };

    step();
  });
}

function movePen(chars) {
  const charsPerLine = 36;
  const line = Math.floor(chars / charsPerLine);
  const col = chars % charsPerLine;

  const x = 26 + col * 10;
  const y = 28 + line * 30;

  writerEl.style.transform = `translate(${x}px, ${y}px)`;
}

function burstSparkles() {
  for (let i = 0; i < 34; i += 1) {
    const spark = document.createElement('span');
    spark.className = 'spark';
    spark.textContent = ['✨', '💖', '💕'][Math.floor(Math.random() * 3)];
    spark.style.left = '50%';
    spark.style.top = '54%';

    const angle = Math.random() * Math.PI * 2;
    const dist = 120 + Math.random() * 220;
    spark.style.setProperty('--x', `${Math.cos(angle) * dist}px`);
    spark.style.setProperty('--y', `${Math.sin(angle) * dist}px`);

    envelope.appendChild(spark);
    setTimeout(() => spark.remove(), 1800);
  }
}

function spawnBackgroundHeart() {
  const heart = document.createElement('span');
  heart.className = 'bg-heart';
  heart.textContent = ['❤', '💗', '💞', '✨'][Math.floor(Math.random() * 4)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDuration = `${6 + Math.random() * 6}s`;
  heart.style.animationDelay = `${Math.random() * 0.6}s`;

  bgHearts.appendChild(heart);
  setTimeout(() => heart.remove(), 12000);
}

setInterval(spawnBackgroundHeart, 480);
for (let i = 0; i < 10; i += 1) {
  setTimeout(spawnBackgroundHeart, i * 220);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}