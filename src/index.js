document.addEventListener("DOMContentLoaded", () => {
    
    const form = document.querySelector(".pokemon-search")
    form.addEventListener("submit", function(e){
        e.preventDefault()
        
        fetch(`https://pokeapi.co/api/v2/pokemon/${e.target[0].value}`)
        .then(resp => resp.json())
        .then(obj => createResult(obj))
        
        .catch(function(){
            alert("That Pokemon Does not Exist")
        })
        form.reset()

        })
    function createResult(obj){
        console.log(obj)
        
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
        poke.className = "poke"      
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
        let list = document.querySelector("#list")
        pokeCopy.querySelector("button").textContent = "X"
        pokeCopy.querySelector("button").addEventListener("click", function(){
            pokeCopy.remove()
        })
        list.appendChild(pokeCopy)
    }
    function moveUp(e){
        let list = document.querySelector("#list")
        let group = Array.from(document.querySelectorAll("li"))
        let current = group.indexOf(e.target.parentNode)
        let newArray = moveEle(group, current, current-1)
        newArray.forEach(pokemon => list.appendChild(pokemon))
        
    }
    function moveDown(e){
        let list = document.querySelector("#list")
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
    })

