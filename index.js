
//attempt at displaying fetched data in span
const getAstros = () => {
    fetch('http://api.open-notify.org/astros.json')
    .then(resp => resp.json())
    .then((astroData) => {
        astroData.people.forEach((astro) => renderAstro(astro))
    })
}



const renderAstro = (astro) => {
    //create span, add class, id, and draggable attribute
    const earthContainer = document.querySelector('#earth')
    
    const astroSpan = document.createElement('span')
    astroSpan.classList = 'astroDrag'
    astroSpan.id = astro.name
    astroSpan.setAttribute('draggable', true)

    const astroImage = document.createElement('img')
    astroImage.classList = 'astro-image'
    astroImage.src = `./astro-images/${astro.name}.jpg`
    astroSpan.append(astroImage)

    earthContainer.append(astroSpan)

    //spans are already looped through.
    //Just add dragstart and dragend events
    astroSpan.addEventListener('dragstart', () => {
        astroSpan.classList.add('dragging');
    })

    astroSpan.addEventListener('dragend', () => {
        astroSpan.classList.remove('dragging');
    })

}


const containers = document.querySelectorAll('.container')


const astrosContainer = () => {
    containers.forEach(container => {
    container.addEventListener('dragover', (e) => {
        // const afterElement = document.querySelector(container, e.clientY)
        e.preventDefault();
        const currentDrag = document.querySelector('.dragging')
        container.appendChild(currentDrag)
    })
})
}
//drag and drop feature works




function init() {
    getAstros();
    // dragAstros();
    astrosContainer();
}

init();


// const spanInfo = (astro) => {
//     // const spanId = document.querySelectorAll()
//     const astroName = document.createElement('h2')
//     const astroCraft = document.createElement('h3')

//     draggables.forEach(() => {
//         draggables.addEventListener('click', () => {

//         if( === astro.name){
//             astroName.innerText = astro.name
//             astroCraft.innerText = astro.craft
//         }else{
//             alert('Does not exist!')
//         }

//         })
//     })
//     let info = document.querySelector('#astroInfo')
//     info.innerHTML = ''
//     info.append(astroName, astroCraft)
// }

//attempt at displaying fetched data in span






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