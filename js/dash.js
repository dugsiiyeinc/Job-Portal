const dashboardTab = document.querySelector('.dashboard-tab');
const jobTab = document.querySelector('.jobs-tab')
const mainDashboard = document.querySelector('.main-content-tab')
const addnewJobTab = document.querySelector('.job-post')



dashboardTab.addEventListener('click', function() { 
    console.log('dashboard tab clicked')
           // show the dashboard tab content and hide the job tab content
    mainDashboard.style.display = 'block';
    addnewJobTab.style.display = 'none';
    jobTab.classList.toggle('active');;
    dashboardTab.classList.toggle('active');

    
    
})

jobTab.addEventListener('click', function() { 
        console.log('job tab clicked')
        // show the jobs tab content and hide the dashboard tab content
        mainDashboard.style.display = 'none';
        // dashboardTab.classList.remove('active');
        dashboardTab.classList.toggle('active');
        addnewJobTab.style.display = 'block'
        jobTab.classList.toggle('active');;
})
