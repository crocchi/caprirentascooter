
        // Initialize and add the map
        let map;

        async function initMap() {
          // The location of caprirentscooter 40.55022724510268, 14.239252679514344
          const position = { lat: 40.55, lng: 14.23 };
          const myPosition = { lat: 40.553380824954644,  lng: 14.219324085926518 };
        
          // Request needed libraries.
          const { Map , InfoWindow } = await google.maps.importLibrary("maps");
          const { AdvancedMarkerElement , PinElement } = await google.maps.importLibrary("marker");
        
          // A marker with a with a URL pointing to a PNG.
            const beachFlagImg = document.createElement('img');
            beachFlagImg.src = 'images/logo2(19).gif';
            beachFlagImg.style ="height:15px"
        
          // stop parcheggio x capri
            const parkFlagImg = document.createElement('img');
            parkFlagImg.src = 'https://gesem-gestione-servizi-municipali-nord-milano-api.municipiumapp.it/s3/8167/media/1200px-italian_traffic_signs_-_parcheggio-svg.png';
            parkFlagImg.style ="height:20px"
            //40.54995936153687, 14.238682053135248
        
          // The map -  init the map
          map = new Map(document.getElementById("map"), {
            zoom: 13,
            center: position,
            mapId: "19987a45305b8346",//5e8eda199dbda90b
          });
          const parkFlagMarkerView = new AdvancedMarkerElement({
            map,
            position: { lat: 40.54995936153687, lng: 14.238682053135248 },
            content: parkFlagImg,
            title: 'Parcheggio per Capri',
          });
        
          const beachFlagMarkerView = new AdvancedMarkerElement({
            map,
            position: { lat: 40.553380824954644, lng: 14.219324085926518 },
            content: beachFlagImg,
            title: 'A marker using a custom PNG Image',
          });
        
          // i vari punti di interesse della mappa
        const tourStops = [
            {
              position: { lat: 40.56122888850998, lng: 14.205595497908048 },
              title: "Grotta Azzurra",
            },
            {
              position: { lat: 40.536522969676426,  lng: 14.198788587276004, },
              title: "Faro di Punta Carena",
            },
            {
              position: { lat: 40.54252733958242, lng: 14.200575970817543, },
              title: "Sentiero dei Fortini",
            },
            {
              position: { lat: 40.55713191542387,  lng: 14.201904486685299, },
              title: "Damecuta",
            },
            {
              position: { lat: 40.54029587376164, lng: 14.209354073849937, },
              title: "Belvedere della Migliara",
            },
            {
              position: { lat: 40.55662329394343,  lng: 14.228261429421096, },
              title: "Scala fenicia",
            },
        
          ];
          //fine punti interess
         // Create an info window to share between markers.
         const infoWindow = new InfoWindow();
        
        // Create the markers.
        tourStops.forEach(({ position, title }, i) => {
          const pin = new PinElement({
            glyph: `${i + 1}`,
            scale: 1,
          });
          const marker = new AdvancedMarkerElement({
            position,
            map,
            title: `${i + 1}. ${title}`,
            content: pin.element,
            gmpClickable: true,
          });
        
          // Add a click listener for each marker, and set up the info window.
          marker.addListener("click", ({ domEvent, latLng }) => {
            const { target } = domEvent;
        
            infoWindow.close();
            infoWindow.setContent(marker.title);
            infoWindow.open(marker.map, marker);
          });
        
        });
        
        //////////////////////           GEOLOCATION
        //locationButton
        const locationButton = document.createElement("Button");
        
          //img logo posizione
          const flagImg = document.createElement('img');
            flagImg.src = 'images/flag.gif';
            flagImg.style ="height:20px"
            /*
            const pin = new PinElement({
            glyph: `${i + 1}`,
            scale: 1,
          });
          const marker = new AdvancedMarkerElement({
            position,
            map,
            title: `${i + 1}. ${title}`,
            content: pin.element,
            gmpClickable: true,
          });*/
        
          locationButton.textContent = "Current Location";
          locationButton.classList.add("custom-map-control-button");
        
          map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
          locationButton.addEventListener("click", () => {
            
            // Try HTML5 geolocation.
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  };
                  console.log(pos)
        
        
         const beachFlagMarkerView = new AdvancedMarkerElement({
            map,
            position: pos,
            content: flagImg,
            title: 'A marker using a custom PNG Image',
          });
        
          /*
                  infoWindow.setPosition(pos);
                  infoWindow.setContent("Location found.");
                  infoWindow.open(map);
                  */
                  map.setCenter(pos);
                },
                () => {
                  handleLocationError(true, infoWindow, map.getCenter());
                },
              );
            } else {
              // Browser doesn't support Geolocation
              handleLocationError(false, infoWindow, map.getCenter());
            }
          });
          
        }
        
        initMap();
        
         

        
                let i=0;
                document.addEventListener('DOMContentLoaded', function() {
            const imgElement = document.getElementById('imagelogo');
            imgElement.addEventListener('click', function() {
                imgElement.src = `images/logo2(${i}).gif`; 
                i++// Change this to the new image URL
            });
        });
        
        
        //                <i id="cellular" class="fas fa-phone"></i>   
        //             <i id="wazap" class="fab fa-whatsapp"></i></i> 
        document.addEventListener('DOMContentLoaded', function() {
        
            // IMPOSTAZIONE LINGUA
            const userLang = navigator.language || navigator.userLanguage;
            const lingua=new Intl.DateTimeFormat().resolvedOptions().locale ;
            
     
        // Controlla se la lingua è italiana o inglese
        if (lingua.startsWith('it')) {
            // Se la lingua è italiana, reindirizza alla versione italiana
           if(!window.location.href.includes('index-IT') ){
            window.location.href = 'index-IT.html';
           }
           
          console.log('IT LINGUA');
        } else if (lingua.startsWith('en')) {
            // Se la lingua è inglese, reindirizza alla versione inglese
           // window.location.href = 'https://www.caprirentascooter.com/en';
           localStorage.setItem('selectedLanguage', true);
           console.log('ENG LINGUA')
        } else {
          localStorage.setItem('selectedLanguage', true);
          localStorage.setItem('language', lingua);
            // Se la lingua non è né italiana né inglese, reindirizza alla versione inglese di default
           // window.location.href = 'https://www.caprirentascooter.com/en';
        }
   
            setTimeout(function() {
                    // conf codificatinbasesessanta4 
                    const phoneNumber = atob('KzM5MzI4Mzc3MTIxNw=='); // 
                    const wazapp = atob('KzM5MzcxNTE1MDQ2OA=='); // 
                    const mela='caprirentascooter@gmail.com';
        
                    const phoneLink = document.getElementById('phoneLink');
                    phoneLink.href = `tel:${phoneNumber}`;
        
                    const whatsappLink = document.getElementById('whatsappLink');
                    whatsappLink.href = `https://wa.me/${wazapp}`;
        
                    const videoWrapper = document.querySelector("video");

                    document.getElementById('sendRequest').addEventListener('click', function() {
                      const name = document.getElementById('nename').value;
                      const startDate = document.getElementById('nesdate').value;
                      const startTime = document.getElementById('neshour').value;
                      const endDate = document.getElementById('needate').value;
                      const endTime = document.getElementById('nehour').value;
                      const communication = document.getElementById('communication').value;
      
                      console.log(name, startDate, startTime, endDate, endTime, communication);
                      if (!name || !startDate || !startTime || !endDate || !endTime || !communication) {
                          alert('Please fill out all fields.');
                          return;
                      }
      
                    const message = `Hello, I would like to book a scooter. 
              Name: ${name}
              Start Date: ${startDate} at ${startTime}
              End Date: ${endDate} at ${endTime}
              Preferred Communication: ${communication}`;
      
                     if(communication === 'email') {

                        window.location.href = `mailto:${mela}?subject=Booking Request&body=${encodeURIComponent(message)}`;
                      
                     }
                      
                      const whatsappUrl = `https://api.whatsapp.com/send?phone=${wazapp}&text=${encodeURIComponent(message)}`;

                      //clena the page for sent request!
                      // Clear the form fields
                      // Display a confirmation message
                      const formContainer = document.getElementById('newsletterForm');
                      const confirmationMessage = document.createElement('div');
                      confirmationMessage.className = message;
                      confirmationMessage.textContent = 'Your request has been sent successfully!';
                      formContainer.innerHTML = ''; // Clear the form container
                      formContainer.appendChild(confirmationMessage);
                      
                      /*
                      <a href="mailto:esempio@dominio.com?subject=Oggetto%20di%20prova&body=Corpo%20del%20messaggio%20di%20prova">Invia email</a>
                      document.getElementById('nename').value = '';
                      document.getElementById('nesdate').value = '';
                      document.getElementById('neshour').value = '';
                      document.getElementById('needate').value = '';
                      document.getElementById('nehour').value = '';
                      document.getElementById('communication').value = '';

                      // Display a confirmation message
    opacity: 0.2;
                       // Assuming the form is inside a container with this ID
          
                      formContainer.appendChild(confirmationMessage);

                      // Optionally, add a button to return to the form
                      const returnButton = document.createElement('button');
                      returnButton.textContent = 'Send Another Request';
                      returnButton.className = 'return-button';
                      returnButton.addEventListener('click', () => {
                        window.location.reload(); // Reload the page to reset the form
                      });
                      formContainer.appendChild(returnButton);
                      // fine cleanpage 
                      */

                      window.open(whatsappUrl, '_blank');
                  });
        
                }, 2000); // 2000 milliseconds = 2 seconds
            });
        
      

            // form contatto wahtz


           let sendRequest = ()=>{

        
            
          }