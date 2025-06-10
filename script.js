const filterForm = document.getElementById("filter-form");
const topPro = document.getElementById("top-pro");
const newPro = document.getElementById("new-pro");
const supervisor = document.getElementById("supervisor");
const pros = document.getElementById("pros");

const allDatas = "https://raw.githubusercontent.com/lalahashim/alldatas/refs/heads/main/allProsData.json";
fetch(allDatas)
.then(response => response.json())
.then(data =>{
    const taskers = data.data.taskers;
    renderCards(taskers);

    const ratingChoice = document.getElementById("rating");
    ratingChoice.addEventListener("change", () => {
        const sorted = [...taskers].sort((a, b) => {
            return ratingChoice.value === "ascending"
            ? a.averageRating - b.averageRating
            : b.averageRating - a.averageRating;
        });
        renderCards(sorted);
    });

    const tasksCount = document.getElementById("tasks-count");
    tasksCount.addEventListener("change", () => {
        const sorted = [...taskers].sort((a, b) => {
            return tasksCount.value === "ascending"
            ? a.completedTasks - b.completedTasks
            : b.completedTasks - a.completedTasks;
        });
        renderCards(sorted);
    });

    filterForm.addEventListener("change", () => {
    const filtered = taskers.filter(tasker => {
        const isTopPro = tasker.eliteTasker;
        const isNew = isNewPro(tasker.startDate);
        const isSupervisor = tasker.supervisor;

        const matchTopPro = topPro.checked ? isTopPro : false;
        const matchNewPro = newPro.checked ? isNew : false;
        const matchSupervisor = supervisor.checked ? isSupervisor : false;

        if (!topPro.checked && !newPro.checked && !supervisor.checked) {
            return true;
        }

        return matchTopPro || matchNewPro || matchSupervisor;
    })
    renderCards(filtered);
    })
})

function renderCards(array){
    const allTaskersDiv = document.getElementById("taskers")
    allTaskersDiv.innerHTML = "";
    array.forEach(tasker => {
        const card = document.createElement("div");
        card.className = "card";

        let title = "";
        if (tasker.supervisor || tasker.eliteTasker){
            if (tasker.supervisor && tasker.eliteTasker){
                title = "Top Pro & Supervisor";
            } else if (tasker.supervisor){
                title = "Supervisor";
            } else {
                title = "Top pro";
            }
        } else {
            title = "Pro"
        }

        let newPro = ""
        if (isNewPro(tasker.startDate)){
            newPro = `
                <div class="new-pro">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#A555EC" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                    </svg>
                    <p>New Pro</p>
                </div>
            `
        } else {
            newPro = ''
        }

        card.innerHTML = `
            <div class="head">
                <img id="profile-picture" src="${tasker.user.profile_picture.publicUrl}" alt="" class="avatar">
                <div class="main-info">
                    <div class="name">
                        <h4 id="full-name">${tasker.user.name} ${tasker.user.surname}</h4>
                        <p>(elektrik)</p>
                    </div>
                    <div class="rating">
                        <img src="public/rating.png" alt="">
                        <p id="average-rate" class="rate">${tasker.averageRating}</p>
                        <p class="orders">(24)</p>
                    </div>
                </div>
            </div>

            <div class="details">
                <div class="tasks">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#A555EC" class="bi bi-patch-check" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0"/>                            <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z"/>
                    </svg>
                    <p id="tasks">${tasker.completedTasks}</p>
                </div>
                <div class="top-pro">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#A555EC" class="bi bi-hash" viewBox="0 0 16 16">
                        <path d="M8.39 12.648a1 1 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1 1 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.51.51 0 0 0-.523-.516.54.54 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532s.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531s.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z"/>   
                    </svg>
                    <p>${title}</p>
                </div>
                ${newPro}
            </div>

            <div class="description">
                <p id="bio">${tasker.bio}</p>
            </div>

            <div class="other">
                <a href="">view profile</a>
                <div>
                    <p>35$</p>
                    <button>Book now</button>
                </div>
            </div>
        `
        allTaskersDiv.appendChild(card);
    });
}

function isNewPro(startDateStr){
    const currentDate = new Date();
    const startDate = new Date(startDateStr);

    const yearDiff = currentDate.getFullYear() - startDate.getFullYear();
    const monthDiff = currentDate.getMonth() - startDate.getMonth();

    const totalMonthDiff = yearDiff * 12 + monthDiff;

    if (currentDate < startDate) return false;

    return totalMonthDiff < 2;
}
