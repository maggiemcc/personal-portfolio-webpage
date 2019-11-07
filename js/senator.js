async function getAPIData(url) {
      try {
        const response = await fetch(url)
        const data = await response.json()
        return data
      } catch (error) {
        console.error(error)
    }
    }
    
  
    let allSenators = { }
    
    const theData = getAPIData('senators.json').then(data => {
        allSenators = data.results[0].members
        console.log(allSenators)
        populateDOM(allSenators)
    })
    
    
    const republicans = allSenators.filter(senator => senator.party === 'R')
    const democrats = allSenators.filter(senator => senator.party === 'D')
    
    
    const container = document.querySelector('.container')
    
    function populateDOM(senatorArray) {
       senatorArray.forEach(senator => {
        let card = document.createElement('div')
        card.setAttribute('class', 'card')
        let cardImage = document.createElement('div')
        cardImage.setAttribute('class', 'card-image')
        let cardFigure = document.createElement('figure')
        cardFigure.setAttribute('class', 'image is-4by3')
        let figureImage = document.createElement('img')
        figureImage.src = `https://www.congress.gov/img/member/${senator.id.toLowerCase()}_200.jpg`
        figureImage.alt = "placeholder image"

        cardFigure.appendChild(figureImage)
        cardImage.appendChild(cardFigure)
        card.appendChild(populateCardContent(senator))
        container.appendChild(card)
       })
    }

    function populateCardContent(senator) {
        let cardContent = document.createElement('div')
        cardContent.setAttribute('class', 'card-content')
        let media = document.createElement('div')
        media.setAttribute('class', 'media')
        let mediaLeft = document.createElement('div')
        mediaLeft.setAttribute('class', 'media-left')
        let figure = document.createElement('div')
        figure.setAttribute('class', 'image is 48x48')
        let figureImage = document.createElement('img')
        figureImage.src ="https://bulma.io/images/placeholders/128x128.png" alt="Placeholder thumbnail"
        let mediaContent = document.createElement('div')
        mediaContent.setAttribute('class', 'media-content')
        let titleP = document.createElement('p')
        titleP.setAttribute('class', 'title is-4')
        let subtitleP = document('p')
        subtitleP.setAttribute('class', 'subtitle is-6')

        mediaContent.appendChild(titleP)
        mediaContent.appendChild(subtitleP)
    }