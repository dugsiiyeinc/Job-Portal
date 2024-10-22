const navbar = document.querySelector("nav");
const toggleBtn = document.querySelector(".toggle-button");
const navLinks = document.querySelector(".nav-links");
const jobType = document.querySelector(".jobtype");
const jobDate = document.querySelector(".jobdate")
const jobLocation = document.querySelector(".joblocation")
const hiringCompany = document.querySelector(".Job-hiring-company")
const jobTitle = document.querySelector(".Job-tilte")



toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navbar.classList.toggle("active");
})

//  load  job post from Local Storage

document.addEventListener('DOMContentLoaded', loadJobPosts);

function loadJobPosts(){
    const posts = getPostFromLocalStorage()

    posts.forEach(jobPost => {
        addjobPostToDOm(jobPost)
        // console.log(jobPost)

    });


}
// function kaan waxa o ka so aqraa post-ka local storage-ka
function getPostFromLocalStorage(){ 
    const oldJobPostDetail = JSON.parse(localStorage.getItem('jobPosts')) || [];
     
    return oldJobPostDetail
    
}
 
// function kaan waxa ku soo daabaca latesr four job to dom

function addjobPostToDOm (jobPost ){
    console.log(jobPost)
    const jobPostContainer = document.querySelector('.recent-jobs-list-container')
    jobPostContainer.innerHTML = `
         <div class="job-card-above">
                        <img src="${jobPost.imageUrl}" alt="">
                        <div class="job-card-titles">
                        <p class="Job-tilte">${jobPost.postTitle}</p>
                        </p>  
                        <p class=" Job-hiring-company">${jobPost.companyInput}</p>
                    </div>
                    </div>
                    <div class="job-card-buttom" >
                        <button> <i class="fa-solid fa-suitcase"></i> Job </button>
                        <button> <i class="fa-solid fa-calendar-week"></i> ${jobPost.dateInput} </button>
                        <button> <i class="fa-solid fa-location-arrow"></i> ${jobPost.postLocation} </button>
                    </div>
        
                </div>
    `    

}





