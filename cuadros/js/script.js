const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
  box.addEventListener('dragstart', dragStart);
  box.addEventListener('dragover', dragOver);
  box.addEventListener('drop', drop);
});

let draggedElement = null;

function dragStart(event) {
  draggedElement = event.target;
  event.dataTransfer.effectAllowed = 'move';
}

function dragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

function drop(event) {
  event.preventDefault();
  
  if (event.target.className === 'box' && event.target !== draggedElement) {
    const parent = event.target.parentNode;
    const nodes = Array.from(parent.children);
    const draggedIndex = nodes.indexOf(draggedElement);
    const targetIndex = nodes.indexOf(event.target);

    if (draggedIndex < targetIndex) {
      parent.insertBefore(draggedElement, event.target.nextSibling);
    } else {
      parent.insertBefore(draggedElement, event.target);
    }
  }
}