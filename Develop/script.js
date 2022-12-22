// Assignment code here
function generatePassword(pwdLength,hasNumbers,hasLowercase,hasUppercase,hasSymbols)
{
  // Build an array of available characters based on user inputs
  const symbols =[" ","!","@","#","$","%","^","&","*","\"","(",")","-","_","+","=","[","]","\\",";","/'",",",".","\/","<",">","?","{","}","~","`"] 
  const numbers = [1,2,3,4,5,6,7,8,9,0];
  const lowerCaseLetters = [];
  const upperCaseLetters = [];

  for (let index = 65; index <= 90; index++) 
    {
      upperCaseLetters.push(String.fromCharCode(index));
      lowerCaseLetters.push(String.fromCharCode(index+32));
    }
  
  const availableCharacters = [
    ...(hasNumbers ? numbers : []),
    ...(hasLowercase ? lowerCaseLetters : []),
    ...(hasUppercase ? upperCaseLetters : []),
    ...(hasSymbols ? symbols : [])     
  ];

  //Create the password based on available characters
  var password = "";
  var randomIndex = 0;

  for (let index = 0; index < pwdLength; index++) 
    {
      randomIndex = Math.floor(Math.random()*availableCharacters.length);
      password += availableCharacters[randomIndex];
    }

  return password;
}

//Validate user's input for length of password
function validateLength()
{
  var userInput = "";
  retryFlag = false;

  do
  {
    userInput = parseInt(prompt('Enter password length (between 8 and 128 chars)'),10);
    if ((userInput >= 8) && (userInput <= 128))
      return userInput;
    else  
      if(confirm("Wrong input, retry?"))
        retryFlag = true;
  } while (retryFlag == true);

  return -1;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() 
{
  var pwdLength = 0;
  var hasNumbers = false;
  var hasLowerCase = false;
  var hasUpperCase = false;
  var hasSymbols = false;

  pwdLength = validateLength();

  if (pwdLength != -1)
  {
    hasNumbers = confirm("Optional - Should the password contain numbers?")
    hasLowerCase = confirm("Should the password contain lower case characters? \n (At least one character type must be selected: uppercase or lowercase)");
    hasUpperCase = confirm("Should the password contain upper case characters (y/n) \n (At least one character type must be selected: uppercase or lowercase)");
    hasSymbols = confirm("Optional - Should the password contain special characters (y/n) "); 
  }
  else
  {
    alert("An error has occured");
  }

  //Display an error message in case user selected 'No' in both character types
  if (hasLowerCase === false && hasUpperCase === false)
  {
    alert("At least one character type must be selected (uppercase or lowercase)");
  }
  else
  {
    var password = generatePassword(pwdLength,hasNumbers,hasLowerCase,hasUpperCase,hasSymbols);
    var passwordText = document.querySelector("#password");
    passwordText.value = password;
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
