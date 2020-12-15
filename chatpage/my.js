// (async () => {

//     const ipAPI = 'http://api.ipify.org/?format=json'
    
//     const inputValue = fetch(ipAPI)
//       .then(response => response.json())
//       .then(data => data.ip)
    
//     const { value: ipAddress } = await Swal.fire({
//       title: 'Enter your IP address',
//       input: 'text',
//       inputLabel: 'Your IP address',
//       inputValue: inputValue,
//       showCancelButton: true,
//       inputValidator: (value) => {
//         if (!value) {
//           return 'You need to write something!'
//         }
//       }
//     })
    
//     if (ipAddress) {
//       Swal.fire(`Your IP address is ${ipAddress}`)
//     }
    
//     })()
// $(window).load(function(){
//     $(document).ready(function () {    });
//   });


document.onreadystatechange = function () {
    if (document.readyState === "complete") {


        $(".roomlist").on("mouseover" ,function () {
            $(this).removeClass("collapsed")
            // console.log("good");
          });


        $(".roomlist").on("mouseout" ,function () {
            $(this).addClass("collapsed")
            // console.log("good");
          });
        
        
    }
}
// var refreshIntervalId = setInterval(()=>Swal.fire('Any fool can use a computer'), 10000);

// /* later */
// clearInterval(refreshIntervalId);
        
