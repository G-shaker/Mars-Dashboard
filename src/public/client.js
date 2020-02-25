// let store = {
//     user: { name: "Student" },
//     apod: '',
//     rovers: ['Curiosity', 'Opportunity', 'Spirit'],
// }
const store = Immutable.Map({
    user: Immutable.Map({
      name: "Student"
    }),
    apod:'',
    info:'',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
});
let current_state = store

// add our markup to the page
const root = document.getElementById('root')

// const updateStore = (store, newState) => {
//     store = Object.assign(store, newState)
//
//     render(root, store)
// }

const updateStore = (store, newState) => {
  console.log("updating store now with", newState)
  current_state = store.merge(newState)
  console.log("store is: ", current_state)
  render(root, current_state)
}

const render = async (root, state) => {
    console.log("rendering page now")
    root.innerHTML = App(state)
}


// create content
const App = (state) => {
    // let { rovers, apod } = state
    // console.log(state)
    return `
        <header></header>
        <main>
            ${Greeting(state.get('user').get('name'))}
            <section>
                <h3>Put things on the page!</h3>
                <p>Here is an example section.</p>
                <p>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day.
                </p>
                ${ImageOfTheDay(state.get('apod'))}
                ${roverInfo(state.get('info'))}


            </section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
   console.log("loading page now")
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    // const photodate = new Date(apod.image.date)

    // console.log("printing date", photodate.getDate());

    // console.log(photodate.getDate() === today.getDate());
    if (!apod || apod.image.date === today.getDate() ) {
        console.log("no image of the day yet.")
        getImageOfTheDay(current_state)
    }

    console.log("printing apod", apod)

    // check if the photo of the day is actually type video!
    if (apod.image.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${apod.image.url}">here</a></p>
            <p>${apod.image.title}</p>
            <p>${apod.image.explanation}</p>
        `)
    } else {
        return (`
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `)
    }
}

const roverInfo = (info) => {
  if (!info){
      console.log("no rover info yet")
      getRoverInfo(current_state)
  }

  console.log("printing info", info)

  return (`
    <p> Helloooo </p>
    <p> ${info.info2.name} </p>
  `)
}


// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    // let { apod } = state
    console.log("getting image of the day")
    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(state, Immutable.Map({ apod })))

    // return data
}


const getRoverInfo = (state) => {
    console.log("getting rover info from client side")

    fetch(`http://localhost:3000/rover`)
        .then(res => res.json())
        .then(info => updateStore(state, Immutable.Map({ info })))
}

const getPhotos = () => {

}
