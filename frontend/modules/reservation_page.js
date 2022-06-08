import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const url=`${config.backendEndpoint}/reservations`;
    const data=await fetch(url);
    const result=await data.json();
    console.log(result);
    return result;
  }
  // Place holder for functionality to work in the Stubs
  catch{
  return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  if(reservations.length>0)
   { document.getElementById("no-reservation-banner").style.display="none";
   document.getElementById("reservation-table-parent").style.display="block";  
  }
  else
    {document.getElementById("no-reservation-banner").style.display="block";
      document.getElementById("reservation-table-parent").style.display="none";  
  }

 for(let i=0;i<reservations.length;i++)
 {  var date=new Date(reservations[i].date);
    var time=new Date(reservations[i].time);
    var month=time.toLocaleString(undefined,{month:"long"})
    var day=time.getDate();
    var year=time.getFullYear();
    var booktime=time.toLocaleString("en-IN").split(" ");
    
    let k=reservations[i].adventure

   var tr=document.createElement("tr");
   tr.innerHTML=`<td>${reservations[i].id}</td>
   <td>${reservations[i].name}</td>
   <td>${reservations[i].adventureName}</td>
   <td>${reservations[i].person}</td>
   <td>${date.toLocaleDateString("en-IN")}</td>
   <td>${reservations[i].price}</td>
   <td>${day} ${month} ${year}, ${booktime[1]} ${booktime[2]}</td>
   <td id="${reservations[i].id}"><a href="../detail/?adventure=${k}">
   <button class="reservation-visit-button">Visit Adventure</button>
  </a></td>`
  
  document.getElementById("reservation-table").append(tr);
 }

}

export { fetchReservations, addReservationToTable };
