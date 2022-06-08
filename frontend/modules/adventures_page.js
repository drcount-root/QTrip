import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  console.log(search)
      let params = new URLSearchParams(search);
      console.log(params.get('city'))
     return params.get('city')

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
 
  try{
    const data= await fetch(config.backendEndpoint+`/adventures/?city=${city}`);
   return await data.json();
    
   }
  catch{
    return null;

  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  
  for(let i=0;i<adventures.length;i++)
  {
    var div=document.createElement("div");
    div.setAttribute("class","col-12 col-sm-6 col-lg-3 mb-3");
    var a=document.createElement("a");
    a.setAttribute("id",`${adventures[i].id}`);
    a.href=`detail/?adventure=${adventures[i].id}`;
    var div1=document.createElement("div");
    div1.setAttribute("class","card activity-card");
    var img=document.createElement("img");
    img.src=adventures[i].image;
    var div2=document.createElement("div");
    var cat=document.createElement("div");
    cat.setAttribute("class","category-banner");
    cat.innerText=adventures[i].category;
    div2.setAttribute("class","card-body col-md-12 mt-2");
    var div3=document.createElement("div");
    div3.setAttribute("class","d-flex justify-content-between");
    var p1=document.createElement("p");
    p1.innerText=adventures[i].name;
    var p2=document.createElement("p");
    p2.innerText="₹"+adventures[i].costPerHead;
    var div4=document.createElement("div");
    div4.setAttribute("class","d-flex justify-content-between");
    var p3=document.createElement("p");
    p3.innerText="Duration";
    var p4=document.createElement("p");
    p4.innerText=adventures[i].duration+" Hours";
    div4.append(p3);
    div4.append(p4);

    div3.append(p1);
    div3.append(p2);
    div2.append(div3);
    div2.append(div4);
    div1.append(img);
    div1.append(cat);
    div1.append(div2);
    a.append(div1);
    div.append(a);
    document.getElementById("data").append(div);

  }
  
  

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  console.log(list);
  console.log(low);
  console.log(high);
  let filteredList=list.filter(function(e){
    return (e.duration>=low && e.duration<=high);
  })
  console.log(filteredList);
  return filteredList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  let filteredList=[];
  console.log(list);
  list.filter(function (e) {
    if(categoryList.includes(e.category))
      filteredList.push(e);   
      });

      return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  

  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  let filteredlist =[]
  let arr=filters["duration"].split("-")

  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
if(filters["category"].length>0&&filters["duration"].length>0){

 filteredlist=filterByCategory(list,filters.category)
 filteredlist=filterByDuration(filteredlist,parseInt(arr[0]),parseInt(arr[1]))
}else if(filters["category"].length>0){
  filteredlist=filterByCategory(list,filters.category);
}else if(filters["duration"].length>0){
 filteredlist=filterByDuration(list,parseInt(arr[0]),parseInt(arr[1]))
}else{
  return list;
}
  // Place holder for functionality to work in the Stubs
 return filteredlist;
  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(window.localStorage.getItem('filters'));
  return null;

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  
   let categoryList=filters["category"];
   let li=[];
  for(let i=0;i<categoryList.length;i++)
  {
   // console.log(categoryList[i]);
    li.push(categoryList[i]);
  }
  console.log(li);
  for(let i=0;i<li.length;i++)
  {
    console.log(li[i]);
    var div=document.createElement("div");
    div.setAttribute("class","category-filter");
    div.innerText=li[i];
    document.getElementById("category-list").append(div);
  }

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
