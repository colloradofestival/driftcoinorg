// Iteration
  packages = [];
  account_balance = 0;
  contract_active = false;

  packages[0] = {"name":"Starter Pack","price":0.1, "img0":"./images/randomstarter.png"};
  packages[1] = {"name":"SnowWhite","price":0.33, "img0":"./images/randomstarter.png"};
  packages[2] = {"name":"Devil'/s Rig","price":0.66, "img0":"./images/randomstarter.png"};
  packages[3] = {"name":"Founders Blue","price":0.99, "img0":"./images/randomstarter.png"};
  packages[4] = {"name":"Pool Token","price":1, "img0":"./images/randomstarter.png"};

  inventory = [];

// Iteration




$(document).ready(function(){

    $('#rig1').popover(
      {
        trigger: "hover",
        html: true,
        placement:"right", 
        content:" - 1 Motherboard<br> - 1 Frame<br> - 1 Power Supply<br> - 4 Random GPUs.<br>Estimated value over 0.2 Eth" 
      }
    );

    $('#rig2').popover(
      {
        trigger: "hover",
        html: true,
        placement:"right", 
        content:" - Unique Serial Number<br> - 4 Rare GPU<br>Estimated value over 0.7 Eth" 
      }
    );
    
    $('#rig3').popover(
      {
        trigger: "hover",
        html: true,
        placement:"right", 
        content:" - Unique Serial Number<br> - 6 Epic GPU<br>- Cool name<br>- Cool looking<br>Estimated value over 1.5 Eth" 
      }
    );
    
    $('#rig4').popover(
      {
        trigger: "hover",
        html: true,
        placement:"right", 
        content:" - Unique Serial Number<br> - 8 Legendary GPU<br>- Best price to value<br>Estimated value over 5 Eth" 
      }
    );
    
    $('#rig5').popover(
      {
        trigger: "hover",
        html: true,
        placement:"right", 
        content:"10% of total RigCraft's income divided beetwen the token holders.<br>Also applies on presale income.<br>Pool Token watermark on your Rigs." 
      }
    );

    // Add scrollspy to <body>
          $('body').scrollspy({target: ".navbar", offset: 350});

          // Add smooth scrolling on all links inside the navbar
          $("#navbarCollapse a").on('click', function(event) {

            // Make sure this.hash has a value before overriding default behavior
            if (this.hash !== "") {

              // Prevent default anchor click behavior
              event.preventDefault();

              // Store hash
              var hash = this.hash;

              // Using jQuery's animate() method to add smooth page scroll
              // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
              $('html, body').animate(
              {
                scrollTop: $(hash).offset().top
              },
               800, function()
               {
              // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
              });

            } // End if

          }); 

});






function update_maintimer()
{
  target_time = 1633111200000; // Big Pump

  current_time = Date.now();

  let result = countdown(target_time-current_time);

    $('#countday').html(result.days);
    $('#counthour').html(result.hours);
    $('#countmin').html(result.minutes);
    $('#countsec').html(result.seconds);

}




function countdown (distance)
{

  if(distance>0)
  {
        distance = distance; // Unixtime

        let result = {};
        // Time calculations for days, hours, minutes and seconds
        result.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        result.hours = pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        result.minutes = pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        result.seconds = pad(Math.floor((distance % (1000 * 60)) / 1000));

        return result;
  }

}








$( document ).ready(function() {

      function update(){
        window.windowage += 1;
        update_maintimer();
 
      };

      setInterval(update, 1000); // Main Loop every 100ms

      window.windowage = 0;

});


function pad(n) {
  return (n < 10) ? ("0" + n) : n;
}
