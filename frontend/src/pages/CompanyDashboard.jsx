import React from 'react';

function CompanyDashboard() {
    return (
      <div>
        <h1>Welcome to the cOMPANY DASHBAORD Page</h1>
        <button className='dashboardProjectButton'>
            <h1 className="projectName">Project Name</h1>
            <div className='dashboardProjectContent'>
                <p className='projectDesc'>Description: </p>
                <p className="projectDetails">Project Details {'>'}</p>
            </div>
        </button>
      </div>
    );
}

export default CompanyDashboard;