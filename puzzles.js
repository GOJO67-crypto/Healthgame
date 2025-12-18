// Shared utilities for puzzles
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function draggableList({ container, items, onSubmit }) {
  container.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.text;
    li.draggable = true;
    li.dataset.id = item.id;
    li.className = 'draggable';
    container.appendChild(li);
  });

  let dragSrc = null;

  container.addEventListener('dragstart', (e) => {
    dragSrc = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.target.classList.add('dragging');
  });
  container.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
  });
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const dragging = container.querySelector('.dragging');
    const afterElement = getDragAfterElement(container, e.clientY);
    if (!afterElement) container.appendChild(dragging);
    else container.insertBefore(dragging, afterElement);
  });

  function getDragAfterElement(container, y) {
    const els = [...container.querySelectorAll('.draggable:not(.dragging)')];
    return els.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  const btn = document.createElement('button');
  btn.className = 'btn';
  btn.textContent = 'Submit order';
  btn.addEventListener('click', () => {
    const order = [...container.querySelectorAll('.draggable')].map(el => el.dataset.id);
    onSubmit(order);
  });
  container.parentElement.appendChild(btn);
}
