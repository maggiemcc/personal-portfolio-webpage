async function getAPIData(url) {
      try {
        const response = await fetch(url)
        const data = await response.json()
        return data
      } catch (error) {
        console.error(error)
    }
    }
    
  
    let allSenators = []
    let simpleSenators = []

    const theData = getAPIData('senators.json').then(data => {
        allSenators = data.results[0].members
        console.log(allSenators)
        populateDOM(allSenators)
        // console.log(simpleSenators)
        simpleSenators = mapSenators(allSenators)
        console.log(mapSenators(allSenators))
    })
    
    
    const republicans = allSenators.filter(senator => senator.party === 'R')
    const democrats = allSenators.filter(senator => senator.party === 'D')
    
    console.log(republicans, democrats)


    function mapSenators(allOfThem) {
    const resultMap = allOfThem.map(senator => {
        return {
            name: `${senator.first_name} ${senator.last_name}`,
            party: senator.party,
            birth_date: senator.date_of_birth,
            age: _calculateAge(new Date(senator.date_of_birth)),
            gender: senator.gender
        }
    })
return resultMap
}



    const container = document.querySelector('.container')
    


    function populateDOM(senatorArray) {
        senatorArray.forEach(senator => {
        let card = document.createElement('div')
        card.setAttribute('class', 'card')
        let cardImage = document.createElement('div')
        cardImage.setAttribute('class', 'card-image')
        let cardFigure = document.createElement('figure')
    //    cardFigure.setAttribute('class', 'image is-4by3')
        let figureImage = document.createElement('img')
        figureImage.src = `https://www.congress.gov/img/member/${senator.id.toLowerCase()}_200.jpg`
        figureImage.alt = 'Placeholder image'

        cardFigure.appendChild(figureImage)
        cardImage.appendChild(cardFigure)
        card.appendChild(cardImage)
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

        let figure = document.createElement('figure')
        figure.setAttribute('class', 'image is-96x96')
        let figureImage = document.createElement('img')
        if(senator.party === "D") {
        figureImage.src = "/Images/donkey.png"}
        if(senator.party === "R") {
           figureImage.src = "/Images/Republican.png"}
        figureImage.alt="Placeholder thumbnail"
        
        let mediaContent = document.createElement('div')
        mediaContent.setAttribute('class', 'media-content')
        let titleP = document.createElement('p')
        titleP.setAttribute('class', 'title is-4')
        titleP.textContent = `${senator.first_name} ${senator.last_name}`
        let subtitleP = document.createElement('p')
        subtitleP.setAttribute('class', 'subtitle is-6')
        subtitleP.textContent = `${senator.date_of_birth} Age: ${_calculateAge(new Date(senator.date_of_birth))} years old`
        

        let contentDiv = document.createElement('div')
        contentDiv.setAttribute('class', 'content')
        contentDiv.textContent = `Lorem ipsum dolor sit lis mauris.`
        let contentBreak = document.createElement('hr')
        let timeSection = document.createElement('time')
        let newDate = new Date()
        timeSection.dateTime = `${newDate}`
        timeSection.textContent = `${newDate}`


        mediaContent.appendChild(titleP)
        mediaContent.appendChild(subtitleP)
        figure.appendChild(figureImage)
        mediaLeft.appendChild(figure)
        media.appendChild(mediaLeft)
        media.appendChild(mediaContent)
        contentDiv.appendChild(contentBreak)
        contentDiv.appendChild(timeSection)
        cardContent.appendChild(media)
        cardContent.appendChild(contentDiv)
        return cardContent
    }

    function _calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    console.log(_calculateAge(new Date('1940-07-03')))


//reduce example
//     const testArray = [5,10,15,20,25,30,35,40,45,50]

// const testReduce = testArray.reduce((acc, num) => {
//     return acc + num
// }, 0)

// function getOldestSenator(arrayOfSenators) {
//     return arrayOfSenators.reduce((acc, senator) => {
//         return (oldest.age || 0)
//     }, {})
// }
