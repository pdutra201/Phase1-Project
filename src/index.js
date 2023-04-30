document.addEventListener("DOMContentLoaded", () => {
    //const submitbtn = document.querySelector(".submit")
    const form = document.querySelector(".pokemon-search")
    form.addEventListener("submit", function(e){
        e.preventDefault()
        //console.log(e.target[0].value)
        fetch(`https://pokeapi.co/api/v2/pokemon/${e.target[0].value}`)
        .then(resp => resp.json())
        .then(obj => createResult(obj))
        
        // .catch(function(){
        //     alert("That Pokemon Does not Exist")
        // })
        form.reset()

        })
    function createResult(obj){
        //console.log(obj)
        let name = obj.species.name
        let img = obj.sprites.front_default
        let imgtag = document.createElement("img")
        let btn = document.createElement("button")
        btn.textContent = "Add"
        imgtag.src = img
        let location = document.querySelector("#search-results")
        location.innerHTML = ""
        let poke = document.createElement('p')        
        poke.textContent = name       
        poke.appendChild(imgtag)
        poke.appendChild(btn)
        btn.addEventListener("click", (e) => createLi(e))
        location.appendChild(poke)
    }

    function createLi(e){
        let poke = e.target.parentNode
        let pokeCopy = document.createElement('li')
        pokeCopy.innerHTML = poke.innerHTML
        let up = document.createElement("button")
        let down = document.createElement("button")
        up.textContent= "^"
        down.textContent = "⌄"
        pokeCopy.appendChild(up)
        up.addEventListener("click", (e) => moveUp(e))
        pokeCopy.appendChild(down)
        down.addEventListener("click", (e) => moveDown(e))
        let list = document.querySelector("#pokemon-list")
        pokeCopy.querySelector("button").textContent = "X"
        pokeCopy.querySelector("button").addEventListener("click", function(){
            pokeCopy.remove()
        })
        list.appendChild(pokeCopy)
    }
    function moveUp(e){        
        console.log(e.target.parentNode)
        let group = document.querySelectorAll("li")
        group.forEach(pokemon =>console.log(pokemon))
        console.log(group)
    }
    function moveDown(e){
        let group = document.querySelectorAll("li")
        console.log(group)
    }
    })

