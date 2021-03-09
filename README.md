# FlopBox

REST API for FTP Server in Deno js

## Routes :

Servers :
 `POST /Servers`
 
| HTTP Méthodes     |URL    | Description|
|----------------|-------|----------|
|GET		 |  `/`        | Affiche tous les serveurs |
|POST		 |  `/`       | Créer un nouveau server |
|PUT		 |  `/{alias}`    | Mettre à jour l'alias ou l'URL du server |
|GET		 |  `/{alias}/dir/{pathDir}`       | Affiche l'arborscence d'un repertoire|
|DELETE		 |  `/{alias}/dir/{pathDir}`       | Supprimer un repertoire|
|GET		 |  `/{alias}/{filePah}`       | Télécharger un fichier|
|POST		 |  `/{alias}/{filePah}`       | Envoyer un nouveau fichier |
|PUT		 |  `/{alias}/{filePah}`       | Modifier un fichier existant / Renommer un fichier |
|DELETE		 |  `/{alias}/{filePah}`       | Supprimer un fichier |

<br>

| HTTP Méthodes     |URL    | Description|
|----------------|-------|----------|
|GET		 |  `/`                         | Affiche tous les serveurs |
|POST		 |  `/`                         | Créer un nouveau server |
|PUT		 |  `/{alias}`                  | Mettre à jour l'alias ou l'URL du server |
|GET		 |  `/{alias}/{filePah}`        | Télécharger un fichier ou un répertoire|
|POST		 |  `/{alias}/{filePah}`        | Envoyer un nouveau fichier ou repertoire |
|PUT		 |  `/{alias}/{filePah}`        | Modifier / Renommer un fichier ou un répertoire existant |
|DELETE		 |  `/{alias}/{filePah}`        | Supprimer un fichier |