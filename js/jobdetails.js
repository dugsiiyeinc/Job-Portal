const container = document.querySelector('.container')

//  marka hore ka so aqri url dhamaan 
const url = new URL(window.location.href);

// markaan la bax  parameter ka aa rabto 
const id = url.searchParams.get("jobId");

console.log(id);
document.addEventListener("DOMContentLoaded", loadJobsdata);



function loadJobsdata() {
    const jobPosts = getPostFromLocalStorage()

    console.log(jobPosts, id)

    getJobToShow(id)




}
// get data from local storage
function getPostFromLocalStorage() {
    const oldJobPostDetail = JSON.parse(localStorage.getItem('jobPosts')) || [];

    return oldJobPostDetail

}

function getJobToShow(id) {
    let jobPosts = getPostFromLocalStorage()
    console.log(id)
    const findPostToUpdate = jobPosts.find(jobPosts => jobPosts.postTime === Number(id))

    addJobsToTheDom(findPostToUpdate)

}


// kun soo  bandhiga jobs  dom-ka

function addJobsToTheDom(jobPosts) {
    console.log(jobPosts)
    const formatedJobData = jobPosts.postAreatext.replace(/\n/g, '<br>')
    const jobCard = document.querySelector('.content');

    jobCard.innerHTML = `
                 <h1>${jobPosts.postTitle}</h1>
                  <h3>${jobPosts.companyInput}</h3>
                 <p class="secondary-color">  Expire date :  ${jobPosts.dateInput}  </p>
                 <p > ${formatedJobData} </p>
                 
                `;

    document.title = `${jobPosts.postTitle}`


}





