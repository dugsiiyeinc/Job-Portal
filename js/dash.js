const dashboardTab = document.querySelector('li.dashboard-tab');
const jobTab = document.querySelector('#jobs')
const mainDashboard = document.querySelector('.main-content-tab')
const addnewJobTab = document.querySelector('.job-post')



dashboardTab.addEventListener('click', function() { 
    console.log('dashboard tab clicked')
           // show the dashboard tab content and hide the job tab content
    mainDashboard.style.display = 'block';
    addnewJobTab.style.display = 'none';
    
    
})

jobTab.addEventListener('click', function() { 
        console.log('job tab clicked')
        // show the jobs tab content and hide the dashboard tab content
        mainDashboard.style.display = 'none';
        addnewJobTab.style.display = 'block';
})
