Meteor.startup(function () {
    if (Magazines.find().count() === 0) {

        var magazines =[];
        var magazineTemplate = {
          name: 'This Must Be The Place',
          imgUrl : 'img/karibik.gif',
          order: 0,
          description: 'A beach is a landform along the coast of an ocean, sea, lake or river. It usually consists of loose particles, which are often composed of rock, such as sand, gravel, shingle, pebbles, or cobblestones.',
          bgColor: "01121B",
          date: "01 | 15",
          articles: [
            {
              name: 'Mein eigenes Paradies',
              footerName: 'PARADIES',
              colorScheme: "#20D0DF",
              description: "To hope means to be ready at every moment for that which is not yet born, and yet not become desperate if there is no birth in our lifetime.",
              hexagonImgUrl: 'img/beach.png',
              sections:[
                {
                  shortName: 'Spiral Island',
                  type: 'text',
                  position: 5,
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
                  type: 'text',
                  position: 4,
                  shortName: 'RICHARD IOWA',
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
                  position: 3,
                  menuUrl:"img/Article1/MathewAlbanes.png",
                  shortName: 'MATHEW ALBANES',
                  type: 'text',
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
                  type: 'text',
                  shortName: 'Diy Inseln',
                  position: 7,
                  hexagonImgUrl: 'img/beach.png',
                  menuUrl:"img/Article1/DiyInseln.png",
                  content:{
                    text: "The mother-child relationship is paradoxical and, in a sense, tragic. It requires the most intense love on the mother's side, yet this very love must help the child grow away from the mother, and to become fully independent.",
                    audio : "",
                    video: "",
                    imgUrls:{
                      first: "someImg",
                    }
                  }
                }
              ]
            }
          ]
        };
        var article1 = {
              name: 'DAS ON-Leid',
              footerName: 'BOOT CAMP',
              colorScheme: "#E1193E",
              description: "Wenn Chou Chu Tau am Computer sitzt, vergisst er Raum und Zeit. Die chinesische Regierung hat ein Boot Camper öffnet, indem internetsuchtige Patienten geheilt werden sollen, die bis zu 17 Stunden am Tag im Netz Verbracht haben.",
              hexagonImgUrl: 'img/beach.png',
              sections:[
                {
                  shortName: 'Help me Help you',
                  type: 'about',
                  position: 3,
                  menuUrl:"http://lorempixel.com/300/300/nature/",
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
                  type: 'questions',
                  position:7,
                  shortName: 'Me, Myself and i',
                  menuUrl:"http://lorempixel.com/300/300/nature/",
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
                  position: 8,
                  menuUrl:"http://lorempixel.com/300/300/nature/",
                  shortName: 'Sucht in Zahlen',
                  type: 'galerie',
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
                  type: 'text',
                  shortName: 'Das ON-Leid',
                  position: 5,
                  menuUrl:"http://lorempixel.com/300/300/nature/",
                  content:{
                    text: "The mother-child relationship is paradoxical and, in a sense, tragic. It requires the most intense love on the mother's side, yet this very love must help the child grow away from the mother, and to become fully independent.",
                    audio : "",
                    video: "",
                    imgUrls:{
                      first: "someImg",
                    }
                  }
                }
              ]
            };
            article1.sections[3].content.text ='Liegestütze statt Netzsperre, Küchendienst statt PC-Verbot: In China bieten Hunderte sogenannter Erziehungszentren Eltern an, deren Kindern das Websurfen auszutreiben - mit Methoden, die an militärische Ausbildungslager erinnern. Chinesischen Jugendlichen, die in den Augen von Eltern und Obrigkeit zu viel Zeit im Internet verbringen, drohen drastische Maßnahmen. Wie die Nachrichtenagentur Reuters berichtet, sind in dem asiatischen Land in den letzten Jahren rund 250 sogenannte "Erziehungszentren" entstanden. Mit militärischem Drill und psychologischer Betreuung wollen die Einrichtungen den Zöglingen "die Fähigkeit ein normales Leben zu leben" vermitteln. Als typisch wird der Fall eines Teenagers genannt, der nur seinen chinesischen Nachnamen, Wang, nennen wollte. Seinen Eltern hätten ihm nicht erlaubt, draußen zu spielen, berichtet der junge Mann. Stattdessen habe er immer zu Hause bleiben und lernen sollen. Dann schildert er, was der Albtraum der behütenden Eltern gewesen sein dürfte: Statt zu tun wie ihm geheißen, verbrachte er immer mehr Zeit im Netz, will einmal an einem Stück acht Tage ohne Unterbrechung sein liebstes Onlinespiel gespielt haben. Resultat dieses Verhaltens seien nicht nur immer schlechtere Schulnoten, sondern auch ein Realitätsverlust gewesen. Statt aus Erfolgen im echten Leben, habe Wang schließlich mehr Befriedigung daraus gezogen, ein Level weiterzukommen. Reuters zitiert den Psychologen Tao Ran mit der Erklärung, Jugendliche wie Wang seien anfällig für Angstzustände und einen Verlust des Selbstver- trauens, weil sie "die Erwartung ihrer Eltern nicht erfüllen können, jede Herausforderung perfekt zu meistern". Bei Wang sei eine entsprechende "Internet-Suchtstörung" schnell diagnostiziert worden, woraufhin ihn seine Eltern in das Erziehungslager Qide in Peking einweisen ließen. Xing Liming, ein leitender Mitarbeiter des Lagers, sagte der Nachrichtenagentur: "Erziehung und das Leben in einer militärischen Umgebung sorgen für Disziplin." Zudem würde das militärische Training bei den Insassen helfen, " die körperliche Stärke zu verbessern und gute Lebensgewohnheiten zu entwickeln".';
            article1.sections[3].content.audio = 'article2/content/text/article2.mp3';
            article1.sections[3].content.video = 'https://www.youtube.com/embed/XMUYoiUlutM';
            article1.sections[3].content.headerImg = 'article2/content/text/article2.png';
            article1.sections[3].content.title = 'DAS ON-LEID';

            //article1.sections[3].content.textTmpl.video = 'article2/content/article2/'

            var article2 = {
                  name: 'Marijuana’s Secrets',
                  footerName: 'Science',
                  colorScheme: "#afbe08",
                  description: "Science Seeks to Unlock Marijuana’s Secrets. As the once-vilified drug becomes more accepted, researchers around the world are trying to understand how it works and how it might fight disease.",
                  sections:[
                    {
                      shortName: 'THE CHEMIST',
                      type: 'text',
                      position: 0,
                      menuUrl:"img/Article1/SpiralIsland.png",
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
                      type: 'text',
                      position: 1,
                      shortName: 'Mea culpa!',
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
                      position: 4,
                      menuUrl:"img/Article1/MathewAlbanes.png",
                      shortName: 'Into the Light',
                      type: 'text',
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
                      type: 'text',
                      shortName: 'Miracle Cure?',
                      position: 5,
                      menuUrl:"img/Article1/DiyInseln.png",
                      content:{
                        text: "The mother-child relationship is paradoxical and, in a sense, tragic. It requires the most intense love on the mother's side, yet this very love must help the child grow away from the mother, and to become fully independent.",
                        audio : "",
                        video: "",
                        imgUrls:{
                          first: "someImg",
                        }
                      }
                    }
                  ]
                };
                magazineTemplate.articles.push(article1);
                magazineTemplate.articles.push(article2);
        /*
            },
            {
              name: 'Mein eigenes Paradies',
              shortName: 'RICHARD IOWA',
              footerName: 'PARADIES',
              description: "To hope means to be ready at every moment for that which is not yet born, and yet not become desperate if there is no birth in our lifetime.",
              hexagonImgUrl: 'img/beach.png',
              type: 'text',
              position: 4,
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
              footerName: 'PARADIES',
              description: "To hope means to be ready at every moment for that which is not yet born, and yet not become desperate if there is no birth in our lifetime.",
              hexagonImgUrl: 'img/beach.png',

            },
            {
              name: 'Mein eigenes Paradies',
              footerName: 'PARADIES',
              description: "To hope means to be ready at every moment for that which is not yet born, and yet not become desperate if there is no birth in our lifetime.",

            }
          ]
        };*/
/*        var articles = [
          {
            name: 'Mein eigenes Paradies',
            shortName: 'Diy Inseln',
            description: "To hope means to be ready at every moment for that which is not yet born, and yet not become desperate if there is no birth in our lifetime.",
            footerName: 'PARADIES',
            hexagonImgUrl: 'img/beach.png',
            sections:[
              {
                content:{
                  text: "The mother-child relationship is paradoxical and, in a sense, tragic. It requires the most intense love on the mother's side, yet this very love must help the child grow away from the mother, and to become fully independent.",
                  audio : "",
                  video: "",
                  imgUrls:{
                    first: "someImg",
                  }
               }
              }
            ]
          }
        ];*/
        var anotherOne = {
          name: 'Hawaii is just Awesome',
          imgUrl : 'img/karibik.gif',
          order: 1,
          description: 'As the year comes to an end, the Hawaiian islands are enjoying some standbys: spontaneous rainbows, days of powerful surf pulsed with days of calm, cradling waters.',
          colorScheme: "#21d0df",
          bgColor: "ea5548",
          date: "05 | 15",
          articles: []
        };
        anotherOne.articles.push(article1);
        anotherOne.articles.push(article2);/*
        anotherOne.articles[0].colorScheme = "#13ac4c";
        anotherOne.articles[1].colorScheme = "#5d6961";*/

        var oneMore = {
          name: 'Why I Love Ireland',
          imgUrl : 'img/karibik.gif',
          order: 2,
          description: 'A small country with a big reputation, helped along by a timeless, age-caressed landscape and a fascinating, friendly people, whose lyrical nature is expressed in the warmth of their welcome.',
          colorScheme: "#21d0df",
          bgColor: "ea5548",
          date: "10 | 15",
          articles: []
        };
        oneMore.articles.push(article2);
        oneMore.articles.push(article1);
        /*
        oneMore.articles[0].colorScheme = "#c800c6";
        oneMore.articles[1].colorScheme = "#6a43bd";*/
        magazines.push(magazineTemplate);
        magazines.push(anotherOne);
        magazines.push(oneMore);
        for(var i = 0; i < magazines.length; i++){
            Magazines.insert(magazines[i]);
        }
    }
});
