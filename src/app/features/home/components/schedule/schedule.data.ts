export const STATUS_LABEL = {
  confirmado: 'Confirmada — contacto inscrito',
  parcial: 'Confirmada parcial — coautor inscrito, contacto pendiente',
  pendiente: 'Pendiente — sin inscripción registrada',
  tbd: 'Cupo reservado (TBD)',
};

export const DAYS = [
  {
    id: 'estado',
    label: 'Horario General',
    type: 'dashboard',
    sub: 'Vista general del programa por bloques — XVII STG 2026',
    desc: 'Cronograma reestructurado a partir de PROGRAMACION SEMANA TECNICA.xlsx (versión final, 26-jun-2026): los pósters se concentran en un único bloque el miércoles en la mañana (en paralelo a Geolimpiadas); las ponencias se distribuyen por línea temática en 6 salas (201-206, reutilizadas entre días sin choque de horario) repartidas entre miércoles, jueves y viernes; las 15 charlas magistrales (CM-1 a CM-15) quedan fijadas en sus bloques, 10 ya confirmadas y 5 con cupo reservado por confirmar (ESRI, SGC/OSCAR, ANH, SCG, ACH). Solo se programaron las 68 ponencias y 74 pósters que ya tienen algún autor inscrito (Sí o Parcial); las 40 ponencias y 50 pósters aún sin ningún autor inscrito no tienen cupo en este cronograma. Ver DATOS/CRONOGRAMA_CONFIRMADO_2026-06-26.md.',
    registro: {
      formularioIndividual: {
        personas: 186,
        filas: 134,
        perfil: {
          Estudiante: 155,
          Profesional: 23,
          'Egresado/Posgrado (UPTC u otra)': 8,
        },
        expositor: { Sí: 102, No: 12, 'Sin responder': 20 },
      },
      universidad: [],
      totalGeneral: 186,
    },
    ponencias: {
      counts: { confirmado: 63, parcial: 5, pendiente: 40, tbd: 3 },
      total: 111,
    },
    posters: {
      counts: { confirmado: 72, parcial: 2, pendiente: 50 },
      total: 124,
    },
    cmTotal: 16,
    cmConfirmadas: 11,
    cmPorConfirmar: 5,
    panelTotal: 2,
  },
  {
    id: 'mie',
    label: 'Miércoles 19',
    rooms: ['201', '202', '203', '204', '205', '206'],
    sub: '201 Geoamenazas · 202 Geofísica · 204 Paleontología · 205 Minerales (4 salas activas)',
    desc: 'Reestructurado 26-jun-2026 a partir de PROGRAMACION SEMANA TECNICA.xlsx: pósters únicos de la semana (mañana, en paralelo a Geolimpiadas); 2 bloques de charlas magistrales pareadas (CM-1/2 y CM-3/4) en paralelo a 2 bloques de 4x20min de ponencias.',
    themes: {
      '201': 'Geoamenazas · GRD · Geodivulgación',
      '202': 'Geofísica · Tecnología · IA Aplicada',
      '203': 'Mineralogía · Petrología Ígnea · Geoquímica',
      '204': 'Paleontología · Geopatrimonio · Geoarqueología',
      '205': 'Estratigrafía · Sedimentología · Source-to-Sink',
      '206': 'Geoeducación · Tecnología Geológica',
    },
    rows: [
      {
        type: 'info',
        time: '8:00–9:00',
        title: 'Registro (entrega primer refrigerio)',
        category: 'registro',
      },
      {
        type: 'info',
        time: '9:00–10:00',
        title: 'Bienvenida y apertura del evento',
        category: 'apertura',
      },
      {
        type: 'block',
        time: '10:00–12:30',
        title: 'Geolimpiadas (en paralelo) + Pósters',
        auditorio: null,
        posterBatch: [
          {
            title:
              'ANÁLISIS SEDIMENTOLÓGICO DE LAS EOLIANITAS CUATERNARIAS (?) DE LA ALTA GUAJIRA (SECTOR ARCOIRIS-PILÓN DE AZÚCAR) Y SU RELACIÓN CON EL PALEOCLIMA',
            status: 'confirmado',
            authors: 'Valentina Espinel Arias y Carlos Alberto Guzmán López',
            salon: 'A',
          },
          {
            title:
              'ANÁLISIS SEDIMENTOLÓGICO PRELIMINAR DE LOS DEPÓSITOS LACUSTRES EN LA LAGUNA LOS ORTICES, SANTANDER, COLOMBIA',
            status: 'confirmado',
            authors:
              'Nicolas Santamaria Jaimes, Edward Duarte, Juan Felipe Franco, Jaime Escobar, Diego Suescun Carvajal, Marly Karina Garcia, Giovanny Jimenez, Victoria Mousalli',
            salon: 'A',
          },
          {
            title:
              'Almacenamiento de hidrógeno blanco en unidades clásticas asociadas a rocas serpentinizadas en el flanco occidental de la Cordillera Central: Influencia de la mineralogía, la materia orgánica y condiciones termodinámicas.',
            status: 'confirmado',
            authors:
              'Mayerly Alejandra Ariza Caro, Sebastián Zapata Henao, Agustín Cardona Molina, German A. Bayona, Juan David Guzman',
            salon: 'A',
          },
          {
            title:
              'Análisis Morfológico y Paleoambiental de Crustáceos Fósiles en Los Santos y Guane, Santander',
            status: 'confirmado',
            authors: 'Eimy Valentina Quintana Mantilla',
            salon: 'A',
          },
          {
            title:
              'Análisis Preliminar de la Sismicidad Inducida por el Embalse Topocoro, Hidroeléctrica Sogamoso, Santander, Colombia (2005–2017)',
            status: 'confirmado',
            authors: 'Maria Gabriela Sanabria Murgas',
            salon: 'A',
          },
          {
            title:
              'Análisis comparativo de mapas composicionales antes y después de la inyección de CO₂ en rocas almacenadoras',
            status: 'confirmado',
            authors:
              'Astrid Yuliana Echavarria Carmona \n  Samanta Gomez Lopez',
            salon: 'A',
          },
          {
            title:
              'Análisis de anomalías radioactivas asociadas a mineralizaciones secundarias en el distrito aurífero de Vetas–California',
            status: 'confirmado',
            authors: 'Brayan Alejandro Cujaban Salamanca, Santiago Useche Luna',
            salon: 'A',
          },
          {
            title:
              'Análisis de carbonatación mineral ex situ a escala nanométrica en rocas ultramáficas',
            status: 'confirmado',
            authors: 'Rashed Torres; Ana Roldán; Cesar Vinasco',
            salon: 'A',
          },
          {
            title:
              'Análisis de geometrías de adquisición de Tomografia 3D para la caracterización del subsuelo superficial',
            status: 'confirmado',
            authors:
              'Karen Gabriela Barragan Riveros, Maria Paula Bohórquez, Paul Goyes Peñafiel',
            salon: 'A',
          },
          {
            title:
              'Análisis de subsidencia en la Sabana de Bogotá entre 2017 y 2025 mediante interferometría SAR',
            status: 'confirmado',
            authors:
              'Thomás Leopoldo Quiñonez Pineda, Laura Marcela Céspedes Gómez, Angie Katherine González Calderón',
            salon: 'A',
          },
          {
            title:
              'Análisis del efecto textural en propiedades petrofísicas de rocas almacenadoras de CO₂ mediante elipsoides de forma derivada de fotografía convencional.',
            status: 'confirmado',
            authors:
              'Leidy Estefania Cadavid Arango, Sairandelly Gil Martínez, Camila Goez Osorio, Astrid Yuliana Echavarría Carmona, Carlos Andrés Muñoz Arrieta',
            salon: 'A',
          },
          {
            title:
              'Análisis e interpretación de la génesis y el emplazamiento de la mineralización aurífera mediante cartografía geológica a escala 1:10.000 en Minas del Vapor, Buenos Aires, El Brasil y La Palmera (Antioquia, Colombia)',
            status: 'confirmado',
            authors:
              'Juan David Calderon Nieves, Yhostik Guillermo Gomez Galarza, Wilmar David Montero Figueroa, Laura Lucia Ospina Ordoñez, Karen Lorena Payares Carrasco',
            salon: 'A',
          },
          {
            title:
              'Análisis estructural de las litologías aflorantes entre La Lejía y Alto La Laguna, Pamplona, Norte de Santander, Colombia',
            status: 'confirmado',
            authors: 'Britney Perez-Varela y Ilich Villamizar-Solano',
            salon: 'A',
          },
          {
            title:
              'Aprendizaje profundo guiado por la física para la inversión no supervisada de datos de resistividad eléctrica 1D',
            status: 'confirmado',
            authors:
              'Adrian Alvercy Perez Montejo; Yesid Paul Goyes Peñafiel; Sait Khurama-Velásquez',
            salon: 'A',
          },
          {
            title:
              'CARACTERIZACIÓN GEOMECÁNICA Y EVALUACIÓN DE LA POSIBILIDAD GEOMÉTRICA DE FALLA DEL MACIZO ROCOSO EN LA FORMACIÓN LA LUNA, VEREDAS VALDERRAMA Y TEHERÁN, GRAMALOTE, NORTE DE SANTANDER',
            status: 'confirmado',
            authors:
              'Brayan Steven Rodríguez Rincón; Ilich Sebastián Villamizar Solano, María Jose Garay Paez; Jhan Carlos Contreras Leal',
            salon: 'A',
          },
          {
            title:
              'CUMBAL: AGUA Y SALUD. Caracterización hidrotermal superficial y análisis geoquímico de aguas asociadas al complejo volcánico Cumbal-Chiles (Nariño, Colombia)',
            status: 'confirmado',
            authors:
              'Angy Emilsen Chinguad Tapie \n  Daniel Santiago Cortés Barón',
            salon: 'A',
          },
          {
            title:
              'Cambios morfológicos del delta del río Sinú a partir de análisis multitemporal de imágenes satelitales',
            status: 'confirmado',
            authors: 'Rashed Torres; Maria Clara Zuluaga; Liliana Betancourth',
            salon: 'A',
          },
          {
            title:
              'Caracterización composicional y textural de algunos sedimentos litorales colombianos, su origen y afectación por procesos antropogénicos.',
            status: 'confirmado',
            authors:
              'Sebastian Alzate Arango, Yenifer Camila Alzate Arbelaez, Brayan Bejarano Bejarano, Brayan Sneider Betancur Rivera, Angela Daniela Bolaños Muñoz, Juan Diego Cardona Ardila, Juan Esteban Durán Quintero, Ana María García Góngora, Santiago Hurtado Ramírez, Carlos Mario Marín Moncada, Edison Stiven Mendez Vasquez, Mariana Ocampo Carmona, Camilo Andrés Patiño García, Juliana Pineda Largo, Maria Paula Quintero Cardenas, Camila Alejandra Rodriguez Ruiz, Juan José Valencia Gallego, Paula Andrea Zuluaga Cruz, Luisa María Gómez Oliveros, Carlos Alberto Guzmán López.',
            salon: 'A',
          },
          {
            title:
              'Caracterización de los basaltos de la Formación Volcánica en la Vereda Carbonera y su relación con la generación de hidrógeno natural',
            status: 'confirmado',
            authors: 'Santiago Betancur Restrepo',
            salon: 'A',
          },
          {
            title:
              'Caracterización geoquímica, termodinámica de las rocas metamórficas del Complejo Arquía en el sector la cabaña.',
            status: 'confirmado',
            authors:
              'Espinal-Pardo, Camilo (*), Casallas-Hernández, V. (*), Enriquez, K.D (*), Pérez-Prieto, J.E (*), González, V. (*), Timarán, D. (*), Zaque-Escobar, N. (*), Tovar-Hoyos, N.E (*), Reyes-Rojas, J.(*), Ocampo-Hoyos, V.(*), Arenas-Naranjo, S. (*), Juajibioy-Malte, A. (*), Sarrias-García, B.A(*), León-Barrera, L.(*), Arias-García, L.F(*), Muñoz-Ruiz,J.(*), Loza-Acosta, D.(*), Obando-Ramírez, D.L(*), Aguas-Muñoz, C.A.(*), Restrepo-Echavarria, Jorge Luis (**).\n  \n  (*) Programa de Geología, Universidad de Caldas. (**) Departamento de Ciencias Geológicas, Universidad de Caldas.',
            salon: 'A',
          },
          {
            title:
              'Caracterización inicial con potencial para carbonatación ex situ de la Metahazburgita de Medellín',
            status: 'confirmado',
            authors:
              'Manuel José Hurtado Osorio, Leidy Estefania Cadavid Arango, Camila Goez Osorio, Laura Liliana Muñoz Eraso, Cesar Javier Vinasco Vallejo',
            salon: 'A',
          },
          {
            title:
              'Caracterización mediante espectroscopia Raman y análisis de DRX de las diferentes fases de serpentinización y su potencial de generación de hidrógeno en las rocas ultramáficas del sistema Cauca–Romeral',
            status: 'confirmado',
            authors:
              'Hernán Felipe Morales Contreras, Juan Pablo Zapata Villada, Sebastian Zapata Henao, Agustin Cardona Molina, Juan Sebastian Jaramillo Rios',
            salon: 'A',
          },
          {
            title:
              'Caracterización mineralógica y textural de ágatas asociadas a la Formación Yaví, Departamentos de Huila y Tolima, Colombia.',
            status: 'confirmado',
            authors:
              'Maryei Urrego, Sophia Ruiz, Leidy Maldonado, Felipe Gonzalez, Andres Franco, Alejando Vasquez, Camila Pajaro, Mariangel Giron, Yery Presiga, Marion weber, Natalia Acevedo',
            salon: 'A',
          },
          {
            title:
              'Caracterización petrográfica de cobaltita en un skarn de Payandé y su implicación metalogenética',
            status: 'confirmado',
            authors:
              'Santiago Grajales Loaiza, Camila Andrea Montoya, Cristian Santiago Benavides, Juan David Ríos Gonzales, Valery Casallas Hernández',
            salon: 'B',
          },
          {
            title:
              'Caracterización petrográfica preliminar de asociaciones minerales y relaciones paragenéticas en rocas del Complejo Arquía, en el Río Arquía.',
            status: 'confirmado',
            authors:
              'Valentina Agudelo Durán, Sebastián Zapata, Alejandra María Bedoya, Sara Villa, Agustin Cardona',
            salon: 'B',
          },
          {
            title:
              'Caracterización petrográfica, diagenética y de inclusiones fluidas en arenitas de la Formación Cinta de Piedra (sector La Tebaida-Zarzal)',
            status: 'confirmado',
            authors:
              'Felipe Espinosa Ordoñez, Juan Carlos Molano Mendoza, Manuel Arnulfo Páez Reyes, Andrea Milena Mayor Amador, Santiago Daniel Jimenez Diaz, Yael Natalia Mendez Chaparro',
            salon: 'B',
          },
          {
            title:
              'Caracterización y análisis mineral del sistema hidrotermal de alta ley de plata del proyecto Santa Ana – Outcrop Silver',
            status: 'confirmado',
            authors: 'Johan Camilo Aros Jiménez, Alex Julian Insuasty España',
            salon: 'B',
          },
          {
            title:
              'Controles Estratigráficos Y Estructurales Del Sistema Geotérmico Paipa-Iza En El Area De Iza (Boyacá)',
            status: 'confirmado',
            authors:
              'Valeria Vargas Velandia; Álvaro Alejandro Villar Cepeda; César Augusto Gómez Vanegas',
            salon: 'B',
          },
          {
            title:
              'Correlación, estratigrafía, y procedencia de las unidades del Cretácico inferior en el occidente colombiano',
            status: 'confirmado',
            authors: 'Jhonathan Steven Tovar Tovar',
            salon: 'B',
          },
          {
            title:
              'Detección, segmentación y análisis espacio-temporal de manchas de hidrocarburos en imágenes SAR mediante aprendizaje profundo',
            status: 'confirmado',
            authors:
              'David Güiza-Vanegas; Juan Vesga-Figueroa; María Roa-Archila; Thomás Quiñonez- Pineda; Sanin Celedón del Prado; Kevin Tarazona-Balaguera; Adrián Pérez-Montejo; Sait Khurama-Velásquez',
            salon: 'B',
          },
          {
            title:
              'Determinación de los rasgos morfotectónicos utilizando sensores remotos y sistemas de información geográficas (SIG), en la provincia tectónica de Sierra nevada y Santa Marta ; Sierra Nevada de Santa Marta, Colombia.',
            status: 'confirmado',
            authors:
              'Juan Miguel Fernández, Omar Orlando silva, Elías Ernesto rojas',
            salon: 'B',
          },
          {
            title:
              'Determinación de los rasgos morfotectónicos utilizando sensores remotos y sistemas de información geográficas (SIG), en las provincia tectónica de Sevilla; Sierra Nevada de Santa Marta, Colombia.',
            status: 'confirmado',
            authors:
              'Jesus Manuel Vizcaino Martinez\n  Elias Ernesto Rojas Martinez\n  Frank Lascarro Navarro',
            salon: 'B',
          },
          {
            title:
              'Determinación del índice de erosión hídrica en la cuenca Panamá en el municipio de San Joaquín, Santander',
            status: 'confirmado',
            authors:
              'María Juliana Chacón Porras,\n  Manuel González Rodríguez,\n  Silvia Alejandra Vargas Cano,\n  Johan Enrique Páez Romero',
            salon: 'B',
          },
          {
            title:
              'Diversidad de foraminíferos bentónicos de la Bahía Hondita, Alta Guajira: un recorrido por los últimos 1800 años',
            status: 'confirmado',
            authors:
              'Cárdenas Naranjo Mariana Valentina, Briceño Zuluaga Francisco Javier',
            salon: 'B',
          },
          {
            title:
              'Equinodermos (Blastoidea) del Carbonífero de Labateca, Norte de Santander, Colombia',
            status: 'confirmado',
            authors:
              'Arley de J. Gómez-Cruz\n  Alexander Lemus-Restrepo\n  Jorge Luis Restrepo-Echavarría\n  Mario Moreno-Sánchez',
            salon: 'B',
          },
          {
            title:
              'Estrategia de divulgación interactiva sobre transición energética dirigida a estudiantes de educación secundaria',
            status: 'confirmado',
            authors:
              'Valeria Vargas Velandia1 ; Yasmín Pelayo Serrano2 ; Juan Carlos Ramírez Arias3',
            salon: 'B',
          },
          {
            title:
              'Evaluación comparativa entre modelos lineales y aprendizaje automático para la predicción de la porosidad a partir de registros de pozo',
            status: 'confirmado',
            authors: 'Francisco Gamboa Ortega;  Jonathas da Silva Maciel ',
            salon: 'B',
          },
          {
            title:
              'Evaluación de Parámetros Fisicoquímicos como Indicadores de la Calidad del Agua en la Cuenca Media del Río de Oro',
            status: 'confirmado',
            authors:
              'María Juliana Chacón Porras, Oscar Esteban Fonseca Pérez, Johan Enrique Páez Romero, David Blanco Quiroga, Angy Stephany Plata, Juan Diego Colegial Gutiérrez, Mayra Isabel Vargas Cáceres',
            salon: 'B',
          },
          {
            title:
              'Evaluación de la actividad neo-tectònica de la Falla de Boyacà, en el sector Sotaquirà - Duitama mediante análisis geomorfométrico',
            status: 'confirmado',
            authors:
              'Maria Fernanda Camargo Pacheco\n  Michell Jannin Romero Cano',
            salon: 'B',
          },
          {
            title:
              'Evaluación del efecto textural de rocas potencialmente almacenadoras de CO2 en las propiedades petrofísicas fundamentales usadas para estudios de geoalmacenamiento de CO2 a través de análisis de técnicas de Anisotropía de Susceptibilidad Magnética (ASM)',
            status: 'confirmado',
            authors: 'Juliana Andrea Bolívar Tovar, Sairandelly, César Vinasco',
            salon: 'B',
          },
          {
            title:
              'Evaluación del impacto de la extracción intensiva en el acuífero del Golfo de Urabá mediante modelación numérica en FloPy',
            status: 'confirmado',
            authors: 'Andres Felipe Durán Lascarro, Maria Paula Roa Archila',
            salon: 'B',
          },
          {
            title:
              'Evaluación del potencial de gas metano en mantos de carbón de Socha (Boyacá) como alternativa energética, control de riesgos y mitigación de huella de carbono',
            status: 'confirmado',
            authors:
              'Laura M. Montañez S. (Laura.montañez@uptc.edu.co), Jorge Eliecer Mariño Martinez (Jorge.marino@uptc.edu.co), Laura C. Montaña S. (Laura.montana03@uptc.edu.co), Julied A. Melo S. (julied.melo@uptc.edu.co)',
            salon: 'B',
          },
          {
            title:
              'Evaluación integral a través del sistema GTP para la articulación del componente hidrogeológico en la planificación territorial de la cuenca alta del río Chicamocha (Boyacá)',
            status: 'confirmado',
            authors: 'Maria Alejandra Galvis Niño',
            salon: 'B',
          },
          {
            title:
              'Gemelos digitales como insumo para la enseñanza y divulgación de las geociencias',
            status: 'confirmado',
            authors:
              'Liseth Leal; Juan García; David Inguilan; Holman Dueñas; Daniel Romero; Cristhian Cuadros; Juliana Rodríguez; Angélica Alvarez; Sergio Andrés García-Arias',
            salon: 'B',
          },
          {
            title:
              'Generación de registros sintéticos para la caracterización petrofísica de pozos mediante Python',
            status: 'confirmado',
            authors:
              'Esteban Fonseca Pérez; Gabriela Majthenyi Correa; Sophia Madiedo Cala',
            salon: 'B',
          },
          {
            title:
              'Geocronología y caracterización estructural de las milonitas asociadas al sistema de fallas Cauca-Romeral en el segmento norte del Cañón del Cauca.',
            status: 'confirmado',
            authors:
              'Daniel Ortiz, Sebastián Zapata, Laura Calderón, Agustín Cardona, Alejandra Bedoya',
            salon: 'B',
          },
        ],
      },
      {
        type: 'info',
        time: '12:30–14:00',
        title: 'Almuerzo',
        category: 'almuerzo',
      },
      {
        type: 'block',
        time: '14:10–15:40',
        auditorio: {
          cms: [
            {
              code: 'CM-1',
              time: '14:10–14:50',
              title:
                'Simulando la corteza y el manto en el laboratorio: uso de la petrología experimental para entender la distribución de los elementos químicos',
              speaker: 'Andrés Salazar',
              org: 'Universidad de São Paulo',
            },
            {
              code: 'CM-2',
              time: '15:00–15:40',
              title: 'Tectónica y fuentes sismogénicas el NE de Colombia',
              speaker: 'Francisco Velandia',
              org: 'UIS',
            },
          ],
        },
        cells: {
          '201': [
            {
              title:
                'Geodivulgación comunitaria para la gestión del riesgo: una estrategia desde el Museo de Ingeniería y Geociencias de la UPTC',
              authors: 'Nikolle Valentina Soto Correa',
              linea: 'Geoamenazas · GRD · Geodivulgación',
              status: 'confirmado',
              time: '14:10–14:25',
            },
            {
              title:
                'Evaluación multitemporal de subsidencia minera mediante InSAR en el título 009-91, Paipa, Boyacá',
              status: 'confirmado',
              authors:
                'Milton Fabricio Rodríguez Celis, Heider Nicolás Aunta Molina',
              time: '14:40–14:55',
            },
            {
              title:
                'ANÁLISIS HIDROGEOMORFOLÓGICO PRE – POST HIDROELÉCTRICA MIEL I: CASO DE ESTUDIO CUENCA RÍO LA MIEL',
              status: 'confirmado',
              authors:
                'Valencia-Madrigal, Julieth* · Hazet, Paul · Calderón-Díaz, Laura · Ávila-Díaz, Álvaro',
              time: '15:10–15:25',
            },
          ],
          '202': [
            {
              title:
                'Evaluación multitemporal de coberturas vegetales mediante super-resolución satelital (S2DR3), aplicable en la detección de anomalías',
              status: 'confirmado',
              authors:
                'Erluan Andres Zabaleta Benavides, John William Branch Bedoya, Andrés Mauricio Muñoz García, Fredy Mauricio Gutiérrez Álvarez',
              time: '14:10–14:25',
            },
            {
              title:
                'Más allá del índice de oleanano: un enfoque de aprendizaje automático para la clasificación de la edad del petróleo en cuencas colombianas',
              status: 'confirmado',
              authors: 'Daniel Esteban Quintana Gutiérrez',
              time: '14:40–14:55',
            },
            {
              title:
                'Distribución espacial y vertical de la susceptibilidad magnética en depósito cuaternario del Valle de Sogamoso',
              status: 'confirmado',
              authors:
                'Javier Darío Guerra Muñoz, Daniel Alexander Vargas Bolívar, Andrés Felipe Cifuentes Castro',
              time: '15:10–15:25',
            },
          ],
          '203': [
            {
              title:
                'Características Mineralógicas de la Euclasa de la vereda Palomas, Gachalá, Cundinamarca (Colombia)',
              status: 'confirmado',
              authors:
                'Andrés Camilo Barreto Gordillo, Mariana Catalina López Villamil, Fernando Heli Romero Ordóñez',
              time: '14:10–14:25',
            },
            {
              title:
                'Metamorfismo y significado tectónico del Neis de la Iguaná (Valle de Aburrá): ¿Un granitoide Jurásico fuera de lugar?',
              status: 'confirmado',
              authors:
                'Sara Del Carmen Villa Hoyos, Alejandra Bedoya, Agustín Cardona, Andrés Bustamante, Sebastián Zapata Henao',
              time: '14:40–14:55',
            },
            {
              title:
                'Britholita, el principal portador de REE en las rocas alcalinas de San José del Guaviare: relaciones texturales, quimismo, e implicaciones petrogenéticas',
              status: 'confirmado',
              authors:
                'Mildre Saray Saenz De La Ossa ; María Paula Sánchez Suárez ; Astrid Siachoque Velandia',
              time: '15:10–15:25',
            },
          ],
          '204': [
            {
              title:
                'Arqueometría de ágatas arqueológicas en la Sierra Nevada de Santa Marta: procedencia mineral, geodiversidad y redes de intercambio',
              status: 'confirmado',
              authors: 'María Camila Pájaro, Mariangel Girón',
              time: '14:10–14:25',
            },
            {
              title:
                'Caminos Reales de Santander: una aproximación desde el patrimonio geológico',
              status: 'confirmado',
              authors: 'Aldo Julián Molano Sierra',
              time: '14:40–14:55',
            },
            {
              title:
                'Localidades fosilíferas del Cretacico Marino de Tena Cundinamarca- Reconocimiento paleontologico a partir de Moluscos Fosiles del Grupo Villeta',
              status: 'confirmado',
              authors:
                'Antonio Eliseo Silva Castro, Astrid Muñoz, Javier Luque',
              time: '15:10–15:25',
            },
          ],
          '205': [
            {
              title:
                'Análisis petrofísico, petrográfico, sedimentológico y litogeoquímico en la Formación Chipaque y el Grupo Guadalupe',
              status: 'confirmado',
              authors: 'Granados-Sabio, Kevin Felipe; Vélez-Hoyos, Juan David',
              time: '14:10–14:25',
            },
            {
              title:
                'Análisis geológico y estructural a escala 1:10 000 en la zona bananera, flanco noroeste del SNSM',
              status: 'confirmado',
              authors:
                'Franklin David Cueto Jaime, Rafael Aldair Montero Moreno, Ivan Ramith Montero Arias',
              time: '14:40–14:55',
            },
            {
              title:
                'Procedencia sedimentaria en la cuenca del río Gualí: una perspectiva Source-to-Sink desde el Mioceno al presente',
              authors:
                'Valentina Agudelo, Salomé López, Jesmy Martínez, Samuel Cañas, María Isabel Sierra',
              linea: 'Estratigrafía y Sedimentología',
              status: 'confirmado',
              time: '15:10–15:25',
            },
          ],
          '206': [
            {
              title:
                'De la Mina al Debate Social: Análisis Multidimensional de los Hidrocarburos y el Carbón en Colombia.',
              status: 'confirmado',
              authors: 'Samir Elier Bermúdez Castellanos',
              time: '14:10–14:25',
            },
            {
              title:
                'La cartografía como lectura territorial: puentes entre geografía y geología',
              status: 'confirmado',
              authors: 'Juanita Pérez',
              time: '14:40–14:55',
            },
            {
              title:
                'Sistema Integral de Registro Geológico en Campo como Herramienta de Geoeducación en Ingeniería Geológica',
              authors:
                'Giselle Camila Cordoba Orozco, Jose Eduardo Sotelo Suarez, Durlandy David Meza Mejía',
              linea: 'Tecnología: SIG · ML · IA · Sensores Remotos',
              status: 'confirmado',
              time: '15:10–15:25',
            },
          ],
        },
      },
      {
        type: 'info',
        time: '15:50–16:20',
        title: 'Break (entrega segundo refrigerio)',
        category: 'break',
      },
      {
        type: 'block',
        time: '16:30–18:00',
        auditorio: {
          cms: [
            {
              code: 'CM-3',
              time: '16:30–17:10',
              title:
                'La otra falla geológica: nuestra relación con las comunidades y el ingreso a territorio',
              speaker: 'César Otálvaro',
              org: 'Universidad Nacional',
            },
            {
              code: 'CM-4',
              time: '17:20–18:00',
              title: 'Transfigura',
              speaker: 'Por confirmar',
              org: 'Transfigura',
            },
          ],
        },
        cells: {
          '201': [
            {
              title:
                'Zonificación de la susceptibilidad ante movimientos en masa e inundaciones en la microcuenca La Patilla (Salazar de las Palmas)',
              status: 'confirmado',
              authors: 'MARIA JOSE GARAY PAEZ',
              time: '16:30–16:45',
            },
            {
              title:
                'Geología del ciclismo: Control Estructural y Morfológico en los Escenarios Íconos del Ciclismo',
              status: 'confirmado',
              authors: 'Juan Sebastián Luengas Jaimes',
              time: '17:00–17:15',
            },
            {
              title:
                'MODELACIÓN DEM DEL REBOTE DE BLOQUES ROCOSOS EN TERRAPLENES DE PROTECCIÓN CONTRA CAÍDA DE ROCAS MEDIANTE MATDEM',
              authors:
                'Luis Alejandro Niño Saavedra, Nikolle Valentina Soto Correa, Danny Useche Infante',
              linea: 'Geoamenazas · GRD · Geodivulgación',
              status: 'confirmado',
              time: '17:30–17:45',
            },
          ],
          '202': [
            {
              title:
                'Transformación del análisis geoespacial mediante inteligencia artificial y automatización',
              status: 'confirmado',
              authors: 'David Felipe Rincón Cárdenas',
              time: '16:30–16:45',
            },
            {
              title:
                'Efectos críticos del tratamiento de muestras minerales en técnicas analíticas',
              status: 'confirmado',
              authors: 'Diana Isabel Nieto Patarroyo',
              time: '17:00–17:15',
            },
            {
              title:
                'Evaluación comparativa de la estimación de materia orgánica del suelo a partir de imágenes multiespectrales e hiperespectrales',
              authors: 'Por confirmar',
              linea: 'Tecnología: SIG · ML · IA · Sensores Remotos',
              status: 'confirmado',
              time: '17:30–17:45',
            },
          ],
          '203': [
            {
              title:
                'Emplazamiento sintectónico y transición de fábricas magmáticas a sólidas en el plutón Marcabelí, suroccidente del Ecuador',
              status: 'confirmado',
              authors: 'Cesar Vinasco, carlos Archanjo, Umberto Cordani',
              time: '16:30–16:45',
            },
            {
              title:
                'Caracterización mineralógica y geoquímica de los fluorapatitos asociados a las áreas esmeraldíferas en los distritos mineros de La Marina y Chivor (Colombia).',
              status: 'confirmado',
              authors:
                'Juan Alejandro González Sánchez, Karoll Samantha Díaz Peñuela, Fernando Helí Romero Ordóñez',
              time: '17:00–17:15',
            },
            {
              title:
                'Características Microtermométricas de las Inclusiones Fluidas en las Ocurrencias de Topacio del Vichada (Colombia).',
              status: 'confirmado',
              authors:
                'Evelyn Mariana Ríos Franco, Fernando Helí Romero Ordóñez',
              time: '17:30–17:45',
            },
          ],
          '204': [
            {
              title:
                'DIRECTRICES PARA LA GESTIÓN INTEGRAL DE SITIOS DE INTERÉS GEOLÓGICO CON VOCACIÓN TURÍSTICA, EN EL DEPARTAMENTO DE ANTIOQUIA',
              status: 'confirmado',
              authors:
                'Albeiro Rendón Rivera, Heiner Hernán Cardona Polanco, Carlos Alberto López Pérez, Liced Pulgarín Zuleta, Camilo Andrés Sánchez Vargas',
              time: '16:30–16:45',
            },
            {
              title: 'El arte de la geología, la geología en el arte',
              status: 'confirmado',
              authors: 'Clemencia Gómez',
              time: '17:00–17:15',
            },
            {
              title:
                'Arcillas, minerales y cerámica: una perspectiva de proveniencia Geoarqueológica en la Sierra Nevada de Santa Marta',
              authors:
                'María Carolina Sosa Garcés, Kevin Granados, Thomas Heinrich Cramer',
              linea: 'Paleontología · Geopatrimonio · Geoarqueología',
              status: 'confirmado',
              time: '17:30–17:45',
            },
          ],
          '205': [
            {
              title:
                'Estratigrafía y procedencia multi-técnica del Complejo Quebradagrande: implicaciones para la evolución tectonosedimentaria del margen noroccidental suramericano y su relación con la colisión de la placa Caribe.',
              status: 'confirmado',
              authors:
                'Anamaría Vera González, Sebastián Zapata Henao, Germán Alonso Bayona Chaparro, Agustín Cardona Molina, Ana María Valencia Londoño, Jhonathan Steven Tovar Tovar, Juan Camilo Valencia Gómez, Hernán Felipe Morales Contreras',
              time: '16:30–16:45',
            },
            {
              title:
                'Relatos de una Serranía: caracterización geológica, estructural y mineralógica de la vereda Cerrito (Barrancas, La Guajira)',
              status: 'confirmado',
              authors:
                'Carlos Manuel Martinez Ballesteros, Ana Cristina Ruiz Sequeda, Maria Camila Perdomo Geney',
              time: '17:00–17:15',
            },
            {
              title:
                'FACIES ESTRATIGRÁFICAS, PROXIES GEOQUÍMICOS Y REGISTRO FOSILÍFERO PARA LA RECONSTRUCCIÓN DEL PALEOAMBIENTE DE LA FORMACIÓN LA PAJA: VÉLEZ, SANTANDER, COLOMBIA',
              authors:
                'German Reyes Mendoza, Jose Maria Cantillo De la Hoz, Josep Anton Moreno Bedmar',
              linea: 'Estratigrafía y Sedimentología',
              status: 'confirmado',
              time: '17:30–17:45',
            },
          ],
          '206': [
            {
              title:
                'Mi Primer Libro de...: educación inclusiva, informada y resiliente en Ciencias de la Tierra',
              status: 'confirmado',
              authors: 'Clemencia Gómez',
              time: '16:30–16:45',
            },
            {
              title:
                'Presentación de la cartilla MAMA CUMBAL: VOLCÁN, MEMORIA Y TERRITORIO',
              status: 'confirmado',
              authors:
                'Karen Sofía Alpala Cumbal, María Camila Beltrán Rueda, María José Triana, Juan Sebastián Mosquera, Juan Sebastián Muñoz Benítez, Juliana Sanabria Castañeda, Daniel Felipe Gómez Hoyos, David Fernando Bucheli Rosero, Vincent Efrén Tarapués Taimal',
              time: '17:00–17:15',
            },
            {
              title:
                'Análisis de procedencia de las rocas turbidíticas del Miembro Urrao (Formación Penderisco), Cordillera Occidental: implicaciones para el reconocimiento de fuentes máficas–ultramáficas en condiciones tropicales',
              authors:
                'Juan Felipe Granados Cardona, Germán Bayona, Sebastián Zapata, Agustín Cardona, Ana María Valencia Londoño, Anamaría Vera González, Jhonathan Tovar, Felipe Morales',
              linea: 'Estratigrafía y Sedimentología',
              status: 'confirmado',
              time: '17:30–17:45',
            },
          ],
        },
      },
      {
        type: 'info',
        time: '18:00–19:00',
        title: 'Salida Termales (máx. 7:00 PM)',
        category: 'cierre',
      },
    ],
  },
  {
    id: 'jue',
    label: 'Jueves 20',
    rooms: ['201', '202', '203', '204', '205', '206'],
    sub: '201 Estructural · 203 Estratigrafía y Sedimentología · 205 Hidrogeología+Geotecnia · 206 Tecnología (4 salas activas)',
    desc: 'Reestructurado 26-jun-2026: sin pósters (se concentraron el miércoles). 3 charlas individuales en la mañana (CM-5/6/7, en paralelo al bloque de 6x20min de ponencias) + 2 charlas pareadas en la tarde (CM-8/9) + 1 charla suelta al final de la tarde (CM-10, bloque corregido — antes mal numerado como \'9 y 10\').',
    themes: {
      '201': 'Estructural · Tectónica',
      '202': 'Geología Regional · Magmatismo · Termal',
      '203': 'Estratigrafía · Sedimentología',
      '204': 'Petrología Metamórfica e Ígnea',
      '205': 'Hidrogeología · Geotecnia',
      '206': 'Historia Geológica · Petrología Metamórfica',
    },
    rows: [
      {
        type: 'block',
        time: '8:10–10:30',
        auditorio: {
          cms: [
            {
              code: 'CM-5',
              time: '8:10–8:50',
              title: 'Artificial Intelligence and Seismic Networks in the Ecuador-Colombia Subduction Zone',
              speaker: 'Alexander Wickham',
              org: 'Institut de France',
            },
            {
              code: 'CM-6',
              time: '9:00–9:40',
              title: '(Sin título — pendiente)',
              speaker: 'Por confirmar',
            },
            {
              code: 'CM-7',
              time: '9:50–10:30',
              title: 'Servicio Geológico Colombiano',
              speaker: 'Por confirmar',
              org: 'SGC',
            },
          ],
        },
        cells: null,
        posterBatch: [
          {
            title:
              'Geoeducación y divulgación de las geociencias: una revisión sistemática de enfoques y metodologías',
            status: 'confirmado',
            authors: 'Aldo Molano',
            salon: 'A',
          },
          {
            title:
              'Geología que transforma: educación y claridad para un territorio consciente',
            status: 'confirmado',
            authors:
              'Cristian Santiago Benavides Burgos, Camila Alejandra Rodríguez, Yessika Aristizabal, David Andres Timaran.',
            salon: 'A',
          },
          {
            title:
              'HidroVetas: Comparación de los Sistemas Geotérmicos de Paipa, Vetas y Málaga como Potencial Estratégico para la Transición Energética en Colombia',
            status: 'confirmado',
            authors:
              'Laura Valentina Solis Narvaez y Rafael Camilo Venecia Ardila',
            salon: 'A',
          },
          {
            title: 'Hidrogeodía 2026: comunidad, ciencia y recurso hídrico',
            status: 'confirmado',
            authors: 'Manuel González Rodríguez y Silvia Alejandra Vargas Cano',
            salon: 'A',
          },
          {
            title:
              'Historia de exhumación del Plutón de Pance y Danubio: implicaciones para la historia de deformación Miocena de la cordillera occidental de Colombia.',
            status: 'confirmado',
            authors: 'Lina María Mogollón Gómez, Natalia Gonzalez Rojas',
            salon: 'A',
          },
          {
            title:
              'Identificación Automatizada de Formaciones Geológicas Aptas para Almacenamiento de CO₂ Mediante Machine Learning Usando Registros de Pozo de Acceso Abierto',
            status: 'confirmado',
            authors:
              'Oscar Andres Mendoza Gonzalez, Esteban Alejandro Huertas Huertas',
            salon: 'A',
          },
          {
            title:
              'Identificación de Zonas Potenciales de Recarga de Acuíferos en la Mesa de los Santos, Santander',
            status: 'confirmado',
            authors:
              'María Juliana Chacón Porras, \n  Johan Enrique Páez Romero, \n  Sergio Andrés García Arias, \n  María Alejandra Cetina Tarazona',
            salon: 'A',
          },
          {
            title:
              'Identificación de zonas con potencial de generación de hidrógeno natural mediante análisis multicriterio en SIG en el sector centro-sur del departamento de Nariño, Colombia',
            status: 'confirmado',
            authors: 'Valeria Vargas Velandia; David Alejandro Prada Tinoco',
            salon: 'A',
          },
          {
            title:
              'Identificación de zonas potenciales de recarga de acuíferos en la cuenca del río Fonce, Santander, implementando la Guía Metodológica para la Identificación de Zonas Potenciales de Recarga de Acuíferos para la gestión hídrica territorial.',
            status: 'confirmado',
            authors: 'David Blanco Quiroga y Oscar Esteban Fonseca Pérez',
            salon: 'A',
          },
          {
            title:
              'Integración de fotogrametría y modelado 3D para la comprensión y el análisis de la geología estructural',
            status: 'confirmado',
            authors:
              'Angélica María Cappacho Alvarez - Thomás Leopoldo Quiñonez Pineda',
            salon: 'A',
          },
          {
            title:
              'Litoestratigrafia y petrogafía de las rocas de afinidad ofiolitica en la Quebrada la Honda (Filadelfia, Caldas): origen y correlaciones tectónicas.',
            status: 'confirmado',
            authors:
              'Julian Parra, Alejandra Bedoya, Eliana Botello, Agustín Cardona, Juan Pablo Zapata.',
            salon: 'A',
          },
          {
            title:
              'Metodología para la separación de minerales densos y circones detríticos en arenas, aplicada a estudios de procedencia sedimentaria',
            status: 'confirmado',
            authors:
              'Salomé López, Valentina Agudelo, Jesmy Martínez, María Isabel Sierra',
            salon: 'A',
          },
          {
            title:
              'M¿Qué nos dicen los fósiles de Miraflores? Una nueva localidad del Cretácico Inferior en Boyacá',
            status: 'confirmado',
            authors:
              'Sergio Iván Sarmiento Romero¹*; Cristian Andrés Martínez Araque¹',
            salon: 'A',
          },
          {
            title:
              'PEGMATITAS COLOMBIANAS COMO FUENTE DE TIERRAS RARAS (REE) Y MINERALES ESTRATÉGICOS: CARACTERIZACIÓN GEOQUÍMICA DEL COMPLEJO DE MITÚ Y EL COMPLEJO ULTRAMÁFICO DE BOLÍVAR.',
            status: 'confirmado',
            authors: 'Angie Roshel Pabón Soler',
            salon: 'A',
          },
          {
            title:
              'Paleoambientes sedimentarios generales de las “Sedimentitas de Ladrilleros” (Mioceno) en el sector de Ladrilleros (Buenaventura, Valle del Cauca)',
            status: 'confirmado',
            authors: 'Carlos Alberto Guzmán López',
            salon: 'A',
          },
          {
            title:
              'Patrimonio Geológico del Departamento del Cesar: Un Recurso para la Conservación y el Desarrollo Sostenible',
            status: 'confirmado',
            authors:
              'Luis Fernando Molina Contreras, Luis Pablo Pacheco Gerardino',
            salon: 'A',
          },
          {
            title:
              'Petrogénesis y evolución de productos volcánicos y subvolcánicos básicos e intermedios de edad miocena asociados al Complejo Volcánico de Combia mediante el uso de petrografía, química mineral y geoquímica de roca total',
            status: 'confirmado',
            authors:
              'Jank Carlos Rosero Otalvaro\n  Santiago Nicolás López Bravo\n  Danna Julieth Reyes Escobar',
            salon: 'A',
          },
          {
            title:
              'Petrología y Geoquímica orgánica de los carbones de la Formación Amagá aflorantes en el área Quinchía-Riosucio y su potencial de generación de hidrocarburos.',
            status: 'confirmado',
            authors: 'Luisa María Gómez Oliveros',
            salon: 'A',
          },
          {
            title:
              'REVISIÓN PRELIMINAR DE LAS ESTRUCTURAS SEDIMENTARIAS BIOGÉNICAS (ICNOLOGÍA) DE LA FORMACIÓN TIBASOSA – CRETÁCICO INFERIOR DE BOYACÁ COLOMBIA. SECCIÓN VÍA DUITAMA – NOBSA.',
            status: 'confirmado',
            authors:
              'MIGUEL ÁNGEL FRANCO MORENO*, NATALIA LUCIA ZAQUE ESCOBAR, ALEXANDER LEMUS RESTREPO',
            salon: 'A',
          },
          {
            title:
              'Relaciones entre Velocidades Sísmicas y Resistividad Eléctrica en el Subsuelo Somero mediante Refracción Sísmica, MASW y Tomografía Eléctrica',
            status: 'confirmado',
            authors:
              'Narayana Rishi Salazar Vega, Dr. Francisco Gamboa Ortega, David Andrés Flórez Rojas',
            salon: 'A',
          },
          {
            title:
              'Relación de mineralizaciones tipo pórfido con la Brecha Apollo - Cartografía geológica en el Proyecto Guayabales - Collective Mining',
            status: 'confirmado',
            authors:
              'Mario Andrés Castaño Castro, Marcelo Arango Trujillo, Valery Casallas Hernández, Sebastián Gutiérrez Sánchez, Sebastián Arenas Naranjo, Juan Daniel Burbano Salazar, Alex Julián Insuasty España',
            salon: 'A',
          },
          {
            title:
              'Reporte de posible presencia de cobaltita (CoAsS), en skarn de Payandé y su implicación metalogénica',
            status: 'confirmado',
            authors:
              'Santiago Grajales Loaiza, Diego Germán Loaiza Garcia, Cristian santiago Benavides, Alex Insuasty España, Camila Andrea Montoya, Valery Casallas Hernandez, Juan David Rios Gonzales.',
            salon: 'A',
          },
          {
            title:
              'Saberes de piedra y camino: diálogo entre la geología y la memoria del Cañón del Chicamocha en los Caminos Reales',
            status: 'confirmado',
            authors:
              'María Gabriela Sanabria Murgas, Lady Johanna Ríos Guerrero \n  Semillero de Investigación en Petrología (SEPET) – Escuela de Geología, Universidad Industrial de Santander',
            salon: 'A',
          },
          {
            title:
              'Sección Estratigráfica de la Formación La Luna a escala 1:100 de La Quebrada La Marta, Salazar de la Palmas - Norte de Santander - Sur de la Cuenca del Catatumbo',
            status: 'confirmado',
            authors:
              'Autores: Daniela Diaz-Ariza, Gabriela Chavarro-Morales Coautores: Alejandra Mejía-Molina, Ilich Villamizar-Solano y Jhan Contreras-Leal',
            salon: 'A',
          },
          {
            title:
              'Zonificación de la susceptibilidad ante movimientos en masa e inundaciones en la microcuenca La Patilla (Salazar de las Palmas, Norte de Santander) mediante análisis multitemporal y componentes físicos',
            status: 'confirmado',
            authors: 'MARIA JOSE GARAY PAEZ',
            salon: 'A',
          },
          {
            title:
              'Zonificación de susceptibilidad por movimientos en masa en la zona rural de la cuenca alta del río Manaure (Cesar)',
            status: 'confirmado',
            authors:
              'Karoll Viviana Ávila Rincón\n  Jesús Manuel Vizcaíno Martinez \n  Luis Carlos tapia vela',
            salon: 'A',
          },
          {
            title:
              'Zonificación preliminar de amenaza por movimientos en masa en la cuenca de la quebrada Minas del Vapor, Puerto Berrío, Antioquia.',
            status: 'confirmado',
            authors:
              'Jhassai Sharith Epiayu Corrales, María Camila Perdomo Geney, Emanuel Andrés Cáceres Aroca',
            salon: 'A',
          },
          {
            title:
              '“Mi libro secreto de la Tierra”: Estrategia de Geoeducación para la Enseñanza de las Geociencias y su Apropiación Social en la Infancia',
            status: 'confirmado',
            authors:
              'Giselle Cordoba, Gabriela Florez, Samuel Ospino, William Ruiz, Jose Sotelo',
            salon: 'A',
          },
          {
            title:
              'ANÁLISIS COMPARATIVO DE ANÁLOGOS DE SISTEMAS VULCANO‑SEDIMENTARIOS ENTRE MARTE Y LA TIERRA',
            authors:
              'Santiago Baruch Rojas García, Juan Carlos Ramírez Arias, Yasmin Pelayo Serrano',
            salon: 'A',
            status: 'confirmado',
          },
          {
            title:
              'GEOLOGÍA, ANÁLISIS ESTRUCTURAL Y CARACTERIZACIÓN MINERALÓGICA DEL RESGUARDO INDÍGENA ESCOPETERA Y PIRZA (RISARALDA‑CALDAS) EN COLOMBIA: UNA HERRAMIENTA TÉCNICA PARA LA GESTIÓN TERRITORIAL',
            authors:
              'Karen Victoria Melchor Pinzón, Yasmin Pelayo Serrano, Juan Carlos Ramírez Arias',
            salon: 'A',
            status: 'confirmado',
          },
          {
            code: 'P-077',
            title:
              'CARACTERIZACIÓN Y ANÁLISIS CINEMÁTICO DE FRACTURAS DEL BLOQUE ORIENTAL DE LA FALLA DE BUCARAMANGA EN EL FLANCO NORORIENTAL DEL SINCLINAL DE FLORESTA',
            authors:
              'Jaider Pradilla Quintero; Juan Carlos Ramírez Arias; Yasmín Pelayo Serrano',
            linea: 'Estructural y Geología Regional',
            salon: 'A',
            status: 'confirmado',
          },
        ],
        title: '',
        sgc: 'start',
        sgcSpan: 3,
      },
      {
        type: 'info',
        time: '10:30–11:00',
        title: 'Break (entrega tercer refrigerio)',
        category: 'break',
        sgc: 'continue',
      },
      {
        type: 'panel',
        time: '11:00–12:30',
        title: 'Geología en Vivo: Dos Expertos, Un Viaje al Corazón de la Tierra',
        note: 'Italo Reyes · Mauricio Reyes',
        sgc: 'continue',
      },
      {
        type: 'info',
        time: '12:30–14:00',
        title: 'Almuerzo',
        category: 'almuerzo',
      },
      {
        type: 'panel',
        time: '14:10–15:40',
        title: 'Panel - Gestión del Riesgo',
        note: 'Panel de Discusión',
        sgc: 'start',
        sgcSpan: 4,
      },
      {
        type: 'info',
        time: '15:50–16:20',
        title: 'Break (entrega cuarto refrigerio)',
        category: 'break',
        sgc: 'continue',
      },
      {
        type: 'block',
        time: '16:30–18:00',
        auditorio: {
          cms: [
            {
              code: 'CM-8',
              time: '16:30–17:10',
              title: 'La temperatura: un factor subestimado en la interpretación estructural',
              speaker: 'Eduardo Rossello',
              org: 'Servicio Geológico Argentina',
            },
            {
              code: 'CM-9',
              time: '17:10–17:50',
              title: 'Territorio, energía y decisiones: las geociencias como brújula del Estado',
              speaker: 'Flover Rodríguez-Portillo',
              org: 'ACGGP',
            },
          ],
        },
        cells: {
          '201': [
            {
              title: 'Evolución tectono-paleogeográfica del basamento Meso-Neoproterozoico del norte de los Andes y México',
              status: 'confirmado',
              authors: 'Jorge Luis Restrepo Echavarria, Mario Moreno Sánchez, Alexander Lemus Restrepo, Arley de Jesús Gómez Cruz',
              time: '16:30–16:45',
            },
            {
              title: 'Sección estructural a escala 1:10.000 entre la Quebrada Chiracoca (Vereda Buenavista Parte Baja) – Vereda Lobatica Chinácota, sur de la cuenca del Catatumbo, Norte de Santander',
              status: 'confirmado',
              authors: 'Paula Fernanda Leal Peña, Paula Valentina Flórez Rozo, Alejandra Mejía-Molina, Ilich Villamizar-Solano',
              time: '17:00–17:15',
            },
            {
              title: 'Evolución de las cuencas de antearco en Ecuador: relación entre las cuencas sedimentarias en el onshore y en el offshore',
              authors: 'María José Hernández, François Michaud, Elia d\'Acremont, Jean-Yves Collot, Jean-Noël Proust, Diego Barba',
              linea: 'Estructural · Tectónica',
              status: 'confirmado',
              time: '17:30–17:45',
            },
          ],
          '202': [
            {
              title: 'Evolución magmática y relaciones estructurales del Complejo Quebradagrande en la región de Filadelfia (Dpto. Caldas)',
              status: 'confirmado',
              authors: 'Daniela Molina, Eliana Botello, Agustín Cardona, Juan Sebastián Jaramillo, Catalina Salgado, Sebastián Zapata',
              time: '16:30–16:45',
            },
            {
              title: 'CONFIGURACIÓN ESTRUCTURAL Y EVOLUCIÓN TERMOCINEMÁTICA DEL PIEDEMONTE DE LA SIERRA NEVADA DE EL COCUY, CORDILLERA ORIENTAL DE COLOMBIA',
              status: 'confirmado',
              authors: 'Juan Sebastián Bohórquez Rozo, Juan Carlos Ramírez Arias, Jairo Torres',
              time: '17:00–17:15',
            },
            {
              title: 'EVALUACIÓN DEL EFECTO TERMAL ASOCIADO A LA ZONA DE SUBDUCCIÓN DE LA PLACA CARIBE EN LA EXPRESIÓN TERMOCRONOLÓGICA DE LA SIERRA NEVADA DE SANTA MARTA',
              status: 'confirmado',
              authors: 'Catalina Flórez Pabón, Yasmin Pelayo Serrano, Juan Carlos Ramírez Arias',
              time: '17:30–17:45',
            },
          ],
          '203': [
            {
              title: 'Estratigrafía integrada de la transición Barremiano-Aptiano en Villanueva (Santander): implicaciones del registro del Evento Anóxico Oceánico-1a (EAO1a) en la Cordillera Oriental',
              status: 'confirmado',
              authors: 'Cantillo de la Hoz, Jose Maria; Páez Reyes, Manuel Arnulfo; Gaona Narváez, Tatiana',
              time: '16:30–16:45',
            },
            {
              title: 'Usando geoquímica en rocas detríticas para trazar áreas fuente de composiciones máficas y ultramáficas',
              status: 'confirmado',
              authors: 'Ana María Valencia Londoño, Germán Bayona, Sebastián Zapata, Agustín Cardona, Anamaría Vera González, Felipe Granados, Jhonatan Tovar, Felipe Morales',
              time: '17:00–17:15',
            },
            {
              title: 'Evolución tectonoestratigráfica Neógena de la Cordillera Occidental (1°–4° N).',
              status: 'confirmado',
              authors: 'Sebastián Echeverri, Andrés Pardo-Trujillo, Sebastián Zapata, Sergio A. Celis, Ángel Barbosa-Espitia, Mónica Carvalho',
              time: '17:30–17:45',
            },
          ],
          '204': [
            {
              title: 'Caracterización estructural de los basamentos Permo-Triásicos del norte de la Cordillera Central: implicaciones tectónicas',
              status: 'confirmado',
              authors: 'Maria Alejandra Parra Maldonado, Sebastián Zapata, Laura Calderón Diaz, Agustín Cardona, Alejandra Bedoya',
              time: '16:30–16:45',
            },
            {
              title: 'Metamorfismo de muy bajo grado en el registro volcano-sedimentario Cretácico del flanco occidental de la Cordillera Central colombiana.',
              status: 'confirmado',
              authors: 'Paulina Muñoz Duque, Agustín Cardona Molina, Sebastián Zapata Henao, Klaus Wemmer, Catalina Salgado Olascuaga, David Patiño Valencia',
              time: '17:00–17:15',
            },
            {
              title: 'Evaluación de los protolitos y el metamorfismo de los Esquistos de Sabaletas en Armenia Mantequilla (Dpto. Caldas)',
              authors: 'Catalina Salgado, Agustín Cardona, David Patiño, Julián Parra, Juan Pablo Zapata, Juan Sebastián Jaramillo, Paulina Muñoz, Daniela Molina, Sebastián Zapata',
              linea: 'Petrología Metamórfica · Geocronología',
              status: 'confirmado',
              time: '17:30–17:45',
            },
          ],
          '205': [
            {
              title: 'Relación entre la mineralogía de arcillas, la expansión de suelos y la ocurrencia de deslizamientos en Colombia',
              status: 'confirmado',
              authors: 'Juan Esteban Cabarcas Fajardo',
              time: '16:30–16:45',
            },
            {
              title: 'Caracterización geomecánica multiescala de Bimrocks, ladera oriental del Valle de Aburrá',
              status: 'confirmado',
              authors: 'Sara Castro Ortiz, Juan Esteban Flórez Rueda, Juan Esteban Pabón Cruz, Diego Armando Rendón Giraldo, Sebastián Sánchez Gil',
              time: '17:00–17:15',
            },
            {
              title: 'Predicción de la Respuesta Carga-Asentamiento en Cimentaciones Corridas sobre Arena usando el Método de Elementos Finitos y Machine Learning',
              authors: 'Felipe Tiria Castro, Daniel Esteban Galán Palacios, Deibyd Yesid Rosas Mesa, Danny Jose Useche Infante',
              linea: 'Hidrogeología · Geotecnia',
              status: 'confirmado',
              time: '17:30–17:45',
            },
          ],
          '206': [
            {
              title: 'Territorios del Tiempo Profundo: integración del patrimonio geológico, fósil y minero en la Cuenca Cesar-Ranchería',
              status: 'confirmado',
              authors: 'Laura Lucia Ospina Ordóñez, Karen Lorena Payares Carrasco',
              time: '16:30–16:45',
            },
            {
              title: 'Protolitos y metamorfismo de las rocas de afinidad ofiolítica del Occidente de la Cordillera Central en San Bartolomé',
              authors: 'Edward Sebastián Mora Torres, Agustín Cardona Molina, Juan Sebastián Jaramillo, Juan Pablo Zapata',
              linea: 'Petrología Metamórfica · Geocronología',
              status: 'confirmado',
              time: '17:00–17:15',
            },
            {
              title: 'Registro Volcano-Estratigráfico de la Formación Saldaña en el Alto de Natagaima, Valle Superior del Magdalena',
              authors: 'Kevin Santiago Montañez Valencia, Sebastián Zapata Henao, Juan Sebastián Jaramillo Ríos, Manuela Botero, Daniel Alejandro Ortiz Ríos, Mónica Carvalho, Robert Holder',
              linea: 'Estratigrafía y Sedimentología',
              status: 'confirmado',
              time: '17:30–17:45',
            },
          ],
        },
        sgc: 'continue',
      },
      {
        type: 'info',
        time: '18:00–',
        title: 'Canelazo (cierre)',
        category: 'cierre',
        sgc: 'continue',
      },
    ],
    sgcColumn: true,
  },
  {
    id: 'vie',
    label: 'Viernes 21',
    rooms: ['201', '202', '203', '204', '205', '206'],
    sub: '201 Estructural (cupo final) · 202 Geofísica · 203 Energías Renovables (3 salas activas)',
    desc: 'Sin cambios estructurales relevantes salvo el cierre del cupo de Estructural (1 ponencia) y Geofísica/Energías Renovables completas en el único bloque de ponencias de la mañana (6x20min). No hay ponencias en la tarde, solo charlas magistrales (CM-14/15/16) y el cierre del evento.',
    themes: {
      '201': 'Energías Renovables · CO₂ · Hidrógeno',
      '202': 'Geofísica · Sismología · Instrumentación',
      '203': 'Tecnología · Teledetección · Metodología Sedimentaria',
      '204': 'Petrología Metamórfica e Ígnea',
      '205': 'Exploración · Hidrogeología · Recursos Hídricos',
      '206': 'Geología Estructural · Evolución Tectónica',
    },
    rows: [
      {
        type: 'block',
        time: '8:10–10:30',
        auditorio: {
          cms: [
            {
              code: 'CM-10',
              time: '8:10–8:50',
              title: 'Minerales Estratégicos y Transición Energética: Nuevas Oportunidades',
              speaker: 'Ing. Esteban Castillo',
              org: 'ANM',
            },
            {
              code: 'CM-11',
              time: '9:00–9:40',
              title: 'The Changing Role of Geosciences in the Energy Transition',
              speaker: 'Eilard Hoogerduijn',
              org: 'Internacional',
            },
            {
              code: 'CM-12',
              time: '9:50–10:30',
              title: 'ANH',
              speaker: 'Por confirmar',
              org: 'ANH',
            },
          ],
        },
        cells: {
          '201': [
            {
              title: 'EVALUACIÓN DEL POTENCIAL DE ALMACENAMIENTO GEOLÓGICO DE CO₂ EN EL VALLE MEDIO DEL MAGDALENA A PARTIR DE CARACTERISTICAS PETROGRAFICAS Y PETROFISICAS.',
              status: 'confirmado',
              authors: 'PhD Agustín Cardona Molina, M.Sc Edison Duarte Gómez, Adriana Bravo Benavides',
              time: '8:10–8:25',
            },
            {
              title: 'Presencia y generación de hidrógeno blanco a lo largo de la transición oceánico–continental en el Valle del Cauca',
              status: 'confirmado',
              authors: 'Michael Steven Guerrero Peña, Juan Carlos Molano Mendoza',
              time: '8:55–9:10',
            },
            {
              title: 'Metodología basada en Inteligencia Artificial para la evaluación del riesgo geomecánico de contención en proyectos de almacenamiento de CO₂',
              status: 'confirmado',
              authors: 'Andrés Mauricio Muñoz García, Erluan Andres Zabaleta Benavides',
              time: '9:40–9:55',
            },
          ],
          '202': [
            {
              title: 'Modelo de visualización e interpretación 3D basado en datos de tomografía de resistividad eléctrica, para la identificación de estructuras geológicas',
              status: 'confirmado',
              authors: 'Ana María Lizarazo Molina, Fabian Felipe Beltran Cepeda',
              time: '8:10–8:25',
            },
            {
              title: 'Qué es la Detección Acústica Distribuida (DAS): Algunos ejemplos en Colombia y el Mundo',
              status: 'confirmado',
              authors: 'Germán A. Prieto',
              time: '8:55–9:10',
            },
            {
              title: 'Registro sísmico del tramo central de la falla de Anatolia del Norte a partir de los sedimentos del lago Iznik',
              status: 'confirmado',
              authors: 'Edward Duarte, Renaldo Gastineau, Pierre Sabatier, Flavio S. Anselmetti, Stefano C. Fabbri, Serkan Gündüz, Mustafa Şahin, Julia de Sigoyer',
              time: '9:40–9:55',
            },
          ],
          '203': [
            {
              title: 'Análisis multiescala de imágenes para la caracterización del entramado poroso en areniscas reservorio de la Cuenca Cesar-Ranchería',
              status: 'confirmado',
              authors: 'Leidy Estefania Cadavid Arango, Cesar Vinasco',
              time: '8:10–8:25',
            },
            {
              title: 'Mapeamiento textural 3D y 2D de bloques de roca potencialmente almacenadora de CO2 a través de estudios de microtomografía computarizada',
              status: 'confirmado',
              authors: 'Nathalie Herrera Cárdenas; César Vinasco',
              time: '8:55–9:10',
            },
            {
              title: 'Aplicación de técnicas analíticas en el estudio de sedimentos recientes de humedales: caso de estudio en la Ciénaga Grande',
              authors: 'Karol Vanessa Ruiz Moreno',
              linea: 'Estratigrafía y Sedimentología',
              status: 'confirmado',
              time: '9:40–9:55',
            },
          ],
          '204': [
            {
              title: 'Caracterización de protolitos y metamorfismo de los esquistos del Complejo Arquía expuestos en el Río Tapias (Chocó): implicaciones para la generación de H₂',
              status: 'confirmado',
              authors: 'Luna Valeria Amaya Orozco, Agustín Cardona Molina, Alejandra M. Bedoya Mejía, Sebastián Zapata Henao',
              time: '8:10–8:25',
            },
            {
              title: 'PETROGRAFÍA Y CARACTERIZACIÓN GEOQUÍMICA DE LAS ROCAS DE LOS STOCKS DE CHUSCALES, OTENGÁ E INTRUSIVO DE AGUACHICA, MACIZO DE FLORESTA, BOYACÁ, COLOMBIA.',
              status: 'confirmado',
              authors: 'Angie Roshel Pabón Soler',
              time: '8:55–9:10',
            },
            {
              title: 'Petrogenesis y evolución tectónica de los gabros en el sector de Sucre, Antioquia, y su posición dentro del CCOP',
              status: 'confirmado',
              authors: 'Cesar Santiago Morales, Sebastián Zapata Henao, Agustín Cardona, Eliana Botello',
              time: '9:40–9:55',
            },
          ],
          '205': [
            {
              title: 'Método Anaconda: Implicaciones prospectivas y metalotectos texturales en mineralización tipo pórfido asociados al Proyecto Guayabales - Collective Mining',
              status: 'confirmado',
              authors: 'Alex Julián Insuasty España, Juan Daniel Burbano Salazar',
              time: '8:10–8:25',
            },
            {
              title: 'Actualización del análisis de vulnerabilidad, amenaza y peligro a la contaminación de las aguas subterráneas en la Sabana de Bogotá',
              authors: 'David Blanco Quiroga, María Juliana Chacón Porras',
              linea: 'Hidrogeología · Recursos Hídricos',
              status: 'confirmado',
              time: '8:55–9:10',
            },
            {
              title: 'Propuesta de Zonificaciòn de Potencial de Recarga Natural y Aptitud de Recarga Artificial de Acuíferos en la Sabana de Bogotá mediante Análisis Multiparamétrico y Ponderación Integrada GRITIC-AHP',
              authors: 'German Leonardo Rojas Leal',
              linea: 'Hidrogeología · Recursos Hídricos',
              status: 'confirmado',
              time: '9:40–9:55',
            },
          ],
          '206': [
            {
              title: 'Sección estructural del sendero El Cementerio a escala 1:2.000, Gramalote Antiguo, Norte de Santander',
              status: 'confirmado',
              authors: 'Dennis Julethzy Camila Mogollón Rodríguez, Michell Cárdenas-López, Jhan Leal-Contreras, Ilich Villamizar-Solano',
              time: '8:10–8:25',
            },
            {
              title: 'Análisis litoestratigráfico del registro metamórfico en la Quebrada La Despensas (Filadelfia, Caldas)',
              authors: 'David Patiño, Alejandra Bedoya, Agustín Cardona, Juan Sebastián Jaramillo, Julián Parra, Paulina Muñoz',
              linea: 'Petrología Metamórfica · Geocronología',
              status: 'confirmado',
              time: '8:55–9:10',
            },
            {
              title: 'Magmatismo félsico con enclaves máficos y deformación frágil en el sector Patillal–La Junta, margen noroccidental del SNSM',
              authors: 'Jenny García González',
              linea: 'Geología Regional · Magmatismo',
              status: 'confirmado',
              time: '9:40–9:55',
            },
          ],
        },
      },
      {
        type: 'info',
        time: '10:30–11:00',
        title: 'Break (entrega quinto refrigerio)',
        category: 'break',
      },
      {
        type: 'panel',
        time: '11:00–12:30',
        title: 'Panel de discusión: Energías — ANH',
      },
      {
        type: 'info',
        time: '12:30–14:00',
        title: 'Almuerzo',
        category: 'almuerzo',
      },
      {
        type: 'info',
        time: '14:10–18:00',
        title: 'SGC: 1 de los 3 salones de bienestar (tarde)',
        category: 'sgc',
      },
      {
        type: 'block',
        time: '14:10–14:50',
        auditorio: {
          cms: [
            {
              code: 'CM-13',
              time: '14:10–14:50',
              title: 'SCG',
              speaker: 'Por confirmar',
              org: 'SCG',
            },
          ],
        },
        title: 'Charla Magistral 13',
        altBlock: {
          title: 'SCG — Sociedad Colombiana de Geotecnia',
          sub: 'Programación propia en paralelo a las charlas magistrales · 1 salón de Bienestar',
          span: 3,
          time: '14:10–16:10',
        },
      },
      {
        type: 'block',
        time: '14:50–15:30',
        auditorio: {
          cms: [
            {
              code: 'CM-14',
              time: '14:50–15:30',
              title: 'Caracterización de rezumaderos a partir de productos de sensores remotos',
              speaker: 'Iván Plata',
              org: 'Ecopetrol',
            },
          ],
        },
        title: 'Charla Magistral 14',
        altBlockContinuation: true,
      },
      {
        type: 'block',
        time: '15:30–16:10',
        auditorio: {
          cms: [
            {
              code: 'CM-15',
              time: '15:30–16:10',
              title: 'Elementos para entender el fracking en Colombia',
              speaker: 'Jaime Checa',
              org: 'ACGGP',
            },
          ],
        },
        title: 'Charla Magistral 15',
        altBlockContinuation: true,
      },
      { type: 'info', time: '16:20', title: 'Evento de cierre', category: 'cierre' },
      { type: 'info', time: '19:00–', title: 'Fiesta final', category: 'cierre' },
    ],
  },
];