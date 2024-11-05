const container = document.querySelector(".container");
const onlineUserName = document.querySelector(".username");
const loginBtn1 = document.querySelectorAll(".loginBtn")[0];
const loginBtn2 = document.querySelectorAll(".loginBtn")[1];
const showUserInfo = document.querySelector("#user");
const dashLink = document.querySelector(".dash-link");
 const applyModel = document.querySelector(".apply-model");
 const applicantName = document.querySelector("#fullName");
 const applicantEmail = document.querySelector("#email");
 const applicantPhone = document.querySelector("#phone");
 const applicantDistrict = document.querySelector("#district");
 const applyForm = document.querySelector(".applyForm");
 const closeBtn = document.querySelector(".closeBtn");
//set log in buttons when loptop or mobile menu
loginBtn1.addEventListener("click", () => {
  localStorage.removeItem("onlineUser");
});
loginBtn2.addEventListener("click", () => {
  localStorage.removeItem("onlineUser");
});

//  marka hore ka so aqri url dhamaan
const url = new URL(window.location.href);

// markaan la bax  parameter ka aa rabto
const id = url.searchParams.get("jobId");

// console.log(id);
document.addEventListener("DOMContentLoaded", loadJobsdata);

function loadJobsdata() {
  const jobPosts = getPostFromLocalStorage();

  // console.log(jobPosts, id);

  getJobToShow(id);

  //check if user is online

  const onlineUser = JSON.parse(localStorage.getItem("onlineUser")) || null;
  if (!onlineUser) return;

  //online username
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
// get data from local storage
function getPostFromLocalStorage() {
  const oldJobPostDetail = JSON.parse(localStorage.getItem("jobPosts")) || [];

  return oldJobPostDetail;
}

function getJobToShow(id) {
  let jobPosts = getPostFromLocalStorage();
  // console.log(id);
  const findPostToUpdate = jobPosts.find(
    (jobPosts) => jobPosts.postTime === Number(id)
  );

  addJobsToTheDom(findPostToUpdate);
}

// kun soo  bandhiga jobs  dom-ka

function addJobsToTheDom(jobPosts) {
  // console.log(jobPosts);
  const formatedJobData = jobPosts.postAreatext.replace(/\n/g, "<br>");
  const jobCard = document.querySelector("#job-details");
  const postedDate = new Date(jobPosts.PostedDate).toDateString();
  const expireDate = new Date(jobPosts.dateInput).toDateString();

  jobCard.innerHTML = `
                 <div class="content all-job-details">
        <h4 class="details-title">job details</h4>
        <div class="jobs-details">
       
        <div class="job-deatil">
         
          <div class="job-deatail-info posted-date">
            <i class="fa-solid fa-calendar-days"></i>
            <div class="job-deatail-text">
              <h4>${postedDate}</h4>
              <p>Posted Date</p>
            </div>
          </div>
        </div>
        <div class="job-deatail">
          <div class="job-deatail-info posted-date">
            <i class="fa-regular fa-calendar"></i>
            <div class="job-deatail-text">
              <h4>${jobPosts.dateInput}</h4>
              <p>Expire Date</p>
            </div>
          </div>
        </div>
        <div class="job-deatail">
          <div class="job-deatail-info posted-date">
            <i class="fa-solid fa-layer-group"></i>
            <div class="job-deatail-text">
              <h4>${jobPosts.jobCategory}</h4>
              <p>Category</p>
            </div>
          </div>
        </div>
        <div class="job-deatail">
          <div class="job-deatail-info posted-date">
            <i class="fa-solid fa-location-dot"></i>
            <div class="job-deatail-text">
              <h4>${jobPosts.postLocation}</h4>
              <p>Location</p>
            </div>
          </div>
        </div>
       
      </div>
      </div>
      <div class="job-descreption">
        <h4 class="desc-title">job Description</h4>
        <p class="desc-text">${formatedJobData}</p>
         <button class="btn" id="apply-btn">Apply</button>
      </div>
    </div>
                 
                `;

  document.title = `${jobPosts.postTitle}`;

  handleAttach(jobPosts.postTime, jobCard);
}

//handle attach

const handleAttach = (id, jobCard) => {
  //select dom elements
  applyBtn = jobCard.querySelector("#apply-btn");

  //check if online user is admin
  const onlineUser = JSON.parse(localStorage.getItem("onlineUser")) || null;
  if (!onlineUser || onlineUser.isAdmin)
    return (applyBtn.style.display = "none");

  // add event on applyBtn
  applyBtn.addEventListener("click", () => {
   
    applyModel.style.display = "flex";

    applyJob(id);
  });
};

//Apply Job function

const applyJob = (id) => {
 

  //finding the current job using job id

  const jobPosts = getPostFromLocalStorage();

  const findPostToapply = jobPosts.find(
    (jobPosts) => jobPosts.postTime === Number(id)
  );

  applyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    //checking the input values are empty
    if (
      applicantName.value === "" ||
      applicantEmail.value === "" ||
      applicantPhone.value === "" ||
      applicantDistrict.value === ""
    ) {
      Swal.fire({
        title: "Error!",
        text: `please fill all Inputs`,
        icon: "error",
        confirmButtonText: "ok"
      });
      return;
    }
    const applicantData = {
      appliedJob: findPostToapply.postTitle,
      appliedUserName: applicantName.value,
      appliedUserEmail: applicantEmail.value,
      appliedUserPhone: applicantPhone.value,
      appliedUserDistrict: applicantDistrict.value,
    };
    // console.log(applicantData);

    const applications = JSON.parse(localStorage.getItem("applications")) || [];

    //checking if  exestingAppliedUser
    const exestingAppliedUser = applications.find(
      (appliedUser) =>
       (appliedUser.appliedUserPhone === applicantData.appliedUserPhone &&
        appliedUser.appliedUserEmail === applicantData.appliedUserEmail ) && appliedUser.appliedJob === findPostToapply.postTitle
    );
  console.log(exestingAppliedUser,findPostToapply);
  
    if(exestingAppliedUser) {
      Swal.fire({
        title: "Error!",
        text: `${applicantName.value } please use unique email and unique phone`,
        icon: "error",
        confirmButtonText: "ok"
      });
      return;
    };

    //save data to local storage
    applications.push(applicantData);
    localStorage.setItem("applications", JSON.stringify(applications));

    Swal.fire({
      title: "succes",
      text: "applied Job succesFully!",
      icon: "success",
      confirmButtonText: "ok"
    }).then((result) => {
      if (result.isConfirmed) {
        closeModel();
      }
    });
    
  });
};


//close model function
const closeModel = () =>{
    applicantName.value = "",
    applicantEmail.value = "",
    applicantPhone.value = "",
    applicantDistrict.value = "",
    applyModel.style.display = "none";

}

//closeBtn
closeBtn.addEventListener("click", closeModel);