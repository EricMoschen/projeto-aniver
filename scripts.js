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
    messageEl.scrollTop = 0;

    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.className = 'typing-cursor';
    messageEl.appendChild(cursor);

    let i = 0;

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

      const currentChar = html[i];
      cursor.insertAdjacentText('beforebegin', currentChar);
      i += 1;

      requestAnimationFrame(() => {
        messageEl.scrollTop = messageEl.scrollHeight;
        movePen(cursor);
      });

      setTimeout(step, getHumanDelay(currentChar));
    };

    step();
  });
}

function getHumanDelay(char) {
  const base = 24 + Math.random() * 70;

  if (char === '\n') return 240 + Math.random() * 170;
  if ([',', ';', ':'].includes(char)) return 130 + Math.random() * 170;
  if (['.', '!', '?'].includes(char)) return 260 + Math.random() * 260;

  // Pequenas pausas de pensamento para parecer mais natural
  if (Math.random() < 0.05) return 180 + Math.random() * 260;

  return base;
}

function movePen(cursor) {
  const cursorRect = cursor.getBoundingClientRect();
  const letterRect = envelope.querySelector('.letter').getBoundingClientRect();

  const x = cursorRect.left - letterRect.left - 38;
  const y = cursorRect.top - letterRect.top - 8;

  writerEl.style.transform = `translate(${Math.max(8, x)}px, ${Math.max(20, y)}px)`;
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