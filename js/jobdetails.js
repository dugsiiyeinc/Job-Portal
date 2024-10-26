const  jobList  = document.querySelector('#jobList')

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
                    <p>11${jobPosts.companyInput}</p>
                    <p>${jobPosts.postLocation}</p>
                    
                    </div>
                    <div class='expire-date'>
                         
                         
                        <p class='expire-date-p'>  Expire Date ${jobPosts.dateInput} </p>
                    </div>
                `;
                jobList.appendChild(jobCard);
    });
    
}


// Create a new URL object using the current page URL
const url = new URL(window.location.href);

// Get the 'id' parameter from the URL
const id = url.searchParams.get("id");

// Log the result or do something with the id
console.log(id);
