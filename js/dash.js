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
const postLocation = document.querySelector('#locationInput');
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
const showUserInfo = document.querySelector("#user");
const loginBtn1 = document.querySelectorAll(".loginBtn")[0];
const loginBtn2 = document.querySelectorAll(".loginBtn")[1];
const updateJobContainer = document.querySelector(".update-job-container")
const totalJobs = document.querySelector('#totalJobs')
const activeJobs = document.querySelector('#activejobs')
const nonActiveJobs = document.querySelector('#interviewsScheduled');
const dashLink = document.querySelector('.dash-link');




//set log in buttons when loptop or mobile menu
logBtn1.addEventListener("click", () => {
    localStorage.removeItem("onlineUser")
});
logBtn2.addEventListener("click", () => {
    localStorage.removeItem("onlineUser")
});

//loading data 
const loadJobsdata = () => {
    const alljobDetails = getPostFromLocalStorage();
    // qeybtaan waxa ay soo bandhigee Totaal-ka shaqooyinka
    const AlltotalJobs = alljobDetails.length
    // totalJobs.textContent = AlltotalJobs
    //  qeybtaaan waxa ay so bandhigee inta shaqo aan la gaarin waqtiga dhicitaankooda
    const AllactiveJobs = alljobDetails.filter(job => new Date(job.dateInput) >= Date.now());
    // activeJobs.textContent = AllactiveJobs.length

    const AllnonActiveJobs = alljobDetails.filter(job => new Date(job.dateInput) <= Date.now());
    // nonActiveJobs.textContent = AllnonActiveJobs.length

    const initialData = {
        totalJobs: AlltotalJobs,
        activeApplications: AllactiveJobs.length,
        interviewsScheduled: AllnonActiveJobs.length,
        applicationStatus: {
            applied: 100,
            inReview: 50,
            interviewed: 30,
            offered: 15,
            rejected: 20
        },
        jobCategories: {
            technology: AllTechnologyJobs.length,
            marketing: AllMarketingJobs.length,
            sales: AllSalesJobs.length,
            finance: AllFinanceJobs.length,
            hr: 15
        },
       
    };
    localStorage.setItem('jobPortalData', JSON.stringify(initialData));

            // Load data from local storage
const data = JSON.parse(localStorage.getItem('jobPortalData'));
console.log(data);

// Update stats
totalJobs.textContent = AlltotalJobs;
activeJobs.textContent = AllactiveJobs.length
nonActiveJobs.textContent = AllnonActiveJobs.length



    alljobDetails.forEach(job => {
        addJobsToTheDom(job);

    });
    // recent jobs-ka lagu so bandhigaa Main dashboard-ka ayuu quseeya marka hore 4-ta shaqo  u danbesay ayuu so qaba
    // kadib ne  array la so helay aya reverse lagu sameyna si ka ugu danbeeyo oo u noqdo ka ugu horeya
    const lastfourjobs = alljobDetails.slice(-4)
    const lastfourjobsReverce = lastfourjobs.reverse()
    lastfourjobsReverce.forEach(job => {
        addjobPostToDOmRecent(job)
    })

    

    const onlineUser = JSON.parse(localStorage.getItem("onlineUser")) || null;
    if (!onlineUser) return (window.location.href = "../html/auth.html");

    //online username
    onlineUserName.textContent = ` ${onlineUser.username}`;
    //show user info
    showUserInfo.style.display = "block";

    // loginBtn.textContent = "Log out"
    loginBtn1.textContent = "Log out";
    loginBtn2.textContent = "Log out";

     //show dashboard if user is admin
     if(onlineUser.isAdmin){
        dashLink.style.display = "block";
    }
}

//event dom content loaded
document.addEventListener("DOMContentLoaded", loadJobsdata);




// openSidebar

// openSidebar.addEventListener("click", () => {
//     sidebar.classList.add("active");
// });
// check window onclick
window.onclick = (event) =>{
    // Check if the click target is openside

  if(event.target == openSidebar){
    sidebar.classList.add("active");
     
      
  }else{
    sidebar.classList.remove("active");
  }
}
// closeidebar

closeSidebar.addEventListener("click", () => {
    sidebar.classList.remove("active");
})

//active side bar links when click

sidebarLinks.forEach(link => {
    link.addEventListener("click", () => {
        sidebarLinks.forEach(link => link.classList.remove("active"));
        link.classList.add("active");
    })
})

postArea.addEventListener('input', function () {
    this.style.height = 'auto'; // Reset height
    this.style.height = this.scrollHeight + 'px'; // Set new height based on scroll height
})


// when click dashboard tab
dashboardTab.addEventListener('click', function () {
    changeTabs(dashboardTab, mainDashboard, "Job Portal Dashboard");
})

// when click add new job tab
addnewJobTab.addEventListener('click', function () {

    changeTabs(addnewJobTab, jobAddContainer, "Add New Job");

});
// when click joblists tab
jobListTab.addEventListener("click", () => {

    changeTabs(jobListTab, jobListCon, "Job lists");
     

})


//change tabs function 
const changeTabs = (tab, container, tabTitle) => {
    const tabs = [dashboardTab, addnewJobTab, jobListTab];
    const containers = [mainDashboard, jobAddContainer, jobListCon, updateJobContainer];

    tabs.forEach(currentTab => {

        if (currentTab === tab) {

            containers.forEach(currentCon => {
                if (currentCon == container) {
                    container.style.display = "block";
                    headerTitle.textContent = tabTitle

                } else {
                    currentCon.style.display = "none";
                }

            })
        } else {
            return;
        }
    });
}



// add new job form event
postForm.addEventListener('submit', addPost)

// all functions 


function addPost(e) {
    e.preventDefault()




    if (!postTitle.value.trim() || !imageUrl.value.trim() || !postArea.value.trim() || !postLocation.value.trim() || !dateInput.value.trim() || !companyInput.value.trim() || !jobCategory.value.trim()) {
        alert("waxbaa ka tagtay fadlan iska hubi");
    } else if (new Date(dateInput.value) < new Date()) {
        alert("The date must be from today onwards");
        return;
    } else {
        const jobPostDetail = {
            postTitle: postTitle.value,
            imageUrl: imageUrl.value,
            postAreatext: postArea.value,
            postLocation: postLocation.value,
            dateInput: dateInput.value,
            companyInput: companyInput.value,
            jobCategory: jobCategory.value,
            postTime: Date.now(),
            PostedDate: Date.now()

            //  method-kaan waxa ay ku dara dom-ka  object-ga PostDetail
        }
        addJobsToTheDom(jobPostDetail);
        SavePostDetailToLocalStorage(jobPostDetail)

        
    }

}

function SavePostDetailToLocalStorage(jobPostDetail) {
    const oldJobPostDetail = getPostFromLocalStorage()
    oldJobPostDetail.push(jobPostDetail)

    localStorage.setItem('jobPosts', JSON.stringify(oldJobPostDetail));
    Swal.fire({
        title: "success!",
        text: "saving data to the local storage",
        icon: "success",
        ConfirmedButtonText: "ok"
    }).then((result) => {
        if (result.isConfirmed) {
            
            reloadPage();

                  
           
                       
        }
      });

}

function getPostFromLocalStorage() {
    const oldJobPostDetail = JSON.parse(localStorage.getItem('jobPosts')) || [];

    return oldJobPostDetail

}


//add jobs to the Dom

const addJobsToTheDom = (job) => {
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

    attachHandler(div, job);

}

//attach handler
const attachHandler = (div, job) => {
    const editBtn = div.querySelector(".edit-btn");
    const deleteBtn = div.querySelector(".delete-btn");

    // delete btn event
    deleteBtn.addEventListener("click", () => {
        deleteJob(div, job.postTime);
    });
    //edit btn  event

    editBtn.addEventListener("click", () => {
        jobListCon.style.display = "none";
        updateJobContainer.style.display = 'block';
        headerTitle.textContent = 'Update Jobs'
        handleEdit(job, job.postTime)



    })


}

//update job

function handleEdit(job, jobPostTime) {



    // soo hel input elements marka ay ku jiraan div-ka  updateJobContainer

    const postTitle = document.querySelector('.update-job-container #titleInput');
    const imageUrl = document.querySelector('.update-job-container #imageInput');
    const postArea = document.querySelector('.update-job-container #PostInput');
    const postLocation = document.querySelector('.update-job-container #locationInput');
    const dateInput = document.querySelector('.update-job-container #dateInput');
    const companyInput = document.querySelector('.update-job-container #companyInput');
    const jobCategory = document.querySelector('.update-job-container #jobCategory');
    const updatepost = document.querySelector('.update-job-container #updatePostBtn');


    postArea.addEventListener('input', function () {
        this.style.height = 'auto'; // Reset height
        this.style.height = this.scrollHeight + 'px'; // Set new height based on scroll height
    })

    // markaane soo bandhiga shaqada la edit garena

    postTitle.value = job.postTitle
    imageUrl.value = job.imageUrl
    postArea.value = job.postAreatext
    postLocation.value = job.postLocation
    dateInput.value = job.dateInput
    companyInput.value = job.companyInput
    jobCategory.value = job.jobCategory
    updatepost.textContent = 'Update Job'





    updatepost.addEventListener("click", () => {
        const jobPostDetail = {
            postTitle: postTitle.value,
            imageUrl: imageUrl.value,
            postAreatext: postArea.value,
            postLocation: postLocation.value,
            dateInput: dateInput.value,
            companyInput: companyInput.value,
            jobCategory: jobCategory.value,
            postTime: Date.now()
        };

        // if (new Date(dateInput.value) < new Date()) {
        //     alert(" the must be from to day")
        //     return;
        // }

        updateJob(jobPostDetail, jobPostTime);


    })


}




//delete job
const deleteJob = (div, id) => {
    let oldJobPostDetail = getPostFromLocalStorage();
    oldJobPostDetail
    oldJobPostDetail = oldJobPostDetail.filter(job => job.postTime != id);

    localStorage.setItem("jobPosts", JSON.stringify(oldJobPostDetail));

    div.remove();

    Swal.fire({
        title: "Delete!",
        text: "job deleting successfuly!",
        icon: "success",
        ConfirmedButtonText: "ok"
    });


}


// update job post
function updateJob(jobPostDetail, jobPostTime) {


    let jobPosts = getPostFromLocalStorage()

    const findPjostToUpdate = jobPosts.find(jobPosts => jobPosts.postTime === jobPostTime)

    if (findPjostToUpdate) {
        findPjostToUpdate.postTitle = jobPostDetail.postTitle;
        findPjostToUpdate.imageUrl = jobPostDetail.imageUrl;
        findPjostToUpdate.postAreatext = jobPostDetail.postAreatext;
        findPjostToUpdate.dateInput = jobPostDetail.dateInput;
        findPjostToUpdate.companyInput = jobPostDetail.companyInput;
        findPjostToUpdate.jobCategory = jobPostDetail.jobCategory;
        findPjostToUpdate.postLocation = jobPostDetail.postLocation;




        localStorage.setItem('jobPosts', JSON.stringify(jobPosts));
     

        Swal.fire({
            title: "Updated!",
            text: "job updated successfuly!",
            icon: "success",
            ConfirmedButtonText: "ok"
        }).then((result) => {
            if (result.isConfirmed) {
                
                reloadPage();

                      
               
                           
            }
          });
          
        
    }
    
    
 
    



}
//  function waxa oo sameynaa . marka window ka la reload lagu sameyo ayuu waxa so kicina Job List Container

// Set a flag in session storage before reloading
function reloadPage() {
    sessionStorage.setItem('reloaded', 'true');
    window.location.reload();
}

window.addEventListener('load', () => {
    if (sessionStorage.getItem('reloaded')) {
        jobListTab.click()
        changeTabs(jobListTab, jobListCon, "Job lists");
        
        console.log('Page reloaded programmatically');
        sessionStorage.removeItem('reloaded');  
    } else {
        console.log('Page reloaded manually');
    }
});

//  qeybtaan waxa lagu soo bandhigaa Recent Jobs

function addjobPostToDOmRecent(jobPost) {
    const recentJobsList = document.getElementById('recentJobs');



    const jobs = jobPost

    const li = document.createElement('li');
    li.textContent = `${jobs.postTitle} at ${jobs.companyInput} - ${jobs.postLocation}`;
    recentJobsList.appendChild(li);



}
//  all Events

