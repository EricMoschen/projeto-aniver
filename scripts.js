const envelope = document.getElementById('envelope');
const openBtn = document.getElementById('openBtn');
const messageEl = document.getElementById('message');
const hint = document.getElementById('hint');
const bgHearts = document.getElementById('bgHearts');

const finalMessage = [
  '<strong>Suzana</strong> 💖',
  '',
  'Espero que o seu dia seja cheio de sorrisos que contagiem todos ao seu redor, abraços que aqueçam o coração e momentos que te façam perceber o quanto você é especial.',
  '',
  'Sou muito grato a Deus por ter colocado você na minha vida. Sua presença sempre traz alegria, leveza e muitos momentos bons que guardo com muito carinho. E, sendo bem sincero, espero que ainda possamos criar muitos e muitos outros momentos juntos.',
  '',
  'Qualquer pessoa que consiga te observar de verdade, sem se prender apenas à beleza física, consegue enxergar a mulher incrível que você é. Uma mulher forte, decidida, meiga e com um coração enorme. E sinceramente… não é qualquer um que tem a sorte de perceber isso.',
  '',
  'Eu sei que você merece muito mais do que apenas uma mensagem, mas quero que saiba que cada palavra foi escrita pensando em você e em tudo que te torna única.',
  '',
  'Que esse novo ciclo da sua vida venha cheio de conquistas, felicidade, paz e momentos que façam seu coração sorrir de verdade.',
  '',
  'E que a vida continue te surpreendendo com pessoas, caminhos e histórias maravilhosas… porque, às vezes, as melhores coisas da vida começam exatamente assim: de forma simples, quase sem perceber.',
  '',
  'Feliz aniversário, Susy. 💛'
].join('\n');


let opened = false;

openBtn.addEventListener('click', async () => {
  if (opened) return;
  opened = true;

  envelope.classList.add('open');
  hint.textContent = '✨💖💖💖✨';

  burstSparkles();
  await delay(850);

  await animateWriting(finalMessage);
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