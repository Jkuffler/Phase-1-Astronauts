const draggables = document.querySelectorAll('.astroDrag')
const containers = document.querySelectorAll('.container')


draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', (e) => {
        // const afterElement = document.querySelector(container, e.clientY)
        e.preventDefault();
        const currentDrag = document.querySelector('.dragging')
        container.appendChild(currentDrag)
    })
})

function getAstros(){
    fetch('http://api.open-notify.org/astros.json')
.then(function (response) {
    return response.json()
})
.then(function(astrosData) {
    astrosData.forEach(function(astro){
      renderAstro(astro);
        })
    })
}





// function dragElementPlacement(container, y) {
//     const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

//     draggableElements.reduce((closestEl, child) => {
//         const box = child.getBoundingClientRect()
//         console.log(box)
//     }, {offset: Number.POSITIVE_INFINITY})
// }




// function allowDrop(ev) {
//     ev.preventDefault();
//   }
  
//   function drag(ev) {
//     ev.dataTransfer.setData("text", ev.target.id);
//   }
  
//   function drop(ev) {
//     ev.preventDefault();
//     var data = ev.dataTransfer.getData("text");
//     ev.target.appendChild(document.getElementById(data));
//   }