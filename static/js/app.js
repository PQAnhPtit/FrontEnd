var domain = "http://localhost:7700"
var domain_cate = "http://localhost:7715"
var domain_doc = "http://localhost:7716"


function getAllUser() {
    apiUrl = domain + "/user"
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listUser = document.querySelector('#list_user');
            var content = datas.map(function(user) {
                return `<tr>
				<td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
                <td>${user.address}</td>
                <td>${user.phone_number}</td>
				<td>
				   <a class="btn btn-block btn-warning btn-sm" href="/19.9.2023/Front-End/templates/admin/user/edit.html?id=${user.id}">Edit</a>
                            <Button onclick="deleteUser(${user.id})"
                               class="btn btn-block btn-danger btn-sm"
                               onclick="return confirm('Are you sure want to delete it?')">Delete</Button>
				</td>
				</tr>`;
            });
            listUser.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}

function deleteUser(id) {
    fetch(domain + '/user/' + id, {
            method: 'DELETE'
        })
        .then(function(response) {
            if (response.ok) {
                alert("User deleted successfully!");
                location.reload();
            } else {
                throw new Error('Response not OK');
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function createUser() {
    var name = document.querySelector('input[name="name"]').value
    var email = document.querySelector('input[name="email"]').value
	var pass_word = document.querySelector('input[name="password"]').value
	var address = document.querySelector('input[name="address"]').value
	var phone_number = document.querySelector('input[name="phone_number"]').value
    var user = {
        "name": name,
        "email": email,
        "password": pass_word,
        "address": address,
        "phone_number": phone_number
    };
	
    apiUrl = domain + "/user";
    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(function(response) {
            if (response.ok) {
                alert("User add successfully!");
                location.reload();
            } else {
                alert('Response not OK');
                location.reload();
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function getUser() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
    apiUrl = domain + "/user/" + id;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            var listUser = document.querySelector('#demo');
             var content = `<div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" id="name" name="name" 
                                   required value="${data.name}">
                            <span class="form-message"></span>
                        </div>
						
						<input type="hidden" id="userId" name="userId" value="${data.id}">

                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="email" name="email" 
                                    class="form-control" required value="${data.email}">
                            <span class="form-message"></span>
                        </div>
						
						<div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control" id="password" name="password" 
                                   required value="${data.password}">
                            <span class="form-message"></span>
                        </div>

                        <div class="form-group">
                            <label>Address</label>
                            <input type="text" id="address" name="address" 
                                    class="form-control"  required value="${data.address}">
                            <span class="form-message"></span>
                        </div>
						
						<div class="form-group">
                            <label>Phone Number</label>
                            <input type="text" id="phone_number" name="phone_number" 
                                   class="form-control" required value="${data.phone_number}">
                            <span class="form-message"></span>
                        </div>`;
			listUser.innerHTML = content;		
        })
        .catch(error => console.error(error));
}

function updateUser() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
    var name = document.querySelector('input[name="name"]').value
    var email = document.querySelector('input[name="email"]').value
	var pass_word = document.querySelector('input[name="password"]').value
	var address = document.querySelector('input[name="address"]').value
	var phone_number = document.querySelector('input[name="phone_number"]').value
    var user = {
		"id": id,
        "name": name,
        "email": email,
        "password": pass_word,
        "address": address,
        "phone_number": phone_number
    };
	
    apiUrl = domain + "/user/" + id;
    fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(function(response) {
            if (response.ok) {
                alert("User Update successfully!");
                location.reload();
            } else {
                alert('Response not OK');
                location.reload();
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}


function login() {
    var email = document.querySelector('input[name="email"]').value
	var password = document.querySelector('input[name="password"]').value
	
	
    apiUrl = domain + "/login-user/" + email + "/" + password;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(function(response) {
            if (response.ok) {
                alert("Login successfully!");
                location.replace("/19.9.2023/Front-End/templates/web/user/home.html");
            } else {
                alert('Response not OK');
                location.reload();
            }
			return response.json();
        })
		.then(function(data){
			var abc = data.id
			localStorage.setItem("user", abc);
		})
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function register() {
    var name = document.querySelector('input[name="name"]').value
    var email = document.querySelector('input[name="email"]').value
	var pass_word = document.querySelector('input[name="password"]').value
	var address = document.querySelector('input[name="address"]').value
	var phone_number = document.querySelector('input[name="phone_number"]').value
    var user = {
        "name": name,
        "email": email,
        "password": pass_word,
        "address": address,
        "phone_number": phone_number
    };
	
	
    apiUrl = domain + "/register";
    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
			body: JSON.stringify(user)
        })
        .then(function(response) {
            if (response.ok) {
                alert("Register successfully!");
                location.replace("/19.9.2023/Front-End/templates/web/user/login.html");
            } else {
                alert('Response not OK');
                location.reload();
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function handleLogin(){
	var userId = localStorage.getItem("user");
	var listUser = document.querySelector('#hllogin');
	if(userId == null){
		var content = `
		<div id="loginactioncontainer1" class="navbar-right navbar-padding-16">
            <a id="navbarloginbtn" target="_self" href="/19.9.2023/Front-End/templates/web/user/login.html">Login</a>
        </div>`
		listUser.innerHTML = content;
	}else{
		var content = `
		<div id="loginactioncontainer" class="navbar-right navbar-padding-16">
            <a href="/19.9.2023/Front-End/templates/web/user/information.html">
                <img src="/19.9.2023/Front-End/static/images/avt.jpg" class="w3-circle" style="height:50px;width:50px" alt="Avatar">
            </a>
        </div>`
		listUser.innerHTML = content;
	}
}

function information_user(){
	var userId = localStorage.getItem("user");
	apiUrl = domain + "/user/" + userId;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            var listUser = document.querySelector('#personal');
             var content = `<div style="background-color: Green; width: 100%; height: 70px;">
                <span style="margin-bottom: 40px; ">Thông tin chi tiết</span>
            </div>
            <div>
                <label style="float: left; margin-left: 30px;">Tên:</label>
                <div style="float: left; margin-left: 50px;">${data.name}</div>
            </div>
            <div style="clear: left"></div>
            <div>
                <label style="float: left; margin-left: 30px;">Email:</label>
                <div style="float: left; margin-left: 50px;">${data.email}</div>
            </div>
            <div style="clear: left"></div>
            <div>
                <label style="float: left; margin-left: 30px;">Address:</label>
                <div style="float: left; margin-left: 50px;">${data.address}</div>
            </div>
            <div style="clear: left"></div>
			<div>
                <label style="float: left; margin-left: 30px;">Phone Number:</label>
                <div style="float: left; margin-left: 50px;">${data.phone_number}</div>
            </div>
            <div style="clear: left"></div>
			<a href="/19.9.2023/Front-End/templates/web/user/login.html" type="button" class="btn btn-danger" style="margin-right: 30px; margin-top: 0px;" onclick="logout()">Logout</a>`;
			listUser.innerHTML = content;		
        })
        .catch(error => console.error(error));
}

function logout(){
	localStorage.removeItem("user");
}


function sidebarUser(){
	var userId = localStorage.getItem("user");
	var listUser = document.querySelector('#sidebar');
	content = `
		<a href="/19.9.2023/Front-End/templates/web/user/edit-user.html?id=${userId}">
            <button style="width: 100%; height: 50px; background-color: Gray; margin-top: 27px;">
                Sửa thông tin cá nhân
            </button>
        </a>
        <a href="/19.9.2023/Front-End/templates/web/user/doi-pass.html?id=${userId}">
            <button style="width: 100%; height: 50px; background-color: Gray; margin-top: 0px;">
                Change Password
            </button>
        </a>`
	listUser.innerHTML = content;
}

function getUserInformation() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
    apiUrl = domain + "/user/" + id;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            var listUser = document.querySelector('#edit-user-information');
             var content = `<div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" id="name" name="name" 
                                   required value="${data.name}">
                            <span class="form-message"></span>
                        </div>
						
						<input type="hidden" id="id" name="id" value="${data.id}">
						<input type="hidden" id="email" name="email" value="${data.email}">
						<input type="hidden" id="password" name="password" value="${data.password}">

                        <div class="form-group">
                            <label>Address</label>
                            <input type="text" id="address" name="address" 
                                   class="form-control" required value="${data.address}">
                            <span class="form-message"></span>
                        </div>

                        <div class="form-group">
                            <label>Phone Number</label>
                            <input type="text" id="phone_number" name="phone_number" 
                                   required value="${data.phone_number}" class="form-control">
                            <span class="form-message"></span>
                        </div>
                    </div>

                    <div class="card-footer">
                        <button type="submit" class="btn btn-primary" onclick="updateUser()">Submit</button>
                    </div>`;
			listUser.innerHTML = content;		
        })
        .catch(error => console.error(error));
}

function doiPass() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
    apiUrl = domain + "/user/" + id;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            var listUser = document.querySelector('#doi-pass');
             var content = `
			            <input type="hidden" id="id" name="id" value="${data.id}">
						<input type="hidden" id="name" name="name" value="${data.name}">
						<input type="hidden" id="email" name="email" value="${data.email}">
						<input type="hidden" id="address" name="address" value="${data.address}">
						<input type="hidden" id="phone_number" name="phone_number" value="${data.phone_number}">
                        <div class="form-group">
                            <label>Old Password</label>
                            <input type="password" class="form-control" name="password1"
                                   placeholder="Enter the old password" required>
                            <span class="form-message"></span>
                        </div>

                        <div class="form-group">
                            <label>New Password</label>
                            <input type="password" class="form-control" name="password2"
                                   placeholder="Enter the new password" required>
                            <span class="form-message"></span>
                        </div>
						<div class="card-footer">
                            <button type="submit" class="btn btn-primary" onclick="doiPassUser()">Submit</button>
                        </div>`;
			listUser.innerHTML = content;		
        })
        .catch(error => console.error(error));
}

function doiPassUser() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
    var name = document.querySelector('input[name="name"]').value
    var email = document.querySelector('input[name="email"]').value
	var pass_word = document.querySelector('input[name="password2"]').value
	var address = document.querySelector('input[name="address"]').value
	var phone_number = document.querySelector('input[name="phone_number"]').value
    var user = {
		"id": id,
        "name": name,
        "email": email,
        "password": pass_word,
        "address": address,
        "phone_number": phone_number
    };
	
    apiUrl = domain + "/user/" + id;
    fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(function(response) {
            if (response.ok) {
                alert("Change Password successfully!");
                location.replace("/19.9.2023/Front-End/templates/web/user/information.html");
            } else {
                alert('Response not OK');
                location.reload();
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function handleMyPage(){
	var userId = localStorage.getItem("user");
	var listUser = document.querySelector('#my-page');
	var content = `
		 <a class="navbar-bar-item navbar-button navbar-hide-small barex bar-item-hover navbar-padding-24" 
		   href="/19.9.2023/Front-End/templates/web/user/my-page.html?id=${userId}" title="my_page">My Page</a>`
	listUser.innerHTML = content;
}






function getAllCategory() {
    apiUrl = domain_cate + "/category"
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listUser = document.querySelector('#list_user');
            var content = datas.map(function(category) {
                return `<tr>
				<td>${category.id}</td>
                <td>${category.name}</td>
				<td>
				   <a class="btn btn-block btn-warning btn-sm" href="/19.9.2023/Front-End/templates/admin/category/edit.html?id=${category.id}">Edit</a>
                            <Button onclick="deleteCategory(${category.id})"
                               class="btn btn-block btn-danger btn-sm"
                               onclick="return confirm('Are you sure want to delete it?')">Delete</Button>
				</td>
				</tr>`;
            });
            listUser.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}


function deleteCategory(id) {
    fetch(domain_cate + '/category/' + id, {
            method: 'DELETE'
        })
        .then(function(response) {
            if (response.ok) {
                alert("Category deleted successfully!");
                location.reload();
            } else {
                throw new Error('Response not OK');
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function createCategory() {
    var name = document.querySelector('input[name="name"]').value
    var user = {
        "name": name
    };
	
    apiUrl = domain_cate + "/category";
    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(function(response) {
            if (response.ok) {
                alert("Category add successfully!");
                location.replace("/19.9.2023/Front-End/templates/admin/category/list.html");
            } else {
                alert('Response not OK');
                location.reload();
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function getCategory() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
    apiUrl = domain_cate + "/category/" + id;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            var listUser = document.querySelector('#demo');
             var content = `<div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" id="name" name="name" 
                                   required value="${data.name}">
                            <span class="form-message"></span>
                        </div>
						
						<input type="hidden" id="id" name="id" value="${data.id}">
                       `;
			listUser.innerHTML = content;		
        })
        .catch(error => console.error(error));
}

function updateCategory() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
    var name = document.querySelector('input[name="name"]').value
    var category = {
		"id": id,
        "name": name
    };
	
    apiUrl = domain_cate + "/category/" + id;
    fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        })
        .then(function(response) {
            if (response.ok) {
                alert("Category Update successfully!");
                location.replace("/19.9.2023/Front-End/templates/admin/category/list.html");
            } else {
                alert('Response not OK');
                location.reload();
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function navbarCate() {
    apiUrl = domain_cate + "/category"
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listUser = document.querySelector('#listCategory');
            var content = datas.map(function(category) {
                return `<a class="navbar-bar-item navbar-button" target="_self"
                           href="/19.9.2023/Front-End/templates/web/document/khoTaiLieu.html?id=${category.id}">${category.name}</a>`;
            });
            listUser.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}

function getAllDocument() {
    apiUrl = domain_doc + "/document"
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listUser = document.querySelector('#list_user');
            var content = datas.map(function(user) {
                return `<tr>
				<td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.description}</td>
                <td>${user.link}</td>
				<td>
				   <a class="btn btn-block btn-warning btn-sm" href="/19.9.2023/Front-End/templates/admin/document/edit.html?id=${user.id}">Edit</a>
                            <Button onclick="deleteDocument(${user.id})"
                               class="btn btn-block btn-danger btn-sm"
                               onclick="return confirm('Are you sure want to delete it?')">Delete</Button>
				</td>
				</tr>`;
            });
            listUser.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}

function deleteDocument(id) {
    fetch(domain_doc + '/document/' + id, {
            method: 'DELETE'
        })
        .then(function(response) {
            if (response.ok) {
                alert("Document deleted successfully!");
                location.reload();
            } else {
                throw new Error('Response not OK');
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function createDocument() {
    var name = document.querySelector('input[name="name"]').value
	var description = document.querySelector('input[name="description"]').value
	var link = document.querySelector('input[name="link"]').value
    var user = {
        "name": name,
		"description": description,
		"link": link
    };
	
    apiUrl = domain_doc + "/document";
    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(function(response) {
            if (response.ok) {
                alert("Document add successfully!");
                location.replace("/19.9.2023/Front-End/templates/admin/document/list.html");
            } else {
                alert('Response not OK');
                location.reload();
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function getDocument() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
    apiUrl = domain_doc + "/document/" + id;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            var listUser = document.querySelector('#demo');
             var content = `<div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" id="name" name="name" 
                                   required value="${data.name}">
                            <span class="form-message"></span>
                        </div>
						
						<div class="form-group">
                            <label>Description</label>
                            <input type="text" class="form-control" id="description" name="description" 
                                   required value="${data.description}">
                            <span class="form-message"></span>
                        </div>
						
						<div class="form-group">
                            <label>Link</label>
                            <input type="text" class="form-control" id="link" name="link" 
                                   required value="${data.link}">
                            <span class="form-message"></span>
                        </div>
						
						<input type="hidden" id="id" name="id" value="${data.id}">
                       `;
			listUser.innerHTML = content;		
        })
        .catch(error => console.error(error));
}

function updateDocument() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
    var name = document.querySelector('input[name="name"]').value
	var description = document.querySelector('input[name="description"]').value
	var link = document.querySelector('input[name="link"]').value
    var category = {
		"id": id,
        "name": name,
		"description": description,
		"link": link
    };
	
    apiUrl = domain_doc + "/document/" + id;
    fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        })
        .then(function(response) {
            if (response.ok) {
                alert("Document Update successfully!");
                location.replace("/19.9.2023/Front-End/templates/admin/document/list.html");
            } else {
                alert('Response not OK');
                location.reload();
            }
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
}

function driverList() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const apiUrl1 = domain_doc + "/driver-list-folder/" + id;
    const apiUrl2 = domain_doc + "/driver-list-file/" + id;

    Promise.all([
        fetch(apiUrl1, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()),
        fetch(apiUrl2, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
    ])
    .then(([folderData, fileData]) => {
        var listFolder = document.querySelector('#driver-list-folder');
        
        var folderContent = folderData.map(function(item) {
            return `
                <a href="/19.9.2023/Front-End/templates/web/document/driver/my-driver.html?id=${item.id}">
                    <button style="height: 100px; text-align: center; width: 15%; background-color: yellow; margin: 30px; float: left">${item.name}</button>
                </a>
            `;
        });

        var fileContent = fileData.map(function(item) {
            return `
			<a href="/19.9.2023/Front-End/templates/web/document/upl.html?id=${item.link}">
                <button style="height: 150px; text-align: center; width: 15%; background-color: blue; margin: 30px; float: left">
                    <img src="${item.thumbnailLink}" alt="Image" style="width:100% ;height:130px;">
                </button>
			</a>
            `;
        });

        var combinedContent = folderContent.concat(fileContent);

        listFolder.innerHTML = combinedContent.join('');
    })
    .catch(error => console.error(error));
}

function getAllCategoryForm() {
    apiUrl = domain_cate + "/category"
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listUser = document.querySelector('#listCate')
            var content = datas.map(function(category) {
                return `<option value="${category.id}">${category.name}</option>`;
            });
            listUser.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}

async function xlUpload() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    var userId = localStorage.getItem("user");
    var name = document.querySelector('input[name="name"]').value;
    var description = document.querySelector('textarea[name="description"]').value;
    var category = document.querySelector('select[name="listCate"]').value;
    var document_id = 0;
    var user = {
        "name": name,
        "description": description,
        "link": id
    };

    try {
        apiUrl = domain_doc + "/document";
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            const dataResponse = await fetch(domain_doc + "/getDocument?link=" + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (dataResponse.ok) {
                const data = await dataResponse.json();
                document_id = data.id;

                const uploadResponse = await fetch(domain_doc + "/up-len-kho/" + userId + "/" + document_id + "/" + category, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (uploadResponse.ok) {
                    location.replace("/19.9.2023/Front-End/templates/admin/document/list.html");
                } else {
                    alert('Response not OK');
                    location.reload();
                }
            } else {
                alert('Response not OK');
                location.reload();
            }
        } else {
            alert('Response not OK');
            location.reload();
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

function getAllDocumentKho() {
	const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    apiUrl = domain_doc + "/kho-tai-lieu/" + id;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listUser = document.querySelector('#listDocument123');
            var content = datas.map(function(data) {
                return `
				  <h5 style="margin-top: 25px; float: left; margin-left: 50px;">${data.name}</h5>
				  <a href="/19.9.2023/Front-End/templates/web/document/detail.html?id=${data.id}" type="button" class="btn btn-success" 
				  style="margin-right: 30px; margin-top: 15px; float: right;">Detail</a>
				`;
            });
            listUser.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}

function getCategoryName() {
	const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    apiUrl = domain_cate + "/category/" + id;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            var listUser = document.querySelector('#category_name');
            var content = `<h3>${data.name}</h3>`;
			listUser.innerHTML = content;		
        })
        .catch(error => console.error(error));
}

function getNavListCategory() {
    apiUrl = domain_cate + "/category"
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(datas => {
            var listUser = document.querySelector('#navListCategory');
            var content = datas.map(function(category) {
                return `
					<a href="/19.9.2023/Front-End/templates/web/document/khoTaiLieu.html?id=${category.id}">
			            <button style="width: 100%; height: 50px; background-color: Peru; margin-top: 0px;">${category.name}</button>
			        </a>
			    `;
            });
            listUser.innerHTML = content.join('');
        })
        .catch(error => console.error(error));
}

function getDocumentDetail() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
    apiUrl = domain_doc + "/document/" + id;
    fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            var listUser = document.querySelector('#detail-document');
            var content = `
			    <div style="background-color: Green; width: 100%; height: 70px;">
                    <span style="margin-bottom: 40px; ">Thông tin chi tiết</span>
				</div>
				<div>
					<label style="float: left; margin-left: 30px;">Tên Tài liệu:</label>
					<div style="float: left; margin-left: 50px;">${data.name}</div>
					<div style="float: right; margin-right: 30px;">
						</span>
							<a href="${data.link}" type="button" class="btn btn-success" style="margin-right: 0px; margin-top: 0px;" target="_blank">Download</a>
						</span>
					</div>
				</div>
				<div style="clear: left"></div>
				<div>
					<label style="float: left; margin-left: 30px;">Mô tả tài liệu:</label>
					<div style="float: left; margin-left: 50px;">${data.description}</div>
				</div>
            `;
			listUser.innerHTML = content;		
        })
        .catch(error => console.error(error));
}








