// const URL = `https://api.unsplash.com/search/photos/?client_id=13AwInbT_rWPWS95Xar1sChMkqJkT8WGJ3o5dI-8oTQ&query=${addingInQuery}`;


// let queries = document.querySelector('.queries');
// let search = document.querySelector('.buttonHere');
// let inputData = document.querySelector('.inputs');
// let addingInQuery;
// let searchedData = () => {
//     let searchedItem = inputData.value.trim();
//     if (searchedItem !== '') {
//         console.log(searchedItem);
//         inputData.value = '';
//         addingInQuery = searchedItem;
//         addImagesToGallery(); 
//     } else {
//         console.log('Please enter a search term.');
//     }
// }


// const getData = async () => {
//     const URL = `https://api.unsplash.com/search/photos/?client_id=13AwInbT_rWPWS95Xar1sChMkqJkT8WGJ3o5dI-8oTQ&query=${addingInQuery}`;
//     try {
//         let response = await fetch(URL);
//         let data = await response.json();

//         if (data.results && data.results.length > 0) {
//             return data.results;
//         } else {
//             console.log('No results found.');
//             return [];
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return [];
//     }
// }

// const createNewImage = (imageUrl) => {
//     const div = document.createElement('div');
//     const img = document.createElement('img');
//     const downloadImg = document.createElement('button');

//     div.classList.add('grid-item');
//     img.src = imageUrl;
//     img.alt = 'Unsplash Image';

//     downloadImg.textContent = 'Download';
//     downloadImg.classList.add('download-btn');
//     downloadImg.addEventListener('click' , ()=>{
//         downloadImage(imageUrl);
//     })

//     div.appendChild(downloadImg);
//     div.appendChild(img);
//     return div;
// }

// const downloadImage=(imageUrl)=>{
//   const link = document.createElement('a');
//   link.href = imageUrl;
//   link.target = '_blank';
//   link.download = 'unsplash_image.jpg';


//   link.click();
// }

// const addImagesToGallery = async () => {
//     try {
//         const gallery = document.querySelector('.grid-container');
//         gallery.innerHTML = ''; // Clear existing images before adding new ones

//         const imageData = await getData();

//         imageData.forEach(photo => {
//             const imageUrl = photo.urls.small;
//             const imageDiv = createNewImage(imageUrl);
//             gallery.appendChild(imageDiv);
//         });
//     } catch (error) {
//         console.error('Error adding images to gallery:', error);
//     }
// };
// addImagesToGallery();
// search.addEventListener('click', searchedData);



let queries = document.querySelector('.queries');
let search = document.querySelector('.buttonHere');
let inputData = document.querySelector('.inputs');
let queryData;
let page = 1;

const searchedData = () =>{
    let searchedItem = inputData.value.trim();
    if(searchedItem !== ''){
        console.log(searchedItem);
        inputData.value = '';
        queryData = searchedItem;
        page = 1;
        addImagesToGallery();
    }
    else{
        console.log("Please put what you want to search");
    }

}

const getData =async ()=>{
    const perPage= 10;
  const URL = `https://api.unsplash.com/search/photos/?client_id=13AwInbT_rWPWS95Xar1sChMkqJkT8WGJ3o5dI-8oTQ&query=${queryData}&page=${page}&per_page=${perPage}`
  try{
    let response = await fetch(URL);
    let data = await response.json();
    if(data.results && data.results.length > 0 ){
         return data.results;
    }
    else{
        console.log("Error while fetching data");
        return [];
    }
  }
   catch{
        console.log('URL problem');
   }

//    addImagesToGallery();
}


const createImg =(ImageURL)=>{
    const div = document.createElement('div');
    const img = document.createElement('img');

    div.classList.add('grid-item');
    img.src =ImageURL;
    img.alt = 'images';

    div.appendChild(img);
    return div;

}

const addImagesToGallery = async ()=>
{
   try{
    const gallery = document.querySelector('.grid-container');
    gallery.innerHTML = '';

    let imageData = await getData();
    imageData.forEach(photo =>{
        const imageUrl = photo.urls.small;
        const imageDiv = createImg(imageUrl);
        gallery.appendChild(imageDiv);
    });
   }
   catch (error) {
    console.log("error",error)
   }
  
}

const loadMoreImages = () =>{
    page++;
    addImagesToGallery();
}
addImagesToGallery();
search.addEventListener('click' , searchedData);

const loadMoreButton = document.createElement('button');
loadMoreButton.textContent ='Load More';
loadMoreButton.classList.add('loadTakebutton')
loadMoreButton.addEventListener('click' , loadMoreImages);
document.body.appendChild(loadMoreButton);
