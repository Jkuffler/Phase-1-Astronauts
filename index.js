const extraInfo = [
    {name: "Mark Vande Hei",
    image: "https://www.howmanypeopleareinspacerightnow.com/app/flags/flag-usa.jpg",
    wikiInfo: "https://en.wikipedia.org/wiki/Mark_T._Vande_Hei"
    },
    {name: "Oleg Novitskiy",
    image: "https://www.howmanypeopleareinspacerightnow.com/app/flags/flag-russia.jpg",
    wikiInfo: "https://en.wikipedia.org/wiki/Oleg_Novitsky"
    },
    {name: "Pyotr Dubrov",
    image: "https://www.howmanypeopleareinspacerightnow.com/app/flags/flag-russia.jpg",
    wikiInfo: "https://en.wikipedia.org/wiki/Pyotr_Dubrov"
    },
    {name: "Thomas Pesquet",
    image: "https://www.howmanypeopleareinspacerightnow.com/app/flags/flag-france.jpg",
    wikiInfo: "https://en.wikipedia.org/wiki/Thomas_Pesquet"
    },
    {name: "Megan McArthur",
    image: "https://www.howmanypeopleareinspacerightnow.com/app/flags/flag-usa.jpg",
    wikiInfo: "https://en.wikipedia.org/wiki/K._Megan_McArthur"
    },
    {name: "Shane Kimbrough",
    image: "https://www.howmanypeopleareinspacerightnow.com/app/flags/flag-usa.jpg",
    wikiInfo: "https://en.wikipedia.org/wiki/Shane_Kimbrough"
    },
    {name: "Akihiko Hoshide",
    image: "https://www.howmanypeopleareinspacerightnow.com/app/flags/flag-japan.jpg",
    wikiInfo: "https://en.wikipedia.org/wiki/Akihiko_Hoshide"
    },
    {name: "Nie Haisheng",
    image: "https://www.howmanypeopleareinspacerightnow.com/app/flags/flag-china.jpg",
    wikiInfo: "https://en.wikipedia.org/wiki/Nie_Haisheng"
    },
    {name: "Liu Boming",
    image: "https://www.howmanypeopleareinspacerightnow.com/app/flags/flag-china.jpg",
    wikiInfo: "https://en.wikipedia.org/wiki/Liu_Boming_(astronaut)"
    },
    {name: "Tang Hongbo",
    image: "https://www.howmanypeopleareinspacerightnow.com/app/flags/flag-china.jpg",
    wikiInfo: "https://en.wikipedia.org/wiki/Tang_Hongbo"
    }
]



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
            showAstroInfo(astro);
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

const astroInfo = document.querySelector('#astroInfo');

const showAstroInfo = (astro) => {
    const astroName = document.createElement('h2')
    astroName.innerHTML = astro.name

    const craft = document.createElement('h3')
    craft.innerHTML = `Craft: ${astro.craft}`

    const nationality = document.createElement('img')

    const wiki = document.createElement('a')
    const wikiLink = document.createTextNode('Wiki Bio')
    wiki.appendChild(wikiLink)
    wiki.title = 'Wiki Bio'


    extraInfo.forEach((extra) => {
        if(astro.name === extra.name){
            nationality.src = extra.image
            wiki.href = (extra.wikiInfo)
        }else {
            "No such astronaut!"
        }
    })
    astroInfo.innerHTML = '';
    astroInfo.append(astroName,nationality,craft,wiki)
}

function init() {
    getAstros();
    astrosContainer()
}

init();
