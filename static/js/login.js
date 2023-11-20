var togglePassword = document.querySelector('#password ~ .toggle-password i');
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