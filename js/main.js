const navbar = document.querySelector("nav");
const toggleBtn = document.querySelector(".toggle-button");
const navLinks = document.querySelector(".nav-links");
const jobType = document.querySelector(".jobtype");
const jobDate = document.querySelector(".jobdate")
const jobLocation = document.querySelector(".joblocation")
const hiringCompany = document.querySelector(".Job-hiring-company")
const jobTitle = document.querySelector(".Job-tilte")
const showAllButton = document.querySelector("#showAllbtN")
const showUserInfo1 = document.querySelector("#user");
const userInfo = document.querySelector(".user-info");
const onlineUserName1 = document.querySelector(".username");
const logBtn1 = document.querySelectorAll(".loginBtn")[0];
const logBtn2 = document.querySelectorAll(".loginBtn")[1];
const recentJobsContainer = document.querySelector('.recent-jobs-list-container')
const dashLink1 = document.querySelector('.dash-link');

//hidde and show menu 
toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navbar.classList.toggle("active");
});


//set log in buttons when loptop or mobile menu
logBtn1.addEventListener("click", () => {
    localStorage.removeItem("onlineUser")
});
logBtn2.addEventListener("click", () => {
    localStorage.removeItem("onlineUser")
});

//  load  job post from Local Storage

document.addEventListener('DOMContentLoaded', loadJobPosts);

function loadJobPosts() {
    const posts = getPostFromLocalStorage();
    const lastThreePosts = posts.slice(-4); // soo hel 4-ta post oo u danbeysa
    const LastThreeJobsRevenrce = lastThreePosts.reverse();

    LastThreeJobsRevenrce.forEach(jobPost => {
        addjobPostToDOm(jobPost);

    });
    //show user
    showUserInfo1.style.display = "block";

    const onlineUser = JSON.parse(localStorage.getItem("onlineUser")) || null;
    if (!onlineUser) return;

    onlineUserName1.textContent = ` ${onlineUser.username}`;

    // loginBtn.textContent = "Log out"
    //set log in buttons when loptop or mobile menu
    logBtn1.textContent = "Log out";
    logBtn2.textContent = "Log out";


      //show dashboard if user is admin
    if(onlineUser.isAdmin){
        dashLink1.style.display = "block";
    }


}



// function kaan waxa o ka so aqraa post-ka local storage-ka
function getPostFromLocalStorage() {
    const oldJobPostDetail = JSON.parse(localStorage.getItem('jobPosts')) || [];

    return oldJobPostDetail

}

// function kaan waxa ku soo daabaca latesr four job to dom

function addjobPostToDOm(jobPost) {


    const jobMainContainer = document.querySelector('.recent-jobs-list-container')
    const jobPostDiv = document.createElement('div')
    jobPostDiv.classList.add('recent-jobs-list')

    jobPostDiv.innerHTML = `
        

          
            
                    <div class="job-card-above">
                        <img src="${jobPost.imageUrl}" alt="">
                        <div class="job-card-titles">
                        <p class="Job-tilte">${jobPost.postTitle}
                        </p>  
                        <p class=" Job-hiring-company">${jobPost.companyInput}
                        <p class=" Job-hiring-time">${jobPost.postTime}
                    </div>
                    </div>
                    <div class="job-card-buttom" >
                        <button> <i class="fa-solid fa-suitcase"></i>  ${jobPost.jobCategory} </button>
                        <button> <i class="fa-solid fa-calendar-week"></i> ${jobPost.dateInput} </button>
                        <button> <i class="fa-solid fa-location-arrow"></i> ${jobPost.postLocation} </button>
                    </div>
        
               
    `;
    jobMainContainer.appendChild(jobPostDiv)
}



// // event listener waxa o quseya marka la riixo show all button in oo geeyo page-ka job list
// showAllButton.addEventListener('click', function (){
//     window.location.href = 'auth.html';

// })

// showAllButton.addEventListener('click' , function (){
//     window.location.href = 'jobs.html';
//     

// })
// console.log('lol', showAllButton);
showAllButton && showAllButton.addEventListener('click', function () {window.location.href = '/html/jobs.html';})



showUserInfo1.addEventListener("click", (e) => {
    userInfo.classList.toggle("show");
})

window.onclick = (event) =>{
    

      // Check if the click target is the modal itself

    if(event.target == showUserInfo1){
        userInfo.classList.add("show");
       
        
    }else{
        userInfo.classList.remove("show");
    }
}
// marka click lagu siiyo mida ka mid ah recent jobs-ka waa inu aadaa job details- page 

recentJobsContainer.addEventListener("click", handleJobCardClick);

function handleJobCardClick(event) {
    const jobCard = event.target.closest(".recent-jobs-list");

    if (jobCard) {
        const PostTimeId = getPostTimeId(jobCard);
        if (PostTimeId) {

        }
    }
}

function getPostTimeId(jobCard) {
    const posttimeId = jobCard.querySelector(".Job-hiring-time");
    const PostTimeId = posttimeId ? posttimeId.textContent.trim() : null;

    if (PostTimeId) {
        // Redirect using the dynamic PostTimeId in the URL
        window.location.href = `/html/jobdetails.html?jobId=${encodeURIComponent(PostTimeId)}`;
    }

    return PostTimeId;
}



