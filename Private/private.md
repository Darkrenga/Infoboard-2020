<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h1 align="center">Developer Documentation</h3>

  <p align="center">
    The need to know for infoboard development
    <br />
    <br />
  </p>
</p>

## Indhold

* [Bygget med](#bygget-med)
* [For at komme i gang](#for-at-komme-i-gang)
  * [Save Path](#save-path)
  * [Branch](#branch)
* [MVC](#mvc)
  * [Model](#model)
  * [View](#view)
  * [Controller](#controller)


## Bygget Med
Vi bygger projektet i disse teknologier, da det skal udvikles på skoles server.
* HTML
* JS
* Pre-compiled css - (SCSS)



## For at komme I gang
For at komme i gang med projektet skal du gøre
### Save path
``` JSON
"savePath": "~/../../css/"
```

### Branch
Før du går i gang skal du lige lave din egen branch, med navn over det du skal lave, og assing dig til et issue




<!-- USAGE EXAMPLES -->
## MVC

### Model
Api links
* [Main api - Mediehusets api](https://api.mediehuset.net/)
  * Endpoints:
  * [News](https://api.mediehuset.net/infoboard/news)
    ```JSON
    "id": "3",
    "title": "Standard billede",
    "reference": "",
    "file": "/images/mediehus-splash.png"
    ```
  * [Media](https://api.mediehuset.net/infoboard/media)
    ```JSON
    "id": "1",
            "title": "Mediehus Projekt i Marts",
            "content": "<p><b>Lorem ipsum dolor sit amet</b></p><p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua </p><ol><li>Pharetra sit amet aliquam id diam maecenas. </li><li>Amet purus gravida quis blandit turpis cursus in hac habitasse. </li><li>Tempor orci dapibus ultrices in iaculis nunc sed augue.<br></li></ol>",
            "timestamp": "1548579600",
            "datetime": "2019-01-27 10:00:00"
    ```
  * [Activities](https://api.mediehuset.net/infoboard/activities)
    ```JSON
    "id": "2345",
    "name": "matematik",
    "friendly_name": "Matematik",
    "classroom": "N112",
    "class": "fiw080120",
    "timestamp": "1605255600",
    "datetime": "13-11-2020 09:20"
    ```
* Weather related
  * [Proxy api](https://cors-anywhere.herokuapp.com/)
  * [Weather api](https://vejr.eu/api.php?location=Aalborg&degree=C%27)
  * [Weather api](https://api.darksky.net/forecast/2f35c97a3f5b8edad9aecb3fa76058cb/57.0488,9.9217)
* 

### View

### Controller







<!--Beskriv hvad der skal ligge i private-->

## Hvilke filer hører hjemme herinde??
I Private hører alt det som igen andre har brug for at røre når du aflevere det til kunden

<br />

Hvad skal der stå i denne readme iforhold til den anden
<br />
I denne .md fil skal der stå ting som de andre du arbejder sammen med skal taje højde for, men du ikke nødvendigvis mener en kunde skal have. Det kunne være ting som jeres MVC, API-keys, endpoints osv.



* Sass Compiler settings
  * I skal ændre jeres path i sass compiler til
```JSON
"savePath": "~/../../css/"
```
