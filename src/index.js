document.addEventListener("DOMContentLoaded", () => {
    let list = document.querySelector("#list")
    const form = document.querySelector(".pokemon-search")
    form.addEventListener("submit", function(e){
        e.preventDefault()
        let name = e.target[0].value
        fetch(`http://localhost:3000/pokemon`)
        .then(resp => resp.json())
        .then(obj => {
            createResult(obj.filter(pokemon => pokemon.name === `${name}`)[0])
        })
        
        .catch(function(){
            alert("That Pokemon Is not currently Supported")
        })
        form.reset()

        })
    function createResult(obj){
        let name = obj.name
        let img = obj.sprite
        let imgtag = document.createElement("img")
        let btn = document.createElement("button")
        btn.textContent = "Add"
        imgtag.src = img
        let location = document.querySelector("#search-results")
        location.innerHTML = ""
        let poke = document.createElement('p')        
        poke.textContent = name
        poke.className = obj.type      
        poke.appendChild(imgtag)
        poke.appendChild(btn)
        btn.addEventListener("click", (e) => createLi(e))
        location.appendChild(poke)
    }

    function createLi(e){
        e.preventDefault()
        let poke = e.target.parentNode
        let pokeCopy = document.createElement('li')
        pokeCopy.innerHTML = poke.innerHTML
        pokeCopy.className = poke.className
        let up = document.createElement("button")
        let down = document.createElement("button")
        up.textContent= "^"
        down.textContent = "⌄"
        pokeCopy.appendChild(up)
        up.addEventListener("click", (e) => moveUp(e))
        pokeCopy.appendChild(down)
        down.addEventListener("click", (e) => moveDown(e))
        let list = document.querySelector("#list")
        pokeCopy.querySelector("button").textContent = "X"
        pokeCopy.querySelector("button").addEventListener("click", function(){
            pokeCopy.remove()
        })
        list.appendChild(pokeCopy)
    }
    function moveUp(e){
        e.preventDefault()
        let group = Array.from(document.querySelectorAll("li"))
        let current = group.indexOf(e.target.parentNode)
        let newArray = moveEle(group, current, current-1)
        newArray.forEach(pokemon => list.appendChild(pokemon))
        
    }
    function moveDown(e){
        e.preventDefault()
        let group = Array.from(document.querySelectorAll("li"))
        let current = group.indexOf(e.target.parentNode)
        let newArray = moveEle(group, current, current+1)
        newArray.forEach(pokemon => list.appendChild(pokemon))
    }

    function moveEle(array, position, newPos){
        while(position < 0){
            position += array.length
        }
        while(newPos < 0){
            newPos += array.length
        }
        if(newPos >= array.length){
            let i = newPos - array.length
            while((i--) +1){
                array.push(undefined)
            }
        }
        array.splice(newPos, 0, array.splice(position, 1)[0])
        return array
    }

    document.querySelector("#type-dropdown").addEventListener("change", function(e){
        filterType(e.target.value)
    })
    function filterType(type){
        let group = Array.from(document.querySelectorAll("li"))
        list.innerHTML =""
        console.log(group)
        let newArray = group.filter((pokemon) => pokemon.className === type)
        newArray.forEach(pokemon => list.appendChild(pokemon))
    }

    })
   
