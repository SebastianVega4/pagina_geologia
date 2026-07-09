export const STATUS_LABEL = {
  confirmado: 'Confirmada — contacto inscrito',
  parcial: 'Confirmada parcial — coautor inscrito, contacto pendiente',
  pendiente: 'Pendiente — sin inscripción registrada',
  tbd: 'Cupo reservado (TBD)',
};

export const DAYS = [
    {
        "id":  "estado",
        "label":  "Horario General",
        "type":  "dashboard",
        "sub":  "Vista general del programa por bloques â€” XVII STG 2026",
        "desc":  "Cronograma actualizado (jul-2026) segÃºn el nuevo esquema general: 7 charlas magistrales (CM-1 a CM-7) y 9 charlas especiales (CE-1 a CE-9), la mayorÃ­a en paralelo con otras actividades. Ponencias: miÃ©rcoles un bloque Ãºnico 2:00â€“4:00 PM (6Ã—20 min por sala); jueves y viernes en la maÃ±ana 8:10â€“9:25 (3Ã—25 min por sala). PÃ³sters: miÃ©rcoles 5:10â€“6:10 PM (54, 2 salones) y jueves 5:10â€“6:20 PM (30, 1 salÃ³n). SGC todo el dÃ­a jueves; ACGGP viernes en la maÃ±ana y SCG viernes en la tarde (salones de Bienestar).",
        "registro":  {
                         "formularioIndividual":  {
                                                      "personas":  186,
                                                      "filas":  134,
                                                      "perfil":  {
                                                                     "Estudiante":  155,
                                                                     "Profesional":  23,
                                                                     "Egresado/Posgrado (UPTC u otra)":  8
                                                                 },
                                                      "expositor":  {
                                                                        "SÃ­":  102,
                                                                        "No":  12,
                                                                        "Sin responder":  20
                                                                    }
                                                  },
                         "universidad":  [

                                         ],
                         "totalGeneral":  186
                     },
        "ponencias":  {
                          "counts":  {
                                         "confirmado":  63,
                                         "parcial":  5,
                                         "pendiente":  40,
                                         "tbd":  3
                                     },
                          "total":  111
                      },
        "posters":  {
                        "counts":  {
                                       "confirmado":  72,
                                       "parcial":  2,
                                       "pendiente":  50
                                   },
                        "total":  124
                    },
        "cmTotal":  7,
        "cmConfirmadas":  5,
        "cmPorConfirmar":  2,
        "panelTotal":  3,
        "ceTotal":  9,
        "ceConfirmadas":  5,
        "cePorConfirmar":  4
    },
    {
        "id":  "mie",
        "label":  "MiÃ©rcoles 19",
        "sub":  "6 salas Â· CM-1 y CM-2 Â· CE-1 a CE-3 Â· Geolimpiadas AM Â· pÃ³sters PM",
        "desc":  "Actualizado jul-2026 segÃºn el nuevo esquema general: CM-1 (10:00) y CM-2 (4:30 PM) para todo el evento; Geolimpiadas 10:30â€“12:30 en paralelo con la CE-1; un Ãºnico bloque de ponencias 2:00â€“4:00 PM (6Ã—20 min, 15 min exposiciÃ³n + 5 preguntas, sin margen) con CE-2 y CE-3 en paralelo; pÃ³sters 5:10â€“6:10 PM en 2 salones.",
        "rooms":  [
                      "201",
                      "202",
                      "203",
                      "204",
                      "205",
                      "206"
                  ],
        "themes":  {
                       "201":  "Geoamenazas Â· GRD Â· GeodivulgaciÃ³n",
                       "202":  "GeofÃ­sica Â· TecnologÃ­a Â· IA Aplicada",
                       "203":  "MineralogÃ­a Â· PetrologÃ­a Ãgnea Â· GeoquÃ­mica",
                       "204":  "PaleontologÃ­a Â· Geopatrimonio Â· GeoarqueologÃ­a",
                       "205":  "EstratigrafÃ­a Â· SedimentologÃ­a Â· Source-to-Sink",
                       "206":  "GeoeducaciÃ³n Â· TecnologÃ­a GeolÃ³gica"
                   },
        "rows":  [
                     {
                         "type":  "info",
                         "time":  "8:00â€“9:00",
                         "title":  "Registro",
                         "category":  "registro"
                     },
                     {
                         "type":  "info",
                         "time":  "9:00â€“10:00",
                         "title":  "Bienvenida y apertura del evento",
                         "category":  "apertura"
                     },
                     {
                         "type":  "block",
                         "time":  "10:00â€“10:30",
                         "auditorio":  {
                                           "cms":  [
                                                       {
                                                           "code":  "CM-1",
                                                           "time":  "10:00â€“10:30",
                                                           "title":  "Simulando la corteza y el manto en el laboratorio: uso de la petrologÃ­a experimental para entender la distribuciÃ³n de los elementos quÃ­micos",
                                                           "speaker":  "AndrÃ©s Salazar",
                                                           "org":  "Universidad de SÃ£o Paulo"
                                                       }
                                                   ]
                                       },
                         "cells":  null,
                         "altBlock":  {
                                          "time":  "",
                                          "title":  "Charla magistral en el auditorio",
                                          "sub":  "Asistencia general â€” sin ponencias en salones"
                                      }
                     },
                     {
                         "type":  "block",
                         "time":  "10:30â€“12:30",
                         "auditorio":  {
                                           "cms":  [
                                                       {
                                                           "code":  "",
                                                           "time":  "10:40â€“11:20",
                                                           "title":  "Break â€” entrega primer refrigerio",
                                                           "speaker":  ""
                                                       },
                                                       {
                                                           "code":  "CE-1",
                                                           "time":  "11:20â€“12:30",
                                                           "title":  "TectÃ³nica y fuentes sismogÃ©nicas el NE de Colombia",
                                                           "speaker":  "Francisco Velandia",
                                                           "org":  "UIS"
                                                       }
                                                   ]
                                       },
                         "cells":  null,
                         "altBlock":  {
                                          "time":  "10:30â€“12:30",
                                          "title":  "Geolimpiadas",
                                          "sub":  "Competencia por equipos â€” en los salones"
                                      }
                     },
                     {
                         "type":  "info",
                         "time":  "12:30â€“14:00",
                         "title":  "Almuerzo",
                         "category":  "almuerzo"
                     },
                     {
                         "type":  "block",
                         "time":  "14:00â€“16:00",
                         "cells":  {
                                       "201":  [
                                                   {
                                                       "title":  "GeodivulgaciÃ³n comunitaria para la gestiÃ³n del riesgo: una estrategia desde el Museo de IngenierÃ­a y Geociencias de la UPTC",
                                                       "authors":  "Nikolle Valentina Soto Correa",
                                                       "email":  "nikolle.soto@uptc.edu.co",
                                                       "linea":  "Geoamenazas Â· GRD Â· GeodivulgaciÃ³n",
                                                       "status":  "confirmado",
                                                       "time":  "14:00â€“14:20"
                                                   },
                                                   {
                                                       "title":  "EvaluaciÃ³n multitemporal de subsidencia minera mediante InSAR en el tÃ­tulo 009-91, Paipa, BoyacÃ¡",
                                                       "status":  "parcial",
                                                       "authors":  "Milton Fabricio RodrÃ­guez Celis, Heider NicolÃ¡s Aunta Molina",
                                                       "email":  "milton.rodriguez03@uptc.edu.co",
                                                       "note":  "Parcial 23-jun: coautores Milton RodrÃ­guez Celis y Heider NicolÃ¡s Aunta Molina inscritos (registro grupal) â€” ver CRONOGRAMA_CONFIRMADO_2026-06-23.md",
                                                       "time":  "14:20â€“14:40"
                                                   },
                                                   {
                                                       "title":  "ANÃLISIS HIDROGEOMORFOLÃ“GICO PRE â€“ POST HIDROELÃ‰CTRICA MIEL I: CASO DE ESTUDIO CUENCA RÃO LA MIEL",
                                                       "status":  "confirmado",
                                                       "authors":  "Valencia-Madrigal, Julieth* Â· Hazet, Paul Â· CalderÃ³n-DÃ­az, Laura Â· Ãvila-DÃ­az, Ãlvaro",
                                                       "email":  "Julieth.valencia@urosario.edu.co",
                                                       "note":  "TÃ­tulo tomado de la hoja maestra (coincidencia por similitud 99%); el cronograma usaba una versiÃ³n truncada/distinta. | Confirmado 23-jun (revisiÃ³n ampliada, criterio: autor/coautor inscrito sin requerir que declare este tÃ­tulo exacto) â€” Julieth Valencia Madrigal â€” ver CRONOGRAMA_CONFIRMADO_2026-06-23.md",
                                                       "time":  "14:40â€“15:00"
                                                   },
                                                   {
                                                       "title":  "ZonificaciÃ³n de la susceptibilidad ante movimientos en masa e inundaciones en la microcuenca La Patilla (Salazar de las Palmas)",
                                                       "status":  "confirmado",
                                                       "authors":  "MARIA JOSE GARAY PAEZ",
                                                       "email":  "majostar720@gmail.com",
                                                       "note":  "TÃ­tulo emparejado por similitud (63%) con hoja maestra; revisar redacciÃ³n exacta. | Confirmado 23-jun (revisiÃ³n ampliada, criterio: autor/coautor inscrito sin requerir que declare este tÃ­tulo exacto) â€” Maria Jose Garay Paez â€” ver CRONOGRAMA_CONFIRMADO_2026-06-23.md",
                                                       "time":  "15:00â€“15:20"
                                                   },
                                                   {
                                                       "title":  "GeologÃ­a del ciclismo: Control Estructural y MorfolÃ³gico en los Escenarios Ãconos del Ciclismo",
                                                       "status":  "confirmado",
                                                       "authors":  "Juan SebastiÃ¡n Luengas Jaimes",
                                                       "email":  "sebluengas20@gmail.com",
                                                       "time":  "15:20â€“15:40"
                                                   },
                                                   {
                                                       "title":  "MODELACIÃ“N DEM DEL REBOTE DE BLOQUES ROCOSOS EN TERRAPLENES DE PROTECCIÃ“N CONTRA CAÃDA DE ROCAS MEDIANTE MATDEM",
                                                       "authors":  "Luis Alejandro NiÃ±o Saavedra, Nikolle Valentina Soto Correa, Danny Useche Infante",
                                                       "email":  "luis.nino09@uptc.edu.co",
                                                       "linea":  "Geoamenazas Â· GRD Â· GeodivulgaciÃ³n",
                                                       "status":  "confirmado",
                                                       "time":  "15:40â€“16:00"
                                                   }
                                               ],
                                       "202":  [
                                                   {
                                                       "title":  "EvaluaciÃ³n multitemporal de coberturas vegetales mediante super-resoluciÃ³n satelital (S2DR3), aplicable en la detecciÃ³n de anomalÃ­as",
                                                       "status":  "confirmado",
                                                       "authors":  "Erluan Andres Zabaleta Benavides, John William Branch Bedoya, AndrÃ©s Mauricio MuÃ±oz GarcÃ­a, Fredy Mauricio GutiÃ©rrez Ãlvarez",
                                                       "email":  "ezabaleta@unal.edu.co",
                                                       "note":  "TÃ­tulo emparejado por similitud (82%) con hoja maestra; revisar redacciÃ³n exacta. | Confirmado 23-jun (revisiÃ³n ampliada, criterio: autor/coautor inscrito sin requerir que declare este tÃ­tulo exacto) â€” Erluan Andres Zabaleta Benavides; AndrÃ©s Mauricio MuÃ±oz GarcÃ­a â€” ver CRONOGRAMA_CONFIRMADO_2026-06-23.md",
                                                       "time":  "14:00â€“14:20"
                                                   },
                                                   {
                                                       "title":  "MÃ¡s allÃ¡ del Ã­ndice de oleanano: un enfoque de aprendizaje automÃ¡tico para la clasificaciÃ³n de la edad del petrÃ³leo en cuencas colombianas",
                                                       "status":  "confirmado",
                                                       "authors":  "Daniel Esteban Quintana GutiÃ©rrez",
                                                       "email":  "dquintana@unal.edu.co",
                                                       "time":  "14:20â€“14:40"
                                                   },
                                                   {
                                                       "title":  "DistribuciÃ³n espacial y vertical de la susceptibilidad magnÃ©tica en depÃ³sito cuaternario del Valle de Sogamoso",
                                                       "status":  "confirmado",
                                                       "authors":  "Javier DarÃ­o Guerra MuÃ±oz, Daniel Alexander Vargas BolÃ­var, AndrÃ©s Felipe Cifuentes Castro",
                                                       "email":  "daniel.vargas20@uptc.edu.co (contacto, NO inscrito)",
                                                       "note":  "Coautor inscrito #57 lista este mismo tÃ­tulo. TÃ­tulo emparejado por similitud (72%) con hoja maestra; revisar redacciÃ³n exacta. | Confirmado 26-jun (autodeclaraciÃ³n directa en el formulario de inscripciÃ³n actualizado / cruce por email-contacto y coautores) â€” Autodeclarado por Andres cifuentes, laura cifuentes, milton rodriguez, nicolas aunta, michelle farelo en el campo \u0027Nombre de la Ponencia o Poster\u0027 (similitud 79%). â€” ver CRONOGRAMA_CONFIRMADO_2026-06-26.md",
                                                       "time":  "14:40â€“15:00"
                                                   },
                                                   {
                                                       "title":  "TransformaciÃ³n del anÃ¡lisis geoespacial mediante inteligencia artificial y automatizaciÃ³n",
                                                       "status":  "confirmado",
                                                       "authors":  "David Felipe RincÃ³n CÃ¡rdenas",
                                                       "email":  "David.rincon03@uptc.edu.co",
                                                       "time":  "15:00â€“15:20"
                                                   },
                                                   {
                                                       "title":  "Efectos crÃ­ticos del tratamiento de muestras minerales en tÃ©cnicas analÃ­ticas",
                                                       "status":  "confirmado",
                                                       "authors":  "Diana Isabel Nieto Patarroyo",
                                                       "email":  "Dnieto@inclaygeology.com",
                                                       "note":  "Confirmado 23-jun (revisiÃ³n ampliada, criterio: autor/coautor inscrito sin requerir que declare este tÃ­tulo exacto) â€” Diana Isabel Nieto Patarroyo â€” ver CRONOGRAMA_CONFIRMADO_2026-06-23.md",
                                                       "time":  "15:20â€“15:40"
                                                   },
                                                   {
                                                       "title":  "EvaluaciÃ³n comparativa de la estimaciÃ³n de materia orgÃ¡nica del suelo a partir de imÃ¡genes multiespectrales e hiperespectrales",
                                                       "authors":  "Por confirmar",
                                                       "email":  "",
                                                       "linea":  "TecnologÃ­a: SIG Â· ML Â· IA Â· Sensores Remotos",
                                                       "status":  "confirmado",
                                                       "time":  "15:40â€“16:00"
                                                   }
                                               ],
                                       "203":  [
                                                   {
                                                       "title":  "CaracterÃ­sticas MineralÃ³gicas de la Euclasa de la vereda Palomas, GachalÃ¡, Cundinamarca (Colombia)",
                                                       "status":  "parcial",
                                                       "authors":  "AndrÃ©s Camilo Barreto Gordillo, Mariana Catalina LÃ³pez Villamil, Fernando Heli Romero OrdÃ³Ã±ez",
                                                       "email":  "anbarretog@unal.edu.co (contacto, NO inscrito)",
                                                       "note":  "Coautor inscrito (#39, No expositor): Mariana Catalina LÃ³pez Villamil.",
                                                       "time":  "14:00â€“14:20"
                                                   },
                                                   {
                                                       "title":  "Metamorfismo y significado tectÃ³nico del Neis de la IguanÃ¡ (Valle de AburrÃ¡): Â¿Un granitoide JurÃ¡sico fuera de lugar?",
                                                       "status":  "confirmado",
                                                       "authors":  "Sara Del Carmen Villa Hoyos, Alejandra Bedoya, AgustÃ­n Cardona, AndrÃ©s Bustamante, SebastiÃ¡n Zapata Henao",
                                                       "email":  "savillah@unal.edu.co",
                                                       "note":  "InscripciÃ³n formalizada por la universidad (UNAL).",
                                                       "time":  "14:20â€“14:40"
                                                   },
                                                   {
                                                       "title":  "Britholita, el principal portador de REE en las rocas alcalinas de San JosÃ© del Guaviare: relaciones texturales, quimismo, e implicaciones petrogenÃ©ticas",
                                                       "status":  "confirmado",
                                                       "authors":  "Mildre Saray Saenz De La Ossa ; MarÃ­a Paula SÃ¡nchez SuÃ¡rez ; Astrid Siachoque Velandia",
                                                       "email":  "saraysaenz2005@gmail.com",
                                                       "note":  "TÃ­tulo tomado de la hoja maestra (coincidencia por similitud 91%); el cronograma usaba una versiÃ³n truncada/distinta. | Confirmado 23-jun (revisiÃ³n ampliada, criterio: autor/coautor inscrito sin requerir que declare este tÃ­tulo exacto) â€” Mildre Saray SÃ¡enz De La Ossa â€” ver CRONOGRAMA_CONFIRMADO_2026-06-23.md",
                                                       "time":  "14:40â€“15:00"
                                                   },
                                                   {
                                                       "title":  "Emplazamiento sintectÃ³nico y transiciÃ³n de fÃ¡bricas magmÃ¡ticas a sÃ³lidas en el plutÃ³n MarcabelÃ­, suroccidente del Ecuador",
                                                       "status":  "confirmado",
                                                       "authors":  "Cesar Vinasco, carlos Archanjo, Umberto Cordani",
                                                       "email":  "cvinasco@unal.edu.co",
                                                       "note":  "TÃ­tulo tomado de la hoja maestra (coincidencia por similitud 100%); el cronograma usaba una versiÃ³n truncada/distinta. | Confirmado 23-jun vÃ­a auditorÃ­a por coautor (CÃ©sar Vinasco se inscribiÃ³ declarando este tÃ­tulo exacto) â€” ver CRONOGRAMA_CONFIRMADO_2026-06-23.md",
                                                       "time":  "15:00â€“15:20"
                                                   },
                                                   {
                                                       "title":  "CaracterizaciÃ³n mineralÃ³gica y geoquÃ­mica de los fluorapatitos asociados a las Ã¡reas esmeraldÃ­feras en los distritos mineros de La Marina y Chivor (Colombia).",
                                                       "status":  "confirmado",
                                                       "authors":  "Juan Alejandro GonzÃ¡lez SÃ¡nchez, Karoll Samantha DÃ­az PeÃ±uela, Fernando HelÃ­ Romero OrdÃ³Ã±ez",
                                                       "email":  "kdiazpe@unal.edu.co",
                                                       "note":  "TÃ­tulo tomado de la hoja maestra (coincidencia por similitud 94%); el cronograma usaba una versiÃ³n truncada/distinta.",
                                                       "time":  "15:20â€“15:40"
                                                   },
                                                   {
                                                       "title":  "CaracterÃ­sticas MicrotermomÃ©tricas de las Inclusiones Fluidas en las Ocurrencias de Topacio del Vichada (Colombia).",
                                                       "status":  "confirmado",
                                                       "authors":  "Evelyn Mariana RÃ­os Franco, Fernando HelÃ­ Romero OrdÃ³Ã±ez",
                                                       "email":  "eriosf@unal.edu.co",
                                                       "time":  "15:40â€“16:00"
                                                   }
                                               ],
                                       "204":  [
                                                   {
                                                       "title":  "ArqueometrÃ­a de Ã¡gatas arqueolÃ³gicas en la Sierra Nevada de Santa Marta: procedencia mineral, geodiversidad y redes de intercambio",
                                                       "status":  "confirmado",
                                                       "authors":  "MarÃ­a Camila PÃ¡jaro, Mariangel GirÃ³n",
                                                       "email":  "mpajaro@unal.edu.co",
                                                       "note":  "TÃ­tulo emparejado por similitud (84%) con hoja maestra; revisar redacciÃ³n exacta.",
                                                       "time":  "14:00â€“14:20"
                                                   },
                                                   {
                                                       "title":  "Caminos Reales de Santander: una aproximaciÃ³n desde el patrimonio geolÃ³gico",
                                                       "status":  "confirmado",
                                                       "authors":  "Aldo JuliÃ¡n Molano Sierra",
                                                       "email":  "aldojulian15@gmail.com",
                                                       "note":  "Confirmado 23-jun (revisiÃ³n ampliada, criterio: autor/coautor inscrito sin requerir que declare este tÃ­tulo exacto) â€” Aldo Julian Molano Sierra â€” ver CRONOGRAMA_CONFIRMADO_2026-06-23.md",
                                                       "time":  "14:20â€“14:40"
                                                   },
                                                   {
                                                       "title":  "Localidades fosilÃ­feras del Cretacico Marino de Tena Cundinamarca- Reconocimiento paleontologico a partir de Moluscos Fosiles del Grupo Villeta",
                                                       "status":  "confirmado",
                                                       "authors":  "Antonio Eliseo Silva Castro, Astrid MuÃ±oz, Javier Luque",
                                                       "email":  "aesilva95@unisalle.edu.co",
                                                       "note":  "TÃ­tulo tomado de la hoja maestra (coincidencia por similitud 88%); el cronograma usaba una versiÃ³n truncada/distinta.",
                                                       "time":  "14:40â€“15:00"
                                                   },
                                                   {
                                                       "title":  "DIRECTRICES PARA LA GESTIÃ“N INTEGRAL DE SITIOS DE INTERÃ‰S GEOLÃ“GICO CON VOCACIÃ“N TURÃSTICA, EN EL DEPARTAMENTO DE ANTIOQUIA",
                                                       "status":  "confirmado",
                                                       "authors":  "Albeiro RendÃ³n Rivera, Heiner HernÃ¡n Cardona Polanco, Carlos Alberto LÃ³pez PÃ©rez, Liced PulgarÃ­n Zuleta, Camilo AndrÃ©s SÃ¡nchez Vargas",
                                                       "email":  "lpulgarinz@unal.edu.co",
                                                       "note":  "TÃ­tulo tomado de la hoja maestra (coincidencia por similitud 95%); el cronograma usaba una versiÃ³n truncada/distinta.",
                                                       "time":  "15:00â€“15:20"
                                                   },
                                                   {
                                                       "title":  "El arte de la geologÃ­a, la geologÃ­a en el arte",
                                                       "status":  "confirmado",
                                                       "authors":  "Clemencia GÃ³mez",
                                                       "email":  "clgomezgo@unal.edu.co",
                                                       "time":  "15:20â€“15:40"
                                                   },
                                                   {
                                                       "title":  "Arcillas, minerales y cerÃ¡mica: una perspectiva de proveniencia GeoarqueolÃ³gica en la Sierra Nevada de Santa Marta",
                                                       "authors":  "MarÃ­a Carolina Sosa GarcÃ©s, Kevin Granados, Thomas Heinrich Cramer",
                                                       "email":  "mcsosa@unimagdalena.edu.co",
                                                       "linea":  "PaleontologÃ­a Â· Geopatrimonio Â· GeoarqueologÃ­a",
                                                       "status":  "confirmado",
                                                       "time":  "15:40â€“16:00"
                                                   }
                                               ],
                                       "205":  [
                                                   {
                                                       "title":  "AnÃ¡lisis petrofÃ­sico, petrogrÃ¡fico, sedimentolÃ³gico y litogeoquÃ­mico en la FormaciÃ³n Chipaque y el Grupo Guadalupe",
                                                       "status":  "confirmado",
                                                       "authors":  "Granados-Sabio, Kevin Felipe; VÃ©lez-Hoyos, Juan David",
                                                       "email":  "kfgranadoss@unal.edu.co",
                                                       "note":  "TÃ­tulo emparejado por similitud (70%) con hoja maestra; revisar redacciÃ³n exacta. | Confirmado 23-jun (revisiÃ³n ampliada, criterio: autor/coautor inscrito sin requerir que declare este tÃ­tulo exacto) â€” Kevin Felipe Granados Sabio â€” ver CRONOGRAMA_CONFIRMADO_2026-06-23.md",
                                                       "time":  "14:00â€“14:20"
                                                   },
                                                   {
                                                       "title":  "AnÃ¡lisis geolÃ³gico y estructural a escala 1:10 000 en la zona bananera, flanco noroeste del SNSM",
                                                       "status":  "confirmado",
                                                       "authors":  "Franklin David Cueto Jaime, Rafael Aldair Montero Moreno, Ivan Ramith Montero Arias",
                                                       "email":  "imontero3@estudiantes.areandina.edu.co",
                                                       "note":  "InscripciÃ³n formalizada por la universidad (Areandina). TÃ­tulo emparejado por similitud (60%) con hoja maestra; revisar redacciÃ³n exacta.",
                                                       "time":  "14:20â€“14:40"
                                                   },
                                                   {
                                                       "title":  "Procedencia sedimentaria en la cuenca del rÃ­o GualÃ­: una perspectiva Source-to-Sink desde el Mioceno al presente",
                                                       "authors":  "Valentina Agudelo, SalomÃ© LÃ³pez, Jesmy MartÃ­nez, Samuel CaÃ±as, MarÃ­a Isabel Sierra",
                                                       "email":  "m.sierrarojas@uniandes.edu.co",
                                                       "linea":  "EstratigrafÃ­a y SedimentologÃ­a",
                                                       "status":  "confirmado",
                                                       "time":  "14:40â€“15:00"
                                                   },
                                                   {
                                                       "title":  "EstratigrafÃ­a y procedencia multi-tÃ©cnica del Complejo Quebradagrande: implicaciones para la evoluciÃ³n tectonosedimentaria del margen noroccidental suramericano y su relaciÃ³n con la colisiÃ³n de la placa Caribe.",
                                                       "status":  "confirmado",
                                                       "authors":  "AnamarÃ­a Vera GonzÃ¡lez, SebastiÃ¡n Zapata Henao, GermÃ¡n Alonso Bayona Chaparro, AgustÃ­n Cardona Molina, Ana MarÃ­a Valencia LondoÃ±o, Jhonathan Steven Tovar Tovar, Juan Camilo Valencia GÃ³mez, HernÃ¡n Felipe Morales Contreras",
                                                       "email":  "anamaria.vera@urosario.edu.co",
                                                       "note":  "Contacto AnamarÃ­a Vera con inscripciÃ³n formalizada por su universidad (Rosario).",
                                                       "time":  "15:00â€“15:20"
                                                   },
                                                   {
                                                       "title":  "Relatos de una SerranÃ­a: caracterizaciÃ³n geolÃ³gica, estructural y mineralÃ³gica de la vereda Cerrito (Barrancas, La Guajira)",
                                                       "status":  "confirmado",
                                                       "authors":  "Carlos Manuel Martinez Ballesteros, Ana Cristina Ruiz Sequeda, Maria Camila Perdomo Geney",
                                                       "email":  "cmartinez193@estudiantes.areandina.edu.co",
                                                       "note":  "InscripciÃ³n formalizada por la universidad (Areandina). TÃ­tulo emparejado por similitud (72%) con hoja maestra; revisar redacciÃ³n exacta.",
                                                       "time":  "15:20â€“15:40"
                                                   },
                                                   {
                                                       "title":  "FACIES ESTRATIGRÃFICAS, PROXIES GEOQUÃMICOS Y REGISTRO FOSILÃFERO PARA LA RECONSTRUCCIÃ“N DEL PALEOAMBIENTE DE LA FORMACIÃ“N LA PAJA: VÃ‰LEZ, SANTANDER, COLOMBIA",
                                                       "authors":  "German Reyes Mendoza, Jose Maria Cantillo De la Hoz, Josep Anton Moreno Bedmar",
                                                       "email":  "jcantillo@unal.edu.co",
                                                       "linea":  "EstratigrafÃ­a y SedimentologÃ­a",
                                                       "status":  "confirmado",
                                                       "time":  "15:40â€“16:00"
                                                   }
                                               ],
                                       "206":  [
                                                   {
                                                       "title":  "De la Mina al Debate Social: AnÃ¡lisis Multidimensional de los Hidrocarburos y el CarbÃ³n en Colombia.",
                                                       "status":  "confirmado",
                                                       "authors":  "Samir Elier BermÃºdez Castellanos",
                                                       "email":  "sbermudezc@unal.edu.co",
                                                       "note":  "Confirmado 26-jun (autodeclaraciÃ³n directa en el formulario de inscripciÃ³n actualizado / cruce por email-contacto y coautores) â€” Autodeclarado por Felipe Espinosa OrdoÃ±ez - Jank Carlos Rosero Otalvaro - Juan SebastiÃ¡n MuÃ±oz BenÃ­tez - Samir Elier BermudezCastellanos - Juan SebastiÃ¡n MuÃ±oz BenÃ­tez en el campo \u0027Nombre de la Ponencia o Poster\u0027 (similitud 100%). â€” ver CRONOGRAMA_CONFIRMADO_2026-06-26.md",
                                                       "time":  "14:00â€“14:20"
                                                   },
                                                   {
                                                       "title":  "La cartografÃ­a como lectura territorial: puentes entre geografÃ­a y geologÃ­a",
                                                       "status":  "parcial",
                                                       "authors":  "Juanita PÃ©rez",
                                                       "email":  "juaperezbo@unal.edu.co",
                                                       "note":  "Hallada en CORREOS PONENCIAS.xlsx (aprobada) sin cupo asignado en ninguna versiÃ³n previa del cronograma; aÃ±adida en la reestructuraciÃ³n del 2026-06-17. | Confirmado 23-jun (revisiÃ³n ampliada, criterio: autor/coautor inscrito sin requerir que declare este tÃ­tulo exacto) â€” Juanita Valentina RodrÃ­guez Villamil  - Heilin Sophie Bohada Larrota - Danna Valentina Perez Velandia - Esteban Alejandro Huertas Huertas - Samuel CristÃ³bal Alba Villarraga â€” ver CRONOGRAMA_CONFIRMADO_2026-06-23.md",
                                                       "time":  "14:20â€“14:40"
                                                   },
                                                   {
                                                       "title":  "Mi Primer Libro de...: educaciÃ³n inclusiva, informada y resiliente en Ciencias de la Tierra",
                                                       "status":  "confirmado",
                                                       "authors":  "Clemencia GÃ³mez",
                                                       "email":  "clgomezgo@unal.edu.co",
                                                       "time":  "14:40â€“15:00"
                                                   },
                                                   {
                                                       "title":  "PresentaciÃ³n de la cartilla MAMA CUMBAL: VOLCÃN, MEMORIA Y TERRITORIO",
                                                       "status":  "confirmado",
                                                       "authors":  "Karen SofÃ­a Alpala Cumbal, MarÃ­a Camila BeltrÃ¡n Rueda, MarÃ­a JosÃ© Triana, Juan SebastiÃ¡n Mosquera, Juan SebastiÃ¡n MuÃ±oz BenÃ­tez, Juliana Sanabria CastaÃ±eda, Daniel Felipe GÃ³mez Hoyos, David Fernando Bucheli Rosero, Vincent EfrÃ©n TarapuÃ©s Taimal",
                                                       "email":  "etnogeocu_bog@unal.edu.co (contacto, NO inscrito)",
                                                       "note":  "Coautor inscrito: Juan SebastiÃ¡n MuÃ±oz BenÃ­tez (#42). | Confirmado 26-jun (autodeclaraciÃ³n directa en el formulario de inscripciÃ³n actualizado / cruce por email-contacto y coautores) â€” Autodeclarado por Felipe Espinosa OrdoÃ±ez - Jank Carlos Rosero Otalvaro - Juan SebastiÃ¡n MuÃ±oz BenÃ­tez - Samir Elier BermudezCastellanos - Juan SebastiÃ¡n MuÃ±oz BenÃ­tez en el campo \u0027Nombre de la Ponencia o Poster\u0027 (similitud 87%). | Coautor inscrito: Felipe Espinosa OrdoÃ±ez - Jank Carlos Rosero Otalvaro - Juan SebastiÃ¡n MuÃ±oz BenÃ­tez - Samir Elier BermudezCastellanos - Juan SebastiÃ¡n MuÃ±oz BenÃ­tez â€” ver CRONOGRAMA_CONFIRMADO_2026-06-26.md",
                                                       "time":  "15:00â€“15:20"
                                                   },
                                                   {
                                                       "title":  "AnÃ¡lisis de procedencia de las rocas turbidÃ­ticas del Miembro Urrao (FormaciÃ³n Penderisco), Cordillera Occidental: implicaciones para el reconocimiento de fuentes mÃ¡ficasâ€“ultramÃ¡ficas en condiciones tropicales",
                                                       "authors":  "Juan Felipe Granados Cardona, GermÃ¡n Bayona, SebastiÃ¡n Zapata, AgustÃ­n Cardona, Ana MarÃ­a Valencia LondoÃ±o, AnamarÃ­a Vera GonzÃ¡lez, Jhonathan Tovar, Felipe Morales",
                                                       "email":  "jugranadosc@unal.edu.co",
                                                       "linea":  "EstratigrafÃ­a y SedimentologÃ­a",
                                                       "status":  "confirmado",
                                                       "time":  "15:20â€“15:40"
                                                   }
                                               ]
                                   },
                         "auditorio":  {
                                           "cms":  [
                                                       {
                                                           "code":  "CE-2",
                                                           "time":  "14:10â€“14:50",
                                                           "title":  "Transfigura",
                                                           "speaker":  "Por confirmar",
                                                           "org":  "Transfigura",
                                                           "note":  "Tema y ponente por confirmar â€” Transfigura."
                                                       },
                                                       {
                                                           "code":  "CE-3",
                                                           "time":  "15:00â€“15:40",
                                                           "title":  "Collective Mining",
                                                           "speaker":  "Por confirmar",
                                                           "org":  "Collective Mining",
                                                           "note":  "Tema y ponente por confirmar â€” Collective Mining."
                                                       }
                                                   ]
                                       }
                     },
                     {
                         "type":  "info",
                         "time":  "16:00â€“16:30",
                         "title":  "Break (entrega segundo refrigerio)",
                         "category":  "break"
                     },
                     {
                         "type":  "block",
                         "time":  "16:30â€“17:10",
                         "auditorio":  {
                                           "cms":  [
                                                       {
                                                           "code":  "CM-2",
                                                           "time":  "16:30â€“17:10",
                                                           "title":  "CPG",
                                                           "speaker":  "Por confirmar",
                                                           "org":  "CPG",
                                                           "note":  "Tema y ponente por confirmar â€” CPG."
                                                       }
                                                   ]
                                       },
                         "cells":  null,
                         "altBlock":  {
                                          "time":  "",
                                          "title":  "Charla magistral en el auditorio",
                                          "sub":  "Asistencia general â€” sin ponencias en salones"
                                      }
                     },
                     {
                         "type":  "block",
                         "time":  "17:10â€“18:10",
                         "cells":  null,
                         "auditorio":  null,
                         "posterBatch":  [
                                             {
                                                 "title":  "ANÃLISIS SEDIMENTOLÃ“GICO DE LAS EOLIANITAS CUATERNARIAS (?) DE LA ALTA GUAJIRA (SECTOR ARCOIRIS-PILÃ“N DE AZÃšCAR) Y SU RELACIÃ“N CON EL PALEOCLIMA",
                                                 "status":  "confirmado",
                                                 "authors":  "Valentina Espinel Arias y Carlos Alberto GuzmÃ¡n LÃ³pez",
                                                 "email":  "valentina.espinel@ucaldas.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "ANÃLISIS SEDIMENTOLÃ“GICO PRELIMINAR DE LOS DEPÃ“SITOS LACUSTRES EN LA LAGUNA LOS ORTICES, SANTANDER, COLOMBIA",
                                                 "status":  "parcial",
                                                 "authors":  "Nicolas Santamaria Jaimes, Edward Duarte, Juan Felipe Franco, Jaime Escobar, Diego Suescun Carvajal, Marly Karina Garcia, Giovanny Jimenez, Victoria Mousalli",
                                                 "email":  "nikolsant73@gmail.com",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "Almacenamiento de hidrÃ³geno blanco en unidades clÃ¡sticas asociadas a rocas serpentinizadas en el flanco occidental de la Cordillera Central: Influencia de la mineralogÃ­a, la materia orgÃ¡nica y condiciones termodinÃ¡micas.",
                                                 "status":  "confirmado",
                                                 "authors":  "Mayerly Alejandra Ariza Caro, SebastiÃ¡n Zapata Henao, AgustÃ­n Cardona Molina, German A. Bayona, Juan David Guzman",
                                                 "email":  "marizac@unal.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "AnÃ¡lisis MorfolÃ³gico y Paleoambiental de CrustÃ¡ceos FÃ³siles en Los Santos y Guane, Santander",
                                                 "status":  "confirmado",
                                                 "authors":  "Eimy Valentina Quintana Mantilla",
                                                 "email":  "quintanamantillaeimyvalentina@gmail.com",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "AnÃ¡lisis Preliminar de la Sismicidad Inducida por el Embalse Topocoro, HidroelÃ©ctrica Sogamoso, Santander, Colombia (2005â€“2017)",
                                                 "status":  "confirmado",
                                                 "authors":  "Maria Gabriela Sanabria Murgas",
                                                 "email":  "sanabriamariagabriela@gmail.com",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "AnÃ¡lisis comparativo de mapas composicionales antes y despuÃ©s de la inyecciÃ³n de COâ‚‚ en rocas almacenadoras",
                                                 "status":  "confirmado",
                                                 "authors":  "Astrid Yuliana Echavarria Carmona \n  Samanta Gomez Lopez",
                                                 "email":  "aechavarriac@unal.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "AnÃ¡lisis de anomalÃ­as radioactivas asociadas a mineralizaciones secundarias en el distrito aurÃ­fero de Vetasâ€“California",
                                                 "status":  "confirmado",
                                                 "authors":  "Brayan Alejandro Cujaban Salamanca, Santiago Useche Luna",
                                                 "email":  "susechel@unal.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "AnÃ¡lisis de carbonataciÃ³n mineral ex situ a escala nanomÃ©trica en rocas ultramÃ¡ficas",
                                                 "status":  "confirmado",
                                                 "authors":  "Rashed Torres; Ana RoldÃ¡n; Cesar Vinasco",
                                                 "email":  "rmtorresro@unal.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "AnÃ¡lisis de geometrÃ­as de adquisiciÃ³n de Tomografia 3D para la caracterizaciÃ³n del subsuelo superficial",
                                                 "status":  "confirmado",
                                                 "authors":  "Karen Gabriela Barragan Riveros, Maria Paula BohÃ³rquez, Paul Goyes PeÃ±afiel",
                                                 "email":  "geogaby.barragan@gmail.com",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "AnÃ¡lisis de subsidencia en la Sabana de BogotÃ¡ entre 2017 y 2025 mediante interferometrÃ­a SAR",
                                                 "status":  "confirmado",
                                                 "authors":  "ThomÃ¡s Leopoldo QuiÃ±onez Pineda, Laura Marcela CÃ©spedes GÃ³mez, Angie Katherine GonzÃ¡lez CalderÃ³n",
                                                 "email":  "thomas1212ttt@gmail.com",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "AnÃ¡lisis del efecto textural en propiedades petrofÃ­sicas de rocas almacenadoras de COâ‚‚ mediante elipsoides de forma derivada de fotografÃ­a convencional.",
                                                 "status":  "confirmado",
                                                 "authors":  "Leidy Estefania Cadavid Arango, Sairandelly Gil MartÃ­nez, Camila Goez Osorio, Astrid Yuliana EchavarrÃ­a Carmona, Carlos AndrÃ©s MuÃ±oz Arrieta",
                                                 "email":  "lcadavida@unal.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "AnÃ¡lisis e interpretaciÃ³n de la gÃ©nesis y el emplazamiento de la mineralizaciÃ³n aurÃ­fera mediante cartografÃ­a geolÃ³gica a escala 1:10.000 en Minas del Vapor, Buenos Aires, El Brasil y La Palmera (Antioquia, Colombia)",
                                                 "status":  "confirmado",
                                                 "authors":  "Juan David Calderon Nieves, Yhostik Guillermo Gomez Galarza, Wilmar David Montero Figueroa, Laura Lucia Ospina OrdoÃ±ez, Karen Lorena Payares Carrasco",
                                                 "email":  "kpayares4@estudiantes.areandina.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "AnÃ¡lisis estructural de las litologÃ­as aflorantes entre La LejÃ­a y Alto La Laguna, Pamplona, Norte de Santander, Colombia",
                                                 "status":  "confirmado",
                                                 "authors":  "Britney Perez-Varela y Ilich Villamizar-Solano",
                                                 "email":  "byvarela02@gmail.com",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "Aprendizaje profundo guiado por la fÃ­sica para la inversiÃ³n no supervisada de datos de resistividad elÃ©ctrica 1D",
                                                 "status":  "confirmado",
                                                 "authors":  "Adrian Alvercy Perez Montejo; Yesid Paul Goyes PeÃ±afiel; Sait Khurama-VelÃ¡squez",
                                                 "email":  "aapm132630@gmail.com",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "CARACTERIZACIÃ“N GEOMECÃNICA Y EVALUACIÃ“N DE LA POSIBILIDAD GEOMÃ‰TRICA DE FALLA DEL MACIZO ROCOSO EN LA FORMACIÃ“N LA LUNA, VEREDAS VALDERRAMA Y TEHERÃN, GRAMALOTE, NORTE DE SANTANDER",
                                                 "status":  "confirmado",
                                                 "authors":  "Brayan Steven RodrÃ­guez RincÃ³n; Ilich SebastiÃ¡n Villamizar Solano, MarÃ­a Jose Garay Paez; Jhan Carlos Contreras Leal",
                                                 "email":  "brayan.rodriguezbra@unipamplona.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "CUMBAL: AGUA Y SALUD. CaracterizaciÃ³n hidrotermal superficial y anÃ¡lisis geoquÃ­mico de aguas asociadas al complejo volcÃ¡nico Cumbal-Chiles (NariÃ±o, Colombia)",
                                                 "status":  "confirmado",
                                                 "authors":  "Angy Emilsen Chinguad Tapie \n  Daniel Santiago CortÃ©s BarÃ³n",
                                                 "email":  "achinguad@unal.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "Cambios morfolÃ³gicos del delta del rÃ­o SinÃº a partir de anÃ¡lisis multitemporal de imÃ¡genes satelitales",
                                                 "status":  "confirmado",
                                                 "authors":  "Rashed Torres; Maria Clara Zuluaga; Liliana Betancourth",
                                                 "email":  "rmtorresro@unal.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "CaracterizaciÃ³n composicional y textural de algunos sedimentos litorales colombianos, su origen y afectaciÃ³n por procesos antropogÃ©nicos.",
                                                 "status":  "confirmado",
                                                 "authors":  "Sebastian Alzate Arango, Yenifer Camila Alzate Arbelaez, Brayan Bejarano Bejarano, Brayan Sneider Betancur Rivera, Angela Daniela BolaÃ±os MuÃ±oz, Juan Diego Cardona Ardila, Juan Esteban DurÃ¡n Quintero, Ana MarÃ­a GarcÃ­a GÃ³ngora, Santiago Hurtado RamÃ­rez, Carlos Mario MarÃ­n Moncada, Edison Stiven Mendez Vasquez, Mariana Ocampo Carmona, Camilo AndrÃ©s PatiÃ±o GarcÃ­a, Juliana Pineda Largo, Maria Paula Quintero Cardenas, Camila Alejandra Rodriguez Ruiz, Juan JosÃ© Valencia Gallego, Paula Andrea Zuluaga Cruz, Luisa MarÃ­a GÃ³mez Oliveros, Carlos Alberto GuzmÃ¡n LÃ³pez.",
                                                 "email":  "luisa.602012205@ucaldas.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "CaracterizaciÃ³n de los basaltos de la FormaciÃ³n VolcÃ¡nica en la Vereda Carbonera y su relaciÃ³n con la generaciÃ³n de hidrÃ³geno natural",
                                                 "status":  "confirmado",
                                                 "authors":  "Santiago Betancur Restrepo",
                                                 "email":  "sabetancurr@unal.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "CaracterizaciÃ³n geoquÃ­mica, termodinÃ¡mica de las rocas metamÃ³rficas del Complejo ArquÃ­a en el sector la cabaÃ±a.",
                                                 "status":  "confirmado",
                                                 "authors":  "Espinal-Pardo, Camilo (*), Casallas-HernÃ¡ndez, V. (*), Enriquez, K.D (*), PÃ©rez-Prieto, J.E (*), GonzÃ¡lez, V. (*), TimarÃ¡n, D. (*), Zaque-Escobar, N. (*), Tovar-Hoyos, N.E (*), Reyes-Rojas, J.(*), Ocampo-Hoyos, V.(*), Arenas-Naranjo, S. (*), Juajibioy-Malte, A. (*), Sarrias-GarcÃ­a, B.A(*), LeÃ³n-Barrera, L.(*), Arias-GarcÃ­a, L.F(*), MuÃ±oz-Ruiz,J.(*), Loza-Acosta, D.(*), Obando-RamÃ­rez, D.L(*), Aguas-MuÃ±oz, C.A.(*), Restrepo-Echavarria, Jorge Luis (**).\n  \n  (*) Programa de GeologÃ­a, Universidad de Caldas. (**) Departamento de Ciencias GeolÃ³gicas, Universidad de Caldas.",
                                                 "email":  "juan.espinal5953@ucaldas.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "CaracterizaciÃ³n inicial con potencial para carbonataciÃ³n ex situ de la Metahazburgita de MedellÃ­n",
                                                 "status":  "confirmado",
                                                 "authors":  "Manuel JosÃ© Hurtado Osorio, Leidy Estefania Cadavid Arango, Camila Goez Osorio, Laura Liliana MuÃ±oz Eraso, Cesar Javier Vinasco Vallejo",
                                                 "email":  "lcadavida@unal.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "CaracterizaciÃ³n mediante espectroscopia Raman y anÃ¡lisis de DRX de las diferentes fases de serpentinizaciÃ³n y su potencial de generaciÃ³n de hidrÃ³geno en las rocas ultramÃ¡ficas del sistema Caucaâ€“Romeral",
                                                 "status":  "confirmado",
                                                 "authors":  "HernÃ¡n Felipe Morales Contreras, Juan Pablo Zapata Villada, Sebastian Zapata Henao, Agustin Cardona Molina, Juan Sebastian Jaramillo Rios",
                                                 "email":  "felipe.morales226@outlook.com",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "CaracterizaciÃ³n mineralÃ³gica y textural de Ã¡gatas asociadas a la FormaciÃ³n YavÃ­, Departamentos de Huila y Tolima, Colombia.",
                                                 "status":  "confirmado",
                                                 "authors":  "Maryei Urrego, Sophia Ruiz, Leidy Maldonado, Felipe Gonzalez, Andres Franco, Alejando Vasquez, Camila Pajaro, Mariangel Giron, Yery Presiga, Marion weber, Natalia Acevedo",
                                                 "email":  "soruizm@unal.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "CaracterizaciÃ³n petrogrÃ¡fica de cobaltita en un skarn de PayandÃ© y su implicaciÃ³n metalogenÃ©tica",
                                                 "status":  "confirmado",
                                                 "authors":  "Santiago Grajales Loaiza, Camila Andrea Montoya, Cristian Santiago Benavides, Juan David RÃ­os Gonzales, Valery Casallas HernÃ¡ndez",
                                                 "email":  "santiago.grajales23158@ucaldas.edu.co",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "CaracterizaciÃ³n petrogrÃ¡fica preliminar de asociaciones minerales y relaciones paragenÃ©ticas en rocas del Complejo ArquÃ­a, en el RÃ­o ArquÃ­a.",
                                                 "status":  "confirmado",
                                                 "authors":  "Valentina Agudelo DurÃ¡n, SebastiÃ¡n Zapata, Alejandra MarÃ­a Bedoya, Sara Villa, Agustin Cardona",
                                                 "email":  "v.agudelo@uniandes.edu.co",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "CaracterizaciÃ³n petrogrÃ¡fica, diagenÃ©tica y de inclusiones fluidas en arenitas de la FormaciÃ³n Cinta de Piedra (sector La Tebaida-Zarzal)",
                                                 "status":  "confirmado",
                                                 "authors":  "Felipe Espinosa OrdoÃ±ez, Juan Carlos Molano Mendoza, Manuel Arnulfo PÃ¡ez Reyes, Andrea Milena Mayor Amador, Santiago Daniel Jimenez Diaz, Yael Natalia Mendez Chaparro",
                                                 "email":  "anespinosao@unal.edu.co",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "CaracterizaciÃ³n y anÃ¡lisis mineral del sistema hidrotermal de alta ley de plata del proyecto Santa Ana â€“ Outcrop Silver",
                                                 "status":  "confirmado",
                                                 "authors":  "Johan Camilo Aros JimÃ©nez, Alex Julian Insuasty EspaÃ±a",
                                                 "email":  "alex.insuasty23424@ucaldas.edu.co",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "Controles EstratigrÃ¡ficos Y Estructurales Del Sistema GeotÃ©rmico Paipa-Iza En El Area De Iza (BoyacÃ¡)",
                                                 "status":  "confirmado",
                                                 "authors":  "Valeria Vargas Velandia; Ãlvaro Alejandro Villar Cepeda; CÃ©sar Augusto GÃ³mez Vanegas",
                                                 "email":  "valeriavargasvelandia@gmail.com",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "CorrelaciÃ³n, estratigrafÃ­a, y procedencia de las unidades del CretÃ¡cico inferior en el occidente colombiano",
                                                 "status":  "confirmado",
                                                 "authors":  "Jhonathan Steven Tovar Tovar",
                                                 "email":  "jhosto1997lo@hotmail.com",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "DetecciÃ³n, segmentaciÃ³n y anÃ¡lisis espacio-temporal de manchas de hidrocarburos en imÃ¡genes SAR mediante aprendizaje profundo",
                                                 "status":  "confirmado",
                                                 "authors":  "David GÃ¼iza-Vanegas; Juan Vesga-Figueroa; MarÃ­a Roa-Archila; ThomÃ¡s QuiÃ±onez- Pineda; Sanin CeledÃ³n del Prado; Kevin Tarazona-Balaguera; AdriÃ¡n PÃ©rez-Montejo; Sait Khurama-VelÃ¡squez",
                                                 "email":  "sanin2230580@correo.uis.edu.co",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "DeterminaciÃ³n de los rasgos morfotectÃ³nicos utilizando sensores remotos y sistemas de informaciÃ³n geogrÃ¡ficas (SIG), en la provincia tectÃ³nica de Sierra nevada y Santa Marta ; Sierra Nevada de Santa Marta, Colombia.",
                                                 "status":  "confirmado",
                                                 "authors":  "Juan Miguel FernÃ¡ndez, Omar Orlando silva, ElÃ­as Ernesto rojas",
                                                 "email":  "jfernandez74@estudiantes.areandina.edu.co",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "DeterminaciÃ³n de los rasgos morfotectÃ³nicos utilizando sensores remotos y sistemas de informaciÃ³n geogrÃ¡ficas (SIG), en las provincia tectÃ³nica de Sevilla; Sierra Nevada de Santa Marta, Colombia.",
                                                 "status":  "confirmado",
                                                 "authors":  "Jesus Manuel Vizcaino Martinez\n  Elias Ernesto Rojas Martinez\n  Frank Lascarro Navarro",
                                                 "email":  "jvizcaino4@estudiantes.areandina.edu.co",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "DeterminaciÃ³n del Ã­ndice de erosiÃ³n hÃ­drica en la cuenca PanamÃ¡ en el municipio de San JoaquÃ­n, Santander",
                                                 "status":  "confirmado",
                                                 "authors":  "MarÃ­a Juliana ChacÃ³n Porras,\n  Manuel GonzÃ¡lez RodrÃ­guez,\n  Silvia Alejandra Vargas Cano,\n  Johan Enrique PÃ¡ez Romero",
                                                 "email":  "mariajuchaconp@gmail.com",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "Diversidad de foraminÃ­feros bentÃ³nicos de la BahÃ­a Hondita, Alta Guajira: un recorrido por los Ãºltimos 1800 aÃ±os",
                                                 "status":  "confirmado",
                                                 "authors":  "CÃ¡rdenas Naranjo Mariana Valentina, BriceÃ±o Zuluaga Francisco Javier",
                                                 "email":  "est.marianav.carde1@unimilitar.edu.co",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "Equinodermos (Blastoidea) del CarbonÃ­fero de Labateca, Norte de Santander, Colombia",
                                                 "status":  "parcial",
                                                 "authors":  "Arley de J. GÃ³mez-Cruz\n  Alexander Lemus-Restrepo\n  Jorge Luis Restrepo-EchavarrÃ­a\n  Mario Moreno-SÃ¡nchez",
                                                 "email":  "arley.gomez@ucaldas.edu.co",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "Estrategia de divulgaciÃ³n interactiva sobre transiciÃ³n energÃ©tica dirigida a estudiantes de educaciÃ³n secundaria",
                                                 "status":  "confirmado",
                                                 "authors":  "Valeria Vargas Velandia1 ; YasmÃ­n Pelayo Serrano2 ; Juan Carlos RamÃ­rez Arias3",
                                                 "email":  "01220641026@mail.udes.edu.co1 ; yas.pelayo@mail.udes.edu.co2 ; jua.ramirez@mail.udes.edu.co3",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "EvaluaciÃ³n comparativa entre modelos lineales y aprendizaje automÃ¡tico para la predicciÃ³n de la porosidad a partir de registros de pozo",
                                                 "status":  "confirmado",
                                                 "authors":  "Francisco Gamboa Ortega;  Jonathas da Silva Maciel ",
                                                 "email":  "â€”",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "EvaluaciÃ³n de ParÃ¡metros FisicoquÃ­micos como Indicadores de la Calidad del Agua en la Cuenca Media del RÃ­o de Oro",
                                                 "status":  "confirmado",
                                                 "authors":  "MarÃ­a Juliana ChacÃ³n Porras, Oscar Esteban Fonseca PÃ©rez, Johan Enrique PÃ¡ez Romero, David Blanco Quiroga, Angy Stephany Plata, Juan Diego Colegial GutiÃ©rrez, Mayra Isabel Vargas CÃ¡ceres",
                                                 "email":  "mariajuchaconp@gmail.com",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "EvaluaciÃ³n de la actividad neo-tectÃ²nica de la Falla de BoyacÃ , en el sector SotaquirÃ  - Duitama mediante anÃ¡lisis geomorfomÃ©trico",
                                                 "status":  "confirmado",
                                                 "authors":  "Maria Fernanda Camargo Pacheco\n  Michell Jannin Romero Cano",
                                                 "email":  "maria.camargo13@uptc.edu.co",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "EvaluaciÃ³n del efecto textural de rocas potencialmente almacenadoras de CO2 en las propiedades petrofÃ­sicas fundamentales usadas para estudios de geoalmacenamiento de CO2 a travÃ©s de anÃ¡lisis de tÃ©cnicas de AnisotropÃ­a de Susceptibilidad MagnÃ©tica (ASM)",
                                                 "status":  "confirmado",
                                                 "authors":  "Juliana Andrea BolÃ­var Tovar, Sairandelly, CÃ©sar Vinasco",
                                                 "email":  "julianabolivar12345@gmail.com",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "EvaluaciÃ³n del impacto de la extracciÃ³n intensiva en el acuÃ­fero del Golfo de UrabÃ¡ mediante modelaciÃ³n numÃ©rica en FloPy",
                                                 "status":  "confirmado",
                                                 "authors":  "Andres Felipe DurÃ¡n Lascarro, Maria Paula Roa Archila",
                                                 "email":  "paularoa2105@gmail.com",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "EvaluaciÃ³n del potencial de gas metano en mantos de carbÃ³n de Socha (BoyacÃ¡) como alternativa energÃ©tica, control de riesgos y mitigaciÃ³n de huella de carbono",
                                                 "status":  "confirmado",
                                                 "authors":  "Laura M. MontaÃ±ez S. (Laura.montaÃ±ez@uptc.edu.co), Jorge Eliecer MariÃ±o Martinez (Jorge.marino@uptc.edu.co), Laura C. MontaÃ±a S. (Laura.montana03@uptc.edu.co), Julied A. Melo S. (julied.melo@uptc.edu.co)",
                                                 "email":  "jorge.marino@uptc.edu.co",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "EvaluaciÃ³n integral a travÃ©s del sistema GTP para la articulaciÃ³n del componente hidrogeolÃ³gico en la planificaciÃ³n territorial de la cuenca alta del rÃ­o Chicamocha (BoyacÃ¡)",
                                                 "status":  "confirmado",
                                                 "authors":  "Maria Alejandra Galvis NiÃ±o",
                                                 "email":  "maria.galvis@uptc.edu.co",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "Gemelos digitales como insumo para la enseÃ±anza y divulgaciÃ³n de las geociencias",
                                                 "status":  "confirmado",
                                                 "authors":  "Liseth Leal; Juan GarcÃ­a; David Inguilan; Holman DueÃ±as; Daniel Romero; Cristhian Cuadros; Juliana RodrÃ­guez; AngÃ©lica Alvarez; Sergio AndrÃ©s GarcÃ­a-Arias",
                                                 "email":  "gaira.geo.uis@gmail.com",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "GeneraciÃ³n de registros sintÃ©ticos para la caracterizaciÃ³n petrofÃ­sica de pozos mediante Python",
                                                 "status":  "confirmado",
                                                 "authors":  "Esteban Fonseca PÃ©rez; Gabriela Majthenyi Correa; Sophia Madiedo Cala",
                                                 "email":  "sophiamadiedo.c@gmail.com",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "GeocronologÃ­a y caracterizaciÃ³n estructural de las milonitas asociadas al sistema de fallas Cauca-Romeral en el segmento norte del CaÃ±Ã³n del Cauca.",
                                                 "status":  "confirmado",
                                                 "authors":  "Daniel Ortiz, SebastiÃ¡n Zapata, Laura CalderÃ³n, AgustÃ­n Cardona, Alejandra Bedoya",
                                                 "email":  "danielale.ortiz@urosario.edu.co",
                                                 "salon":  "B"
                                             },
                                             {
                                                 "title":  "AnÃ¡lisis de la anomalÃ­a residual gravimÃ©trica en el valle de Sogamoso, BoyacÃ¡, Colombia",
                                                 "authors":  "Samuel David Castellanos Toledo",
                                                 "status":  "confirmado",
                                                 "email":  "samuel.castellanos@uptc.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "Sistema Integral de Registro GeolÃ³gico en Campo como Herramienta de GeoeducaciÃ³n en IngenierÃ­a GeolÃ³gica",
                                                 "authors":  "Giselle Camila Cordoba Orozco, Jose Eduardo Sotelo Suarez, Durlandy David Meza MejÃ­a",
                                                 "status":  "confirmado",
                                                 "salon":  "A",
                                                 "email":  "gcordoba13@estudiantes.areandina.edu.co",
                                                 "linea":  "TecnologÃ­a: SIG Â· ML Â· IA Â· Sensores Remotos"
                                             },
                                             {
                                                 "title":  "Geopicnic: una estrategia participativa para la comunicaciÃ³n y divulgaciÃ³n de las geociencias",
                                                 "authors":  "Andres Felipe Abaunza Jolianis",
                                                 "status":  "pendiente",
                                                 "salon":  "A",
                                                 "email":  "sipg.uis@outlook.com"
                                             },
                                             {
                                                 "title":  "Estrategia de geoeducaciÃ³n y apropiaciÃ³n del patrimonio geolÃ³gico en estudiantes de bÃ¡sica secundaria de CepitÃ¡, Santander",
                                                 "authors":  "Jose Ferney Mantilla Silva; Cristian Bravo; Santiago Chavez Rivera; Juan Felipe Rojas GÃ³mez; Jorge Alexander PÃ©rez BermÃºdez",
                                                 "status":  "pendiente",
                                                 "salon":  "A",
                                                 "email":  "sipg.uis@outlook.com"
                                             },
                                             {
                                                 "title":  "GalerÃ­a Chicamocha: una experiencia didÃ¡ctica para la divulgaciÃ³n de la historia de la Tierra",
                                                 "authors":  "Nicolle Dayanna Acosta Galindo; Maria Camila Rangel; Santiago Morales Rangel; Victoria Isaza Gamboa; Gabriel Salamanca Vargas",
                                                 "status":  "pendiente",
                                                 "salon":  "A",
                                                 "email":  "sipg.uis@outlook.com"
                                             },
                                             {
                                                 "title":  "Georuta lineal y geoeducaciÃ³n en el CaÃ±Ã³n del Chicamocha: una propuesta pedagÃ³gica para la apropiaciÃ³n del patrimonio geolÃ³gico en CepitÃ¡",
                                                 "authors":  "Santiago Chavez Rivera; Felipe Rojas Rivera; JosÃ© Ferney Mantilla; Jorge Alexander PÃ©rez; Cristian Bravo",
                                                 "status":  "pendiente",
                                                 "salon":  "A",
                                                 "email":  "sipg.uis@outlook.com"
                                             },
                                             {
                                                 "title":  "DiseÃ±o de una georuta interpretativa en Los Santos como estrategia de divulgaciÃ³n de las geociencias",
                                                 "authors":  "JosÃ© Manolo GÃ³mez Silva; Sharon Ximena Vargas Martinez; Valentina Zapata; Hernando GarcÃ­a",
                                                 "status":  "pendiente",
                                                 "salon":  "A",
                                                 "email":  "sipg.uis@outlook.com"
                                             },
                                             {
                                                 "title":  "Guardianes de las rocas y la vida: GeoeducaciÃ³n y divulgaciÃ³n cientÃ­fica con niÃ±os en la Ludoteca Municipal del Alto del Viento, Barichara, Santander",
                                                 "authors":  "Lina Antares Tachai EchavarrÃ­a-Plata; Maria Camila Rangel; Nicolas Santamaria; Danna Katherine Acevedo Vargas",
                                                 "status":  "pendiente",
                                                 "salon":  "A",
                                                 "email":  "sipg.uis@outlook.com"
                                             }
                                         ]
                     },
                     {
                         "type":  "info",
                         "time":  "18:00â€“19:00",
                         "title":  "Salida Termales (mÃ¡x. 7:00 PM)",
                         "category":  "cierre"
                     }
                 ]
    },
    {
        "id":  "jue",
        "label":  "Jueves 20",
        "sub":  "6 salas (maÃ±ana) Â· CM-3 y CM-4 Â· CE-4 a CE-6 Â· paneles Â· pÃ³sters PM Â· SGC todo el dÃ­a",
        "desc":  "Actualizado jul-2026: ponencias en la maÃ±ana (3Ã—25 min por sala, 8:10â€“9:25) con CE-4 y CE-5 en paralelo; CM-3 a las 9:50; Panel de GestiÃ³n del Riesgo 11:00â€“12:30; GeologÃ­a en Vivo 2:00â€“3:00 PM; CM-4 y CE-6 en la tarde; pÃ³sters 5:10â€“6:20 PM (1 salÃ³n). SGC todo el dÃ­a en 1 salÃ³n de Bienestar.",
        "rooms":  [
                      "201",
                      "202",
                      "203",
                      "204",
                      "205",
                      "206"
                  ],
        "themes":  {
                       "201":  "Estructural Â· TectÃ³nica",
                       "202":  "GeologÃ­a Regional Â· Magmatismo Â· Termal",
                       "203":  "EstratigrafÃ­a Â· SedimentologÃ­a",
                       "204":  "PetrologÃ­a MetamÃ³rfica e Ãgnea",
                       "205":  "HidrogeologÃ­a Â· Geotecnia",
                       "206":  "Historia GeolÃ³gica Â· PetrologÃ­a MetamÃ³rfica"
                   },
        "sgcColumn":  true,
        "sgcHeader":  "SGC",
        "rows":  [
                     {
                         "type":  "block",
                         "time":  "8:10â€“9:40",
                         "cells":  {
                                       "201":  [
                                                   {
                                                       "title":  "EvoluciÃ³n tectono-paleogeogrÃ¡fica del basamento Meso-Neoproterozoico del norte de los Andes y MÃ©xico",
                                                       "status":  "confirmado",
                                                       "authors":  "Jorge Luis Restrepo Echavarria, Mario Moreno SÃ¡nchez, Alexander Lemus Restrepo, Arley de JesÃºs GÃ³mez Cruz",
                                                       "email":  "jorge.restrepo_e@ucaldas.edu.co",
                                                       "note":  "TÃ­tulo emparejado por similitud (69%) con hoja maestra; revisar redacciÃ³n exacta. | Confirmado 23-jun (revisiÃ³n ampliada, criterio: autor/coautor inscrito sin requerir que declare este tÃ­tulo exacto) â€” Jorge Luis Restrepo Echavarria â€” ver CRONOGRAMA_CONFIRMADO_2026-06-23.md",
                                                       "time":  "8:10â€“8:35"
                                                   },
                                                   {
                                                       "title":  "SecciÃ³n estructural a escala 1:10.000 entre la Quebrada Chiracoca (Vereda Buenavista Parte Baja) â€“ Vereda Lobatica ChinÃ¡cota, sur de la cuenca del Catatumbo, Norte de Santander",
                                                       "status":  "confirmado",
                                                       "authors":  "Paula Fernanda Leal PeÃ±a, Paula Valentina FlÃ³rez Rozo (Coautores: Alejandra MejÃ­a-Molina, Ilich Villamizar-Solano)",
                                                       "email":  "paula.lealpau@unipamplona.edu.co",
                                                       "note":  "InscripciÃ³n grupal (Combo Parche, 5 personas) confirmada el 2026-06-16 â€” Universidad de Pamplona. Postulado tambiÃ©n como pÃ³ster; el comitÃ© (Angela Ramos, coordinadora Univ. Pamplona) confirmÃ³ esta modalidad como PONENCIA el 17-jun-2026 â€” la copia de pÃ³ster fue retirada del cronograma.",
                                                       "time":  "8:35â€“9:00"
                                                   },
                                                   {
                                                       "title":  "EvoluciÃ³n de las cuencas de antearco en Ecuador: relaciÃ³n entre las cuencas sedimentarias en el onshore y en el offshore",
                                                       "authors":  "MarÃ­a JosÃ© HernÃ¡ndez, FranÃ§ois Michaud, Elia d\u0027Acremont, Jean-Yves Collot, Jean-NoÃ«l Proust, Diego Barba",
                                                       "email":  "maria.hernandez@epn.edu.ec",
                                                       "linea":  "Estructural Â· TectÃ³nica",
                                                       "status":  "confirmado",
                                                       "time":  "9:00â€“9:25"
                                                   }
                                               ],
                                       "202":  [
                                                   {
                                                       "title":  "EvoluciÃ³n magmÃ¡tica y relaciones estructurales del Complejo Quebradagrande en la regiÃ³n de Filadelfia (Dpto. Caldas)",
                                                       "status":  "confirmado",
                                                       "authors":  "Daniela Molina, Eliana Botello, AgustÃ­n Cardona, Juan SebastiÃ¡n Jaramillo, Catalina Salgado, SebastiÃ¡n Zapata",
                                                       "email":  "dmolinaa@unal.edu.co",
                                                       "note":  "InscripciÃ³n formalizada por la universidad (UNAL). No se encontrÃ³ coincidencia en PONENTES/CORREOS PONENCIAS.xlsx â€” falta agregarlo a la hoja maestra.",
                                                       "time":  "8:10â€“8:35"
                                                   },
                                                   {
                                                       "title":  "CONFIGURACIÃ“N ESTRUCTURAL Y EVOLUCIÃ“N TERMOCINEMÃTICA DEL PIEDEMONTE DE LA SIERRA NEVADA DE EL COCUY, CORDILLERA ORIENTAL DE COLOMBIA",
                                                       "status":  "confirmado",
                                                       "authors":  "Juan SebastiÃ¡n BohÃ³rquez Rozo, Juan Carlos RamÃ­rez Arias, Jairo Torres",
                                                       "email":  "01210642017@mail.udes.edu.co",
                                                       "time":  "8:35â€“9:00"
                                                   },
                                                   {
                                                       "title":  "EVALUACIÃ“N DEL EFECTO TERMAL ASOCIADO A LA ZONA DE SUBDUCCIÃ“N DE LA PLACA CARIBE EN LA EXPRESIÃ“N TERMOCRONOLÃ“GICA DE LA SIERRA NEVADA DE SANTA MARTA",
                                                       "status":  "confirmado",
                                                       "authors":  "Catalina FlÃ³rez PabÃ³n, Yasmin Pelayo Serrano, Juan Carlos RamÃ­rez Arias",
                                                       "email":  "buc21641001@mail.udes.edu.co",
                                                       "time":  "9:00â€“9:25"
                                                   }
                                               ],
                                       "203":  [
                                                   {
                                                       "title":  "EstratigrafÃ­a integrada de la transiciÃ³n Barremiano-Aptiano en Villanueva (Santander): implicaciones del registro del Evento AnÃ³xico OceÃ¡nico-1a (EAO1a) en la Cordillera Oriental",
                                                       "status":  "confirmado",
                                                       "authors":  "Cantillo de la Hoz, Jose Maria; PÃ¡ez Reyes, Manuel Arnulfo; Gaona NarvÃ¡ez, Tatiana",
                                                       "note":  "Posible duplicado en el cronograma (verificar). Duplicado 1/2 â€” mismo tÃ­tulo repetido a las 14:30. ComitÃ© debe definir versiÃ³n oficial (autores: Cantillo de la Hoz / PÃ¡ez Reyes et al.). No se encontrÃ³ coincidencia en PONENTES/CORREOS PONENCIAS.xlsx â€” falta agregarlo a la hoja maestra. | Confirmado 23-jun: JosÃ© MarÃ­a Cantillo de la Hoz inscrito como contacto â€” duplicado de fila pendiente de resolver con el comitÃ©, ver CRONOGRAMA_CONFIRMADO_2026-06-23.md",
                                                       "email":  "jcantillo@unal.edu.co",
                                                       "time":  "8:10â€“8:35"
                                                   },
                                                   {
                                                       "title":  "Usando geoquÃ­mica en rocas detrÃ­ticas para trazar Ã¡reas fuente de composiciones mÃ¡ficas y ultramÃ¡ficas",
                                                       "status":  "confirmado",
                                                       "authors":  "Ana MarÃ­a Valencia LondoÃ±o, GermÃ¡n Bayona, SebastiÃ¡n Zapata, AgustÃ­n Cardona, AnamarÃ­a Vera GonzÃ¡lez, Felipe Granados, Jhonatan Tovar, Felipe Morales",
                                                       "email":  "anvalencial@unal.edu.co",
                                                       "note":  "InscripciÃ³n formalizada por la universidad (UNAL). TÃ­tulo emparejado por similitud (73%) con hoja maestra; revisar redacciÃ³n exacta.",
                                                       "time":  "8:35â€“9:00"
                                                   },
                                                   {
                                                       "title":  "EvoluciÃ³n tectonoestratigrÃ¡fica NeÃ³gena de la Cordillera Occidental (1Â°â€“4Â° N).",
                                                       "status":  "parcial",
                                                       "authors":  "SebastiÃ¡n Echeverri, AndrÃ©s Pardo-Trujillo, SebastiÃ¡n Zapata, Sergio A. Celis, Ãngel Barbosa-Espitia, MÃ³nica Carvalho",
                                                       "email":  "jecheverrisa@unal.edu.co",
                                                       "note":  "Confirmado 23-jun (revisiÃ³n ampliada, criterio: autor/coautor inscrito sin requerir que declare este tÃ­tulo exacto) â€” Sebastian Zapata Henao â€” ver CRONOGRAMA_CONFIRMADO_2026-06-23.md",
                                                       "time":  "9:00â€“9:25"
                                                   }
                                               ],
                                       "204":  [
                                                   {
                                                       "title":  "CaracterizaciÃ³n estructural de los basamentos Permo-TriÃ¡sicos del norte de la Cordillera Central: implicaciones tectÃ³nicas",
                                                       "status":  "confirmado",
                                                       "authors":  "Maria Alejandra Parra Maldonado, SebastiÃ¡n Zapata, Laura CalderÃ³n Diaz, AgustÃ­n Cardona, Alejandra Bedoya",
                                                       "email":  "mariaalejandr.parra@urosario.edu.co",
                                                       "note":  "InscripciÃ³n formalizada por la universidad (Rosario). No se encontrÃ³ coincidencia en PONENTES/CORREOS PONENCIAS.xlsx â€” falta agregarlo a la hoja maestra.",
                                                       "time":  "8:10â€“8:35"
                                                   },
                                                   {
                                                       "title":  "Metamorfismo de muy bajo grado en el registro volcano-sedimentario CretÃ¡cico del flanco occidental de la Cordillera Central colombiana.",
                                                       "status":  "confirmado",
                                                       "authors":  "Paulina MuÃ±oz Duque, AgustÃ­n Cardona Molina, SebastiÃ¡n Zapata Henao, Klaus Wemmer, Catalina Salgado Olascuaga, David PatiÃ±o Valencia",
                                                       "email":  "pmunozdu@unal.edu.co",
                                                       "note":  "Contacto Paulina MuÃ±oz con inscripciÃ³n formalizada por su universidad (UNAL).",
                                                       "time":  "8:35â€“9:00"
                                                   },
                                                   {
                                                       "title":  "EvaluaciÃ³n de los protolitos y el metamorfismo de los Esquistos de Sabaletas en Armenia Mantequilla (Dpto. Caldas)",
                                                       "authors":  "Catalina Salgado, AgustÃ­n Cardona, David PatiÃ±o, JuliÃ¡n Parra, Juan Pablo Zapata, Juan SebastiÃ¡n Jaramillo, Paulina MuÃ±oz, Daniela Molina, SebastiÃ¡n Zapata",
                                                       "email":  "csalgadoo@unal.edu.co",
                                                       "linea":  "PetrologÃ­a MetamÃ³rfica Â· GeocronologÃ­a",
                                                       "status":  "confirmado",
                                                       "time":  "9:00â€“9:25"
                                                   }
                                               ],
                                       "205":  [
                                                   {
                                                       "title":  "RelaciÃ³n entre la mineralogÃ­a de arcillas, la expansiÃ³n de suelos y la ocurrencia de deslizamientos en Colombia",
                                                       "status":  "confirmado",
                                                       "authors":  "Juan Esteban Cabarcas Fajardo",
                                                       "email":  "jcabarcasfajardo@gmail.com",
                                                       "note":  "Confirmado 23-jun (revisiÃ³n ampliada, criterio: autor/coautor inscrito sin requerir que declare este tÃ­tulo exacto) â€” Juan Esteban Cabarcas Fajardo â€” ver CRONOGRAMA_CONFIRMADO_2026-06-23.md",
                                                       "time":  "8:10â€“8:35"
                                                   },
                                                   {
                                                       "title":  "CaracterizaciÃ³n geomecÃ¡nica multiescala de Bimrocks, ladera oriental del Valle de AburrÃ¡",
                                                       "status":  "confirmado",
                                                       "authors":  "Sara Castro Ortiz, Juan Esteban FlÃ³rez Rueda, Juan Esteban PabÃ³n Cruz, Diego Armando RendÃ³n Giraldo, SebastiÃ¡n SÃ¡nchez Gil",
                                                       "email":  "scastroo@unal.edu.co",
                                                       "time":  "8:35â€“9:00"
                                                   },
                                                   {
                                                       "title":  "PredicciÃ³n de la Respuesta Carga-Asentamiento en Cimentaciones Corridas sobre Arena usando el MÃ©todo de Elementos Finitos y Machine Learning",
                                                       "authors":  "Felipe Tiria Castro, Daniel Esteban GalÃ¡n Palacios, Deibyd Yesid Rosas Mesa, Danny Jose Useche Infante",
                                                       "email":  "felipe.tiria01@uptc.edu.co",
                                                       "linea":  "HidrogeologÃ­a Â· Geotecnia",
                                                       "status":  "confirmado",
                                                       "time":  "9:00â€“9:25"
                                                   }
                                               ],
                                       "206":  [
                                                   {
                                                       "title":  "Territorios del Tiempo Profundo: integraciÃ³n del patrimonio geolÃ³gico, fÃ³sil y minero en la Cuenca Cesar-RancherÃ­a",
                                                       "status":  "confirmado",
                                                       "authors":  "Laura Lucia Ospina OrdÃ³Ã±ez, Karen Lorena Payares Carrasco",
                                                       "email":  "kpayares4@estudiantes.areandina.edu.co",
                                                       "note":  "InscripciÃ³n formalizada por la universidad (Areandina). TÃ­tulo emparejado por similitud (74%) con hoja maestra; revisar redacciÃ³n exacta.",
                                                       "time":  "8:10â€“8:35"
                                                   },
                                                   {
                                                       "title":  "Protolitos y metamorfismo de las rocas de afinidad ofiolÃ­tica del Occidente de la Cordillera Central en San BartolomÃ©",
                                                       "authors":  "Edward SebastiÃ¡n Mora Torres, AgustÃ­n Cardona Molina, Juan SebastiÃ¡n Jaramillo, Juan Pablo Zapata",
                                                       "email":  "emorat@unal.edu.co",
                                                       "linea":  "PetrologÃ­a MetamÃ³rfica Â· GeocronologÃ­a",
                                                       "status":  "confirmado",
                                                       "time":  "8:35â€“9:00"
                                                   },
                                                   {
                                                       "title":  "Registro Volcano-EstratigrÃ¡fico de la FormaciÃ³n SaldaÃ±a en el Alto de Natagaima, Valle Superior del Magdalena",
                                                       "authors":  "Kevin Santiago MontaÃ±ez Valencia, SebastiÃ¡n Zapata Henao, Juan SebastiÃ¡n Jaramillo RÃ­os, Manuela Botero, Daniel Alejandro Ortiz RÃ­os, MÃ³nica Carvalho, Robert Holder",
                                                       "email":  "kevin.montanez@urosario.edu.co",
                                                       "linea":  "EstratigrafÃ­a y SedimentologÃ­a",
                                                       "status":  "confirmado",
                                                       "time":  "9:00â€“9:25"
                                                   }
                                               ]
                                   },
                         "auditorio":  {
                                           "cms":  [
                                                       {
                                                           "code":  "CE-4",
                                                           "time":  "8:10â€“8:50",
                                                           "title":  "La otra falla geolÃ³gica: nuestra relaciÃ³n con las comunidades y el ingreso a territorio",
                                                           "speaker":  "CÃ©sar OtÃ¡lvaro",
                                                           "org":  "Universidad Nacional"
                                                       },
                                                       {
                                                           "code":  "CE-5",
                                                           "time":  "9:00â€“9:40",
                                                           "title":  "Servicio GeolÃ³gico Colombiano",
                                                           "speaker":  "Por confirmar",
                                                           "org":  "SGC",
                                                           "note":  "Tema y ponente por confirmar â€” SGC."
                                                       }
                                                   ]
                                       },
                         "sgc":  "start",
                         "sgcSpan":  4,
                         "sgcTitle":  "SGC",
                         "sgcDesc":  "Servicio GeolÃ³gico Colombiano â€” programaciÃ³n propia, 1 salÃ³n de Bienestar"
                     },
                     {
                         "type":  "block",
                         "time":  "9:50â€“10:30",
                         "auditorio":  {
                                           "cms":  [
                                                       {
                                                           "code":  "CM-3",
                                                           "time":  "9:50â€“10:30",
                                                           "title":  "Artificial Intelligence and Seismic Networks in the Ecuador-Colombia Subduction Zone",
                                                           "speaker":  "Alexander Wickham-Piotrowski",
                                                           "org":  "Institut de France"
                                                       }
                                                   ]
                                       },
                         "cells":  null,
                         "altBlock":  {
                                          "time":  "",
                                          "title":  "Charla magistral en el auditorio",
                                          "sub":  "Asistencia general â€” sin ponencias en salones"
                                      },
                         "sgc":  "continue"
                     },
                     {
                         "type":  "info",
                         "time":  "10:30â€“11:00",
                         "title":  "Break (entrega tercer refrigerio)",
                         "category":  "break",
                         "sgc":  "continue"
                     },
                     {
                         "type":  "panel",
                         "time":  "11:00â€“12:30",
                         "title":  "Panel - GestiÃ³n del Riesgo",
                         "note":  "Panel de DiscusiÃ³n",
                         "sgc":  "continue"
                     },
                     {
                         "type":  "info",
                         "time":  "12:30â€“14:00",
                         "title":  "Almuerzo",
                         "category":  "almuerzo"
                     },
                     {
                         "type":  "panel",
                         "time":  "14:00â€“15:00",
                         "title":  "GeologÃ­a en Vivo: Dos Expertos, Un Viaje al CorazÃ³n de la Tierra",
                         "note":  "Italo Reyes Â· Mauricio Reyes",
                         "sgc":  "start",
                         "sgcSpan":  6,
                         "sgcTitle":  "SGC",
                         "sgcDesc":  "Servicio GeolÃ³gico Colombiano â€” programaciÃ³n propia, 1 salÃ³n de Bienestar"
                     },
                     {
                         "type":  "info",
                         "time":  "15:00â€“15:30",
                         "title":  "Break (entrega cuarto refrigerio)",
                         "category":  "break",
                         "sgc":  "continue"
                     },
                     {
                         "type":  "block",
                         "time":  "15:30â€“16:10",
                         "auditorio":  {
                                           "cms":  [
                                                       {
                                                           "code":  "CM-4",
                                                           "time":  "15:30â€“16:10",
                                                           "title":  "La temperatura: un factor subestimado en la interpretaciÃ³n estructural",
                                                           "speaker":  "Eduardo Rossello",
                                                           "org":  "Servicio GeolÃ³gico Argentina"
                                                       }
                                                   ]
                                       },
                         "cells":  null,
                         "altBlock":  {
                                          "time":  "",
                                          "title":  "Charla magistral en el auditorio",
                                          "sub":  "Asistencia general â€” sin ponencias en salones"
                                      },
                         "sgc":  "continue"
                     },
                     {
                         "type":  "block",
                         "time":  "16:10â€“17:00",
                         "auditorio":  {
                                           "cms":  [
                                                       {
                                                           "code":  "CE-6",
                                                           "time":  "16:10â€“17:00",
                                                           "title":  "Elementos para entender el fracking en Colombia",
                                                           "speaker":  "Jaime Checa",
                                                           "org":  "ACGGP"
                                                       }
                                                   ]
                                       },
                         "cells":  null,
                         "altBlock":  {
                                          "time":  "",
                                          "title":  "Charla especial en el auditorio",
                                          "sub":  "Asistencia general â€” sin ponencias en salones"
                                      },
                         "sgc":  "continue"
                     },
                     {
                         "type":  "block",
                         "time":  "17:10â€“18:20",
                         "cells":  null,
                         "auditorio":  null,
                         "posterBatch":  [
                                             {
                                                 "title":  "GeoeducaciÃ³n y divulgaciÃ³n de las geociencias: una revisiÃ³n sistemÃ¡tica de enfoques y metodologÃ­as",
                                                 "status":  "confirmado",
                                                 "authors":  "Aldo Molano",
                                                 "email":  "aldojulian15@gmail.com",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "GeologÃ­a que transforma: educaciÃ³n y claridad para un territorio consciente",
                                                 "status":  "confirmado",
                                                 "authors":  "Cristian Santiago Benavides Burgos, Camila Alejandra RodrÃ­guez, Yessika Aristizabal, David Andres Timaran.",
                                                 "email":  "cristian.benavides28737@ucaldas.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "HidroVetas: ComparaciÃ³n de los Sistemas GeotÃ©rmicos de Paipa, Vetas y MÃ¡laga como Potencial EstratÃ©gico para la TransiciÃ³n EnergÃ©tica en Colombia",
                                                 "status":  "confirmado",
                                                 "authors":  "Laura Valentina Solis Narvaez y Rafael Camilo Venecia Ardila",
                                                 "email":  "lsolisn@unal.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "HidrogeodÃ­a 2026: comunidad, ciencia y recurso hÃ­drico",
                                                 "status":  "confirmado",
                                                 "authors":  "Manuel GonzÃ¡lez RodrÃ­guez y Silvia Alejandra Vargas Cano",
                                                 "email":  "silvialeja04canovargas@gmail.com",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "Historia de exhumaciÃ³n del PlutÃ³n de Pance y Danubio: implicaciones para la historia de deformaciÃ³n Miocena de la cordillera occidental de Colombia.",
                                                 "status":  "confirmado",
                                                 "authors":  "Lina MarÃ­a MogollÃ³n GÃ³mez, Natalia Gonzalez Rojas",
                                                 "email":  "nataliagonzalezrojas23@gmail.com",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "IdentificaciÃ³n Automatizada de Formaciones GeolÃ³gicas Aptas para Almacenamiento de COâ‚‚ Mediante Machine Learning Usando Registros de Pozo de Acceso Abierto",
                                                 "status":  "confirmado",
                                                 "authors":  "Oscar Andres Mendoza Gonzalez, Esteban Alejandro Huertas Huertas",
                                                 "email":  "omendozag@unal.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "IdentificaciÃ³n de Zonas Potenciales de Recarga de AcuÃ­feros en la Mesa de los Santos, Santander",
                                                 "status":  "confirmado",
                                                 "authors":  "MarÃ­a Juliana ChacÃ³n Porras, \n  Johan Enrique PÃ¡ez Romero, \n  Sergio AndrÃ©s GarcÃ­a Arias, \n  MarÃ­a Alejandra Cetina Tarazona",
                                                 "email":  "parrajoan2004@gmail.com",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "IdentificaciÃ³n de zonas con potencial de generaciÃ³n de hidrÃ³geno natural mediante anÃ¡lisis multicriterio en SIG en el sector centro-sur del departamento de NariÃ±o, Colombia",
                                                 "status":  "confirmado",
                                                 "authors":  "Valeria Vargas Velandia; David Alejandro Prada Tinoco",
                                                 "email":  "valeriavargasvelandia@gmail.com",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "IdentificaciÃ³n de zonas potenciales de recarga de acuÃ­feros en la cuenca del rÃ­o Fonce, Santander, implementando la GuÃ­a MetodolÃ³gica para la IdentificaciÃ³n de Zonas Potenciales de Recarga de AcuÃ­feros para la gestiÃ³n hÃ­drica territorial.",
                                                 "status":  "confirmado",
                                                 "authors":  "David Blanco Quiroga y Oscar Esteban Fonseca PÃ©rez",
                                                 "email":  "dbquiroga10@gmail.com",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "IntegraciÃ³n de fotogrametrÃ­a y modelado 3D para la comprensiÃ³n y el anÃ¡lisis de la geologÃ­a estructural",
                                                 "status":  "confirmado",
                                                 "authors":  "AngÃ©lica MarÃ­a Cappacho Alvarez - ThomÃ¡s Leopoldo QuiÃ±onez Pineda",
                                                 "email":  "angelicacappacho@gmail.com",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "Litoestratigrafia y petrogafÃ­a de las rocas de afinidad ofiolitica en la Quebrada la Honda (Filadelfia, Caldas): origen y correlaciones tectÃ³nicas.",
                                                 "status":  "confirmado",
                                                 "authors":  "Julian Parra, Alejandra Bedoya, Eliana Botello, AgustÃ­n Cardona, Juan Pablo Zapata.",
                                                 "email":  "jparrava@unal.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "MetodologÃ­a para la separaciÃ³n de minerales densos y circones detrÃ­ticos en arenas, aplicada a estudios de procedencia sedimentaria",
                                                 "status":  "confirmado",
                                                 "authors":  "SalomÃ© LÃ³pez, Valentina Agudelo, Jesmy MartÃ­nez, MarÃ­a Isabel Sierra",
                                                 "email":  "m.sierrarojas@uniandes.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "MÂ¿QuÃ© nos dicen los fÃ³siles de Miraflores? Una nueva localidad del CretÃ¡cico Inferior en BoyacÃ¡",
                                                 "status":  "confirmado",
                                                 "authors":  "Sergio IvÃ¡n Sarmiento RomeroÂ¹*; Cristian AndrÃ©s MartÃ­nez AraqueÂ¹",
                                                 "email":  "sergio.sarmiento01@uptc.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "PEGMATITAS COLOMBIANAS COMO FUENTE DE TIERRAS RARAS (REE) Y MINERALES ESTRATÃ‰GICOS: CARACTERIZACIÃ“N GEOQUÃMICA DEL COMPLEJO DE MITÃš Y EL COMPLEJO ULTRAMÃFICO DE BOLÃVAR.",
                                                 "status":  "confirmado",
                                                 "authors":  "Angie Roshel PabÃ³n Soler",
                                                 "email":  "apabons@unal.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "Paleoambientes sedimentarios generales de las â€œSedimentitas de Ladrillerosâ€ (Mioceno) en el sector de Ladrilleros (Buenaventura, Valle del Cauca)",
                                                 "status":  "confirmado",
                                                 "authors":  "Carlos Alberto GuzmÃ¡n LÃ³pez",
                                                 "email":  "carlosguzman@ucaldas.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "Patrimonio GeolÃ³gico del Departamento del Cesar: Un Recurso para la ConservaciÃ³n y el Desarrollo Sostenible",
                                                 "status":  "confirmado",
                                                 "authors":  "Luis Fernando Molina Contreras, Luis Pablo Pacheco Gerardino",
                                                 "email":  "lmolina47@estudiantes.areandina.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "PetrogÃ©nesis y evoluciÃ³n de productos volcÃ¡nicos y subvolcÃ¡nicos bÃ¡sicos e intermedios de edad miocena asociados al Complejo VolcÃ¡nico de Combia mediante el uso de petrografÃ­a, quÃ­mica mineral y geoquÃ­mica de roca total",
                                                 "status":  "confirmado",
                                                 "authors":  "Jank Carlos Rosero Otalvaro\n  Santiago NicolÃ¡s LÃ³pez Bravo\n  Danna Julieth Reyes Escobar",
                                                 "email":  "jroseroo@unal.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "PetrologÃ­a y GeoquÃ­mica orgÃ¡nica de los carbones de la FormaciÃ³n AmagÃ¡ aflorantes en el Ã¡rea QuinchÃ­a-Riosucio y su potencial de generaciÃ³n de hidrocarburos.",
                                                 "status":  "confirmado",
                                                 "authors":  "Luisa MarÃ­a GÃ³mez Oliveros",
                                                 "email":  "luisa.gomez9479@gmail.com",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "REVISIÃ“N PRELIMINAR DE LAS ESTRUCTURAS SEDIMENTARIAS BIOGÃ‰NICAS (ICNOLOGÃA) DE LA FORMACIÃ“N TIBASOSA â€“ CRETÃCICO INFERIOR DE BOYACÃ COLOMBIA. SECCIÃ“N VÃA DUITAMA â€“ NOBSA.",
                                                 "status":  "confirmado",
                                                 "authors":  "MIGUEL ÃNGEL FRANCO MORENO*, NATALIA LUCIA ZAQUE ESCOBAR, ALEXANDER LEMUS RESTREPO",
                                                 "email":  "miguel.franco29375@ucaldas.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "Relaciones entre Velocidades SÃ­smicas y Resistividad ElÃ©ctrica en el Subsuelo Somero mediante RefracciÃ³n SÃ­smica, MASW y TomografÃ­a ElÃ©ctrica",
                                                 "status":  "confirmado",
                                                 "authors":  "Narayana Rishi Salazar Vega, Dr. Francisco Gamboa Ortega, David AndrÃ©s FlÃ³rez Rojas",
                                                 "email":  "narisave29@gmail.com",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "RelaciÃ³n de mineralizaciones tipo pÃ³rfido con la Brecha Apollo - CartografÃ­a geolÃ³gica en el Proyecto Guayabales - Collective Mining",
                                                 "status":  "confirmado",
                                                 "authors":  "Mario AndrÃ©s CastaÃ±o Castro, Marcelo Arango Trujillo, Valery Casallas HernÃ¡ndez, SebastiÃ¡n GutiÃ©rrez SÃ¡nchez, SebastiÃ¡n Arenas Naranjo, Juan Daniel Burbano Salazar, Alex JuliÃ¡n Insuasty EspaÃ±a",
                                                 "email":  "seg_uc@ucaldas.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "Saberes de piedra y camino: diÃ¡logo entre la geologÃ­a y la memoria del CaÃ±Ã³n del Chicamocha en los Caminos Reales",
                                                 "status":  "confirmado",
                                                 "authors":  "MarÃ­a Gabriela Sanabria Murgas, Lady Johanna RÃ­os Guerrero \n  Semillero de InvestigaciÃ³n en PetrologÃ­a (SEPET) â€“ Escuela de GeologÃ­a, Universidad Industrial de Santander",
                                                 "email":  "sanabriamariagabriela@gmail.com",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "SecciÃ³n EstratigrÃ¡fica de la FormaciÃ³n La Luna a escala 1:100 de La Quebrada La Marta, Salazar de la Palmas - Norte de Santander - Sur de la Cuenca del Catatumbo",
                                                 "status":  "confirmado",
                                                 "authors":  "Autores: Daniela Diaz-Ariza, Gabriela Chavarro-Morales Coautores: Alejandra MejÃ­a-Molina, Ilich Villamizar-Solano y Jhan Contreras-Leal",
                                                 "email":  "daniela.diazdan@unipamplona.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "ZonificaciÃ³n de la susceptibilidad ante movimientos en masa e inundaciones en la microcuenca La Patilla (Salazar de las Palmas, Norte de Santander) mediante anÃ¡lisis multitemporal y componentes fÃ­sicos",
                                                 "status":  "confirmado",
                                                 "authors":  "MARIA JOSE GARAY PAEZ",
                                                 "email":  "majostar720@gmail.com",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "ZonificaciÃ³n de susceptibilidad por movimientos en masa en la zona rural de la cuenca alta del rÃ­o Manaure (Cesar)",
                                                 "status":  "confirmado",
                                                 "authors":  "Karoll Viviana Ãvila RincÃ³n\n  JesÃºs Manuel VizcaÃ­no Martinez \n  Luis Carlos tapia vela",
                                                 "email":  "jvizcaino4@estudiantes.areandina.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "ZonificaciÃ³n preliminar de amenaza por movimientos en masa en la cuenca de la quebrada Minas del Vapor, Puerto BerrÃ­o, Antioquia.",
                                                 "status":  "confirmado",
                                                 "authors":  "Jhassai Sharith Epiayu Corrales, MarÃ­a Camila Perdomo Geney, Emanuel AndrÃ©s CÃ¡ceres Aroca",
                                                 "email":  "jepiayu@estudiantes.areandina.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "â€œMi libro secreto de la Tierraâ€: Estrategia de GeoeducaciÃ³n para la EnseÃ±anza de las Geociencias y su ApropiaciÃ³n Social en la Infancia",
                                                 "status":  "confirmado",
                                                 "authors":  "Giselle Cordoba, Gabriela Florez, Samuel Ospino, William Ruiz, Jose Sotelo",
                                                 "email":  "gcordoba13@estudiantes.areandina.edu.co",
                                                 "salon":  "A"
                                             },
                                             {
                                                 "title":  "ANÃLISIS COMPARATIVO DE ANÃLOGOS DE SISTEMAS VULCANOâ€‘SEDIMENTARIOS ENTRE MARTE Y LA TIERRA",
                                                 "authors":  "Santiago Baruch Rojas GarcÃ­a, Juan Carlos RamÃ­rez Arias, Yasmin Pelayo Serrano",
                                                 "email":  "Buc21641032@mail.udes.edu.co",
                                                 "salon":  "A",
                                                 "status":  "pendiente"
                                             },
                                             {
                                                 "title":  "GEOLOGÃA, ANÃLISIS ESTRUCTURAL Y CARACTERIZACIÃ“N MINERALÃ“GICA DEL RESGUARDO INDÃGENA ESCOPETERA Y PIRZA (RISARALDAâ€‘CALDAS) EN COLOMBIA: UNA HERRAMIENTA TÃ‰CNICA PARA LA GESTIÃ“N TERRITORIAL",
                                                 "authors":  "Karen Victoria Melchor PinzÃ³n, Yasmin Pelayo Serrano, Juan Carlos RamÃ­rez Arias",
                                                 "email":  "01210642018@mail.udes.edu.co",
                                                 "salon":  "A",
                                                 "status":  "pendiente"
                                             },
                                             {
                                                 "code":  "P-077",
                                                 "title":  "CARACTERIZACIÃ“N Y ANÃLISIS CINEMÃTICO DE FRACTURAS DEL BLOQUE ORIENTAL DE LA FALLA DE BUCARAMANGA EN EL FLANCO NORORIENTAL DEL SINCLINAL DE FLORESTA",
                                                 "authors":  "Jaider Pradilla Quintero; Juan Carlos RamÃ­rez Arias; YasmÃ­n Pelayo Serrano",
                                                 "email":  "jaiderpra@gmail.com",
                                                 "linea":  "Estructural y GeologÃ­a Regional",
                                                 "salon":  "A",
                                                 "status":  "confirmado",
                                                 "note":  "Contacto real registrado (jaiderpra@gmail.com, 2026-07-02); el correo institucional que traia el cronograma no esta inscrito. Titulo del formulario: \"...entre Curos y El Roble\" (ligera variacion de redaccion)."
                                             }
                                         ],
                         "sgc":  "continue"
                     },
                     {
                         "type":  "info",
                         "time":  "19:00â€“",
                         "title":  "Canelazo (cierre)",
                         "category":  "cierre",
                         "sgc":  "continue"
                     }
                 ]
    },
    {
        "id":  "vie",
        "label":  "Viernes 21",
        "sub":  "6 salas (maÃ±ana) Â· CM-5 a CM-7 Â· CE-7 a CE-9 Â· Panel ANH Â· cierre Â· ACGGP AM / SCG PM",
        "desc":  "Actualizado jul-2026: ponencias en la maÃ±ana (3Ã—25 min por sala, 8:10â€“9:25) con CE-7 y CE-8 en paralelo; CM-5 a las 9:40; Panel ANH 11:00â€“12:30; en la tarde CM-6, CE-9 y CM-7; break 4:10 PM; evento de cierre 4:50 PM y fiesta final 8:00 PM. SalÃ³n ACGGP en la maÃ±ana y SCG en la tarde (1 salÃ³n de Bienestar).",
        "rooms":  [
                      "201",
                      "202",
                      "203",
                      "204",
                      "205",
                      "206"
                  ],
        "themes":  {
                       "201":  "EnergÃ­as Renovables Â· COâ‚‚ Â· HidrÃ³geno",
                       "202":  "GeofÃ­sica Â· SismologÃ­a Â· InstrumentaciÃ³n",
                       "203":  "TecnologÃ­a Â· TeledetecciÃ³n Â· MetodologÃ­a Sedimentaria",
                       "204":  "PetrologÃ­a MetamÃ³rfica e Ãgnea",
                       "205":  "ExploraciÃ³n Â· HidrogeologÃ­a Â· Recursos HÃ­dricos",
                       "206":  "GeologÃ­a Estructural Â· EvoluciÃ³n TectÃ³nica"
                   },
        "sgcColumn":  true,
        "sgcHeader":  "ACGGP / SCG",
        "rows":  [
                     {
                         "type":  "block",
                         "time":  "8:10â€“9:30",
                         "cells":  {
                                       "201":  [
                                                   {
                                                       "title":  "EVALUACIÃ“N DEL POTENCIAL DE ALMACENAMIENTO GEOLÃ“GICO DE COâ‚‚ EN EL VALLE MEDIO DEL MAGDALENA A PARTIR DE CARACTERISTICAS PETROGRAFICAS Y PETROFISICAS.",
                                                       "status":  "confirmado",
                                                       "authors":  "PhD AgustÃ­n Cardona Molina, M.Sc Edison Duarte GÃ³mez, Adriana Bravo Benavides",
                                                       "email":  "jabravo@unal.edu.co",
                                                       "note":  "TÃ­tulo tomado de la hoja maestra (coincidencia por similitud 91%); el cronograma usaba una versiÃ³n truncada/distinta.",
                                                       "time":  "8:10â€“8:35"
                                                   },
                                                   {
                                                       "title":  "Presencia y generaciÃ³n de hidrÃ³geno blanco a lo largo de la transiciÃ³n oceÃ¡nicoâ€“continental en el Valle del Cauca",
                                                       "status":  "confirmado",
                                                       "authors":  "Michael Steven Guerrero PeÃ±a, Juan Carlos Molano Mendoza",
                                                       "email":  "miguerrerop@unal.edu.co",
                                                       "note":  "TÃ­tulo emparejado por similitud (57%) con hoja maestra; revisar redacciÃ³n exacta.",
                                                       "time":  "8:35â€“9:00"
                                                   },
                                                   {
                                                       "title":  "MetodologÃ­a basada en Inteligencia Artificial para la evaluaciÃ³n del riesgo geomecÃ¡nico de contenciÃ³n en proyectos de almacenamiento de COâ‚‚",
                                                       "status":  "confirmado",
                                                       "authors":  "AndrÃ©s Mauricio MuÃ±oz GarcÃ­a (autodeclarado 26-jun); Erluan Andres Zabaleta Benavides (coautor, confirmado en otro tÃ­tulo)",
                                                       "note":  "No se encontrÃ³ coincidencia en PONENTES/CORREOS PONENCIAS.xlsx â€” falta agregarlo a la hoja maestra. | Parcial 23-jun: coautores AndrÃ©s Mauricio MuÃ±oz GarcÃ­a y Erluan Zabaleta inscritos (Zabaleta bajo otro tÃ­tulo suyo) â€” ver CRONOGRAMA_CONFIRMADO_2026-06-23.md | Confirmado 26-jun (autodeclaraciÃ³n directa en el formulario de inscripciÃ³n actualizado / cruce por email-contacto y coautores) â€” Autodeclarado por AndrÃ©s Mauricio MuÃ±oz GarcÃ­a en el campo \u0027Nombre de la Ponencia o Poster\u0027 (similitud 100%). â€” ver CRONOGRAMA_CONFIRMADO_2026-06-26.md",
                                                       "email":  "andresmm63@gmail.com",
                                                       "time":  "9:00â€“9:25"
                                                   }
                                               ],
                                       "202":  [
                                                   {
                                                       "title":  "Modelo de visualizaciÃ³n e interpretaciÃ³n 3D basado en datos de tomografÃ­a de resistividad elÃ©ctrica, para la identificaciÃ³n de estructuras geolÃ³gicas",
                                                       "status":  "confirmado",
                                                       "authors":  "Ana MarÃ­a Lizarazo Molina, Fabian Felipe Beltran Cepeda",
                                                       "email":  "analizarazomolina@gmail.com",
                                                       "note":  "No se encontrÃ³ coincidencia en PONENTES/CORREOS PONENCIAS.xlsx â€” falta agregarlo a la hoja maestra.",
                                                       "time":  "8:10â€“8:35"
                                                   },
                                                   {
                                                       "title":  "QuÃ© es la DetecciÃ³n AcÃºstica Distribuida (DAS): Algunos ejemplos en Colombia y el Mundo",
                                                       "status":  "confirmado",
                                                       "authors":  "GermÃ¡n A. Prieto",
                                                       "email":  "gaprietogo@unal.edu.co",
                                                       "time":  "8:35â€“9:00"
                                                   },
                                                   {
                                                       "title":  "Registro sÃ­smico del tramo central de la falla de Anatolia del Norte a partir de los sedimentos del lago Iznik",
                                                       "status":  "confirmado",
                                                       "authors":  "Edward Duarte, Renaldo Gastineau, Pierre Sabatier, Flavio S. Anselmetti, Stefano C. Fabbri, Serkan GÃ¼ndÃ¼z, Mustafa Åžahin, Julia de Sigoyer",
                                                       "email":  "edferdua@uis.edu.co",
                                                       "note":  "TÃ­tulo emparejado por similitud (85%) con hoja maestra; revisar redacciÃ³n exacta. | Confirmado 23-jun (revisiÃ³n ampliada, criterio: autor/coautor inscrito sin requerir que declare este tÃ­tulo exacto) â€” Edward Fernando Duarte Martinez â€” ver CRONOGRAMA_CONFIRMADO_2026-06-23.md",
                                                       "time":  "9:00â€“9:25"
                                                   }
                                               ],
                                       "203":  [
                                                   {
                                                       "title":  "AnÃ¡lisis multiescala de imÃ¡genes para la caracterizaciÃ³n del entramado poroso en areniscas reservorio de la Cuenca Cesar-RancherÃ­a",
                                                       "status":  "parcial",
                                                       "authors":  "Leidy Estefania Cadavid Arango; Cesar Vinasco (coautores inscritos, confirmado 23-jun sin declarar este titulo exacto)",
                                                       "note":  "No se encontrÃ³ coincidencia en PONENTES/CORREOS PONENCIAS.xlsx â€” falta agregarlo a la hoja maestra. | Confirmado 23-jun (revisiÃ³n ampliada, criterio: autor/coautor inscrito sin requerir que declare este tÃ­tulo exacto) â€” Leidy Estefania Cadavid Arango; Cesar Vinasco â€” ver CRONOGRAMA_CONFIRMADO_2026-06-23.md",
                                                       "email":  "cvinasco@unal.edu.co",
                                                       "time":  "8:10â€“8:35"
                                                   },
                                                   {
                                                       "title":  "Mapeamiento textural 3D y 2D de bloques de roca potencialmente almacenadora de CO2 a travÃ©s de estudios de microtomografÃ­a computarizada",
                                                       "status":  "confirmado",
                                                       "authors":  "Nathalie Herrera CÃ¡rdenas; CÃ©sar Vinasco",
                                                       "email":  "nherrera@unal.edu.co",
                                                       "note":  "TÃ­tulo tomado de la hoja maestra (coincidencia por similitud 94%); el cronograma usaba una versiÃ³n truncada/distinta. | Confirmado 23-jun (revisiÃ³n ampliada, criterio: autor/coautor inscrito sin requerir que declare este tÃ­tulo exacto) â€” Nathalie Herrera CÃ¡rdenas; Cesar Vinasco â€” ver CRONOGRAMA_CONFIRMADO_2026-06-23.md",
                                                       "time":  "8:35â€“9:00"
                                                   },
                                                   {
                                                       "title":  "AplicaciÃ³n de tÃ©cnicas analÃ­ticas en el estudio de sedimentos recientes de humedales: caso de estudio en la CiÃ©naga Grande",
                                                       "authors":  "Karol Vanessa Ruiz Moreno",
                                                       "email":  "vruiz0071@gmail.com",
                                                       "linea":  "EstratigrafÃ­a y SedimentologÃ­a",
                                                       "status":  "confirmado",
                                                       "time":  "9:00â€“9:25"
                                                   }
                                               ],
                                       "204":  [
                                                   {
                                                       "title":  "CaracterizaciÃ³n de protolitos y metamorfismo de los esquistos del Complejo ArquÃ­a expuestos en el RÃ­o Tapias (ChocÃ³): implicaciones para la generaciÃ³n de Hâ‚‚",
                                                       "status":  "confirmado",
                                                       "authors":  "Luna Valeria Amaya Orozco, AgustÃ­n Cardona Molina, Alejandra M. Bedoya MejÃ­a, SebastiÃ¡n Zapata Henao",
                                                       "email":  "luna.amaya@urosario.edu.co",
                                                       "note":  "Contacto Luna Amaya con inscripciÃ³n formalizada por su universidad (Rosario). TÃ­tulo emparejado por similitud (83%) con hoja maestra; revisar redacciÃ³n exacta.",
                                                       "time":  "8:10â€“8:35"
                                                   },
                                                   {
                                                       "title":  "PETROGRAFÃA Y CARACTERIZACIÃ“N GEOQUÃMICA DE LAS ROCAS DE LOS STOCKS DE CHUSCALES, OTENGÃ E INTRUSIVO DE AGUACHICA, MACIZO DE FLORESTA, BOYACÃ, COLOMBIA.",
                                                       "status":  "confirmado",
                                                       "authors":  "Angie Roshel PabÃ³n Soler",
                                                       "email":  "apabons@unal.edu.co",
                                                       "note":  "TÃ­tulo tomado de la hoja maestra (coincidencia por similitud 94%); el cronograma usaba una versiÃ³n truncada/distinta.",
                                                       "time":  "8:35â€“9:00"
                                                   },
                                                   {
                                                       "title":  "Petrogenesis y evoluciÃ³n tectÃ³nica de los gabros en el sector de Sucre, Antioquia, y su posiciÃ³n dentro del CCOP",
                                                       "status":  "confirmado",
                                                       "authors":  "Cesar Santiago Morales, SebastiÃ¡n Zapata Henao, AgustÃ­n Cardona, Eliana Botello",
                                                       "email":  "cesars.morales@urosario.edu.co",
                                                       "note":  "Contacto CÃ©sar Morales con inscripciÃ³n formalizada por su universidad (Rosario). No se encontrÃ³ coincidencia en PONENTES/CORREOS PONENCIAS.xlsx â€” falta agregarlo a la hoja maestra.",
                                                       "time":  "9:00â€“9:25"
                                                   }
                                               ],
                                       "205":  [
                                                   {
                                                       "title":  "MÃ©todo Anaconda: Implicaciones prospectivas y metalotectos texturales en mineralizaciÃ³n tipo pÃ³rfido asociados al Proyecto Guayabales - Collective Mining",
                                                       "status":  "confirmado",
                                                       "authors":  "Alex JuliÃ¡n Insuasty EspaÃ±a, Juan Daniel Burbano Salazar",
                                                       "email":  "seg_uc@ucaldas.edu.co (contacto, NO inscrito)",
                                                       "note":  "El grupo Ucaldas (5 personas, incluye a Alex JuliÃ¡n Insuasty EspaÃ±a) estÃ¡ inscrito como #52. El correo genÃ©rico seg_uc@ucaldas.edu.co sigue sin inscripciÃ³n propia. TÃ­tulo tomado de la hoja maestra (coincidencia por similitud 94%); el cronograma usaba una versiÃ³n truncada/distinta. | Confirmado 26-jun (autodeclaraciÃ³n directa en el formulario de inscripciÃ³n actualizado / cruce por email-contacto y coautores) â€” Autodeclarado por Juan Daniel Burbano Salazar \nJuan David RÃ­os GonzÃ¡lez \nValery Casallas HernÃ¡ndez\nAlex JuliÃ¡n Insuasty EspaÃ±a \nSantiago Grajales Loaiza en el campo \u0027Nombre de la Ponencia o Poster\u0027 (similitud 100%). | 2 coautores distintos inscritos: Alex JuliÃ¡n Insuasty EspaÃ±a; Juan Daniel Burbano Salazar â€” ver CRONOGRAMA_CONFIRMADO_2026-06-26.md",
                                                       "time":  "8:10â€“8:35"
                                                   },
                                                   {
                                                       "title":  "ActualizaciÃ³n del anÃ¡lisis de vulnerabilidad, amenaza y peligro a la contaminaciÃ³n de las aguas subterrÃ¡neas en la Sabana de BogotÃ¡",
                                                       "authors":  "David Blanco Quiroga, MarÃ­a Juliana ChacÃ³n Porras",
                                                       "email":  "dbquiroga10@gmail.com",
                                                       "linea":  "HidrogeologÃ­a Â· Recursos HÃ­dricos",
                                                       "status":  "confirmado",
                                                       "time":  "8:35â€“9:00"
                                                   },
                                                   {
                                                       "title":  "Propuesta de ZonificaciÃ³n de Potencial de Recarga Natural y Aptitud de Recarga Artificial de AcuÃ­feros en la Sabana de BogotÃ¡ mediante AnÃ¡lisis MultiparamÃ©trico y PonderaciÃ³n Integrada GRITIC-AHP",
                                                       "authors":  "German Leonardo Rojas Leal",
                                                       "email":  "gelrojasle@unal.edu.co",
                                                       "linea":  "HidrogeologÃ­a Â· Recursos HÃ­dricos",
                                                       "status":  "confirmado",
                                                       "time":  "9:00â€“9:25"
                                                   }
                                               ],
                                       "206":  [
                                                   {
                                                       "title":  "SecciÃ³n estructural del sendero El Cementerio a escala 1:2.000, Gramalote Antiguo, Norte de Santander",
                                                       "status":  "confirmado",
                                                       "authors":  "Dennis Julethzy Camila MogollÃ³n RodrÃ­guez, Michell CÃ¡rdenas-LÃ³pez, Jhan Leal-Contreras, Ilich Villamizar-Solano",
                                                       "email":  "camiljulethzy@gmail.com",
                                                       "note":  "InscripciÃ³n grupal (Combo Parche, 5 personas) confirmada el 2026-06-16 â€” Universidad de Pamplona. TÃ­tulo emparejado por similitud (82%) con hoja maestra; revisar redacciÃ³n exacta.",
                                                       "time":  "8:10â€“8:35"
                                                   },
                                                   {
                                                       "title":  "AnÃ¡lisis litoestratigrÃ¡fico del registro metamÃ³rfico en la Quebrada La Despensas (Filadelfia, Caldas)",
                                                       "authors":  "David PatiÃ±o, Alejandra Bedoya, AgustÃ­n Cardona, Juan SebastiÃ¡n Jaramillo, JuliÃ¡n Parra, Paulina MuÃ±oz",
                                                       "email":  "dpatinov@unal.edu.co",
                                                       "linea":  "PetrologÃ­a MetamÃ³rfica Â· GeocronologÃ­a",
                                                       "status":  "confirmado",
                                                       "time":  "8:35â€“9:00"
                                                   },
                                                   {
                                                       "title":  "Magmatismo fÃ©lsico con enclaves mÃ¡ficos y deformaciÃ³n frÃ¡gil en el sector Patillalâ€“La Junta, margen noroccidental del SNSM",
                                                       "authors":  "Jenny GarcÃ­a GonzÃ¡lez",
                                                       "email":  "ygarcia68@areandina.edu.co",
                                                       "linea":  "GeologÃ­a Regional Â· Magmatismo",
                                                       "status":  "confirmado",
                                                       "time":  "9:00â€“9:25"
                                                   }
                                               ]
                                   },
                         "auditorio":  {
                                           "cms":  [
                                                       {
                                                           "code":  "CE-7",
                                                           "time":  "8:10â€“8:50",
                                                           "title":  "Minerales EstratÃ©gicos y TransiciÃ³n EnergÃ©tica: Nuevas Oportunidades",
                                                           "speaker":  "Ing. Esteban Castillo",
                                                           "org":  "ANM"
                                                       },
                                                       {
                                                           "code":  "CE-8",
                                                           "time":  "8:50â€“9:30",
                                                           "title":  "CaracterizaciÃ³n de rezumaderos a partir de productos de sensores remotos",
                                                           "speaker":  "IvÃ¡n Plata",
                                                           "org":  "Ecopetrol"
                                                       }
                                                   ]
                                       },
                         "sgc":  "start",
                         "sgcSpan":  4,
                         "sgcTitle":  "ACGGP",
                         "sgcDesc":  "ACGGP â€” AsociaciÃ³n Colombiana de GeÃ³logos y GeofÃ­sicos del PetrÃ³leo â€” programaciÃ³n propia, 1 salÃ³n de Bienestar (maÃ±ana)"
                     },
                     {
                         "type":  "block",
                         "time":  "9:40â€“10:30",
                         "auditorio":  {
                                           "cms":  [
                                                       {
                                                           "code":  "CM-5",
                                                           "time":  "9:40â€“10:30",
                                                           "title":  "The Changing Role of Geosciences in the Energy Transition",
                                                           "speaker":  "Eilard Hoogerduijn",
                                                           "org":  "Internacional"
                                                       }
                                                   ]
                                       },
                         "cells":  null,
                         "altBlock":  {
                                          "time":  "",
                                          "title":  "Charla magistral en el auditorio",
                                          "sub":  "Asistencia general â€” sin ponencias en salones"
                                      },
                         "sgc":  "continue"
                     },
                     {
                         "type":  "info",
                         "time":  "10:30â€“11:00",
                         "title":  "Break (entrega quinto refrigerio)",
                         "category":  "break",
                         "sgc":  "continue"
                     },
                     {
                         "type":  "panel",
                         "time":  "11:00â€“12:30",
                         "title":  "Panel de discusiÃ³n: EnergÃ­as â€” ANH",
                         "note":  null,
                         "sgc":  "continue"
                     },
                     {
                         "type":  "info",
                         "time":  "12:30â€“14:00",
                         "title":  "Almuerzo",
                         "category":  "almuerzo"
                     },
                     {
                         "type":  "block",
                         "time":  "14:00â€“14:40",
                         "auditorio":  {
                                           "cms":  [
                                                       {
                                                           "code":  "CM-6",
                                                           "time":  "14:00â€“14:40",
                                                           "title":  "ANH",
                                                           "speaker":  "Por confirmar",
                                                           "org":  "ANH",
                                                           "note":  "Tema y ponente por confirmar â€” Agencia Nacional de Hidrocarburos."
                                                       }
                                                   ]
                                       },
                         "cells":  null,
                         "altBlock":  {
                                          "time":  "",
                                          "title":  "Charla magistral en el auditorio",
                                          "sub":  "Asistencia general â€” sin ponencias en salones"
                                      },
                         "sgc":  "start",
                         "sgcSpan":  3,
                         "sgcTitle":  "SCG",
                         "sgcDesc":  "SCG â€” Sociedad Colombiana de Geotecnia â€” programaciÃ³n propia, 1 salÃ³n de Bienestar (tarde)"
                     },
                     {
                         "type":  "block",
                         "time":  "14:50â€“15:30",
                         "auditorio":  {
                                           "cms":  [
                                                       {
                                                           "code":  "CE-9",
                                                           "time":  "14:50â€“15:30",
                                                           "title":  "Sociedad Colombiana de Geotecnia",
                                                           "speaker":  "Por confirmar",
                                                           "org":  "SCG",
                                                           "note":  "Tema y ponente por confirmar â€” Sociedad Colombiana de Geotecnia."
                                                       }
                                                   ]
                                       },
                         "cells":  null,
                         "altBlock":  {
                                          "time":  "",
                                          "title":  "Charla especial en el auditorio",
                                          "sub":  "Asistencia general â€” sin ponencias en salones"
                                      },
                         "sgc":  "continue"
                     },
                     {
                         "type":  "block",
                         "time":  "15:30â€“16:10",
                         "auditorio":  {
                                           "cms":  [
                                                       {
                                                           "code":  "CM-7",
                                                           "time":  "15:30â€“16:10",
                                                           "title":  "Territorio, energÃ­a y decisiones: las geociencias como brÃºjula del Estado",
                                                           "speaker":  "Flover RodrÃ­guez-Portillo",
                                                           "org":  "ACGGP"
                                                       }
                                                   ]
                                       },
                         "cells":  null,
                         "altBlock":  {
                                          "time":  "",
                                          "title":  "Charla magistral en el auditorio",
                                          "sub":  "Asistencia general â€” sin ponencias en salones"
                                      },
                         "sgc":  "continue"
                     },
                     {
                         "type":  "info",
                         "time":  "16:10â€“16:40",
                         "title":  "Break (entrega sexto refrigerio)",
                         "category":  "break"
                     },
                     {
                         "type":  "info",
                         "time":  "16:50â€“",
                         "title":  "Evento de cierre",
                         "category":  "cierre"
                     },
                     {
                         "type":  "info",
                         "time":  "20:00â€“",
                         "title":  "Fiesta final",
                         "category":  "cierre"
                     }
                 ]
    }
];

