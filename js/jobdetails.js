const  jobList  = document.querySelector('#jobList')

//  marka hore ka so aqri url dhamaan 
const url = new URL(window.location.href);

// markaan la bax  parameter ka aa rabto 
const id = url.searchParams.get("jobId");

 console.log(id);   
document.addEventListener("DOMContentLoaded",loadJobsdata);
 
 

function loadJobsdata() {
    const jobPosts = getPostFromLocalStorage()
    
    console.log(jobPosts, id)
      
    getJobToShow(id)
     
    


}
// get data from local storage
function getPostFromLocalStorage(){ 
    const oldJobPostDetail = JSON.parse(localStorage.getItem('jobPosts')) || [];
     
    return oldJobPostDetail
    
}
 
function  getJobToShow(id){
    let jobPosts = getPostFromLocalStorage ()
    console.log(id)
    const findPostToUpdate = jobPosts.find(jobPosts => jobPosts.postTime === Number(id))
    
    addJobsToTheDom(findPostToUpdate)

}


// kun soo  bandhiga jobs  dom-ka

function addJobsToTheDom (jobPosts){

    
        const jobCard = document.createElement('div');
                jobCard.className = 'job-card';
                jobCard.innerHTML = `
                  <div class='imge-company'>  <img src="${jobPosts.imageUrl}" alt="Job Image"> </div>
                  <div class='job-info'>
                    <h3>${jobPosts.postTitle}</h3>
                    <p>${jobPosts.companyInput}</p>
                    <p>${jobPosts.postLocation}</p>
                    
                    </div>
                    <div class='expire-date'>
                         
                         
                        <p class='expire-date-p'>  Expire Date ${jobPosts.dateInput} </p>
                    </div>
                `;
                jobList.appendChild(jobCard);
    
    
}



 
