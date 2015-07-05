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
                  type: 'spritz',
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
                  type: 'video',
                  shortName: 'Diy Inseln',
                  position: 7,
                  hexagonImgUrl: 'img/beach.png',
                  menuUrl:"img/Article1/DiyInseln.png",
                  content:{
                    text: "Sie möchten sich eine eigene Insel bauen? Hier könntes sie sehen wie es geht.",
                    audio : "",
                    video: "http://media.w3.org/2010/05/bunny/trailer.mp4",
                    title : 'Diy Inseln',
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
                },
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
                  type: 'gallery',
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
            article1.sections[0].content.text ='Liegestütze statt Netzsperre, Küchendienst statt PC-Verbot: In China bieten Hunderte sogenannter Erziehungszentren Eltern an, deren Kindern das Websurfen auszutreiben - mit Methoden, die an militärische Ausbildungslager erinnern. Chinesischen Jugendlichen, die in den Augen von Eltern und Obrigkeit zu viel Zeit im Internet verbringen, drohen drastische Maßnahmen. Wie die Nachrichtenagentur Reuters berichtet, sind in dem asiatischen Land in den letzten Jahren rund 250 sogenannte "Erziehungszentren" entstanden. Mit militärischem Drill und psychologischer Betreuung wollen die Einrichtungen den Zöglingen "die Fähigkeit ein normales Leben zu leben" vermitteln. Als typisch wird der Fall eines Teenagers genannt, der nur seinen chinesischen Nachnamen, Wang, nennen wollte. Seinen Eltern hätten ihm nicht erlaubt, draußen zu spielen, berichtet der junge Mann. Stattdessen habe er immer zu Hause bleiben und lernen sollen. Dann schildert er, was der Albtraum der behütenden Eltern gewesen sein dürfte: Statt zu tun wie ihm geheißen, verbrachte er immer mehr Zeit im Netz, will einmal an einem Stück acht Tage ohne Unterbrechung sein liebstes Onlinespiel gespielt haben. Resultat dieses Verhaltens seien nicht nur immer schlechtere Schulnoten, sondern auch ein Realitätsverlust gewesen. Statt aus Erfolgen im echten Leben, habe Wang schließlich mehr Befriedigung daraus gezogen, ein Level weiterzukommen. Reuters zitiert den Psychologen Tao Ran mit der Erklärung, Jugendliche wie Wang seien anfällig für Angstzustände und einen Verlust des Selbstver- trauens, weil sie "die Erwartung ihrer Eltern nicht erfüllen können, jede Herausforderung perfekt zu meistern". Bei Wang sei eine entsprechende "Internet-Suchtstörung" schnell diagnostiziert worden, woraufhin ihn seine Eltern in das Erziehungslager Qide in Peking einweisen ließen. Xing Liming, ein leitender Mitarbeiter des Lagers, sagte der Nachrichtenagentur: "Erziehung und das Leben in einer militärischen Umgebung sorgen für Disziplin." Zudem würde das militärische Training bei den Insassen helfen, " die körperliche Stärke zu verbessern und gute Lebensgewohnheiten zu entwickeln".';
            article1.sections[0].content.audio = 'content/article2/text/article2.mp3';
            article1.sections[0].content.video = 'https://www.youtube.com/embed/XMUYoiUlutM';
            article1.sections[0].content.headerImg = 'content/article2/text/article2.png';
            article1.sections[0].content.title = 'DAS ON-LEID';
            article1.sections[0].content.title = 'DAS ON-LEID';


            article1.sections[2].content.text ='Liegestütze statt Netzsperre, Küchendienst statt PC-Verbot: In China bieten Hunderte sogenannter Erziehungszentren Eltern an, deren Kindern das Websurfen auszutreiben - mit Methoden, die an militärische Ausbildungslager erinnern. Chinesischen Jugendlichen, die in den Augen von Eltern und Obrigkeit zu viel Zeit im Internet verbringen, drohen drastische Maßnahmen. Wie die Nachrichtenagentur Reuters berichtet, sind in dem asiatischen Land in den letzten Jahren rund 250 sogenannte "Erziehungszentren" entstanden. Mit militärischem Drill und psychologischer Betreuung wollen die Einrichtungen den Zöglingen "die Fähigkeit ein normales Leben zu leben" vermitteln. Als typisch wird der Fall eines Teenagers genannt, der nur seinen chinesischen Nachnamen, Wang, nennen wollte. Seinen Eltern hätten ihm nicht erlaubt, draußen zu spielen, berichtet der junge Mann. Stattdessen habe er immer zu Hause bleiben und lernen sollen. Dann schildert er, was der Albtraum der behütenden Eltern gewesen sein dürfte: Statt zu tun wie ihm geheißen, verbrachte er immer mehr Zeit im Netz, will einmal an einem Stück acht Tage ohne Unterbrechung sein liebstes Onlinespiel gespielt haben. Resultat dieses Verhaltens seien nicht nur immer schlechtere Schulnoten, sondern auch ein Realitätsverlust gewesen. Statt aus Erfolgen im echten Leben, habe Wang schließlich mehr Befriedigung daraus gezogen, ein Level weiterzukommen. Reuters zitiert den Psychologen Tao Ran mit der Erklärung, Jugendliche wie Wang seien anfällig für Angstzustände und einen Verlust des Selbstver- trauens, weil sie "die Erwartung ihrer Eltern nicht erfüllen können, jede Herausforderung perfekt zu meistern". Bei Wang sei eine entsprechende "Internet-Suchtstörung" schnell diagnostiziert worden, woraufhin ihn seine Eltern in das Erziehungslager Qide in Peking einweisen ließen. Xing Liming, ein leitender Mitarbeiter des Lagers, sagte der Nachrichtenagentur: "Erziehung und das Leben in einer militärischen Umgebung sorgen für Disziplin." Zudem würde das militärische Training bei den Insassen helfen, " die körperliche Stärke zu verbessern und gute Lebensgewohnheiten zu entwickeln".';
            article1.sections[2].content.audio = 'content/article2/text/article2.mp3';
            article1.sections[2].content.title = 'Me, Myself and i';
            article1.sections[2].content.questions =[];
            article1.sections[2].content.questions[0] = 'Mir wurde gesagt, dass ich mich in der letzen Zeit verändert hätte';
            article1.sections[2].content.questions[1] = 'Wenn ich am PC bin, vergesse ich zu Essen und zu Schlafen';
            article1.sections[2].content.questions[2] = 'Ich kenne meine Freunde meist nur aus dem Internet und treffe sie nicht vor Ort';
            article1.sections[2].content.questions[3] = 'Ich habe bereits versucht, meine Zeit im Internet zu reduzieren, aber ich habe es nicht geschafft';
            article1.sections[2].content.questions[4] = 'Mein Internetkonsum wirkt sich schlecht auf mein sonstiges Vorhaben aus (Schule/ Studium/ Arbeit etc.)';
            article1.sections[2].content.questions[5] = 'Wenn es mir schlecht geht, hole ich mir Trost im Netz';
            article1.sections[2].content.questions[6] = 'Wenn ich ehrlich sein soll, habe ich nur Spass wenn ich online bin';
            article1.sections[2].content.questions[7] = 'Ein Leben ohne Internet kann ich mir überhaupt nicht vorstellen';
            article1.sections[2].content.questions[8] = 'Wenn ich Aufstehe, blicke ich sofort auf meinen PC';
            article1.sections[2].content.questions[9] = 'Ich glaube selber, dass ich süchtig bin';
            article1.sections[2].content.results = [];
            article1.sections[2].content.results[0] = 'Sie nutzen das Internet dosiert und haben das Surfen im Griff.<br><br>Sie scheinen nicjt an einer Sucht zu leiden.<br><br><br>Sollten Sie trotzdem den Eindruck haben, das etwas nicht stimmt, suchen Sie sich bitte Hilfe.';

            article1.sections[3].content.title = 'Sucht in Zahlen';
            article1.sections[3].content.images =[];
            article1.sections[3].content.captions =[];
            article1.sections[3].content.captions.push('Motivations Durch:');
            article1.sections[3].content.captions.push('In Deutschland');
            article1.sections[3].content.images.push('content/article2/gallery/article2_1.png');
            article1.sections[3].content.images.push('content/article2/gallery/article2_2.png');


            magazineTemplate.articles[0].sections[0].content.text ='On finishing his studies he helped to found the Frankfurt Psychoanalytic Institute, and was invited to join Frankfurt Institute for Social Research by Max Horheimerthen (and by so doing became a member of the so called ‘Frankfurt School’). From 1929 to 1932 he lectured at both the Psychoanalytic Institute, Frankfurt, and at the University of Frankfurt and worked on a study of the authoritarian character structure of German workers prior to Hitler’s coming to power (published many years later in 1984 as The Working Class in Weimar Germany).' +
'Erich Fromm looked to bring together insights from psychoanalysis and an appreciation of the impact of social structure (influenced, in particular, by his reading of Marx):' +
'I wanted to understand the laws that govern the life of the individual man, and the laws of society-that is, of men in their social existence. I tried to see the lasting truth in Freud’s concepts as against those assumptions which were in need of revision. I tried to do the same with Marx’s theory, and finally I tried to arrive at a synthesis which followed from the understanding and the criticism of both thinkers. (quoted by Funk 1999)' +
'The Frankfurt Institute was forced out of Germany by the tightening grip of Nazism first to Geneva and then in 1934 to Columbia University. At the time Erich Fromm was suffering from tuberculosis. He stayed in Davos for a number of months before settling in the United States and lecturing at the New School of Social Research (1934–39), Columbia (1940-41), Yale (1949-50), and Bennington (1941-50). He began to publish papers that were critical of Freudian thinking (which both alienated him from some of his Frankfurt school colleagues, and many within US analytical circles). His focus, it can be argued, shifted from a Freudian concern with unconscious motivations, to a recognition that humans are social beings whose beliefs and motivations are deeply inscribed by the societies and cultures of which they are part.' +
'In 1941, the first of Erich Fromm’s deeply influential books appeared: Escape From Freedom (published 1942 as The Fear of Freedom in the UK). It argued that ‘freedom from the traditional bonds of medieval society, though giving the individual a new feeling of independence, at the same time made him feel alone and isolated, filled him with doubt and anxiety, and drove him into new submission and into a compulsive and irrational activity’ (Fromm 1942: 89). This alienation from place and community, and the insecurities and fears entailed, helps to explain how people seek the security and rewards of authoritarian social orders such as fascism. His critique of Freud led to him being suspended from supervising students by the New York Psychoanalytic Institute in 1944. As Burston (1991) has noted Erich Fromm then joined with Clara Thompson, Harry Stack Sullivan, and ex-wife Frieda Fromm-Reichman (among others) to found the William Alanson White Institute (of which he was Clinical Director from 1946 to 1950).' +
'Fromm married for a second time in 1944 (to Henny Gurland) and become and American citizen. In 1950 he relocated to Mexico and a post at the National Autonomous University, Mexico City (at which he taught until 1965). The move was spurred by his second wife’s illness – and physician’s advice that a favourable climate would benefit her. Sadly she soon died (in 1952). Erich Fromm still practiced as a psychoanalyst and after his wife’s death he was invited to found the Mexican Institute of Psychoanalysis in Mexico City, which he directed till 1976.'+
'Erich Fromm’s writing continued with Man For Himself (1947) and The Sane Society (1956). ‘Life in twentieth century Democracy’, Fromm wrote, ‘constitutes in many ways another escape from freedom’ (1956: vii). The analysis of this ‘escape’ via the notion of alienation was particularly powerful. These books, as Kellner (undated) has noted, ‘popularized the neo-Marxian critiques of the media and consumer society, and promoted democratic socialist perspectives during an era when social repression made it difficult and dangerous to advocate radical positions’.';

            magazineTemplate.articles[0].sections[0].content.audio = 'content/article1/text/article1.mp3';
            magazineTemplate.articles[0].sections[0].content.video = 'https://www.youtube.com/embed/XMUYoiUlutM';
            magazineTemplate.articles[0].sections[0].content.headerImg = 'content/article1/text/article1.jpg';
            magazineTemplate.articles[0].sections[0].content.title = 'Spiral Island';

            magazineTemplate.articles[0].sections[2].content.title = 'MATHEW ALBANES';
            magazineTemplate.articles[0].sections[2].content.title = 'MATHEW ALBANES';
            magazineTemplate.articles[0].sections[2].content.questions = [];
            magazineTemplate.articles[0].sections[2].content.questions[0] = 'Are you feeling better today?';
            magazineTemplate.articles[0].sections[2].content.questions[1] = 'May I use the bathroom?';
            magazineTemplate.articles[0].sections[2].content.questions[2] = 'Will you please do me a favor?';
            magazineTemplate.articles[0].sections[2].content.questions[3] = 'Have you already completed your homework?';
            magazineTemplate.articles[0].sections[2].content.questions[4] = 'Is that your final answer?';
            magazineTemplate.articles[0].sections[2].content.questions[5] = 'Were you planning on becoming a fireman?';
            magazineTemplate.articles[0].sections[2].content.questions[6] = 'Is it wrong to want to live on my own at this age?';
            magazineTemplate.articles[0].sections[2].content.questions[7] = 'Shall we make dinner together tonight?';
            magazineTemplate.articles[0].sections[2].content.questions[8] = 'Could I possibly be a messier house guest?';
            magazineTemplate.articles[0].sections[2].content.questions[9] = 'Might I be of service to you ladies this evening?';
            magazineTemplate.articles[0].sections[2].content.answers = magazineTemplate.articles[0].sections[2].content.questions;
            // magazineTemplate.articles[0].sections[2].content.results =  ['As the once-vilified drug becomes more accepted, researchers around the world are trying to understand how it works and how it might fight disease'];

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
                      type: 'video',
                      position: 1,
                      shortName: 'Mea culpa!',
                      menuUrl:"img/Article1/RichardIowa.png",
                      content:{
                        title: 'Mea culpa!',
                        text: 'Mea culpa is a Latin phrase that means "through my fault"',
                        audio : "",
                        video: "http://media.w3.org/2010/05/sintel/trailer.mp4",
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

                article2.sections[0].content.text = 'Varanasi is the oldest city of the world. Varanasi is more than 3000 years old and is famous as the city of temples. In Varanasi, there are temples at every few paces. Looking at the number of temples in Varanasi, it is hard to believe that a large number of them were demolished during the medieval times. Jyotirlinga Visvanatha Temple or Golden Temple, rebuilt in 1776, is dedicated to Lord Shiva. The Jnana Vapi well (meaning "Well of Wisdom") is believed to have been dug by Lord Shiva himself. It is believed that the majestic Alamgir mosque has replaced one of the most ancient shrines known as the temple of Bindu Madhava. The thirty-three hundred million shrines fill one with awe and wonder with sheer numbers.';
                article2.sections[0].content.audio = 'content/article3/text/article3.mp3';
                article2.sections[0].content.video = 'https://www.youtube.com/embed/XMUYoiUlutM';
                article2.sections[0].content.headerImg = 'content/article3/text/article3.jpg';
                article2.sections[0].content.title = 'THE CHEMIST';
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
