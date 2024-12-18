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
const applicationsTab = document.querySelector("#applications");
const applicationsCon = document.querySelector("#applications-con");
const addPostBtn = document.querySelector("#addPostBtn");
const onlineUserName = document.querySelector(".username");
const showUserInfo = document.querySelector("#user");
const loginBtn1 = document.querySelectorAll(".loginBtn")[0];
const loginBtn2 = document.querySelectorAll(".loginBtn")[1];
const updateJobContainer = document.querySelector(".update-job-container")
const totalJobs = document.querySelector('#totalJobs')
const totalUsers = document.querySelector('#totalUsers')
const totalApplications = document.querySelector('#totalApplications');
const dashLink = document.querySelector('.dash-link');
const searchInput = document.querySelector('.search-input');
const addJobBtn = document.querySelector('#addJobBtn');
const usersTab = document.querySelector('#usersTab');
const usersCon = document.querySelector('#users');
const appliedJobsList = document.querySelector('.JobappliedList')




//set log in buttons when loptop or mobile menu
loginBtn1.addEventListener("click", () => {
    localStorage.removeItem("onlineUser")
});
loginBtn2.addEventListener("click", () => {
    localStorage.removeItem("onlineUser")
});

 

//loading data 
const loadJobsdata = () => {
   
    const alljobDetails = getPostFromLocalStorage();

    alljobDetails.forEach(job => {
        addJobsToTheDom(job);

    });

    //DisplayingChartsData
    DisplayingChartsData();
    
    // recent jobs-ka lagu so bandhigaa Main dashboard-ka ayuu quseeya marka hore 4-ta shaqo  u danbesay ayuu so qaba
    // kadib ne  array la so helay aya reverse lagu sameyna si ka ugu danbeeyo oo u noqdo ka ugu horeya
    const lastfourjobs = alljobDetails.slice(-4)
    const lastfourjobsReverce = lastfourjobs.reverse()
    lastfourjobsReverce.forEach(job => {
        addjobPostToDOmRecent(job)
    })

    //calling displayApplications
    displayApplications()


    const onlineUser = JSON.parse(localStorage.getItem("onlineUser")) || null;
    if (!onlineUser) return;


    //online user  name
    onlineUserName.textContent = ` ${onlineUser.username}`;

    //showing user info 
    showUserInfo.style.display = "block";

    // loginBtn.textContent = "Log out"
    loginBtn1.textContent = "Log out";
    loginBtn2.textContent = "Log out";

    //show dashboard if user is admin
    if (onlineUser.isAdmin) {
        dashLink.style.display = "block";
    }
}

//event dom content loaded
document.addEventListener("DOMContentLoaded", loadJobsdata);



//displaying charts data
const DisplayingChartsData = () =>{
    const alljobDetails = getPostFromLocalStorage();
    const AllUsers = JSON.parse(localStorage.getItem('users')) || [];

    // qeybtaan waxa ay soo bandhigee Totaal-ka shaqooyinka
    const AlltotalJobs = alljobDetails.length
    // totalJobs.textContent = AlltotalJobs
    //  qeybtaaan waxa ay so bandhigee totalka
    const AllTotalUsers = AllUsers.length;
    // activeJobs.textContent = AllactiveJobs.length

    // const AllnonActiveJobs = alljobDetails.filter(job => new Date(job.dateInput) <= Date.now());

    // nonActiveJobs.textContent = AllnonActiveJobs.length
    //AllTechnologyJobs
    const AllTechnologyJobs = alljobDetails.filter(job => job.jobCategory === "technology");
    //AllMarketingJobs
    const AllMarketingJobs = alljobDetails.filter(job => job.jobCategory === "marketing");
    //AllSalesJobs
    const AllSalesJobs = alljobDetails.filter(job => job.jobCategory === "sales");
    //AllFinanceJobs
    const AllFinanceJobs = alljobDetails.filter(job => job.jobCategory === "finance");
    //allaplications
    const allApplications = JSON.parse(localStorage.getItem("applications")) || [];
    const maleApplicants = allApplications.filter(applicant => applicant.appliedUserGender === "male");
    const feMaleApplicants = allApplications.filter(applicant => applicant.appliedUserGender === "female");
    console.log(maleApplicants.length)
    console.log(feMaleApplicants.length)
    console.log(allApplications.length);


    const initialData = {
        totalJobs: AlltotalJobs,
        totalUsers: AllTotalUsers,
        totalApplications: allApplications.length,
        jobCategories: {
            technology: AllTechnologyJobs.length,
            marketing: AllMarketingJobs.length,
            sales: AllSalesJobs.length,
            finance: AllFinanceJobs.length,
        },
        applicationStatus: {
            male:maleApplicants.length,
            female:feMaleApplicants.length
        },


    };
    localStorage.setItem('jobPortalData', JSON.stringify(initialData));

    // Load data from local storage
    const data = JSON.parse(localStorage.getItem('jobPortalData'));
    console.log(data);

    // Update stats
    totalJobs.textContent = initialData.totalJobs;
    totalUsers.textContent = initialData.totalUsers;
    totalApplications.textContent = initialData.totalApplications;
    console.log(totalUsers)
    console.log(totalApplications)
}
// openSidebar

// openSidebar.addEventListener("click", () => {
//     sidebar.classList.add("active");
// });
// check window onclick
window.onclick = (event) => {
    // Check if the click target is openside

    if (event.target == openSidebar) {
        sidebar.classList.add("active");


    } else {
        sidebar.classList.remove("active");
    }

    // user info
    if(event.target == showUserInfo){
        userInfo.classList.toggle("show");
        console.log(document.title)
       
        
    }else{
        userInfo.classList.remove("show");
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


});
// when click joblists tab
applicationsTab.addEventListener("click", () => {

    changeTabs(applicationsTab, applicationsCon, "Applications");


})

//when user click go add new job
addJobBtn.addEventListener("click", () => {
    changeTabs(addnewJobTab, jobAddContainer, "Add New Job");
})

//when click usersTab
usersTab.addEventListener("click", () => {
    changeTabs(usersTab, usersCon, "users List");
})

//change tabs function 
const changeTabs = (tab, container, tabTitle) => {
    const tabs = [dashboardTab, addnewJobTab, jobListTab, applicationsTab, usersTab];
    const containers = [mainDashboard, jobAddContainer, jobListCon, updateJobContainer, applicationsCon, usersCon];

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


async function addPost(e) {
    e.preventDefault()




    if (!postTitle.value.trim() || !imageUrl.value.trim() || !postArea.value.trim() || !postLocation.value.trim() || !dateInput.value.trim() || !companyInput.value.trim() || !jobCategory.value.trim()) {
        Swal.fire({
            title: "Error!",
            text: `please fill all Inputs`,
            icon: "error",
            confirmButtonText: "ok"
        });
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

        // job url 
        const joburl = `https://jobportal13.netlify.app//pages/jobdetails.html?jobId=${jobPostDetail.postTime}`;

        addJobsToTheDom(jobPostDetail);
        SavePostDetailToLocalStorage(jobPostDetail)

        //  qeybtaan waxa ay ku post garee shaqada facebook anagoo isticmaaleyno  api
        const url = `https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTZjMDYzNjA0MzQ1MjZkNTUzNDUxMzIi_pc`;
       

        console.log(url);

        const options = {
            method: 'POST',

            body: JSON.stringify({
                JobTitle: postTitle.value,
                HiringCompany: companyInput.value,
                JobImage: imageUrl.value, 
                joburl: joburl
            })

        };

        console.log(options);
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);


        } catch (error) {
            console.error(error);
        }
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
    const div = document.createElement("tr");
    div.className = "job";


    div.innerHTML = `
                <td> <img src="${job.imageUrl}"  alt="campany img"></td>
                <td  class="campany-logo">${job.companyInput}</td>
                <td  class="job-name">${job.postTitle}</td>
                <td  class="job-location">${job.postLocation}</td>
                <td  class="job-category">${job.jobCategory}</td>
                <td >
                  <div class="buttons">
                    <button class="edit-btn">edit</button>
                    <button class="delete-btn">Delete</button>
                  </div> 
                </td>
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


// job list search ayuu quseya function kaan

searchInput.addEventListener('input', function () {
    allJobsList.innerHTML = ''
    console.log('searching', searchInput.value)
    const searchValue = this.value.toLowerCase()
    let jobPosts = getPostFromLocalStorage()
    jobPosts = jobPosts.filter(job => job.postTitle.toLowerCase().includes(searchValue))
    console.log('job posts', jobPosts)
    jobPosts.forEach(job => {

        addJobsToTheDom(job);

    });
    if (jobPosts.length === 0) {
        const noJobsMessage = document.createElement('div');
        noJobsMessage.className = 'no-jobs-message'; // Optional: Add a class for styling
        noJobsMessage.innerHTML = '<p>No jobs found.</p>'; // Message to display
        allJobsList.appendChild(noJobsMessage); // Append the message to the job list

    }
})

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

//loaded data from local storage
const data = JSON.parse(localStorage.getItem('jobPortalData'));

//selecting jobCategoryCtx from Dom
const jobCategoryCtx = document.getElementById('jobCategoryChart').getContext('2d');
// Create Job Category Chart

new Chart(jobCategoryCtx, {
    type: 'bar',
    data: {
        labels: Object.keys(data.jobCategories),
        datasets: [{
            label: 'Number of Jobs',
            data: Object.values(data.jobCategories),
            backgroundColor: '#59a14f'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Job Categories',
                color: '#ffffff'
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#e0e0e0'
                }
            },
            y: {
                ticks: {
                    color: '#e0e0e0'
                }
            }
        }
    }
});

const applicationStatusCtx = document.getElementById('applicationStatusChart').getContext('2d');
new Chart(applicationStatusCtx, {
    type: 'doughnut',
    data: {
        labels: Object.keys(data.applicationStatus),
        datasets: [{
            data: Object.values(data.applicationStatus),
            backgroundColor: ['#4e79a7', '#f28e2c']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#e0e0e0'
                }
            },
            title: {
                display: true,
                text: 'Application Gender',
                color: '#ffffff'
            }
        }
    }
});


const displayApplications = () => {


    const allApplications = JSON.parse(localStorage.getItem("applications")) || [];

    // Create a map to count the number of times each job title is applied for
    var jobCountMap = {};

    allApplications.forEach(function (application) {
        var jobTitle = application.appliedJob;
        if (jobCountMap[jobTitle]) {
            jobCountMap[jobTitle]++;
        } else {
            jobCountMap[jobTitle] = 1;
        }
    });

    // Clear the current list
    appliedJobsList.innerHTML = '';


    // Create and append list items with job titles and their counts
    for (var jobTitle in jobCountMap) {
        var li = document.createElement('li');
        // li waliba waxa raaciyay setAttribute si aan ugu save gareyo Job Title-ka
        li.setAttribute('data-job-title', jobTitle);
        li.textContent = jobTitle + ' (' + jobCountMap[jobTitle] + ' applicants)';
        appliedJobsList.appendChild(li);
        li.addEventListener('click', function (e) {
            // e.target refers to the element that was clicked
            const currentJobTitle = e.target.dataset.jobTitle
            console.log(currentJobTitle);
            displayApplicationsBasedOnJobTitle(currentJobTitle)
        });
    }

    if (allApplications.length === 0) {
        const noJobsMessage = document.createElement('div');
        noJobsMessage.className = 'no-jobs-message'; // Optional: Add a class for styling
        noJobsMessage.innerHTML = '<p>No Applicants found.</p>'; // Message to display
        appliedJobsList.appendChild(noJobsMessage); // Append the message to the job list

    }



}

// function waxa oo soo bandhigaa applicants-ka asoo ku base garesan job title 
function displayApplicationsBasedOnJobTitle(jobTitle) {
    const applicationList = document.querySelector(".applications-list");
    const allApplications = JSON.parse(localStorage.getItem("applications"));
    const filteredApplications = allApplications.filter(application => application.appliedJob === jobTitle);
    console.log(filteredApplications);
    applicationList.innerHTML = ''

    filteredApplications.map((application => {
        applicationList.innerHTML += `
         <div class="applicant-card">
              <span class="job"><strong>Job: </strong>${application.appliedJob}</span>
              <span class="name"><strong>Applicant: </strong>${application.appliedUserName}</span>
              <span class="email"><strong>Email: </strong>${application.appliedUserEmail}</span>
              <span class="email"><strong>Education Level: </strong>${application.appliedUserEducation}</span>
              <span class="phone"><strong>phone: </strong>${application.appliedUserPhone}</span>
              <span class="Gender"><strong>Gender: </strong>${application.appliedUserGender}</span>
          </div>
        `
    }))

}


