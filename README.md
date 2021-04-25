# FlopBox

video démo : https://youtu.be/pySbuu2Q-bU

REST API for FTP Server in Deno js

# IMPORTANT 

Cette version de l'API est prévu pour l'agent [flopbox](https://gitlab-etu.fil.univ-lille1.fr/phu/flopbox-agent-fernandes-phu).
Une route checksum a été ajouté et l'upload des fichiers et désormais possible.
La route checksum permet de lister tous les fichier et de renvoyé leur path ainsi qu'un hash en sha-256 du fichier.
Ce hash nous permet de comparer dans l'agent les fichiers qui ont changé par rapport au locaux.

Vous pouvez tester l'application directement via postman, **il vous suffit d'importer le fichier flopbox.postman_collection** pour avoir toutes les requetes.

Pour executer l'application il suffit d'aller dans `/build` et executer l'executable qui convient a votre OS **(.exe et .sh disponible)**.
**Veuillez vous assurer que le port 8080 est disponible**

# Installation & Exécution

- Installer [deno](https://deno.land/#installation)

- Exécuter `deno run --allow-net --allow-write --allow-read --unstable app.ts`

- Pour simplifier l'execution de script il vous suffit d'installer [velociraptor](https://deno.land/x/velociraptor@1.0.0-beta.16#install) 

- Pour lancer les tests : `vr test`

- Pour lancer l'appli : `vr start`

- Pour compiler un executable dans le dossier build : `vr build` 

- Pour generer la doc en json : `vr doc` 

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

`deno test --allow-net --allow-write --allow-read --unstable tests/`
<br> ou 
<br> `vr test` 

# Code Samples :

# Documentation :

la documentation est sous format json dans `doc/doc.json`. <br>
Pour voir la documentation en format html il suffit de lancer la commande {à venir}

# Librairies utilisées :

- [Client FTP](https://deno.land/x/ftpc@v1.2.0/)
- [File db](https://deno.land/x/filedb/)
- [Opine](https://github.com/asos-craigmorten/opine)
