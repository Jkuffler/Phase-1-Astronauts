
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

    astroSpan.addEventListener('click', (e) => {
        if(e.target.parentElement.parentElement.id === 'space-station'){
            showAstroInfo(astro) 
        }else {
            alert('Take me to the Space Station!')
        }
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

const showAstroInfo = (astro) => {
    const astroName = document.createElement('h2')
    astroName.innerHTML = astro.name

    const craft = document.createElement('h3')
    craft.innerHTML = `Craft: ${astro.craft}`

    const astroInfo = document.querySelector('#astroInfo');
    astroInfo.innerHTML = '';
    astroInfo.append(astroName,craft)
}



function init() {
    getAstros();
    astrosContainer();
}

init();
