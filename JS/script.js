//Bind elements with the DOM
const form = document.getElementById('form');
const username = document.getElementById('username'); 
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2'); 

//functions
// 1. Toggle error and success states
//Error state
showError = (input, message) => {
    const formControl = input.parentElement;        //needed to grasp the element
    formControl.className = 'form-control error';   //altering the element state
    const text = formControl.querySelector('small'); 
    text.style.visibility = 'visible';                  //making the error text visible
    text.innerHTML = message;                           //set text to parameter given
} 


//Success State (green outline)
showSuccess = input => {
    const formControl = input.parentElement; 
    formControl.className = 'form-control success';     //sets success state
    const text = formControl.querySelector('small');       //grab errot text element
    text.style.visibility = 'hidden';                   //hide the error text
}



//Valid Check Function 
validCheck = inputArray =>{
    inputArray.forEach(function(input){                 //array loop function 
        if(input.value.trim()===''){
            showError(input, `${getInput(input)} is required`);
        }else{
            showSuccess(input);
        }
    })
}

//Function to grab input name
getInput = input =>{
    const inputName = input.id.charAt(0).toUpperCase() + input.id.slice(1);
    return inputName;
}

//Function to check length of input values
checkLength = (input, min, max) =>{
    if(input.value.length < min) {
        showError(input, `${getInput(input)} must be at least ${min} characters.`);
    }else if(input.value.length > max){
        showError(input, `${getInput(input)} must be less than ${max} characters.`);
    }else{
        showSuccess(input);
    }
}

// lengthCheck = (input, min, max) => {
//     if(input.value.length < min){
//         showError(input, `${getInput(input)} must be at least ${min} characters.`);
//     }else if(input.value.length > max){
//         showError(input, `${getInput(input)} must be less than ${max} characters.`)
//     }else{
//         showSuccess(input); 
//     }
// }

//Function to check matching passwords
passwordMatch = (input1, input2) =>{
    if(input1.value !== input2.value){
        showError(input2, 'Passwords do not match');
    }else{
        showSuccess(input);
    }
}

//Function to check if email is valid (using REGEX)
checkEmail = input => {
    const regex =  /\S+@\S+\.\S+/;
    if(regex.test(input.value.trim())){
        showSuccess(input);
    }else{
        showError(input, 'Email is invalid.')
    }
}

//Event Listener (trigger the valid check)
form.addEventListener('submit', function(e){
    e.preventDefault();

    //trigger functions when submit is clicked
    validCheck([username, email, password, password2]);
    checkLength(username, 3, 20);
    checkLength(password, 8, 25);
    checkEmail(email);
    passwordMatch(password, password2);
    
    
    
})


