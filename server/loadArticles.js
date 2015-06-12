Meteor.startup(function () {
    if (Articles.find().count() === 0) {

        var articles =[];
        var articleTemplate = {
          name: 'This Must Be The Place',
          imgUrl : 'img/karibik.gif',
          description: 'A beach is a landform along the coast of an ocean, sea, lake or river. It usually consists of loose particles, which are often composed of rock, such as sand, gravel, shingle, pebbles, or cobblestones.',
          colorScheme: "21d0df",
          bgColor: "01121B",
          date: "01 | 15",
          sections: [
            {
              name: 'Mein eigenes Paradies',
              shortName: 'Diy Inseln',
              footerName: 'PARADIES',
              type: 'text',
              description: "To hope means to be ready at every moment for that which is not yet born, and yet not become desperate if there is no birth in our lifetime.",
              position: 5,
              hexagonImgUrl: 'img/beach.png',
              menuUrl: "img/Article1/SpiralIsland.png",
              content:{
                article: "The mother-child relationship is paradoxical and, in a sense, tragic. It requires the most intense love on the mother's side, yet this very love must help the child grow away from the mother, and to become fully independent.",
                audio : "",
                video: "",
                imgUrls:{
                  first: "someImg",
                }
              }
            },
            {
              name: 'Mein eigenes Paradies',
              shortName: 'RICHARD IOWA',
              footerName: 'PARADIES',
              type: 'text',
              description: "To hope means to be ready at every moment for that which is not yet born, and yet not become desperate if there is no birth in our lifetime.",
              position: 4,
              hexagonImgUrl: 'img/beach.png',
              menuUrl:"img/Article1/RichardIowa.png",
              content:{
                article: "The mother-child relationship is paradoxical and, in a sense, tragic. It requires the most intense love on the mother's side, yet this very love must help the child grow away from the mother, and to become fully independent.",
                audio : "",
                video: "",
                imgUrls:{
                  first: "someImg",
                }
              }
            },
            {
              name: 'Mein eigenes Paradies',
              shortName: 'MATHEW ALBANES',
              footerName: 'PARADIES',
              type: 'text',
              description: "To hope means to be ready at every moment for that which is not yet born, and yet not become desperate if there is no birth in our lifetime.",
              position: 3,
              hexagonImgUrl: 'img/beach.png',
              menuUrl:"img/Article1/MathewAlbanes.png",
              content:{
                article: "The mother-child relationship is paradoxical and, in a sense, tragic. It requires the most intense love on the mother's side, yet this very love must help the child grow away from the mother, and to become fully independent.",
                audio : "",
                video: "",
                imgUrls:{
                  first: "someImg",
                }
              }
            },
            {
              name: 'Mein eigenes Paradies',
              shortName: 'Diy Inseln',
              footerName: 'PARADIES',
              type: 'text',
              description: "To hope means to be ready at every moment for that which is not yet born, and yet not become desperate if there is no birth in our lifetime.",
              position: 7,
              hexagonImgUrl: 'img/beach.png',
              menuUrl:"img/Article1/DiyInseln.png",
              content:{
                article: "The mother-child relationship is paradoxical and, in a sense, tragic. It requires the most intense love on the mother's side, yet this very love must help the child grow away from the mother, and to become fully independent.",
                audio : "",
                video: "",
                imgUrls:{
                  first: "someImg",
                }
              }
            }
          ]
        };
        var anotherOne = {
          name: 'Hawaii is just Awesome',
          imgUrl : 'img/karibik.gif',
          description: 'As the year comes to an end, the Hawaiian islands are enjoying some standbys: spontaneous rainbows, days of powerful surf pulsed with days of calm, cradling waters.',
          colorScheme: "21d0df",
          bgColor: "ea5548",
          date: "05 | 15",
          sections: [
            {
              name: 'Mein eigenes Paradies',
              shortName: 'Diy Inseln',
              footerName: 'PARADIES',
              type: 'text',
              description: "To hope means to be ready at every moment for that which is not yet born, and yet not become desperate if there is no birth in our lifetime.",
              hexagonImgUrl: 'img/beach.png',
              content:{
                article: "The mother-child relationship is paradoxical and, in a sense, tragic. It requires the most intense love on the mother's side, yet this very love must help the child grow away from the mother, and to become fully independent.",
                audio : "",
                video: "",
                imgUrls:{
                  first: "someImg",
                }
              }
            },
            {
              name: 'Mein eigenes Paradies',
              shortName: 'Diy Inseln',
              footerName: 'PARADIES',
              type: 'text',
              description: "To hope means to be ready at every moment for that which is not yet born, and yet not become desperate if there is no birth in our lifetime.",
              hexagonImgUrl: 'img/beach.png',
              content:{
                article: "The mother-child relationship is paradoxical and, in a sense, tragic. It requires the most intense love on the mother's side, yet this very love must help the child grow away from the mother, and to become fully independent.",
                audio : "",
                video: "",
                imgUrls:{
                  first: "someImg",
                }
              }
            },
            {
              name: 'Mein eigenes Paradies',
              shortName: 'Diy Inseln',
              footerName: 'PARADIES',
              type: 'text',
              description: "To hope means to be ready at every moment for that which is not yet born, and yet not become desperate if there is no birth in our lifetime.",
              hexagonImgUrl: 'img/beach.png',
              content:{
                article: "The mother-child relationship is paradoxical and, in a sense, tragic. It requires the most intense love on the mother's side, yet this very love must help the child grow away from the mother, and to become fully independent.",
                audio : "",
                video: "",
                imgUrls:{
                  first: "someImg",
                }
              }
            },
            {
              name: 'Mein eigenes Paradies',
              shortName: 'Diy Inseln',
              footerName: 'PARADIES',
              type: 'text',
              description: "To hope means to be ready at every moment for that which is not yet born, and yet not become desperate if there is no birth in our lifetime.",
              hexagonImgUrl: 'img/beach.png',
              content:{
                article: "The mother-child relationship is paradoxical and, in a sense, tragic. It requires the most intense love on the mother's side, yet this very love must help the child grow away from the mother, and to become fully independent.",
                audio : "",
                video: "",
                imgUrls:{
                  first: "someImg",
                }
              }
            },
            {
              name: 'Mein eigenes Paradies',
              shortName: 'Diy Inseln',
              footerName: 'PARADIES',
              type: 'text',
              description: "To hope means to be ready at every moment for that which is not yet born, and yet not become desperate if there is no birth in our lifetime.",
              hexagonImgUrl: 'img/beach.png',
              content:{
                article: "The mother-child relationship is paradoxical and, in a sense, tragic. It requires the most intense love on the mother's side, yet this very love must help the child grow away from the mother, and to become fully independent.",
                audio : "",
                video: "",
                imgUrls:{
                  first: "someImg",
                }
              }
            }
          ]
        };


        var oneMore = {
          name: 'Why I Love Ireland',
          imgUrl : 'img/karibik.gif',
          description: 'A small country with a big reputation, helped along by a timeless, age-caressed landscape and a fascinating, friendly people, whose lyrical nature is expressed in the warmth of their welcome.',
          colorScheme: "21d0df",
          bgColor: "ea5548",
          date: "10 | 15",
          sections: [
            {
              name: 'Mein eigenes Paradies',
              shortName: 'Diy Inseln',
              footerName: 'PARADIES',
              type: 'text',
              description: "To hope means to be ready at every moment for that which is not yet born, and yet not become desperate if there is no birth in our lifetime.",
              hexagonImgUrl: 'img/beach.png',
              content:{
                article: "The mother-child relationship is paradoxical and, in a sense, tragic. It requires the most intense love on the mother's side, yet this very love must help the child grow away from the mother, and to become fully independent.",
                audio : "",
                video: "",
                imgUrls:{
                  first: "someImg",
                }
              }
            },
            {
              name: 'Mein eigenes Paradies',
              shortName: 'Diy Inseln',
              footerName: 'PARADIES',
              type: 'text',
              description: "To hope means to be ready at every moment for that which is not yet born, and yet not become desperate if there is no birth in our lifetime.",
              hexagonImgUrl: 'img/beach.png',
              content:{
                article: "The mother-child relationship is paradoxical and, in a sense, tragic. It requires the most intense love on the mother's side, yet this very love must help the child grow away from the mother, and to become fully independent.",
                audio : "",
                video: "",
                imgUrls:{
                  first: "someImg",
                }
              }
            },
            {
              name: 'Mein eigenes Paradies',
              shortName: 'Diy Inseln',
              footerName: 'PARADIES',
              type: 'text',
              description: "To hope means to be ready at every moment for that which is not yet born, and yet not become desperate if there is no birth in our lifetime.",
              hexagonImgUrl: 'img/beach.png',
              content:{
                article: "The mother-child relationship is paradoxical and, in a sense, tragic. It requires the most intense love on the mother's side, yet this very love must help the child grow away from the mother, and to become fully independent.",
                audio : "",
                video: "",
                imgUrls:{
                  first: "someImg",
                }
              }
            },
            {
              name: 'Mein eigenes Paradies',
              shortName: 'Diy Inseln',
              footerName: 'PARADIES',
              type: 'text',
              description: "To hope means to be ready at every moment for that which is not yet born, and yet not become desperate if there is no birth in our lifetime.",
              hexagonImgUrl: 'img/beach.png',
              content:{
                article: "The mother-child relationship is paradoxical and, in a sense, tragic. It requires the most intense love on the mother's side, yet this very love must help the child grow away from the mother, and to become fully independent.",
                audio : "",
                video: "",
                imgUrls:{
                  first: "someImg",
                }
              }
            },
            {
              name: 'Mein eigenes Paradies',
              shortName: 'Diy Inseln',
              footerName: 'PARADIES',
              type: 'text',
              description: "To hope means to be ready at every moment for that which is not yet born, and yet not become desperate if there is no birth in our lifetime.",
              hexagonImgUrl: 'img/beach.png',
              content:{
                article: "The mother-child relationship is paradoxical and, in a sense, tragic. It requires the most intense love on the mother's side, yet this very love must help the child grow away from the mother, and to become fully independent.",
                audio : "",
                video: "",
                imgUrls:{
                  first: "someImg",
                }
              }
            }
          ]
        };
        articles.push(articleTemplate);
        articles.push(anotherOne);
        articles.push(oneMore);

        for(var i = 0; i < articles.length; i++){
          Articles.insert(articles[i]);
        }

    }
});
