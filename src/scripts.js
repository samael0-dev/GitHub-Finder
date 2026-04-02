let searchValue;
let API = "https://api.github.com/users/";
let userObject;
let searchdata;
let repo;
let repoObject;
let lang;
let langObject;
let highestValueKey;

window.addEventListener("keydown",(event)=>{
    if(event.key==='Enter' && document.getElementById("searchInp").value!=undefined) {
        searchCleaner();
        search();
    }
});


async function search() {
    searchValue = document.getElementById("searchInp").value;
    if(searchValue) { 
        try {
            searchdata = await fetch(API + searchValue);
            userObject = await searchdata.json();
            userImage.src = await userObject.avatar_url;
            document.getElementById("name").textContent = userObject.name;
            document.getElementById("username").textContent = userObject.login;
            document.getElementById("bio").textContent = userObject.bio;
            document.getElementById("join").textContent = (userObject.created_at).slice(0,10);
            userLink.href = `https://github.com/${userObject.login}`;
            document.getElementById("repoCount").textContent = userObject.public_repos;
            document.getElementById("followers").textContent = userObject.followers;
            document.getElementById("following").textContent = userObject.following;
            document.getElementById("star").textContent = userObject.public_gists;
            repo = await fetch(`https://api.github.com/users/${userObject.login}/repos?per_page=100&sort=stars`);
            repoObject = await repo.json();
            repoMaker();
            banner1.classList.remove("invisible");
            banner2.classList.remove("invisible");
            repository.classList.remove("invisible");
            repositorycard.classList.remove("invisible");
            }

        catch(e) {
            banner1.remove();
            banner2.remove();
            repository.remove();
            console.error(e);
            errorPage.classList.remove("invisible");
        }
    }

    else {
        banner1.remove();
        banner2.remove();
        repository.remove();
        validPage.classList.remove("invisible");
    }
}

async function language(element) {
    try {
        const lang = await fetch(element.languages_url);
        const langObject = await lang.json();
        const keys = Object.keys(langObject);
        if (keys.length === 0) {
            return "No language";
        }
        const highestValueKey = keys.reduce((a, b) => {
            langObject[a] > langObject[b] ? a : b;
        });
        
        if(highestValueKey) {
            return highestValueKey;
        }

        else if(highestValueKey==undefined) {
            return "";
        }
    }

    catch(e) {
        banner1.remove();
        banner2.remove();
        repository.remove();
        console.error(e);
        errorPage.classList.remove("invisible");
    }
}

async function repoMaker() {
    try {
        repoObject.forEach(async (element,index) => {
        if(index<=8) {
            if((index)%2==0) {
                await repositorycard.insertAdjacentHTML("afterend",`<div class="h-[150px] max-md:mr-5 col-span-1 rounded-3xl shadow-[-1px_3px_13px_10px_rgba(0,_0,_0,_0.1)] bg-gray-100 ml-4 mb-3"><div class="flex flex-col"><span class="ml-4 mt-3 text-blue-500 text-[20px] font-bold">${await element.name}</span><div class="ml-4">${await element.description}</div><div class="ml-4 mt-2">${await language(element)}</div></div></div>`);

            }

            else if((index)%2!=0) {
                await repositorycard.insertAdjacentHTML("afterend",`<div class="h-[150px] max-md:ml-3 col-span-1 rounded-3xl shadow-[-1px_3px_13px_10px_rgba(0,_0,_0,_0.1)] bg-gray-100 mr-4 mb-3"><div class="flex flex-col"><span class="ml-4 mt-3 text-blue-500 text-[20px] font-bold">${await element.name}</span><div class="ml-4">${await element.description}</div><div class="ml-4 mt-2">${await language(element)}</div></div></div>`);
            }
        }
        });
    }

    catch(e) {
        banner1.remove();
        banner2.remove();
        repository.remove();
        console.error(e);
        errorPage.classList.remove("invisible");
    }
}

function searchCleaner() {
    repository.innerHTML = `<div class="bg-gray-100 grid grid-cols-2 max-md:grid-cols-1 auto-cols-auto mb-4 gap-3 w-[900px] max-md:w-[400px] rounded-3xl shadow-[-1px_3px_13px_10px_rgba(0,_0,_0,_0.1)]">
                <div id="repositorycard" class=" text-gray-400 col-span-2 ml-5 mt-5 mb-4 max-md:col-span-1 font-bold max-md:text-[13px]">REPOSITORIES →</div></div>`;
}