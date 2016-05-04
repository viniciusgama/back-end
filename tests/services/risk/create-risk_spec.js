var frisby = require('frisby');

frisby.create('Create a risk')
   .post('http://localhost:8080/risk', {
      "title": "Chafariz da Rendenção",
      "risk": "Mal Iluminado",
      "date": "10/10/2015",
      "period":"Manhã",
   })
   .expectStatus(201)
   .expectHeaderContains('content-type', 'application/json')
   .expectJSON({
      "title": "Chafariz da Rendenção",
      "risk": "Mal Iluminado",
      "date": "10/10/2015",
      "period":"Manhã",
   })
.toss();
