function simulateLoading() {
    var wave1 = document.querySelector('.wave1');
    var wave2 = document.querySelector('.wave2');
    var wave3 = document.querySelector('.wave3');
    
    let width = 0;

    var interval = setInterval(function() {
        width += 1;  
        wave1.style.width = width + "%";
        wave2.style.width = width + "%";
        wave3.style.width = width + "%";

        if (width >= 100) {
            clearInterval(interval);  

            setTimeout(function() {
                window.location.href = '../menu/index.html'; 
            }, 1000);
        }
    }, 30); 
}
