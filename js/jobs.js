const jobList = document.querySelector('#jobList')
const jobcontainer = document.querySelector('.job-card')
const Sort = document.querySelector('.sort-select')
const search = document.querySelector('.search-bar');
const showUserInfo = document.querySelector("#user");
const onlineUserName = document.querySelector(".username");
const loginBtn1 = document.querySelectorAll(".loginBtn")[0];
const loginBtn2 = document.querySelectorAll(".loginBtn")[1];
const dashLink = document.querySelector('.dash-link');




//set log in buttons when loptop or mobile menu
loginBtn1.addEventListener("click", () => {
    localStorage.removeItem("onlineUser")
});
loginBtn2.addEventListener("click", () => {
    localStorage.removeItem("onlineUser")
});
//  marka hore ka so aqri url dhamaan
const url = new URL(window.location.href);

// markaan la bax  parameter ka aa rabto
const id = url.searchParams.get("jobTitle");




document.addEventListener("DOMContentLoaded", loadJobsdata);

function loadJobsdata() {

    const makeJobsReverse = getPostFromLocalStorage();

    // qeybtaan  reverse() waxa ay qabane in ay ka dhigto array-ka ugu danbeyo kan ugu horeyo
    const jobs = makeJobsReverse.reverse()


    //  function to display to dom
    addJobsToTheDom(jobs)

   

    const onlineUser = JSON.parse(localStorage.getItem("onlineUser")) || null;
    if (!onlineUser) return ;

    //online user  name
    onlineUserName.textContent = ` ${onlineUser.username}`;
     //showing user info 
     showUserInfo.style.display = "block";
    // loginBtn.textContent = "Log out"
    loginBtn1.textContent = "Log out";
    loginBtn2.textContent = "Log out";

    //show dashboard if user is admin
    if(onlineUser.isAdmin){
        dashLink.style.display = "block";
    }


}
// get data from local storage
function getPostFromLocalStorage() {
    const oldJobPostDetail = JSON.parse(localStorage.getItem('jobPosts')) || [];

    return oldJobPostDetail

}

// kun soo  bandhiga jobs  dom-ka

function addJobsToTheDom(jobPosts) {
    jobList.innerHTML = ''; // Clear the job list

    // Check if there are any job posts
    if (jobPosts.length === 0) {
        const noJobsMessage = document.createElement('div');
        noJobsMessage.className = 'no-jobs-message'; // Optional: Add a class for styling
        noJobsMessage.innerHTML = '<p>No jobs found.</p>'; // Message to display
        jobList.appendChild(noJobsMessage); // Append the message to the job list
        return; // Exit the function early
    }

    // Proceed to add job posts
    jobPosts.forEach(jobPost => {
        const postedDate = new Date(jobPost.PostedDate).toDateString();
        const expireDate = new Date(jobPost.dateInput).toDateString();

        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
            <div class='imge-company'>
                <img src="${jobPost.imageUrl}" alt="Job Image">
            </div>
            <div class='job-info'>
                <h3>${jobPost.postTitle}</h3>
                <p>${jobPost.companyInput}</p>
                <p>${jobPost.postLocation}</p>
                <p class="Job-hiring-time">${jobPost.postTime}</p>
            </div>
            <div class='expire-date'>
                <p class='expire-date-p'>Posted Date: ${postedDate}</p>
                <p class='expire-date-p'>Expire Date: ${expireDate}</p>
            </div>
        `;
        jobList.appendChild(jobCard); // Append the job card to the job list
    });
}


//  raaci job id-ga marka click la siiyo job card-ka

jobList.addEventListener("click", handleJobCardClick);

function handleJobCardClick(event) {
    const jobCard = event.target.closest(".job-card");

    if (jobCard) {
        const PostTimeId = getPostTimeId(jobCard);
        if (PostTimeId) {
            console.log(PostTimeId);
        }
    }
}

function getPostTimeId(jobCard) {
    const posttimeId = jobCard.querySelector(".Job-hiring-time");
    const PostTimeId = posttimeId ? posttimeId.textContent.trim() : null;

    if (PostTimeId) {
        // Redirect using the dynamic PostTimeId in the URL
        window.location.href = `/pages/jobdetails.html?jobId=${encodeURIComponent(PostTimeId)}`;
    }

    return PostTimeId;
}


// event listeners kaan waxa oo quseya marka sort by la sameynaa sida newest or oldest

Sort.addEventListener('change', function () {
    search.value = '' 
    const sortValue = this.value;
    let jobPosts = getPostFromLocalStorage()



    if (sortValue === 'newest') {
        const makeJobsReverse = getPostFromLocalStorage();

        // qeybtaan  reverse() waxa ay qabane in ay ka dhigto array-ka ugu danbeyo kan ugu horeyo
        const jobPosts = makeJobsReverse.reverse()

        console.log(sortValue)
        //  function to display to dom
        addJobsToTheDom(jobPosts)


    } else if (sortValue === 'oldest') {



        // qeybtaan  reverse() waxa ay qabane in ay ka dhigto array-ka ugu danbeyo kan ugu horeyo
        const jobPosts = getPostFromLocalStorage();


        //  function to display to dom
        addJobsToTheDom(jobPosts)
    }

})
// event-kaan waxa oo sameyna in wixi la galiyo search-barka oo soo saaro
search.addEventListener('input', function () {
   
    const searchValue = this.value.toLowerCase()  
    let jobPosts = getPostFromLocalStorage()
    jobPosts = jobPosts.filter(job => job.postTitle.toLowerCase().includes(searchValue))
    addJobsToTheDom(jobPosts)
})


if(id){
    window.addEventListener('DOMContentLoaded', function () {
        const searchValue = id.toLowerCase();  
        let jobPosts = getPostFromLocalStorage();
        jobPosts = jobPosts.filter(job => job.postTitle.toLowerCase().includes(searchValue));
        addJobsToTheDom(jobPosts);
    });
}

 