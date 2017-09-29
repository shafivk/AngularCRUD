		'use strict';

		angular.module('My_Contacts.contacts', ['ngRoute', 'firebase'])

		    .config(['$routeProvider', function($routeProvider) {
		        $routeProvider.when('/contacts', {
		            templateUrl: 'contacts/contacts.html',
		            controller: 'contactsCtrl'
		        });
		    }])

		    // .controller('contactsCtrl', ['$scope', '$firebaseObject', function($scope, $firebaseObject) {
		    .controller('contactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {

		        var config = {
		            apiKey: "AIzaSyAi7l_1ByVKono5p_04RwjcO7qUlB-SGw4",
		            authDomain: "addressbook-8a349.firebaseapp.com",
		            databaseURL: "https://addressbook-8a349.firebaseio.com",
		            projectId: "addressbook-8a349",
		            storageBucket: "addressbook-8a349.appspot.com",
		            messagingSenderId: "343570361871"
		        };
		        if (!firebase.apps.length) {
		            firebase.initializeApp(config);
		        }
		        // firebase.initializeApp(config);
		        var ref = firebase.database().ref();
		        // console.log("inside firebase");
		        // console.log(config);
		        // $scope.contacts = $firebaseObject(ref);
		        $scope.contacts = $firebaseArray(ref);
		       
		        $scope.showAddForm = function() {
		            $scope.addFormShow = true;
		        }

		         $scope.showEditForm = function(contact) {
		            $scope.editFormShow = true;

		            $scope.id 	        	= 	contact.$id;
		            $scope.name 	        = 	contact.name;
		        	$scope.email	        = 	contact.email;
		        	$scope.company 			= 	contact.company;
		        	$scope.work_phone	    = 	contact.phones[0].work;
		        	$scope.mobile_phone	    = 	contact.phones[0].mobile;
		        	$scope.home_phone 	    = 	contact.phones[0].home;
		        	$scope.street_address   =   contact.address[0].street_address;
		        	$scope.city 	        = 	contact.address[0].city;
		        	$scope.state  			= 	contact.address[0].state;
		        	$scope.zipcode          = 	contact.address[0].zipcode;
		        	



		        }
		        $scope.hide = function() {
		            $scope.addFormShow = false;

		        }
		        $scope.addFormSubmit = function() {
		            console.log("adding contact");
		            if ($scope.name) { var name = $scope.name } else { var name = null; }
		            if ($scope.email) { var email = $scope.email } else { var email = null; }
		            if ($scope.company) { var company = $scope.company } else { var company = null; }
		            if ($scope.mobile_phone) { var mobile_phone = $scope.mobile_phone } else { var mobile_phone = null; }
		            if ($scope.work_phone) { var work_phone = $scope.work_phone } else { var work_phone = null; }
		            if ($scope.home_phone) { var home_phone = $scope.home_phone } else { var home_phone = null; }
		            if ($scope.street_address) { var street_address = $scope.street_address } else { var street_address = null; }
		            if ($scope.city) { var city = $scope.city } else { var city = null; }
		            if ($scope.state) { var state = $scope.state } else { var state = null; }
		            if ($scope.zipcode) { var zipcode = $scope.zipcode } else { var zipcode = null; }
		            //BUild objects

		         $scope.contacts.$add({
		                name:name,
		                email: email,
		                company:company,
		                phones: [{
		                    mobile: mobile_phone,
		                    home:home_phone,
		                    work:work_phone
		                }],
		                address: [{
		                    street_address: street_address,
		                    city: city,
		                    state: $scope.state,
		                    zipcode: $scope.zipcode
		                }]
		            })
		            .then(function(ref) {

		                var id = ref.key;
		                console.log('Added contact with ID:' + id);
		                clearFields();
		                $scope.addFormShow = false;
		                $scope.msg = "contact added";

		            });
		        }

		        $scope.showContact = function(contact){
		        	console.log("Loading contact.....");

		        	$scope.name 	        = 	contact.name;
		        	$scope.email	        = 	contact.email;
		        	$scope.company 			= 	contact.company;
		        	$scope.work_phone	    = 	contact.phones[0].work;
		        	$scope.mobile_phone	    = 	contact.phones[0].mobile;
		        	$scope.home_phone 	    = 	contact.phones[0].home;
		        	$scope.street_address   =   contact.address[0].street_address;
		        	$scope.city 	        = 	contact.address[0].city;
		        	$scope.state 			= 	contact.address[0].state;
		        	$scope.zipcode          = 	contact.address[0].zipcode;
		        	
		        	$scope.contactShow = true;
		        }


		        $scope.removeContact = function(contact){
		        	console.log("Deleting contact.....");
		        	$scope.contacts.$remove(contact);
		        	$scope.msg ="contact removed";
		        	
		        	// $scope.contactShow = true;
		        }

		        $scope.editFormSubmit = function(){
		        	console.log("updating contact..");
		        	var id= $scope.id;
		        	// Get Record
		        	var record = $scope.contacts.$getRecord(id);
		        	// assign values
		        	record.name 			           =  	$scope.name ;
		        	record.email	                   = 	$scope.email;
		        	record.company 			           = 	$scope.company;
		        	record.phones[0].work              = 	$scope.work_phone	;
					record.phones[0].mobile            = 	$scope.mobile_phone	;
		        	record.phones[0].home  	           = 	$scope.home_phone;
		        	record.address[0].street_address   =   $scope.street_address;
		        	record.address[0].city 	           = 	$scope.city;
		        	record.address[0].state            = 	$scope.state;
		        	record.address[0].zipcode          = 	$scope.zipcode;
		        	
		        	//save contact

		        	$scope.contacts.$save(record).then(function(ref){
		        		console.log(ref.key);
		        			});
		        		clearFields();
		        		// hide edit form
		        		$scope.editFormShow = false;
		        		$scope.msg = "contact updated";
		        	

		        }
		        function clearFields(){
		        	console.log("clearing fields");
		        	$scope.name ='';
		        	$scope.email ='';
		        	$scope.company ='';
		        	$scope.mobile_phone ='';
		        	$scope.home_phone ='';
		        	$scope.work_phone ='';
		        	$scope.city ='';
		        	$scope.state ='';
		        	$scope.street_address ='';
		        	$scope.zipcode ='';
		        }
		    }]);