import './style.css'

const flowers = document.querySelectorAll('.flower');
const repelDistance = 150;
let lastScrollY = window.scrollY;
let scrollTimer = null;

document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  flowers.forEach(flower => {
    const rect = flower.getBoundingClientRect();
    const flowerX = rect.left + rect.width / 2;
    const flowerY = rect.top + rect.height / 2;

    const deltaX = flowerX - mouseX;
    const deltaY = flowerY - mouseY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < repelDistance) {
      const force = (repelDistance - distance) / repelDistance;
      const moveX = (deltaX / distance) * force * 80;
      const moveY = (deltaY / distance) * force * 80;

      flower.style.transform = `translate(${moveX}px, ${moveY}px)`;
      flower.style.transition = 'transform 0.3s ease-out';
    } else {
      flower.style.transform = 'translate(0, 0)';
      flower.style.transition = 'transform 0.5s ease-out';
    }
  });
});

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const scrollDelta = currentScrollY - lastScrollY;

  flowers.forEach((flower, index) => {
    const direction = index % 2 === 0 ? 1 : -1;
    const moveX = direction * scrollDelta * 0.3;
    const moveY = scrollDelta * 0.2;

    flower.style.transform = `translate(${moveX}px, ${moveY}px)`;
    flower.style.transition = 'transform 0.1s linear';
  });

  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    flowers.forEach(flower => {
      flower.style.transform = 'translate(0, 0)';
      flower.style.transition = 'transform 0.8s ease-out';
    });
  }, 150);

  lastScrollY = currentScrollY;
});
