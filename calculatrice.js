
$(document).ready(function() {
    // Fonction pour mettre à jour l'historique
    const mettreAJourHistorique = () => {
        $.ajax({
            type: 'GET', // Utilisation de la méthode GET pour récupérer les données
            url: 'historique.php', // URL du script PHP pour l'historique
            dataType: 'json', // Type de données attendu
            success: function(data) {
                // Réinitialisation de l'historique
                $('#historique').empty();

                // Parcours des données et affichage dans la div
                data.forEach(function(entry) {
                    $('#historique').append(`<p>${entry.operation} = ${entry.resultat} (${entry.date_heure})</p>`);
                });
            },
            error: function(xhr, status, error) {
                console.error('Erreur lors de la récupération de l\'historique:', status, error);
            }
        });
    };

    // Appel initial pour charger l'historique au chargement de la page
    mettreAJourHistorique();

    $("#calculatrice_form").submit(function(event) {
        // On désactive les comportements par défaut
        event.preventDefault();
        $.ajax({
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            data: $(this).serialize(),
        }).done(function(data) {
            $("#ecran").val(data);
            // Mise à jour de l'historique après chaque calcul
            mettreAJourHistorique();
        });
    });
});



const pile = [];

var expression = [];

for (const char of expression) {
    // Si le caractère est un nombre ou une variable, l'ajouter à la pile.
    if (/[0-9]/.test(char) || /[a-zA-Z]/.test(char)) {
      pile.push(char);
    } else if (char === '(') {
      // Si le caractère est une parenthèse ouvrante, la stocker sur la pile.
      pile.push(char);
    } else if (char === ')') {
      // Si le caractère est une parenthèse fermante,
      // tant que le sommet de la pile n'est pas une parenthèse ouvrante,
      // on dépile et on effectue l'opération correspondante.
      while (pile.length > 0 && pile[pile.length - 1] !== '(') {
        const operateur = pile.pop();
        const secondOperande = pile.pop();
        const premierOperande = pile.pop();
        const resultat = eval(premierOperande + operateur + secondOperande);
        pile.push(resultat);
      }
      // On dépile la parenthèse ouvrante.
      pile.pop();
    } else if (/[+\-*/]/.test(char)) {
      // Si le caractère est un opérateur,
      // tant que la pile n'est pas vide et que l'opérateur au sommet de la pile a une priorité plus élevée,
      // on dépile et on effectue l'opération correspondante.
      while (pile.length > 0 && /[+\-*/]/.test(pile[pile.length - 1]) &&
             getPriorite(char) <= getPriorite(pile[pile.length - 1])) {
        const operateur = pile.pop();
        const secondOperande = pile.pop();
        const premierOperande = pile.pop();
        const resultat = eval(premierOperande + operateur + secondOperande);
        pile.push(resultat);
      }
      // On empile l'opérateur.
      pile.push(char);
    }
  }
  
  // On effectue les opérations restantes sur la pile.
  while (pile.length > 0) {
    const operateur = pile.pop();
    const secondOperande = pile.pop();
    const premierOperande = pile.pop();
    const resultat = eval(premierOperande + operateur + secondOperande);
    pile.push(resultat);
  }
  
  // Le résultat final est le dernier élément de la pile.
  const resultat = pile.pop();

  



  function getPriorite(operateur) {
    switch (operateur) {
      case '+':
      case '-':
        return 1;
      case '*':
      case '/':
        return 2;
      default:
        return 0;
    }
  }
  





















//ecouteur d'evenement pour la touche Effacer l'historique
document.getElementById("effacer_historique").addEventListener("click", function() {
    // Fonction pour effacer l'historique
    effacerHistorique();
  });



function effacerHistorique() {

  // Empêcher l'affichage du résultat de l'opération
  $("#ecran").val("");

  // Envoyer une requête AJAX pour effacer l'historique de la base de données
  $.ajax({
    type: "POST",
    url: "effacer_historique.php",
    success: function() {
      // Mettre à jour l'interface pour afficher l'historique vide
      // (par exemple, en effaçant le contenu de la div "historique")
      $("#historique").empty();
     

    },
    error: function(xhr, status, error) {
      // Gérer les erreurs de la requête AJAX
      console.error("Erreur lors de l'effacement de l'historique:", status, error);
    }
  });
}




const touches = [...document.querySelectorAll('.button')] /* La je met les buttons dans un  tableau pour
mieux les manipuler */
console.log(touches) // Pour nous permettre de recuperer tous les bouttons qui etaient dans le html.


/* Ici nous voulons donner le keycode de chaque touche. Et pour le faire nous devons aller dans le fichier
 index.html , creer un attribut qui va s'apeller data-set qui va contenir le key-code.

Pour recuperer le keycode des buttons un par un , on doit utiliser une fonction javascript appelé map .
Donc là on crée une variable qui va recuperer tous les keycodes grace à la fonction map */

const listKeycode = touches.map(element => element.dataset.key) /* data.set.key sert à récuperer la valeur du 
data-set associé à chaque button . Et cette valeur du data-set est le keycode .

Donc la ligne ci-dessus veut dire ceci : Pour tous elements dans le tableu <<touches>> , récupere les un par un ,
ensuite recuperere leur keycode  et tu me retourne les réponses dans le tableau <<ListKeycode>> */


const ecran = document.getElementById('ecran') ;



document.addEventListener('keydown' , (e) =>{
    const val = e.keyCode.toString() // .tostring va permettre que les keycodes soient de type string
    console.log(val , typeof val)
})




const calculer = (val) =>{
    if(listKeycode.includes(val))
    {
        switch(val)
        {
            case '8' :  // 8 car c'est le keycode du button << C >> qui ne s'affiche pas.
                ecran.value= "" ;
                break ;
            
                /*
                case '13' :  // 13 car c'est le keycode du button << = >> qui ne s'affiche pas.

                      const calcul = eval(ecran.textContent) ; // Ici le calcul s'effectue 
                      ecran.textContent = calcul;      */         // Ici le calcul est affiché
                 default:
                    const indexkeycode = listKeycode.indexOf(val)  // indexof cherche dans un tableau l'index d'une valeur
                    const touch = touches[indexkeycode]  //  Là , il me donne la touche associée a l'index 


                    ecran.value = ecran.value + touch.innerHTML ;
                   

        }
    }
}



const b1 = document.getElementById('b1');
const b2 = document.getElementById('b2');
const b3 = document.getElementById('b3');
const b4 = document.getElementById('b4');
const b5 = document.getElementById('b5');
const b6 = document.getElementById('b6');
const b7 = document.getElementById('b7');
const b8 = document.getElementById('b8');
const b9= document.getElementById('b9');
const b10 = document.getElementById('b10');
const b11 = document.getElementById('b11');
const b12 = document.getElementById('b12');
const b13 = document.getElementById('b13');

const b15 = document.getElementById('b15');
const b16 = document.getElementById('b16');
const b17 = document.getElementById('b17');
const b18 = document.getElementById('b18');

const b19 = document.getElementById('b19');
const b20 = document.getElementById('b20');




b1.addEventListener('click' , (e) =>{
    const val = e.target.dataset.key
    console.log(val)
    calculer(val)
})

b2.addEventListener('click' , (e) =>{
    const val = e.target.dataset.key
    console.log(val)
    calculer(val)
})

b3.addEventListener('click' , (e) =>{
    const val = e.target.dataset.key
    console.log(val)
    calculer(val)
}) 

b4.addEventListener('click' , (e) =>{
    const val = e.target.dataset.key
    console.log(val)
    calculer(val)
}) 
   
   
b5.addEventListener('click' , (e) =>{
    const val = e.target.dataset.key
    console.log(val)
    calculer(val)
}) 

b6.addEventListener('click' , (e) =>{
    const val = e.target.dataset.key
    console.log(val)
    calculer(val)
}) 


b7.addEventListener('click' , (e) =>{
    const val = e.target.dataset.key
    console.log(val)
    calculer(val)
}) 

b8.addEventListener('click' , (e) =>{
    const val = e.target.dataset.key
    console.log(val)
    calculer(val)
}) 

b9.addEventListener('click' , (e) =>{
    const val = e.target.dataset.key
    console.log(val)
    calculer(val)
}) 

b10.addEventListener('click' , (e) =>{
    const val = e.target.dataset.key
    console.log(val)
    calculer(val)
}) 

b11.addEventListener('click' , (e) =>{
    const val = e.target.dataset.key
    console.log(val)
    calculer(val)
}) 

b12.addEventListener('click' , (e) =>{
    const val = e.target.dataset.key
    console.log(val)
    calculer(val)
}) 

b13.addEventListener('click' , (e) =>{
    const val = e.target.dataset.key
    console.log(val)
    calculer(val)
}) 



b15.addEventListener('click' , (e) =>{
    const val = e.target.dataset.key
    console.log(val)
    calculer(val)
}) 


b16.addEventListener('click' , (e) =>{
    const val = e.target.dataset.key
    console.log(val)
    calculer(val)
}) 

b17.addEventListener('click' , (e) =>{
    const val = e.target.dataset.key
    console.log(val)
    calculer(val)
}) 

b18.addEventListener('click' , (e) =>{
    const val = e.target.dataset.key
    console.log(val)
    calculer(val)
}) 


b19.addEventListener('click', () => {
    ecran.value += '(';
  });
  
  b20.addEventListener('click', () => {
    ecran.value += ')';
  });




window.addEventListener('error' , (e) =>{
    alert("erreur opearaion invalide" + e.message) ;
})
