const dashboardTab = document.querySelector('.dashboard-tab a');
const jobAddContainer = document.querySelector('.add-job-container');
const mainDashboard = document.querySelector('.overview');
const headerTitle = document.querySelector('#header-title');
const addnewJobTab = document.querySelector('.jobs-tab');
const postForm = document.querySelector('#form');
const postTitle = document.querySelector('#titleInput');
const imageUrl = document.querySelector('#imageInput');
const postArea = document.querySelector('#PostInput')
const body = document.querySelector('body')
const  postLocation = document.querySelector('#locationInput');
const dateInput = document.querySelector('#dateInput');
const companyInput = document.querySelector('#companyInput');
const jobCategory = document.querySelector('#jobCategory')
const postButton = document.querySelector('#addPostBtn')
const openSidebar = document.querySelector('#openSidebar');
const closeSidebar = document.querySelector('#closeSidebar');
const sidebar = document.querySelector('.sidebar');
const sidebarLinks = document.querySelectorAll(".sidebar-links > *");
const jobListTab = document.querySelector("#job-list");
const jobListCon = document.querySelector("#job-list-con");
const allJobsList = document.querySelector(".all-joblists");


 

//loading data 
const loadJobsdata = () =>{
    const alljobDetails = getPostFromLocalStorage();

    alljobDetails.forEach(job => {
        addJobsToTheDom(job);
        
    });
}
document.addEventListener("DOMContentLoaded",loadJobsdata);


// openSidebar

openSidebar.addEventListener("click", () =>{
    sidebar.classList.add("active");
})
// closeidebar

closeSidebar.addEventListener("click", () =>{
    sidebar.classList.remove("active");
})

//active side bar links when click

sidebarLinks.forEach(link => {
    link.addEventListener("click", () =>{
        sidebarLinks.forEach(link => link.classList.remove("active"));
        link.classList.add("active");
    })
})

postArea.addEventListener('input', function (){
    this.style.height = 'auto'; // Reset height
    this.style.height = this.scrollHeight + 'px'; // Set new height based on scroll height
})
// labadan function waxa ay quseyaan in loo kale wareego Main dashboard tab iyo Add job tab
dashboardTab.addEventListener('click', function() { 
    console.log('dashboard tab clicked')
           // show the dashboard tab content and hide the job tab content
    mainDashboard.style.display = 'block';
    jobAddContainer.style.display = 'none';  
    jobListCon.style.display = "none";
    headerTitle.textContent = "Job Portal Dashboard";
    // changeTabs(dashboardTab,mainDashboard);  
})

addnewJobTab.addEventListener('click', function() { 
        console.log('job tab clicked')
        // show the jobs tab content and hide the dashboard tab content
         
        mainDashboard.style.display = 'none'
        jobAddContainer.style.display = 'block'
        jobListCon.style.display = "none";
        headerTitle.textContent = "Add New Job";
        // changeTabs(addnewJobTab,jobAddContainer);
        
});

//joblist tab in  side
jobListTab.addEventListener("click", () =>{
    mainDashboard.style.display = 'none'
        jobAddContainer.style.display = 'none';
        jobListCon.style.display = "block";
        headerTitle.textContent = "Job lists";

})

// const changeTabs = (tab,container) =>{
//     const tabs = [dashboardTab,addnewJobTab,jobListTab];
//     const containers = [mainDashboard,jobAddContainer,jobListCon];
//     // container.classList.add("hidde");
//     // console.log(container);
    
//     tabs.forEach(currentTab => {
//         if(currentTab === tab){
//             containers.forEach(currentCon => {
//                 if(currentCon === container){
                   
                    
//                 }
//                 // container.style.display = 'block';
                
//             })
//         }else{
//             return;
//         }
//     });
// }

postForm.addEventListener('submit', addPost)

// all functions 


function addPost (e) {
    e.preventDefault()
  
    // console.log('addPost', postTitle)
    // console.log('imageUrl', imageUrl)
    // console.log('postArea', postArea)
    // console.log('postLocation', postLocation)
    // console.log('dateInput', dateInput)
    // console.log('companyInput', companyInput)
    // console.log('jobCategory', jobCategory)
    // console.log('postButton', postButton)


    if(!postTitle.value.trim() || !imageUrl.value.trim() || !postArea.value.trim() ){


         
        alert("waxbaa ka tagtay fadlan iska hubi")
    }else{
         const jobPostDetail = {
            postTitle: postTitle.value,
            imageUrl: imageUrl.value,
            postAreatext: postArea.value,
            postLocation: postLocation.value,
            dateInput: dateInput.value,
            companyInput: companyInput.value,
            jobCategory: jobCategory.value,
            postTime: Date.now()
         }

         console.log(jobPostDetail)
        //  method-kaan waxa ay ku dara dom-ka  object-ga PostDetail

        addJobsToTheDom(jobPostDetail);
        SavePostDetailToLocalStorage(jobPostDetail)

    //    window.location.reload()
    }
    
}

function SavePostDetailToLocalStorage(jobPostDetail){
    const oldJobPostDetail = getPostFromLocalStorage()
    oldJobPostDetail.push(jobPostDetail)

    localStorage.setItem('jobPosts', JSON.stringify(oldJobPostDetail));  
    Swal.fire({
        title: "success!",
        text: "saving data to the local storage",
        icon: "success",
        ConfirmedButtonText:"ok"
      });
   
}

function getPostFromLocalStorage(){ 
    const oldJobPostDetail = JSON.parse(localStorage.getItem('jobPosts')) || [];
     
    return oldJobPostDetail
    
}


//add jobs to the Dom

const addJobsToTheDom = (job) =>{
    const div = document.createElement("div");
    div.className = "job";

    
    div.innerHTML += `
                <img src="${job.imageUrl}" alt="campany img">
                <span class="campany-logo">${job.companyInput}</span>
                <span class="job-name">${job.postTitle}</span>
                <span class="job-location">${job.postLocation}</span>
                <span class="job-category">${job.jobCategory}</span>
                <div class="buttons">
                  <button class="edit-btn">edit</button>
                  <button class="delete-btn">Delete</button>
                </div> 
           `;
    allJobsList.appendChild(div);

    attachHandler(div,job);
           
}

//attach handler
const attachHandler = (div,job) =>{
    const editBtn = div.querySelector(".edit-btn");
    const deleteBtn = div.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () =>{
        deleteJob(div,job.postTime);
    })
    

}

const deleteJob = (div,id) =>{
    
}

//  all Events

