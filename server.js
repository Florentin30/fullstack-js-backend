// Démarrage du serveur Node JS (coté Serveur)

console.log("Mon premier Serveur JS"); // Affiche le nom du serveur sur la console

const express_module = require("express"); // Déclare la variable express, le module npm à appeler

const server = express_module(); // Déclare la variable server qui utilise la variable express

server.listen(4000, () => {
    console.log("Le serveur est démarré."); // Affiche la confirmation que le serveur a bien démarré
    console.log(`${clients.length} clients enregistrés.`); // Affiche le nombre de clients enregistrés sur le serveur
})

server.use(express_module.json()); // Traitement par défault de la requete (systématique, à faire)

server.use( (req,res, next)=> { // Traitement par défault de la réponse (systématique, à faire)
    res.header("Access-Control-Allow-Origin", "*"); // Autorise n'importe quel application, sur n'importe quel domaine, à interagir avec l'API
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Précise le Content Type coté serveur
    res.contentType("application/json"); // Déclare que la réponse sera au format JSON
    next();
});

server.get("/bonjour", (req, res, next)=> { // Quand cette URL complète est recherchée, avec une requete GET
    res.contentType ="text/plain"; // On va renvoyer du texte brut (en dessous)
    res.send("Coucou toto"); // Alors l'API répond cela
});

server.get("/clients", (req, res, next)=> { // Quand cette URL complète est recherchée, avec une requete GET
    res.send( JSON.stringify(clients)); // Transforme le texte en fichier JSON
});

server.get("/clients/:id", (req, res, next)=> { // Quand cette URL complète est recherchée, avec l'ID du client, avec une requete GET
    let id = req.params.id; // On recheche ici l'ID : 0, 1, 2 et 3 ...
    let client = read(id); // On lit les infos
    res.send( JSON.stringify(client)); // On les envoie
});

server.post("/clients", (req, res, next)=> { // Quand cette URL complète est recherchée, avec l'ID du client, avec une requete GET
    let client = req.body;
    create(client.nom, client.prenom); // Création des éléments nom et prénom
    res.statusCode = 201; // Tout va bien, la donnée est enregistrée "created"
    res.send(); // Cloture et envoi d'une réponse vide
});


// Gestion des données clients

let ID = 0 ; // Compteur, on démarre à 0

class Client {
    constructor(nom, prenom){
        this.id = ID++;
        this.nom = nom.toUpperCase(); // Toujours en majuscule
        this.prenom = prenom;
    }
}

const clients = [] // Pour initialiser le jeu de données, on se sert de JS pour stocker des données, Données Mock up sur un fichier à part, comme sur les événements Avant Après
    clients.push(new Client("Ainslie", "Ben"));
    clients.push(new Client("Robert", "Chris"));
    clients.push(new Client("Pierre", "Donald"));


    
// CRUD : Create, read, update, delete

function create(nom, prenom){
    clients.push(new Client(nom, prenom));
}

function read(id){
    return clients.find(cli => cli.id == id);
}

function readAll(){
    return clients;
}
