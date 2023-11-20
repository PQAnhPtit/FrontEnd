
var password = document.querySelector('#password');
var passwordConfirmation = document.querySelector('#confirm-password');

var togglePassword = document.querySelector('#password ~ .toggle-password i');
var togglePasswordConfirmation = document.querySelector('#confirm-password ~ .toggle-password i');

togglePassword.onclick = function(){
    if(this.className == 'far fa-eye-slash'){
        this.className = 'far fa-eye';
        password.type='text';
    }
    else{
        this.className = 'far fa-eye-slash';
        password.type='password';
    }
}

togglePasswordConfirmation.onclick = function(){
    if(this.className == 'far fa-eye-slash'){
        this.className = 'far fa-eye';
        passwordConfirmation.type='text';
    }
    else{
        this.className = 'far fa-eye-slash';
        passwordConfirmation.type='password';
    }
}



function checkEmpty(element){
    if(element.value.trim().length==0)
    return true;
    return false;
}

function checkLength(element, length){
    if(element.value.trim().length>=length)
    return true;
    return false;
}

// solve name

var checkYourName=false;
var yourName = document.querySelector('#name');
var messOfYourName = document.querySelector('#name ~ .form-message');
yourName.onfocus = function(){
    messOfYourName.innerText = '';
}

yourName.onblur = function(){
    if(checkEmpty(this)){
        messOfYourName.innerText ='Enter the name';
    }else{
        checkYourName=true;
        messOfYourName.innerText = '';
    }
}

// solve address

var checkAddress=false;
var address = document.querySelector('#address');
var messOfAddress = document.querySelector('#address ~ .form-message');
address.onfocus = function(){
    messOfAddress.innerText = '';
}

address.onblur = function(){
    if(checkEmpty(this)){
        messOfAddress.innerText ='Enter the address';
    }
    else{
        checkAddress=true;
        messOfAddress.innerText = '';
    }
}

// solve Email
var checkEmail = false;
var email = document.querySelector('#email');
var messOfEmail = document.querySelector('#email ~ .form-message');
email.onfocus = function(){
    messOfEmail.innerText = '';
}

email.onblur = function(){
    if(checkEmpty(this)){
        messOfEmail.innerText ='Enter the email';
    }
    else if(!this.value.endsWith('@gmail.com')){
        messOfEmail.innerText = 'Email is not valid';
    }
    else{
        checkEmail=true;
        messOfEmail.innerText= '';
    }
}

// solve phone_number

var checkPhone=false;
var phone = document.querySelector('#phone_number');
var messOfPhone = document.querySelector('#phone_number ~ .form-message');
phone.onfocus = function(){
    messOfPhone.innerText = '';
}

phone.onblur = function(){
    if(checkEmpty(this)){
        messOfPhone.innerText ='Enter the phone_number';
    }
    else{
        checkPhone=true;
        messOfPhone.innerText = '';
    }
}

// solve password
var checkPassWord = false;
var lengthPassword = 6;
var messOfPassWord = document.querySelector('#password ~ .form-message');

function confirmPassword(password, confirmPassword){
    if(confirmPassword.value === password.value)
        return true;
    return false;
}

password.onfocus = function(){
    messOfPassWord.innerText = '';
}
password.onblur = function(){
    var pattern= new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    if(this.value.length==0){
        messOfPassWord.innerText ='Enter the password';
    }
    else if(!pattern.test(this.value)){
        messOfPassWord.innerText = `Password must be at 8 least characters,
        at least one uppercase letter, one lowercase letter, one number, and one special character`;
    }
    else{
        checkPassWord=true;
        messOfPassWord.innerText='';
    }

    if(passwordConfirmation.value.length>0 && this.value.length>0){
        if(!confirmPassword(this, passwordConfirmation)){
            checkConfirm=false;
            messOfConfirmPassword.innerText ='Repeat password is not correct';
        }
        else{
            checkConfirm=true;
            messOfConfirmPassword.innerText ='';
        }
    }
}

//solve confirm password
var checkConfirm = false;
var messOfConfirmPassword = document.querySelector('#confirm-password ~ .form-message');

passwordConfirmation.onfocus = function(){
    messOfConfirmPassword.innerText = '';
}
passwordConfirmation.onblur = function(){
    if(this.value.length==0){
        messOfConfirmPassword.innerText ='Repeat the password';
    }
    else if(!confirmPassword(password, this)){
        messOfConfirmPassword.innerText ='Repeat password is not correct';
    }
    else{
        messOfConfirmPassword.innerText='';
        checkConfirm = true;
    }
}

function check(){
    if(checkUsername && checkEmail && checkPassWord && checkConfirm && checkYourName){
        return true;
    }
    else{
        return false;
    }
    return false;
}

