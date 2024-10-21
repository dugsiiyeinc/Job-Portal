const dashboardTab = document.querySelector('.dashboard-tab a');
const jobAddContainer = document.querySelector('.add-job-container')
const mainDashboard = document.querySelector('.main-content-tab')
const addnewJobTab = document.querySelector('.jobs-tab')



dashboardTab.addEventListener('click', function() { 
    console.log('dashboard tab clicked')
           // show the dashboard tab content and hide the job tab content
    mainDashboard.style.display = 'block';
    jobAddContainer.style.display = 'none';
    addnewJobTab.classList.toggle('active');;
    dashboardTab.classList.toggle('active');

    
    
})

addnewJobTab.addEventListener('click', function() { 
        console.log('job tab clicked')
        // show the jobs tab content and hide the dashboard tab content
         
        mainDashboard.style.display = 'none'
        jobAddContainer.style.display = 'block'
        addnewJobTab.classList.toggle('active');
        dashboardTab.classList.toggle('active');
        
})
