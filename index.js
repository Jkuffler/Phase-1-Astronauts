function getAstros(){
    fetch('http://api.open-notify.org/astros.json')
.then(function (response) {
    return response.json()
})
.then(function(astros) {
    astros.forEach(function(astro){
      renderAstro(astro);
})
})
}



