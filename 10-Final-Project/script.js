document.addEventListener('DOMContentLoaded', function() {
    var createAccountForm = document.getElementById('createAccountForm');
    var loginForm = document.getElementById('loginForm');
    var logoutButton = document.getElementById('logoutButton');
    var accountInfo = document.getElementById('accountInfo');
    var experienceBar = document.getElementById('experienceBar');

    
    experienceBar.style.display = 'none';
    accountInfo.style.display = 'none';

    
    function toggleDisplay(loggedIn) {
        if (loggedIn) {
            logoutButton.style.display = 'block';
            accountInfo.style.display = 'block';
            experienceBar.style.display = 'block';
        } else {
            logoutButton.style.display = 'none';
            accountInfo.style.display = 'none';
            experienceBar.style.display = 'none';
        }
    }

    
    function logAccountDetails() {
        var details = {
            name: localStorage.getItem('accountName'),
            birthday: localStorage.getItem('accountBirthday'),
            address: localStorage.getItem('accountAddress'),
            cardNumber: localStorage.getItem('accountCardNumber'), 
        };
        console.log('Account Details:', details);
    }

    
    function showPopup(message) {
        alert(message); 
    }

    
    createAccountForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var name = document.getElementById('createName').value;
        var birthday = document.getElementById('createBirthday').value;
        var address = document.getElementById('createAddress').value;
        var cardNumber = document.getElementById('createCardNumber').value;
        var password = document.getElementById('createPassword').value;
        var confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            showPopup('Passwords do not match.');
            return;
        }

        
        localStorage.setItem('accountName', name);
        localStorage.setItem('accountBirthday', birthday);
        localStorage.setItem('accountAddress', address);
        localStorage.setItem('accountCardNumber', cardNumber); 
        localStorage.setItem('accountPassword', password);

        
        logAccountDetails();

        
        showPopup('Account created successfully! You can now log in.');
        createAccountForm.reset();
    });

    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var name = document.getElementById('loginName').value;
        var password = document.getElementById('loginPassword').value;

        if (localStorage.getItem('accountName') === name && localStorage.getItem('accountPassword') === password) {
            toggleDisplay(true);
            displayAccountInfo(); 
            showPopup('Login successful!');
        } else {
            showPopup('Incorrect login details.');
        }
    });

    
    logoutButton.addEventListener('click', function() {
        localStorage.clear(); 
        toggleDisplay(false);
        showPopup('Logout successful.');
    });

    
    function displayAccountInfo() {
        if (localStorage.getItem('accountName')) {
            accountInfo.innerHTML = `
                <p>Name: ${localStorage.getItem('accountName')}</p>
                <p>Birthday: ${localStorage.getItem('accountBirthday')}</p>
                <p>Address: ${localStorage.getItem('accountAddress')}</p>
                <p>Level: 1 - 80/100 xp</p>
                <p>Rank: Trusted Shopper</p>
            `;
        }
    }

    
    if (localStorage.getItem('accountName')) {
        toggleDisplay(true);
        displayAccountInfo();
    }
});
