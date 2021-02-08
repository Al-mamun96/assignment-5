

const resultHeading=document.getElementById('result-heading');
const mealsEl=document.getElementById('meals');

function searchMeals(e){
    e.preventDefault();

    // get search result
    const search=document.getElementById('search');
    const searchResult=search.value;

    //check for empty
    if (searchResult.trim()) {
       fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchResult}`)
       .then(res=>res.json())
       .then(data=>{
        resultHeading.innerHTML=`<h3>${searchResult}</h3>`;
        if (data.meals===null) {
            resultHeading.innerHTML=`<p class="invalid-result">there are no search result</p>`;
        } else {
            mealsEl.innerHTML=data.meals.map(meal=>`
            <div class="meal">
             <img src="${meal.strMealThumb}"/>
             <div class="meal-info" data-mealID="${meal.idMeal}">
           
             </div>
            </div>
            `)
            .join('')
        }
       });
       // clear search text
       search.value='';
    }
   
    else{
        alert('please enter a valid keyword');
    }
}

// fetch meal by id
    function getMealById(mealID){
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`)
        .then(res=> res.json())
        .then(data=>{
            const meal =data.meals[0];
            addMeal(meal);
        });
    }

    // add meal 
    function addMeal(meal){
        const ingredients =[];

        for (let i = 1; i < 10; i++) {
            
            if (meal[`strIngredient${i}`]) {
                ingredients.push(`${meal[`strIngredient${i}`]}`);
            } else{
                break;
            }
            
        }
        
        const singleMeal =document.getElementById('single-meal');
        singleMeal.innerHTML=`
        <div class="meal-details">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}"/>
        <h2>Ingredients</h2>
        <ul>
        ${ingredients.map(ing=> `<li>${ing}</li>`)}
        </ul>
          </div>
        `;
    }
    // add event listener
    const submit=document.getElementById('submit');
    submit.addEventListener('submit',searchMeals);
 
    mealsEl.addEventListener('click',e=>{
    const mealInfo=e.path.find (item=>{
        // console.log(item);
        if (item.classList) {
            return item.classList.contains('meal-info');
        }
        else{
            return false;
        }

    });
    if (mealInfo) {
      const mealID=  mealInfo.getAttribute('data-mealid');
    //   console.log(mealId);
    getMealById(mealID);
    }
    });
