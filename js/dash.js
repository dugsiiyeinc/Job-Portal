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
const addPostBtn = document.querySelector("#addPostBtn");
const onlineUserName = document.querySelector(".username");
const loginBtn1 =  document.querySelectorAll(".loginBtn")[0];
const loginBtn2 =  document.querySelectorAll(".loginBtn")[1];




//set log in buttons when loptop or mobile menu
loginBtn1.addEventListener("click", () => {
    localStorage.removeItem("onlineUser")
});
loginBtn2.addEventListener("click", () => {
    localStorage.removeItem("onlineUser")
});
 
//loading data 
const loadJobsdata = () =>{
    const alljobDetails = getPostFromLocalStorage();

    alljobDetails.forEach(job => {
        addJobsToTheDom(job);
        
    });

    showUserInfo.style.display = "block";

    const onlineUser = JSON.parse(localStorage.getItem("onlineUser")) || null;
if (!onlineUser) return (window.location.href = "../html/auth.html");

onlineUserName.textContent = ` ${onlineUser.username}`;

// loginBtn.textContent = "Log out"
loginBtn1.textContent = "Log out";
loginBtn2.textContent = "Log out";
}

//event dom content loaded
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


// when click dashboard tab
dashboardTab.addEventListener('click', function() { 
    changeTabs(dashboardTab,mainDashboard, "Job Portal Dashboard");  
})

// when click add new job tab
addnewJobTab.addEventListener('click', function() { 

        changeTabs(addnewJobTab,jobAddContainer,"Add New Job");
        
});
// when click joblists tab
jobListTab.addEventListener("click", () =>{
  
    changeTabs(jobListTab,jobListCon,"Job lists");

})


//change tabs function 
const changeTabs = (tab,container,tabTitle) =>{
    const tabs = [dashboardTab,addnewJobTab,jobListTab];
    const containers = [mainDashboard,jobAddContainer,jobListCon];

    tabs.forEach(currentTab => {

        if(currentTab === tab){

            containers.forEach(currentCon => {
                if(currentCon == container){
                    container.style.display = "block";
                    headerTitle.textContent = tabTitle

                }else{
                    currentCon.style.display = "none";
                }
                
            })
        }else{
            return;
        }
    });
}



// add new job form event
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

    // delete btn event
    deleteBtn.addEventListener("click", () =>{
        deleteJob(div,job.postTime);
    });
     //edit btn  event

     editBtn.addEventListener("click", () =>{
        changeTabs(addnewJobTab,jobAddContainer,"update job");
        addPostBtn.textContent = "update Job";


     })
    

}

//update job

const handleEdit = (div,job) =>{

    //  postTitle.value = job.postTitle;
    // imageUrl.value = job. imageUrl;
    //  postArea.value =  job.postAreatext;
    //  postLocation.value = job.postLocation;
    // dateInput.value = job. dateInput;
    //  companyInput.value = job.companyInput;
    // jobCategory.value = job.jobCategory;

    // addPostBtn.addEventListener("click", () =>{
    //     const jobPostDetail = {
    //         postTitle: postTitle.value,
    //         imageUrl: imageUrl.value,
    //         postAreatext: postArea.value,
    //         postLocation: postLocation.value,
    //         dateInput: dateInput.value,
    //         companyInput: companyInput.value,
    //         jobCategory: jobCategory.value,
    //         postTime: Date.now()
    //      };
  

    //      updateJOb(job.postTime, jobPostDetail);
    // })
    
     
}




//delete job
const deleteJob = (div,id) =>{
    let oldJobPostDetail = getPostFromLocalStorage();
  
    oldJobPostDetail = oldJobPostDetail.filter(job => job.postTime != id);

    localStorage.setItem("jobPosts", JSON.stringify(oldJobPostDetail));

    div.remove();
    
    Swal.fire({
        title: "Delete!",
        text: "job deleting successfuly!",
        icon: "success",
        ConfirmedButtonText:"ok"
      });

    
}

//  all Events

