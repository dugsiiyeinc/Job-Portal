const  jobList  = document.querySelector('#jobList')
const jobcontainer = document.querySelector('.job-card')

document.addEventListener("DOMContentLoaded",loadJobsdata);

function loadJobsdata() {
  
    const makeJobsReverse = getPostFromLocalStorage();
     
    // qeybtaan  reverse() waxa ay qabane in ay ka dhigto array-ka ugu danbeyo kan ugu horeyo
    const jobs = makeJobsReverse.reverse()
    
     console.log(jobs)
    //  function to display to dom
    addJobsToTheDom(jobs)


}
// get data from local storage
function getPostFromLocalStorage(){ 
    const oldJobPostDetail = JSON.parse(localStorage.getItem('jobPosts')) || [];
     
    return oldJobPostDetail
    
}
 
// kun soo  bandhiga jobs  dom-ka

function addJobsToTheDom (jobPosts){

    jobPosts.forEach(jobPosts => {
        const jobCard = document.createElement('div');
                jobCard.className = 'job-card';
                jobCard.innerHTML = `
                  <div class='imge-company'>  <img src="${jobPosts.imageUrl}" alt="Job Image"> </div>
                  <div class='job-info'>
                    <h3>${jobPosts.postTitle}</h3>
                    <p>${jobPosts.companyInput}</p>
                    <p>${jobPosts.postLocation}</p>
                    <p class="Job-hiring-time">${jobPosts.postTime}
                    </div>
                    <div class='expire-date'>
                         
                        <p class='expire-date-p'>  Expire Date ${jobPosts.dateInput} </p>
                    </div>
                `;
                jobList.appendChild(jobCard);
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
        window.location.href = `/html/jobdetails.html?jobId=${encodeURIComponent(PostTimeId)}`;
    }

    return PostTimeId;
}
