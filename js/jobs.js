const  jobList  = document.querySelector('#jobList')

document.addEventListener("DOMContentLoaded",loadJobsdata);

function loadJobsdata() {
    const jobs = getPostFromLocalStorage();

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
                    <h3>${jobPosts.postTitle}</h3>
                    <p>${jobPosts.companyInput}</p>
                    <p>${jobPosts.postLocation}</p>
                `;
                jobList.appendChild(jobCard);
    });
    
}