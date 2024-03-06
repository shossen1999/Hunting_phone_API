

const loadPhone = async(searchText='13',isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones=data.data;
  displayPhones(phones,isShowAll)
//   console.log(phones);
}

const displayPhones = (phones,isShowAll) =>{
  // console.log(phones);

    const phoneContainer=document.getElementById('phone-container')
    // clear phone-container card before adding new cards

// age ja chilo ta remove kore dibe though i did not understand it well 

    phoneContainer.textContent='';
    
    // display show all button if there are more than 12 phones 

   const showAllContainer=document.getElementById('show-all-container')
   if(phones.length>12 && !isShowAll){
     showAllContainer.classList.remove('hidden');

   }
   else{
    showAllContainer.classList.add('hidden');
 }

//  console.log('isShowAll',isShowAll)
    // display only first 12 phones if not show all

if(!isShowAll){
  phones=phones.slice(0,12);

}    
//   console.log(phones);
  phones.forEach(phone =>{
    // console.log(phone);


    // create div
    const phoneCard=document.createElement('div');
    phoneCard.classList= `card p-2 bg-gray-100 shadow-xl`;
    // set innerHtml
    phoneCard.innerHTML=`  
      <figure>
      <img src="${phone.image}" />
      </figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-center">
        <button onclick="handleShowDetail('${phone.slug}')
      " class="btn btn-primary">Show Details</button>
      </div>
    </div>
    `;
    // appendChild
    phoneContainer.appendChild(phoneCard);
  } );

  // hide loading spinner
  toggleLoadingSpinner(false);
}
 
// handleShowDetails
const handleShowDetail=async(id)=>{
  // console.log('clicked show details,',id)
  // load single phone data
  const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data= await res.json()
  const phone=data.data;
  showPhoneDetails(phone);
}


// show phone details using modal
const showPhoneDetails=(phone)=>{
  console.log(phone);
  const phoneName=document.getElementById('show-detail-phone-name');
   phoneName.innerText=phone.name;

   const showDetailContainer=document.getElementById('show-detail-container');
   showDetailContainer.innerHTML=`
   <div class="flex justify-center items-center"><img src="${phone.image}"/></div>
   <p> <span> Storage:</span>${phone?.mainFeatures?.storage} </p>
  //  <p> <span> GPS:</span>${phone?.others?.GPS || 'No GPS available'} </p>
   <p> <span> GPS:</span>${phone?.others?.GPS ? phone.others.GPS : 'No GPS available'} </p>

   `
  // show the modal
  show_details_modal.showModal();
}


// handle Search button
const handleSearch=(isShowAll)=>{
    // console.log("search handling")
    toggleLoadingSpinner(true);
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    console.log(searchText);
    loadPhone(searchText,isShowAll)
}


const toggleLoadingSpinner=(isLoading)=>{
  const loadingSpinner=document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');

  }
  else{
    loadingSpinner.classList.add('hidden');

  }
}

// handleShowAll()

const handleShowAll=()=>{
  handleSearch(true);

}
loadPhone();