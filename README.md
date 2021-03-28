# FlopBox

REST API for FTP Server in Deno js

Vous pouvez tester l'application directement via postman, il vous suffit d'importer le fichier flopbox.postman_collection pour avoir toutes les requetes.

Pour executer l'application il suffit d'aller dans `/build` et executer l'executable qui convient a votre OS (.exe et .sh disponible).

# Installation & Exécution

- Installer [deno](https://deno.land/#installation)

- Exécuter `deno app.ts`


## Routes :

Servers :
 `POST /Servers`

| HTTP Méthodes     |URL    | Description|
|----------------|-------|----------|
|GET		 |  `/`                         | Affiche tous les serveurs |
|POST		 |  `/`                         | Créer un nouveau server |
|PUT		 |  `/{alias}`                  | Mettre à jour l'alias ou l'URL du server |
|DELETE		 |  `/{alias}`        | Supprimer un Server de l'api |
|GET		 |  `/{alias}/{path}`        | Télécharger un fichier ou un répertoire|
|POST		 |  `/{alias}/{path}`        | Envoyer un nouveau fichier ou repertoire |
|PUT		 |  `/{alias}/{path}`        | Modifier / Renommer un fichier ou un répertoire existant |
|DELETE		 |  `/{alias}/{path}`        | Supprimer un fichier |

<br>

# Test :

`deno test` 

# Code Samples :

