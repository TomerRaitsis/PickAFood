let apiKey = '4cc5b01db0324499a6f0b85905a0c062';

var occur = 0; // Counts the amount of ingridients the user eneterd (max allowed is 3)

// Takes the data the user entered and gets the informaion from 'spoonacular' api (with fetch) and shows it on the screen
function findRecipe() {
    let diet = (document.getElementById("diets").value).toLowerCase();
    let mealType = (document.getElementById("meal types").value).toLowerCase();
    let cuisine = (document.getElementById("Cuisines").value).toLowerCase();
    let ingridients = (document.getElementById("ingidientList").innerHTML).replace(/\s/g, '').toLocaleLowerCase(); // /\s/g is to remove the spaces

    linkToFetch = 'https://api.spoonacular.com/recipes/random?number=1&tags=';

    if (diet != 'none' && diet != 'None') { linkToFetch += diet + ','; }
    if (mealType != 'none' && diet != 'None') { linkToFetch += mealType + ','; }
    if (cuisine != 'none' && diet != 'None') { linkToFetch += cuisine + ','; }
    if (ingridients != 'none' && diet != 'None') { linkToFetch += ingridients; }

    linkToFetch += '&apiKey=' + apiKey;

    console.log(linkToFetch);

    fetch(linkToFetch)
        .then(response => response.json())
        .then(response => randomRecipe(response))
        .catch(err => {
            console.error(err);
            alert('There is no recipe with those features');
        });
}


// Builts an HTML document and shows it to the user. also prints to the console the response from the fetch in JSON format
// and a string of the HTML data  
function randomRecipe(data) {
    console.log(data);
    let output = '<div class="recipe">';

    output += '<h1>' + data.recipes[0].title + '</h1>'

    output += '<h3>' + ((data.recipes[0].dishTypes).toString()).replaceAll(",", ", ") + '</h3>'

    output += '<h3>' + (data.recipes[0].diets).toString().replaceAll(",", ", ") + '</h3>'

    output += '<div class="image"><img src="' + data.recipes[0].image + '"></div>';

    ingridientsOutput = '<ul>';
    for (const ing of data.recipes[0].extendedIngredients) {
        ingridientsOutput += '<li>' + ing.original + '</li>';
    }
    ingridientsOutput += '</ul>';

    output += '<div class="recipe_ingridients"><h2>Ingridients:<br/>' + ingridientsOutput + '</h2>';

    stepsOutput = '<ul>';
    for (const step of data.recipes[0].analyzedInstructions[0].steps) {
        stepsOutput += '<li>' + step.step + '</li>';
    }
    stepsOutput += '</ul>';

    output += '<h2>Recipe (step by step):<br/>' + stepsOutput + '</h2></div>';

    output += '<div class="buttons"><button class="goBack" id="showall">Show Full Recipe</button><br/><button class="goBack" onclick="window.location.reload();" >Go Back</button></div></div>'

    console.log(output);

    $('.content').html(output);
    $('.recipe_ingridients').hide();

    let flag = false;
    $('#showall').click(function () {
        if (!flag) {
            $('.recipe_ingridients').slideDown();
            $('#showall').text('Hide Full Recipe');
        }
        else {
            $('.recipe_ingridients').slideUp();
            $('#showall').text('Show Full Recipe');
        }
        flag = !flag;
    });
}

// Add an ingridient to the user's list (max is 3 ingridients)
function addIngridient() {
    // If there are already 3 ingridients it will replays the one that entered first 
    if (occur == 3) {
        let temp = (document.getElementById("ingidientList").innerHTML).split(',', 3);
        temp[2] = temp[1];
        temp[1] = temp[0];
        temp[0] = document.getElementById("ingridient").value;
        temp = temp.join(', ');
        console.log(temp);
        $('#ingidientList').html(temp);
    }

    else if (document.getElementById("ingridient").value != '') {
        $('#ingidientList').append(document.getElementById("ingridient").value + ', ');
        occur++;
    }
    $('#ingridient').val('');
}

function clearIngridients() {
    $('#ingidientList').text('');
    occur = 0;
}

// Shows the diet Description os a diet according to the users choice
$("#diets").on("change", function () {
    let val = (document.getElementById("diets").value);
    switch (val) {
        case 'Gluten-Free':
            document.getElementById('dietDescirption').innerHTML = 'Eliminating gluten means avoiding wheat, barley, rye, and other gluten-containing grains and foods made from them (or that may have been cross contaminated).';
            break;

        case 'Ketogenic':
            document.getElementById('dietDescirption').innerHTML = 'The keto diet is based more on the ratio of fat, protein, and carbs in the diet rather than specific ingredients. Generally speaking, high fat, protein-rich foods are acceptable and high carbohydrate foods are not. The formula we use is 55-80% fat content, 15-35% protein content, and under 10% of carbohydrates.';
            break;

        case 'Vegetarian':
            document.getElementById('dietDescirption').innerHTML = 'No ingredients may contain meat or meat by-products, such as bones or gelatin.';
            break;
        case 'Lacto-Vegetarian':
            document.getElementById('dietDescirption').innerHTML = 'All ingredients must be vegetarian and none of the ingredients can be or contain egg.';
            break;
        case 'Ovo-Vegetarian':
            document.getElementById('dietDescirption').innerHTML = 'All ingredients must be vegetarian and none of the ingredients can be or contain dairy.';
            break;
        case 'Vegan':
            document.getElementById('dietDescirption').innerHTML = 'No ingredients may contain meat or meat by-products, such as bones or gelatin, nor may they contain eggs, dairy, or honey.';
            break;
        case 'Pescetarian':
            document.getElementById('dietDescirption').innerHTML = 'Everything is allowed except meat and meat by-products - some pescetarians eat eggs and dairy, some do not.';
            break;
        case 'Paleo':
            document.getElementById('dietDescirption').innerHTML = 'Allowed ingredients include meat (especially grass fed), fish, eggs, vegetables, some oils (e.g. coconut and olive oil), and in smaller quantities, fruit, nuts, and sweet potatoes. We also allow honey and maple syrup (popular in Paleo desserts, but strict Paleo followers may disagree). Ingredients not allowed include legumes (e.g. beans and lentils), grains, dairy, refined sugar, and processed foods.';
            break;
        case 'Primal':
            document.getElementById('dietDescirption').innerHTML = 'Very similar to Paleo, except dairy is allowed - think raw and full fat milk, butter, ghee, etc.';
            break;
        case 'Low-FODMAP':
            document.getElementById('dietDescirption').innerHTML = 'FODMAP stands for "fermentable oligo-, di-, mono-saccharides and polyols". Our ontology knows which foods are considered high in these types of carbohydrates (e.g. legumes, wheat, and dairy products)';
            break;
        case 'Whole30':
            document.getElementById('dietDescirption').innerHTML = 'Allowed ingredients include meat, fish/seafood, eggs, vegetables, fresh fruit, coconut oil, olive oil, small amounts of dried fruit and nuts/seeds. Ingredients not allowed include added sweeteners (natural and artificial, except small amounts of fruit juice), dairy (except clarified butter or ghee), alcohol, grains, legumes (except green beans, sugar snap peas, and snow peas), and food additives, such as carrageenan, MSG, and sulfites.';
            break;
        default:
            document.getElementById('dietDescirption').innerHTML = '';
            break;
    }
});