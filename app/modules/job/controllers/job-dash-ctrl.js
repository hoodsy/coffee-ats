'use strict';

angular.module('job')
  .controller('JobDashboardCtrl', function ($scope, $cookies, getJobList, getJob) {

      // $scope.jobs = getJobList.query({ id: $cookies.userID })
      // $scope.jobsTable = [];
      // $scope.getJobs = function( jobID ) {
      //   var newJob = getJob.get({ id: jobID });
      //   $scope.jobsTable.push(newJob);
      // }

      $scope.jobsTable = [
  			{title: 'Front End Developer', headline:'Make UIs with Javascript, HTML, CSS', tags:'Javascript, AngularJS', company: 'Twitter', location: 'NYC', salaryMin:'80,000', salaryMax:'100,000', schedule:'Full-Time', datePosted: '2014-10-26', numApplicants: 20},
  			{title: 'Graphic Designer', headline:'Design web interfaces', tags:'Illustrator, Photoshop', company: 'Yahoo', location: 'NYC', salaryMin:'30,000', salaryMax:'60,000', schedule:'Full-Time', datePosted: '2014-5-13', numApplicants: 163},
  			{title: 'Java Web Developer', headline:'Design and document new features', tags:'Java', company: 'Facebook', location: 'NYC', salaryMin:'25,000', salaryMax:'40,000', schedule:'Part-Time', datePosted: '2014-1-17', numApplicants: 45},
        {title: 'Lead Web Developer', headline:'Maintain, troubleshoot, architect AEM implementations', tags:'Java, JSP', company: 'McGladrey', location: 'Chicago', salaryMin:'80,000', salaryMax:'120,000', schedule:'Full-Time', datePosted: '2014-9-20', numApplicants: 32},
        {title: 'Web Marketing Manager', headline:'Development of Web Marketing Strategy', tags:'Marketing, Analytics', company: 'CUNA', location: 'NYC', salaryMin:'60,000', salaryMax:'80,000', schedule:'Full-Time', datePosted: '2013-12-13', numApplicants: 94},
        {title: 'Software Engineer', headline:'Design, Build, Support World Class Products', tags:'Javascript, AJAX', company: 'EFI', location: 'Boston', salaryMin:'90,000', salaryMax:'110,000', schedule:'Full-Time', datePosted: '2014-11-1', numApplicants: 129},
        {title: 'Software Engineer', headline:'Design and develop .NET applications', tags:'.NET, C#', company: 'CSC', location: 'San Francisco', salaryMin:'95,000', salaryMax:'110,000', schedule:'Full-Time', datePosted: '2014-11-15', numApplicants: 113},
        {title: 'Graphic Designer', headline:'Design web interfaces', tags:'Illustrator, Photoshop', company: 'Yahoo', location: 'NYC', salaryMin:'30,000', salaryMax:'60,000', schedule:'Full-Time', datePosted: '2014-5-13', numApplicants: 163},
        {title: 'Software Engineer', headline:'Design and develop .NET applications', tags:'.NET, C#', company: 'CSC', location: 'San Francisco', salaryMin:'95,000', salaryMax:'110,000', schedule:'Full-Time', datePosted: '2014-11-15', numApplicants: 113},
  			{title: 'Java Web Developer', headline:'Design and document new features', tags:'Java', company: 'Facebook', location: 'NYC', salaryMin:'25,000', salaryMax:'40,000', schedule:'Part-Time', datePosted: '2014-1-17', numApplicants: 45},
        {title:'ztest'},{title:'ztest'},{title:'ztest'},{title:'ztest'},{title:'ztest'},{title:'ztest'},{title:'ztest'},{title:'ztest'},
  			{title:'ztest'},{title:'ztest'},{title:'ztest'},{title:'ztest'},{title:'ztest'},{title:'ztest'},{title:'ztest'},{title:'ztest'},
  			{title:'ztest'},{title:'ztest'},{title:'ztest'},{title:'ztest'},{title:'ztest'},{title:'ztest'},{title:'ztest'},{title:'ztest'}
  		];

  });